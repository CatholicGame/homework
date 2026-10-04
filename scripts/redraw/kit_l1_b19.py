"""
Kit riêng cho Vở bài tập Toán 1 — Bài 19–23 (g1_bai19.py … g1_bai23.py).

Sprites mới (nét riêng, phẳng, viền INK): cây dừa, áo khoác, xe đạp; thẻ chấm tròn
(dice card) và nhóm "hai thẻ trong một vòng" của bài "Số ?" (Bài 19, 21).
Mọi hàm trả về chuỗi SVG; đặt vào chỗ bằng place(x, y, s, svg).
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *


def st(w=2.6, c=INK):
    return f'stroke="{c}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def place(x, y, s, svg, flip=False):
    sx = -s if flip else s
    return f'<g transform="translate({x:.1f},{y:.1f}) scale({sx:.3f},{s:.3f})">{svg}</g>'


# ── Sprites (gốc toạ độ = giữa chân, y=0 là mặt đất) ─────────────────────────

def palm():
    """Cây dừa: cao ~96, rộng ~84, gốc (0,0)."""
    s = [f'<path d="M-6,0 C-4,-30 -2,-56 6,-78 L13,-76 C6,-54 4,-30 6,0 Z" fill="{BROWN}" {st(2.4)}/>']
    for y in (-14, -28, -42, -56, -68):
        s.append(f'<path d="M{-5 + (-y) * .1:.1f},{y} q6,2 11,0" fill="none" stroke="{INK}" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>')
    leaves = [(-150, 42), (-120, 40), (-60, 40), (-30, 42), (-90, 30), (-175, 34), (-5, 34)]
    cx, cy = 9, -80
    for ang, L in leaves:
        a = math.radians(ang)
        ex, ey = cx + L * math.cos(a), cy + L * math.sin(a) + (L * .35 if abs(ang + 90) > 40 else 0)
        mx, my = cx + L * .55 * math.cos(a), cy + L * .55 * math.sin(a) - 8
        nx, ny = -math.sin(a) * 7, math.cos(a) * 7
        s.append(f'<path d="M{cx},{cy} Q{mx + nx:.1f},{my + ny:.1f} {ex:.1f},{ey:.1f} Q{mx - nx:.1f},{my - ny - 4:.1f} {cx},{cy} Z" fill="{GREEN}" {st(2.2)}/>')
    s.append(f'<circle cx="{cx - 4}" cy="{cy + 6}" r="5" fill="{BROWN}" {st(1.8)}/><circle cx="{cx + 5}" cy="{cy + 7}" r="5" fill="{BROWN}" {st(1.8)}/>')
    return ''.join(s)


def jacket(col=BLUE, trim='#4E8FC8'):
    """Áo khoác treo trên móc: rộng ~64, cao ~70, gốc giữa vạt áo (0,0)."""
    s = [f'<path d="M0,-66 q0,-8 6,-8 q6,0 5,6 l-11,8" fill="none" {st(2)}/>']
    s.append(f'<path d="M-14,-58 L-28,-52 L-34,-6 L-24,-4 L-21,-36 L-20,0 L20,0 L21,-36 L24,-4 L34,-6 L28,-52 L14,-58 Q0,-50 -14,-58 Z" fill="{col}" {st(2.4)}/>')
    s.append(f'<path d="M-14,-58 L-6,-44 L0,-50 L6,-44 L14,-58" fill="{trim}" {st(2)}/>')
    s.append(f'<path d="M0,-50 L0,0" {st(2)} fill="none"/>')
    for y in (-38, -26, -14):
        s.append(f'<circle cx="4" cy="{y}" r="1.8" fill="{INK}"/>')
    s.append(f'<path d="M-20,-8 L20,-8" stroke="{trim}" stroke-width="3"/>')
    s.append(f'<path d="M-17,-24 h9" {st(1.8)} fill="none"/>')
    return ''.join(s)


def bike(col=RED):
    """Xe đạp nhìn ngang, đầu xe bên phải: rộng ~84, cao ~54, gốc giữa (0,0)."""
    s = []
    for x in (-26, 26):
        s.append(f'<circle cx="{x}" cy="-17" r="16" fill="{WHITE}" {st(2.8)}/><circle cx="{x}" cy="-17" r="3" fill="{INK}"/>')
    s.append(f'<path d="M-26,-17 L-6,-17 L-12,-38 M-6,-17 L16,-38 L-12,-38 M16,-38 L26,-17 M16,-38 L14,-48 L22,-50" fill="none" stroke="{col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>')
    s.append(f'<path d="M-19,-42 L-6,-42" {st(4)} fill="none"/>')
    s.append(f'<circle cx="-6" cy="-17" r="4" fill="{GREY}" {st(1.6)}/>')
    return ''.join(s)


# ── Thẻ chấm tròn ─────────────────────────────────────────────────────────────

# Cách xếp chấm như trong sách (hàng, cột trên lưới); w = số cột.
DOT_LAYOUTS = {
    0: [],
    1: [(1, 1)],
    2: [(0, 1), (2, 1)],            # dọc
    '2d': [(0, 0), (2, 2)],         # chéo
    3: [(0, 0), (1, 1), (2, 2)],
    4: [(0, 0), (0, 2), (2, 0), (2, 2)],
    5: [(0, 0), (0, 2), (1, 1), (2, 0), (2, 2)],
    6: [(r, c) for r in range(3) for c in (0, 2)],
    7: [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (2, 0), (2, 1)],
    8: [(r, c) for r in range(3) for c in range(3)][:8],
    9: [(r, c) for r in range(3) for c in range(3)],
    10: [(0, 0), (0, 1), (0, 2), (0, 3), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)],
}


def dot_card(x, y, key, h=78, dot=RED):
    """Thẻ có chấm, (x, y) = góc trên trái. Trả về (svg, w)."""
    pts = DOT_LAYOUTS[key]
    cols = 4 if key == 10 else 3
    wide = key in (7, 8, 9, 10)
    narrow = key in (1, 2) and False
    pitch = 24
    w = (cols * pitch + 14) if wide else 78
    if key == 0:
        w = 50
    s = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="9" fill="{WHITE}" {st(2.6)}/>']
    if wide:
        ox = x + (w - (cols - 1) * pitch) / 2
    else:
        ox = x + w / 2 - pitch
    oy = y + h / 2 - pitch
    for r, c in pts:
        s.append(f'<circle cx="{ox + c * pitch:.1f}" cy="{oy + r * pitch:.1f}" r="8.5" fill="{dot}" {st(2)}/>')
    return ''.join(s), w


def dice_group(name, left, right, W=320, H=200, ring=CREAM):
    """Một vòng chứa hai thẻ chấm; ba dây đi xuống mép dưới:
    dây trái (từ thẻ trái) ở x=W/6, dây giữa (từ vòng) ở x=W/2, dây phải ở 5W/6.
    Ô trống do trang web vẽ ngay dưới hình, thẳng hàng với ba đầu dây."""
    ch = 78
    cy = 76
    lw = dot_card(0, 0, left)[1]
    rw = dot_card(0, 0, right)[1]
    gap = 18
    total = lw + gap + rw
    lx = W / 2 - total / 2
    rx = lx + lw + gap
    parts = [f'<ellipse cx="{W / 2}" cy="{cy}" rx="{W / 2 - 6}" ry="70" fill="{ring}" {st(2.6)}/>']
    lsvg, _ = dot_card(lx, cy - ch / 2, left)
    rsvg, _ = dot_card(rx, cy - ch / 2, right)
    parts += [lsvg, rsvg]
    xs = [W / 6, W / 2, 5 * W / 6]
    lc, rc = lx + lw / 2, rx + rw / 2
    yb = cy + ch / 2
    # dây: từ đáy thẻ / đáy vòng xuống, gấp khúc về đúng cột của ô
    parts.append(f'<path d="M{lc:.1f},{yb} L{lc:.1f},{H - 30} L{xs[0]:.1f},{H - 22} L{xs[0]:.1f},{H}" fill="none" {st(2.4)}/>')
    parts.append(f'<path d="M{xs[1]:.1f},{cy + 70} L{xs[1]:.1f},{H}" fill="none" {st(2.4)}/>')
    parts.append(f'<path d="M{rc:.1f},{yb} L{rc:.1f},{H - 30} L{xs[2]:.1f},{H - 22} L{xs[2]:.1f},{H}" fill="none" {st(2.4)}/>')
    save(name, W, H, parts, folder='grade1-workbook')


# ── Đồ vật dùng lại từ các kit chung, quy về gốc giữa chân (0,0) ──────────────
import kit_g9, kit_g8, kit_p2, kit_g6, kit_g4

# (svg ở gốc giữa chân, rộng, cao) — kích thước "tự nhiên" để tính tỉ lệ
SPRITES = {
    'duck': (lambda: kit_g9.duck(), 64, 58),
    'palm': (palm, 86, 100),
    'squirrel': (lambda: f'<g transform="translate(-46,-80)">{kit_g8.squirrel_icon()}</g>', 92, 82),
    'horse': (lambda: f'<g transform="translate(-205,-266)">{kit_p2.horse()}</g>', 380, 260),
    'flower': (lambda: kit_g6.flower(0, 0, 1.0, petal=PINK), 36, 66),
    'jacket': (jacket, 70, 78),
    'pear': (lambda: kit_g4.s_pear(0, 0, 50), 34, 56),
    'bike': (bike, 86, 54),
}


def group(kind, rows, cx, cy, bw, bh, fill=1.0):
    """Xếp các đồ vật theo hàng (rows = số con mỗi hàng) vào hộp bw×bh tâm (cx, cy)."""
    fn, w, h = SPRITES[kind]
    n = max(rows)
    cw, rh = bw / n, bh / len(rows)
    s = min(cw / w, rh / h) * .9 * fill
    out = []
    for r, k in enumerate(rows):
        y = cy - bh / 2 + rh * (r + 1) - rh * .08
        x0 = cx - cw * (k - 1) / 2
        for i in range(k):
            out.append(place(x0 + cw * i, y, s, fn()))
    return ''.join(out)
