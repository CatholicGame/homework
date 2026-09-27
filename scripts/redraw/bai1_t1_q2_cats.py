"""
Vở BT Toán 2, Bài 1 Tiết 1 Q2 — "mèo câu cá": vẽ lại bằng nét riêng (không đồ theo sách).

Giữ đúng nội dung toán của sách: 4 chú mèo mang nhãn "… chục và … đơn vị", 4 con cá
dưới nước, dây câu chéo nhau (bé phải lần theo dây), cá mẫu ghi 24. Hình con vật,
màu sắc, bố cục chi tiết là của mình.

    python scripts/redraw/bai1_t1_q2_cats.py
    python scripts/embed-svg-fonts.py src/assets/grade2-workbook/bai1_t1_q2_cats.svg
"""
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / 'src/assets/grade2-workbook/bai1_t1_q2_cats.svg'
W, H = 900, 370
INK = '#3F3A40'
WATER_Y = 212

# cat centre x, label, fur, belly/face light, rod side (-1 left, +1 right), stripes
CATS = [
    (125, ('2 chục và', '4 đơn vị'), '#F2A65A', '#FBE3C4', -1, True),
    (345, ('4 chục và', '1 đơn vị'), '#A7B1BC', '#E8ECF0', +1, False),
    (570, ('6 chục và', '7 đơn vị'), '#EBC98F', '#FFF4DF', -1, False),
    (785, ('3 chục và', '2 đơn vị'), '#7C7F8C', '#F1F1F4', -1, False),
]
# fish centre, facing (+1 mouth to the right), body colour, fin colour, number (None = blank)
FISH = {
    'left':   (150, 300, +1, '#FFD166', '#F4A93B', None),
    'middle': (415, 322, -1, '#F7A1C4', '#E56B9F', None),
    'sample': (618, 318, +1, '#9ADBC5', '#4FB692', '24'),
    'right':  (795, 292, -1, '#B9A7F0', '#8E77DE', None),
}
# which fish each cat caught (the book's answer: 24 → mẫu, 41 → trái, 32 → giữa, 67 → phải)
LINES = [(0, 'sample'), (1, 'left'), (2, 'right'), (3, 'middle')]


def cat(cx, label, fur, light, side, stripes):
    base = WATER_Y - 14
    top = base - 100
    s = []
    # tail curling up behind the body, on the side away from the rod
    t = -side
    s.append(f'<path d="M{cx + t * 44},{base - 10} C{cx + t * 96},{base - 14} {cx + t * 100},{base - 70} {cx + t * 74},{base - 88}" '
             f'fill="none" stroke="{INK}" stroke-width="15" stroke-linecap="round"/>')
    s.append(f'<path d="M{cx + t * 44},{base - 10} C{cx + t * 96},{base - 14} {cx + t * 100},{base - 70} {cx + t * 74},{base - 88}" '
             f'fill="none" stroke="{fur}" stroke-width="10" stroke-linecap="round"/>')
    # body (a sitting pear shape)
    s.append(f'<path d="M{cx - 56},{base} C{cx - 64},{top + 40} {cx - 38},{top} {cx},{top} C{cx + 38},{top} {cx + 64},{top + 40} {cx + 56},{base} Z" '
             f'fill="{fur}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
    if stripes:
        for dx in (-40, 40):
            s.append(f'<path d="M{cx + dx},{top + 34} q{-dx * 0.15},8 0,16 M{cx + dx * 1.08},{top + 58} q{-dx * 0.15},8 0,16" fill="none" stroke="#D9803A" stroke-width="4" stroke-linecap="round"/>')
    # name tag on the chest, like a bib
    s.append(f'<rect x="{cx - 49}" y="{top + 30}" width="98" height="50" rx="12" fill="#fff" stroke="{INK}" stroke-width="1.6"/>')
    s.append(f'<text x="{cx}" y="{top + 51}" text-anchor="middle" font-family="Quicksand" font-weight="600" font-size="16.5" fill="{INK}">{label[0]}</text>')
    s.append(f'<text x="{cx}" y="{top + 71}" text-anchor="middle" font-family="Quicksand" font-weight="600" font-size="16.5" fill="{INK}">{label[1]}</text>')
    # front paws
    for dx in (-22, 22):
        s.append(f'<ellipse cx="{cx + dx}" cy="{base - 3}" rx="15" ry="8" fill="{light}" stroke="{INK}" stroke-width="2"/>')
    # rod held in a raised paw
    px, py = cx + side * 62, top + 40
    tip = (cx + side * 96, top - 36)
    s.append(f'<line x1="{px - side * 6}" y1="{py + 12}" x2="{tip[0]}" y2="{tip[1]}" stroke="#8A5A33" stroke-width="5" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{px}" cy="{py}" rx="12" ry="11" fill="{light}" stroke="{INK}" stroke-width="2"/>')
    # head
    hy = top - 20
    for sx in (-1, 1):
        s.append(f'<path d="M{cx + sx * 36},{hy - 12} L{cx + sx * 33},{hy - 52} L{cx + sx * 8},{hy - 34} Z" fill="{fur}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
        s.append(f'<path d="M{cx + sx * 30},{hy - 18} L{cx + sx * 29},{hy - 40} L{cx + sx * 15},{hy - 30} Z" fill="#F6B5C0"/>')
    s.append(f'<ellipse cx="{cx}" cy="{hy}" rx="42" ry="36" fill="{fur}" stroke="{INK}" stroke-width="2.5"/>')
    s.append(f'<ellipse cx="{cx}" cy="{hy + 14}" rx="24" ry="15" fill="{light}"/>')
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{cx + sx * 15}" cy="{hy - 4}" rx="5.5" ry="7" fill="{INK}"/><circle cx="{cx + sx * 15 + 2}" cy="{hy - 7}" r="2" fill="#fff"/>')
        s.append(f'<circle cx="{cx + sx * 26}" cy="{hy + 10}" r="6" fill="#F6A3B4" opacity=".7"/>')
        for dy in (-3, 5):
            s.append(f'<line x1="{cx + sx * 20}" y1="{hy + 10 + dy * 0.3}" x2="{cx + sx * 50}" y2="{hy + 6 + dy}" stroke="{INK}" stroke-width="1.4" stroke-linecap="round"/>')
    s.append(f'<path d="M{cx - 5},{hy + 6} L{cx + 5},{hy + 6} L{cx},{hy + 11} Z" fill="#E77A93"/>')
    s.append(f'<path d="M{cx - 8},{hy + 15} q4,5 8,0 q4,5 8,0" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>')
    return '\n'.join(s), tip


def fish(fx, fy, d, body, fin, num):
    s = []
    # tail
    tx = fx - d * 52
    s.append(f'<path d="M{tx + d * 6},{fy} L{tx - d * 30},{fy - 26} Q{tx - d * 20},{fy} {tx - d * 30},{fy + 26} Z" fill="{fin}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    # top fin
    s.append(f'<path d="M{fx - d * 22},{fy - 26} Q{fx - d * 4},{fy - 50} {fx + d * 18},{fy - 27} Z" fill="{fin}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    # body
    s.append(f'<ellipse cx="{fx}" cy="{fy}" rx="56" ry="31" fill="{body}" stroke="{INK}" stroke-width="2.2"/>')
    # scales, a few arcs at the back
    for k in range(2):
        s.append(f'<path d="M{fx - d * (34 - k * 10)},{fy - 12} q{d * 7},12 0,24" fill="none" stroke="{fin}" stroke-width="2"/>')
    # eye and smile near the mouth
    s.append(f'<circle cx="{fx + d * 36}" cy="{fy - 8}" r="6" fill="#fff" stroke="{INK}" stroke-width="1.6"/><circle cx="{fx + d * 37}" cy="{fy - 8}" r="3" fill="{INK}"/>')
    s.append(f'<path d="M{fx + d * 44},{fy + 8} q{d * 6},3 {d * 10},-2" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
    # the number circle
    ncx = fx - d * 4
    s.append(f'<circle cx="{ncx}" cy="{fy + 2}" r="21" fill="#fff" stroke="{INK}" stroke-width="1.8"/>')
    if num:
        s.append(f'<text x="{ncx}" y="{fy + 9}" text-anchor="middle" font-family="Quicksand" font-weight="700" font-size="20" fill="{INK}">{num}</text>')
    mouth = (fx + d * 56, fy + 4)
    return '\n'.join(s), mouth


def seaweed(x, h, c):
    y = H - 6
    return (f'<path d="M{x},{y} C{x - 16},{y - h * 0.35} {x + 16},{y - h * 0.6} {x - 4},{y - h}" fill="none" stroke="{c}" stroke-width="9" stroke-linecap="round"/>'
            f'<path d="M{x + 14},{y} C{x + 30},{y - h * 0.3} {x},{y - h * 0.5} {x + 18},{y - h * 0.75}" fill="none" stroke="{c}" stroke-width="7" stroke-linecap="round" opacity=".8"/>')


def main():
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">']
    parts.append('<defs><linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE6F7"/><stop offset="1" stop-color="#7CC6E8"/></linearGradient></defs>')
    # pool edge the cats sit on, then the water
    parts.append(f'<rect x="0" y="{WATER_Y - 16}" width="{W}" height="20" rx="6" fill="#E3D7C3"/>')
    wave = f'M0,{WATER_Y + 4} ' + ' '.join(f'q{22},{-8} {45},0 t45,0' for _ in range(W // 90 + 1)) + f' V{H} H0 Z'
    parts.append(f'<path d="{wave}" fill="url(#water)"/>')
    for x, h, c in [(285, 70, '#4CAF7D'), (520, 58, '#3E9E6E'), (705, 66, '#57B887'), (880, 60, '#3E9E6E'), (40, 52, '#57B887')]:
        parts.append(seaweed(x, h, c))
    for bx, by, r in [(250, 262, 5), (262, 246, 3.5), (505, 280, 4), (700, 250, 5), (712, 236, 3), (880, 250, 4), (60, 270, 4)]:
        parts.append(f'<circle cx="{bx}" cy="{by}" r="{r}" fill="#fff" fill-opacity=".55" stroke="#fff" stroke-width="1.2"/>')

    fish_svg, mouths = [], {}
    for key, (fx, fy, d, body, fin, num) in FISH.items():
        svg, mouth = fish(fx, fy, d, body, fin, num)
        fish_svg.append(svg)
        mouths[key] = (mouth, d)

    cat_svg, tips = [], []
    for c in CATS:
        svg, tip = cat(*c)
        cat_svg.append(svg)
        tips.append(tip)

    parts.extend(cat_svg)
    parts.extend(fish_svg)
    # fishing lines last, over everything, from each rod tip to its fish's mouth
    for ci, key in LINES:
        (tx, ty), ((mx, my), d) = tips[ci], mouths[key]
        # hang straight down to the water, then wander over to the fish's mouth
        wy = WATER_Y + 18
        parts.append(f'<path d="M{tx},{ty} L{tx},{wy} C{tx},{wy + 45} {mx + d * 40},{my - 70} {mx},{my}" fill="none" stroke="#2F2A30" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>')
        parts.append(f'<path d="M{mx - 5},{my - 6} q5,10 10,2" fill="none" stroke="#2F2A30" stroke-width="2" stroke-linecap="round"/>')
    parts.append('</svg>')
    OUT.write_text('\n'.join(parts), encoding='utf-8')
    print('wrote', OUT)


main()
