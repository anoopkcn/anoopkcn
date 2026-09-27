"""Build the figures for the "Dimensionality reduction" post.

Run from anywhere:  python3 make_figures.py
Needs pdftocairo (poppler), ImageMagick's `magick` and ffmpeg on the PATH.

Two kinds of figure:
- Data figures come from the talk's own figure script. They are PDFs made for
  an off-white slide, so they are rasterised at 300 dpi onto an off-white card.
  Set DIMRED_TALK to point at the talk folder if it moves.
- Diagrams are drawn here as SVG in the site's dark palette. The autoencoder
  and VAE diagrams embed the talk's generated reconstructions.

The k-medoids animation (K-medoids.mp4) comes from the talk folder, where
scripts/make_kmedoids_video.py makes it. It is remuxed without re-encoding so
the index sits at the front of the file and a browser can show the first frame
before the whole video has downloaded.
"""

import base64
import os
import subprocess
from pathlib import Path

OUT = Path(__file__).parent
TALK = Path(os.environ.get("DIMRED_TALK", Path.home() / "develop/DKZ2R-presentation-Sep-2026"))
GEN = TALK / "figures/generated"

# ---------------------------------------------------------------- tokens
BG = "#22252a"
HAIR = "#3a3e46"
TXT = "#d7dae0"
TXT2 = "#b9bdc6"
MUTED = "#7f8590"
ACCENT = "#769dce"
BOX = "#2c3036"
GREEN, YELLOW, BLUE, RED, LIME, CYAN, VIOLET = "#199e70", "#c98500", "#3987e5", "#d9534f", "#7cb82f", "#1fb5c1", "#8a5cd6"
CARD = "#fafaf7"      # the slides' background

SANS = "ZedSans, Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
MONO = "ZedMono, 'SF Mono', Menlo, Consolas, monospace"
W = 760


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def svg(name, h, body, title):
    doc = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {h}" width="{W}" height="{h}" role="img" aria-label="{esc(title)}">
<title>{esc(title)}</title>
<defs>
  <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{TXT2}"/></marker>
  <marker id="ahA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{ACCENT}"/></marker>
</defs>
<rect width="{W}" height="{h}" rx="8" fill="{BG}"/>
<g font-family="{SANS}" font-size="13" fill="{TXT2}">
{body}
</g>
</svg>
"""
    (OUT / name).write_text(doc)


def text(x, y, s, size=13, fill=TXT2, anchor="start", weight=None, mono=False, italic=False):
    a = f' text-anchor="{anchor}"' if anchor != "start" else ""
    wgt = f' font-weight="{weight}"' if weight else ""
    fam = f' font-family="{MONO}"' if mono else ""
    it = ' font-style="italic"' if italic else ""
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{fill}"{a}{wgt}{fam}{it}>{esc(s)}</text>'


def rect(x, y, w, h, fill, rx=3, extra=""):
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}"{extra}/>'


def line(x1, y1, x2, y2, stroke=HAIR, sw=1, extra=""):
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{stroke}" stroke-width="{sw}"{extra}/>'


def arrow(x1, y1, x2, y2, color=TXT2, marker="ah", sw=1.4):
    return (f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" '
            f'stroke-width="{sw}" marker-end="url(#{marker})"/>')


def image(path, x, y, w, h):
    data = base64.b64encode(Path(path).read_bytes()).decode()
    return f'<image x="{x:.1f}" y="{y:.1f}" width="{w}" height="{h}" href="data:image/png;base64,{data}"/>'


def cells(x, y, n, size, fills, gap=2):
    """A row of n square cells; fills[i] is a colour or None for an empty cell."""
    out = []
    for i in range(n):
        f = fills[i] if i < len(fills) else None
        extra = "" if f else f' stroke="{MUTED}" stroke-width="1"'
        out.append(rect(x + i * (size + gap), y, size, size, f or "none", rx=2, extra=extra))
    return "\n".join(out)


def trapezoid(x, y, w, h, narrow, label, shrink=True):
    """Encoder (shrink=True) narrows left to right; a decoder widens."""
    a, b = (h, narrow) if shrink else (narrow, h)
    top1, top2 = y + (h - a) / 2, y + (h - b) / 2
    pts = f"{x},{top1} {x + w},{top2} {x + w},{top2 + b} {x},{top1 + a}"
    return (f'<polygon points="{pts}" fill="#2f3b52" stroke="{ACCENT}" stroke-width="1"/>\n'
            + text(x + w / 2, y + h / 2 + 4, label, 12, TXT, "middle"))


# ---------------------------------------------------------------- 1. reduce
def fig_reduce():
    b = [text(40, 34, "p = 12,288 PIXEL VALUES", 10, MUTED, mono=True)]
    for r in range(6):
        b.append(cells(40, 46 + r * 16, 16, 14, [], gap=2))
    b.append(f'<text x="26" y="94" font-size="10" fill="{MUTED}" font-family="{MONO}" text-anchor="middle" transform="rotate(-90 26 94)">n PHOTOS</text>')
    b.append(arrow(318, 94, 380, 94))
    b.append(text(349, 84, "reduce", 12, TXT2, "middle"))
    b.append(text(392, 34, "l ≪ p", 10, MUTED, mono=True))
    for r in range(6):
        b.append(cells(392, 46 + r * 16, 3, 14, [BLUE] * 3, gap=2))
    b.append(rect(480, 40, 250, 110, "#2c3036", rx=8, extra=f' stroke="{HAIR}"'))
    b.append(text(498, 62, "PER PHOTO", 10, MUTED, mono=True))
    b.append(text(498, 96, "12,288", 26, TXT, weight=700))
    b.append(text(598, 96, "numbers stored", 13, TXT2))
    b.append(text(498, 134, "7", 26, TXT, weight=700))
    b.append(text(520, 134, "things that actually change", 13, TXT2))
    svg("fig-reduce.svg", 170, "\n".join(b), "An n by p data matrix reduced to n by l, with l much smaller than p")


# ---------------------------------------------------------------- 2. three families
def fig_families():
    panels = [
        ("Transformation", ["New features mix", "all originals"], "PCA, ICA, t-SNE,", "UMAP, autoencoders"),
        ("Aggregation", ["Each group becomes", "one summary"], "pixel blocks, gene sets,", "k-medoids"),
        ("Selection", ["A subset of the", "originals is kept"], "ReliefF, forward", "selection, elastic net"),
    ]
    b = []
    for k, (title, desc, ex1, ex2) in enumerate(panels):
        x0 = 24 + k * 246
        b.append(rect(x0, 20, 230, 250, BOX, rx=8, extra=f' stroke="{HAIR}"'))
        bx, size, gap = x0 + 19, 14, 2
        if k == 0:
            b.append(cells(bx, 40, 12, size, []))
            b.append(line(bx, 60, bx + 190, 60, GREEN, 2))
            b.append(line(bx, 65, bx + 190, 65, YELLOW, 2))
            b.append(arrow(x0 + 115, 72, x0 + 115, 104))
            b.append(rect(x0 + 99, 110, 15, 15, GREEN, rx=2))
            b.append(rect(x0 + 116, 110, 15, 15, YELLOW, rx=2))
        else:
            fills = [GREEN] * 6 + [YELLOW] * 6 if k == 1 else [None, None, None, GREEN, None, None, None, None, YELLOW, None, None, None]
            b.append(cells(bx, 40, 12, size, fills))
            src = (bx + 2.5 * (size + gap) + 7, bx + 8.5 * (size + gap) + 7) if k == 1 else (bx + 3 * (size + gap) + 7, bx + 8 * (size + gap) + 7)
            for sx, col in zip(src, (GREEN, YELLOW)):
                b.append(arrow(sx, 60, sx, 104))
                b.append(rect(sx - 7.5, 110, 15, 15, col, rx=2))
        b.append(text(x0 + 115, 156, title, 15, TXT, "middle", 700))
        b.append(text(x0 + 115, 178, desc[0], 13, TXT2, "middle"))
        b.append(text(x0 + 115, 196, desc[1], 13, TXT2, "middle"))
        b.append(text(x0 + 115, 228, ex1, 12, MUTED, "middle"))
        b.append(text(x0 + 115, 245, ex2, 12, MUTED, "middle"))
    svg("fig-families.svg", 290, "\n".join(b), "Three families: transformation, aggregation and selection")


# ---------------------------------------------------------------- 3. pipeline
def fig_pipeline():
    row1 = ["Raw data files", "Data matrix", "Normalize,", "Aggregate", "Split data"]
    row1b = ["", "samples × features", "transform", "replicates", "train / test"]
    row2 = ["Missing values", "Scale features", "Dimensionality", "Quality control", "Integrate"]
    row2b = ["", "", "reduction", "", "data sets"]
    bw, bh, gx = 124, 54, 22
    xs = [24 + i * (bw + gx) for i in range(5)]
    b = [rect(xs[0] - 10, 132, 3 * bw + 2 * gx + 20, bh + 40, "#2a3140", rx=8)]
    b.append(text(xs[0], 250 - 36, "FITTED ON TRAINING DATA ONLY", 10, ACCENT, mono=True))
    for r, (top, sub, y) in enumerate(((row1, row1b, 30), (row2, row2b, 142))):
        for i in range(5):
            n = r * 5 + i + 1
            hl = n == 8
            edge = ACCENT if n in (5, 8) else HAIR
            b.append(rect(xs[i], y, bw, bh, ACCENT if hl else BOX, rx=6, extra=f' stroke="{edge}"'))
            b.append(text(xs[i] + 6, y + 12, str(n), 9, "#101114" if hl else MUTED, mono=True))
            col = "#101114" if hl else TXT
            if sub[i]:
                b.append(text(xs[i] + bw / 2, y + 25, top[i], 12, col, "middle", 600 if hl else None))
                b.append(text(xs[i] + bw / 2, y + 41, sub[i], 12, col, "middle", 600 if hl else None))
            else:
                b.append(text(xs[i] + bw / 2, y + 32, top[i], 12, col, "middle"))
            if i < 4:
                b.append(arrow(xs[i] + bw + 2, y + bh / 2, xs[i + 1] - 3, y + bh / 2))
    # step 5 down to step 6
    b.append(f'<path d="M{xs[4] + bw / 2},{30 + bh} L{xs[4] + bw / 2},{106} L{xs[0] + bw / 2},{106} L{xs[0] + bw / 2},{139}" '
             f'fill="none" stroke="{TXT2}" stroke-width="1.4" marker-end="url(#ah)"/>')
    b.append(arrow(xs[4] + bw / 2, 142 + bh + 2, xs[4] + bw / 2, 226))
    b.append(text(xs[4] + bw / 2, 244, "model building", 12, TXT2, "middle"))
    svg("fig-pipeline.svg", 262, "\n".join(b), "Ten-step data pipeline with the split before the steps that learn from data")


# ---------------------------------------------------------------- 4. folds
def fig_folds():
    cols = [("red", RED), ("lime", LIME), ("cyan", CYAN), ("violet", VIOLET)]
    x0, y0, cw, ch = 200, 50, 110, 30
    b = []
    for j, (name, c) in enumerate(cols):
        cx = x0 + j * (cw + 6)
        b.append(rect(cx + cw / 2 - 30, 22, 10, 10, c, rx=2))
        b.append(text(cx + cw / 2 - 15, 32, name, 13, TXT2))
    for i in range(4):
        y = y0 + i * (ch + 8)
        b.append(text(x0 - 16, y + 20, f"FOLD {i + 1}", 10, MUTED, "end", mono=True))
        for j in range(4):
            test = i == j
            b.append(rect(x0 + j * (cw + 6), y, cw, ch, BLUE if test else "#343a45", rx=4))
            if test:
                b.append(text(x0 + j * (cw + 6) + cw / 2, y + 20, "test: 256 photos", 11, "#ffffff", "middle", 600))
    y = y0 + 4 * (ch + 8) + 10
    b.append(rect(x0, y, 12, 12, "#343a45", rx=2))
    b.append(text(x0 + 18, y + 11, "train: 768 photos of the other three colours", 12, TXT2))
    svg("fig-folds.svg", y + 30, "\n".join(b), "Leave-one-colour-out cross-validation with four folds")


# ---------------------------------------------------------------- 5. autoencoder
def fig_autoencoder():
    b = [image(GEN / "ae_photo.png", 40, 30, 120, 120)]
    b.append(trapezoid(180, 30, 150, 120, 50, "encoder"))
    for i in range(8):
        b.append(rect(344, 38 + i * 13.5, 20, 11, BLUE, rx=2))
    b.append(trapezoid(378, 30, 150, 120, 50, "decoder", shrink=False))
    b.append(image(GEN / "ae_reconstruction.png", 548, 30, 120, 120))
    for x, lab, sub in ((100, "x", "12,288 NUMBERS"), (354, "z", "8 NUMBERS"), (608, "x̂", "REBUILT")):
        b.append(text(x, 176, lab, 17, TXT, "middle", italic=True))
        b.append(text(x, 196, sub, 10, MUTED, "middle", mono=True))
    svg("fig-autoencoder.svg", 216, "\n".join(b),
        "Autoencoder: a photo is encoded into 8 numbers and decoded back into a photo")


# ---------------------------------------------------------------- 6. VAE
def fig_vae():
    b = [image(GEN / "ae_photo.png", 30, 30, 96, 96)]
    b.append(trapezoid(140, 30, 120, 96, 40, "encoder"))
    for c in range(2):
        for i in range(8):
            b.append(rect(272 + c * 22, 36 + i * 11, 18, 9, BLUE if c == 0 else "#5b8fd6", rx=2))
    b.append(text(292, 146, "μ, σ", 15, TXT, "middle", italic=True))
    b.append(arrow(320, 78, 368, 78, ACCENT, "ahA"))
    b.append(text(344, 70, "sample", 11, ACCENT, "middle"))
    for i in range(8):
        b.append(rect(374, 36 + i * 11, 18, 9, BLUE, rx=2))
    b.append(text(383, 146, "z", 15, TXT, "middle", italic=True))
    b.append(trapezoid(404, 30, 120, 96, 40, "decoder", shrink=False))
    b.append(image(GEN / "vae_reconstruction.png", 538, 30, 96, 96))
    b.append(text(78, 146, "x", 15, TXT, "middle", italic=True))
    b.append(text(586, 146, "x̂", 15, TXT, "middle", italic=True))
    strips = [("CHANGE ONE LATENT NUMBER, z6: COLOUR", "vae_colour"), ("MOVE FROM A CUBE'S z TO A CAPSULE'S: SHAPE", "vae_shape")]
    y = 178
    for lab, stem in strips:
        b.append(text(30, y, lab, 10, MUTED, mono=True))
        for k in range(7):
            b.append(image(GEN / f"{stem}{k + 1}.png", 30 + k * 100, y + 10, 92, 92))
        y += 130
    svg("fig-vae.svg", y - 8, "\n".join(b),
        "Variational autoencoder and two strips of decoded photos: changing one latent number changes the colour, moving between codes changes the shape")


# ---------------------------------------------------------------- data figures from the talk
def cards():
    """Rasterise the talk's PDF figures onto an off-white card."""
    single = {
        "tabletop_examples": "fig-tabletop.webp",
        "curse_of_dimensionality": "fig-curse.webp",
        "prep_rgb_depth_scaling": "fig-scaling.webp",
        "pca_two_pixels": "fig-pca-two-pixels.webp",
        "pca_images": "fig-pca-images.webp",
        "ica_unmix_photos": "fig-ica.webp",
        "embeddings": "fig-embeddings.webp",
        "ae_vs_pca": "fig-ae-vs-pca.webp",
        "pixel_correlations": "fig-pixel-correlations.webp",
        "aggregation": "fig-aggregation.webp",
        "relieff": "fig-relieff.webp",
        "forward_selection": "fig-forward-selection.webp",
        "stability_vs_accuracy": "fig-stability.webp",
    }
    tmp = OUT / "_tmp"
    tmp.mkdir(exist_ok=True)

    def raster(stem):
        subprocess.run(["pdftocairo", "-png", "-transp", "-r", "300", "-singlefile",
                        str(GEN / f"{stem}.pdf"), str(tmp / stem)], check=True)
        return tmp / f"{stem}.png"

    def card(srcs, out, gap=60):
        cmd = ["magick", "-background", CARD]
        for i, s in enumerate(srcs):
            if i:
                cmd += ["-size", f"{gap}x1", f"xc:{CARD}"]
            cmd.append(str(s))
        if len(srcs) > 1:
            cmd += ["-gravity", "center", "+append", "+repage"]
        cmd += ["-flatten", "-bordercolor", CARD, "-border", "36", "-strip", "-quality", "90", str(OUT / out)]
        subprocess.run(cmd, check=True)

    for stem, out in single.items():
        card([raster(stem)], out)
    card([raster("pca_cumulative_variance"), raster("pca_reconstruction")], "fig-pca-keep.webp")
    for f in tmp.iterdir():
        f.unlink()
    tmp.rmdir()


if __name__ == "__main__":
    for f in (fig_reduce, fig_families, fig_pipeline, fig_folds, fig_autoencoder, fig_vae):
        f()
    cards()
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(TALK / "K-medoids.mp4"),
                    "-c", "copy", "-movflags", "+faststart", str(OUT / "K-medoids.mp4")], check=True)
    print("figures written to", OUT)
