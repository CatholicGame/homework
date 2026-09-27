"""
Vở BT Toán 2, Bài 20 Tiết 3 Q3 — hai con đường qua ao sen để dế mèn đến bờ cỏ: nét riêng.
Giữ nội dung toán: đường trên gồm 3 đoạn 40 cm (ngang), 10 cm (xuống), 20 cm (ngang);
đường dưới gồm 2 đoạn 20 cm (xuống), 60 cm (ngang); dế đứng trên lá sen ở góc trái trên,
bờ cỏ bên phải.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 566
parts = [f'<rect width="{W}" height="{H}" fill="#DDF1FB"/>']
# gentle ripples
for y in (120, 260, 400, 480):
    parts.append(f'<path d="M60,{y} q40,-8 80,0 t80,0" fill="none" stroke="#BDE3F5" stroke-width="3" stroke-linecap="round"/>')

# grassy bank on the right
parts.append(f'<path d="M826,0 L900,0 L900,{H} L826,{H} Q818,420 830,300 Q840,160 826,0 Z" fill="{GRASS}" {st(2.8)}/>')
for x, y in ((858, 60), (880, 170), (850, 250), (878, 340), (856, 440), (882, 520)):
    parts.append(tuft(x, y, .8))

# lily pads (decoration only) — kept clear of the two lanes
pads = [(90, 70, 40, 60), (200, 88, 38, 120), (310, 70, 42, 200), (420, 100, 34, 30), (520, 70, 40, 300),
        (640, 80, 38, 150), (750, 100, 36, 240), (660, 250, 38, 60), (770, 240, 32, 200),
        (110, 290, 40, 250), (250, 280, 40, 330), (380, 282, 36, 110),
        (220, 440, 40, 20), (340, 450, 36, 160), (470, 430, 42, 280), (720, 430, 44, 100), (600, 450, 30, 330)]
for x, y, r, rot in pads:
    parts.append(lily_pad(x, y, r, r * .8, rot))
for x, y in ((480, 290), (110, 440), (600, 430)):
    parts.append(lotus(x, y, 1.1))

UP = [(118, 201), (554, 201), (554, 325), (812, 325)]
LOW = [(26, 252), (26, 541), (812, 541)]
parts.append(dashed_lane(UP, 27))
parts.append(dashed_lane(LOW, 25))

# the cricket's lily pad and the cricket
parts.append(lily_pad(62, 212, 52, 34, 320, c='#8ED48A'))


def cricket(x, y):
    g = []
    dark, body = '#4E8F3A', '#8BC34A'
    # back legs (big, bent)
    g.append(f'<path d="M{x - 10},{y - 10} L{x - 34},{y - 34} L{x - 42},{y + 2}" fill="none" stroke="{INK}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>')
    g.append(f'<path d="M{x - 10},{y - 10} L{x - 34},{y - 34} L{x - 42},{y + 2}" fill="none" stroke="{dark}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>')
    # body
    g.append(f'<ellipse cx="{x - 4}" cy="{y - 16}" rx="26" ry="13" fill="{body}" {st(2.4)} transform="rotate(-18 {x - 4} {y - 16})"/>')
    g.append(f'<path d="M{x - 26},{y - 8} Q{x - 6},{y - 36} {x + 16},{y - 30}" fill="none" stroke="{dark}" stroke-width="2.4"/>')
    # front legs
    for dx in (6, 16):
        g.append(f'<path d="M{x + dx},{y - 10} L{x + dx + 4},{y + 2}" fill="none" {st(2.4)}/>')
    # head
    g.append(f'<circle cx="{x + 24}" cy="{y - 36}" r="14" fill="{body}" {st(2.4)}/>')
    g.append(eye(x + 29, y - 39, 3.4))
    g.append(blush(x + 30, y - 29, 3))
    g.append(f'<path d="M{x + 20},{y - 49} Q{x + 30},{y - 80} {x + 54},{y - 86} M{x + 26},{y - 49} Q{x + 44},{y - 72} {x + 66},{y - 70}" fill="none" {st(1.8)}/>')
    return ''.join(g)


parts.append(cricket(58, 214))

for x, y, s in ((340, 176, '40 cm'), (610, 267, '10 cm'), (700, 300, '20 cm'), (80, 378, '20 cm'), (470, 512, '60 cm')):
    parts.append(f'<rect x="{x - 46}" y="{y - 24}" width="92" height="32" rx="10" fill="#DDF1FB" opacity=".85"/>')
    parts.append(text(x, y, s, size=26, weight=600))

save('bai20_t3_q3_cricket', W, H, parts)
