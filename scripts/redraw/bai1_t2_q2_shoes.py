"""
Vở BT Toán 2, Bài 1 Tiết 2 Q2 — bốn chiếc giày ghi cỡ số: vẽ lại bằng nét riêng.
Giữ nội dung toán: 4 chiếc giày theo thứ tự trái → phải ghi 40, 43, 39, 37.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 800, 79
SHOES = [(92, '40', ORANGE, '#E07F35'), (296, '43', BLUE, '#3F93D0'),
         (500, '39', GREEN, '#4FA663'), (704, '37', PURPLE, '#8E77DE')]


def shoe(cx, num, col, dark):
    x0, x1 = cx - 82, cx + 82          # heel .. toe
    top, sole_t, sole_b = 8, 56, 70
    s = []
    # sole: a chunky white band with a coloured stripe
    s.append(f'<path d="M{x0},{sole_t} L{x1 - 6},{sole_t} Q{x1 + 4},{sole_t + 6} {x1 - 4},{sole_b} '
             f'L{x0 + 6},{sole_b} Q{x0 - 2},{sole_b - 6} {x0},{sole_t} Z" fill="{WHITE}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    s.append(f'<line x1="{x0 + 6}" y1="{sole_t + 8}" x2="{x1 - 6}" y2="{sole_t + 8}" stroke="{dark}" stroke-width="3" stroke-linecap="round"/>')
    # upper: high rounded heel, ankle opening, tongue, long rounded toe
    s.append(f'<path d="M{x0 + 2},{sole_t} C{x0 - 3},{top + 18} {x0 + 2},{top} {x0 + 18},{top} '
             f'C{x0 + 34},{top} {x0 + 40},{top + 6} {x0 + 50},{top + 4} '
             f'L{x0 + 58},{top - 2} Q{x0 + 66},{top + 2} {x0 + 64},{top + 12} '
             f'C{x0 + 90},{top + 20} {x0 + 112},{top + 28} {x1 - 18},{top + 32} '
             f'C{x1 + 2},{top + 36} {x1 + 4},{sole_t - 4} {x1 - 6},{sole_t} Z" '
             f'fill="{col}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    # ankle opening
    s.append(f'<path d="M{x0 + 10},{top + 6} Q{x0 + 30},{top + 16} {x0 + 50},{top + 6} Q{x0 + 30},{top + 2} {x0 + 10},{top + 6} Z" fill="{INK}" opacity=".85"/>')
    # toe cap
    s.append(f'<path d="M{x1 - 34},{sole_t} C{x1 - 34},{top + 38} {x1 - 26},{top + 32} {x1 - 18},{top + 32}" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
    # heel shine
    s.append(f'<path d="M{x0 + 5},{top + 22} Q{x0 + 4},{top + 12} {x0 + 9},{top + 9}" fill="none" stroke="{WHITE}" stroke-width="3" stroke-linecap="round" opacity=".8"/>')
    # laces: little crossings along the instep
    for i in range(4):
        lx = x0 + 70 + i * 12
        ly = top + 17 + i * 3.5
        s.append(f'<path d="M{lx - 4},{ly - 3} L{lx + 5},{ly + 4} M{lx - 4},{ly + 4} L{lx + 5},{ly - 3}" stroke="{WHITE}" stroke-width="2.6" stroke-linecap="round"/>')
    # number patch on the side
    s.append(f'<rect x="{x0 + 22}" y="{top + 20}" width="46" height="28" rx="10" fill="{WHITE}" stroke="{INK}" stroke-width="1.6"/>')
    s.append(text(x0 + 45, top + 41, num, size=22, weight=700))
    return '\n'.join(s)


parts = [shoe(*a) for a in SHOES]
save('bai1_t2_q2_shoes', W, H, parts)
