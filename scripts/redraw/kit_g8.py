"""
Bộ vẽ dùng chung cho nhóm g8 (Bài 63–70 Vở BT Toán 2): xe đồ chơi, túi cà chua,
chấm tròn biểu đồ, thú nhỏ. Mọi hàm vẽ trong hộp gốc rồi đặt bằng place().
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

SW = 3
DOT, DOT_D = '#5BC0EE', '#2A93C9'


def place(inner, x, y, s=1.0):
    return f'<g transform="translate({x:.1f} {y:.1f}) scale({s:.4f})">{inner}</g>'


def wheel(cx, cy, r, tyre=INK, hub=GREY_L):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{tyre}"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r * 0.52}" fill="{hub}" stroke="{INK}" stroke-width="2"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r * 0.16}" fill="{INK}"/>')


# ── đồ chơi (hộp gốc: car 240×82, moto 181×107, plane 240×113) ─────────────
def car(col=RED):
    s = [f'<path d="M62,38 L88,12 Q92,8 98,8 L150,8 Q157,8 161,13 L186,38 Z" fill="{col}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<path d="M78,36 L96,16 L120,16 L120,36 Z" fill="#DFF3FF" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>',
         f'<path d="M130,36 L130,16 L152,16 L170,36 Z" fill="#DFF3FF" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>',
         f'<path d="M14,40 Q14,36 22,36 L214,36 Q232,38 234,54 L234,62 Q234,68 228,68 L14,68 Q8,68 8,62 L8,46 Q8,40 14,40 Z" fill="{col}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<line x1="124" y1="40" x2="124" y2="64" stroke="{INK}" stroke-width="2"/>',
         f'<rect x="100" y="46" width="12" height="4" rx="2" fill="{INK}"/><rect x="136" y="46" width="12" height="4" rx="2" fill="{INK}"/>',
         f'<ellipse cx="226" cy="48" rx="6" ry="5" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>',
         f'<rect x="8" y="44" width="9" height="8" rx="2" fill="{ORANGE}" stroke="{INK}" stroke-width="2"/>',
         f'<path d="M24,44 L60,44" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>',
         wheel(60, 66, 15), wheel(184, 66, 15)]
    return ''.join(s)


def moto(col=TEAL):
    s = [f'<path d="M136,78 Q140,58 160,58 Q176,60 178,76" fill="{col}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<path d="M18,80 C12,56 30,46 62,48 L104,52 Q112,54 112,62 L112,80 Z" fill="{col}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<rect x="96" y="70" width="36" height="10" rx="3" fill="{GREY}" stroke="{INK}" stroke-width="2.4"/>',
         f'<path d="M110,82 L128,82 L146,24 L134,20 Z" fill="{col}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<rect x="30" y="36" width="62" height="14" rx="7" fill="{HAIR}" stroke="{INK}" stroke-width="2.4"/>',
         f'<path d="M126,18 L160,12" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>',
         f'<line x1="140" y1="16" x2="136" y2="4" stroke="{INK}" stroke-width="2.4"/><circle cx="135" cy="4" r="4" fill="{GREY_L}" stroke="{INK}" stroke-width="2"/>',
         f'<circle cx="150" cy="30" r="7" fill="{YELLOW}" stroke="{INK}" stroke-width="2.4"/>',
         f'<path d="M30,64 L70,62" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>',
         wheel(44, 88, 17), wheel(156, 88, 17)]
    return ''.join(s)


def plane(body=BLUE, wing=YELLOW):
    s = [f'<path d="M22,52 L10,14 Q10,8 18,8 L30,8 L56,48 Z" fill="{wing}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<line x1="150" y1="72" x2="146" y2="94" stroke="{INK}" stroke-width="3"/><line x1="170" y1="72" x2="176" y2="94" stroke="{INK}" stroke-width="3"/>',
         wheel(146, 98, 10), wheel(178, 98, 10),
         f'<path d="M14,50 Q14,44 24,44 L190,40 Q220,42 222,58 Q220,74 190,76 L40,74 Q16,70 14,56 Z" fill="{body}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<path d="M184,42 Q212,44 214,56 L184,56 Z" fill="#DFF3FF" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>',
         f'<path d="M96,60 L172,58 Q178,60 172,66 L100,70 Q90,66 96,60 Z" fill="{wing}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         ''.join(f'<circle cx="{x}" cy="52" r="5" fill="#DFF3FF" stroke="{INK}" stroke-width="2"/>' for x in (100, 118, 136, 154)),
         f'<path d="M36,56 L20,60 L40,64" fill="{wing}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>',
         f'<rect x="221" y="53" width="8" height="10" rx="2" fill="{RED}" stroke="{INK}" stroke-width="2"/>',
         f'<ellipse cx="231" cy="58" rx="4" ry="26" fill="{GREY}" stroke="{INK}" stroke-width="2.2"/>']
    return ''.join(s)


# ── biểu đồ ────────────────────────────────────────────────────────────────
def dot(cx, cy, r=17):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{DOT}" stroke="{INK}" stroke-width="2.6"/>'
            f'<ellipse cx="{cx - r * 0.35}" cy="{cy - r * 0.4}" rx="{r * 0.28}" ry="{r * 0.17}" fill="#fff" opacity=".6" transform="rotate(-30 {cx - r * 0.35} {cy - r * 0.4})"/>')


def bag(cx, by, w=74, h=66, col='#F4A0A0'):
    """túi buộc miệng; (cx, by) = giữa đáy"""
    t = by - h
    s = [f'<path d="M{cx - w * 0.5},{by} Q{cx - w * 0.56},{t + h * 0.5} {cx - w * 0.16},{t + h * 0.26} L{cx + w * 0.16},{t + h * 0.26} Q{cx + w * 0.56},{t + h * 0.5} {cx + w * 0.5},{by} Z" fill="{col}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<path d="M{cx - w * 0.14},{t + h * 0.26} L{cx - w * 0.3},{t + 4} Q{cx},{t + h * 0.1} {cx + w * 0.3},{t + 4} L{cx + w * 0.14},{t + h * 0.26} Z" fill="{col}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>',
         f'<rect x="{cx - w * 0.2}" y="{t + h * 0.21}" width="{w * 0.4}" height="{h * 0.1}" rx="3" fill="{YELLOW}" stroke="{INK}" stroke-width="2.2"/>',
         f'<path d="M{cx - w * 0.3},{by - h * 0.5} Q{cx - w * 0.36},{by - h * 0.25} {cx - w * 0.3},{by - h * 0.1}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/>']
    return ''.join(s)


# ── thú nhỏ làm biểu tượng hàng (hộp gốc 100×80, đáy y=76) ────────────────
def bunny_icon(fur=WHITE, inner=PINK):
    s = []
    for sx, rot in ((-1, -10), (1, 12)):
        cx = 50 + sx * 11
        s.append(f'<g transform="rotate({rot} {cx} 30)"><ellipse cx="{cx}" cy="16" rx="8" ry="18" fill="{fur}" stroke="{INK}" stroke-width="2.6"/><ellipse cx="{cx}" cy="17" rx="3.6" ry="12" fill="{inner}"/></g>')
    s.append(f'<ellipse cx="50" cy="64" rx="22" ry="14" fill="{fur}" stroke="{INK}" stroke-width="2.6"/>')
    s.append(f'<ellipse cx="50" cy="44" rx="20" ry="17" fill="{fur}" stroke="{INK}" stroke-width="2.6"/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{50 + sx * 7.5}" cy="42" r="2.8" fill="{INK}"/><circle cx="{50 + sx * 13}" cy="49" r="3.4" fill="{PINK}" opacity=".7"/>')
    s.append(f'<ellipse cx="50" cy="48" rx="2.6" ry="2" fill="#E77A93"/><path d="M46,52 q4,4 8,0" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>')
    return ''.join(s)


def turtle_icon(shell=GREEN, skin='#C8E6A0'):
    s = [f'<ellipse cx="80" cy="54" rx="14" ry="11" fill="{skin}" stroke="{INK}" stroke-width="2.6"/>',
         f'<circle cx="84" cy="51" r="2.6" fill="{INK}"/><path d="M84,58 q4,2 7,-1" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>']
    for x in (28, 62):
        s.append(f'<ellipse cx="{x}" cy="70" rx="8" ry="6" fill="{skin}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<path d="M12,66 L4,70 L14,70 Z" fill="{skin}" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>')
    s.append(f'<path d="M10,68 Q12,30 44,28 Q74,30 76,68 Z" fill="{shell}" stroke="{INK}" stroke-width="2.8" stroke-linejoin="round"/>')
    s.append(f'<path d="M10,68 L76,68" stroke="{INK}" stroke-width="2.8" stroke-linecap="round"/>')
    s.append(f'<path d="M30,66 L32,48 L44,40 L56,48 L58,66 M32,48 L20,52 M56,48 L68,52 M44,40 L44,31" fill="none" stroke="{GRASS_D}" stroke-width="2.2" stroke-linejoin="round"/>')
    return ''.join(s)


def squirrel_icon(fur='#E8914A', light='#FBE0C4'):
    s = [f'<path d="M58,72 C92,72 96,34 78,16 C66,4 50,12 58,24 C70,24 76,40 62,52 Z" fill="{fur}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>',
         f'<ellipse cx="42" cy="58" rx="17" ry="18" fill="{fur}" stroke="{INK}" stroke-width="2.6"/>',
         f'<ellipse cx="41" cy="61" rx="9" ry="12" fill="{light}"/>']
    for sx in (-1, 1):
        s.append(f'<path d="M{42 + sx * 12},{28} L{42 + sx * 14},{12} L{42 + sx * 3},{22} Z" fill="{fur}" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="42" cy="34" rx="16" ry="14" fill="{fur}" stroke="{INK}" stroke-width="2.6"/>')
    s.append(f'<ellipse cx="42" cy="40" rx="8" ry="6" fill="{light}"/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{42 + sx * 6.5}" cy="32" r="2.6" fill="{INK}"/>')
    s.append(f'<ellipse cx="42" cy="38" rx="2.4" ry="1.8" fill="{INK}"/>')
    s.append(f'<ellipse cx="34" cy="75" rx="7" ry="4" fill="{fur}" stroke="{INK}" stroke-width="2"/><ellipse cx="50" cy="75" rx="7" ry="4" fill="{fur}" stroke="{INK}" stroke-width="2"/>')
    return ''.join(s)
