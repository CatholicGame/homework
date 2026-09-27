"""
Bộ vẽ đồ đựng chất lỏng (bài Lít) — nét riêng, phẳng, viền INK, dùng lại cho các lô sau.

    import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
    from kit_liquid import *

Quy ước chung cho mọi hàm vẽ đồ vật:
  * (cx, by) = tâm ngang và ĐÁY của đồ vật; w, h = rộng, cao thân (không tính quai/vòi).
  * level = mức nước 0..1 tính theo chiều cao thân (0 = rỗng, 1 = đầy miệng); None = không vẽ nước.
  * label = chuỗi nhãn đã dựng sẵn (thường là litre(n)), vẽ giữa thân; None = không nhãn.
  * trả về list chuỗi SVG — nối vào `parts`.
  * nước được cắt theo đúng hình thân bằng <clipPath>; id tự sinh, có tiền tố theo tên script
    nên không trùng giữa các file (gọi uid() nếu cần id riêng).

Hàm:
  litre(n)                 -> '3 <tspan italic>l</tspan>' (ký hiệu lít nghiêng như sách)
  litre_text(x, y, n, ...) -> <text> hoàn chỉnh cho nhãn lít
  litre_unit()             -> chỉ chữ l nghiêng
  answer_box(x, y, ...)    ô trả lời bo góc (+ số mẫu) + chữ l
  tumbler(...)             cốc thủy tinh miệng loe (cốc uống nước)
  beaker(...)              cốc/bình trụ thẳng có vành (bình đong)
  measuring_jug(...)       ca có vòi rót bên trái, quai bên phải (ca 1 l, 2 l, 3 l ...)
  pitcher(...)             bình nắp tròn, quai phải, đế có gờ (bình nước 5 l)
  jerrycan(...)            can nhựa: quai lỗ bên trái trên, nắp vặn góc phải trên, ô nhãn
  bucket(...)              xô miệng loe có quai xách (quai trước / dựng lên)
  kettle(...)              ấm đun nước: thân tròn, vòi trái, quai trên
  stream(x1, y1, x2, y2)   dòng nước rót (đường cong nhỏ dần)
  rotate(parts, deg, cx, cy) bọc nhóm trong transform rotate
  rot_pt(x, y, deg, cx, cy)  toạ độ điểm sau khi xoay (để tìm miệng vòi khi rót)
"""
import math
import os
import sys

from common import INK, WATER_L, WATER_D, WHITE, text

_PREFIX = os.path.splitext(os.path.basename(sys.argv[0] or 'kit'))[0].replace('.', '_') or 'kit'
_n = [0]

GLASS = '#EEF7FC'        # thủy tinh / nhựa trong
GLASS_EDGE = '#FFFFFF'
SW = 3                   # nét viền mặc định


def uid(tag='k'):
    """id duy nhất trong file SVG (tiền tố = tên script)."""
    _n[0] += 1
    return f'{_PREFIX}_{tag}{_n[0]}'


def litre(n):
    """Nội dung nhãn 'n l' với chữ l nghiêng (như ký hiệu lít trong sách).

    Chữ l dùng font serif hệ thống (Georgia/Times, có sẵn trên Windows/macOS/iOS/Android)
    vì chữ l của Quicksand chỉ là một nét thẳng — nghiêng đi trông như dấu "/"."""
    return (f'{n}<tspan dx=".28em" font-family="Georgia, Times New Roman, Times, serif" font-style="italic" '
            f'font-weight="400">l</tspan>')


def litre_unit():
    """Chỉ ký hiệu l nghiêng (vd. đặt sau ô trống: [ ] l)."""
    return ('<tspan font-family="Georgia, Times New Roman, Times, serif" font-style="italic" '
            'font-weight="400">l</tspan>')


def answer_box(x, y, w=40, h=44, value=None, size=26, unit=True, sw=2.6):
    """Ô trả lời bo góc (góc trái trên x, y), có thể ghi sẵn số mẫu, kèm chữ l nghiêng bên phải."""
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="9" fill="{WHITE}" stroke="{INK}" stroke-width="{sw}"/>']
    if value is not None:
        out.append(text(x + w / 2, y + h / 2 + size * .36, value, size=size, weight=600))
    if unit:
        out.append(text(x + w + 14, y + h / 2 + size * .36, litre_unit(), size=size + 2, anchor='start'))
    return out


def litre_text(x, y, n, size=24, weight=600, fill=INK, anchor='middle'):
    return text(x, y, litre(n), size=size, weight=weight, fill=fill, anchor=anchor)


def _water(body_d, top, bottom, level, left, right, fill=WATER_L, line=WATER_D, sw=SW):
    """Nước trong thân `body_d` (path), mặt nước ở top + (1-level)*(bottom-top)."""
    if level is None or level <= 0:
        return []
    cid = uid('clip')
    y = bottom - level * (bottom - top)
    out = [f'<clipPath id="{cid}"><path d="{body_d}"/></clipPath>',
           f'<g clip-path="url(#{cid})">'
           f'<rect x="{left - 5}" y="{y:.1f}" width="{right - left + 10}" height="{bottom - y + 5:.1f}" fill="{fill}"/>'
           f'<rect x="{left - 5}" y="{y:.1f}" width="{right - left + 10}" height="5" fill="{WATER_D}" opacity=".45"/>'
           f'<line x1="{left - 5}" y1="{y:.1f}" x2="{right + 5}" y2="{y:.1f}" stroke="{line}" stroke-width="{sw * .8:.1f}"/>'
           f'</g>']
    return out


def _label(cx, cy, label, size):
    if label is None:
        return []
    return [text(cx, cy + size * .36, label, size=size, weight=600)]


def _shine(x, y1, y2, sw=SW):
    return [f'<line x1="{x:.1f}" y1="{y1:.1f}" x2="{x:.1f}" y2="{y2:.1f}" stroke="{GLASS_EDGE}" '
            f'stroke-width="{sw * 1.6:.1f}" stroke-linecap="round" opacity=".85"/>']


# ─────────────────────────────────────────────────────────────── cốc
def tumbler(cx, by, w, h, level=.8, label=None, size=None, body=GLASS, sw=SW):
    """Cốc thủy tinh miệng loe: miệng rộng w, đáy 0.78w, góc đáy bo tròn, vành miệng dày."""
    tw, bw = w / 2, w * .39
    top = by - h
    r = min(10, h * .15)
    d = (f'M{cx - tw:.1f},{top:.1f} L{cx - bw:.1f},{by - r:.1f} Q{cx - bw:.1f},{by:.1f} {cx - bw + r:.1f},{by:.1f} '
         f'L{cx + bw - r:.1f},{by:.1f} Q{cx + bw:.1f},{by:.1f} {cx + bw:.1f},{by - r:.1f} L{cx + tw:.1f},{top:.1f} Z')
    out = [f'<path d="{d}" fill="{body}"/>']
    out += _water(d, top, by, level, cx - tw, cx + tw, sw=sw)
    out += _shine(cx - tw * .55, top + h * .22, by - h * .25, sw)
    out.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    out.append(f'<line x1="{cx - tw - 1:.1f}" y1="{top + sw * .3:.1f}" x2="{cx + tw + 1:.1f}" y2="{top + sw * .3:.1f}" '
               f'stroke="{INK}" stroke-width="{sw * 1.5:.1f}" stroke-linecap="round"/>')
    out += _label(cx, top + h * .55, label, size or h * .32)
    return out


def beaker(cx, by, w, h, level=.8, label=None, size=None, body=GLASS, sw=SW):
    """Cốc/bình trụ thẳng (thành đứng), đáy bo, vành miệng nhô ra hai bên."""
    x0, x1, top = cx - w / 2, cx + w / 2, by - h
    r = min(14, w * .18)
    d = (f'M{x0:.1f},{top:.1f} L{x0:.1f},{by - r:.1f} Q{x0:.1f},{by:.1f} {x0 + r:.1f},{by:.1f} '
         f'L{x1 - r:.1f},{by:.1f} Q{x1:.1f},{by:.1f} {x1:.1f},{by - r:.1f} L{x1:.1f},{top:.1f} Z')
    out = [f'<path d="{d}" fill="{body}"/>']
    out += _water(d, top, by, level, x0, x1, sw=sw)
    out += _shine(x0 + w * .16, top + h * .12, by - h * .15, sw)
    out.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    lip = max(4, w * .06)
    out.append(f'<rect x="{x0 - lip:.1f}" y="{top - 4:.1f}" width="{w + 2 * lip:.1f}" height="9" rx="4.5" '
               f'fill="{WHITE}" stroke="{INK}" stroke-width="{sw}"/>')
    out += _label(cx, top + h * .55, label, size or min(w * .42, h * .3))
    return out


# ─────────────────────────────────────────────────────────────── ca
def measuring_jug(cx, by, w, h, level=.85, label=None, size=None, body=GLASS, sw=SW, ticks=True):
    """Ca đong: thân hơi thon lên, vòi nhọn trên trái, quai chữ D bên phải."""
    x0, x1, top = cx - w / 2, cx + w / 2, by - h
    ins = w * .05                          # miệng hẹp hơn đáy một chút
    r = min(12, w * .16)
    d = (f'M{x0 + ins:.1f},{top:.1f} L{x0:.1f},{by - r:.1f} Q{x0:.1f},{by:.1f} {x0 + r:.1f},{by:.1f} '
         f'L{x1 - r:.1f},{by:.1f} Q{x1:.1f},{by:.1f} {x1:.1f},{by - r:.1f} L{x1 - ins:.1f},{top:.1f} Z')
    hw = w * .30                           # quai
    out = [f'<path d="M{x1 - ins * .6:.1f},{top + h * .14:.1f} C{x1 + hw:.1f},{top + h * .1:.1f} {x1 + hw:.1f},{by - h * .3:.1f} {x1 - 1:.1f},{by - h * .28:.1f}" '
           f'fill="none" stroke="{INK}" stroke-width="{sw * 3.3:.1f}" stroke-linecap="round"/>',
           f'<path d="M{x1 - ins * .6:.1f},{top + h * .14:.1f} C{x1 + hw:.1f},{top + h * .1:.1f} {x1 + hw:.1f},{by - h * .3:.1f} {x1 - 1:.1f},{by - h * .28:.1f}" '
           f'fill="none" stroke="{body}" stroke-width="{sw * 1.3:.1f}" stroke-linecap="round"/>',
           f'<path d="{d}" fill="{body}"/>']
    out += _water(d, top, by, level, x0, x1, sw=sw)
    if ticks:
        for k in (1, 2, 3):
            ty = by - h * (.18 + .18 * k)
            out.append(f'<line x1="{x1 - w * .2:.1f}" y1="{ty:.1f}" x2="{x1 - ins - 1:.1f}" y2="{ty:.1f}" stroke="{INK}" stroke-width="{sw * .6:.1f}" stroke-linecap="round" opacity=".55"/>')
    out.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    # vành miệng + vòi rót nhọn bên trái (miếng tam giác đầy, viền đậm)
    sp = w * .2
    lx = x0 + ins
    out.append(f'<path d="M{lx + .5:.1f},{top + h * .16:.1f} Q{lx - sp * .35:.1f},{top + h * .03:.1f} {lx - sp:.1f},{top - h * .09:.1f} '
               f'Q{lx + sp * .2:.1f},{top - h * .03:.1f} {lx + sp * 1.3:.1f},{top:.1f} Z" '
               f'fill="{body}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    out.append(f'<line x1="{lx + sp * 1.2:.1f}" y1="{top:.1f}" x2="{x1 - ins + 1:.1f}" y2="{top:.1f}" '
               f'stroke="{INK}" stroke-width="{sw * 1.5:.1f}" stroke-linecap="round"/>')
    out += _label(cx - w * .04, top + h * .55, label, size or min(w * .36, h * .36))
    return out


def pitcher(cx, by, w, h, level=None, label=None, size=None, body=GLASS, lid=WHITE, sw=SW, base=True):
    """Bình nước: thân cao thon nhẹ, nắp tròn có núm, vòi nhỏ trái, quai phải, đế có gờ."""
    x0, x1, top = cx - w / 2, cx + w / 2, by - h
    bh = h * .14 if base else 0            # đế
    bt = by - bh
    ins = w * .06
    d = (f'M{x0:.1f},{top + h * .08:.1f} L{x0 + ins:.1f},{bt:.1f} L{x1 - ins:.1f},{bt:.1f} L{x1:.1f},{top + h * .08:.1f} Z')
    hw = w * .32
    out = [f'<path d="M{x1 - 2:.1f},{top + h * .16:.1f} L{x1 + hw:.1f},{top + h * .2:.1f} L{x1 + hw * .8:.1f},{bt - h * .2:.1f} L{x1 - ins:.1f},{bt - h * .12:.1f}" '
           f'fill="none" stroke="{INK}" stroke-width="{sw * 3.3:.1f}" stroke-linecap="round" stroke-linejoin="round"/>',
           f'<path d="M{x1 - 2:.1f},{top + h * .16:.1f} L{x1 + hw:.1f},{top + h * .2:.1f} L{x1 + hw * .8:.1f},{bt - h * .2:.1f} L{x1 - ins:.1f},{bt - h * .12:.1f}" '
           f'fill="none" stroke="{body}" stroke-width="{sw * 1.3:.1f}" stroke-linecap="round" stroke-linejoin="round"/>',
           f'<path d="{d}" fill="{body}"/>']
    out += _water(d, top + h * .08, bt, level, x0, x1, sw=sw)
    out += _shine(x0 + w * .17, top + h * .22, bt - h * .12, sw)
    out.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    if base:
        out.append(f'<rect x="{x0 + ins - 2:.1f}" y="{bt:.1f}" width="{w - 2 * ins + 4:.1f}" height="{bh:.1f}" rx="{bh * .35:.1f}" '
                   f'fill="{lid}" stroke="{INK}" stroke-width="{sw}"/>')
        n = max(3, int(w / 14))
        for k in range(1, n):
            gx = x0 + ins + (w - 2 * ins) * k / n
            out.append(f'<line x1="{gx:.1f}" y1="{bt + 3:.1f}" x2="{gx:.1f}" y2="{by - 3:.1f}" stroke="{INK}" stroke-width="{sw * .7:.1f}"/>')
    # nắp: dải + vòm + núm; vòi nhỏ bên trái
    out.append(f'<path d="M{x0 - w * .12:.1f},{top + h * .02:.1f} L{x0 + 2:.1f},{top + h * .1:.1f} L{x0 + 4:.1f},{top + h * .02:.1f} Z" '
               f'fill="{lid}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    out.append(f'<rect x="{x0 - 2:.1f}" y="{top:.1f}" width="{w + 4:.1f}" height="{h * .1:.1f}" rx="{h * .04:.1f}" '
               f'fill="{lid}" stroke="{INK}" stroke-width="{sw}"/>')
    out.append(f'<path d="M{x0 + w * .12:.1f},{top + 1:.1f} Q{cx:.1f},{top - h * .1:.1f} {x1 - w * .12:.1f},{top + 1:.1f} Z" '
               f'fill="{lid}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    out.append(f'<circle cx="{cx:.1f}" cy="{top - h * .06:.1f}" r="{max(3, w * .05):.1f}" fill="{lid}" stroke="{INK}" stroke-width="{sw}"/>')
    out += _label(cx, top + h * .1 + (bt - top - h * .1) * .5, label, size or min(w * .36, h * .28))
    return out


# ─────────────────────────────────────────────────────────────── can
def jerrycan(cx, by, w, h, label=None, size=None, body='#8FD0F2', panel='#D8F0FC', sw=SW, level=None):
    """Can nhựa: thân chữ nhật bo góc, góc phải trên vát có nắp vặn, lỗ quai bên trái trên,
    ô nhãn lõm ở giữa. level (0..1) nếu muốn thấy mức nước trong ô nhãn."""
    x0, x1, top = cx - w / 2, cx + w / 2, by - h
    r = min(w, h) * .1
    cut = w * .22
    d = (f'M{x0 + r:.1f},{top:.1f} L{x1 - cut:.1f},{top:.1f} L{x1:.1f},{top + cut:.1f} L{x1:.1f},{by - r:.1f} '
         f'Q{x1:.1f},{by:.1f} {x1 - r:.1f},{by:.1f} L{x0 + r:.1f},{by:.1f} Q{x0:.1f},{by:.1f} {x0:.1f},{by - r:.1f} '
         f'L{x0:.1f},{top + r:.1f} Q{x0:.1f},{top:.1f} {x0 + r:.1f},{top:.1f} Z')
    # nắp vặn (hình trụ nghiêng) ở góc vát
    ccx, ccy = x1 - cut * .42, top + cut * .42
    cr = w * .09
    out = [f'<g transform="rotate(45 {ccx:.1f} {ccy:.1f})">'
           f'<rect x="{ccx - cr:.1f}" y="{ccy - cr * 1.9:.1f}" width="{cr * 2:.1f}" height="{cr * 1.9:.1f}" rx="{cr * .35:.1f}" fill="{panel}" stroke="{INK}" stroke-width="{sw}"/>'
           + ''.join(f'<line x1="{ccx - cr + cr * .5 * k:.1f}" y1="{ccy - cr * 1.7:.1f}" x2="{ccx - cr + cr * .5 * k:.1f}" y2="{ccy - cr * .3:.1f}" stroke="{INK}" stroke-width="{sw * .6:.1f}"/>' for k in (1, 2, 3))
           + '</g>',
           f'<path d="{d}" fill="{body}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>']
    # lỗ quai
    hx, hy, hwid, hh = x0 + w * .12, top + h * .07, w * .36, h * .08
    out.append(f'<rect x="{hx:.1f}" y="{hy:.1f}" width="{hwid:.1f}" height="{hh:.1f}" rx="{hh / 2:.1f}" fill="{WHITE}" stroke="{INK}" stroke-width="{sw}"/>')
    # ô nhãn
    px0, py0, px1, py1 = x0 + w * .13, top + h * .24, x1 - w * .13, by - h * .09
    pr = min(w, h) * .07
    pd = (f'M{px0 + pr:.1f},{py0:.1f} L{px1 - pr:.1f},{py0:.1f} Q{px1:.1f},{py0:.1f} {px1:.1f},{py0 + pr:.1f} L{px1:.1f},{py1 - pr:.1f} '
          f'Q{px1:.1f},{py1:.1f} {px1 - pr:.1f},{py1:.1f} L{px0 + pr:.1f},{py1:.1f} Q{px0:.1f},{py1:.1f} {px0:.1f},{py1 - pr:.1f} '
          f'L{px0:.1f},{py0 + pr:.1f} Q{px0:.1f},{py0:.1f} {px0 + pr:.1f},{py0:.1f} Z')
    out.append(f'<path d="{pd}" fill="{panel}"/>')
    out += _water(pd, py0, py1, level, px0, px1, sw=sw)
    out.append(f'<path d="{pd}" fill="none" stroke="{INK}" stroke-width="{sw * .8:.1f}"/>')
    out += _shine(px0 + (px1 - px0) * .12, py0 + (py1 - py0) * .12, py0 + (py1 - py0) * .4, sw * .8)
    out += _label((px0 + px1) / 2, (py0 + py1) / 2, label, size or min(w * .3, h * .22))
    return out


def jerrycan_spout(cx, by, w, h):
    """Toạ độ (x, y) đầu nắp vặn của jerrycan() cùng tham số (chưa xoay) — nơi nước chảy ra."""
    x1, top = cx + w / 2, by - h
    cut = w * .22
    ccx, ccy = x1 - cut * .42, top + cut * .42
    k = w * .09 * 1.9 / math.sqrt(2)
    return ccx + k, ccy - k


# ─────────────────────────────────────────────────────────────── xô
def bucket(cx, by, w, h, level=None, label=None, size=None, body='#C9D3DC', inside='#9FB0BE',
           handle='front', grip=None, sw=SW):
    """Xô: miệng rộng w (elip), đáy 0.76w, có quai xách. level: 1 = nước đầy tới miệng
    (thấy mặt nước xanh trong elip miệng); None/0 = thấy lòng xô.
    handle: 'front' = quai buông cong ra phía trước (trên nhãn), 'up' = quai dựng lên, None.
    grip: màu tay cầm trên quai (mặc định = YELLOW)."""
    tw, bw = w / 2, w * .38
    top = by - h
    ry = w * .09
    d = (f'M{cx - tw:.1f},{top:.1f} L{cx - bw:.1f},{by - 6:.1f} Q{cx:.1f},{by + 6:.1f} {cx + bw:.1f},{by - 6:.1f} '
         f'L{cx + tw:.1f},{top:.1f} Z')
    out = []
    # quai: móc hai bên, cung xuống phía trước (hoặc dựng lên)
    lx, rx, hy = cx - tw * .93, cx + tw * .93, top + h * .2
    grip = grip or '#FFD166'
    gw, gh = w * .2, max(8, w * .05)

    def bail(y_mid):
        py = 2 * y_mid - hy                     # quadratic control so the curve passes y_mid
        return [f'<path d="M{lx:.1f},{hy:.1f} Q{cx:.1f},{py:.1f} {rx:.1f},{hy:.1f}" fill="none" stroke="{INK}" '
                f'stroke-width="{sw * 1.3:.1f}" stroke-linecap="round"/>',
                f'<rect x="{cx - gw / 2:.1f}" y="{y_mid - gh / 2:.1f}" width="{gw:.1f}" height="{gh:.1f}" rx="{gh / 2:.1f}" '
                f'fill="{grip}" stroke="{INK}" stroke-width="{sw * .8:.1f}"/>']
    if handle == 'up':
        out += bail(top - h * .42)
    out.append(f'<path d="{d}" fill="{body}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    out.append(f'<path d="M{cx - tw * .96:.1f},{top + h * .1:.1f} Q{cx:.1f},{top + h * .1 + ry * 1.6:.1f} {cx + tw * .96:.1f},{top + h * .1:.1f}" '
               f'fill="none" stroke="{INK}" stroke-width="{sw * .7:.1f}" opacity=".6"/>')
    out += _shine(cx - tw * .62, top + h * .25, by - h * .2, sw)
    # miệng xô
    if level:
        out.append(f'<ellipse cx="{cx:.1f}" cy="{top:.1f}" rx="{tw:.1f}" ry="{ry:.1f}" fill="{WATER_L}" stroke="{INK}" stroke-width="{sw}"/>')
        out.append(f'<ellipse cx="{cx:.1f}" cy="{top + ry * .25:.1f}" rx="{tw * .72:.1f}" ry="{ry * .45:.1f}" fill="none" stroke="{WHITE}" stroke-width="{sw * .8:.1f}" opacity=".8"/>')
    else:
        out.append(f'<ellipse cx="{cx:.1f}" cy="{top:.1f}" rx="{tw:.1f}" ry="{ry:.1f}" fill="{inside}" stroke="{INK}" stroke-width="{sw}"/>')
    out.append(f'<ellipse cx="{cx:.1f}" cy="{top:.1f}" rx="{tw + 2:.1f}" ry="{ry + 2:.1f}" fill="none" stroke="{INK}" stroke-width="{sw * 1.6:.1f}"/>')
    # tai móc
    for x in (lx, rx):
        out.append(f'<circle cx="{x:.1f}" cy="{hy:.1f}" r="{max(3.5, w * .025):.1f}" fill="{body}" stroke="{INK}" stroke-width="{sw * .8:.1f}"/>')
    if handle == 'front':
        out += bail(top + h * .36)
    out += _label(cx, top + h * .64, label, size or min(w * .22, h * .26))
    return out


# ─────────────────────────────────────────────────────────────── ấm
def kettle(cx, by, w, h, body='#E3E8EE', accent='#6FB7EA', sw=SW):
    """Ấm đun nước: thân bầu (w×h), vòi cong bên trái, quai cong phía trên, nắp có núm."""
    x0, x1, top = cx - w / 2, cx + w / 2, by - h
    d = (f'M{x0 + w * .12:.1f},{by:.1f} Q{x0 - w * .02:.1f},{by - h * .05:.1f} {x0 + w * .02:.1f},{by - h * .4:.1f} '
         f'Q{x0 + w * .1:.1f},{top + h * .08:.1f} {cx:.1f},{top + h * .06:.1f} '
         f'Q{x1 - w * .1:.1f},{top + h * .08:.1f} {x1 - w * .02:.1f},{by - h * .4:.1f} '
         f'Q{x1 + w * .02:.1f},{by - h * .05:.1f} {x1 - w * .12:.1f},{by:.1f} Z')
    out = [
        # quai
        f'<path d="M{x0 + w * .22:.1f},{top + h * .14:.1f} L{x0 + w * .26:.1f},{top - h * .3:.1f} Q{cx:.1f},{top - h * .42:.1f} {x1 - w * .26:.1f},{top - h * .3:.1f} L{x1 - w * .22:.1f},{top + h * .14:.1f}" '
        f'fill="none" stroke="{INK}" stroke-width="{sw * 3.6:.1f}" stroke-linecap="round" stroke-linejoin="round"/>',
        f'<path d="M{x0 + w * .22:.1f},{top + h * .14:.1f} L{x0 + w * .26:.1f},{top - h * .3:.1f} Q{cx:.1f},{top - h * .42:.1f} {x1 - w * .26:.1f},{top - h * .3:.1f} L{x1 - w * .22:.1f},{top + h * .14:.1f}" '
        f'fill="none" stroke="{accent}" stroke-width="{sw * 1.6:.1f}" stroke-linecap="round" stroke-linejoin="round"/>',
        # vòi: ống cong vươn lên bên trái (nét INK dày + lòng màu thân)
        f'<path d="M{x0 + w * .14:.1f},{by - h * .36:.1f} Q{x0 - w * .06:.1f},{by - h * .36:.1f} {x0 - w * .2:.1f},{top + h * .2:.1f}" '
        f'fill="none" stroke="{INK}" stroke-width="{sw + w * .1:.1f}" stroke-linecap="round"/>',
        f'<path d="M{x0 + w * .14:.1f},{by - h * .36:.1f} Q{x0 - w * .06:.1f},{by - h * .36:.1f} {x0 - w * .2:.1f},{top + h * .2:.1f}" '
        f'fill="none" stroke="{body}" stroke-width="{w * .1 - sw:.1f}" stroke-linecap="round"/>',
        f'<path d="{d}" fill="{body}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>',
    ]
    out += _shine(x0 + w * .18, by - h * .62, by - h * .3, sw)
    # nắp
    out.append(f'<ellipse cx="{cx:.1f}" cy="{top + h * .08:.1f}" rx="{w * .22:.1f}" ry="{h * .07:.1f}" fill="{accent}" stroke="{INK}" stroke-width="{sw}"/>')
    out.append(f'<path d="M{cx - w * .06:.1f},{top + h * .06:.1f} Q{cx:.1f},{top - h * .1:.1f} {cx + w * .06:.1f},{top + h * .06:.1f} Z" '
               f'fill="{accent}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    return out


# ─────────────────────────────────────────────────────────────── dòng nước, xoay
def stream(x1, y1, x2, y2, w1=10, w2=6, bend=0.0, fill=WATER_L, sw=SW * .7):
    """Dòng nước rót từ (x1,y1) xuống (x2,y2), rộng w1 ở đầu, w2 ở cuối, cong ngang `bend` px."""
    mx, my = (x1 + x2) / 2 + bend, (y1 + y2) / 2
    d = (f'M{x1 - w1 / 2:.1f},{y1:.1f} Q{mx - (w1 + w2) / 4:.1f},{my:.1f} {x2 - w2 / 2:.1f},{y2:.1f} '
         f'L{x2 + w2 / 2:.1f},{y2:.1f} Q{mx + (w1 + w2) / 4:.1f},{my:.1f} {x1 + w1 / 2:.1f},{y1:.1f} Z')
    return [f'<path d="{d}" fill="{fill}" stroke="{WATER_D}" stroke-width="{sw:.1f}" stroke-linejoin="round"/>',
            f'<path d="M{x1:.1f},{y1 + 3:.1f} Q{mx:.1f},{my:.1f} {x2:.1f},{y2 - 3:.1f}" fill="none" stroke="{WHITE}" stroke-width="{max(1.5, w2 * .25):.1f}" stroke-linecap="round" opacity=".8"/>']


def rotate(parts, deg, cx, cy):
    return [f'<g transform="rotate({deg} {cx:.1f} {cy:.1f})">'] + list(parts) + ['</g>']


def rot_pt(x, y, deg, cx, cy):
    a = math.radians(deg)
    dx, dy = x - cx, y - cy
    return cx + dx * math.cos(a) - dy * math.sin(a), cy + dx * math.sin(a) + dy * math.cos(a)
