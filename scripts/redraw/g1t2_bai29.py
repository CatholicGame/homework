"""Vở BT Toán 1 Tập Hai — Bài 29 (Phép cộng số có hai chữ số với số có một chữ số), trang 45–48.
T1 q3: bọ ngựa nằm võng, đàn kiến (minh hoạ).  T1 q4: bàn cờ "Tàu chiếm đảo" 8 × 8, 20 đảo có phép tính.
T2 q3: cây chuối (minh hoạ).  T2 q4: 4 hải cẩu 79, 58, 27, 68 và 4 tảng băng 76 + 3, 24 + 3, 53 + 5, 61 + 7.
T2 q5: rô-bốt, tàu ngầm, 3 hòm 50 + 6, 51 + 4, 52 + 2 (thân hòm trắng để tô)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_c import *


def ant(x, y, s=1, flip=False):
    inner = []
    for lx in (-8, 0, 8):
        inner.append(f'<path d="M{lx},-8 L{lx - 6},0 M{lx},-8 L{lx + 5},0" fill="none" {st(2)}/>')
    inner += [f'<ellipse cx="-14" cy="-12" rx="9" ry="7" fill="{INK}"/>', f'<ellipse cx="0" cy="-12" rx="6" ry="5" fill="{INK}"/>',
              f'<circle cx="12" cy="-16" r="7" fill="{INK}"/>', f'<circle cx="14" cy="-18" r="2" fill="#fff"/>',
              f'<path d="M14,-22 Q18,-32 24,-30 M10,-22 Q12,-32 16,-34" fill="none" {st(1.6)}/>']
    return g(x, y, s, ''.join(inner), flip=flip)


# ── T1 q3: bọ ngựa nằm võng ───────────────────────────────────────────────────
W, H = 380, 236
p = [f'<rect x="0" y="0" width="{W}" height="{H}" rx="18" fill="#E6F5FC"/>',
     f'<path d="M0,196 Q120,180 380,192 V236 H0 Z" fill="{GRASS}"/>',
     P('M18,236 L26,0 H52 L60,236 Z', BROWN), P('M322,236 L330,0 H356 L364,236 Z', BROWN),
     bush(70, 200, 70), bush(320, 204, 60),
     f'<path d="M52,58 Q190,190 330,58" fill="none" stroke="#C98B4E" stroke-width="4"/>',
     P('M52,58 Q100,150 190,152 Q280,150 330,58 Q280,120 190,124 Q100,120 52,58 Z', '#F4A259', 2.6)]
# bọ ngựa nằm ngửa trên võng (đầu bên trái)
p.append(P('M110,122 Q150,96 230,104 Q262,108 268,118 Q250,130 200,132 Q140,134 110,122 Z', '#9BD58A'))
p.append(f'<path d="M232,110 L262,82 M246,116 L284,96 M170,112 L176,78 L196,70" fill="none" {st(5, "#5DAF5B")}/>')
p.append(P('M84,110 Q90,92 110,98 Q120,110 108,122 Q92,126 84,110 Z', '#9BD58A'))
p.append(f'<path d="M96,98 Q88,74 76,66 M104,96 Q104,72 96,58" fill="none" {st(2)}/>')
p.append(f'<circle cx="92" cy="106" r="5" fill="#fff" {st(1.6)}/><circle cx="91" cy="106" r="2" fill="{INK}"/>')
p.append(P('M118,112 Q130,100 144,108 L120,80 Q114,94 118,112 Z', '#9BD58A', 2.4))
for i, (ax, fl) in enumerate([(120, False), (160, False), (250, True), (290, True), (210, False)]):
    p.append(ant(ax, 214 + (i % 2) * 6, .9, fl))
out('bai29_t1_q3_mantis', W, H, p)

# ── T1 q4: bàn cờ Tàu chiếm đảo ───────────────────────────────────────────────
C, ML = 74, 44
W, H = ML * 2 + 8 * C, 8 * C + 16
ISL = [(0, 2, '30 + 4', 0), (0, 5, '56 + 3', 2), (1, 0, '35 + 1', 1), (1, 3, '43 + 5', 2), (1, 6, '12 + 3', 0),
       (2, 1, '24 + 1', 0), (2, 4, '62 + 2', 1), (2, 7, '8 + 20', 1), (3, 2, '21 + 7', 1), (3, 6, '13 + 3', 0),
       (4, 1, '51 + 4', 2), (4, 4, '91 + 6', 1), (5, 0, '5 + 20', 1), (5, 3, '33 + 3', 0), (5, 6, '5 + 11', 2),
       (6, 2, '15 + 3', 2), (6, 5, '9 + 50', 1), (7, 0, '80 + 6', 0), (7, 4, '70 + 4', 2), (7, 7, '4 + 25', 1)]
p = [f'<rect x="{ML}" y="8" width="{8 * C}" height="{8 * C}" fill="#F2FAFF"/>',
     f'<rect x="{ML}" y="8" width="{C}" height="{C}" fill="#C9D1DA"/>']
for i in range(9):
    p.append(f'<line x1="{ML + i * C}" y1="8" x2="{ML + i * C}" y2="{8 + 8 * C}" stroke="#2E9BD6" stroke-width="2"/>')
    p.append(f'<line x1="{ML}" y1="{8 + i * C}" x2="{ML + 8 * C}" y2="{8 + i * C}" stroke="#2E9BD6" stroke-width="2"/>')
for r, c, expr, kind in ISL:
    X, Y = ML + c * C, 8 + r * C
    p.append(island(X + C / 2, Y + C - 10, C * .92, kind))
    p.append(label_pill(X + C / 2, Y + C - 17, expr, 14, C - 8))
p.append(sailboat(ML + C / 2, 8 + C - 14, 50))
p.append(f'<path d="M{ML + C + 4},{8 + C / 2} H{ML + C + 30}" stroke="#2E9BD6" stroke-width="5"/>'
         f'<path d="M{ML + C + 26},{8 + C / 2 - 8} L{ML + C + 38},{8 + C / 2} L{ML + C + 26},{8 + C / 2 + 8} Z" fill="#2E9BD6"/>')
for r in range(7):
    side = 'R' if r % 2 == 0 else 'L'
    x = ML + 8 * C + 6 if side == 'R' else ML - 6
    p.append(turn_arrow(x, 8 + r * C + C * .58, side, C * .21))
out('bai29_t1_q4_board', W, H, p)

# ── T2 q3: cây chuối ──────────────────────────────────────────────────────────
W, H = 230, 300
p = [f'<ellipse cx="115" cy="290" rx="70" ry="8" fill="{GRASS}"/>',
     P('M100,292 Q104,200 108,150 H126 Q128,200 134,292 Z', '#B6C77A')]
for a, l, col in [(-160, 100, GREEN), (-130, 110, '#8FD08F'), (-95, 108, GREEN), (-60, 110, '#8FD08F'), (-25, 100, GREEN), (-110, 90, GREEN), (-75, 96, GREEN)]:
    ex, ey = 117 + l * math.cos(math.radians(a)), 150 + l * math.sin(math.radians(a))
    nx, ny = -math.sin(math.radians(a)) * 20, math.cos(math.radians(a)) * 20
    mx, my = (117 + ex) / 2, (150 + ey) / 2
    p.append(P(f'M117,150 Q{mx + nx:.1f},{my + ny:.1f} {ex:.1f},{ey:.1f} Q{mx - nx:.1f},{my - ny:.1f} 117,150 Z', col, 2.4))
    p.append(f'<path d="M117,150 L{ex:.1f},{ey:.1f}" stroke="{GRASS_D}" stroke-width="1.6"/>')
p.append(f'<path d="M128,158 Q150,170 146,214" fill="none" {st(3, "#8A9A4A")}/>')
for i in range(3):
    for j in range(2):
        bx, by = 140 + j * 12, 172 + i * 13
        p.append(P(f'M{bx},{by} q4,14 20,12 q-14,-4 -14,-14 Z', YELLOW, 2))
p.append(P('M146,214 q-8,16 0,30 q8,-14 0,-30 Z', '#B0507A', 2))
out('bai29_t2_q3_banana', W, H, p)

# ── T2 q4: hải cẩu và tảng băng ───────────────────────────────────────────────
def seal(n, extra):
    W, H = 170, 214
    s = []
    s.append(f'<line x1="26" y1="40" x2="38" y2="188" {st(3, "#8A6A4A")}/>' + f'<path d="M26,40 Q10,90 18,150" fill="none" stroke="{GREY}" stroke-width="1.4"/>')
    s.append(P('M48,200 Q34,206 26,196 Q40,190 58,186 Z M122,200 Q136,206 144,196 Q130,190 112,186 Z', '#9AA6B2', 2.6))
    s.append(P('M85,52 Q124,52 128,112 Q132,168 112,192 Q85,204 58,192 Q38,168 42,112 Q46,52 85,52 Z', '#AEB9C4'))
    s.append(f'<ellipse cx="85" cy="128" rx="30" ry="40" fill="#fff" {st(2)}/>')
    s.append(text(85, 138, str(n), 30, 700, '#2E9BD6'))
    s.append(P('M48,110 Q30,130 34,150 Q46,140 52,126 Z', '#9AA6B2', 2.4))
    s.append(P('M122,110 Q140,130 136,150 Q124,140 118,126 Z', '#9AA6B2', 2.4))
    s.append(eyes(85, 74, 12, 3.6) + f'<ellipse cx="85" cy="84" rx="5" ry="3.5" fill="{INK}"/>' + P('M76,88 Q85,96 94,88', 'none', 2))
    for wy in (86, 90):
        s.append(f'<line x1="72" y1="{wy}" x2="60" y2="{wy - 2}" {st(1.2)}/><line x1="98" y1="{wy}" x2="110" y2="{wy - 2}" {st(1.2)}/>')
    s.append(f'<path d="M30,56 L38,186" stroke="{INK}" stroke-width="0"/>' + f'<circle cx="40" cy="126" r="6" fill="{GREY_L}" {st(2)}/>')
    s.append(extra)
    out(f'bai29_t2_q4_seal{n}', W, H, s)

bucket = lambda x, y, w=34: (f'<path d="M{x - w / 2},{y} L{x - w * .38:.1f},{y + w * .9:.1f} H{x + w * .38:.1f} L{x + w / 2},{y} Z" fill="#6FB7EA" {st(2.6)}/>'
                            f'<ellipse cx="{x}" cy="{y}" rx="{w / 2}" ry="5" fill="#4E9CC8" {st(2.4)}/>')
seal(79, bucket(140, 150) + P('M124,150 Q140,120 156,150', 'none', 2.4))
seal(58, bucket(85, 30, 40) + P('M122,96 Q140,70 118,52', 'none', 0))
seal(27, f'<line x1="132" y1="88" x2="146" y2="164" {st(4, "#8A6A4A")}/>' + P('M118,92 Q134,78 156,86 L150,92 Q136,88 124,98 Z', GREY, 2.4))
seal(68, f'<rect x="118" y="128" width="40" height="10" rx="3" fill="#6FB7EA" {st(2.4)}/>'
         f'<path d="M124,138 L120,170 M152,138 L156,170 M138,138 V166" fill="none" {st(4, "#4E9CC8")}/>')

for expr, name in [('76 + 3', '76'), ('24 + 3', '24'), ('53 + 5', '53'), ('61 + 7', '61')]:
    W, H = 210, 100
    out(f'bai29_t2_q4_ice{name}', W, H, [ice_floe(105, 46, 190, 70), text(105, 56, expr, 28, 700)])

# ── T2 q5: rô-bốt và ba chiếc hòm ─────────────────────────────────────────────
W, H = 780, 340
p = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#DDF1FB"/>',
     f'<circle cx="270" cy="70" r="34" fill="#BFE3F7" {st(2.4)}/>', f'<circle cx="390" cy="118" r="32" fill="#BFE3F7" {st(2.4)}/>',
     cloud(110, 40, 120), cloud(640, 34, 140), cloud(520, 92, 90),
     P('M0,200 Q160,170 330,190 Q520,214 780,180 V340 H0 Z', '#F3FBFF'),
     f'<path d="M0,232 Q200,214 420,236 Q600,250 780,226" fill="none" {st(2, SKY_D)}/>']
# tàu ngầm mắc cạn bên phải
sub = (P('M-90,10 Q-96,-26 -50,-30 H60 Q100,-24 98,8 Q92,34 50,36 H-60 Q-92,34 -90,10 Z', '#8E99A6')
       + f'<rect x="-30" y="-58" width="48" height="30" rx="8" fill="#8E99A6" {st()}/>'
       + ''.join(f'<circle cx="{cx}" cy="4" r="10" fill="{WIN}" {st(2.4)}/>' for cx in (-44, -10, 24, 58))
       + P('M98,0 L118,-16 V22 Z', '#6B7280', 2.4))
p.append(g(690, 112, .72, sub, rot=-28))
p.append(K1.robot(110, 318, 210, arm_pose='think'))
for cx, expr in [(330, '50 + 6'), (510, '51 + 4'), (690, '52 + 2')]:
    p.append(treasure_chest(cx, 318, 156))
    p.append(label_pill(cx, 318 - 156 * .82, expr, 20, 90))
out('bai29_t2_q5_chests', W, H, p)
