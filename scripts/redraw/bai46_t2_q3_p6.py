"""Vở BT Toán 2, Bài 46 Tiết 2 Q3 — mảnh p6: 1/4 khối trụ nằm ngang (ghép vào chỗ khuyết của
mảnh p1). Vẽ lại bằng nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 260, 121
m = cylinder(1, 3.1, BLUE, a0=0, a1=90).rot('z', 90)
save('bai46_t2_q3_p6', W, H, render_fit(m, 0, 0, W, H, pad=8, yaw=24))
