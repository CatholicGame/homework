"""
Vở BT Toán 3 Tập hai, Bài 72 Tiết 1 Q2 (Đ, S?) — ba phép tính đặt cột (trang 96):
a) 15 107 × 6 = 90 602; b) 24 203 × 4 = 96 812; c) 51 836 : 7 = 745 (dư 1),
các dòng 2 8 / 036 / 1 như sách.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from g3t2_bai72_colcalc import *

W, H = 600, 300
parts = []
parts.append(mult(210, 48, '15 107', '6', '90 602', 'a)', 20))
parts.append(mult(560, 48, '24 203', '4', '96 812', 'b)', 340))
# c)
parts.append(text(20, 214, 'c)', size=28, weight=600, anchor='start'))
parts.append(num(210, 214, '51 836'))  # placeholder, redrawn by longdiv below
parts = parts[:-1]
x0 = 210 - width('51 836')
p = longdiv(x0, 214, '51 836', '7', '745', [('2 8', 2), ('036', 4), ('1', 4)])
parts.append(p)
save('bai72_t1_q2_calcs', W, H + 30, parts, folder='grade3-workbook-2')
