"""SGK Toán 4, bài 66–83 (trang 76–93): phép chia "Sai ở đâu?", biểu đồ sách bán, hình chữ nhật M N P Q, biểu đồ số giờ có mưa."""
from kit_g4t import *

DW = 19  # bề rộng một chữ số khi đặt tính


def big(parts, k):
    """Phóng chữ trong hình (biểu đồ hiện thấp trong khung đề): nhân mọi font-size với k."""
    import re
    return [re.sub(r'font-size="([\d.]+)"', lambda m: f'font-size="{float(m.group(1)) * k:.0f}"', s) for s in parts]


def digits(x0, col, y, s, size=26, color=INK):
    """Viết chuỗi số s, chữ số đầu ở cột col (mỗi cột rộng DW), từng chữ số đặt riêng cho thẳng cột."""
    return [text(round(x0 + (col + i) * DW + DW / 2, 1), y, ch, size=size, weight=600, fill=color) for i, ch in enumerate(s)]


def div_layout(x0, y0, dividend, divisor, quotient, rows, tag):
    """Đặt tính chia như sách: số bị chia, các số dư (cột bắt đầu), số chia, thương."""
    p = [text(x0 - 14, y0, tag, size=24, weight=700, anchor='end')]
    p += digits(x0, 0, y0, dividend)
    lh = 38
    for i, (col, s) in enumerate(rows):
        p += digits(x0, col, y0 + lh * (i + 1), s)
    xv = x0 + len(dividend) * DW + 12
    p.append(line((xv, y0 - 26), (xv, y0 + 46), w=2.5))
    p.append(line((xv, y0 + 10), (xv + 96, y0 + 10), w=2.5))
    p.append(text(xv + 12, y0, divisor, size=26, weight=600, anchor='start'))
    p.append(text(xv + 12, y0 + 38, quotient, size=26, weight=600, anchor='start'))
    return p


# Bài 76 câu 4: Sai ở đâu? 12345 : 67 (hai cách đặt tính đều sai)
p = []
p += div_layout(60, 50, '12345', '67', '1714', [(1, '564'), (2, '95'), (2, '285'), (3, '17')], 'a)')
p += div_layout(370, 50, '12345', '67', '184', [(1, '564'), (2, '285'), (3, '47')], 'b)')
out('bai76_q4_saiodau', 560, 220, p)

# Bài 82 câu 4: Số sách bán được trong bốn tuần (4500, 6250, 5750, 5500 cuốn).
# Như sách: không ghi số trên cột, trục chia mỗi 500 cuốn, lưới nhạt mỗi 250 cuốn để bé tự đọc.
X0, Y0, W, H, VMAX = 130, 80, 560, 380, 6500
p = [line((X0, Y0 + H - v / VMAX * H), (X0 + W, Y0 + H - v / VMAX * H), w=1.2, color='#E3EAF2', cap='butt')
     for v in range(250, 6500, 250) if v % 500]
p += big(bar_chart(X0, Y0, W, H, [4500, 6250, 5750, 5500], ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'],
                   VMAX, 500, unit_y='(Cuốn)', unit_x='(Tuần)', show_values=False,
                   ticks=list(range(0, 6001, 500)),
                   title='SỐ SÁCH BÁN ĐƯỢC TRONG BỐN TUẦN'), 1.35)
out('bai82_q4_bieudo', 800, 510, p)

# Bài 83 câu 1e: bốn hình chữ nhật M (7cm × 4cm), N (9cm × 3cm), P (8cm × 4cm), Q (10cm × 3cm)
U = 30  # 1cm trong hình
p = []


def rect(x, y, a, b, name, below, side_right=True):
    r = [f'<rect x="{x}" y="{y}" width="{a * U}" height="{b * U}" fill="{FILL}" stroke="{INK}" stroke-width="{SW}"/>']
    r.append(text(x + a * U / 2, y + b * U / 2 + 14, name, size=40, weight=700, fill=ACC))
    r.append(text(x + a * U / 2, y + b * U + 32, below, size=26, weight=700))
    if side_right:
        r.append(text(x + a * U + 10, y + b * U / 2 + 9, f'{b}cm', size=26, weight=700, anchor='start'))
    else:
        r.append(text(x - 10, y + b * U / 2 + 9, f'{b}cm', size=26, weight=700, anchor='end'))
    return r


p += rect(10, 10, 7, 4, 'M', '7cm')
p += rect(420, 10, 9, 3, 'N', '9cm', side_right=False)
p += rect(10, 185, 8, 4, 'P', '8cm')
p += rect(420, 185, 10, 3, 'Q', '10cm', side_right=False)
out('bai83_q1_hinhchunhat', 730, 345, p)

# Bài 83 câu 2: Số giờ có mưa (CN 5, T2 3, T3 1, T4 0, T5 6, T6 2, T7 1)
p = []
p += big(bar_chart(60, 70, 840, 250, [5, 3, 1, 0, 6, 2, 1],
                   ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
                   8, 1, unit_y='(Giờ)', unit_x='', show_values=False, ticks=list(range(0, 8)),
                   title='SỐ GIỜ CÓ MƯA'), 1.35)
p.append(text(900, 385, '(Ngày)', size=21, anchor='end'))
out('bai83_q2_bieudo', 920, 395, p)
