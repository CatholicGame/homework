"""
Vở BT Toán 2, Bài 65 Tiết 2 Q3 — biểu đồ "SỐ CÀ CHUA THU HOẠCH ĐƯỢC Ở BA KHU VƯỜN": nét riêng.
Giữ nội dung toán đúng như trang sách: Vườn A 4 túi + 4 hình tròn, Vườn B 5 túi,
Vườn C 5 túi + 3 hình tròn; chú thích mỗi hình tròn = 1 quả, mỗi túi = 10 quả.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_g8 import *

W, H = 900, 491
FR = BLUE
BAG = '#F2C98A'
TOM = '#F26B5B'
TOP, BAND, BOT = 42, 437, 488
cols = [(5, 262), (262, 413), (413, 660)]


def tomato(cx, cy, r=15):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{TOM}" stroke="{INK}" stroke-width="2.6"/>'
            f'<path d="M{cx - 5},{cy - r + 2} L{cx},{cy - r + 6} L{cx + 5},{cy - r + 2}" fill="none" stroke="{GRASS_D}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>')


parts = [text(330, 28, 'SỐ CÀ CHUA THU HOẠCH ĐƯỢC Ở BA KHU VƯỜN', size=23, weight=600)]
parts.append(f'<rect x="{cols[0][0]}" y="{TOP}" width="{cols[2][1] - cols[0][0]}" height="{BOT - TOP}" fill="#fff" stroke="{FR}" stroke-width="3"/>')
parts.append(f'<rect x="{cols[0][0]}" y="{BAND}" width="{cols[2][1] - cols[0][0]}" height="{BOT - BAND}" fill="#EAF6FD" stroke="{FR}" stroke-width="3"/>')
for x0, _ in cols[1:]:
    parts.append(f'<line x1="{x0}" y1="{TOP}" x2="{x0}" y2="{BOT}" stroke="{FR}" stroke-width="3"/>')
bags = [(80, 4), (337, 5), (485, 5)]
for cx, n in bags:
    for i in range(n):
        parts.append(bag(cx, 428 - i * 76, col=BAG))
# loose tomatoes: A = 3 in a row + 1 on top (4), C = 2 + 1 on top (3)
for x in (170, 201, 232):
    parts.append(tomato(x, 410))
parts.append(tomato(185.5, 383))
for x in (590, 621):
    parts.append(tomato(x, 410))
parts.append(tomato(605.5, 383))
for (x0, x1), lab in zip(cols, ('Vườn A', 'Vườn B', 'Vườn C')):
    parts.append(text((x0 + x1) / 2, 471, lab, size=24, weight=600))
parts.append(text(682, 302, 'Mỗi', size=23, weight=500, anchor='start'))
parts.append(tomato(760, 294))
parts.append(text(784, 302, 'biểu thị', size=23, weight=500, anchor='start'))
parts.append(text(682, 344, '1 quả cà chua.', size=23, weight=500, anchor='start'))
parts.append(text(682, 424, 'Mỗi', size=23, weight=500, anchor='start'))
parts.append(bag(772, 432, w=62, h=56, col=BAG))
parts.append(text(812, 424, 'gồm', size=23, weight=500, anchor='start'))
parts.append(text(682, 470, '10 quả cà chua.', size=23, weight=500, anchor='start'))
save('bai65_t2_q3_tomatoes', W, H, parts)
