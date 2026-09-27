"""
Vở BT Toán 3, Bài 35 Tiết 2 Q4 — 2 cân đĩa thăng bằng với hộp quà. Vẽ lại bằng nét riêng.
  Cân 1: hộp A (to)          = 2 hộp B
  Cân 2: 1 hộp B + 100 g     = 500 g      -> B = 400 g, A = 800 g
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import *
from kit_w1 import *

W, H = 1650, 420
K = 1.75
parts = []
BOX_A = dict(body=PURPLE, ribbon=YELLOW)
BOX_B = dict(body=SKY_D, ribbon=PINK)

parts.append(big_balance(420, 408, K, gift(0, 0, 66, 66, tag='A', tag_size=26, **BOX_A),
                         gift(-32, 0, 46, 48, tag='B', tag_size=24, **BOX_B) + gift(32, 0, 46, 48, tag='B', tag_size=24, **BOX_B)))
parts.append(big_balance(1230, 408, K, gift(-22, 0, 46, 48, tag='B', tag_size=24, **BOX_B) + wt(36, '100 g', 26),
                         wt(0, '500 g', 58)))

save('bai35_t2_q4_gifts', W, H, parts, folder='grade3-workbook')
