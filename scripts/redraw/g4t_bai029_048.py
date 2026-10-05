"""SGK Toán 4, bài 29–48 (trang 38–56): sơ đồ quãng đường, tam giác, hình chữ nhật, góc, vuông góc, song song."""
import math
from kit_g4t import *

HALO = ' stroke="#fff" stroke-width="5" paint-order="stroke"'


def lab(p, s, dx=0, dy=0, size=22):
    """Tên điểm đặt tay (dx, dy so với điểm), có viền trắng để đọc rõ trên lưới."""
    return text(round(p[0] + dx, 1), round(p[1] + dy + size * 0.36, 1), s, size=size, weight=700, extra=HALO)


def ray_pt(v, deg, r):
    a = math.radians(deg)
    return (v[0] + r * math.cos(a), v[1] - r * math.sin(a))


def dot_ang(v, a, b):
    ux, uy = a[0] - v[0], a[1] - v[1]
    wx, wy = b[0] - v[0], b[1] - v[1]
    return math.degrees(math.acos((ux * wx + uy * wy) / (math.hypot(ux, uy) * math.hypot(wx, wy))))


def check(name, got, want):
    assert abs(got - want) < 0.5, f'{name}: {got:.2f} khác {want}'


# ── Bài 30 câu 3: Hà Nội → Nha Trang → TP. Hồ Chí Minh ───────────────────────────────────────────────
x0, x2 = 40, 700
x1 = x0 + (x2 - x0) * 1315 / 1730
y = 90
p = [line((x0, y), (x2, y))]
for x in (x0, x1, x2):
    p.append(line((x, y - 9), (x, y + 9), w=2.5))
p.append(f'<path d="M{x0},{y - 14} Q{(x0 + x1) / 2:.1f},{y - 46} {x1:.1f},{y - 14}" fill="none" stroke="{ACC}" stroke-width="2" stroke-dasharray="6 5"/>')
p.append(f'<path d="M{x1:.1f},{y - 14} Q{(x1 + x2) / 2:.1f},{y - 40} {x2},{y - 14}" fill="none" stroke="{ORANGE}" stroke-width="2" stroke-dasharray="6 5"/>')
p.append(f'<path d="M{x0},{y + 44} Q{(x0 + x2) / 2:.1f},{y + 92} {x2},{y + 44}" fill="none" stroke="{ACC}" stroke-width="2" stroke-dasharray="6 5"/>')
p += [line((x0, y + 9), (x0, y + 44), w=1.5, color=ACC, dash='3 4'), line((x2, y + 9), (x2, y + 44), w=1.5, color=ACC, dash='3 4')]
p.append(text((x0 + x1) / 2, y - 44, '1315km', size=19, weight=700, fill=ACC))
p.append(text((x1 + x2) / 2, y - 38, '? km', size=19, weight=700, fill=ORANGE))
p.append(text((x0 + x2) / 2, y + 96, '1730km', size=19, weight=700, fill=ACC))
p.append(text(x0 + 8, y + 34, 'Hà Nội', size=17, anchor='start'))
p.append(text(x1 + 8, y + 34, 'Nha Trang', size=17, anchor='end'))
p.append(text(x2 - 8, y + 34, 'TP. Hồ Chí Minh', size=17, anchor='end'))
out('bai30_q3_quangduong', 740, 200, p)

# ── Bài 34 câu 4: tam giác cạnh a, b, c ──────────────────────────────────────────────────────────────
out('bai34_q4_tamgiac', 400, 230, poly([(40, 200), (160, 30), (360, 200)], sides=['a', 'b', 'c']))

# ── Bài 36 câu 5: hình chữ nhật chiều dài a, chiều rộng b ────────────────────────────────────────────
out('bai36_q5_hcn', 360, 200, poly([(30, 30), (300, 30), (300, 160), (30, 160)], sides=[None, 'b', 'a', None]))

# ── Bài 40 câu 1: sáu góc ────────────────────────────────────────────────────────────────────────────
p = []
A = (40, 130); N = (230, 130); M = ray_pt(A, 25, 190)
p += [line(A, N), line(A, M), lab(A, 'A', -4, 22), lab(N, 'N', 0, 22), lab(M, 'M', 4, -18)]
B = (430, 130); P = (300, 130); Q = ray_pt(B, 55, 112)
p += [line(B, P), line(B, Q), lab(B, 'B', 4, 22), lab(P, 'P', -4, 22), lab(Q, 'Q', 14, -10)]
C = (620, 130); I = (620, 25); K = (750, 130)
p += [line(C, I), line(C, K), lab(C, 'C', 0, 22), lab(I, 'I', -14, 0), lab(K, 'K', 4, 22)]
X = (40, 270); E = (140, 270); Y = (240, 270)
p += [line(X, Y), dot(E), lab(X, 'X', 0, 24), lab(E, 'E', 0, 24), lab(Y, 'Y', 0, 24)]
D = (450, 245); V = ray_pt(D, 155, 125); U = ray_pt(D, 195, 125)
p += [line(D, V), line(D, U), lab(D, 'D', 18, 4), lab(V, 'V', -4, -18), lab(U, 'U', -4, 22)]
O = (620, 275); H = (750, 275); G = ray_pt(O, 135, 120)
p += [line(O, H), line(O, G), lab(O, 'O', 0, 24), lab(H, 'H', 4, 24), lab(G, 'G', -14, -10)]
check('MAN', dot_ang(A, M, N), 25); check('PBQ', dot_ang(B, P, Q), 125); check('ICK', dot_ang(C, I, K), 90)
check('VDU', dot_ang(D, V, U), 40); check('GOH', dot_ang(O, G, H), 135)
out('bai40_q1_goc', 790, 320, p)

# ── Bài 40 câu 2: ba tam giác (nhọn, tù, vuông) ──────────────────────────────────────────────────────
tA, tB, tC = (110, 50), (30, 200), (200, 200)
tM, tN, tP = (250, 50), (330, 200), (470, 200)
tD, tE, tG = (565, 50), (565, 200), (780, 200)
for v, a, b in ((tA, tB, tC), (tB, tA, tC), (tC, tA, tB), (tM, tN, tP), (tP, tM, tN)):
    assert dot_ang(v, a, b) < 89
assert dot_ang(tN, tM, tP) > 91
check('DEG', dot_ang(tE, tD, tG), 90)
p = []
p += poly([tA, tB, tC], labels='ABC')
p += poly([tM, tN, tP], labels='MNP')
p += poly([tD, tE, tG], labels='DEG')
out('bai40_q2_tamgiac', 815, 240, p)

# ── Bài 41 câu 1: a) HI, IK vuông góc; b) PM, MQ không vuông góc ─────────────────────────────────────
p = [text(20, 30, 'a)', size=20, weight=700, anchor='start'), text(330, 30, 'b)', size=20, weight=700, anchor='start')]
Ii = (140, 120)
p += [line((140, 20), (140, 210)), line((40, 120), (270, 120)), lab((140, 20), 'H', -16, 8), lab(Ii, 'I', -14, 22), lab((270, 120), 'K', -6, 22)]
Mm = (500, 120)
P1 = ray_pt(Mm, 50, 120); P2 = ray_pt(Mm, 230, 120)
p += [line((360, 120), (620, 120)), line(P1, P2), lab(P1, 'P', 12, -6), lab(Mm, 'M', 14, 22), lab((620, 120), 'Q', -8, 22)]
out('bai41_q1_vuonggoc', 650, 230, p)

# ── Bài 41 câu 2: hình chữ nhật ABCD ─────────────────────────────────────────────────────────────────
out('bai41_q2_hcn', 300, 200, poly([(40, 40), (260, 40), (260, 160), (40, 160)], labels='ABCD'))

# ── Bài 41 câu 3: a) ngũ giác ABCDE; b) đường gấp khúc MNPQR ─────────────────────────────────────────
a5 = [(40, 90), (130, 30), (220, 90), (220, 170), (40, 170)]
for i in range(5):
    ang = dot_ang(a5[i], a5[i - 1], a5[(i + 1) % 5])
    assert (abs(ang - 90) < 0.5) == (i in (3, 4)), (i, ang)
p = [text(10, 30, 'a)', size=20, weight=700, anchor='start'), text(290, 30, 'b)', size=20, weight=700, anchor='start')]
p += poly(a5, labels='ABCDE')
mM, mN, mP, mQ, mR = (310, 170), (420, 170), (420, 60), (540, 60), (610, 170)
assert dot_ang(mQ, mP, mR) > 91
p.append(f'<polyline points="{mM[0]},{mM[1]} {mN[0]},{mN[1]} {mP[0]},{mP[1]} {mQ[0]},{mQ[1]} {mR[0]},{mR[1]}" fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
p += [lab(mM, 'M', 6, -18), lab(mN, 'N', 14, 22), lab(mP, 'P', -6, -20), lab(mQ, 'Q', 6, -20), lab(mR, 'R', 14, 16)]
out('bai41_q3_vuonggoc', 650, 210, p)

# ── Bài 41 câu 4: tứ giác ABCD vuông ở A và D ────────────────────────────────────────────────────────
qA, qB, qC, qD = (40, 40), (150, 40), (260, 220), (40, 220)
assert dot_ang(qB, qA, qC) > 91 and dot_ang(qC, qB, qD) < 89
p = poly([qA, qB, qC, qD], labels='ABCD')
p += [right_mark(qA, qB, qD), right_mark(qD, qA, qC)]
out('bai41_q4_tugiac', 300, 260, p)

# ── Bài 42 câu 1: hình chữ nhật ABCD, hình vuông MNPQ ────────────────────────────────────────────────
p = poly([(40, 40), (300, 40), (300, 190), (40, 190)], labels='ABCD')
p += poly([(400, 40), (550, 40), (550, 190), (400, 190)], labels='MNPQ')
out('bai42_q1_songsong', 600, 230, p)

# ── Bài 42 câu 2: ABEG, BCDE, ACDG là hình chữ nhật ──────────────────────────────────────────────────
gA, gB, gC, gD, gE, gG = (40, 40), (210, 40), (300, 40), (300, 190), (210, 190), (40, 190)
p = poly([gA, gC, gD, gG], fill=FILL)
p += [line(gB, gE), lab(gA, 'A', -8, -20), lab(gB, 'B', 0, -20), lab(gC, 'C', 8, -20),
      lab(gG, 'G', -8, 22), lab(gE, 'E', 0, 22), lab(gD, 'D', 8, 22)]
out('bai42_q2_songsong', 340, 230, p)

# ── Bài 42 câu 3: hình MNPQ, DEGHI trên giấy kẻ ô vuông (18 × 7 ô) ───────────────────────────────────
cell, gx, gy = 40, 20, 20
def gp(c, r):
    return (gx + c * cell, gy + r * cell)
p = [f'<rect x="{gx}" y="{gy}" width="{18 * cell}" height="{7 * cell}" fill="#fff"/>']
p += grid(gx, gy, 18, 7, cell)
fM, fN, fP, fQ = gp(2, 3), gp(5, 3), gp(8, 6), gp(2, 6)
fD, fE, fG, fH, fI = gp(12, 3), gp(14, 1), gp(16, 3), gp(16, 6), gp(12, 6)
check('DEG', dot_ang(fE, fD, fG), 90)
p += poly([fM, fN, fP, fQ], fill='none')
p += poly([fD, fE, fG, fH, fI], fill='none')
p += [lab(fM, 'M', -16, -18), lab(fN, 'N', 14, -18), lab(fP, 'P', 16, 4), lab(fQ, 'Q', -16, 4),
      lab(fD, 'D', -18, -12), lab(fE, 'E', 0, -20), lab(fG, 'G', 18, -12), lab(fH, 'H', 18, 4), lab(fI, 'I', -16, 4)]
out('bai42_q3_luoi', 18 * cell + 40, 7 * cell + 40, p)

# ── Bài 43 câu 3: hình chữ nhật ABCD, đường EG vuông góc với DC ──────────────────────────────────────
hA, hB, hC, hD = (40, 40), (320, 40), (320, 200), (40, 200)
hE, hG = (230, 40), (230, 200)
p = poly([hA, hB, hC, hD], labels='ABCD')
p += [line(hE, hG, color=ACC, dash='8 6'), dot(hE), dot(hG), right_mark(hG, hE, hC, color=ACC),
      lab(hE, 'E', 0, -20), lab(hG, 'G', 0, 22)]
out('bai43_q3_hcn', 360, 240, p)

# ── Bài 44 câu 2: tam giác ABC vuông ở A, AX // BC, CY // AB cắt nhau ở D ────────────────────────────
kB, kC = (40, 210), (330, 210)
cx, r = (kB[0] + kC[0]) / 2, (kC[0] - kB[0]) / 2
kA = (cx + r * math.cos(math.radians(60)), kB[1] - r * math.sin(math.radians(60)))
kD = (kA[0] + kC[0] - kB[0], kA[1] + kC[1] - kB[1])
check('BAC', dot_ang(kA, kB, kC), 90)
ux, uy = (kD[0] - kC[0]) / math.hypot(kD[0] - kC[0], kD[1] - kC[1]), (kD[1] - kC[1]) / math.hypot(kD[0] - kC[0], kD[1] - kC[1])
kY = (kD[0] + ux * 80, kD[1] + uy * 80)
kX = (kD[0] + 100, kA[1])
p = poly([kA, kB, kC], fill=FILL)
p += [line(kA, kX, color=ACC, dash='8 6'), line(kC, kY, color=ACC, dash='8 6'), dot(kD, color=ACC), right_mark(kA, kB, kC),
      lab(kA, 'A', -6, -20), lab(kB, 'B', -10, 20), lab(kC, 'C', 4, 22), lab(kD, 'D', -4, -22),
      lab(kX, 'X', 18, 0, size=20), lab(kY, 'Y', 14, -10, size=20)]
out('bai44_q2_songsong', int(kX[0]) + 50, 250, p)

# ── Bài 44 câu 3: tứ giác ABCD vuông ở A và D, BE // AD ──────────────────────────────────────────────
sA, sD, sB, sC = (60, 220), (280, 220), (60, 130), (280, 40)
sE = (280, 130)
p = poly([sA, sB, sC, sD], labels='ABCD')
p += [right_mark(sA, sB, sD), right_mark(sD, sA, sC), line(sB, sE, color=ACC, dash='8 6'), dot(sE, color=ACC),
      lab(sE, 'E', 20, 0)]
out('bai44_q3_tugiac', 330, 260, p)

# ── Bài 45 câu 2: hình chữ nhật ABCD 4cm × 3cm, hai đường chéo ───────────────────────────────────────
rA, rB, rC, rD = (40, 40), (280, 40), (280, 220), (40, 220)
p = poly([rA, rB, rC, rD], labels='ABCD')
p += [line(rA, rC, color=ACC), line(rB, rD, color=ACC)]
out('bai45_q2_duongcheo', 320, 260, p)

# ── Bài 47 câu 1: a) tam giác ABC vuông ở A, M trên AC; b) tứ giác ABCD ──────────────────────────────
lB, lC = (30, 230), (330, 230)
lcx, lr = 180, 150
lA = (lcx + lr * math.cos(math.radians(115)), lB[1] - lr * math.sin(math.radians(115)))
lM = (lA[0] + 0.42 * (lC[0] - lA[0]), lA[1] + 0.42 * (lC[1] - lA[1]))
check('BAC', dot_ang(lA, lB, lC), 90)
assert dot_ang(lM, lA, lB) < 89 and dot_ang(lM, lB, lC) > 91
bA, bB, bD, bC = (420, 60), (580, 60), (420, 220), (740, 220)
check('DBC', dot_ang(bB, bD, bC), 90); check('ABC', dot_ang(bB, bA, bC), 135 - 0.0)
check('BCD', dot_ang(bC, bB, bD), 45 + 0.0)
p = [text(10, 30, 'a)', size=20, weight=700, anchor='start'), text(368, 30, 'b)', size=20, weight=700, anchor='start')]
p += poly([lA, lB, lC], fill=FILL)
p += [line(lB, lM), right_mark(lA, lB, lC), dot(lM, r=3.5),
      lab(lA, 'A', -4, -20), lab(lB, 'B', -10, 20), lab(lC, 'C', 10, 20), lab(lM, 'M', 10, -20)]
p += poly([bA, bB, bC, bD], fill=FILL)
p += [line(bD, bB), right_mark(bA, bB, bD), right_mark(bB, bD, bC),
      lab(bA, 'A', 2, -22), lab(bB, 'B', 6, -20), lab(bC, 'C', 12, 20), lab(bD, 'D', -12, 20)]
out('bai47_q1_goc', 790, 270, p)

# ── Bài 47 câu 2: tam giác ABC vuông ở B, AH ─────────────────────────────────────────────────────────
tA2, tB2, tC2, tH2 = (60, 30), (60, 200), (380, 200), (240, 200)
p = poly([tA2, tB2, tC2], fill=FILL)
p += [line(tA2, tH2), right_mark(tB2, tA2, tC2), dot(tH2, r=3.5),
      lab(tA2, 'A', -16, -6), lab(tB2, 'B', -16, 14), lab(tC2, 'C', 16, 14), lab(tH2, 'H', 0, 24)]
out('bai47_q2_duongcao', 420, 240, p)

# ── Bài 47 câu 4: hình chữ nhật ABCD 6cm × 4cm, MN nối trung điểm AD và BC ───────────────────────────
nA, nB, nC, nD = (80, 40), (380, 40), (380, 240), (80, 240)
nM, nN = (80, 140), (380, 140)
p = poly([nA, nB, nC, nD], labels='ABCD')
p += [line(nM, nN, color=ACC), dot(nM, color=ACC), dot(nN, color=ACC), lab(nM, 'M', -20, 14), lab(nN, 'N', 20, 14)]
out('bai47_q4_hcn', 450, 280, p)

# ── Bài 48 câu 3: hình vuông ABCD, BIHC cạnh 3cm, hình chữ nhật AIHD ─────────────────────────────────
wA, wB, wI, wD, wC, wH = (40, 40), (200, 40), (360, 40), (40, 200), (200, 200), (360, 200)
p = poly([wA, wI, wH, wD], fill=FILL)
p += [line(wB, wC), lab(wA, 'A', -10, -20), lab(wB, 'B', 0, -20), lab(wI, 'I', 10, -20),
      lab(wD, 'D', -10, 22), lab(wC, 'C', 0, 22), lab(wH, 'H', 10, 22)]
out('bai48_q3_hinhvuong', 400, 240, p)
