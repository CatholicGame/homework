"""
Vở BT Toán 1, Bài 33 (Luyện tập chung), bài 4 — nét riêng.
a) voi 1 | 2;  chó 1 | 3.   b) ngựa 2 | 2;  vịt 2 | 3.
"""
from kit_l1_29 import *

W, H = 340, 230

# voi: 1 | 2
p = [board(W, H, divider=((148, 12), (168, 220)), ground_y=96)]
p.append(kit_p2.place(kit_p2.elephant(), 10, 72, .58, ))
p.append(kit_p2.place(kit_p2.elephant(), 330, 6, .5, flip=True))
p.append(kit_p2.place(kit_p2.elephant(), 316, 112, .5, flip=True))
save('bai33_q4a_elephants', W, H, p, folder=FOLDER)

# chó: 1 | 3
p = [board(W, H, divider=((150, 12), (170, 220)), ground_y=96)]
p.append(g(dog_run(), 70, 150, .9))
for x, y in ((244, 76), (262, 148), (244, 218)):
    p.append(g(dog_run(), x, y, .78))
save('bai33_q4a_dogs', W, H, p, folder=FOLDER)

# ngựa: 2 | 2 (hai nhóm quay mặt vào nhau)
p = [board(W, H, divider=((160, 12), (176, 220)), ground_y=96)]
for x, y in ((62, 112), (86, 220)):
    p.append(g(horse_stand(), x, y, .5))
for x, y in ((268, 112), (250, 220)):
    p.append(g(horse_stand(body='#F3EEE6', light='#DCD6CC'), x, y, .5, flip=True))
save('bai33_q4b_horses', W, H, p, folder=FOLDER)

# vịt: 2 trên bờ | 3 bơi dưới nước
p = [board(W, H, ground=GRASS, ground_y=60, divider=((150, 12), (170, 220)))]
p.append(f'<path d="M168,40 Q250,30 340,40 V230 H176 Z" fill="{WATER_L}"/>')
p.append(board(W, H, bg='none', ground=None, divider=((150, 12), (170, 220))))
for x, y in ((44, 146), (116, 182)):
    p.append(g(kit_g9.duck(), x, y, 1.45))
for x, y in ((236, 92), (290, 150), (226, 206)):
    p.append(g(kit_g9.duck(), x, y, 1.35))
    p.append(f'<ellipse cx="{x + 2}" cy="{y - 8}" rx="40" ry="7" fill="{WATER_L}"/>')
    p.append(waves(x - 36, y - 4, 76))
save('bai33_q4b_ducks', W, H, p, folder=FOLDER)
