"""
Vở BT Toán 2, Bài 33 Tiết 2 Q3 — chọn hai túi gạo để cân thăng bằng: nét riêng.

Nội dung toán giữ đúng sách:
* cân đĩa: đĩa trái túi "3 kg" + túi "9 kg"; đĩa phải trống, có dấu "?" (đĩa trái hơi thấp).
* bốn túi đánh số khoanh tròn: ① 6 kg · ② 7 kg · ③ 8 kg · ④ 5 kg.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import balance_scale, sack, balance_geom, bal_item, bal_hint

W, H = 900, 266
K = dict(arm=130, pan_w=200, post_h=54, drop=10)
TILT = -0.6
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
left = (bal_item(sack(-56, 0, ['3 kg'], w=80, h=80, col='#D5DCE3', size=19), 3000, 'túi 3 kg')
        + bal_item(sack(38, 0, ['9 kg'], w=112, h=150, col='#E8ECF0', size=24), 9000, 'túi 9 kg'))
# dấu "?" nằm trên đĩa phải (đi theo đĩa), engine ẩn khi đĩa có túi
P = [balance_scale(235, 258, left, bal_hint(text(0, -12, '?', size=38, weight=700)), tilt=TILT, **K)]
bags = [('1', '6 kg', 546, 94, 112, '#D5DCE3'), ('2', '7 kg', 648, 96, 124, '#CDEBFA'),
        ('3', '8 kg', 752, 104, 150, '#8FD0F2'), ('4', '5 kg', 852, 84, 106, '#E8ECF0')]
for n, lab, x, w, h, col in bags:
    # túi và số khoanh tròn đi cùng nhau khi bé đặt túi lên cân
    P.append(bal_item(sack(x, 190, [lab], w=w, h=h, col=col, size=22)
                      + f'<circle cx="{x}" cy="232" r="19" fill="#fff" stroke="{INK}" stroke-width="2.4"/>'
                      + text(x, 241, n, size=24, weight=600), int(lab.split()[0]) * 1000, f'túi số {n}'))
save('bai33_t2_q3_scale', W, H, P)
