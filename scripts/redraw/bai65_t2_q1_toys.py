"""
Vở BT Toán 2, Bài 65 Tiết 2 Q1 — biểu đồ "SỐ ĐỒ CHƠI CỦA VIỆT": nét riêng.
Giữ nội dung toán: 3 cột ô tô / xe máy / máy bay với 8 / 8 / 6 chấm tròn (đúng như trang sách)
(xếp từ dưới lên), chú thích "Mỗi ● biểu thị cho 1 đồ vật."
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_g8 import *

W, H = 900, 511
FR = BLUE
cols = [(6, 234), (234, 426), (426, 654)]      # x ranges of the three columns
TOP, BASE, BOT = 44, 404, 508
counts = [8, 8, 6]   # the book page shows 8 / 8 / 6
parts = [text(330, 30, 'SỐ ĐỒ CHƠI CỦA VIỆT', size=24, weight=600)]
parts.append(f'<rect x="{cols[0][0]}" y="{TOP}" width="{cols[2][1] - cols[0][0]}" height="{BOT - TOP}" fill="#fff" stroke="{FR}" stroke-width="3"/>')
parts.append(f'<rect x="{cols[0][0]}" y="{BASE}" width="{cols[2][1] - cols[0][0]}" height="{BOT - BASE}" fill="#EAF6FD" stroke="{FR}" stroke-width="3"/>')
for x0, x1 in cols[1:]:
    parts.append(f'<line x1="{x0}" y1="{TOP}" x2="{x0}" y2="{BOT}" stroke="{FR}" stroke-width="3"/>')
for (x0, x1), n in zip(cols, counts):
    cx = (x0 + x1) / 2
    for i in range(n):
        parts.append(dot(cx, 374 - i * 43.5))
icons = [(car(), 240, 82), (moto(), 181, 107), (plane(), 240, 113)]
for (x0, x1), (g, w, h) in zip(cols, icons):
    s = min((x1 - x0 - 30) / w, 84 / h)
    parts.append(place(g, (x0 + x1) / 2 - w * s / 2, (BASE + BOT) / 2 - h * s / 2, s))
parts.append(text(684, 446, 'Mỗi', size=24, weight=500, anchor='start'))
parts.append(dot(764, 438, 15))
parts.append(text(790, 446, 'biểu thị', size=24, weight=500, anchor='start'))
parts.append(text(684, 490, 'cho 1 đồ vật.', size=24, weight=500, anchor='start'))
save('bai65_t2_q1_toys', W, H, parts)
