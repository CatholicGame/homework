"""
Vở BT Toán 2, Bài 38 Tiết 1 Q2 (mẫu) — khung 3 bình, mỗi bình "2 l": nét riêng.
Nội dung toán giữ đúng sách: đúng 3 bình, nhãn "2 l", bình giữa đặt cao hơn (-> 2 × 3 = 6 l).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import pitcher, litre

W, H = 551, 312
P = [f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="30" fill="none" stroke="{INK}" stroke-width="3"/>']
for cx, by in ((96, 278), (262, 238), (428, 262)):
    P.extend(pitcher(cx, by, 104, 170, level=.85, label=litre(2), size=40, lid=WHITE))
save('bai38_t1_q2_jugs', W, H, P)
