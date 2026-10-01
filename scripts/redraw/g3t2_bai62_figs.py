"""
Vở BT Toán 3 Tập hai, Bài 62 — hình vẽ lại.
 - bai62_t1_q4_airport: sân bay ở giữa, đường tới 4 thành phố: A 89 100 m, B 57 500 m,
   C 60 900 m, D 90 000 m (đúng vị trí: A trên trái, B trên phải, C dưới phải, D dưới trái).
 - bai62_t3_q1_venn: hình tròn và hình chữ nhật chồng nhau; 56 789 ở ngoài cả hai,
   30 839 trong hình chữ nhật ngoài hình tròn, 25 690 ở phần chung, 25 728 trong hình tròn
   ngoài hình chữ nhật.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

FOLDER = 'grade3-workbook-2'


def st(w=2.6):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def blob(cx, cy, rx, ry, fill):
    pts = []
    for i in range(12):
        a = 2 * math.pi * i / 12
        k = 1 + 0.08 * math.sin(3 * a + 1)
        pts.append((cx + rx * k * math.cos(a), cy + ry * k * math.sin(a)))
    d = f'M{pts[0][0]:.1f},{pts[0][1]:.1f} '
    n = len(pts)
    for i in range(n):
        p0, p1 = pts[i], pts[(i + 1) % n]
        mx, my = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
        d += f'Q{p0[0]:.1f},{p0[1]:.1f} {mx:.1f},{my:.1f} '
    return f'<path d="{d}Z" fill="{fill}" {st()}/>'


def airport():
    W, H = 660, 400
    C = (330, 200)
    cities = {'A': (110, 62), 'B': (560, 68), 'C': (560, 330), 'D': (110, 330)}
    dist = {'A': '89 100 m', 'B': '57 500 m', 'C': '60 900 m', 'D': '90 000 m'}
    fills = {'A': '#CFEFFC', 'B': '#BFE6F7', 'C': '#D9F2FD', 'D': '#C4E8F8'}
    p = []
    for k, (x, y) in cities.items():
        mx, my = (x + C[0]) / 2, (y + C[1]) / 2
        cx, cy = mx + (18 if k in 'AC' else -18), my + (-14 if k in 'AB' else 14)
        d = f'M{x},{y} Q{cx},{cy} {C[0]},{C[1]}'
        p.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="30" stroke-linecap="round"/>')
        p.append(f'<path d="{d}" fill="none" stroke="#F3F1EC" stroke-width="25" stroke-linecap="round"/>')
    for k, (x, y) in cities.items():
        p.append(f'<ellipse cx="{x}" cy="{y}" rx="96" ry="40" fill="{fills[k]}" {st()}/>')
        p.append(text(x, y + 8, f'Thành phố {k}', size=22, weight=700))
    # sân bay
    p.append(f'<circle cx="{C[0]}" cy="{C[1]}" r="58" fill="#5B6770" {st(3)}/>')
    p.append(f'<rect x="{C[0] - 54}" y="{C[1] - 14}" width="108" height="28" fill="#7D8A93" transform="rotate(-20 {C[0]} {C[1]})"/>')
    for i in range(-4, 5):
        p.append(f'<rect x="{C[0] + i * 12 - 3}" y="{C[1] - 1.5}" width="7" height="3" fill="#fff" transform="rotate(-20 {C[0]} {C[1]})"/>')
    # máy bay
    pl = (f'<g transform="translate({C[0]},{C[1] - 4}) rotate(-20)">'
          f'<path d="M-34,0 Q-30,-6 30,-5 Q40,0 30,5 Q-30,6 -34,0 Z" fill="#fff" {st(2)}/>'
          f'<path d="M-4,-4 L-16,-30 L-6,-30 L12,-4 Z" fill="{BLUE}" {st(2)}/>'
          f'<path d="M-4,4 L-16,30 L-6,30 L12,4 Z" fill="{BLUE}" {st(2)}/>'
          f'<path d="M-30,-2 L-38,-14 L-32,-14 L-24,-2 Z" fill="{BLUE}" {st(1.6)}/>'
          f'<path d="M-30,2 L-38,14 L-32,14 L-24,2 Z" fill="{BLUE}" {st(1.6)}/></g>')
    p.append(pl)
    p.append(text(C[0], C[1] + 50, 'Sân bay', size=15, weight=700, fill='#FFFFFF'))
    # khoảng cách
    pos = {'A': (205, 160), 'B': (455, 110), 'C': (455, 290), 'D': (205, 245)}
    for k, (x, y) in pos.items():
        w = 118
        p.append(f'<rect x="{x - w / 2}" y="{y - 17}" width="{w}" height="32" rx="9" fill="#FFFFFF" {st(2)}/>')
        p.append(text(x, y + 7, dist[k], size=21, weight=700))
    save('bai62_t1_q4_airport', W, H, p, folder=FOLDER)


def venn():
    W, H = 340, 210
    p = [f'<rect x="2" y="2" width="{W - 4}" height="{H - 4}" rx="14" fill="#B8E5FC"/>']
    p.append('<rect x="150" y="26" width="160" height="96" fill="#FFFFFF"/>')
    p.append('<circle cx="150" cy="128" r="74" fill="#FFFFFF"/>')
    p.append(f'<circle cx="150" cy="128" r="74" fill="none" stroke="{INK}" stroke-width="2.6"/>')
    p.append(f'<rect x="150" y="26" width="160" height="96" fill="none" stroke="{INK}" stroke-width="2.6"/>')
    p.append(text(62, 36, '56 789', size=21, weight=700))
    p.append(text(262, 62, '30 839', size=21, weight=700))
    p.append(text(185, 112, '25 690', size=19, weight=700))
    p.append(text(140, 170, '25 728', size=21, weight=700))
    save('bai62_t3_q1_venn', W, H, p, folder=FOLDER)


if __name__ == '__main__':
    airport()
    venn()
