"""
Vở BT Toán 2, Bài 2 Tiết 2 Q5 — các chú thỏ A–E chuẩn bị chạy thi: nét riêng.
Giữ nội dung toán: đường chạy xiên có các làn song song; làn của thỏ A ghi số 4,
làn kế tiếp ghi số 5, các làn sau không ghi số; năm bục xuất phát A, B, C, D, E lần
lượt ở năm làn liền nhau (4 → 8), mỗi bục một chú thỏ. Như sách, một chú voi cổ động
đứng trên đường chạy che chỗ ghi số làn 6, 7, 8. Trọng tài rùa cầm cờ chỉ để trang trí.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 900, 400
SLOPE = 0.14                 # lanes rise to the right
B0 = 200                     # y at x=0 of the top edge of lane 4
LW = 50                      # lane width (vertical)
ANG = -math.degrees(math.atan(SLOPE))
TRACK = '#F2A98A'
LINE = '#FFF4EC'


def edge(k, x):              # k = 0 -> top edge of lane 4, k = 1 -> between 4 and 5 ...
    return B0 + k * LW - SLOPE * x


def lane_mid(n, x):          # centre of lane n (4..8)
    return edge(n - 4, x) + LW / 2


def bush(x, y, r, c=GRASS, d=GRASS_D):
    return (f'<g fill="{c}" stroke="{d}" stroke-width="2">'
            f'<circle cx="{x - r * 0.9}" cy="{y}" r="{r * 0.7}"/><circle cx="{x + r * 0.9}" cy="{y}" r="{r * 0.7}"/>'
            f'<circle cx="{x}" cy="{y - r * 0.35}" r="{r}"/></g>')


def block(x, y, letter):
    s = [f'<path d="M{x + 22},{y + 14} L{x + 30},{y + 8} L{x + 10},{y - 26} L{x + 4},{y - 26} Z" fill="{GREY}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>',
         f'<path d="M{x - 20},{y + 14} L{x + 22},{y + 14} L{x + 4},{y - 26} Z" fill="{WHITE}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>',
         text(x + 2, y + 9, letter, size=22, weight=700)]
    return '\n'.join(s)


def limb(d, col, w=11):
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w}" stroke-linecap="round"/>'
            f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w - 4}" stroke-linecap="round"/>')


def rabbit(x, y, fur, light, shirt, shorts):
    """crouched in the 'ready' pose, facing right; x,y = back foot on the block"""
    s = []
    # back leg + foot on the block
    s.append(limb(f'M{x + 30},{y - 22} Q{x + 14},{y - 10} {x + 10},{y + 4}', shorts))
    s.append(f'<ellipse cx="{x + 12}" cy="{y + 6}" rx="11" ry="6" fill="{RED}" stroke="{INK}" stroke-width="2" transform="rotate({ANG:.1f} {x + 12} {y + 6})"/>')
    # front leg, knee down
    s.append(limb(f'M{x + 44},{y - 18} Q{x + 50},{y - 2} {x + 40},{y + 6}', shorts))
    s.append(f'<ellipse cx="{x + 44}" cy="{y + 6}" rx="10" ry="5.5" fill="{RED}" stroke="{INK}" stroke-width="2"/>')
    # arm (behind the body) down to the ground
    s.append(limb(f'M{x + 60},{y - 34} L{x + 72},{y + 2}', fur, 10))
    # tail puff
    s.append(f'<circle cx="{x + 18}" cy="{y - 34}" r="7" fill="{WHITE}" stroke="{INK}" stroke-width="2"/>')
    # body (shirt + shorts), leaning forward
    s.append(f'<ellipse cx="{x + 44}" cy="{y - 36}" rx="28" ry="17" fill="{shirt}" stroke="{INK}" stroke-width="2.4" transform="rotate(20 {x + 44} {y - 36})"/>')
    s.append(f'<path d="M{x + 20},{y - 42} Q{x + 22},{y - 22} {x + 38},{y - 20} L{x + 30},{y - 36} Z" fill="{shorts}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    # ears (swept back)
    hx, hy = x + 76, y - 44
    for dx, rot in ((-6, -42), (4, -24)):
        ex, ey = hx + dx - 4, hy - 26
        s.append(f'<ellipse cx="{ex}" cy="{ey}" rx="7" ry="20" fill="{fur}" stroke="{INK}" stroke-width="2.2" transform="rotate({rot} {ex} {ey + 14})"/>')
        s.append(f'<ellipse cx="{ex}" cy="{ey + 2}" rx="3" ry="13" fill="{PINK}" transform="rotate({rot} {ex} {ey + 14})"/>')
    # head
    s.append(f'<circle cx="{hx}" cy="{hy}" r="16" fill="{fur}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<ellipse cx="{hx + 8}" cy="{hy + 5}" rx="8" ry="6" fill="{light}"/>')
    s.append(f'<circle cx="{hx + 5}" cy="{hy - 3}" r="3" fill="{INK}"/><circle cx="{hx + 6}" cy="{hy - 4}" r="1" fill="{WHITE}"/>')
    s.append(f'<circle cx="{hx + 15}" cy="{hy + 3}" r="2.4" fill="#E77A93"/>')
    s.append(f'<path d="M{hx + 8},{hy + 8} q4,3 7,-1" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>')
    s.append(f'<circle cx="{hx - 3}" cy="{hy + 5}" r="3.5" fill="{PINK}" opacity=".7"/>')
    return '\n'.join(s)


def pompom(x, y, c):
    return ''.join(f'<circle cx="{x + 7 * math.cos(a):.1f}" cy="{y + 7 * math.sin(a):.1f}" r="6" fill="{c}" stroke="{INK}" stroke-width="1.4"/>'
                   for a in [k * math.pi / 3 for k in range(6)]) + f'<circle cx="{x}" cy="{y}" r="6" fill="{c}"/>'


def elephant(x, y, arms='up'):
    """cheering elephant, x,y = feet centre; arms 'up' or 'low' (pompoms at the chest)"""
    g = '#A9B6C8'
    s = []
    for dx in (-14, 14):
        s.append(f'<rect x="{x + dx - 9}" y="{y - 26}" width="18" height="26" rx="7" fill="{g}" stroke="{INK}" stroke-width="2"/>')
    s.append(f'<ellipse cx="{x}" cy="{y - 42}" rx="30" ry="26" fill="{TEAL}" stroke="{INK}" stroke-width="2.4"/>')
    for sx in (-1, 1):
        if arms == 'up':
            s.append(limb(f'M{x + sx * 22},{y - 56} L{x + sx * 40},{y - 86}', g))
            s.append(pompom(x + sx * 42, y - 92, YELLOW if sx < 0 else PINK))
        else:
            s.append(limb(f'M{x + sx * 24},{y - 56} L{x + sx * 38},{y - 42}', g))
            s.append(pompom(x + sx * 40, y - 38, BLUE if sx < 0 else ORANGE))
    hy = y - 82
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{x + sx * 24}" cy="{hy}" rx="16" ry="19" fill="{g}" stroke="{INK}" stroke-width="2.2"/>')
        s.append(f'<ellipse cx="{x + sx * 25}" cy="{hy + 1}" rx="9" ry="12" fill="{PINK}" opacity=".6"/>')
    s.append(f'<circle cx="{x}" cy="{hy}" r="20" fill="{g}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(limb(f'M{x - 3},{hy + 10} Q{x - 4},{hy + 26} {x + 8},{hy + 28} Q{x + 16},{hy + 26} {x + 14},{hy + 18}', g, 10))
    for sx in (-1, 1):
        s.append(f'<circle cx="{x + sx * 8}" cy="{hy - 4}" r="2.8" fill="{INK}"/>')
        s.append(f'<circle cx="{x + sx * 14}" cy="{hy + 5}" r="3.5" fill="{PINK}" opacity=".7"/>')
    return '\n'.join(s)


def bunny_fan(x, y):
    """cheering bunny girl with a skirt, x,y = feet centre"""
    s = []
    for dx in (-8, 8):
        s.append(f'<line x1="{x + dx}" y1="{y - 22}" x2="{x + dx}" y2="{y - 4}" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>')
        s.append(f'<ellipse cx="{x + dx}" cy="{y - 3}" rx="8" ry="5" fill="{WHITE}" stroke="{INK}" stroke-width="1.8"/>')
    for sx in (-1, 1):
        s.append(limb(f'M{x + sx * 10},{y - 48} L{x + sx * 30},{y - 74}', WHITE, 8))
        s.append(pompom(x + sx * 32, y - 80, BLUE if sx < 0 else ORANGE))
    s.append(f'<path d="M{x - 26},{y - 20} Q{x},{y - 30} {x + 26},{y - 20} L{x + 12},{y - 52} L{x - 12},{y - 52} Z" fill="{PINK}" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>')
    hy = y - 66
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{x + sx * 7}" cy="{hy - 26}" rx="6" ry="17" fill="{WHITE}" stroke="{INK}" stroke-width="2" transform="rotate({sx * 10} {x + sx * 7} {hy - 12})"/>')
        s.append(f'<ellipse cx="{x + sx * 7}" cy="{hy - 25}" rx="2.6" ry="11" fill="{PINK}" transform="rotate({sx * 10} {x + sx * 7} {hy - 12})"/>')
    s.append(f'<circle cx="{x}" cy="{hy}" r="15" fill="{WHITE}" stroke="{INK}" stroke-width="2.2"/>')
    # bow
    s.append(f'<path d="M{x},{hy - 14} l-9,-5 v10 Z M{x},{hy - 14} l9,-5 v10 Z" fill="{RED}" stroke="{INK}" stroke-width="1.4" stroke-linejoin="round"/>')
    for sx in (-1, 1):
        s.append(f'<path d="M{x + sx * 6 - 3},{hy - 1} q3,-3 6,0" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
        s.append(f'<circle cx="{x + sx * 9}" cy="{hy + 5}" r="3" fill="{PINK}" opacity=".8"/>')
    s.append(f'<path d="M{x - 4},{hy + 6} q4,5 8,0 Z" fill="{RED}" stroke="{INK}" stroke-width="1.4"/>')
    return '\n'.join(s)


def turtle(x, y):
    """referee turtle holding up a flag, facing left, x,y = feet centre"""
    s = []
    s.append(f'<line x1="{x + 22}" y1="{y - 70}" x2="{x + 22}" y2="{y - 146}" stroke="{BROWN}" stroke-width="4" stroke-linecap="round"/>')
    s.append(f'<path d="M{x + 22},{y - 146} L{x + 60},{y - 134} L{x + 22},{y - 120} Z" fill="{RED}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    for dx in (-12, 12):
        s.append(f'<ellipse cx="{x + dx}" cy="{y - 6}" rx="11" ry="8" fill="{GREEN}" stroke="{INK}" stroke-width="2"/>')
    s.append(f'<ellipse cx="{x + 18}" cy="{y - 40}" rx="22" ry="36" fill="{GRASS_D}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<path d="M{x + 22},{y - 66} v16 l12,8 M{x + 22},{y - 50} l-10,10 v14 M{x + 34},{y - 42} v16" fill="none" stroke="{YELLOW}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="{x - 2}" cy="{y - 40}" rx="18" ry="30" fill="#E9F3C8" stroke="{INK}" stroke-width="2.2"/>')
    s.append(limb(f'M{x - 10},{y - 50} L{x - 42},{y - 62}', GREEN))
    s.append(limb(f'M{x + 4},{y - 58} L{x + 20},{y - 80}', GREEN))
    hx, hy = x - 4, y - 88
    s.append(f'<circle cx="{hx}" cy="{hy}" r="16" fill="{GREEN}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<path d="M{hx - 16},{hy - 4} Q{hx},{hy - 26} {hx + 16},{hy - 4} Z" fill="{BLUE}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    s.append(f'<path d="M{hx - 16},{hy - 4} L{hx - 30},{hy - 1}" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>')
    s.append(f'<circle cx="{hx - 6}" cy="{hy + 2}" r="2.6" fill="{INK}"/><circle cx="{hx + 5}" cy="{hy + 2}" r="2.6" fill="{INK}"/>')
    s.append(f'<path d="M{hx - 6},{hy + 8} q5,4 10,0" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>')
    return '\n'.join(s)


parts = [f'<rect width="{W}" height="{H}" fill="#DDF1D2"/>']
# track: from the top edge of the lane above lane 4 down to the bottom of lane 9
top_k, bot_k = -1, 6
parts.append(f'<path d="M0,{edge(top_k, 0)} L{W},{edge(top_k, W)} L{W},{edge(bot_k, W)} L0,{edge(bot_k, 0)} Z" fill="{TRACK}"/>')
for k in range(top_k, bot_k + 1):
    parts.append(f'<line x1="0" y1="{edge(k, 0)}" x2="{W}" y2="{edge(k, W)}" stroke="{LINE}" stroke-width="4"/>')
# bushes behind the track at the top, grass corner at the bottom right
for bx in range(290, 900, 70):
    parts.append(bush(bx, edge(top_k, bx) - 8, 16))
for bx, by in [(640, 404), (720, 394), (800, 386), (875, 376)]:
    parts.append(bush(bx, by, 18))
# painted lane numbers: only lanes 4 and 5 carry a number
for n, x in ((4, 262), (5, 296)):
    y = lane_mid(n, x) + 14
    parts.append(text(x, f'{y:.1f}', str(n), size=40, weight=700, fill=WHITE,
                      extra=f' stroke="{INK}" stroke-width="3" paint-order="stroke" transform="rotate({ANG:.1f} {x} {y:.1f})"'))
# cheerers on the grass, top left
parts.append(elephant(70, 128))
parts.append(bunny_fan(180, 118))
# runners A..E, one per lane, lanes 4..8
RUNNERS = [('A', WHITE, '#FFF4DF', ORANGE, BLUE), ('B', '#C9A27E', '#F1DEC8', YELLOW, TEAL),
           ('C', '#B8BEC8', '#E8ECF0', GREEN, PURPLE), ('D', WHITE, '#FFF4DF', PINK, BLUE),
           ('E', '#8F8A93', '#DAD6DC', BLUE, ORANGE)]
for i, (letter, fur, light, shirt, shorts) in enumerate(RUNNERS):
    bx = 336 + i * 56
    by = lane_mid(4 + i, bx) + 4
    parts.append(block(bx, by, letter))
    parts.append(rabbit(bx + 14, by + 4, fur, light, shirt, shorts))
parts.append(turtle(800, lane_mid(6, 800) + 30))
# a second cheering elephant stands on the track right where lanes 6, 7, 8 would be
# numbered (like the book) — the child works those numbers out from 4, 5
EX, EY, ES = 365, 404, 1.5
parts.append(f'<g transform="translate({EX},{EY}) scale({ES}) translate({-EX},{-EY})">{elephant(EX, EY, 'low')}</g>')
save('bai2_t2_q5_rabbits', W, H, parts)
