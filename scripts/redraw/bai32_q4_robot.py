"""
Vở BT Toán 2, Bài 32 Q4 — Rô-bốt học hát / rửa bát với đồng hồ Bắt đầu – Kết thúc: nét riêng.
Giữ nội dung toán: a) Bắt đầu 9 giờ, Kết thúc 9 giờ 30 phút;
b) Bắt đầu 7 giờ 15 phút, Kết thúc 7 giờ 30 phút; nhãn "Bắt đầu", "Kết thúc" dưới mỗi đồng hồ.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 840
parts = [text(6, 34, 'a)', size=30, weight=600, anchor='start'),
         text(6, 440, 'b)', size=30, weight=600, anchor='start')]


def tag(cx, cy, s):
    return digital(cx, cy, 190, 70, s, size=32)


# ── a) hát
mic = (f'<rect x="54" y="-176" width="12" height="46" rx="5" fill="{GREY}" {st(2.4)} transform="rotate(-20 60 -150)"/>'
       f'<circle cx="68" cy="-182" r="12" fill="{INK}"/>')
parts.append(place(560, 380, 1.05, robot(arms=((-86, -210), (56, -150)), legs='walk', expr='happy', extra_front=mic)))
for nx, ny, s in ((400, 120, 1.1), (470, 50, 1.3), (440, 170, .9), (660, 70, 1.1)):
    parts.append(note(nx, ny, s, '#7C6FD0'))
parts.append(clock(285, 200, 64, 9, 0))
parts.append(tag(290, 330, 'Bắt đầu'))
parts.append(clock(760, 205, 64, 9, 30))
parts.append(tag(760, 330, 'Kết thúc'))

# ── b) rửa bát
parts.append(place(610, 796, 1.0, robot(arms=((-80, -96), (10, -90)), no_legs=True, expr='down', look=-10)))
parts.append(f'<path d="M430,700 L740,700 L724,800 L446,800 Z" fill="#DDE6EE" {st()}/>')
parts.append(sink(456, 690, 270, 80))
parts.append(f'<ellipse cx="560" cy="700" rx="46" ry="14" fill="#fff" {st(2.4)}/><ellipse cx="640" cy="690" rx="28" ry="16" fill="{YELLOW}" {st(2.4)}/>')
parts.append(faucet(520, 700, 60))
parts.append(clock(340, 660, 62, 7, 15))
parts.append(tag(345, 782, 'Bắt đầu'))
parts.append(clock(810, 660, 62, 7, 30))
parts.append(tag(800, 782, 'Kết thúc'))
save('bai32_q4_robot', W, H, parts)
