"""Vở BT Toán 1 Tập Hai — Bài 26 (Đơn vị đo độ dài), trang 32–36.
Tiết 1 q1: hàng 12 ghim giấy; bút chì 5 ghim (mẫu), thước kẻ 10, bút mực 6, kéo 7 (vạch đứt ở mép mỗi ghim).
Tiết 1 q2: thước đo bằng lá (10 lá); nhím 2 (mẫu), cáo 5, ngựa một sừng 7, thỏ 5, hươu cao cổ 10.
Tiết 1 q3: ước lượng bằng ghim (1 ghim = 41): lược 7 (mẫu), kem đánh răng 5, bàn chải 6, thìa 5, nĩa 4, muôi 8;
           dưới mỗi đồ vật chỉ vẽ sẵn vài ghim như sách.
Tiết 2 q1: 1 cm = 47.5: bàn chải 8 cm, kem đánh răng 6 cm, đinh 5 cm, búa 10 cm (vạch đứt ở hai đầu).
Tiết 2 q2: thước 0–11 cm: ô tô 7 cm, tàu hoả 9 cm, kéo 7 cm.
Tiết 2 q3: thước "cm 1 … 11": a) ô tô 2→7 (mẫu), b) xe buýt 2→8, c) tàu 1→10, d) xe bán tải 2→9."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_b import *

# ── Tiết 1 q1 ───────────────────────────────────────────────────────────────
CW, X0 = 48, 12
p = []
for i in range(13):
    p.append(dash(X0 + i * CW, 18, X0 + i * CW, 330, INK, 1.4))
p.append(f'<rect x="{X0 - 4}" y="8" width="{12 * CW + 8}" height="26" fill="#fff"/>')
p.append(clip_row(X0, 21, 12, CW))
p.append(pencil(X0 + 1 * CW, X0 + 6 * CW, 74, w=24))
p.append(ruler(X0 + 2 * CW, 106, 20, CW / 2, h=32, fs=11))
p.append(pen(X0 + 4 * CW, X0 + 10 * CW, 186, w=22))
p.append(scissors(X0 + 4 * CW, X0 + 11 * CW, 262, 1.5))
out('bai26_t1_q1_clips', X0 * 2 + 12 * CW, 336, p)

ICW, ICH = 200, 56
out('bai26_ic_pencil', ICW, ICH, [pencil(8, 150, 28, w=20)])
out('bai26_ic_pen', ICW, ICH, [pen(8, 178, 28, w=18)])
out('bai26_ic_ruler', ICW, ICH, [ruler(14, 12, 20, 9, h=28, fs=0.1, label='')])
out('bai26_ic_scissors', ICW, ICH, [scissors(8, 192, 28, 1.0)])
out('bai26_ic_clip', 64, 30, [clip(4, 15, 56)])

# ── Tiết 1 q2: thước lá ─────────────────────────────────────────────────────
U = 36
GY = 20 + 10 * U
p = []
for i in range(11):
    p.append(dash(40, 20 + i * U, 760, 20 + i * U, INK if i == 10 else '#6B7280', 2 if i == 10 else 1.2))
for i in range(10):
    p.append(leaf(22, 22 + i * U, U - 4))
p.append(hedgehog(110, GY, 2 * U))
p.append(fox(230, GY, 5 * U))
p.append(unicorn(370, GY, 7 * U))
p.append(bunny(540, GY, 5 * U))
p.append(giraffe(640, GY, 10 * U))
out('bai26_t1_q2_animals', 770, GY + 12, p)
for name, f, w in (('hedgehog', lambda: hedgehog(60, 96, 70), 120), ('fox', lambda: fox(50, 96, 90), 120),
                   ('unicorn', lambda: unicorn(52, 96, 92), 120), ('rabbit', lambda: bunny(60, 96, 90), 120),
                   ('giraffe', lambda: giraffe(42, 96, 94), 120)):
    out(f'bai26_ic_{name}', w, 100, [f()])
out('bai26_ic_leaf', 24, 40, [leaf(12, 4, 32)])

# ── Tiết 1 q3: ước lượng bằng ghim ──────────────────────────────────────────
CL = 41
for name, L, shown, draw in (('comb', 287, 7, comb), ('toothpaste', 205, 2, toothpaste), ('toothbrush', 248, 3, toothbrush),
                             ('spoon', 206, 2, lambda a, b, y: spoon(a, b, y, fill=WHITE, handle=BLUE)),
                             ('fork', 170, 2, lambda a, b, y: fork(a, b, y, fill=WHITE, handle=BLUE)), ('ladle', 332, 5, ladle)):
    x0 = 20
    p = [draw(x0, x0 + L, 50), dash(x0, 40, x0, 110), dash(x0 + L, 40, x0 + L, 110)]
    p.append(clip_row(x0, 100, shown, CL))
    out(f'bai26_t1_q3_{name}', x0 * 2 + 332, 116, p)

# ── Tiết 2 q1: đo rồi nối ───────────────────────────────────────────────────
PER = 47.5
X0 = 20
rows = [('brush', 8, 60), ('paste', 6, 160), ('nail', 5, 250), ('hammer', 10, 330)]
p = [dash(X0, 20, X0, 390)]
p.append(toothbrush(X0, X0 + 8 * PER, 64))
p.append(toothpaste(X0 + 4, X0 + 6 * PER, 158))
p.append(nail(X0, X0 + 5 * PER, 250))
p.append(hammer(X0, X0 + 10 * PER, 330, handle='#6FB7EA', head=GREY))
for _, cm, y in rows:
    p.append(dash(X0 + cm * PER, y - 36, X0 + cm * PER, y + 46))
out('bai26_t2_q1_measure', X0 * 2 + 10 * PER + 10, 400, p)

# ── Tiết 2 q2: đồ vật dài 7 cm ──────────────────────────────────────────────
PER = 48
X0 = 40
p = []
p.append(sedan(X0, X0 + 7 * PER, 140, col=WHITE, win=WHITE))
p.append(train(X0, X0 + 9 * PER, 262, cars=3, fill=WHITE, win=WHITE))
p.append(scissors(X0, X0 + 7 * PER, 330, 1.7, col=GREY_L))
for cm, y0, y1 in ((7, 100, 150), (9, 200, 270), (7, 300, 370)):
    p.append(dash(X0, y0, X0, 392, '#1E88D0', 2))
    p.append(dash(X0 + cm * PER, y0, X0 + cm * PER, y1, '#1E88D0', 2))
p.append(ruler(X0, 392, 11, PER, h=50))
out('bai26_t2_q2_seven', X0 + 11 * PER + 40, 450, p)

# ── Tiết 2 q3: xe trên thước ────────────────────────────────────────────────
PER = 48
X0 = 50
for name, a, b, draw in (('a', 2, 7, lambda x1, x2, y: beetle(x1, x2, y)), ('b', 2, 8, lambda x1, x2, y: bus(x1, x2, y)),
                         ('c', 1, 10, lambda x1, x2, y: train(x1, x2, y, cars=3, col='#6FB7EA')),
                         ('d', 2, 9, lambda x1, x2, y: pickup(x1, x2, y))):
    GY = 150
    p = [draw(X0 + a * PER, X0 + b * PER, GY)]
    p.append(dash(X0 + a * PER, 30, X0 + a * PER, GY + 6))
    p.append(dash(X0 + b * PER, 30, X0 + b * PER, GY + 6))
    p.append(ruler(X0, GY + 2, 11, PER, h=50, zero=False))
    out(f'bai26_t2_q3_{name}', X0 + 11 * PER + 40, GY + 58, p)
