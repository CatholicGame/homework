"""
Vở BT Toán 3 Tập hai, Bài 47 — nét riêng.
  bai47_t1_q4_book: cuốn sách mở bị mất một tờ; trang trái ghi XI, trang phải ghi XIV
                    (mép giấy rách ở giữa cho thấy tờ bị mất).
  bai47_t2_q1_sticks: que tính xếp thành III, VI (trên) và X (dưới).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

F = 'grade3-workbook-2'


def st(w=2.8):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


# ── cuốn sách ──
W, H = 420, 270
s = [f'<path d="M14,60 Q110,34 206,58 L206,250 Q110,228 14,254 Z" fill="#8FCBEF" {st()}/>',
     f'<path d="M406,60 Q310,34 214,58 L214,250 Q310,228 406,254 Z" fill="#8FCBEF" {st()}/>',
     f'<path d="M26,48 Q116,26 206,50 L206,236 Q116,214 26,238 Z" fill="{WHITE}" {st()}/>',
     # trang phải có mép rách của tờ bị mất
     f'<path d="M394,48 Q304,26 214,50 L214,236 Q304,214 394,238 Z" fill="{WHITE}" {st()}/>',
     f'<path d="M222,50 l6,20 l-5,18 l7,22 l-6,20 l6,24 l-5,20 l7,22 l-5,22 l2,16" fill="none" {st(2.2)}/>',
     f'<line x1="210" y1="50" x2="210" y2="238" stroke="{INK}" stroke-width="2.4"/>']
# chuồn chuồn (trang trái)
s.append(f'<g transform="translate(116,120) rotate(-35)">'
         f'<ellipse cx="-30" cy="-12" rx="30" ry="9" fill="#DDF1FB" {st(2.2)}/><ellipse cx="30" cy="-12" rx="30" ry="9" fill="#DDF1FB" {st(2.2)}/>'
         f'<ellipse cx="-26" cy="6" rx="26" ry="8" fill="#DDF1FB" {st(2.2)}/><ellipse cx="26" cy="6" rx="26" ry="8" fill="#DDF1FB" {st(2.2)}/>'
         f'<rect x="-4" y="-24" width="8" height="78" rx="4" fill="{TEAL}" {st(2.2)}/><circle cx="0" cy="-26" r="8" fill="{TEAL}" {st(2.2)}/></g>')
# bướm (trang phải)
s.append(f'<g transform="translate(316,118)">'
         f'<path d="M0,0 C-20,-44 -64,-40 -52,-6 C-60,20 -30,36 0,6 Z" fill="{YELLOW}" {st(2.2)}/>'
         f'<path d="M0,0 C20,-44 64,-40 52,-6 C60,20 30,36 0,6 Z" fill="{YELLOW}" {st(2.2)}/>'
         f'<circle cx="-30" cy="-14" r="6" fill="{ORANGE}"/><circle cx="30" cy="-14" r="6" fill="{ORANGE}"/>'
         f'<rect x="-4" y="-20" width="8" height="40" rx="4" fill="{INK}"/>'
         f'<path d="M-2,-20 q-8,-14 -14,-16 M2,-20 q8,-14 14,-16" fill="none" {st(2)}/></g>')
s.append(text(52, 218, 'XI', size=24, weight=700))
s.append(text(362, 218, 'XIV', size=24, weight=700))
save('bai47_t1_q4_book', W, H, s, folder=F)

# ── que tính ──
W, H = 380, 250
STICK, HEAD = '#F2C57C', RED


def stick(x1, y1, x2, y2):
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{INK}" stroke-width="13" stroke-linecap="round"/>'
            f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{STICK}" stroke-width="8" stroke-linecap="round"/>'
            f'<circle cx="{x1}" cy="{y1}" r="7" fill="{HEAD}" {st(2)}/>')


s = [f'<ellipse cx="{W / 2}" cy="{H / 2 + 20}" rx="{W / 2 - 6}" ry="{H / 2 - 30}" fill="#E7EDF2" {st(2.4)}/>']
for x in (40, 62, 84):                                   # III
    s.append(stick(x, 20, x, 120))
s.append(stick(262, 20, 290, 120))                      # V
s.append(stick(318, 20, 290, 120))
s.append(stick(348, 20, 348, 120))                      # I
s.append(stick(140, 130, 210, 236))                     # X
s.append(stick(210, 130, 140, 236))
save('bai47_t2_q1_sticks', W, H, s, folder=F)
