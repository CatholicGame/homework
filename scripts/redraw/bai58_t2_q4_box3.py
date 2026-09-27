"""
Vở BT Toán 2, Bài 58 Tiết 2 Q4 — thùng hàng dài 3 m (khối hộp nét riêng).
Giữ nội dung toán: mũi tên đo chiều dài thùng ghi "3 m".
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 200, 128
x, y, w, h, depth = 6, 38, 160, 54, 28
parts = [cuboid(x, y, w, h, depth),
         dim(x, x + w, y + h + 12, '3 m', size=22, ly=H - 4)]
save('bai58_t2_q4_box3', W, H, parts)
