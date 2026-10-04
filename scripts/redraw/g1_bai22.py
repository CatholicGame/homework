"""Vở BT Toán 1 — Bài 22 (Luyện tập), trang 24–25.
q1: sáu vòng đồ vật để nối với 8, 9, 10 (vịt 8, dừa 10, sóc 10 (mẫu), ngựa 9, hoa 9, áo 10).
q2: que tính "vẽ thêm cho đủ 10" (mẫu 2 hình vuông có đường chéo = 10 que; 4 ô đã có 7, 8, 6, 5 que).
q3: a) 10 hình tam giác (2 hàng × 5), b) hình chữ thập 9 hình vuông.
q5: sơ đồ tách 10 (vòng 10, hai nhánh)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1_b19 import *

W, H = 300, 170
def oval(name, kind, rows, ring):
    parts = [f'<ellipse cx="{W/2}" cy="{H/2}" rx="{W/2-4}" ry="{H/2-4}" fill="{ring}" {st(2.6)}/>',
             group(kind, rows, W / 2, H / 2 + 2, W * .78, H * .78, 1.12)]
    save(name, W, H, parts, folder='grade1-workbook')

oval('bai22_q1_ducks', 'duck', [4, 4], '#EAF6FF')
oval('bai22_q1_palms', 'palm', [5, 5], '#FFF4DF')
oval('bai22_q1_squirrels', 'squirrel', [3, 4, 3], '#F1FAEC')
oval('bai22_q1_horses', 'horse', [3, 3, 3], '#F1FAEC')
oval('bai22_q1_flowers', 'flower', [5, 4], '#FFF0F6')
oval('bai22_q1_jackets', 'jacket', [3, 4, 3], '#F4F0FF')

# q2 que tính
def sq_diag(x, y, a, col):
    return (f'<rect x="{x}" y="{y}" width="{a}" height="{a}" fill="none" stroke="{col}" stroke-width="5" stroke-linecap="round"/>'
            f'<line x1="{x}" y1="{y + a}" x2="{x + a}" y2="{y}" stroke="{col}" stroke-width="5" stroke-linecap="round"/>')
STICK = '#E0892F'
a = 46
parts = [text(10, 26, 'Mẫu:', 18, anchor='start')]
parts.append(sq_diag(66, 8, a, STICK) + sq_diag(126, 8, a, STICK))
bw, gap, top = 150, 14, 78
for i, extra in enumerate(['gamma', 'c', 'bar', None]):
    bx = 6 + i * (bw + gap)
    parts.append(f'<rect x="{bx}" y="{top}" width="{bw}" height="110" rx="10" fill="{WHITE}" {st(2.4)}/>')
    sx, sy = bx + 16, top + 32
    parts.append(sq_diag(sx, sy, a, STICK))
    px = sx + a + 14
    L = lambda x1, y1, x2, y2: f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{STICK}" stroke-width="5" stroke-linecap="round"/>'
    if extra == 'gamma':
        parts.append(L(px, sy, px, sy + a) + L(px, sy, px + a, sy))
    elif extra == 'c':
        parts.append(L(px, sy, px, sy + a) + L(px, sy, px + a, sy) + L(px, sy + a, px + a, sy + a))
    elif extra == 'bar':
        parts.append(L(px, sy, px, sy + a))
    parts.append(text(bx + bw / 2, top + 106 + 30, f'Ô {i + 1}', 17, extra=''))
save('bai22_q2_sticks', 4 * bw + 3 * gap + 12, top + 146, parts, folder='grade1-workbook')

# q3 hình
parts = [text(12, 24, 'a)', 20, 700, anchor='start')]
t, hgt, y0 = 64, 62, 40
for k in range(5):
    x = 20 + k * t
    parts.append(f'<path d="M{x},{y0 + hgt} L{x + t / 2},{y0} L{x + t},{y0 + hgt} Z" fill="{WHITE}" {st(2.6)}/>')
    parts.append(f'<path d="M{x},{y0 + hgt + 6} L{x + t / 2},{y0 + 2 * hgt + 6} L{x + t},{y0 + hgt + 6} Z" fill="{WHITE}" {st(2.6)}/>')
ox = 380
parts.append(text(ox - 6, 24, 'b)', 20, 700, anchor='start'))
c = 46
cells = [(0, 1), (1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (2, 1), (0, 3), (2, 3)]
for r, col in cells:
    parts.append(f'<rect x="{ox + 20 + col * c}" y="{y0 - 6 + r * c}" width="{c}" height="{c}" fill="{WHITE}" {st(2.6)}/>')
save('bai22_q3_shapes', ox + 20 + 5 * c + 14, y0 + 2 * hgt + 18, parts, folder='grade1-workbook')

# q5 sơ đồ tách 10: vòng 10 ở trên, hai nhánh xuống 25% và 75% bề rộng
def tree(name, left=None, right=None):
    w, h = 180, 78 if left is None else 126
    p = [f'<path d="M{w / 2 - 10},38 L{w * .25},78 M{w / 2 + 10},38 L{w * .75},78" fill="none" {st(2.4)}/>',
         f'<circle cx="{w / 2}" cy="24" r="20" fill="{CREAM}" {st(2.6)}/>', text(w / 2, 31, '10', 20, 700)]
    if left is not None:
        for x, v in ((w * .25, left), (w * .75, right)):
            p.append(f'<rect x="{x - 21}" y="80" width="42" height="42" rx="7" fill="{WHITE}" {st(2.4)}/>' + text(x, 108, v, 22, 700))
    save(name, w, h, p, folder='grade1-workbook')
tree('bai22_q5_tree')
tree('bai22_q5_tree_sample', '9', '1')
