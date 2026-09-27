"""Luyện tập Toán 3, Tuần 15 Tiết 2 Q2 — ngựa (thẻ nối): nét riêng."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_p2 import *

W, H = 400, 300
save('tuan15_t2_q2_horse', W, H, [place(horse(), 0, 12, 1.0)], folder='grade3-practice')
