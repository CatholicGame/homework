"""
Vở BT Toán 2, Bài 3 Tiết 3 Q4 — vỏ sò, ốc, sao biển: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: ba nhóm khung nét đứt "Số bị trừ" (sò 55, 66, 54),
"Số trừ" (ốc 30, 34, 2), "Hiệu" (sao biển 53, 36, 20); mỗi nhóm 2 trên, 1 dưới.
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

W, H = 800, 261
parts = []
ST = f'stroke="{INK}" stroke-width="2.6" stroke-linejoin="round" stroke-miterlimit="1"'

BOXES = [  # x, width, label, item kind, items (cx, cy, number)
    (6, 250, 'Số bị trừ', 'scallop', [(75, 118, '55'), (185, 118, '66'), (130, 200, '54')]),
    (284, 250, 'Số trừ', 'conch', [(345, 118, '30'), (470, 118, '34'), (405, 200, '2')]),
    (562, 232, 'Hiệu', 'star', [(628, 116, '53'), (738, 116, '36'), (682, 200, '20')]),
]


def box(x, w, label):
    y0, y1 = 36, 254
    parts.append(f'<rect x="{x}" y="{y0}" width="{w}" height="{y1 - y0}" rx="18" fill="none" stroke="{INK}" stroke-width="2.2" stroke-dasharray="8 6"/>')
    pw = 22 * len(label) * 0.62 + 44
    cx = x + w / 2
    parts.append(f'<rect x="{cx - pw / 2}" y="{y0 - 22}" width="{pw}" height="42" rx="21" fill="{SKY}" stroke="{BLUE}" stroke-width="3.5" stroke-dasharray="5 4"/>')
    parts.append(text(cx, y0 + 7, label, size=24, weight=600))


def scallop(cx, cy, num):
    # fan shell with a small hinge at the bottom, pink with light ribs
    r = 44
    top = cy - 40
    bx = cy + 30
    pts = []
    n = 5
    for k in range(n + 1):
        a = math.pi * (1.1 - 1.2 * k / n)
        pts.append((cx + r * math.cos(a), cy - 4 - r * 0.9 * math.sin(a)))
    d = f'M{cx},{bx} L{pts[0][0]:.1f},{pts[0][1]:.1f}'
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        mx, my = (x0 + x1) / 2, (y0 + y1) / 2
        ox, oy = mx - cx, my - (cy - 4)
        ln = math.hypot(ox, oy)
        d += f' Q{mx + ox / ln * 11:.1f},{my + oy / ln * 11:.1f} {x1:.1f},{y1:.1f}'
    d += ' Z'
    parts.append(f'<path d="M{cx - 16},{bx + 8} L{cx - 12},{bx - 6} L{cx + 12},{bx - 6} L{cx + 16},{bx + 8} Z" fill="{ORANGE}" {ST}/>')
    parts.append(f'<path d="{d}" fill="{PINK}" {ST}/>')
    for (x0, y0) in pts[1:-1]:
        parts.append(f'<line x1="{cx}" y1="{bx - 2}" x2="{cx + (x0 - cx) * 0.8:.1f}" y2="{bx + (y0 - bx) * 0.8:.1f}" stroke="#E56B9F" stroke-width="2.2" stroke-linecap="round"/>')
    parts.append(f'<ellipse cx="{cx}" cy="{cy - 6}" rx="24" ry="17" fill="{WHITE}" opacity=".9"/>')
    parts.append(text(cx, cy + 3, num, size=26, weight=700))


def conch(cx, cy, num):
    # a pointy spiral shell (tip up), teal-blue with swirl bands
    t, b = cy - 50, cy + 36
    d = (f'M{cx},{t} C{cx + 14},{t + 20} {cx + 44},{cy + 4} {cx + 40},{b - 10} '
         f'Q{cx + 20},{b + 6} {cx},{b} Q{cx - 20},{b + 6} {cx - 40},{b - 10} '
         f'C{cx - 44},{cy + 4} {cx - 14},{t + 20} {cx},{t} Z')
    parts.append(f'<path d="{d}" fill="{TEAL}" {ST}/>')
    for k, yy in enumerate((t + 20, t + 40)):
        w = 12 + k * 12
        parts.append(f'<path d="M{cx - w},{yy + 4} Q{cx},{yy - 6} {cx + w},{yy + 4}" fill="none" stroke="#3E9E8A" stroke-width="2.4" stroke-linecap="round"/>')
    parts.append(f'<ellipse cx="{cx}" cy="{cy + 12}" rx="26" ry="18" fill="{WHITE}" opacity=".9"/>')
    parts.append(text(cx, cy + 21, num, size=26, weight=700))


def star(cx, cy, num):
    # chubby five-armed starfish, rounded tips, a few dots
    R, r = 48, 26
    pts = []
    for k in range(10):
        a = -math.pi / 2 + k * math.pi / 5
        rr = R if k % 2 == 0 else r
        pts.append((cx + rr * math.cos(a), cy + 4 + rr * math.sin(a)))
    d = f'M{pts[0][0]:.1f},{pts[0][1]:.1f}'
    for i in range(1, 11):
        x, y = pts[i % 10]
        px, py = pts[i - 1]
        mx, my = (px + x) / 2, (py + y) / 2
        ox, oy = mx - cx, my - cy - 4
        ln = math.hypot(ox, oy)
        d += f' Q{mx + ox / ln * 5:.1f},{my + oy / ln * 5:.1f} {x:.1f},{y:.1f}'
    parts.append(f'<path d="{d} Z" fill="{YELLOW}" {ST} stroke-linecap="round"/>')
    for k in range(0, 10, 2):
        x, y = pts[k]
        parts.append(f'<circle cx="{cx + (x - cx) * 0.72:.1f}" cy="{cy + 4 + (y - cy - 4) * 0.72:.1f}" r="3" fill="{ORANGE}"/>')
    parts.append(f'<circle cx="{cx}" cy="{cy + 4}" r="21" fill="{WHITE}" opacity=".9"/>')
    parts.append(text(cx, cy + 13, num, size=26, weight=700))


DRAW = {'scallop': scallop, 'conch': conch, 'star': star}
for x, w, label, kind, items in BOXES:
    box(x, w, label)
    for cx, cy, num in items:
        DRAW[kind](cx, cy, num)

save('bai3_t3_q4_shells', W, H, parts)
