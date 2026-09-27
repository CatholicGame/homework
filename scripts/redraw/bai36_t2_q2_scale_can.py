"""
Vở BT Toán 2, Bài 36 Tiết 2 Q2 — cân dưa hấu và can nước rót ra ca: nét riêng.

Nội dung toán giữ đúng sách:
a) cân đĩa THĂNG BẰNG: đĩa trái có quả dưa hấu + quả cân 2 kg, đĩa phải quả cân 5 kg
   (-> dưa nặng 3 kg).
b) một can đầy ghi "10 l" đang rót vào ba ca, mỗi ca ghi "2 l" (-> can còn 4 l).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 250
parts = []
parts.append(text(8, 30, 'a)', size=26, weight=600, anchor='start'))
parts.append(text(500, 30, 'b)', size=26, weight=600, anchor='start'))

left = watermelon(10, 0, 170, 96) + weight(-52, 0, '2 kg', w=66)
right = weight(0, 0, '5 kg', w=86)
parts.append(balance_scale(262, 242, left, right, tilt=0, arm=142, pan_w=176, post_h=88))

# b) can 10 l nghiêng rót vào ca đầu tiên
CX, CY, CW, CH, ANG = 610, 178, 140, 118, 32
cups = [(697, 0.35), (772, 0), (847, 0)]
sx, sy = jerrycan_spout(CX, CY, CW, CH, ANG)
parts.append(jerrycan(CX, CY, '10 l', CW, CH, ANG, label_size=30))
parts.append(pour_stream(sx, sy, cups[0][0] - 8, 186, w=9, bend=0.1))
for x, f in cups:
    parts.append(cup(x, 244, '2 l', w=58, h=56, fill=f, label_size=22))

save('bai36_t2_q2_scale_can', W, H, parts)
