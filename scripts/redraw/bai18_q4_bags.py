"""
Vở BT Toán 2, Bài 18 Q4 — năm túi gạo M, N, P, Q, S: nét riêng.

Nội dung toán giữ đúng sách (trái -> phải): M 2 kg · N 4 kg · P 6 kg · Q 3 kg · S 7 kg,
chữ tên túi ghi bên dưới mỗi túi.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_measure import sack

W, H = 900, 341
P = []
bags = [  # tên, nhãn, x, rộng, cao, màu
    ('M', '2 kg', 62, 112, 118, '#E8ECF0'),
    ('N', '4 kg', 210, 168, 150, '#8FD0F2'),
    ('P', '6 kg', 402, 196, 222, '#CDEBFA'),
    ('Q', '3 kg', 578, 150, 128, '#8FD0F2'),
    ('S', '7 kg', 776, 236, 272, '#D5DCE3'),
]
for name, lab, x, w, h, col in bags:
    P.append(sack(x, 290, [lab], w=w, h=h, col=col, size=30))
    P.append(text(x, 332, name, size=32, weight=600))
save('bai18_q4_bags', W, H, P)
