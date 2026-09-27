"""
Vở BT Toán 2, Bài 32 Q3 — giờ đến lớp bóng rổ của bốn bạn: nét riêng.
Giữ nội dung toán (trái → phải): bạn gái 2 giờ 30 phút, bạn trai thứ nhất 4 giờ,
bạn trai thứ hai 2 giờ 15 phút, Rô-bốt 3 giờ 30 phút (đồng hồ kim bên phải mỗi tranh).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 182
PW, PH, Y0 = 212, 176, 3
xs = [4, 229, 454, 684]
times = [(2, 30), (4, 0), (2, 15), (3, 30)]
bgs = ['#FFF6F9', '#F3FAFF', '#FFFBEF', '#F4FFF9']
people = [
    bust('ponytail', '#FFB3C7', 'open', 4, band=PURPLE),
    bust('spiky', '#8FD3F4', 'smile', 6, hair_col='#6B4A3A'),
    bust('short', '#FFD166', 'smile', 4),
    None,
]
parts = []
for i, x in enumerate(xs):
    fig = (place(x + 70, Y0 + PH + 6, .74, people[i]) if people[i]
           else place(x + 72, Y0 + PH + 6, .66, robot_bust('happy', 0, arms=((-96, -60), (96, -60)))))
    parts.append(panel(x, Y0, PW, PH, bgs[i], fig + clock(x + 160, Y0 + 52, 46, *times[i])))
save('bai32_q3_friends', W, H, parts)
