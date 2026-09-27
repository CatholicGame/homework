"""
Vở BT Toán 2, Bài 4 Tiết 2 Q2 — bốn rô-bốt đo chiều cao: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: rô-bốt A, B, C, D (trái → phải) đứng dưới thước đo có
thanh ngang ghi 56 cm, 54 cm, 59 cm, 49 cm; chiều cao vẽ đúng tỉ lệ số đo (cùng
px/cm, cùng mặt sàn), đỉnh rô-bốt chạm thanh ngang.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

W, H = 850, 337
FLOOR = 322
S = 4.7                      # px per cm
STATIONS = [                 # centre x, letter, cm, body colour, light colour
    (112, 'A', 56, BLUE, SKY),
    (322, 'B', 54, TEAL, '#D5F3EA'),
    (540, 'C', 59, PURPLE, '#E6DFFB'),
    (758, 'D', 49, ORANGE, CREAM),
]
parts = []


def st(w=3):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round"'


def stand(cx, top, cm):
    px = cx - 82
    parts.append(f'<rect x="{px - 22}" y="{FLOOR}" width="190" height="10" rx="4" fill="{GREY_L}" {st()}/>')
    parts.append(f'<rect x="{px - 6}" y="{top - 4}" width="12" height="{FLOOR - top + 4}" rx="3" fill="{WHITE}" {st()}/>')
    parts.append(f'<rect x="{px - 6}" y="{top - 6}" width="{cx + 58 - px}" height="8" rx="3" fill="{INK}"/>')
    parts.append(f'<rect x="{px - 12}" y="{FLOOR - 170}" width="10" height="34" rx="3" fill="{GREY_L}" {st()}/>')
    parts.append(text(cx - 10, top - 14, f'{cm} cm', size=24, weight=600))


def eyes(cx, cy, r=9, gap=15):
    for sx in (-1, 1):
        parts.append(f'<circle cx="{cx + sx * gap}" cy="{cy}" r="{r}" fill="{WHITE}" {st()}/>')
        parts.append(f'<circle cx="{cx + sx * gap + 2}" cy="{cy + 1}" r="{r * 0.45}" fill="{INK}"/>')


def chest(cx, cy, letter, w=44, h=50):
    parts.append(f'<rect x="{cx - w / 2}" y="{cy - h / 2}" width="{w}" height="{h}" rx="9" fill="{WHITE}" {st()}/>')
    parts.append(text(cx, cy + 10, letter, size=30, weight=700))


def arm(x0, y0, x1, y1, c):
    d = f'M{x0},{y0} Q{(x0 + x1) / 2 + (x1 - x0) * 0.2},{y0} {x1},{y1}'
    parts.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>')
    parts.append(f'<path d="{d}" fill="none" stroke="{c}" stroke-width="6" stroke-linecap="round"/>')
    parts.append(f'<circle cx="{x1}" cy="{y1}" r="9" fill="{c}" {st()}/>')


def robot_a(cx, top, c, lc):
    # antenna ball touches the bar; round dome head, rounded body, stubby legs
    parts.append(f'<line x1="{cx}" y1="{top + 12}" x2="{cx}" y2="{top + 30}" stroke="{INK}" stroke-width="4"/>')
    parts.append(f'<circle cx="{cx}" cy="{top + 9}" r="8" fill="{RED}" {st()}/>')
    parts.append(f'<path d="M{cx - 46},{top + 92} Q{cx - 46},{top + 28} {cx},{top + 28} Q{cx + 46},{top + 28} {cx + 46},{top + 92} Z" fill="{lc}" {st()}/>')
    eyes(cx, top + 62, 10, 17)
    parts.append(f'<path d="M{cx - 10},{top + 80} q10,7 20,0" fill="none" stroke="{INK}" stroke-width="2.5" stroke-linecap="round"/>')
    body_t, body_b = top + 100, FLOOR - 52
    parts.append(f'<rect x="{cx - 20}" y="{top + 90}" width="40" height="14" fill="{GREY}" {st()}/>')
    arm(cx - 40, body_t + 30, cx - 66, body_t + 90, c)
    arm(cx + 40, body_t + 30, cx + 66, body_t + 90, c)
    parts.append(f'<rect x="{cx - 44}" y="{body_t}" width="88" height="{body_b - body_t}" rx="18" fill="{c}" {st()}/>')
    chest(cx, (body_t + body_b) / 2, 'A')
    for sx in (-1, 1):
        lx = cx + sx * 20
        parts.append(f'<rect x="{lx - 9}" y="{body_b - 2}" width="18" height="36" fill="{GREY}" {st()}/>')
        parts.append(f'<path d="M{lx - 22},{FLOOR} Q{lx - 22},{FLOOR - 18} {lx},{FLOOR - 18} Q{lx + 22},{FLOOR - 18} {lx + 22},{FLOOR} Z" fill="{c}" {st()}/>')


def robot_b(cx, top, c, lc):
    # propeller on top touches the bar; egg-shaped body on two wheels
    parts.append(f'<path d="M{cx - 30},{top + 6} Q{cx},{top - 4} {cx + 30},{top + 6} Q{cx},{top + 14} {cx - 30},{top + 6} Z" fill="{YELLOW}" {st()}/>')
    parts.append(f'<line x1="{cx}" y1="{top + 8}" x2="{cx}" y2="{top + 32}" stroke="{INK}" stroke-width="4"/>')
    bottom = FLOOR - 30
    arm(cx - 44, top + 150, cx - 76, top + 186, c)
    arm(cx + 44, top + 150, cx + 76, top + 186, c)
    parts.append(f'<path d="M{cx},{top + 30} C{cx + 44},{top + 30} {cx + 58},{bottom - 80} {cx + 56},{bottom} H{cx - 56} C{cx - 58},{bottom - 80} {cx - 44},{top + 30} {cx},{top + 30} Z" fill="{c}" {st()}/>')
    parts.append(f'<ellipse cx="{cx}" cy="{top + 76}" rx="34" ry="24" fill="{lc}" {st()}/>')
    eyes(cx, top + 74, 9, 14)
    parts.append(f'<circle cx="{cx}" cy="{top + 88}" r="3" fill="{INK}"/>')
    chest(cx, top + 152, 'B')
    for sx in (-1, 1):
        parts.append(f'<circle cx="{cx + sx * 30}" cy="{FLOOR - 18}" r="18" fill="{INK}"/>')
        parts.append(f'<circle cx="{cx + sx * 30}" cy="{FLOOR - 18}" r="7" fill="{GREY}"/>')


def robot_c(cx, top, c, lc):
    # tall and boxy: square head with ear bolts, long body, long legs, flat feet
    parts.append(f'<rect x="{cx - 34}" y="{top}" width="68" height="62" rx="10" fill="{lc}" {st()}/>')
    for sx in (-1, 1):
        parts.append(f'<rect x="{cx + sx * 34 - (12 if sx < 0 else 0)}" y="{top + 20}" width="12" height="22" rx="4" fill="{GREY}" {st()}/>')
    eyes(cx, top + 28, 9, 14)
    parts.append(f'<rect x="{cx - 12}" y="{top + 46}" width="24" height="6" rx="3" fill="{INK}"/>')
    parts.append(f'<rect x="{cx - 10}" y="{top + 62}" width="20" height="14" fill="{GREY}" {st()}/>')
    body_t, body_b = top + 76, top + 176
    arm(cx - 36, body_t + 20, cx - 58, body_t + 96, c)
    arm(cx + 36, body_t + 20, cx + 64, body_t + 70, c)
    for sx in (-1, 1):
        lx = cx + sx * 16
        parts.append(f'<rect x="{lx - 7}" y="{body_b - 4}" width="14" height="{FLOOR - 12 - body_b}" fill="{GREY}" {st()}/>')
        parts.append(f'<circle cx="{lx}" cy="{(body_b + FLOOR) / 2}" r="9" fill="{GREY_L}" {st()}/>')
        parts.append(f'<rect x="{lx - 22}" y="{FLOOR - 16}" width="44" height="16" rx="8" fill="{c}" {st()}/>')
    parts.append(f'<rect x="{cx - 40}" y="{body_t}" width="80" height="{body_b - body_t}" rx="12" fill="{c}" {st()}/>')
    chest(cx, (body_t + body_b) / 2, 'C')


def robot_d(cx, top, c, lc):
    # short and wide: star antenna, wide head with big smile, chunky body, spring legs
    parts.append(f'<line x1="{cx}" y1="{top + 12}" x2="{cx}" y2="{top + 32}" stroke="{INK}" stroke-width="4"/>')
    parts.append(f'<path d="M{cx},{top} L{cx + 8},{top + 10} L{cx},{top + 20} L{cx - 8},{top + 10} Z" fill="{YELLOW}" {st()}/>')
    parts.append(f'<rect x="{cx - 46}" y="{top + 30}" width="92" height="58" rx="22" fill="{lc}" {st()}/>')
    eyes(cx, top + 54, 9, 18)
    parts.append(f'<path d="M{cx - 16},{top + 70} Q{cx},{top + 82} {cx + 16},{top + 70}" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
    for sx in (-1, 1):
        parts.append(f'<circle cx="{cx + sx * 32}" cy="{top + 70}" r="5" fill="{PINK}"/>')
    body_t, body_b = top + 94, FLOOR - 44
    arm(cx - 48, body_t + 22, cx - 72, body_t + 60, c)
    arm(cx + 48, body_t + 22, cx + 72, body_t + 60, c)
    parts.append(f'<rect x="{cx - 50}" y="{body_t}" width="100" height="{body_b - body_t}" rx="16" fill="{c}" {st()}/>')
    chest(cx, (body_t + body_b) / 2 + 2, 'D', 44, 46)
    for sx in (-1, 1):
        lx = cx + sx * 24
        for k in range(3):
            parts.append(f'<rect x="{lx - 11}" y="{body_b + k * 10}" width="22" height="10" rx="4" fill="{GREY_L}" {st(2)}/>')
        parts.append(f'<path d="M{lx - 20},{FLOOR} Q{lx - 20},{FLOOR - 14} {lx},{FLOOR - 14} Q{lx + 20},{FLOOR - 14} {lx + 20},{FLOOR} Z" fill="{c}" {st()}/>')


DRAW = {'A': robot_a, 'B': robot_b, 'C': robot_c, 'D': robot_d}
for cx, letter, cm, c, lc in STATIONS:
    top = FLOOR - cm * S
    stand(cx, top, cm)
    DRAW[letter](cx, top, c, lc)

save('bai4_t2_q2_robots', W, H, parts)
