"""Vở BT Toán 1, Bài 7 (Luyện tập, trang 9): tranh đếm Q1, hình tách gộp Q3."""
from kit_l1_b import *

F = 'grade1-workbook'
PW, PH = 240, 160
CY, CP, CB = '#FFE08A', '#F9C6DD', '#BFE3F7'   # màu ô trống (khớp chip màu trong câu hỏi)


def scene(name, items):
    parts = [panel(2, 2, PW - 4, PH - 4)]
    for sp, cx, cy, w, h, *rest in items:
        parts.append(fit(sp, cx, cy, w, h, flip=bool(rest and rest[0])))
    save(name, PW, PH, parts, folder=F)


# Q1: 2 chim, 1 bạn nhỏ, 3 ngựa gỗ, 3 bông hoa, 2 vợt bóng bàn, 1 xe đạp
scene('bai7_q1_birds', [(bird(), 70, 62, 100, 70), (bird(GREEN, '#4EA56A'), 168, 100, 100, 70)])
scene('bai7_q1_kid', [(kid(girl=True, shirt=PINK, bottom=PURPLE), 120, 82, 120, 130)])
scene('bai7_q1_horses', [(rocking_horse(), 64, 48, 112, 78), (rocking_horse(), 178, 48, 112, 78),
                         (rocking_horse(), 120, 116, 112, 78)])
scene('bai7_q1_flowers', [(daisy(PINK), 58, 82, 56, 100), (daisy(PINK), 120, 62, 56, 100), (daisy(PINK), 182, 92, 56, 100)])
scene('bai7_q1_paddles', [(paddle(RED), 80, 80, 74, 124), (paddle(RED), 160, 80, 74, 124)])
scene('bai7_q1_bike', [(bicycle(), 120, 82, 190, 120)])


def oval_fig(name, left_n, right_n, right_box_side):
    """Hình bầu dục lớn chứa 2 bầu dục nhỏ (left_n, right_n ô vuông). Dây nối xuống ô trống."""
    W, H = 330 if right_box_side else 290, 220
    p = []
    cx, cy = 145, 80
    sq = 24
    lx, rx = cx - 62, cx + 62
    s_box = 46
    by = 160
    # dây
    boxes = [(lx, by, CY), (cx, by, CP)]
    p.append(f'<ellipse cx="{cx}" cy="{cy}" rx="140" ry="68" fill="#FFF8E7" {st(2.8)}/>')
    p.append(f'<path d="M{lx},{cy + 40} V{by}" {st(2.6)}/>')
    p.append(f'<path d="M{cx},{cy + 68} V{by}" {st(2.6)}/>')
    if right_box_side:
        p.append(f'<path d="M{rx + 54},{cy} H{W - 52}" {st(2.6)}/>')
        boxes.append((W - 52 + s_box / 2, cy - s_box / 2, CB))
    else:
        p.append(f'<path d="M{rx},{cy + 40} V{by}" {st(2.6)}/>')
        boxes.append((rx, by, CB))
    for ox, n in ((lx, left_n), (rx, right_n)):
        p.append(f'<ellipse cx="{ox}" cy="{cy}" rx="54" ry="40" fill="#FFFFFF" {st(2.8)}/>')
        x0 = ox - (n * sq + (n - 1) * 8) / 2
        for i in range(n):
            p.append(f'<rect x="{x0 + i * (sq + 8)}" y="{cy - sq / 2}" width="{sq}" height="{sq}" rx="3" fill="{BLUE}" {st(2.4)}/>')
    for bx, byy, col in boxes:
        if col == CB and right_box_side:
            p.append(box(bx - s_box / 2, byy, s_box, col))
        else:
            p.append(box(bx - s_box / 2, byy, s_box, col))
    save(name, W, H, p, folder=F)


oval_fig('bai7_q3_split_a', 1, 1, False)
oval_fig('bai7_q3_split_b', 2, 1, True)
