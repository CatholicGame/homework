"""
Vở BT Toán 2, Bài 38 Tiết 1 Q2 — khung 3 can, mỗi can "5 l": nét riêng.
Nội dung toán giữ đúng sách: đúng 3 can, nhãn "5 l" (-> 5 × 3 = 15 l).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import jerrycan, litre

W, H = 842, 312
P = [f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="30" fill="none" stroke="{INK}" stroke-width="3"/>']
for i in range(3):
    P.extend(jerrycan(150 + i * 270, 280, 196, 244, label=litre(5), size=44))
save('bai38_t1_q2_cans5', W, H, P)
