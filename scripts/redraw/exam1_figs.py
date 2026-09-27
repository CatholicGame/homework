"""
Ôn Luyện Đề — Đề 1 (grade3Exam.js): 5 hình minh hoạ vẽ lại bằng nét riêng, thay ảnh lấy từ web.
  exam1_rice      sơ đồ đoạn thẳng: buổi sáng 53 kg, buổi chiều gấp đôi, "? kg gạo" cả ngày (đáp án 159)
  exam1_mul       6 × ? = 24   (đáp án 4)
  exam1_div       35 : 7 = ?   (đáp án 5)
  exam1_trapezoid hình thang vuông — 2 góc vuông
  exam1_rect2     hình chữ nhật chia 2 phần bởi một đoạn dọc — 8 góc vuông
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *

OUT = 'grade3-exam'
LINE = '#2F5DA8'


def dot(x, y):
    return f'<circle cx="{x}" cy="{y}" r="6" fill="{RED}" stroke="{INK}" stroke-width="2"/>'


# ── sơ đồ gạo ──
x0, u = 200, 200            # đầu đoạn, độ dài 1 phần (53 kg)
ys, yc = 110, 210
p = [text(40, ys + 9, 'Buổi sáng', size=26, weight=600, anchor='start'),
     text(40, yc + 9, 'Buổi chiều', size=26, weight=600, anchor='start'),
     f'<path d="M{x0},{ys - 8} Q{x0 + u / 2},{ys - 62} {x0 + u},{ys - 8}" fill="none" stroke="{GREEN}" stroke-width="3" stroke-dasharray="9 7"/>',
     text(x0 + u / 2, ys - 44, '53 kg', size=26, weight=700),
     f'<line x1="{x0}" y1="{ys}" x2="{x0 + u}" y2="{ys}" stroke="{LINE}" stroke-width="7" stroke-linecap="round"/>',
     f'<line x1="{x0}" y1="{yc}" x2="{x0 + 2 * u}" y2="{yc}" stroke="{LINE}" stroke-width="7" stroke-linecap="round"/>']
for x in (x0, x0 + u):
    p.append(f'<line x1="{x}" y1="{ys}" x2="{x}" y2="{yc}" stroke="{GREY}" stroke-width="2.5" stroke-dasharray="7 6"/>')
p += [dot(x0, ys), dot(x0 + u, ys), dot(x0, yc), dot(x0 + u, yc), dot(x0 + 2 * u, yc)]
bx = x0 + 2 * u + 40
p.append(f'<path d="M{bx},{ys - 24} Q{bx + 18},{ys - 24} {bx + 18},{ys} V{(ys + yc) / 2 - 12} Q{bx + 18},{(ys + yc) / 2} {bx + 32},{(ys + yc) / 2} '
         f'Q{bx + 18},{(ys + yc) / 2} {bx + 18},{(ys + yc) / 2 + 12} V{yc} Q{bx + 18},{yc + 24} {bx},{yc + 24}" fill="none" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
p.append(text(bx + 44, (ys + yc) / 2 + 9, '? kg gạo', size=26, weight=700, anchor='start'))
save('exam1_rice', 900, 260, p, folder=OUT)


# ── phép tính dạng thẻ số (kiểu thẻ của app): số trong thẻ, "?" trong ô chờ điền ──
def equation(tokens, name):
    TW, TH, OW, G = 110, 120, 56, 14     # thẻ số, cao, ô dấu, khoảng cách
    ws = [TW if t not in '×:=' else OW for t in tokens]
    W = sum(ws) + G * (len(tokens) - 1) + 40
    p, x, cy = [], 20, 90
    for t, w in zip(tokens, ws):
        cx = x + w / 2
        if t in '×:=':
            p.append(text(cx, cy + 22, t, size=64, weight=700, fill=INK))
        elif t == '?':
            p.append(f'<rect x="{x}" y="{cy - TH / 2}" width="{w}" height="{TH}" rx="18" fill="#FFF7D6" stroke="{ORANGE}" stroke-width="4" stroke-dasharray="12 8"/>')
            p.append(text(cx, cy + 26, '?', size=72, weight=700, fill=ORANGE))
        else:
            p.append(f'<rect x="{x}" y="{cy - TH / 2 + 6}" width="{w}" height="{TH}" rx="18" fill="{BLUE}" opacity=".35"/>')
            p.append(f'<rect x="{x}" y="{cy - TH / 2}" width="{w}" height="{TH}" rx="18" fill="{WHITE}" stroke="{BLUE}" stroke-width="4"/>')
            p.append(text(cx, cy + 26, t, size=72, weight=700, fill=INK))
        x += w + G
    save(name, W, 180, p, folder=OUT)


equation(['6', '×', '?', '=', '24'], 'exam1_mul')
equation(['35', ':', '7', '=', '?'], 'exam1_div')

# ── hình thang vuông: đáy dưới và cạnh phải vuông góc ──
save('exam1_trapezoid', 300, 240, [
    f'<path d="M30,210 L270,210 L270,30 L100,30 Z" fill="#EAF4FF" stroke="{LINE}" stroke-width="5" stroke-linejoin="round"/>'], folder=OUT)

# ── hình chữ nhật chia 2 phần ──
save('exam1_rect2', 380, 190, [
    f'<rect x="25" y="25" width="330" height="140" fill="#EAF4FF" stroke="{LINE}" stroke-width="5" stroke-linejoin="round"/>',
    f'<line x1="235" y1="25" x2="235" y2="165" stroke="{LINE}" stroke-width="5"/>'], folder=OUT)
