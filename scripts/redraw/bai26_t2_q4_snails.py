"""
Vở BT Toán 2, Bài 26 Tiết 2 Q4 — ốc sên Bu và Bi bò trên lưới ô vuông 1 cm: nét riêng.
Giữ nội dung toán: lưới 9 x 4 ô, cạnh ô 1 cm (có mũi tên ghi 1 cm ngang và dọc).
Bu: phải 2 ô, lên 1 ô, phải 7 ô (10 cm). Bi: phải 5, xuống 1, phải 2, lên 1, phải 2 (11 cm).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 365
parts = []
X0, Y0, C = 82, 62, 73.7
GRID = '#2BA3D9'


def P(i, j):
    return (X0 + i * C, Y0 + j * C)


for i in range(10):
    parts.append(f'<line x1="{P(i, 0)[0]:.1f}" y1="{Y0}" x2="{P(i, 0)[0]:.1f}" y2="{P(0, 4)[1]:.1f}" stroke="{GRID}" stroke-width="2.4"/>')
for j in range(5):
    parts.append(f'<line x1="{X0}" y1="{P(0, j)[1]:.1f}" x2="{P(9, 0)[0]:.1f}" y2="{P(0, j)[1]:.1f}" stroke="{GRID}" stroke-width="2.4"/>')

BU = [P(0, 1), P(2, 1), P(2, 0), P(9, 0)]
BI = [P(0, 3), P(5, 3), P(5, 4), P(7, 4), P(7, 3), P(9, 3)]
for path, c in ((BU, ORANGE), (BI, PURPLE)):
    parts.append(f'<polyline points="{pts(path)}" fill="none" stroke="{c}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>')
    for p in (path[0], path[-1]):
        parts.append(f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="7" fill="{INK}"/>')


# 1 cm markers
def arrow2(x1, y1, x2, y2):
    a = math.atan2(y2 - y1, x2 - x1)
    s = [f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" {st(2.4)}/>']
    for (x, y), aa in (((x1, y1), a), ((x2, y2), a + math.pi)):
        for d in (-.5, .5):
            s.append(f'<line x1="{x}" y1="{y}" x2="{x + 10 * math.cos(aa + d):.1f}" y2="{y + 10 * math.sin(aa + d):.1f}" {st(2.4)}/>')
    return ''.join(s)


parts.append(arrow2(X0 + 2, 48, X0 + C - 2, 48))
parts.append(text(X0 + C / 2, 38, '1 cm', size=22, weight=500))
parts.append(arrow2(X0 + C + 8, Y0 + 2, X0 + C + 8, Y0 + C - 2))
parts.append(text(X0 + C + 14, Y0 + C / 2 + 8, '1 cm', size=22, weight=500, anchor='start'))

parts.append(snail(44, 124, .72, 1, shell=ORANGE))
parts.append(text(44, 158, 'Bu', size=24, weight=600))
parts.append(snail(44, 272, .72, 1, shell=PURPLE))
parts.append(text(44, 306, 'Bi', size=24, weight=600))

parts.append(house(830, 108, 92, 96, wall=CREAM, roof=RED))
parts.append(house(830, 330, 92, 96, wall=CREAM, roof=TEAL))

save('bai26_t2_q4_snails', W, H, parts)
