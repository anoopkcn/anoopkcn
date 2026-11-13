# Make the website load faster

- STATUS: CLOSED
- PRIORITY: 100
- TAGS:

The site should load as fast as it can for a first-time visitor. Fonts, image formats and the build may all change. The site is served by GitHub Pages, which compresses with gzip only and caches every file for 10 minutes.

## Resolution (2026-11-13)

A first visit now needs one request before the page can be drawn, and transfers about a third of the bytes it did. The numbers below are bytes on the wire with gzip, for the HTML plus everything the page loads without scrolling.

| Page | Before | After | Render-blocking CSS requests |
|---|---|---|---|
| `/` | 69.9 KB | 24.7 KB | 3 -> 0 |
| `/blog/zenv/` | 150.0 KB | 61.9 KB | 4 -> 0 |
| `/blog/agentic-workflows/` | 175.1 KB | 71.7 KB | 5 -> 0 |
| `/blog/dimensionality-reduction/` | 990 KB plus the video | 92.8 KB | 5 -> 0 |

In headless Chrome the dimensionality reduction post went from 33 network requests at load to 9, and the old page also fetched `K-medoids.mp4` (1 MB) at load.

What changed:

- CSS is inlined. `base.shtml` and `post.shtml` put `fonts.css`, `style.css`, `highlight.css` (only on pages with a code block), `post.css` and `Temml-Local.css` into `<style>` elements with `$site.asset('...').bytes()`. `toc.js` is inlined at the end of the right pane. `fonts.css` and `style.css` are also listed in `static_assets` in `zine.ziggy`, because `assets/404.html` is a static file and still links them.
- Each font face is split into three files in `assets/fonts/zed/`, selected by `unicode-range` in `assets/fonts.css`. The core file (ASCII, Latin-1, common punctuation, four arrows, and box drawing for the mono face) is 11 to 17 KB where the old file was 34 to 38 KB. `-latin-ext` (about 6 KB) and `-symbols` (15 to 19 KB) are fetched only by a page that uses their characters. The sans files no longer carry the `calt` ligatures, which only affected punctuation sequences. The mono core keeps them, so code looks the same.
- `scripts/optimize-pages.mjs` is a new build step in `.github/workflows/gh-pages.yml`, after the math step. It gives every `<img>` its `width` and `height`, adds `loading="lazy"` to every image after a page's first, gives every `<video>` its size and `preload="none"`, and minifies the inlined CSS. It reads sizes from SVG, AVIF, WebP, PNG, JPEG, GIF and MP4 files. `assets/style.css` has `img, video { max-width: 100%; height: auto }` to go with it.
- `assets/lazy-video.js` (inlined on posts with a video) loads a video's metadata and first frame when it comes within one screen of the viewport.
- The 15 WebP figures are AVIF at quality 60 (719 KB -> 363 KB in total). They were re-encoded from the WebP files, because the talk folder that `make_figures.py` reads is not on this machine. Side-by-side crops showed no visible difference.
- The photos embedded in `fig-vae.svg` and `fig-autoencoder.svg` are WebP instead of PNG (235 KB -> 56 KB and 36 KB -> 11 KB).
- `base.shtml` has speculation rules, so Chrome and Edge prerender a same-site page when its link is hovered. `assets/prefetch.js` does a plain prefetch on hover in Firefox and Safari.

Checked: old and new builds were screenshotted in headless Chrome at 1440 px and 420 px and compared pixel by pixel. On five pages fewer than 0.01% of the pixels differed, and the differences that were inspected sat inside SVG diagrams. The lazy video, the contents highlighting, the 404 page and the prefetch script were exercised, with no console errors and a layout shift of 0.

Not checked: `make_figures.py` was edited to write AVIF and to embed WebP, but it could not be run here (no talk folder, `magick` or `pdftocairo`). Nothing was tested in Firefox or Safari. AVIF needs Safari 16.4 or newer.

Open questions:

- Q1: GitHub Pages cannot send Brotli, long cache lifetimes or HTTP/3. Putting Cloudflare in front of it, or moving to Cloudflare Pages, would help repeat visits most, since every file now expires after 10 minutes.
- Q2: A system font stack would remove the remaining 21 to 50 KB of font downloads per page, at the cost of the Zed look.
