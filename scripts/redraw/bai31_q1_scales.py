"""
Vở BT Toán 3, Bài 31 (Gam) Q1 — 4 cân đĩa thăng bằng. Vẽ lại bằng nét riêng.
Nội dung toán giữ đúng sách:
  a) 50 g + 500 g  = 3 quả cam      (550 g)
  b) 100 g + 500 g = hộp sữa        (600 g)
  c) 100 g + 20 g  = gói mì chính   (120 g)
  d) 100 g + 200 g = gói bột canh   (300 g)
Quả cân ở đĩa trái, đồ vật ở đĩa phải; cả 4 cân thăng bằng.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import *
from kit_w1 import *

W, H = 2430, 1015
K = 2.25
parts = []


def milk_can(x, y, w=70, h=108):
    t = y - h
    return (f'<path d="M{x - w / 2},{t + 8} V{y - 6} Q{x - w / 2},{y} {x - w / 2 + 8},{y} H{x + w / 2 - 8} Q{x + w / 2},{y} {x + w / 2},{y - 6} V{t + 8} Z" '
            f'fill="{WHITE}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<rect x="{x - w / 2 + 1.5}" y="{t + h * .3}" width="{w - 3}" height="{h * .42}" fill="{YELLOW}"/>'
            f'<path d="M{x - w / 2},{t + h * .3} H{x + w / 2} M{x - w / 2},{t + h * .72} H{x + w / 2}" stroke="{INK}" stroke-width="2.5"/>'
            f'<rect x="{x - w / 2 - 4}" y="{t}" width="{w + 8}" height="16" rx="6" fill="{SKY_D}" stroke="{INK}" stroke-width="3"/>'
            f'<path d="M{x - w / 2 + 9},{t + 24} V{y - 10}" stroke="{GREY_L}" stroke-width="5" stroke-linecap="round"/>'
            + text(x, t + h * .51 + 7, 'Sữa', size=20, weight=800)
            + f'<circle cx="{x}" cy="{t + h * .86}" r="6" fill="{PINK}" stroke="{INK}" stroke-width="2"/>')


def quadrant(ox, oy, tag, left, right):
    parts.append(text(ox + 30, oy + 70, tag, size=64, weight=600, anchor='start'))
    parts.append(big_balance(ox + 640, oy + 490, K, left, right))


quadrant(0, 0, 'a)', wt(-34, '50 g', 26) + wt(22, '500 g', 56),
         orange(-36, 0, 19) + orange(36, 0, 19) + orange(0, 0, 20, col='#F7B267'))
quadrant(1215, 0, 'b)', wt(-34, '100 g', 32) + wt(22, '500 g', 56), milk_can(0, 0))
quadrant(0, 507, 'c)', wt(-30, '100 g', 32) + wt(24, '20 g', 22),
         pillow_bag(0, 0, 'Mì chính', w=82, h=66, band=GREEN, size=13))
quadrant(1215, 507, 'd)', wt(-30, '100 g', 32) + wt(26, '200 g', 38),
         pillow_bag(0, 0, 'Bột canh', w=92, h=84, band=ORANGE, size=14))

save('bai31_q1_scales', W, H, parts, folder='grade3-workbook')
