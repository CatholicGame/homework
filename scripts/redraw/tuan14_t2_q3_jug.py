"""
Luyện tập Toán 3, Tuần 14 Tiết 2 Q3 — bình rót hết nước ra 3 ca giống nhau: nét riêng.
Giữ nội dung toán: 3 ca đầy nước như nhau, mỗi ca ghi 300 ml.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 860, 405, 2
p = [tilted_jug(154, 84, w=118, h=92, deg=32, flip=True),
     stream(155, 88, 164, 114, w=6)]
for cx in (174, 278, 382):
    p.append(mug(cx, 172, 44, 60))
    p.append(text(cx + 4, 197, '300 ml', size=22, weight=600))
save('tuan14_t2_q3_jug', W, H, scaled(p, K), folder='grade3-practice')
