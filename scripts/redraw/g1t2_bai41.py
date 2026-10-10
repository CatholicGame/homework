"""
Vở BT Toán 1 Tập Hai, Bài 41 Ôn tập chung (sách trang 105–107).
Mọi hình vẽ lại bằng nét riêng, chỉ giữ nội dung toán của sách.

    python scripts/redraw/g1t2_bai41.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_l1t2_f as K
import kit_l1_a as KA
import kit_g8 as K8

F = K.F
st = K.st
L3 = f'stroke="{INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"'


# ── Q1 b): ô tô trên đường và bốn cột mốc để trống ──────────────────────────
def q1b_road():
    W, H = 760, 230
    p = [KA.sky_grass(W, H, 150, sky='#E4F4FC')]
    p.append(f'<path d="M3,150 L757,140 L757,215 L3,220 Z" fill="#B8BEC6"/>')
    for i in range(9):
        p.append(f'<rect x="{30 + i * 84}" y="182" width="40" height="7" rx="3" fill="{WHITE}" opacity=".8"/>')
    p.append(K8.place(K8.car(BLUE), 20, 108, 1.0))
    for i, x in enumerate((300, 420, 560, 680)):
        p.append(f'<path d="M{x - 30},150 L{x - 30},70 Q{x - 30},40 {x},40 Q{x + 30},40 {x + 30},70 L{x + 30},150 Z" fill="{WHITE}" {st()}/>'
                 f'<path d="M{x - 30},70 Q{x - 30},40 {x},40 Q{x + 30},40 {x + 30},70 Z" fill="{RED}" {st()}/>'
                 f'<rect x="{x - 30}" y="122" width="60" height="28" fill="{BLUE}" {st(2.4)}/>')
    save('bai41_q1b_road', W, H, p, folder=F)


# ── Q3: a) hai đồng hồ báo thức chỉ có kim dài; b) bút chì dài 11 cm (1 cm = 40) ──
def q3_clocks_pencil():
    W, H = 760, 400
    p = []
    for cx, lab, rim in ((200, '4 giờ', BLUE), (560, '9 giờ', TEAL)):
        p.append(K.clock(cx, 130, 88, None, 0, rim=rim, hour=False, bells=True, legs=True))
        p.append(f'<rect x="{cx - 50}" y="242" width="100" height="40" rx="8" fill="{WHITE}" {st(2.6)}/>' + text(cx, 271, lab, 24, 700))
    x0, x1, y = 160, 160 + 11 * 40, 345
    for x in (x0, x1):
        p.append(f'<line x1="{x}" y1="305" x2="{x}" y2="390" stroke="{INK}" stroke-width="2" stroke-dasharray="6 5"/>')
    p.append(f'<path d="M{x0 + 16},{y - 18} L{x1 - 60},{y - 18} L{x1},{y} L{x1 - 60},{y + 18} L{x0 + 16},{y + 18} Z" fill="{YELLOW}" {st()}/>')
    p.append(f'<path d="M{x1 - 60},{y - 18} L{x1},{y} L{x1 - 60},{y + 18} Q{x1 - 66},{y} {x1 - 60},{y - 18} Z" fill="#F3D9B1" {st(2.4)}/>')
    p.append(f'<path d="M{x1 - 18},{y - 6} L{x1},{y} L{x1 - 18},{y + 6} Z" fill="{INK}"/>')
    p.append(f'<path d="M{x0 + 16},{y - 18} Q{x0},{y - 18} {x0},{y} Q{x0},{y + 18} {x0 + 16},{y + 18} Z" fill="{PINK}" {st(2.6)}/>')
    p.append(f'<rect x="{x0 + 14}" y="{y - 18}" width="24" height="36" fill="{GREY}" {st(2.4)}/>')
    p.append(f'<line x1="{x0 + 46}" y1="{y - 6}" x2="{x1 - 76}" y2="{y - 6}" stroke="{WHITE}" stroke-width="4" stroke-linecap="round" opacity=".6"/>')
    save('bai41_q3_clocks_pencil', W, H, p, folder=F)


# ── Q4: 16 viên bi trên đĩa ─────────────────────────────────────────────────
def q4_marbles():
    W, H = 640, 220
    p = [f'<path d="M30,60 Q300,10 620,40 Q600,150 560,200 Q300,215 60,190 Q20,130 30,60 Z" fill="#D5D9DE" {st()}/>']
    pos = [(75, 90), (150, 62), (215, 45), (125, 120), (250, 100), (340, 48), (315, 105), (185, 150),
           (255, 165), (330, 158), (405, 85), (410, 165), (490, 68), (475, 115), (510, 165), (550, 135)]
    cols = [BLUE, '#8FD3F4', TEAL, PURPLE, PINK, YELLOW, GREEN, ORANGE]
    for i, (x, y) in enumerate(pos):
        p.append(f'<circle cx="{x}" cy="{y + 10}" r="24" fill="{cols[i % len(cols)]}" {st(2.4)}/>'
                 f'<circle cx="{x - 8}" cy="{y + 2}" r="6" fill="{WHITE}" opacity=".75"/>')
    assert len(pos) == 16
    save('bai41_q4_marbles', W, H, p, folder=F)


# ── Q6 b): tam giác có hai đoạn thẳng từ đỉnh xuống đáy (6 hình tam giác) ───
def q6_triangle():
    W, H = 460, 260
    A, B, C = (100, 14), (10, 246), (450, 246)
    p = [f'<path d="M{A[0]},{A[1]} L{B[0]},{B[1]} L{C[0]},{C[1]} Z" fill="#BFE6F7" {L3}/>',
         f'<path d="M{A[0]},{A[1]} L120,246 M{A[0]},{A[1]} L280,246" {L3}/>']
    save('bai41_q6_triangle', W, H, p, folder=F)


if __name__ == '__main__':
    q1b_road()
    q3_clocks_pencil()
    q4_marbles()
    q6_triangle()
