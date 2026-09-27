"""
Vở BT Toán 2, Bài 16 Tiết 1 Q2 — thẻ nối: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: Can ghi "10 l" (đáp án: Mười lít).
Sách in nét đen trắng (câu 2b cho bé tô màu) nên thân để trắng, chỉ viền INK.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import *

W, H = 174, 200
parts = jerrycan(87, 196, 150, 174, label=litre(10), size=44, body=WHITE, panel=WHITE, sw=3.2)
save('bai16_t1_q2_can10', W, H, parts)
