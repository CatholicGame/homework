"""Vở BT Toán 2, Bài 46 Tiết 2 Q3 — mảnh p5: nửa khối cầu, mặt phẳng quay xuống dưới bên phải
(ghép với p4 thành khối cầu). Vẽ lại bằng nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 220, 213
m = hemisphere(1, BLUE).rot('z', 45).rot('x', -38)
save('bai46_t2_q3_p5', W, H, render_fit(m, 0, 0, W, H, pad=10))
