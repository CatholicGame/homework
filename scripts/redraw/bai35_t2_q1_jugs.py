"""
Vở BT Toán 2, Bài 35 Tiết 2 Q1 — ba bình A, B, C rót ra các ca 1 l: nét riêng.

Nội dung toán giữ đúng sách (mỗi bình trong một khung nét đứt, bên cạnh là các ca ghi "1 l"):
  bình A: 7 ca (hàng trên 4, hàng dưới 3) · bình B: 5 ca (2 + 3) · bình C: 4 ca (2 + 2).
Bình A to nhất, rồi B, rồi C.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import pitcher, measuring_jug, litre

W, H = 830, 491
P = []


def frame(x0, y0, x1, y1):
    P.append(f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" rx="18" fill="none" stroke="{INK}" stroke-width="2.6" stroke-dasharray="10 7"/>')


def cups(x0, rows):
    for yb, n in rows:
        for i in range(n):
            P.extend(measuring_jug(x0 + i * 84, yb, 52, 54, level=.8, label=litre(1), size=20, ticks=False))


def big(cx, by, w, h, letter):
    P.extend(pitcher(cx, by, w, h, level=.9, label=letter, size=w * .42, lid=WHITE))


frame(268, 8, 822, 258)
big(372, 240, 104, 196, 'A')
cups(512, [(136, 4), (230, 3)])

frame(8, 274, 460, 484)
big(106, 466, 90, 170, 'B')
cups(238, [(370, 2), (462, 3)])

frame(480, 274, 822, 484)
big(566, 466, 78, 150, 'C')
cups(692, [(370, 2), (462, 2)])

save('bai35_t2_q1_jugs', W, H, P)
