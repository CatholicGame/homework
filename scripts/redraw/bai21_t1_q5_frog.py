"""
Vở BT Toán 2, Bài 21 Tiết 1 Q5 — ếch thi nhảy xa qua các lá sen: nét riêng.
Giữ nội dung toán: ếch trên lá sen xuất phát (không số), tiếp theo 10 lá ghi
5, 10, 15, 20, 25, 30, 35, 40, 45, 50 theo thứ tự trái -> phải; đường nhảy nét đứt
từ ếch đáp xuống lá 35 (nhảy qua 6 lá).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 280
parts = []

# pond
parts.append(f'<path d="M20,110 C40,60 200,40 460,38 C700,36 880,60 890,120 C900,180 820,250 460,262 '
             f'C200,270 60,250 40,200 C30,176 14,150 20,110 Z" fill="#BFE6F7" {st(3)}/>')
parts.append(f'<path d="M60,120 C80,84 220,64 460,62 C680,60 850,80 862,122" fill="none" stroke="#DDF2FB" stroke-width="6" stroke-linecap="round"/>')
for x, y in ((150, 232), (420, 238), (700, 226)):
    parts.append(f'<path d="M{x - 40},{y} q20,-6 40,0 t40,0" fill="none" stroke="#8FCFEA" stroke-width="2.4" stroke-linecap="round"/>')
parts.append(reeds(470, 96, 1.0))
parts.append(reeds(580, 80, .9))
parts.append(reeds(360, 262, .8))

PADS = [(172, 166, '5'), (256, 148, '10'), (322, 172, '15'), (398, 140, '20'), (460, 192, '25'),
        (534, 160, '30'), (612, 130, '35'), (686, 184, '40'), (748, 154, '45'), (826, 146, '50')]
rots = [70, 110, 60, 100, 120, 80, 105, 60, 115, 75]
parts.append(lily_pad(92, 150, 46, 26, 100))
for (x, y, s), r in zip(PADS, rots):
    parts.append(lily_pad(x, y, 40, 25, r, vein="#8ED48A", notch=34))
    parts.append(text(x, y + 4, s, size=25, weight=700))

# jump arc (dashed) ending with an arrow at pad 35
parts.append(f'<path d="M128,112 C260,26 470,26 596,104" fill="none" stroke="{BLUE}" stroke-width="3" stroke-dasharray="9 7" stroke-linecap="round"/>')
parts.append(f'<path d="M584,90 L600,108 L578,106" fill="none" stroke="{BLUE}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>')


def frog(x, y):
    g, c, d = [], '#7BCB5B', '#5DAF3B'
    g.append(f'<path d="M{x - 30},{y} Q{x - 42},{y - 10} {x - 50},{y - 2} L{x - 40},{y + 4}" fill="{c}" {st(2.2)}/>')
    g.append(f'<ellipse cx="{x - 6}" cy="{y - 12}" rx="30" ry="15" fill="{c}" {st(2.4)}/>')
    g.append(f'<ellipse cx="{x - 4}" cy="{y - 7}" rx="18" ry="7" fill="#DDF3C8"/>')
    g.append(f'<path d="M{x + 14},{y - 8} L{x + 28},{y + 2} L{x + 36},{y + 1}" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>')
    g.append(f'<path d="M{x + 14},{y - 8} L{x + 28},{y + 2} L{x + 36},{y + 1}" fill="none" stroke="{c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    g.append(f'<ellipse cx="{x + 18}" cy="{y - 26}" rx="18" ry="13" fill="{c}" {st(2.4)}/>')
    for dx in (8, 26):
        g.append(f'<circle cx="{x + dx}" cy="{y - 38}" r="7" fill="{WHITE}" {st(2)}/>' + eye(x + dx + 1, y - 38, 3))
    g.append(smile(x + 22, y - 22, 10))
    g.append(blush(x + 32, y - 25, 3))
    for dx in (-24, -8, 6):
        g.append(f'<circle cx="{x + dx}" cy="{y - 18}" r="2.6" fill="{d}"/>')
    return ''.join(g)


parts.append(frog(92, 150))

save('bai21_t1_q5_frog', W, H, parts)
