"""
Chung cho các hình vẽ lại bằng nét riêng (scripts/redraw/*.py).

Nguyên tắc (bản quyền): chỉ giữ NỘI DUNG TOÁN của sách — số lượng, nhãn chữ/số,
vị trí tương đối, dây nối, ô trống — còn con vật, đồ vật, người là nét vẽ riêng,
không đồ theo sách. Phong cách: phẳng, dễ thương, viền đậm màu mực INK, màu tươi.

    from common import *
    save('bai1_t1_q2_cats', W, H, parts)     # ghi SVG, nhúng font, xuất ảnh xem thử
"""
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / 'src/assets/grade2-workbook'
PREVIEW = Path(__file__).resolve().parent / '_preview'   # ảnh xem thử (không commit)
CHROME = Path.home() / 'AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe'

INK = '#3F3A40'          # viền, chữ
FONT = 'Quicksand'       # chữ trong hình (nhúng bằng scripts/embed-svg-fonts.py)
# bảng màu dùng chung
SKY, SKY_D = '#CDEBFA', '#7CC6E8'
WATER_L, WATER_D = '#BFE6F7', '#7CC6E8'
GRASS, GRASS_D = '#9BD58A', '#5DAF5B'
YELLOW, ORANGE, RED, PINK = '#FFD166', '#F4A259', '#F07167', '#F7A1C4'
GREEN, TEAL, BLUE, PURPLE = '#7BCB8B', '#6CCFB5', '#6FB7EA', '#B9A7F0'
GREY, GREY_L, CREAM, BROWN = '#A7B1BC', '#E8ECF0', '#FFF4DF', '#B07A4F'
SKIN, SKIN_D, HAIR = '#FFD9B8', '#F2B48C', '#4A3A36'
WHITE = '#FFFFFF'


def text(x, y, s, size=18, weight=600, fill=INK, anchor='middle', extra=''):
    return (f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="{FONT}" '
            f'font-weight="{weight}" font-size="{size}" fill="{fill}"{extra}>{s}</text>')


def save(name, w, h, parts, bg=None, folder=None):
    """Ghi src/assets/<folder, mặc định grade2-workbook>/<name>.svg, nhúng font, chụp _preview/<name>.png."""
    out = (ASSETS.parent / folder if folder else ASSETS) / f'{name}.svg'
    body = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">']
    if bg:
        body.append(f'<rect width="{w}" height="{h}" fill="{bg}"/>')
    body.extend(parts)
    body.append('</svg>')
    out.write_text('\n'.join(body), encoding='utf-8')
    subprocess.run([sys.executable, str(ROOT / 'scripts/embed-svg-fonts.py'), str(out)], check=True,
                   env={**os.environ, 'PYTHONIOENCODING': 'utf-8'})
    PREVIEW.mkdir(exist_ok=True)
    if CHROME.exists():
        subprocess.run([str(CHROME), '--headless=new', '--disable-gpu', f'--window-size={w},{h}',
                        '--default-background-color=ffffffff',
                        f'--screenshot={PREVIEW / (name + ".png")}', out.as_uri()],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print('wrote', out, '| preview', PREVIEW / (name + '.png'))
