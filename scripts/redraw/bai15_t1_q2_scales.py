"""
Vở BT Toán 2, Bài 15 Tiết 1 Q2 — cam, táo, bưởi trên hai cân đĩa: nét riêng.

Nội dung toán giữ đúng sách (nhãn có đường chỉ như sách):
* cân trái: đĩa trái quả "cam", đĩa phải quả "táo"; đĩa CAM THẤP hơn -> cam nặng hơn táo.
* cân phải: đĩa trái quả "cam", đĩa phải quả "bưởi"; đĩa BƯỞI THẤP hơn -> bưởi nặng hơn cam.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import *

W, H = 900, 161
parts = []
K = dict(arm=100, pan_w=132, post_h=50, drop=10)


def tag(tx, ty, s, x2, y2, anchor):
    """nhãn chữ + đường chỉ tới quả"""
    w = text_width(s, 24, 600)
    x1 = tx + (w + 4 if anchor == 'start' else -w - 4) if anchor != 'middle' else tx
    parts.append(f'<line x1="{x1:.1f}" y1="{ty - 7}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{INK}" stroke-width="2.2" stroke-linecap="round"/>')
    parts.append(text(tx, ty, s, size=24, weight=600, anchor=anchor))


# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
for cx, tilt, right, rlabel in ((225, -1, bal_item(apple(0, 0, 19), 150, 'quả táo'), 'táo'),
                                 (665, 1, bal_item(pomelo(0, 0, 27), 1000, 'quả bưởi'), 'bưởi')):
    parts.append(balance_scale(cx, 156, bal_item(orange(0, 0, 21), 200, 'quả cam'), right, tilt=tilt, **K))
    g = balance_geom(cx, 156, tilt=tilt, arm=K['arm'], post_h=K['post_h'], drop=K['drop'])
    lx, ly = g['left']
    rx, ry = g['right']
    tag(cx - 208, 38, 'cam', lx - 18, ly - 26, 'start')
    tag(cx + 205, 26, rlabel, rx + (16 if rlabel == 'táo' else 24), ry - (26 if rlabel == 'táo' else 34), 'end')

save('bai15_t1_q2_scales', W, H, parts)
