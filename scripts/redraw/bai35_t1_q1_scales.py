"""
Vở BT Toán 2, Bài 35 Tiết 1 Q1 — bí ngô, bưởi, cam trên hai cân đĩa: nét riêng.

Nội dung toán giữ đúng sách:
* cân trên: đĩa trái quả bí ngô THẤP hơn, đĩa phải quả bưởi -> bí ngô nặng hơn bưởi.
* cân dưới: đĩa trái quả cam CAO hơn, đĩa phải quả bưởi thấp -> bưởi nặng hơn cam.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 573, 546
K = dict(arm=150, pan_w=210, post_h=70, drop=20)
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
P = [
    balance_scale(286, 262, bal_item(pumpkin(0, 0, 140, 106), 3000, 'quả bí ngô'), bal_item(pomelo(0, 0, 50), 1000, 'quả bưởi'), tilt=-1, **K),
    balance_scale(286, 536, bal_item(orange(0, 0, 34), 200, 'quả cam'), bal_item(pomelo(0, 0, 50), 1000, 'quả bưởi'), tilt=1, **K),
]
save('bai35_t1_q1_scales', W, H, P)
