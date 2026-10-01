"""
Vở BT Toán 3 Tập hai, Bài 81 Tiết 2 Q1 — hai cân đĩa thăng bằng: nét riêng.
Giữ nội dung toán: cân 1: đĩa trái 3 quả cân 100 g, 500 g, 200 g; đĩa phải túi MUỐI.
Cân 2: đĩa trái quả cân 1 kg; đĩa phải túi ĐƯỜNG. Cả hai cân thăng bằng.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import *

W, H = 760, 250
P = []
left1 = weight(-40, 0, '', w=30) + weight(0, 0, '', w=44) + weight(38, 0, '', w=36)
right1 = pillow_bag(0, 0, 'MUỐI', w=110, h=74, band=SKY, size=17)
P.append(balance_scale(190, 238, left=left1, right=right1, arm=100, pan_w=130, post_h=70))
# nhãn quả cân + đường chỉ
g = balance_geom(190, 238, arm=100, post_h=70)
lx, ly = g['left']
for dx, hh, lab, tx, ty in ((-40, 27, '100 g', -70, -78), (0, 40, '500 g', 0, -100), (38, 32, '200 g', 66, -84)):
    x, y = lx + dx, ly - hh - 4
    P.append(f'<line x1="{x}" y1="{y}" x2="{lx + tx * .55}" y2="{ly + ty + 8}" stroke="{INK}" stroke-width="1.8"/>')
    P.append(label(lx + tx * .55 + (0 if tx == 0 else (-18 if tx < 0 else 18)), ly + ty, lab, size=19))
left2 = weight(0, 0, '1 kg', w=64, size=18)
right2 = pillow_bag(0, 0, 'ĐƯỜNG', w=110, h=74, band=YELLOW, size=16)
P.append(balance_scale(570, 238, left=left2, right=right2, arm=100, pan_w=130, post_h=70))
save('bai81_t2_q1_scales', W, H, P, folder='grade3-workbook-2')
