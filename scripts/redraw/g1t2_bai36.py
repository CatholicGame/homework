"""
Vở BT Toán 1 Tập hai (KNTT), Bài 36 Thực hành xem lịch và giờ (trang 81–84): nét riêng.
Giữ nội dung toán: thứ và ngày của ổ rơm / gà mẹ, hôm qua / hôm nay / ngày mai và ngày 23, 24, 25,
tờ lịch tháng 5 (9 thứ Hai, 13), giờ trên đồng hồ của từng tranh (8, 9, 10, 12 giờ; tàu 7, 8, 10 giờ;
vườn bách thú 8, 10 giờ).
  python scripts/redraw/g1t2_bai36.py
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1t2_e import *
from kit_l1t2_e import place as put, st as stk
import kit_g1, kit_g3 as g3, kit_l1_29, kit_p2

HEN, HEN_W = '#B8E5FC', '#7CC6E8'


# ── Tiết 1, câu 1: ổ rơm (thứ) – gà mẹ (ngày) ───────────────────────────────
def nest(cx, by, w=200, eggs=4, label=''):
    s = [f'<path d="M{cx - w / 2},{by - 40} Q{cx},{by - 64} {cx + w / 2},{by - 40} Q{cx + w / 2 + 6},{by - 6} {cx},{by} Q{cx - w / 2 - 6},{by - 6} {cx - w / 2},{by - 40} Z" fill="#E9C48F" {stk()}/>']
    for i in range(eggs):
        ex = cx - (eggs - 1) * 17 + i * 34
        s.append(f'<ellipse cx="{ex}" cy="{by - 50}" rx="15" ry="19" fill="#fff" {stk(2.4)}/>')
    s.append(f'<path d="M{cx - w / 2},{by - 40} Q{cx},{by - 22} {cx + w / 2},{by - 40} Q{cx + w / 2 + 6},{by - 6} {cx},{by} Q{cx - w / 2 - 6},{by - 6} {cx - w / 2},{by - 40} Z" fill="#E9C48F" {stk()}/>')
    for k in range(9):
        x = cx - w / 2 + 14 + k * (w - 28) / 8
        s.append(f'<path d="M{x},{by - 34} q8,10 18,4 M{x - 6},{by - 18} q10,6 18,-2" fill="none" stroke="#C99A5B" stroke-width="2.4" stroke-linecap="round"/>')
    if label:
        s.append(f'<path d="M{cx - 62},{by - 14} L{cx + 62},{by - 14} L{cx + 54},{by + 12} L{cx - 54},{by + 12} Z" fill="#fff" {stk(2.2)}/>')
        s.append(text(cx, by + 6, label, size=19, weight=600))
    return ''.join(s)


def hen_tag(cx, cy, label, size=20):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="46" ry="15" fill="#fff" {stk(2)}/>' + text(cx, cy + 7, label, size=size, weight=700)


for key, lab in (('ba', 'Thứ Ba'), ('tu', 'Thứ Tư'), ('nam', 'Thứ Năm'), ('sau', 'Thứ Sáu')):
    W, H = 220, 170
    p = []
    if key == 'nam':
        p.append(nest(110, 150, 200, 0, ''))
        p.append(kit_g1.hen(116, 140, 130, HEN, HEN_W))
        p.append(nest(110, 150, 200, 0, ''))
        p.append(hen_tag(122, 90, 'Ngày 21'))
        p.append(f'<path d="M{110 - 62},{136} L{110 + 62},{136} L{110 + 54},{162} L{110 - 54},{162} Z" fill="#fff" {stk(2.2)}/>' + text(110, 156, lab, size=19, weight=600))
    else:
        p.append(nest(110, 150, 200, 4, lab))
    save(f'bai36_t1_q1_nest_{key}', W, H, p, folder=F)
for day in (20, 19, 22):
    W, H = 200, 170
    p = [f'<path d="M30,160 q20,-14 30,0 q16,-16 30,0 q16,-14 30,0 q16,-16 34,0" fill="none" stroke="{GRASS_D}" stroke-width="3" stroke-linecap="round"/>',
         kit_g1.hen(104, 158, 150, HEN, HEN_W), hen_tag(112, 102, f'Ngày {day}')]
    save(f'bai36_t1_q1_hen_{day}', W, H, p, folder=F)


# ── Tiết 1, câu 2: thỏ (hôm qua / ngày mai / hôm nay) – cà rốt (ngày 23, 24, 25) ─
def bunny(label, rot):
    c = '#B8E5FC'
    s = [f'<ellipse cx="-22" cy="-150" rx="15" ry="42" fill="{c}" {stk()} transform="rotate(-14 -22 -150)"/>',
         f'<ellipse cx="24" cy="-150" rx="15" ry="42" fill="{c}" {stk()} transform="rotate(16 24 -150)"/>',
         f'<ellipse cx="-22" cy="-150" rx="6" ry="28" fill="{PINK}" transform="rotate(-14 -22 -150)"/>',
         f'<ellipse cx="24" cy="-150" rx="6" ry="28" fill="{PINK}" transform="rotate(16 24 -150)"/>',
         f'<ellipse cx="0" cy="-40" rx="44" ry="42" fill="{c}" {stk()}/>',
         f'<ellipse cx="-26" cy="-4" rx="20" ry="11" fill="{c}" {stk()}/><ellipse cx="26" cy="-4" rx="20" ry="11" fill="{c}" {stk()}/>',
         f'<circle cx="0" cy="-96" r="40" fill="{c}" {stk()}/>', eye(-15, -100, 6), eye(15, -100, 6),
         f'<ellipse cx="0" cy="-86" rx="5" ry="4" fill="{PINK}" {stk(1.6)}/><path d="M-8,-78 q8,8 16,0" fill="none" {stk(2.2)}/>',
         f'<ellipse cx="-26" cy="-84" rx="7" ry="4" fill="{PINK}" opacity=".7"/><ellipse cx="26" cy="-84" rx="7" ry="4" fill="{PINK}" opacity=".7"/>',
         f'<g transform="rotate({rot} 0 -46)"><rect x="-62" y="-60" width="124" height="30" rx="7" fill="#fff" {stk(2.4)}/>'
         + text(0, -38, label, size=20, weight=600) + '</g>',
         f'<circle cx="-50" cy="-48" r="11" fill="{c}" {stk(2.4)}/><circle cx="50" cy="-48" r="11" fill="{c}" {stk(2.4)}/>']
    return ''.join(s)


def carrot_card(label):
    W, H = 240, 110
    s = [f'<path d="M190,40 q22,-30 40,-24 M190,46 q30,-6 44,8 M188,52 q22,14 26,36" fill="none" stroke="{GRASS_D}" stroke-width="7" stroke-linecap="round"/>',
         f'<path d="M190,22 Q206,52 190,82 Q120,96 12,62 Q100,24 190,22 Z" fill="{ORANGE}" {stk()}/>']
    for k in range(5):
        x = 60 + k * 26
        s.append(f'<path d="M{x},{48 + k * 2} l10,4 M{x + 6},{70 - k} l10,-3" stroke="#D9803A" stroke-width="2.4" stroke-linecap="round"/>')
    s.append(f'<rect x="58" y="40" width="112" height="34" rx="8" fill="#fff" {stk(2.2)}/>' + text(114, 64, label, size=20, weight=600))
    return W, H, s


for key, lab, rot in (('homqua', 'Hôm qua', -14), ('ngaymai', 'Ngày mai', 22), ('homnay', 'Hôm nay', 8)):
    save(f'bai36_t1_q2_rabbit_{key}', 200, 220, [put(100, 212, 1, bunny(lab, rot))], folder=F)
for d in (23, 24, 25):
    save(f'bai36_t1_q2_carrot_{d}', *carrot_card(f'Ngày {d}'), folder=F)


# ── Tiết 1, câu 4: rô-bốt xé lịch ───────────────────────────────────────────
W, H = 700, 470
p = [f'<ellipse cx="350" cy="452" rx="320" ry="12" fill="#E3E8EE"/>']
# rô-bốt 1 giơ tờ 9 thứ Hai lên quá đầu
p.append(put(170, 452, .92, g3.robot(arms=((-64, -360), (64, -360)), expr='happy')))
p.append(sheet(107, 8, 126, 150, 'Tháng 5', 9, 'Thứ Hai'))
# rô-bốt 2: tờ 13 phía sau đầu, xấp lịch đã xé bên cạnh
p.append(sheet(392, 30, 126, 150, 'Tháng 5', 13, 'Thứ ...', rot=4))
p.append(put(470, 452, .92, g3.robot(arms=((-70, -120), (80, -140)), expr='open', look=6)))
p.append(sheet(560, 268, 116, 140, 'Tháng 5', 9, 'Thứ Hai', rot=14, stack=3))
save('bai36_t1_q4_robots', W, H, p, folder=F)


# ── Tiết 2, câu 1: Cóc kiện Trời (8, 9, 10, 12 giờ) ─────────────────────────
def crab(x, y, s=1):
    c = '#F07167'
    return put(x, y, s,
               ''.join(f'<path d="M{sg * 30},-12 l{sg * 26},-4 l{sg * 8},16 M{sg * 30},-4 l{sg * 30},8 l{sg * 4},14" fill="none" {stk(3)}/>' for sg in (-1, 1))
               + ''.join(f'<path d="M{sg * 26},-28 Q{sg * 50},-60 {sg * 44},-80" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>'
                         f'<path d="M{sg * 26},-28 Q{sg * 50},-60 {sg * 44},-80" fill="none" stroke="{c}" stroke-width="4" stroke-linecap="round"/>'
                         f'<path d="M{sg * 44},-80 q{sg * -18},-14 {sg * -8},-30 q{sg * 10},10 {sg * 24},4 q{sg * 2},18 {sg * -16},26 Z" fill="{c}" {stk(2.4)}/>' for sg in (-1, 1))
               + f'<ellipse cx="0" cy="-16" rx="38" ry="22" fill="{c}" {stk()}/>'
               f'<path d="M-10,-36 l-2,-14 M10,-36 l2,-14" {stk(2.4)}/>' + eye(-12, -52, 5) + eye(12, -52, 5)
               + '<path d="M-10,-10 q10,8 20,0" fill="none" stroke="#3F3A40" stroke-width="2.4" stroke-linecap="round"/>')


def fox(x, y, s=1):
    c, l = '#F4A259', '#FFF4DF'
    return put(x, y, s,
               f'<path d="M30,-10 Q90,-20 84,-70 Q70,-30 26,-34 Z" fill="{c}" {stk()}/><path d="M84,-70 Q86,-56 76,-48 Q70,-58 84,-70 Z" fill="{l}" {stk(2)}/>'
               f'<path d="M-30,0 Q-40,-60 0,-80 Q40,-60 30,0 Z" fill="{c}" {stk()}/>'
               f'<path d="M-14,0 Q-16,-40 0,-50 Q16,-40 14,0 Z" fill="{l}" {stk(2)}/>'
               f'<path d="M-34,-120 L-40,-160 L-12,-136 Z M34,-120 L40,-160 L12,-136 Z" fill="{c}" {stk()}/>'
               f'<path d="M-40,-118 Q-40,-146 0,-146 Q40,-146 40,-118 Q30,-90 0,-80 Q-30,-90 -40,-118 Z" fill="{c}" {stk()}/>'
               f'<path d="M-24,-104 Q0,-110 24,-104 Q14,-84 0,-80 Q-14,-84 -24,-104 Z" fill="{l}"/>'
               + eye(-14, -116, 4) + eye(14, -116, 4) + f'<circle cx="0" cy="-90" r="5" fill="{INK}"/>')


def bee(x, y, s=1):
    return put(x, y, s,
               f'<ellipse cx="-4" cy="-14" rx="9" ry="12" fill="#fff" opacity=".9" {stk(1.6)}/><ellipse cx="6" cy="-14" rx="9" ry="12" fill="#fff" opacity=".9" {stk(1.6)}/>'
               f'<ellipse cx="0" cy="0" rx="16" ry="11" fill="{YELLOW}" {stk(2)}/><path d="M-4,-10 L-4,10 M5,-10 L5,10" stroke="{INK}" stroke-width="3"/>'
               + eye(-10, -2, 2))


def tiger_walk(x, y, s=1, lying=False):
    """hổ đi bốn chân (hoặc nằm) nhìn sang trái; (x, y) = mặt đất giữa thân"""
    c, l = ORANGE, CREAM
    legs = '' if lying else ''.join(f'<rect x="{lx}" y="-50" width="20" height="50" rx="8" fill="{c}" {stk()}/>' for lx in (-70, -40, 30, 60))
    by = -36 if lying else -70
    body = (f'<path d="M90,{by} q50,-10 50,-50" fill="none" stroke="{INK}" stroke-width="13" stroke-linecap="round"/><path d="M90,{by} q50,-10 50,-50" fill="none" stroke="{c}" stroke-width="7" stroke-linecap="round"/>'
            + legs + f'<ellipse cx="10" cy="{by}" rx="96" ry="{30 if lying else 40}" fill="{c}" {stk()}/>'
            + ''.join(f'<path d="M{sx},{by - 34} q6,16 -2,30" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>' for sx in (-20, 10, 40, 70))
            + f'<g transform="translate(-92,{by - 22})"><circle cx="-18" cy="-30" r="12" fill="{c}" {stk()}/><circle cx="18" cy="-30" r="12" fill="{c}" {stk()}/>'
            f'<circle r="38" fill="{c}" {stk()}/><ellipse cx="0" cy="14" rx="22" ry="15" fill="{l}" {stk(2)}/>'
            f'<path d="M-6,-36 l3,10 M6,-36 l-3,10 M-34,-6 l10,2 M34,-6 l-10,2" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>'
            + (f'<path d="M-20,-4 q6,-5 12,0 M8,-4 q6,-5 12,0" fill="none" {stk(2.6)}/>' if lying else eye(-13, -6, 5) + eye(13, -6, 5))
            + f'<ellipse cx="0" cy="6" rx="6" ry="4" fill="{INK}"/></g>')
    return put(x, y, s, body)


W, H = 700, 520
PW, PH = 344, 252
pos = [(2, 2), (354, 2), (2, 266), (354, 266)]
p = []
# 1) cóc rủ cua đi kiện Trời
x, y = pos[0]
g = [ground(x, y + 170, PW, 90, '#E3EEF5'), f'<path d="M{x},{y + 170} L{x + 70},{y + 120} L{x + 150},{y + 160} L{x + 230},{y + 110} L{x + PW},{y + 160} L{x + PW},{y + 172} L{x},{y + 172} Z" fill="#CFD8E0" {stk(2)}/>',
     sun(x + 280, y + 50, 24)]
g.append(put(x + 90, y + 236, .95, kit_l1_29.frog_sit()))
g.append(crab(x + 240, y + 236, .8))
g.append(bubble(x + 210, y + 104, 170, 70, ['Anh', 'có đi kiện Trời', 'với tôi không?'], tail=(x + 120, y + 150), size=15))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + 46, y + 46, 38, 8))
# 2) gặp hổ nằm bên suối
x, y = pos[1]
g = [ground(x, y + 150, PW, 110, '#E3EEF5'), f'<path d="M{x},{y + 110} Q{x + 160},{y + 150} {x + PW},{y + 100} L{x + PW},{y + 140} Q{x + 160},{y + 190} {x},{y + 150} Z" fill="{WATER_L}" {stk(2)}/>',
     g3.tree(x + 290, y + 150, 140, '#8FD08A')]
g.append(tiger_walk(x + 230, y + 232, .62, lying=True))
g.append(put(x + 70, y + 240, .7, kit_l1_29.frog_sit()))
g.append(crab(x + 140, y + 240, .55))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + 46, y + 46, 38, 9))
# 3) gặp cáo, đàn ong
x, y = pos[2]
g = [ground(x, y + 170, PW, 90, '#E3EEF5'), f'<path d="M{x + 60},{y + 172} L{x + 170},{y + 40} L{x + 290},{y + 172} Z" fill="#CFD8E0" {stk(2)}/>']
g.append(fox(x + 60, y + 236, .8))
g.append(put(x + 120, y + 240, .6, kit_l1_29.frog_sit()))
g.append(tiger_walk(x + 230, y + 230, .5))
g.append(crab(x + 290, y + 246, .45))
for (bx, by) in ((x + 150, y + 150), (x + 190, y + 130), (x + 230, y + 150), (x + 270, y + 120), (x + 300, y + 160)):
    g.append(bee(bx, by, .8))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + 46, y + 46, 38, 10))
# 4) lên đến cổng Trời
x, y = pos[3]
g = [ground(x, y + 200, PW, 60, '#E3EEF5')]
for cx in (x + 150, x + 316):
    g.append(f'<rect x="{cx - 14}" y="{y + 40}" width="28" height="200" fill="#CFD8E0" {stk(2.4)}/>')
g.append(f'<rect x="{x + 160}" y="{y + 26}" width="150" height="36" rx="6" fill="#fff" {stk(2.4)}/>' + text(x + 235, y + 51, 'CỔNG TRỜI', size=18, weight=700))
g.append(f'<path d="M{x + 30},{y + 80} q10,-20 30,-14 q10,-16 30,-2 q20,-6 22,14" fill="#fff" {stk(2)}/>')
g.append(put(x + 200, y + 220, .38, g3.person('adult', '#9BB8D8', '#4E8FC8', 'pants', 'smile', -8, adult=True, arms=((-60, -220), (60, -220)))))
g.append(put(x + 290, y + 220, .38, g3.person('adult', '#A7B1BC', '#6F7B87', 'pants', 'o', -8, adult=True, arms=((-60, -220), (60, -220)))))
g.append(fox(x + 40, y + 240, .55))
g.append(tiger_walk(x + 120, y + 246, .45))
g.append(put(x + 150, y + 252, .5, kit_l1_29.frog_sit()))
g.append(crab(x + 200, y + 252, .4))
for (bx, by) in ((x + 210, y + 120), (x + 240, y + 150), (x + 260, y + 110)):
    g.append(bee(bx, by, .7))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + 46, y + 46, 38, 12))
save('bai36_t2_q1_coc', W, H, p, folder=F)


# ── Tiết 2, câu 2: ba chuyến tàu (7, 8, 10 giờ) ─────────────────────────────
def blob(cx, cy, s, seed, col):
    """mảng bản đồ cách điệu (không theo hình thật): đa giác bo tròn"""
    import random
    r = random.Random(seed)
    pts = []
    for i in range(14):
        a = i / 14 * 2 * math.pi
        rr = s * (0.7 + 0.35 * r.random())
        pts.append((cx + rr * math.cos(a) * 1.15, cy + rr * math.sin(a)))
    d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + ' Z'
    lines = ''.join(f'<path d="M{cx + r.uniform(-s, s) * .6:.1f},{cy - s * .6:.1f} L{cx + r.uniform(-s, s) * .6:.1f},{cy + s * .6:.1f}" stroke="#fff" stroke-width="1.6" opacity=".8"/>' for _ in range(3))
    return f'<path d="{d}" fill="{col}" {stk(2.4)}/>' + lines


def track(x1, x2, y):
    s = [f'<rect x="{x1}" y="{y - 9}" width="{x2 - x1}" height="18" fill="#fff" {stk(2)}/>']
    for k in range(int((x2 - x1) / 16)):
        xx = x1 + 6 + k * 16
        s.append(f'<rect x="{xx}" y="{y - 7}" width="7" height="14" fill="{GREY_L}" {stk(1.4)}/>')
    return ''.join(s)


W, H = 700, 430
p = []
for i, (h, dest, seed) in enumerate(((7, 'Lào Cai', 3), (8, 'Thái Nguyên', 5), (10, 'Hải Phòng', 9))):
    y = 8 + i * 140
    p.append(blob(220, y + 52, 48, 1, '#7CC6E8'))
    p.append(blob(590, y + 50, 50, seed, '#9ED8F5'))
    p.append(track(220, 590, y + 112))
    p.append(pill(220, y + 112, 120, 32, 'Hà Nội', size=17))
    p.append(pill(612, y + 112, 150 if dest == 'Thái Nguyên' else 120, 32, dest, size=17))
    p.append(bclock(72, y + 64, 60, h))
save('bai36_t2_q2_trains', W, H, p, folder=F)


# ── Tiết 2, câu 3: vườn bách thú (8 giờ, 10 giờ) ───────────────────────────
def giraffe(x, y, s=1, bend=False):
    c, d = YELLOW, '#D9803A'
    neck = 'M30,-120 Q50,-200 40,-250' if not bend else 'M30,-120 Q90,-150 120,-90'
    head = (-0, -270) if not bend else (128, -70)
    hx, hy = 40 + head[0] if not bend else head[0], head[1] if not bend else head[1]
    sp = ''.join(f'<circle cx="{sx}" cy="{sy}" r="8" fill="{d}"/>' for sx, sy in ((-30, -120), (0, -130), (-50, -104), (20, -110)))
    return put(x, y, s,
               ''.join(f'<rect x="{lx}" y="-100" width="14" height="100" rx="5" fill="{c}" {stk()}/>' for lx in (-70, -50, 20, 40))
               + f'<path d="{neck}" fill="none" stroke="{INK}" stroke-width="30" stroke-linecap="round"/><path d="{neck}" fill="none" stroke="{c}" stroke-width="24" stroke-linecap="round"/>'
               + f'<ellipse cx="-14" cy="-116" rx="70" ry="36" fill="{c}" {stk()}/>' + sp
               + f'<g transform="translate({hx},{hy})"><path d="M-6,-18 l-4,-16 M8,-18 l4,-16" {stk(3)}/><ellipse cx="0" cy="0" rx="22" ry="16" fill="{c}" {stk()}/>'
               + eye(-6, -4, 3.5) + '</g>')


W, H = 700, 260
p = []
x, y, PW, PH = 2, 2, 344, 252
g = [ground(x, y + 150, PW, 110, '#DDE6EE'), g3.tree(x + 40, y + 140, 100, '#8FD08A')]
g.append(giraffe(x + 120, y + 150, .5))
g.append(giraffe(x + 200, y + 150, .45, bend=True))
for k in range(9):
    g.append(f'<rect x="{x + 10 + k * 38}" y="{y + 150}" width="10" height="70" fill="#fff" {stk(2)}/>')
g.append(f'<rect x="{x}" y="{y + 150}" width="{PW}" height="12" fill="#fff" {stk(2)}/><rect x="{x}" y="{y + 196}" width="{PW}" height="10" fill="#fff" {stk(2)}/>')
g.append(put(x + 290, y + 250, .44, g3.person('bob', '#7CC6E8', None, 'dress', 'smile', -10, adult=True, arms=((-70, -230), (60, -200)))))
g.append(put(x + 220, y + 250, .34, g3.person('ponytail', PINK, '#4E8FC8', 'pants', 'open', -10, band=BLUE, arms=((-90, -230), (70, -140)))))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + 46, y + 46, 38, 8))
x = 354
g = [ground(x, y + 170, PW, 90, '#DDE6EE')]
for k in range(4):
    for j in range(3):
        g.append(f'<rect x="{x + 10 + k * 44 + (j % 2) * 20}" y="{y + 100 + j * 22}" width="40" height="20" fill="#fff" {stk(1.8)}/>')
g.append(f'<rect x="{x + 186}" y="{y + 70}" width="16" height="104" fill="#CFD8E0" {stk(2)}/><rect x="{x + 316}" y="{y + 70}" width="16" height="104" fill="#CFD8E0" {stk(2)}/>')
g.append(f'<path d="M{x + 176},{y + 70} Q{x + 260},{y + 20} {x + 340},{y + 70} Z" fill="#fff" {stk(2.4)}/>' + text(x + 260, y + 62, 'VƯỜN BÁCH THÚ', size=15, weight=700))
g.append(put(x + 160, y + 250, .44, g3.person('bob', '#7CC6E8', None, 'dress', 'smile', 8, adult=True, arms=((70, -200), (40, -230)))))
g.append(put(x + 250, y + 250, .34, g3.person('ponytail', PINK, '#4E8FC8', 'pants', 'smile', 8, band=BLUE, arms=((-90, -180), (60, -160)), legs='walk')))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + 46, y + 46, 38, 10))
save('bai36_t2_q3_zoo', W, H, p, folder=F)
