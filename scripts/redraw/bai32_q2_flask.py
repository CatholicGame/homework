"""
Vở BT Toán 3, Bài 32 (Mi-li-lít) Q2 — phích 1 l đang rót sang 3 ca. Vẽ lại bằng nét riêng.
  Ca 1: 400 ml   Ca 2: 300 ml   Ca 3: 100 ml  (nhãn dưới mỗi ca; mực nước theo vạch 100 ml).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import *
from kit_w1 import *

W, H = 795, 537
parts = []

# phích (vẽ đứng ở gốc toạ độ rồi xoay 104° cho miệng chúc xuống bên phải)
bw, bh = 150, 250
th = ['<g transform="scale(-1,1)">']
th.append(f'<path d="M{bw / 2 - 6},{-bh / 2 + 40} h24 q12,0 12,12 v{bh - 110} q0,12 -12,12 h-24" fill="none" stroke="{INK}" stroke-width="13" stroke-linejoin="round"/>')
th.append(f'<path d="M{bw / 2 - 6},{-bh / 2 + 40} h24 q12,0 12,12 v{bh - 110} q0,12 -12,12 h-24" fill="none" stroke="{PURPLE}" stroke-width="6" stroke-linejoin="round"/></g>')
th.append(f'<rect x="{-bw / 2}" y="{-bh / 2}" width="{bw}" height="{bh}" rx="22" fill="{PURPLE}" stroke="{INK}" stroke-width="3"/>')
th.append(f'<rect x="{-bw / 2 + 1.5}" y="{-bh / 2 + 70}" width="{bw - 3}" height="80" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>')
for dx, c in ((-34, PINK), (0, YELLOW), (34, TEAL)):
    th.append(f'<circle cx="{dx}" cy="{-bh / 2 + 110}" r="12" fill="{c}" stroke="{INK}" stroke-width="2.5"/>')
th.append(f'<path d="M{-bw / 2 + 18},{-bh / 2 + 22} V{-bh / 2 + 56} M{-bw / 2 + 18},{-bh / 2 + 166} V{bh / 2 - 22}" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/>')
th.append(f'<path d="M-40,{-bh / 2 + 2} L-26,{-bh / 2 - 38} H26 L40,{-bh / 2 + 2} Z" fill="{WHITE}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
th.append(f'<rect x="-32" y="{-bh / 2 - 54}" width="64" height="18" rx="6" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
th.append(f'<ellipse cx="0" cy="{-bh / 2 - 54}" rx="30" ry="7" fill="{WATER_C}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<g transform="translate(222,146) rotate(104)">{"".join(th)}</g>')

# giọt nước rơi
for x, y, r in ((412, 244, 6), (418, 268, 5), (424, 290, 4.5)):
    parts.append(f'<path d="M{x},{y - r * 1.9} Q{x + r},{y - r * .4} {x + r},{y} A{r},{r} 0 0 1 {x - r},{y} Q{x - r},{y - r * .4} {x},{y - r * 1.9} Z" '
                 f'fill="{WATER_C}" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>')

for cx, lv in ((200, 4), (442, 3), (678, 1)):
    parts.append(ml_cup(cx, 448, 132, 134, marks=5, level=lv))
    parts.append(text(cx, 516, f'{lv}00 ml', size=46, weight=500))

save('bai32_q2_flask', W, H, parts, folder='grade3-workbook')
