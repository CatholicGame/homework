"""
Vở BT Toán 3, Bài 7 Tiết 1 câu 1b — dãy khối lặp lại "trụ, hộp chữ nhật, cầu, lập phương",
dấu "?" ở vị trí thứ 11 (đáp án: khối cầu). Nét riêng, không có số trang.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 1870, 640
SW = 4
COL = BLUE


def shape(kind, cx, yb):
    if kind == 'cyl':
        return cylinder(cx, yb - 14, 92, 76, COL, SW, ry=15)
    if kind == 'tall':
        return box3d(cx - 46, yb, 72, 112, 24, 18, COL, SW)
    if kind == 'cube':
        return box3d(cx - 46, yb, 74, 74, 24, 18, COL, SW)
    if kind == 'sph':
        return sphere(cx, yb - 54, 54, COL, SW)


parts = [text(12, 118, 'b) Khoanh vào chữ đặt trước câu trả lời đúng.', size=52, weight=500, anchor='start')]
seq = ['cyl', 'tall', 'sph', 'cube'] * 3
x0, step, yb = 110, 118, 272
for i, k in enumerate(seq):
    cx = x0 + i * step
    if i == 10:
        parts.append(text(cx, yb - 36, '?', size=64, weight=700))
    else:
        parts.append(shape(k, cx, yb))
parts.append(text(12, 385, 'Hình thích hợp đặt vào dấu “?” là:', size=52, weight=500, anchor='start'))
for i, (lab, k) in enumerate(zip('ABCD', ['cyl', 'tall', 'sph', 'cube'])):
    x = 70 + i * 390
    parts.append(text(x, 548, f'{lab}.', size=54, weight=500, anchor='start'))
    parts.append(shape(k, x + 130, 552))
save('bai7_ex1b_pattern', W, H, parts, folder='grade3-workbook')
