"""
Vở BT Toán 2, Bài 2 Tiết 1 Q2 — bóng bay và tia số 0–18 (nối theo mẫu): nét riêng.
Giữ nội dung toán: 7 quả bóng trái → phải ghi 5, 8, 10 + 1, 1, 10 + 2, 10 + 7, 10 + 4;
chỉ quả mẫu 10 + 2 có dây nối tới vạch 12; tia số 0..18 chia đều, có mũi tên.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 900, 251
AX_Y = 207
X0, STEP = 14, 46.4          # x of tick 0, distance between ticks


def tick_x(n):
    return X0 + n * STEP


# centre x, centre y, rx, ry, label, fill, font size
BALLOONS = [
    (66, 95, 21, 26, '5', ORANGE, 22),
    (156, 70, 20, 25, '8', YELLOW, 22),
    (272, 80, 44, 42, '10 + 1', BLUE, 22),
    (392, 84, 20, 32, '1', PINK, 22),
    (502, 73, 45, 55, '10 + 2', GREEN, 22),
    (642, 64, 55, 50, '10 + 7', TEAL, 22),
    (796, 66, 46, 38, '10 + 4', PURPLE, 22),
]
SAMPLE = 4          # index of the 10 + 2 balloon, tied to 12


def balloon(i, cx, cy, rx, ry, label, fill, fs):
    s = []
    ky = cy + ry
    # string (a short curly one for the ones the child connects)
    if i == SAMPLE:
        ex = tick_x(12)
        s.append(f'<path d="M{cx},{ky + 6} C{cx - 4},{ky + 30} {ex - 30},{AX_Y - 60} {ex},{AX_Y}" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
    else:
        s.append(f'<path d="M{cx},{ky + 6} q-7,9 0,17 q7,8 -1,16" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{INK}" stroke-width="2.4"/>')
    # shine
    s.append(f'<path d="M{cx - rx * 0.72},{cy - ry * 0.3} Q{cx - rx * 0.66},{cy - ry * 0.74} {cx - rx * 0.28},{cy - ry * 0.84}" fill="none" stroke="{WHITE}" stroke-width="{max(3, rx / 8):.1f}" stroke-linecap="round" opacity=".85"/>')
    # knot
    s.append(f'<path d="M{cx - 5},{ky + 7} L{cx},{ky - 1} L{cx + 5},{ky + 7} Z" fill="{fill}" stroke="{INK}" stroke-width="1.8" stroke-linejoin="round"/>')
    # label on a soft white badge so it reads well on every colour
    if len(label) > 1:
        s.append(f'<rect x="{cx - 35}" y="{cy - 15}" width="70" height="29" rx="14" fill="{WHITE}" opacity=".9"/>')
    else:
        s.append(f'<circle cx="{cx}" cy="{cy}" r="13.5" fill="{WHITE}" opacity=".9"/>')
    s.append(text(cx, cy + 7, label, size=fs, weight=700))
    return '\n'.join(s)


parts = []
for i, b in enumerate(BALLOONS):
    parts.append(balloon(i, *b))
# number line
parts.append(f'<line x1="4" y1="{AX_Y}" x2="{W - 16}" y2="{AX_Y}" stroke="{BLUE}" stroke-width="3" stroke-linecap="round"/>')
parts.append(f'<path d="M{W - 22},{AX_Y - 8} L{W - 6},{AX_Y} L{W - 22},{AX_Y + 8} Z" fill="{BLUE}" stroke="{BLUE}" stroke-width="2" stroke-linejoin="round"/>')
for n in range(19):
    x = tick_x(n)
    parts.append(f'<line x1="{x:.1f}" y1="{AX_Y - 6}" x2="{x:.1f}" y2="{AX_Y + 6}" stroke="{BLUE}" stroke-width="2.4" stroke-linecap="round"/>')
    parts.append(text(f'{x:.1f}', AX_Y + 32, str(n), size=21, weight=600))
# the sample string lands on 12
parts.append(f'<circle cx="{tick_x(12):.1f}" cy="{AX_Y}" r="4" fill="{INK}"/>')
save('bai2_t1_q2_balloons', W, H, parts)
