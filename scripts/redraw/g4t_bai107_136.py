"""SGK Toán 4, bài 107–136 (trang 119–145): hình bình hành, hình chữ nhật, hình thoi."""
import math
from kit_g4t import *

SHADE = '#C9D3DD'   # phần tô xám trong sách


def cap(x, y, s, size=19):
    return text(x, y, s, size=size, weight=600)


def rhombus(cx, cy, hw, hh):
    """Hình thoi tâm (cx, cy), nửa đường chéo ngang hw, nửa đường chéo đứng hh: trái, trên, phải, dưới."""
    return [(cx - hw, cy), (cx, cy - hh), (cx + hw, cy), (cx, cy + hh)]


def dashed_rect(x0, y0, x1, y1):
    return f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" fill="none" stroke="{INK}" stroke-width="1.6" stroke-dasharray="6 5"/>'


def arrow_dim(p, q, s, side='below', size=18):
    """Đường kích thước có hai mũi tên và số đo."""
    parts = [line(p, q, w=1.8)]
    ang = math.atan2(q[1] - p[1], q[0] - p[0])
    for tip, dirn in ((p, ang + math.pi), (q, ang)):
        l, r = dirn + 2.7, dirn - 2.7
        parts.append(f'<polygon points="{tip[0]:.1f},{tip[1]:.1f} {tip[0] + 11 * math.cos(l):.1f},{tip[1] + 11 * math.sin(l):.1f} '
                     f'{tip[0] + 11 * math.cos(r):.1f},{tip[1] + 11 * math.sin(r):.1f}" fill="{INK}"/>')
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
    if side == 'below':
        parts.append(text(mx, my + 24, s, size=size, weight=600))
    elif side == 'left':
        parts.append(text(mx - 8, my + 6, s, size=size, weight=600, anchor='end'))
    else:
        parts.append(text(mx + 8, my + 6, s, size=size, weight=600, anchor='start'))
    return parts


# ── Bài 112 câu 5: hai hình chữ nhật cắt nhau, phần chung là hình bình hành ABCD (DC = 4cm, AH = 2cm) ──
U = 50
D, C = (250, 360), (250 + 4 * U, 360)
A, B = (250 + 110, 360 - 2 * U), (250 + 110 + 4 * U, 360 - 2 * U)
H = (A[0], D[1])
ux, uy = A[0] - D[0], A[1] - D[1]
L = math.hypot(ux, uy)
ux, uy = ux / L, uy / L
nx, ny = -uy, ux                      # pháp tuyến, hướng sang phía C
if (C[0] - D[0]) * nx + (C[1] - D[1]) * ny < 0:
    nx, ny = -nx, -ny
wdt = (C[0] - D[0]) * nx + (C[1] - D[1]) * ny
s1 = 35
s2 = (C[0] - D[0]) * ux + (C[1] - D[1]) * uy + L + 35   # đầu kia vượt qua B
P1 = (D[0] - ux * s1, D[1] - uy * s1)
P2 = (D[0] + ux * s2, D[1] + uy * s2)
tilt = [P1, P2, (P2[0] + nx * wdt, P2[1] + ny * wdt), (P1[0] + nx * wdt, P1[1] + ny * wdt)]
p = []
p.append(f'<rect x="150" y="{A[1]}" width="480" height="{D[1] - A[1]}" fill="#fff" stroke="{INK}" stroke-width="2.5"/>')
p += poly(tilt, fill='none', w=2.5)
p += poly([A, B, C, D], fill=SHADE, w=3)
p.append(line(A, H, w=2.5))
p.append(right_mark(H, A, C))
for pt, s, dx, dy in ((A, 'A', -4, -12), (B, 'B', -6, -14), (C, 'C', 8, 30), (D, 'D', -22, -10), (H, 'H', 0, 30)):
    p.append(text(pt[0] + dx, pt[1] + dy, s, size=28, weight=700))
ys = [q[1] for q in tilt]
xs = [q[0] for q in tilt] + [150, 630]
out('bai112_q5_hbh', int(max(xs) - min(xs) + 40), int(max(ys) - min(ys) + 50), [f'<g transform="translate({20 - min(xs):.1f},{25 - min(ys):.1f})">'] + p + ['</g>'])

# ── Bài 113 câu 3: hình chữ nhật ABCD 12cm × 5cm, M, N là trung điểm AB, DC ──
S = 32
x0, y0 = 50, 40
A2, B2, C2, D2 = (x0, y0), (x0 + 12 * S, y0), (x0 + 12 * S, y0 + 5 * S), (x0, y0 + 5 * S)
M2, N2 = (x0 + 6 * S, y0), (x0 + 6 * S, y0 + 5 * S)
p = poly([A2, B2, C2, D2], fill=FILL)
p += [line(A2, N2), line(M2, C2), line(M2, N2)]
for pt, s, dy in ((A2, 'A', -12), (M2, 'M', -12), (B2, 'B', -12), (D2, 'D', 30), (N2, 'N', 30), (C2, 'C', 30)):
    p.append(text(pt[0], pt[1] + dy, s, size=22, weight=700))
out('bai113_q3_amcn', 490, 250, p)

# ── Bài 133 câu 1: năm hình (một hàng), hình nào là hình thoi, hình nào là hình chữ nhật ──
p = []
CY = 230
p += poly(rhombus(70, 110, 45, 88), fill=FILL)                   # Hình 1: hình thoi đứng
p.append(cap(70, CY, 'Hình 1', size=24))
ang = math.radians(-4)
cx, cy, hw, hh = 255, 110, 95, 55
rect = []
for sx, sy in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
    x, y = sx * hw, sy * hh
    rect.append((cx + x * math.cos(ang) - y * math.sin(ang), cy + x * math.sin(ang) + y * math.cos(ang)))
p += poly(rect, fill=FILL)                                       # Hình 2: hình chữ nhật hơi nghiêng
p.append(cap(255, CY, 'Hình 2', size=24))
p += poly(rhombus(490, 110, 105, 42), fill=FILL)                 # Hình 3: hình thoi nằm
p.append(cap(490, CY, 'Hình 3', size=24))
p += poly([(625, 165), (775, 165), (815, 55), (665, 55)], fill=FILL)     # Hình 4: hình bình hành
p.append(cap(720, CY, 'Hình 4', size=24))
p += poly([(870, 35), (960, 35), (960, 185), (870, 120)], fill=FILL)     # Hình 5: tứ giác
p.append(cap(915, CY, 'Hình 5', size=24))
out('bai133_q1_hinh', 1000, 250, p)

# ── Bài 133 câu 2: hình thoi ABCD, hai đường chéo AC, BD cắt nhau tại O ──
Ar, Br, Cr, Dr = rhombus(230, 125, 170, 90)
p = poly([Ar, Br, Cr, Dr], labels='ABCD', fill=FILL)
p += [line(Ar, Cr, w=2.5), line(Br, Dr, w=2.5)]
p.append(text(248, 153, 'O', size=21, weight=700))
out('bai133_q2_thoi', 470, 255, p)

# ── Bài 134 câu 1: hình thoi ABCD (AC = 3cm, BD = 4cm), MNPQ (MP = 7cm, NQ = 4cm) ──
S = 40
p = []
pts = rhombus(130, 140, 1.5 * S, 2 * S)
p += poly(pts, labels='ABCD', fill=FILL)
p += [line(pts[0], pts[2], w=2.5), line(pts[1], pts[3], w=2.5), right_mark((130, 140), pts[2], pts[1], size=12)]
p.append(cap(130, 270, 'a) Hình thoi ABCD'))
pts = rhombus(470, 140, 3.5 * S, 2 * S)
p += poly(pts, labels='MNPQ', fill=FILL)
p += [line(pts[0], pts[2], w=2.5), line(pts[1], pts[3], w=2.5), right_mark((470, 140), pts[2], pts[1], size=12)]
p.append(cap(470, 270, 'b) Hình thoi MNPQ'))
out('bai134_q1_thoi', 660, 290, p)

# ── Bài 134 câu 3: hình thoi ABCD (AC = 5cm, BD = 2cm) và hình chữ nhật MNPQ (5cm × 2cm) ──
S = 46
p = []
cx, cy = 100 + 2.5 * S, 110
pts = rhombus(cx, cy, 2.5 * S, 1 * S)
p.append(dashed_rect(cx - 2.5 * S, cy - S, cx + 2.5 * S, cy + S))
p += poly(pts, labels='ABCD', fill=FILL)
p += [line(pts[0], pts[2], w=2.5), line(pts[1], pts[3], w=2.5), right_mark((cx, cy), pts[2], pts[1], size=11)]
p += arrow_dim((cx - 2.5 * S - 32, cy - S), (cx - 2.5 * S - 32, cy + S), '2cm', side='left')
p += arrow_dim((cx - 2.5 * S, cy + S + 40), (cx + 2.5 * S, cy + S + 40), '5cm')
x0 = 460
p += poly([(x0, cy - S), (x0 + 5 * S, cy - S), (x0 + 5 * S, cy + S), (x0, cy + S)], labels='MNPQ', fill=FILL)
p.append(text(x0 + 5 * S + 12, cy + 6, '2cm', size=18, anchor='start'))
p.append(text(x0 + 2.5 * S, cy + S + 26, '5cm', size=18))
out('bai134_q3_ds', 780, 230, p)

# ── Bài 135 câu 3: tam giác vuông 2cm, 3cm và hình thoi ghép từ bốn tam giác đó ──
S = 40
p = []
T0 = (60, 40)
tri = [T0, (60, 40 + 2 * S), (60 + 3 * S, 40 + 2 * S)]
p += poly(tri, fill=FILL)
p.append(right_mark(tri[1], tri[0], tri[2]))
p.append(text(50, 40 + S + 6, '2cm', size=18, anchor='end'))
p.append(text(60 + 1.5 * S, 40 + 2 * S + 26, '3cm', size=18))
p += poly(rhombus(420, 140, 3 * S, 2 * S), fill=FILL)
out('bai135_q3_tamgiac', 580, 250, p)

# ── Bài 136 câu 1: hình chữ nhật ABCD có bốn góc vuông ──
R = [(50, 50), (330, 50), (330, 200), (50, 200)]
p = poly(R, labels='ABCD', fill=FILL)
for i in range(4):
    p.append(right_mark(R[i], R[(i + 1) % 4], R[(i - 1) % 4]))
out('bai136_q1_hcn', 380, 250, p)

# ── Bài 136 câu 2: hình thoi PQRS có hai đường chéo ──
pts = rhombus(200, 130, 160, 100)
p = poly(pts, labels='PQRS', fill=FILL)
p += [line(pts[0], pts[2], w=2.5), line(pts[1], pts[3], w=2.5)]
out('bai136_q2_thoi', 400, 270, p)

# ── Bài 136 câu 3: hình vuông 5cm, hình chữ nhật 6cm × 4cm, hình bình hành đáy 5cm cao 4cm, hình thoi chéo 6cm, 4cm (một hàng) ──
S = 30
p = []
yb = 30 + 5 * S                    # đáy chung của bốn hình
CY = yb + 70
x0 = 70
p += poly([(x0, 30), (x0 + 5 * S, 30), (x0 + 5 * S, yb), (x0, yb)], fill=FILL)
p.append(text(x0 - 10, 30 + 2.5 * S + 6, '5cm', size=20, anchor='end'))
p.append(cap(x0 + 2.5 * S, CY, 'Hình vuông', size=22))
x0 = 270
p += poly([(x0, yb - 4 * S), (x0 + 6 * S, yb - 4 * S), (x0 + 6 * S, yb), (x0, yb)], fill=FILL)
p.append(text(x0 + 6 * S + 8, yb - 2 * S + 6, '4cm', size=20, anchor='start'))
p.append(text(x0 + 3 * S, yb + 26, '6cm', size=20))
p.append(cap(x0 + 3 * S, CY, 'Hình chữ nhật', size=22))
xa, yt = 520, yb - 4 * S
par = [(xa, yb), (xa + 5 * S, yb), (xa + 7 * S, yt), (xa + 2 * S, yt)]
p += poly(par, fill=FILL)
hp = (xa + 2 * S, yb)
p.append(line(par[3], hp, w=2.5))
p.append(right_mark(hp, par[3], par[1], size=11))
p.append(text(hp[0] + 8, (yt + yb) / 2 + 6, '4cm', size=20, anchor='start'))
p.append(text(xa + 2.5 * S, yb + 26, '5cm', size=20))
p.append(cap(xa + 3.5 * S, CY, 'Hình bình hành', size=22))
cx, cy = 830 + 3 * S, yb - 2 * S
pts = rhombus(cx, cy, 3 * S, 2 * S)
p.append(dashed_rect(cx - 3 * S, cy - 2 * S, cx + 3 * S, cy + 2 * S))
p += poly(pts, fill=FILL)
p += [line(pts[0], pts[2], w=2.5), line(pts[1], pts[3], w=2.5), right_mark((cx, cy), pts[2], pts[1], size=10)]
p += arrow_dim((cx + 3 * S + 18, cy - 2 * S), (cx + 3 * S + 18, cy + 2 * S), '4cm', side='right', size=20)
p += arrow_dim((cx - 3 * S, cy + 2 * S + 14), (cx + 3 * S, cy + 2 * S + 14), '6cm', size=20)
p.append(cap(cx, CY, 'Hình thoi', size=22))
out('bai136_q3_dientich', 1090, CY + 18, p)
