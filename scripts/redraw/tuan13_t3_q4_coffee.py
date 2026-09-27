"""
Luyện tập Toán 3, Tuần 13 Tiết 3 Q4 — bốn gói cà phê bột A, B, C, D: nét riêng.
Giữ nội dung toán: A 300 g, B 100 g, C 400 g, D 500 g (chữ cái dưới mỗi gói).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 1450, 465, 2
p = []
for x, lab, let, col, band in ((72, '300 g', 'A', '#E4C9A0', '#C99A6B'), (256, '100 g', 'B', '#F2D0A4', '#E08E5A'),
                               (446, '400 g', 'C', '#E4C9A0', '#8FB36B'), (634, '500 g', 'D', '#F2D0A4', '#C97B6B')):
    p.append(coffee_bag(x, 192, lab, w=112, h=180, col=col, band=band))
    p.append(text(x, 228, let, size=28, weight=600))
save('tuan13_t3_q4_coffee', W, H, scaled(p, K), folder='grade3-practice')
