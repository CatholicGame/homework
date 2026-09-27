"""
Vở BT Toán 2, Bài 20 Tiết 2 Q5 — con sâu bò trên cành đến chiếc lá: nét riêng.
Giữ nội dung toán: đoạn cành nằm ngang ghi 36 cm, đoạn cành chếch lên ghi 15 cm,
sâu ở đầu trái, chiếc lá ở đầu cành chếch.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 370
parts = []
WOOD, WOOD_L = '#C08A5B', '#E2B98C'

# branch: long log lying across, with a twig rising to the right
parts.append(f'<path d="M8,262 C200,256 450,252 640,246 L700,214 L846,70 L862,84 L728,238 L810,266 '
             f'C790,272 740,272 700,270 C520,286 260,316 8,330 Z" fill="{WOOD}" {st(3)}/>')
parts.append(f'<path d="M40,300 C200,292 380,280 560,272 M120,276 C220,272 300,270 380,268 M650,258 L700,236 L830,100" '
             f'fill="none" stroke="{WOOD_L}" stroke-width="5" stroke-linecap="round"/>')
parts.append(f'<ellipse cx="8" cy="296" rx="8" ry="34" fill="{WOOD_L}" {st(3)}/>')

# leaf at the tip
parts.append(f'<path d="M854,76 C830,50 840,18 880,10 C890,40 884,64 854,76 Z" fill="{GREEN}" {st(2.6)}/>')
parts.append(f'<path d="M854,76 Q866,44 878,16" fill="none" stroke="{GRASS_D}" stroke-width="2"/>')
parts.append(f'<path d="M856,78 C880,90 896,70 896,48 C872,46 858,58 856,78 Z" fill="{GREEN}" {st(2.6)}/>')

# caterpillar at the left end
cat = []
for i, x in enumerate((40, 58, 76, 94)):
    cat.append(f'<circle cx="{x}" cy="{250 - (6 if i % 2 else 0)}" r="11" fill="{"#A7D96B" if i % 2 else "#8CCB5E"}" {st(2.2)}/>')
cat.append(f'<circle cx="114" cy="240" r="13" fill="#A7D96B" {st(2.2)}/>')
cat.append(f'<path d="M110,228 L106,216 M120,228 L126,217" fill="none" {st(2)}/>')
cat.append(eye(119, 238, 2.6))
cat.append(blush(121, 246, 2.6))
parts += cat

# braces
def hbrace(x0, x1, y, h=12):
    m = (x0 + x1) / 2
    return (f'<path d="M{x0},{y + h} Q{x0},{y} {x0 + h},{y} L{m - h},{y} Q{m},{y} {m},{y - h} '
            f'Q{m},{y} {m + h},{y} L{x1 - h},{y} Q{x1},{y} {x1},{y + h}" fill="none" {st(2.6)}/>')


parts.append(hbrace(140, 632, 232))
parts.append(text(386, 196, '36 cm', size=36, weight=500))
# slanted brace along the twig (rotate a horizontal brace)
ang = math.degrees(math.atan2(60 - 222, 830 - 650))
L = math.hypot(830 - 650, 222 - 60)
parts.append(f'<g transform="translate(650,222) rotate({ang:.1f})">{hbrace(0, L, -10)}</g>')
parts.append(f'<g transform="translate(726,124) rotate({ang:.1f})">{text(0, 0, "15 cm", size=36, weight=500)}</g>')

save('bai20_t2_q5_caterpillar', W, H, parts)
