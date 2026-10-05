"""SGK Toán 4, bài 152–175 (Chương sáu: Ôn tập, trang 160–180): biểu đồ, phân số, hình học."""
import math
from kit_g4t import *


def tri(cx, cy, s=26, color=ORANGE):
    h = s * 0.87
    return f'<polygon points="{cx:.1f},{cy - h / 2:.1f} {cx - s / 2:.1f},{cy + h / 2:.1f} {cx + s / 2:.1f},{cy + h / 2:.1f}" fill="{color}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>'


def rect(x, y, w, h, fill=FILL, sw=SW):
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{fill}" stroke="{INK}" stroke-width="{sw}"/>'


# ── Bài 158 câu 1: biểu đồ tranh "Số hình của bốn tổ đã cắt được" ─────────────────────────────
# Mỗi hàng: 3 ô tam giác, 3 ô hình vuông, 2 ô hình chữ nhật (như sách).
rows = [('Tổ 1', 2, 2, 0), ('Tổ 2', 1, 1, 2), ('Tổ 3', 1, 2, 1), ('Tổ 4', 0, 2, 2)]
p = [text(420, 30, 'SỐ HÌNH CỦA BỐN TỔ ĐÃ CẮT ĐƯỢC', size=20, weight=700)]
x0, y0, nw, cw, rh = 20, 50, 130, 80, 56
for r, (name, t, s, c) in enumerate(rows):
    y = y0 + r * rh
    p.append(rect(x0, y, nw, rh, fill='#FFF8E8', sw=2))
    p.append(text(x0 + nw / 2, y + rh / 2 + 7, name, size=20, weight=700))
    for k in range(8):
        p.append(rect(x0 + nw + k * cw, y, cw, rh, fill=WHITE, sw=2))
    cy = y + rh / 2
    for k in range(t):
        p.append(tri(x0 + nw + k * cw + cw / 2, cy))
    for k in range(s):
        cx = x0 + nw + (3 + k) * cw + cw / 2
        p.append(rect(cx - 13, cy - 13, 26, 26, fill=BLUE, sw=2))
    for k in range(c):
        cx = x0 + nw + (6 + k) * cw + cw / 2
        p.append(rect(cx - 25, cy - 12, 50, 24, fill=GREEN, sw=2))
out('bai158_q1_hinhcat', 810, y0 + 4 * rh + 14, p)

# ── Bài 158 câu 2: diện tích ba thành phố (km²) ────────────────────────────────────────────────
p = bar_chart(100, 50, 600, 440, [921, 1255, 2095], ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh'], 2300, 200, ticks=list(range(0, 2201, 200)),
              unit_y='(km²)', unit_x='(Thành phố)', bar_color='#8CC2EE')
out('bai158_q2_dientich', 830, 540, p)

# ── Bài 158 câu 3: số vải bán được trong tháng 12 (cuộn) ──────────────────────────────────────
p = bar_chart(90, 50, 600, 330, [42, 50, 37], ['Vải hoa', 'Vải trắng', 'Vải xanh'], 55, 10,
              unit_y='(Cuộn)', unit_x='(Loại vải)', bar_color='#F7B88B', ticks=[0, 10, 20, 30, 40, 50])
out('bai158_q3_vai', 820, 430, p)

# ── Bài 159 câu 1: hình nào có 2/5 tô màu ─────────────────────────────────────────────────────
SH = '#F4A259'
p = []
c = 46  # cạnh ô vuông
# Hình 1: 5 ô (3 ngang, 2 dưới ô cuối), tô 1 ô
x, y = 20, 60
for k in range(3):
    p.append(rect(x + k * c, y, c, c, fill=SH if k == 2 else WHITE, sw=2.5))
for k in range(1, 3):
    p.append(rect(x + 2 * c, y + k * c, c, c, fill=WHITE, sw=2.5))
p.append(text(x + 1.5 * c, 330, 'Hình 1', size=20, weight=700))
# Hình 2: ngôi sao 5 cánh chia 5 phần (tâm – đỉnh trong – mũi – đỉnh trong), tô 3 phần trên
cx, cy, R, r = 290, 175, 100, 40
tips = [(cx + R * math.sin(math.radians(72 * k)), cy - R * math.cos(math.radians(72 * k))) for k in range(5)]
inner = [(cx + r * math.sin(math.radians(72 * k + 36)), cy - r * math.cos(math.radians(72 * k + 36))) for k in range(5)]
for k in range(5):
    pts = [(cx, cy), inner[k - 1], tips[k], inner[k]]
    shade = k in (0, 1, 4)
    p.append('<polygon points="' + ' '.join(f'{a:.1f},{b:.1f}' for a, b in pts) + f'" fill="{SH if shade else WHITE}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
p.append(text(cx, 330, 'Hình 2', size=20, weight=700))
# Hình 3: 2 cột × 5 hàng, tô 2 hàng trên (4 ô)
x, y, c3 = 440, 50, 48
for j in range(5):
    for i in range(2):
        p.append(rect(x + i * c3, y + j * c3, c3, c3, fill=SH if j < 2 else WHITE, sw=2.5))
p.append(text(x + c3, 330, 'Hình 3', size=20, weight=700))
# Hình 4: 6 hình tròn, tô 2
cr = 34
circ = [(640, 95, 1), (725, 100, 1), (612, 172, 0), (685, 158, 0), (760, 180, 0), (685, 236, 0)]
for a, b, s in circ:
    p.append(f'<circle cx="{a}" cy="{b}" r="{cr}" fill="{SH if s else WHITE}" stroke="{INK}" stroke-width="2.5"/>')
p.append(text(685, 330, 'Hình 4', size=20, weight=700))
out('bai159_q1_hinh', 820, 350, p)

# ── Bài 159 câu 2: tia số 0 → 1 chia 10 phần ───────────────────────────────────────────────────
x0, x1, yl = 40, 760, 40
xs = [x0 + i * (x1 - x0 - 30) / 10 for i in range(11)]
p = [line((20, yl), (790, yl)), f'<polygon points="804,{yl} 790,{yl - 7} 790,{yl + 7}" fill="{INK}"/>']
for i, xx in enumerate(xs):
    p.append(line((xx, yl - 9), (xx, yl + 9), w=2.5))
    if i == 0:
        p.append(text(xx, yl + 46, '0', size=22, weight=700))
    elif i == 10:
        p.append(text(xx, yl + 46, '1', size=22, weight=700))
    elif i in (3, 4, 6, 8):
        p.append(f'<rect x="{xx - 22:.1f}" y="{yl + 18}" width="44" height="56" rx="6" fill="#fff" stroke="{ACC}" stroke-width="2" stroke-dasharray="5 4"/>')
        p.append(text(xx, yl + 54, '?', size=22, weight=700, fill=ACC))
    else:
        p += frac_svg(xx, yl + 46, i, 10, size=20)
out('bai159_q2_tiaso', 820, 130, p)

# ── Bài 167 câu 1: hình thang vuông ABCD (AB // DC, góc A, góc D vuông) ───────────────────────
A, B, C, D = (50, 50), (330, 50), (220, 170), (50, 170)
p = poly([A, B, C, D], labels='ABCD')
p.append(right_mark(A, B, D))
p.append(right_mark(D, A, C))
out('bai167_q1_abcd', 380, 220, p)

# ── Bài 167 câu 3: Hình 1 (4cm × 3cm), Hình 2 (hình vuông 3cm) ─────────────────────────────────
u = 55
p = [rect(30, 50, 4 * u, 3 * u), text(30 + 2 * u, 38, '4cm', size=20, weight=600),
     text(30 + 4 * u + 12, 50 + 1.5 * u + 7, '3cm', size=20, weight=600, anchor='start'),
     text(30 + 2 * u, 50 + 3 * u + 34, 'Hình 1', size=20, weight=700)]
x2 = 400
p += [rect(x2, 50, 3 * u, 3 * u), text(x2 + 1.5 * u, 38, '3cm', size=20, weight=600),
      text(x2 + 1.5 * u, 50 + 3 * u + 34, 'Hình 2', size=20, weight=700)]
out('bai167_q3_hinh', 600, 260, p)

# ── Bài 168 câu 1: đường gấp khúc A–B–C–D–E (AB // DE, BC ⊥ CD) ───────────────────────────────
A, B = (40, 50), (260, 50)
a1 = math.radians(60)
C = (B[0] + 120 * math.cos(a1), B[1] + 120 * math.sin(a1))         # BC hướng xuống phải 60°
D = (C[0] - 180 * math.sin(a1), C[1] + 180 * math.cos(a1))          # CD ⊥ BC
E = (D[0] + 230, D[1])
p = [f'<polyline points="{" ".join(f"{a:.1f},{b:.1f}" for a, b in [A, B, C, D, E])}" fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>']
for pt, s, dx, dy in [(A, 'A', 0, -16), (B, 'B', 4, -16), (C, 'C', 20, 6), (D, 'D', -20, 4), (E, 'E', 0, -14)]:
    p.append(text(round(pt[0] + dx, 1), round(pt[1] + dy + 7, 1), s, size=22, weight=700))
out('bai168_q1_duong', 420, round(D[1] + 30), p)

# ── Bài 168 câu 2: hình vuông ABCD cạnh 8cm, hình chữ nhật MNPQ rộng 4cm ───────────────────────
u = 17
p = poly([(40, 50), (40 + 8 * u, 50), (40 + 8 * u, 50 + 8 * u), (40, 50 + 8 * u)], labels='ABCD')
p.append(text(40 + 4 * u, 40, '8cm', size=20, weight=600))
mx, my = 260, 80
p += poly([(mx, my), (mx + 16 * u, my), (mx + 16 * u, my + 4 * u), (mx, my + 4 * u)], labels='MNPQ')
p.append(text(mx + 16 * u + 12, my + 2 * u + 7, '4cm', size=20, weight=600, anchor='start'))
out('bai168_q2_hinh', 620, 230, p)

# ── Bài 168 câu 4: hình H = hình bình hành ABCD + hình chữ nhật BEGC ──────────────────────────
u = 60
Bp, Cp = (230, 70), (230, 70 + 4 * u)
Ap, Dp = (Bp[0] - 3 * u, Bp[1] - 0.5 * u), (Cp[0] - 3 * u, Cp[1] - 0.5 * u)
Ep, Gp = (Bp[0] + 3 * u, Bp[1]), (Cp[0] + 3 * u, Cp[1])
H = (Bp[0], Dp[1])
p = [f'<polygon points="{Ap[0]},{Ap[1]} {Bp[0]},{Bp[1]} {Cp[0]},{Cp[1]} {Dp[0]},{Dp[1]}" fill="#FFF1DC" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
     rect(Bp[0], Bp[1], 3 * u, 4 * u),
     line(Dp, H, w=2.5, color=ACC, dash='7 5'), right_mark(H, Dp, Bp, color=ACC),
     text((Dp[0] + H[0]) / 2, Dp[1] - 10, '3cm', size=20, weight=600, fill=ACC),
     text((Bp[0] + Ep[0]) / 2, Bp[1] - 12, '3cm', size=20, weight=600),
     text(Ep[0] + 12, (Ep[1] + Gp[1]) / 2 + 7, '4cm', size=20, weight=600, anchor='start')]
for pt, s, dx, dy in [(Ap, 'A', -16, -10), (Bp, 'B', 0, -14), (Cp, 'C', 0, 30), (Dp, 'D', -20, 6), (Ep, 'E', 18, -8), (Gp, 'G', 18, 20)]:
    p.append(text(round(pt[0] + dx, 1), round(pt[1] + dy + 6, 1), s, size=22, weight=700))
p.append(text(Bp[0], Cp[1] + 70, 'Hình H', size=22, weight=700))
out('bai168_q4_hinhH', 520, 400, p)

# ── Bài 175 câu 1: b) phép nhân đặt tính, c) băng giấy 9 ô tô 4 ô ─────────────────────────────
p = [text(20, 34, 'b)', size=22, weight=700, anchor='start')]
rx = 170
for yy, s in [(50, '2346'), (82, '35')]:
    p.append(text(rx, yy, s, size=24, weight=700, anchor='end'))
p.append(text(rx - 74, 70, '×', size=24, weight=700))
p.append(line((rx - 80, 94), (rx + 4, 94), w=2))
p.append(text(rx, 124, '11730', size=24, weight=700, anchor='end'))
p.append(text(rx - 14, 152, '.........', size=24, weight=700, anchor='end', fill=ACC))
p.append(line((rx - 80, 166), (rx + 4, 166), w=2))
p.append(text(rx, 196, '82110', size=24, weight=700, anchor='end'))
p.append(text(260, 34, 'c)', size=22, weight=700, anchor='start'))
cw = 52
for k in range(9):
    p.append(rect(290 + k * cw, 80, cw, 56, fill=SH if k % 2 == 1 else WHITE, sw=2.5))
out('bai175_q1_hinh', 790, 215, p)
