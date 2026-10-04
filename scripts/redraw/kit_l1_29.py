"""
Bộ vẽ riêng cho Vở BT Toán 1, Bài 29–34 (phép cộng/trừ trong phạm vi 5, 3):
khung tranh có vạch chia nhóm, ngựa đứng, chim én đậu/bay, thuyền, chó chạy, ếch…
Nét riêng, phẳng, viền INK. Mọi hàm vẽ ở toạ độ CỤC BỘ, (0,0) = giữa chân/đáy,
dùng g(inner, x, y, s, flip) để đặt.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g9 import g, limb, st          # noqa: F401  (g, limb, st dùng lại)
import kit_p2, kit_g9, kit_measure, kit_g4  # noqa: F401

FOLDER = 'grade1-workbook'


def board(w, h, bg=SKY, ground=GRASS, ground_y=None, r=24, divider=None, oval=False):
    """Tấm tranh bo góc (hoặc bầu dục): trời + nền cỏ; divider = ((x1,y1),(x2,y2)) vạch đứt chia hai nhóm."""
    gy = ground_y if ground_y is not None else h * .62
    cid = f'clip{abs(hash((w, h, bg, ground, gy, oval))) % 99999}'
    shape = (f'<ellipse cx="{w / 2}" cy="{h / 2}" rx="{w / 2 - 3}" ry="{h / 2 - 3}"/>' if oval
             else f'<rect x="3" y="3" width="{w - 6}" height="{h - 6}" rx="{r}"/>')
    s = [f'<defs><clipPath id="{cid}">{shape}</clipPath></defs>',
         f'<g clip-path="url(#{cid})"><rect width="{w}" height="{h}" fill="{bg}"/>']
    if ground:
        s.append(f'<path d="M0,{gy} Q{w * .3},{gy - 14} {w * .55},{gy - 4} T{w},{gy - 6} V{h} H0 Z" fill="{ground}"/>')
    s.append('</g>')
    s.append(shape.replace('/>', f' fill="none" {st(3)}/>'))
    if divider:
        (x1, y1), (x2, y2) = divider
        s.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{INK}" stroke-width="2.6" stroke-dasharray="9 7" stroke-linecap="round"/>')
    return ''.join(s)


def horse_stand(body='#D9A066', mane=HAIR, light='#F3D3AE'):
    """Ngựa đứng nghiêng, quay phải. Chân chạm y=0, giữa x=0; khung ~150×130."""
    s = []
    # chân phía xa
    for x in (-34, 30):
        s.append(f'<rect x="{x - 5}" y="-52" width="11" height="50" rx="5" fill="{light}" {st(2.6)}/>')
        s.append(f'<rect x="{x - 6}" y="-8" width="13" height="8" rx="2" fill="{mane}" {st(2.2)}/>')
    # đuôi
    s.append(f'<path d="M-48,-70 C-70,-66 -76,-40 -66,-18 C-60,-34 -56,-46 -44,-58 Z" fill="{mane}" {st(2.6)}/>')
    # thân
    s.append(f'<ellipse cx="-4" cy="-62" rx="50" ry="24" fill="{body}" {st(3)}/>')
    # cổ
    s.append(f'<path d="M22,-74 C30,-96 40,-112 50,-120 L70,-104 C58,-92 50,-76 44,-58 Z" fill="{body}" {st(3)}/>')
    # chân phía gần
    for x in (-24, 40):
        s.append(f'<rect x="{x - 6}" y="-54" width="12" height="52" rx="5" fill="{body}" {st(2.6)}/>')
        s.append(f'<rect x="{x - 7}" y="-8" width="14" height="8" rx="2" fill="{mane}" {st(2.2)}/>')
    # đầu
    s.append(f'<path d="M46,-126 C58,-136 74,-130 92,-108 C98,-100 92,-92 84,-94 C72,-98 60,-104 50,-108 Z" fill="{body}" {st(3)}/>')
    s.append(f'<path d="M50,-128 L54,-144 L62,-130 Z" fill="{body}" {st(2.4)}/>')
    # bờm
    s.append(f'<path d="M48,-128 C38,-118 30,-100 24,-80 C34,-86 40,-96 44,-104 C46,-96 48,-92 50,-90 C52,-104 54,-116 58,-126 Z" fill="{mane}" {st(2.4)}/>')
    s.append(f'<circle cx="68" cy="-118" r="3.6" fill="{INK}"/><circle cx="69.2" cy="-119.2" r="1.2" fill="#fff"/>')
    s.append(f'<circle cx="88" cy="-102" r="2" fill="{INK}"/>')
    s.append(f'<circle cx="74" cy="-108" r="4" fill="{PINK}" opacity=".7"/>')
    return ''.join(s)


def horse_run(body=BROWN):
    """Ngựa phi (kit_p2.horse, quay trái), thu về khung ~150×112, chân ở y=0, giữa x=0."""
    return kit_p2.place(kit_p2.horse(), -75, -100, 0.375)


SW_BACK, SW_BELLY, SW_WING = '#4E6FB8', '#FFF6E6', '#3B5998'


def swallow_perch():
    """Chim én đậu (nhìn nghiêng, quay phải), chân bám ở y=0; khung ~70×80."""
    s = [f'<path d="M-14,-24 L-34,4 L-24,-2 L-28,10 L-8,-18 Z" fill="{SW_WING}" {st(2.4)}/>',
         f'<path d="M-2,-4 v6 M8,-4 v6" stroke="{ORANGE}" stroke-width="3.4" stroke-linecap="round"/>',
         f'<ellipse cx="0" cy="-26" rx="18" ry="22" fill="{SW_BACK}" {st(2.8)}/>',
         f'<path d="M6,-40 C18,-32 18,-12 4,-6 C-2,-14 0,-30 6,-40 Z" fill="{SW_BELLY}"/>',
         f'<ellipse cx="0" cy="-26" rx="18" ry="22" fill="none" {st(2.8)}/>',
         f'<path d="M-14,-34 C-4,-30 0,-18 -8,-8 C-16,-12 -18,-26 -14,-34 Z" fill="{SW_WING}" {st(2.2)}/>',
         f'<circle cx="6" cy="-50" r="13" fill="{SW_BACK}" {st(2.8)}/>',
         f'<ellipse cx="10" cy="-44" rx="6" ry="4.5" fill="{RED}" opacity=".85"/>',
         f'<path d="M17,-52 L27,-49 L17,-46 Z" fill="{YELLOW}" {st(2)}/>',
         f'<circle cx="10" cy="-53" r="2.6" fill="{INK}"/><circle cx="10.8" cy="-53.8" r=".9" fill="#fff"/>']
    return ''.join(s)


def swallow_fly():
    """Chim én bay (nhìn từ dưới lên, quay phải), tâm thân ở (0,0); khung ~110×70."""
    s = [f'<path d="M-26,0 L-54,-10 L-44,0 L-54,10 Z" fill="{SW_WING}" {st(2.4)}/>',
         f'<path d="M-6,-6 C-18,-28 -30,-38 -48,-40 C-30,-24 -24,-14 -14,-2 Z" fill="{SW_WING}" {st(2.4)}/>',
         f'<ellipse cx="0" cy="0" rx="28" ry="11" fill="{SW_BACK}" {st(2.8)}/>',
         f'<path d="M-18,4 C-4,10 14,10 24,2 C14,-2 -6,-2 -18,4 Z" fill="{SW_BELLY}"/>',
         f'<path d="M-4,2 C6,22 22,36 46,40 C30,26 22,14 10,0 Z" fill="{SW_WING}" {st(2.4)}/>',
         f'<circle cx="26" cy="-4" r="10" fill="{SW_BACK}" {st(2.6)}/>',
         f'<path d="M35,-6 L44,-3 L35,0 Z" fill="{YELLOW}" {st(1.8)}/>',
         f'<circle cx="29" cy="-7" r="2.3" fill="{INK}"/><circle cx="29.7" cy="-7.7" r=".8" fill="#fff"/>']
    return ''.join(s)


def branch(x1, y, x2):
    return (f'<path d="M{x1},{y} L{x2},{y - 6}" stroke="{INK}" stroke-width="13" stroke-linecap="round"/>'
            f'<path d="M{x1},{y} L{x2},{y - 6}" stroke="#A9744A" stroke-width="7.6" stroke-linecap="round"/>'
            f'<path d="M{x2 - 16},{y - 5} q10,-16 24,-14 q-6,14 -24,14 Z" fill="{GREEN}" {st(2.2)}/>')


def motorboat(hull=RED, cabin=WHITE):
    """Thuyền máy nhỏ (không buồm), đáy ở y=0, giữa x=0; khung ~120×60."""
    s = [f'<path d="M-24,-30 h30 l10,12 h-40 Z" fill="{cabin}" {st(2.6)}/>',
         f'<rect x="-18" y="-27" width="8" height="7" rx="1.5" fill="{SKY}" {st(1.6)}/>',
         f'<rect x="-6" y="-27" width="8" height="7" rx="1.5" fill="{SKY}" {st(1.6)}/>',
         f'<path d="M-2,-30 V-44 M-2,-44 l10,4 l-10,4" fill="{YELLOW}" {st(2.2)}/>',
         f'<path d="M-58,-20 H56 C50,-6 40,0 28,0 H-44 C-50,-4 -56,-12 -58,-20 Z" fill="{hull}" {st(3)}/>',
         f'<path d="M-52,-12 H50" stroke="#fff" stroke-width="3" opacity=".8"/>']
    return ''.join(s)


def sailboat(hull=BLUE, sail=WHITE, stripe=ORANGE):
    """Thuyền buồm, đáy ở y=0; khung ~120×110."""
    s = [f'<path d="M0,-100 V-20" {st(3)}/>',
         f'<path d="M4,-96 C30,-80 42,-50 46,-26 H4 Z" fill="{sail}" {st(2.8)}/>',
         f'<path d="M4,-58 H38 M4,-42 H43" stroke="{stripe}" stroke-width="5"/>',
         f'<path d="M4,-96 C30,-80 42,-50 46,-26 H4 Z" fill="none" {st(2.8)}/>',
         f'<path d="M-4,-88 C-22,-70 -32,-46 -34,-26 H-4 Z" fill="#FFE9B0" {st(2.8)}/>',
         f'<path d="M0,-100 l-14,5 l14,5 Z" fill="{RED}" {st(2)}/>',
         f'<path d="M-56,-20 H58 C52,-6 42,0 30,0 H-42 C-48,-4 -54,-12 -56,-20 Z" fill="{hull}" {st(3)}/>',
         f'<path d="M-50,-12 H52" stroke="#fff" stroke-width="3" opacity=".8"/>']
    return ''.join(s)


def waves(x, y, w, col=WATER_D):
    n = max(2, int(w // 28))
    d = f'M{x},{y} ' + ' '.join(f'q7,-6 14,0 t14,0' for _ in range(n))
    return f'<path d="{d}" fill="none" stroke="{col}" stroke-width="2.6" stroke-linecap="round"/>'


def dog_run(fur='#E9B77A', ear='#A8703F'):
    """Chó chạy (nhìn nghiêng, quay phải), chân chạm y=0, giữa x=0; khung ~130×80."""
    s = [limb('M28,-26 L42,-12 L52,-4', '#D7A36A', 11),
         limb('M-26,-28 L-42,-14 L-52,-8', '#D7A36A', 11),
         f'<path d="M-40,-44 C-54,-56 -58,-66 -54,-74" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>',
         f'<path d="M-40,-44 C-54,-56 -58,-66 -54,-74" fill="none" stroke="{fur}" stroke-width="4.6" stroke-linecap="round"/>',
         f'<ellipse cx="-4" cy="-38" rx="44" ry="18" fill="{fur}" {st(3)}/>',
         f'<ellipse cx="-4" cy="-30" rx="26" ry="7" fill="#F6DDBE"/>',
         limb('M20,-28 L36,-10 L50,-2', fur, 11),
         limb('M-20,-30 L-32,-10 L-46,0', fur, 11),
         f'<circle cx="42" cy="-54" r="18" fill="{fur}" {st(3)}/>',
         f'<path d="M50,-56 C62,-56 70,-52 70,-46 C70,-40 62,-38 52,-40 Z" fill="#F6DDBE" {st(2.6)}/>',
         f'<ellipse cx="69" cy="-49" rx="4" ry="3.2" fill="{INK}"/>',
         f'<path d="M34,-70 C26,-74 20,-64 24,-46 C30,-50 34,-58 38,-64 Z" fill="{ear}" {st(2.6)}/>',
         f'<circle cx="47" cy="-60" r="3.2" fill="{INK}"/><circle cx="48" cy="-61" r="1.1" fill="#fff"/>',
         f'<circle cx="44" cy="-46" r="4" fill="{PINK}" opacity=".7"/>',
         f'<path d="M56,-41 q5,4 10,0" fill="none" {st(2)}/>']
    return ''.join(s)


FROG, FROG_D, FROG_B = '#7ED07A', '#3E9A4E', '#E9F7C9'


def frog_sit():
    """Ếch ngồi nhìn thẳng, chân chạm y=0, giữa x=0; khung ~100×100."""
    s = []
    for sx in (-1, 1):
        s.append(f'<path d="M{sx * 18},-24 C{sx * 50},-32 {sx * 54},-4 {sx * 32},-2 Z" fill="{FROG}" {st(2.6)}/>')
        s.append(f'<ellipse cx="{sx * 38}" cy="-2" rx="13" ry="5" fill="{FROG}" {st(2.4)}/>')
    s.append(f'<ellipse cx="0" cy="-34" rx="32" ry="30" fill="{FROG}" {st(2.8)}/>')
    s.append(f'<ellipse cx="0" cy="-28" rx="20" ry="20" fill="{FROG_B}"/>')
    for sx in (-1, 1):
        s.append(limb(f'M{sx * 13},-22 L{sx * 15},-4', FROG, 9))
        s.append(f'<ellipse cx="{sx * 16}" cy="-2" rx="8" ry="4" fill="{FROG}" {st(2)}/>')
    hy = -70
    s.append(f'<ellipse cx="0" cy="{hy}" rx="38" ry="22" fill="{FROG}" {st(2.8)}/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{sx * 19}" cy="{hy - 18}" r="13" fill="{FROG}" {st(2.6)}/>')
        s.append(f'<circle cx="{sx * 19}" cy="{hy - 18}" r="8.5" fill="#fff"/>')
        s.append(f'<circle cx="{sx * 19 + 1}" cy="{hy - 17}" r="5" fill="{INK}"/><circle cx="{sx * 19 + 2.6}" cy="{hy - 19}" r="1.6" fill="#fff"/>')
        s.append(f'<ellipse cx="{sx * 26}" cy="{hy + 6}" rx="5" ry="3.4" fill="{PINK}" opacity=".8"/>')
    s.append(f'<path d="M-18,{hy + 4} Q0,{hy + 18} 18,{hy + 4}" fill="none" {st(2.4)}/>')
    return ''.join(s)


def frog_swim():
    """Ếch bơi/nhảy xuống nước, nhìn từ trên, đầu hướng phải, tâm (0,0); khung ~130×80."""
    s = []
    # chân sau duỗi thẳng ra sau
    for sy in (-1, 1):
        s.append(limb(f'M-18,{sy * 8} L-44,{sy * 18} L-66,{sy * 12}', FROG, 10))
        s.append(f'<path d="M-66,{sy * 12} l-10,{sy * -6} M-66,{sy * 12} l-12,{sy * 2} M-66,{sy * 12} l-8,{sy * 8}" {st(2.6)}/>')
        s.append(limb(f'M12,{sy * 12} L22,{sy * 26}', FROG, 8))
    s.append(f'<ellipse cx="0" cy="0" rx="28" ry="20" fill="{FROG}" {st(2.8)}/>')
    s.append(f'<ellipse cx="-4" cy="0" rx="14" ry="10" fill="{FROG_D}" opacity=".35"/>')
    s.append(f'<ellipse cx="28" cy="0" rx="18" ry="22" fill="{FROG}" {st(2.8)}/>')
    for sy in (-1, 1):
        s.append(f'<circle cx="30" cy="{sy * 15}" r="9" fill="{FROG}" {st(2.4)}/>')
        s.append(f'<circle cx="31" cy="{sy * 15}" r="5.6" fill="#fff"/><circle cx="33" cy="{sy * 15}" r="3.2" fill="{INK}"/>')
    return ''.join(s)
