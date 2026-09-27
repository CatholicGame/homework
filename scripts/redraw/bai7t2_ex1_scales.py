"""
Vở BT Toán 3, Bài 7 Tiết 2 Q1a — 2 cân đồng hồ (0–10 kg). Vẽ lại bằng nét riêng.
  Quả dưa hấu: kim chỉ 5 kg.   Quả sầu riêng: kim chỉ 2 kg.
Mặt số: số 0–9 quanh vòng (0 ở đỉnh), dòng "10 kg" dưới số 0, mỗi kg chia 5 vạch.
(Dòng chữ câu hỏi bị cắt dính ở đáy ảnh gốc được bỏ — đã có trong app.)
Quả trên đĩa là bal_item để bé nhấc xuống / đặt lại, kim quay theo (engine/balancePlay.js).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import *
from kit_w1 import *

W, H = 1480, 740
K = 1.72
parts = []


def dial(v):
    return round_dial(labels=[(i / 10, str(i)) for i in range(10)], n_ticks=50, major_every=5,
                      value_frac=v / 10, label_r=52, fs=17,
                      center_note=text(0, -100 - 24, '10 kg', size=12, weight=700))


def durian(x, y, w=150, h=104):
    cy = y - h / 2
    s = []
    # gai: răng cưa quanh viền
    n = 26
    pts = []
    for i in range(n * 2):
        t = 2 * math.pi * i / (n * 2)
        r = 1.0 if i % 2 == 0 else 0.9
        pts.append(f'{x + math.cos(t) * w / 2 * r:.1f},{cy + math.sin(t) * h / 2 * r:.1f}')
    s.append(f'<polygon points="{" ".join(pts)}" fill="#A8C94A" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    for gx, gy in ((-40, -18), (-10, -28), (22, -20), (48, -4), (-48, 12), (-18, 4), (14, 10), (40, 24), (-28, 30), (4, 34)):
        s.append(f'<path d="M{x + gx - 5},{cy + gy + 4} L{x + gx},{cy + gy - 5} L{x + gx + 5},{cy + gy + 4}" fill="#C6DE72" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    s.append(f'<rect x="{x + w / 2 - 6}" y="{cy - 6}" width="26" height="12" rx="4" fill="{BROWN}" stroke="{INK}" stroke-width="2.5"/>')
    return ''.join(s)


parts.append(kitchen_scale(dial(5), bal_item(watermelon(0, 4, 190, 150), 5000, 'quả dưa hấu'), cx=370, by=720, k=K))
parts.append(kitchen_scale(dial(2), bal_item(durian(-8, 4), 2000, 'quả sầu riêng'), body='#F7B7A3', cx=1110, by=720, k=K))

save('bai7t2_ex1_scales', W, H, parts, folder='grade3-workbook')
