"""
Vở BT Toán 2, Bài 33 Tiết 2 Q1 — Rô-bốt hái dưa hấu bỏ vào sọt: nét riêng.

Nội dung toán giữ đúng sách:
* 4 sọt: "6 / A", "7 / B", "10 / C", "13 / D" (Rô-bốt ngồi giữa sọt B và sọt C).
* 15 quả dưa ghi phép tính (giữ đủ, sắp lại theo 3 hàng):
  9 + 1, 12 − 6, 15 − 8, 8 + 2, 14 − 8, 15 − 9, 12 − 5, 8 + 5,
  16 − 9, 9 + 4, 13 − 7, 10 + 3, 7 + 6, 11 − 4, 11 − 5.
  -> kết quả 6: 5 quả, 7: 4 quả, 10: 2 quả, 13: 4 quả.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g1 import basket, melon, leaf, robot

W, H = 900, 377
P = []
# ruộng
P.append(f'<path d="M0,150 Q220,138 450,150 T900,146 V{H} H0 Z" fill="#EEF6E4"/>')
P.append(f'<path d="M0,150 Q220,138 450,150 T900,146" fill="none" stroke="{GRASS_D}" stroke-width="3"/>')
# dây dưa (trang trí, không đếm)
P.append(f'<path d="M10,262 C160,238 300,286 450,262 S740,238 890,262" fill="none" stroke="{GRASS_D}" stroke-width="3"/>')
P.append(f'<path d="M10,330 C160,306 300,350 450,326 S740,306 890,330" fill="none" stroke="{GRASS_D}" stroke-width="3"/>')
for lx, ly, r in ((135, 250, -30), (320, 268, 20), (560, 250, -20), (770, 266, 30), (240, 330, -20), (640, 318, 25), (870, 318, -30), (30, 318, 20)):
    P.append(leaf(lx, ly, 22, r))
# sọt + rô-bốt
for x, lines in ((75, ('6', 'A')), (275, ('7', 'B')), (590, ('10', 'C')), (815, ('13', 'D'))):
    P.append(basket(x, 140, 124, 102, lines, size=26))
P.append(robot(432, 146, 122, arm_pose='think', look=(2, -3)))
# 15 quả dưa
rows = [
    (194, ['9 + 1', '12 − 6', '15 − 8', '8 + 2', '14 − 8']),
    (258, ['15 − 9', '12 − 5', '8 + 5', '16 − 9', '9 + 4']),
    (324, ['13 − 7', '10 + 3', '7 + 6', '11 − 4', '11 − 5']),
]
rots = [-4, 3, -3, 4, -3]
for ri, (cy, labs) in enumerate(rows):
    for i, lab in enumerate(labs):
        cx = 84 + i * 176 + (36 if ri == 1 else 0) - (6 if ri == 2 else 0)
        P.append(melon(cx, cy, 66, 30, lab, rot=rots[(i + ri) % 5], size=26, stripe='#B5E2A6'))
save('bai33_t2_q1_melons', W, H, P)
