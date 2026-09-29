"""
Vở BT Toán 2, Bài 15 Tiết 2 Q3 — bí ngô, dưa hấu, nải chuối cân với quả cân 1 kg: nét riêng.

Nội dung toán giữ đúng sách — cả ba cân đều THĂNG BẰNG, quả cân "1 kg" ở đĩa phải:
* trên trái: quả bí ngô  = 1 kg                  -> bí ngô nặng bằng 1 kg.
* trên phải: quả dưa hấu + 1 quả táo nhỏ = 1 kg   -> dưa hấu nhẹ hơn 1 kg.
* dưới giữa: nải chuối = 1 kg + 1 quả cam         -> nải chuối nặng hơn 1 kg (nặng nhất).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 351
K = dict(arm=108, pan_w=156, post_h=52, drop=10)
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
kg = lambda x=0: bal_item(weight(x, 0, '1 kg', w=76), 1000, 'quả cân 1 kg')
parts = [
    balance_scale(170, 172, bal_item(pumpkin(0, 0, 96, 64), 1000, 'quả bí ngô'), kg(), **K),
    balance_scale(730, 172, bal_item(watermelon(-12, 0, 104, 64), 850, 'quả dưa hấu') + bal_item(apple(56, 0, 14), 150, 'quả táo'), kg(), **K),
    balance_scale(450, 346, bal_item(banana_bunch(0, 0, 150, n=8), 1200, 'nải chuối'), kg(-14) + bal_item(orange(56, 0, 16), 200, 'quả cam'), **K),
]
save('bai15_t2_q3_scales', W, H, parts)
