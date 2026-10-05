"""SGK Toán 4, bài 137–151 (trang 146–159): sơ đồ đoạn thẳng (tổng/hiệu và tỉ số), quãng đường, hình ô vuông tô màu."""
from kit_g4t import *

DASH = '6 5'
TAPE = '#2F7FD1'


def tape(x0, y, unit, n, color=TAPE):
    """Đoạn thẳng n phần bằng nhau, vạch chia ở mỗi phần."""
    p = [line((x0, y), (x0 + unit * n, y), w=3.5, color=color)]
    for i in range(n + 1):
        h = 11 if i in (0, n) else 8
        p.append(line((x0 + unit * i, y - h), (x0 + unit * i, y + h), w=2.5, color=color))
    return p


def arc(xa, xb, y, up=True, lift=16):
    """Ngoặc cong nét đứt trên (up) hoặc dưới đoạn [xa, xb]."""
    cy = y - lift if up else y + lift
    return f'<path d="M{xa:.1f},{y:.1f} Q{(xa + xb) / 2:.1f},{cy - (lift * 0.6 if up else -lift * 0.6):.1f} {xb:.1f},{y:.1f}" fill="none" stroke="{INK}" stroke-width="2" stroke-dasharray="{DASH}"/>'


def brace(x, y1, y2, w=16):
    """Dấu ngoặc nhọn "}" đứng từ y1 đến y2 tại x."""
    m = (y1 + y2) / 2
    return (f'<path d="M{x},{y1} Q{x + w},{y1} {x + w},{y1 + 12} L{x + w},{m - 10} Q{x + w},{m} {x + w * 1.8},{m} '
            f'Q{x + w},{m} {x + w},{m + 10} L{x + w},{y2 - 12} Q{x + w},{y2} {x},{y2}" fill="none" stroke="{INK}" stroke-width="2.5"/>')


def vdash(x, y1, y2):
    return line((x, y1), (x, y2), w=1.8, dash='5 5', cap='butt')


F = 27   # chữ to: hình bị thu nhỏ theo chiều cao vùng câu hỏi

# ── Bài 140 câu 4: Thùng 1 = 1 phần, Thùng 2 = 4 phần, tổng 180 l ──────────────────────────────
U, X0, Y1, Y2 = 110, 150, 58, 110
p = [text(X0 - 20, Y1 + 7, 'Thùng 1:', size=F, anchor='end'), text(X0 - 20, Y2 + 7, 'Thùng 2:', size=F, anchor='end')]
p += tape(X0, Y1, U, 1) + tape(X0, Y2, U, 4)
p += [vdash(X0, Y1, Y2), vdash(X0 + U, Y1, Y2)]
p += [arc(X0, X0 + U, Y1 - 12), text(X0 + U / 2, Y1 - 32, '? l', size=F, weight=700)]
p += [arc(X0, X0 + 4 * U, Y2 + 12, up=False), text(X0 + 2 * U, Y2 + 54, '? l', size=F, weight=700)]
p += [brace(X0 + 4 * U + 24, Y1 - 14, Y2 + 14), text(X0 + 4 * U + 66, Y1 + (Y2 - Y1) / 2 + 9, '180 l', size=F, weight=700, anchor='start')]
out('bai140_q4_sodo', 740, 172, p)

# ── Bài 143 câu 4: Số bé 5 phần, số lớn 9 phần, hiệu 72 ───────────────────────────────────────
U, X0, Y1, Y2 = 62, 130, 60, 112
p = [text(X0 - 20, Y1 + 7, 'Số bé:', size=F, anchor='end'), text(X0 - 20, Y2 + 7, 'Số lớn:', size=F, anchor='end')]
p += tape(X0, Y1, U, 5) + tape(X0, Y2, U, 9)
p += [vdash(X0, Y1, Y2), vdash(X0 + 5 * U, Y1, Y2)]
p += [arc(X0, X0 + 5 * U, Y1 - 12), text(X0 + 2.5 * U, Y1 - 32, '?', size=F, weight=700)]
p += [arc(X0 + 5 * U, X0 + 9 * U, Y2 - 12), text(X0 + 7 * U, Y2 - 32, '72', size=F, weight=700)]
p += [arc(X0, X0 + 9 * U, Y2 + 12, up=False), text(X0 + 4.5 * U, Y2 + 56, '?', size=F, weight=700)]
out('bai143_q4_sodo', 720, 178, p)

# ── Bài 144 câu 4: cam 1 phần, dừa 6 phần, hiệu 170 cây ─────────────────────────────────────────
U, X0, Y1, Y2 = 70, 190, 60, 112
p = [text(X0 - 20, Y1 + 7, 'Số cây cam:', size=F, anchor='end'), text(X0 - 20, Y2 + 7, 'Số cây dừa:', size=F, anchor='end')]
p += tape(X0, Y1, U, 1) + tape(X0, Y2, U, 6)
p += [vdash(X0, Y1, Y2), vdash(X0 + U, Y1, Y2)]
p += [arc(X0, X0 + U, Y1 - 12), text(X0 + U / 2, Y1 - 32, '? cây', size=F, weight=700)]
p += [arc(X0 + U, X0 + 6 * U, Y2 - 12), text(X0 + 3.5 * U, Y2 - 32, '170 cây', size=F, weight=700)]
p += [arc(X0, X0 + 6 * U, Y2 + 12, up=False), text(X0 + 3 * U, Y2 + 56, '? cây', size=F, weight=700)]
out('bai144_q4_sodo', 640, 178, p)

# ── Bài 145 câu 4: Nhà An → Hiệu sách → Trường học, 840 m, tỉ số 3/5 (3 phần : 5 phần) ─────────
U, X0, Y = 85, 40, 104
XM = X0 + 3 * U
XE = X0 + 8 * U
p = [line((X0, Y), (XE, Y), w=4, color=BROWN)]
for x in (X0, XM, XE):
    p.append(line((x, Y - 12), (x, Y + 12), w=3))
    p.append(dot((x, Y), r=6))
p += [text(X0, Y - 70, 'Nhà An', size=F, weight=700, anchor='start'),
      text(XM, Y - 70, 'Hiệu sách', size=F, weight=700),
      text(XE, Y - 70, 'Trường học', size=F, weight=700, anchor='end')]
p += [arc(X0, XM, Y - 14), text((X0 + XM) / 2, Y - 38, '? m', size=F, weight=700, fill=ACC)]
p += [arc(XM, XE, Y - 14), text((XM + XE) / 2, Y - 38, '? m', size=F, weight=700, fill=ACC)]
p += [arc(X0, XE, Y + 14, up=False, lift=26), text((X0 + XE) / 2, Y + 62, '840 m', size=F, weight=700)]
out('bai145_q4_duong', 760, 176, p)

# ── Bài 146 câu 5: hình H (2 × 2, tô 1) và A, B, C, D ───────────────────────────────────────────
SH = '#9DB7D6'


def cells(x, y, cols, rows, c, shaded):
    q = []
    for r in range(rows):
        for k in range(cols):
            f = SH if (r, k) in shaded else '#FFFFFF'
            q.append(f'<rect x="{x + k * c}" y="{y + r * c}" width="{c}" height="{c}" fill="{f}" stroke="{INK}" stroke-width="2.5"/>')
    return q


C = 40
Y = 22
p = cells(24, Y, 2, 2, C, {(0, 0)}) + [text(24 + C, Y + 2 * C + 32, 'Hình H', size=24, weight=700)]
p += [line((140, 10), (140, 140), w=2, color=GREY, dash='6 6')]
for lab, x, cols, sh in (('A.', 160, 4, {(1, 0)}), ('B.', 375, 4, {(1, 2), (1, 3)}), ('C.', 590, 3, {(0, 1)}), ('D.', 765, 3, {(0, 1), (0, 2), (1, 2)})):
    p += [text(x, Y + 22, lab, size=F, weight=700, anchor='start')] + cells(x + 32, Y, cols, 2, C, sh)
out('bai146_q5_hinh', 920, 150, p)
