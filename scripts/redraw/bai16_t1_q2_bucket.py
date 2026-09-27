"""
Vở BT Toán 2, Bài 16 Tiết 1 Q2 — thẻ nối: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: Xô ghi "20 l" (đáp án: Hai mươi lít).
Sách in nét đen trắng (câu 2b cho bé tô màu) nên thân để trắng, chỉ viền INK.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import *

W, H = 260, 239
parts = bucket(132, 232, 216, 192, label=litre(20), size=46, body=WHITE, inside=GREY_L, grip=WHITE, sw=3.2)
save('bai16_t1_q2_bucket', W, H, parts)
