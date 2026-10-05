"""SGK Toán 4, bài 84–106 (trang 94–118): biểu đồ mật độ dân số, hình bình hành, hình tô màu phân số,
đoạn thẳng chia phần bằng nhau, nhóm ngôi sao."""
import math
from kit_g4t import *

SHADE = '#7CC3F0'   # phần tô màu (xanh như sách)


def label(x, y, s, size=19, weight=600, anchor='middle'):
    return text(round(x, 1), round(y, 1), s, size=size, weight=weight, anchor=anchor)


def rect(x, y, w, h, fill='#fff', dash=None, sw=2.5):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{fill}" stroke="{INK}" stroke-width="{sw}"{d}/>'


def tri(pts, fill):
    path = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return f'<polygon points="{path}" fill="{fill}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>'


def star(cx, cy, r, filled):
    pts = []
    for k in range(10):
        a = -math.pi / 2 + k * math.pi / 5
        rr = r if k % 2 == 0 else r * 0.42
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    path = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    f = SHADE if filled else '#fff'
    return f'<polygon points="{path}" fill="{f}" stroke="{INK if filled else "#5A9BD5"}" stroke-width="2" stroke-linejoin="round"/>'


def height_fig(top_l, top_r, bot_l, bot_r, foot_x, from_pt, base_s, h_s, h_side='right'):
    """Hình bình hành có đường cao từ đỉnh from_pt xuống đáy dưới, chân tại foot_x."""
    p = poly([bot_l, bot_r, top_r, top_l])
    y_base = bot_l[1]
    p.append(line(from_pt, (foot_x, y_base), w=2.5))
    s = 13
    sgn = 1 if h_side == 'right' else -1
    p.append(f'<polyline points="{foot_x + sgn * s:.1f},{y_base:.1f} {foot_x + sgn * s:.1f},{y_base - s:.1f} {foot_x:.1f},{y_base - s:.1f}" fill="none" stroke="{INK}" stroke-width="2"/>')
    my = (from_pt[1] + y_base) / 2
    p.append(label(foot_x + sgn * 10, my + 6, h_s, anchor='start' if sgn > 0 else 'end'))
    p.append(label((bot_l[0] + bot_r[0]) / 2, y_base + 30, base_s))
    return p


# ── Bài 92 câu 5: biểu đồ mật độ dân số ba thành phố lớn (năm 1999) ─────────────────────────────
p = bar_chart(90, 70, 540, 360, [2952, 1126, 2375], ['Hà Nội', 'Hải Phòng', 'TP. Hồ Chí Minh'], 3000, 300,
              unit_y='(Người)', unit_x='', title='MẬT ĐỘ DÂN SỐ CỦA BA THÀNH PHỐ LỚN')
p.append(label(630, 486, '(Thành phố)', size=16, anchor='end'))
out('bai92_q5_matdo', 680, 500, p)

# ── Bài 93 câu 1: năm hình, hình nào là hình bình hành ──────────────────────────────────────────
p = []
# Hình 1: hình bình hành (đáy trên và đáy dưới song song, bằng nhau)
p += poly([(20, 140), (180, 40), (380, 40), (220, 140)])
p.append(label(120, 175, 'Hình 1'))
# Hình 2: hình bình hành nghiêng
p += poly([(420, 30), (520, 30), (640, 190), (540, 190)])
p.append(label(560, 225, 'Hình 2'))
# Hình 3: hai đáy song song nhưng không bằng nhau (hình thang)
p += poly([(670, 140), (760, 40), (900, 40), (930, 140)])
p.append(label(800, 175, 'Hình 3'))
# Hình 4: hai đáy song song nhưng không bằng nhau, hai cạnh bên không song song
p += poly([(80, 340), (110, 240), (300, 240), (215, 340)])
p.append(label(170, 375, 'Hình 4'))
# Hình 5: hình bình hành nằm xiên
a5, v1, v2 = (560, 320), (170, -60), (100, 40)
p += poly([a5, (a5[0] + v1[0], a5[1] + v1[1]), (a5[0] + v1[0] + v2[0], a5[1] + v1[1] + v2[1]), (a5[0] + v2[0], a5[1] + v2[1])])
p.append(label(695, 385, 'Hình 5'))
out('bai93_q1_hinh', 950, 395, p)

# ── Bài 93 câu 2: tứ giác ABCD và hình bình hành MNPQ ───────────────────────────────────────────
p = []
p += poly([(90, 70), (240, 40), (290, 200), (40, 185)], labels='ABCD')
p += poly([(440, 50), (640, 50), (580, 190), (380, 190)], labels='MNPQ')
out('bai93_q2_tugiac', 690, 240, p)

# ── Bài 94 câu 1: ba hình bình hành có đáy và chiều cao ─────────────────────────────────────────
p = []
k = 26  # px / cm
# a) đáy 9cm, cao 5cm; đường cao từ đỉnh trên bên trái
bl, br = (20, 200), (20 + 9 * k, 200)
off = 2.8 * k
tl, tr = (bl[0] + off, 200 - 5 * k), (br[0] + off, 200 - 5 * k)
p += height_fig(tl, tr, bl, br, tl[0], tl, '9cm', '5cm')
# b) đáy 13cm, cao 4cm; hình nghiêng sang trái, đường cao từ đỉnh trên bên phải
k2 = 22
bl, br = (390, 200), (390 + 13 * k2, 200)
off = -2 * k2
tl, tr = (bl[0] + off, 200 - 4 * k2), (br[0] + off, 200 - 4 * k2)
p += height_fig(tl, tr, bl, br, tr[0], tr, '13cm', '4cm', h_side='left')
# c) đáy 7cm, cao 9cm; đường cao từ đỉnh trên bên trái
k3 = 20
bl, br = (720, 230), (720 + 7 * k3, 230)
off = 2.6 * k3
tl, tr = (bl[0] + off, 230 - 9 * k3), (br[0] + off, 230 - 9 * k3)
p += height_fig(tl, tr, bl, br, tl[0], tl, '7cm', '9cm')
out('bai94_q1_hbh', 940, 275, p)

# ── Bài 94 câu 2: a) hình chữ nhật 10cm × 5cm ; b) hình bình hành đáy 10cm, cao 5cm ─────────────
p = []
k = 22
p.append(label(20, 40, 'a) Hình chữ nhật', anchor='start'))
p += poly([(90, 70), (90 + 10 * k, 70), (90 + 10 * k, 70 + 5 * k), (90, 70 + 5 * k)])
p.append(label(80, 70 + 2.5 * k + 6, '5cm', anchor='end'))
p.append(label(90 + 5 * k, 70 + 5 * k + 30, '10cm'))
p.append(label(400, 40, 'b) Hình bình hành', anchor='start'))
bl, br = (420, 70 + 5 * k), (420 + 10 * k, 70 + 5 * k)
off = 2 * k
tl, tr = (bl[0] + off, 70), (br[0] + off, 70)
p += height_fig(tl, tr, bl, br, tl[0], tl, '10cm', '5cm')
out('bai94_q2_hinh', 740, 220, p)

# ── Bài 95 câu 1: hình chữ nhật ABCD, hình bình hành EGHK, tứ giác MNPQ ─────────────────────────
p = []
p += poly([(40, 80), (260, 80), (260, 230), (40, 230)], labels='ABCD')
p += poly([(320, 30), (440, 30), (540, 230), (420, 230)], labels=['E', 'G', 'H', 'K'])
p += poly([(640, 85), (750, 50), (880, 230), (610, 230)], labels='MNPQ')
out('bai95_q1_canh', 920, 270, p)

# ── Bài 95 câu 3: hình bình hành ABCD, AB = a, BC = b ───────────────────────────────────────────
p = poly([(130, 50), (390, 50), (320, 170), (60, 170)], labels='ABCD', sides=['a', 'b', None, None])
out('bai95_q3_hbh', 450, 215, p)

# ── Bài 96 câu 1: sáu hình tô màu ───────────────────────────────────────────────────────────────
p = []
# Hình 1: hình chữ nhật chia 5 phần, tô 2
for i in range(5):
    p.append(rect(20 + i * 46, 30, 46, 100, SHADE if i < 2 else '#fff'))
p.append(label(135, 165, 'Hình 1'))
# Hình 2: hình tròn chia 8 phần, tô 5 (từ 135° đến 360°, góc toán học)
cx, cy, r = 430, 80, 58
for s in range(8):
    a0, a1 = math.radians(s * 45), math.radians((s + 1) * 45)
    x0, y0 = cx + r * math.cos(a0), cy - r * math.sin(a0)
    x1, y1 = cx + r * math.cos(a1), cy - r * math.sin(a1)
    f = SHADE if s >= 3 else '#fff'
    p.append(f'<path d="M{cx},{cy} L{x0:.1f},{y0:.1f} A{r},{r} 0 0 0 {x1:.1f},{y1:.1f} Z" fill="{f}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
p.append(label(cx, 165, 'Hình 2'))
# Hình 3: tam giác đều chia 4 tam giác nhỏ (nối trung điểm), tô 3 (trừ tam giác giữa)
T, L, R = (720, 20), (660, 124), (780, 124)
mid = lambda a, b: ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
mTL, mTR, mLR = mid(T, L), mid(T, R), mid(L, R)
p.append(tri([T, mTL, mTR], SHADE))
p.append(tri([mTL, L, mLR], SHADE))
p.append(tri([mTR, mLR, R], SHADE))
p.append(tri([mTL, mTR, mLR], '#fff'))
p.append(label(720, 165, 'Hình 3'))
# Hình 4: 10 hình tròn, tô 7 (hàng trên: thứ nhất và thứ năm; hàng dưới: cả năm)
top = [1, 0, 0, 0, 1]
for i in range(5):
    for j, row in enumerate([top, [1] * 5]):
        p.append(f'<circle cx="{40 + i * 46}" cy="{230 + j * 50}" r="19" fill="{SHADE if row[i] else "#fff"}" stroke="{INK}" stroke-width="2.5"/>')
p.append(label(135, 340, 'Hình 4'))
# Hình 5: lục giác đều chia 6 tam giác, tô 3 (trên trái, trên phải, dưới)
cx, cy, r = 430, 255, 62
V = [(cx + r * math.cos(math.radians(a)), cy - r * math.sin(math.radians(a))) for a in (0, 60, 120, 180, 240, 300)]
# tam giác k nằm giữa V[k] và V[k+1]: 0 = trên phải, 1 = trên, 2 = trên trái, 3 = dưới trái, 4 = dưới, 5 = dưới phải
for kk in range(6):
    p.append(tri([(cx, cy), V[kk], V[(kk + 1) % 6]], SHADE if kk in (0, 2, 4) else '#fff'))
p.append(label(cx, 340, 'Hình 5'))
# Hình 6: 7 ngôi sao, tô 3
for i, f in enumerate([0, 1, 0, 0]):
    p.append(star(645 + i * 50, 225, 24, f))
for i, f in enumerate([1, 1, 0]):
    p.append(star(670 + i * 50, 280, 24, f))
p.append(label(720, 340, 'Hình 6'))
out('bai96_q1_tomau', 820, 360, p)

# ── Bài 98 câu 2: Hình 1 (7/6) và Hình 2 (7/12) ─────────────────────────────────────────────────
p = []
c = 46
p.append(label(20, 50, 'a)', anchor='start'))
for i in range(3):
    for j in range(2):
        p.append(rect(70 + i * c, 25 + j * c, c, c, SHADE))
for i in range(3):
    for j in range(2):
        sh = i == 0 and j == 0
        p.append(rect(260 + i * c, 25 + j * c, c, c, SHADE if sh else '#fff', dash=None if sh else '6 5', sw=2.5 if sh else 1.8))
# ngoặc dưới Hình 1
yb = 25 + 2 * c + 10
p.append(f'<path d="M70,{yb} Q70,{yb + 12} 90,{yb + 12} L{(70 + 398) / 2 - 12:.0f},{yb + 12} Q{(70 + 398) / 2:.0f},{yb + 12} {(70 + 398) / 2:.0f},{yb + 22} Q{(70 + 398) / 2:.0f},{yb + 12} {(70 + 398) / 2 + 12:.0f},{yb + 12} L378,{yb + 12} Q398,{yb + 12} 398,{yb}" fill="none" stroke="{INK}" stroke-width="2"/>')
p.append(label(234, yb + 48, 'Hình 1'))
p.append(label(20, 215, 'b)', anchor='start'))
for i in range(6):
    for j in range(2):
        sh = (j == 0 and i < 4) or (j == 1 and i < 3)
        p.append(rect(70 + i * c, 190 + j * c, c, c, SHADE if sh else '#fff'))
p.append(label(70 + 3 * c, 190 + 2 * c + 30, 'Hình 2'))
out('bai98_q2_hinh', 430, 320, p)

# ── Bài 99 câu 5: đoạn thẳng chia thành các phần bằng nhau ──────────────────────────────────────
p = []


def seg(x0, x1, y, n, names):
    """Đoạn thẳng từ x0 đến x1 chia n phần bằng nhau; names = {chỉ số vạch: tên điểm}."""
    q = [line((x0, y), (x1, y), w=3)]
    for i in range(n + 1):
        x = x0 + (x1 - x0) * i / n
        q.append(line((x, y - 7), (x, y + 7), w=2.5))
        if i in names:
            q.append(label(x, y - 16, names[i], size=21, weight=700))
    return q


p.append(label(20, 52, 'Mẫu:', anchor='start'))
p += seg(100, 340, 50, 3, {0: 'A', 1: 'I', 3: 'B'})
p.append(label(20, 142, 'a)', anchor='start'))
p += seg(70, 390, 140, 4, {0: 'C', 3: 'P', 4: 'D'})
p.append(label(440, 142, 'b)', anchor='start'))
p += seg(490, 840, 140, 5, {0: 'M', 2: 'O', 5: 'N'})
out('bai99_q5_doan', 870, 170, p)

# ── Bài 106 câu 4: nhóm nào có 2/3 số ngôi sao đã tô màu ────────────────────────────────────────
p = []
R = 26
p.append(label(20, 60, 'a)', anchor='start', size=21))
for i, f in enumerate([0, 1, 0]):
    p.append(star(80 + i * 70, 50, R, f))
p.append(label(380, 60, 'b)', anchor='start', size=21))
for i, f in enumerate([1, 1, 0]):
    p.append(star(440 + i * 70, 50, R, f))
p.append(label(20, 150, 'c)', anchor='start', size=21))
for i, f in enumerate([1, 1]):
    p.append(star(115 + i * 70, 140, R, f))
for i, f in enumerate([0, 0, 0]):
    p.append(star(80 + i * 70, 210, R, f))
p.append(label(380, 150, 'd)', anchor='start', size=21))
for i, f in enumerate([1, 0, 1]):
    p.append(star(440 + i * 70, 140, R, f))
for i, f in enumerate([0, 1]):
    p.append(star(475 + i * 70, 210, R, f))
out('bai106_q4_sao', 640, 250, p)
