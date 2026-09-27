"""
Vở BT Toán 2, Bài 40 Tiết 1 Q3 — 4 đèn ông sao, mỗi đèn 5 cánh: nét riêng.
Giữ nội dung toán: đúng 4 đèn, mỗi đèn đúng 5 cánh, có cán cầm.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 295
cols = [(YELLOW, '#FFF0B8'), (RED, '#FFD3CF'), (TEAL, '#D5F3EA'), (PURPLE, '#E6DFFB')]
parts = [star_lantern(100 + i * 233, 96, 88, c, l, stick_len=166) for i, (c, l) in enumerate(cols)]
save('bai40_t1_q3_lanterns', W, H, parts)
