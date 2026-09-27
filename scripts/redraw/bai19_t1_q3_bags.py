"""
Vở BT Toán 2, Bài 19 Tiết 1 Q3 — ba bao gạo ghi phép tính: nét riêng.

Nội dung toán giữ đúng sách (trái -> phải): "68 kg + 9 kg", "69 kg + 3 kg", "73 kg + 7 kg".
Bao để màu nhạt (trong sách bé tô màu vào bao).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g1 import sack_lying

W, H = 900, 227
P = [sack_lying(x, 212, 256, 186, lab, size=25) for x, lab in
     ((136, '68 kg + 9 kg'), (450, '69 kg + 3 kg'), (760, '73 kg + 7 kg'))]
save('bai19_t1_q3_bags', W, H, P)
