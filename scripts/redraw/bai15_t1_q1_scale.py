"""
Vở BT Toán 2, Bài 15 Tiết 1 Q1 — 3 bạn chó và 4 bạn thỏ trên cân đĩa: nét riêng.

Nội dung toán giữ đúng sách: đĩa trái có đúng 3 chú chó bông, đĩa phải có đúng 4 chú
thỏ bông; đĩa PHẢI (thỏ) THẤP hơn -> 4 bạn thỏ nặng hơn 3 bạn chó.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 680, 375
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
dog = lambda svg: bal_item(svg, 700, 'chó bông')
bun = lambda svg: bal_item(svg, 600, 'thỏ bông')
dogs = (dog(plush_dog(-84, 0, 124, fur='#F2C48D', ear=BROWN))
        + dog(plush_dog(84, 0, 124, fur='#D9D2C8', ear='#8C7B6B'))
        + dog(plush_dog(0, 0, 128, fur=WHITE, ear=ORANGE, spots=True)))
bunnies = (bun(plush_bunny(-96, 0, 138, fur=WHITE)) + bun(plush_bunny(96, 0, 138, fur='#E7DCF7', inner=PINK))
           + bun(plush_bunny(-32, 0, 142, fur='#FFE3CC')) + bun(plush_bunny(32, 0, 142, fur='#DDEFD8')))
parts = [balance_scale(340, 366, dogs, bunnies, tilt=1, arm=200, pan_w=260, post_h=110, drop=22)]
save('bai15_t1_q1_scale', W, H, parts)
