"""
Vở BT Toán 2, Bài 46 Tiết 2 Q1 — đồ vật trên bàn: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: khối trụ có đúng 3 vật — cây giò lụa, lát giò lụa, cái thớt;
khối cầu có đúng 3 vật — 3 quả chanh trên đĩa. Nhãn "Giò lụa", "Lát giò lụa", "Quả chanh",
"Cái thớt" có đường chỉ như sách. Bình hoa thon (không phải khối trụ), đĩa dẹt, hoa phẳng.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 900, 571
parts = []
WOOD, WOOD_D = '#E7C28F', '#C99A5E'
LEAF = '#8CCB6E'
MEAT = '#F7E4D6'


def st(w=3):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def label(tx, ty, s, anchor, lx0, lx1, ly, px, py):
    parts.append(text(tx, ty, s, size=24, weight=600, anchor=anchor))
    parts.append(f'<path d="M{lx0},{ly} L{lx1},{ly} L{px},{py}" fill="none" stroke="{INK}" stroke-width="2"/>')
    parts.append(f'<circle cx="{px}" cy="{py}" r="3.5" fill="{INK}"/>')


# ── mặt bàn ───────────────────────────────────────────────────────────────────
parts.append(f'<path d="M176,272 L736,272 L706,532 L150,532 Z" fill="{SKY}" {st()}/>')
parts.append(f'<path d="M150,532 L706,532 L706,556 L150,556 Z" fill="{SKY_D}" {st()}/>')
parts.append(f'<path d="M706,532 L736,272 L736,296 L706,556 Z" fill="{shade(SKY_D, -0.15)}" {st()}/>')

# ── bình hoa (thon, cổ hẹp) + hoa ─────────────────────────────────────────────
stems = [(-70, 100), (-50, 40), (-30, 150), (-10, 70), (10, 20), (30, 120), (50, 60), (74, 110), (-84, 160), (90, 170)]
for dx, top in stems:
    parts.append(f'<path d="M470,262 Q{470 + dx * 0.4},{top + 60} {470 + dx},{top + 18}" fill="none" stroke="{GRASS_D}" stroke-width="3.5" stroke-linecap="round"/>')
for dx, top in stems:
    fx, fy = 470 + dx, top + 18
    petals = ''.join(f'<ellipse cx="{fx}" cy="{fy - 10}" rx="7" ry="10" transform="rotate({a} {fx} {fy})" fill="{PINK}" stroke="{INK}" stroke-width="1.8"/>'
                     for a in range(0, 360, 72))
    parts.append(petals)
    parts.append(f'<circle cx="{fx}" cy="{fy}" r="5.5" fill="{YELLOW}" stroke="{INK}" stroke-width="1.8"/>')
parts.append(f'<path d="M462,256 L478,256 L480,280 C500,320 512,350 506,372 Q470,386 434,372 C428,350 440,320 460,280 Z" fill="{PURPLE}" {st()}/>')
parts.append(f'<path d="M442,352 Q470,362 498,352" fill="none" stroke="{WHITE}" stroke-width="3" opacity="0.7"/>')
parts.append(f'<ellipse cx="470" cy="256" rx="10" ry="3.5" fill="{shade(PURPLE, 0.4)}" {st(2.5)}/>')

# ── cây giò lụa (khối trụ) ───────────────────────────────────────────────────
gx, gt, gw, gh = 286, 248, 104, 130
parts += cyl2d(gx, gt, gw, gh, LEAF, top_fill=MEAT)
for y in (gt + 40, gt + 86):
    parts.append(f'<path d="M{gx - gw / 2},{y} A{gw / 2},{gw * 0.18} 0 0 0 {gx + gw / 2},{y}" fill="none" stroke="{BROWN}" stroke-width="4"/>')
for dx, dy in ((-20, -3), (4, 6), (22, -4), (-6, -8), (12, 1)):
    parts.append(f'<circle cx="{gx + dx}" cy="{gt + dy}" r="2" fill="{INK}" opacity="0.6"/>')

# ── đĩa + 3 quả chanh (khối cầu) ─────────────────────────────────────────────
parts.append(f'<ellipse cx="626" cy="366" rx="66" ry="16" fill="{WHITE}" {st()}/>')
parts.append(f'<ellipse cx="626" cy="364" rx="46" ry="9" fill="none" stroke="{GREY}" stroke-width="2"/>')
parts += sphere(600, 340, 22, GREEN, shadow=False)
parts += sphere(650, 340, 22, GREEN, shadow=False)
parts += sphere(626, 354, 22, GREEN, shadow=False)

# ── cái thớt (khối trụ dẹt) + lát giò lụa (khối trụ dẹt) ─────────────────────
bx, bt, bw, bh = 446, 392, 224, 58
parts += cyl2d(bx, bt, bw, bh, WOOD, ry=40, top_fill=shade(WOOD, 0.35))
for dx in (-80, -40, 10, 60, 94):
    parts.append(f'<path d="M{bx + dx},{bt + 58} v14" stroke="{WOOD_D}" stroke-width="2.5" stroke-linecap="round"/>')
parts.append(f'<path d="M{bx - 70},{bt + 8} q30,12 60,6" fill="none" stroke="{WOOD_D}" stroke-width="2.5" stroke-linecap="round"/>')
parts += cyl2d(bx, bt - 12, 92, 16, LEAF, ry=16, top_fill=MEAT)
for dx, dy in ((-18, -2), (6, 4), (20, -4), (-4, -7)):
    parts.append(f'<circle cx="{bx + dx}" cy="{bt - 12 + dy}" r="2" fill="{INK}" opacity="0.6"/>')

# ── nhãn ─────────────────────────────────────────────────────────────────────
label(146, 146, 'Giò lụa', 'middle', 96, 196, 156, 272, 244)
label(16, 426, 'Lát giò lụa', 'start', 10, 150, 436, 410, 394)
label(752, 196, 'Quả chanh', 'middle', 818, 684, 206, 640, 336)
label(840, 390, 'Cái thớt', 'middle', 892, 790, 400, 552, 470)
save('bai46_t2_q1_table', W, H, parts)
