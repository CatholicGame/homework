"""
Vở BT Toán 2, Bài 72 Tiết 2 Q5 — cây cầu là đường gấp khúc ABCD: nét riêng.
Giữ nội dung toán: mặt cầu gấp khúc A → B (dốc lên) → C (nằm ngang) → D (dốc xuống),
nhãn A, B, C, D ở bốn đầu đoạn; chân cầu dưới đoạn BC. Rô-bốt và bạn nhỏ với dấu "?"
đứng cạnh đầu D chỉ để trang trí (vẽ nét riêng).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g9 import *

W, H = 900, 259
A, B, C, D = (48, 170), (262, 44), (548, 44), (762, 170)
DECK = '#6FB7EA'
RAIL = '#4F9AD0'
parts = []
# water + banks
parts.append(f'<path d="M0,259 L0,196 Q220,178 450,180 Q680,178 900,196 L900,259 Z" fill="{WATER_L}"/>')
parts.append(f'<path d="M0,196 L60,172 L78,259 L0,259 Z" fill="{GRASS}" {st(2.4)}/>')
parts.append(f'<path d="M900,200 L750,172 L790,259 L900,259 Z" fill="{GRASS}" {st(2.4)}/>')
for x0, y0 in ((200, 222), (430, 236), (640, 220)):
    parts.append(f'<path d="M{x0},{y0} q14,-7 28,0 t28,0" fill="none" stroke="{WHITE}" stroke-width="3" stroke-linecap="round"/>')
# legs under BC (behind the deck)
legs_x = [B[0] + 10, 405, C[0] - 10]
for x in legs_x:
    parts.append(f'<rect x="{x - 8}" y="{B[1] + 12}" width="16" height="{200 - B[1] - 12}" fill="{RAIL}" {st(2.4)}/>')
for x0, x1 in ((legs_x[0], legs_x[1]), (legs_x[1], legs_x[2])):
    parts.append(f'<path d="M{x0 + 8},{B[1] + 30} L{x1 - 8},{186} M{x1 - 8},{B[1] + 30} L{x0 + 8},{186}" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>')
    parts.append(f'<path d="M{x0 + 8},{B[1] + 30} L{x1 - 8},{186} M{x1 - 8},{B[1] + 30} L{x0 + 8},{186}" stroke="{RAIL}" stroke-width="5" stroke-linecap="round"/>')
# railing: posts from deck up 26px, top rail
RH = 26
pts = [A, B, C, D]
def seg_points(p, q, step):
    n = max(1, round(((q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2) ** 0.5 / step))
    return [(p[0] + (q[0] - p[0]) * i / n, p[1] + (q[1] - p[1]) * i / n) for i in range(n + 1)]
for p, q in zip(pts, pts[1:]):
    for x, y in seg_points(p, q, 22)[1:-1]:
        parts.append(f'<line x1="{x:.1f}" y1="{y:.1f}" x2="{x:.1f}" y2="{y - RH:.1f}" stroke="{RAIL}" stroke-width="4"/>')
top = ' '.join(f'{x},{y - RH}' for x, y in pts)
parts.append(f'<polyline points="{top}" fill="none" stroke="{INK}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>')
parts.append(f'<polyline points="{top}" fill="none" stroke="{DECK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>')
for x, y in pts:
    parts.append(f'<rect x="{x - 5}" y="{y - RH - 8}" width="10" height="{RH + 8}" rx="3" fill="{YELLOW}" {st(2.2)}/>')
# deck (the polyline ABCD)
deck = ' '.join(f'{x},{y}' for x, y in pts)
parts.append(f'<polyline points="{deck}" fill="none" stroke="{INK}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>')
parts.append(f'<polyline points="{deck}" fill="none" stroke="{DECK}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>')
for x, y in pts:
    parts.append(f'<circle cx="{x}" cy="{y}" r="5" fill="{INK}"/>')
# labels
parts.append(text(A[0] - 26, A[1] + 12, 'A', size=26))
parts.append(text(B[0] - 20, B[1] + 50, 'B', size=26))
parts.append(text(C[0] + 22, C[1] + 50, 'C', size=26))
parts.append(text(D[0] + 10, D[1] + 34, 'D', size=26))


def robot(x, y):
    """small round robot, feet at y"""
    s = [f'<rect x="{x - 14}" y="{y - 12}" width="8" height="12" fill="{GREY}" {st(2)}/>',
         f'<rect x="{x + 6}" y="{y - 12}" width="8" height="12" fill="{GREY}" {st(2)}/>',
         f'<rect x="{x - 18}" y="{y - 40}" width="36" height="30" rx="8" fill="{TEAL}" {st()}/>',
         f'<circle cx="{x}" cy="{y - 25}" r="5" fill="{YELLOW}" {st(1.8)}/>',
         f'<line x1="{x}" y1="{y - 70}" x2="{x}" y2="{y - 80}" stroke="{INK}" stroke-width="3"/>',
         f'<circle cx="{x}" cy="{y - 82}" r="4" fill="{RED}" {st(1.8)}/>',
         f'<rect x="{x - 20}" y="{y - 72}" width="40" height="30" rx="12" fill="{WHITE}" {st()}/>',
         f'<rect x="{x - 14}" y="{y - 66}" width="28" height="17" rx="7" fill="{INK}"/>',
         f'<circle cx="{x - 6}" cy="{y - 58}" r="3" fill="{SKY_D}"/><circle cx="{x + 6}" cy="{y - 58}" r="3" fill="{SKY_D}"/>']
    return '\n'.join(s)


def girl(x, y):
    """girl thinking, feet at y"""
    s = []
    for dx in (-7, 7):
        s.append(f'<line x1="{x + dx}" y1="{y - 34}" x2="{x + dx}" y2="{y - 4}" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>'
                 f'<line x1="{x + dx}" y1="{y - 34}" x2="{x + dx}" y2="{y - 4}" stroke="{SKIN}" stroke-width="3.4" stroke-linecap="round"/>')
        s.append(f'<ellipse cx="{x + dx}" cy="{y - 2}" rx="7" ry="4" fill="{RED}" {st(1.8)}/>')
    s.append(f'<path d="M{x - 13},{y - 70} L{x + 13},{y - 70} L{x + 22},{y - 30} L{x - 22},{y - 30} Z" fill="{PURPLE}" {st()}/>')
    s.append(limb(f'M{x + 10},{y - 64} L{x + 18},{y - 50} L{x + 8},{y - 82}', SKIN, 7))
    s.append(limb(f'M{x - 10},{y - 64} L{x - 18},{y - 42}', SKIN, 7))
    hy = y - 92
    s.append(f'<path d="M{x + 12},{hy - 14} q18,-4 16,18 q-6,-10 -14,-8 Z" fill="{HAIR}" {st(2)}/>')
    s.append(f'<circle cx="{x}" cy="{hy}" r="16" fill="{SKIN}" {st()}/>')
    s.append(f'<path d="M{x - 16},{hy - 2} Q{x - 14},{hy - 20} {x},{hy - 18} Q{x + 16},{hy - 20} {x + 16},{hy - 2} Q{x + 6},{hy - 10} {x - 4},{hy - 8} Q{x - 10},{hy - 6} {x - 16},{hy - 2} Z" fill="{HAIR}" {st(2)}/>')
    s.append(f'<circle cx="{x - 6}" cy="{hy + 2}" r="2.2" fill="{INK}"/><circle cx="{x + 6}" cy="{hy + 2}" r="2.2" fill="{INK}"/>')
    s.append(f'<path d="M{x - 3},{hy + 9} q3,2 6,0" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>')
    return '\n'.join(s)


parts.append(robot(810, 196))
parts.append(girl(862, 200))
parts.append(text(872, 76, '?', size=28, weight=700))
save('bai72_t2_q5_bridge', W, H, parts)
