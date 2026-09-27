"""
Vở BT Toán 2, Bài 49 Tiết 1 Q3 — túi gạo đàn kiến chuyển mỗi ngày: nét riêng.
Giữ nội dung toán: nhãn "Mẫu:  Thứ Sáu:" 4 túi, "a) Thứ Bảy:" 6 túi, "b) Chủ nhật:" 2 túi.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 700, 344
parts = []
rows = [('Mẫu:&#160; Thứ Sáu:', 4, 262, 100), ('a) Thứ Bảy:', 6, 214, 216), ('b) Chủ nhật:', 2, 232, 334)]
for lab, n, x0, by in rows:
    parts.append(text(4, by - 8, lab, size=24, weight=500, anchor='start'))
    for i in range(n):
        parts.append(pouch(x0 + i * 86, by, 80, 94, col='#F4F1EA', tie=BLUE, sw=3))
save('bai49_t1_q3_bags', W, H, parts)
