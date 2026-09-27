"""
Vở BT Toán 3, Bài 7 Tiết 2 Q2a — đồng hồ báo thức đổ chuông lúc 7 giờ 30 phút. Nét riêng.
Mặt số 1–12 đủ, 60 vạch phút; kim giờ giữa 7 và 8, kim phút chỉ 6.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 540, 480
cx, cy, R = 262, 280, 158
parts = []
BODY, BODY_D = RED, '#D9534A'
# chân
for sg in (-1, 1):
    parts.append(f'<path d="M{cx + sg * 90},{cy + 130} L{cx + sg * 120},{cy + 188}" stroke="{INK}" stroke-width="14" stroke-linecap="round"/>'
                 f'<path d="M{cx + sg * 90},{cy + 130} L{cx + sg * 120},{cy + 188}" stroke="{YELLOW}" stroke-width="7" stroke-linecap="round"/>')
# chuông + búa
for sg in (-1, 1):
    bx, by = cx + sg * 118, cy - 148
    parts.append(f'<g transform="rotate({sg * 32} {bx} {by})"><path d="M{bx - 52},{by + 14} Q{bx - 50},{by - 50} {bx},{by - 52} Q{bx + 50},{by - 50} {bx + 52},{by + 14} Z" '
                 f'fill="{YELLOW}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>'
                 f'<circle cx="{bx}" cy="{by - 56}" r="8" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>'
                 f'<path d="M{bx - 30},{by - 20} q8,-18 26,-22" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>')
parts.append(f'<rect x="{cx - 6}" y="{cy - R - 40}" width="12" height="36" fill="{BODY_D}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<circle cx="{cx}" cy="{cy - R - 44}" r="12" fill="{BODY_D}" stroke="{INK}" stroke-width="3"/>')
# rung
for sg in (-1, 1):
    for k, rr in ((0, R + 36), (1, R + 52)):
        a0, a1 = (-22, 8) if sg > 0 else (172, 202)
        x1, y1 = cx + rr * math.cos(math.radians(a0)), cy + rr * math.sin(math.radians(a0))
        x2, y2 = cx + rr * math.cos(math.radians(a1)), cy + rr * math.sin(math.radians(a1))
        parts.append(f'<path d="M{x1:.1f},{y1:.1f} A{rr},{rr} 0 0 1 {x2:.1f},{y2:.1f}" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round" opacity=".5"/>')
# thân + mặt
parts.append(f'<circle cx="{cx}" cy="{cy}" r="{R + 22}" fill="{BODY}" stroke="{INK}" stroke-width="4"/>')
parts.append(f'<path d="M{cx - R - 6},{cy - 40} A{R + 8},{R + 8} 0 0 1 {cx - 40},{cy - R - 6}" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".55"/>')
parts.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{WHITE}" stroke="{INK}" stroke-width="3.5"/>')
for i in range(60):
    t = math.radians(i * 6)
    L = 16 if i % 5 == 0 else 7
    w = 4 if i % 5 == 0 else 2
    parts.append(f'<line x1="{cx + math.sin(t) * (R - 6):.1f}" y1="{cy - math.cos(t) * (R - 6):.1f}" x2="{cx + math.sin(t) * (R - 6 - L):.1f}" '
                 f'y2="{cy - math.cos(t) * (R - 6 - L):.1f}" stroke="{INK}" stroke-width="{w}" stroke-linecap="round"/>')
for n in range(1, 13):
    t = math.radians(n * 30)
    parts.append(text(f'{cx + math.sin(t) * (R - 44):.1f}', f'{cy - math.cos(t) * (R - 44) + 12:.1f}', str(n), size=34, weight=700))


def hand(deg, L, w, col):
    t = math.radians(deg)
    x, y = cx + math.sin(t) * L, cy - math.cos(t) * L
    return (f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" stroke="{INK}" stroke-width="{w + 5}" stroke-linecap="round"/>'
            f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" stroke="{col}" stroke-width="{w}" stroke-linecap="round"/>')


parts.append(hand(7.5 * 30, 62, 10, BLUE))     # kim giờ: 7 giờ 30
parts.append(hand(180, 92, 6, BLUE))           # kim phút: 30 phút — dừng trước vòng số, không che số 6
parts.append(f'<circle cx="{cx}" cy="{cy}" r="10" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')

save('bai7t2_ex2_clock', W, H, parts, folder='grade3-workbook')
