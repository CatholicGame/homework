"""
Vở BT Toán 2, Bài 43 Tiết 2 Q4 — 12 chiếc tất giống nhau (2 hàng × 6): nét riêng.
Giữ nội dung toán: đúng 12 chiếc tất giống hệt nhau (12 : 2 = 6 đôi).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 545, 293


def sock(x, y, i):
    """x, y = góc trên trái ống tất; mũi tất quay phải; khung ~70 x 128."""
    d = (f'M{x},{y} H{x + 34} V{y + 78} Q{x + 34},{y + 90} {x + 46},{y + 94} L{x + 58},{y + 98} Q{x + 72},{y + 104} {x + 68},{y + 116} '
         f'Q{x + 64},{y + 128} {x + 48},{y + 124} L{x + 12},{y + 114} Q{x - 2},{y + 110} {x},{y + 94} Z')
    cid = f'sk{i}'
    s = [f'<clipPath id="{cid}"><path d="{d}"/></clipPath>', f'<path d="{d}" fill="{TEAL}"/>',
         f'<g clip-path="url(#{cid})">',
         f'<rect x="{x - 5}" y="{y - 2}" width="50" height="18" fill="{WHITE}"/>']
    for k in range(3):
        s.append(f'<rect x="{x - 5}" y="{y + 30 + k * 16}" width="50" height="7" fill="{YELLOW}"/>')
    s.append(f'<circle cx="{x + 58}" cy="{y + 112}" r="16" fill="{ORANGE}"/>')
    s.append(f'<circle cx="{x + 6}" cy="{y + 112}" r="14" fill="{ORANGE}"/>')
    s.append('</g>')
    s.append(f'<path d="{d}" fill="none" {st(3)}/>')
    s.append(f'<line x1="{x}" y1="{y + 16}" x2="{x + 34}" y2="{y + 16}" {st(2.4)}/>')
    return ''.join(s)


parts = []
i = 0
for r in range(2):
    for c in range(6):
        parts.append(sock(12 + c * 89, 8 + r * 146, i)); i += 1
save('bai43_t2_q4_socks', W, H, parts)
