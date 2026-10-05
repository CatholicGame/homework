"""SGK Toán 4, bài 49–65 (trang 57–75): hình vuông 1dm và hình chữ nhật 20cm × 5cm, miếng bìa, ba cách đặt tính 456 × 203."""
from kit_g4t import *

# Bài 54 câu 5: hình vuông cạnh 1dm (= 10cm) và hình chữ nhật 20cm × 5cm, cùng tỉ lệ 13px = 1cm.
K = 13
p = []
sq = [(90, 30), (90 + 10 * K, 30), (90 + 10 * K, 30 + 10 * K), (90, 30 + 10 * K)]
p += poly(sq)
p.append(text(48, 30 + 5 * K + 7, '1dm', size=20, weight=700))
rx, ry = 330, 30 + 2 * K
rc = [(rx, ry), (rx + 20 * K, ry), (rx + 20 * K, ry + 5 * K), (rx, ry + 5 * K)]
p += poly(rc)
p.append(text(rx + 20 * K + 12, ry + 2.5 * K + 7, '5cm', size=20, weight=700, anchor='start'))
p.append(text(rx + 10 * K, ry + 5 * K + 30, '20cm', size=20, weight=700))
out('bai54_q5_hinhvuong_hcn', 680, 30 + 10 * K + 30, p)

# Bài 55 câu 4: miếng bìa 15cm × 5cm, khoét giữa một chỗ 5cm × 3cm (hai bên rộng 4cm và 6cm).
K = 30
ox, oy = 80, 50
cm = lambda x, y: (ox + x * K, oy + y * K)
pts = [cm(0, 0), cm(4, 0), cm(4, 3), cm(9, 3), cm(9, 0), cm(15, 0), cm(15, 5), cm(0, 5)]
p = poly(pts)
p.append(text(ox + 2 * K, oy - 14, '4cm', size=20, weight=700))
p.append(text(ox + 12 * K, oy - 14, '6cm', size=20, weight=700))
p.append(text(ox + 9 * K - 10, oy + 1.5 * K + 7, '3cm', size=20, weight=700, anchor='end'))
p.append(text(ox - 12, oy + 2.5 * K + 7, '5cm', size=20, weight=700, anchor='end'))
p.append(text(ox + 7.5 * K, oy + 5 * K + 30, '15cm', size=20, weight=700))
out('bai55_q4_mieng_bia', ox + 15 * K + 40, oy + 5 * K + 50, p)

# Bài 63 câu 2: ba cách đặt tính 456 × 203, tích riêng 912 viết ở ba chỗ khác nhau.
DW = 28          # bề rộng một cột chữ số
RH = 40          # chiều cao một dòng


def column(xr, y0, rows, shifts, sign_row=1, rules=(2, 4), name=''):
    """Phép tính dọc: rows = chuỗi số, shifts = số cột lùi sang trái của mỗi dòng; xr = mép phải hàng đơn vị."""
    parts = []
    width = max(len(s) + k for s, k in zip(rows, shifts))
    for r, (s, k) in enumerate(zip(rows, shifts)):
        y = y0 + r * RH
        for j, ch in enumerate(reversed(s)):
            parts.append(text(xr - DW / 2 - DW * (j + k), y, ch, size=30, weight=700))
    xl = xr - DW * width - 6
    parts.append(text(xl - 12, y0 + sign_row * RH - 10, '×', size=30, weight=700))
    for r in rules:
        yl = y0 + (r - 1) * RH + 10
        parts.append(line((xl, yl), (xr + 4, yl), w=2.5))
    parts.append(text(xr - DW * width / 2, y0 + len(rows) * RH + 12, name, size=26, weight=700, fill=ACC))
    return parts


p = []
res = ['2280', '10488', '92568']
for i, (k, r) in enumerate(zip([0, 1, 2], res)):
    xr = 175 + i * 200
    p += column(xr, 44, ['456', '203', '1368', '912', r], [0, 0, 0, k, 0], name='abc'[i] + ')')
out('bai63_q2_dat_tinh', 600, 40 + 5 * RH + 34, p)
