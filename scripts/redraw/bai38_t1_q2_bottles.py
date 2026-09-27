"""
Vở BT Toán 2, Bài 38 Tiết 1 Q2 — khung 5 chai nước, mỗi chai "2 l": nét riêng.
Nội dung toán giữ đúng sách: đúng 5 chai, nhãn "2 l" (-> 2 × 5 = 10 l).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import litre
from kit_g1 import water_bottle

W, H = 692, 306
P = [f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="30" fill="none" stroke="{INK}" stroke-width="3"/>']
for i in range(5):
    P.append(water_bottle(89 + i * 128.5, 276, 104, 240, litre(2), size=34))
save('bai38_t1_q2_bottles', W, H, P)
