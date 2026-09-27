"""
Vở BT Toán 2, Bài 3 Tiết 1 Q3 — vỏ sò / ốc / sao biển trong ba nhóm: nét riêng.
Giữ nội dung toán: nhóm "Số hạng" (sò) 22, 33, 51; nhóm "Số hạng" (ốc) 20, 14, 16;
nhóm "Tổng" (sao biển) 53, 65, 38 — cùng vị trí: hai trên, một dưới giữa.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 800, 247
BOXES = [(6, 262, 'Số hạng'), (290, 536, 'Số hạng'), (566, 794, 'Tổng')]
BOX_T, BOX_B = 28, 240


def box(x0, x1, label):
    cx = (x0 + x1) / 2
    tw = 26 + len(label) * 12.5
    return '\n'.join([
        f'<rect x="{x0}" y="{BOX_T}" width="{x1 - x0}" height="{BOX_B - BOX_T}" rx="18" fill="none" stroke="{INK}" stroke-width="2" stroke-dasharray="9 6"/>',
        f'<rect x="{cx - tw / 2}" y="6" width="{tw}" height="40" rx="11" fill="{SKY_D}" stroke="{INK}" stroke-width="2"/>',
        f'<rect x="{cx - tw / 2 + 4}" y="10" width="{tw - 8}" height="32" rx="8" fill="{SKY}" stroke="{WHITE}" stroke-width="1.6" stroke-dasharray="4 3"/>',
        text(cx, 34, label, size=22, weight=600),
    ])


def scallop(cx, cy, num, fill='#FFE0C2', rib='#F4A259'):
    """fan-shaped scallop, hinge at the bottom"""
    r = 64
    by = cy + 36
    s = []
    # little ears at the hinge
    s.append(f'<path d="M{cx - 14},{by - 6} L{cx - 22},{by + 6} L{cx + 22},{by + 6} L{cx + 14},{by - 6} Z" fill="{fill}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    # scalloped rim: n bumps on an arc round the hinge
    n = 7
    pts = []
    for k in range(n + 1):
        a = math.radians(222 + k * (96 / n))
        pts.append((cx + r * math.cos(a), by + r * math.sin(a)))
    d = f'M{cx},{by} L{pts[0][0]:.1f},{pts[0][1]:.1f} '
    for (xa, ya), (xb, yb) in zip(pts, pts[1:]):
        mx, my = (xa + xb) / 2, (ya + yb) / 2
        ox, oy = mx - cx, my - by
        L = math.hypot(ox, oy)
        d += f'Q{mx + ox / L * 10:.1f},{my + oy / L * 10:.1f} {xb:.1f},{yb:.1f} '
    d += 'Z'
    s.append(f'<path d="{d}" fill="{fill}" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>')
    for k in range(n + 1):
        xa, ya = pts[k]
        s.append(f'<line x1="{cx}" y1="{by - 4}" x2="{cx + (xa - cx) * 0.9:.1f}" y2="{by + (ya - by) * 0.9:.1f}" stroke="{rib}" stroke-width="2" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="{cy - 2}" r="17" fill="{WHITE}" stroke="{INK}" stroke-width="1.6"/>')
    s.append(text(cx, cy + 6, num, size=22, weight=700))
    return '\n'.join(s)


def snail(cx, cy, num, fill='#BFE6F7', band='#6FB7EA'):
    """a cone-shaped spiral sea shell, tip up, round opening at the bottom"""
    s = []
    top, bot = cy - 44, cy + 34
    s.append(f'<path d="M{cx},{top} C{cx + 10},{top + 12} {cx + 44},{cy + 4} {cx + 40},{cy + 20} '
             f'Q{cx + 34},{bot} {cx},{bot} Q{cx - 34},{bot} {cx - 40},{cy + 20} C{cx - 44},{cy + 4} {cx - 10},{top + 12} {cx},{top} Z" '
             f'fill="{fill}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    # whorl lines climbing to the tip
    for k, (y, w) in enumerate([(top + 16, 10), (top + 32, 22), (cy + 22, 38)]):
        s.append(f'<path d="M{cx - w},{y + 4} Q{cx},{y - 6} {cx + w},{y - 4}" fill="none" stroke="{band}" stroke-width="3" stroke-linecap="round"/>')
    # opening (lip)
    s.append(f'<ellipse cx="{cx + 6}" cy="{bot - 5}" rx="16" ry="6" fill="{PINK}" stroke="{INK}" stroke-width="1.8"/>')
    s.append(f'<circle cx="{cx}" cy="{cy + 2}" r="17" fill="{WHITE}" stroke="{INK}" stroke-width="1.6"/>')
    s.append(text(cx, cy + 10, num, size=22, weight=700))
    return '\n'.join(s)


def star(cx, cy, num, rot=0, fill=YELLOW, dot='#F4A259'):
    R, r = 44, 21
    pts = []
    for k in range(10):
        a = math.radians(-90 + rot + k * 36)
        rr = R if k % 2 == 0 else r
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    # rounded star: quadratic through the tips
    d = ''
    n = len(pts)
    for k in range(n):
        p0 = pts[k - 1]
        p1 = pts[k]
        p2 = pts[(k + 1) % n]
        a = ((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2)
        b = ((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)
        d += (f'M{a[0]:.1f},{a[1]:.1f} ' if k == 0 else '') + f'Q{p1[0]:.1f},{p1[1]:.1f} {b[0]:.1f},{b[1]:.1f} '
    s = [f'<path d="{d}Z" fill="{fill}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>']
    for k in range(0, 10, 2):
        x, y = pts[k]
        s.append(f'<circle cx="{cx + (x - cx) * 0.68:.1f}" cy="{cy + (y - cy) * 0.68:.1f}" r="3" fill="{dot}"/>')
    s.append(f'<circle cx="{cx}" cy="{cy + 1}" r="17" fill="{WHITE}" stroke="{INK}" stroke-width="1.6"/>')
    s.append(text(cx, cy + 9, num, size=22, weight=700))
    return '\n'.join(s)


parts = [box(*b) for b in BOXES]
parts += [scallop(70, 100, '22'), scallop(192, 100, '33'), scallop(132, 184, '51')]
parts += [snail(352, 100, '20'), snail(474, 100, '14'), snail(413, 186, '16')]
parts += [star(626, 100, '53', 4), star(736, 100, '65', -8), star(682, 184, '38', 12)]
save('bai3_t1_q3_shells', W, H, parts)
