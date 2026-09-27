"""
Vở BT Toán 2, Bài 73 Tiết 1 Q4 — bốn can A, B, C, D: nét riêng.
Nội dung toán giữ đúng sách: A "10 l" · B "2 l" · C "3 l" · D "5 l", chữ tên can bên dưới
(can to hơn khi số lít lớn hơn).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import jerrycan, litre

W, H = 546, 217
P = []
for name, n, cx, w, h in (('A', 10, 68, 112, 146), ('B', 2, 222, 70, 88), ('C', 3, 344, 82, 104), ('D', 5, 484, 96, 128)):
    P.extend(jerrycan(cx, 170, w, h, label=litre(n), size=max(20, min(w * .3, 28))))
    P.append(text(cx, 208, name, size=26, weight=600))
save('bai73_t1_q4_cans', W, H, P)
