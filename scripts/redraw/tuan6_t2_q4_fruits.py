"""
Luyện tập Toán 3, Tuần 6 Tiết 2 Q4 — 16 quả táo (4×4) và 24 quả na (6×4). Giữ đúng số quả và cách xếp hàng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_p2 import apple, custard_apple

W, H = 1560, 660
ROWS = (92, 256, 420, 584)
parts = []
for y in ROWS:
    for x in (72, 215, 362, 515):
        parts.append(apple(x, y + 8, 0.98))
k = 0
for y in ROWS:
    for x in (750, 895, 1045, 1190, 1335, 1485):
        k += 1
        parts.append(custard_apple(x, y + 6, 0.98, uid=f'na{k}'))
save('tuan6_t2_q4_fruits', W, H, parts, folder='grade3-practice')
