"""
Luyện tập Toán 3, Tuần 13 Tiết 2 Q1b — bình rót hết nước ra 3 ca: nét riêng.
Giữ nội dung toán: 3 ca đầy nước, to nhỏ khác nhau, ghi 500 ml, 300 ml, 200 ml.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 820, 405, 2
p = [tilted_jug(150, 84, w=118, h=92, deg=32, flip=True),
     stream(151, 88, 158, 110, w=6)]
for cx, w, h, lab in ((168, 50, 70, '500 ml'), (270, 42, 58, '300 ml'), (360, 34, 46, '200 ml')):
    p.append(mug(cx, 172, w, h))
    p.append(text(cx + 4, 197, lab, size=22, weight=600))
save('tuan13_t2_q1_jug', W, H, scaled(p, K), folder='grade3-practice')
