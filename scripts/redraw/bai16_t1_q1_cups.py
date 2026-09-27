"""
Vở BT Toán 2, Bài 16 Tiết 1 Q1 — cốc A, ca B, bình C, bình D: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: A là cốc nhỏ (ít hơn 1 l), ca B ghi "1 l", bình C ghi "1 l"
(bằng ca B), D là bình cao đựng nhiều nước nhất (hơn 1 l). Nhãn A B C D dưới mỗi đồ vật.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import *

W, H = 544, 265
BY = 192
parts = []
parts += beaker(52, BY, 80, 64, level=.78, sw=3.5)                       # A: cốc nhỏ
parts += measuring_jug(198, BY, 104, 108, level=.88, label=litre(1), size=34, sw=3.5)   # B
parts += beaker(360, BY, 88, 130, level=.8, label=litre(1), size=34, sw=3.5)            # C
parts += beaker(490, BY, 82, 184, level=.9, sw=3.5)                      # D: bình cao
for x, s in ((52, 'A'), (198, 'B'), (360, 'C'), (490, 'D')):
    parts.append(text(x, 252, s, size=34, weight=600))
save('bai16_t1_q1_cups', W, H, parts)
