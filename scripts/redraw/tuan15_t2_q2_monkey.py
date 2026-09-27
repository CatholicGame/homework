"""Luyện tập Toán 3, Tuần 15 Tiết 2 Q2 — khỉ (thẻ nối): nét riêng."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_p2 import *

W, H = 260, 275
save('tuan15_t2_q2_monkey', W, H, [place(monkey(), 10, 20, 1.2)], folder='grade3-practice')
