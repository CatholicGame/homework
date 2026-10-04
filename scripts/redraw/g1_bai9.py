"""Vở BT Toán 1, Bài 9 (Luyện tập, trang 11): tranh đếm Q1, xúc xắc tách gộp Q2."""
from kit_l1_b import *

F = 'grade1-workbook'
PW, PH = 240, 160
CY, CP, CB = '#FFE08A', '#F9C6DD', '#BFE3F7'


def scene(name, items):
    parts = [panel(2, 2, PW - 4, PH - 4)]
    for sp, cx, cy, w, h, *rest in items:
        parts.append(fit(sp, cx, cy, w, h, flip=bool(rest and rest[0])))
    save(name, PW, PH, parts, folder=F)


# Q1: 4 con chim, 5 bạn nhỏ, 5 xe đạp / 3 cái mũ, 2 con chó, 4 cái áo
scene('bai9_q1_birds', [(bird(c, w), x, y, 88, 56) for (c, w), x, y in
                        (((BLUE, '#4E9BD6'), 60, 40), ((GREEN, '#4EA56A'), 178, 40), ((YELLOW, ORANGE), 60, 116), ((PINK, '#E07AA6'), 178, 116))])
K = [dict(girl=False, shirt=BLUE), dict(girl=True, shirt=PINK, bottom=PURPLE), dict(girl=False, shirt=RED, bottom='#4E8FC8'),
     dict(girl=True, shirt=YELLOW, bottom=TEAL), dict(girl=False, shirt=GREEN, bottom=BROWN)]
scene('bai9_q1_kids', [(kid(**k), x, y, 60, 76) for k, (x, y) in zip(K, ((44, 42), (120, 42), (196, 42), (82, 118), (158, 118)))])
scene('bai9_q1_bikes', [(bicycle(c), x, y, 92, 56) for c, (x, y) in zip((TEAL, RED, BLUE, ORANGE, PURPLE),
                                                                        ((54, 38), (186, 38), (120, 80), (54, 122), (186, 122)))])
scene('bai9_q1_caps', [(cap(c), x, y, 92, 54) for c, x, y in ((RED, 64, 46), (BLUE, 178, 46), (GREEN, 120, 114))])
scene('bai9_q1_dogs', [(dog(), 66, 84, 104, 104), (dog('#E8E0D6', INK), 176, 84, 104, 104)])
scene('bai9_q1_shirts', [(shirt(c), x, y, 70, 56) for c, x, y in ((BLUE, 66, 42), (YELLOW, 174, 42), (GREEN, 66, 116), (RED, 174, 116))])


def dice_pair(name, a, b):
    """Vòng bầu dục chứa 2 mặt xúc xắc; dây nối: xúc xắc trái → ô vàng, cả vòng → ô hồng, xúc xắc phải → ô xanh."""
    W, H = 250, 200
    p = []
    lx, rx, cy = 75, 175, 66
    p.append(f'<ellipse cx="125" cy="{cy}" rx="120" ry="60" fill="#FFF8E7" {st(2.8)}/>')
    p.append(dice(lx, cy, 64, a))
    p.append(dice(rx, cy, 64, b))
    by = 146
    p.append(f'<path d="M{lx},{cy + 32} V{by}" {st(2.6)}/><path d="M125,{cy + 60} V{by}" {st(2.6)}/><path d="M{rx},{cy + 32} V{by}" {st(2.6)}/>')
    for x, c in ((lx, CY), (125, CP), (rx, CB)):
        p.append(box(x - 23, by, 46, c))
    save(name, W, H, p, folder=F)


for tag, a, b in (('a', 3, 1), ('b', 2, 2), ('c', 4, 1), ('d', 3, 2)):
    dice_pair(f'bai9_q2_dice_{tag}', a, b)
