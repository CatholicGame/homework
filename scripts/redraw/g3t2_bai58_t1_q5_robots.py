"""
Vở BT Toán 3 Tập hai, Bài 58 Tiết 1 Q5 — rô-bốt A (lắp 5 cục pin) và rô-bốt B
(lắp 6 cục pin): hàng pin phía trên mỗi rô-bốt đúng số lượng như sách.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_g1 as k1
from g3t2_bai56_kit import *

W, H = 600, 320
parts = []
for cx, n, lab, acc in ((150, 5, 'A', BLUE), (450, 6, 'B', TEAL)):
    gap = 42
    x0 = cx - (n - 1) * gap / 2
    for i in range(n):
        parts.append(put(x0 + i * gap, 44, battery(w=34), 1.0))
    parts.append(f'<ellipse cx="{cx}" cy="310" rx="70" ry="7" fill="#E6EEF2"/>')
    parts.append(k1.robot(cx, 308, h=220, accent=acc, arm_pose='down'))
    # chữ A / B trên thân (thân rô-bốt cao 220: vùng y 288-136*1.1 .. 288-73*1.1)
    parts.append(f'<circle cx="{cx}" cy="{308 - 90 * 1.1:.0f}" r="15" fill="#fff" stroke="{INK}" stroke-width="2.4"/>')
    parts.append(text(cx, f'{308 - 90 * 1.1 + 7:.0f}', lab, size=21, weight=700))
save('bai58_t1_q5_robots', W, H, parts, folder='grade3-workbook-2')
