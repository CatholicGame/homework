"""
Vở BT Toán 3, Bài 32 (Mi-li-lít) Q1 — bình nước và 3 ca A, B, C. Vẽ lại bằng nét riêng.
Mỗi ca: vạch trên cùng ghi "500 ml" + 4 vạch nhỏ bên dưới (mỗi khoảng 100 ml).
  Ca A: nước tới vạch 500 ml.  Ca B: tới vạch 400 ml.  Ca C: tới vạch 100 ml.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import *
from kit_w1 import *

W, H = 765, 507
parts = []

# bình nước (nét riêng: nắp hồng có quai xách, thân bo tròn, dải nhãn)
bx, by, bw, bh = 100, 440, 150, 330
t = by - bh
parts.append(f'<path d="M{bx - 22},{t - 58} q22,-26 44,0" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>'
             f'<path d="M{bx - 22},{t - 58} q22,-26 44,0" fill="none" stroke="{PINK}" stroke-width="4" stroke-linecap="round"/>')
parts.append(f'<rect x="{bx - 42}" y="{t - 60}" width="84" height="46" rx="12" fill="{PINK}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<path d="M{bx - 26},{t - 50} v26 M{bx - 10},{t - 50} v26 M{bx + 6},{t - 50} v26 M{bx + 22},{t - 50} v26" stroke="{INK}" stroke-width="2" opacity=".4"/>')
parts.append(f'<rect x="{bx - 36}" y="{t - 16}" width="72" height="20" rx="4" fill="#F4FAFD" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<path d="M{bx - 36},{t + 2} Q{bx - bw / 2},{t + 8} {bx - bw / 2},{t + 50} V{by - 22} Q{bx - bw / 2},{by} {bx - bw / 2 + 22},{by} '
             f'H{bx + bw / 2 - 22} Q{bx + bw / 2},{by} {bx + bw / 2},{by - 22} V{t + 50} Q{bx + bw / 2},{t + 8} {bx + 36},{t + 2} Z" '
             f'fill="#EAF6FC" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
parts.append(f'<rect x="{bx - bw / 2 + 1.5}" y="{t + 130}" width="{bw - 3}" height="64" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<circle cx="{bx}" cy="{t + 162}" r="16" fill="#fff" stroke="{INK}" stroke-width="2.5"/>'
             f'<path d="M{bx},{t + 152} q-9,11 0,19 q9,-8 0,-19 Z" fill="{SKY_D}" stroke="{INK}" stroke-width="2"/>')
parts.append(f'<path d="M{bx - bw / 2 + 18},{t + 60} V{t + 116} M{bx - bw / 2 + 18},{t + 210} V{by - 30}" stroke="#fff" stroke-width="7" stroke-linecap="round"/>')

for cx, lv, L in ((292, 5, 'A'), (474, 4, 'B'), (656, 1, 'C')):
    parts.append(ml_cup(cx, 432, 124, 132, marks=5, level=lv, top_label='500 ml', fs=19))
    parts.append(letter(cx, 494, L, size=44))

save('bai32_q1_bottle', W, H, parts, folder='grade3-workbook')
