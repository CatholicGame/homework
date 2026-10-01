"""Vở BT Toán 3 Tập hai, Bài 69 — tờ lịch tháng 6 (ngày 1 là thứ Tư, 30 ngày) và tháng 7
(ngày 1 là thứ Ba, 31 ngày). Nét riêng; chỉ giữ tên tháng, thứ, ngày; Chủ nhật màu xanh."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from g3t2_bai68_kit import *

W = 420
cal, H = calendar(8, 18, W - 16, 'THÁNG SÁU', 2, 30)
save('bai69_t1_q2_june', W, H + 30, [cal], folder=FOLDER)

# tháng 7: thêm vài bông hoa nhỏ ở góc (trang trí riêng)
cal, H = calendar(8, 18, W - 16, 'THÁNG BẢY', 1, 31, head='#5BB8E6')
save('bai69_t2_q3_july', W, H + 30, [cal], folder=FOLDER)
