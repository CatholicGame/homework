"""
Vở BT Toán 2, Bài 35 Tiết 1 Q3 — túi gạo trên cân đĩa, thỏ trên cân đồng hồ: nét riêng.

Nội dung toán giữ đúng sách:
* cân đĩa THĂNG BẰNG: đĩa trái quả cân "2 kg" + "5 kg", đĩa phải túi "GẠO" (-> 7 kg).
* cân đồng hồ 0 … 8 kg (0 và 8 trùng ở đỉnh), trên đĩa quả cân "2 kg" + con thỏ,
  kim chỉ 6 (-> thỏ 4 kg).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 427
P = [balance_scale(290, 414, weight(-54, 0, '2 kg', w=74) + weight(40, 0, '5 kg', w=96),
                   pillow_bag(0, 0, 'GẠO', w=210, h=104, col='#CDEBFA', band=WHITE, size=28),
                   tilt=0, arm=165, pan_w=210, post_h=74)]
DW, BASE = 204, 414
items = weight(-58, 0, '2 kg', w=66) + plush_bunny(34, 0, 150, fur=WHITE, inner=PINK)
P.append(dial_scale(764, BASE, 6, max_kg=8, items=items, w=DW))
R, dcy = DW * .34, BASE - DW * 1.05 * .45
P.append(text(764, dcy - R + 38, '8', size=14, weight=700))
save('bai35_t1_q3_scales', W, H, P)
