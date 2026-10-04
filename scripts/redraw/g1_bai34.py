"""
Vở BT Toán 1, Bài 34 (Phép trừ trong phạm vi 3), bài 4 — nét riêng.
3 con ếch: 2 con ngồi trên lá sen, 1 con nhảy xuống nước bơi đi (3 − 1 = 2).
"""
from kit_l1_29 import *
import kit_g2

W, H = 420, 270
p = [board(W, H, bg=WATER_L, ground=None)]
for y in (196, 226, 252):
    p.append(waves(40, y, 340, col=WATER_D))
p.append(kit_g2.lily_pad(150, 150, 130, 54))
p.append(g(frog_sit(), 110, 158, .9))
p.append(g(frog_sit(), 196, 162, .9))
p.append(g(frog_swim(), 318, 222, 1.0, rot=16))
save('bai34_q4_frogs', W, H, p, folder=FOLDER)
