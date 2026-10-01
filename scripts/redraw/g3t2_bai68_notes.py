"""Vở BT Toán 3 Tập hai, Bài 68 Tiết 1 Q2 — tờ tiền lẻ (cách điệu) dùng trong các lựa chọn a), b), c)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from g3t2_bai68_kit import *

for v in (5000, 10000, 20000):
    W, H = 216, 104
    save(f'bai68_note_{v}', W, H, [banknote(2, 2, 208, 96, v)], folder=FOLDER)
