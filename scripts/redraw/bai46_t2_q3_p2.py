"""Vở BT Toán 2, Bài 46 Tiết 2 Q3 — mảnh p2: khối trụ bị cắt vát, mặt cắt cao dần sang phải
(ghép với p3 thành khối trụ). Vẽ lại bằng nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 190, 226
m = cylinder(1, 1.3, BLUE, top=lambda x, z: 1.3 + 0.55 * x)
save('bai46_t2_q3_p2', W, H, render_fit(m, 0, 0, W, H, pad=10))
