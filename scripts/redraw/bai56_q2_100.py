"""
Vở BT Toán 2, Bài 56 Q2 — tờ tiền 100 đồng (cách điệu, không chép hoa văn tiền thật).
Giữ nội dung toán: mệnh giá 100 đồng.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 240, 125
save('bai56_q2_100', W, H, [banknote(5, 5, 230, H - 10, 100)])
