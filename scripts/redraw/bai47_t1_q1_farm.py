"""
Vở BT Toán 2, Bài 47 Tiết 1 Q1 — trang trại (tô màu theo hình khối): nét riêng.
Giữ nội dung toán: 2 vật khối trụ (thùng phuy, lon), 3 vật khối hộp chữ nhật (máng ăn,
2 kiện rơm), 12 quả dưa hấu khối cầu. Không vẽ thêm vật nào có dạng trụ/cầu/hộp khác
(bỏ khúc gỗ, ốc sên, nấm của sách) để bé không đếm nhầm.
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 900, 737
parts = []
parts.append(f'<defs><clipPath id="fr"><rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="26"/></clipPath></defs>')
parts.append('<g clip-path="url(#fr)">')
parts.append(f'<rect width="{W}" height="{H}" fill="#EAF6FC"/>')
# yard (top) and field (bottom)
parts.append(f'<path d="M0,214 C200,200 500,226 900,196 L900,{H} L0,{H} Z" fill="#E4F1D2" {st(2.4)}/>')
parts.append(f'<path d="M0,396 C200,384 420,378 900,380 L900,{H} L0,{H} Z" fill="#CDE9B4" {st(2.4)}/>')
for y0 in (470, 560, 650):   # soft furrows
    parts.append(f'<path d="M0,{y0} C200,{y0 - 14} 500,{y0 + 10} 900,{y0 - 6}" fill="none" stroke="#B3D99A" stroke-width="10" stroke-linecap="round"/>')

# ── cylinders: barrel + tin can
bar = cyl_up(122, 50, 146, 226, fill='#E07A5F', ry=18, shine=False)
parts.append(bar)
for y in (112, 232):
    parts.append(f'<path d="M49,{y} A73,18 0 0 0 195,{y}" fill="none" stroke="{INK}" stroke-width="3.5"/>')
parts.append(f'<path d="M72,78 L72,262" stroke="{WHITE}" stroke-width="8" stroke-linecap="round" opacity=".35"/>')
parts.append(f'<ellipse cx="150" cy="46" rx="12" ry="4" fill="{GREY}" {st(2)}/>')
parts.append(cyl_up(600, 78, 96, 128, fill='#C7D0D9', ry=12, top_fill='#E9EEF2'))
parts.append(f'<rect x="552" y="124" width="96" height="36" fill="{TEAL}" {st(2.4)}/>')
parts.append(f'<ellipse cx="600" cy="78" rx="36" ry="7" fill="none" stroke="{GREY}" stroke-width="2.4"/>')


# ── pig (behind the trough)
def pig(x, y):
    p = '#F7B6C8'
    s = []
    for dx in (-54, -30, 36, 58):
        s.append(f'<rect x="{x + dx - 8}" y="{y - 10}" width="16" height="44" rx="6" fill="{p}" {st(2.6)}/>')
    s.append(f'<path d="M{x + 76},{y - 52} c16,-4 16,-22 4,-20 c-8,2 -2,14 8,8" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{x}" cy="{y - 36}" rx="80" ry="48" fill="{p}" {st(3)}/>')
    hx, hy = x - 84, y - 70
    s.append(f'<path d="M{hx - 26},{hy - 30} L{hx - 36},{hy - 62} L{hx - 6},{hy - 44} Z" fill="{p}" {st(2.6)}/>')
    s.append(f'<path d="M{hx + 22},{hy - 36} L{hx + 34},{hy - 64} L{hx + 38},{hy - 28} Z" fill="{p}" {st(2.6)}/>')
    s.append(f'<circle cx="{hx}" cy="{hy}" r="44" fill="{p}" {st(3)}/>')
    s.append(f'<ellipse cx="{hx - 14}" cy="{hy + 14}" rx="20" ry="14" fill="#F48FAE" {st(2.6)}/>')
    s.append(f'<ellipse cx="{hx - 20}" cy="{hy + 14}" rx="3" ry="4.5" fill="{INK}"/><ellipse cx="{hx - 8}" cy="{hy + 14}" rx="3" ry="4.5" fill="{INK}"/>')
    s.append(f'<path d="M{hx - 30},{hy - 14} q6,-7 12,0 M{hx + 4},{hy - 14} q6,-7 12,0" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
    s.append(f'<circle cx="{hx + 20}" cy="{hy + 6}" r="7" fill="#F48FAE" opacity=".7"/>')
    return '\n'.join(s)


parts.append(pig(420, 270))

# ── cuboids: trough + 2 hay bales
parts.append(box(218, 272, 236, 64, 0, fill='#C98B5B', dx=34, dy=34))
parts.append(f'<path d="M232,262 L256,246 L446,246 L424,262 Z" fill="{YELLOW}" stroke="{mix(YELLOW, -.3)}" stroke-width="2"/>')
parts.append(f'<line x1="218" y1="304" x2="454" y2="304" stroke="{mix("#C98B5B", -.3)}" stroke-width="2.4"/>')
HAY = '#F2D06B'


def bale(x, y, w, h, dx, dy):
    s = [box(x, y, w, h, 0, fill=HAY, dx=dx, dy=dy, top='#F8E3A0', side='#E2B94A')]
    for k in (.3, .7):   # twine
        xx = x + w * k
        s.append(f'<path d="M{xx},{y + h} L{xx},{y} L{xx + dx},{y - dy}" fill="none" stroke="{RED}" stroke-width="3"/>')
    return '\n'.join(s)


parts.append(bale(672, 150, 150, 86, 40, 26))
parts.append(bale(540, 262, 150, 90, 40, 26))

# ── watermelon vines, leaves, then 12 melons
MELONS = [(385, 466), (515, 470), (580, 530), (686, 516), (825, 500), (448, 566),
          (78, 580), (228, 630), (410, 664), (562, 636), (682, 630), (808, 650)]
vine = f'fill="none" stroke="{GRASS_D}" stroke-width="3.5" stroke-linecap="round"'
parts.append(f'<path d="M340,480 C420,440 470,500 560,486 C640,470 700,540 880,506" {vine}/>')
parts.append(f'<path d="M20,600 C120,640 180,600 280,650 C360,690 440,630 520,650 C620,672 700,610 890,660" {vine}/>')
parts.append(f'<path d="M430,470 C470,520 420,540 460,580" {vine}/>')


def leaf(x, y, rot):
    return (f'<path d="M0,0 C8,-16 28,-18 36,0 C28,18 8,16 0,0 Z" transform="translate({x},{y}) rotate({rot})" '
            f'fill="{GREEN}" {st(2.2)}/>')


for x, y, r in ((300, 488, -30), (455, 486, 20), (622, 500, -60), (748, 524, 30), (870, 528, -120),
                (40, 628, 40), (150, 624, -40), (300, 668, 30), (480, 640, -30), (620, 664, 40),
                (740, 676, -20), (360, 596, 70), (520, 548, 120)):
    parts.append(leaf(x, y, r))


def melon(cx, cy, r=40):
    s = [sphere(cx, cy, r, fill='#5DB85B', shine=False)]
    for k in (-.6, -.2, .2, .6):
        s.append(f'<path d="M{cx + r * k:.1f},{cy - r * math.sqrt(1 - k * k) + 2:.1f} Q{cx + r * k * 1.35:.1f},{cy} {cx + r * k:.1f},{cy + r * math.sqrt(1 - k * k) - 2:.1f}" '
                 f'fill="none" stroke="#2F7D3A" stroke-width="5" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{cx - r * .4:.1f}" cy="{cy - r * .45:.1f}" rx="{r * .2:.1f}" ry="{r * .1:.1f}" transform="rotate(-35 {cx - r * .4:.1f} {cy - r * .45:.1f})" fill="{WHITE}" opacity=".7"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" {st(3)}/>')
    return '\n'.join(s)


for x, y in MELONS:
    parts.append(melon(x, y))
parts.append('</g>')
parts.append(f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="26" fill="none" {st(3)}/>')
save('bai47_t1_q1_farm', W, H, parts)
