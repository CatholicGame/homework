"""Vở BT Toán 1 Tập Hai — Bài 25 (Dài hơn, ngắn hơn), trang 28–31.
Độ dài / chiều cao giữ đúng tỉ lệ như sách (đo trên trang, 100 dpi).
Tiết 1 q1: a) đinh 105 / búa 175, b) xe hộp 157 / ô tô 210 (thu nhỏ đúng tỉ lệ sách 185 / 247), c) thìa 165 / chìa khoá 120, d) gậy 355 / xẻng 225.
Tiết 1 q2: bút chì A 285; B dài bằng A, C dài hơn, D ngắn hơn (thay cho "vẽ bút chì").
Tiết 1 q3: A 285, B 380, C 190.
Tiết 1 q4: mẫu sâu 2 / sâu dài 3 / kiến 1; a) ô tô 158, xe jeep 127, xe bán tải 210;
           b) bút chì 282, kéo 210, bút chì ngắn 192; c) cá 106, cá hề 223, cá 166.
Tiết 2 q1: a) chuột túi > gấu túi, nhím < sóc; b) sư tử < hươu cao cổ, khỉ > thỏ.
Tiết 2 q2: a) chuối 135, tre 205, dừa 165; b) khối gạch 2 tầng, A 3 tầng, 4 tầng.
Tiết 2 q3: Nam = Rô-bốt (cao nhất), Việt thấp hơn Nam, Mai thấp nhất.
Tiết 2 q4: a) 190, 212, 166; b) 206, 178, 222."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_b import *
import kit_p2 as KP2

EDGE = '#7CC6E8'

# ── Tiết 1 q1 ───────────────────────────────────────────────────────────────
p = [panel(6, 6, 252, 240, WHITE, edge=EDGE), panel(264, 6, 410, 240, WHITE, edge=EDGE),
     panel(6, 252, 252, 190, WHITE, edge=EDGE), panel(264, 252, 410, 190, WHITE, edge=EDGE)]
p += [text(26, 38, 'a)', 20, 700), text(286, 38, 'b)', 20, 700), text(26, 284, 'c)', 20, 700), text(286, 284, 'd)', 20, 700)]
p.append(nail(48, 48 + 105, 70))
p.append(hammer(48, 48 + 175, 170))
p.append(van(300, 300 + 157, 112))
p.append(sedan(300, 300 + 210, 234, col=WHITE, win=WHITE))
p.append(spoon(48, 48 + 165, 318))
p.append(key(48, 48 + 120, 398))
p.append(bat(300, 300 + 355, 318))
p.append(spatula(300, 300 + 225, 400))
out('bai25_t1_q1_pairs', 680, 448, p)

# ── Tiết 1 q2 ───────────────────────────────────────────────────────────────
p = []
X0 = 70
for i, (lab, L) in enumerate((('A', 285), ('B', 285), ('C', 390), ('D', 170))):
    y = 40 + i * 72 + (18 if i else 0)
    p.append(text(36, y + 9, lab, 26, 800, fill='#1E88D0' if i == 0 else INK))
    p.append(pencil(X0, X0 + L, y, w=30))
p.append(f'<line x1="10" y1="96" x2="490" y2="96" stroke="{GREY}" stroke-width="2" stroke-dasharray="6 5"/>')
out('bai25_t1_q2_pencils', 490, 316, p)

# ── Tiết 1 q3 ───────────────────────────────────────────────────────────────
p = []
for i, (lab, L) in enumerate((('A', 285), ('B', 380), ('C', 190))):
    y = 40 + i * 74
    p.append(text(24, y + 9, lab, 24, 700))
    p.append(pencil(50, 50 + L, y, w=32))
out('bai25_t1_q3_pencils', 450, 220, p)

# ── Tiết 1 q4: mỗi khung 3 đồ vật, cùng mép trái ────────────────────────────
ROW = 108


def frame(name, draws, mau=None):
    W = 300 if mau is None else 360
    x0 = 14 if mau is None else 84
    p = []
    for i, d in enumerate(draws):
        y = 20 + i * ROW + ROW * .62
        p.append(d(x0, y))
        if mau:
            p.append(f'<rect x="14" y="{y - 46}" width="46" height="46" rx="4" fill="#fff" {st(2.4, "#1E88D0")}/>')
            p.append(text(37, y - 12, mau[i], 26, 700, fill='#1E88D0'))
    out(name, W, 20 + 3 * ROW + 6, p)


k = 1.0
frame('bai25_t1_q4_mau', [lambda x, y: caterpillar(x, x + 120, y, 5, col='#9ED3F5'),
                          lambda x, y: caterpillar(x, x + 215, y, 10, col='#9ED3F5'),
                          lambda x, y: ant(x, x + 78, y, col='#9ED3F5')], mau=['2', '3', '1'])
frame('bai25_t1_q4_a', [lambda x, y: sedan(x, x + 158, y + 10),
                        lambda x, y: jeep(x, x + 127, y + 10),
                        lambda x, y: pickup(x, x + 210, y + 10)])
frame('bai25_t1_q4_b', [lambda x, y: pencil(x, x + 282, y - 14, w=24),
                        lambda x, y: scissors(x, x + 210, y - 14, 1.1),
                        lambda x, y: pencil(x, x + 192, y - 14, w=24, body=GREY_L)])
frame('bai25_t1_q4_c', [lambda x, y: fish(x, x + 106, y - 8, col='#6FB7EA'),
                        lambda x, y: fish(x, x + 223, y - 8, col=ORANGE, stripes=True),
                        lambda x, y: fish(x, x + 166, y - 8, col='#4C9EDB')])

# ── Tiết 2 q1: cặp con vật trên bãi cỏ, chân trên cùng một vạch ─────────────


def base_line(x1, x2, y):
    return (f'<ellipse cx="{(x1 + x2) / 2}" cy="{y + 6}" rx="{(x2 - x1) / 2 + 20}" ry="16" fill="{GRASS}" opacity=".7"/>'
            + dash(x1, y, x2, y, INK, 1.6))


p = [text(16, 30, 'a)', 20, 700), text(16, 270, 'b)', 20, 700)]
p.append(base_line(60, 320, 220) + base_line(400, 690, 220))
p.append(kangaroo(130, 220, 190))
p.append(koala(250, 220, 92))
p.append(hedgehog(450, 220, 62))
p.append(squirrel(600, 220, 150))
p.append(base_line(60, 320, 460) + base_line(400, 690, 460))
p.append(KP2.place(KP2.lion(), 70, 460 - 110, .55))
p.append(giraffe(250, 460, 210))
p.append(KP2.place(KP2.monkey(), 430, 460 - 170, .85))
p.append(bunny(630, 460, 96))
out('bai25_t2_q1_animals', 720, 485, p)

# ── Tiết 2 q2 ───────────────────────────────────────────────────────────────
p = [text(16, 30, 'a)', 20, 700)]
p.append(f'<ellipse cx="400" cy="262" rx="300" ry="26" fill="{GRASS}" opacity=".7"/>')
p.append(dash(120, 262, 660, 262, INK, 1.6))
p.append(banana_tree(150, 262, 135, col=WHITE))
p.append(bamboo(400, 262, 205, col=WHITE))
p.append(palm(620, 262, 165, col=WHITE))
p.append(text(16, 318, 'b)', 20, 700))
BW, BH = 54, 28
GY = 470


def bricks(x, rows, fill):
    s = []
    for r, n in enumerate(rows):
        xs = x + r * BW / 2
        for i in range(n):
            s.append(f'<rect x="{xs + i * BW}" y="{GY - (r + 1) * BH}" width="{BW}" height="{BH}" fill="{fill}" {st(2.2)}/>')
    return ''.join(s)


p.append(f'<line x1="30" y1="{GY}" x2="760" y2="{GY}" stroke="{GREY}" stroke-width="5"/>')
p.append(bricks(60, [2, 1], WHITE))
p.append(bricks(260, [3, 2, 1], '#6FC3F0'))
p.append(bricks(500, [4, 3, 2, 1], WHITE))
p.append(text(260 + 1.5 * BW, GY + 36, 'A', 24, 800))
out('bai25_t2_q2_trees_blocks', 780, GY + 46, p)

# ── Tiết 2 q3: Nam, Mai, Việt, Rô-bốt ───────────────────────────────────────
GY = 352
p = [f'<rect x="10" y="{GY - 20}" width="700" height="34" rx="10" fill="{GREY_L}"/>']
xs = [100, 270, 440, 610]
H = {'Nam': 280, 'Mai': 222, 'Việt': 258, 'Rô-bốt': 280}
p.append(kid(xs[0], GY, 280, shirt=BLUE))
p.append(kid(xs[1], GY, 222, girl=True, shirt=BLUE))
p.append(kid(xs[2], GY, 258, shirt=BLUE))
p.append(robot(xs[3], GY, 274))
p.append(dash(xs[0] + 10, GY - 280, xs[3] + 20, GY - 280, '#1E88D0', 2))
p.append(dash(xs[1] + 10, GY - 222, xs[2] - 30, GY - 222, '#1E88D0', 2))
p.append(dash(20, GY + 2, 700, GY + 2, '#1E88D0', 2))
for x, n in zip(xs, H):
    p.append(text(x, 24, n, 22, 700))
out('bai25_t2_q3_kids', 720, GY + 20, p, bg=None)

# ── Tiết 2 q4 ───────────────────────────────────────────────────────────────


def lineup(name, people):
    GY = 250
    p = [f'<ellipse cx="300" cy="{GY + 4}" rx="290" ry="22" fill="#CDEBFA"/>', dash(40, GY, 560, GY, '#1E88D0', 2)]
    for i, (h, girl, shirt) in enumerate(people):
        p.append(kid(100 + i * 200, GY, h, girl=girl, shirt=shirt))
    out(name, 600, GY + 26, p)


lineup('bai25_t2_q4a_girls', [(190, True, '#9ED3F5'), (212, True, '#6FB7EA'), (166, True, '#4C9EDB')])
lineup('bai25_t2_q4b_kids', [(206, False, '#9ED3F5'), (178, False, WHITE), (222, True, '#4C9EDB')])
