"""
Vở BT Toán 3 Tập hai, Bài 60 Tiết 1 Q3 — ô tô đi theo ngã rẽ ghi số lớn hơn: nét riêng.
Giữ nội dung toán: ngã ba đầu: trái 32 728 / phải 40 050; nhánh trái rẽ tiếp 27 800 (sân vận động)
/ 59 028 (trường tiểu học); nhánh phải rẽ tiếp 90 000 (công viên) / 88 888 (bệnh viện).
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

FOLDER = 'grade3-workbook-2'
W, H = 720, 470


def st(w=2.6):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def path_d(p):
    return 'M' + ' L'.join(f'{x},{y}' for x, y in p)


CAR = (360, 440)
J1 = (360, 330)
J2 = (220, 235)
J3 = (500, 240)
ROADS = [
    [CAR, J1],
    [J1, (300, 290), J2],
    [J2, (150, 190), (110, 130)],      # sân vận động
    [J2, (260, 190), (290, 150)],      # trường
    [J1, (430, 290), J3],
    [J3, (480, 180), (470, 130)],      # công viên
    [J3, (580, 225), (620, 190)],      # bệnh viện
]


def roads():
    s = []
    for p in ROADS:
        s.append(f'<path d="{path_d(p)}" fill="none" stroke="{INK}" stroke-width="40" stroke-linejoin="round" stroke-linecap="round"/>')
    for p in ROADS:
        s.append(f'<path d="{path_d(p)}" fill="none" stroke="#F3F1EC" stroke-width="34" stroke-linejoin="round" stroke-linecap="round"/>')
    for p in ROADS:
        s.append(f'<path d="{path_d(p)}" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-dasharray="10 9" stroke-linecap="round"/>')
    return ''.join(s)


def tag(x, y, s):
    w = 84
    return (f'<rect x="{x - w / 2}" y="{y - 17}" width="{w}" height="32" rx="9" fill="#FFFFFF" {st(2.2)}/>'
            + text(x, y + 7, s, size=21, weight=700))


def caption(x, y, s):
    return text(x, y, s, size=17, weight=700, fill='#1B6FA0')


def stadium(cx, cy):
    return (f'<ellipse cx="{cx}" cy="{cy + 12}" rx="70" ry="34" fill="#8FD0F2" {st()}/>'
            f'<ellipse cx="{cx}" cy="{cy}" rx="70" ry="30" fill="#CFEFFC" {st()}/>'
            f'<ellipse cx="{cx}" cy="{cy}" rx="46" ry="17" fill="{GRASS}" {st(2)}/>'
            f'<line x1="{cx}" y1="{cy - 17}" x2="{cx}" y2="{cy + 17}" stroke="#fff" stroke-width="2"/>'
            f'<circle cx="{cx}" cy="{cy}" r="6" fill="none" stroke="#fff" stroke-width="2"/>'
            + ''.join(f'<line x1="{cx + dx}" y1="{cy + 30}" x2="{cx + dx}" y2="{cy + 42}" stroke="{INK}" stroke-width="1.6" opacity=".5"/>' for dx in range(-50, 60, 20)))


def school(cx, by):
    s = [f'<rect x="{cx - 52}" y="{by - 70}" width="104" height="70" fill="#FFE8C7" {st()}/>',
         f'<path d="M{cx - 60},{by - 70} L{cx},{by - 98} L{cx + 60},{by - 70} Z" fill="{ORANGE}" {st()}/>',
         f'<rect x="{cx - 12}" y="{by - 30}" width="24" height="30" fill="{BROWN}" {st(2)}/>',
         f'<line x1="{cx}" y1="{by - 98}" x2="{cx}" y2="{by - 124}" {st(2)}/>',
         f'<path d="M{cx},{by - 124} l20,6 l-20,6 Z" fill="{RED}" {st(1.6)}/>']
    for dx in (-40, 20):
        s.append(f'<rect x="{cx + dx}" y="{by - 58}" width="20" height="18" rx="2" fill="{SKY}" {st(2)}/>')
    return ''.join(s)


def park(cx, cy):
    s = [f'<ellipse cx="{cx}" cy="{cy}" rx="78" ry="38" fill="{GRASS}" {st()}/>',
         f'<ellipse cx="{cx + 22}" cy="{cy + 6}" rx="32" ry="15" fill="{WATER_L}" {st(2)}/>']
    for tx, th in ((cx - 44, 60), (cx - 16, 70)):
        s.append(f'<rect x="{tx - 3}" y="{cy - th * 0.5}" width="6" height="{th * 0.5}" fill="{BROWN}" {st(1.8)}/>')
        s.append(f'<circle cx="{tx}" cy="{cy - th * 0.62}" r="16" fill="{GREEN}" {st(2)}/>')
    s.append(f'<rect x="{cx + 40}" y="{cy - 24}" width="26" height="6" rx="2" fill="{ORANGE}" {st(1.6)}/>')
    s.append(f'<line x1="{cx + 44}" y1="{cy - 18}" x2="{cx + 44}" y2="{cy - 10}" {st(1.6)}/><line x1="{cx + 62}" y1="{cy - 18}" x2="{cx + 62}" y2="{cy - 10}" {st(1.6)}/>')
    return ''.join(s)


def hospital(cx, by):
    s = [f'<rect x="{cx - 46}" y="{by - 96}" width="92" height="96" fill="#EAF6FD" {st()}/>',
         f'<rect x="{cx - 16}" y="{by - 88}" width="32" height="32" rx="6" fill="#fff" {st(2)}/>',
         f'<path d="M{cx - 4},{by - 84} h8 v10 h10 v8 h-10 v10 h-8 v-10 h-10 v-8 h10 Z" fill="{RED}"/>',
         f'<rect x="{cx - 12}" y="{by - 28}" width="24" height="28" fill="{SKY}" {st(2)}/>']
    for dx in (-38, 22):
        s.append(f'<rect x="{cx + dx}" y="{by - 50}" width="16" height="16" rx="2" fill="{SKY}" {st(1.8)}/>')
    return ''.join(s)


def car(cx, cy):
    return (f'<rect x="{cx - 15}" y="{cy - 26}" width="30" height="52" rx="10" fill="{BLUE}" {st()}/>'
            f'<rect x="{cx - 10}" y="{cy - 16}" width="20" height="12" rx="3" fill="#E6F5FC" {st(1.8)}/>'
            f'<rect x="{cx - 10}" y="{cy + 8}" width="20" height="9" rx="3" fill="#E6F5FC" {st(1.8)}/>')


def main():
    p = [roads()]
    p.append(stadium(105, 100))
    p.append(caption(105, 34, 'Sân vận động'))
    p.append(school(300, 160))
    p.append(caption(300, 22, 'Trường tiểu học'))
    p.append(park(470, 108))
    p.append(caption(470, 34, 'Công viên'))
    p.append(hospital(655, 200))
    p.append(caption(655, 92, 'Bệnh viện'))
    p.append(car(*CAR))
    # số ghi ở các ngã rẽ
    p.append(tag(250, 330, '32 728'))
    p.append(tag(470, 340, '40 050'))
    p.append(tag(108, 205, '27 800'))
    p.append(tag(318, 205, '59 028'))
    p.append(tag(415, 195, '90 000'))
    p.append(tag(610, 262, '88 888'))
    save('bai60_t1_q3_roads', W, H, p, folder=FOLDER)


if __name__ == '__main__':
    main()
