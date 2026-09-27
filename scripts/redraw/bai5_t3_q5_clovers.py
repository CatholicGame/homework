"""
Vở BT Toán 2, Bài 5 Tiết 3 Q5 — "cỏ ba lá": vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: 3 cây cỏ ba lá, số ở giữa = tổng ba cánh.
  trái trên:  cánh 5 / 20 / 2, giữa 27
  giữa dưới:  cánh 40 / (trống, bên trái) / 20, giữa 65
  phải trên:  cánh 12 / 31 / 10, giữa 53

    python scripts/redraw/bai5_t3_q5_clovers.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import math

W, H = 700, 369
LEAF, LEAF_D = '#A8E0A0', '#6CBF6A'
L = 84   # leaf length


def heart(L):
    """Heart-shaped leaf pointing up, its tip at the origin."""
    return (f'M0,0 C{-0.95 * L},{-0.22 * L} {-0.82 * L},{-1.08 * L} {-0.34 * L},{-1.02 * L} '
            f'C{-0.12 * L},{-0.99 * L} 0,{-0.88 * L} 0,{-0.78 * L} '
            f'C0,{-0.88 * L} {0.12 * L},{-0.99 * L} {0.34 * L},{-1.02 * L} '
            f'C{0.82 * L},{-1.08 * L} {0.95 * L},{-0.22 * L} 0,0 Z')


def clover(cx, cy, top, left, right, mid, stem_dx):
    s = []
    # stem, curling a little to one side
    s.append(f'<path d="M{cx},{cy + 20} C{cx + 4},{cy + 70} {cx + stem_dx},{cy + 90} {cx + stem_dx * 1.2},{cy + 122}" '
             f'fill="none" stroke="{INK}" stroke-width="11" stroke-linecap="round"/>')
    s.append(f'<path d="M{cx},{cy + 20} C{cx + 4},{cy + 70} {cx + stem_dx},{cy + 90} {cx + stem_dx * 1.2},{cy + 122}" '
             f'fill="none" stroke="{LEAF_D}" stroke-width="6" stroke-linecap="round"/>')
    labels = []
    for ang, num in ((0, top), (-118, left), (118, right)):
        blank = num is None
        fill = WHITE if blank else LEAF
        s.append(f'<g transform="translate({cx},{cy}) rotate({ang})">'
                 f'<path d="{heart(L)}" fill="{fill}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
                 + ('' if blank else
                    f'<ellipse cx="{-0.42 * L}" cy="{-0.8 * L}" rx="9" ry="5" fill="#fff" opacity=".55" transform="rotate(-30 {-0.42 * L} {-0.8 * L})"/>')
                 + '</g>')
        if not blank:
            a = math.radians(ang)
            d = 0.6 * L
            tx, ty = cx + d * math.sin(a), cy - d * math.cos(a)
            labels.append(text(round(tx, 1), round(ty + 8, 1), num, size=23, weight=700))
    s.extend(labels)
    # centre button
    s.append(f'<circle cx="{cx}" cy="{cy}" r="24" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
    s.append(text(cx, cy + 8, mid, size=22, weight=700))
    return '\n'.join(s)


parts = [
    clover(100, 102, '5', '20', '2', '27', -8),
    clover(357, 236, '40', None, '20', '65', 6),
    clover(598, 96, '12', '31', '10', '53', -8),
]
# a few grass tufts and tiny flowers for decoration (no math)
for gx, gy in ((120, 250), (560, 250), (220, 340), (500, 345)):
    parts.append(f'<path d="M{gx - 12},{gy} q4,-16 6,-18 M{gx},{gy} q0,-20 2,-24 M{gx + 12},{gy} q-2,-14 -6,-18" '
                 f'fill="none" stroke="{GRASS_D}" stroke-width="3.5" stroke-linecap="round"/>')

save('bai5_t3_q5_clovers', W, H, parts)
