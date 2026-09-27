"""
Vở BT Toán 2, Bài 59 Tiết 2 Q4 — tranh tô màu con ngỗng (nét riêng, để trắng cho bé tô).
Giữ nội dung toán: mỏ ghi 99, đầu ghi 10, cổ ghi 350 + 249, cánh ghi 123 + 510,
hai bàn chân ghi 51 và 49, bãi cỏ dưới chân ghi 300 + 415; thân không ghi số.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 600, 803
NUM = '#1C8FD0'
st = f'fill="{WHITE}" stroke="{INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"'
parts = []

# bãi cỏ
parts.append(f'<ellipse cx="300" cy="702" rx="286" ry="92" {st}/>')
# chân (chân + màng) — vẽ trước thân
for lx, fx, fy in ((262, 238, 712), (402, 420, 702)):
    parts.append(f'<path d="M{lx - 8},600 L{lx - 8},{fy - 42} L{fx - 58},{fy + 14} Q{fx - 30},{fy + 4} {fx - 10},{fy + 20} '
                 f'Q{fx + 12},{fy + 2} {fx + 34},{fy + 18} Q{fx + 44},{fy - 4} {fx + 52},{fy - 22} L{lx + 10},{fy - 46} L{lx + 10},600 Z" {st}/>')
# thân + đuôi
parts.append(f'<path d="M58,352 C96,356 104,384 128,392 C118,370 132,360 162,398 C224,356 330,348 420,360 '
             f'C520,372 566,440 552,510 C537,580 452,622 342,622 C232,622 150,572 136,492 C96,470 70,420 58,352 Z" {st}/>')
# cánh
parts.append(f'<path d="M188,440 C252,396 382,404 436,466 C468,508 446,564 384,574 C330,584 250,566 196,524 '
             f'C226,512 232,500 206,486 C232,474 226,458 188,440 Z" {st}/>')
parts.append(f'<path d="M300,560 C350,556 400,540 420,510" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
# cổ + đầu (một hình), vạch chia cổ ở y ~ 212
parts.append(f'<path d="M394,392 C404,300 380,230 386,170 C362,120 382,54 442,52 C502,50 522,100 512,140 '
             f'C500,180 494,240 524,398 C482,424 430,422 394,392 Z" {st}/>')
parts.append(f'<path d="M384,208 C420,226 468,226 500,210" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
# mỏ
parts.append(f'<path d="M498,84 C546,78 582,94 598,118 C574,140 540,146 502,142 Z" {st}/>')
# mắt
parts.append(f'<circle cx="468" cy="92" r="7" fill="{INK}"/><circle cx="470" cy="90" r="2.2" fill="{WHITE}"/>')

# số
parts.append(text(540, 124, '99', size=28, weight=700, fill=NUM))
parts.append(text(434, 150, '10', size=36, weight=700, fill=NUM))
parts.append(text(452, 318, '350 + 249', size=32, weight=700, fill=NUM, extra=' transform="rotate(80 452 318)"'))
parts.append(text(318, 500, '123 + 510', size=34, weight=700, fill=NUM))
parts.append(text(236, 712, '51', size=30, weight=700, fill=NUM))
parts.append(text(422, 702, '49', size=30, weight=700, fill=NUM))
parts.append(text(300, 772, '300 + 415', size=34, weight=700, fill=NUM))
save('bai59_t2_q4_goose', W, H, parts)
