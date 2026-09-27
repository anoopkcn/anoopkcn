"""Generate the SVG figures for the "Agentic workflows" post.

Run from anywhere:  python3 make_figures.py
Every figure is written next to this script. Colours follow the site's dark
theme; message roles keep the same colour in every figure:
system = violet, tools = magenta, user = blue, assistant = aqua,
tool calls + results = yellow, free space = gray.
"""

import math
from pathlib import Path

OUT = Path(__file__).parent

# ---------------------------------------------------------------- tokens
BG = "#22252a"        # figure card (same as code blocks)
HAIR = "#3a3e46"      # grid, borders
FREE = "#3a3e46"      # free context
TXT = "#d7dae0"       # primary text
TXT2 = "#b9bdc6"      # secondary text
MUTED = "#7f8590"     # axis text, notes
ACCENT = "#769dce"    # site link colour
SYS, TOOLS, USER, ASST, CALL = "#9085e9", "#d55181", "#3987e5", "#199e70", "#c98500"
BLUE, ORANGE = "#3987e5", "#d95926"
SUMMARY = "#4b5263"
INK_ON = "#ffffff"    # text inside a coloured fill

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
  <marker id="ahY" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{CALL}"/></marker>
  <marker id="ahG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{ASST}"/></marker>
  <marker id="ahB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{USER}"/></marker>
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


def arrow(x1, y1, x2, y2, color=TXT2, marker="ah", sw=1.5, dash=False):
    d = ' stroke-dasharray="4 3"' if dash else ""
    return (f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" '
            f'stroke-width="{sw}" marker-end="url(#{marker})"{d}/>')


def box(x, y, w, h, title, sub=None, fill="#2c3036", stroke=HAIR, tcol=TXT, size=14):
    out = [rect(x, y, w, h, fill, rx=6, extra=f' stroke="{stroke}"')]
    if sub:
        out.append(text(x + w / 2, y + h / 2 - 3, title, size, tcol, "middle", 600))
        out.append(text(x + w / 2, y + h / 2 + 14, sub, 11, MUTED, "middle"))
    else:
        out.append(text(x + w / 2, y + h / 2 + 5, title, size, tcol, "middle", 600))
    return "\n".join(out)


def segs(x, y, h, parts, gap=2, label=True, size=12):
    """Stacked horizontal segments: parts = [(width, colour, label)]."""
    out = []
    for w, col, lab in parts:
        out.append(rect(x, y, w - gap, h, col, rx=3))
        if label and lab and len(lab) * size * 0.56 + 8 < w:
            out.append(text(x + (w - gap) / 2, y + h / 2 + size * 0.36, lab, size, INK_ON, "middle", 600))
        x += w
    return "\n".join(out), x


def brace(x1, x2, y, label, up=True):
    """A thin bracket spanning x1..x2 with a label above it."""
    d = 6 if up else -6
    p = f'<path d="M{x1:.1f},{y + d} L{x1:.1f},{y} L{x2:.1f},{y} L{x2:.1f},{y + d}" fill="none" stroke="{MUTED}" stroke-width="1"/>'
    ty = y - 8 if up else y + 18
    return p + "\n" + text((x1 + x2) / 2, ty, label, 12, TXT2, "middle")


# ---------------------------------------------------------------- 1. layers
def fig_layers():
    cx, cy = 190, 170
    rings = [(150, "HARNESS"), (115, "LOOP"), (80, "CONTEXT")]
    b = []
    for r, lab in rings:
        b.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{MUTED}" stroke-width="1"/>')
        b.append(text(cx, cy - r + 18, lab, 10, MUTED, "middle", mono=True))
    b.append(f'<circle cx="{cx}" cy="{cy}" r="42" fill="{ACCENT}"/>')
    b.append(text(cx, cy + 4, "MODEL", 11, "#1b1d22", "middle", 700, mono=True))
    rows = [
        ("1  The model", "How is the next token chosen?"),
        ("2  The context", "What does the model see?"),
        ("3  The loop", "How does a model take action?"),
        ("4  The harness", "Where do you have leverage?"),
    ]
    y = 80
    for t, s in rows:
        b.append(text(390, y, t, 16, TXT, weight=600))
        b.append(text(390, y + 21, s, 13, TXT2))
        b.append(line(390, y + 36, 720, y + 36))
        y += 62
    svg("fig-layers.svg", 340, "\n".join(b),
        "Four nested layers: model, context, loop, harness")


# ---------------------------------------------------------------- 2. tokens
def fig_tokens():
    tints = ["#2f3b52", "#2c4739", "#4a3a2a", "#47303d"]
    rows = [
        (["hello"], 1),
        (["ind", "isting", "uish", "able"], 4),
        (["function", "␣get", "Data", "()"], 4),
        (["console", ".log", "(\"", "Hello", ",", "␣world", "!\")"], 7),
    ]
    b = [text(30, 36, "TEXT, SPLIT INTO TOKENS", 10, MUTED, mono=True),
         text(720, 36, "TOKENS", 10, MUTED, "end", mono=True)]
    y = 58
    for toks, n in rows:
        x = 30
        for i, t in enumerate(toks):
            w = len(t) * 9 + 14
            b.append(rect(x, y, w, 28, tints[i % 4], rx=4))
            b.append(text(x + w / 2, y + 19, t, 15, TXT, "middle", mono=True))
            x += w + 3
        b.append(text(720, y + 19, str(n), 15, TXT, "end", 600))
        b.append(line(30, y + 38, 720, y + 38))
        y += 48
    b.append(text(30, y + 8, "Illustrative splits; ␣ marks a space. Each model family has its own tokenizer.", 12, MUTED))
    svg("fig-tokens.svg", y + 26, "\n".join(b), "Example strings split into tokens")


# ---------------------------------------------------------------- 3. temperature
BASE = [("dog", 0.60), ("cat", 0.18), ("wolf", 0.10), ("fox", 0.07), ("car", 0.05)]


def with_temperature(T):
    z = [math.log(p) / T for _, p in BASE]
    m = max(z)
    e = [math.exp(v - m) for v in z]
    s = sum(e)
    return [v / s for v in e]


def fig_temperature():
    panels = [(0.5, "focused"), (1.0, "default"), (2.0, "creative")]
    pw, top, h = 220, 70, 150
    b = []
    for k, (T, name) in enumerate(panels):
        x0 = 40 + k * 240
        probs = with_temperature(T)
        b.append(text(x0, 36, f"T = {T:g}", 15, TXT, weight=600))
        b.append(text(x0 + 62, 36, name, 13, MUTED))
        base = top + h
        b.append(line(x0, base, x0 + pw - 20, base, HAIR))
        for i, ((tok, _), p) in enumerate(zip(BASE, probs)):
            bx = x0 + 8 + i * 40
            bh = p * h
            # 4px rounded data end, square at the baseline
            b.append(f'<path d="M{bx},{base} L{bx},{base - bh + 4:.1f} Q{bx},{base - bh:.1f} {bx + 4},{base - bh:.1f} '
                     f'L{bx + 20},{base - bh:.1f} Q{bx + 24},{base - bh:.1f} {bx + 24},{base - bh + 4:.1f} L{bx + 24},{base} Z" fill="{BLUE}"/>')
            b.append(text(bx + 12, base - bh - 6, f"{p:.2f}", 11, TXT2, "middle", mono=True))
            b.append(text(bx + 12, base + 18, tok, 12, TXT2, "middle"))
    b.append(text(40, 268, "Prompt: “The animal that barks is the ___”. Probabilities of five candidate tokens.", 12, MUTED))
    svg("fig-temperature.svg", 285, "\n".join(b),
        "Next-token probabilities at temperature 0.5, 1 and 2")


# ---------------------------------------------------------------- 4. top-p / top-k
def fig_topp():
    x0, span = 150, 570
    rows = [("all tokens", 5), ("top-p = 0.9", 4), ("top-k = 2", 2)]
    b = [text(x0, 30, "CUMULATIVE PROBABILITY, T = 1", 10, MUTED, mono=True)]
    cum = 0
    for _, p in BASE[:-1]:
        cum += p
        b.append(text(x0 + cum * span, 30, f"{cum:.2f}", 10, MUTED, "middle", mono=True))
    y = 44
    for lab, keep in rows:
        b.append(text(30, y + 22, lab, 14, TXT, weight=600))
        x = x0
        for i, (tok, p) in enumerate(BASE):
            w = p * span
            col = BLUE if i < keep else FREE
            b.append(rect(x, y, w - 2, 34, col, rx=3))
            if len(tok) * 7 + 8 < w:
                b.append(text(x + (w - 2) / 2, y + 22, tok, 12, INK_ON if i < keep else MUTED, "middle", 600))
            x += w
        if lab.startswith("top-p"):
            b.append(line(x0 + 0.9 * span, y - 8, x0 + 0.9 * span, y + 3, TXT, 2))
            b.append(line(x0 + 0.9 * span, y + 31, x0 + 0.9 * span, y + 40, TXT, 2))
            b.append(text(x0 + 0.9 * span, y + 50, "p = 0.9", 10, TXT2, "middle", mono=True))
        y += 62
    b.append(rect(x0, y + 4, 12, 12, BLUE, rx=2))
    b.append(text(x0 + 18, y + 15, "kept, renormalized, sampled", 12, TXT2))
    b.append(rect(x0 + 230, y + 4, 12, 12, FREE, rx=2))
    b.append(text(x0 + 248, y + 15, "dropped", 12, TXT2))
    svg("fig-topp-topk.svg", y + 32, "\n".join(b),
        "Top-p and top-k truncate the tail of the distribution before sampling")


# ---------------------------------------------------------------- 5. context window
CTX_PARTS = [(12, SYS, "System"), (18, TOOLS, "Tools"), (7, USER, "User"),
             (10, ASST, "Assistant"), (23, CALL, "Tool calls + results"), (30, FREE, "Free space")]


def fig_context():
    x0, span, y = 30.0, 700, 70
    parts = [(p / 100 * span, c, l) for p, c, l in CTX_PARTS]
    body, _ = segs(x0, y, 46, parts, size=12)
    b = [body]
    # the free-space label sits on gray, so use secondary text
    b = [b[0].replace(f'fill="{INK_ON}" text-anchor="middle" font-weight="600">Free space',
                      f'fill="{TXT2}" text-anchor="middle" font-weight="600">Free space')]
    xs = [x0]
    for p, *_ in CTX_PARTS:
        xs.append(xs[-1] + p / 100 * span)
    b.append(brace(xs[0], xs[2] - 2, 52, "sent with every request"))
    b.append(brace(xs[2], xs[5] - 2, 52, "the conversation: grows every turn"))
    b.append(brace(xs[5], xs[6] - 2, 52, "headroom"))
    for a, c, lab in [(0, 1, "12%"), (1, 2, "18%"), (2, 5, "40%"), (5, 6, "30%")]:
        b.append(text((xs[a] + xs[c]) / 2, 136, lab, 11, MUTED, "middle", mono=True))
    b.append(text(30, 168, "Approximate breakdown of a typical mid-session coding-agent conversation.", 12, MUTED))
    svg("fig-context-window.svg", 186, "\n".join(b),
        "Context window broken down into system prompt, tools, conversation and free space")


# ---------------------------------------------------------------- 6. stateless re-send
def fig_stateless():
    b = []
    rows = [["U1"], ["U1", "A1", "U2"], ["U1", "A1", "U2", "A2", "U3"]]
    y = 30
    for n, row in enumerate(rows, 1):
        b.append(text(30, y + 20, f"REQUEST {n}", 10, MUTED, mono=True))
        x = 120
        s, x = segs(x, y, 30, [(72, SYS, "System"), (62, TOOLS, "Tools")], size=11)
        b.append(s)
        for m in row:
            col = USER if m[0] == "U" else ASST
            s, x = segs(x, y, 30, [(40, col, m)], size=11)
            b.append(s)
        b.append(arrow(x + 4, y + 15, x + 30, y + 15))
        b.append(rect(x + 34, y + 3, 64, 24, "#2c3036", rx=12, extra=f' stroke="{MUTED}"'))
        b.append(text(x + 66, y + 20, "model", 12, TXT, "middle"))
        b.append(arrow(x + 100, y + 15, x + 126, y + 15))
        s, _ = segs(x + 130, y, 30, [(42, ASST, f"A{n}")], size=11)
        b.append(s)
        y += 52
    b.append(brace(120, 252, y - 12, "stable prefix: cacheable", up=False))
    b.append(text(430, y + 6, "each answer is appended and re-sent with the next request", 12, MUTED, "middle"))
    svg("fig-stateless.svg", y + 26, "\n".join(b),
        "Each request re-sends the full conversation")


# ---------------------------------------------------------------- 7. quadratic cost chart
def fig_quadratic():
    prefix, per_turn, N = 20_000, 4_000, 40
    full, new = [], []
    cf = cn = 0
    for n in range(1, N + 1):
        cf += prefix + per_turn * n
        cn += (prefix if n == 1 else 0) + per_turn
        full.append(cf)
        new.append(cn)
    x0, y0, pw, ph = 80, 40, 560, 230
    ymax = 4_000_000
    sx = lambda n: x0 + (n - 1) / (N - 1) * pw
    sy = lambda v: y0 + ph - v / ymax * ph
    b = []
    for v in range(0, ymax + 1, 1_000_000):
        b.append(line(x0, sy(v), x0 + pw, sy(v)))
        b.append(text(x0 - 8, sy(v) + 4, f"{v / 1e6:g}M" if v else "0", 11, MUTED, "end", mono=True))
    for n in (1, 10, 20, 30, 40):
        b.append(text(sx(n), y0 + ph + 18, str(n), 11, MUTED, "middle", mono=True))
    b.append(text(x0 + pw / 2, y0 + ph + 38, "turn", 12, TXT2, "middle"))
    b.append(text(x0, y0 - 16, "cumulative input tokens sent", 12, TXT2))
    for series, col in ((full, BLUE), (new, ORANGE)):
        pts = " ".join(f"{sx(i + 1):.1f},{sy(v):.1f}" for i, v in enumerate(series))
        b.append(f'<polyline points="{pts}" fill="none" stroke="{col}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>')
        b.append(f'<circle cx="{sx(N):.1f}" cy="{sy(series[-1]):.1f}" r="4.5" fill="{col}" stroke="{BG}" stroke-width="2"/>')
    b.append(text(sx(N) + 10, sy(full[-1]) + 4, f"{full[-1] / 1e6:.1f}M", 12, TXT, weight=600))
    b.append(text(sx(N) + 10, sy(new[-1]) + 4, f"{new[-1] / 1e3:.0f}K", 12, TXT, weight=600))
    # legend
    lx, ly = x0 + 16, y0 + 8
    b.append(line(lx, ly, lx + 18, ly, BLUE, 2))
    b.append(text(lx + 26, ly + 4, "re-sent in full every turn (what actually happens)", 12, TXT2))
    b.append(line(lx, ly + 20, lx + 18, ly + 20, ORANGE, 2))
    b.append(text(lx + 26, ly + 24, "only the new tokens (if the model had memory)", 12, TXT2))
    b.append(text(30, y0 + ph + 64, "Illustrative: 20K-token prefix (system + tools), each turn adds 4K tokens of messages and tool traffic.", 12, MUTED))
    svg("fig-quadratic.svg", y0 + ph + 82, "\n".join(b),
        "Cumulative input tokens grow quadratically with the number of turns")


# ---------------------------------------------------------------- 8. effective context (RULER)
RULER = [
    ("Gemini-1.5-Pro", 1_000_000, 128_000, True), ("GLM4 (9B)", 1_000_000, 64_000, False),
    ("GradientAI/Llama3 (70B)", 1_000_000, 16_000, False), ("LWM (7B)", 1_000_000, 4_000, False),
    ("Yi (34B)", 200_000, 32_000, False), ("GPT-4", 128_000, 64_000, True),
    ("Llama3.1 (70B)", 128_000, 64_000, False), ("Qwen2 (72B)", 128_000, 32_000, False),
    ("Command-R-plus (104B)", 128_000, 32_000, False), ("Llama3.1 (8B)", 128_000, 32_000, False),
    ("Phi3-medium (14B)", 128_000, 32_000, False), ("Mixtral-8x22B (39B/141B)", 64_000, 32_000, False),
    ("Mistral-v0.2 (7B)", 32_000, 16_000, False), ("DBRX (36B/132B)", 32_000, 8_000, False),
    ("Together (7B)", 32_000, 4_000, False), ("LongChat (7B)", 32_000, 4_000, False),
    ("LongAlpaca (13B)", 32_000, 4_000, False),
]


def fig_ruler():
    x0, pw, y0, rh = 200, 440, 60, 22
    sx = lambda v: x0 + (math.log10(v) - 3) / 3 * pw
    h = y0 + len(RULER) * rh
    b = []
    for v, lab in ((1e3, "1K"), (1e4, "10K"), (1e5, "100K"), (1e6, "1M")):
        b.append(line(sx(v), y0 - 6, sx(v), h, HAIR))
        b.append(text(sx(v), h + 16, lab, 11, MUTED, "middle", mono=True))
    b.append(text(730, y0 - 12, "EFFECTIVE / CLAIMED", 9, MUTED, "end", mono=True))
    # legend
    b.append(rect(x0, 18, 12, 12, FREE, rx=2))
    b.append(text(x0 + 18, 29, "claimed context length", 12, TXT2))
    b.append(rect(x0 + 190, 18, 12, 12, BLUE, rx=2))
    b.append(text(x0 + 208, 29, "effective length (RULER)", 12, TXT2))
    for i, (name, claimed, eff, bold) in enumerate(RULER):
        y = y0 + i * rh
        b.append(text(x0 - 10, y + 14, name, 12, TXT if bold else TXT2, "end", 600 if bold else None))
        b.append(rect(sx(1e3), y + 3, sx(claimed) - sx(1e3), 13, FREE, rx=3))
        b.append(rect(sx(1e3), y + 3, sx(eff) - sx(1e3), 13, BLUE, rx=3))
        r = eff / claimed * 100
        b.append(text(730, y + 14, f"{r:g}%", 12, TXT2, "end", mono=True))
    b.append(text(30, h + 44, "Data: Hsieh et al., RULER (2024), as tabulated in Liu et al., A Comprehensive Survey on Long", 12, MUTED))
    b.append(text(30, h + 60, "Context Language Modeling (2025), §7.1.1. Log scale.", 12, MUTED))
    svg("fig-effective-context.svg", h + 76, "\n".join(b),
        "Claimed versus effective context length for seventeen models")


# ---------------------------------------------------------------- 9. window fills up
def fig_fill():
    x0, span, y = 30, 700, 70
    parts = [(6, SYS, "Sys"), (8, TOOLS, "Tools"), (3, USER, ""), (4, ASST, ""), (10, CALL, ""),
             (3, USER, ""), (4, ASST, ""), (11, CALL, ""), (3, ASST, "")]
    band0, band1 = x0 + 0.5 * span, x0 + 0.6 * span
    body, xend = segs(x0, y, 40, [(p / 100 * span, c, l) for p, c, l in parts], size=11)
    b = [body, rect(xend, y, x0 + span - xend, 40, FREE, rx=3)]
    b.append(rect(band0, y - 22, band1 - band0, 80, ACCENT, rx=0, extra=' fill-opacity="0.22"'))
    b.append(text((band0 + band1) / 2, y - 38, "50–60%: start a fresh session", 13, ACCENT, "middle", 600))
    ac = x0 + 0.92 * span
    b.append(line(ac, y - 22, ac, y + 48, TXT, 2))
    b.append(text(ac, y - 30, "autocompaction", 13, TXT, "middle"))
    for pct in (0, 25, 50, 75, 100):
        b.append(text(x0 + pct / 100 * span, y + 64, f"{pct}%", 11, MUTED, "middle", mono=True))
    svg("fig-window-fill.svg", 150, "\n".join(b),
        "Context window filling up, with the fresh-session zone and the autocompaction threshold")


# ---------------------------------------------------------------- 10. compaction
def fig_compaction():
    b = []
    y1, y2 = 30, 120
    b.append(text(30, y1 + 20, "BEFORE", 10, MUTED, mono=True))
    s, x = segs(100, y1, 30, [(40, SYS, "Sys"), (56, TOOLS, "Tools")], size=11)
    b.append(s)
    pattern = [USER, ASST, CALL, CALL, USER, ASST, CALL, ASST] * 3
    widths = [12, 14, 22, 16, 12, 14, 26, 14] * 3
    cut = 18
    start_x = cut_x = x
    for i, (c, w) in enumerate(zip(pattern, widths)):
        s, x = segs(x, y1, 30, [(w + 2, c, "")])
        b.append(s)
        if i == cut - 1:
            cut_x = x
    b.append(rect(x, y1, 730 - x, 30, FREE, rx=3))
    b.append(text(30, y2 + 20, "AFTER", 10, MUTED, mono=True))
    s, x = segs(100, y2, 30, [(40, SYS, "Sys"), (56, TOOLS, "Tools"), (110, SUMMARY, "Summary")], size=11)
    b.append(s)
    summ_mid = x - 58
    for c, w in zip(pattern[cut:], widths[cut:]):
        s, x = segs(x, y2, 30, [(w + 2, c, "")])
        b.append(s)
    b.append(rect(x, y2, 730 - x, 30, FREE, rx=3))
    b.append(text(100, y2 + 54, "Manual control: /compact [focus] summarizes now; /clear drops everything.", 12, MUTED))
    b.append(brace(start_x, cut_x - 2, y1 + 38, "", up=False))
    b.append(f'<path d="M{(start_x + cut_x) / 2:.1f},{y1 + 46} C{(start_x + cut_x) / 2:.1f},{y1 + 72} {summ_mid:.1f},{y1 + 60} {summ_mid:.1f},{y2 - 6}" '
             f'fill="none" stroke="{ACCENT}" stroke-width="1.5" marker-end="url(#ahA)"/>')
    b.append(text((start_x + cut_x) / 2 + 12, y1 + 70, "summarize", 13, ACCENT, weight=600))
    svg("fig-compaction.svg", 196, "\n".join(b),
        "Compaction replaces older turns with a summary")


# ---------------------------------------------------------------- 11. agent loop
def fig_loop():
    b = []
    T, A, O = (150, 110), (410, 110), (280, 250)
    for (cx, cy), lab in ((T, "Think"), (A, "Act"), (O, "Observe")):
        b.append(box(cx - 60, cy - 22, 120, 44, lab, fill="#2c3036", stroke=MUTED, size=15))
    b.append(f'<path d="M{T[0] + 20},{T[1] - 26} C{T[0] + 60},{T[1] - 80} {A[0] - 60},{A[1] - 80} {A[0] - 20},{A[1] - 26}" fill="none" stroke="{ACCENT}" stroke-width="1.8" marker-end="url(#ahA)"/>')
    b.append(text(280, 36, "decide the next step", 13, TXT2, "middle"))
    b.append(f'<path d="M{A[0] + 30},{A[1] + 24} C{A[0] + 50},{A[1] + 90} {O[0] + 110},{O[1] - 10} {O[0] + 64},{O[1] - 4}" fill="none" stroke="{ACCENT}" stroke-width="1.8" marker-end="url(#ahA)"/>')
    b.append(text(A[0] + 58, A[1] + 80, "call a tool", 13, TXT2))
    b.append(f'<path d="M{O[0] - 64},{O[1] - 4} C{T[0] - 30},{O[1] - 10} {T[0] - 50},{T[1] + 70} {T[0] - 30},{T[1] + 26}" fill="none" stroke="{ACCENT}" stroke-width="1.8" marker-end="url(#ahA)"/>')
    b.append(text(T[0] - 60, T[1] + 80, "not done:", 13, TXT2, "end"))
    b.append(text(T[0] - 60, T[1] + 97, "loop", 13, TXT2, "end"))
    b.append(arrow(O[0], O[1] + 24, O[0], O[1] + 58, ASST, "ahG", 1.8))
    b.append(text(O[0], O[1] + 78, "done: respond", 14, TXT, "middle", 600))
    # right-hand note
    b.append(text(578, 120, "“Done” means the", 13, TXT2))
    b.append(text(578, 139, "model replied without", 13, TXT2))
    b.append(text(578, 158, "requesting a tool:", 13, TXT2))
    b.append(text(578, 180, "stop_reason = end_turn", 11, TXT, mono=True))
    b.append(line(566, 104, 566, 190, ACCENT, 3))
    svg("fig-agent-loop.svg", 350, "\n".join(b), "The agent loop: think, act, observe")


# ---------------------------------------------------------------- 12. sequence diagram
def fig_sequence():
    cols = {"You": 90, "Harness": 270, "Model": 470, "Shell / files": 660}
    b = []
    for name, x in cols.items():
        b.append(box(x - 60, 20, 120, 34, name, fill="#2c3036", stroke=MUTED, size=14))
        b.append(line(x, 54, x, 470, HAIR))
    msgs = [
        ("You", "Harness", "“fix the failing test”", USER, "ahB"),
        ("Harness", "Model", "system + tools + history", TXT2, "ah"),
        ("Model", "Harness", "tool_use: bash(\"pytest -x\")", CALL, "ahY"),
        ("Harness", "Shell / files", "permission check, then run", TXT2, "ah"),
        ("Shell / files", "Harness", "stdout + exit code (truncated)", CALL, "ahY"),
        ("Harness", "Model", "history + tool_result", TXT2, "ah"),
        ("Model", "Harness", "tool_use: edit_file(…)", CALL, "ahY"),
    ]
    y = 86
    b.append(rect(200, 104, 540, 262, "none", rx=8, extra=f' stroke="{ACCENT}" stroke-dasharray="5 4"'))
    b.append(text(730, 122, "AGENT LOOP", 10, ACCENT, "end", mono=True))
    for i, (a, c, lab, col, mk) in enumerate(msgs):
        if i == 1:
            y = 140
        x1, x2 = cols[a], cols[c]
        d = 1 if x2 > x1 else -1
        b.append(arrow(x1 + 2 * d, y, x2 - 4 * d, y, col, mk, 1.6))
        b.append(text((x1 + x2) / 2, y - 7, lab, 12, TXT, "middle", mono="_" in lab or "(" in lab))
        y += 36
    b.append(text(370, 386, "… repeat until the model stops calling tools …", 12, MUTED, "middle"))
    b.append(arrow(cols["Model"] - 2, 414, cols["Harness"] + 4, 414, ASST, "ahG", 1.6))
    b.append(text(370, 407, "text, stop_reason = end_turn", 12, TXT, "middle", mono=True))
    b.append(arrow(cols["Harness"] - 2, 450, cols["You"] + 4, 450, ASST, "ahG", 1.6))
    b.append(text(180, 443, "“Fixed: the fixture was …”", 12, TXT, "middle"))
    svg("fig-sequence.svg", 486, "\n".join(b), "One turn of a coding agent, step by step")


# ---------------------------------------------------------------- 13. agent = model + harness
def fig_harness():
    b = [rect(24, 28, 712, 300, "none", rx=10, extra=f' stroke="{ACCENT}" stroke-dasharray="6 4"'),
         rect(38, 20, 76, 16, BG, rx=0), text(44, 32, "HARNESS", 11, ACCENT, mono=True)]
    parts = [
        (50, 50, "System prompt", "rules, persona, project config"),
        (290, 50, "Tools", "definitions + executors"),
        (530, 50, "The loop", "call, run, append, repeat"),
        (50, 250, "Context management", "compaction, caching"),
        (290, 250, "Permissions", "approvals, sandbox, hooks"),
        (530, 250, "Interface", "CLI, IDE, chat, memory"),
    ]
    mx, my, mw, mh = 290, 150, 180, 60
    for x, y, t, s in parts:
        b.append(box(x, y, 180, 58, t, s))
        sx, sy = x + 90, (y + 58 if y < 150 else y)
        tx = mx + mw / 2 + (sx - (mx + mw / 2)) * 0.45
        ty = my if y < 150 else my + mh
        b.append(arrow(sx, sy + (2 if y < 150 else -2), tx, ty + (-3 if y < 150 else 3), MUTED))
    b.append(rect(mx, my, mw, mh, "#101114", rx=8))
    b.append(text(mx + mw / 2, my + 28, "Model", 17, "#f2f3f5", "middle", 700))
    b.append(text(mx + mw / 2, my + 47, "weights + sampling", 11, MUTED, "middle"))
    svg("fig-harness.svg", 350, "\n".join(b), "An agent is a model plus a harness")


# ---------------------------------------------------------------- 14. subagents
def fig_subagents():
    b = [text(30, 32, "MAIN AGENT", 10, MUTED, mono=True)]
    main = [(40, SYS, ""), (36, TOOLS, ""), (26, USER, ""), (30, ASST, ""),
            (56, CALL, "task"), (80, CALL, "summary"), (30, ASST, "")]
    s, x = segs(30, 42, 30, main, size=11)
    b.append(s)
    b.append(rect(x, 42, 730 - x, 30, FREE, rx=3))
    b.append(text((x + 730) / 2, 62, "free space", 11, TXT2, "middle"))
    task_mid = 30 + 40 + 36 + 26 + 30 + 27
    summ_mid = 30 + 40 + 36 + 26 + 30 + 56 + 39
    rows = [(128, 12), (206, 9)]
    for k, (y, n) in enumerate(rows):
        b.append(text(30, y - 10, "SUBAGENT", 10, MUTED, mono=True))
        s, x = segs(30, y, 30, [(40, SYS, ""), (36, TOOLS, ""), (46, USER, "task")], size=11)
        b.append(s)
        sub_task_mid = 30 + 40 + 36 + 22
        for w in (14, 30, 18, 26, 14, 34, 18, 22, 14, 30, 20, 14)[:n]:
            s, x = segs(x, y, 30, [(w + 2, CALL, "")])
            b.append(s)
        s, x_end = segs(x + 10, y, 30, [(80, ASST, "summary")], size=11)
        b.append(s)
        b.append(text(x_end + 8, y + 20, "noisy work stays here", 12, MUTED))
        if k == 0:
            b.append(arrow(task_mid, 76, sub_task_mid, y - 4, ACCENT, "ahA", 1.3, dash=True))
            sm = x + 10 + 39
            b.append(f'<path d="M{sm:.1f},{y - 4} C{sm:.1f},{y - 40} {summ_mid:.1f},{y - 30} {summ_mid:.1f},{78}" '
                     f'fill="none" stroke="{ACCENT}" stroke-width="1.3" stroke-dasharray="4 3" marker-end="url(#ahA)"/>')
            b.append(text(sm + 12, 100, "only the conclusion returns", 12, ACCENT))
    svg("fig-subagents.svg", 256, "\n".join(b),
        "Subagents run noisy work in their own context and return only a summary")


def fig_worktrees():
    b = [rect(40, 95, 90, 60, "#101114", rx=8), text(85, 131, ".git", 16, "#f2f3f5", "middle", 600, mono=True),
         text(85, 176, "shared history", 11, MUTED, "middle"), text(85, 190, "and remotes", 11, MUTED, "middle")]
    trees = [("app/", "main"), ("app-auth/", "feature-auth"), ("app-flaky/", "fix-flaky-test")]
    for i, (d, br) in enumerate(trees):
        y = 20 + i * 76
        b.append(f'<path d="M130,125 C170,125 170,{y + 29} 210,{y + 29}" fill="none" stroke="{MUTED}" stroke-width="1"/>')
        b.append(rect(210, y, 220, 58, "#2c3036", rx=6, extra=f' stroke="{HAIR}"'))
        b.append(text(226, y + 24, d, 14, TXT, weight=600, mono=True))
        b.append(text(226, y + 44, f"branch {br}", 12, MUTED, mono=True))
    notes = ["Each worktree: own files,", "branch and working state.", "",
             "Shared: commit history", "and remotes.", "",
             "Run parallel sessions without", "them overwriting each other."]
    for i, s in enumerate(notes):
        b.append(text(470, 50 + i * 19, s, 13, TXT2))
    svg("fig-worktrees.svg", 250, "\n".join(b), "Git worktrees: one repository, several working directories")


# ---------------------------------------------------------------- 16. MCP
def fig_mcp():
    cx, cy = 380, 140
    b = [text(110, 26, "CLIENTS", 10, MUTED, "middle", mono=True),
         text(650, 26, "SERVERS", 10, MUTED, "middle", mono=True)]
    clients = ["Claude Code", "Cursor", "Copilot", "your own agent"]
    servers = ["GitHub", "Sentry", "PostgreSQL", "Slack", "Jira"]
    for i, c in enumerate(clients):
        y = 50 + i * 58
        b.append(f'<path d="M190,{y + 15} C280,{y + 15} 290,{cy} {cx - 44},{cy}" fill="none" stroke="{MUTED}" stroke-width="1"/>')
        b.append(box(30, y, 160, 30, c, size=13))
    for i, s in enumerate(servers):
        y = 42 + i * 48
        b.append(f'<path d="M{cx + 44},{cy} C470,{cy} 480,{y + 15} 570,{y + 15}" fill="none" stroke="{MUTED}" stroke-width="1"/>')
        b.append(box(570, y, 160, 30, s, size=13))
    b.append(f'<circle cx="{cx}" cy="{cy}" r="44" fill="{BLUE}"/>')
    b.append(text(cx, cy + 7, "MCP", 20, INK_ON, "middle", 700))
    b.append(text(cx, 292, "Write a server once; any client can use it.", 12, MUTED, "middle"))
    svg("fig-mcp.svg", 310, "\n".join(b), "MCP connects many clients to many tool servers through one protocol")


# ---------------------------------------------------------------- 17. hooks
def fig_hooks():
    y = 90
    steps = [("model picks a tool", None, False), ("PreToolUse", "block dangerous commands", True),
             ("tool runs", None, False), ("PostToolUse", "auto-format edited files", True),
             ("Notification", "alert when input is needed", True), ("Stop", "check the task is really done", True)]
    widths = [138, 104, 82, 108, 106, 60]
    gap = (W - 60 - sum(widths)) / (len(widths) - 1)
    x = 30
    centers = []
    b = [line(30, y, W - 30, y, HAIR, 1)]
    for (lab, sub, hook), w in zip(steps, widths):
        if hook:
            b.append(rect(x, y - 14, w, 28, ACCENT, rx=5))
            b.append(text(x + w / 2, y + 5, lab, 12, "#101114", "middle", 700))
        else:
            b.append(rect(x, y - 14, w, 28, BG, rx=14, extra=f' stroke="{MUTED}"'))
            b.append(text(x + w / 2, y + 5, lab, 12, TXT, "middle"))
        if sub:
            words = sub.split()
            mid = len(words) // 2
            b.append(text(x + w / 2, y + 36, " ".join(words[:mid]), 12, TXT2, "middle"))
            b.append(text(x + w / 2, y + 52, " ".join(words[mid:]), 12, TXT2, "middle"))
        centers.append(x + w / 2)
        x += w + gap
    b.append(f'<path d="M{centers[3]:.1f},{y - 16} C{centers[3] - 40:.1f},{y - 70} {centers[0] + 40:.1f},{y - 70} {centers[0]:.1f},{y - 16}" '
             f'fill="none" stroke="{MUTED}" stroke-width="1.3" marker-end="url(#ah)"/>')
    b.append(text((centers[0] + centers[3]) / 2, y - 60, "next iteration", 12, MUTED, "middle"))
    b.append(rect(30, 172, 12, 12, ACCENT, rx=2))
    b.append(text(48, 183, "hook event: your shell command runs here, every time", 12, TXT2))
    svg("fig-hooks.svg", 200, "\n".join(b), "Hook events at fixed points in the agent loop")


if __name__ == "__main__":
    for f in (fig_layers, fig_tokens, fig_temperature, fig_topp, fig_context, fig_stateless,
              fig_quadratic, fig_ruler, fig_fill, fig_compaction, fig_loop, fig_sequence,
              fig_harness, fig_subagents, fig_worktrees, fig_mcp, fig_hooks):
        f()
    print("figures written to", OUT)
