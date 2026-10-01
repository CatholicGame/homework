"""
Vở BT Toán 3 Tập hai, Bài 77 Tiết 2 Q3 — bản đồ công viên: nét riêng.
Giữ nội dung toán: cổng công viên; đường 470 m lên ngã ba, rẽ 240 m rồi 260 m
tới sân khấu nhạc nước; đường 280 m rồi 530 m tới rạp chiếu phim; hai đoạn đường
không ghi số (cổng → vòng đu quay → rạp); vị trí tương đối như sách.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 660, 430
P = []


def st(w=2.4):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


# ground
P.append(f'<rect x="6" y="6" width="{W - 12}" height="{H - 12}" rx="14" fill="#DDF1D6" {st(3)}/>')

# roads: dark edge then light surface
ROADS = [
    [(150, 410), (128, 175), (100, 6)],          # 470 m (lên ngã ba), tiếp lên mép bản đồ
    [(128, 175), (300, 112)],                     # 240 m
    [(300, 112), (452, 96)],                      # 260 m (tới nhạc nước)
    [(172, 380), (330, 346)],                     # 280 m
    [(330, 346), (536, 238)],                     # 530 m (tới rạp chiếu phim)
    [(205, 372), (332, 200)],                     # không ghi số: cổng → đu quay
    [(332, 200), (536, 226)],                     # không ghi số: đu quay → rạp
]
for pts in ROADS:
    d = 'M' + ' L'.join(f'{x},{y}' for x, y in pts)
    P.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/>')
for pts in ROADS:
    d = 'M' + ' L'.join(f'{x},{y}' for x, y in pts)
    P.append(f'<path d="{d}" fill="none" stroke="#F6EBD2" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>')


def tree(x, y, r=18):
    return (f'<rect x="{x - 3}" y="{y}" width="6" height="{r * .9:.0f}" fill="{BROWN}" {st(1.6)}/>'
            f'<circle cx="{x}" cy="{y - r * .3:.0f}" r="{r}" fill="{GRASS}" {st(2)}/>')


for x, y, r in ((40, 90, 20), (46, 170, 22), (38, 260, 20), (52, 340, 18), (205, 58, 16), (240, 50, 14),
                (400, 400, 14), (440, 404, 16), (480, 400, 14), (610, 395, 16), (600, 320, 18), (225, 262, 14),
                (590, 60, 16), (620, 110, 14)):
    P.append(tree(x, y, r))

# ferris wheel
cx, cy, R = 350, 150, 46
P.append(f'<path d="M{cx - 30},{cy + 70} L{cx},{cy} L{cx + 30},{cy + 70}" fill="none" stroke="{INK}" stroke-width="5"/>')
P.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" stroke="{PURPLE}" stroke-width="6"/>')
P.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" {st(1.6)}/>')
for k in range(8):
    a = k * math.pi / 4
    x, y = cx + R * math.cos(a), cy + R * math.sin(a)
    P.append(f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" stroke="{INK}" stroke-width="1.6"/>')
    col = (RED, YELLOW, BLUE, GREEN)[k % 4]
    P.append(f'<rect x="{x - 7:.1f}" y="{y - 2:.1f}" width="14" height="11" rx="3" fill="{col}" {st(1.6)}/>')
P.append(f'<circle cx="{cx}" cy="{cy}" r="6" fill="{YELLOW}" {st(1.8)}/>')

# fountain (nhạc nước)
fx, fy = 500, 96
P.append(f'<ellipse cx="{fx}" cy="{fy + 18}" rx="44" ry="12" fill="{WATER_L}" {st(2.2)}/>')
P.append(f'<rect x="{fx - 5}" y="{fy - 8}" width="10" height="24" fill="{GREY_L}" {st(1.8)}/>')
P.append(f'<ellipse cx="{fx}" cy="{fy - 8}" rx="20" ry="6" fill="{WATER_L}" {st(1.8)}/>')
for dx in (-14, 0, 14):
    P.append(f'<path d="M{fx},{fy - 12} Q{fx + dx},{fy - 40} {fx + dx * 2},{fy - 14}" fill="none" stroke="{WATER_D}" stroke-width="3" stroke-linecap="round"/>')
P.append(text(fx, fy - 46, 'NHẠC NƯỚC', 15, 700))

# cinema (rạp chiếu phim)
bx, by = 540, 190
P.append(f'<rect x="{bx}" y="{by}" width="104" height="66" fill="{ORANGE}" {st(2.4)}/>')
P.append(f'<rect x="{bx + 8}" y="{by - 18}" width="88" height="20" rx="4" fill="{RED}" {st(2)}/>')
P.append(text(bx + 52, by - 4, '★ ★ ★', 11, 700, WHITE))
P.append(f'<rect x="{bx + 6}" y="{by + 8}" width="92" height="18" rx="3" fill="{WHITE}" {st(1.6)}/>')
P.append(text(bx + 52, by + 21, 'RẠP CHIẾU PHIM', 10.5, 700))
P.append(f'<rect x="{bx + 38}" y="{by + 36}" width="28" height="30" fill="{SKY_D}" {st(1.8)}/>')
for wx in (bx + 10, bx + 76):
    P.append(f'<rect x="{wx}" y="{by + 36}" width="18" height="14" fill="{SKY}" {st(1.6)}/>')

# park gate (cổng công viên)
gx, gy = 150, 408
P.append(f'<path d="M{gx - 56},{gy} L{gx - 56},{gy - 30} Q{gx},{gy - 82} {gx + 56},{gy - 30} L{gx + 56},{gy} L{gx + 36},{gy} L{gx + 36},{gy - 26} Q{gx},{gy - 56} {gx - 36},{gy - 26} L{gx - 36},{gy} Z" fill="{PINK}" {st(2.4)}/>')
P.append(f'<rect x="{gx - 44}" y="{gy - 80}" width="88" height="22" rx="6" fill="{YELLOW}" {st(2)}/>')
P.append(text(gx, gy - 64, 'CÔNG VIÊN', 13, 700))


def label(x, y, s, ang):
    return (f'<g transform="translate({x},{y}) rotate({ang})">'
            f'<rect x="-30" y="-12" width="60" height="22" rx="8" fill="{WHITE}" {st(1.6)}/>'
            + text(0, 5, s, 15, 700) + '</g>')


P.append(label(112, 300, '470 m', 84))
P.append(label(212, 132, '240 m', -20))
P.append(label(378, 84, '260 m', -6))
P.append(label(262, 348, '280 m', -12))
P.append(label(452, 280, '530 m', -28))

os.makedirs(ROOT / 'src/assets/grade3-workbook-2', exist_ok=True)
save('bai77_t2_q3_map', W, H, P, folder='grade3-workbook-2')
