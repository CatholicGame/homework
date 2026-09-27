"""
Vở BT Toán 3, Bài 35 Tiết 1 Q2 — 2 cân đĩa thăng bằng. Vẽ lại bằng nét riêng.
  a) 2 kiện hàng (như nhau)  = 500 g + 500 g   -> mỗi kiện 500 g
  b) chiếc cốc + 50 g        = 200 g + 100 g   -> cốc 250 g
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import *
from kit_w1 import *

W, H = 1350, 665
K = 1.55
parts = []
KRAFT, KRAFT_D = '#E4B77E', '#C8955A'


def parcel(x, y, w=50, h=58, d=14):
    t = y - h
    return (f'<path d="M{x - w / 2},{t} l{d},{-d * .7} h{w} l{-d},{d * .7} Z" fill="#F0CC98" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<path d="M{x + w / 2},{t} l{d},{-d * .7} v{h} l{-d},{d * .7} Z" fill="{KRAFT_D}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<rect x="{x - w / 2}" y="{t}" width="{w}" height="{h}" fill="{KRAFT}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<path d="M{x - 5},{t} v{h * .3} M{x + 5},{t} v{h * .3}" stroke="{INK}" stroke-width="2"/>'
            f'<rect x="{x - 5}" y="{t}" width="10" height="{h * .3}" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>'
            f'<path d="M{x + 2},{t - 1} l{d},{-d * .7}" stroke="{INK}" stroke-width="2"/>'
            f'<path d="M{x - w / 2 + 8},{y - 16} h14 M{x - w / 2 + 8},{y - 10} h9" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')


def mug(x, y, w=44, h=48, col=TEAL):
    t = y - h
    return (f'<path d="M{x + w / 2 - 2},{t + 10} q18,0 16,16 q-2,14 -16,12" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>'
            f'<path d="M{x + w / 2 - 2},{t + 10} q18,0 16,16 q-2,14 -16,12" fill="none" stroke="{col}" stroke-width="3.5" stroke-linecap="round"/>'
            f'<path d="M{x - w / 2},{t} H{x + w / 2} L{x + w / 2 - 3},{y - 7} Q{x + w / 2 - 3},{y} {x + w / 2 - 10},{y} H{x - w / 2 + 10} '
            f'Q{x - w / 2 + 3},{y} {x - w / 2 + 3},{y - 7} Z" fill="{col}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<ellipse cx="{x}" cy="{t}" rx="{w / 2}" ry="4" fill="#fff" stroke="{INK}" stroke-width="2.5"/>'
            f'<circle cx="{x - 4}" cy="{t + h * .55}" r="7" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>')


parts.append(text(28, 72, 'a)', size=46, weight=600, anchor='start'))
parts.append(big_balance(815, 318, K, parcel(-40, 0) + parcel(20, 0), wt(-34, '500 g', 56) + wt(32, '500 g', 56)))
parts.append(text(28, 420, 'b)', size=46, weight=600, anchor='start'))
parts.append(big_balance(815, 652, K, mug(-28, 0) + wt(36, '50 g', 28), wt(-30, '200 g', 38) + wt(30, '100 g', 32)))

save('bai35_t1_q2_scales', W, H, parts, folder='grade3-workbook')
