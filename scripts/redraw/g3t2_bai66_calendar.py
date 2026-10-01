"""
Vở BT Toán 3 Tập hai: tờ lịch tháng, nét riêng.
Bài 66 Tiết 2 Q2 (trang 77): tháng Mười Hai, ngày 1 là thứ Tư, 31 ngày.
Hàm calendar() được g3t2_bai67_calendar.py dùng lại (tháng Một, ngày 1 là thứ Bảy).
Chỉ giữ nội dung toán: tên tháng, thứ, vị trí từng ngày; cột Chủ nhật màu xanh như sách.
    python scripts/redraw/g3t2_bai66_calendar.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

FOLDER = 'grade3-workbook-2'
DAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật']
SUN = '#1E9BD7'


def calendar(name, month_name, first_col, ndays):
    cw, rh = 76, 44
    left, top = 190, 78
    rows = (first_col + ndays + 6) // 7
    W = left + 7 * cw + 20
    H = top + 40 + rows * rh + 24
    p = [f'<rect x="6" y="22" width="{W - 12}" height="{H - 28}" rx="18" fill="#D6F0FC" stroke="{INK}" stroke-width="3"/>']
    # gáy lò xo
    for i in range(14):
        x = 30 + i * (W - 60) / 13
        p.append(f'<rect x="{x - 4}" y="10" width="8" height="24" rx="4" fill="{WHITE}" stroke="{INK}" stroke-width="2.4"/>')
    # ô tên tháng
    p.append(f'<circle cx="96" cy="{top + 46}" r="74" fill="{WHITE}" stroke="{SUN}" stroke-width="5"/>')
    words = month_name.split()
    y0 = top + 46 - (24 + 30 * len(words)) / 2
    p.append(text(96, y0 + 16, 'THÁNG', size=20, weight=700, fill=SUN))
    for k, w in enumerate(words):
        p.append(text(96, y0 + 48 + k * 30, w.upper(), size=28, weight=700))
    # hoa nhỏ trang trí góc dưới
    for fx, fy, c in [(40, H - 44, PINK), (78, H - 30, YELLOW), (120, H - 50, PURPLE)]:
        for a in range(5):
            import math
            ang = math.radians(a * 72)
            p.append(f'<circle cx="{fx + 9 * math.cos(ang):.1f}" cy="{fy + 9 * math.sin(ang):.1f}" r="7" fill="{c}" stroke="{INK}" stroke-width="1.6"/>')
        p.append(f'<circle cx="{fx}" cy="{fy}" r="5" fill="{ORANGE}" stroke="{INK}" stroke-width="1.6"/>')
    # bảng ngày
    p.append(f'<rect x="{left - 8}" y="{top + 38}" width="{7 * cw + 10}" height="{rows * rh + 12}" rx="12" fill="{WHITE}" opacity=".85"/>')
    for c, d in enumerate(DAYS):
        x = left + c * cw
        p.append(f'<rect x="{x + 2}" y="{top - 8}" width="{cw - 6}" height="38" rx="9" fill="{SUN if c == 6 else "#3FA9DD"}"/>')
        a, b = d.split(' ')
        p.append(text(x + cw / 2 - 1, top + 7, a.upper(), size=12, weight=700, fill=WHITE))
        p.append(text(x + cw / 2 - 1, top + 23, b.upper(), size=12, weight=700, fill=WHITE))
    for day in range(1, ndays + 1):
        k = first_col + day - 1
        c, r = k % 7, k // 7
        x = left + c * cw + cw / 2 - 1
        y = top + 72 + r * rh
        p.append(text(x, y, str(day), size=26, weight=700, fill=SUN if c == 6 else INK))
    save(name, W, H, p, folder=FOLDER)


if __name__ == '__main__':
    calendar('bai66_t2_q2_calendar', 'Mười Hai', 2, 31)
