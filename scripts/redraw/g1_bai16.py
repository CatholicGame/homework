"""
Vở BT Toán 1, Bài 16 (Số 6) — nét riêng.
  Q3: bậc thang 1–6 ô vuông, mỗi cột giữa một ô của bảng bên dưới (hình rộng 100%).
  Q2: ba nhóm xúc xắc 5|1, 4|2, 3|3, dây xuống ba ô trống (trái, cả nhóm, phải);
      ô trống là ô nhập của app, nằm ngay dưới hình (hình rộng 134px = ba ô 2.6rem).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_c import dice_group, staircase

F = 'grade1-workbook'
for i, (a, b) in enumerate(((5, 1), (4, 2), (3, 3)), 1):
    save(f'bai16_q2_group{i}', 256, 196, [dice_group(128, 4, a, b, spread=88, boxes=False, by=196)], folder=F)
W, H, P = staircase(6, 28, fill=ORANGE)
save('bai16_q3_stairs', W, H, P, folder=F)
