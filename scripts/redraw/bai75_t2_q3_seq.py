"""
Vở BT Toán 2, Bài 75 Tiết 2 Q3b — dãy hình lặp: vẽ lại nét riêng.
Giữ nội dung toán: khối lập phương, khối cầu, khối trụ, khối lập phương, khối cầu,
khối trụ, khối lập phương, dấu "?", khối trụ (đáp án: khối cầu).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g9 import *

W, H = 800, 102
parts = []
STEP = 90
for i, k in enumerate(['cube', 'ball', 'cyl', 'cube', 'ball', 'cyl', 'cube', '?', 'cyl']):
    cx = 44 + i * STEP
    if k == 'cube':
        parts.append(cube(cx - 36, 32, 62, 2.6))
    elif k == 'ball':
        parts.append(sphere(cx, 56, 34, 2.6))
    elif k == 'cyl':
        parts.append(cylinder(cx, 18, 60, 72, 2.6))
    else:
        parts.append(text(cx, 70, '?', size=34, weight=700))
save('bai75_t2_q3_seq', W, H, parts)
