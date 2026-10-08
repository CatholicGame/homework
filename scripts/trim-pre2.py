"""
Cắt bớt nền trắng thừa quanh hình Tiền tiểu học Tập 2 (src/assets/pre2): khung cắt từ sách để trống
nhiều trên / dưới, hình lên màn hình thành đồ vật nhỏ xíu giữa khung to. Cắt sát nội dung (chừa một
viền mỏng) rồi đổi toạ độ đồ vật (%, theo cả hình) trong count-items.json và zones2.json theo khung mới.
Các khung cùng hiện trong một lượt chơi (data2.js: cặp trái / phải, bộ ba nhiều nhất / ít nhất, cả
trang nối) cắt chung một khung (hợp các phần nội dung) để đồ vật giữa các khung vẫn to bằng nhau như
trong sách. Hàng rNN_* (xếp thẳng
cột để so sánh từng cái) và hình bài học giữ nguyên.
Chạy lại được: hình đã sát nội dung thì bỏ qua.
"""
from collections import defaultdict
import glob, json, os
from PIL import Image, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, 'src', 'assets', 'pre2')
COUNT = os.path.join(ROOT, 'src', 'games', 'preschool', 'count-items.json')
ZONES = os.path.join(ROOT, 'src', 'games', 'preschool', 'zones2.json')
PAD = 0.04  # viền chừa lại, theo cạnh dài của phần nội dung
MIN_GAIN = 0.12  # chỉ cắt khi bớt được ít nhất chừng này diện tích

count = json.load(open(COUNT, encoding='utf-8'))
zones = json.load(open(ZONES, encoding='utf-8'))


def remap(boxes, W, H, x0, y0, w, h, name):
    out = []
    for b in boxes:
        x, y = (b[0] * W / 100 - x0) / w * 100, (b[1] * H / 100 - y0) / h * 100
        bw, bh = b[2] * W / w, b[3] * H / h
        if x < -1 or y < -1 or x + bw > 101 or y + bh > 101:
            print(f'  ! {name}: ô {b[:4]} ra ngoài khung cắt')
        out.append([round(x, 2), round(y, 2), round(bw, 2), round(bh, 2), *b[4:]])
    return out


def content_box(im):
    diff = ImageChops.difference(im, Image.new('RGB', im.size, (255, 255, 255))).convert('L')
    return diff.point(lambda v: 255 if v > 30 else 0).getbbox()


def round_groups(page, names):
    """Các khung hiện cùng nhau trong một lượt (theo data2.js)."""
    n = int(page[1:])
    size = {52: 3, 53: 3, 47: 0, 48: 0, 45: 1, 46: 1, 54: 1}.get(n, 2)
    if size == 0:
        return [names]
    return [names[i:i + size] for i in range(0, len(names), size)]


pages = defaultdict(list)
for path in sorted(glob.glob(os.path.join(ASSETS, 'p*_*.webp'))):
    pages[os.path.basename(path).split('_')[0]].append(path)

for page, paths in pages.items():
    ims = {os.path.basename(p)[:-5]: Image.open(p).convert('RGB') for p in paths}
    # Khung gần cùng cỡ (lệch vài điểm ảnh khi cắt từ sách): cắt chung một khung, tính theo tỉ lệ.
    groups = []
    for names in round_groups(page, sorted(ims, key=lambda n: int(n.split('_')[1]))):
        ws, hs = [ims[n].size[0] for n in names], [ims[n].size[1] for n in names]
        same = max(ws) / min(ws) < 1.03 and max(hs) / min(hs) < 1.03
        groups += [names] if same else [[n] for n in names]
    for names in groups:
        fx0, fy0, fx1, fy1 = 1, 1, 0, 0
        for name in names:
            W, H = ims[name].size
            bb = content_box(ims[name])
            boxes = [[bb[0] / W, bb[1] / H, bb[2] / W, bb[3] / H]] if bb else []
            # Giữ trọn mọi ô đồ vật đã có (ô chạm có thể rộng hơn nét vẽ).
            for b in count.get(f'pre2/{name}', []) + zones.get('crossout', {}).get(name, []):
                boxes.append([b[0] / 100, b[1] / 100, (b[0] + b[2]) / 100, (b[1] + b[3]) / 100])
            for b in boxes:
                fx0, fy0, fx1, fy1 = min(fx0, b[0]), min(fy0, b[1]), max(fx1, b[2]), max(fy1, b[3])
        if fx1 <= fx0:
            continue
        pad = PAD * max(fx1 - fx0, fy1 - fy0)
        fx0, fy0, fx1, fy1 = max(0, fx0 - pad), max(0, fy0 - pad), min(1, fx1 + pad), min(1, fy1 + pad)
        if 1 - (fx1 - fx0) * (fy1 - fy0) < MIN_GAIN:
            continue
        for name in names:
            W, H = ims[name].size
            x0, y0, x1, y1 = round(fx0 * W), round(fy0 * H), round(fx1 * W), round(fy1 * H)
            w, h = x1 - x0, y1 - y0
            print(f'{name}: {W}x{H} -> {w}x{h}')
            ims[name].crop((x0, y0, x1, y1)).save(os.path.join(ASSETS, f'{name}.webp'), 'WEBP', quality=88)
            if f'pre2/{name}' in count:
                count[f'pre2/{name}'] = remap(count[f'pre2/{name}'], W, H, x0, y0, w, h, name)
            if name in zones.get('crossout', {}):
                zones['crossout'][name] = remap(zones['crossout'][name], W, H, x0, y0, w, h, name)

json.dump(count, open(COUNT, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
json.dump(zones, open(ZONES, 'w', encoding='utf-8'), ensure_ascii=False, separators=(', ', ': '))
