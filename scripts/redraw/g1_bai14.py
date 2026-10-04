"""
Vở BT Toán 1, Bài 14 (Luyện tập) — nét riêng.
  Q2: bốn khung tranh (mỗi khung một hình, đặt cạnh ô nhập): 3 con bướm / 2 cành hoa (mẫu 3 > 2, 2 < 3); 4 cục tẩy / 5 bút chì;
      3 mũ / 3 bạn gái; 5 bó hoa / 5 lọ hoa.
  Q3: ba khung trên (4 ô tô màu + 3 ô trắng; 3 màu + 1 trắng; 4 màu + 3 trắng), đánh số 1, 2, 3;
      ba hình bầu dục dưới (2 trắng; 1 trắng; 1 màu + 2 trắng), đánh chữ A, B, C;
      mẫu: A nối với 2, "3 = 3".
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_c import butterfly, orchid, eraser, sunhat, vase, daffodils, frame, box, sq, place, st
from kit_g1 import pencil, kid

F = 'grade1-workbook'
PW, PH = 340, 240
X, Y = 4, 4

def panel():
    return frame(X, Y, PW, PH, rx=26, fill='#FBFDF7')

# 1: bướm / hoa lan (mẫu 3 > 2, 2 < 3 ghi ở đề)
P = [panel()]
for i in range(3):
    P.append(place(butterfly(), X + 62 + i * 108, Y + 62, .82))
for i in range(2):
    P.append(place(orchid(), X + 62 + i * 108, Y + 228, .95))
save('bai14_q2_panel1', PW + 8, PH + 8, P, folder=F)
# 2: tẩy / bút chì
P = [panel()]
cols = [(PINK, BLUE), (YELLOW, GREEN), (PINK, BLUE), (YELLOW, GREEN)]
for i in range(4):
    P.append(place(eraser(*cols[i]), X + 52 + i * 78, Y + 64, .72))
pcol = [YELLOW, RED, BLUE, GREEN, ORANGE]
for i in range(5):
    x = X + 26 + i * 62
    P.append(pencil(x, Y + 140, x + 50, Y + 210, w=18, body=pcol[i]))
save('bai14_q2_panel2', PW + 8, PH + 8, P, folder=F)
# 3: mũ / bạn gái
P = [panel()]
hats = [YELLOW, '#FFB3C7', YELLOW]
for i in range(3):
    P.append(place(sunhat(hats[i]), X + 62 + i * 108, Y + 74, .78))
for i in range(3):
    P.append(kid(X + 62 + i * 108, Y + 230, 140, girl=True, shirt='#FFB3C7', bottom='#F7839F', shoe='#6FB7EA', pose='wave'))
save('bai14_q2_panel3', PW + 8, PH + 8, P, folder=F)
# 4: bó hoa / lọ hoa
P = [panel()]
for i in range(5):
    P.append(place(daffodils(), X + 38 + i * 66, Y + 120, .72))
for i in range(5):
    P.append(place(vase(WHITE, TEAL, 92), X + 38 + i * 66, Y + 226))
save('bai14_q2_panel4', PW + 8, PH + 8, P, folder=F)

# Q3
P = []
TOPS = [(4, 3), (3, 1), (4, 3)]
for k, (dark, white) in enumerate(TOPS):
    x = 6 + k * 236
    P.append(frame(x, 6, 222, 108, rx=26))
    for i in range(dark):
        P.append(sq(x + 68 + i * 40, 38, 32, PURPLE))
    for i in range(white):
        P.append(sq(x + 68 + i * 40, 82, 32, WHITE))
    P.append(f'<circle cx="{x + 24}" cy="30" r="16" fill="{YELLOW}" {st(2.2)}/>' + text(x + 24, 37, str(k + 1), 20, 700))
BOTS = [(0, 2), (0, 1), (1, 2)]
for k, (dark, white) in enumerate(BOTS):
    cx = 117 + k * 236
    P.append(f'<ellipse cx="{cx}" cy="196" rx="76" ry="46" fill="{WHITE}" {st(2.6)}/>')
    xs = [cx + 8 + (i - (white - 1) / 2) * 40 for i in range(white)]
    for x in xs:
        P.append(sq(x, 210 if dark else 196, 32, WHITE))
    if dark:
        P.append(sq(cx + 28, 172, 32, PURPLE))
    P.append(f'<circle cx="{cx - 50}" cy="196" r="16" fill="{GREEN}" {st(2.2)}/>' + text(cx - 50, 203, 'ABC'[k], 20, 700))
# mẫu: A -> 2
P.append(f'<path d="M180,182 C250,170 320,150 352,108" fill="none" stroke="{INK}" stroke-width="2.6"/>'
         f'<path d="M352,108 L341,117 M352,108 L351,122" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
P.append(text(412, 141, '3 = 3', 22, 700))
save('bai14_q3_groups', 712, 248, P, folder=F)
