"""
Vở BT Toán 2, Bài 58 Tiết 2 Q4 — xe tải có thùng dài 57 dm (xe nét riêng).
Giữ nội dung toán: mũi tên đo chiều dài thùng xe ghi "57 dm".
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 300, 114
x0, x1, yb = 66, 294, 64
parts = [truck(x0, x1, yb, cab_side='left', cab_w=58, body=RED),
         dim(x0, x1, yb - 12, '57 dm', size=21, ly=yb - 22)]
save('bai58_t2_q4_truck57', W, H, parts)
