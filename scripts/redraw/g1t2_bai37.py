"""
Vở BT Toán 1 Tập hai (KNTT), Bài 37 Luyện tập chung (trang 85–88): nét riêng.
Giữ nội dung toán: bốn tranh hoạt động và bốn đồng hồ (6, 7, 9, 11 giờ), đồng hồ 8 giờ và 12 giờ,
sáu thí sinh chim (để tô màu), lời nói "Ngày mai là ngày 29 và là thứ Bảy...", bốn ti vi
và đồng hồ 7, 10, 8, 9 giờ.
  python scripts/redraw/g1t2_bai37.py
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1t2_e import *
from kit_l1t2_e import place as put, st as stk
import kit_g3 as g3

# ── Tiết 1, câu 1: bốn tranh (tập thể dục, vào lớp, ra chơi, ăn trưa) ───────
PW, PH = 300, 196


def pic(name, inner, bg='#EAF6FF'):
    save(f'bai37_t1_q1_{name}', PW + 4, PH + 4, [panel(2, 2, PW, PH, inner, bg=bg)], folder=F)


x, y = 2, 2
pic('exercise', ground(x, y + 140, PW, 70, '#D9EFC8') + g3.bush(x + 40, y + 150, 70) + g3.bush(x + 262, y + 150, 70)
    + put(x + 150, y + 190, .5, g3.person('bob', '#fff', '#4E8FC8', 'shorts', 'smile', 0,
                                          arms=((-40, -330), (90, -150)), sleeve='short')))
g = [f'<rect x="{x + 150}" y="{y + 10}" width="130" height="80" rx="4" fill="#fff" {stk(2.4)}/>',
     text(x + 230, y + 34, '25', size=18, weight=700) + text(x + 186, y + 50, '+', size=18, weight=700)
     + text(x + 230, y + 56, '43', size=18, weight=700) + f'<line x1="{x + 196}" y1="{y + 62}" x2="{x + 252}" y2="{y + 62}" {stk(2)}/>'
     + text(x + 230, y + 82, '68', size=18, weight=700),
     put(x + 100, y + 176, .33, g3.person('ponytail', '#fff', '#7CC6E8', 'skirt', 'open', 8, adult=True, arms=((80, -340), (-60, -200))))]
for k, (hair, shirt) in enumerate((('pigtails', PINK), ('short', BLUE), ('ponytail', YELLOW), ('bob', GREEN))):
    g.append(put(x + 50 + k * 70, y + 214, .36, g3.bust(hair, shirt, 'smile', 0)))
g.append(f'<rect x="{x}" y="{y + 186}" width="{PW}" height="12" fill="#E9C48F"/>')
pic('class', ''.join(g), '#FFF6E5')
pic('play', ground(x, y + 130, PW, 80, '#CFE9B5') + g3.tree(x + 240, y + 120, 90, '#8FD08A') + g3.building(x + 200, y + 116, 90, 50, '#FFE8C7')
    + ''.join(put(x + 60 + k * 70, y + 190, .36, g3.person(h, c, None, 'shorts', 'laugh', 6, arms=((-60, -170), (80, -230)), legs='run'))
              for k, (h, c) in enumerate((('short', BLUE), ('spiky', '#fff'), ('bob', PINK)))))
g = [f'<rect x="{x}" y="{y}" width="{PW}" height="{PH}" fill="#FFF6E5"/>']
for k, (hair, shirt) in enumerate((('pigtails', PINK), ('short', BLUE), ('ponytail', YELLOW), ('bob', '#7CC6E8'))):
    g.append(put(x + 60 + k * 60, y + 150 + (k % 2) * 6, .4, g3.bust(hair, shirt, 'laugh', 0)))
g.append(f'<path d="M{x + 40},{y + 140} L{x + 260},{y + 140} L{x + 270},{y + 160} L{x + 30},{y + 160} Z" fill="#5C7A99" {stk()}/>'
         f'<rect x="{x + 50}" y="{y + 160}" width="10" height="34" fill="#5C7A99" {stk(2)}/><rect x="{x + 240}" y="{y + 160}" width="10" height="34" fill="#5C7A99" {stk(2)}/>')
for bx in (x + 90, x + 150, x + 210):
    g.append(g3.bowl(bx, y + 140, 30, '#fff', '#fff'))
pic('lunch', ''.join(g), '#FFF6E5')

# ── Tiết 1, câu 2: hai đồng hồ (8 giờ, 12 giờ) ──────────────────────────────
save('bai37_t1_q2_clocks', 520, 200, [bclock(130, 98, 90, 8), bclock(390, 98, 90, 12)], folder=F)


# ── Tiết 1, câu 3: sáu thí sinh chim ────────────────────────────────────────
def bird(kind, color=True):
    """chim trong khung ~200 × 170, chân chạm y=160"""
    W_ = '#fff'
    c = (lambda col: col if color else W_)
    s = []
    if kind == 'rooster':
        for k, col in enumerate((GREEN, '#2E9BD6', GREEN)):
            s.append(f'<path d="M110,90 Q{150 + k * 10},{20 + k * 14} {182 - k * 4},{70 + k * 16} Q{160 - k * 4},{70 + k * 10} 120,{104 + k * 4} Z" fill="{c(col)}" {stk(2.4)}/>')
        s.append(f'<path d="M80,154 l0,-36 M104,154 l0,-36 M70,158 l12,-4 l12,4 M94,158 l12,-4 l12,4" fill="none" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round"/>')
        s.append(f'<ellipse cx="92" cy="100" rx="42" ry="30" fill="{c(ORANGE)}" {stk()}/>')
        s.append(f'<path d="M84,94 Q104,84 120,100 Q104,116 84,106 Z" fill="{c("#D9803A")}" {stk(2)}/>')
        s.append(f'<path d="M60,90 Q48,60 56,40 L74,44 Q72,70 84,84 Z" fill="{c(ORANGE)}" {stk()}/>')
        s.append(f'<circle cx="62" cy="40" r="17" fill="{c(ORANGE)}" {stk()}/>')
        s.append(f'<path d="M50,26 q2,-14 10,-6 q4,-14 10,-2 q8,-8 8,6 Z" fill="{c(RED)}" {stk(2)}/>')
        s.append(f'<path d="M46,40 L32,44 L46,48 Z" fill="{c(YELLOW)}" {stk(2)}/><path d="M48,52 q-4,12 4,12 q4,-4 0,-12 Z" fill="{c(RED)}" {stk(1.8)}/>' + eye(58, 37, 3.4))
    elif kind == 'wren':
        s.append(f'<path d="M86,160 L80,138 L120,138 L128,160 Z" fill="{c("#E9C48F")}" {stk(2.4)}/>')
        s.append(f'<path d="M126,96 Q150,40 160,24 Q166,30 140,104 Z" fill="{c("#2E9BD6")}" {stk(2.4)}/>')
        s.append(f'<path d="M96,140 l-4,-16 M108,140 l2,-16" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
        s.append(f'<ellipse cx="104" cy="104" rx="36" ry="24" fill="{c("#2E9BD6")}" {stk()}/>')
        s.append(f'<path d="M80,110 Q100,128 128,108 Q110,120 84,104 Z" fill="{c("#CFEFFB")}" {stk(2)}/>')
        s.append(f'<circle cx="76" cy="80" r="20" fill="{c("#2E9BD6")}" {stk()}/>')
        s.append(f'<path d="M58,78 L44,82 L58,86 Z" fill="{c(INK) if color else W_}" {stk(2)}/>' + eye(72, 76, 3.6))
    elif kind == 'eagle':
        for sg in (-1, 1):
            s.append(f'<path d="M{100 + sg * 8},84 Q{100 + sg * 50},30 {100 + sg * 96},18 Q{100 + sg * 84},40 {100 + sg * 92},50 Q{100 + sg * 70},60 {100 + sg * 74},70 '
                     f'Q{100 + sg * 50},76 {100 + sg * 8},100 Z" fill="{c("#8A6A4F")}" {stk()}/>')
        s.append(f'<path d="M72,100 Q48,104 40,118 Q62,118 74,110 Z" fill="{c("#8A6A4F")}" {stk()}/>')
        s.append(f'<ellipse cx="100" cy="98" rx="34" ry="18" fill="{c("#8A6A4F")}" {stk()}/>')
        s.append(f'<circle cx="134" cy="86" r="16" fill="#fff" {stk()}/><path d="M148,82 Q164,84 160,96 Q154,92 148,94 Z" fill="{c(YELLOW)}" {stk(2.2)}/>' + eye(138, 83, 3.4))
    elif kind == 'hoopoe':
        s.append(f'<path d="M110,110 Q150,130 190,150 Q160,150 108,124 Z" fill="{c(INK) if color else W_}" {stk(2.4)}/>')
        s.append(f'<path d="M86,158 l2,-26 M100,158 l0,-26" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
        s.append(f'<ellipse cx="96" cy="112" rx="34" ry="22" fill="{c("#F4A259")}" {stk()}/>')
        for k in range(4):
            s.append(f'<path d="M{96 + k * 8},{100 + k * 2} l10,18" stroke="{INK}" stroke-width="{4 if color else 2}" stroke-linecap="round"/>')
        for k in range(6):
            a = math.radians(-150 + k * 22)
            s.append(f'<path d="M70,72 L{70 + 34 * math.cos(a):.1f},{72 + 34 * math.sin(a):.1f}" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>'
                     f'<path d="M70,72 L{70 + 30 * math.cos(a):.1f},{72 + 30 * math.sin(a):.1f}" stroke="{c("#F4A259")}" stroke-width="6" stroke-linecap="round"/>')
        s.append(f'<circle cx="70" cy="84" r="17" fill="{c("#F4A259")}" {stk()}/>')
        s.append(f'<path d="M56,84 Q30,92 12,104 Q32,94 56,90 Z" fill="{c(INK) if color else W_}" {stk(2)}/>' + eye(66, 81, 3.4))
    elif kind == 'pelican':
        s.append(f'<path d="M40,160 Q100,150 170,160" fill="none" stroke="{SKY_D}" stroke-width="4" stroke-linecap="round"/>')
        s.append(f'<path d="M96,156 l0,-26 M112,156 l0,-26 M86,160 l10,-4 l10,4 M102,160 l10,-4 l10,4" fill="none" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round"/>')
        s.append(f'<ellipse cx="108" cy="108" rx="40" ry="30" fill="{c("#E8ECF0")}" {stk()}/>')
        s.append(f'<path d="M110,92 Q140,96 146,124 Q124,116 108,112 Z" fill="{c(GREY)}" {stk(2.2)}/>')
        s.append(f'<path d="M84,92 Q74,60 80,40" fill="none" stroke="{INK}" stroke-width="22" stroke-linecap="round"/><path d="M84,92 Q74,60 80,40" fill="none" stroke="{c("#E8ECF0")}" stroke-width="16" stroke-linecap="round"/>')
        s.append(f'<circle cx="84" cy="34" r="17" fill="{c("#E8ECF0")}" {stk()}/>')
        s.append(f'<path d="M96,28 L150,46 Q130,52 98,42 Z" fill="{c(YELLOW)}" {stk(2.2)}/><path d="M98,42 Q130,52 150,46 Q130,76 104,58 Z" fill="{c(ORANGE)}" {stk(2.2)}/>' + eye(84, 30, 3.4))
    elif kind == 'jay':
        s.append(f'<path d="M40,130 Q110,120 180,98" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round"/><path d="M40,130 Q110,120 180,98" fill="none" stroke="{c(BROWN)}" stroke-width="5" stroke-linecap="round"/>')
        for (lx, ly) in ((160, 86), (176, 108), (60, 116)):
            s.append(f'<ellipse cx="{lx}" cy="{ly}" rx="10" ry="6" fill="{c(GREEN)}" {stk(2)} transform="rotate(-30 {lx} {ly})"/>')
        s.append(f'<path d="M96,124 Q92,150 100,166 Q110,150 108,124 Z" fill="{c("#2E9BD6")}" {stk(2.4)}/>')
        s.append(f'<ellipse cx="100" cy="94" rx="26" ry="38" fill="{c("#2E9BD6")}" {stk()}/>')
        s.append(f'<path d="M86,84 Q84,112 100,126 Q90,104 96,82 Z" fill="#fff" {stk(2)}/>')
        s.append(f'<path d="M92,40 L98,20 L108,40 Z" fill="{c("#2E9BD6")}" {stk(2.4)}/>')
        s.append(f'<circle cx="100" cy="50" r="19" fill="{c("#2E9BD6")}" {stk()}/><path d="M116,48 L132,52 L116,58 Z" fill="{c(INK) if color else W_}" {stk(2)}/>' + eye(106, 46, 3.4))
    return ''.join(s)


BIRDS = ('rooster', 'wren', 'eagle', 'hoopoe', 'pelican', 'jay')
for b in BIRDS:
    save(f'bai37_t1_q3_bird_{b}', 200, 170, [bird(b)], folder=F)
W, H = 660, 360
p = []
for i, b in enumerate(('wren', 'hoopoe', 'eagle', 'rooster', 'pelican', 'jay')):
    p.append(put(10 + (i % 3) * 220, 8 + (i // 3) * 180, 1, bird(b, color=False)))
save('bai37_t1_q3_outline', W, H, p, folder=F)


# ── Tiết 2, câu 2: các bạn đi học về ────────────────────────────────────────
W, H = 700, 300
g = [ground(0, 200, W, 100, '#CFE9B5'), f'<path d="M0,300 Q300,230 700,250 L700,300 Z" fill="#DDE6EE"/>',
     g3.tree(40, 200, 140, '#8FD08A'), g3.tree(600, 190, 120, '#8FD08A'),
     f'<path d="M560,80 L610,40 L660,80 Z" fill="{RED}" {stk()}/><rect x="570" y="80" width="80" height="60" fill="{CREAM}" {stk()}/><rect x="600" y="104" width="20" height="36" fill="{BROWN}" {stk(2)}/>']
bag = f'<rect x="-66" y="-250" width="40" height="70" rx="10" fill="{ORANGE}" {stk()}/>'
g.append(put(250, 292, .62, g3.person('pigtails', '#fff', '#7CC6E8', 'skirt', 'open', 10, arms=((-90, -150), (90, -150)), shoe=BLUE)))
g.append(put(380, 292, .6, g3.person('short', '#7CC6E8', None, 'shorts', 'smile', -8, arms=((-60, -150), (40, -250)), extra_back=bag)))
g.append(put(480, 292, .56, g3.person('short', BLUE, None, 'shorts', 'smile', 6, arms=((-50, -130), (60, -130)), legs='walk', extra_back=bag)))
g.append(put(570, 292, .52, g3.person('bob', '#fff', '#7CC6E8', 'skirt', 'smile', 6, arms=((-50, -130), (60, -130)), legs='walk')))
g.append(bubble(360, 70, 300, 104, ['Ngày mai là ngày 29', 'và là thứ Bảy nên chúng ta', 'nghỉ học.'], tail=(268, 140), size=19))
save('bai37_t2_q2_kids', W, H, [panel(2, 2, W - 4, H - 4, ''.join(g), bg='#E6F4FD', border='none', r=4)], folder=F)


# ── Tiết 2, câu 3: bốn ti vi và đồng hồ (7, 10, 8, 9 giờ) ───────────────────
def tv(x, y, w, h, inner, letter, hour):
    s = [f'<path d="M{x + w / 2 - 70},{y + h + 26} L{x + w / 2 - 40},{y + h} L{x + w / 2 + 40},{y + h} L{x + w / 2 + 70},{y + h + 26}" fill="none" stroke="{LINE}" stroke-width="9" stroke-linecap="round"/>',
         f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{LINE}" {stk(2.4)}/>',
         panel(x + 10, y + 10, w - 20, h - 20, inner, bg='#EAF6FF', border=INK, r=3),
         badge(x + 30, y + h - 32, letter, 14), bclock(x + w - 52, y + 6, 40, hour)]
    return ''.join(s)


W, H = 700, 546
TW, TH = 330, 200
p = []
# a) du lịch: núi đá giữa vịnh
x, y = 6, 50
inner = (f'<rect x="{x}" y="{y + 120}" width="{TW}" height="100" fill="{WATER_D}"/>'
         + ''.join(f'<path d="M{x + cx - 30},{y + 140} Q{x + cx - 34},{y + 60} {x + cx},{y + 50 + k * 6} Q{x + cx + 36},{y + 60} {x + cx + 30},{y + 140} Z" fill="#8FB59A" {stk(2.4)}/>'
                   for k, cx in enumerate((80, 170, 250)))
         + ''.join(f'<path d="M{x + 30 + k * 60},{y + 160} q14,-6 28,0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' for k in range(5)))
p.append(tv(x, y, TW, TH, inner, 'a', 7))
# b) thiếu nhi: các bạn gà con hoạt hình
x = 364
inner = f'<rect x="{x}" y="{y + 150}" width="{TW}" height="80" fill="#E9C48F"/>'
import kit_l1_a
inner += ''.join(kit_l1_a.chick(x + 60 + k * 70, y + 176, 1.0 + (k % 2) * .1) for k in range(4))
p.append(tv(x, y, TW, TH, inner, 'b', 10))
# c) ca nhạc: sân khấu, ca sĩ, khán giả
x, y = 6, 310
inner = (f'<path d="M{x + 60},{y + 10} L{x + 20},{y + 170} M{x + 270},{y + 10} L{x + 310},{y + 170}" stroke="{YELLOW}" stroke-width="22" opacity=".5"/>'
         + put(x + 120, y + 170, .4, g3.person('pigtails', PURPLE, None, 'dress', 'open', 0, arms=((-50, -250), (70, -280))))
         + put(x + 220, y + 170, .4, g3.person('spiky', RED, None, 'pants', 'laugh', 0, arms=((-60, -150), (60, -160))))
         + f'<path d="M{x + 186},{y + 116} l40,-10 l4,14 l-40,10 Z" fill="{ORANGE}" {stk(2)}/>'
         + ''.join(f'<circle cx="{x + 20 + k * 34}" cy="{y + 176 + (k % 2) * 6}" r="18" fill="#5C7A99"/>' for k in range(10)))
p.append(tv(x, y, TW, TH, inner, 'c', 8))
# d) thể thao: đá bóng
x = 364
inner = (f'<rect x="{x}" y="{y + 90}" width="{TW}" height="140" fill="#CFE9B5"/>'
         f'<path d="M{x + 60},{y + 110} L{x + 60},{y + 40} L{x + 240},{y + 40} L{x + 240},{y + 110}" fill="none" stroke="#fff" stroke-width="7"/>'
         + ''.join(f'<line x1="{x + 70 + k * 20}" y1="{y + 44}" x2="{x + 70 + k * 20}" y2="{y + 108}" stroke="#fff" stroke-width="1.5"/>' for k in range(9))
         + put(x + 120, y + 180, .36, g3.person('short', RED, None, 'shorts', 'open', 0, arms=((-60, -150), (60, -170)), legs='run'))
         + put(x + 220, y + 180, .36, g3.person('spiky', BLUE, None, 'shorts', 'open', 0, arms=((-60, -150), (60, -170)), legs='run'), flip=True)
         + f'<circle cx="{x + 170}" cy="{y + 170}" r="10" fill="#fff" {stk(2.4)}/>')
p.append(tv(x, y, TW, TH, inner, 'd', 9))
save('bai37_t2_q3_tv', W, H, p, folder=F)
