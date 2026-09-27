"""
Luyện tập Toán 3, Tuần 16 Tiết 1 Q3 — cân đĩa thăng bằng: 2 ô tô đồ chơi = 200 g + 300 g: nét riêng.
Giữ nội dung toán: 2 chiếc ô tô giống nhau bên trái, quả cân 200 g và 300 g bên phải, cân thăng bằng.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 1120, 552, 2
p = [balance_scale(280, 272, arm=112, pan_w=168, post_h=92, s=1.3,
                   left=toy_car(-40, 0, w=78, col=RED) + toy_car(40, 0, w=78, col=RED),
                   right=weight(-34, 0, '200 g', w=62, size=15) + weight(34, 0, '300 g', w=66, size=15))]
save('tuan16_t1_q3_scale', W, H, scaled(p, K), folder='grade3-practice')
