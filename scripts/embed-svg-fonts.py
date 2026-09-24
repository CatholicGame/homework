"""
Nhúng font Quicksand (chỉ các chữ cần dùng) vào hình SVG vẽ lại từ sách.

Hình câu hỏi hiện bằng <img src="….svg">, mà SVG trong <img> không tải được font của
trang — nên mỗi file tự mang một bản font rút gọn (woff2, base64, vài KB) theo đúng
các ký tự và độ đậm (font-weight) nó dùng. Chạy lại được nhiều lần: khối font cũ bị thay.

    python scripts/embed-svg-fonts.py src/assets/grade3-workbook/*.svg src/assets/grade3-practice/*.svg

Font: scripts/fonts/Quicksand-VariableFont_wght.ttf (SIL OFL, xem scripts/fonts/OFL.txt).
"""
import base64
import io
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

FONT = Path(__file__).parent / 'fonts' / 'Quicksand-VariableFont_wght.ttf'
SVG_NS = 'http://www.w3.org/2000/svg'
MARK_START, MARK_END = '<!--embedded-font-->', '<!--/embedded-font-->'
_instances = {}


def instance(weight):
    if weight not in _instances:
        _instances[weight] = instancer.instantiateVariableFont(TTFont(FONT), {'wght': weight})
    return _instances[weight]


def woff2_b64(weight, chars):
    buf = io.BytesIO()
    instance(weight).save(buf)
    buf.seek(0)
    font = TTFont(buf)
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['kern', 'liga', 'ccmp', 'mark', 'mkmk']
    sub = subset.Subsetter(opts)
    sub.populate(text=''.join(sorted(chars)))
    sub.subset(font)
    out = io.BytesIO()
    font.flavor = 'woff2'
    font.save(out)
    return base64.b64encode(out.getvalue()).decode('ascii')


def text_usage(svg_text):
    """{weight: set(chars)} cho mọi <text>/<tspan> (độ đậm kế thừa từ phần tử cha)."""
    root = ET.fromstring(svg_text)
    usage = {}

    def walk(el, weight):
        w = el.get('font-weight') or re.search(r'font-weight:\s*(\d+)', el.get('style', '') or '')
        if hasattr(w, 'group'):
            w = w.group(1)
        weight = {'normal': 400, 'bold': 700}.get(w, int(w)) if w else weight
        tag = el.tag.split('}')[-1]
        if tag in ('text', 'tspan'):
            chars = (el.text or '')
            usage.setdefault(weight, set()).update(c for c in chars if not c.isspace())
        for child in el:
            walk(child, weight)
            if tag in ('text', 'tspan') and child.tail:
                usage.setdefault(weight, set()).update(c for c in child.tail if not c.isspace())

    walk(root, 400)
    return {w: c for w, c in usage.items() if c}


def process(path):
    src = Path(path).read_text(encoding='utf-8')
    src = re.sub(re.escape(MARK_START) + r'.*?' + re.escape(MARK_END), '', src, flags=re.S)
    usage = text_usage(src)
    if not usage:
        Path(path).write_text(src, encoding='utf-8')
        return 0
    faces = ''.join(
        f"@font-face{{font-family:'Quicksand';font-weight:{w};src:url(data:font/woff2;base64,{woff2_b64(w, chars)}) format('woff2')}}"
        for w, chars in sorted(usage.items())
    )
    block = f'{MARK_START}<style>{faces}</style>{MARK_END}'
    src = re.sub(r'(<svg\b[^>]*>)', lambda m: m.group(1) + block, src, count=1)
    Path(path).write_text(src, encoding='utf-8')
    return len(block)


if __name__ == '__main__':
    for p in sys.argv[1:]:
        n = process(p)
        print(f'{p}: {"+" + str(n // 1024) + " KB font" if n else "không có chữ"}')
