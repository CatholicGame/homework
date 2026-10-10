"""
Vở BT Toán 1 Tập hai (KNTT), Bài 35 Các ngày trong tuần (trang 77–80): nét riêng.
Giữ nội dung toán: số thuyền mỗi ngày (2, 4, 6, 8, 10, 12), nhãn thứ / hôm qua / hôm nay / ngày mai,
số bông hồng (3, 5, 7), bảy lá sen theo thứ tự, mê cung và sáu chỗ chấm trên đường thoát.
  python scripts/redraw/g1t2_bai35.py
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1t2_e import *
from kit_l1t2_e import place as put, st as stk
import kit_l1_a, kit_l1_29, kit_g2, kit_l1_c

APPLE, APPLE_D = '#56C1EE', '#2B8FC6'

# ── Tiết 1, câu 2: thuyền giấy Mai gấp mỗi ngày ─────────────────────────────
W, H = 700, 560
p = []
cells = [('Thứ Hai', 2), ('Thứ Ba', 4), ('Thứ Tư', 6), ('Thứ Năm', 8), ('Thứ Sáu', 10), ('Thứ Bảy', 12)]
CW, CH = 346, (130, 210, 210)
y0 = 2
for r in range(3):
    for c in range(2):
        name, n = cells[r * 2 + c]
        x, y, h = 2 + c * (CW + 4), y0, CH[r]
        p.append(f'<rect x="{x}" y="{y}" width="{CW}" height="{h}" fill="#ECEFF2"/>')
        rows = [n] if n <= 4 else [n // 2, n - n // 2]
        for ri, k in enumerate(rows):
            for i in range(k):
                bx = x + 70 + i * 46 + ri * 14 + (40 if k <= 2 else 0)
                by = y + 52 + ri * 66 + i * 10
                p.append(kit_l1_a.paper_boat(bx, by, .62, '#7CC6E8', '#fff'))
        p.append(text(x + 16, y + h - 14, name, size=20, weight=500, anchor='start'))
    y0 += CH[r] + 4
save('bai35_t1_q2_boats', W, y0 - 2, p, folder=F)


# ── Tiết 1, câu 3: quả táo (thứ) – giỏ táo (hôm qua / hôm nay / ngày mai) ───
def apple_card(label):
    W, H = 200, 160
    s = [f'<path d="M100,30 Q100,14 110,6" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>',
         f'<path d="M106,24 Q130,0 156,14 Q132,36 106,24 Z" fill="{GREEN}" {stk(2.6)}/>',
         f'<path d="M100,40 Q60,18 28,44 Q2,72 20,112 Q40,152 76,150 Q90,146 100,150 Q110,146 124,150 Q160,152 180,112 Q198,72 172,44 Q140,18 100,40 Z" fill="{APPLE}" {stk()}/>',
         f'<ellipse cx="150" cy="58" rx="14" ry="10" fill="#fff" opacity=".85"/>',
         f'<ellipse cx="100" cy="96" rx="76" ry="24" fill="#fff" {stk(2.4)}/>',
         text(100, 104, label, size=24, weight=600)]
    return W, H, s


def basket_card(label):
    W, H = 240, 200
    s = [f'<path d="M50,96 Q50,10 120,10 Q190,10 190,96" fill="none" stroke="{INK}" stroke-width="16" stroke-linecap="round"/>',
         f'<path d="M50,96 Q50,10 120,10 Q190,10 190,96" fill="none" stroke="#E9C48F" stroke-width="10" stroke-linecap="round"/>']
    for (ax, ay) in ((80, 92), (112, 84), (144, 86), (176, 94), (98, 100), (130, 98), (160, 100)):
        s.append(f'<circle cx="{ax}" cy="{ay}" r="20" fill="{APPLE}" {stk(2.4)}/><ellipse cx="{ax + 7}" cy="{ay - 8}" rx="5" ry="3.5" fill="#fff" opacity=".8"/>')
    s.append(f'<path d="M14,100 L226,100 L200,190 Q120,198 40,190 Z" fill="#E9C48F" {stk()}/>')
    for k in range(1, 4):
        yy = 100 + k * 22
        s.append(f'<path d="M{14 + k * 7},{yy} L{226 - k * 7},{yy}" stroke="#C99A5B" stroke-width="2.4"/>')
    for k in range(1, 9):
        xx = 14 + k * 23.5
        s.append(f'<path d="M{xx},{102} L{xx + (120 - xx) * .12:.1f},{188}" stroke="#C99A5B" stroke-width="2.4"/>')
    s.append(f'<rect x="40" y="128" width="160" height="40" rx="6" fill="#fff" {stk(2.4)}/>')
    s.append(text(120, 156, label, size=24, weight=600))
    return W, H, s


for key, lab in (('ba', 'Thứ Ba'), ('tu', 'Thứ Tư'), ('nam', 'Thứ Năm')):
    save(f'bai35_t1_q3_apple_{key}', *apple_card(lab), folder=F)
for key, lab in (('homqua', 'Hôm qua'), ('ngaymai', 'Ngày mai'), ('homnay', 'Hôm nay')):
    save(f'bai35_t1_q3_basket_{key}', *basket_card(lab), folder=F)


# ── Tiết 1, câu 4: ba lọ hoa hồng (3, 5, 7 bông) ────────────────────────────
def rose(x, y, s=1, col='#F07188', dark='#C9405A'):
    return put(x, y, s,
               f'<path d="M-30,-6 Q-34,-40 -10,-44 Q0,-60 14,-44 Q36,-40 30,-6 Q18,12 0,12 Q-18,12 -30,-6 Z" fill="{col}" {stk()}/>'
               f'<path d="M-14,-26 Q0,-44 14,-26 Q4,-14 -14,-26 Z" fill="{dark}" {stk(2)}/>'
               f'<path d="M-24,-10 Q-6,0 4,-22 M24,-10 Q8,2 -2,-14" fill="none" {stk(2)}/>'
               f'<path d="M-8,10 L0,20 L8,10" fill="{GREEN}" {stk(2)}/>')


def vase_shape(cx, by, label):
    return (f'<path d="M{cx - 30},{by - 170} Q{cx},{by - 180} {cx + 30},{by - 170} Q{cx + 20},{by - 150} {cx + 22},{by - 120} '
            f'Q{cx + 76},{by - 60} {cx + 62},{by - 16} Q{cx + 56},{by} {cx + 30},{by} L{cx - 30},{by} Q{cx - 56},{by} {cx - 62},{by - 16} '
            f'Q{cx - 76},{by - 60} {cx - 22},{by - 120} Q{cx - 20},{by - 150} {cx - 30},{by - 170} Z" fill="#DDF1FB" {stk()}/>'
            + text(cx, by - 40, label, size=22, weight=600))


W, H = 720, 470
p = []
TOPS = {3: [(-40, -150), (10, -186), (44, -130)],
        5: [(-50, -150), (-14, -206), (18, -160), (56, -180), (40, -110)],
        7: [(-64, -150), (-30, -210), (14, -168), (52, -214), (74, -144), (-26, -110), (34, -110)]}
for cx, n, lab in ((120, 3, 'Hôm qua'), (360, 5, 'Hôm nay'), (600, 7, 'Ngày mai')):
    by = 460
    top = by - 172
    for (dx, dy) in TOPS[n]:
        p.append(f'<path d="M{cx},{top + 8} Q{cx + dx * .3},{top + dy * .4} {cx + dx},{top + dy + 16}" fill="none" stroke="{GRASS_D}" stroke-width="5" stroke-linecap="round"/>')
    for (dx, dy) in TOPS[n]:
        lx, ly = cx + dx * .55, top + dy * .55
        p.append(f'<path d="M{lx},{ly} q{(-1 if dx < 0 else 1) * 22},-4 {(-1 if dx < 0 else 1) * 30},10 q-16,6 -{(-1 if dx < 0 else 1) * 30},-10 Z" fill="{GREEN}" {stk(2)}/>')
    for (dx, dy) in TOPS[n]:
        p.append(rose(cx + dx, top + dy, .9))
    p.append(vase_shape(cx, by, lab))
p.append(pill(360, 24, 120, 40, 'Thứ Ba', size=21, weight=500))
save('bai35_t1_q4_roses', W, H, p, folder=F)


# ── Tiết 2, câu 1: chú ếch nhảy qua bảy lá sen ──────────────────────────────
W, H = 700, 440
p = [f'<path d="M20,120 Q10,60 120,62 Q360,40 560,60 Q690,70 690,190 Q700,330 640,400 Q420,440 200,430 Q20,420 14,300 Z" fill="#E3EEF5"/>']
# dãy 1 → 7 ở trên
for i in range(7):
    cx = 110 + i * 80
    if i:
        p.append(f'<path d="M{cx - 58},20 L{cx - 22},20" {stk(2.6)}/><path d="M{cx - 30},14 L{cx - 21},20 L{cx - 30},26" fill="none" {stk(2.6)}/>')
    p.append(f'<circle cx="{cx}" cy="20" r="17" fill="#fff" {stk(2.6)}/>' + text(cx, 28, i + 1, size=21, weight=700))
pads = {1: (110, 170), 2: (320, 136), 3: (600, 186), 4: (455, 262), 5: (110, 296), 6: (340, 376), 7: (590, 360)}
for k, (x, y) in pads.items():
    p.append(kit_g2.lily_pad(x, y, 82, 48, rot={1: 60, 2: 20, 3: 200, 4: 120, 5: 10, 6: 300, 7: 200}[k], c='#5EC3EE', vein='#2B8FC6'))
# mũi tên nhảy
for (x1, y1, x2, y2, bend) in ((150, 150, 305, 128, -40), (360, 115, 590, 180, -50), (560, 168, 470, 244, -30),
                               (410, 252, 110, 288, -30), (150, 300, 330, 370, 40), (385, 348, 585, 352, -40)):
    p.append(arrow(x1, y1, x2, y2, bend))
for k, (x, y) in pads.items():
    nx, ny = x - 6, y + 34
    if k == 4:
        nx, ny = x + 6, y - 20
    p.append(f'<circle cx="{nx}" cy="{ny}" r="16" fill="#fff" {stk(2.4)}/>' + text(nx, ny + 7, k, size=20, weight=700))
p.append(f'<rect x="{pads[4][0] - 50}" y="{pads[4][1] + 2}" width="104" height="30" rx="6" fill="#fff" {stk(2)}/>' + text(pads[4][0] + 2, pads[4][1] + 24, 'Thứ Năm', size=19, weight=600))
p.append(f'<g transform="translate(96,160)">{kit_l1_29.frog_sit()}</g>')
save('bai35_t2_q1_frog', W, H, p, folder=F)


# ── Tiết 2, câu 2: con bướm (thứ) – bông hoa (hôm qua / ngày mai / hôm nay) ──
def bfly_card(label, rot):
    W, H = 220, 170
    s = [put(110, 92, 1.9, kit_l1_c.butterfly('#7CC6E8', '#CFEFFB')),
         f'<g transform="rotate({rot} 110 74)"><ellipse cx="110" cy="74" rx="62" ry="20" fill="#fff" {stk(2.2)}/>' + text(110, 81, label, size=19, weight=600) + '</g>']
    return W, H, s


def flower_card(label):
    W, H = 220, 230
    s = [f'<path d="M110,120 Q104,180 112,226" fill="none" stroke="#4E6B7A" stroke-width="7" stroke-linecap="round"/>',
         f'<path d="M108,190 Q70,160 40,176 Q70,204 108,196 Z M112,180 Q150,150 180,166 Q150,194 112,186 Z" fill="#5EC3EE" {stk(2.4)}/>']
    for i in range(8):
        a = math.radians(i * 45)
        px, py = 110 + 58 * math.cos(a), 84 + 50 * math.sin(a)
        s.append(f'<ellipse cx="{px:.1f}" cy="{py:.1f}" rx="34" ry="26" fill="#7CC6E8" {stk(2.4)} transform="rotate({i * 45} {px:.1f} {py:.1f})"/>')
    s.append(f'<ellipse cx="110" cy="84" rx="58" ry="36" fill="#fff" {stk(2.4)}/>')
    w1, w2 = label.split(' ')
    s.append(text(110, 78, w1, size=21, weight=600) + text(110, 104, w2, size=21, weight=600))
    return W, H, s


for key, lab, rot in (('bay', 'Thứ Bảy', -28), ('cn', 'Chủ nhật', 30), ('sau', 'Thứ Sáu', 30)):
    save(f'bai35_t2_q2_bfly_{key}', *bfly_card(lab, rot), folder=F)
for key, lab in (('homqua', 'Hôm qua'), ('ngaymai', 'Ngày mai'), ('homnay', 'Hôm nay')):
    save(f'bai35_t2_q2_flower_{key}', *flower_card(lab), folder=F)


# ── Tiết 2, câu 3: mê cung (một hình cho cả a và b) ─────────────────────────
# toạ độ tường đo trên trang sách (bản 220 dpi, khung 1420 × 910), thu nhỏ k lần.
K = .5
WALLS = [
    ((10, 38), (1385, 38)), ((27, 38), (27, 885)), ((10, 885), (1380, 885)), ((1368, 38), (1368, 750)),
    ((267, 38), (267, 258)), ((267, 258), (452, 258)),
    ((525, 38), (525, 258)), ((525, 258), (712, 258)),
    ((330, 370), (692, 370)), ((333, 370), (333, 535)), ((685, 370), (685, 530)), ((500, 530), (692, 530)),
    ((685, 425), (808, 425)), ((808, 425), (808, 130)), ((808, 130), (988, 130)), ((988, 130), (988, 192)), ((988, 192), (1368, 192)),
    ((27, 367), (220, 367)), ((213, 367), (213, 532)),
    ((416, 482), (416, 650)), ((27, 650), (422, 650)), ((268, 650), (268, 760)), ((268, 757), (600, 757)), ((595, 652), (595, 757)),
    ((912, 325), (1112, 325)), ((914, 325), (914, 538)), ((914, 530), (1112, 530)),
    ((1040, 325), (1040, 440)), ((1040, 437), (1225, 437)), ((1218, 437), (1218, 640)), ((970, 637), (1225, 637)), ((975, 637), (975, 885)),
    ((1180, 748), (1368, 748)),
]
# chỗ chấm (đầu trái, đầu phải, độ cao) và chữ đánh dấu theo thứ tự đọc (trên → dưới, trái → phải)
DOTS = {'A': (975, 1165, 290), 'B': (185, 378, 340), 'C': (185, 378, 618), 'D': (500, 690, 618), 'E': (1120, 1310, 716), 'G': (1078, 1268, 840)}
T = 16


def wall(a, b):
    (x1, y1), (x2, y2) = a, b
    x, y = min(x1, x2) - T / 2, min(y1, y2) - T / 2
    w, h = abs(x2 - x1) + T, abs(y2 - y1) + T
    return f'<rect x="{x * K:.1f}" y="{y * K:.1f}" width="{w * K:.1f}" height="{h * K:.1f}" fill="#9ED8F5" stroke="{INK}" stroke-width="1.6"/>'


W, H = int(1440 * K), int(905 * K)
p = []
p += [wall(a, b) for a, b in WALLS]
# vá chỗ nối (tô lại phần trong tường cho liền nét)
p += [f'<rect x="{(min(a[0], b[0]) - T / 2 + 1.6) * K:.1f}" y="{(min(a[1], b[1]) - T / 2 + 1.6) * K:.1f}" width="{(abs(b[0] - a[0]) + T - 3.2) * K:.1f}" height="{(abs(b[1] - a[1]) + T - 3.2) * K:.1f}" fill="#9ED8F5"/>' for a, b in WALLS]
p.append(f'<path d="M{1350 * K},{812 * K} L{1400 * K},{812 * K}" stroke="{LINE}" stroke-width="7"/><path d="M{1395 * K},{798 * K} L{1420 * K},{812 * K} L{1395 * K},{826 * K} Z" fill="{LINE}"/>')
for ch, (x1, x2, y) in DOTS.items():
    p.append(dots(x1 * K + 22, x2 * K, y * K))
    p.append(f'<circle cx="{x1 * K + 8}" cy="{y * K - 4}" r="10" fill="{YELLOW}" {stk(2)}/>' + text(x1 * K + 8, y * K + 1.5, ch, size=14, weight=700))
# thỏ + "Thứ Hai"
bunny = (f'<ellipse cx="-12" cy="-74" rx="8" ry="22" fill="#fff" {stk(2.4)} transform="rotate(-12 -12 -74)"/>'
         f'<ellipse cx="12" cy="-74" rx="8" ry="22" fill="#fff" {stk(2.4)} transform="rotate(12 12 -74)"/>'
         f'<ellipse cx="0" cy="-22" rx="20" ry="22" fill="#fff" {stk(2.4)}/>'
         f'<circle cx="0" cy="-50" r="19" fill="#fff" {stk(2.4)}/>' + eye(-7, -52, 3) + eye(7, -52, 3)
         + f'<ellipse cx="-12" cy="-1" rx="10" ry="6" fill="#fff" {stk(2.2)}/><ellipse cx="12" cy="-1" rx="10" ry="6" fill="#fff" {stk(2.2)}/>'
         f'<path d="M-4,-42 q4,4 8,0" fill="none" {stk(2)}/><ellipse cx="-12" cy="-74" rx="3" ry="12" fill="{PINK}" transform="rotate(-12 -12 -74)"/>'
         f'<ellipse cx="12" cy="-74" rx="3" ry="12" fill="{PINK}" transform="rotate(12 12 -74)"/>')
p.append(put(72, 104, .9, bunny))
p.append(text(72, 128, 'Thứ Hai', size=16, weight=600))
save('bai35_t2_q3_maze', W, H, p, folder=F)
