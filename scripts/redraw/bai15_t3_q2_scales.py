"""
Vở BT Toán 2, Bài 15 Tiết 3 Q2 — túi gạo, túi đường cân với quả cân: nét riêng.

Nội dung toán giữ đúng sách — hai cân đều THĂNG BẰNG:
* túi "GẠO TẺ" (đĩa trái) = quả cân "1 kg" + quả cân "5 kg" (đĩa phải) -> 6 kg.
* túi "ĐƯỜNG" (đĩa trái)  = quả cân "1 kg" + quả cân "2 kg" (đĩa phải) -> 3 kg.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 238
K = dict(arm=118, pan_w=180, post_h=58, drop=10)
parts = [
    balance_scale(215, 234, sack(0, 0, ['GẠO', 'TẺ'], w=160, h=128, col=SKY_D, size=22),
                  weight(-44, 0, '1 kg', w=62) + weight(34, 0, '5 kg', w=90), **K),
    balance_scale(680, 234, pillow_bag(0, 0, 'ĐƯỜNG', w=140, h=84, col=CREAM, size=19),
                  weight(-40, 0, '1 kg', w=62) + weight(36, 0, '2 kg', w=78), **K),
]
save('bai15_t3_q2_scales', W, H, parts)
