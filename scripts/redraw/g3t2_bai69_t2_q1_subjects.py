"""Vở BT Toán 3 Tập hai, Bài 69 Tiết 2 Q1 — Rô-bốt học các môn (nét riêng, rô-bốt của mình).
Giữ nội dung toán: a) buổi sáng: Âm nhạc (đàn) 9 giờ 40, Tiếng Anh ("Good morning") 10 giờ 20,
Toán (com-pa vẽ hình tròn) 8 giờ 40. b) buổi chiều: Toán (thước, ê-ke) 2 giờ 30,
Giáo dục thể chất (tập thể dục) 3 giờ 30, Tiếng Việt (sách "Tiếng Việt 3") 1 giờ 50."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
import kit_g3 as K
from g3t2_bai68_kit import clock, label, save, FOLDER, INK, WHITE, YELLOW, RED, BLUE, TEAL, CREAM, GREY_L, text

PW, PH, GAP = 250, 230, 24
CR = 58
W = 3 * PW + 2 * GAP + 40
BG = '#DDF1FB'


def panel(x, y, inner):
    return K.panel(x, y, PW, PH, BG, inner)


def desk(x, y, w):
    return (f'<path d="M{x},{y} L{x + w},{y} L{x + w - 20},{y + 26} L{x + 20},{y + 26} Z" fill="#F2D3A6" stroke="{INK}" stroke-width="2.5"/>')


def rb(x, y, s=0.62, **kw):
    return K.place(x, y, s, K.robot_bust(**kw))


def piano(x, y, w=150):
    o = [f'<rect x="{x}" y="{y}" width="{w}" height="60" rx="6" fill="#5A4A4F" stroke="{INK}" stroke-width="2.5"/>',
         f'<rect x="{x + 8}" y="{y + 26}" width="{w - 16}" height="28" fill="#fff" stroke="{INK}" stroke-width="1.8"/>']
    n = 9
    kw = (w - 16) / n
    for i in range(1, n):
        o.append(f'<line x1="{x + 8 + i * kw:.1f}" y1="{y + 26}" x2="{x + 8 + i * kw:.1f}" y2="{y + 54}" stroke="{INK}" stroke-width="1.4"/>')
    for i in (1, 2, 4, 5, 6, 8):
        o.append(f'<rect x="{x + 8 + i * kw - 4:.1f}" y="{y + 26}" width="8" height="16" fill="{INK}"/>')
    return ''.join(o)


def bubble(cx, cy, lines):
    return (f'<path d="M{cx - 62},{cy - 34} h124 a12,12 0 0 1 12,12 v44 a12,12 0 0 1 -12,12 h-80 l-18,20 l2,-20 h-28 a12,12 0 0 1 -12,-12 v-44 a12,12 0 0 1 12,-12 z" '
            f'fill="#fff" stroke="{INK}" stroke-width="2.5"/>'
            + text(cx, cy - 6, lines[0], size=20, weight=700) + text(cx, cy + 18, lines[1], size=20, weight=700))


def paper(x, y, w, h):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#fff" stroke="{INK}" stroke-width="2" transform="rotate(-6 {x} {y})"/>'


def compass(x, y):
    return (f'<g transform="translate({x},{y})"><path d="M0,-50 L-16,10 M0,-50 L16,10" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>'
            f'<circle cx="0" cy="-52" r="6" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>'
            f'<path d="M16,10 l3,8" stroke="{RED}" stroke-width="4" stroke-linecap="round"/></g>')


def book_tv(x, y):
    return (f'<g transform="translate({x},{y}) rotate(8)"><rect x="-38" y="-50" width="76" height="100" rx="5" fill="{YELLOW}" stroke="{INK}" stroke-width="2.6"/>'
            + text(0, -18, 'Tiếng', size=17, weight=700) + text(0, 2, 'Việt', size=17, weight=700)
            + text(0, 34, '3', size=24, weight=700, fill=RED) + '</g>')


parts = []
rows = [
    ('a)', [((9, 40), 'music'), ((10, 20), 'english'), ((8, 40), 'math_compass')]),
    ('b)', [((2, 30), 'math_ruler'), ((3, 30), 'pe'), ((1, 50), 'viet')]),
]
for r, (lab, items) in enumerate(rows):
    y0 = 10 + r * (PH + CR + 50)
    parts.append(label(4, y0 + 24, lab, 24, 700, anchor='start'))
    for i, ((h, m), kind) in enumerate(items):
        x = 40 + i * (PW + GAP)
        py = y0 + CR + 6
        inner = []
        if kind == 'music':
            inner += [piano(x + 90, py + 120, 150), rb(x + 70, py + PH + 10, arms=((60, -70), (95, -60)), expr='happy'),
                      K.note(x + 180, py + 60), K.note(x + 215, py + 90, .8)]
        elif kind == 'english':
            inner += [desk(x + 10, py + 176, 230), rb(x + 80, py + PH + 10, expr='open'), bubble(x + 165, py + 105, ['Good', 'morning'])]
        elif kind == 'math_compass':
            inner += [desk(x + 10, py + 170, 230), paper(x + 110, py + 150, 110, 40),
                      f'<ellipse cx="{x + 168}" cy="{py + 162}" rx="30" ry="9" fill="none" stroke="{INK}" stroke-width="1.8"/>',
                      rb(x + 70, py + PH + 10, arms=((150, -95), (70, -60)), expr='down'), compass(x + 170, py + 162)]
        elif kind == 'math_ruler':
            inner += [desk(x + 10, py + 170, 230), rb(x + 185, py + PH + 10, arms=((-110, -50), (-40, -50)), expr='down'),
                      paper(x + 18, py + 136, 120, 50),
                      f'<path d="M{x + 32},{py + 172} L{x + 110},{py + 164} L{x + 36},{py + 128} Z" fill="none" stroke="{INK}" stroke-width="2.4"/>',
                      f'<rect x="{x + 24}" y="{py + 180}" width="116" height="13" fill="{YELLOW}" stroke="{INK}" stroke-width="2" transform="rotate(-6 {x + 24} {py + 180})"/>']
        elif kind == 'pe':
            inner += [f'<rect x="{x}" y="{py + 190}" width="{PW}" height="60" fill="#BFE3F5"/>',
                      K.place(x + 125, py + 222, .6, K.robot(arms=((-80, -250), (80, -250)), legs='jump', expr='happy'))]
        elif kind == 'viet':
            inner += [desk(x + 10, py + 190, 230), rb(x + 80, py + PH + 10, arms=((120, -110), (40, -60)), expr='open'), book_tv(x + 180, py + 132)]
        parts.append(panel(x, py, ''.join(inner)))
        cx = x + (PW - CR - 8 if i != 1 or r == 1 else PW - CR - 8)
        parts.append(clock(x + PW - CR + 4, y0 + CR + 2, CR, h, m))
H = 10 + 2 * (PH + CR + 50) - 40
save('bai69_t2_q1_subjects', W, H, parts, folder=FOLDER)
