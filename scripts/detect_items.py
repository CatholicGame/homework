"""
Tìm nháp khung từng đồ vật trên một hình (để bé chạm đếm, mỗi đồ vật một số). Dùng chung cho
scripts/pre4-detect.py (sách 99 đề) và scripts/count-detect.py (Tập 1, Tập 2).

Màu chiếm nhiều diện tích (trên 8%) và màu trắng là nền; phần còn lại là đồ vật. Bỏ khung viền
(vùng phủ gần hết hình), mảnh vụn và vật lạ nhỏ / to hơn hẳn đồ vật thường gặp.
Trả về [[x0, y0, x1, y1], …] theo điểm ảnh, xếp trên → dưới, trái → phải.
"""
import numpy as np
from scipy import ndimage as nd


def detect(im, min_frac=0.0025, thresh=75, close=2, lo=0.4, hi=3.0):
    a = np.asarray(im.convert('RGB')).astype(int)
    q = (a // 24).reshape(-1, 3)
    vals, cnt = np.unique(q, axis=0, return_counts=True)
    bgs = [vals[i] * 24 + 12 for i in cnt.argsort()[::-1][:6] if cnt[i] > q.shape[0] * 0.08]
    bgs.append(np.array([250, 250, 250]))
    fg = np.ones(a.shape[:2], bool)
    for b in bgs:
        fg &= np.abs(a - b).sum(2) > thresh
    fg = nd.binary_closing(fg, iterations=close) if close else fg
    lab, k = nd.label(fg)
    H, W = fg.shape
    boxes = []
    for i, sl in enumerate(nd.find_objects(lab), 1):
        h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if w * h > 0.35 * W * H or w > 0.8 * W or h > 0.9 * H:
            continue  # khung viền / nền lớn
        part = nd.binary_fill_holes(lab[sl] == i)
        if part.sum() < min_frac * W * H:
            continue
        boxes.append([sl[1].start, sl[0].start, sl[1].stop, sl[0].stop])
    # Gộp các mảnh chồng lên nhau nhiều (một đồ vật bị tách màu).
    merged = True
    while merged:
        merged = False
        for i in range(len(boxes)):
            for j in range(i + 1, len(boxes)):
                A, B = boxes[i], boxes[j]
                ix = max(0, min(A[2], B[2]) - max(A[0], B[0]))
                iy = max(0, min(A[3], B[3]) - max(A[1], B[1]))
                small = min((A[2] - A[0]) * (A[3] - A[1]), (B[2] - B[0]) * (B[3] - B[1]))
                if ix * iy > 0.5 * small:
                    boxes[i] = [min(A[0], B[0]), min(A[1], B[1]), max(A[2], B[2]), max(A[3], B[3])]
                    boxes.pop(j)
                    merged = True
                    break
            if merged:
                break
    # Bỏ vật lạ: nhỏ hơn hẳn / to hơn hẳn đồ vật thường gặp (số thứ tự in sẵn, dấu +), hoặc dài như vạch viền.
    if boxes:
        areas = sorted((b[2] - b[0]) * (b[3] - b[1]) for b in boxes)
        med = areas[len(areas) // 2]
        boxes = [b for b in boxes
                 if lo * med <= (b[2] - b[0]) * (b[3] - b[1]) <= hi * med
                 and max(b[2] - b[0], b[3] - b[1]) <= 3.5 * min(b[2] - b[0], b[3] - b[1])]
    return sorted(boxes, key=lambda b: ((b[1] + b[3]) // 2 // max(1, (b[3] - b[1])), b[0]))
