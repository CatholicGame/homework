"""
Vở BT Toán 2, Bài 31 Tiết 1 Q5 — giờ về nhà của Nam, Mai, Rô-bốt, Việt: nét riêng.
Giữ nội dung toán: Nam — đồng hồ kim 5 giờ 15 phút; Mai — đồng hồ số 16 : 15;
Rô-bốt — đồng hồ kim 4 giờ 30 phút; Việt — đồng hồ số 17 : 30; tên dưới mỗi tranh.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 182
PW, PH, Y0 = 212, 176, 3
xs = [4, 229, 454, 684]
parts = []

def name(x, s):
    return text(x + 12, Y0 + PH - 12, s, size=24, weight=700, anchor='start')

# Nam
x = xs[0]
parts.append(panel(x, Y0, PW, PH, '#F3FAFF',
    place(x + 140, Y0 + PH + 6, .74, bust('spiky', '#8FD3F4', 'worried', -6, bag='#F4A259'))
    + clock(x + 50, Y0 + 50, 44, 5, 15) + name(x, 'Nam')))
# Mai
x = xs[1]
parts.append(panel(x, Y0, PW, PH, '#FFF6F9',
    place(x + 136, Y0 + PH + 6, .74, bust('ponytail', '#FFB3C7', 'laugh', 0, band=TEAL, bag=PURPLE,
          hand=f'{tube("M58,-60 Q84,-80 88,-112", "#FFB3C7", 16)}<circle cx="88" cy="-114" r="11" fill="{SKIN}" {st()}/>'))
    + digital(x + 50, Y0 + 32, 80, 44, '16 : 15') + name(x, 'Mai')))
# Rô-bốt
x = xs[2]
parts.append(panel(x, Y0, PW, PH, '#F4FFF9',
    place(x + 140, Y0 + PH + 6, .66, robot_bust('happy', 0, arms=((-78, -10), (78, -10))))
    + clock(x + 50, Y0 + 50, 44, 4, 30) + name(x, 'Rô-bốt')))
# Việt
x = xs[3]
ball = (f'<circle cx="0" cy="-40" r="34" fill="#fff" {st()}/>'
        f'<path d="M-12,-52 L10,-54 L16,-34 L0,-22 L-16,-34 Z" fill="{INK}"/>')
parts.append(panel(x, Y0, PW, PH, '#FFFBEF',
    place(x + 136, Y0 + PH + 6, .74, bust('short', '#9BD58A', 'smile', 0, bag=BLUE,
          hand=ball + f'<circle cx="-28" cy="-30" r="11" fill="{SKIN}" {st()}/><circle cx="28" cy="-30" r="11" fill="{SKIN}" {st()}/>'))
    + digital(x + 50, Y0 + 32, 80, 44, '17 : 30') + name(x, 'Việt')))
save('bai31_t1_q5_friends', W, H, parts)
