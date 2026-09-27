"""
Vở BT Toán 2, Bài 16 Tiết 1 Q2 — thẻ nối: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: Bình ghi "5 l" (đáp án: Năm lít).
Sách in nét đen trắng (câu 2b cho bé tô màu) nên thân để trắng, chỉ viền INK.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import *

W, H = 145, 144
parts = pitcher(60, 140, 84, 122, label=litre(5), size=36, body=WHITE, sw=3.2)
save('bai16_t1_q2_jug5', W, H, parts)
