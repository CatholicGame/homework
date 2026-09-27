"""
Luyện tập Toán 3, Tuần 13 Tiết 1 Q4 — chó con (nối với 3 kg): nét riêng. Không có số trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H = 220, 200
F, FD, L = '#E9B07A', '#B97A4B', '#FFF1DE'


def leg(x, top, bot, col):
    return (f'<rect x="{x - 9}" y="{top}" width="18" height="{bot - top}" rx="8" fill="{col}" {STK}/>'
            f'<ellipse cx="{x}" cy="{bot - 2}" rx="11" ry="6" fill="{L}" {STK}/>')


p = [f'<ellipse cx="112" cy="186" rx="84" ry="7" fill="{INK}" opacity=".1"/>',
     # đuôi vẫy
     f'<path d="M170,112 Q196,96 198,70" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>',
     f'<path d="M170,112 Q196,96 198,70" fill="none" stroke="{F}" stroke-width="6" stroke-linecap="round"/>',
     leg(150, 128, 182, FD), leg(84, 128, 182, FD),
     # thân
     f'<ellipse cx="128" cy="124" rx="52" ry="30" fill="{F}" {STK}/>',
     f'<ellipse cx="160" cy="112" rx="16" ry="12" fill="{FD}" opacity=".8"/>',
     leg(166, 132, 184, F), leg(100, 134, 186, F),
     # tai sau, đầu, tai trước
     f'<path d="M40,58 Q22,70 28,104 Q42,108 50,84 Z" fill="{FD}" {STK}/>',
     f'<circle cx="70" cy="80" r="36" fill="{F}" {STK}/>',
     f'<path d="M98,52 Q122,60 114,96 Q100,98 94,74 Z" fill="{FD}" {STK}/>',
     f'<ellipse cx="62" cy="96" rx="20" ry="15" fill="{L}" {STK}/>',
     f'<ellipse cx="60" cy="88" rx="7" ry="5" fill="{INK}"/>',
     f'<path d="M60,93 V100 M52,102 Q60,108 68,102" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>',
     f'<path d="M58,104 q2,10 8,0" fill="{RED}" stroke="{INK}" stroke-width="2"/>',
     f'<circle cx="54" cy="70" r="4.5" fill="{INK}"/><circle cx="55.5" cy="68.5" r="1.6" fill="#fff"/>',
     f'<circle cx="82" cy="70" r="4.5" fill="{INK}"/><circle cx="83.5" cy="68.5" r="1.6" fill="#fff"/>',
     f'<circle cx="92" cy="90" r="5" fill="{PINK}" opacity=".7"/>',
     # vòng cổ
     f'<path d="M50,110 Q72,122 96,108" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>',
     f'<path d="M50,110 Q72,122 96,108" fill="none" stroke="{RED}" stroke-width="4.5" stroke-linecap="round"/>',
     f'<circle cx="74" cy="122" r="5" fill="{YELLOW}" {STK}/>']
save('tuan13_t1_q4_dog', W, H, p, folder='grade3-practice')
