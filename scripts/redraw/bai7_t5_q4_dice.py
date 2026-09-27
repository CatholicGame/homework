"""
Vở BT Toán 2, Bài 7 Tiết 5 Q4 — "bốn con xúc xắc": vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: 4 con xúc xắc đánh số 1–4, số chấm trên mỗi mặt nhìn thấy:
  xúc xắc 1: trên 6, trước 2, bên 4
  xúc xắc 2: trên 4, trước 2, bên 1
  xúc xắc 3: trên 5, trước 4, bên 1
  xúc xắc 4: trên 3, trước 2, bên 6
(đáp án: xúc xắc 1 và 4, hiệu số chấm mặt trên 6 − 3 = 3)

    python scripts/redraw/bai7_t5_q4_dice.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 800, 225
S, D = 90, 42      # front face size, depth offset
Y0 = 52

# pip layouts in face coords (u right, w down, both 0..1)
A, M, B = 0.25, 0.5, 0.75
PIPS = {
    1: [(M, M)],
    2: [(B, A), (A, B)],        # "/" diagonal
    '2b': [(A, A), (B, B)],     # "\" diagonal
    3: [(A, A), (M, M), (B, B)],
    4: [(A, A), (B, A), (A, B), (B, B)],
    5: [(A, A), (B, A), (M, M), (A, B), (B, B)],
    6: [(A, A), (A, M), (A, B), (B, A), (B, M), (B, B)],
    '6r': [(A, A), (M, A), (B, A), (A, B), (M, B), (B, B)],   # rows, for the flat top face
}

# x0, (front, top, side) colours, top pips, front pips, side pips
DICE = [
    (36,  ('#FFD3E2', '#FFE8F0', '#F4AFC8'), '6r', 2, 4),
    (238, ('#CDEBFA', '#E6F6FD', '#9FD4EF'), 4, '2b', 1),
    (440, ('#CFF0C8', '#E7F8E3', '#A7DC9C'), 5, 4, 1),
    (642, ('#FFE7A8', '#FFF3D2', '#F7D06E'), 3, 2, 6),
]


def face(mat, fill, pips, kind):
    a, b, c, d, e, f = mat
    s = [f'<path d="M{e},{f} l{a},{b} l{c},{d} l{-a},{-b} Z" fill="{fill}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>']
    # pips placed through the face's mapping, drawn as gently squashed ellipses so they stay countable
    rx, ry, rot = {'front': (9.5, 9.5, 0), 'top': (8.5, 5.6, 0), 'side': (6.2, 9, -28)}[kind]
    for u, w in PIPS[pips]:
        x, y = e + a * u + c * w, f + b * u + d * w
        s.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{rx}" ry="{ry}" transform="rotate({rot} {x:.1f} {y:.1f})" fill="{INK}"/>'
                 f'<circle cx="{x - 2.5:.1f}" cy="{y - 2.5:.1f}" r="2.4" fill="#fff" opacity=".8"/>')
    return '\n'.join(s)


parts = []
for i, (x0, (cf, ct, cs), top, front, side) in enumerate(DICE):
    # soft shadow
    parts.append(f'<ellipse cx="{x0 + S / 2 + D / 2}" cy="{Y0 + S + 6}" rx="{S / 2 + D / 2 + 6}" ry="9" fill="#000" opacity=".08"/>')
    parts.append(face((S, 0, -D, D, x0 + D, Y0 - D), ct, top, 'top'))       # top
    parts.append(face((D, -D, 0, S, x0 + S, Y0), cs, side, 'side'))          # right side
    parts.append(face((S, 0, 0, S, x0, Y0), cf, front, 'front'))              # front
    parts.append(text(x0 + S / 2, 200, str(i + 1), size=28, weight=700))

save('bai7_t5_q4_dice', W, H, parts)
