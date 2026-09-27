"""
Vở BT Toán 2, Bài 41 Tiết 2 Q4 — Rô-bốt rót nước mắm từ can 15 l sang can 5 l: nét riêng.
Giữ nội dung toán: can lớn ghi "15 l" (đang nghiêng rót), can nhỏ ghi "5 l" có phễu.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import jerrycan, jerrycan_spout, pour_stream, litre
from kit_g3 import *

W, H = 438, 413
parts = []
parts.append(place(200, 352, 1.0, robot(arms=((-120, -110), (-30, -170)), no_legs=True, expr='happy', look=-6)))
# bàn
parts.append(f'<path d="M40,330 L420,330 L400,380 L20,380 Z" fill="{SKY_D}" {st()}/>'
             f'<rect x="20" y="380" width="380" height="16" fill="#5FAFD6" {st()}/>')
# can nhỏ 5 l + phễu
parts.append(jerrycan(275, 332, litre('5'), w=74, h=86, color='#FFFFFF', label_size=24))
parts.append(f'<path d="M244,226 L284,226 L270,248 L270,258 L258,258 L258,248 Z" fill="{GREY_L}" {st()}/>')
# can lớn 15 l đang nghiêng
parts.append(jerrycan(110, 300, litre('15'), w=150, h=150, angle=30, color=BLUE, label_size=34))
sx, sy = jerrycan_spout(110, 300, 150, 150, 30)
parts.append(pour_stream(sx, sy, 264, 228, w=7, bend=.3))
save('bai41_t2_q4_robot', W, H, parts)
