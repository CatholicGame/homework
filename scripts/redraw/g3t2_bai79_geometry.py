"""
Vở BT Toán 3 Tập hai, Bài 79 Tiết 1 — các hình hình học (vẽ lại bằng SVG):
  Q1: hình vuông ABCD, hình tròn tâm O nội tiếp, M, N, P, Q là trung điểm các cạnh,
      hai đoạn MP, QN cắt nhau tại O.
  Q2: tam giác ABC; M trên AB (AM 2 cm, MB 6 cm), N trên CB (CN 4 cm, NB 4 cm),
      AC 7 cm, MN 5 cm.
  Q4: miếng bìa hình A trên lưới ô vuông 1 cm: phần dưới 12 cm x 2 cm, phần trên
      4 cm x 4 cm ở giữa (hai bên vai mỗi bên 4 cm).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__))
from common import *

DARK = '#231F20'
LINE = '#4BA3E3'


def t(x, y, s, size=22, anchor='middle', rot=None, weight=500, style=''):
    extra = f' transform="rotate({rot} {x} {y})"' if rot is not None else ''
    if style:
        extra += f' font-style="{style}"'
    return text(x, y, s, size=size, weight=weight, fill=DARK, anchor=anchor, extra=extra)


# ── Q1: hình vuông + hình tròn ─────────────────────────────────────────────
W, H = 380, 350
x0, y0, S = 60, 40, 260
x1, y1 = x0 + S, y0 + S
cx, cy = x0 + S / 2, y0 + S / 2
P = [f'<g stroke="{DARK}" stroke-width="3" fill="none" stroke-linejoin="round">',
     f'<rect x="{x0}" y="{y0}" width="{S}" height="{S}"/>',
     f'<circle cx="{cx}" cy="{cy}" r="{S / 2}"/>',
     f'<line x1="{cx}" y1="{y0}" x2="{cx}" y2="{y1}"/>',
     f'<line x1="{x0}" y1="{cy}" x2="{x1}" y2="{cy}"/>',
     '</g>',
     f'<circle cx="{cx}" cy="{cy}" r="5.5" fill="{DARK}"/>']
for (x, y), s in [((x0 - 14, y0 - 10), 'A'), ((cx, y0 - 12), 'M'), ((x1 + 14, y0 - 10), 'B'),
                  ((x1 + 18, cy + 8), 'N'), ((x1 + 14, y1 + 28), 'C'), ((cx, y1 + 30), 'P'),
                  ((x0 - 14, y1 + 28), 'D'), ((x0 - 20, cy + 8), 'Q'), ((cx - 20, cy + 30), 'O')]:
    P.append(t(x, y, s, size=26))
save('bai79_t1_q1_square', W, H, P, folder='grade3-workbook-2')

# ── Q2: tam giác ABC ────────────────────────────────────────────────────────
W, H = 400, 330
A, C, B = (190, 30), (40, 290), (360, 290)
k = 6 / 8                       # M chia AB: AM = 2 phần, MB = 6 phần (trên 8)
M = (A[0] + (B[0] - A[0]) * 2 / 8, A[1] + (B[1] - A[1]) * 2 / 8)
N = ((C[0] + B[0]) / 2, 290)
P = [f'<g stroke="{DARK}" stroke-width="3" fill="none" stroke-linejoin="round">',
     f'<path d="M{A[0]},{A[1]} L{B[0]},{B[1]} L{C[0]},{C[1]} Z"/>',
     f'<line x1="{M[0]:.1f}" y1="{M[1]:.1f}" x2="{N[0]}" y2="{N[1]}"/>',
     '</g>']
for (x, y) in (A, B, C, M, N):
    P.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3.2" fill="{DARK}"/>')
P += [t(A[0], A[1] - 10, 'A', size=24), t(B[0] + 16, B[1] + 8, 'B', size=24), t(C[0] - 16, C[1] + 8, 'C', size=24),
      t(M[0] + 20, M[1] + 10, 'M', size=24), t(N[0], N[1] + 30, 'N', size=24)]


def edge_label(p, q, s, off, size=20):
    """nhãn độ dài đặt dọc theo cạnh pq, lệch `off` px về phía pháp tuyến (x dương = bên phải)."""
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
    dx, dy = q[0] - p[0], q[1] - p[1]
    L = math.hypot(dx, dy)
    nx, ny = dy / L, -dx / L
    ang = math.degrees(math.atan2(dy, dx))
    if ang > 90:
        ang -= 180
    if ang < -90:
        ang += 180
    x, y = mx + nx * off, my + ny * off
    return t(f'{x:.1f}', f'{y + size * .35:.1f}', s, size=size, rot=f'{ang:.1f}').replace(
        f'rotate({ang:.1f} {x:.1f} {y + size * .35:.1f})', f'rotate({ang:.1f} {x:.1f} {y:.1f})')


P.append(edge_label(A, M, '2 cm', 20, size=18))
P.append(edge_label(M, B, '6 cm', 16))
P.append(edge_label(C, A, '7 cm', 16))
P.append(edge_label(M, N, '5 cm', 16))
P.append(t((C[0] + N[0]) / 2, 318, '4 cm', size=20))
P.append(t((N[0] + B[0]) / 2, 318, '4 cm', size=20))
save('bai79_t1_q2_triangle', W, H, P, folder='grade3-workbook-2')

# ── Q4: hình A trên lưới ô vuông ────────────────────────────────────────────
U = 30
bx, gy = 66, 40                    # bx: mép trái phần dưới; gy: mép trên phần trên
gx, by = bx + 4 * U, gy + 4 * U    # góc trên trái phần trên (cột 4) / phần dưới
W, H = bx + 12 * U + 16, 6 * U + 100
P = ['<g stroke="#9AA4AD" stroke-width="1">']
# lưới phần trên (4 x 4)
for i in range(1, 4):
    P.append(f'<line x1="{gx + i * U}" y1="{gy}" x2="{gx + i * U}" y2="{gy + 4 * U}"/>')
    P.append(f'<line x1="{gx}" y1="{gy + i * U}" x2="{gx + 4 * U}" y2="{gy + i * U}"/>')
# lưới phần dưới (12 x 2)
for i in range(1, 12):
    P.append(f'<line x1="{bx + i * U}" y1="{by}" x2="{bx + i * U}" y2="{by + 2 * U}"/>')
P.append(f'<line x1="{bx}" y1="{by + U}" x2="{bx + 12 * U}" y2="{by + U}"/>')
P.append(f'<line x1="{gx}" y1="{by}" x2="{gx + 4 * U}" y2="{by}"/>')
P.append('</g>')
pts = [(bx, by), (gx, by), (gx, gy), (gx + 4 * U, gy), (gx + 4 * U, by), (bx + 12 * U, by),
       (bx + 12 * U, by + 2 * U), (bx, by + 2 * U)]
P.append(f'<path d="M' + ' L'.join(f'{x},{y}' for x, y in pts) + f' Z" fill="none" stroke="{DARK}" stroke-width="3.2" stroke-linejoin="miter"/>')
P += [t(gx + 2 * U, gy - 8, '4 cm', size=19),
      t(gx - 8, gy + 2 * U + 7, '4 cm', size=19, anchor='end'),
      t(bx + 2 * U, by - 8, '4 cm', size=19),
      t(gx + 6 * U, by - 8, '4 cm', size=19),
      t(bx - 8, by + U + 7, '2 cm', size=19, anchor='end'),
      t(gx + 2 * U, by + 2 * U + 40, 'Hình A', size=21, style='italic')]
save('bai79_t1_q4_shape', W, H, P, folder='grade3-workbook-2')
