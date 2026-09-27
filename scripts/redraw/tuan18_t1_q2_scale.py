"""
Luyện tập Toán 3, Tuần 18 Tiết 1 Q2 — cân đĩa thăng bằng: 2 gấu bông = 3 quả cân 200 g: nét riêng.
Giữ nội dung toán: 2 con gấu giống nhau bên trái, 3 quả cân ghi 200 g bên phải, cân thăng bằng.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 980, 550, 2
bears = plush_bear(-34, 0, h=84) + plush_bear(34, 0, h=84)
wts = (wt(-48, 0, '200 g', w=40, hr=1.05, dx=-6, rise=14, size=18)
       + wt(48, 0, '200 g', w=40, hr=1.05, dx=4, rise=14, size=18)
       + wt(0, 0, '200 g', w=40, hr=1.05, rise=40, size=18))
p = [balance_scale(245, 272, arm=104, pan_w=152, post_h=72, s=1.25, left=bears, right=wts)]
save('tuan18_t1_q2_scale', W, H, scaled(p, K), folder='grade3-practice')
