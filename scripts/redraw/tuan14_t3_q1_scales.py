"""
Luyện tập Toán 3, Tuần 14 Tiết 3 Q1 — hai cân đĩa thăng bằng: nét riêng.
Giữ nội dung toán: a) 3 hộp bánh = 500 g + 100 g (600 g);
b) 2 hộp sữa + 50 g = 500 g (hai hộp sữa 450 g).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 1570, 410, 2.5
cols = ('#F4A259', '#F07167', '#6CCFB5')
boxes = ''.join(biscuit_box(x, 0, w=34, h=42, col=cols[i]) for i, x in enumerate((-40, 0, 40)))
milks = ''.join(milk_box(x, 0, w=30, h=58) for x in (-32, 3))
p = [text(8, 26, 'a)', size=24, weight=600, anchor='start'),
     text(322, 26, 'b)', size=24, weight=600, anchor='start'),
     balance_scale(160, 160, arm=78, pan_w=126, post_h=44,
                   left=boxes,
                   right=wt(-18, 0, '500 g', w=46, hr=.95, dx=-16) + wt(36, 0, '100 g', w=26, hr=1, dx=-2, rise=30)),
     balance_scale(482, 160, arm=78, pan_w=126, post_h=44,
                   left=milks + wt(40, 0, '50 g', w=20, hr=1, dx=10, rise=26),
                   right=wt(0, 0, '500 g', w=46, hr=.95))]
save('tuan14_t3_q1_scales', W, H, scaled(p, K), folder='grade3-practice')
