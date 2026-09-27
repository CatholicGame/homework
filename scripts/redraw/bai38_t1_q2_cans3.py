"""
Vở BT Toán 2, Bài 38 Tiết 1 Q2 — khung 4 can, mỗi can "3 l": nét riêng.
Nội dung toán giữ đúng sách: đúng 4 can, nhãn "3 l" (-> 3 × 4 = 12 l).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import jerrycan, litre

W, H = 837, 306
P = [f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="30" fill="none" stroke="{INK}" stroke-width="3"/>']
for i in range(4):
    P.extend(jerrycan(106 + i * 200, 272, 160, 226, label=litre(3), size=40))
save('bai38_t1_q2_cans3', W, H, P)
