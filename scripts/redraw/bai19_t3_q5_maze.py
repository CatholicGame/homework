"""
Vở BT Toán 2, Bài 19 Tiết 3 Q5 — mê cung nhím về rừng thông: nét riêng.
Giữ nội dung toán: ba lối vào dưới chú nhím, mỗi lối nối đúng như sách:
  lối 1 -> 30 -> 27 -> 13 -> rừng thông   (đáp án 30 + 27 + 13 = 70)
  lối 2 -> 5 -> 25 -> 10 -> hòn đá (cụt)
  lối 3 -> 14 -> 6 -> 50 -> cây nấm (cụt)
Các chỗ đường bắc cầu qua nhau giữ như sách.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 484
parts = []

# forest (top-left)
for x, y, h in ((40, 108, 70), (78, 104, 92), (120, 112, 96), (160, 108, 78), (196, 110, 60)):
    parts.append(pine(x, y, h, c='#7BCB8B', c2=GRASS_D, snow=True))

A = [(112, 108), (112, 180), (50, 180), (50, 214), (108, 214), (108, 258), (52, 258), (52, 348),
     (488, 348), (488, 460), (553, 460), (553, 424), (737, 424), (737, 362), (677, 362), (677, 285),
     (739, 285), (739, 170)]
B = [(231, 132), (231, 164), (310, 164), (310, 209), (398, 209), (398, 266), (217, 266), (217, 391),
     (811, 391), (811, 331), (598, 331), (598, 244), (818, 244), (818, 170)]
C = [(352, 104), (352, 177), (629, 177), (629, 462), (779, 462), (779, 428), (872, 428), (872, 170)]

# draw order decides which lane crosses over the other (bridges)
parts.append(corridor(C))
parts.append(corridor(B))
parts.append(corridor(A))

# rock at the dead end of lane B
parts.append(f'<path d="M218,160 Q216,146 230,144 Q246,142 246,156 Q246,164 232,164 Q220,164 218,160 Z" fill="{GREY}" {st(2.2)}/>')
# mushroom at the dead end of lane C
parts.append(f'<rect x="345" y="84" width="14" height="20" rx="5" fill="{CREAM}" {st(2.2)}/>')
parts.append(f'<path d="M332,88 Q334,64 352,64 Q370,64 372,88 Z" fill="{RED}" {st(2.2)}/>')
parts.append(f'<circle cx="345" cy="75" r="3.2" fill="{WHITE}"/><circle cx="360" cy="79" r="2.6" fill="{WHITE}"/>')

# hedgehog above the three entrances, facing left
def hedgehog(x, y):
    g = []
    sp = []
    n = 13
    for i in range(n + 1):
        a = math.pi + math.pi * i / n
        r = 40 if i % 2 == 0 else 29
        sp.append((x + 8 + r * math.cos(a), y - 14 + r * math.sin(a) * .95))
    g.append(f'<polygon points="{pts(sp)} {x + 44},{y - 14} {x - 30},{y - 14}" fill="#8A6A55" {st(2.4)}/>')
    g.append(f'<ellipse cx="{x + 8}" cy="{y - 12}" rx="34" ry="14" fill="#A98468" {st(2.4)}/>')
    g.append(f'<path d="M{x - 14},{y - 30} C{x - 34},{y - 32} {x - 46},{y - 18} {x - 50},{y - 13} C{x - 42},{y - 5} {x - 28},{y - 2} {x - 14},{y - 4} Z" fill="{CREAM}" {st(2.4)}/>')
    g.append(f'<circle cx="{x - 51}" cy="{y - 13}" r="4" fill="{INK}"/>')
    g.append(eye(x - 30, y - 19, 3.2))
    g.append(blush(x - 34, y - 9, 3.4))
    for dx in (-8, 12, 30):
        g.append(f'<ellipse cx="{x + dx}" cy="{y - 1}" rx="7" ry="4" fill="{CREAM}" {st(1.8)}/>')
    return ''.join(g)


parts.append(f'<g transform="translate(800,156) scale(1.25) translate(-800,-156)">{hedgehog(800, 156)}</g>')

for x, y, s in ((112, 180, '13'), (352, 177, '50'), (398, 232, '10'), (217, 266, '25'), (52, 348, '27'),
                (811, 391, '5'), (553, 442, '30'), (629, 462, '6'), (872, 428, '14')):
    parts.append(disc(x, y, s))

save('bai19_t3_q5_maze', W, H, parts)
