"""
Vở BT Toán 2, Bài 21 Tiết 1 Q3 — con bò cân với con lợn và con dê: nét riêng.

Nội dung toán giữ đúng sách: cân đĩa THĂNG BẰNG; đĩa trái con bò, trên thân có ô trống
và chữ "kg"; đĩa phải con lợn ghi "23 kg" và con dê ghi "8 kg" (-> bò 31 kg).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *; from kit_measure import balance_scale, bal_item
from kit_g1 import cow, pig, goat

W, H = 900, 465
# bal_item: cân nặng (gam) để ⚖️ Thử cân (engine/balancePlay.js) nghiêng đúng như sách.
left = bal_item(cow(10, 0)
        + '<rect x="-72" y="-160" width="58" height="56" rx="12" fill="#fff" stroke="#3F3A40" stroke-width="3"/>'
        + text(12, -121, 'kg', size=30, weight=700), 31000, 'con bò')
right = (bal_item(pig(-80, 0, flip=True) + text(-50, -52, '23 kg', size=28, weight=700), 23000, 'con lợn')
         + bal_item(goat(106, 0, flip=True) + text(118, -110, '8 kg', size=28, weight=700), 8000, 'con dê'))
P = [balance_scale(450, 456, left, right, tilt=0, arm=230, pan_w=380, post_h=100)]
save('bai21_t1_q3_scale', W, H, P)
