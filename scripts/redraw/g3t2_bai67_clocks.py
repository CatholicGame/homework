"""
Vở BT Toán 3 Tập hai, Bài 67 (trang 78–81): đồng hồ kim và tờ lịch tháng Một, nét riêng.
Giờ đọc từ sách ở 300–700 dpi; kim giờ vẽ đúng vị trí theo phút (sách vẽ tay hơi lệch).
    python scripts/redraw/g3t2_bai67_clocks.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from g3t2_bai66_clocks import clock, clock_row, save, text, FOLDER
from g3t2_bai66_calendar import calendar

ABCD = ['A.', 'B.', 'C.', 'D.']

# Tiết 1 Q1: thức dậy, đi xe đạp, ăn sáng — sách in theo thứ tự 6:15, 6:00, 7:40
clock_row('bai67_t1_q1_clocks', [(6, 15), (6, 0), (7, 40)], r=72, gap=40)
# Tiết 1 Q2 a) nhào bột xong lúc 8:00
clock_row('bai67_t1_q2a_clocks', [(7, 20), (7, 50), (8, 0), (8, 10)], ABCD, r=62, gap=22)
# b) lấy bột ra lúc 8:50
clock_row('bai67_t1_q2b_clocks', [(8, 50), (7, 50), (9, 50), (9, 0)], ABCD, r=62, gap=22)
# c) bắt đầu 8:50, kết thúc 8:55
clock_row('bai67_t1_q2c_clocks', [(8, 50), (8, 55)], ['Bắt đầu', 'Kết thúc'], r=66, gap=40, label_pos='bottom')
# d) bắt đầu nướng lúc 9:05
clock_row('bai67_t1_q2d_clocks', [(8, 55), (9, 5), (8, 50), (10, 45)], ABCD, r=62, gap=22)
# Tiết 2 Q4: lên máy bay 6:40, cất cánh sau 25 phút = 7:05
clock_row('bai67_t2_q4_clocks', [(6, 40), (7, 0), (7, 5), (7, 10), (7, 15)],
          ['Lúc lên' + chr(10) + 'máy bay', 'A', 'B', 'C', 'D'], r=58, gap=16, label_pos='bottom')
# Tiết 2: tờ lịch tháng Một, ngày 1 là thứ Bảy
calendar('bai67_t2_calendar', 'Một', 5, 31)

# Tiết 2 Q3 gộp a) và b) vào một hình (một câu hỏi trong sách = một câu trong app).
def clock_block(times, labels, r, gap, x0, y0):
    parts = []
    for i, (h, m) in enumerate(times):
        cx = x0 + r + i * (2 * r + gap)
        parts.append(clock(cx, y0 + r, r, h, m))
        parts.append(text(cx, y0 + 2 * r + 30, labels[i], size=22, weight=600))
    return parts


W3, r3 = 664, 58
parts3 = [text(10, 30, 'a)', size=26, weight=700, anchor='start')]
parts3 += clock_block([(5, 35), (5, 55)], ['Bắt đầu', 'Kết thúc'], 66, 40, 60, 12)
yb = 12 + 2 * 66 + 50
parts3.append(text(10, yb + 20, 'b)', size=26, weight=700, anchor='start'))
parts3 += clock_block([(8, 10), (8, 43), (9, 53), (8, 53), (8, 50)], ['Bắt đầu', 'A', 'B', 'C', 'D'], r3, 16, 10, yb + 32)
save('bai67_t2_q3_clocks', W3, yb + 32 + 2 * r3 + 44, parts3, folder=FOLDER)
