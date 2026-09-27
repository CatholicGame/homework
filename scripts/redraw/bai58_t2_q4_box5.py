"""
Vở BT Toán 2, Bài 58 Tiết 2 Q4 — thùng hàng dài 5 m (khối hộp nét riêng).
Giữ nội dung toán: mũi tên đo chiều dài thùng ghi "5 m".
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 280, 117
x, y, w, h, depth = 6, 34, 240, 46, 26
parts = [cuboid(x, y, w, h, depth),
         dim(x, x + w, y + h + 12, '5 m', size=22, ly=H - 4)]
save('bai58_t2_q4_box5', W, H, parts)
