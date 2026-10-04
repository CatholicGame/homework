"""
Vở BT Toán 1, Bài 13 (Bằng nhau. Dấu =) — nét riêng.
  Q2: ba cặp mặt xúc xắc 4|3 (mẫu), 4|5, 4|4.
  Q4: ba khung trái (3 tròn + 4 tam giác; 2 tròn + 5 tam giác; 4 tròn + 3 tam giác)
      và ba khung phải (3 tròn; 2 tam giác + 1 tròn; 1 tam giác + 2 tròn).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_c import die, circ, tri, frame

F = 'grade1-workbook'
for a, b in ((4, 3), (4, 5), (4, 4)):
    save(f'bai13_q2_dice_{a}{b}', 176, 84, [die(4, 4, 76, a), die(96, 4, 76, b)], folder=F)

R = 19
def shapes(rows, x0, y0, dx=48, dy=50):
    out = []
    for j, row in enumerate(rows):
        for i, ch in enumerate(row):
            if ch == ' ':
                continue
            cx, cy = x0 + i * dx, y0 + j * dy
            out.append(circ(cx, cy, R) if ch == 'o' else tri(cx, cy + 3, R + 2, BLUE))
    return out

LEFT = [['otttt', 'oo'], ['otttt', 'to'], ['ttot', 'ooo']]
for k, rows in enumerate(LEFT, 1):
    save(f'bai13_q4_left{k}', 270, 128, [frame(3, 3, 264, 122)] + shapes(rows, 36, 38), folder=F)
RIGHT = [['oo', ' o'], [' t', 'to'], [' t', 'oo']]
for k, rows in enumerate(RIGHT, 1):
    out = [frame(3, 3, 124, 122)]
    for j, row in enumerate(rows):
        for i, ch in enumerate(row):
            if ch == ' ':
                continue
            cx = 40 + i * 48 - (0 if len(row.strip()) == 2 else 24)
            cy = 38 + j * 50
            out.append(circ(cx, cy, R) if ch == 'o' else tri(cx, cy + 3, R + 2, BLUE))
    save(f'bai13_q4_right{k}', 130, 128, out, folder=F)
