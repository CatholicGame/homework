"""
Vở BT Toán 3 Tập hai, Bài 50 (Chu vi hình tam giác, hình tứ giác, hình chữ nhật,
hình vuông): các hình học vẽ lại bằng SVG, đúng số đo và bố cục của sách.
  bai50_t1_q3_cards   miếng bìa tam giác (15, 15, 12 cm) và tứ giác (15, 20, 30, 20 cm)
  bai50_t1_q4_shapes  tam giác đều 7 cm, tứ giác 3-4-5-6 cm, hình thang 4-4-4-7 cm
  bai50_t3_q1_rect / _square / _quad   ba hình của bài nối chu vi
  bai50_t3_q3_fence   vườn hoa 8 m x 4 m, lối vào 1 m
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

F = 'grade3-workbook-2'
LINE = '#00AEEF'
FILL = '#9FDAF5'
DARK = '#231F20'


def poly(pts, fill='none', stroke=DARK, sw=3):
    p = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return f'<polygon points="{p}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"/>'


LS = [22]


def side_label(p, q, s, off=None, size=None, inside=None, flip=False):
    """label s along segment p-q, offset to the outer side (away from `inside` point)"""
    size = size or LS[0]
    off = (off or 16) * size / 17
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
    dx, dy = q[0] - p[0], q[1] - p[1]
    L = math.hypot(dx, dy)
    nx, ny = -dy / L, dx / L
    if inside is not None and (inside[0] - mx) * nx + (inside[1] - my) * ny > 0:
        nx, ny = -nx, -ny
    ang = math.degrees(math.atan2(dy, dx))
    if ang > 90:
        ang -= 180
    if ang < -90:
        ang += 180
    x, y = mx + nx * off, my + ny * off + size * 0.35
    if abs(ang) < 1:
        return text(f'{x:.1f}', f'{y:.1f}', s, size=size, weight=500, fill=DARK)
    return text(f'{x:.1f}', f'{y:.1f}', s, size=size, weight=500, fill=DARK,
                extra=f' transform="rotate({ang:.1f} {x:.1f} {y - size * 0.35:.1f})"')


def centroid(pts):
    return (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))


def quad_from_sides(bottom, left, top, right, left_angle_deg, scale):
    """bottom-left origin; returns [BL, TL, TR, BR] in screen coords (y down), closed with given sides"""
    b, l, t, r = bottom * scale, left * scale, top * scale, right * scale
    a = math.radians(left_angle_deg)
    BL = (0.0, 0.0)
    BR = (b, 0.0)
    TL = (l * math.cos(a), l * math.sin(a))
    # TR: |TR-TL| = t, |TR-BR| = r  (circle intersection, take upper point)
    dx, dy = BR[0] - TL[0], BR[1] - TL[1]
    d = math.hypot(dx, dy)
    aa = (t * t - r * r + d * d) / (2 * d)
    h = math.sqrt(max(0.0, t * t - aa * aa))
    mx, my = TL[0] + aa * dx / d, TL[1] + aa * dy / d
    c1 = (mx + h * dy / d, my - h * dx / d)
    c2 = (mx - h * dy / d, my + h * dx / d)
    TR = c1 if c1[1] > c2[1] else c2
    return [BL, TL, TR, BR]


def place(pts, ox, oy):
    return [(ox + x, oy - y) for x, y in pts]


# ── Tiết 1 Q3: two cardboard pieces ──────────────────────────────────────────
def cards():
    W, H = 560, 262
    s = 9.0
    parts = []
    # triangle 15, 15, base 12
    base, side = 12 * s, 15 * s
    h = math.sqrt(side ** 2 - (base / 2) ** 2)
    x0, yb = 30, 205
    T = [(x0, yb), (x0 + base / 2, yb - h), (x0 + base, yb)]
    parts.append(poly(T, fill=FILL, stroke=LINE, sw=2))
    c = centroid(T)
    parts.append(side_label(T[0], T[1], '15 cm', inside=c))
    parts.append(side_label(T[1], T[2], '15 cm', inside=c))
    parts.append(side_label(T[0], T[2], '12 cm', off=22, inside=c))
    # trapezoid: base 30, top 15, legs 20
    b, t, l = 30 * s, 15 * s, 20 * s
    off = (b - t) / 2
    hh = math.sqrt(l ** 2 - off ** 2)
    x1 = 210
    Q = [(x1, yb), (x1 + off, yb - hh), (x1 + off + t, yb - hh), (x1 + b, yb)]
    parts.append(poly(Q, fill=FILL, stroke=LINE, sw=2))
    c = centroid(Q)
    parts.append(side_label(Q[1], Q[2], '15 cm', inside=c, off=13))
    parts.append(side_label(Q[0], Q[1], '20 cm', inside=c))
    parts.append(side_label(Q[2], Q[3], '20 cm', inside=c))
    parts.append(side_label(Q[0], Q[3], '30 cm', off=22, inside=c))
    save('bai50_t1_q3_cards', W, H, parts, folder=F)


# ── Tiết 1 Q4: three shapes to colour ────────────────────────────────────────
def shapes():
    W, H = 640, 372
    s = 22.0
    parts = []
    # equilateral triangle 7 cm
    a = 7 * s
    h = a * math.sqrt(3) / 2
    T = [(40, 155), (40 + a / 2, 155 - h), (40 + a, 155)]
    c = centroid(T)
    parts.append(poly(T, fill=WHITE))
    for p, q in ((T[0], T[1]), (T[1], T[2]), (T[0], T[2])):
        parts.append(side_label(p, q, '7 cm', inside=c, off=20 if p[1] == q[1] else 16))
    # quadrilateral bottom 6, left 3, top 4, right 5
    Qr = quad_from_sides(6, 3, 4, 5, 68, s)
    Q = place(Qr, 440, 155)
    c = centroid(Q)
    parts.append(poly(Q, fill=WHITE))
    parts.append(side_label(Q[0], Q[3], '6 cm', inside=c, off=20))
    parts.append(side_label(Q[0], Q[1], '3 cm', inside=c))
    parts.append(side_label(Q[1], Q[2], '4 cm', inside=c))
    parts.append(side_label(Q[2], Q[3], '5 cm', inside=c))
    # trapezoid top 4, legs 4, base 7
    b, t, l = 7 * s, 4 * s, 4 * s
    off = (b - t) / 2
    hh = math.sqrt(l ** 2 - off ** 2)
    x1, yb = 240, 322
    Z = [(x1, yb), (x1 + off, yb - hh), (x1 + off + t, yb - hh), (x1 + b, yb)]
    c = centroid(Z)
    parts.append(poly(Z, fill=WHITE))
    parts.append(side_label(Z[1], Z[2], '4 cm', inside=c, off=13))
    parts.append(side_label(Z[0], Z[1], '4 cm', inside=c))
    parts.append(side_label(Z[2], Z[3], '4 cm', inside=c))
    parts.append(side_label(Z[0], Z[3], '7 cm', inside=c, off=22))
    save('bai50_t1_q4_shapes', W, H, parts, folder=F)


# ── Tiết 3 Q1: three figures of the "nối" ────────────────────────────────────
PANEL = '#BEE6F8'


def panel(W, H):
    return f'<rect x="2" y="2" width="{W - 4}" height="{H - 4}" rx="18" fill="{PANEL}"/>'


def match_figs():
    W, H = 250, 220
    LS[0] = 26
    # rectangle 6 x 3
    k = 24
    w, h = 6 * k, 3 * k
    x0, y0 = 76, 58
    R = [(x0, y0), (x0 + w, y0), (x0 + w, y0 + h), (x0, y0 + h)]
    c = centroid(R)
    save('bai50_t3_q1_rect', W, H, [panel(W, H), poly(R, fill=WHITE),
         side_label(R[3], R[0], '3 cm', inside=c), side_label(R[2], R[3], '6 cm', inside=c, off=22)], folder=F)
    # square 8
    a = 150
    x0, y0 = (W - a) / 2, 14
    S = [(x0, y0), (x0 + a, y0), (x0 + a, y0 + a), (x0, y0 + a)]
    c = centroid(S)
    save('bai50_t3_q1_square', W, H, [panel(W, H), poly(S, fill=WHITE),
         side_label(S[2], S[3], '8 cm', inside=c, off=20)], folder=F)
    # quadrilateral 3-4-5-7 (bottom 7, left 3, top 4, right 5)
    Qr = quad_from_sides(7, 3, 4, 5, 78, 26)
    Q = place(Qr, 36, 160)
    c = centroid(Q)
    save('bai50_t3_q1_quad', W, H, [panel(W, H), poly(Q, fill=WHITE),
         side_label(Q[0], Q[3], '7 cm', inside=c, off=22), side_label(Q[0], Q[1], '3 cm', inside=c),
         side_label(Q[1], Q[2], '4 cm', inside=c), side_label(Q[2], Q[3], '5 cm', inside=c)], folder=F)
    LS[0] = 22


# ── Tiết 3 Q3: the fence with a 1 m gate ─────────────────────────────────────
def fence():
    W, H = 470, 250
    k = 45
    x0, y0 = 80, 36
    x1, y1 = x0 + 8 * k, y0 + 4 * k
    g0, g1 = x0 + 1 * k, x0 + 2 * k
    parts = [
        f'<path d="M{g0},{y1} H{x0} V{y0} H{x1} V{y1} H{g1}" fill="none" stroke="{DARK}" stroke-width="3" stroke-linejoin="miter"/>',
        f'<line x1="{g0}" y1="{y1 - 9}" x2="{g0}" y2="{y1 + 9}" stroke="{DARK}" stroke-width="2.4"/>',
        f'<line x1="{g1}" y1="{y1 - 9}" x2="{g1}" y2="{y1 + 9}" stroke="{DARK}" stroke-width="2.4"/>',
        text((x0 + x1) / 2, y0 - 12, '8 m', size=19, weight=500, fill=DARK),
        text(x0 - 26, (y0 + y1) / 2 + 7, '4 m', size=19, weight=500, fill=DARK),
        text((g0 + g1) / 2, y1 - 10, '1 m', size=19, weight=500, fill=DARK),
    ]
    save('bai50_t3_q3_fence', W, H, parts, folder=F)


if __name__ == '__main__':
    cards()
    shapes()
    match_figs()
    fence()
