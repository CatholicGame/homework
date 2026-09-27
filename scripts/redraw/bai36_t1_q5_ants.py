"""
Vở BT Toán 2, Bài 36 Tiết 1 Q5 — hai đường để kiến đến miếng bánh, vòng qua vũng nước: nét riêng.
Giữ nội dung toán: đường trên M-N-P-Q với MN 21 cm, NP 12 cm, PQ 15 cm;
đường dưới A-B-C với AB 32 cm, BC 19 cm; kiến ở bên trái giữa M và A, bánh ở bên phải.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 503
parts = []

# puddle
parts.append(f'<path d="M150,262 C140,220 220,205 330,200 C470,194 630,200 636,250 C642,300 560,330 440,338 '
             f'C320,346 170,310 150,262 Z" fill="#A9DCF3" {st(3)}/>')
parts.append(f'<path d="M300,232 C360,210 460,208 520,226 M350,262 C400,248 460,250 490,262" fill="none" stroke="#D6F0FB" stroke-width="5" stroke-linecap="round"/>')

PT = {'M': (35, 220), 'N': (318, 82), 'P': (483, 100), 'Q': (658, 205),
      'A': (32, 297), 'B': (515, 432), 'C': (686, 312)}
for route in ('MNPQ', 'ABC'):
    p = [PT[c] for c in route]
    parts.append(f'<polyline points="{pts(p)}" fill="none" stroke="{INK}" stroke-width="15" stroke-linejoin="round" stroke-linecap="round"/>')
    parts.append(f'<polyline points="{pts(p)}" fill="none" stroke="#E8DCCB" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>')
for c, (x, y) in PT.items():
    parts.append(f'<circle cx="{x}" cy="{y}" r="11" fill="{SKY_D}" {st(2.4)}/>')

for c, (x, y) in (('M', (32, 186)), ('N', (318, 50)), ('P', (492, 68)), ('Q', (664, 180)),
                  ('A', (30, 346)), ('B', (515, 482)), ('C', (716, 306))):
    parts.append(text(x, y, c, size=32, weight=500))


def lab(x, y, s, rot):
    return f'<g transform="translate({x},{y}) rotate({rot})">{text(0, 0, s, size=25, weight=600)}</g>'


parts += [lab(158, 126, '21 cm', -27), lab(410, 72, '12 cm', 6), lab(590, 128, '15 cm', 33),
          lab(262, 394, '32 cm', 23), lab(632, 398, '19 cm', -36)]


# ant between M and A, facing right
def ant(x, y):
    g = []
    for dx in (-8, 0, 8):
        g.append(f'<path d="M{x + dx},{y} l-5,10 M{x + dx},{y} l5,-10" fill="none" {st(1.8)}/>')
    g.append(f'<ellipse cx="{x - 12}" cy="{y}" rx="8" ry="6" fill="{INK}"/>')
    g.append(f'<ellipse cx="{x}" cy="{y}" rx="5" ry="4" fill="{INK}"/>')
    g.append(f'<circle cx="{x + 10}" cy="{y - 1}" r="5.5" fill="{INK}"/>')
    g.append(f'<path d="M{x + 12},{y - 5} q4,-8 10,-8 M{x + 10},{y - 6} q2,-8 6,-11" fill="none" {st(1.6)}/>')
    return ''.join(g)


parts.append(f'<g transform="translate(34,258) scale(1.5) translate(-34,-258)">{ant(34, 258)}</g>')

# two cookies (the treat)
for cx, cy, rx in ((760, 232, 50), (826, 250, 62)):
    parts.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{rx * .5}" fill="#E8B872" {st(2.8)}/>')
    parts.append(f'<ellipse cx="{cx}" cy="{cy - 3}" rx="{rx * .82}" ry="{rx * .36}" fill="#F2CB8C"/>')
    for dx, dy in ((-.45, -.05), (0, -.2), (.4, .02), (-.1, .15)):
        parts.append(f'<circle cx="{cx + dx * rx:.1f}" cy="{cy + dy * rx:.1f}" r="4" fill="#7A4E2D"/>')

save('bai36_t1_q5_ants', W, H, parts)
