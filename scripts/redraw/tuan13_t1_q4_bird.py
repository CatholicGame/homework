"""
Luyện tập Toán 3, Tuần 13 Tiết 1 Q4 — chú chim (nối với 300 g): nét riêng. Không có số trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *

W, H = 190, 190
BODY, BELLY, WING = '#8FC9EE', '#FFF1D6', '#5EA8D8'
p = [f'<ellipse cx="96" cy="172" rx="58" ry="6" fill="{INK}" opacity=".1"/>',
     # đuôi
     f'<path d="M58,118 L18,140 L26,120 L14,108 Z" fill="{WING}" {STK}/>',
     # chân
     f'<path d="M92,150 V170 M84,170 H100 M112,150 V170 M104,170 H120" stroke="{ORANGE}" stroke-width="4" stroke-linecap="round"/>',
     # thân + bụng
     f'<ellipse cx="100" cy="116" rx="50" ry="40" fill="{BODY}" {STK}/>',
     f'<path d="M78,146 Q104,160 136,134 Q146,112 132,96 Q118,130 78,146 Z" fill="{BELLY}"/>',
     f'<ellipse cx="100" cy="116" rx="50" ry="40" fill="none" {STK}/>',
     # cánh
     f'<path d="M66,104 Q90,92 110,112 Q96,138 62,132 Q56,116 66,104 Z" fill="{WING}" {STK}/>',
     f'<path d="M70,120 Q84,122 96,116" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>',
     # đầu
     f'<circle cx="132" cy="66" r="30" fill="{BODY}" {STK}/>',
     f'<path d="M160,62 L180,70 L159,77 Z" fill="{YELLOW}" {STK}/>',
     f'<circle cx="142" cy="60" r="4.5" fill="{INK}"/><circle cx="143.6" cy="58.4" r="1.6" fill="#fff"/>',
     f'<circle cx="138" cy="78" r="5" fill="{PINK}" opacity=".75"/>',
     f'<path d="M118,40 q2,-12 12,-12 q-4,6 -2,12" fill="{BODY}" {STK}/>']
save('tuan13_t1_q4_bird', W, H, p, folder='grade3-practice')
