"""
Cắt tờ nhân vật (ảnh AI user gen, nền trắng) thành từng hình nền trong suốt cho phim tranh Tiếng Việt 3.

  python scripts/tv3-cut-sheet.py <tờ.png> <thư mục ra> tên1 tên2 …   [--scale 2] [--min 1500]

Tìm từng cụm không trắng (nối các nét gần nhau, vd. vệt nhảy, bóng dưới chân), xếp theo hàng rồi trái → phải,
đặt tên theo thứ tự tham số. Nền trắng nối với mép khung → trong suốt; viền chống răng cưa thành nửa trong
suốt (không còn quầng trắng trên nền màu). Giữ nguyên cả hình, không cắt vào nhân vật.
--scale: phóng (Lanczos) trước khi lưu; có ảnh gốc độ phân giải cao thì để 1.
Ghi kèm sizes.json (tên → [rộng, cao]) trong thư mục ra.

Tờ con vật Tuần 2 (art/source/tv3/critters-tuan02.png):
  python scripts/tv3-cut-sheet.py art/source/tv3/critters-tuan02.png src/assets/tv3/critters grasshopper-stand
    grasshopper-jump grasshopper-talk worm-grumpy worm-dig worm-happy ant-carry ant-wipe ant-think ant-talk --gap 5 --scale 2
Bản đang dùng: tờ phóng ×4 bằng Real-ESRGAN (realesrgan-x4plus-anime, C:/Users/MGUser/tools/realesrgan) →
  art/source/tv3/critters-tuan02-x4.png, cắt với --gap 20 --min 24000 --hole 960 --scale 1 (ngưỡng px nhân theo ×4).
"""
import argparse, json, os
import numpy as np
from PIL import Image
from scipy import ndimage


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('sheet')
    ap.add_argument('out')
    ap.add_argument('names', nargs='+')
    ap.add_argument('--scale', type=float, default=1)
    ap.add_argument('--min', type=int, default=1500, help='bỏ cụm nhỏ hơn (px²)')
    ap.add_argument('--gap', type=int, default=9, help='nối nét cách nhau ≤ gap px')
    ap.add_argument('--quality', type=int, default=90)
    ap.add_argument('--hole', type=int, default=60, help='khe trắng kín ≥ hole px² (trên tờ gốc) là nền')
    ap.add_argument('--head', type=float, default=0.3, help='vùng đầu: tỉ lệ chiều cao (tính từ chỗ hình đủ rộng)')
    a = ap.parse_args()

    im = np.asarray(Image.open(a.sheet).convert('RGB')).astype(np.int16)
    H, W, _ = im.shape
    dark = 255 - im.min(axis=2)              # 0 = trắng tinh
    ink = dark > 20
    lab, n = ndimage.label(ndimage.binary_dilation(ink, iterations=a.gap))
    boxes = []
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        area = int((ink & (lab == i)).sum())
        if area >= a.min:
            boxes.append((sl[0].start, sl[0].stop, sl[1].start, sl[1].stop, i))
    # xếp theo hàng: tâm dọc gần nhau (< 1/3 chiều cao hình) là cùng hàng
    boxes.sort(key=lambda b: (b[0] + b[1]) / 2)
    rows, cur = [], []
    for b in boxes:
        if cur and (b[0] + b[1]) / 2 - (cur[0][0] + cur[0][1]) / 2 > (cur[0][1] - cur[0][0]) / 3:
            rows.append(cur); cur = []
        cur.append(b)
    if cur: rows.append(cur)
    order = [b for r in rows for b in sorted(r, key=lambda b: b[2])]
    if len(order) != len(a.names):
        raise SystemExit(f'Tìm được {len(order)} hình nhưng có {len(a.names)} tên: {[(b[2], b[0]) for b in order]}')

    os.makedirs(a.out, exist_ok=True)
    sizes_path = os.path.join(a.out, 'sizes.json')
    sizes = json.load(open(sizes_path, encoding='utf-8')) if os.path.exists(sizes_path) else {}
    for (y0, y1, x0, x1, i), name in zip(order, a.names):
        pad = 3
        y0, x0 = max(0, y0 - pad), max(0, x0 - pad)
        y1, x1 = min(H, y1 + pad), min(W, x1 + pad)
        crop = im[y0:y1, x0:x1]
        own = lab[y0:y1, x0:x1] == i
        d = dark[y0:y1, x0:x1]
        # nền = vùng gần trắng nối với mép khung (trắng bên trong nhân vật như mắt, khăn tay vẫn giữ)
        white = d <= 14
        bl, _ = ndimage.label(white)
        edge = set(np.unique(np.concatenate([bl[0], bl[-1], bl[:, 0], bl[:, -1]]))) - {0}
        bg = np.isin(bl, list(edge)) | ~own
        # khe trắng bị bao kín (giữa tay và thân, giữa chân…) cũng là nền. Giữ: lòng trắng mắt (nhỏ) và mảng trắng
        # ở vùng đầu (lông mày bạc, mắt to, đốm sáng) trừ khi rất lớn (≥ 4 × hole). Vùng đầu: từ hàng đầu tiên hình
        # rộng ≥ 25% khung (bỏ qua râu mảnh) xuống thêm `head` phần chiều cao còn lại
        idx = np.arange(1, bl.max() + 1)
        hsz = ndimage.sum(white, bl, index=idx)
        hcy = ndimage.center_of_mass(white, bl, index=idx)
        widths = ((d > 40) & own).sum(axis=1)
        first = int(np.argmax(widths >= crop.shape[1] * 0.25))
        top = first + (crop.shape[0] - first) * a.head
        holes = [j + 1 for j, sz in enumerate(hsz)
                 if (j + 1) not in edge and sz >= a.hole and (hcy[j][0] > top or sz >= 4 * a.hole)]
        bg |= np.isin(bl, holes)
        alpha = np.where(bg, 0, 255).astype(np.float32)
        # viền: điểm sát nền lấy độ trong suốt theo độ đậm, màu tách khỏi trắng
        rim = ndimage.binary_dilation(bg, iterations=2) & ~bg
        k = np.clip(d / 70.0, 0, 1)
        alpha[rim] = 255 * k[rim]
        rgb = crop.astype(np.float32)
        kk = np.maximum(k, 0.05)[..., None]
        fixed = np.clip(255 - (255 - rgb) / kk, 0, 255)
        rgb = np.where(rim[..., None], fixed, rgb)
        # bóng xám nhạt dưới chân (ở 1/5 dưới khung, sát nền) → bóng tối mờ, không thành vệt trắng trên nền màu
        light = (d < 75) & ~bg
        light[: int(light.shape[0] * 0.8)] = False
        ll, _ = ndimage.label(light)
        for j in range(1, ll.max() + 1):
            m = ll == j
            if m.sum() > 40:
                rgb[m] = (70, 50, 40)
                alpha[m] = np.clip(d[m] * 2.2, 0, 120)
        out = Image.fromarray(np.dstack([rgb, alpha]).astype(np.uint8), 'RGBA')
        if a.scale != 1:
            out = out.resize((round(out.width * a.scale), round(out.height * a.scale)), Image.LANCZOS)
        path = os.path.join(a.out, f'{name}.webp')
        out.save(path, quality=a.quality, method=6)
        sizes[name] = [out.width, out.height]
        print(f'{name}: {out.width}×{out.height} ← ({x0},{y0})')
    # kích thước từng hình cho critters.js (đặt hình đúng tỉ lệ, chân chạm đất)
    with open(sizes_path, 'w', encoding='utf-8') as fo:
        json.dump(dict(sorted(sizes.items())), fo, indent=1)


if __name__ == '__main__':
    main()
