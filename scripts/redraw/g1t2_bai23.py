"""Vở BT Toán 1 Tập Hai — Bài 23 (Bảng các số từ 1 đến 100), trang 22–23.
q5a: 18 ngôi nhà nối thành đường, 4 nhà đầu ghi 2, 4, 6, 8; thỏ cầm biển 24 (nhà số 24 là nhà thứ 12).
q5b: 18 ngôi nhà, 4 nhà đầu ghi 1, 3, 5, 7; mèo cầm biển 23 (nhà số 23 là nhà thứ 12).
Mái nhà để trắng: bé chạm mái là tô (engine/colorPaint.js)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_b import *
import kit_measure as KM

HW = 62


def street(name, W, H, houses, nums, bg, ground, decor, critter):
    parts = [f'<rect width="{W}" height="{H}" fill="{bg}"/>', ground]
    parts += decor
    # nhà phía sau (đáy cao hơn trên hình) vẽ trước
    order = sorted(range(len(houses)), key=lambda i: houses[i][1])
    for i in order:
        x, y = houses[i]
        parts.append(house(x, y, HW, nums[i] if i < len(nums) else None))
    parts.append(critter)
    out(name, W, H, parts)


# a) thỏ, nền xám nhạt như sân
A = [(40, 128), (100, 146), (158, 166), (218, 186), (280, 212), (352, 190), (378, 146), (430, 112), (506, 100),
     (574, 116), (650, 132), (716, 170), (690, 214), (712, 262), (646, 300), (592, 334), (510, 344), (436, 362)]
ga = f'<path d="M20,80 Q300,40 820,70 L820,330 Q600,395 300,380 Q60,370 16,330 Z" fill="#E7EEF3"/>'
deco_a = [tuft(60, 175, 1.1), tuft(330, 100, 1.0), tuft(790, 70, 1.0), tuft(770, 330, 1.1), tuft(420, 355, 1.0), tuft(110, 352, .8)]
rab = bunny(170, 350, 150) + sign(208, 282, '24', .9)
street('bai23_q5a_houses', 830, 385, A, ['2', '4', '6', '8'], WHITE, ga, deco_a, rab)

# b) mèo, nền xanh nhạt
B = [(312, 340), (232, 322), (152, 308), (92, 270), (24, 245), (44, 190), (24, 150), (102, 110), (174, 86),
     (242, 80), (312, 106), (362, 155), (412, 190), (484, 210), (532, 170), (582, 140), (634, 120), (702, 96)]
gb = f'<path d="M10,60 Q300,20 820,40 L825,330 Q600,372 300,362 Q60,358 8,330 Z" fill="#D9EFFB"/>'
deco_b = [tuft(40, 60, 1.0), tuft(560, 60, 1.0), tuft(780, 160, .9), tuft(350, 220, .9), tuft(410, 355, 1.0), tuft(130, 350, 1.0), tuft(610, 350, .8)]
cat = KM.plush_cat(700, 350, 110, fur='#9ED3F5', light=WHITE) + sign(652, 300, '23', .9)
street('bai23_q5b_houses', 830, 372, B, ['1', '3', '5', '7'], WHITE, gb, deco_b, cat)
