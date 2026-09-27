"""
Vở BT Toán 2, Bài 16 Tiết 2 Q2 — "Số?": cộng số lít trong mỗi khung, vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách (mỗi khung nối xuống một ô … l):
  khung 1: ca 2 l + ca 3 l      -> ô mẫu ghi sẵn 5
  khung 2: can 4 l + can 6 l    -> ô trống (10)
  khung 3: xô 6 l + xô 9 l      -> ô trống (15)
  khung dưới: ca 2 l + ca 3 l + ca 6 l -> ô trống (11)
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import *

W, H = 900, 541
parts = []
S = 3


def frame(x0, y0, x1, y1, box_y, value=None):
    cx = (x0 + x1) / 2
    parts.append(f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" rx="16" fill="{WHITE}" stroke="{INK}" stroke-width="2.6"/>')
    parts.append(f'<line x1="{cx}" y1="{y1}" x2="{cx}" y2="{box_y}" stroke="{INK}" stroke-width="2.6"/>')
    parts.extend(answer_box(cx - 20, box_y, 40, 44, value, size=26))


# khung 1: 2 l + 3 l
frame(6, 82, 190, 186, 204, '5')
parts += measuring_jug(46, 176, 54, 48, level=.85, label=litre(2), size=22, sw=S, ticks=False)
parts += measuring_jug(126, 176, 70, 66, level=.85, label=litre(3), size=24, sw=S, ticks=False)

# khung 2: can 4 l + can 6 l
frame(268, 36, 490, 186, 204)
parts += jerrycan(320, 176, 72, 104, label=litre(4), size=24, body=GRASS, panel='#E6F6DF', sw=S)
parts += jerrycan(424, 176, 92, 132, label=litre(6), size=28, body=GRASS, panel='#E6F6DF', sw=S)

# khung 3: xô 6 l + xô 9 l (đầy nước)
frame(574, 4, 894, 186, 204)
parts += bucket(652, 174, 124, 104, level=1, label=litre(6), size=26, body=YELLOW, grip=PINK, sw=S)
parts += bucket(804, 174, 156, 144, level=1, label=litre(9), size=28, body=YELLOW, grip=PINK, sw=S)

# khung dưới: 2 l + 3 l + 6 l
frame(286, 284, 670, 460, 480)
parts += measuring_jug(340, 440, 52, 46, level=.85, label=litre(2), size=22, sw=S, ticks=False)
parts += measuring_jug(420, 440, 66, 62, level=.85, label=litre(3), size=24, sw=S, ticks=False)
parts += measuring_jug(556, 440, 116, 112, level=.85, label=litre(6), size=30, sw=S, ticks=False)

save('bai16_t2_q2_groups', W, H, parts)
