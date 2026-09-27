"""
Vở BT Toán 2, Bài 48 Tiết 2 Q1 — khay bánh, mỗi khay 10 chiếc: nét riêng.
Giữ nội dung toán: chữ "a) 30 chiếc bánh." với 2 khay, "b) 50 chiếc bánh." với 3 khay;
mỗi khay đúng 10 chiếc bánh (bé cần vẽ thêm 1 và 2 khay).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 800, 348


def tray(x, y, w=214, h=108):
    s = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{GREY}" {st(3)}/>',
         f'<rect x="{x + 8}" y="{y + 8}" width="{w - 16}" height="{h - 16}" rx="6" fill="{GREY_L}" {st(2)}/>']
    cx, cy = x + w / 2, y + h / 2
    for row, n in ((-1, 3), (0, 4), (1, 3)):
        for i in range(n):
            bx = cx + (i - (n - 1) / 2) * 46
            by = cy + row * 28
            s.append(f'<ellipse cx="{bx:.1f}" cy="{by:.1f}" rx="20" ry="13" fill="{YELLOW}" {st(2.4)}/>')
            s.append(f'<ellipse cx="{bx:.1f}" cy="{by:.1f}" rx="13" ry="7.5" fill="none" stroke="{ORANGE}" stroke-width="1.6"/>')
            for dx, dy in ((-6, -2), (4, -3), (0, 3), (8, 2)):
                s.append(f'<circle cx="{bx + dx:.1f}" cy="{by + dy:.1f}" r="1.5" fill="{BROWN}"/>')
    return ''.join(s)


parts = [text(105, 28, 'a) 30 chiếc bánh.', size=22, weight=500, anchor='start'),
         text(8, 206, 'b) 50 chiếc bánh.', size=22, weight=500, anchor='start')]
for x in (105, 393):
    parts.append(tray(x, 52))
for x in (8, 293, 582):
    parts.append(tray(x, 234))
save('bai48_t2_q1_trays', W, H, parts)
