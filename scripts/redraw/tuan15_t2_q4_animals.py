"""
Luyện tập Toán 3, Tuần 15 Tiết 2 Q4 — dãy 6 hình theo quy tắc hổ, voi, khỉ, hổ, voi, khỉ, ...
Giữ nội dung toán: đúng thứ tự 6 con và dấu "..." ở cuối. Con vật là nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_p2 import *

W, H = 1735, 265
parts = []
seq = [(tiger, 10, 1.25), (elephant, 290, 1.25), (monkey, 580, 1.25),
       (tiger, 870, 1.25), (elephant, 1150, 1.25), (monkey, 1440, 1.25)]
for fn, x, s in seq:
    parts.append(place(fn(), x, 10, s))
parts.append(text(1705, 255, '...', size=44, weight=700))
save('tuan15_t2_q4_animals', W, H, parts, folder='grade3-practice')
