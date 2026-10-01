"""
Vở BT Toán 3 Tập hai, Bài 56 Tiết 1 Q5 — "Hình bên vẽ một đàn voi": nét riêng.
Nội dung toán: đàn voi có đúng 9 con (4 con hàng sau, 5 con hàng trước), không vẽ
thêm con vật nào khác để bé đếm không nhầm.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_g3 as k3
from g3t2_bai56_kit import *

W, H = 600, 300
parts = [f'<rect x="2" y="2" width="{W - 4}" height="{H - 4}" rx="18" fill="{SKY}" stroke="{SKY_D}" stroke-width="3"/>',
         f'<path d="M4,150 Q140,128 280,146 T596,140 L596,280 Q596,296 580,296 L20,296 Q4,296 4,280 Z" fill="{GRASS}" opacity=".85"/>',
         f'<ellipse cx="320" cy="222" rx="210" ry="40" fill="{WATER_L}" stroke="{WATER_D}" stroke-width="2.4"/>']
for x, h in ((36, 120), (190, 100), (430, 105), (566, 125)):
    parts.append(k3.tree(x, 160, h))
# hàng sau: 4 con
for x, pose, fl in ((105, 'trunk_up', False), (240, 'stand', True), (365, 'stand', False), (500, 'stand', True)):
    parts.append(put(x, 176, elephant(pose), .56, flip=fl))
# hàng trước: 5 con
for x, pose, fl in ((58, 'sit', False), (178, 'stand', False), (310, 'sit', True), (428, 'trunk_up', False), (548, 'sit', True)):
    parts.append(put(x, 268, elephant(pose), .62, flip=fl))
save('bai56_t1_q5_elephants', W, H, parts, folder='grade3-workbook-2')
