"""
Vở BT Toán 1, Bài 32 (Luyện tập), bài 3 — hai kệ gấu bông, nét riêng.
Kệ trái: 1 gấu nâu + 3 gấu trắng.  Kệ phải: 3 gấu nâu + 1 gấu trắng.  (1 + 3 ... 3 + 1)
"""
from kit_l1_29 import *

W, H = 760, 170
DARK, DARK_L = BROWN, '#E9C9A2'
LIGHT, LIGHT_L = '#FFF4DF', '#F7D9C4'
SHELF = '#C99668'
p = [f'<rect x="0" y="0" width="{W}" height="{H}" rx="20" fill="#EAF6FD"/>']
# hai kệ
for x0, x1 in ((14, 362), (398, 746)):
    p.append(f'<rect x="{x0}" y="136" width="{x1 - x0}" height="16" rx="4" fill="{SHELF}" {st(3)}/>')
    p.append(f'<rect x="{x0 + 6}" y="150" width="12" height="16" rx="3" fill="{SHELF}" {st(2.6)}/>')
    p.append(f'<rect x="{x1 - 18}" y="150" width="12" height="16" rx="3" fill="{SHELF}" {st(2.6)}/>')
left = [True, False, False, False]
right = [True, True, True, False]
for x0, row in ((58, left), (442, right)):
    for i, dark in enumerate(row):
        if dark:
            p.append(kit_measure.plush_bear(x0 + i * 84, 138, 118, fur=DARK, light=DARK_L))
        else:
            p.append(kit_measure.plush_bear(x0 + i * 84, 138, 118, fur=LIGHT, light=LIGHT_L, bow=BLUE))
save('bai32_q3_bears', W, H, p, folder=FOLDER)
