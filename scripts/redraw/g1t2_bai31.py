"""Vở BT Toán 1 Tập Hai — Bài 31 (Phép trừ số có hai chữ số cho số có một chữ số), trang 53–58.
T1 q3: 4 ô tô 58 − 4, 67 − 2, 49 − 9, 56 − 5.  T1 q4: khu vườn (minh hoạ).
T2 q2: 5 mèo 72 − 2, 98 − 3, 55 − 2, 66 − 4, 94 − 0 và 5 cá 96 − 1, 69 − 7, 79 − 9, 95 − 1, 59 − 6.
T2 q4: tủ lạnh có sữa chua (minh hoạ).
T3 q2: vòng tròn số 50, tám ô 58 − 7, 50 + 0, 56 − 4, 55 − 5, 48 − 5, 61 − 1, 38 − 1, 49 − 9 (ô trắng để tô).
T3 q3: bạn nữ, bạn nam (98 cm), bạn nữ thấp hơn 5 cm.  T3 q4: 15 con vật mang số 63–68, xúc xắc."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_c import *

MINUS = '−'

# ── T1 q3: ô tô ───────────────────────────────────────────────────────────────
for expr in ['58 − 4', '67 − 2', '49 − 9', '56 − 5']:
    W, H = 230, 150
    p = [g(10, 146, 1.5, small_car(0, 0, '#9AD3F2')), text(118, 90, expr, 22, 700)]
    out(f'bai31_t1_q3_car{expr.split()[0]}', W, H, p)

# ── T1 q4: khu vườn ───────────────────────────────────────────────────────────
W, H = 700, 280
p = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#E6F5FC"/>',
     f'<circle cx="40" cy="30" r="40" fill="{YELLOW}" {st()}/>', cloud(380, 40, 120), cloud(600, 56, 110), cloud(230, 30, 80),
     f'<path d="M0,190 H{W} V{H} H0 Z" fill="{GRASS}"/>']
for fx in range(20, W, 34):
    p.append(f'<rect x="{fx}" y="150" width="12" height="54" rx="3" fill="#FFF4DF" {st(2)}/>')
p.append(f'<rect x="0" y="162" width="{W}" height="9" fill="#FFF4DF" {st(2)}/>')
p.append(round_tree(170, 262, 230, crown='#7BCB8B'))
p.append(round_tree(560, 262, 200, crown='#8FD08F', fruit=ORANGE,
                    fruits=[(-40, -110), (-10, -126), (24, -112), (40, -92), (-30, -88), (6, -96), (-50, -104)]))
banana = []
for a, l in [(-160, 80), (-125, 90), (-90, 92), (-55, 90), (-20, 80)]:
    ex, ey = l * math.cos(math.radians(a)), -150 + l * math.sin(math.radians(a))
    nx, ny = -math.sin(math.radians(a)) * 16, math.cos(math.radians(a)) * 16
    banana.append(P(f'M0,-150 Q{ex / 2 + nx:.1f},{-150 + (ey + 150) / 2 + ny:.1f} {ex:.1f},{ey:.1f} Q{ex / 2 - nx:.1f},{-150 + (ey + 150) / 2 - ny:.1f} 0,-150 Z', GREEN, 2.4))
p.append(g(370, 262, 1, P('M-10,0 Q-8,-90 -4,-150 H8 Q10,-90 14,0 Z', '#B6C77A') + ''.join(banana)))
for bx in (80, 300, 470, 650):
    p.append(bush(bx, 268, 60, GRASS_D))
out('bai31_t1_q4_garden', W, H, p)

# ── T2 q2: mèo và cá ──────────────────────────────────────────────────────────
for expr in ['72 − 2', '98 − 3', '55 − 2', '66 − 4', '94 − 0']:
    W, H = 250, 130
    p = [cat(64, 124, 1.08, '#E9E3F5', '#7A7096'),
         f'<rect x="104" y="68" width="138" height="46" rx="10" fill="#9AD3F2" {st()}/>', text(173, 100, expr, 26, 700)]
    out(f'bai31_t2_q2_cat{expr.split()[0]}', W, H, p)
for expr in ['96 − 1', '69 − 7', '79 − 9', '95 − 1', '59 − 6']:
    W, H = 220, 110
    p = [fish(118, 56, 176, '#6FB7EA', '#3F86C4'), text(112, 65, expr, 24, 700)]
    out(f'bai31_t2_q2_fish{expr.split()[0]}', W, H, p)

# ── T2 q4: tủ lạnh ────────────────────────────────────────────────────────────
W, H = 240, 280
p = [f'<rect x="20" y="10" width="140" height="260" rx="12" fill="#E8F1F8" {st()}/>',
     f'<rect x="32" y="22" width="116" height="236" rx="6" fill="#FFFFFF" {st(2.4)}/>',
     P('M160,14 L226,32 V250 L160,268 Z', '#D6E6F2'),
     f'<line x1="214" y1="110" x2="214" y2="170" {st(5)}/>']
for sy in (80, 140, 200):
    p.append(f'<line x1="32" y1="{sy}" x2="148" y2="{sy}" {st(2.4)}/>')
for i in range(5):
    cx = 46 + i * 22
    for sy in (80, 140):
        p.append(P(f'M{cx - 8},{sy - 22} H{cx + 8} L{cx + 6},{sy} H{cx - 6} Z', '#FFFFFF', 2) + f'<rect x="{cx - 9}" y="{sy - 26}" width="18" height="5" rx="2" fill="{PINK}" {st(1.6)}/>')
p.append(f'<ellipse cx="60" cy="186" rx="20" ry="13" fill="{ORANGE}" {st(2.2)}/><ellipse cx="104" cy="186" rx="18" ry="13" fill="{RED}" {st(2.2)}/>')
p.append(f'<rect x="40" y="214" width="100" height="36" rx="6" fill="#BFE6A8" {st(2.2)}/>')
for sy in (70, 150, 220):
    p.append(f'<path d="M166,{sy} L220,{sy + 6}" {st(2.4)}/>')
    p.append(f'<rect x="174" y="{sy - 30}" width="14" height="30" rx="4" fill="#FFFFFF" {st(2)}/><rect x="196" y="{sy - 26}" width="14" height="28" rx="4" fill="{SKY_D}" {st(2)}/>')
out('bai31_t2_q4_fridge', W, H, p)

# ── T3 q2: vòng tròn số ───────────────────────────────────────────────────────
W, H = 470, 470
CX, CY, R = 235, 235, 172
ring = ['58 − 7', '50 + 0', '56 − 4', '55 − 5', '48 − 5', '61 − 1', '38 − 1', '49 − 9']
p = [f'<circle cx="{CX}" cy="{CY}" r="{R}" fill="none" stroke="{INK}" stroke-width="16"/>',
     f'<circle cx="{CX}" cy="{CY}" r="{R}" fill="none" stroke="#6B7280" stroke-width="10"/>']
for i in range(8):
    a = math.radians(-90 + i * 45)
    p.append(f'<line x1="{CX + 50 * math.cos(a):.1f}" y1="{CY + 50 * math.sin(a):.1f}" x2="{CX + (R - 40) * math.cos(a):.1f}" y2="{CY + (R - 40) * math.sin(a):.1f}" stroke="#B4BCC5" stroke-width="7"/>')
p.append(f'<circle cx="{CX}" cy="{CY}" r="52" fill="#2E9BD6" {st()}/><circle cx="{CX}" cy="{CY}" r="40" fill="#FFFFFF" {st(2.4)}/>' + text(CX, CY + 11, '50', 32, 700))
for i, expr in enumerate(ring):
    a = math.radians(-90 + i * 45)
    x, y = CX + R * math.cos(a), CY + R * math.sin(a)
    p.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="44" fill="#2E9BD6" {st()}/>'
             f'<circle cx="{x:.1f}" cy="{y:.1f}" r="35" fill="#FFFFFF" {st(2.4)}/>' + text(x, y + 7, expr, 19, 700))
out('bai31_t3_q2_wheel', W, H, p)

# ── T3 q3: chiều cao hai bạn ──────────────────────────────────────────────────
W, H = 380, 410
FL = 388
boy_top, girl_top = 46, 66                      # 98 cm và 93 cm (cách nhau 5 cm)
p = [f'<rect x="30" y="{FL}" width="320" height="14" fill="{GREY}" {st(2.2)}/>',
     f'<rect x="186" y="20" width="8" height="{FL - 20}" fill="#8E99A6" {st(2.2)}/>']
p.append(K1.kid(108, FL, (FL - girl_top) * 260 / 282, girl=True, shirt='#7CC6F0', bottom='#4E8FC8', pose='down'))
p.append(K1.kid(272, FL, (FL - boy_top) * 260 / 282, shirt='#7CC6F0', bottom='#9AD3F2', pose='down'))
p.append(f'<line x1="70" y1="{girl_top}" x2="186" y2="{girl_top}" stroke="{INK}" stroke-width="2" stroke-dasharray="5 4"/>')
p.append(f'<line x1="140" y1="{boy_top}" x2="300" y2="{boy_top}" stroke="{INK}" stroke-width="2" stroke-dasharray="5 4"/>')
p.append(f'<path d="M176,{boy_top} V{girl_top} M171,{boy_top} H181 M171,{girl_top} H181" fill="none" {st(2.2)}/>')
p.append(text(146, girl_top - 6, '5 cm', 18, 700))
p.append(text(272, boy_top - 10, '98 cm', 18, 700))
out('bai31_t3_q3_kids', W, H, p)

# ── T3 q4: bắt con vật ────────────────────────────────────────────────────────
W, H = 780, 360
p = [P('M20,40 Q200,10 400,30 Q600,10 760,36 Q780,180 760,320 Q560,350 380,334 Q180,352 24,326 Q0,180 20,40 Z', '#EEF3F7', 2.4)]
ANIMALS = [[('c', 68), ('d', 64), ('c', 66), ('d', 67), ('d', 65)],
           [('c', 63), ('d', 65), ('d', 68), ('d', 68), ('c', 64)],
           [('d', 68), ('c', 64), ('d', 65), ('c', 67), ('d', 63)]]
cols = ['#F5C58E', '#F2D7B5', '#E9E3F5', '#DCEFFB', '#FFE2B8']
for r, row in enumerate(ANIMALS):
    for c, (kind, n) in enumerate(row):
        x = 96 + c * 146 + (r % 2) * 28
        y = 124 + r * 100
        col = cols[(r * 5 + c) % len(cols)]
        p.append(shadow(x, y, 34, 5, .1))
        p.append(cat(x, y, .9, col, '#C98B4E') if kind == 'c' else dog(x, y, .9, col, BROWN))
        p.append(f'<ellipse cx="{x}" cy="{y - 26}" rx="20" ry="13" fill="#FFFFFF" {st(2)}/>' + text(x, y - 20, str(n), 17, 700))
out('bai31_t3_q4_animals', W, H, p)

# xúc xắc nhỏ đặt cạnh dòng "69 − ? = ?"
W, H = 90, 90
out('bai31_t3_q4_die', W, H, [die_face(8, 8, 74, 5, '#DCEFFB')])
