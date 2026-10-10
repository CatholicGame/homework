"""Vở BT Toán 1 Tập Hai — Bài 27 (Thực hành ước lượng và đo độ dài), trang 37–40.
Tiết 1 q1: hàng 7 ghim; bút sáp 2 ghim (0→2), bút chì 3 ghim (2→5), gọt bút chì 1 ghim (6→7).
Tiết 1 q2: tấm gỗ dài 5 gang tay (mẫu). q3: bàn dài bằng 5 cái thước kẻ (mẫu). q4: bức tường dài 9 bước chân (mẫu).
Tiết 2 q2: bút chì (10 cm), cái bàn (10 gang tay), nền gạch (10 bước chân), hình để nối.
Tiết 2 q3: nền nhà Nam 11 × 6 viên gạch, nền nhà Việt 10 × 5 viên (cùng cỡ gạch).
Tiết 2 q4: toà nhà A 9 tầng, toà nhà B 8 tầng (các tầng cao bằng nhau)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_b import *

# ── Tiết 1 q1 ───────────────────────────────────────────────────────────────
CW, X0 = 84, 14
p = [clip_row(X0, 150, 7, CW)]
p.append(crayon(X0, X0 + 2 * CW, 84, w=40))
p.append(pencil(X0 + 2 * CW, X0 + 5 * CW, 60, w=30))
p.append(sharpener(X0 + 6 * CW, X0 + 7 * CW, 90, col='#6FB7EA'))
for i in (0, 2, 5, 6, 7):
    p.append(dash(X0 + i * CW, 30 if i in (2, 5) else 50, X0 + i * CW, 150))
out('bai27_t1_q1_clips', X0 * 2 + 7 * CW, 172, p)
out('bai27_ic_crayon', 130, 50, [crayon(6, 124, 25, w=30)])
out('bai27_ic_pencil', 200, 50, [pencil(6, 194, 25, w=22)])
out('bai27_ic_sharpener', 70, 60, [sharpener(8, 62, 30, col='#6FB7EA')])


def wood(x, y, w, h, col='#E3B579', grain='#B9844A'):
    s = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{col}" {st(2.6)}/>']
    for i in range(5):
        yy = y + 12 + i * (h - 24) / 4
        s.append(f'<path d="M{x + 10},{yy} Q{x + w * .3},{yy - 8} {x + w * .55},{yy} T{x + w - 10},{yy}" fill="none" stroke="{grain}" stroke-width="2"/>')
    s.append(f'<ellipse cx="{x + w * .45}" cy="{y + h * .5}" rx="22" ry="9" fill="none" stroke="{grain}" stroke-width="2"/>')
    return ''.join(s)


# ── Tiết 1 q2: gang tay ─────────────────────────────────────────────────────
SP = 132
X0 = 20
p = [arrow2(X0, X0 + 5 * SP, 22), wood(X0, 40, 5 * SP, 110)]
for i in range(6):
    p.append(dash(X0 + i * SP, 150, X0 + i * SP, 250))
p.append(hand(X0, 170, SP))
out('bai27_t1_q2_hand', X0 * 2 + 5 * SP, 262, p)

# ── Tiết 1 q3: bàn và thước kẻ ──────────────────────────────────────────────
RL = 104
X0 = 60
p = [f'<path d="M{X0 - 10},90 L{X0 + 60},20 L{X0 + 5 * RL + 110},20 L{X0 + 5 * RL + 40},90 Z" fill="#4FB8F0" {st(2.6)}/>',
     f'<rect x="{X0 - 10}" y="90" width="{5 * RL + 50}" height="18" fill="#3B8FD0" {st(2.6)}/>',
     f'<path d="M{X0 + 5 * RL + 40},90 L{X0 + 5 * RL + 110},20 L{X0 + 5 * RL + 110},38 L{X0 + 5 * RL + 40},108 Z" fill="#2F78B0" {st(2.6)}/>']
for lx, top, h in ((X0 + 10, 108, 130), (X0 + 70, 60, 110), (X0 + 5 * RL + 10, 108, 130), (X0 + 5 * RL + 80, 60, 110)):
    p.insert(0 if top == 60 else len(p), f'<rect x="{lx}" y="{top}" width="22" height="{h}" fill="{GREY}" {st(2.4)}/>')
for i in range(5):
    p.append(ruler(X0 + i * RL + 4, 70, 10, (RL - 8) / 10, h=16, fs=0.1, label='', col='#FFFFFF'))
p.append(arrow2(X0, X0 + 5 * RL, 128, col='#1E88D0'))
out('bai27_t1_q3_table', X0 + 5 * RL + 130, 250, p)

# ── Tiết 1 q4: bức tường và bước chân ───────────────────────────────────────
ST = 78
X0 = 20
W = X0 * 2 + 9 * ST
p = []
BH, BWk = 26, 56
for r in range(10):
    off = 0 if r % 2 == 0 else BWk / 2
    for c in range(-1, int(9 * ST / BWk) + 2):
        x = X0 + off + c * BWk
        x1, x2 = max(X0, x), min(X0 + 9 * ST, x + BWk)
        if x2 > x1:
            p.append(f'<rect x="{x1}" y="{20 + r * BH}" width="{x2 - x1}" height="{BH}" fill="#CDEBFA" stroke="#7CC6E8" stroke-width="2"/>')
p.append(f'<line x1="{X0}" y1="280" x2="{X0 + 9 * ST}" y2="280" {st(3)}/>')
for i in range(10):
    p.append(f'<line x1="{X0 + i * ST}" y1="274" x2="{X0 + i * ST}" y2="286" {st(2)}/>')
import kit_g3 as K3
p.append(put(K3.person(legs='walk', shirt=BLUE, arms=((-50, -120), (50, -150))), X0 + ST / 2 + 4, 278, .6))
out('bai27_t1_q4_wall', W, 296, p)

# ── Tiết 2 q2: ba hình để nối ───────────────────────────────────────────────
out('bai27_t2_q2_pencil', 260, 70, [pencil(10, 220, 28, w=22), f'<g transform="translate(0,0)">{arrow2(10, 220, 56, col="#1E88D0")}</g>'])
tp = [f'<path d="M20,80 L80,20 L300,20 L240,80 Z" fill="#4FB8F0" {st(2.6)}/>']
for lx, top, h in ((30, 80, 100), (80, 40, 100), (210, 80, 100), (270, 40, 100)):
    tp.insert(0 if top == 40 else len(tp), f'<rect x="{lx}" y="{top}" width="16" height="{h}" fill="{GREY}" {st(2.2)}/>')
tp.append(arrow2(20, 240, 86, col='#1E88D0'))
out('bai27_t2_q2_table', 310, 186, tp)
fp = [arrow2(10, 10 + 10 * 46, 14, col='#1E88D0')]
for r in range(4):
    for c in range(10):
        fp.append(f'<rect x="{10 + c * 46}" y="{28 + r * 46}" width="46" height="46" fill="#6FC3F0" {st(1.8)}/>')
        fp.append(f'<path d="M{20 + c * 46},{34 + r * 46} q14,8 6,22 q-6,12 10,18" fill="none" stroke="#B5E2F8" stroke-width="5" stroke-linecap="round"/>')
out('bai27_t2_q2_floor', 480, 216, fp)

# ── Tiết 2 q3: nền gạch ─────────────────────────────────────────────────────
T = 30


def floor(x, y, cols, rows):
    s = [arrow2(x, x + cols * T, y - 16)]
    for r in range(rows):
        for c in range(cols):
            s.append(f'<rect x="{x + c * T}" y="{y + r * T}" width="{T}" height="{T}" fill="#5DB4EA" {st(1.6)}/>')
            s.append(f'<circle cx="{x + c * T + T / 2}" cy="{y + r * T + T / 2}" r="{T * .3}" fill="#BFE6F7"/>')
    return ''.join(s)


p = [text(20, 24, 'a) Nền nhà Nam', 20, 700, anchor='start'), floor(20, 60, 11, 6),
     text(400, 24, 'b) Nền nhà Việt', 20, 700, anchor='start'), floor(400, 90, 10, 5)]
out('bai27_t2_q3_floors', 720, 250, p)

# ── Tiết 2 q4: hai toà nhà ──────────────────────────────────────────────────
FH = 30
GY = 330


def tower(x, floors, col, w=230):
    s = [f'<path d="M{x - 8},{GY - floors * FH - 6} L{x + w + 40},{GY - floors * FH + 4} L{x + w + 40},{GY - floors * FH - 4} L{x - 8},{GY - floors * FH - 14} Z" fill="#4A4A4A" {st(2)}/>']
    s.append(f'<rect x="{x}" y="{GY - floors * FH}" width="{w}" height="{floors * FH}" fill="{col}" {st(2.4)}/>')
    s.append(f'<rect x="{x + w}" y="{GY - floors * FH}" width="32" height="{floors * FH}" fill="{GREY_L}" {st(2.4)}/>')
    for f in range(floors):
        yy = GY - (f + 1) * FH
        s.append(f'<line x1="{x}" y1="{yy}" x2="{x + w + 32}" y2="{yy}" {st(1.6)}/>')
        for c in range(4):
            for wdw in range(2):
                s.append(f'<rect x="{x + 10 + c * w / 4 + wdw * 24}" y="{yy + 9}" width="18" height="11" fill="#fff" {st(1.4)}/>')
    for c in range(1, 4):
        s.append(f'<line x1="{x + c * w / 4}" y1="{GY - floors * FH}" x2="{x + c * w / 4}" y2="{GY}" {st(2.4)}/>')
    return ''.join(s)


p = [f'<ellipse cx="380" cy="{GY + 6}" rx="370" ry="30" fill="{GREY_L}"/>']
p.append(tower(70, 9, '#BFE6F7'))
p.append(tower(420, 8, '#4FB8F0'))
p.append(round_tree(60, GY + 10, 170))
p.append(round_tree(410, GY + 14, 140, crown='#3B8FD0'))
p.append(text(185, GY + 34, 'A', 24, 800) + text(535, GY + 34, 'B', 24, 800))
out('bai27_t2_q4_buildings', 760, GY + 44, p)
