"""
Vở BT Toán 1 Tập hai (KNTT), Bài 34 Xem giờ đúng trên đồng hồ (trang 73–76): nét riêng.
Giữ nội dung toán: giờ của từng đồng hồ, nhãn giờ, bảng màu, hoạt động của Mai.
  python scripts/redraw/g1t2_bai34.py
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1t2_e import *
from kit_l1t2_e import place as put, st as stk
import kit_g3 as g3

# ── đồng hồ rời (ô nối): Bài 34, 37 dùng chung ──────────────────────────────
for h in (1, 2, 3, 4, 6, 7, 8, 9, 10, 11):
    W, H, p = clock_svg(h)
    save(f'bai34_clock_{h}', W, H, p, folder=F)


def kid(hair='short', shirt=BLUE, bottom_kind='shorts', **kw):
    return g3.person(hair, shirt, None, bottom_kind, **kw)


# ── Tiết 1, câu 2: bốn tranh a–d, đồng hồ 6 / 8 / 9 / 11 giờ ────────────────
W, H = 700, 444
PW, PH = 340, 204
pos = [(4, 4), (356, 4), (4, 236), (356, 236)]
p = []
# a) bé tập thể dục bên chậu cây sáng sớm
x, y = pos[0]
g = [ground(x, y + 140, PW, 70, '#D9EFC8'), f'<rect x="{x}" y="{y + 132}" width="{PW}" height="10" fill="#C2E3A9"/>']
for i, px in enumerate((x + 40, x + 92)):
    g.append(f'<path d="M{px - 20},{y + 150} L{px + 20},{y + 150} L{px + 15},{y + 182} L{px - 15},{y + 182} Z" fill="{ORANGE}" {stk()}/>')
    for a in (-40, -15, 15, 40):
        g.append(f'<path d="M{px},{y + 150} q{a * .5},-40 {a},-58" fill="none" stroke="{GRASS_D}" stroke-width="7" stroke-linecap="round"/>')
g.append(put(x + 200, y + 196, .5, kid('short', BLUE, arms=((-80, -300), (80, -300)), legs='stand', expr='laugh')))
g.append(f'<path d="M{x + 268},{y + 150} q10,-26 34,-20 q6,-14 22,-4 l-4,24 Z" fill="{SKY_D}" {stk(2.4)}/>')
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(badge(x + 22, y + PH - 22, 'a'))
p.append(bclock(x + PW - 48, y + PH - 46, 38, 6))
# b) cả lớp ngồi viết bài
x, y = pos[1]
g = [f'<rect x="{x}" y="{y}" width="{PW}" height="{PH}" fill="#FFF6E5"/>',
     f'<rect x="{x + 30}" y="{y + 18}" width="150" height="58" rx="4" fill="#3E7D5A" {stk(2.4)}/>']
for cx, hair, shirt, band in ((x + 90, 'short', BLUE, None), (x + 220, 'pigtails', '#F7A1C4', None)):
    g.append(put(cx, y + 176, .52, g3.bust(hair, shirt, 'down', 0, band)))
    g.append(f'<rect x="{cx - 70}" y="{y + 168}" width="140" height="40" fill="#E9C48F" {stk()}/>')
    g.append(g3.book_open(cx, y + 176, 64))
    g.append(f'<path d="M{cx + 18},{y + 172} l14,-26" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>')
p.append(panel(x, y, PW, PH, ''.join(g), bg='#FFF6E5'))
p.append(badge(x + 22, y + PH - 22, 'b'))
p.append(bclock(x + PW - 48, y + PH - 46, 38, 8))
# c) hai bạn đá bóng ở sân trường
x, y = pos[2]
g = [ground(x, y + 120, PW, 90, '#DDE6EE'), g3.building(x + 120, y + 112, 150, 60, '#FFE8C7'),
     g3.tree(x + 40, y + 124, 110), g3.tree(x + 300, y + 124, 100, '#8FD08A')]
g.append(put(x + 110, y + 200, .42, kid('short', BLUE, arms=((-70, -300), (70, -290)), legs='run', expr='laugh')))
g.append(put(x + 230, y + 200, .42, kid('spiky', '#7CC6E8', arms=((-60, -150), (66, -170)), legs='run', expr='open'), flip=True))
g.append(f'<circle cx="{x + 270}" cy="{y + 190}" r="10" fill="#fff" {stk(2.4)}/><path d="M{x + 262},{y + 186} l16,6 M{x + 268},{y + 180} l2,20" stroke="{INK}" stroke-width="1.6"/>')
p.append(panel(x, y, PW, PH, ''.join(g), bg='#E6F4FD'))
p.append(badge(x + 22, y + PH - 22, 'c'))
p.append(bclock(x + PW - 48, y + 46, 38, 9))
# d) bạn trai đeo cặp đi học về
x, y = pos[3]
g = [ground(x, y + 128, PW, 80, '#CFE9B5'),
     f'<path d="M{x + 120},{y + 210} Q{x + 160},{y + 160} {x + 140},{y + 128} L{x + 200},{y + 128} Q{x + 240},{y + 170} {x + 250},{y + 210} Z" fill="#DDE6EE"/>',
     g3.building(x + 40, y + 128, 160, 92, '#CFE3F5'), f'<rect x="{x + 104}" y="{y + 98}" width="32" height="30" fill="{GREY}" {stk(2.4)}/>',
     g3.tree(x + 290, y + 140, 120, '#8FD08A')]
bag = f'<rect x="-66" y="-250" width="40" height="70" rx="10" fill="{ORANGE}" {stk()}/>'
g.append(put(x + 210, y + 202, .46, kid('short', BLUE, arms=((-40, -120), (60, -130)), legs='walk', extra_back=bag)))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#E6F4FD'))
p.append(badge(x + 22, y + PH - 22, 'd'))
p.append(bclock(x + PW - 48, y + 46, 38, 11))
save('bai34_t1_q2_scenes', W, H, p, folder=F)


# ── Tiết 1, câu 3: đại bàng quắp đồng hồ (12 giờ), khủng long ngậm đồng hồ (5 giờ) ─
def eagle():
    """đại bàng sải cánh, thân giữa (0,0), đầu quay phải"""
    s = []
    for sg in (-1, 1):
        s.append(f'<path d="M{sg * 10},-6 Q{sg * 70},-70 {sg * 170},-96 Q{sg * 150},-70 {sg * 160},-60 Q{sg * 130},-46 {sg * 136},-34 '
                 f'Q{sg * 100},-24 {sg * 100},-12 Q{sg * 60},-2 {sg * 10},12 Z" fill="#8A6A4F" {stk()}/>')
        for k in range(4):
            s.append(f'<path d="M{sg * (60 + k * 24)},{-40 - k * 9} l{sg * 30},{-18 - k * 2}" stroke="#5E4532" stroke-width="2.4" stroke-linecap="round"/>')
    s.append(f'<path d="M-30,6 Q-60,10 -70,26 Q-44,26 -30,20 Z" fill="#fff" {stk()}/>')
    s.append(f'<ellipse cx="0" cy="8" rx="40" ry="22" fill="#8A6A4F" {stk()}/>')
    s.append(f'<circle cx="40" cy="-6" r="20" fill="#fff" {stk()}/>')
    s.append(f'<path d="M56,-12 Q76,-10 72,6 Q64,0 56,2 Z" fill="{YELLOW}" {stk(2.4)}/>')
    s.append(eye(44, -10, 4))
    for fx in (-10, 12):
        s.append(f'<path d="M{fx},26 L{fx},44" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round"/>')
    return ''.join(s)


def dino_scene():
    """khủng long xanh nằm bò, cổ vươn sang trái, hai hàm ngậm đồng hồ (5 giờ)"""
    c, l = '#7CC6E8', '#CFEFFB'
    s = [f'<path d="M640,212 Q690,214 700,250 Q660,236 630,236 Z" fill="{c}" {stk()}/>']
    s += [f'<path d="M{500 + i * 34},{176 - (6 if i in (1, 2) else 0)} l14,-24 l14,22" fill="{l}" {stk(2.4)}/>' for i in range(5)]
    s.append(f'<ellipse cx="570" cy="214" rx="100" ry="46" fill="{c}" {stk()}/>')
    s.append(f'<path d="M490,214 Q540,250 640,232 Q600,258 520,250 Z" fill="{l}" {stk(2)}/>')
    s.append(f'<path d="M500,196 Q470,170 452,150 L470,128 Q500,150 520,184 Z" fill="{c}" {stk()}/>')
    s.append(f'<path d="M478,150 Q470,108 430,96 Q380,88 344,98 Q338,112 352,116 L470,140 Z" fill="{c}" {stk()}/>')
    s.append(eye(440, 112, 6))
    s.append(f'<path d="M476,150 Q470,194 430,206 Q380,214 350,204 Q346,194 356,190 L470,160 Z" fill="{c}" {stk()}/>')
    s.append(f'<path d="M468,140 L470,160 L380,184 L372,124 Z" fill="#E86A7E" {stk(2)}/>')
    for fx in (520, 610):
        s.append(f'<path d="M{fx},250 l-6,18 l26,0 l-2,-16 Z" fill="{c}" {stk(2.4)}/>')
    return ''.join(s)


W, H = 700, 290
p = [f'<path d="M60,90 q40,-10 80,0 M520,60 q40,-8 70,2 M80,130 q30,-6 60,0" fill="none" stroke="{GREY}" stroke-width="3" stroke-linecap="round"/>']
p.append(put(170, 96, .82, eagle()))
p.append(f'<path d="M160,128 L170,150 M186,128 L190,150" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round"/>')
p.append(bclock(178, 206, 62, 12))
p.append(f'<ellipse cx="520" cy="262" rx="170" ry="12" fill="#E3E8EE"/>')
p.append(dino_scene())
p.append(bclock(400, 150, 54, 5))
save('bai34_t1_q3_eagle_dino', W, H, p, folder=F)


# ── Tiết 1, câu 4: năm đồng hồ báo thức nét trắng để tô + bảng màu ───────────
def alarm(cx, cy, r, h, kind='bells', face_extra=''):
    """đồng hồ báo thức nét đen nền trắng (tô màu được): chuông, chân, mặt số"""
    s = []
    if kind in ('bells', 'shake', 'arms', 'sleepy'):
        for sg in (-1, 1):
            s.append(f'<path d="M{cx + sg * r * .55},{cy - r * .78} L{cx + sg * r * .7},{cy - r * .92}" {stk(3)}/>')
            s.append(f'<path d="M{cx + sg * r * .3:.1f},{cy - r * .95:.1f} A{r * .42:.1f},{r * .42:.1f} 0 0 {1 if sg > 0 else 0} {cx + sg * r * 1.0:.1f},{cy - r * .55:.1f} Z" fill="#fff" {stk(2.6)}/>')
        if kind == 'sleepy' or kind == 'bells':
            s.append(f'<path d="M{cx - r * .45},{cy - r * 1.0} Q{cx},{cy - r * 1.5} {cx + r * .45},{cy - r * 1.0}" fill="none" stroke="{INK}" stroke-width="{r * .1:.1f}" stroke-linecap="round"/>'
                     f'<path d="M{cx - r * .45},{cy - r * 1.0} Q{cx},{cy - r * 1.5} {cx + r * .45},{cy - r * 1.0}" fill="none" stroke="#fff" stroke-width="{r * .05:.1f}" stroke-linecap="round"/>')
        s.append(f'<rect x="{cx - r * .08:.1f}" y="{cy - r * 1.12:.1f}" width="{r * .16:.1f}" height="{r * .16:.1f}" fill="#fff" {stk(2.2)}/>')
        for sg in (-1, 1):
            s.append(f'<path d="M{cx + sg * r * .55:.1f},{cy + r * .8:.1f} L{cx + sg * r * .78:.1f},{cy + r * 1.12:.1f}" stroke="{INK}" stroke-width="{r * .12:.1f}" stroke-linecap="round"/>'
                     f'<path d="M{cx + sg * r * .55:.1f},{cy + r * .8:.1f} L{cx + sg * r * .78:.1f},{cy + r * 1.12:.1f}" stroke="#fff" stroke-width="{r * .06:.1f}" stroke-linecap="round"/>')
    if kind == 'shake':
        for sg in (-1, 1):
            s.append(f'<path d="M{cx + sg * r * 1.1:.1f},{cy - r * .9:.1f} l{sg * 8},-10 M{cx + sg * r * 1.18:.1f},{cy - r * .6:.1f} l{sg * 12},-4" {stk(2.4)}/>')
    if kind == 'arms':
        for sg in (-1, 1):
            s.append(f'<path d="M{cx + sg * r * .98:.1f},{cy + r * .1:.1f} q{sg * r * .25:.1f},0 {sg * r * .4:.1f},{-r * .15:.1f}" fill="none" {stk(3)}/>'
                     f'<path d="M{cx + sg * r * 1.38:.1f},{cy - r * .15:.1f} m-{r * .12:.1f},0 a{r * .14:.1f},{r * .14:.1f} 0 1 0 {r * .24:.1f},0 a{r * .14:.1f},{r * .14:.1f} 0 1 0 -{r * .24:.1f},0" fill="#fff" {stk(2.4)}/>')
    if kind == 'walk':
        s.append(f'<path d="M{cx - r * .9:.1f},{cy - r * .45:.1f} A{r * 1.02:.1f},{r * 1.02:.1f} 0 0 1 {cx + r * .9:.1f},{cy - r * .45:.1f} Z" fill="#fff" {stk(2.6)}/>')
        for sg, ex in ((-1, -.55), (1, .7)):
            s.append(f'<path d="M{cx + sg * r * .3:.1f},{cy + r * .9:.1f} L{cx + ex * r * 1.5:.1f},{cy + r * 1.55:.1f}" {stk(3)}/>'
                     f'<path d="M{cx + ex * r * 1.5 - r * .32:.1f},{cy + r * 1.62:.1f} q{r * .32:.1f},{-r * .34:.1f} {r * .6:.1f},{-r * .1:.1f} l0,{r * .14:.1f} Z" fill="#fff" {stk(2.4)}/>')
            s.append(f'<path d="M{cx + sg * r * 1.0:.1f},{cy:.1f} q{sg * r * .3:.1f},{-r * .1:.1f} {sg * r * .45:.1f},{-r * .32:.1f}" fill="none" {stk(3)}/>'
                     f'<circle cx="{cx + sg * r * 1.5:.1f}" cy="{cy - r * .4:.1f}" r="{r * .16:.1f}" fill="#fff" {stk(2.4)}/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#fff" {stk(3)}/>')
    s.append(outline_dial(cx, cy, r * .82, h, face_extra))
    return ''.join(s)


W, H = 760, 700
p = []
p.append(alarm(205, 165, 92, 4))
p.append(alarm(560, 170, 92, 1, 'shake'))
p.append(alarm(170, 455, 98, 7, 'arms'))
p.append(alarm(590, 420, 88, 10, 'walk'))
sl = (f'<path d="M348,582 q8,6 16,0 M396,582 q8,6 16,0" fill="none" {stk(2.4)}/>'
      f'<path d="M372,602 q8,8 16,0" fill="none" {stk(2.2)}/><path d="M378,606 q2,12 8,0" fill="#E86A7E" {stk(1.8)}/>')
p.append(alarm(380, 580, 82, 11, 'sleepy', sl))
# bảng màu + bảng ghi màu
p.append(f'<path d="M320,252 Q300,220 340,206 Q380,196 420,214 Q446,232 420,250 Q400,256 402,272 Q396,290 360,286 Q326,280 320,252 Z" fill="{SKY}" {stk(2.6)}/>')
for (bx, by, c) in ((346, 228, '#3B82F6'), (380, 222, '#fff'), (408, 236, '#fff'), (352, 262, '#fff')):
    p.append(f'<ellipse cx="{bx}" cy="{by}" rx="10" ry="7" fill="{c}" {stk(1.8)}/>')
p.append(f'<path d="M332,190 L404,262" stroke="{INK}" stroke-width="9" stroke-linecap="round"/><path d="M332,190 L404,262" stroke="{BROWN}" stroke-width="5" stroke-linecap="round"/>'
         f'<path d="M398,256 l14,14 l-4,4 Z" fill="{INK}"/>')
rows = (('1 giờ', 'xanh'), ('4 giờ', 'đỏ'), ('7 giờ', 'vàng'), ('10 giờ', 'tím'), ('11 giờ', 'cam'))
tx, ty, cw1, cw2, rh = 300, 290, 82, 72, 30
for i, (a, b) in enumerate(rows):
    yy = ty + i * rh
    p.append(f'<rect x="{tx}" y="{yy}" width="{cw1}" height="{rh}" fill="{LABEL}" stroke="{LINE}" stroke-width="2"/>'
             f'<rect x="{tx + cw1}" y="{yy}" width="{cw2}" height="{rh}" fill="{LABEL}" stroke="{LINE}" stroke-width="2"/>')
    p.append(text(tx + 8, yy + 21, a, size=17, weight=600, anchor='start') + text(tx + cw1 + 8, yy + 21, b, size=17, weight=600, anchor='start'))
save('bai34_t1_q4_alarms', W, H, p, folder=F)


# ── Tiết 2, câu 1: ba đồng hồ chưa có kim ngắn ──────────────────────────────
W, H = 700, 240
p = []
for i, lab in enumerate(('4 giờ', '7 giờ', '11 giờ')):
    cx = 120 + i * 230
    p.append(bclock(cx, 92, 82, None))
    p.append(pill(cx, 212, 120, 42, lab, size=21))
save('bai34_t2_q1_clocks', W, H, p, folder=F)


# ── Tiết 2, câu 2: đồng hồ cú mèo, bông hoa, đôi cánh, báo thức + bốn kệ ─────
def stand(cx, cy, w, label):
    """kệ đặt đồng hồ: tấm nghiêng có bóng như sách"""
    h = 46
    return (f'<path d="M{cx - w / 2 + 6},{cy + 12} L{cx + w / 2 - 4},{cy + 12} L{cx + w / 2 + 6},{cy - h + 14} L{cx + w / 2 + 6},{cy - h + 22} L{cx + w / 2 - 6},{cy + 20} L{cx - w / 2 + 6},{cy + 20} Z" fill="#7B8794" {stk(2)}/>'
            f'<path d="M{cx - w / 2},{cy} L{cx - w / 2 + 26},{cy - h} L{cx + w / 2 + 6},{cy - h} L{cx + w / 2 - 20},{cy} Z" fill="#fff" {stk(2.6)}/>'
            + text(cx, cy - 14, label, size=22, weight=700))


W, H = 700, 670
p = []
# cú mèo, 1 giờ
owl = (f'<path d="M-96,40 Q-120,-40 -70,-90 Q-40,-130 0,-130 Q40,-130 70,-90 Q120,-40 96,40 Q80,110 0,120 Q-80,110 -96,40 Z" fill="#fff" {stk()}/>'
       f'<path d="M-60,-110 L-70,-150 L-36,-124 M60,-110 L70,-150 L36,-124" fill="#fff" {stk()}/>'
       f'<ellipse cx="-34" cy="-104" rx="24" ry="20" fill="#fff" {stk(2.6)}/><ellipse cx="34" cy="-104" rx="24" ry="20" fill="#fff" {stk(2.6)}/>'
       f'<circle cx="-34" cy="-104" r="8" fill="{INK}"/><circle cx="34" cy="-104" r="8" fill="{INK}"/>'
       f'<path d="M-8,-90 L0,-76 L8,-90 Z" fill="#fff" {stk(2.4)}/>'
       f'<path d="M-96,10 Q-130,40 -110,80 Q-96,50 -88,40 M96,10 Q130,40 110,80 Q96,50 88,40" fill="#fff" {stk(2.6)}/>'
       f'<path d="M-40,118 l-14,16 l28,-4 Z M40,118 l14,16 l-28,-4 Z" fill="#fff" {stk(2.4)}/>')
p.append(put(160, 170, 1, owl))
p.append(outline_dial(160, 172, 74, 1))
# đồng hồ bông hoa, 6 giờ
for n in range(1, 13):
    a = math.radians(n * 30)
    px, py = 520 + 112 * math.sin(a), 150 - 112 * math.cos(a)
    p.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="34" fill="#fff" {stk(2.6)}/>')
for n in range(1, 13):
    a = math.radians(n * 30)
    px, py = 520 + 120 * math.sin(a), 150 - 120 * math.cos(a)
    p.append(text(f'{px:.1f}', f'{py + 9:.1f}', n, size=24, weight=500))
p.append(f'<path d="M470,250 L450,300 L478,262 Z M570,250 L590,300 L562,262 Z" fill="{GREY}" {stk(2.4)}/>')
p.append(outline_dial(520, 150, 84, 6))
# bốn kệ
p.append(stand(205, 356, 210, '6 giờ'))
p.append(stand(520, 356, 210, '1 giờ'))
p.append(stand(290, 432, 210, '8 giờ'))
p.append(stand(580, 432, 210, '10 giờ'))
# đồng hồ có cánh, 10 giờ
for sg in (-1, 1):
    for k in range(3):
        p.append(f'<path d="M{230 + sg * 60},{530 + k * 18} Q{230 + sg * (140 + k * 10)},{480 + k * 16} {230 + sg * (220 - k * 26)},{500 + k * 24} '
                 f'Q{230 + sg * (150 - k * 10)},{538 + k * 18} {230 + sg * 60},{558 + k * 16} Z" fill="#fff" {stk(2.4)}/>')
p.append(f'<path d="M190,610 L176,650 L200,620 Z M270,610 L284,650 L260,620 Z" fill="{GREY}" {stk(2.4)}/>')
p.append(f'<circle cx="230" cy="550" r="82" fill="#fff" {stk(3)}/>')
p.append(outline_dial(230, 550, 70, 10))
# đồng hồ báo thức, 8 giờ
p.append(alarm(590, 572, 70, 8))
save('bai34_t2_q2_fancy', W, H, p, folder=F)


# ── Tiết 2, câu 3: một ngày Mai về thăm ông bà (7, 8, 9, 10, 11 giờ) ────────
W, H = 700, 650
PW, PH = 340, 206
pos = [(4, 4), (356, 4), (4, 222), (356, 222), (180, 440)]
p = []


def moto(x, y, s=1, body=TEAL):
    """xe máy nhìn nghiêng, đầu xe bên phải; (x, y) = mặt đường giữa hai bánh"""
    return put(x, y, s,
               f'<circle cx="-70" cy="-30" r="30" fill="#fff" stroke="{INK}" stroke-width="8"/><circle cx="70" cy="-30" r="30" fill="#fff" stroke="{INK}" stroke-width="8"/>'
               f'<circle cx="-70" cy="-30" r="6" fill="{INK}"/><circle cx="70" cy="-30" r="6" fill="{INK}"/>'
               f'<path d="M-96,-56 Q-60,-96 0,-80 L40,-80 L70,-120 L84,-120 L74,-60 Q40,-40 0,-44 L-90,-40 Z" fill="{body}" {stk()}/>'
               f'<path d="M-70,-88 L10,-88 Q18,-100 0,-104 L-60,-104 Q-80,-100 -70,-88 Z" fill="{INK}"/>'
               f'<path d="M70,-120 L60,-140 M60,-140 L44,-136" {stk(4)}/><circle cx="92" cy="-104" r="8" fill="{YELLOW}" {stk(2)}/>')


# 1) mẹ chở Mai bằng xe máy
x, y = pos[0]
g = [ground(x, y + 160, PW, 60, '#DDE6EE'), g3.building(x + 210, y + 162, 120, 150, '#CFE3F5'), g3.tree(x + 50, y + 166, 150, '#8FD08A')]
helmet = lambda c: f'<path d="M-62,-300 Q-60,-350 0,-352 Q60,-350 62,-300 Z" fill="{c}" {stk()}/>'
g.append(put(x + 168, y + 186, .36, g3.person('adult', '#9BB8D8', '#4E8FC8', 'pants', 'smile', 8, adult=True,
         arms=((70, -270), (90, -270)), legs='sit', extra_front='') + put(0, -64, 1, helmet(BLUE))))
g.append(put(x + 120, y + 162, .36, g3.person('ponytail', PINK, None, 'dress', 'laugh', 6, band=BLUE,
         arms=((60, -150), (64, -140)), legs='sit') + put(0, 0, 1, helmet(YELLOW))))
g.append(moto(x + 170, y + 200, .82))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + PW - 40, y + 40, 34, 7))
# 2) ông bà đón Mai ở cửa
x, y = pos[1]
g = [ground(x, y + 150, PW, 70, '#DDE6EE'), f'<rect x="{x + 20}" y="{y + 30}" width="60" height="126" fill="#C99668" {stk()}/>',
     f'<rect x="{x + 30}" y="{y + 44}" width="16" height="36" fill="{SKY}" {stk(2)}/><rect x="{x + 54}" y="{y + 44}" width="16" height="36" fill="{SKY}" {stk(2)}/>',
     g3.bush(x + 150, y + 156, 90)]
g.append(put(x + 110, y + 196, .38, g3.person('adult', '#8E9AA8', '#4E8FC8', 'pants', 'smile', 10, adult=True, glasses=True,
         arms=((-60, -230), (90, -280)), hair_col='#E2E2E2')))
g.append(put(x + 200, y + 200, .36, g3.person('bob', '#B9A7F0', '#A7B1BC', 'skirt', 'smile', 10, adult=True,
         arms=((90, -260), (100, -250)), hair_col='#D8D8D8')))
g.append(put(x + 280, y + 200, .34, g3.person('ponytail', PINK, None, 'dress', 'laugh', -8, band=BLUE,
         arms=((-90, -200), (-80, -190)), legs='run'), flip=False))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + PW - 40, y + 40, 34, 8))
# 3) Mai cho gà ăn bên ao
x, y = pos[2]
g = [ground(x, y + 110, PW, 110, '#CFE9B5'),
     f'<ellipse cx="{x + 220}" cy="{y + 118}" rx="120" ry="36" fill="{WATER_L}" {stk(2.4)}/>']
for (lx, ly) in ((x + 200, y + 112), (x + 270, y + 124)):
    g.append(f'<ellipse cx="{lx}" cy="{ly}" rx="22" ry="9" fill="{GREEN}" {stk(2)}/>')
g.append(put(x + 70, y + 200, .45, g3.person('ponytail', '#7CC6E8', None, 'dress', 'smile', 10, band=BLUE,
         arms=((70, -170), (-50, -120)))))
import kit_g1
g.append(kit_g1.hen(x + 200, y + 196, 56))
g.append(kit_g1.hen(x + 270, y + 192, 64, body='#F3E6CF', wing='#E2C9A0'))
for (cx_, cy_) in ((x + 150, y + 196), (x + 236, y + 200)):
    import kit_l1_a
    g.append(kit_l1_a.chick(cx_, cy_, .42))
for k in range(8):
    g.append(f'<circle cx="{x + 120 + k * 7}" cy="{y + 186 + (k % 3) * 4}" r="2" fill="{BROWN}"/>')
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + PW - 40, y + 40, 34, 9))
# 4) Mai hái xoài
x, y = pos[3]
g = [ground(x, y + 170, PW, 50, '#CFE9B5'),
     f'<path d="M{x + 140},{y + 186} L{x + 146},{y + 90} L{x + 158},{y + 90} L{x + 166},{y + 186} Z" fill="{BROWN}" {stk()}/>',
     f'<ellipse cx="{x + 152}" cy="{y + 70}" rx="120" ry="66" fill="{GREEN}" {stk()}/>']
for (mx, my) in ((x + 100, y + 60), (x + 150, y + 90), (x + 200, y + 56), (x + 70, y + 96), (x + 230, y + 98), (x + 130, y + 40)):
    g.append(f'<ellipse cx="{mx}" cy="{my}" rx="9" ry="13" fill="{YELLOW}" {stk(2)} transform="rotate(-20 {mx} {my})"/>')
g.append(put(x + 252, y + 202, .4, g3.person('ponytail', '#7CC6E8', None, 'dress', 'open', -8, band=BLUE,
         arms=((-100, -300), (60, -180)))))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#EAF6FF'))
p.append(bclock(x + PW - 40, y + 40, 34, 10))
# 5) cả nhà ăn cơm trưa
x, y = pos[4]
g = [f'<rect x="{x}" y="{y}" width="{PW}" height="{PH}" fill="#FFF6E5"/>',
     f'<rect x="{x + 110}" y="{y + 16}" width="110" height="60" fill="{SKY}" {stk(2.4)}/><line x1="{x + 165}" y1="{y + 16}" x2="{x + 165}" y2="{y + 76}" {stk(2)}/>']
g.append(put(x + 60, y + 196, .4, g3.person('bob', '#7CC6E8', None, 'dress', 'smile', 10, adult=True, arms=((90, -250), (100, -240)))))
g.append(put(x + 140, y + 150, .4, g3.bust('adult', '#8E9AA8', 'smile', 0, None, '#E2E2E2')))
g.append(put(x + 210, y + 150, .38, g3.bust('ponytail', PINK, 'laugh', 0, BLUE)))
g.append(put(x + 280, y + 150, .4, g3.bust('bob', '#B9A7F0', 'smile', -6, None, '#D8D8D8')))
g.append(f'<path d="M{x + 90},{y + 150} L{x + 320},{y + 150} L{x + 330},{y + 192} L{x + 80},{y + 192} Z" fill="#fff" {stk()}/>')
for k in range(6):
    g.append(f'<line x1="{x + 100 + k * 40}" y1="{y + 150}" x2="{x + 96 + k * 42}" y2="{y + 192}" stroke="{SKY_D}" stroke-width="3"/>')
g.append(f'<line x1="{x + 84}" y1="{y + 170}" x2="{x + 326}" y2="{y + 170}" stroke="{SKY_D}" stroke-width="3"/>')
for bx in (x + 150, x + 210, x + 270):
    g.append(g3.bowl(bx, y + 152, 34, '#fff', '#fff'))
p.append(panel(x, y, PW, PH, ''.join(g), bg='#FFF6E5'))
p.append(bclock(x + PW - 40, y + 40, 34, 11))
save('bai34_t2_q3_mai', W, H, p, folder=F)
