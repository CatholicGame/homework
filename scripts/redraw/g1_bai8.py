"""Vở BT Toán 1, Bài 8 (Các số 1, 2, 3, 4, 5, trang 10): tranh đếm Q3, nối nhóm đồ vật – xúc xắc – số Q4."""
from kit_l1_b import *

F = 'grade1-workbook'
PW, PH = 240, 160


def scene(name, items, w=PW, h=PH, oval=False):
    parts = [f'<ellipse cx="{w / 2}" cy="{h / 2}" rx="{w / 2 - 3}" ry="{h / 2 - 3}" fill="#FFFDF6" {st(2.6, "#B9B2A8")}/>'
             if oval else panel(2, 2, w - 4, h - 4)]
    for sp, cx, cy, sw, sh, *rest in items:
        parts.append(fit(sp, cx, cy, sw, sh, rot=rest[0] if rest else 0))
    save(name, w, h, parts, folder=F)


# Q3: 5 quả chuối, 3 cây, 4 bút chì, 2 ô tô / 3 cái áo, 1 quả dứa, 5 thuyền buồm, 4 chậu hoa
scene('bai8_q3_bananas', [(banana(), x, y, 64, 74) for x, y in ((48, 44), (120, 42), (192, 44), (84, 114), (156, 114))])
scene('bai8_q3_trees', [(tree(), x, y, 76, 88) for x, y in ((52, 54), (188, 54), (120, 106))])
scene('bai8_q3_pencils', [(pencil(c), x, y, 66, 66) for c, x, y in ((YELLOW, 70, 48), (BLUE, 170, 48), (GREEN, 80, 114), (RED, 170, 114))])
scene('bai8_q3_cars', [(car(RED), 82, 48, 130, 50), (car(BLUE), 158, 112, 130, 50)])
scene('bai8_q3_dresses', [(dress(PINK), x, y, 74, 64) for x, y in ((56, 46), (182, 46), (118, 112))])
scene('bai8_q3_pineapple', [(pineapple(), 120, 80, 100, 136)])
scene('bai8_q3_boats', [(sailboat(c), x, y, 70, 48) for c, x, y in
                        ((RED, 50, 36), (BLUE, 120, 36), (GREEN, 190, 36), (ORANGE, 82, 112), (PURPLE, 162, 112))])
scene('bai8_q3_pots', [(potted_flower(c), x, y, 50, 74) for c, x, y in ((RED, 38, 70), (PINK, 94, 58), (ORANGE, 150, 98), (RED, 204, 72))])

# Q4: nhóm đồ vật trong vòng (1 cái cốc, 3 quả bóng, 2 con vịt, 5 quả táo, 4 bông hoa)
OW, OH = 200, 150
scene('bai8_q4_cup', [(cup(), 100, 76, 90, 90)], OW, OH, oval=True)
scene('bai8_q4_balls', [(ball(), x, y, 52, 52) for x, y in ((100, 40), (62, 98), (140, 98))], OW, OH, oval=True)
scene('bai8_q4_ducks', [(duck(), x, y, 60, 54) for x, y in ((80, 46), (120, 104))], OW, OH, oval=True)
scene('bai8_q4_apples', [(apple(), x, y, 44, 44) for x, y in ((60, 50), (100, 36), (142, 52), (78, 104), (126, 104))], OW, OH, oval=True)
scene('bai8_q4_flowers', [(daisy(c), x, y, 36, 60) for c, x, y in ((YELLOW, 66, 50), (ORANGE, 112, 44), (YELLOW, 150, 74), (ORANGE, 92, 108))], OW, OH, oval=True)

# Q4: các mặt xúc xắc (theo thứ tự trong sách: 3, 1, 4, 2, 5 chấm; mặt 3 và 2 đặt xoay)
for n, rot in ((3, 45), (1, 0), (4, 0), (2, 45), (5, 0)):
    save(f'bai8_q4_dice{n}', 110, 110, [dice(55, 55, 64 if rot else 80, n, rot)], folder=F)
