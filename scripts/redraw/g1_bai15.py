"""
Vở BT Toán 1, Bài 15 (Luyện tập chung) Q1 — nét riêng, mỗi phần một hình:
  a) hai lọ hoa: lọ trái 3 bông, lọ phải 2 bông.
  b) khung trái 4 con ngựa, khung phải 3 con ngựa.
  c) hình bầu dục trái 4 con vịt, hình bầu dục phải 5 con vịt.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_c import vase_with_flowers, frame, place, st
from kit_p2 import horse
from kit_g9 import duck

F = 'grade1-workbook'
# a)
P = [place(vase_with_flowers(3), 130, 186), place(vase_with_flowers(2, petal=PURPLE, vfill=TEAL), 330, 186)]
save('bai15_q1_a_flowers', 460, 192, P, folder=F)
# b)
P = [frame(4, 4, 340, 240, rx=26, fill='#FBFDF7'), frame(356, 4, 340, 240, rx=26, fill='#FBFDF7')]
HS = .36
for (x, y) in ((14, 14), (174, 14), (14, 126), (174, 126)):
    P.append(place(horse(), x, y, HS))
for (x, y) in ((366, 14), (526, 14), (446, 126)):
    P.append(place(horse(), x, y, HS))
save('bai15_q1_b_horses', 700, 248, P, folder=F)
# c)
P = [f'<ellipse cx="176" cy="92" rx="172" ry="86" fill="#F2FAFF" {st(2.6)}/>',
     f'<ellipse cx="524" cy="92" rx="172" ry="86" fill="#F2FAFF" {st(2.6)}/>']
for i in range(4):
    P.append(place(duck(), 76 + i * 68, 132, 1.25))
for i in range(5):
    P.append(place(duck(), 402 + i * 60, 132, 1.1))
save('bai15_q1_c_ducks', 700, 182, P, folder=F)
