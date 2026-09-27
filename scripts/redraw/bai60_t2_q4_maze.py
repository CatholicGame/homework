"""
Vở BT Toán 2, Bài 60 Tiết 2 Q4 — đường đi của bạn Dũng đến phi thuyền (nét riêng).
Giữ nội dung toán: lưới 3×3 ô phép tính (7 × 5, 35 + 50, 85 + 105 / 12 + 40, 85 + 60,
145 + 260 / 35 : 5, 400 + 600), các con đường đôi nối đúng như sách và số ghi trên mỗi
đường (35, 105, 12, 40, 85, 190, 180, 52, 145, 52, 5, 91, 405, 935, 7, 1 000).
Phi hành gia ở góc trên trái, hành tinh góc trên phải, phi thuyền góc dưới phải.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 900, 479
CX, CY = (175, 415, 655), (85, 245, 405)
BW, BH = 148, 66
parts = []
st = f'stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"'


def road(x0, y0, x1, y1):
    import math
    a = math.atan2(y1 - y0, x1 - x0)
    nx, ny = -math.sin(a) * 5.5, math.cos(a) * 5.5
    parts.append(f'<line x1="{x0}" y1="{y0}" x2="{x1}" y2="{y1}" stroke="{WHITE}" stroke-width="11"/>')
    for sgn in (1, -1):
        parts.append(f'<line x1="{x0 + sgn * nx:.1f}" y1="{y0 + sgn * ny:.1f}" x2="{x1 + sgn * nx:.1f}" y2="{y1 + sgn * ny:.1f}" stroke="{INK}" stroke-width="2.2"/>')


def box(c, r, label):
    x, y = CX[c] - BW / 2, CY[r] - BH / 2
    parts.append(f'<rect x="{x}" y="{y}" width="{BW}" height="{BH}" rx="12" fill="{WHITE}" {st}/>')
    parts.append(text(CX[c], CY[r] + 10, label, size=28, weight=500))


def lab(x, y, s):
    parts.append(text(x, y, s, size=26, weight=500))


# ── trang trí trước (dưới đường)
# hành tinh có vành
parts.append(f'<ellipse cx="790" cy="60" rx="98" ry="26" fill="none" stroke="{INK}" stroke-width="12" transform="rotate(-8 790 60)"/>')
parts.append(f'<ellipse cx="790" cy="60" rx="98" ry="26" fill="none" stroke="{YELLOW}" stroke-width="7" transform="rotate(-8 790 60)"/>')
parts.append(f'<circle cx="790" cy="56" r="44" fill="{PURPLE}" {st}/>')
parts.append(f'<circle cx="774" cy="42" r="9" fill="#D9CFFA"/><circle cx="806" cy="70" r="6" fill="#D9CFFA"/>')
parts.append(f'<path d="M692,74 C730,86 850,70 888,48" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>')
parts.append(f'<path d="M692,74 C730,86 850,70 888,48" fill="none" stroke="{YELLOW}" stroke-width="7" stroke-linecap="round"/>')

# ── đường
R = [((0, 0), (1, 0)), ((1, 0), (2, 0)), ((0, 1), (1, 1)), ((1, 1), (2, 1)), ((0, 2), (1, 2)),
     ((0, 0), (0, 1)), ((0, 1), (0, 2)), ((1, 0), (1, 1)), ((1, 1), (1, 2)), ((2, 0), (2, 1)),
     ((0, 1), (1, 0)), ((1, 1), (2, 0)), ((0, 2), (1, 1)), ((1, 2), (2, 1))]
for (c0, r0), (c1, r1) in R:
    road(CX[c0], CY[r0], CX[c1], CY[r1])
road(CX[1], CY[2], 600, CY[2])          # 400 + 600 -> phi thuyền
road(CX[2], CY[1], CX[2], 372)          # 145 + 260 -> phi thuyền

# ── phi thuyền (mũi bên phải)
parts.append(f'<path d="M622,372 L598,326 L666,358 Z" fill="{RED}" {st}/>')
parts.append(f'<path d="M622,424 L598,470 L666,438 Z" fill="{RED}" {st}/>')
parts.append(f'<path d="M596,370 C640,350 710,348 752,398 C710,448 640,446 596,426 Z" fill="{GREY_L}" {st}/>')
parts.append(f'<path d="M718,368 C736,378 746,388 752,398 C746,408 736,418 718,428 Z" fill="{RED}" {st}/>')
parts.append(f'<rect x="584" y="382" width="16" height="32" rx="4" fill="#8A929C" {st}/>')
parts.append(f'<path d="M584,388 L562,380 L568,398 L558,412 L584,408 Z" fill="{ORANGE}" stroke="{INK}" stroke-width="2"/>')
for cx, r in ((650, 17), (692, 10)):
    parts.append(f'<circle cx="{cx}" cy="398" r="{r}" fill="{SKY_D}" stroke="{INK}" stroke-width="2.4"/>')

# ── ô phép tính
LBL = [['7 × 5', '35 + 50', '85 + 105'], ['12 + 40', '85 + 60', '145 + 260'], ['35 : 5', '400 + 600', None]]
for r in range(3):
    for c in range(3):
        if LBL[r][c]:
            box(c, r, LBL[r][c])

# ── số trên đường
for x, y, s in ((295, 66, '35'), (535, 66, '105'), (303, 226, '52'), (540, 226, '145'), (290, 444, '7'),
                (536, 444, '1 000'), (143, 173, '12'), (141, 333, '52'), (380, 173, '85'), (380, 333, '91'),
                (694, 173, '180'), (694, 333, '935'), (264, 158, '40'), (497, 158, '190'), (266, 318, '5'),
                (498, 318, '405')):
    lab(x, y, s)

# ── phi hành gia (góc trên trái)
ax = 42
parts.append(f'<rect x="{ax - 22}" y="110" width="44" height="50" rx="14" fill="{WHITE}" {st}/>')
parts.append(f'<rect x="{ax - 12}" y="122" width="24" height="16" rx="4" fill="{SKY}" stroke="{INK}" stroke-width="2"/>')
for sx in (-1, 1):
    parts.append(f'<rect x="{ax + sx * 24 - 7}" y="116" width="14" height="36" rx="7" fill="{WHITE}" {st}/>')
    parts.append(f'<rect x="{ax + sx * 10 - 8}" y="156" width="16" height="26" rx="6" fill="{WHITE}" {st}/>')
    parts.append(f'<rect x="{ax + sx * 10 - 10}" y="176" width="20" height="9" rx="4" fill="{GREY}" stroke="{INK}" stroke-width="2"/>')
parts.append(f'<circle cx="{ax}" cy="72" r="36" fill="{WHITE}" {st}/>')
parts.append(f'<rect x="{ax - 24}" y="56" width="48" height="38" rx="16" fill="{SKY}" stroke="{INK}" stroke-width="2.4"/>')
parts.append(f'<circle cx="{ax}" cy="76" r="15" fill="{SKIN}"/>')
parts.append(f'<path d="M{ax - 16},70 C{ax - 12},56 {ax + 12},56 {ax + 16},70 C{ax + 6},64 {ax - 6},64 {ax - 16},70 Z" fill="{HAIR}"/>')
for sx in (-1, 1):
    parts.append(f'<circle cx="{ax + sx * 6}" cy="76" r="2.2" fill="{INK}"/>')
parts.append(f'<path d="M{ax - 4},83 q4,3 8,0" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>')
save('bai60_t2_q4_maze', W, H, parts)
