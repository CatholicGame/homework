"""
Luyện tập Toán 3, Tuần 18 Tiết 3 Q1 — khoanh 1/4 số quả đỗ, 1/7 số cây súp lơ: nét riêng.
Giữ nội dung toán:
 a) A: 12 quả đỗ (3 hàng × 4), khoanh 2 quả (hàng dưới, 2 quả bên phải);
    B: 12 quả đỗ (3 × 4), khoanh 3 quả (cả cột bên phải) = 1/4 → đáp án B.
 b) A: 14 cây súp lơ, khoanh 2 cây (cột đầu) = 1/7 → đáp án A;
    B: 14 cây súp lơ, khoanh 7 cây (3 cột đầu: 2 + 3 + 2).
Bố cục cột so le giống sách: số cây mỗi cột 2, 3, 2, 3, 2, 2.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H, K = 1790, 774, 2


def ring(x0, y0, x1, y1, r=None):
    r = r or min(x1 - x0, y1 - y0) / 2 * .92
    return (f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" rx="{r:.1f}" '
            f'fill="none" stroke="{INK}" stroke-width="2.6"/>')


p = [text(6, 52, 'a)', size=32, weight=600, anchor='start'),
     text(72, 46, 'A.', size=24, weight=600, anchor='start'),
     text(540, 46, 'B.', size=24, weight=600, anchor='start'),
     text(6, 238, 'b)', size=32, weight=600, anchor='start'),
     text(66, 232, 'A.', size=24, weight=600, anchor='start'),
     text(526, 232, 'B.', size=24, weight=600, anchor='start')]
# a) quả đỗ
for c in range(4):
    for r in range(3):
        p.append(pea_pod(136 + c * 63, 46 + r * 34, L=54, rot=-16))
        p.append(pea_pod(604 + c * 63, 58 + r * 34, L=54, rot=-16))
p.append(ring(226, 94, 364, 136))                  # A: 2 quả
p.append(ring(760, 30, 830, 162, r=32))            # B: 3 quả (cột phải)
# b) súp lơ — cột so le 2, 3, 2, 3, 2, 2
cols = [(0, (262, 320)), (55, (232, 288, 345)), (110, (262, 320)),
        (167, (232, 288, 345)), (225, (262, 320)), (280, (232, 288))]
for dx, ys in cols:
    for y in ys:
        p.append(broccoli(122 + dx, y, .78))
        p.append(broccoli(588 + dx, y, .78))
p.append(ring(96, 228, 148, 356, r=26))            # A: 2 cây
p.append(f'<path d="M580,212 Q640,196 700,208 Q732,222 730,290 Q732,360 690,372 Q640,382 588,372 Q556,362 556,300 '
         f'Q552,232 580,212 Z" fill="none" stroke="{INK}" stroke-width="2.6"/>')   # B: 7 cây
save('tuan18_t3_q1_groups', W, H, scaled(p, K), folder='grade3-practice')
