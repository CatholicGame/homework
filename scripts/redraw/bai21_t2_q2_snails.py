"""
Vở BT Toán 2, Bài 21 Tiết 2 Q2 — ba con đường của ba chú ốc sên: nét riêng.
Giữ nội dung toán: đường 1 gồm 49 cm (ngang) và 11 cm (lên); đường 2 gồm 9 cm (lên)
và 52 cm (ngang); đường 3 dài 100 cm; mỗi đường có một ốc sên ở đầu đường.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 221
parts = []
LANE = '#FFF6E0'

R1 = [(44, 90), (345, 90), (345, 16)]
R2 = [(566, 118), (566, 50), (886, 50)]
R3 = [(146, 202), (766, 202)]
for r in (R1, R2, R3):
    parts.append(corridor(r, 18, sw=2.2, fill=LANE, cap='square'))

parts.append(tuft(346, 94, 1.1))
parts.append(f'<ellipse cx="566" cy="50" rx="17" ry="9" fill="{GREY}" {st(2)}/>')

parts.append(snail(26, 104, .7, 1, shell=ORANGE))
parts.append(snail(566, 150, .7, 1, shell=PURPLE))
parts.append(snail(790, 216, .7, -1, shell=TEAL))

for x, y, s, a in ((190, 124, '49 cm', 'middle'), (366, 62, '11 cm', 'start'), (544, 90, '9 cm', 'end'),
                   (714, 30, '52 cm', 'middle'), (436, 180, '100 cm', 'middle')):
    parts.append(text(x, y, s, size=24, weight=500, anchor=a))

save('bai21_t2_q2_snails', W, H, parts)
