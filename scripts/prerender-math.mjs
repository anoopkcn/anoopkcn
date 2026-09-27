// Render <script type="math/tex"> to MathML in the built site, so math posts
// no longer download temml.min.js and rewrite the page after it appears.
// Mirrors assets/render-mathtex.js, which still renders math under `zine` dev.
//
// usage: node scripts/prerender-math.mjs [public]

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(process.argv[2] ?? "public");
const here = path.dirname(new URL(import.meta.url).pathname);
const temmlSrc = fs.readFileSync(path.join(here, "../assets/temml.min.js"), "utf8");
const temml = vm.runInNewContext(temmlSrc + "\n;temml");

// Same rule as render-mathtex.js: inline inside these, display otherwise.
const INLINE_CONTEXT = new Set(["p", "li", "td", "th", "dt", "dd", "figcaption", "h1", "h2", "h3", "h4", "h5", "h6"]);
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
// Opening one of these closes an open <p>, as the browser's parser does.
const CLOSES_P = new Set([
  "address", "article", "aside", "blockquote", "details", "dialog", "div", "dl", "fieldset", "figcaption",
  "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "main", "menu",
  "nav", "ol", "p", "pre", "section", "summary", "table", "ul",
]);

const TOKEN = /<!--[\s\S]*?-->|<script\b([^>]*)>([\s\S]*?)<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>|<(\/?)([a-zA-Z][\w-]*)(?:"[^"]*"|'[^']*'|[^'">])*>/g;

// Pop up to and including the nearest `names` element, unless a `stop` element comes first.
function closeOpen(stack, names, stop = new Set()) {
  for (let i = stack.length - 1; i >= 0; i--) {
    if (names.has(stack[i])) { stack.length = i; return; }
    if (stop.has(stack[i])) return;
  }
}

function prerender(html, file) {
  const stack = [];
  let out = "", last = 0, count = 0, failed = 0;
  for (const m of html.matchAll(TOKEN)) {
    const [whole, scriptAttrs, scriptBody, slash, rawName] = m;
    if (scriptAttrs !== undefined) {
      if (!/type\s*=\s*["']math\/tex["']/.test(scriptAttrs)) continue;
      const displayMode = !stack.some((t) => INLINE_CONTEXT.has(t));
      try {
        const mathml = temml.renderToString(scriptBody, { displayMode, throwOnError: true });
        out += html.slice(last, m.index) + mathml;
        last = m.index + whole.length;
        count++;
      } catch (err) {
        failed++;
        console.warn(`${file}: left for the browser to render: ${scriptBody}\n  ${err.message}`);
      }
      continue;
    }
    if (rawName === undefined) continue; // comment or style
    const name = rawName.toLowerCase();
    if (slash) {
      if (stack.includes(name)) stack.length = stack.lastIndexOf(name);
      continue;
    }
    if (CLOSES_P.has(name)) closeOpen(stack, new Set(["p"]), new Set(["button", "table", "td", "th"]));
    if (name === "li") closeOpen(stack, new Set(["li"]), new Set(["ul", "ol"]));
    if (name === "dt" || name === "dd") closeOpen(stack, new Set(["dt", "dd"]), new Set(["dl"]));
    if (name === "td" || name === "th") closeOpen(stack, new Set(["td", "th"]), new Set(["tr", "table"]));
    if (name === "tr") closeOpen(stack, new Set(["tr"]), new Set(["table"]));
    if (!VOID.has(name) && !whole.endsWith("/>")) stack.push(name);
  }
  out += html.slice(last);
  // With every equation rendered, the page no longer needs Temml's script.
  if (count > 0 && failed === 0) {
    out = out.replace(/[ \t]*<script\b[^>]*\bsrc="[^"]*\/(temml\.min|render-mathtex)\.js"[^>]*><\/script>\n?/g, "");
  }
  return { out, count, failed };
}

function* htmlFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith(".html")) yield p;
  }
}

let pages = 0, total = 0, failures = 0;
for (const file of htmlFiles(root)) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("math/tex")) continue;
  const rel = path.relative(root, file);
  const { out, count, failed } = prerender(html, rel);
  fs.writeFileSync(file, out);
  pages++; total += count; failures += failed;
  console.log(`${rel}: ${count} equations${failed ? `, ${failed} failed` : ""}`);
}
console.log(`prerender-math: ${total} equations in ${pages} pages${failures ? `, ${failures} left to the browser` : ""}`);
