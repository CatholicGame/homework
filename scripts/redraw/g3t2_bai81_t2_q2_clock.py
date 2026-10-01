"""
Vở BT Toán 3 Tập hai, Bài 81 Tiết 2 Q2 — đồng hồ lúc Nam đi học: 7 giờ 5 phút.
Kim dừng trước vòng số, không che số.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g3 import *

R = 92
P = [clock(R + 6, R + 6, R, 7, 5)]
save('bai81_t2_q2_clock', 2 * R + 12, 2 * R + 12, P, folder='grade3-workbook-2')
