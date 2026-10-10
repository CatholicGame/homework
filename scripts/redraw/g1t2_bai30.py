"""Vở BT Toán 1 Tập Hai — Bài 30 (Phép cộng số có hai chữ số với số có hai chữ số), trang 49–52.
T1 q5: bản đồ kị sĩ: lâu đài 17 + 2, tháp công chúa 10 + 40, làng 10 + 9, 91 + 8, 23 + 13, 20 + 60, lâu đài 10 + 10.
       Đường đúng (kết quả tròn chục): kị sĩ → 10 + 10 → 20 + 60 → 10 + 40.
T2 q3: cá chuồn bay trên mặt biển và bơi dưới biển (minh hoạ).
T2 q5: Héc-quyn → cây táo vàng: trên 30 + 45 (qua cổng), giữa 23 + 36 (qua rồng), dưới 41 + 45 (qua chó ba đầu)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_c import *


def road(d, w=20):
    return (f'<path d="{d}" fill="none" stroke="#9AA4AE" stroke-width="{w + 5}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="#F4F1EA" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


def horse_knight(x, y, k=1):
    """Kị sĩ cưỡi ngựa phi sang phải, (x, y) = giữa đáy."""
    s = []
    hc = '#E7EEF5'
    for lx, ex in ((-50, -64), (-30, -20), (30, 20), (50, 66)):
        s.append(f'<path d="M{lx},-50 L{ex},-4" fill="none" {st(14)}/><path d="M{lx},-50 L{ex},-4" fill="none" {st(9, hc)}/>')
    s.append(P('M-62,-80 Q-100,-90 -96,-40 Q-84,-60 -66,-62 Z', '#8E99A6'))
    s.append(f'<ellipse cx="0" cy="-70" rx="66" ry="30" fill="{hc}" {st()}/>')
    s.append(P('M44,-86 L70,-128 Q80,-140 96,-130 L108,-108 Q112,-98 100,-96 L86,-100 L66,-60 Z', hc))
    s.append(P('M66,-128 L72,-146 L80,-132 Z', hc, 2.4) + f'<circle cx="88" cy="-118" r="3" fill="{INK}"/>')
    s.append(P('M62,-122 Q48,-118 46,-90', 'none', 6, '') if False else P('M66,-130 Q48,-120 44,-86 L52,-90 Q56,-112 70,-120 Z', '#8E99A6', 2.4))
    # người
    s.append(P('M-14,-96 L-22,-150 Q0,-160 18,-150 L14,-96 Z', BLUE))
    s.append(P('M-18,-104 L-10,-70 L4,-70 L6,-100 Z', '#4E8FC8', 2.4))
    s.append(f'<circle cx="0" cy="-172" r="20" fill="{SKIN}" {st()}/>')
    s.append(P('M-22,-172 Q-22,-198 0,-198 Q22,-198 22,-172 L14,-174 Q12,-188 0,-188 Q-12,-188 -14,-174 Z', '#C9D1DA', 2.6))
    s.append(P('M0,-198 Q-10,-214 -26,-210', 'none', 3) + eyes(2, -170, 7, 2.6) + smile(2, -162, 4, 2))
    s.append(f'<path d="M14,-140 L40,-150 L66,-206" fill="none" {st(6)}/><path d="M14,-140 L40,-150" fill="none" {st(3, SKIN)}/>')
    s.append(f'<line x1="40" y1="-150" x2="74" y2="-224" {st(5, "#C9D1DA")}/><line x1="32" y1="-156" x2="50" y2="-146" {st(4)}/>')
    s.append(P('M-30,-150 Q-48,-118 -34,-96 Q-18,-110 -16,-140 Z', '#E9D7B7', 2.4))
    return g(x, y, k, ''.join(s))


def princess_tower(cx, y, k=1):
    s = [f'<rect x="-40" y="-60" width="80" height="60" fill="#BFE3F7" {st()}/>',
         f'<rect x="-22" y="-150" width="44" height="92" fill="#BFE3F7" {st()}/>',
         P('M-30,-150 L0,-196 L30,-150 Z', BLUE), f'<line x1="0" y1="-196" x2="0" y2="-212" {st(2.4)}/>',
         P('M0,-212 L16,-206 L0,-200 Z', RED, 2),
         P('M-12,-80 V-112 Q-12,-128 0,-128 Q12,-128 12,-112 V-80 Z', '#FFF4DF', 2.4),
         f'<circle cx="0" cy="-110" r="9" fill="{SKIN}" {st(2)}/>', P('M-10,-112 Q-10,-124 0,-124 Q10,-124 10,-112 L12,-96 L8,-104 L-8,-104 L-12,-96 Z', YELLOW, 1.8),
         P('M-6,-128 L-4,-136 L0,-130 L4,-136 L6,-128 Z', YELLOW, 1.6),
         P('M-12,-80 L-8,-100 H8 L12,-80 Z', PINK, 2),
         P('M-10,0 V-22 Q-10,-34 0,-34 Q10,-34 10,-22 V0 Z', '#7C5A43', 2.4)]
    for bx in (-40, -20, 0, 20):
        s.append(f'<rect x="{bx}" y="-70" width="12" height="10" fill="#BFE3F7" {st(2.2)}/>')
    return g(cx, y, k, ''.join(s))


# ── T1 q5: bản đồ ─────────────────────────────────────────────────────────────
W, H = 660, 700
PL = {'k': (110, 410), 'c1': (150, 150), 'pr': (480, 150), 'v1': (330, 280), 'h': (570, 330),
      'v2': (330, 470), 'm': (510, 490), 'c2': (330, 610)}
EDGES = [('k', 'c1', 0), ('k', 'v1', 30), ('k', 'v2', -20), ('k', 'c2', 40), ('c1', 'pr', -30), ('c1', 'v1', 20),
         ('v1', 'pr', 10), ('v1', 'h', -20), ('pr', 'h', 30), ('pr', 'm', 20), ('h', 'm', 10), ('v2', 'm', 10), ('c2', 'm', -30)]
p = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#EAF6E6"/>', '<g transform="translate(0,46)">']
for a, b, bend in EDGES:
    (x1, y1), (x2, y2) = PL[a], PL[b]
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy)
    cx, cy = mx - dy / L * bend, my + dx / L * bend
    p.append(road(f'M{x1},{y1 - 10} Q{cx:.0f},{cy:.0f} {x2},{y2 - 10}'))
p.append(castle(*PL['c1'], 130))
p.append(text(150, 180, '17 + 2', 22, 700))
p.append(princess_tower(*PL['pr'], .9))
p.append(text(480, 180, '10 + 40', 22, 700))
v1 = ''.join(house(x, PL['v1'][1] + dy, 44, wall='#BFE3F7', roof=BLUE) for x, dy in ((300, 0), (334, -10), (366, 2)))
p.append(f'<ellipse cx="330" cy="282" rx="64" ry="12" fill="#D6EEF8" {st(2)}/>' + v1)
p.append(text(330, 214, '10 + 9', 22, 700))
p.append(''.join(hut(x, 330 + dy, 44) for x, dy in ((540, 0), (578, -14), (608, 4))) + palm(520, 334, 54, -4))
p.append(text(574, 362, '91 + 8', 22, 700))
p.append(''.join(house(x, 470 + dy, 50, wall=CREAM, roof=ORANGE) for x, dy in ((304, 0), (346, -8))))
p.append(text(330, 396, '23 + 13', 22, 700))
p.append(mountain(486, 470, 90, 70) + mountain(540, 470, 80, 56)
         + ''.join(house(x, 494 + dy, 38, wall='#FFFFFF', roof=PURPLE) for x, dy in ((476, 0), (510, -4), (544, 2))))
p.append(text(512, 522, '20 + 60', 22, 700))
p.append(castle(*PL['c2'], 110, col='#D9EEFA', roof='#6FB7EA', towers=1))
p.append(text(330, 640, '10 + 10', 22, 700))
p.append(horse_knight(98, 420, .72))
p.append('</g>')
out('bai30_t1_q5_map', W, H, p)

# ── T2 q3: cá chuồn ───────────────────────────────────────────────────────────
W, H = 780, 250
p = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#E6F5FC"/>',
     P('M0,120 Q60,108 130,120 T260,118 T390,120 T520,116 T650,120 T780,116 V250 H0 Z', '#7CC6E8'),
     P('M0,200 Q100,184 200,204 Q320,224 460,198 Q600,180 780,206 V250 H0 Z', '#4E9CC8', 2.4)]
for x, y, r, fl in [(70, 54, -8, False), (230, 40, -4, False), (360, 70, -10, False), (500, 44, -6, False), (620, 76, -12, False), (720, 46, -4, False)]:
    p.append(flying_fish(x, y, 84, '#6FB7EA', fl, r))
for x, y in [(160, 156), (300, 148), (460, 160), (640, 150)]:
    p.append(flying_fish(x, y, 74, '#3F86C4', False, 0))
for x in (40, 120, 700, 740):
    p.append(f'<path d="M{x},250 Q{x - 10},226 {x + 4},212 Q{x + 14},226 {x + 2},250" fill="{GREEN}" {st(2)}/>')
p.append(f'<circle cx="250" cy="226" r="6" fill="#fff" opacity=".7" {st(1.4)}/><circle cx="262" cy="212" r="4" fill="#fff" opacity=".7" {st(1.2)}/>')
out('bai30_t2_q3_fish', W, H, p)

# ── T2 q5: Héc-quyn tìm đường tới cây táo vàng ───────────────────────────────
W, H = 780, 450
S, T = (130, 250), (660, 250)
p = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#F3F9EC"/>',
     road(f'M{S[0]},{S[1]} Q140,96 390,98 Q640,96 {T[0]},{T[1]}', 22),
     road(f'M{S[0]},{S[1]} Q220,300 400,262 Q560,210 {T[0]},{T[1]}', 22),
     road(f'M{S[0]},{S[1]} Q130,420 400,410 Q680,420 {T[0]},{T[1]}', 22)]
# cổng
gate = (P('M-46,0 V-60 Q-46,-90 0,-92 Q46,-90 46,-60 V0 Z', '#8BAFC9')
        + f'<line x1="0" y1="-92" x2="0" y2="0" {st()}/>'
        + ''.join(f'<line x1="{lx}" y1="-80" x2="{lx}" y2="0" stroke="{INK}" stroke-width="1.4" opacity=".5"/>' for lx in (-30, -16, 16, 30))
        + f'<circle cx="-8" cy="-44" r="5" fill="none" {st(2.4)}/><circle cx="8" cy="-44" r="5" fill="none" {st(2.4)}/>'
        + f'<rect x="-60" y="-70" width="14" height="70" fill="#C9D1DA" {st(2.4)}/><rect x="46" y="-70" width="14" height="70" fill="#C9D1DA" {st(2.4)}/>')
p.append(g(390, 106, 1, gate))
# rồng nhỏ
dragon = (P('M30,-20 Q70,-10 80,-40 Q72,-20 40,-30 Z', '#7BCB8B')
          + P('M-40,-60 Q-80,-100 -60,-120 Q-40,-90 -10,-70 Z', '#B9E4C0') + P('M10,-62 Q40,-110 70,-100 Q50,-80 26,-56 Z', '#B9E4C0')
          + f'<ellipse cx="0" cy="-36" rx="44" ry="24" fill="#7BCB8B" {st()}/>'
          + ''.join(f'<rect x="{lx - 6}" y="-20" width="12" height="20" rx="5" fill="#7BCB8B" {st(2.4)}/>' for lx in (-26, -8, 14, 30))
          + P('M-34,-50 Q-60,-70 -76,-56 Q-84,-40 -66,-34 Q-50,-30 -36,-36 Z', '#7BCB8B')
          + P('M-62,-66 L-58,-80 L-50,-66 Z', YELLOW, 2) + eyes(-62, -52, 0, 3.2) + P('M-80,-44 Q-74,-40 -68,-42', 'none', 2))
p.append(g(400, 262, 1, dragon))
# chó ba đầu
dog3 = ''.join([f'<ellipse cx="0" cy="-34" rx="48" ry="26" fill="#C9A27E" {st()}/>']
               + [f'<rect x="{lx - 6}" y="-20" width="12" height="20" rx="5" fill="#C9A27E" {st(2.4)}/>' for lx in (-32, -14, 16, 34)]
               + [g(dx, dy, .5, f'<ellipse cx="0" cy="-70" rx="30" ry="26" fill="#C9A27E" {st(6)}/>'
                    + P('M-24,-88 Q-44,-84 -38,-56 Q-28,-60 -22,-74 Z', '#8A6A4A', 6) + P('M24,-88 Q44,-84 38,-56 Q28,-60 22,-74 Z', '#8A6A4A', 6)
                    + eyes(0, -74, 11, 5) + f'<ellipse cx="0" cy="-60" rx="6" ry="5" fill="{INK}"/>' + P('M-8,-52 Q0,-46 8,-52', 'none', 4))
                  for dx, dy in ((-30, -40), (0, -52), (30, -40))])
p.append(g(400, 416, 1, dog3))
p.append(round_tree(660, 300, 170, crown='#7BCB8B', fruit=YELLOW,
                    fruits=[(-34, -110), (-4, -124), (26, -108), (40, -90), (-44, -88), (0, -96), (20, -136)]))
hero = K3.person(hair='short', shirt=ORANGE, bottom='#8A6A4A', adult=True, band=RED, sleeve='none',
                 arms=((-74, -250), (70, -260)), legs='stand')
p.append(g(110, 300, .4, hero))
p.append(f'<line x1="140" y1="200" x2="160" y2="160" {st(9, "#8A6A4A")}/>')
for x, y, n in [(236, 118, 30), (566, 112, 45), (262, 286, 23), (548, 222, 36), (234, 396, 41), (580, 400, 45)]:
    p.append(f'<rect x="{x - 34}" y="{y - 22}" width="70" height="32" rx="10" fill="#FFFFFF" opacity=".9"/>')
    p.append(text(x - 8, y + 4, str(n), 22, 700) + footprint(x + 20, y + 6, .9))
out('bai30_t2_q5_hercules', W, H, p)
