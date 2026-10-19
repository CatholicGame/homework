/**
 * Dạng lượt chơi của sách "Bé Tập Làm Toán — 99 đề toán cho trẻ mẫu giáo" (data4.js).
 * engine.js gọi PLAYERS4[round.type](ctx). Như các tập khác, mỗi lần chạm được chấm ngay:
 * đúng thì ô xanh + "ting", sai thì rung nhẹ và bớt sao — không có nút "Kiểm tra".
 *
 * Mục chung của mọi lượt: say (lời Thỏ dặn, bắt buộc), img (hình minh hoạ, tuỳ chọn),
 * done (lời khen khi xong, tuỳ chọn), hint (lời nhắc khi bé chọn sai, tuỳ chọn).
 *   eq     — nhìn hình, lập phép tính: lines [[12, '+', 5, '=', 17], …]; show [chỉ số ô hiện sẵn]
 *            (mặc định chỉ hiện dấu '='). Phép chỉ có cộng thì các số hạng đổi chỗ vẫn đúng.
 *   calc   — tính nhẩm: items ['15-4=?', '10+?=16', …] ('?' là ô trống); theme = emoji trang trí thẻ
 *   ask    — hình + các câu hỏi điền số: asks [{ label, icon, answer, options, unit, say, zone }]
 *            (answer không phải số thì phải có options, so theo text của lựa chọn; zone [x%, y%, w%, h%]
 *            = khung sáng chỉ vào chỗ đang hỏi trên hình)
 *   choice — chọn đáp án: options [mục]; answer k, hoặc [k, …] khi phải chọn đủ nhiều đáp án;
 *            cols = số cột cố định (điện thoại: tối đa 2 cột)
 *   spot   — chạm đúng chỗ trên hình: zones [[x%, y%, w%, h%], …] (zones.json); answer [k, …];
 *            extra [k, …] = chỗ cũng được tính là đúng nhưng không bắt buộc (extraSay: lời khen riêng)
 *   link   — nối: from [mục], to [mục], pairs [[i, j], …] (mỗi mục from có đúng một cặp, mục to
 *            nhận được nhiều); layout 'lr' (trái → phải, mặc định) | 'tb' (trên → dưới) | 'mid'
 *            (from chia hai bên trái / phải, to ở giữa); says [lời khen cho từng mục from, tuỳ chọn]
 *   rank   — chạm lần lượt theo thứ tự (nhỏ → lớn…): items [mục], order [k, …]
 *   path   — đi đường số: grid [[80, 81, …], …] (null = ô bỏ trống), from, to — đi ngang / dọc, không đi chéo
 *   seq    — điền số còn thiếu: cells [giá trị], hide [chỉ số ô trống], và cols (lưới) hoặc
 *            links ['+2', '-5', …] (mũi tên phép tính giữa hai ô liền nhau)
 * Mục (item) của choice / link / rank: số, chuỗi, hoặc { img, text, say }.
 *   over: [trên, dưới] — chữ ghi đè lên hình (vd. phép tính trên quả khinh khí cầu, kết quả trên giỏ);
 *   shape: 'fan' … — chỉnh chỗ đặt chữ theo hình (lớp .pk4-over.is-<shape>).
 * calc: card: { img, shape } — mỗi phép tính vẽ trên hình (vd. chiếc quạt) thay cho thẻ màu.
 */

import { NUMBER_COLORS, numberWord } from './numbers.js';
import { say, sfx, burst, centerOf } from './fx.js';
import { itemsOf } from './pre4/assets.js';

const colorOf = (n) => NUMBER_COLORS[(Math.abs(Number(n)) % 10) || 10] || '#F97316';
const isOp = (tok) => tok === '+' || tok === '-' || tok === '=';
const OP_WORD = { '+': 'cộng', '-': 'trừ', '=': 'bằng' };
const LINK_COLORS = ['#EF4444', '#2563EB', '#16A34A', '#F59E0B', '#9333EA', '#EC4899', '#0891B2', '#65A30D', '#EA580C', '#4F46E5'];

/** Hiển thị: dấu trừ dài cho dễ nhìn. */
const fmt = (s) => String(s).replace(/(\d|\?|\s)-(?=\s|\d|\?)/g, '$1−');
/** Đọc to: số thành chữ, dấu thành lời (15-4=? → "mười lăm trừ bốn bằng mấy"). */
export function readText(s) {
  return String(s)
    .replace(/(\d+):(\d+)/g, (_, h, m) => `${numberWord(Number(h))} giờ${Number(m) ? ` ${numberWord(Number(m))} phút` : ''}`)
    .replace(/\d+/g, (m) => (Number(m) <= 100 ? numberWord(Number(m)) : m))
    .replace(/\s*\+\s*/g, ' cộng ')
    .replace(/\s*[-−]\s*/g, ' trừ ')
    .replace(/\s*=\s*/g, ' bằng ')
    .replace(/\?/g, ' mấy')
    .replace(/\s+/g, ' ')
    .trim();
}
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const sayValue = (v) => (typeof v === 'number' ? numberWord(v) : OP_WORD[v] || readText(v));

/** Giá trị một biểu thức cộng trừ: '11+7-3' → 15. */
const evalExpr = (e) => (fmt(e).replace(/−/g, '-').replace(/\s/g, '').match(/[+-]?\d+/g) || []).reduce((a, x) => a + Number(x), 0);
/** Tìm số thay cho '?' để hai vế bằng nhau. */
function solveBlank(item) {
  for (let v = 0; v <= 200; v++) {
    const [a, b] = item.replace('?', v).split('=');
    if (evalExpr(a) === evalExpr(b)) return v;
  }
  throw new Error(`pre4: không giải được ${item}`);
}

const itemHTML = (it) => {
  if (it && typeof it === 'object') {
    if (it.over) {
      return `<span class="pk4-over${it.shape ? ` is-${it.shape}` : ''}"><img src="${it.img}" alt="" draggable="false">${it.over.map((t, k) => `<span class="pk4-over-t is-${k}">${fmt(t)}</span>`).join('')}</span>`;
    }
    return `${it.img ? `<img src="${it.img}" alt="" draggable="false">` : ''}${it.text != null ? `<span class="pk4-txt">${fmt(it.text)}</span>` : ''}`;
  }
  return `<span class="pk4-txt">${fmt(it)}</span>`;
};
const itemKind = (it) => (typeof it === 'number' ? 'is-num' : it && typeof it === 'object' && it.img ? 'is-img' : 'is-text');
const itemSay = (it) => (it && typeof it === 'object' ? readText(it.say ?? it.text ?? '') : readText(it));

/**
 * Bàn phím trả lời, gắn vào `host`. spec: { answer } số (≤ 20: hàng số 0–20, lớn hơn: bàn phím chữ số),
 * { op: true } dấu + −, hoặc { options: [...] } các lựa chọn chữ.
 */
function showPad(ctx, host, spec, onPick) {
  host.innerHTML = '';
  if (spec.options) {
    const row = document.createElement('div');
    row.className = 'pk4-optpad';
    row.innerHTML = spec.options.map((o, k) => `<button type="button" class="pk4-optkey" data-k="${k}">${itemHTML(o)}</button>`).join('');
    row.querySelectorAll('button').forEach(b => { b.onclick = () => onPick(spec.options[Number(b.dataset.k)], b); });
    host.append(row);
  } else if (spec.op) {
    const row = document.createElement('div');
    row.className = 'pk-signs';
    row.innerHTML = ['+', '-'].map(op => `<button type="button" class="pk-sign-btn" data-op="${op}" aria-label="Dấu ${OP_WORD[op]}">${fmt(` ${op} `).trim()}</button>`).join('');
    row.querySelectorAll('button').forEach(b => { b.onclick = () => onPick(b.dataset.op, b); });
    host.append(row);
  } else if (spec.answer <= 20) {
    const row = ctx.numberChoices(Array.from({ length: 21 }, (_, n) => n), onPick);
    row.classList.add('is-pad');
    host.append(row);
  } else {
    const len = String(spec.answer).length;
    let typed = '';
    const box = document.createElement('div');
    box.className = 'pk4-keys';
    box.innerHTML = `<div class="pk4-keys-show" aria-live="polite"></div>
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => `<button type="button" class="pk4-key" data-n="${n}" style="--c:${colorOf(n)}">${n}</button>`).join('')}
      <button type="button" class="pk4-key is-back" aria-label="Xoá">⌫</button>`;
    const show = box.querySelector('.pk4-keys-show');
    box.querySelectorAll('.pk4-key[data-n]').forEach(b => {
      b.onclick = () => {
        typed += b.dataset.n;
        show.textContent = typed;
        sfx.pop(Number(b.dataset.n) + 1);
        if (typed.length >= len) {
          const v = Number(typed);
          typed = '';
          setTimeout(() => { show.textContent = ''; }, 250);
          onPick(v, show);
        }
      };
    });
    box.querySelector('.is-back').onclick = () => { typed = typed.slice(0, -1); show.textContent = typed; sfx.tap(); };
    host.append(box);
  }
}

/**
 * Hình minh hoạ. Hình có khung từng đồ vật (items.json) thì bé chạm vào đồ vật để đếm, mỗi đồ vật
 * một số, chạm ra ngoài không đánh số; hình không có đồ vật để đếm (con vật, bảng giá…) là hình tĩnh.
 */
function mountPicture(ctx, host, src, { fold = true } = {}) {
  if (!src || !host) return null;
  const items = itemsOf(src);
  const build = (plan) => {
    let pic;
    if (items) pic = ctx.countingPicture(src, items, { split: plan || false }).el;
    else {
      pic = document.createElement('div');
      pic.className = 'pk-pic';
      pic.innerHTML = `<img src="${src}" alt="" draggable="false">`;
    }
    host.append(pic);
    return pic;
  };
  // Màn hình dọc, hình có đồ vật: đợi biết cỡ hình để quyết định gập hai hàng hay không (hình chưa tải
  // thì chưa hiện gì, nên dựng sau cũng không làm màn chơi nhảy).
  if (portrait() && fold && items) {
    fillPortrait(ctx, host, src, items, (plan) => build(plan));
    return null;
  }
  const pic = build(null);
  if (portrait()) fillPortrait(ctx, host, src, null, () => pic);
  return pic;
}

// ════════════════════════════════════════════════════════════════════════
// Màn hình dọc: hình lấp phần cao còn trống của vùng chơi. Hình dải dài (kẹo hai hàng tám cái, sáu con
// vật xếp ngang) thì bề ngang màn hình giới hạn cỡ hình, phần cao còn trống bỏ phí: cắt hình ở khe giữa
// hai đồ vật thành hai nửa xếp chồng (cùng tỉ lệ), đồ vật to gần gấp đôi. Cỡ tính một lần khi hình tải
// xong (và khi xoay máy), rồi giữ nguyên trong lượt: bàn phím đổi, lời khen hiện ra cũng không làm hình nhảy.
// ════════════════════════════════════════════════════════════════════════
const portrait = () => innerHeight > innerWidth;
const FOLD_GAP = 6; // khe giữa hai nửa (px), như .pk-pic.is-split
const FOLD_OVERLAP = 3; // % bề ngang hình
const MAX_CROSS = 1; // số hàng điểm ảnh đường cắt được lướt qua nét vẽ (đầu lá ngô chạm nhau); đường kẻ, khung, vòng khoanh cắt qua nhiều hơn

/** Chỗ cắt dọc không đi qua đồ vật nào, chia hai nửa dài gần bằng nhau. rects [x%, y%, w%, h%]. */
function foldCut(rects) {
  if (!rects || rects.length < 2) return null;
  const start = Math.max(0, Math.min(...rects.map(r => r[0])) - 2) / 100;
  const end = Math.min(100, Math.max(...rects.map(r => r[0] + r[2])) + 2) / 100;
  const spans = rects.map(r => [r[0], r[0] + r[2]]).sort((a, b) => a[0] - b[0]);
  let best = null;
  let reach = spans[0][1];
  for (let i = 1; i < spans.length; i++) {
    // Khung đồ vật có chừa lề quanh hình vẽ: hai khung chồng lên nhau chút ít (kẹo xếp sát nhau) vẫn cắt được ở giữa.
    if (spans[i][0] > reach - FOLD_OVERLAP) {
      const cut = (reach + spans[i][0]) / 200;
      const longer = Math.max(cut - start, end - cut);
      if (!best || longer < best.longer) best = { cut, longer };
    }
    reach = Math.max(reach, spans[i][1]);
  }
  if (!best) return null;
  return Object.assign([{ x: start, w: best.cut - start }, { x: best.cut, w: end - best.cut }], { max: best.longer, start, end, cut: best.cut });
}

/**
 * Đồ vật vẽ chéo, sát nhau (kẹo: đuôi giấy gói đan vào nhau) thì đường cắt thẳng nào cũng lẹm vào mép
 * đồ vật bên cạnh. Dò trên điểm ảnh một đường cắt đi qua chỗ trắng gần `cut` nhất (quy hoạch động, mỗi
 * hàng điểm ảnh lệch tối đa 2 điểm) và cắt hai nửa theo đường đó. Trả về hai nửa mới kèm `seam`
 * ([x 0–1] cho mỗi hàng), hoặc null (không gập) khi đường cắt phải đi qua nét vẽ / không đọc được điểm ảnh.
 */
function seamFold(im, plan) {
  try {
    const k = Math.min(1, 480 / im.naturalWidth);
    const w = Math.round(im.naturalWidth * k), h = Math.round(im.naturalHeight * k);
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const g = cv.getContext('2d', { willReadFrequently: true });
    g.fillStyle = '#fff';
    g.fillRect(0, 0, w, h);
    g.drawImage(im, 0, 0, w, h);
    const px = g.getImageData(0, 0, w, h).data;
    const band = 0.05;
    const x0 = Math.max(1, Math.floor((plan.cut - band) * w)), x1 = Math.min(w - 2, Math.ceil((plan.cut + band) * w));
    const mid = plan.cut * w;
    const n = x1 - x0 + 1;
    // Điểm có nét (cả viền mờ khử răng cưa), nới rộng 2 điểm: đường cắt chừa lề, không sát mép nét vẽ.
    const raw = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) raw[i] = px[i * 4] + px[i * 4 + 1] + px[i * 4 + 2] < 3 * 240 ? 1 : 0;
    const R = 2;
    const wide = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (raw[y * w + x]) {
      for (let yy = Math.max(0, y - R); yy <= Math.min(h - 1, y + R); yy++) wide.fill(1, yy * w + Math.max(0, x - R), yy * w + Math.min(w - 1, x + R) + 1);
    }
    const ink = (x, y) => wide[y * w + x] + raw[y * w + x];
    const cost = new Float32Array(n * h), from = new Int8Array(n * h);
    for (let y = 0; y < h; y++) {
      for (let j = 0; j < n; j++) {
        const own = ink(x0 + j, y) + Math.abs(x0 + j - mid) / (w * 4); // gần chỗ cắt thẳng hơn thì tốt hơn chút
        if (!y) { cost[j] = own; continue; }
        let bestC = Infinity, bestD = 0;
        for (let d = -2; d <= 2; d++) {
          const jj = j + d;
          if (jj < 0 || jj >= n) continue;
          const c = cost[(y - 1) * n + jj] + Math.abs(d) * 0.01;
          if (c < bestC) { bestC = c; bestD = d; }
        }
        cost[y * n + j] = own + bestC;
        from[y * n + j] = bestD;
      }
    }
    let j = 0;
    for (let q = 1; q < n; q++) if (cost[(h - 1) * n + q] < cost[(h - 1) * n + j]) j = q;
    const seam = new Array(h);
    for (let y = h - 1; y >= 0; y--) { seam[y] = (x0 + j + 0.5) / w; j += from[y * n + j]; }
    // Số hàng điểm ảnh đường cắt đi qua nét vẽ: khung, đường kẻ chia nhóm, vòng khoanh, chữ… thì không gập.
    let crossed = 0;
    for (let y = 0; y < h; y++) { const x = Math.floor(seam[y] * w); if (raw[y * w + x] || raw[y * w + x - 1] || raw[y * w + x + 1]) crossed++; }
    if (crossed > MAX_CROSS) return null;
    const lo = Math.min(...seam), hi = Math.max(...seam);
    const halves = [{ x: plan.start, w: hi - plan.start }, { x: lo, w: plan.end - lo }];
    return Object.assign(halves, { max: Math.max(hi - plan.start, plan.end - lo), seam, cut: plan.cut });
  } catch {
    return null; // không đọc được điểm ảnh: không gập
  }
}

/** Cắt ảnh trong từng nửa theo đường dò được (clip-path tính theo % của cả ảnh). */
function clipSeam(pic, plan) {
  if (!plan.seam) return;
  const imgs = pic.querySelectorAll('.pk-half-clip > img');
  const h = plan.seam.length;
  const pts = [];
  for (let y = 0; y < h; y += 2) pts.push(`${(plan.seam[y] * 100).toFixed(2)}% ${((y / (h - 1)) * 100).toFixed(2)}%`);
  pts.push(`${(plan.seam[h - 1] * 100).toFixed(2)}% 100%`);
  pts[0] = `${(plan.seam[0] * 100).toFixed(2)}% 0%`;
  if (imgs[0]) imgs[0].style.clipPath = `polygon(0% 0%, ${pts.join(', ')}, 0% 100%)`;
  if (imgs[1]) imgs[1].style.clipPath = `polygon(${pts.join(', ')}, 100% 100%, 100% 0%)`;
}

/**
 * Đợi hình `src` tải xong, đo phần cao còn trống của `host`, chọn gập hay không (gập khi đồ vật to hơn
 * hẳn), gọi `build(plan)` (plan = hai nửa hoặc null) để dựng khung hình rồi đặt cỡ khung theo pixel.
 * `rects` = khung đồ vật / chỗ chạm (null: không gập).
 */
function fillPortrait(ctx, host, src, rects, build) {
  host.classList.add('is-fill');
  const im = new Image();
  im.src = src;
  let pic = null, plan = null;
  const size = () => {
    if (!host.isConnected || !im.naturalWidth) return;
    if (!portrait()) { // xoay ngang: bỏ cỡ cố định, theo bố cục ngang (fit.js)
      host.classList.remove('is-fill');
      host.style.height = host.style.flex = '';
      if (pic) pic.style.width = pic.style.maxWidth = '';
      pic?.querySelectorAll(':scope > img, :scope > .pk-scene-in > img').forEach(i => { i.style.width = i.style.maxWidth = i.style.maxHeight = ''; });
      return;
    }
    host.classList.add('is-fill');
    host.style.height = host.style.flex = '';
    const pad = pic?.classList.contains('pk-scene') ? 8 : 10;
    const W = im.naturalWidth, H = im.naturalHeight;
    const aw = host.clientWidth - 2 * pad - 4, ah = host.clientHeight - 2 * pad - 10;
    if (aw <= 0 || ah <= 0) return;
    const flat = Math.min(aw / W, ah / H);
    if (!pic) {
      const halves = rects ? foldCut(rects) : null;
      const folded = halves ? Math.min(aw / (halves.max * W), (ah - FOLD_GAP) / (2 * H)) : 0;
      plan = folded > flat * 1.15 ? seamFold(im, halves) : null;
      pic = build(plan);
      if (plan) clipSeam(pic, plan);
    }
    // Giữ nguyên phần cao đã đo: phần dưới (bàn phím, lời khen) đổi cỡ sau đó không kéo hình đi.
    host.style.height = `${host.clientHeight}px`;
    host.style.flex = 'none';
    if (plan) {
      const s = Math.min(aw / (plan.max * W), (ah - FOLD_GAP) / (2 * H));
      pic.style.maxWidth = 'none';
      pic.style.width = `${plan.max * W * s + 2 * pad}px`;
    } else {
      const img = pic.querySelector(':scope > img, :scope > .pk-scene-in > img');
      if (img) Object.assign(img.style, { width: `${W * flat}px`, maxWidth: 'none', maxHeight: 'none' });
    }
  };
  const ready = () => requestAnimationFrame(size);
  if (im.complete && im.naturalWidth) ready(); else im.addEventListener('load', ready, { once: true });
  let t = 0;
  const onResize = () => { clearTimeout(t); t = setTimeout(size, 150); };
  addEventListener('resize', onResize);
  ctx.addCleanup?.(() => { removeEventListener('resize', onResize); clearTimeout(t); });
}

/** Khung sáng chỉ vào một vùng của hình ([x%, y%, w%, h%]); null thì ẩn. */
function highlighter(pic) {
  if (!pic) return () => {};
  const layer = document.createElement('div');
  layer.className = 'pk4-hl-layer';
  pic.append(layer);
  return (zone) => {
    layer.innerHTML = zone ? `<span class="pk4-hl" style="left:${zone[0]}%;top:${zone[1]}%;width:${zone[2]}%;height:${zone[3]}%"></span>` : '';
  };
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const PRAISE = ['Đúng rồi!', 'Giỏi quá!', 'Tuyệt vời!', 'Chính xác!'];

// ── Lập phép tính theo hình ──────────────────────────────────────────────
function playEq(ctx) {
  const { round, stage, talk, wrong, right, solve } = ctx;
  const { lines } = round;
  const shown = new Set(round.show || []);
  stage.innerHTML = `
    <div class="pk4-wrap">
      ${round.img ? '<div class="pk4-pic"></div>' : ''}
      <div class="pk4-eqs">${lines.map((line, l) => `<div class="pk4-eq">${line.map((tok, t) => (tok === '=' || shown.has(t)
        ? `<span class="pk4-tok${isOp(tok) ? ' is-op' : ''}">${fmt(` ${tok} `).trim()}</span>`
        : `<button type="button" class="pk4-box${isOp(tok) ? ' is-op' : ''}" data-l="${l}" data-t="${t}" aria-label="Ô trống"></button>`)).join('')}</div>`).join('')}</div>
      <div class="pk4-pad"></div>
    </div>`;
  mountPicture(ctx, stage.querySelector('.pk4-pic'), round.img);
  const padHost = stage.querySelector('.pk4-pad');
  const boxes = [...stage.querySelectorAll('.pk4-box')];
  const valueAt = (l, t) => {
    const b = stage.querySelector(`.pk4-box[data-l="${l}"][data-t="${t}"]`);
    return b ? (b.dataset.v === undefined ? undefined : b.dataset.v) : String(lines[l][t]);
  };
  let current = null;

  const accepts = (l, t, v) => {
    const line = lines[l];
    const eqAt = line.indexOf('=');
    if (isOp(line[t])) return v === line[t];
    if (t > eqAt) return v === line[t];
    // Các số cùng dấu đứng trước đổi chỗ cho nhau vẫn đúng: 8 + 3 + 4 = 4 + 8 + 3, 15 − 3 − 5 = 15 − 5 − 3.
    // Chỉ có phép cộng thì số đầu cũng đổi được; có phép trừ thì số đầu (số bị trừ) giữ nguyên.
    const left = line.slice(0, eqAt);
    const allPlus = left.every(x => !isOp(x) || x === '+');
    if (t === 0 && !allPlus) return v === line[t];
    const signOf = (i) => (i === 0 ? '+' : left[i - 1]);
    const same = left.map((x, i) => i).filter(i => !isOp(left[i]) && (allPlus || (i > 0 && signOf(i) === signOf(t))));
    const pool = same.map(i => Number(left[i]));
    same.forEach(i => {
      if (i === t) return;
      const got = valueAt(l, i);
      if (got !== undefined && pool.includes(Number(got))) pool.splice(pool.indexOf(Number(got)), 1);
    });
    return pool.includes(v);
  };

  const focus = (box) => {
    current = box;
    boxes.forEach(b => b.classList.toggle('is-on', b === box));
    const tok = lines[box.dataset.l][box.dataset.t];
    showPad(ctx, padHost, isOp(tok) ? { op: true } : { answer: tok }, (v, btn) => {
      if (current !== box) return;
      const l = Number(box.dataset.l), t = Number(box.dataset.t);
      if (!accepts(l, t, v)) {
        // Số đúng nhưng bé đang chọn nhầm ô (vd. bấm 16 khi ô số 9 đang sáng): chỉ sang ô khác, đừng bảo đếm lại.
        const elsewhere = !isOp(tok) && boxes.some(b => b !== box && !b.classList.contains('is-done')
          && !isOp(lines[b.dataset.l][b.dataset.t]) && accepts(Number(b.dataset.l), Number(b.dataset.t), v));
        wrong(btn, elsewhere ? `Số ${numberWord(v)} không điền vào ô này. Bé chạm vào ô khác!`
          : isOp(tok) ? 'Chưa đúng rồi. Thêm vào là cộng, bớt đi là trừ đấy!' : round.hint || 'Chưa đúng rồi. Bé nhìn hình đếm lại!');
        return;
      }
      box.dataset.v = v;
      box.textContent = fmt(` ${v} `).trim();
      box.classList.remove('is-on');
      box.classList.add('is-done');
      sfx.pop(typeof v === 'number' ? Math.min(v, 12) : 6);
      const next = boxes.find(b => !b.classList.contains('is-done'));
      if (!next) {
        say(sayValue(v));
        padHost.innerHTML = '';
        const text = lines.map((line, i) => cap(readText(line.map((_, j) => valueAt(i, j)).join(' ')))).join('. ');
        setTimeout(() => solve(round.done || `${pick(PRAISE)} ${text}.`), 350);
        return;
      }
      // Bong bóng đổi sang lời khen, không để lời "chưa đúng" của lần trước còn treo.
      right(box, `Đúng rồi! ${cap(sayValue(v))}!`);
      focus(next);
    });
  };
  boxes.forEach(b => { b.onclick = () => { if (!b.classList.contains('is-done')) { sfx.tap(); focus(b); } }; });
  focus(boxes[0]);
  talk(round.say);
}

// ── Tính nhẩm ─────────────────────────────────────────────────────────────
function playCalc(ctx) {
  const { round, stage, talk, wrong, right, solve } = ctx;
  const items = round.items.map(s => ({ s, answer: solveBlank(s) }));
  const theme = round.theme ? `<i class="pk4-theme" aria-hidden="true">${round.theme}</i>` : '';
  stage.innerHTML = `
    <div class="pk4-wrap">
      ${round.img ? '<div class="pk4-pic is-small"></div>' : ''}
      <div class="pk4-calcs${items.length <= 4 ? ' is-few' : ''}${round.card ? ' is-card' : ''}">${items.map(({ s }, k) => {
        const ex = `<span class="pk4-calc-ex">${fmt(s).split('?').join('<span class="pk4-box"></span>')}</span>`;
        return round.card
          ? `<button type="button" class="pk4-calc is-card" data-k="${k}"><span class="pk4-over is-${round.card.shape}"><img src="${round.card.img}" alt="" draggable="false"><span class="pk4-over-t is-0">${ex}</span></span></button>`
          : `<button type="button" class="pk4-calc" data-k="${k}">${theme}${ex}</button>`;
      }).join('')}
      </div>
      <div class="pk4-pad is-sticky"></div>
    </div>`;
  mountPicture(ctx, stage.querySelector('.pk4-pic'), round.img);
  const padHost = stage.querySelector('.pk4-pad');
  const cards = [...stage.querySelectorAll('.pk4-calc')];
  let current = null;
  const focus = (card) => {
    current = card;
    cards.forEach(c => c.classList.toggle('is-on', c === card));
    const it = items[card.dataset.k];
    say(readText(it.s));
    showPad(ctx, padHost, { answer: it.answer }, (v, btn) => {
      if (current !== card) return;
      if (v !== it.answer) { wrong(btn, round.hint || 'Chưa đúng rồi. Bé tính lại!'); return; }
      card.querySelector('.pk4-box').textContent = v;
      card.classList.remove('is-on');
      card.classList.add('is-done');
      say(readText(it.s.replace('?', v)));
      const next = cards.find(c => !c.classList.contains('is-done'));
      if (!next) { padHost.innerHTML = ''; setTimeout(() => solve(round.done || 'Giỏi quá! Bé tính đúng hết rồi!'), 600); return; }
      right(card);
      setTimeout(() => { if (current === card) focus(next); }, 700);
    });
    card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  cards.forEach(c => { c.onclick = () => { if (!c.classList.contains('is-done')) { sfx.tap(); focus(c); } }; });
  talk(round.say);
  setTimeout(() => { if (!current) focus(cards[0]); }, 60);
}

// ── Hình + câu hỏi điền số ────────────────────────────────────────────────
function playAsk(ctx) {
  const { round, stage, talk, wrong, right, solve } = ctx;
  const { asks } = round;
  stage.innerHTML = `
    <div class="pk4-wrap">
      ${round.img ? '<div class="pk4-pic"></div>' : ''}
      <div class="pk4-asks">${asks.map((a, k) => `
        <button type="button" class="pk4-ask" data-k="${k}">
          ${a.icon ? `<img class="pk4-ask-icon" src="${a.icon}" alt="" draggable="false">` : ''}
          ${a.label ? `<span class="pk4-ask-label">${fmt(a.label)}</span>` : ''}
          <span class="pk4-box"></span>${a.unit ? `<span class="pk4-ask-unit">${a.unit}</span>` : ''}
        </button>`).join('')}
      </div>
      <div class="pk4-pad"></div>
    </div>`;
  const mark = highlighter(mountPicture(ctx, stage.querySelector('.pk4-pic'), round.img, { fold: false }));
  const padHost = stage.querySelector('.pk4-pad');
  const rows = [...stage.querySelectorAll('.pk4-ask')];
  let current = null;
  const focus = (row, first = false) => {
    current = row;
    rows.forEach(r => r.classList.toggle('is-on', r === row));
    const a = asks[row.dataset.k];
    mark(a.zone);
    if (a.say && !first) talk(a.say);
    showPad(ctx, padHost, a.options ? { options: a.options } : { answer: a.answer }, (v, btn) => {
      if (current !== row) return;
      const got = v && typeof v === 'object' ? v.text : v;
      if (got !== a.answer) { wrong(btn, a.hint || round.hint || 'Chưa đúng rồi. Bé nhìn hình đếm lại!'); return; }
      row.querySelector('.pk4-box').innerHTML = v && typeof v === 'object' ? itemHTML(v) : fmt(got);
      row.classList.remove('is-on');
      row.classList.add('is-done');
      say(`${a.label ? `${readText(a.label)} ` : ''}${sayValue(got)}${a.unit ? ` ${a.unit}` : ''}`);
      const next = rows.find(r => !r.classList.contains('is-done'));
      if (!next) { padHost.innerHTML = ''; mark(null); setTimeout(() => solve(round.done || 'Giỏi quá! Bé trả lời đúng hết rồi!'), 700); return; }
      right(row);
      setTimeout(() => { if (current === row) focus(next); }, 900);
    });
  };
  rows.forEach(r => { r.onclick = () => { if (!r.classList.contains('is-done')) { sfx.tap(); focus(r); } }; });
  talk(asks[0].say && !round.say ? asks[0].say : round.say);
  focus(rows[0], true);
}

// ── Chọn đáp án ───────────────────────────────────────────────────────────
function playChoice(ctx) {
  const { round, stage, talk, wrong, right, solve, circleIt } = ctx;
  const answers = [].concat(round.answer);
  const kinds = new Set(round.options.map(itemKind));
  stage.innerHTML = `
    <div class="pk4-wrap">
      ${round.img ? '<div class="pk4-pic"></div>' : ''}
      <div class="pk4-opts ${[...kinds].join(' ')}${round.cols ? ' is-grid' : ''}" style="--n:${round.cols || round.options.length}">
        ${round.options.map((o, k) => `<button type="button" class="pk4-opt ${itemKind(o)}" data-k="${k}"${typeof o === 'number' ? ` style="--c:${colorOf(o)}"` : ''}>${itemHTML(o)}</button>`).join('')}
      </div>
    </div>`;
  mountPicture(ctx, stage.querySelector('.pk4-pic'), round.img);
  const found = new Set();
  stage.querySelectorAll('.pk4-opt').forEach(btn => {
    btn.onclick = () => {
      const k = Number(btn.dataset.k);
      if (found.has(k) || found.size === answers.length) return;
      if (!answers.includes(k)) { wrong(btn, round.hint || 'Chưa đúng rồi. Bé quan sát thật kỹ rồi chọn lại!'); return; }
      found.add(k);
      if (itemKind(round.options[k]) === 'is-num') circleIt(btn); else btn.classList.add('is-right');
      const text = itemSay(round.options[k]);
      if (found.size === answers.length) { solve(round.done || `${pick(PRAISE)}${answers.length === 1 && text ? ` ${cap(text)}.` : ''}`); return; }
      right(btn, `${pick(PRAISE)} Còn ${numberWord(answers.length - found.size)} đáp án nữa đấy!`);
    };
  });
  talk(round.say);
}

// ── Chạm đúng chỗ trên hình ──────────────────────────────────────────────
function playSpot(ctx) {
  const { round, stage, talk, wrong, right, solve } = ctx;
  const answers = new Set(round.answer);
  stage.innerHTML = `
    <div class="pk4-wrap">
      <div class="pk4-pic"></div>
      <div class="pk4-dots">${[...answers].map(() => '<span></span>').join('')}</div>
    </div>`;
  const host = stage.querySelector('.pk4-pic');
  const zone = ([x, y, w, h], k) => `<button type="button" class="pk4-zone" data-k="${k}" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%" aria-label="Chỗ ${k + 1}"></button>`;
  // plan = hai nửa (màn hình dọc, hình dài): mỗi nửa một khung cắt từ cùng hình, chỗ chạm đổi sang toạ độ trong nửa chứa nó.
  const buildScene = (plan) => {
    const scene = document.createElement('div');
    scene.className = `pk-scene pk4-spot${plan ? ' is-split' : ''}`;
    scene.innerHTML = plan
      ? plan.map((hf, i) => `<div class="pk-half" style="width:${(hf.w / plan.max) * 100}%"><div class="pk-half-clip"><img src="${round.img}" alt="" draggable="false" style="width:${100 / hf.w}%;margin-left:${(-hf.x / hf.w) * 100}%"></div><div class="pk4-zones">${
        round.zones.map((z, k) => [z, k]).filter(([[x, , w]]) => ((x + w / 2) >= plan.cut * 100 ? 1 : 0) === i)
          .map(([[x, y, w, h], k]) => zone([(x - hf.x * 100) / hf.w, y, w / hf.w, h], k)).join('')}</div></div>`).join('')
      : `<div class="pk-scene-in"><img src="${round.img}" alt="" draggable="false">${round.zones.map(zone).join('')}</div>`;
    host.append(scene);
    bindZones(scene);
    return scene;
  };
  const dots = [...stage.querySelectorAll('.pk4-dots span')];
  const extra = new Set(round.extra || []);
  const circle = '<svg class="pk-circle" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 6 C80 4 96 26 94 52 C92 80 70 96 46 94 C20 92 4 72 6 46 C8 22 28 8 56 8"/></svg>';
  let found = 0;
  const bindZones = (scene) => scene.querySelectorAll('.pk4-zone').forEach(z => {
    z.onclick = () => {
      if (z.classList.contains('is-right') || found === answers.size) return;
      const k = Number(z.dataset.k);
      if (extra.has(k)) { // cũng đúng, nhưng không bắt buộc phải tìm
        z.classList.add('is-right');
        z.insertAdjacentHTML('beforeend', circle);
        right(z, round.extraSay || `${pick(PRAISE)} Bé tìm thêm!`);
        return;
      }
      if (!answers.has(k)) { wrong(z, round.hint || 'Chưa đúng rồi. Bé tìm chỗ khác!'); return; }
      z.classList.add('is-right');
      z.insertAdjacentHTML('beforeend', circle);
      dots[found++]?.classList.add('is-on');
      if (found === answers.size) { solve(round.done || 'Giỏi quá! Bé tìm đúng hết rồi!'); return; }
      right(z, `${pick(PRAISE)} Còn ${numberWord(answers.size - found)} chỗ nữa!`);
    };
  });
  if (portrait()) fillPortrait(ctx, host, round.img, round.zones, buildScene);
  else {
    // Hình cắt nhỏ vẫn hiện đủ to để bé dễ chạm: phóng theo bề ngang còn trống, không quá 60% chiều cao màn hình.
    const pic = buildScene(null).querySelector('img');
    const fit = () => {
      if (!pic.naturalWidth) return;
      const room = stage.clientWidth - 24;
      pic.style.width = `${Math.min(room, 900, (window.innerHeight * 0.6 * pic.naturalWidth) / pic.naturalHeight)}px`;
      pic.style.maxHeight = 'none';
    };
    if (pic.complete) fit(); else pic.onload = fit;
  }
  talk(round.say);
}

/** Đoạn nối hai thẻ, từ mép thẻ này đến mép thẻ kia (ngang: mép trái / phải, dọc: mép trên / dưới). */
function edgeLine(a, b) {
  const [ax, ay, bx, by] = [a.left + a.width / 2, a.top + a.height / 2, b.left + b.width / 2, b.top + b.height / 2];
  if (Math.abs(bx - ax) > Math.abs(by - ay)) {
    const s = Math.sign(bx - ax);
    return [ax + (s * a.width) / 2, ay, bx - (s * b.width) / 2, by];
  }
  const s = Math.sign(by - ay);
  return [ax, ay + (s * a.height) / 2, bx, by - (s * b.height) / 2];
}

// ── Nối ───────────────────────────────────────────────────────────────────
function playLink(ctx) {
  const { round, stage, talk, wrong, right, solve, addCleanup } = ctx;
  const layout = round.layout || 'lr';
  const card = (it, side, i) => `<button type="button" class="pk4-node ${itemKind(it)}" data-side="${side}" data-i="${i}">${itemHTML(it)}</button>`;
  const froms = round.from.map((it, i) => card(it, 'from', i));
  const tos = `<div class="pk4-col is-to">${round.to.map((it, j) => card(it, 'to', j)).join('')}</div>`;
  const half = Math.ceil(froms.length / 2);
  // Chỉ có chữ/số (không hình): thẻ to theo chiều cao còn trống, chia cho số hàng của cột dài nhất.
  const textOnly = ![...round.from, ...round.to].some(it => itemKind(it) === 'is-img');
  const rows = layout === 'mid' ? Math.max(half, round.to.length) : Math.max(round.from.length, round.to.length);
  stage.innerHTML = `
    <div class="pk4-link is-${layout}${textOnly && layout !== 'tb' ? ' is-big' : ''}" style="--rows:${rows}">
      <svg class="pk-match-lines" aria-hidden="true"></svg>
      ${layout === 'mid'
        ? `<div class="pk4-col">${froms.slice(0, half).join('')}</div>${tos}<div class="pk4-col">${froms.slice(half).join('')}</div>`
        : `<div class="pk4-col">${froms.join('')}</div>${tos}`}
    </div>`;
  const box = stage.querySelector('.pk4-link');
  const svg = box.querySelector('svg');
  const node = (side, i) => box.querySelector(`.pk4-node[data-side="${side}"][data-i="${i}"]`);
  const need = new Set(round.pairs.map(([i]) => i));
  const links = [];
  let sel = null;

  let drawn = 0;
  const draw = () => {
    const bb = box.getBoundingClientRect();
    svg.innerHTML = links.map(([i, j], k) => {
      const [x1, y1, x2, y2] = edgeLine(node('from', i).getBoundingClientRect(), node('to', j).getBoundingClientRect());
      return `<line x1="${x1 - bb.left}" y1="${y1 - bb.top}" x2="${x2 - bb.left}" y2="${y2 - bb.top}" ${k < drawn ? ' class="is-old"' : ''} style="stroke:${LINK_COLORS[i % LINK_COLORS.length]}"/>`;
    }).join('');
    drawn = links.length;
  };
  const ro = new ResizeObserver(draw);
  ro.observe(box);
  addCleanup(() => ro.disconnect());

  box.querySelectorAll('.pk4-node').forEach(n => {
    n.onclick = () => {
      const side = n.dataset.side, i = Number(n.dataset.i);
      if (side === 'from' && links.some(([f]) => f === i)) return;
      if (!sel || sel.dataset.side === side) {
        sel?.classList.remove('is-picked');
        sel = sel === n ? null : n;
        sel?.classList.add('is-picked');
        sfx.pop(4);
        const text = itemSay(side === 'from' ? round.from[i] : round.to[i]);
        if (text && sel) say(text);
        return;
      }
      const other = sel;
      sel = null;
      other.classList.remove('is-picked');
      const [f, t] = side === 'from' ? [i, Number(other.dataset.i)] : [Number(other.dataset.i), i];
      if (!round.pairs.some(([a, b]) => a === f && b === t)) { wrong(n, round.hint || 'Hai hình này chưa khớp nhau. Bé thử lại!'); return; }
      links.push([f, t]);
      const color = LINK_COLORS[f % LINK_COLORS.length];
      [node('from', f), node('to', t)].forEach(x => { x.classList.add('is-linked'); x.style.setProperty('--pair', color); });
      draw();
      const text = round.says ? readText(round.says[f]) : itemSay(round.to[t]);
      if (links.length === need.size) { solve(round.done || 'Giỏi quá! Bé nối đúng hết rồi!'); return; }
      right(n, `${pick(PRAISE)}${text ? ` ${cap(text)}.` : ''}`);
    };
  });
  talk(round.say);
}

// ── Chạm theo thứ tự ──────────────────────────────────────────────────────
function playRank(ctx) {
  const { round, stage, talk, wrong, right, solve } = ctx;
  stage.innerHTML = `
    <div class="pk4-wrap">
      ${round.img ? '<div class="pk4-pic"></div>' : ''}
      <div class="pk4-opts ${[...new Set(round.items.map(itemKind))].join(' ')}${round.cols ? ' is-grid' : ''}" style="--n:${round.cols || round.items.length}">
        ${round.items.map((it, k) => `<button type="button" class="pk4-opt ${itemKind(it)}" data-k="${k}">${itemHTML(it)}</button>`).join('')}
      </div>
      <div class="pk4-orderline">${round.order.map((_, s) => `<span class="pk4-box" data-s="${s}"></span>`).join('<span class="pk4-lt">➜</span>')}</div>
    </div>`;
  mountPicture(ctx, stage.querySelector('.pk4-pic'), round.img);
  let step = 0;
  stage.querySelectorAll('.pk4-opt').forEach(btn => {
    btn.onclick = () => {
      const k = Number(btn.dataset.k);
      if (btn.classList.contains('is-right') || step >= round.order.length) return;
      if (k !== round.order[step]) { wrong(btn, round.hint || 'Chưa đúng rồi. Bé so sánh lại xem cái nào đứng trước!'); return; }
      btn.classList.add('is-right');
      btn.insertAdjacentHTML('beforeend', `<span class="pk4-rank">${step + 1}</span>`);
      const slot = stage.querySelector(`.pk4-orderline .pk4-box[data-s="${step}"]`);
      const it = round.items[k];
      slot.innerHTML = it && it.over ? `<span class="pk4-txt">${fmt(it.over.join(''))}</span>` : itemHTML(it);
      slot.classList.add('is-done');
      step++;
      sfx.pop(step + 2);
      if (step === round.order.length) { solve(round.done || 'Giỏi quá! Bé xếp đúng thứ tự rồi!'); return; }
      right(btn);
      const text = itemSay(round.items[k]);
      if (text) say(text);
    };
  });
  talk(round.say);
}

// ── Đi đường số ───────────────────────────────────────────────────────────
function playPath(ctx) {
  const { round, stage, talk, wrong, solve } = ctx;
  const { grid, from, to } = round;
  const dir = to > from ? 1 : -1;
  stage.innerHTML = `
    <div class="pk4-wrap">
      <div class="pk4-path" style="--cols:${grid[0].length}">
        ${grid.map((row, r) => row.map((v, c) => (v == null
          ? '<span class="pk4-cell is-empty" aria-hidden="true"></span>'
          : `<button type="button" class="pk4-cell" data-r="${r}" data-c="${c}">${v}</button>`)).join('')).join('')}
      </div>
    </div>`;
  const trail = [];
  const used = (r, c) => trail.some(([a, b]) => a === r && b === c);
  const near = (r, c) => [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].filter(([a, b]) => grid[a]?.[b] !== undefined);
  const seen = new Set();
  const canFinish = (r, c, v) => {
    if (v === to) return true;
    seen.add(`${r},${c}`);
    const ok = near(r, c).some(([a, b]) => grid[a][b] === v + dir && !used(a, b) && !seen.has(`${a},${b}`) && canFinish(a, b, v + dir));
    seen.delete(`${r},${c}`);
    return ok;
  };
  stage.querySelectorAll('button.pk4-cell').forEach(el => {
    el.onclick = () => {
      if (trail.length && trail[trail.length - 1][2] === to) return;
      const r = Number(el.dataset.r), c = Number(el.dataset.c), v = grid[r][c];
      const last = trail[trail.length - 1];
      if (last && last[0] === r && last[1] === c) { // chạm lại ô cuối: lùi một bước
        trail.pop();
        el.classList.remove('is-on');
        sfx.tap();
        return;
      }
      if (used(r, c)) return;
      const want = last ? last[2] + dir : from;
      if (v !== want) { wrong(el, `Chưa đúng rồi. Bé tìm số ${numberWord(want)}!`); return; }
      if (last && !near(last[0], last[1]).some(([a, b]) => a === r && b === c)) { wrong(el, 'Ô này không nằm cạnh ô vừa đi. Bé đi ngang hoặc dọc thôi!'); return; }
      trail.push([r, c, v]);
      if (!canFinish(r, c, v)) {
        trail.pop();
        wrong(el, 'Đi lối này sẽ bị tắc đường đấy. Bé tìm ô khác!');
        return;
      }
      el.classList.add('is-on');
      el.style.setProperty('--k', trail.length);
      sfx.pop(Math.min(trail.length, 12));
      say(numberWord(v));
      const [x, y] = centerOf(el);
      burst(x, y, { count: 6 });
      if (v === to) setTimeout(() => solve(round.done || 'Giỏi quá! Bé đã tìm được đường về rồi!'), 400);
    };
  });
  talk(round.say);
}

// ── Điền số còn thiếu ─────────────────────────────────────────────────────
function playSeq(ctx) {
  const { round, stage, talk, wrong, right, solve } = ctx;
  const { cells, links } = round;
  const hide = new Set(round.hide);
  const cell = (v, k) => (hide.has(k)
    ? `<button type="button" class="pk4-seq-cell pk4-box" data-k="${k}" aria-label="Ô trống"></button>`
    : `<span class="pk4-seq-cell" style="--c:${colorOf(v)}">${v}</span>`);
  stage.innerHTML = `
    <div class="pk4-wrap">
      ${round.img ? '<div class="pk4-pic is-small"></div>' : ''}
      ${links
        ? `<div class="pk4-chain">${cells.map((v, k) => `${k ? `<span class="pk4-arrow">${fmt(links[k - 1])}<i>➜</i></span>` : ''}${cell(v, k)}`).join('')}</div>`
        : `<div class="pk4-seq${cells.length > 40 ? ' is-dense' : ''}" style="--cols:${round.cols || 10}">${cells.map(cell).join('')}</div>`}
      <div class="pk4-pad is-sticky"></div>
    </div>`;
  mountPicture(ctx, stage.querySelector('.pk4-pic'), round.img);
  const padHost = stage.querySelector('.pk4-pad');
  const blanks = [...stage.querySelectorAll('.pk4-box')];
  let current = null;
  const focus = (b) => {
    current = b;
    blanks.forEach(x => x.classList.toggle('is-on', x === b));
    const answer = cells[b.dataset.k];
    showPad(ctx, padHost, { answer }, (v, btn) => {
      if (current !== b) return;
      if (v !== answer) { wrong(btn, round.hint || 'Chưa đúng rồi. Bé nhìn số đứng trước và đứng sau!'); return; }
      b.textContent = v;
      b.classList.remove('is-on');
      b.classList.add('is-done');
      say(numberWord(v));
      const next = blanks.find(x => !x.classList.contains('is-done'));
      if (!next) { padHost.innerHTML = ''; setTimeout(() => solve(round.done || 'Giỏi quá! Bé điền đủ các số rồi!'), 400); return; }
      right(b);
      focus(next);
    });
    b.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };
  blanks.forEach(b => { b.onclick = () => { if (!b.classList.contains('is-done')) { sfx.tap(); focus(b); } }; });
  talk(round.say);
  setTimeout(() => { if (!current) focus(blanks[0]); }, 60);
}

export const PLAYERS4 = {
  eq: playEq, calc: playCalc, ask: playAsk, choice: playChoice, spot: playSpot,
  link: playLink, rank: playRank, path: playPath, seq: playSeq,
};
