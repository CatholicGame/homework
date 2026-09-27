"""
Vở BT Toán 3, Bài 31 (Gam) Q2 — 2 cân đồng hồ (0–1 kg). Vẽ lại bằng nét riêng.
  Túi táo: kim chỉ 750 g.   Gói bột mì: kim chỉ 500 g.
Mặt số chia 20 vạch (50 g), ghi 1 kg (đỉnh), 250 g, 500 g, 750 g.
Đồ trên đĩa là bal_item để bé nhấc xuống / đặt lại, kim quay theo (engine/balancePlay.js).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import *
from kit_w1 import *

W, H = 1280, 540
K = 1.42
parts = []


def dial(g):
    return round_dial(labels=[(0, '1 kg'), (.25, '250 g'), (.5, '500 g'), (.75, '750 g')],
                      n_ticks=20, major_every=5, value_frac=g / 1000, label_r=44, fs=15, needle_on_top=True)


def apple_bag():
    s = [apple(-30, 0, 20), apple(30, 0, 20, col='#F58A7E'), apple(0, 0, 21), apple(-16, -36, 19, col='#F58A7E'), apple(18, -36, 19)]
    net = 'M-58,-6 Q-66,-60 -12,-92 L0,-100 L12,-92 Q66,-60 58,-6 Q0,6 -58,-6 Z'
    cid = uid('net')
    s.append(f'<clipPath id="{cid}"><path d="{net}"/></clipPath><g clip-path="url(#{cid})" opacity=".9">')
    for i in range(-8, 9):
        s.append(f'<line x1="{i * 14 - 60}" y1="10" x2="{i * 14 + 60}" y2="-110" stroke="{ORANGE}" stroke-width="2"/>')
        s.append(f'<line x1="{i * 14 + 60}" y1="10" x2="{i * 14 - 60}" y2="-110" stroke="{ORANGE}" stroke-width="2"/>')
    s.append('</g>')
    s.append(f'<path d="{net}" fill="none" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
    s.append(f'<path d="M0,-98 q-14,-18 -6,-26 q6,4 6,20 q2,-16 10,-18 q6,8 -10,24" fill="{ORANGE}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
    s.append(f'<rect x="-9" y="-104" width="18" height="9" rx="4" fill="{RED}" stroke="{INK}" stroke-width="2.2"/>')
    return ''.join(s)


def flour_bag():
    return ('<g transform="rotate(-8)">' +
            pillow_bag(0, 2, 'Bột mì', w=176, h=64, band=YELLOW, size=20) + '</g>')


parts.append(kitchen_scale(dial(750), bal_item(apple_bag(), 750, 'túi táo'), cx=210, by=528, k=K))
parts.append(kitchen_scale(dial(500), bal_item(flour_bag(), 500, 'gói bột mì'), body='#9BD58A', cx=1070, by=528, k=K))

save('bai31_q2_dials', W, H, parts, folder='grade3-workbook')
