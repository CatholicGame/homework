"""Vở BT Toán 3, Bài 34 Tiết 2 Q2 — xe đạp trẻ em (để nối với 20 kg). Nét riêng."""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 600, 420
parts = []
FR = TEAL
rw = 92
L, R = (125, 300), (470, 300)


def wheel(cx, cy):
    s = [f'<circle cx="{cx}" cy="{cy}" r="{rw}" fill="none" stroke="{INK}" stroke-width="16"/>',
         f'<circle cx="{cx}" cy="{cy}" r="{rw}" fill="none" stroke="#5B5560" stroke-width="10"/>',
         f'<circle cx="{cx}" cy="{cy}" r="{rw - 12}" fill="#fff" stroke="{INK}" stroke-width="3"/>']
    for i in range(8):
        t = math.radians(i * 22.5)
        s.append(f'<line x1="{cx - math.cos(t) * (rw - 12):.1f}" y1="{cy - math.sin(t) * (rw - 12):.1f}" x2="{cx + math.cos(t) * (rw - 12):.1f}" '
                 f'y2="{cy + math.sin(t) * (rw - 12):.1f}" stroke="{GREY}" stroke-width="2"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="10" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
    return ''.join(s)


parts.append(wheel(*L))
parts.append(wheel(*R))
# chắn bùn
for (cx, cy), a0, a1 in ((L, 200, 300), (R, 230, 330)):
    x1, y1 = cx + (rw + 14) * math.cos(math.radians(a0)), cy + (rw + 14) * math.sin(math.radians(a0))
    x2, y2 = cx + (rw + 14) * math.cos(math.radians(a1)), cy + (rw + 14) * math.sin(math.radians(a1))
    parts.append(f'<path d="M{x1:.1f},{y1:.1f} A{rw + 14},{rw + 14} 0 0 1 {x2:.1f},{y2:.1f}" fill="none" stroke="{INK}" stroke-width="13" stroke-linecap="round"/>'
                 f'<path d="M{x1:.1f},{y1:.1f} A{rw + 14},{rw + 14} 0 0 1 {x2:.1f},{y2:.1f}" fill="none" stroke="{PINK}" stroke-width="7" stroke-linecap="round"/>')
crank = (285, 305)
seat_t = (225, 150)
head = (405, 120)


def tube(a, b, w=12, col=FR):
    return (f'<line x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}" stroke="{INK}" stroke-width="{w + 6}" stroke-linecap="round"/>'
            f'<line x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}" stroke="{col}" stroke-width="{w}" stroke-linecap="round"/>')


parts.append(tube(L, crank, 8))
parts.append(tube(L, seat_t, 8))
parts.append(tube(crank, seat_t))
parts.append(f'<path d="M{crank[0]},{crank[1]} Q350,240 427,178" fill="none" stroke="{INK}" stroke-width="18" stroke-linecap="round"/>'
             f'<path d="M{crank[0]},{crank[1]} Q350,240 427,178" fill="none" stroke="{FR}" stroke-width="12" stroke-linecap="round"/>')
parts.append(tube(R, head, 10))
# yên
parts.append(tube(seat_t, (215, 118), 7, GREY))
parts.append(f'<path d="M168,112 Q190,96 250,104 Q262,110 250,122 Q210,126 172,124 Q160,120 168,112 Z" fill="{PURPLE}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
# ghi đông
parts.append(tube(head, (395, 70), 7, GREY))
parts.append(f'<path d="M395,70 Q380,52 350,58" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>'
             f'<path d="M350,58 L338,60" stroke="{INK}" stroke-width="14" stroke-linecap="round"/><path d="M350,58 L338,60" stroke="{PINK}" stroke-width="8" stroke-linecap="round"/>')
# giỏ
parts.append(tube((412, 132), (446, 132), 6, GREY))
parts.append(f'<path d="M420,86 H560 L548,168 H438 Z" fill="{YELLOW}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
for x in (455, 478, 501, 524):
    parts.append(f'<line x1="{x}" y1="88" x2="{x - 3}" y2="166" stroke="{INK}" stroke-width="2" opacity=".5"/>')
parts.append(f'<line x1="428" y1="126" x2="554" y2="126" stroke="{INK}" stroke-width="2" opacity=".5"/>')
parts.append(f'<rect x="414" y="80" width="152" height="12" rx="6" fill="{ORANGE}" stroke="{INK}" stroke-width="3"/>')
# đĩa xích + bàn đạp
parts.append(f'<line x1="{crank[0]}" y1="{crank[1]}" x2="{L[0]}" y2="{L[1]}" stroke="{INK}" stroke-width="3" opacity=".6"/>')
parts.append(f'<circle cx="{crank[0]}" cy="{crank[1]}" r="24" fill="{GREY_L}" stroke="{INK}" stroke-width="3.5"/>'
             f'<circle cx="{crank[0]}" cy="{crank[1]}" r="8" fill="{GREY}" stroke="{INK}" stroke-width="2.5"/>')
parts.append(tube(crank, (305, 345), 6, GREY))
parts.append(f'<rect x="290" y="340" width="34" height="11" rx="4" fill="{INK}"/>')

save('bai34_t2_q2_bike', W, H, parts, folder='grade3-workbook')
