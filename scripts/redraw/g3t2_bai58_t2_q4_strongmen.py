"""
Vở BT Toán 3 Tập hai, Bài 58 Tiết 2 Q4 — ba người khổng lồ A, B, C nâng đồ vật:
A nâng 3 con ngựa, B nâng 1 con voi có 1 con chó đứng trên lưng, C nâng 1 khúc gỗ.
Hàng dưới: bảng cân nặng khúc gỗ 3 500 kg, chó 21 kg, ngựa 460 kg, voi 4 300 kg.
Người, con vật là nét riêng; chỉ giữ số lượng, nhãn và số như sách.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_g3 as k3
from g3t2_bai56_kit import *

W, H = 780, 560
BASE = 336
K = .5                     # tỉ lệ người
HAND_Y = BASE - 470 * K    # tay giơ cao
CARD = '#29A9E0'


def giant(x, shirt, bottom, hair='short'):
    body = k3.person(hair=hair, shirt=shirt, bottom=bottom, bottom_kind='pants', expr='open', adult=True,
                     arms=((-62, -470), (62, -470)), legs='walk', shoe='#8A5A3B', sleeve='none')
    return k3.place(x, BASE, K, body)


parts = [f'<path d="M0,{BASE - 40} L120,{BASE - 110} L230,{BASE - 60} L380,{BASE - 130} L520,{BASE - 70} L640,{BASE - 120} L780,{BASE - 50} L780,{BASE + 10} L0,{BASE + 10} Z" fill="#CFE8F6"/>',
         f'<rect x="0" y="{BASE - 6}" width="{W}" height="18" rx="8" fill="#A9DCF3"/>']
# A: tấm ván với 3 con ngựa
xa = 130
parts.append(put(xa - 52, HAND_Y - 4, horse(), .42, flip=True))
parts.append(put(xa + 2, HAND_Y - 4, horse(), .42, flip=True))
parts.append(put(xa + 50, HAND_Y - 4, horse(), .42))
parts.append(f'<rect x="{xa - 95}" y="{HAND_Y - 6}" width="190" height="12" rx="4" fill="#E0B887" stroke="{INK}" stroke-width="2.4"/>')
parts.append(giant(xa, BLUE, '#4E8FC8'))
# B: voi + chó trên lưng
xb = 390
parts.append(put(xb - 6, HAND_Y + 4, elephant('stand'), .62))
parts.append(put(xb - 10, HAND_Y - 62, dog(), .5))
parts.append(giant(xb, TEAL, '#3E8FC7', hair='spiky'))
# C: khúc gỗ
xc = 650
parts.append(put(xc + 10, HAND_Y - 2, log(170, 56), 1.0))
parts.append(giant(xc, '#F4A259', '#6FB7EA', hair='adult'))
for x, lab in ((xa, 'A'), (xb, 'B'), (xc, 'C')):
    parts.append(text(x, BASE + 48, lab, size=26, weight=600))
# bảng cân nặng
cards = [(log(80, 28), 1.0, '3 500 kg'), (dog(), .62, '21 kg'), (horse(), .48, '460 kg'), (elephant('stand'), .42, '4 300 kg')]
for i, (icon, sc, lab) in enumerate(cards):
    cx = 105 + i * 190
    parts.append(put(cx, 470, icon, sc))
    parts.append(f'<rect x="{cx - 70}" y="486" width="140" height="52" rx="12" fill="#E6F5FC" stroke="{CARD}" stroke-width="3.4"/>')
    parts.append(text(cx, 521, lab, size=25, weight=600))
save('bai58_t2_q4_strongmen', W, H, parts, folder='grade3-workbook-2')
