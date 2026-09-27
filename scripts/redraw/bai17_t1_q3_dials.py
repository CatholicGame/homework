"""
Vở BT Toán 2, Bài 17 Tiết 1 Q3 — túi cà phê, túi gạo trên cân đồng hồ: nét riêng.

Nội dung toán giữ đúng sách: mặt cân chia 0 … 8 kg (0 và 8 trùng nhau ở đỉnh);
cân trái túi "CÀ PHÊ", kim chỉ 5; cân phải túi "GẠO", kim chỉ 7.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 463
SW_ = 250


def scale(cx, lab, v, col, band):
    base = 452
    bag = pillow_bag(0, 0, lab, w=300, h=128, col=col, band=band, size=30)
    out = [dial_scale(cx, base, v, max_kg=8, items=bag, w=SW_)]
    # số 8 nhỏ ngay dưới số 0 (như mặt cân thật: 0 và 8 trùng nhau)
    h = SW_ * 1.05
    R = SW_ * .34
    dcy = base - h * .45
    out.append(text(cx, dcy - R + 42, '8', size=15, weight=700))
    return ''.join(out)


P = [scale(225, 'CÀ PHÊ', 5, '#F3E3CF', '#C98F5E'), scale(675, 'GẠO', 7, WHITE, '#A8DDF5')]
save('bai17_t1_q3_dials', W, H, P)
