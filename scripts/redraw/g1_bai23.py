"""Vở BT Toán 1 — Bài 23 (Luyện tập chung), trang 26–27.
q1: bảy vòng tròn đồ vật để nối với 3, 5, 9, 4, 6, 8, 10
    (dừa 3 (mẫu), vịt 5, xe đạp 4, ngựa 6, sóc 8, hoa 10, lê 9).
q5b: dãy hình △ △ ○ △ △ ○ △ △ [ ] (ô cuối trống)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1_b19 import *

R = 110
def disc(name, kind, rows, ring):
    parts = [f'<circle cx="{R}" cy="{R}" r="{R - 4}" fill="{ring}" {st(2.6)}/>',
             group(kind, rows, R, R + 2, R * 1.38, R * 1.38, 1.1)]
    save(name, 2 * R, 2 * R, parts, folder='grade1-workbook')

disc('bai23_q1_palms', 'palm', [2, 1], '#FFF4DF')
disc('bai23_q1_ducks', 'duck', [2, 1, 2], '#EAF6FF')
disc('bai23_q1_bikes', 'bike', [1, 2, 1], '#FFF0F6')
disc('bai23_q1_horses', 'horse', [2, 2, 2], '#F1FAEC')
disc('bai23_q1_squirrels', 'squirrel', [3, 2, 3], '#F1FAEC')
disc('bai23_q1_flowers', 'flower', [4, 3, 3], '#FFF0F6')
disc('bai23_q1_pears', 'pear', [3, 3, 3], '#FFFBE6')

# q5b dãy hình
c = 58
seq = ['tri', 'tri', 'circ', 'tri', 'tri', 'circ', 'tri', 'tri', None]
parts = []
for i, k in enumerate(seq):
    x = 4 + i * c
    parts.append(f'<rect x="{x}" y="4" width="{c}" height="{c}" fill="{WHITE}" {st(2.4)}/>')
    mx, my = x + c / 2, 4 + c / 2
    if k == 'tri':
        parts.append(f'<path d="M{mx},{my - 18} L{mx + 19},{my + 15} L{mx - 19},{my + 15} Z" fill="{YELLOW}" {st(2.4)}/>')
    elif k == 'circ':
        parts.append(f'<circle cx="{mx}" cy="{my}" r="18" fill="{BLUE}" {st(2.4)}/>')
    else:
        parts.append(text(mx, my + 9, '?', 26, 700, fill=GREY))
save('bai23_q5_pattern', 8 + 9 * c, c + 8, parts, folder='grade1-workbook')
