// Finish the built pages for fast loading, with the things Zine cannot do itself:
// - every <img> gets its width and height, so the page does not jump as images
//   arrive, and every image after a page's first is loaded lazily;
// - every <video> gets its size and preload="none", so it costs nothing at page
//   load (assets/lazy-video.js fetches it when it comes near the viewport);
// - the inlined CSS and the standalone .css files are minified.
// Under `zine` dev none of this runs, and the pages work without it.
//
// usage: node scripts/optimize-pages.mjs [public]

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "public");

// ---------------------------------------------------------------- sizes

// CSS pixels per SVG length unit; em, ex and % have no fixed size.
const UNIT = { "": 1, px: 1, pt: 4 / 3, pc: 16, in: 96, cm: 96 / 2.54, mm: 96 / 25.4 };

function svgSize(buf) {
  const tag = /<svg\b[^>]*>/.exec(buf.toString("utf8"))?.[0];
  if (!tag) return null;
  const length = (name) => {
    const m = new RegExp(`\\s${name}="([\\d.]+)([a-z%]*)"`).exec(tag);
    return m && m[2] in UNIT ? parseFloat(m[1]) * UNIT[m[2]] : null;
  };
  const w = length("width"), h = length("height");
  if (w && h) return [w, h];
  const box = /\sviewBox="([^"]+)"/.exec(tag)?.[1].trim().split(/[\s,]+/).map(Number);
  return box?.length === 4 ? [box[2], box[3]] : null;
}

function webpSize(b) {
  switch (b.toString("latin1", 12, 16)) {
    case "VP8 ": return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    case "VP8L": { const n = b.readUInt32LE(21); return [(n & 0x3fff) + 1, ((n >> 14) & 0x3fff) + 1]; }
    case "VP8X": return [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1];
  }
  return null;
}

// An AVIF stores each image's size in an `ispe` box; the largest is the picture itself.
function avifSize(b) {
  let best = null;
  for (let i = b.indexOf("ispe", 0, "latin1"); i !== -1 && i + 16 <= b.length; i = b.indexOf("ispe", i + 4, "latin1")) {
    const size = [b.readUInt32BE(i + 8), b.readUInt32BE(i + 12)];
    if (!best || size[0] * size[1] > best[0] * best[1]) best = size;
  }
  return best;
}

function jpegSize(b) {
  for (let i = 2; i + 9 < b.length; ) {
    if (b[i] !== 0xff) return null;
    const marker = b[i + 1];
    // SOF0..SOF15 hold the size; C4, C8 and CC are other segments in that range
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

// The size of an MP4's picture is the last eight bytes of the video track's `tkhd` box.
function mp4Size(b, start = 0, end = b.length) {
  for (let i = start; i + 8 <= end; ) {
    let size = b.readUInt32BE(i), head = 8;
    const type = b.toString("latin1", i + 4, i + 8);
    if (size === 1) { size = Number(b.readBigUInt64BE(i + 8)); head = 16; }
    if (size === 0) size = end - i;
    if (size < head) return null;
    if (type === "moov" || type === "trak") {
      const found = mp4Size(b, i + head, i + size);
      if (found) return found;
    } else if (type === "tkhd") {
      const w = b.readUInt32BE(i + size - 8) / 65536, h = b.readUInt32BE(i + size - 4) / 65536;
      if (w && h) return [w, h]; // an audio track has no size
    }
    i += size;
  }
  return null;
}

const READERS = {
  ".svg": svgSize,
  ".webp": webpSize,
  ".avif": avifSize,
  ".jpg": jpegSize,
  ".jpeg": jpegSize,
  ".png": (b) => [b.readUInt32BE(16), b.readUInt32BE(20)],
  ".gif": (b) => [b.readUInt16LE(6), b.readUInt16LE(8)],
  ".mp4": mp4Size,
};

const sizes = new Map();
const unsized = new Set();

// The [width, height] of a file the site serves at `url`, or null when it cannot be told.
function sizeOf(url) {
  if (!url || !url.startsWith("/") || url.startsWith("//")) return null; // only this site's files
  const rel = decodeURIComponent(url.split(/[?#]/)[0]);
  if (!sizes.has(rel)) {
    let size = null;
    try {
      size = READERS[path.extname(rel).toLowerCase()]?.(fs.readFileSync(path.join(root, rel))) ?? null;
    } catch {
      // a missing or truncated file: leave the element as it is
    }
    if (!size) unsized.add(rel);
    sizes.set(rel, size);
  }
  return sizes.get(rel);
}

// ---------------------------------------------------------------- pages

const attr = (attrs, name) => new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, "i").exec(attrs)?.[1];
const has = (attrs, name) => new RegExp(`\\s${name}(?=[\\s=]|$)`, "i").test(attrs);

// The width and height attributes still missing from an element, keeping a width
// or height the page already sets and the picture's proportions.
function sizeAttrs(attrs, size) {
  if (!size) return "";
  const [w, h] = size;
  const setW = parseFloat(attr(attrs, "width")), setH = parseFloat(attr(attrs, "height"));
  if (setW && setH) return "";
  if (setW) return ` height="${Math.round(setW * h / w)}"`;
  if (setH) return ` width="${Math.round(setH * w / h)}"`;
  return ` width="${Math.round(w)}" height="${Math.round(h)}"`;
}

// Keeps quoted strings, drops comments, and removes the white space CSS does not need.
function minifyCss(css) {
  return css
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\/\*[\s\S]*?\*\/|\s*([{};,])\s*|(\s)\s*/g,
      (_, string, punctuation, space) => string ?? punctuation ?? (space ? " " : ""))
    .trim();
}

const ATTRS = `((?:"[^"]*"|'[^']*'|[^'">])*)`;
// Comments and scripts are matched so that nothing inside them is rewritten.
const TOKEN = new RegExp(
  `<!--[\\s\\S]*?-->|<script\\b[^>]*>[\\s\\S]*?</script\\s*>` +
  `|<style\\b([^>]*)>([\\s\\S]*?)</style\\s*>` +
  `|<img\\b${ATTRS}>` +
  `|<video\\b${ATTRS}>([\\s\\S]*?)</video\\s*>`, "gi");

function optimize(html) {
  let images = 0, videos = 0;
  const out = html.replace(TOKEN, (whole, styleAttrs, css, img, video, videoBody) => {
    if (css !== undefined) return `<style${styleAttrs}>${minifyCss(css)}</style>`;
    if (img !== undefined) {
      let add = sizeAttrs(img, sizeOf(attr(img, "src")));
      // the first image may be in view when the page opens, so it is not delayed
      if (images++ > 0 && !has(img, "loading")) add += ' loading="lazy"';
      if (!has(img, "decoding")) add += ' decoding="async"';
      return `<img${img.replace(/\s*\/?$/, "")}${add}>`;
    }
    if (video !== undefined) {
      videos++;
      let add = sizeAttrs(video, sizeOf(attr(video, "src") ?? attr(videoBody, "src")));
      if (!has(video, "preload") && !has(video, "autoplay")) add += ' preload="none"';
      return `<video${video}${add}>${videoBody}</video>`;
    }
    return whole;
  });
  return { out, images, videos };
}

function* files(dir, ext) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* files(p, ext);
    else if (entry.name.endsWith(ext)) yield p;
  }
}

let pages = 0, images = 0, videos = 0, before = 0, after = 0;
for (const file of files(root, ".html")) {
  const html = fs.readFileSync(file, "utf8");
  const result = optimize(html);
  if (result.out !== html) fs.writeFileSync(file, result.out);
  pages++; images += result.images; videos += result.videos;
  before += Buffer.byteLength(html); after += Buffer.byteLength(result.out);
}
for (const file of files(root, ".css")) {
  const css = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, minifyCss(css));
}
for (const rel of unsized) console.warn(`no size found for ${rel}: its element keeps the attributes it had`);
console.log(`optimize-pages: ${pages} pages, ${images} images, ${videos} videos, HTML ${before} -> ${after} bytes`);
