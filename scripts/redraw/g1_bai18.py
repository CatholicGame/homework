"""
Vở BT Toán 1, Bài 18 (Số 8) — nét riêng.
  Q2: bốn nhóm xúc xắc 7|1, 6|2, 5|3, 4|4, dây xuống ba ô trống (trái, cả nhóm, phải);
      ô trống là ô nhập của app, nằm ngay dưới hình (hình rộng 134px = ba ô 2.6rem).
  Q3: tám bạn cầm biển số: 1, 2, (trống), (trống), (trống), 6, (trống), (trống).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_c import dice_group, st
from kit_g1 import kid

F = 'grade1-workbook'
for i, (a, b) in enumerate(((7, 1), (6, 2), (5, 3), (4, 4)), 1):
    save(f'bai18_q2_group{i}', 256, 196, [dice_group(128, 4, a, b, spread=88, boxes=False, by=196)], folder=F)

P = []
looks = [
    dict(girl=False, shirt=GREEN, bottom='#4E8FC8', shoe=RED),
    dict(girl=True, shirt='#FFB3C7', bottom='#F7839F', shoe='#6FB7EA'),
    dict(girl=False, shirt=YELLOW, bottom='#7C8CD6', shoe=ORANGE, hair='#6B4A3A'),
    dict(girl=False, shirt=BLUE, bottom='#4E8FC8', shoe=RED),
    dict(girl=True, shirt=PURPLE, bottom='#9C7FE0', shoe=RED, hair='#6B4A3A'),
    dict(girl=False, shirt=ORANGE, bottom='#4E8FC8', shoe=BLUE),
    dict(girl=True, shirt=TEAL, bottom='#3FA88F', shoe=ORANGE),
    dict(girl=False, shirt='#FFB3C7', bottom='#7C8CD6', shoe=GREEN, hair='#6B4A3A'),
]
cards = ['1', '2', '', '', '', '6', '', '']
for i, lk in enumerate(looks):
    x = 56 + i * 100
    P.append(kid(x, 250, 220, pose='down', **lk))
    P.append(f'<rect x="{x - 26}" y="132" width="52" height="56" rx="6" fill="{WHITE}" {st(2.8)}/>')
    if cards[i]:
        P.append(text(x, 174, cards[i], 38, 700))
save('bai18_q3_kids', 812, 258, P, folder=F)
