"""
Vở BT Toán 2, Bài 35 Tiết 2 Q4 — thùng 20 l và ba phương án can: nét riêng.

Nội dung toán giữ đúng sách: Rô-bốt múc nước từ thùng gỗ (bên trái);
  A. can 3 l, 10 l, 5 l, 2 l   B. can 2 l, 5 l, 15 l   C. can 10 l, 2 l, 3 l, 6 l
(can to hơn khi số lít lớn hơn, như sách).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import jerrycan, measuring_jug, litre
from kit_g1 import robot

W, H = 900, 563
P = []
# Rô-bốt + thùng gỗ
P.append(f'<ellipse cx="200" cy="500" rx="190" ry="26" fill="{SKY}" opacity=".7"/>')
P.append(robot(110, 470, 330, arm_pose='hold', look=(3, 3)))
bx, by, bw, bh = 245, 505, 230, 250
d = (f'M{bx - bw / 2 + 10},{by - bh} Q{bx - bw / 2 - 16},{by - bh / 2} {bx - bw / 2 + 10},{by} '
     f'H{bx + bw / 2 - 10} Q{bx + bw / 2 + 16},{by - bh / 2} {bx + bw / 2 - 10},{by - bh} Z')
P.append(f'<path d="{d}" fill="#C98F5E" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
for k in range(1, 6):
    x = bx - bw / 2 + bw * k / 6
    P.append(f'<path d="M{x:.1f},{by - bh + 4} Q{x + (x - bx) * .12:.1f},{by - bh / 2} {x:.1f},{by - 2}" fill="none" stroke="{INK}" stroke-width="2" opacity=".45"/>')
for yy in (by - bh * .78, by - bh * .22):
    P.append(f'<path d="M{bx - bw / 2 - 4},{yy:.1f} Q{bx},{yy + 12:.1f} {bx + bw / 2 + 4},{yy:.1f}" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>')
    P.append(f'<path d="M{bx - bw / 2 - 4},{yy:.1f} Q{bx},{yy + 12:.1f} {bx + bw / 2 + 4},{yy:.1f}" fill="none" stroke="{GREY}" stroke-width="6" stroke-linecap="round"/>')
P.append(f'<ellipse cx="{bx}" cy="{by - bh}" rx="{bw / 2 - 10}" ry="22" fill="{WATER_L}" stroke="{INK}" stroke-width="3"/>')
P.append(f'<ellipse cx="{bx}" cy="{by - bh}" rx="{bw / 2 - 2}" ry="28" fill="none" stroke="{INK}" stroke-width="5"/>')
# ca trong tay rô-bốt (nhúng vào thùng)
P.extend(measuring_jug(212, by - bh + 20, 50, 56, level=.7, ticks=False))

SZ = {2: (60, 72), 3: (72, 88), 5: (82, 104), 6: (86, 108), 10: (114, 142), 15: (142, 180)}


def row(letter, base, xs_ns):
    P.append(text(432, base - 8, letter + '.', size=28, weight=600))
    for x, n in xs_ns:
        w, h = SZ[n]
        P.extend(jerrycan(x, base, w, h, label=litre(n), size=max(21, min(w * .36, 30))))


row('A', 170, [(505, 3), (626, 10), (752, 5), (850, 2)])
row('B', 378, [(505, 2), (596, 5), (740, 15)])
row('C', 555, [(534, 10), (640, 2), (730, 3), (838, 6)])
save('bai35_t2_q4_cans', W, H, P)
