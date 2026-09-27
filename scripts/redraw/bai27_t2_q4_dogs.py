"""
Vở BT Toán 2, Bài 27 Tiết 2 Q4 — bốn chú chó đi theo đường trên lưới ô vuông đến khúc xương: nét riêng.
Giữ nội dung toán: lưới 11 x 9 ô; các đường A, B, C, D đi theo cạnh ô đúng như sách
(A, B, C mỗi đường 6 cạnh ô; D 7 cạnh ô), chó ở đầu đường, khúc xương ở cuối đường.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 800, 666
parts = []
X0, Y0, C = 8, 15, 71.6
GRID = '#2BA3D9'


def P(i, j):
    return (X0 + i * C, Y0 + j * C)


for i in range(12):
    parts.append(f'<line x1="{P(i, 0)[0]:.1f}" y1="{Y0}" x2="{P(i, 0)[0]:.1f}" y2="{P(0, 9)[1]:.1f}" stroke="{GRID}" stroke-width="2"/>')
for j in range(10):
    parts.append(f'<line x1="{X0}" y1="{P(0, j)[1]:.1f}" x2="{P(11, 0)[0]:.1f}" y2="{P(0, j)[1]:.1f}" stroke="{GRID}" stroke-width="2"/>')

ROUTES = {
    'A': [(1, 1), (2, 1), (2, 2), (3, 2), (3, 3), (4, 3), (4, 2)],
    'B': [(7, 2), (8, 2), (8, 3), (9, 3), (9, 2), (10, 2), (10, 1)],
    'C': [(1, 5), (2, 5), (2, 6), (3, 6), (3, 7), (4, 7), (4, 8)],
    'D': [(7, 8), (8, 8), (8, 7), (9, 7), (9, 6), (8, 6), (8, 5), (7, 5)],
}
for r in ROUTES.values():
    parts.append(f'<polyline points="{pts([P(*q) for q in r])}" fill="none" stroke="{ORANGE}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>')
    for q in (r[0], r[-1]):
        parts.append(f'<circle cx="{P(*q)[0]:.1f}" cy="{P(*q)[1]:.1f}" r="8" fill="{INK}"/>')


def puppy(x, y):
    """head + front paws, centred x,y (about 60 wide)"""
    fur, ear = '#F2C48D', BROWN
    g = []
    g.append(f'<ellipse cx="{x}" cy="{y + 14}" rx="22" ry="14" fill="{fur}" {st(2.2)}/>')
    for dx in (-12, 12):
        g.append(f'<ellipse cx="{x + dx}" cy="{y + 26}" rx="8" ry="5" fill="{WHITE}" {st(1.8)}/>')
    for sx in (-1, 1):
        g.append(f'<ellipse cx="{x + sx * 20}" cy="{y - 4}" rx="8" ry="15" fill="{ear}" {st(2.2)} transform="rotate({sx * 20} {x + sx * 20} {y - 4})"/>')
    g.append(f'<circle cx="{x}" cy="{y - 6}" r="19" fill="{fur}" {st(2.2)}/>')
    g.append(f'<ellipse cx="{x}" cy="{y + 2}" rx="10" ry="7" fill="{WHITE}"/>')
    for sx in (-1, 1):
        g.append(eye(x + sx * 7, y - 9, 2.8))
    g.append(f'<ellipse cx="{x}" cy="{y - 1}" rx="4" ry="3" fill="{INK}"/>')
    g.append(f'<path d="M{x - 4},{y + 4} q4,4 8,0" fill="none" {st(1.6)}/>')
    return ''.join(g)


def bone(x, y, rot=0):
    g = ''.join(f'<circle cx="{cx}" cy="{cy}" r="7" fill="{WHITE}" {st(2.2)}/>' for cx in (-17, 17) for cy in (-6, 6))
    g += f'<rect x="-18" y="-5" width="36" height="10" fill="{WHITE}" {st(2.2)}/>'
    g += ''.join(f'<circle cx="{cx}" cy="{cy}" r="5.6" fill="{WHITE}"/>' for cx in (-17, 17) for cy in (-6, 6))
    g += '<rect x="-16" y="-3.8" width="32" height="7.6" fill="#FFFFFF"/>'
    return f'<g transform="translate({x},{y}) rotate({rot})">{g}</g>'


# dogs just left of each start dot, bones next to each end dot
for k, (i, j) in (('A', (1, 1)), ('B', (7, 2)), ('C', (1, 5)), ('D', (7, 8))):
    x, y = P(i, j)
    parts.append(f'<rect x="{x - 64}" y="{y - 30}" width="58" height="62" fill="{WHITE}"/>')
    parts.append(puppy(x - 34, y - 2))
for (i, j), (dx, dy, rot) in (((4, 2), (0, -28, 0)), ((10, 1), (0, -26, 0)), ((4, 8), (0, 26, 0)), ((7, 5), (-30, 0, 90))):
    x, y = P(i, j)
    parts.append(bone(x + dx, y + dy, rot))

for s, (x, y) in (('A', (160, 280)), ('B', (608, 284)), ('C', (160, 652)), ('D', (615, 652))):
    parts.append(f'<rect x="{x - 14}" y="{y - 24}" width="28" height="30" fill="{WHITE}"/>')
    parts.append(text(x, y, s, size=28, weight=600))

save('bai27_t2_q4_dogs', W, H, parts)
