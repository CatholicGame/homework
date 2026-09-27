"""
Vở BT Toán 2, Bài 42 Tiết 2 Q4 — bông hoa xếp 3 hàng × 5 cột: nét riêng.
Giữ nội dung toán: đúng 15 bông hoa, 3 hàng, mỗi hàng 5 bông (15 : 3 = 5, 15 : 5 = 3).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 791, 442


def flower(cx, cy, R=52):
    s = []
    for k in range(5):
        a = 72 * k - 90
        px, py = cx + R * .52 * math.cos(math.radians(a)), cy + R * .52 * math.sin(math.radians(a))
        s.append(f'<ellipse cx="{px:.1f}" cy="{py:.1f}" rx="{R * .42:.1f}" ry="{R * .5:.1f}" fill="{PINK}" {st(2.8)} transform="rotate({a + 90} {px:.1f} {py:.1f})"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{R * .3:.1f}" fill="{YELLOW}" {st(2.8)}/>')
    s.append(f'<circle cx="{cx - R * .08:.1f}" cy="{cy - R * .08:.1f}" r="{R * .08:.1f}" fill="#fff" opacity=".7"/>')
    return ''.join(s)


parts = [frame(W, H)]
for r in range(3):
    for c in range(5):
        parts.append(flower(100 + c * 146, 84 + r * 137))
save('bai42_t2_q4_flowers', W, H, parts)
