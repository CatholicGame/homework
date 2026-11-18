/**
 * Hình đếm xếp ô (countingPicture, engine.js): màn hình dọc mà đồ vật trong hình sách hiện ra nhỏ hơn
 * TILE_MIN px (dải 13 cây kẹo, chim trên ba cái cây, hai hàng bút chì…) thì cắt từng đồ vật ra khỏi hình
 * (theo khung count-items.json / items.json) thành một ô riêng, xếp nhiều hàng trong khung, cỡ ô lấy
 * theo phần cao còn trống của vùng chơi. Đồ vật chia nhóm (cây 1, 2, 3; hàng trên, hàng dưới) thì mỗi
 * nhóm một khung, giữ đúng thứ tự trong sách (trên xuống, trái sang phải).
 *
 * Cỡ ô tính khi hình tải xong và khi xoay / đổi cỡ màn hình, rồi giữ nguyên trong lượt (bàn phím đổi,
 * lời khen hiện ra không làm hình nhảy). Nhiều hình trong một vùng chơi (so sánh hai hình) dùng chung
 * một cỡ ô: đồ vật hai bên to bằng nhau, thẳng cột để so từng cái một.
 */

import { ART, ART_OF } from './tileArt.js';

// đồ vật nhỏ hơn (px, cạnh ngắn) thì xếp ô; bản dev ?notiles tắt để so trước / sau
export const TILE_MIN = import.meta.env.DEV && /[?&]notiles/.test(location.search) ? 0 : 48;
const GAP = 8;                // khe giữa hai ô (px), như CSS .pk-tgroup gap
const FRAME = 8;              // lề trong khung nhóm (px), như CSS .pk-tiles.is-groups .pk-tgroup padding
const MAX_TILE = 150;
const portrait = () => innerHeight > innerWidth;

/** Nhóm của từng đồ vật: số thứ 5 của khung, hoặc dải ngang chứa tâm đồ vật (bands [[y0, y1], …] %). */
export function groupItems(items, bands) {
  const gOf = (it) => {
    if (bands) {
      const cy = it[1] + it[3] / 2;
      const k = bands.findIndex(([a, b]) => cy >= a && cy <= b);
      return k >= 0 ? k : bands.reduce((best, [a, b], i) => (Math.abs((a + b) / 2 - cy) < Math.abs((bands[best][0] + bands[best][1]) / 2 - cy) ? i : best), 0);
    }
    return it[4] || 0;
  };
  const groups = new Map();
  items.forEach((it, idx) => {
    const g = gOf(it);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push({ it, idx });
  });
  // Thứ tự đọc trong nhóm: theo hàng (tâm gần nhau theo chiều dọc), rồi trái sang phải.
  return [...groups.entries()].sort((a, b) => a[0] - b[0]).map(([g, list]) => {
    const minH = Math.min(...list.map(({ it }) => it[3]));
    list.sort((p, q) => {
      const dy = (p.it[1] + p.it[3] / 2) - (q.it[1] + q.it[3] / 2);
      return Math.abs(dy) > minH / 2 ? dy : p.it[0] - q.it[0];
    });
    return { g, list };
  });
}

/** Tỉ lệ cao / rộng chung của ô = trung vị tỉ lệ các đồ vật (theo điểm ảnh của hình). */
function cellRatio(items, W, H) {
  const r = items.map(([, , w, h]) => (h * H) / (w * W)).sort((a, b) => a - b);
  return Math.min(2.2, Math.max(0.55, r[r.length >> 1]));
}

/**
 * Dựng khung ô. Trả về { el, cells: [{ it, idx, el }] } (thứ tự theo nhóm); nơi gọi gắn sự kiện chạm.
 * Mỗi ô: nền là hình sách, phóng và dịch cho khung đồ vật vừa khít trong ô (giữ tỉ lệ).
 */
export function buildTiles(src, items, groups, W, H, img = null, artKey = '', { bookMarks = true } = {}) {
  // Hình có đồ vật vẽ lại (tileArt.js): ô vẽ đồ vật mới, tỉ lệ ô theo hình vẽ.
  // Loại đồ vật vẽ lại của từng đồ vật ([loại, màu?]) hoặc null (ô cắt từ sách).
  const spec = ART_OF[artKey];
  const artOf = (it) => {
    const a = spec?.byGroup ? spec.byGroup[it[4] || 0] : spec;
    return a && ART[a[0]] ? a : null;
  };
  const drawn = items.map(artOf);
  const allDrawn = drawn.every(Boolean);
  const vb = allDrawn ? ART[drawn[0][0]]().match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/) : null;
  const ar = vb ? Number(vb[2]) / Number(vb[1]) : cellRatio(items, W, H);
  const colors = drawn.some(a => a?.[1] === 'sample') && img ? sampleColors(img, items) : null;
  const cut = img && !allDrawn ? cutouts(img, items) : null;
  // Dấu của sách (bị gạch / được khoanh): đồ vật được khoanh tách thành một khung nét đứt riêng.
  const marks = bookMarks ? spec?.[2] : null;
  if (marks?.o?.length) {
    const circled = [];
    groups = groups.map(gr => ({ ...gr, list: gr.list.filter(e => (marks.o.includes(e.idx) ? (circled.push(e), false) : true)) }))
      .filter(gr => gr.list.length);
    groups.push({ g: groups.length, list: circled, circled: true });
  }
  const el = document.createElement('div');
  el.className = `pk-tiles${groups.length > 1 ? ' is-groups' : ''}`;
  el.style.setProperty('--ar', ar);
  el.dataset.ar = ar;
  const cells = [];
  groups.forEach(({ g, list, circled }) => {
    const box = document.createElement('div');
    box.className = `pk-tgroup${circled ? ' is-circled' : ''}`;
    box.dataset.g = g % 4;
    box.dataset.n = list.length;
    list.forEach(({ it, idx }) => {
      const [x, y, w, h] = it;
      const a = (h * H) / (w * W);
      const [fw, fh] = a > ar ? [(ar / a) * 100, 100] : [100, (a / ar) * 100];
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'pk-item pk-tcell';
      cell.dataset.g = (it[4] || 0) % 4;
      if (marks?.x?.includes(idx)) cell.classList.add('is-struck');
      const kind = drawn[idx];
      if (kind) {
        cell.innerHTML = `<span class="pk-tile-pic pk-tile-art">${ART[kind[0]](colors?.[idx] || (kind[1] !== 'sample' ? kind[1] : undefined))}</span>`;
        box.append(cell);
        cells.push({ it, idx, el: cell });
        return;
      }
      const own = cut?.[idx];
      if (own === 'mask') cell.classList.add('is-mask');
      if (own && own !== 'mask') {
        own.className = 'pk-tile-pic';
        Object.assign(own.style, { width: `${fw}%`, height: `${fh}%` });
        cell.append(own);
      } else {
        cell.innerHTML = `<i class="pk-tile-pic" style="width:${fw}%;height:${fh}%;background-image:url('${src}');`
          + `background-size:${10000 / w}% ${10000 / h}%;background-position:${w >= 100 ? 0 : (x / (100 - w)) * 100}% ${h >= 100 ? 0 : (y / (100 - h)) * 100}%"></i>`;
      }
      box.append(cell);
      cells.push({ it, idx, el: cell });
    });
    el.append(box);
  });
  return { el, cells };
}

/** Màu đo được (lẫn viền, chỗ sáng) → màu tươi gần nhất theo sắc độ: hình vẽ lại rõ màu như sách. */
function vivid(r, g, b) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 510;
  let h = 0;
  if (mx !== mn) {
    const d = mx - mn;
    h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  if (h < 15 || h >= 335) return l > 0.62 ? '#F472B6' : '#EF4444';
  if (h < 45) return '#FB923C';
  if (h < 60) return '#FACC15';
  if (h < 170) return '#8BD346';
  if (h < 260) return '#38BDF8';
  if (h < 300) return '#A78BFA';
  return '#F472B6';
}

/** Màu chính của từng đồ vật trong hình sách (điểm ảnh đậm màu nhất ở giữa khung), dạng #rrggbb. */
function sampleColors(img, items) {
  try {
    const cv = document.createElement('canvas');
    const k = Math.min(1, 400 / img.naturalWidth);
    cv.width = Math.round(img.naturalWidth * k); cv.height = Math.round(img.naturalHeight * k);
    const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.drawImage(img, 0, 0, cv.width, cv.height);
    return items.map(([x, y, w, h]) => {
      const x0 = Math.round(((x + w * 0.3) / 100) * cv.width), y0 = Math.round(((y + h * 0.2) / 100) * cv.height);
      const ww = Math.max(1, Math.round((w * 0.4 / 100) * cv.width)), hh = Math.max(1, Math.round((h * 0.35 / 100) * cv.height));
      const d = cx.getImageData(x0, y0, ww, hh).data;
      let r = 0, g = 0, b = 0, n = 0;
      for (let i = 0; i < d.length; i += 4) {
        const mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]);
        if (mx - mn < 60 || mx < 90) continue; // bỏ trắng, xám, nét đen
        r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
      }
      return n ? vivid(r / n, g / n, b / n) : null;
    });
  } catch { return null; }
}

// ── Tách đúng hình đồ vật (bỏ mẩu đồ vật bên cạnh lọt vào khung) ───────────────
/*
 * Hình sách vẽ trên nền trắng: gán nhãn các vùng điểm ảnh khác trắng liền nhau, mỗi đồ vật giữ các vùng
 * nằm phần lớn trong khung của nó (đầu bút chì nằm chéo của cái bên cạnh lọt vào khung thì bỏ). Hình có
 * nền màu (chim trên tán cây) thì vùng nào cũng tràn ra ngoài khung: trả null, ô cắt khung chữ nhật.
 * Trả về mảng canvas (theo thứ tự items) hoặc null cho đồ vật không tách được.
 */
const CUT_MAX = 900;    // cạnh dài nhất của ảnh khi dò (px)
const KEEP_IN = 0.6;    // vùng có ≥ 60% điểm ảnh trong khung thì thuộc đồ vật
const LEAK = 0.35;      // phần điểm ảnh khác trắng trong khung mà không thuộc đồ vật nào: quá thì coi là nền màu
function cutouts(img, items) {
  try {
    const k = Math.min(1, CUT_MAX / Math.max(img.naturalWidth, img.naturalHeight));
    const W = Math.round(img.naturalWidth * k), H = Math.round(img.naturalHeight * k);
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.drawImage(img, 0, 0, W, H);
    const px = cx.getImageData(0, 0, W, H).data;
    const ink = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) {
      const a = px[i * 4 + 3], r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
      ink[i] = a > 40 && (r < 232 || g < 232 || b < 232) ? 1 : 0;
    }
    // Gán nhãn vùng liền (8 hướng)
    const label = new Int32Array(W * H);
    const size = [0];
    const stack = new Int32Array(W * H);
    let n = 0;
    for (let s = 0; s < W * H; s++) {
      if (!ink[s] || label[s]) continue;
      n++; let top = 0, cnt = 0;
      stack[top++] = s; label[s] = n;
      while (top) {
        const p = stack[--top]; cnt++;
        const x = p % W, y = (p - x) / W;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
          const q = yy * W + xx;
          if (ink[q] && !label[q]) { label[q] = n; stack[top++] = q; }
        }
      }
      size[n] = cnt;
    }
    return items.map(([x, y, w, h]) => {
      const x0 = Math.max(0, Math.floor((x / 100) * W)), y0 = Math.max(0, Math.floor((y / 100) * H));
      const x1 = Math.min(W, Math.ceil(((x + w) / 100) * W)), y1 = Math.min(H, Math.ceil(((y + h) / 100) * H));
      if (x1 - x0 < 4 || y1 - y0 < 4) return null;
      const inside = new Map();
      let inkIn = 0;
      for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) {
        const l = label[yy * W + xx];
        if (l) { inkIn++; inside.set(l, (inside.get(l) || 0) + 1); }
      }
      const keep = new Set([...inside].filter(([l, c]) => c / size[l] >= KEEP_IN).map(([l]) => l));
      const kept = [...keep].reduce((s, l) => s + inside.get(l), 0);
      if (!kept || (inkIn - kept) / inkIn > LEAK) return 'mask'; // dính liền đồ vật khác / nền màu: ô chữ nhật, mờ dần ra góc
      if (kept === inkIn) return null; // không có mẩu nào lạ: cắt khung chữ nhật là đủ
      // Canvas của đồ vật: điểm ảnh của vùng giữ lại + viền 2 px quanh nó (nét khử răng cưa nhạt màu).
      const ow = x1 - x0, oh = y1 - y0;
      const out = document.createElement('canvas');
      out.width = ow; out.height = oh;
      const oc = out.getContext('2d');
      const src = cx.getImageData(x0, y0, ow, oh);
      const mask = new Uint8Array(ow * oh);
      for (let yy = 0; yy < oh; yy++) for (let xx = 0; xx < ow; xx++) {
        if (!keep.has(label[(yy + y0) * W + xx + x0])) continue;
        for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
          const a = xx + dx, b = yy + dy;
          if (a >= 0 && b >= 0 && a < ow && b < oh) mask[b * ow + a] = 1;
        }
      }
      // Bỏ điểm ảnh của vùng khác (kể cả trong viền 2 px)
      for (let i = 0; i < ow * oh; i++) {
        const xx = i % ow, yy = (i - xx) / ow;
        const l = label[(yy + y0) * W + xx + x0];
        if (!mask[i] || (l && !keep.has(l))) src.data[i * 4 + 3] = 0;
      }
      oc.putImageData(src, 0, 0);
      return out;
    });
  } catch {
    return null; // canvas bị chặn (ảnh khác nguồn): cắt khung chữ nhật
  }
}

// ── Cỡ ô chung của mọi hình xếp ô trong một vùng chơi ─────────────────────────
const registry = new WeakMap(); // stage → Set<pk-tiles>
const watched = new WeakSet();

function heightAt(tiles, S) {
  const ar = Number(tiles.dataset.ar);
  const multi = tiles.classList.contains('is-groups');
  const inner = tiles.clientWidth - (multi ? 2 * FRAME + 6 : 0);
  let h = 0;
  const boxes = [...tiles.children];
  boxes.forEach((box, k) => {
    const n = Number(box.dataset.n);
    const c = Math.max(1, Math.floor((inner + GAP) / (S + GAP)));
    const rows = Math.ceil(n / c);
    h += rows * S * ar + (rows - 1) * GAP + (multi ? 2 * FRAME + 6 : 0) + (k ? GAP + 4 : 0);
  });
  return h;
}

/**
 * Phần cao còn trống (px, âm = đang tràn): khoảng trống trong vùng chơi (nội dung căn giữa trong vùng
 * chơi cao cố định) trừ phần trang đang tràn khỏi khung cuộn (#app), trừ phần ô tràn khỏi khung cha cao
 * cố định (so sánh hai hình xếp trên dưới: tràn ra đè lên hàng số, không đẩy trang dài ra).
 */
function freeHeight(stage) {
  // Gợi ý "Chạm để đếm", số đếm (đặt tuyệt đối, thò ra ngoài ô) không tính là tràn.
  const floating = [...stage.querySelectorAll('.pk-tap-hint, .pk-mark, .pk-recount')].filter(e => e.style.display !== 'none');
  floating.forEach(e => { e.dataset.tileHide = e.style.display; e.style.display = 'none'; });
  const scroller = stage.closest('#app') || document.scrollingElement;
  const overflow = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
  let inner = 0;
  for (const t of registry.get(stage) || []) {
    for (let p = t.parentElement; p && p !== stage.parentElement; p = p.parentElement) {
      inner = Math.max(inner, p.scrollHeight - p.clientHeight);
    }
  }
  const free = slackOf(stage) - overflow - inner - 24;
  floating.forEach(e => { e.style.display = e.dataset.tileHide; delete e.dataset.tileHide; });
  return free;
}
function slackOf(stage) {
  const sb = stage.getBoundingClientRect();
  let top = Infinity, bottom = -Infinity;
  for (const e of stage.querySelectorAll('*')) {
    if (e.children.length && e.tagName !== 'BUTTON') continue;
    if (e.closest('.pk-tap-hint, .pk-mark, .pk-tcell')) continue;
    const q = e.getBoundingClientRect();
    if (!q.width || !q.height) continue;
    top = Math.min(top, q.top); bottom = Math.max(bottom, q.bottom);
  }
  for (const t of registry.get(stage) || []) {
    const q = t.getBoundingClientRect();
    top = Math.min(top, q.top); bottom = Math.max(bottom, q.bottom);
  }
  return sb.height - (bottom - top);
}

/** Tính cỡ ô; đo lại ở khung hình sau (tối đa 3 lượt) cho tới khi cỡ không đổi, rồi mới báo onFit. */
function fitStageTiles(stage, pass = 0) {
  const all = [...(registry.get(stage) || [])].filter(t => t.isConnected);
  if (!all.length) return;
  if (!portrait()) { all.forEach(t => setSize(t, t.landSize?.() || 64)); return; }
  const before = all.map(t => t.style.getPropertyValue('--tile')).join();
  const S = bestSize(stage, all);
  all.forEach(t => setSize(t, S, false));
  const after = all.map(t => t.style.getPropertyValue('--tile')).join();
  if (after !== before && pass < 3) { requestAnimationFrame(() => fitStageTiles(stage, pass + 1)); return; }
  all.forEach(t => setSize(t, S));
}
function bestSize(stage, all) {
  const now = all.reduce((s, t) => s + t.getBoundingClientRect().height, 0);
  const budget = now + freeHeight(stage);
  let lo = 16, hi = MAX_TILE;
  for (let k = 0; k < 18; k++) {
    const mid = (lo + hi) / 2;
    if (all.reduce((s, t) => s + heightAt(t, mid), 0) <= budget) lo = mid; else hi = mid;
  }
  // Bề ngang cũng giới hạn: một ô không rộng quá khung.
  // Không ép cỡ tối thiểu: vùng chơi chật (bàn phím 20 số…) thì ô nhỏ hơn TILE_MIN còn hơn bắt bé cuộn trang.
  return Math.floor(Math.min(lo, ...all.map(t => t.clientWidth - 4)));
}
function setSize(tiles, S, fitted = true) {
  tiles.style.setProperty('--tile', `${S}px`);
  // Chia đều các hàng (10 cái: 5 + 5, không 9 + 1): bề ngang nhóm vừa đủ số cột cần.
  const multi = tiles.classList.contains('is-groups');
  const inner = tiles.clientWidth - (multi ? 2 * FRAME + 6 : 0);
  const cMax = Math.max(1, Math.floor((inner + GAP) / (S + GAP)));
  [...tiles.children].forEach(box => {
    const n = Number(box.dataset.n);
    const cols = Math.ceil(n / Math.ceil(n / cMax));
    box.style.maxWidth = `${cols * S + (cols - 1) * GAP + (multi ? 2 * FRAME + 6 : 0)}px`;
  });
  if (fitted) tiles.onFit?.(Math.min(S, S * Number(tiles.dataset.ar)));
}

// Các hình đếm của lượt đang chờ tải / chờ quyết định xếp ô: tính cỡ khi tất cả đã quyết định, để hai hình
// so sánh (tải xong lúc khác nhau) chia phần cao cùng một lần, hình tải trước không chiếm hết chỗ.
let pending = 0;
const stages = new Set();
/** +1 khi tạo một hình có thể xếp ô, -1 khi đã quyết định (xếp ô hay không, hay hình bị bỏ). */
export function tilePending(d) {
  pending = Math.max(0, pending + d);
  if (!pending) [...stages].forEach(s => { if (s.isConnected) scheduleFit(s); else stages.delete(s); });
}
function scheduleFit(stage) {
  if (pending) return;
  requestAnimationFrame(() => requestAnimationFrame(() => { if (!pending) fitStageTiles(stage); }));
}
/** Tính lại cỡ ô của vùng chơi chứa `el` (một hình vừa bỏ xếp ô). */
export function refitTiles(el) {
  const stage = el.closest('#pk-stage');
  if (stage) scheduleFit(stage);
}

/**
 * Đưa khung ô vào nhóm tính cỡ của vùng chơi chứa nó; tính khi mọi hình của lượt đã quyết định.
 * `onFit(cạnh ngắn của ô, px)` gọi sau mỗi lần tính cỡ.
 */
export function fitTiles(tiles, onFit) {
  tiles.onFit = onFit;
  const stage = tiles.closest('#pk-stage') || tiles.parentElement;
  if (!stage) return;
  if (!registry.has(stage)) registry.set(stage, new Set());
  registry.get(stage).add(tiles);
  stages.add(stage);
  setSize(tiles, 40, false);
  scheduleFit(stage);
  if (!watched.has(stage)) {
    watched.add(stage);
    let t = 0;
    const onResize = () => {
      if (!stage.isConnected) { removeEventListener('resize', onResize); return; }
      clearTimeout(t);
      t = setTimeout(() => fitStageTiles(stage), 150);
    };
    addEventListener('resize', onResize);
  }
}
