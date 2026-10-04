"""
Vở BT Toán 1, Bài 4 "Hình tam giác" (trang 6). Mỗi hình tam giác là một hình kín
trắng riêng để bé chạm tô màu.
  1. 5 hình tam giác (thấp, cao xen kẽ) · 5 hình tam giác (3 đứng, 2 lộn ngược)
  2. ngôi nhà (mái 3, thân 4 hình tam giác) · thuyền (buồm 1, thân 3) · chong chóng (4)
  3. ngôi nhà (mái tam giác, thân và cửa) + cây thông (3 tầng tam giác) · dải 5 hình tam giác
  4. xếp que tính 6 hình
"""
import sys, os, math
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_a import *

F = 'grade1-workbook'
(ROOT / 'src/assets' / F).mkdir(parents=True, exist_ok=True)

# 1.
W, H = 900, 200
B = 170
p = [board(W, H, CREAM)]
x = 40
for i in range(5):
    tall = i % 2 == 1
    w, h = (56, 130) if tall else (76, 68)
    p.append(poly([(x, B), (x + w / 2, B - h), (x + w, B)]))
    x += w + 14
x = 500
for i in range(5):
    if i % 2 == 0:
        p.append(poly([(x, B), (x + 38, B - 70), (x + 76, B)]))
    else:
        p.append(poly([(x, B - 104), (x + 76, B - 104), (x + 38, B - 34)]))
    x += 70 if i % 2 == 0 else 68
save('bai4_q1_triangles', W, H, p, folder=F)

# 2.
W, H = 900, 270
p = [board(W, H, CREAM)]
# ngôi nhà: mái 3 hình tam giác, thân hình vuông chia 4 hình tam giác
ox, oy = 40, 30
L, T = ox, oy + 50
p += [poly([(ox, T), (ox + 55, oy), (ox + 110, T)]),
      poly([(ox + 55, oy), (ox + 165, oy), (ox + 110, T)]),
      poly([(ox + 110, T), (ox + 165, oy), (ox + 220, T)])]
sx0, sx1, sy0, sy1 = ox + 30, ox + 190, T, T + 160
cx, cy = (sx0 + sx1) / 2, (sy0 + sy1) / 2
p += [poly([(sx0, sy0), (sx1, sy0), (cx, cy)]), poly([(sx1, sy0), (sx1, sy1), (cx, cy)]),
      poly([(sx1, sy1), (sx0, sy1), (cx, cy)]), poly([(sx0, sy1), (sx0, sy0), (cx, cy)])]
# thuyền: buồm 1, thân 3
bx, top, bot = 450, 160, 230
p += [poly([(bx, 30), (bx + 60, 100), (bx, top)]),
      poly([(bx - 140, top), (bx, top), (bx - 70, bot)]),
      poly([(bx, top), (bx + 70, bot), (bx - 70, bot)]),
      poly([(bx, top), (bx + 140, top), (bx + 70, bot)])]
# chong chóng: 4 hình tam giác vuông quanh tâm
c = (755, 135)
p += [poly([c, (680, 30), (755, 30)]), poly([c, (860, 60), (860, 135)]),
      poly([c, (755, 240), (830, 240)]), poly([c, (650, 135), (650, 210)])]
save('bai4_q2_pictures', W, H, p, folder=F)

# 3.
W, H = 900, 260
p = [board(W, H, CREAM)]
# ngôi nhà: mái tam giác, thân hình chữ nhật, cửa
p += [f'<rect x="70" y="105" width="150" height="130" fill="{WHITE}" {st()}/>',
      sq(122, 180, 46),
      poly([(40, 105), (145, 25), (250, 105)])]
# cây thông: thân + 3 tầng tam giác
tx = 330
p += [f'<rect x="{tx - 8}" y="160" width="16" height="75" fill="{WHITE}" {st()}/>',
      poly([(tx - 75, 165), (tx, 95), (tx + 75, 165)]),
      poly([(tx - 55, 110), (tx, 60), (tx + 55, 110)]),
      poly([(tx - 35, 70), (tx, 34), (tx + 35, 70)])]
# dải 5 hình tam giác (nhọn trái / phải xen kẽ)
y0, y1, ym = 50, 220, 135
p += [poly([(560, y0), (560, y1), (480, ym)]),
      poly([(574, y0), (574, y1), (654, ym)]),
      poly([(734, y0), (734, y1), (654, ym)]),
      poly([(748, y0), (748, y1), (828, ym)]),
      poly([(880, y0), (880, y1), (828, ym)])]
save('bai4_q3_pictures', W, H, p, folder=F)

# 4. que tính
U = 62
h3 = U * math.sqrt(3) / 2


def tri_up(x, y):          # (x, y) = góc trái đáy
    return [(x, y, x + U, y), (x, y, x + U / 2, y - h3), (x + U, y, x + U / 2, y - h3)]


segs = []
# hình 1: hình vuông, bốn phía là bốn hình tam giác
ox, oy = 95, 120
sqr = [(ox, oy, ox + U, oy), (ox, oy + U, ox + U, oy + U), (ox, oy, ox, oy + U), (ox + U, oy, ox + U, oy + U)]
segs1 = sqr + [(ox, oy, ox + U / 2, oy - h3), (ox + U, oy, ox + U / 2, oy - h3),
               (ox, oy + U, ox + U / 2, oy + U + h3), (ox + U, oy + U, ox + U / 2, oy + U + h3),
               (ox, oy, ox - h3, oy + U / 2), (ox, oy + U, ox - h3, oy + U / 2),
               (ox + U, oy, ox + U + h3, oy + U / 2), (ox + U, oy + U, ox + U + h3, oy + U / 2)]
# hình 2: ba hình vuông liền nhau, trên mỗi hình một mái tam giác
ox, oy = 320, 110
segs2 = []
for i in range(3):
    x = ox + i * U
    segs2 += [(x, oy + U, x + U, oy + U)] + tri_up(x, oy)
for i in range(4):
    segs2.append((ox + i * U, oy, ox + i * U, oy + U))
# hình 3: tam giác lớn gồm 3 tam giác nhỏ
ox, oy = 660, 172
segs3 = tri_up(ox, oy) + tri_up(ox + U, oy) + tri_up(ox + U / 2, oy - h3)
# hình 4: hình tam giác, hai hình vuông trên hai cạnh bên, một hình vuông dưới đáy
ox, oy = 155, 370
A, Bp, C = (ox, oy), (ox + U, oy), (ox + U / 2, oy - h3)


def square_out(P, Q, sign):
    dx, dy = Q[0] - P[0], Q[1] - P[1]
    nx, ny = -dy * sign, dx * sign
    P2, Q2 = (P[0] + nx, P[1] + ny), (Q[0] + nx, Q[1] + ny)
    return [(P[0], P[1], P2[0], P2[1]), (P2[0], P2[1], Q2[0], Q2[1]), (Q2[0], Q2[1], Q[0], Q[1])]


segs4 = [(A[0], A[1], Bp[0], Bp[1]), (A[0], A[1], C[0], C[1]), (Bp[0], Bp[1], C[0], C[1])]
segs4 += square_out(A, C, -1) + square_out(C, Bp, -1)
segs4 += [(A[0], A[1], A[0], A[1] + U), (A[0], A[1] + U, Bp[0], Bp[1] + U), (Bp[0], Bp[1], Bp[0], Bp[1] + U)]
# hình 5: lục giác 6 hình tam giác
cx, cy = 470, 360
V = [(cx + U * math.cos(math.pi / 3 * k), cy + U * math.sin(math.pi / 3 * k)) for k in range(6)]
segs5 = [(V[k][0], V[k][1], V[(k + 1) % 6][0], V[(k + 1) % 6][1]) for k in range(6)]
segs5 += [(cx, cy, v[0], v[1]) for v in V]
# hình 6: 3 tam giác đứng trên, 3 tam giác lộn ngược dưới, chung một đường giữa
ox, oy = 640, 360
segs6 = []
for i in range(3):
    x = ox + i * U
    segs6 += tri_up(x, oy)
    segs6 += [(x, oy, x + U / 2, oy + h3), (x + U, oy, x + U / 2, oy + h3)]
W, H = 900, 470
p = [board(W, H, '#EAF6FD')]
for s in (segs1, segs2, segs3, segs4, segs5, segs6):
    p.append(sticks(s))
save('bai4_q4_sticks', W, H, p, folder=F)
