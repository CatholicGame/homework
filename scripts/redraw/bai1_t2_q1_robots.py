"""
Vở BT Toán 2, Bài 1 Tiết 2 Q1 — "Số?": 4 rô-bốt, số trên ngực 67, 54, 88, 36; mỗi rô-bốt
cầm hai vòng tròn (chục bên trái, đơn vị bên phải). Mẫu: 67 cầm 60 và 7; ba rô-bốt còn lại
để trống cả hai vòng. Rô-bốt vẽ bằng nét riêng (không đồ theo sách).

    python scripts/redraw/bai1_t2_q1_robots.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 800, 213
# centre x, chest number, left circle, right circle (None = blank), body colour, dark shade
ROBOTS = [
    (100, '67', '60', '7', BLUE, '#4E97CC'),
    (300, '54', None, None, TEAL, '#3FAE93'),
    (500, '88', None, None, PURPLE, '#917BDA'),
    (700, '36', None, None, ORANGE, '#D9833C'),
]
SW = 2.6
HAND_DX, HAND_Y, HAND_R = 72, 182, 24


def robot(cx, num, left, right, col, dark):
    s = []
    # legs + feet
    for sx in (-1, 1):
        lx = cx + sx * 17
        s.append(f'<rect x="{lx - 8}" y="160" width="16" height="36" rx="6" fill="{GREY}" stroke="{INK}" stroke-width="{SW}"/>')
        s.append(f'<path d="M{lx - 15},{209} Q{lx - 15},{193} {lx},{193} Q{lx + 15},{193} {lx + 15},{209} Z" fill="{dark}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    # arms: a bendy tube from shoulder down to the hand
    for sx in (-1, 1):
        d = f'M{cx + sx * 36},{112} C{cx + sx * 62},{114} {cx + sx * 70},{140} {cx + sx * HAND_DX * 0.94},{HAND_Y - HAND_R + 2}'
        s.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="15" stroke-linecap="round"/>')
        s.append(f'<path d="{d}" fill="none" stroke="{GREY}" stroke-width="9.5" stroke-linecap="round"/>')
    # body
    s.append(f'<rect x="{cx - 44}" y="96" width="88" height="72" rx="20" fill="{col}" stroke="{INK}" stroke-width="{SW}"/>')
    # chest screen with the number
    s.append(f'<rect x="{cx - 30}" y="106" width="60" height="38" rx="9" fill="#fff" stroke="{INK}" stroke-width="2"/>')
    s.append(text(cx, 134, num, size=26, weight=700))
    # little lights under the screen
    for k, c in enumerate((RED, YELLOW, GREEN)):
        s.append(f'<circle cx="{cx - 14 + k * 14}" cy="155" r="4.2" fill="{c}" stroke="{INK}" stroke-width="1.5"/>')
    # neck
    s.append(f'<rect x="{cx - 10}" y="84" width="20" height="14" rx="3" fill="{GREY}" stroke="{INK}" stroke-width="{SW}"/>')
    # antenna: spring + star-ish bulb
    s.append(f'<path d="M{cx},{30} q7,-4 0,-8 q-7,-4 0,-8" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="10" r="7" fill="{YELLOW}" stroke="{INK}" stroke-width="2.2"/>')
    # ears (side bolts)
    for sx in (-1, 1):
        s.append(f'<rect x="{cx + sx * 46 - 6}" y="46" width="12" height="22" rx="5" fill="{dark}" stroke="{INK}" stroke-width="{SW}"/>')
    # head
    s.append(f'<rect x="{cx - 42}" y="28" width="84" height="58" rx="22" fill="{col}" stroke="{INK}" stroke-width="{SW}"/>')
    s.append(f'<rect x="{cx - 32}" y="36" width="64" height="42" rx="15" fill="{CREAM}" stroke="{INK}" stroke-width="1.8"/>')
    for sx in (-1, 1):
        ex = cx + sx * 14
        s.append(f'<circle cx="{ex}" cy="53" r="8" fill="#fff" stroke="{INK}" stroke-width="1.8"/>')
        s.append(f'<circle cx="{ex + 1.5}" cy="54" r="4.3" fill="{INK}"/><circle cx="{ex + 3}" cy="52" r="1.5" fill="#fff"/>')
        s.append(f'<circle cx="{cx + sx * 25}" cy="66" r="4" fill="{PINK}" opacity=".8"/>')
    s.append(f'<path d="M{cx - 9},{66} q9,8 18,0" fill="none" stroke="{INK}" stroke-width="2.2" stroke-linecap="round"/>')
    # the two circles held in the hands, with little grippers on top
    for sx, val in ((-1, left), (1, right)):
        hx = cx + sx * HAND_DX
        s.append(f'<circle cx="{hx}" cy="{HAND_Y}" r="{HAND_R}" fill="#fff" stroke="{INK}" stroke-width="{SW}"/>')
        for gx in (-9, 9):
            s.append(f'<path d="M{hx + gx - 5},{HAND_Y - HAND_R + 5} q5,-12 10,0" fill="{GREY}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
        if val:
            s.append(text(hx, HAND_Y + 9, val, size=24, weight=700))
    return '\n'.join(s)


parts = [robot(*r) for r in ROBOTS]
save('bai1_t2_q1_robots', W, H, parts)
