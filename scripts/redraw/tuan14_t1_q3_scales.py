"""
Luyện tập Toán 3, Tuần 14 Tiết 1 Q3 — hai cân đĩa thăng bằng: nét riêng.
Giữ nội dung toán: cân 1: 200 g + quả táo = 500 g (táo 300 g);
cân 2: 500 g = 100 g + hộp quà (hộp quà 400 g).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 1680, 440, 2.5
p = [balance_scale(164, 172, arm=82, pan_w=130, post_h=48,
                   left=wt(-38, 0, '200 g', w=32, dx=-6, rise=24, hr=1) + apple(20, 0, r=24),
                   right=wt(0, 0, '500 g', w=52, hr=.95)),
     balance_scale(504, 172, arm=82, pan_w=130, post_h=48,
                   left=wt(0, 0, '500 g', w=52, hr=.95),
                   right=wt(-38, 0, '100 g', w=26, dx=-10, rise=30, hr=1) + gift_box(22, 0, w=64, h=58))]
save('tuan14_t1_q3_scales', W, H, scaled(p, K), folder='grade3-practice')
