"""
Vở BT Toán 3 Tập hai, Bài 53 (Luyện tập chung): các hình của bài, nét riêng.
Giữ nội dung toán: tấm thảm 2 × 2; ba mảnh đất rào cọc cách nhau 1 m
(A: 4 × 3 khoảng, B: 5 × 4, C: 4 × 4); hình A, B, C trên lưới 1 cm²;
hình M; ba mảnh giấy 10 × 8, 9 × 8, 9 × 9.

    python scripts/redraw/g3t2_bai53_figures.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

FOLDER = 'grade3-workbook-2'
DARK = '#231F20'
CYAN = '#00AEEF'


def lab(x, y, s, size=20, anchor='middle', weight=500, fill=DARK, extra=''):
    return text(x, y, s, size=size, weight=weight, fill=fill, anchor=anchor, extra=extra)


def rect(x, y, w, h, fill='none', stroke=DARK, sw=2.5):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'


def line(x1, y1, x2, y2, stroke=DARK, sw=2.5):
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round"/>'


# ── Tiết 1 Q3: 4 tấm thảm vuông ghép thành hình vuông ───────────────────────
def t1_q3():
    s = 90
    x0, y0 = 12, 12
    p = []
    for r in range(2):
        for c in range(2):
            x, y = x0 + c * s, y0 + r * s
            p.append(rect(x, y, s, s, fill='#1C7FA6', stroke='#0E4E68', sw=3))
            # hoa văn thảm: ô trám nhỏ
            for i in range(3):
                for j in range(3):
                    cx, cy = x + 15 + i * 30, y + 15 + j * 30
                    p.append(f'<path d="M{cx},{cy - 8} L{cx + 8},{cy} L{cx},{cy + 8} L{cx - 8},{cy} Z" fill="none" stroke="#7FD0F2" stroke-width="1.6" opacity=".7"/>')
    save('bai53_t1_q3_carpet', x0 * 2 + 2 * s, y0 * 2 + 2 * s, p, folder=FOLDER)


# ── Tiết 1 Q4: ba mảnh đất có rào, hai cọc cạnh nhau cách nhau 1 m ──────────
def plot(ox, oy, a, b, name, flower):
    """oblique view: side a along x (1 m = 42 px), side b going back-right (1 m = 26 px at 30°)."""
    ux, bx, by = 46, 30, -20
    H = 30   # post height
    P = lambda i, j: (ox + i * ux + j * bx, oy + j * by)
    s = []
    corners = [P(0, 0), P(a, 0), P(a, b), P(0, b)]
    s.append('<polygon points="' + ' '.join(f'{x:.1f},{y:.1f}' for x, y in corners) + '" fill="#8FCB6B" stroke="#5DAF5B" stroke-width="2"/>')
    # flowers on the bed
    import random
    random.seed(len(name) * 7 + a * 3 + b)
    for i in range(a * b * 2):
        fi, fj = random.uniform(0.3, a - 0.3), random.uniform(0.3, b - 0.3)
        x, y = P(fi, fj)
        s.append(f'<circle cx="{x:.1f}" cy="{y - 4:.1f}" r="5" fill="{flower}" stroke="{INK}" stroke-width="1"/><circle cx="{x:.1f}" cy="{y - 4:.1f}" r="1.8" fill="{YELLOW}"/>')
    posts = set()
    for i in range(a + 1):
        posts.add((i, 0)); posts.add((i, b))
    for j in range(b + 1):
        posts.add((0, j)); posts.add((a, j))
    back = sorted([q for q in posts], key=lambda q: -q[1])
    # rails (top and middle) along the 4 sides
    for hh in (H, H * 0.45):
        pts = [P(0, 0), P(a, 0), P(a, b), P(0, b), P(0, 0)]
        s.append('<polyline points="' + ' '.join(f'{x:.1f},{y - hh:.1f}' for x, y in pts) + f'" fill="none" stroke="#8B5A2B" stroke-width="3" stroke-linejoin="round"/>')
    for i, j in back:
        x, y = P(i, j)
        s.append(f'<line x1="{x:.1f}" y1="{y + 3:.1f}" x2="{x:.1f}" y2="{y - H - 4:.1f}" stroke="#6B4423" stroke-width="5" stroke-linecap="round"/>')
        s.append(f'<line x1="{x:.1f}" y1="{y + 3:.1f}" x2="{x:.1f}" y2="{y - H - 4:.1f}" stroke="#C08A55" stroke-width="2.4" stroke-linecap="round"/>')
    cx, cy = P(a / 2, 0)
    s.append(lab(cx, cy + 34, name, 26, weight=700, extra=' font-style="italic"'))
    return ''.join(s)


def t1_q4():
    p = [f'<rect x="0" y="0" width="820" height="350" rx="18" fill="#DDF1D2"/>',
         f'<path d="M0,215 C200,195 420,235 820,180 L820,222 C440,275 200,235 0,258 Z" fill="#F1E3C6"/>',
         plot(40, 175, 4, 3, 'A', PINK),
         plot(460, 150, 5, 4, 'B', '#FFFFFF'),
         plot(250, 305, 4, 4, 'C', '#F7D6F0')]
    save("bai53_t1_q4_plots", 820, 350, p, folder=FOLDER)


# ── Tiết 2 Q3: hình A (nhà), B, C trên lưới ô vuông 1 cm² ───────────────────
def t2_q3():
    u = 36
    cols, rows = 18, 7
    x0, y0 = 70, 16
    p = []
    for i in range(cols + 1):
        p.append(line(x0 + i * u, y0 - 6, x0 + i * u, y0 + rows * u + 6, stroke='#A7ADB5', sw=1.2))
    for j in range(rows + 1):
        p.append(line(x0 - 6, y0 + j * u, x0 + cols * u + 6, y0 + j * u, stroke='#A7ADB5', sw=1.2))
    G = lambda c, r: (x0 + c * u, y0 + r * u)
    # sample 1 cm² square
    sx, sy = G(1, 6)
    p.append(f'<rect x="{sx}" y="{sy}" width="{u}" height="{u}" fill="#6CC4EA"/>')
    p.append(lab(sx - 6, sy + u - 6, '1 cm²', 19, anchor='end'))
    # A: rectangle cols 1..5 rows 4..7 (4 × 3) + triangle apex at (3, 1)
    pts = [G(1, 7), G(5, 7), G(5, 4), G(3, 1), G(1, 4)]
    p.append('<polygon points="' + ' '.join(f'{x},{y}' for x, y in pts) + f'" fill="none" stroke="#1B9AD6" stroke-width="3.5" stroke-linejoin="round"/>')
    # B: cols 6..12 rows 4..7 (6 × 3); C: cols 13..17 rows 3..7 (4 × 4)
    bx, by = G(6, 3)
    p.append(f'<rect x="{bx}" y="{by + u}" width="{6 * u}" height="{3 * u}" fill="none" stroke="#1B9AD6" stroke-width="3.5"/>')
    cx, cy = G(13, 2)
    p.append(f'<rect x="{cx}" y="{cy + u}" width="{4 * u}" height="{4 * u}" fill="none" stroke="#1B9AD6" stroke-width="3.5"/>')

    def badge(x, y, t):
        return f'<circle cx="{x}" cy="{y}" r="15" fill="#FFFFFF" stroke="{DARK}" stroke-width="2"/>' + lab(x, y + 7, t, 20)
    p.append(badge(*G(3, 5.3), 'A'))
    p.append(badge(*G(9, 5.3), 'B'))
    p.append(badge(*G(15, 4.8), 'C'))
    save('bai53_t2_q3_grid', x0 + cols * u + 16, y0 + rows * u + 16, p, folder=FOLDER)


# ── Tiết 3 Q2: hình M = ABCD (4 × 7) + DEGH (10 × 5) ────────────────────────
def t3_q2():
    u = 20
    x0, y0 = 70, 30
    p = [rect(x0, y0 + 7 * u, 10 * u, 5 * u, fill='#FFFFFF'),
         rect(x0, y0, 4 * u, 7 * u, fill='#FFFFFF'),
         lab(x0 - 10, y0 + 2, 'A', anchor='end'), lab(x0 + 4 * u + 8, y0 + 2, 'B', anchor='start'),
         lab(x0 + 2 * u, y0 - 8, '4 cm'),
         lab(x0 - 10, y0 + 3.5 * u + 7, '7 cm', anchor='end'),
         lab(x0 - 10, y0 + 7 * u + 4, 'D', anchor='end'), lab(x0 + 4 * u + 8, y0 + 7 * u - 6, 'C', anchor='start'),
         lab(x0 + 10 * u + 10, y0 + 7 * u + 4, 'E', anchor='start'),
         lab(x0 - 10, y0 + 9.5 * u + 7, '5 cm', anchor='end'),
         lab(x0 - 10, y0 + 12 * u + 8, 'H', anchor='end'), lab(x0 + 10 * u + 10, y0 + 12 * u + 8, 'G', anchor='start'),
         lab(x0 + 5 * u, y0 + 12 * u + 26, '10 cm'),
         lab(x0 + 5 * u, y0 + 12 * u + 56, 'Hình M', 20, extra=' font-style="italic"')]
    save('bai53_t3_q2_M', x0 + 10 * u + 50, y0 + 12 * u + 66, p, folder=FOLDER)


# ── Tiết 3 Q3: ba mảnh giấy 10 × 8, 9 × 8, 9 × 9 ─────────────────────────────
def t3_q3():
    u = 20
    p = []

    def paper(x, y, w, h):
        return [rect(x, y, w * u, h * u, fill='#FFFFFF', sw=2.5),
                lab(x + w * u / 2, y - 10, f'{w} cm'),
                lab(x - 8, y + h * u / 2 + 7, f'{h} cm', anchor='end')]
    p += paper(70, 36, 10, 8)
    p += paper(70 + 10 * u + 70, 36, 9, 8)
    p += paper(70 + 19 * u + 140, 36, 9, 9)
    save("bai53_t3_q3_papers", 70 + 28 * u + 150, 36 + 9 * u + 14, p, folder=FOLDER)


if __name__ == '__main__':
    (ROOT / 'src/assets' / FOLDER).mkdir(parents=True, exist_ok=True)
    t1_q3(); t1_q4(); t2_q3(); t3_q2(); t3_q3()
