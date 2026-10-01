"""
Vở BT Toán 3 Tập hai, Bài 66 (trang 75–76): các đồng hồ kim, nét riêng.
Chỉ giữ nội dung toán: giờ, phút mỗi đồng hồ, nhãn A/B/C/D, chữ "Bắt đầu"/"Kết thúc".
Quy tắc kim: kim dừng trước vòng số, không bao giờ che số trên mặt đồng hồ.

Hàm clock()/clock_row() được g3t2_bai67_clocks.py dùng lại.
    python scripts/redraw/g3t2_bai66_clocks.py
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

RIM, RIM_D, FACE = '#29A9E1', '#1B7FB0', '#EAF7FE'
HOUR = '#1F5F8B'
FOLDER = 'grade3-workbook-2'


def clock(cx, cy, r, h, m):
    """Đồng hồ kim: 12 số, vạch phút; kim giờ ngắn đậm, kim phút dài mảnh — cả hai dừng trước vòng số."""
    p = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{RIM}" stroke="{INK}" stroke-width="{r * .035:.1f}"/>',
         f'<circle cx="{cx}" cy="{cy}" r="{r * .88:.1f}" fill="{FACE}" stroke="{RIM_D}" stroke-width="{r * .025:.1f}"/>']
    for i in range(60):
        a = math.radians(i * 6 - 90)
        r1 = r * (.77 if i % 5 == 0 else .81)
        p.append(f'<line x1="{cx + r1 * math.cos(a):.1f}" y1="{cy + r1 * math.sin(a):.1f}" '
                 f'x2="{cx + r * .86 * math.cos(a):.1f}" y2="{cy + r * .86 * math.sin(a):.1f}" '
                 f'stroke="{INK}" stroke-width="{r * (.03 if i % 5 == 0 else .014):.1f}"/>')
    fs = r * .23
    for n in range(1, 13):
        a = math.radians(n * 30 - 90)
        p.append(text(f'{cx + r * .64 * math.cos(a):.1f}', f'{cy + r * .64 * math.sin(a) + fs * .36:.1f}',
                      str(n), size=f'{fs:.1f}', weight=700))
    ha = math.radians((h % 12 + m / 60) * 30 - 90)
    ma = math.radians(m * 6 - 90)
    # số gần tâm nhất có mép trong ≈ 0,63r − 0,13r = 0,5r → kim phút 0,47r, kim giờ 0,32r
    p.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .32 * math.cos(ha):.1f}" y2="{cy + r * .32 * math.sin(ha):.1f}" '
             f'stroke="{HOUR}" stroke-width="{r * .085:.1f}" stroke-linecap="round"/>')
    p.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .47 * math.cos(ma):.1f}" y2="{cy + r * .47 * math.sin(ma):.1f}" '
             f'stroke="{INK}" stroke-width="{r * .04:.1f}" stroke-linecap="round"/>')
    p.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .06:.1f}" fill="{INK}"/>')
    return '\n'.join(p)


def clock_row(name, times, labels=None, r=70, gap=30, label_pos='top', H=None):
    """Một hàng đồng hồ (times = [(h, m), ...]); labels = chữ đặt trên (A., B., ...) hoặc dưới mỗi đồng hồ."""
    n = len(times)
    lab_h = 34 if labels else 0
    W = int(n * 2 * r + (n - 1) * gap + 20)
    extra = 26 * max((l.count(chr(10)) for l in labels), default=0) if labels else 0
    H = H or int(2 * r + lab_h + 16 + extra)
    parts = []
    for i, (h, m) in enumerate(times):
        cx = 10 + r + i * (2 * r + gap)
        if labels and label_pos == 'top':
            cy = lab_h + 6 + r
            parts.append(text(cx - r + 4, 26, labels[i], size=24, weight=600, anchor='start'))
        else:
            cy = 8 + r
            if labels:
                for k, line in enumerate(labels[i].split(chr(10))):
                    parts.append(text(cx, 2 * r + 8 + 30 + k * 26, line, size=22, weight=600))
        parts.append(clock(cx, cy, r, h, m))
    save(name, W, H, parts, folder=FOLDER)


if __name__ == '__main__':
    # Tiết 1 Q2: bốn đồng hồ kim buổi tối (21:55, 22:45, 20:50, 23:40) — mỗi chiếc một hình để nối
    for i, (h, m) in enumerate([(9, 55), (10, 45), (8, 50), (11, 40)]):
        clock_row(f'bai66_t1_q2_clock{i + 1}', [(h, m)], r=64)
    # Tiết 1 Q4: "Lúc này" 3 giờ 15 phút (trên) + bốn lựa chọn A–D (dưới)
    r, gap = 64, 24
    W = 4 * 2 * r + 3 * gap + 20
    H = 2 * r + 40 + 2 * r + 60
    parts = [text(W / 2, 28, 'Lúc này', size=24, weight=700), clock(W / 2, 40 + r, r, 3, 15)]
    parts.append(f'<line x1="10" y1="{2 * r + 56}" x2="{W - 10}" y2="{2 * r + 56}" stroke="{GREY_L}" stroke-width="3"/>')
    for i, (lab, h, m) in enumerate([('A.', 3, 5), ('B.', 3, 10), ('C.', 3, 20), ('D.', 3, 25)]):
        cx = 10 + r + i * (2 * r + gap)
        parts.append(text(cx - r + 2, 2 * r + 90, lab, size=24, weight=600, anchor='start'))
        parts.append(clock(cx, 2 * r + 100 + r, r, h, m))
    save('bai66_t1_q4_clocks', W, H + 10, parts, folder=FOLDER)
