"""
Vở BT Toán 2, Bài 15 Tiết 3 Q2 — túi gạo, túi đường cân với quả cân: nét riêng.

Nội dung toán giữ đúng sách — hai cân đều THĂNG BẰNG:
* túi "GẠO TẺ" (đĩa trái) = quả cân "1 kg" + quả cân "5 kg" (đĩa phải) -> 6 kg.
* túi "ĐƯỜNG" (đĩa trái)  = quả cân "1 kg" + quả cân "2 kg" (đĩa phải) -> 3 kg.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 238
K = dict(arm=118, pan_w=180, post_h=58, drop=10)
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
kg = lambda x, lab, w: bal_item(weight(x, 0, lab, w=w), int(lab.split()[0]) * 1000, f'quả cân {lab}')
parts = [
    balance_scale(215, 234, bal_item(sack(0, 0, ['GẠO', 'TẺ'], w=160, h=128, col=SKY_D, size=22), 6000, 'túi gạo'),
                  kg(-44, '1 kg', 62) + kg(34, '5 kg', 90), **K),
    balance_scale(680, 234, bal_item(pillow_bag(0, 0, 'ĐƯỜNG', w=140, h=84, col=CREAM, size=19), 3000, 'túi đường'),
                  kg(-40, '1 kg', 62) + kg(36, '2 kg', 78), **K),
]
save('bai15_t3_q2_scales', W, H, parts)
