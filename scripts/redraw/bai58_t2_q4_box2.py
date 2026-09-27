"""
Vở BT Toán 2, Bài 58 Tiết 2 Q4 — thùng hàng dài 2 m (khối hộp nét riêng).
Giữ nội dung toán: mũi tên đo chiều dài thùng ghi "2 m".
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 150, 129
x, y, w, h, depth = 8, 36, 104, 58, 26
parts = [cuboid(x, y, w, h, depth),
         dim(x, x + w, y + h + 12, '2 m', size=22, ly=H - 4)]
save('bai58_t2_q4_box2', W, H, parts)
