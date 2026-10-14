"""Generate the SVG figures for the zenv post.

Run from anywhere:  python3 make_figures.py
The figure is written next to this script, in the site's dark palette.
"""

from pathlib import Path

OUT = Path(__file__).parent

# ---------------------------------------------------------------- tokens
BG = "#22252a"        # figure card (same as code blocks)
HAIR = "#3a3e46"      # borders
BOX = "#2c3036"       # box fill
TXT = "#d7dae0"       # primary text
TXT2 = "#b9bdc6"      # secondary text
MUTED = "#7f8590"     # labels, notes
ACCENT = "#769dce"    # site link colour
MAC, HPC = "#3987e5", "#d95926"   # series colours (same blue/orange as the other posts)

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


def text(x, y, s, size=13, fill=TXT2, anchor="start", weight=None, mono=False):
    a = f' text-anchor="{anchor}"' if anchor != "start" else ""
    wgt = f' font-weight="{weight}"' if weight else ""
    fam = f' font-family="{MONO}"' if mono else ""
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{fill}"{a}{wgt}{fam}>{esc(s)}</text>'


def rect(x, y, w, h, fill, rx=6, stroke=HAIR):
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" stroke="{stroke}"/>'


def arrow(x1, y1, x2, y2, color=TXT2, marker="ah"):
    return (f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" '
            f'stroke-width="1.5" marker-end="url(#{marker})"/>')


def box(x, y, w, h, title, sub, mono_title=False):
    cx, cy = x + w / 2, y + h / 2
    return "\n".join([
        rect(x, y, w, h, BOX),
        text(cx, cy - 3, title, 13, TXT, "middle", 600, mono=mono_title),
        text(cx, cy + 14, sub, 11, MUTED, "middle"),
    ])


def fig_env_as_data():
    """zenv setup gathers the activation once; every later use reads the record."""
    top, bottom = 52, 256
    out = []

    # left: what setup gathers
    lx, lw, lh = 24, 196, 58
    out.append(text(lx, 36, "zenv setup, once", 12, MUTED))
    left = [
        ("module load", "env -0 before and after"),
        ("the venv", "VIRTUAL_ENV, bin/ on PATH"),
        ("env in zenv.json", "SIM_DATA and the like"),
    ]
    lys = [top, top + 73, top + 146]
    for (t, s), y in zip(left, lys):
        out.append(box(lx, y, lw, lh, t, s))

    # middle: the record
    mx, mw = 258, 262
    out.append(rect(mx, top, mw, bottom - top, BOX, stroke=ACCENT))
    out.append(text(mx + mw / 2, top + 24, "zenv-env.json", 13, TXT, "middle", 600, mono=True))
    x0 = mx + 16
    out.append(text(x0, top + 50, "module cache: what module load changed", 11, MUTED))
    out.append(text(x0, top + 68, "PATH, LD_LIBRARY_PATH, …", 11, TXT2, mono=True))
    out.append(text(x0, top + 96, "ops, applied in order", 11, MUTED))
    ops = [
        ("set", "VIRTUAL_ENV", "…/sim"),
        ("prepend", "PATH", "…/sim/bin"),
        ("unset", "PYTHONHOME", ""),
        ("set", "SIM_DATA", "/p/scratch/…"),
    ]
    for i, (op, name, val) in enumerate(ops):
        y = top + 116 + i * 19
        out.append(text(x0, y, op, 11, ACCENT, mono=True))
        out.append(text(x0 + 58, y, name, 11, TXT, mono=True))
        out.append(text(x0 + 142, y, val, 11, TXT2, mono=True))

    # arrows into the record
    for y in lys:
        out.append(arrow(lx + lw + 2, y + lh / 2, mx - 4, y + lh / 2))

    # right: what reads it
    rx, rw, rh = 558, 178, 42
    out.append(text(rx, 36, "every activation and run", 12, MUTED))
    right = [
        ("activate.sh", "bash, zsh"),
        ("activate.csh", "csh, tcsh"),
        ("activate.fish", "fish"),
        ("zenv run", "no shell; Jupyter kernels"),
    ]
    rys = [top, top + 54, top + 108, top + 162]
    for (t, s), y in zip(right, rys):
        out.append(box(rx, y, rw, rh, t, s, mono_title=True))
        out.append(arrow(mx + mw + 2, y + rh / 2, rx - 4, y + rh / 2, ACCENT, "ahA"))

    out.append(text(24, 288, "deactivate reads the same record and gives each variable it changed its previous value back.",
                    12, MUTED))
    svg("fig-env-as-data.svg", 306, "\n".join(out),
        "zenv setup records what activation does in zenv-env.json; the activation scripts and zenv run read that record")


def hbar(x, y, w, h, fill, r=4):
    """Horizontal bar, square at the baseline, rounded at the data end."""
    r = min(r, w, h / 2)
    return (f'<path d="M{x:.1f},{y:.1f} H{x + w - r:.1f} A{r},{r} 0 0 1 {x + w:.1f},{y + r:.1f} '
            f'V{y + h - r:.1f} A{r},{r} 0 0 1 {x + w - r:.1f},{y + h:.1f} H{x:.1f} Z" fill="{fill}"/>')


# Mean times in ms: (command, note, mac, hpc). None: not measured on that machine (the Mac has no modules).
# USE: one hyperfine run per machine with zenv 0.28.1 on 2026-10-14 (jureca: zenv-bench/res/jureca-hook-0.28.1.md),
# so true is from that run, not the table in "How fast it is". ACTIVATE: the login-shell runs with zenv 0.27.8.
USE = [
    ("true", "an empty process, for reference", 1.1, 2.5),
    ("zenv activate --auto .", "what the shell hook runs on cd", 1.9, 2.5),
]
ACTIVATE = [
    ("bash -l", "a login shell alone, for reference", None, 495),
    ("source $(zenv activate <env>)", "with the module cache", None, 525),
    ("module load …", "then source .venv/bin/activate, by hand", None, 1586),
]


def fig_speed():
    """Hero: mean time per command on the Mac and on the HPC system, in panels with their own scales."""
    x0, pw, rh, bh = 252, 410, 38, 11
    out = []

    out.append(text(24, 34, "Mean time per command, in milliseconds", 13, TXT, weight=600))
    lx = 500
    for col, lab in ((MAC, "Apple Silicon Mac"), (HPC, "HPC system")):
        out.append(f'<rect x="{lx}" y="24" width="10" height="10" rx="2" fill="{col}"/>')
        out.append(text(lx + 16, 34, lab, 12, TXT2))
        lx += 146

    def panel(top, title, rows, vmax, ticks):
        sx = lambda v: x0 + v / vmax * pw
        y0 = top + 14
        y1 = y0 + len(rows) * rh
        out.append(text(24, top, title, 12, MUTED))
        for v in ticks:
            out.append(f'<line x1="{sx(v):.1f}" y1="{y0 - 4}" x2="{sx(v):.1f}" y2="{y1}" stroke="{HAIR}" stroke-width="1"/>')
            lab = f"{v:,}" + (" ms" if v == ticks[-1] else "")
            out.append(text(sx(v), y1 + 16, lab, 11, MUTED, "middle", mono=True))
        for i, (cmd, note, *vals) in enumerate(rows):
            y = y0 + i * rh
            out.append(text(24, y + 13, cmd, 12, TXT, mono=True))
            out.append(text(24, y + 28, note, 11, MUTED))
            bars = [(v, col) for v, col in zip(vals, (MAC, HPC)) if v is not None]
            for j, (v, col) in enumerate(bars):
                # a lone bar sits in the middle of the row
                by = y + 4 + (j if len(bars) == 2 else 0.5) * (bh + 2)
                out.append(hbar(x0, by, sx(v) - x0, bh, col))
                # halo in the card colour, so a gridline behind the value breaks around it
                out.append(text(sx(v) + 6, by + bh - 1.5, f"{v:,}", 11, TXT2, mono=True)
                           .replace("<text ", f'<text stroke="{BG}" stroke-width="4" paint-order="stroke" ', 1))
        return y1 + 16

    end = panel(70, "Using an environment", USE, 3, [0, 1, 2, 3])
    end = panel(end + 40, "Activating an environment with modules in a login shell, HPC system only",
                ACTIVATE, 2000, [0, 500, 1000, 1500, 2000])

    # what was measured, and where, is in the caption in index.smd
    svg("fig-speed.svg", end + 24, "\n".join(out),
        "Mean time per command on a Mac and an HPC system: the shell hook's call to zenv takes 1.9 and 2.5 ms, "
        "close to an empty process; activating an environment with modules in a login shell takes 525 ms "
        "with zenv and 1,586 ms by hand, against 495 ms for the shell alone")


if __name__ == "__main__":
    fig_env_as_data()
    fig_speed()
