"""
Vở BT Toán 1, Bài 2 "Nhiều hơn, ít hơn" (trang 4): sáu cặp nhóm đồ vật, mỗi vật
của nhóm ít hơn đứng thẳng hàng với một vật của nhóm kia, vật thừa ra ở cuối hàng.
Giữ đúng số lượng của sách:
  cây có quả 4 – cây không có quả 3 · bông hoa 4 – quả cam 3 · mũ 3 – bạn gái 4
  hạc giấy 4 – thuyền giấy 3 · ngôi sao 5 – bóng bay 3 · chấm trắng 3 – chấm xanh 4
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_a import *

F = 'grade1-workbook'
(ROOT / 'src/assets' / F).mkdir(parents=True, exist_ok=True)


def row_x(n, w=600, step=120, x0=90):
    return [x0 + i * step for i in range(n)]


def tc(group, svg):
    """Một vật bé chạm để đếm (engine/tapCount.js): nhóm 'a' (hàng/cột đầu) hoặc 'b'."""
    return f'<g data-tc="{group}">{svg}</g>'


# 1. cây có quả (4) – cây không có quả (3): đồi trên và đồi dưới
W, H = 620, 400
p = [sky_grass(W, H, 150), cloud(520, 56, .8), cloud(120, 44, .6),
     f'<path d="M3,262 Q200,236 360,250 T617,240 L617,397 L3,397 Z" fill="{GRASS_D}" opacity=".35"/>']
for x in row_x(4, step=140, x0=95):
    p.append(tc('a', fruit_tree(x, 200, .82)))
for x in row_x(3, step=140, x0=95):
    p.append(tc('b', leafy_tree(x, 375, .9)))
save('bai2_trees', W, H, p, folder=F)

# 2. bông hoa (4) – quả cam (3)
W, H = 560, 300
p = [board(W, H, CREAM)]
p.append(f'<rect x="30" y="148" width="{W - 60}" height="12" rx="6" fill="{BROWN}" opacity=".35"/>')
for x in row_x(4, step=125, x0=90):
    p.append(tc('a', flower(x, 136, 1.4)))
for x in row_x(3, step=125, x0=90):
    p.append(tc('b', orange(x, 262, 1.6)))
save('bai2_flowers_oranges', W, H, p, folder=F)

# 3. mũ (3) – bạn gái (4)
W, H = 560, 320
p = [board(W, H, '#EAF6FD')]
for x in row_x(3, step=125, x0=85):
    p.append(tc('a', cap(x, 100, 1.0, col=[RED, BLUE, ORANGE][(x // 125) % 3])))
for i, x in enumerate(row_x(4, step=125, x0=85)):
    p.append(tc('b', girl_head(x, 300, .95, shirt=[PURPLE, TEAL, PINK, YELLOW][i])))
save('bai2_caps_girls', W, H, p, folder=F)

# 4. hạc giấy (4) – thuyền giấy (3)
W, H = 560, 320
p = [board(W, H, '#F3F0FF')]
p.append(f'<path d="M3,236 Q140,224 280,236 T557,232 L557,317 L3,317 Z" fill="{WATER_L}"/>'
         f'<rect x="3" y="3" width="{W - 6}" height="{H - 6}" rx="22" fill="none" {st(3)}/>')
for x in row_x(4, step=125, x0=90):
    p.append(tc('a', crane(x, 150, 1.05)))
for x in row_x(3, step=125, x0=90):
    p.append(tc('b', paper_boat(x, 278, 1.0, col=[BLUE, GREEN, ORANGE][(x // 125) % 3])))
save('bai2_cranes_boats', W, H, p, folder=F)

# 5. ngôi sao (5) – bóng bay (3)
W, H = 600, 320
p = [board(W, H, '#EAF6FD')]
for x in row_x(5, step=110, x0=80):
    p.append(tc('a', star(x, 72, 36)))
for i, x in enumerate(row_x(3, step=110, x0=80)):
    p.append(tc('b', balloon(x, 300, 1.25, col=[RED, PURPLE, GREEN][i])))
save('bai2_stars_balloons', W, H, p, folder=F)

# 6. chấm tròn trắng (3, cột trái) – chấm tròn xanh (4, cột phải)
W, H = 420, 360
p = [board(W, H, CREAM)]
for i in range(3):
    p.append(tc('a', circ(110, 62 + i * 78, 30, WHITE)))
for i in range(4):
    p.append(tc('b', circ(310, 62 + i * 78, 30, BLUE)))
save('bai2_dots', W, H, p, folder=F)
