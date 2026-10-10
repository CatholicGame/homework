"""Vở BT Toán 1 Tập Hai — Bài 24 (Luyện tập chung), trang 24–27.
Tiết 1 q1: que tính: mẫu 5 chục 6 que, a) 3 chục 8 que, b) 6 chục 4 que, c) 7 chục 4 que.
Tiết 1 q3: hình vuông ghép 7 mảnh ghi 2, 15, 24, 46, 1, 10, 37 → con thiên nga, mảnh đầu ghi 2 (mẫu),
           các mảnh khác ghi chữ A–G để bé viết số.
Tiết 1 q5: bốn hình ô vuông 10, 12, 12, 19 ô.
Tiết 2 q3: gấu bông a) 28 57 79 51, b) 73 69 90 75.
Tiết 2 q4: nối 30 điểm theo thứ tự (vị trí điểm như sách) → chú chó có vòng cổ.
Tiết 2 q5: ba tấm thẻ 5, 6, 8 và rô-bốt."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_b import *

# ── Tiết 1 q1: que tính ─────────────────────────────────────────────────────
for name, t, o in (('bai24_t1_q1_mau', 5, 6), ('bai24_t1_q1_a', 3, 8), ('bai24_t1_q1_b', 6, 4), ('bai24_t1_q1_c', 7, 4)):
    parts, W, H = sticks_panel(t, o, w=560, h=170)
    out(name, W, H, parts)

# ── Tiết 1 q3: ghép hình ────────────────────────────────────────────────────
TAN = '#CDEBFA'
u = 52
ox, oy = 24, 40
sq = {'46': [(0, 0), (0, 4), (2, 2)], '37': [(0, 4), (4, 4), (2, 2)], '2': [(0, 0), (2, 0), (1, 1)],
      '15': [(2, 0), (1, 1), (2, 2), (3, 1)], '24': [(2, 0), (4, 0), (4, 2)], '1': [(2, 2), (3, 1), (3, 3)],
      '10': [(3, 1), (4, 2), (4, 4), (3, 3)]}
parts = [f'<rect width="760" height="330" fill="#fff"/>']
for lab, pts in sq.items():
    P = [(ox + x * u, oy + y * u) for x, y in pts]
    parts.append(f'<polygon points="{" ".join(f"{x},{y}" for x, y in P)}" fill="{TAN}" {st(2.6)}/>')
    cx, cy = sum(p[0] for p in P) / len(P), sum(p[1] for p in P) / len(P)
    parts.append(text(cx, cy + 8, lab, 24, 700))
# mũi tên
parts.append(f'<path d="M262,148 L292,148 L292,136 L314,156 L292,176 L292,164 L262,164 Z" fill="{SKY_D}" {st(2.2)}/>')
# thiên nga: toạ độ theo đơn vị sách (1 đơn vị nhỏ = 86.6 phần), thu về cùng cỡ mảnh ở hình vuông
k = u / 86.6
sx, sy = 330, 22
swan = {'2': [(420, -15), (540, 105), (420, 105)],
        'A': [(335, 70), (420, -15), (420, 155), (335, 240)],
        'B': [(335, 240), (420, 155), (505, 240), (420, 325)],
        'C': [(420, 325), (505, 240), (505, 410)],
        'D': [(380, 290), (505, 410), (380, 535)],
        'E': [(135, 535), (380, 290), (380, 535)],
        'G': [(35, 290), (380, 290), (205, 465)]}
for lab, pts in swan.items():
    P = [(sx + (x - 35) * k, sy + (y + 15) * k) for x, y in pts]
    parts.append(f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in P)}" fill="{TAN}" {st(2.6)}/>')
    cx, cy = sum(p[0] for p in P) / len(P), sum(p[1] for p in P) / len(P)
    if lab == '2':
        parts.append(text(cx - 6, cy + 9, '2', 24, 700, fill='#1E88D0'))
    else:
        parts.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="14" fill="#fff" {st(2)}/>')
        parts.append(text(cx, cy + 7, lab, 19, 800, fill='#C2410C'))
out('bai24_t1_q3_tangram', 660, 360, parts[1:])

# ── Tiết 1 q5: hình ô vuông ─────────────────────────────────────────────────
C = 34
figs = [[4, 3, 2, 1], [2, 4, 4, 2], [1, 3, 4, 3, 1], [4, 4, 3, 4, 4]]
parts = []
x = 14
for n, cols in enumerate(figs, 1):
    for ci, hgt in enumerate(cols):
        for r in range(hgt):
            parts.append(f'<rect x="{x + ci * C}" y="{20 + (4 - 1 - r) * C}" width="{C}" height="{C}" fill="#fff" {st(2.4)}/>')
    w = len(cols) * C
    parts.append(text(x + w / 2, 20 + 4 * C + 32, f'Hình {n}', 20, 700))
    x += w + 30
out('bai24_t1_q5_grids', x - 16, 20 + 4 * C + 46, parts)

# ── Tiết 2 q3: gấu bông ─────────────────────────────────────────────────────
parts = []
for row, (lab, nums) in enumerate((('a)', ['28', '57', '79', '51']), ('b)', ['73', '69', '90', '75']))):
    y0 = 10 + row * 170
    parts.append(panel(40, y0, 690, 156, fill='#DDF0FC'))
    parts.append(text(18, y0 + 30, lab, 20, 700, anchor='middle'))
    for i, nmb in enumerate(nums):
        parts.append(bear_heart(126 + i * 168, y0 + 148, 130, nmb))
out('bai24_t2_q3_bears', 740, 346, parts)

# ── Tiết 2 q4: nối điểm ─────────────────────────────────────────────────────
P = [(560, 87), (512, 220), (448, 205), (515, 60), (640, 32), (730, 88), (805, 235), (893, 255), (918, 300), (890, 340),
     (762, 386), (575, 348), (490, 233), (363, 230), (246, 272), (175, 157), (248, 313), (230, 390), (138, 332), (68, 435),
     (118, 466), (150, 390), (246, 450), (273, 378), (500, 393), (628, 578), (722, 512), (690, 475), (642, 524), (552, 398)]
# chỗ đặt số so với điểm (như sách)
OFF = {1: (16, 8), 2: (16, 6), 3: (-12, -14), 4: (-18, -6), 5: (20, -4), 6: (18, -8), 7: (14, -14), 8: (18, -8), 9: (20, 6),
       10: (22, 22), 11: (14, 26), 12: (2, -20), 13: (-18, 32), 14: (0, -18), 15: (10, -18), 16: (0, -20), 17: (24, 6),
       18: (-6, -14), 19: (-26, -2), 20: (-26, -2), 21: (0, 30), 22: (10, 26), 23: (4, 30), 24: (16, 22), 25: (-14, -16),
       26: (-6, 26), 27: (12, 28), 28: (18, -12), 29: (-16, -18), 30: (-2, 30)}
kk = .72
parts = []
T = lambda p: (p[0] * kk - 10, p[1] * kk + 4)
# vòng cổ và thẻ tên có sẵn như sách; mắt, má
c13, c12 = T(P[12]), T(P[11])
parts.append(f'<path d="M{c13[0]:.1f},{c13[1]:.1f} Q{c13[0] + 4:.1f},{c13[1] + 60:.1f} {c12[0]:.1f},{c12[1] + 2:.1f}" fill="none" stroke="{BLUE}" stroke-width="4" stroke-linecap="round"/>')
parts.append(f'<ellipse cx="{c12[0] + 2:.1f}" cy="{c12[1] + 18:.1f}" rx="16" ry="13" fill="{YELLOW}" {st(2.4)}/>')
ex, ey = T((735, 175))
parts.append(f'<ellipse cx="{ex:.1f}" cy="{ey:.1f}" rx="6" ry="10" fill="{INK}"/>')
for (ax, ay), d in (((640, 310), 1), ((835, 300), 1)):
    qx, qy = T((ax, ay))
    parts.append(f'<path d="M{qx + 6:.1f},{qy - 26:.1f} Q{qx - 10:.1f},{qy:.1f} {qx + 6:.1f},{qy + 26:.1f}" fill="none" {st(3.4)}/>')
for i, p in enumerate(P, 1):
    x, y = T(p)
    parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.2" fill="{INK}"/>')
    dx, dy = OFF[i]
    parts.append(text(x + dx * .9, y + dy * .9 + 6, str(i), 17, 600))
out('bai24_t2_q4_dots', 680, 462, parts)

# ── Tiết 2 q5: ba tấm thẻ ───────────────────────────────────────────────────
parts = [f'<rect x="0" y="0" width="640" height="230" fill="#fff"/>']
for x, y, n in ((90, 90, '5'), (226, 40, '6'), (360, 110, '8')):
    parts.append(f'<rect x="{x}" y="{y}" width="72" height="100" rx="6" fill="#9ED3F5" {st(2.6)}/>')
    parts.append(text(x + 36, y + 66, n, 46, 800))
parts.append(robot(560, 222, 210))
out('bai24_t2_q5_cards', 640, 230, parts[1:])
