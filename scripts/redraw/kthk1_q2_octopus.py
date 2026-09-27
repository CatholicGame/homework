"""
Luyện tập Toán 3, KT cuối HK1 Q2 — bạch tuộc ghi số 33, các mũi tên dẫn tới đám mây:
gấp 8 lần → [264] → giảm 2 lần → [ ];  thêm 5 đơn vị → [ ] → gấp 4 lần → [ ];
giảm 3 lần → [ ] → gấp 4 lần → [ ];  gấp 6 lần → [ ] → giảm 9 đơn vị → [ ].
Giữ đúng sơ đồ, nhãn, số; bạch tuộc và mây là nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_p2 import octopus, cloud, arrow_head, place

W, H = 1500, 1120
LINE = '#4A90D9'
SW = 5
FS = 54
parts = []


def line(pts):
    return f'<polyline points="{" ".join(f"{x},{y}" for x, y in pts)}" fill="none" stroke="{LINE}" stroke-width="{SW}" stroke-linejoin="round"/>'


def arrow(pts, d):
    x, y = pts[-1]
    return line(pts) + arrow_head(x, y, d, 18, LINE)


def lab(x, y, s, anchor='start'):
    return text(x, y, s, size=FS, weight=500, anchor=anchor)


CW = 165
# nhánh lên: 33 → 264 → ?
parts.append(arrow([(685, 450), (685, 212), (548, 212)], 'l'))
parts.append(arrow([(382, 212), (206, 212)], 'l'))
parts.append(cloud(462, 205, CW, fill='#BFE0F7', stroke=LINE))
parts.append(text(466, 240, '264', size=58, weight=600))
parts.append(cloud(118, 205, CW, stroke=LINE))
parts.append(lab(578, 195, 'gấp 8 lần'))
parts.append(lab(306, 197, 'giảm', 'middle'))
parts.append(lab(306, 266, '2 lần', 'middle'))
# nhánh phải: giảm 3 lần → ? → gấp 4 lần → ?
parts.append(arrow([(790, 563), (1035, 563), (1035, 432)], 'u'))
parts.append(arrow([(1035, 305), (1035, 168)], 'u'))
parts.append(cloud(1035, 368, CW, stroke=LINE))
parts.append(cloud(1035, 100, CW, stroke=LINE))
parts.append(lab(838, 620, 'giảm 3 lần'))
parts.append(lab(1052, 260, 'gấp 4 lần'))
# nhánh trái: thêm 5 đơn vị → ? → gấp 4 lần → ?
parts.append(arrow([(560, 565), (332, 565), (332, 706)], 'd'))
parts.append(arrow([(332, 830), (332, 968)], 'd'))
parts.append(cloud(335, 770, CW, stroke=LINE))
parts.append(cloud(335, 1035, CW, stroke=LINE))
parts.append(lab(222, 545, 'thêm 5 đơn vị'))
parts.append(lab(358, 912, 'gấp 4 lần'))
# nhánh dưới: gấp 6 lần → ? → giảm 9 đơn vị → ?
parts.append(arrow([(685, 660), (685, 912), (822, 912)], 'r'))
parts.append(arrow([(988, 912), (1305, 912)], 'r'))
parts.append(cloud(905, 905, CW, stroke=LINE))
parts.append(cloud(1390, 905, CW, stroke=LINE))
parts.append(lab(702, 790, 'gấp 6 lần'))
parts.append(text(1146, 888, 'giảm 9 đơn vị', size=50, weight=500))
# bạch tuộc
parts.append(place(octopus(), 675, 540, 1.15))
parts.append(text(675, 520, '33', size=56, weight=700))
save('kthk1_q2_octopus', W, H, parts, folder='grade3-practice')
