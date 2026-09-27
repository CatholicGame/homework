"""
Luyện tập Toán 3, Tuần 18 Tiết 2 Q4 — cân đĩa thăng bằng: 2 quả bóng + 100 g = 500 g + 200 g: nét riêng.
Giữ nội dung toán: hai quả bóng giống nhau và quả cân 100 g bên trái; 500 g và 200 g bên phải.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 930, 540, 2
left = soccer_ball(-52, 0, r=25) + soccer_ball(-2, 0, r=25) + wt(48, 0, '100 g', w=26, hr=1.05, dx=-4, rise=30, size=19)
right = wt(-26, 0, '500 g', w=52, hr=1.0, dx=-6, rise=18, size=19) + wt(40, 0, '200 g', w=36, hr=1.05, dx=10, rise=18, size=19)
p = [balance_scale(232, 268, arm=100, pan_w=164, post_h=72, s=1.2, left=left, right=right)]
save('tuan18_t2_q4_scale', W, H, scaled(p, K), folder='grade3-practice')
