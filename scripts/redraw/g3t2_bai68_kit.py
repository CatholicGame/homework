"""
Bộ vẽ dùng chung cho Vở BT Toán 3 Tập hai, Bài 68–71 (nét riêng, không đồ theo sách):
tờ tiền cách điệu (chỉ giữ mệnh giá), đồng hồ kim, tờ lịch tháng, khung tranh.

Tờ tiền: KHÔNG chép chân dung / quốc huy / hoa văn tiền thật. Giữ mệnh giá: số to góc
dưới phải, số nhỏ hai góc trên, chữ "… NGHÌN ĐỒNG" ở giữa, hoa trang trí riêng bên trái.

Đồng hồ: kim phút dừng trước vòng số, không bao giờ che số (kim ngắn ≈ 65% kim dài).
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

FOLDER = 'grade3-workbook-2'
SW = 3


def f(v):
    return f'{v:.1f}'


def st(w=SW, col=INK):
    return f'stroke="{col}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def money(v):
    """10000 -> '10 000' (cách viết số của sách)"""
    s = str(v)
    out = ''
    while len(s) > 3:
        out = ' ' + s[-3:] + out
        s = s[:-3]
    return s + out


# mệnh giá -> (nền nhạt, dải, màu đậm, chữ)
NOTE_STYLE = {
    1000: ('#EDE6FB', '#CFC2F4', '#5B47A8', 'MỘT NGHÌN'),
    2000: ('#E4EEF9', '#BCD3EE', '#3F6593', 'HAI NGHÌN'),
    5000: ('#DDF0F5', '#AEDCE7', '#2D7A8C', 'NĂM NGHÌN'),
    10000: ('#FBEBD3', '#F5CE93', '#A7652A', 'MƯỜI NGHÌN'),
    20000: ('#DCEBFB', '#A9CBF2', '#2F5FA6', 'HAI MƯƠI NGHÌN'),
    50000: ('#FBDDE8', '#F2B0C8', '#A83A66', 'NĂM MƯƠI NGHÌN'),
    100000: ('#E0F2D9', '#B6DFA5', '#3F8A45', 'MỘT TRĂM NGHÌN'),
}


def banknote(x, y, w, h, value):
    """tờ tiền cách điệu, góc trên trái tại x,y (tỉ lệ ~ 2.1 : 1)"""
    light, mid, dark, words = NOTE_STYLE[value]
    k = h / 100
    s = [f'<rect x="{f(x + 3 * k)}" y="{f(y + 4 * k)}" width="{f(w)}" height="{f(h)}" rx="{f(7 * k)}" fill="#000" opacity=".10"/>',
         f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" rx="{f(7 * k)}" fill="{light}" stroke="{INK}" stroke-width="{f(max(1.4, 2.4 * k))}"/>',
         f'<rect x="{f(x + 6 * k)}" y="{f(y + 6 * k)}" width="{f(w - 12 * k)}" height="{f(20 * k)}" rx="{f(4 * k)}" fill="{mid}"/>',
         f'<rect x="{f(x + 6 * k)}" y="{f(y + 30 * k)}" width="{f(w - 12 * k)}" height="{f(h - 36 * k)}" rx="{f(4 * k)}" fill="none" '
         f'stroke="{dark}" stroke-width="{f(1.2 * k)}" stroke-dasharray="{f(4 * k)} {f(3 * k)}" opacity=".55"/>']
    ts = 15 * k
    s.append(text(f(x + 11 * k), f(y + 21 * k), money(value), size=f(ts), weight=700, fill=dark, anchor='start'))
    s.append(text(f(x + w - 11 * k), f(y + 21 * k), money(value), size=f(ts), weight=700, fill=dark, anchor='end'))
    # hoa trang trí riêng (6 cánh) bên trái
    cx, cy, r = x + w * 0.19, y + h * 0.6, 17 * k
    s.append(f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r + 6 * k)}" fill="{WHITE}" stroke="{dark}" stroke-width="{f(1.4 * k)}"/>')
    for i in range(6):
        a = i * math.pi / 3
        px, py = cx + r * 0.55 * math.cos(a), cy + r * 0.55 * math.sin(a)
        s.append(f'<ellipse cx="{f(px)}" cy="{f(py)}" rx="{f(r * 0.45)}" ry="{f(r * 0.26)}" transform="rotate({i * 60} {f(px)} {f(py)})" '
                 f'fill="{mid}" stroke="{dark}" stroke-width="{f(1 * k)}"/>')
    s.append(f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r * 0.3)}" fill="{YELLOW}" stroke="{dark}" stroke-width="{f(1 * k)}"/>')
    # chữ mệnh giá
    tx = x + w * 0.62
    ws = 12.5 * k if len(words) > 10 else 14 * k
    s.append(text(f(tx), f(y + 45 * k), words, size=f(ws), weight=700, fill=dark))
    s.append(text(f(tx), f(y + 59 * k), 'ĐỒNG', size=f(12 * k), weight=700, fill=dark))
    # số to góc dưới phải
    s.append(text(f(x + w - 11 * k), f(y + h - 9 * k), money(value), size=f(22 * k), weight=700, fill=dark, anchor='end'))
    return '\n'.join(s)


def clock(cx, cy, r, h, m, rim='#3FA7DC', face='#EAF6FD'):
    """Đồng hồ kim chỉ h giờ m phút. Kim ngắn đi theo phút. Kim không che số."""
    s = [f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r)}" fill="{rim}" {st(2.6)}/>',
         f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r * .87)}" fill="{face}" {st(2)}/>']
    for i in range(60):
        a = math.radians(i * 6)
        r1 = r * (.76 if i % 5 == 0 else .81)
        r2 = r * .86
        s.append(f'<line x1="{f(cx + r1 * math.sin(a))}" y1="{f(cy - r1 * math.cos(a))}" x2="{f(cx + r2 * math.sin(a))}" '
                 f'y2="{f(cy - r2 * math.cos(a))}" stroke="{INK}" stroke-width="{1.8 if i % 5 == 0 else .8}"/>')
    fs = r * .25
    rr = r * .61
    for n in range(1, 13):
        a = math.radians(n * 30)
        s.append(text(f(cx + rr * math.sin(a)), f(cy - rr * math.cos(a) + fs * .36), n, size=f(fs), weight=700))
    # kim dài dừng trước vòng số: rr - 0.6*fs
    lm = rr - .62 * fs
    lh = lm * .64
    am = math.radians(m * 6)
    ah = math.radians((h % 12) * 30 + m * .5)
    s.append(f'<line x1="{f(cx)}" y1="{f(cy)}" x2="{f(cx + lh * math.sin(ah))}" y2="{f(cy - lh * math.cos(ah))}" '
             f'stroke="{INK}" stroke-width="{f(max(3.5, r * .09))}" stroke-linecap="round"/>')
    s.append(f'<line x1="{f(cx)}" y1="{f(cy)}" x2="{f(cx + lm * math.sin(am))}" y2="{f(cy - lm * math.cos(am))}" '
             f'stroke="#1F6FA8" stroke-width="{f(max(2.2, r * .05))}" stroke-linecap="round"/>')
    s.append(f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(max(3, r * .075))}" fill="{INK}"/>')
    return '\n'.join(s)


WEEKDAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật']


def calendar(x, y, w, title, first_col, days, head='#3FA7DC', paper='#FFFFFF', sun='#1C8FD0', cell_h=34):
    """Tờ lịch tháng: gáy lò xo, tên tháng, hàng thứ, lưới ngày (Chủ nhật màu xanh)."""
    rows = math.ceil((first_col + days) / 7)
    top_h, wd_h = 50, 30
    H = top_h + wd_h + rows * cell_h + 16
    cw = (w - 24) / 7
    s = [f'<rect x="{f(x + 4)}" y="{f(y + 6)}" width="{f(w)}" height="{f(H)}" rx="12" fill="#000" opacity=".08"/>',
         f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(H)}" rx="12" fill="{paper}" {st(2.6)}/>',
         f'<path d="M{f(x)},{f(y + top_h)} L{f(x)},{f(y + 12)} Q{f(x)},{f(y)} {f(x + 12)},{f(y)} L{f(x + w - 12)},{f(y)} '
         f'Q{f(x + w)},{f(y)} {f(x + w)},{f(y + 12)} L{f(x + w)},{f(y + top_h)} Z" fill="{head}" {st(2.6)}/>']
    # lò xo
    n = 9
    for i in range(n):
        rx = x + 22 + i * (w - 44) / (n - 1)
        s.append(f'<rect x="{f(rx - 4)}" y="{f(y - 12)}" width="8" height="22" rx="4" fill="{GREY_L}" {st(2)}/>')
    s.append(text(f(x + w / 2), f(y + top_h - 13), title, size=24, weight=700, fill=WHITE))
    for i, wd in enumerate(WEEKDAYS):
        cx = x + 12 + cw * (i + .5)
        col = sun if i == 6 else INK
        s.append(f'<rect x="{f(cx - cw / 2 + 2)}" y="{f(y + top_h + 4)}" width="{f(cw - 4)}" height="{wd_h - 6}" rx="6" fill="#EAF6FD"/>')
        s.append(text(f(cx), f(y + top_h + wd_h - 8), wd, size=11.5, weight=700, fill=col))
    for d in range(1, days + 1):
        k = first_col + d - 1
        r, c = divmod(k, 7)
        cx = x + 12 + cw * (c + .5)
        cy = y + top_h + wd_h + r * cell_h + cell_h * .7
        s.append(text(f(cx), f(cy), d, size=19, weight=700, fill=sun if c == 6 else INK))
    return '\n'.join(s), H


def label(x, y, s, size=20, weight=600, fill=INK, anchor='middle'):
    return text(f(x), f(y), s, size=size, weight=weight, fill=fill, anchor=anchor)
