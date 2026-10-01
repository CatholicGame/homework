"""
Vở BT Toán 3 Tập hai, Bài 47 — đồng hồ số La Mã (Tiết 1 Q1) và đồng hồ mặt trời (Tiết 2 Q3).
Nét riêng; giữ nội dung toán: vị trí kim / bóng, các số La Mã trên mặt.
  Tiết 1 Q1: 3 giờ (mẫu), 8 giờ 30 phút, 12 giờ, 5 giờ 15 phút.
  Tiết 2 Q3: bóng chỉ VIII (A, mặt trời thấp bên trái), XII (B), III (C), không bóng (D, trăng).
Kim dừng trước vòng số, không che số nào.
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

ROMAN = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
RIM, RIM_D, FACE = '#4FB3E8', '#2E8FC8', '#EEF8FE'
F = 'grade3-workbook-2'


def st(w=3):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def roman_clock(name, h, m):
    W = H = 220
    cx = cy = 110
    r = 100
    s = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{RIM}" {st()}/>',
         f'<circle cx="{cx}" cy="{cy}" r="{r * .86}" fill="{FACE}" stroke="{RIM_D}" stroke-width="2.5"/>']
    for i in range(60):
        a = math.radians(i * 6)
        r1 = r * (.76 if i % 5 == 0 else .8)
        r2 = r * .85
        s.append(f'<line x1="{cx + r1 * math.sin(a):.1f}" y1="{cy - r1 * math.cos(a):.1f}" x2="{cx + r2 * math.sin(a):.1f}" '
                 f'y2="{cy - r2 * math.cos(a):.1f}" stroke="{INK}" stroke-width="{2 if i % 5 == 0 else .9}"/>')
    for n in range(12):
        a = math.radians(n * 30)
        rr = r * .6
        lab = ROMAN[n]
        fs = 19 if len(lab) <= 2 else 16 if len(lab) == 3 else 14
        s.append(text(f'{cx + rr * math.sin(a):.1f}', f'{cy - rr * math.cos(a) + fs * .36:.1f}', lab, size=fs, weight=700))
    am = math.radians(m * 6)
    ah = math.radians((h % 12) * 30 + m * .5)
    # kim ngắn / kim dài: dừng trước vòng số (số đặt ở bán kính .6r)
    s.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .3 * math.sin(ah):.1f}" y2="{cy - r * .3 * math.cos(ah):.1f}" '
             f'stroke="{INK}" stroke-width="8" stroke-linecap="round"/>')
    s.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .44 * math.sin(am):.1f}" y2="{cy - r * .44 * math.cos(am):.1f}" '
             f'stroke="{RED}" stroke-width="5" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="7" fill="{INK}"/>')
    save(name, W, H, s, folder=F)


def sun(x, y, r=26):
    s = [f'<circle cx="{x}" cy="{y}" r="{r}" fill="{YELLOW}" {st(2.6)}/>']
    for i in range(10):
        a = math.radians(i * 36)
        s.append(f'<line x1="{x + (r + 7) * math.cos(a):.1f}" y1="{y + (r + 7) * math.sin(a):.1f}" '
                 f'x2="{x + (r + 17) * math.cos(a):.1f}" y2="{y + (r + 17) * math.sin(a):.1f}" stroke="{ORANGE}" stroke-width="4" stroke-linecap="round"/>')
    return '\n'.join(s)


def moon(x, y, r=24):
    return (f'<path d="M{x},{y - r} A{r},{r} 0 1 0 {x + r * .9},{y + r * .45} A{r * .8},{r * .8} 0 1 1 {x},{y - r} Z" '
            f'fill="#FFE9A8" {st(2.6)}/>'
            f'<circle cx="{x + 60}" cy="{y + 30}" r="3" fill="#FFF6D0"/><circle cx="{x + 110}" cy="{y - 4}" r="2.5" fill="#FFF6D0"/>')


# Vòng số của đồng hồ mặt trời, đọc theo sách: từ trên bên trái vòng xuống dưới rồi lên bên phải.
DIAL = ['VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']


def sundial(name, shadow, sky, sun_at=None, night=False):
    W, H = 300, 300
    cx, cy = 150, 196
    rx, ry = 128, 66        # mép ngoài vòng
    ix, iy = 96, 42         # mép trong (mặt đồng hồ)
    s = [f'<rect x="2" y="2" width="{W - 4}" height="{H - 4}" rx="18" fill="{sky}" {st(2.6)}/>']
    if night:
        s.append(moon(*sun_at))
    elif sun_at:
        s.append(sun(*sun_at))
    # chân đế + vòng số
    s.append(f'<ellipse cx="{cx}" cy="{cy + 12}" rx="{rx}" ry="{ry}" fill="{RIM_D}" {st(2.6)}/>')
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{RIM}" {st(2.6)}/>')
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{ix}" ry="{iy}" fill="{WHITE}" stroke="{RIM_D}" stroke-width="2.4"/>')
    # các số: góc toán học từ 160° (trên trái) vòng qua đáy (270°) tới 380° (trên phải)
    n = len(DIAL)
    pos = {}
    for k, lab in enumerate(DIAL):
        ang = math.radians(160 + k * (220 / (n - 1)))
        mx, my = (rx + ix) / 2, (ry + iy) / 2 + 1
        x, y = cx + mx * math.cos(ang), cy - my * math.sin(ang)
        pos[(lab, k)] = (ang, x, y)
        fs = 13 if len(lab) <= 2 else 11.5 if len(lab) == 3 else 10.5
        s.append(text(f'{x:.1f}', f'{y + fs * .36:.1f}', lab, size=fs, weight=700))
        # vạch trên mặt
        tx1, ty1 = cx + (ix - 12) * math.cos(ang), cy - (iy - 7) * math.sin(ang)
        tx2, ty2 = cx + (ix - 3) * math.cos(ang), cy - (iy - 2) * math.sin(ang)
        s.append(f'<line x1="{tx1:.1f}" y1="{ty1:.1f}" x2="{tx2:.1f}" y2="{ty2:.1f}" stroke="{INK}" stroke-width="1.8"/>')
    if shadow is not None:
        ang, _, _ = pos[shadow]
        ex, ey = cx + (ix - 14) * math.cos(ang), cy - (iy - 8) * math.sin(ang)
        s.append(f'<line x1="{cx}" y1="{cy}" x2="{ex:.1f}" y2="{ey:.1f}" stroke="#8A939C" stroke-width="7" stroke-linecap="round" opacity=".85"/>')
    # cọc
    s.append(f'<rect x="{cx - 5}" y="{cy - 80}" width="10" height="80" rx="4" fill="#6B6F76" {st(2)}/>')
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="8" ry="4" fill="{INK}"/>')
    save(name, W, H, s, folder=F)


if __name__ == '__main__':
    roman_clock('bai47_t1_q1_clock1', 3, 0)
    roman_clock('bai47_t1_q1_clock2', 8, 30)
    roman_clock('bai47_t1_q1_clock3', 12, 0)
    roman_clock('bai47_t1_q1_clock4', 5, 15)
    SKY_DAY = '#D6EFFB'
    sundial('bai47_t2_q3_sundialA', ('VIII', 13), SKY_DAY, sun_at=(46, 118))
    sundial('bai47_t2_q3_sundialB', ('XII', 5), SKY_DAY, sun_at=(214, 62))
    sundial('bai47_t2_q3_sundialC', ('III', 8), SKY_DAY, sun_at=(96, 52))
    sundial('bai47_t2_q3_sundialD', None, '#3D4F7A', sun_at=(70, 60), night=True)
