"""
Bộ đồ nghề nhóm g7 (Bài 56, 58, 59–62 Vở BT Toán 2): tờ tiền cách điệu, mũi tên đo,
khối hộp, xe tải, hình con vật đơn giản.

Tờ tiền: KHÔNG chép hoa văn tiền thật (chân dung, quốc huy). Chỉ giữ mệnh giá:
số to ở góc, số nhỏ ở hai góc trên (để đếm được cả tờ chỉ lộ mép trên), chữ
"… ĐỒNG" ở giữa, hoa trang trí riêng bên trái.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

# mệnh giá -> (nền nhạt, dải giữa, màu đậm, chữ số)
NOTE_STYLE = {
    100: ('#DDF2D2', '#B7E0A6', '#3E8A4C', ['MỘT TRĂM', 'ĐỒNG']),
    200: ('#FCE6CF', '#F6C99A', '#B0612A', ['HAI TRĂM', 'ĐỒNG']),
    500: ('#FBDDE6', '#F4B3C8', '#B23A63', ['NĂM TRĂM', 'ĐỒNG']),
    1000: ('#E6E0FA', '#C9BDF3', '#5B47A8', ['MỘT NGHÌN', 'ĐỒNG']),
}


def f(v):
    return f'{v:.1f}'


def banknote(x, y, w, h, value):
    """tờ tiền cách điệu, góc trên trái tại x,y"""
    light, mid, dark, words = NOTE_STYLE[value]
    s = []
    k = h / 100
    s.append(f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" rx="{f(5 * k)}" fill="{light}" stroke="{INK}" stroke-width="{f(max(1.6, 2.4 * k))}"/>')
    # dải trên
    s.append(f'<rect x="{f(x + 5 * k)}" y="{f(y + 5 * k)}" width="{f(w - 10 * k)}" height="{f(17 * k)}" rx="{f(3 * k)}" fill="{mid}"/>')
    # đường sóng trang trí trong dải trên (giữa hai số)
    wx0, wx1, wy = x + w * 0.27, x + w * 0.73, y + 13.5 * k
    n = 8
    d = f'M{f(wx0)},{f(wy)}'
    step = (wx1 - wx0) / n
    for i in range(n):
        d += f' q{f(step / 2)},{f((-4 if i % 2 == 0 else 4) * k)} {f(step)},0'
    s.append(f'<path d="{d}" fill="none" stroke="{dark}" stroke-width="{f(1.4 * k)}" opacity=".7"/>')
    # khung trong
    s.append(f'<rect x="{f(x + 5 * k)}" y="{f(y + 25 * k)}" width="{f(w - 10 * k)}" height="{f(h - 30 * k)}" rx="{f(3 * k)}" fill="none" stroke="{dark}" stroke-width="{f(1.2 * k)}" stroke-dasharray="{f(4 * k)} {f(3 * k)}" opacity=".6"/>')
    # số nhỏ hai góc trên
    ts = 15 * k
    s.append(text(f(x + 9 * k), f(y + 19 * k), str(value), size=f(ts), weight=700, fill=dark, anchor='start'))
    s.append(text(f(x + w - 9 * k), f(y + 19 * k), str(value), size=f(ts), weight=700, fill=dark, anchor='end'))
    # hoa trang trí bên trái (hoa riêng, 8 cánh tròn)
    cx, cy, r = x + w * 0.2, y + h * 0.58, 17 * k
    s.append(f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r + 5 * k)}" fill="{WHITE}" stroke="{dark}" stroke-width="{f(1.4 * k)}"/>')
    for i in range(8):
        a = i * math.pi / 4
        s.append(f'<ellipse cx="{f(cx + r * 0.55 * math.cos(a))}" cy="{f(cy + r * 0.55 * math.sin(a))}" rx="{f(r * 0.42)}" ry="{f(r * 0.24)}" '
                 f'transform="rotate({i * 45} {f(cx + r * 0.55 * math.cos(a))} {f(cy + r * 0.55 * math.sin(a))})" fill="{mid}" stroke="{dark}" stroke-width="{f(1 * k)}"/>')
    s.append(f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r * 0.28)}" fill="{YELLOW}" stroke="{dark}" stroke-width="{f(1 * k)}"/>')
    # chữ mệnh giá ở giữa
    tx = x + w * 0.56
    s.append(text(f(tx), f(y + 50 * k), words[0], size=f(15 * k), weight=700, fill=dark))
    s.append(text(f(tx), f(y + 66 * k), words[1], size=f(13 * k), weight=700, fill=dark))
    # số to góc dưới phải
    s.append(text(f(x + w - 10 * k), f(y + h - 9 * k), str(value), size=f(26 * k), weight=700, fill=dark, anchor='end'))
    return '\n'.join(s)


def arrow_head(x, y, ang, size=10, color=INK):
    """đầu mũi tên tại x,y hướng góc ang (radian)"""
    a1, a2 = ang + math.pi * 0.85, ang - math.pi * 0.85
    return (f'<path d="M{f(x + size * math.cos(a1))},{f(y + size * math.sin(a1))} L{f(x)},{f(y)} '
            f'L{f(x + size * math.cos(a2))},{f(y + size * math.sin(a2))}" fill="none" stroke="{color}" '
            f'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>')


def arrow(x0, y0, x1, y1, color=INK, w=2.4, size=10, both=False):
    ang = math.atan2(y1 - y0, x1 - x0)
    s = [f'<line x1="{f(x0)}" y1="{f(y0)}" x2="{f(x1)}" y2="{f(y1)}" stroke="{color}" stroke-width="{w}" stroke-linecap="round"/>',
         arrow_head(x1, y1, ang, size, color)]
    if both:
        s.append(arrow_head(x0, y0, ang + math.pi, size, color))
    return '\n'.join(s)


def dim(x0, x1, y, label, size=22, ly=None, color=INK):
    """mũi tên đo hai đầu nằm ngang, nhãn ở trên (ly = y của chữ)"""
    s = [arrow(x0, y, x1, y, color=color, both=True, size=9)]
    s.append(text(f((x0 + x1) / 2), f(ly if ly is not None else y - 8), label, size=size, weight=600, fill=color))
    return '\n'.join(s)


def cuboid(x, y, w, h, depth, fill='#FFD9A0', side='#F2B46A', top='#FFE9C6'):
    """khối hộp chữ nhật: mặt trước góc trên trái x,y rộng w cao h, chiều sâu depth (lệch lên phải)"""
    dx, dy = depth, -depth * 0.6
    st = f'stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"'
    s = [f'<path d="M{f(x)},{f(y)} L{f(x + dx)},{f(y + dy)} L{f(x + w + dx)},{f(y + dy)} L{f(x + w)},{f(y)} Z" fill="{top}" {st}/>',
         f'<path d="M{f(x + w)},{f(y)} L{f(x + w + dx)},{f(y + dy)} L{f(x + w + dx)},{f(y + h + dy)} L{f(x + w)},{f(y + h)} Z" fill="{side}" {st}/>',
         f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" fill="{fill}" {st}/>']
    # băng keo dán thùng (trang trí, không đếm)
    s.append(f'<rect x="{f(x + w / 2 - 6)}" y="{f(y)}" width="12" height="{f(h)}" fill="#E9A85A" opacity=".55"/>')
    return '\n'.join(s)


def wheel(cx, cy, r=15):
    return (f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{r}" fill="#4B4F58" stroke="{INK}" stroke-width="2.6"/>'
            f'<circle cx="{f(cx)}" cy="{f(cy)}" r="{f(r * 0.45)}" fill="{GREY_L}" stroke="{INK}" stroke-width="1.8"/>')


def truck(x0, x1, y_bed, cab_side='right', cab_w=62, body=ORANGE, bed='#C9D2DC'):
    """xe tải: thùng phẳng từ x0 đến x1 (mặt thùng ở y_bed), cabin ở một đầu.
    Trả về chuỗi SVG. Bánh xe ở y_bed + 26."""
    st = f'stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"'
    s = []
    wy = y_bed + 28
    if cab_side == 'right':
        cx0, cx1 = x1 + 4, x1 + 4 + cab_w
    else:
        cx0, cx1 = x0 - 4 - cab_w, x0 - 4
    # khung gầm
    s.append(f'<rect x="{f(min(x0, cx0))}" y="{f(y_bed + 10)}" width="{f(max(x1, cx1) - min(x0, cx0))}" height="10" rx="3" fill="#8A929C" {st}/>')
    # sàn thùng
    s.append(f'<rect x="{f(x0)}" y="{f(y_bed)}" width="{f(x1 - x0)}" height="12" rx="2" fill="{bed}" {st}/>')
    # cabin
    top = y_bed - 50
    if cab_side == 'right':
        d = (f'M{f(cx0)},{f(y_bed + 20)} L{f(cx0)},{f(top)} L{f(cx1 - 22)},{f(top)} '
             f'Q{f(cx1 - 10)},{f(top)} {f(cx1 - 6)},{f(top + 18)} L{f(cx1)},{f(top + 30)} L{f(cx1)},{f(y_bed + 20)} Z')
        win = (f'M{f(cx0 + 12)},{f(top + 8)} L{f(cx1 - 22)},{f(top + 8)} Q{f(cx1 - 14)},{f(top + 8)} '
               f'{f(cx1 - 11)},{f(top + 26)} L{f(cx0 + 12)},{f(top + 26)} Z')
    else:
        d = (f'M{f(cx1)},{f(y_bed + 20)} L{f(cx1)},{f(top)} L{f(cx0 + 22)},{f(top)} '
             f'Q{f(cx0 + 10)},{f(top)} {f(cx0 + 6)},{f(top + 18)} L{f(cx0)},{f(top + 30)} L{f(cx0)},{f(y_bed + 20)} Z')
        win = (f'M{f(cx1 - 12)},{f(top + 8)} L{f(cx0 + 22)},{f(top + 8)} Q{f(cx0 + 14)},{f(top + 8)} '
               f'{f(cx0 + 11)},{f(top + 26)} L{f(cx1 - 12)},{f(top + 26)} Z')
    s.append(f'<path d="{d}" fill="{body}" {st}/>')
    s.append(f'<path d="{win}" fill="{SKY}" stroke="{INK}" stroke-width="2"/>')
    hx = cx0 + 8 if cab_side == 'right' else cx1 - 18
    s.append(f'<rect x="{f(hx)}" y="{f(top + 34)}" width="10" height="4" rx="2" fill="{INK}"/>')
    lx = cx1 - 5 if cab_side == 'right' else cx0 - 1
    s.append(f'<rect x="{f(lx)}" y="{f(y_bed + 2)}" width="6" height="8" rx="2" fill="{YELLOW}" stroke="{INK}" stroke-width="1.6"/>')
    # bánh: một dưới cabin, một dưới đuôi thùng
    cab_wx = (cx0 + cx1) / 2
    tail_wx = x0 + 32 if cab_side == 'right' else x1 - 32
    for wx in (cab_wx, tail_wx):
        s.append(wheel(wx, wy))
    return '\n'.join(s)


def frame(w, h, color='#29A9E0'):
    return f'<rect x="4" y="4" width="{w - 8}" height="{h - 8}" rx="26" fill="{WHITE}" stroke="{color}" stroke-width="3.5"/>'


STK = f'stroke="{INK}" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"'


def leg(x, y0, y1, w, fill, hoof=None):
    s = f'<rect x="{x - w / 2}" y="{y0}" width="{w}" height="{y1 - y0}" rx="{w / 2 - 1}" fill="{fill}" {STK}/>'
    if hoof:
        s += f'<rect x="{x - w / 2}" y="{y1 - 10}" width="{w}" height="10" rx="3" fill="{hoof}" {STK}/>'
    return s


def cute_eye(x, y, r=5):
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="{INK}"/>'
            f'<circle cx="{x + r * 0.35}" cy="{y - r * 0.35}" r="{r * 0.35}" fill="{WHITE}"/>')
