"""
Vở BT Toán 2, Bài 73 Tiết 1 Q2 — con mèo, quả dưa trên cân đĩa: nét riêng.

Nội dung toán giữ đúng sách, cả hai cân đều THĂNG BẰNG:
  a) đĩa trái quả cân "2 kg" + "5 kg", đĩa phải con mèo          (-> mèo 7 kg)
  b) đĩa trái quả cân "2 kg" + quả dưa hấu, đĩa phải quả cân "5 kg" (-> dưa 3 kg)
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 281
K = dict(arm=120, pan_w=170, post_h=56, drop=10)
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
kg = lambda x, lab, w: bal_item(weight(x, 0, lab, w=w), int(lab.split()[0]) * 1000, f'quả cân {lab}')
P = [
    balance_scale(215, 274, kg(-44, '2 kg', 58) + kg(36, '5 kg', 76),
                  bal_item(plush_cat(0, 0, 176, fur='#F4B26B', light=WHITE), 7000, 'con mèo'), tilt=0, **K),
    balance_scale(685, 274, kg(-54, '2 kg', 58) + bal_item(watermelon(26, 0, 120, 82), 3000, 'quả dưa'),
                  kg(0, '5 kg', 80), tilt=0, **K),
]
save('bai73_t1_q2_scales', W, H, P)
