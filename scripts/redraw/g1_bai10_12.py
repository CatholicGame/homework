"""Vở BT Toán 1, Bài 10 (Bé hơn, dấu <), Bài 11 (Lớn hơn, dấu >), Bài 12 (Luyện tập): hình cho câu "Viết (theo mẫu)"."""
from kit_l1_b import *

F = 'grade1-workbook'
SAMPLE = '#2E7BC4'   # chữ mẫu màu xanh như các bài mẫu khác


def sample_boxes(cx, y, items, s=40):
    x0 = cx - len(items) * s / 2
    return ''.join(box(x0 + i * s, y, s, WHITE, t, s * .62, SAMPLE) for i, t in enumerate(items))


def dice_pair(name, a, b, sample=None, big=False):
    W, H = 250, 120 + (56 if sample else 0)
    s = 96 if big else 80
    p = [dice(68, 60, s if big else 84, a, pip='#6F6A70'), dice(182, 60, s if big else 84, b, pip='#6F6A70')]
    if sample:
        p.append(sample_boxes(125, 122, sample))
    save(name, W, H, p, folder=F)


# Bài 10 Q2: mẫu 1 < 3; rồi 2 và 5, 3 và 4, 1 và 5
dice_pair('bai10_q2_dice_mau', 1, 3, ['1', '&lt;', '3'])
dice_pair('bai10_q2_dice_a', 2, 5)
dice_pair('bai10_q2_dice_b', 3, 4)
dice_pair('bai10_q2_dice_c', 1, 5)


def towers(name, a, b, sample=None):
    cell = 30
    W, H = 150, 5 * cell + 12 + (52 if sample else 0)
    base = 5 * cell + 6
    p = [tower(30, base, a, cell, YELLOW), tower(90, base, b, cell, YELLOW)]
    if sample:
        p.append(sample_boxes(75, base + 8, sample, 38))
    save(name, W, H, p, folder=F)


# Bài 11 Q2: cột ô vuông, mẫu 4 > 3; rồi 5 và 2, 5 và 3, 3 và 2
towers('bai11_q2_towers_mau', 4, 3, ['4', '&gt;', '3'])
towers('bai11_q2_towers_a', 5, 2)
towers('bai11_q2_towers_b', 5, 3)
towers('bai11_q2_towers_c', 3, 2)
# Bài 11 Q2 hàng dưới: xúc xắc 5 và 4, 4 và 2, 5 và 1, 4 và 1
for tag, a, b in (('a', 5, 4), ('b', 4, 2), ('c', 5, 1), ('d', 4, 1)):
    save(f'bai11_q2_dice_{tag}', 200, 100, [dice(52, 50, 80, a), dice(148, 50, 80, b)], folder=F)


# Bài 12 Q2: khung tranh hai hàng đồ vật
PW, PH = 320, 200


def two_rows(name, top, bottom, sample=None):
    H = PH + (60 if sample else 0)
    p = [panel(2, 2, PW - 4, PH - 4)]
    for (sp, n, w, h, *rest), cy in ((top, 52), (bottom, 148)):
        step = (PW - 30) / n
        for i in range(n):
            sprite = sp[i % len(sp)] if isinstance(sp, list) else sp
            p.append(fit(sprite, 15 + step * (i + .5), cy, min(w, step - 6), h))
    if sample:
        p.append(sample_boxes(PW / 4 + 4, PH + 12, sample[0], 40))
        p.append(sample_boxes(PW * 3 / 4 - 4, PH + 12, sample[1], 40))
    save(name, PW, H, p, folder=F)


two_rows('bai12_q2_rabbits_mau', (rabbit(), 4, 70, 80), (carrot(), 3, 80, 64),
         (['4', '&gt;', '3'], ['3', '&lt;', '4']))
two_rows('bai12_q2_shapes', (circle_shape(BLUE), 5, 54, 54), (triangle_shape(ORANGE), 3, 66, 60))
two_rows('bai12_q2_bikes_kids', ([bicycle(c) for c in (TEAL, RED, BLUE, ORANGE, PURPLE)], 5, 70, 60),
         ([kid(girl=True, shirt=PINK, bottom=PURPLE), kid(shirt=BLUE), kid(girl=True, shirt=YELLOW, bottom=TEAL), kid(shirt=RED)], 4, 60, 84))
two_rows('bai12_q2_caps_shirts', ([cap(c) for c in (RED, BLUE, GREEN)], 3, 84, 56),
         ([shirt(c) for c in (BLUE, YELLOW, GREEN, RED, PURPLE)], 5, 66, 60))
