"""
Vở BT Toán 2, Bài 16 Tiết 2 Q3 — "Số?": rót từ can ra, tìm số lít còn lại. Vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách (mỗi khung nối xuống một ô … l):
  khung 1: can 8 l rót sang ca 3 l   -> ô mẫu ghi sẵn 5
  khung 2: can 12 l rót sang ca 4 l  -> ô trống (8)
  khung 3: can 20 l rót sang xô 10 l -> ô trống (10)
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import *

W, H = 900, 432
parts = []
S = 3
CAN, PANEL = '#8FD0F2', '#DDF2FC'


def frame(x0, y0, x1, y1, box_y, value=None):
    cx = (x0 + x1) / 2
    parts.append(f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" rx="16" fill="{WHITE}" stroke="{INK}" stroke-width="2.6"/>')
    parts.append(f'<line x1="{cx}" y1="{y1}" x2="{cx}" y2="{box_y}" stroke="{INK}" stroke-width="2.6"/>')
    parts.extend(answer_box(cx - 20, box_y, 40, 44, value, size=26))


def tilted_can(cx, cy, w, h, deg, n, size, to_x, to_y):
    """Can lật gương (nắp sang trái) rồi xoay `deg` độ quanh tâm: nắp chúc xuống bên trái, rót vào (to_x, to_y)."""
    by = cy + h / 2
    body = jerrycan(cx, by, w, h, label=None, body=CAN, panel=PANEL, sw=S)
    sx, sy = jerrycan_spout(cx, by, w, h)
    tip = rot_pt(2 * cx - sx, sy, deg, cx, cy)
    out = stream(tip[0], tip[1], to_x, to_y, w1=12, w2=9, bend=-6)
    out += [f'<g transform="rotate({deg} {cx} {cy}) translate({2 * cx} 0) scale(-1 1)">'] + body + ['</g>']
    lx, ly = rot_pt(cx, cy + h * .08, deg, cx, cy)
    out.append(text(lx, ly + size * .36, litre(n), size=size, weight=600,
                    extra=f' transform="rotate({deg + 90} {lx:.1f} {ly:.1f})"'))
    return out


# khung 1: 8 l -> ca 3 l
frame(6, 118, 238, 356, 376, '5')
parts += measuring_jug(80, 340, 70, 66, level=.8, label=litre(3), size=24, sw=S, ticks=False)
parts += tilted_can(152, 196, 110, 150, -75, 8, 28, 76, 286)

# khung 2: 12 l -> ca 4 l
frame(276, 90, 500, 356, 376)
parts += measuring_jug(348, 340, 74, 70, level=.8, label=litre(4), size=24, sw=S, ticks=False)
parts += tilted_can(414, 180, 108, 148, -75, 12, 28, 344, 282)

# khung 3: 20 l -> xô 10 l
frame(568, 4, 894, 356, 376)
parts += bucket(666, 340, 140, 124, level=1, label=litre(10), size=30, body=YELLOW, grip=PINK, sw=S)
parts += tilted_can(770, 120, 156, 208, -75, 20, 34, 668, 214)

save('bai16_t2_q3_pour', W, H, parts)
