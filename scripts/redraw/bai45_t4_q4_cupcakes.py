"""
Vở BT Toán 2, Bài 45 Tiết 4 Q4 — một đĩa có 5 cái bánh kem: nét riêng.
Giữ nội dung toán: đúng 1 đĩa, 5 cái bánh kem.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 420, 318
parts = [plate(210, 212, 410, 150, sw=3)]
for x, y, cr, cu in ((92, 190, PINK, BLUE), (210, 172, '#FFF1C9', PURPLE), (328, 190, PINK, BLUE)):
    parts.append(cupcake(x, y, 96, 122, cr, cu))
for x, y, cr, cu in ((150, 282, '#FFF1C9', PURPLE), (270, 282, PINK, BLUE)):
    parts.append(cupcake(x, y, 102, 128, cr, cu))
save('bai45_t4_q4_cupcakes', W, H, parts)
