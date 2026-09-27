"""
Luyện tập Toán 3, KT cuối HK1 Q5 — 8 củ khoai tây và 9 củ cà rốt (hàng trên 4, hàng dưới 5).
Giữ đúng số củ và cách xếp; củ là nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_p2 import potato, carrot

W, H = 1900, 350
parts = []
pots = [(90, 135, -6), (250, 75, 4), (400, 130, -3), (565, 95, 6), (90, 262, 5), (250, 210, -5), (400, 265, 3), (565, 225, -4)]
for x, y, r in pots:
    parts.append(potato(x, y, 1.0, r))
for x in (1040, 1270, 1480, 1685):
    parts.append(carrot(x, 105, 0.95))
for x in (940, 1150, 1360, 1570, 1775):
    parts.append(carrot(x, 262, 0.95))
save('kthk1_q5_vegetables', W, H, parts, folder='grade3-practice')
