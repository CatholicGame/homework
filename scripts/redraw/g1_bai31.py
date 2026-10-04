"""
Vở BT Toán 1, Bài 31 (Số 0 trong phép cộng), bài 3 — nét riêng.
a) đĩa trên 3 quả táo, đĩa dưới 2 quả.   b) đĩa trên 3 quả táo, đĩa dưới không có quả nào.
"""
from kit_l1_29 import *

W, H = 340, 230
TABLE = '#F3D9B1'


def scene(lower):
    p = [board(W, H, bg='#FFF4DF', ground=TABLE, ground_y=60)]
    p.append(kit_g4.plate(150, 96, 200, 40))
    for i in range(3):
        p.append(kit_measure.apple(100 + i * 50, 100, 22))
    p.append(kit_g4.plate(210, 186, 200, 40))
    for i in range(lower):
        p.append(kit_measure.apple(185 + i * 50, 190, 22))
    return p


save('bai31_q3a_apples', W, H, scene(2), folder=FOLDER)
save('bai31_q3b_apples', W, H, scene(0), folder=FOLDER)
