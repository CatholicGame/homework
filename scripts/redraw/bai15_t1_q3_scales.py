"""
Vở BT Toán 2, Bài 15 Tiết 1 Q3 — thú bông cân với quả chanh: nét riêng.

Nội dung toán giữ đúng sách: ba cân đĩa đều THĂNG BẰNG; đĩa trái là thú bông, đĩa phải
là quả chanh: gấu bông = 4 quả chanh, chó bông = 3 quả chanh, thỏ bông = 2 quả chanh.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 160
LIME = '#B9DE5E'
K = dict(arm=80, pan_w=120, post_h=46, drop=10)


def lemons(n, r=11):
    """n quả chanh xếp một hàng trên đĩa, hơi chồng lên nhau"""
    step = 2 * r * 1.45
    x0 = -(n - 1) * step / 2
    return ''.join(bal_item(lemon(x0 + i * step, 0, r, col=LIME, rot=(-8 if i % 2 else 8)), 100, 'quả chanh') for i in range(n))


parts = []
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
toys = [(bal_item(plush_bear(0, 0, 76, fur=BROWN), 400, 'gấu bông'), 4),
        (bal_item(plush_dog(0, 0, 70, fur='#F2C48D', ear=BROWN), 300, 'chó bông'), 3),
        (bal_item(plush_bunny(0, 0, 80, fur=WHITE, shirt=BLUE), 200, 'thỏ bông'), 2)]
for i, (toy, n) in enumerate(toys):
    parts.append(balance_scale(150 + i * 300, 156, toy, lemons(n), tilt=0, **K))
save('bai15_t1_q3_scales', W, H, parts)
