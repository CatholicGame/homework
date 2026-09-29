"""
Vở BT Toán 2, Bài 15 Tiết 2 Q1 — quả cân 1 kg với mèo, thỏ, chó: nét riêng.

Nội dung toán giữ đúng sách: mỗi cân có quả cân "1 kg" ở đĩa trái.
* cân 1: đĩa phải là con mèo, đĩa TRÁI (1 kg) thấp hơn -> mèo nhẹ hơn 1 kg.
* cân 2: đĩa phải là con thỏ, cân THĂNG BẰNG -> thỏ nặng 1 kg.
* cân 3: đĩa phải là con chó (đốm), đĩa PHẢI thấp hơn -> chó nặng hơn 1 kg.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 136
K = dict(arm=80, pan_w=122, post_h=42, drop=9)
parts = []
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
animals = [(bal_item(plush_cat(0, 0, 52, fur=ORANGE, light=CREAM), 800, 'con mèo'), -1),
           (bal_item(plush_bunny(0, 0, 66, fur=WHITE, shirt=PINK), 1000, 'con thỏ'), 0),
           (bal_item(plush_dog(0, 0, 60, fur=WHITE, ear=INK, spots=True), 1500, 'con chó'), 1)]
for i, (pet, tilt) in enumerate(animals):
    parts.append(balance_scale(150 + i * 300, 132, bal_item(weight(0, 0, '1 kg', w=50), 1000, 'quả cân 1 kg'), pet, tilt=tilt, **K))
save('bai15_t2_q1_scales', W, H, parts)
