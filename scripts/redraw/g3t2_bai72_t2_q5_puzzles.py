"""
Vở BT Toán 3 Tập hai, Bài 72 Tiết 2 Q5 (trang 98) — viết chữ số vào ô trống:
a) 1 0 ☐ 2 ☐ × 3 = ☐ 1 2 7 5 (đặt cột);
b) 3 4 5 6 0 : 6, các dòng ☐5 / ☐6 / 0 0, thương 5 ☐ 6 ☐.
Chữ số viết giãn cách như sách (mỗi chữ số một cột, ô trống thay chữ số).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
import g3t2_bai72_colcalc as cc
from g3t2_bai72_colcalc import *

cc.DW = 30
W, H = 720, 210
parts = []
# a)
parts.append(text(16, 44, 'a)', size=28, weight=600, anchor='start'))
xr = 230
parts.append(num(xr, 44, '10#2#'))
parts.append(num(xr, 90, '3'))
parts.append(text(xr - 6 * cc.DW + 4, 72, '×', size=40, weight=400))
parts.append(line(xr - 6 * cc.DW - 6, 106, xr + 4, 106))
parts.append(num(xr, 148, '#1275'))
# b)
x0 = 380
parts.append(text(x0 - 48, 44, 'b)', size=28, weight=600, anchor='start'))
parts.append(longdiv(x0, 44, '34560', '6', '5#6#', [('#5', 2), ('#6', 3), ('00', 4)], qbox_w=4 * cc.DW + 30, step_h=44))
save('bai72_t2_q5_puzzles', W, H, parts, folder='grade3-workbook-2')
