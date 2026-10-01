"""
Vở BT Toán 3 Tập hai, Bài 57 Tiết 3 Q4 — ba vòng tròn chung tâm, ba con kiến A, B, C
bò trên ba vòng (A trong cùng, C ngoài cùng); ghi "9 327 mm" ở vòng ngoài.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from g3t2_bai56_kit import *

W, H = 400, 400
cx, cy = 212, 222
parts = [text(cx, 32, '9 327 mm', size=32, weight=600),
         f'<circle cx="{cx}" cy="{cy}" r="170" fill="#D9DCE0" stroke="{INK}" stroke-width="3"/>',
         f'<circle cx="{cx}" cy="{cy}" r="118" fill="#A9DEF7" stroke="{INK}" stroke-width="3"/>',
         f'<circle cx="{cx}" cy="{cy}" r="60" fill="#4CC3EE" stroke="{INK}" stroke-width="3"/>',
         f'<circle cx="{cx}" cy="{cy}" r="4" fill="{INK}"/>']
for r, lab in ((170, 'C'), (118, 'B'), (60, 'A')):
    x = cx - r
    parts.append(put(x, cy + 17, ant(), 1.0))
    parts.append(text(x - 16, cy + 50, lab, size=32, weight=700))
save('bai57_t3_q4_rings', W, H, parts, folder='grade3-workbook-2')
