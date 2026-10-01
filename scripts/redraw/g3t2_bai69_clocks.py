"""Vở BT Toán 3 Tập hai, Bài 69 — các hình đồng hồ (nét riêng; chỉ giữ giờ, nhãn chữ)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from g3t2_bai68_kit import *

# Tiết 1 Q1: 8:00, 8:40, 9:40, 10:20 (thứ tự như sách)
R = 78
parts = [clock(10 + R + i * (2 * R + 30), 10 + R, R, h, m) for i, (h, m) in enumerate([(8, 0), (8, 40), (9, 40), (10, 20)])]
save('bai69_t1_q1_clocks', 4 * 2 * R + 3 * 30 + 20, 2 * R + 20, parts, folder=FOLDER)

# Tiết 1 Q5: rời khỏi nhà 5:17, đến sân bóng 5:23
R = 110
parts = [clock(20 + R, 10 + R, R, 5, 17), clock(20 + 3 * R + 120, 10 + R, R, 5, 23),
         label(20 + R, 2 * R + 48, 'Rời khỏi nhà', 24), label(20 + 3 * R + 120, 2 * R + 48, 'Đến sân bóng', 24)]
save('bai69_t1_q5_clocks', 4 * R + 160, 2 * R + 62, parts, folder=FOLDER)

# Tiết 3 Q1: a) Bây giờ 8:00; A 9:00, B 7:00, C 7:50, D 12:35
#            b) 30 phút trước 2:15; A 2:30, B 1:45, C 2:00, D 2:45
R, gap = 70, 24
def row(y, items, caps):
    out = []
    for i, ((h, m), cap) in enumerate(zip(items, caps)):
        cx = 12 + R + i * (2 * R + gap)
        out.append(clock(cx, y + R, R, h, m))
        out.append(label(cx, y + 2 * R + 32, cap, 24))
    return out
W = 5 * 2 * R + 4 * gap + 24
parts = [label(4, 26, 'a)', 24, 700, anchor='start')]
parts += row(36, [(8, 0), (9, 0), (7, 0), (7, 50), (0, 35)], ['Bây giờ', 'A', 'B', 'C', 'D'])
parts += [label(4, 36 + 2 * R + 76, 'b)', 24, 700, anchor='start')]
parts += row(36 + 2 * R + 86, [(2, 15), (2, 30), (1, 45), (2, 0), (2, 45)], ['30 phút trước', 'A', 'B', 'C', 'D'])
save('bai69_t3_q1_clocks', W, 36 + 2 * (2 * R + 86) - 40, parts, folder=FOLDER)

# Tiết 3 Q4: 4:25, 4:15, 8:55, 4:20
R = 72
parts = [clock(10 + R + i * (2 * R + 22), 10 + R, R, h, m) for i, (h, m) in enumerate([(4, 25), (4, 15), (8, 55), (4, 20)])]
save('bai69_t3_q4_clocks', 4 * 2 * R + 3 * 22 + 20, 2 * R + 20, parts, folder=FOLDER)
