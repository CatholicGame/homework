"""
Vở BT Toán 2, Bài 16 Tiết 1 Q2 — thẻ nối: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: Ca ghi "3 l" (đáp án: Ba lít).
Sách in nét đen trắng (câu 2b cho bé tô màu) nên thân để trắng, chỉ viền INK.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import *

W, H = 130, 87
parts = measuring_jug(60, 84, 74, 66, level=None, label=litre(3), size=32, body=WHITE, sw=3)
save('bai16_t1_q2_jug3', W, H, parts)
