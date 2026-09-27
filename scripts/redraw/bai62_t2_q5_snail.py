"""
Vở BT Toán 2, Bài 62 Tiết 2 Q5 — đường về nhà của ốc sên (nét riêng).
Giữ nội dung toán: 9 ô phép tính đúng như sách (315 – 251, 560 – 329, 516 – 207,
803 – 432, 627 – 200, 827 – 483, 500 + 500, 872 – 254, 825 – 642) ở vị trí tương tự;
mạng đường có đường đi đúng ốc sên → 627 – 200 → 827 – 483 → 803 – 432 → 560 – 329
→ 500 + 500 → nhà, cùng vài nhánh rẽ khác.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 900, 389
P = {
    'o1': (443, 28, '315 – 251'), 'o8': (663, 72, '560 – 329'), 'o3': (297, 138, '516 – 207'),
    'o6': (533, 153, '803 – 432'), 'o2': (88, 198, '627 – 200'), 'o4': (390, 260, '827 – 483'),
    'o9': (705, 284, '500 + 500'), 'o5': (107, 340, '872 – 254'), 'o7': (443, 355, '825 – 642'),
    'snail': (70, 90, ''), 'house': (800, 232, ''),
}
# (a, b, uốn cong: độ lệch điểm điều khiển)
ROADS = [('snail', 'o2', -30), ('o2', 'o3', -40), ('o2', 'o4', 30), ('o2', 'o5', -60), ('o5', 'o7', 30),
         ('o7', 'o4', -40), ('o4', 'o6', 30), ('o3', 'o1', -30), ('o1', 'o8', -30), ('o6', 'o8', 20),
         ('o3', 'o6', 40), ('o8', 'o9', -70), ('o7', 'o9', 50), ('o9', 'house', 20)]
parts = []
paths = []
for a, b, bend in ROADS:
    (x0, y0, _), (x1, y1, _) = P[a], P[b]
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    dx, dy = x1 - x0, y1 - y0
    L = (dx * dx + dy * dy) ** 0.5
    cx, cy = mx - dy / L * bend, my + dx / L * bend
    paths.append(f'M{x0},{y0} Q{cx:.1f},{cy:.1f} {x1},{y1}')
for d in paths:
    parts.append(f'<path d="{d}" fill="none" stroke="#AEB7C1" stroke-width="18" stroke-linecap="round"/>')
for d in paths:
    parts.append(f'<path d="{d}" fill="none" stroke="#E4E8EC" stroke-width="12" stroke-linecap="round"/>')

# nhà
hx, hy = 800, 232
parts.append(f'<rect x="{hx - 56}" y="{hy - 58}" width="112" height="80" fill="{YELLOW}" stroke="{INK}" stroke-width="2.8"/>')
parts.append(f'<path d="M{hx - 74},{hy - 54} L{hx},{hy - 112} L{hx + 74},{hy - 54} Z" fill="{RED}" stroke="{INK}" stroke-width="2.8" stroke-linejoin="round"/>')
parts.append(f'<rect x="{hx - 38}" y="{hy - 26}" width="30" height="48" rx="4" fill="{BROWN}" stroke="{INK}" stroke-width="2.4"/>')
parts.append(f'<rect x="{hx + 8}" y="{hy - 40}" width="32" height="28" rx="4" fill="{SKY}" stroke="{INK}" stroke-width="2.4"/>')
parts.append(f'<line x1="{hx + 24}" y1="{hy - 40}" x2="{hx + 24}" y2="{hy - 12}" stroke="{INK}" stroke-width="2"/>')

# ốc sên (nét riêng)
sx, sy = 70, 92
parts.append(f'<path d="M{sx - 52},{sy + 20} C{sx - 40},{sy + 6} {sx + 20},{sy + 8} {sx + 40},{sy - 6} L{sx + 48},{sy - 34} '
             f'C{sx + 62},{sy - 38} {sx + 66},{sy - 20} {sx + 58},{sy - 4} C{sx + 52},{sy + 16} {sx + 30},{sy + 26} {sx - 52},{sy + 26} Z" '
             f'fill="#9FDDB0" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')
parts.append(f'<circle cx="{sx - 8}" cy="{sy - 14}" r="34" fill="{ORANGE}" stroke="{INK}" stroke-width="2.6"/>')
parts.append(f'<path d="M{sx - 8},{sy - 14} a4,4 0 0 1 8,0 a8,8 0 0 1 -16,0 a12,12 0 0 1 24,0 a16,16 0 0 1 -32,0 a20,20 0 0 1 40,0" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
for ex, ey in ((sx + 44, sy - 58), (sx + 60, sy - 52)):
    parts.append(f'<line x1="{sx + 52}" y1="{sy - 32}" x2="{ex}" y2="{ey}" stroke="{INK}" stroke-width="2.4"/>')
    parts.append(f'<circle cx="{ex}" cy="{ey}" r="5" fill="{WHITE}" stroke="{INK}" stroke-width="2"/><circle cx="{ex + 1}" cy="{ey}" r="2" fill="{INK}"/>')
parts.append(f'<path d="M{sx + 50},{sy - 16} q4,4 8,0" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')

# ô phép tính
for k, (x, y, lbl) in P.items():
    if lbl:
        parts.append(f'<ellipse cx="{x}" cy="{y}" rx="74" ry="23" fill="{WHITE}" stroke="#29A9E0" stroke-width="3"/>')
        parts.append(text(x, y + 9, lbl, size=26, weight=500))
save('bai62_t2_q5_snail', W, H, parts)
