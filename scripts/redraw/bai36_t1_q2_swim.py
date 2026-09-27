"""
Vở BT Toán 2, Bài 36 Tiết 1 Q2 — Nam và bạn tập bơi ở bể bơi: nét riêng.
Không có đồng hồ trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 619, 312
g = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="{WATER_L}"/>']
# thành bể lát gạch
g.append(f'<path d="M0,0 L110,0 L60,{H} L0,{H} Z" fill="#E8ECF0" {st()}/>')
for i in range(1, 9):
    y = i * 36
    g.append(f'<line x1="0" y1="{y}" x2="{110 - y * 50 / H:.0f}" y2="{y}" stroke="{GREY}" stroke-width="2"/>')
for xx in (30, 60):
    g.append(f'<line x1="{xx}" y1="0" x2="{xx - 30}" y2="{H}" stroke="{GREY}" stroke-width="2"/>')


def swimmer(x, y, trunks, reach):
    """bé bơi sải, đầu bên trái (x, y = đầu); nét riêng"""
    t = []
    t.append(tube(f'M{x + 150},{y + 8} L{x + 230},{y - 6}', SKIN, 16))
    t.append(tube(f'M{x + 150},{y + 14} L{x + 226},{y + 26}', SKIN, 16))
    t.append(f'<ellipse cx="{x + 234}" cy="{y - 7}" rx="12" ry="7" fill="{SKIN}" {st(2.4)}/><ellipse cx="{x + 230}" cy="{y + 27}" rx="12" ry="7" fill="{SKIN}" {st(2.4)}/>')
    t.append(f'<ellipse cx="{x + 95}" cy="{y + 8}" rx="62" ry="24" fill="{SKIN}" {st()}/>')
    t.append(f'<path d="M{x + 130},{y - 12} L{x + 160},{y - 6} L{x + 160},{y + 24} L{x + 130},{y + 30} Z" fill="{trunks}" {st()}/>')
    t.append(tube(f'M{x + 60},{y - 4} Q{x + 10},{y - 30} {x + reach[0]},{y + reach[1]}', SKIN, 14))
    t.append(f'<circle cx="{x + reach[0]}" cy="{y + reach[1]}" r="10" fill="{SKIN}" {st()}/>')
    t.append(place(x, y, .5, head('short', 'closed', -26)))
    return ''.join(t)


g.append(swimmer(190, 100, BLUE, (-70, 10)))
g.append(swimmer(340, 230, ORANGE, (-50, 26)))
for y in (120, 260):
    g.append(f'<path d="M100,{y} q25,-10 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 L619,{y + 60} L100,{y + 60} Z" fill="{WATER_D}" fill-opacity=".45"/>')
for x, y in ((380, 60), (400, 50), (590, 190), (575, 176)):
    g.append(f'<circle cx="{x}" cy="{y}" r="4" fill="{WATER_D}"/>')
save('bai36_t1_q2_swim', W, H, [panel(2, 2, W - 4, H - 4, WATER_L, ''.join(g))])
