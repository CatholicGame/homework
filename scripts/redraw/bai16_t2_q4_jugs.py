"""
Vở BT Toán 2, Bài 16 Tiết 2 Q4 — mỗi đồ vật đựng số lít bằng các ca bên cạnh. Vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách (4 khung):
  Ấm  + 4 ca 1 l            -> 4 l
  Bình + 3 ca 1 l           -> 3 l
  Can + ca 3 l, 2 l, 2 l, 2 l -> 9 l
  Xô  + ca 2 l, 2 l, 1 l, 1 l -> 6 l
Ca to hơn khi số lít lớn hơn (1 l < 2 l < 3 l), giống sách.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import *

W, H = 900, 393
parts = []
S = 2.8
SIZES = {1: (44, 42, 18), 2: (52, 50, 20), 3: (60, 56, 22)}   # w, h, cỡ chữ


def frame(x0, y0, x1, y1):
    parts.append(f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" rx="16" fill="{WHITE}" stroke="{INK}" stroke-width="2.6"/>')


def cup(cx, by, n):
    w, h, s = SIZES[n]
    parts.extend(measuring_jug(cx, by, w, h, level=.82, label=litre(n), size=s, sw=S, ticks=False))


# Ấm + 4 ca 1 l
frame(5, 5, 408, 170)
parts += kettle(100, 156, 124, 96, body='#FFE0EC', accent=PINK, sw=S)
for x in (190, 250, 310, 368):
    cup(x, 156, 1)

# Bình + 3 ca 1 l
frame(497, 5, 783, 170)
parts += pitcher(546, 158, 58, 116, level=.9, body='#EEF7FC', lid=WHITE, sw=S)
for x in (626, 682, 738):
    cup(x, 156, 1)

# Can + 3 l, 2 l, 2 l, 2 l
frame(5, 190, 468, 390)
parts += jerrycan(80, 378, 118, 168, label=None, body=GRASS, panel='#E6F6DF', sw=S)
for x, n in ((190, 3), (272, 2), (342, 2), (412, 2)):
    cup(x, 376, n)

# Xô + 2 l, 2 l, 1 l, 1 l
frame(495, 197, 895, 390)
parts += bucket(568, 376, 118, 118, level=1, body=YELLOW, grip=PINK, sw=S)
for x, n in ((666, 2), (734, 2), (800, 1), (855, 1)):
    cup(x, 376, n)

save('bai16_t2_q4_jugs', W, H, parts)
