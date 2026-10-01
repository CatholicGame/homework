"""
Vở BT Toán 3 Tập hai, Bài 49 (Luyện tập chung): nét riêng.
  bai49_t2_q3_crates  bốn thùng hàng XVI, XVII, (bị xe nâng che), XIX
                      giữ nội dung toán: 4 thùng theo hàng, thùng thứ ba bị che hết chữ
  bai49_t3_q4_sticks  que tính xếp phép tính La Mã  IV + V = XI  (đúng số que và vị trí)
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

F = 'grade3-workbook-2'


def crate(x, y, w, h, label, color=BLUE, dark='#3F8FC9'):
    d = 16
    s = [
        # top and side faces
        f'<polygon points="{x},{y} {x + d},{y - d} {x + w + d},{y - d} {x + w},{y}" fill="#A9D8F5" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>',
        f'<polygon points="{x + w},{y} {x + w + d},{y - d} {x + w + d},{y + h - d} {x + w},{y + h}" fill="{dark}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>',
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="{color}" stroke="{INK}" stroke-width="2.4"/>',
    ]
    for i in range(1, 9):
        xx = x + i * w / 9
        s.append(f'<line x1="{xx:.1f}" y1="{y + 6}" x2="{xx:.1f}" y2="{y + h - 6}" stroke="{WHITE}" stroke-opacity=".45" stroke-width="2"/>')
    if label:
        s.append(f'<rect x="{x + w / 2 - 36}" y="{y + h / 2 - 17}" width="72" height="34" rx="6" fill="{WHITE}" stroke="{INK}" stroke-width="2"/>')
        s.append(text(x + w / 2, y + h / 2 + 9, label, size=24, weight=700))
    return '\n'.join(s)


def forklift(x, y):
    """x,y = ground point under the front wheel; faces right, a small driver-less toy-like forklift"""
    s = []
    # mast and forks (in front, right side)
    s.append(f'<rect x="{x + 70}" y="{y - 150}" width="12" height="138" rx="3" fill="{GREY}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<rect x="{x + 86}" y="{y - 150}" width="10" height="138" rx="3" fill="{GREY}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<path d="M{x + 96},{y - 40} h52 v9 h-52 z" fill="{GREY}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    # body
    s.append(f'<path d="M{x - 90},{y - 20} v-62 q0,-10 10,-10 h140 q10,0 10,10 v62 z" fill="{ORANGE}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')
    s.append(f'<rect x="{x - 100}" y="{y - 70}" width="22" height="46" rx="6" fill="#D9822F" stroke="{INK}" stroke-width="2.4"/>')
    # cabin frame
    s.append(f'<path d="M{x - 60},{y - 92} L{x - 44},{y - 170} H{x + 42} L{x + 56},{y - 92}" fill="#FFF3C4" fill-opacity=".92" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>')
    s.append(f'<path d="M{x - 60},{y - 92} L{x - 44},{y - 170} H{x + 42} L{x + 56},{y - 92}" fill="none" stroke="{YELLOW}" stroke-width="2" stroke-linejoin="round"/>')
    s.append(f'<rect x="{x - 50}" y="{y - 178}" width="96" height="12" rx="5" fill="{YELLOW}" stroke="{INK}" stroke-width="2.4"/>')
    # seat and steering wheel
    s.append(f'<path d="M{x - 38},{y - 92} v-34 q0,-8 8,-8 h14 v42 z" fill="#5A5560" stroke="{INK}" stroke-width="2"/>')
    s.append(f'<line x1="{x + 8}" y1="{y - 92}" x2="{x + 20}" y2="{y - 124}" stroke="{INK}" stroke-width="3.5"/>')
    s.append(f'<ellipse cx="{x + 20}" cy="{y - 126}" rx="12" ry="5" fill="none" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<rect x="{x - 76}" y="{y - 70}" width="40" height="8" rx="4" fill="{WHITE}" opacity=".6"/>')
    # wheels
    for wx, r in ((x - 56, 24), (x + 36, 26)):
        s.append(f'<circle cx="{wx}" cy="{y - r}" r="{r}" fill="#4A4550" stroke="{INK}" stroke-width="2.6"/>')
        s.append(f'<circle cx="{wx}" cy="{y - r}" r="{r * 0.45:.1f}" fill="{GREY_L}" stroke="{INK}" stroke-width="2"/>')
    return '\n'.join(s)


def crates():
    W, H = 660, 280
    s = [f'<rect x="0" y="{H - 30}" width="{W}" height="30" fill="{GREY_L}"/>']
    w, h, y = 120, 84, 62
    xs = [16, 176, 336, 496]
    for x, lab in zip(xs, ['XVI', 'XVII', '', 'XIX']):
        s.append(crate(x, y, w, h, lab))
    s.append(forklift(400, H - 22))
    save('bai49_t2_q3_crates', W, H, s, folder=F)


STICK = '#35B5EC'
HEAD = '#F3F6F8'


def stick(x1, y1, x2, y2):
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#1C8FC4" stroke-width="15" stroke-linecap="round"/>'
            f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{STICK}" stroke-width="10" stroke-linecap="round"/>'
            f'<circle cx="{x1}" cy="{y1}" r="4.5" fill="{HEAD}"/>')


def sticks():
    W, H = 640, 150
    t, b = 22, 128
    s = []
    x = 30
    s.append(stick(x, t, x, b))                        # I
    x += 30
    s.append(stick(x, t, x + 24, b)); s.append(stick(x + 48, t, x + 24, b))   # V
    x += 100
    s.append(stick(x, (t + b) / 2, x + 76, (t + b) / 2))   # +
    s.append(stick(x + 38, t + 12, x + 38, b - 12))
    x += 116
    s.append(stick(x, t, x + 24, b)); s.append(stick(x + 48, t, x + 24, b))   # V
    x += 88
    s.append(stick(x, (t + b) / 2 - 14, x + 80, (t + b) / 2 - 14))   # =
    s.append(stick(x, (t + b) / 2 + 14, x + 80, (t + b) / 2 + 14))
    x += 120
    s.append(stick(x, t, x + 56, b)); s.append(stick(x + 56, t, x, b))   # X
    x += 90
    s.append(stick(x, t, x, b))                        # I
    save('bai49_t3_q4_sticks', W, H, s, folder=F)


if __name__ == '__main__':
    crates()
    sticks()
