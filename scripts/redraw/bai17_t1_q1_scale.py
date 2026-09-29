"""
Vở BT Toán 2, Bài 17 Tiết 1 Q1b — chồng sách cân với quả cân 1 kg: nét riêng.

Nội dung toán giữ đúng sách: cân đĩa THĂNG BẰNG, đĩa trái có đúng 5 quyển sách
xếp chồng, đĩa phải có quả cân "1 kg" (-> 5 quyển sách cân nặng 1 kg).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *
from kit_g1 import book_flat

W, H = 654, 303
cols = [RED, BLUE, YELLOW, GREEN, PURPLE]
offs = [0, -8, 6, -4, 5]
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
books = ''.join(bal_item(book_flat(0, -i * 25, 190, 25, cols[i], dx=offs[i]), 200, 'quyển sách') for i in range(5))
parts = [balance_scale(327, 296, books, bal_item(weight(0, 0, '1 kg', w=110), 1000, 'quả cân 1 kg'), tilt=0, arm=180, pan_w=230, post_h=92)]
save('bai17_t1_q1_scale', W, H, parts)
