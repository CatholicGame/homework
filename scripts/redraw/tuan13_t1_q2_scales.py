"""
Luyện tập Toán 3, Tuần 13 Tiết 1 Q2 — cân đĩa (túi bột ngọt) và cân đồng hồ (túi cam): nét riêng.
Giữ nội dung toán: cân đĩa thăng bằng, đĩa trái 500 g + 200 g, đĩa phải túi "Bột ngọt" (= 700 g);
cân đồng hồ vạch 1 kg (trên) / 250 g (phải) / 500 g (dưới) / 750 g (trái), kim chỉ 750 g.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 1660, 505, 2.5
p = [balance_scale(196, 198, arm=104, pan_w=156,
                   left=wt(-34, 0, '500 g', w=54, dx=-8) + wt(30, 0, '200 g', w=38, dx=18, rise=26),
                   right=sack(0, 0, ['Bột', 'ngọt'], w=92, h=94, col=SKY_D, size=19)),
     g_dial(520, 201, 750, w=118, items=net_oranges(0, 0, w=80))]
save('tuan13_t1_q2_scales', W, H, scaled(p, K), folder='grade3-practice')
