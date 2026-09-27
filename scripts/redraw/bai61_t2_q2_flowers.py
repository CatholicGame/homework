"""
Vở BT Toán 2, Bài 61 Tiết 2 Q2 — ba bông hoa ghi phép tính (nét riêng).
Giữ nội dung toán: hoa trái 5 cánh ghi 789 – 345, hoa giữa 4 cánh ghi 135 – 124,
hoa phải 6 cánh ghi 382 – 80 (cánh tách rời rõ để bé đếm).
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 700, 154
parts = []


def flower(cx, cy, n, petal, core, label, rot=-90):
    for i in range(n):
        a = math.radians(rot + 360 * i / n)
        px, py = cx + 40 * math.cos(a), cy + 40 * math.sin(a)
        parts.append(f'<ellipse cx="{px:.1f}" cy="{py:.1f}" rx="29" ry="23" transform="rotate({math.degrees(a):.1f} {px:.1f} {py:.1f})" '
                     f'fill="{petal}" stroke="{INK}" stroke-width="2.6"/>')
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="38" fill="{core}" stroke="{INK}" stroke-width="2.6"/>')
    for dx, dy in ((-16, -18), (14, -22), (22, 16), (-20, 18), (0, 26), (26, -4)):
        parts.append(f'<circle cx="{cx + dx}" cy="{cy + dy}" r="2.6" fill="{INK}" opacity=".25"/>')
    parts.append(text(cx, cy + 8, label, size=23, weight=700,
                      extra=f' stroke="{WHITE}" stroke-width="5" paint-order="stroke" stroke-linejoin="round"'))


flower(80, 77, 5, PINK, YELLOW, '789 – 345')
flower(350, 77, 4, PURPLE, YELLOW, '135 – 124', rot=-45)
flower(620, 77, 6, SKY_D, YELLOW, '382 – 80')
save('bai61_t2_q2_flowers', W, H, parts)
