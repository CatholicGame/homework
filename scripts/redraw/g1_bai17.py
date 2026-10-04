"""
Vở BT Toán 1, Bài 17 (Số 7) — nét riêng.
  Q3: bậc thang 1–7 ô vuông, mỗi cột giữa một ô của bảng bên dưới (hình rộng 100%).
  Q2: ba nhóm xúc xắc 6|1, 5|2, 4|3, dây xuống ba ô trống (trái, cả nhóm, phải);
      ô trống là ô nhập của app, nằm ngay dưới hình (hình rộng 134px = ba ô 2.6rem).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_c import dice_group, staircase

F = 'grade1-workbook'
for i, (a, b) in enumerate(((6, 1), (5, 2), (4, 3)), 1):
    save(f'bai17_q2_group{i}', 256, 196, [dice_group(128, 4, a, b, spread=88, boxes=False, by=196)], folder=F)
W, H, P = staircase(7, 26, fill=TEAL)
save('bai17_q3_stairs', W, H, P, folder=F)
