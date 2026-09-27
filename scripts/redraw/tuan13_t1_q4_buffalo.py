"""
Luyện tập Toán 3, Tuần 13 Tiết 1 Q4 — con trâu (nối với 300 kg): nét riêng. Không có số trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H = 320, 270
B, BD, BL = '#8A95A3', '#6B7684', '#B7C0CA'


def leg(x, top, bot, col):
    return (f'<rect x="{x - 12}" y="{top}" width="24" height="{bot - top}" rx="10" fill="{col}" {STK}/>'
            f'<rect x="{x - 13}" y="{bot - 12}" width="26" height="12" rx="4" fill="{INK}"/>')


p = [f'<ellipse cx="170" cy="254" rx="140" ry="8" fill="{INK}" opacity=".1"/>',
     # đuôi
     f'<path d="M280,120 Q298,160 292,206" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>',
     f'<path d="M292,204 l-6,18 l12,-4 Z" fill="{INK}"/>',
     leg(252, 170, 248, BD), leg(126, 170, 248, BD),
     # thân
     f'<path d="M110,104 Q180,84 262,98 Q296,106 290,150 Q286,190 250,196 H130 Q96,192 94,150 Q94,112 110,104 Z" fill="{B}" {STK}/>',
     f'<path d="M132,186 Q190,200 248,186" fill="none" stroke="{BL}" stroke-width="7" stroke-linecap="round" opacity=".8"/>',
     leg(232, 178, 252, B), leg(146, 178, 252, B),
     # sừng (sau đầu)
     f'<path d="M58,92 C22,86 10,50 32,22 C34,48 50,66 76,76 Z" fill="{CREAM}" {STK}/>',
     f'<path d="M110,90 C146,82 156,46 136,20 C132,46 116,62 92,72 Z" fill="{CREAM}" {STK}/>',
     # tai
     f'<ellipse cx="38" cy="104" rx="20" ry="9" fill="{BD}" {STK} transform="rotate(18 38 104)"/>',
     f'<ellipse cx="130" cy="104" rx="20" ry="9" fill="{BD}" {STK} transform="rotate(-18 130 104)"/>',
     # đầu
     f'<path d="M58,78 Q84,68 110,78 Q124,100 116,136 Q108,164 84,166 Q60,164 52,136 Q44,100 58,78 Z" fill="{B}" {STK}/>',
     f'<ellipse cx="84" cy="150" rx="28" ry="18" fill="{BL}" {STK}/>',
     f'<ellipse cx="74" cy="150" rx="3.6" ry="5" fill="{INK}"/><ellipse cx="94" cy="150" rx="3.6" ry="5" fill="{INK}"/>',
     f'<circle cx="70" cy="110" r="5" fill="{INK}"/><circle cx="71.8" cy="108.2" r="1.8" fill="#fff"/>',
     f'<circle cx="98" cy="110" r="5" fill="{INK}"/><circle cx="99.8" cy="108.2" r="1.8" fill="#fff"/>',
     f'<circle cx="60" cy="128" r="5" fill="{PINK}" opacity=".6"/><circle cx="108" cy="128" r="5" fill="{PINK}" opacity=".6"/>']
save('tuan13_t1_q4_buffalo', W, H, p, folder='grade3-practice')
