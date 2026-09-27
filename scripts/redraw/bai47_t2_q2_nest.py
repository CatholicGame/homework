"""
Vở BT Toán 2, Bài 47 Tiết 2 Q2 — tổ chim trang trí bằng đồ vật sặc sỡ: nét riêng.
Giữ nội dung toán: phía trước tổ có 3 đồ vật khối cầu (2 quả bóng cạnh bụi cỏ + 1 quả
bóng bên phải), 7 đồ vật khối trụ (6 lon đứng xếp 2 hàng + 1 ống nằm dưới bụi cỏ bên trái),
1 khối lập phương. Bỏ vỏ ốc của sách (tránh đếm nhầm là khối cầu); bông hoa giữ lại.
"""
import math, random
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 900, 593
random.seed(47)
parts = []
parts.append(f'<ellipse cx="300" cy="512" rx="300" ry="70" fill="#F1E6D2"/>')
parts.append(f'<path d="M0,430 C200,418 420,424 560,428" fill="none" stroke="#D9C7A6" stroke-width="3" stroke-linecap="round"/>')

# ── bower: two walls of sticks forming an arch
STICK = ['#8A5A3B', '#A06B45', '#6E4A33', '#B98556']


def sticks(x0, x1, top_fn, base, n):
    s = []
    for i in range(n):
        x = x0 + (x1 - x0) * random.random()
        top = top_fn(x) + random.uniform(-10, 14)
        lean = random.uniform(-26, 26)
        s.append(f'<line x1="{x:.1f}" y1="{base + random.uniform(-6, 6):.1f}" x2="{x + lean:.1f}" y2="{top:.1f}" '
                 f'stroke="{random.choice(STICK)}" stroke-width="{random.uniform(3, 5.5):.1f}" stroke-linecap="round"/>')
    return s


def left_top(x):   # outer wall rises to the apex at x≈230
    return 70 + abs(x - 150) * .9


def right_top(x):
    return 70 + abs(x - 360) * .9


parts.append(f'<path d="M20,418 C10,250 110,70 230,40 C350,70 460,250 470,418 L380,418 C370,300 320,190 240,110 '
             f'C180,190 130,300 120,418 Z" fill="#E8D3B4" stroke="none"/>')
parts += sticks(24, 130, left_top, 418, 60)
parts += sticks(360, 470, right_top, 418, 60)
for i in range(30):  # sticks across the arch top
    t = random.random()
    x = 110 + 260 * t
    y = 60 + 70 * abs(t - .5) * 2 + random.uniform(-14, 14)
    parts.append(f'<line x1="{x - 40:.1f}" y1="{y + 40 * (1 if t < .5 else -1) * .6 + 20:.1f}" x2="{x + 40:.1f}" y2="{y - 40 * (1 if t < .5 else -1) * .6 + 20:.1f}" '
                 f'stroke="{random.choice(STICK)}" stroke-width="{random.uniform(3, 5):.1f}" stroke-linecap="round"/>')
# rock
parts.append(f'<path d="M430,416 C440,386 470,376 500,384 C526,390 544,404 548,416 Z" fill="{GREY}" {st(2.6)}/>')

# ── perch + bird (right)
parts.append(f'<path d="M470,410 C510,330 560,260 590,170" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>'
             f'<path d="M470,410 C510,330 560,260 590,170" fill="none" stroke="{BROWN}" stroke-width="7" stroke-linecap="round"/>')
parts.append(f'<path d="M548,262 C560,250 580,250 596,236" fill="none" stroke="{INK}" stroke-width="8" stroke-linecap="round"/><path d="M548,262 C560,250 580,250 596,236" fill="none" stroke="{BROWN}" stroke-width="4" stroke-linecap="round"/>')
parts.append(f'<path d="M596,236 c10,-14 26,-14 30,-4 c-10,10 -22,10 -30,4 Z" fill="{GREEN}" {st(2)}/>')
bx, by = 590, 110
parts.append(f'<path d="M{bx + 30},{by + 6} C{bx + 140},{by - 40} {bx + 250},{by - 90} {bx + 300},{by - 80} C{bx + 260},{by - 40} {bx + 150},{by + 20} {bx + 40},{by + 34} Z" fill="#3B6FA8" {st(2.8)}/>')
parts.append(f'<path d="M{bx + 60},{by + 10} C{bx + 150},{by - 20} {bx + 230},{by - 60} {bx + 280},{by - 74}" fill="none" stroke="{SKY_D}" stroke-width="3"/>')
parts.append(f'<ellipse cx="{bx}" cy="{by + 14}" rx="48" ry="36" fill="#4F86C6" {st(2.8)}/>')
parts.append(f'<ellipse cx="{bx - 6}" cy="{by + 24}" rx="30" ry="22" fill="{SKY}"/>')
parts.append(f'<path d="M{bx + 4},{by + 2} C{bx + 26},{by - 4} {bx + 44},{by + 14} {bx + 36},{by + 34} C{bx + 20},{by + 34} {bx + 6},{by + 22} {bx + 4},{by + 2} Z" fill="#2F5E92" {st(2.4)}/>')
parts.append(f'<circle cx="{bx - 30}" cy="{by - 26}" r="28" fill="#4F86C6" {st(2.8)}/>')
parts.append(f'<path d="M{bx - 56},{by - 30} L{bx - 80},{by - 20} L{bx - 56},{by - 16} Z" fill="{YELLOW}" {st(2.4)}/>')
parts.append(f'<circle cx="{bx - 38}" cy="{by - 32}" r="6" fill="{WHITE}" {st(1.6)}/><circle cx="{bx - 39}" cy="{by - 32}" r="3" fill="{INK}"/>')
parts.append(f'<path d="M{bx - 6},{by + 46} L{bx - 10},{by + 56} M{bx + 10},{by + 46} L{bx + 8},{by + 56}" stroke="{ORANGE}" stroke-width="4" stroke-linecap="round"/>')

# ── decorations in front
CAN = [ORANGE, RED, PINK, TEAL, YELLOW, PURPLE]
parts.append(cyl_side(100, 506, 64, 28, fill=BLUE, rx=6))               # lying cylinder (under grass)
for i, (a, l) in enumerate(((-60, 70), (-100, 60), (-30, 58), (-120, 48), (-75, 80), (-45, 66))):   # grass tuft
    x0 = 100 + (i - 2.5) * 9
    ang = math.radians(a)
    parts.append(f'<path d="M{x0},{500} Q{x0 + math.cos(ang) * l * .4:.1f},{500 - l * .7:.1f} {x0 + math.cos(ang) * l:.1f},{500 + math.sin(ang) * l:.1f}" '
                 f'fill="none" stroke="{GRASS_D}" stroke-width="6" stroke-linecap="round"/>')
parts.append(sphere(172, 474, 20, fill=RED))
parts.append(sphere(218, 466, 28, fill=YELLOW))
parts.append(box(118, 540, 40, 40, 0, fill=GREEN, dx=16, dy=14))
for k in (1, 2):
    parts.append(f'<line x1="{118 + 40 * k / 3:.1f}" y1="540" x2="{118 + 40 * k / 3:.1f}" y2="580" stroke="{INK}" stroke-width="1.6"/>')
    parts.append(f'<line x1="118" y1="{540 + 40 * k / 3:.1f}" x2="158" y2="{540 + 40 * k / 3:.1f}" stroke="{INK}" stroke-width="1.6"/>')
parts.append(flower(238, 580, 1.0, petal=PURPLE))
for i, (x, y) in enumerate(((338, 452), (372, 460), (406, 470), (330, 508), (365, 516), (400, 524))):
    parts.append(cyl_up(x, y, 24, 40, fill=CAN[i], ry=5, sw=2.4))
parts.append(sphere(474, 540, 26, fill=PINK))
save('bai47_t2_q2_nest', W, H, parts)
