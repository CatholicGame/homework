"""
Vở BT Toán 3 Tập hai, Bài 79 Tiết 2 Q3a — ba đồng hồ: 3 giờ 5 phút, 10 giờ 20 phút,
2 giờ 40 phút (kim ngắn đặt đúng theo phút). Kim dừng trước vòng số, không che số.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g3 import *

R = 88
W, H = 3 * (2 * R + 30), 2 * R + 12
P = []
for i, (h, m) in enumerate([(3, 5), (10, 20), (2, 40)]):
    cx = 15 + R + i * (2 * R + 30)
    P.append(clock(cx, R + 6, R, h, m))
save('bai79_t2_q3_clocks', W, H, P, folder='grade3-workbook-2')
