"""
Vở BT Toán 1, Bài 5 "Luyện tập" (trang 7) và Bài 6 "Các số 1, 2, 3" (trang 8).
  Bài 5.1: 10 hình rải rác như sách: 4 hình vuông (2 đặt chéo), 3 hình tam giác, 3 hình tròn.
  Bài 6.2: sáu ô tranh: 1 gà con · 2 bông hoa · 3 quả cam · 3 cây · 2 con chim · 1 thuyền giấy.
  Bài 6.3: ô 1, 2, 3 chấm tròn.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_a import *

F = 'grade1-workbook'
(ROOT / 'src/assets' / F).mkdir(parents=True, exist_ok=True)

# ── Bài 5.1 ──
W, H = 900, 450
ox, oy = -40, -215


def P(*pts):
    return poly([(x + ox, y + oy) for x, y in pts])


p = [board(W, H, CREAM),
     P((78, 265), (170, 265), (170, 357), (78, 357)),                 # hình vuông
     P((240, 360), (327, 237), (413, 360)),                            # tam giác
     circ(555 + ox, 300 + oy, 70),                                     # hình tròn
     P((638, 372), (772, 268), (876, 402), (742, 506)),                # hình vuông to đặt chéo
     P((92, 372), (195, 452), (118, 502)),                             # tam giác
     P((410, 455), (500, 393), (563, 483), (473, 545)),                # hình vuông đặt chéo
     P((88, 552), (147, 552), (147, 611), (88, 611)),                  # hình vuông nhỏ
     P((230, 497), (377, 497), (305, 622)),                            # tam giác lộn ngược
     circ(593 + ox, 590 + oy, 36),                                     # hình tròn nhỏ
     circ(778 + ox, 575 + oy, 57)]                                     # hình tròn
save('bai5_q1_shapes', W, H, p, folder=F)

# ── Bài 6.2: sáu ô tranh ──
PW, PH = 240, 170


def panel(name, inner, bg='#EAF6FD', ground=None):
    parts = [board(PW, PH, bg, r=18)]
    if ground:
        parts.append(f'<path d="M3,{ground[0]} Q{PW / 2},{ground[0] - 12} {PW - 3},{ground[0]} L{PW - 3},{PH - 20} '
                     f'Q{PW - 3},{PH - 3} {PW - 20},{PH - 3} L20,{PH - 3} Q3,{PH - 3} 3,{PH - 20} Z" fill="{ground[1]}"/>')
    parts += inner
    parts.append(f'<rect x="3" y="3" width="{PW - 6}" height="{PH - 6}" rx="18" fill="none" {st(3)}/>')
    save(name, PW, PH, parts, folder=F)


panel('bai6_q2_chick', [chick(112, 150, 1.15)], ground=(140, GRASS))
panel('bai6_q2_flowers', [flower(80, 156, 1.75, PINK), flower(160, 156, 1.75, PURPLE)], bg=CREAM)
panel('bai6_q2_oranges', [orange(60, 88, 1.35), orange(180, 88, 1.35), orange(120, 156, 1.35)], bg=CREAM)
panel('bai6_q2_trees', [fruit_tree(52, 152, .62, fruit=GREEN), fruit_tree(120, 140, .62, fruit=GREEN),
                        fruit_tree(188, 152, .62, fruit=GREEN)], ground=(110, GRASS))
panel('bai6_q2_birds', [bird(70, 70, 1.05), bird(170, 116, 1.05, col=ORANGE, wing=YELLOW)])
panel('bai6_q2_boat', [paper_boat(120, 140, 1.6, col=BLUE)], ground=(112, WATER_L))

# ── Bài 6.3: ô chấm tròn ──
for n in (1, 2, 3):
    save(f'bai6_q3_dots{n}', 120, 120, [dot_card(6, 6, 108, n)], folder=F)
