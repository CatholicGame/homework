"""SGK Toán 4, bài 4–17 (trang 6–22): hình vuông cạnh a (bài 5), bảng thẻ số theo hàng (bài 6)."""
from kit_g4t import *

# Bài 5 câu 4: hình vuông cạnh a
p = poly([(60, 20), (220, 20), (220, 180), (60, 180)])
p.append(text(36, 108, 'a', size=26, weight=700))
out('bai5_q4_hinhvuong', 250, 200, p)

# Bài 6 câu 1: các thẻ 100 000, 10 000, 1000 và hình tròn 100, 10, 1 xếp từ dưới lên trong từng cột
# của bảng hàng (mỗi cột một hình, đặt vào ô bảng như sách). Cùng chiều cao 5 thẻ để các cột thẳng hàng.
CARD = ['100 000', '10 000', '1000', '100', '10', '1']
SLOTS, ROW, W = 5, 40, 120


def stack(card, n):
    parts = []
    for k in range(n):
        cy = SLOTS * ROW + 4 - ROW / 2 - k * ROW
        if card in ('100 000', '10 000', '1000'):
            parts.append(f'<rect x="4" y="{cy - 16}" width="{W - 8}" height="32" rx="4" fill="#FFF3C4" stroke="{INK}" stroke-width="2.5"/>')
            parts.append(text(W / 2, cy + 7.5, card, size=21, weight=700))
        else:
            parts.append(f'<ellipse cx="{W / 2}" cy="{cy}" rx="38" ry="16" fill="#FDE2EC" stroke="{INK}" stroke-width="2.5"/>')
            parts.append(text(W / 2, cy + 7.5, card, size=21, weight=700))
    return parts


done = set()
for counts in ([3, 1, 3, 2, 1, 4], [5, 2, 3, 4, 5, 3]):
    for card, n in zip(CARD, counts):
        name = f"bai6_q1_the_{card.replace(' ', '')}_{n}"
        if name not in done:
            done.add(name)
            out(name, W, SLOTS * ROW + 8, stack(card, n))
