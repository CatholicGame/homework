"""
Vở BT Toán 3, Bài 43 Tiết 2 câu 1 — a) đường gấp khúc ABCD, mỗi đoạn 35 mm;
b) cân thăng bằng: đĩa trái 2 quả cân 500 g, đĩa phải 3 quả xoài + quả cân 200 g. Nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *
from kit_measure import balance_scale, weight

W, H = 1390, 840
parts = [text(12, 62, 'a)', size=58, weight=500, anchor='start'),
         text(12, 548, 'b)', size=58, weight=500, anchor='start')]
pts = [(202, 300), (575, 87), (905, 362), (1278, 148)]
parts.append(polyline_fig(pts, 'ABCD', ['35 mm'] * 3,
                          [(-40, 26), (0, -30), (4, 56), (46, 4)], size=54, sw=4.5, lab_off=40))
left = weight(-32, 0, '500 g', w=52, size=13) + weight(32, 0, '500 g', w=52, size=13)
right = (mango(-50, 0, 40, rot=-8) + mango(-14, 0, 40, rot=6) + mango(22, 0, 40, rot=-4)
         + weight(56, 0, '200 g', w=36, size=10.5))
parts.append(balance_scale(605, 822, left, right, tilt=0, arm=100, pan_w=150, s=2.75))
save('bai43_t2_q1_figures', W, H, parts, folder='grade3-workbook')
