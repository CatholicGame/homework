"""
Vở BT Toán 2, Bài 58 Tiết 2 Q4 — xe tải có thùng dài 41 dm (xe nét riêng).
Giữ nội dung toán: mũi tên đo chiều dài thùng xe ghi "41 dm".
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 260, 123
x0, x1, yb = 8, 186, 70
parts = [truck(x0, x1, yb, cab_side='right', cab_w=62, body=GREEN),
         dim(x0, x1, yb - 12, '41 dm', size=21, ly=yb - 22)]
save('bai58_t2_q4_truck41', W, H, parts)
