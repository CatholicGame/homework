"""
Dụng cụ chung cho các phép tính đặt cột của Bài 72 (Vở BT Toán 3 Tập hai):
mỗi chữ số đứng đúng một cột, khoảng cách nghìn (" ") là nửa cột.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *

DW = 22      # bề rộng một cột chữ số
GAP = 11     # khoảng trống phân cách lớp nghìn
SIZE = 32


def cols_x(x0, s):
    """Toạ độ tâm của từng kí tự (bỏ dấu cách) khi viết s bắt đầu từ x0."""
    xs, x = [], x0
    for ch in s:
        if ch == ' ':
            x += GAP
            continue
        xs.append((x + DW / 2, ch))
        x += DW
    return xs


def width(s):
    return sum(GAP if ch == ' ' else DW for ch in s)


def num(xr, y, s, size=SIZE, fill=INK, boxes=()):
    """Viết s căn phải tại xr; kí tự '#' là ô trống (ô vuông)."""
    out = []
    for cx, ch in cols_x(xr - width(s), s):
        if ch == '#':
            b = 26
            out.append(f'<rect x="{cx - b / 2:.1f}" y="{y - size * .86:.1f}" width="{b}" height="{b + 7}" rx="3" fill="#fff" stroke="{INK}" stroke-width="2.4"/>')
        else:
            out.append(text(f'{cx:.1f}', y, ch, size=size, weight=500, fill=fill))
    return ''.join(out)


def digit_x(x0, s, i):
    """Tâm cột của chữ số thứ i (0-based, không tính dấu cách) trong s viết từ x0."""
    return cols_x(x0, s)[i][0]


def line(x1, y1, x2, y2, w=2.4):
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{INK}" stroke-width="{w}" stroke-linecap="round"/>'


def mult(xr, y, a, b, prod, label=None, lx=None):
    """Phép nhân đặt cột: a trên, × b dưới, gạch ngang, tích."""
    p = []
    if label:
        p.append(text(lx, y + 4, label, size=28, weight=600, anchor='start'))
    p.append(num(xr, y, a))
    p.append(num(xr, y + 42, b))
    w = max(width(a), width(b), width(prod)) + DW
    p.append(text(xr - w + 2, y + 30, '×', size=40, weight=400))
    p.append(line(xr - w - 8, y + 56, xr + 4, y + 56))
    p.append(num(xr, y + 94, prod))
    return ''.join(p)


def longdiv(x0, y, dividend, divisor, quotient, steps, qbox_w=None, step_h=38):
    """Phép chia đặt cột kiểu Việt Nam. steps: [(chuỗi, chỉ số cột chữ số cuối), ...]."""
    p = []
    p.append(num(x0 + width(dividend), y, dividend))
    xv = x0 + width(dividend) + 12
    p.append(line(xv, y - 30, xv, y + 50))
    p.append(text(xv + 22, y, divisor, size=SIZE, weight=500, anchor='start'))
    qw = qbox_w or (width(quotient) + 24)
    p.append(line(xv, y + 10, xv + qw, y + 10))
    p.append(num(xv + 12 + width(quotient), y + 46, quotient))
    for k, (s, last) in enumerate(steps):
        xr = digit_x(x0, dividend, last) + DW / 2
        p.append(num(xr, y + step_h * (k + 1), s))
    return ''.join(p)
