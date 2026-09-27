"""Vở BT Toán 2, Bài 46 Tiết 2 Q3 — mảnh p1: khối trụ đứng bị khuyết 1/4 (phần khuyết quay ra
trước), ghép với mảnh p6 (1/4 khối trụ) thành khối trụ. Vẽ lại bằng nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 208, 408
m = cylinder(1, 3.1, BLUE, a0=105, a1=375)
save('bai46_t2_q3_p1', W, H, render_fit(m, 0, 0, W, H, pad=10))
