"""
Vở BT Toán 1, Bài 30 (Luyện tập), bài 5 — nét riêng.
a) 3 thuyền (không buồm) và 1 thuyền buồm.   b) 3 con thỏ đứng | 2 con thỏ chạy.
"""
from kit_l1_29 import *

# a) hai vòng nước: 3 thuyền máy | 1 thuyền buồm, chữ "và" ở giữa
W, H = 380, 230
p = [f'<g transform="translate(0,0)">{board(190, 230, bg=WATER_L, ground=None, oval=True)}</g>']
for y in (78, 136, 194):
    p.append(g(motorboat(), 96, y, .78))
    p.append(waves(50, y + 4, 90))
p.append(text(222, 124, 'và', size=22, weight=600))
p.append(f'<g transform="translate(250,40)">{board(130, 160, bg=WATER_L, ground=None, oval=True)}</g>')
p.append(g(sailboat(), 315, 150, .82))
p.append(waves(276, 154, 80))
save('bai30_q5a_boats', W, H, p, folder=FOLDER)

# b) thỏ: 3 bên trái, 2 bên phải
W, H = 360, 250
p = [board(W, H, divider=((236, 14), (196, 236)), ground_y=100)]
for x, y in ((62, 116), (156, 122), (92, 222)):
    p.append(g(kit_g9.rabbit(), x, y, 1.25))
for x, y in ((280, 140), (296, 226)):
    p.append(g(kit_g9.rabbit(run=True), x, y, 1.2))
save('bai30_q5b_rabbits', W, H, p, folder=FOLDER)
