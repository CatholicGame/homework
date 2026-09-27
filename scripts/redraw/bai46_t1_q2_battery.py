"""Vở BT Toán 2, Bài 46 Tiết 1 Q2 — cục pin dạng khối trụ (nằm ngang). Vẽ lại bằng nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 200, 132
# trục nằm theo x: thân xanh, đầu dương vàng, núm bạc ở bên phải
body = cylinder(1, 2.3, GREEN).rot('z', -90).move(dx=-1.7)
cap = cylinder(1, 1.1, YELLOW).rot('z', -90).move(dx=0.6)
nub = cylinder(0.36, 0.28, GREY).rot('z', -90).move(dx=1.7)
mesh = Mesh().extend(body).extend(cap).extend(nub)
parts = render_fit(mesh, 0, 0, W, H, pad=10, yaw=-24, pitch=14)
save('bai46_t1_q2_battery', W, H, parts)
