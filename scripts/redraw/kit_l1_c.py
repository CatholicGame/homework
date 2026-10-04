"""
Bộ vẽ riêng cho Vở BT Toán 1, Bài 13–18: mặt xúc xắc, hình tròn/tam giác/vuông,
bướm, cục tẩy, mũ vành, lọ hoa, bó hoa thuỷ tiên. Nét riêng, phẳng, viền INK.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

SW = 3


def st(w=SW):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def place(inner, x=0, y=0, s=1, flip=False, rot=0):
    sx = -s if flip else s
    return f'<g transform="translate({x} {y}) rotate({rot}) scale({sx} {s})">{inner}</g>'


# ── xúc xắc ────────────────────────────────────────────────────────────────
PIPS = {
    1: [(1, 1)],
    2: [(0, 0), (2, 2)],
    3: [(0, 0), (1, 1), (2, 2)],
    4: [(0, 0), (2, 0), (0, 2), (2, 2)],
    5: [(0, 0), (2, 0), (1, 1), (0, 2), (2, 2)],
    6: [(0, 0), (2, 0), (0, 1), (2, 1), (0, 2), (2, 2)],
    7: [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (0, 2), (1, 2)],
}


def die(x, y, size, n, fill=WHITE, pip=INK):
    """mặt xúc xắc: (x, y) = góc trên trái"""
    s = [f'<rect x="{x}" y="{y}" width="{size}" height="{size}" rx="{size * .14:.1f}" fill="{fill}" {st(SW)}/>']
    m = size * .24
    step = (size - 2 * m) / 2
    r = size * .085
    for cx, cy in PIPS[n]:
        s.append(f'<circle cx="{x + m + cx * step:.1f}" cy="{y + m + cy * step:.1f}" r="{r:.1f}" fill="{pip}"/>')
    return ''.join(s)


def box(x, y, size, txt=None, size_txt=None, fill=WHITE):
    s = f'<rect x="{x}" y="{y}" width="{size}" height="{size}" fill="{fill}" {st(2.4)}/>'
    if txt is not None:
        s += text(x + size / 2, y + size * .72, txt, size=size_txt or size * .62)
    return s


# ── hình đơn giản ──────────────────────────────────────────────────────────
def circ(cx, cy, r, fill=ORANGE):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" {st(2.6)}/>'


def tri(cx, cy, r, fill=WHITE):
    """tam giác đều tâm (cx, cy), cạnh ~ 1.8r"""
    h = r * 1.7
    return (f'<path d="M{cx},{cy - h * .62:.1f} L{cx + r:.1f},{cy + h * .38:.1f} L{cx - r:.1f},{cy + h * .38:.1f} Z" '
            f'fill="{fill}" {st(2.6)}/>')


def sq(cx, cy, a, fill=WHITE):
    return f'<rect x="{cx - a / 2}" y="{cy - a / 2}" width="{a}" height="{a}" rx="2" fill="{fill}" {st(2.6)}/>'


def frame(x, y, w, h, rx=22, fill=WHITE, sw=2.6):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" {st(sw)}/>'


# ── bướm (nhìn chính diện, tâm (0,0), rộng ~100) ───────────────────────────
def butterfly(wing=ORANGE, wing2=YELLOW):
    s = []
    for sg in (-1, 1):
        s.append(f'<path d="M0,-4 C{sg * 18},-40 {sg * 52},-46 {sg * 50},-18 C{sg * 48},-4 {sg * 26},2 0,2 Z" fill="{wing}" {st()}/>')
        s.append(f'<path d="M0,2 C{sg * 22},4 {sg * 42},14 {sg * 34},32 C{sg * 26},44 {sg * 8},34 0,8 Z" fill="{wing2}" {st()}/>')
        s.append(f'<circle cx="{sg * 30}" cy="-22" r="7" fill="{WHITE}" opacity=".85" {st(2)}/>')
        s.append(f'<circle cx="{sg * 20}" cy="20" r="4.5" fill="{WHITE}" opacity=".85" {st(1.8)}/>')
        s.append(f'<path d="M{sg * 2},-26 Q{sg * 8},-42 {sg * 16},-46" fill="none" {st(2.2)}/>')
        s.append(f'<circle cx="{sg * 16}" cy="-46" r="3" fill="{INK}"/>')
    s.append(f'<ellipse cx="0" cy="2" rx="5.5" ry="26" fill="#6B4A3A" {st(2.4)}/>')
    s.append(f'<circle cx="0" cy="-26" r="7.5" fill="#6B4A3A" {st(2.4)}/>')
    s.append(f'<circle cx="-2.6" cy="-27" r="1.6" fill="{WHITE}"/><circle cx="2.6" cy="-27" r="1.6" fill="{WHITE}"/>')
    return ''.join(s)


# ── hoa lan (một cành, chân cành ở (0,0), cao ~120) ─────────────────────────
def orchid(petal=PURPLE):
    s = [f'<path d="M0,0 Q-6,-50 2,-86" fill="none" stroke="{GRASS_D}" stroke-width="5" stroke-linecap="round"/>',
         f'<path d="M-2,-18 C-30,-22 -40,-40 -38,-50 C-22,-44 -8,-36 -2,-24 Z" fill="{GREEN}" {st(2.2)}/>',
         f'<path d="M0,-34 C26,-40 36,-58 34,-66 C18,-60 6,-50 0,-40 Z" fill="{GREEN}" {st(2.2)}/>']
    cy = -96
    for a in (-90, -18, 54, 126, 198):
        r = math.radians(a)
        px, py = 16 * math.cos(r), cy + 16 * math.sin(r)
        s.append(f'<ellipse cx="{px:.1f}" cy="{py:.1f}" rx="12" ry="8" transform="rotate({a} {px:.1f} {py:.1f})" fill="{petal}" {st(2.2)}/>')
    s.append(f'<circle cx="0" cy="{cy}" r="7" fill="{YELLOW}" {st(2.2)}/>')
    return ''.join(s)


# ── cục tẩy (nằm nghiêng, tâm (0,0), dài ~110) ─────────────────────────────
def eraser(c1=PINK, c2=BLUE):
    inner = (f'<rect x="-55" y="-17" width="62" height="34" rx="7" fill="{c1}" {st()}/>'
             f'<rect x="7" y="-17" width="48" height="34" rx="7" fill="{c2}" {st()}/>'
             f'<path d="M-46,-9 H-6" stroke="{WHITE}" stroke-width="4" stroke-linecap="round" opacity=".7"/>')
    return f'<g transform="rotate(-28)">{inner}</g>'


# ── mũ vành có nơ (đáy vành ở y=0, tâm x=0, rộng ~120) ─────────────────────
def sunhat(crown=YELLOW, ribbon=RED):
    s = [f'<ellipse cx="0" cy="-12" rx="60" ry="16" fill="{crown}" {st()}/>',
         f'<path d="M-32,-16 C-32,-56 32,-56 32,-16 Z" fill="{crown}" {st()}/>',
         f'<path d="M-32,-20 Q0,-12 32,-20 L32,-29 Q0,-21 -32,-29 Z" fill="{ribbon}" {st(2.4)}/>',
         f'<path d="M22,-24 L40,-36 L40,-14 Z" fill="{ribbon}" {st(2.2)}/>',
         f'<path d="M22,-24 L34,-4 L42,-8 Z" fill="{ribbon}" {st(2.2)}/>',
         f'<circle cx="22" cy="-24" r="5" fill="{ribbon}" {st(2.2)}/>',
         f'<path d="M-20,-42 Q-12,-48 -2,-48" fill="none" stroke="{WHITE}" stroke-width="3.5" stroke-linecap="round" opacity=".7"/>']
    return ''.join(s)


# ── lọ hoa (đáy ở y=0, tâm x=0, cao ~100) ──────────────────────────────────
def vase(fill=WHITE, band=TEAL, h=100):
    k = h / 100
    d = (f'M{-12 * k},{-100 * k} L{12 * k},{-100 * k} L{10 * k},{-80 * k} '
         f'C{38 * k},{-66 * k} {40 * k},{-16 * k} {20 * k},{-2 * k} L{18 * k},0 L{-18 * k},0 L{-20 * k},{-2 * k} '
         f'C{-40 * k},{-16 * k} {-38 * k},{-66 * k} {-10 * k},{-80 * k} Z')
    s = [f'<path d="{d}" fill="{fill}" {st()}/>',
         f'<ellipse cx="0" cy="{-100 * k}" rx="{15 * k}" ry="{4 * k}" fill="{fill}" {st(2.4)}/>',
         f'<path d="M{-30 * k},{-44 * k} Q0,{-36 * k} {30 * k},{-44 * k}" fill="none" stroke="{band}" stroke-width="{6 * k:.1f}" stroke-linecap="round"/>']
    return ''.join(s)


def flower_head(cx, cy, r=10, petal=PINK, center=YELLOW, n=5):
    s = []
    for i in range(n):
        a = -math.pi / 2 + i * 2 * math.pi / n
        s.append(f'<circle cx="{cx + r * .9 * math.cos(a):.1f}" cy="{cy + r * .9 * math.sin(a):.1f}" r="{r * .7:.1f}" fill="{petal}" {st(2)}/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .55:.1f}" fill="{center}" {st(2)}/>')
    return ''.join(s)


def vase_with_flowers(n, petal=PINK, vfill=BLUE):
    """lọ hoa (đáy y=0) cắm n bông hoa"""
    s = []
    tops = {1: [(0, -150)], 2: [(-20, -146), (20, -150)], 3: [(-38, -134), (38, -136), (0, -170)],
            4: [(-34, -138), (34, -140), (-10, -162), (14, -158)]}[n]
    for x, y in tops:
        s.append(f'<path d="M0,-96 Q{x * .3:.1f},{(y - 96) / 2:.1f} {x},{y}" fill="none" stroke="{GRASS_D}" stroke-width="4" stroke-linecap="round"/>')
    for x, y in tops:
        s.append(flower_head(x, y, 14, petal))
    s.append(vase(vfill, WHITE))
    return ''.join(s)


# ── bó hoa thuỷ tiên (chân bó ở (0,0), cao ~140) ───────────────────────────
def daffodils():
    s = []
    heads = [(-24, -112), (0, -132), (24, -114), (-10, -92), (14, -96)]
    for x, y in heads:
        s.append(f'<path d="M0,0 Q{x * .4:.1f},{y / 2:.1f} {x},{y}" fill="none" stroke="{GRASS_D}" stroke-width="4" stroke-linecap="round"/>')
    for sg in (-1, 1):
        s.append(f'<path d="M{sg * 2},0 C{sg * 16},-30 {sg * 30},-50 {sg * 40},-66 C{sg * 22},-50 {sg * 8},-30 {sg * -2},-8 Z" fill="{GREEN}" {st(2)}/>')
    for x, y in heads:
        s.append(flower_head(x, y, 11, WHITE, ORANGE, n=6))
    return ''.join(s)


# ── "Số ?": hình bầu dục có hai mặt xúc xắc, dây xuống ba ô trống ────────────
def dice_group(cx, top, a, b, d=72, bx=50, spread=74, boxes=True, by=None):
    """(cx, top) = giữa, mép trên hình bầu dục. Dây từ hai mặt xúc xắc và đáy hình bầu dục
    xuống ba ô (trái, cả nhóm, phải) ở cx - spread, cx, cx + spread; boxes=False chỉ vẽ dây
    tới y = by (ô trống là ô nhập của app ngay bên dưới)."""
    cy = top + 72
    s = [f'<ellipse cx="{cx}" cy="{cy}" rx="{d + 52}" ry="72" fill="{WHITE}" {st(2.6)}/>']
    by = by if by is not None else top + 190
    lx, rx_ = cx - d / 2 - 8, cx + d / 2 + 8
    for x0, n, bxc in ((lx, a, cx - spread), (rx_, b, cx + spread)):
        s.append(f'<line x1="{x0}" y1="{cy + d / 2}" x2="{bxc}" y2="{by}" stroke="{INK}" stroke-width="2.4"/>')
        s.append(die(x0 - d / 2, cy - d / 2, d, n))
    s.append(f'<line x1="{cx}" y1="{cy + 72}" x2="{cx}" y2="{by}" stroke="{INK}" stroke-width="2.4"/>')
    if boxes:
        for bxc in (cx - spread, cx, cx + spread):
            s.append(box(bxc - bx / 2, by, bx))
    return ''.join(s)


def staircase(n, cell=28, pitch=100, fill=ORANGE):
    """n cột, cột k có k ô vuông; mỗi cột nằm giữa một khoảng rộng pitch (thẳng hàng với
    n cột đều nhau của bảng ô trống bên dưới khi hình hiện rộng 100%). Trả về (W, H, parts)."""
    W, H = n * pitch, n * cell + 6
    s = []
    for k in range(1, n + 1):
        x = (k - 0.5) * pitch - cell / 2
        for j in range(k):
            s.append(f'<rect x="{x}" y="{H - 3 - (j + 1) * cell}" width="{cell}" height="{cell}" rx="3" fill="{fill}" {st(2.4)}/>')
    return W, H, s
