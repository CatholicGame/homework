"""
Vở BT Toán 2, Bài 18 Q2 — thỏ, gà, chó chơi cầu thăng bằng: nét riêng.

Nội dung toán giữ đúng sách, cả hai cầu đều THĂNG BẰNG (ván nằm ngang):
  trên: bên trái 1 thỏ + 1 gà   = bên phải 3 gà     (-> 1 thỏ = 2 gà)
  dưới: bên trái 1 chó + 1 thỏ  = bên phải 3 thỏ    (-> 1 chó = 2 thỏ)
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_measure import plush_bunny, plush_dog
from kit_g1 import hen, seesaw

W, H = 900, 578
P = []
BUN = dict(fur=WHITE, inner=PINK)
# cầu trên
y1 = 180
left = plush_bunny(95, y1, 150, **BUN) + hen(225, y1, 118, flip=True)
right = hen(630, y1, 118) + hen(712, y1, 118) + hen(794, y1, 118)
P.append(seesaw(450, y1, 880, 96, left, right))
# cầu dưới
y2 = 440
left = plush_dog(110, y2, 128, fur='#F2C48D', ear=BROWN, spots=True) + plush_bunny(240, y2, 150, **BUN)
right = plush_bunny(650, y2, 150, **BUN) + plush_bunny(732, y2, 150, **BUN) + plush_bunny(814, y2, 150, **BUN)
P.append(seesaw(450, y2, 880, 96, left, right))
save('bai18_q2_seesaw', W, H, P)
