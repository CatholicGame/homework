"""SGK Toán 4, bài 18–28 (trang 23–37): đồng hồ, biểu đồ tranh, biểu đồ cột (vẽ lại bằng nét riêng)."""
import math
from kit_g4t import *


def rect(x, y, w, h, fill='none', sw=2.5, color=INK, rx=0, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" stroke="{color}" stroke-width="{sw}"{d}/>'


def circle(cx, cy, r, fill='none', sw=2.5, color=INK):
    return f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="{fill}" stroke="{color}" stroke-width="{sw}"/>'


def path(d, fill='none', sw=2.5, color=INK):
    return f'<path d="{d}" fill="{fill}" stroke="{color}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round"/>'


# ── Đồng hồ (bài 21 câu 5a): 8 giờ 40 phút. Kim dừng trước vòng số, không che số nào. ────────────
def clock(cx, cy, r, h, m):
    s = [circle(cx, cy, r, fill=BLUE, sw=3), circle(cx, cy, r * .86, fill='#F4FBFF', sw=2)]
    for i in range(60):
        a = math.radians(i * 6)
        r1 = r * (.76 if i % 5 == 0 else .80)
        r2 = r * .86
        s.append(line((cx + r1 * math.sin(a), cy - r1 * math.cos(a)), (cx + r2 * math.sin(a), cy - r2 * math.cos(a)),
                      w=2 if i % 5 == 0 else 1, cap='butt'))
    fs = r * .22
    for n in range(1, 13):
        a = math.radians(n * 30)
        rr = r * .62
        s.append(text(round(cx + rr * math.sin(a), 1), round(cy - rr * math.cos(a) + fs * .36, 1), n, size=round(fs, 1), weight=700))
    am = math.radians(m * 6)
    ah = math.radians((h % 12) * 30 + m * .5)
    s.append(line((cx, cy), (cx + r * .30 * math.sin(ah), cy - r * .30 * math.cos(ah)), w=r * .07))
    s.append(line((cx, cy), (cx + r * .45 * math.sin(am), cy - r * .45 * math.cos(am)), w=r * .04, color=RED))
    s.append(dot((cx, cy), r=r * .06))
    return s


# Như sách: a) các lựa chọn bên trái đồng hồ, b) bên phải.
ck = clock(420, 150, 135, 8, 40)
ck.append(text(20, 40, 'a) Đồng hồ chỉ:', size=24, weight=700, anchor='start'))
for i, s_ in enumerate(['A. 9 giờ 8 phút', 'B. 8 giờ 40 phút', 'C. 8 giờ 45 phút', 'D. 9 giờ 40 phút']):
    ck.append(text(40, 95 + i * 52, s_, size=24, weight=600, anchor='start'))
ck.append(text(610, 40, 'b) 5kg 8g = ?', size=24, weight=700, anchor='start'))
for i, s_ in enumerate(['A. 58g', 'B. 508g', 'C. 5008g', 'D. 580g']):
    ck.append(text(630, 95 + i * 52, s_, size=24, weight=600, anchor='start'))
out('bai21_q5_dongho', 800, 300, ck)


# ── Biểu đồ tranh: khung bảng ────────────────────────────────────────────────────────────────────
def titled(parts, w, title, dy=42):
    """Tên biểu đồ ở trên, bảng dời xuống dy."""
    return [text(w / 2, 28, title, size=18, weight=700), f'<g transform="translate(0,{dy})">'] + parts + ['</g>']


def table_frame(x, y, col_w, row_h, names, ncols, name_w):
    p = [rect(x, y, name_w + col_w * ncols, row_h * len(names), fill=WHITE, sw=2.5)]
    for j, nm in enumerate(names):
        yy = y + row_h * j
        if j:
            p.append(line((x, yy), (x + name_w + col_w * ncols, yy), w=2, cap='butt'))
        p.append(text(x + name_w / 2, yy + row_h / 2 + 7, nm, size=20, weight=600))
    p.append(line((x + name_w, y), (x + name_w, y + row_h * len(names)), w=2, cap='butt'))
    return p


# Bài 24 câu 1: các môn thể thao khối lớp Bốn (cột: bơi, nhảy dây, cờ vua, đá cầu).
def ico_swim(cx, cy):
    p = []
    for k in range(3):
        yy = cy + 8 + k * 12
        p.append(path(f'M{cx - 50},{yy} q12,-9 25,0 t25,0 t25,0 t25,0', color=ACC, sw=3))
    p.append(circle(cx - 14, cy - 6, 13, fill=SKIN_C, sw=2.5))
    p.append(path(f'M{cx - 2},{cy - 4} q20,-22 40,-6', sw=4, color=INK))
    p.append(text(cx, cy + 56, 'bơi', size=18, weight=700, fill=ACC))
    return p


def ico_rope(cx, cy):
    p = [circle(cx, cy - 22, 10, fill=SKIN_C, sw=2.5),
         line((cx, cy - 12), (cx, cy + 10), w=3),
         line((cx, cy + 10), (cx - 9, cy + 26), w=3), line((cx, cy + 10), (cx + 9, cy + 26), w=3),
         line((cx, cy - 6), (cx - 16, cy + 2), w=3), line((cx, cy - 6), (cx + 16, cy + 2), w=3),
         path(f'M{cx - 16},{cy + 2} C{cx - 36},{cy + 40} {cx + 36},{cy + 40} {cx + 16},{cy + 2}', color=RED, sw=2.5),
         text(cx, cy + 56, 'nhảy dây', size=18, weight=700, fill=ACC)]
    return p


def ico_chess(cx, cy):
    p = []
    s = 11
    x0, y0 = cx - 2 * s, cy - 2 * s - 8
    for i in range(4):
        for j in range(4):
            p.append(f'<rect x="{x0 + i * s}" y="{y0 + j * s}" width="{s}" height="{s}" fill="{INK if (i + j) % 2 else WHITE}"/>')
    p.append(rect(x0, y0, 4 * s, 4 * s, sw=2.5))
    p.append(path(f'M{cx + 28},{cy + 8} h20 l-4,-6 h-12 z M{cx + 38},{cy - 10} v8', fill=YELLOW, sw=2))
    p.append(circle(cx + 38, cy - 14, 6, fill=YELLOW, sw=2))
    p.append(text(cx, cy + 56, 'cờ vua', size=18, weight=700, fill=ACC))
    return p


def ico_shuttle(cx, cy):
    p = []
    for dx in (-14, -5, 5, 14):
        p.append(line((cx, cy + 10), (cx + dx * 1.3, cy - 26), w=2.5, color=INK))
    p.append(path(f'M{cx - 19},{cy - 26} q19,-10 38,0', fill=WHITE, sw=2.5))
    p.append(f'<ellipse cx="{cx}" cy="{cy + 14}" rx="10" ry="7" fill="{RED}" stroke="{INK}" stroke-width="2.5"/>')
    p.append(text(cx, cy + 56, 'đá cầu', size=18, weight=700, fill=ACC))
    return p


SKIN_C = '#FFD9B8'
X0, Y0, NW, CW, RH = 10, 10, 90, 165, 115
sports = table_frame(X0, Y0, CW, RH, ['4A', '4B', '4C'], 4, NW)
icons = [ico_swim, ico_rope, ico_chess, ico_shuttle]
grid_sp = [[1, 1, 1, 0], [0, 1, 0, 1], [1, 0, 0, 1]]
for c in range(1, 4):
    sports.append(line((X0 + NW + CW * c, Y0), (X0 + NW + CW * c, Y0 + RH * 3), w=2, cap='butt'))
for r, row in enumerate(grid_sp):
    for c, on in enumerate(row):
        if on:
            sports += icons[c](X0 + NW + CW * c + CW / 2, Y0 + RH * r + RH / 2 - 16)
out('bai24_q1_thethao', 2 * X0 + NW + CW * 4, 2 * Y0 + RH * 3 + 42, titled(sports, 2 * X0 + NW + CW * 4, 'CÁC MÔN THỂ THAO KHỐI LỚP BỐN THAM GIA'))


# Bài 24 câu 2: số thóc (mỗi bao 10 tạ): 2000: 4 bao, 2001: 3 bao, 2002: 5 bao.
def sack(cx, cy, k=1.0):
    w, h = 44 * k, 54 * k
    return [path(f'M{cx - w / 2 + 4},{cy - h / 2 + 10} q-8,{h * .45:.1f} 0,{h - 10:.1f} h{w - 8:.1f} q8,-{h * .55:.1f} 0,-{h - 10:.1f} z', fill=CREAM, sw=2.5),
            path(f'M{cx - 10 * k},{cy - h / 2 + 10} q10,-12 20,0', fill='#F5E6C4', sw=2.5),
            line((cx - 12 * k, cy - h / 2 + 10), (cx + 12 * k, cy - h / 2 + 10), w=3, color=BROWN),
            line((cx - w / 2 + 6, cy + 2), (cx + w / 2 - 6, cy + 2), w=1.8, color=BROWN),
            line((cx - w / 2 + 5, cy + 12), (cx + w / 2 - 5, cy + 12), w=1.8, color=BROWN)]


NW2, CW2, RH2 = 130, 85, 78
rice = table_frame(X0, Y0, CW2, RH2, ['Năm 2000', 'Năm 2001', 'Năm 2002'], 5, NW2)
for r, n in enumerate([4, 3, 5]):
    for c in range(n):
        rice += sack(X0 + NW2 + CW2 * c + CW2 / 2, Y0 + RH2 * r + RH2 / 2)
lx, ly = X0 + NW2 + CW2 * 5 + 30, Y0 + RH2 * 1.5
rice.append(text(lx, ly - 40, 'Chú ý: Mỗi', size=21, anchor='start', weight=600))
rice += sack(lx + 30, ly + 4, 0.9)
rice.append(text(lx, ly + 58, 'chỉ 10 tạ thóc.', size=21, anchor='start', weight=600))
out('bai24_q2_thoc', X0 + NW2 + CW2 * 5 + 200, Y0 * 2 + RH2 * 3 + 42, titled(rice, X0 + NW2 + CW2 * 5 + 200, 'SỐ THÓC GIA ĐÌNH BÁC HÀ ĐÃ THU HOẠCH'))


# Bài 26 câu 1: vải hoa (xanh, chấm hoa) và vải trắng, mỗi cuộn 100m.
def roll(cx, cy, flower, k=1.0):
    w, h = 54 * k, 46 * k
    x, y = cx - w / 2, cy - h / 2
    fill = BLUE if flower else WHITE
    p = [path(f'M{x},{y + 6} q{w * .3:.1f},-8 {w * .6:.1f},0 t{w * .4:.1f},-4 v{h - 4:.1f} q-{w * .3:.1f},8 -{w * .6:.1f},0 t-{w * .4:.1f},4 z', fill=fill, sw=2.5, color=ACC if not flower else INK),
         circle(x + w - 3, y + 3, 7 * k, fill=fill, sw=2.2, color=ACC if not flower else INK)]
    if flower:
        for i in range(4):
            for j in range(3):
                p.append(dot((x + 8 + i * (w - 16) / 3, y + 14 + j * (h - 20) / 2), r=2.4 * k, color=WHITE))
    return p


NW3, CW3, RH3 = 100, 120, 72
cloth = table_frame(X0, Y0, CW3, RH3, ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'], 4, NW3)
weeks = [[1, 1, 0], [1, 1, 1], [1, 0, 0, 0], [1, 0]]
for r, row in enumerate(weeks):
    for c, fl in enumerate(row):
        cloth += roll(X0 + NW3 + CW3 * c + CW3 / 2, Y0 + RH3 * r + RH3 / 2, fl)
lx = X0 + NW3 + CW3 * 4 + 30
for k, (fl, s) in enumerate([(1, 'chỉ 100m vải hoa.'), (0, 'chỉ 100m vải trắng.')]):
    yy = Y0 + 60 + k * 150
    cloth.append(text(lx, yy + 8, 'Mỗi', size=21, anchor='start', weight=600))
    cloth += roll(lx + 85, yy, fl, 0.9)
    cloth.append(text(lx, yy + 62, s, size=21, anchor='start', weight=600))
out('bai26_q1_vai', lx + 210, Y0 * 2 + RH3 * 4 + 42, titled(cloth, lx + 210, 'SỐ VẢI HOA VÀ VẢI TRẮNG ĐÃ BÁN TRONG THÁNG 9'))


# ── Biểu đồ cột ───────────────────────────────────────────────────────────────────────────────────
def chart(name, values, names, vmax, step, unit_y, unit_x, title, W=720, H=300, ticks=None, show=True, top=80, left=90, title2=None, close=None):
    """close: {giá trị: dịch chữ (px)} cho các vạch sát nhau (20 và 21): vạch vẽ đúng chỗ, chữ số tách ra cho dễ đọc."""
    p = []
    if close:
        ticks = [t for t in ticks if t not in close]
        for v, dy in close.items():
            yy = top + H - v / vmax * H
            p.append(line((left, yy), (left + W - left - 90, yy), w=1.2, color='#C9D6E3', cap='butt'))
            p.append(text(left - 10, round(yy + 6 + dy, 1), str(v), size=16, anchor='end'))
    if title2:
        p.append(text(left + (W - left - 90) / 2, top - 52, title, size=18, weight=700))
        p.append(text(left + (W - left - 90) / 2, top - 28, title2, size=18, weight=700))
        title = None
    p += bar_chart(left, top, W - left - 90, H, values, names, vmax, step, unit_y=unit_y, unit_x=unit_x,
                   show_values=show, ticks=ticks, title=title)
    return p


# Bài 25 câu 1: số cây: 4A 35, 4B 28, 5A 45, 5B 40, 5C 23.
out('bai25_q1_cay', 560, 360, chart('', [35, 28, 45, 40, 23], ['4A', '4B', '5A', '5B', '5C'], 54, 5, '(Cây)', '(Lớp)',
                                     'SỐ CÂY CỦA KHỐI LỚP BỐN', W=560, H=220, top=95, ticks=list(range(0, 51, 5)), title2='VÀ KHỐI LỚP NĂM ĐÃ TRỒNG'))

# Bài 25 câu 2: số lớp Một: 4, 3, 6, 4. Sách: chỉ ghi số 3, các chỗ khác để chấm cho em viết tiếp.
p = chart('', [4, 3, 6, 4], ['2001 – 2002', '', '2003 – 2004', ''], 7, 1, '(Số lớp)', '(Năm học)',
          'SỐ LỚP MỘT CỦA TRƯỜNG TIỂU HỌC HOÀ BÌNH', W=620, H=220, show=False, top=80, left=80, ticks=list(range(7)))
slot = (620 - 80 - 90) / 4
for i, v in enumerate([4, 3, 6, 4]):
    cx = 80 + slot * (i + .5)
    ty = 80 + 220 - v / 7 * 220 - 10
    if i == 1:
        p.append(text(cx, ty, '3', size=18, weight=700))
    else:
        p.append(rect(cx - 20, ty - 24, 40, 28, fill=WHITE, sw=2, color=ACC, rx=5, dash='5 4'))
for i in (1, 3):
    cx = 80 + slot * (i + .5)
    p.append(rect(cx - 52, 80 + 220 + 8, 104, 28, fill=WHITE, sw=2, color=ACC, rx=5, dash='5 4'))
out('bai25_q2_lopmot', 620, 360, p)

# Bài 26 câu 2: số ngày có mưa: tháng 7: 18, tháng 8: 15, tháng 9: 3 (sách không ghi số trên cột).
out('bai26_q2_mua', 560, 340, chart('', [18, 15, 3], ['Tháng 7', 'Tháng 8', 'Tháng 9'], 23, 3, '(Ngày)', '(Tháng)',
                                     'SỐ NGÀY CÓ MƯA TRONG BA THÁNG CỦA NĂM 2004', W=560, H=210, show=False, top=80, left=80, ticks=list(range(0, 22, 3))))

# Bài 26 câu 3: số cá: tháng 1 đã vẽ 5 tấn; tháng 2, tháng 3 em vẽ tiếp (để trống).
out('bai26_q3_ca', 560, 360, chart('', [5, None, None], ['Tháng 1', 'Tháng 2', 'Tháng 3'], 10, 1, '(Tấn)', '(Tháng)',
                                    'SỐ CÁ TÀU THẮNG LỢI ĐÃ ĐÁNH BẮT ĐƯỢC', W=560, H=230, show=False, top=80, left=80, ticks=list(range(10))))

# Bài 27 câu 3: học sinh giỏi toán: 3A 18, 3B 27, 3C 21 (trục có các vạch 18, 21, 27).
out('bai27_q3_hsg', 580, 470, chart('', [18, 27, 21], ['3A', '3B', '3C'], 32, 5, '(Học sinh)', '(Lớp)',
                                     'SỐ HỌC SINH GIỎI TOÁN KHỐI LỚP BA', W=580, H=320, show=False, top=105, left=100,
                                     ticks=[0, 5, 10, 15, 18, 20, 21, 25, 27, 30], close={20: 3, 21: -6},
                                     title2='TRƯỜNG TIỂU HỌC LÊ QUÝ ĐÔN NĂM HỌC 2004 – 2005'))

# Bài 28 câu 2: số quyển sách: Hiến 33, Hoà 40, Trung 22, Thục 25 (trục có vạch 22, 33).
out('bai28_q2_sach', 600, 390, chart('', [33, 40, 22, 25], ['Hiến', 'Hoà', 'Trung', 'Thục'], 42, 5, '(Quyển sách)', '(Tên)',
                                      None, W=600, H=290, show=False, top=50, left=130,
                                      ticks=[0, 5, 10, 15, 20, 22, 25, 30, 33, 35, 40], close={20: 3, 22: -3, 33: 3, 35: -3}))
