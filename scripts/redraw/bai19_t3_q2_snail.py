"""
Vở BT Toán 3, Bài 19 Tiết 3 câu 2 — hình chữ nhật MNPQ, NP = 50 cm. Ốc sên đi cạnh MN (nét đen),
Rùa đi đường gấp khúc MQPN (nét xanh). Cả hai xuất phát ở M. Nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 830, 434
M, N, P, Q = (142, 72), (732, 72), (732, 343), (142, 343)
PATH = '#1FA5E0'


def snail(x, y):
    """ốc sên bò sang phải, (x, y) = giữa đáy."""
    s = [f'<path d="M{x - 30},{y} Q{x - 34},{y - 8} {x - 22},{y - 10} H{x + 26} Q{x + 34},{y - 30} {x + 30},{y - 36} '
         f'Q{x + 44},{y - 40} {x + 42},{y - 22} Q{x + 42},{y} {x + 26},{y} Z" fill="#F6DDBF" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>',
         f'<path d="M{x + 32},{y - 36} l-4,-16 M{x + 40},{y - 36} l6,-15" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>',
         f'<circle cx="{x + 28}" cy="{y - 53}" r="3.5" fill="{INK}"/><circle cx="{x + 46}" cy="{y - 52}" r="3.5" fill="{INK}"/>',
         f'<circle cx="{x + 36}" cy="{y - 26}" r="2.8" fill="{INK}"/>',
         f'<circle cx="{x - 4}" cy="{y - 30}" r="24" fill="{PURPLE}" stroke="{INK}" stroke-width="3"/>',
         f'<path d="M{x - 4},{y - 30} m0,-4 a4,4 0 1 1 -4,4 a8,8 0 1 1 8,8 a13,13 0 1 1 -13,-13" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>']
    return ''.join(s)


def turtle(x, y):
    """rùa nhìn xuống (đi theo cạnh MQ), (x, y) = tâm mai."""
    g, sh = '#8ED08A', '#4E9E57'
    s = []
    for dx, dy in ((-24, -16), (24, -16), (-24, 18), (24, 18)):
        s.append(f'<ellipse cx="{x + dx}" cy="{y + dy}" rx="10" ry="8" fill="{g}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<ellipse cx="{x}" cy="{y + 36}" rx="15" ry="14" fill="{g}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<circle cx="{x - 6}" cy="{y + 40}" r="3" fill="{INK}"/><circle cx="{x + 6}" cy="{y + 40}" r="3" fill="{INK}"/>')
    s.append(f'<ellipse cx="{x}" cy="{y}" rx="26" ry="30" fill="{sh}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<path d="M{x},{y - 14} l12,7 v14 l-12,7 l-12,-7 v-14 Z" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round" opacity=".7"/>')
    return ''.join(s)


parts = [line(*M, *Q, sw=5, col=PATH), line(*Q, *P, sw=5, col=PATH), line(*P, *N, sw=5, col=PATH),
         line(*M, *N, sw=5)]
for p in (M, N, P, Q):
    parts.append(dot(*p, r=9))
parts.append(snail(M[0] + 42, M[1] - 5))
parts.append(turtle(M[0] - 50, M[1] + 60))
parts.append(text(92, 72, 'M', size=48, weight=500))
parts.append(text(772, 72, 'N', size=48, weight=500))
parts.append(text(100, 382, 'Q', size=48, weight=500))
parts.append(text(770, 388, 'P', size=48, weight=500))
parts.append(rtext(792, 210, '50 cm', -90, size=46, weight=500))
save('bai19_t3_q2_snail', W, H, parts, folder='grade3-workbook')
