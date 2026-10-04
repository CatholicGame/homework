"""
Vở BT Toán 1, Bài 29 (Phép cộng trong phạm vi 5), bài 3 — nét riêng.
a) 3 con ngựa đứng | 2 con ngựa phi.   b) 2 con chim đậu trên cành | 3 con chim bay.
"""
from kit_l1_29 import *

W, H = 360, 250

# a) ngựa: 3 bên trái, 2 bên phải
p = [board(W, H, divider=((214, 14), (176, 236)), ground_y=110)]
for x, y, s in ((50, 112, .52), (136, 132, .52), (82, 228, .52)):
    p.append(g(horse_stand(), x, y, s))
for x, y in ((276, 112), (288, 214)):
    p.append(g(horse_run(), x, y, .62))
save('bai29_q3a_horses', W, H, p, folder=FOLDER)

# b) chim: 2 đậu trên cành bên trái, 3 bay bên phải
p = [board(W, H, ground=None, oval=True, divider=((186, 10), (204, 240)))]
p.append(branch(26, 160, 178))
for x in (70, 120):
    p.append(g(swallow_perch(), x, 156, 1.0))
for x, y, r in ((262, 66, -10), (290, 136, 8), (248, 196, -4)):
    p.append(g(swallow_fly(), x, y, .78, rot=r))
save('bai29_q3b_birds', W, H, p, folder=FOLDER)
