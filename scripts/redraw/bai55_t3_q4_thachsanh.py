"""
Vở BT Toán 2, Bài 55 Tiết 3 Q4 — Thạch Sanh đi cứu công chúa: nét riêng.
Giữ nội dung toán: đường đi gồm 3 chặng theo thứ tự — qua khu rừng 20 km, qua dãy núi
15 km (đường vòng qua núi), leo vách đá 3 km lên tới hang đại bàng. Nhãn "20 km",
"15 km", "3 km" giữ đúng.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 900, 329
parts = []
parts.append(f'<rect width="{W}" height="{H}" fill="{WHITE}"/>')
parts.append(f'<path d="M0,300 C200,292 500,280 900,284 L900,{H} L0,{H} Z" fill="{GRASS}" {st(2.4)}/>')

# ── mountains (behind), cliff
MT, MT_D = '#A8A3C9', '#8A84B3'
parts.append(f'<path d="M398,290 L398,190 C410,120 440,40 474,40 C500,40 512,90 520,110 C528,60 552,24 580,26 '
             f'C612,28 620,80 626,110 C640,70 670,90 676,140 C688,200 690,250 696,290 Z" fill="{MT_D}" {st(3)}/>')
parts.append(f'<path d="M398,290 C420,230 450,190 486,196 C516,200 520,236 548,236 C580,236 590,196 626,206 '
             f'C660,216 680,262 700,290 Z" fill="{MT}" {st(3)}/>')
# cliff with the cave
parts.append(f'<path d="M708,300 C712,220 716,150 722,96 L744,86 L780,92 L800,84 L846,92 C850,160 860,240 880,300 Z" fill="#9C8B7A" {st(3)}/>')
parts.append(f'<path d="M730,110 L736,280 M822,104 L836,280" stroke="#7F6F60" stroke-width="3" stroke-linecap="round"/>')
parts.append(f'<ellipse cx="790" cy="178" rx="36" ry="48" fill="#3E3A4A" {st(3)}/>')

# ── path: forest 20 km, mountain arc 15 km, climb 3 km
parts.append(f'<path d="M86,312 C200,300 300,290 404,282" fill="none" stroke="{INK}" stroke-width="22" stroke-linecap="round"/>')
parts.append(f'<path d="M86,312 C200,300 300,290 404,282" fill="none" stroke="#C8C2B8" stroke-width="16" stroke-linecap="round"/>')
arc = 'M404,282 C420,150 470,96 540,96 C616,96 650,170 676,262'
parts.append(f'<path d="{arc}" fill="none" stroke="{INK}" stroke-width="38" stroke-linecap="round"/>')
parts.append(f'<path d="{arc}" fill="none" stroke="#F4F1EA" stroke-width="32" stroke-linecap="round"/>')
climb = 'M676,262 C700,272 740,262 766,212'
parts.append(f'<path d="{climb}" fill="none" stroke="{INK}" stroke-width="22" stroke-linecap="round"/>')
parts.append(f'<path d="{climb}" fill="none" stroke="{SKY_D}" stroke-width="16" stroke-linecap="round"/>')

# ── forest (in front of the path's far side)
for x, y, s in ((150, 250, .9), (236, 236, .95), (322, 232, .9), (120, 318, .95), (212, 312, 1.0), (300, 300, .95), (370, 250, .85)):
    parts.append(tree(x, y, s, crown=GREEN))

# labels
parts.append(text(262, 322, '20 km', size=24, weight=700, extra=f' stroke="{WHITE}" stroke-width="6" paint-order="stroke"'))
parts.append(text(540, 105, '15 km', size=24, weight=700))
parts.append(text(716, 240, '3 km', size=22, weight=700, anchor='end', extra=f' stroke="{WHITE}" stroke-width="6" paint-order="stroke"'))


# ── eagle perched on the cliff top
def eagle(x, y):
    b, w = '#6B4A34', WHITE
    s = [f'<path d="M{x - 10},{y - 30} C{x - 60},{y - 70} {x - 90},{y - 64} {x - 104},{y - 40} C{x - 70},{y - 40} {x - 40},{y - 20} {x - 16},{y - 8} Z" fill="{b}" {st(2.6)}/>',
         f'<path d="M{x + 10},{y - 30} C{x + 60},{y - 70} {x + 90},{y - 64} {x + 104},{y - 40} C{x + 70},{y - 40} {x + 40},{y - 20} {x + 16},{y - 8} Z" fill="{b}" {st(2.6)}/>',
         f'<ellipse cx="{x}" cy="{y - 18}" rx="20" ry="26" fill="{b}" {st(2.6)}/>',
         f'<circle cx="{x}" cy="{y - 48}" r="15" fill="{w}" {st(2.6)}/>',
         f'<path d="M{x + 8},{y - 50} L{x + 24},{y - 44} L{x + 10},{y - 40} Z" fill="{YELLOW}" {st(2)}/>',
         f'<circle cx="{x + 4}" cy="{y - 52}" r="2.6" fill="{INK}"/>',
         f'<path d="M{x - 8},{y + 6} l-4,6 M{x + 8},{y + 6} l4,6" stroke="{ORANGE}" stroke-width="4" stroke-linecap="round"/>']
    return '\n'.join(s)


parts.append(eagle(786, 84))


# ── Thạch Sanh with a bow (own simple figure)
def hero(x, y):
    s = [f'<path d="M{x - 12},{y} L{x - 8},{y - 34} M{x + 10},{y} L{x + 6},{y - 34}" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>',
         f'<path d="M{x - 16},{y - 30} L{x - 12},{y - 70} L{x + 12},{y - 70} L{x + 16},{y - 30} Z" fill="{TEAL}" {st(2.6)}/>',
         f'<rect x="{x - 14}" y="{y - 46}" width="28" height="6" fill="{RED}" {st(1.6)}/>',
         f'<path d="M{x + 10},{y - 64} L{x + 40},{y - 76}" stroke="{SKIN_D}" stroke-width="7" stroke-linecap="round"/>',
         f'<path d="M{x + 40},{y - 110} C{x + 58},{y - 90} {x + 58},{y - 60} {x + 40},{y - 42}" fill="none" stroke="{BROWN}" stroke-width="4" stroke-linecap="round"/>',
         f'<line x1="{x + 40}" y1="{y - 110}" x2="{x + 40}" y2="{y - 42}" stroke="{INK}" stroke-width="1.4"/>',
         f'<circle cx="{x}" cy="{y - 84}" r="14" fill="{SKIN}" {st(2.6)}/>',
         f'<path d="M{x - 14},{y - 88} C{x - 14},{y - 104} {x + 14},{y - 104} {x + 14},{y - 90} C{x + 4},{y - 94} {x - 6},{y - 94} {x - 14},{y - 88} Z" fill="{HAIR}" {st(2)}/>',
         f'<circle cx="{x + 5}" cy="{y - 84}" r="2.2" fill="{INK}"/>']
    return '\n'.join(s)


parts.append(hero(44, 316))
save('bai55_t3_q4_thachsanh', W, H, parts)
