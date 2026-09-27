"""
Vở BT Toán 2, Bài 49 Tiết 1 Q4 — 5 bao hạt dẻ của gia đình sóc: nét riêng.
Giữ nội dung toán: đúng 5 bao; không vẽ hạt dẻ rời.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 420, 438
parts = []
for x, y in ((82, 176), (338, 176), (210, 300), (82, 428), (338, 428)):
    parts.append(pouch(x, y, 140, 162, col='#D9B08A', tie=BROWN, sw=3.2))
save('bai49_t1_q4_sacks', W, H, parts)
