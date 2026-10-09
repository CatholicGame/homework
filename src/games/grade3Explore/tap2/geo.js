/**
 * Bài 50 (chu vi), 51 (diện tích, xăng-ti-mét vuông), 52 (diện tích hình chữ nhật, hình vuông).
 * Công cụ 📐 Tấm hình: dòng hỏi ở trên, hình SVG ở giữa (khung nhìn ôm sát hình nên hình luôn to kín chỗ), dòng phép
 * tính ở dưới, vùng nút chọn giữ chỗ ở đáy từ đầu (không đẩy hình).
 *  - Chu vi: bấm từng cạnh → chú kiến bò hết cạnh đó, cạnh đổi màu, số đo bay xuống dòng phép tính.
 *  - Diện tích: lưới ô 1 cm² nét đứt; bấm ô → lát ô vuông màu, có số thứ tự.
 */

import { css, emitter, INK } from '../../grade4Tools/frame.js';
import { flyOne, calmMotion } from '../../grade3Games/fly.js';
import { sleep, sfx, ask } from './kit.js';

const NS = 'http://www.w3.org/2000/svg';
const f1 = (n) => Math.round(n * 10) / 10;
const anim = (ms) => (calmMotion() ? Math.round(ms * 1.2) : ms);

/** Chú kiến (gốc 0,0 = giữa thân, hướng sang phải). */
const ANT = `<g class="x3g-antbody"><ellipse cx="-13" cy="0" rx="10" ry="7.5" fill="${INK}"/><ellipse cx="2" cy="0" rx="7" ry="6" fill="${INK}"/>
  <circle cx="15" cy="-1" r="6.5" fill="${INK}"/><circle cx="17" cy="-3" r="1.8" fill="#fff"/>
  <path d="M-9 4 L-17 13 M-1 5 L-1 14 M5 4 L12 13 M-9 -4 L-17 -13 M-1 -5 L-1 -14 M5 -4 L12 -13 M18 -6 L25 -14 M15 -7 L18 -16" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;

export function createGeo(host) {
  injectGeoCss();
  const t = emitter({});
  host.innerHTML = `
    <div class="x3g">
      <div class="x3g-cap">&nbsp;</div>
      <svg class="x3g-svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100"></svg>
      <div class="x3g-eq">&nbsp;</div>
      <div class="x3g-pad" aria-hidden="true"></div>
    </div>`;
  const root = host.querySelector('.x3g');
  const svg = root.querySelector('svg');
  const eq = root.querySelector('.x3g-eq');
  t.root = root; t.svg = svg; t.eqEl = eq;
  t.caption = (html) => { root.querySelector('.x3g-cap').innerHTML = html || '&nbsp;'; };
  t.eq = (html) => { eq.innerHTML = html || '&nbsp;'; };
  t.clear = () => { svg.innerHTML = ''; t.eq(''); sides = []; cells = []; ant = null; };
  /** Khung nhìn ôm sát vùng (x, y, w, h) có lề. */
  t.fit = (x, y, w, h, pad = 0.12) => {
    const px = w * pad + 30, py = h * pad + 30;
    svg.setAttribute('viewBox', `${f1(x - px)} ${f1(y - py)} ${f1(w + 2 * px)} ${f1(h + 2 * py)}`);
  };
  const add = (html) => { svg.insertAdjacentHTML('beforeend', html); return svg.lastElementChild; };
  t.add = add;

  // ── Chu vi: đa giác có cạnh bấm được ───────────────────────────────────────────────────────────
  let sides = [], ant = null, P = [], fs = 40;
  /**
   * pts: [[x, y]…] theo đơn vị đo (vd. cm); scale: số đơn vị SVG cho 1 đơn vị đo. lens: chữ số đo từng cạnh (cạnh i: P[i]→P[i+1]).
   * names: tên đỉnh. Trả về toạ độ SVG.
   */
  t.polygon = (pts, { scale = 100, lens = [], names = '', fill = '#FEF9C3' } = {}) => {
    t.clear();
    P = pts.map(([x, y]) => [x * scale, y * scale]);
    const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
    const minX = Math.min(...xs), minY = Math.min(...ys), w = Math.max(...xs) - minX, h = Math.max(...ys) - minY;
    fs = Math.max(w, h) * 0.085;
    t.fit(minX, minY, w, h, 0.16);
    const cx = xs.reduce((a, b) => a + b) / P.length, cy = ys.reduce((a, b) => a + b) / P.length;
    add(`<polygon points="${P.map(p => p.join(',')).join(' ')}" fill="${fill}" stroke="none"/>`);
    sides = P.map((a, i) => {
      const b = P[(i + 1) % P.length];
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      // nhãn số đo: lệch ra ngoài hình (xa tâm)
      const nx = mx - cx, ny = my - cy, nl = Math.hypot(nx, ny) || 1;
      const lx = mx + (nx / nl) * fs * 1.1, ly = my + (ny / nl) * fs * 1.1 + fs * 0.35;
      const g = add(`<g class="x3g-side" data-i="${i}">
        <line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="transparent" stroke-width="${fs * 1.4}" stroke-linecap="round"/>
        <line class="x3g-edge" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${INK}" stroke-width="${fs * 0.16}" stroke-linecap="round"/>
        <line class="x3g-trail" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#F97316" stroke-width="${fs * 0.26}" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
        ${lens[i] ? `<text class="x3g-len" x="${f1(lx)}" y="${f1(ly)}" font-size="${f1(fs)}">${lens[i]}</text>` : ''}</g>`);
      return g;
    });
    [...names].forEach((n, i) => {
      const [x, y] = P[i], nx = x - cx, ny = y - cy, nl = Math.hypot(nx, ny) || 1;
      add(`<text class="x3g-name" x="${f1(x + (nx / nl) * fs * 0.9)}" y="${f1(y + (ny / nl) * fs * 0.9 + fs * 0.35)}" font-size="${f1(fs * 0.95)}">${n}</text>`);
    });
    return P;
  };
  /** Bố cục dọc (b) có làm hình to hơn bố cục ngang (a) không: a, b = [rộng, cao] của vùng hình. */
  t.tall = (a, b) => {
    const r = svg.getBoundingClientRect(), W = r.width || 1, H = r.height || 1;
    return Math.min(W / b[0], H / b[1]) > Math.min(W / a[0], H / a[1]);
  };
  t.sideEl = (i) => sides[i];
  t.sideDone = (i) => sides[i]?.classList.contains('x3g-done');
  /** Kiến bò hết cạnh i (đặt kiến ở đầu cạnh nếu chưa có). */
  t.walk = async (i) => {
    const a = P[i], b = P[(i + 1) % P.length];
    const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    if (!ant) ant = add(`<g class="x3g-ant" pointer-events="none">${ANT}</g>`);
    svg.appendChild(ant);
    const k = fs / 30;
    const ms = anim(900);
    const trail = sides[i].querySelector('.x3g-trail');
    trail.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: ms, easing: 'linear', fill: 'forwards' });
    sfx.swish();
    await ant.animate([
      { transform: `translate(${a[0]}px, ${a[1]}px) rotate(${ang}deg) scale(${k})` },
      { transform: `translate(${b[0]}px, ${b[1]}px) rotate(${ang}deg) scale(${k})` },
    ], { duration: ms, easing: 'ease-in-out', fill: 'forwards' }).finished;
    trail.setAttribute('stroke-dashoffset', '0');
    sides[i].classList.add('x3g-done');
    sfx.pop(i);
  };
  /** Số đo cạnh i bay xuống phần tử el (một số hạng trong dòng phép tính). */
  t.flyLen = (i, el) => new Promise((res) => {
    const tx = sides[i].querySelector('.x3g-len');
    if (!tx || !el) { res(); return; }
    flyOne(`<div class="x3g-fly">${tx.textContent}</div>`, tx.getBoundingClientRect(), el.getBoundingClientRect(), {
      minMs: 380, maxMs: 600, onLand: () => { el.classList.remove('x3g-wait'); sfx.tap(); res(); },
    });
  });

  // ── Diện tích: lưới ô 1 cm² ───────────────────────────────────────────────────────────────────
  let cells = [], cs = 100, n = 0;
  /** Lưới cols × rows ô (ô cạnh 1 đơn vị đo). on: hàng nào bấm được (null = mọi hàng). */
  t.grid = (cols, rows, { color = '#FDBA74', fitBox = null } = {}) => {
    t.clear();
    n = 0;
    cs = 100;
    fs = cs * 0.42;
    const W = cols * cs, H = rows * cs;
    if (fitBox) t.fit(...fitBox, 0.02); else t.fit(0, 0, W, H, 0.1);
    let g = '';
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      g += `<g class="x3g-cell" data-j="${j}" data-i="${i}"><rect x="${i * cs}" y="${j * cs}" width="${cs}" height="${cs}" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3" stroke-dasharray="10 8"/></g>`;
    }
    add(`<g>${g}</g><rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="${INK}" stroke-width="6" pointer-events="none"/>`);
    cells = [...svg.querySelectorAll('.x3g-cell')];
    t.cellColor = color;
    t.rows = rows; t.cols = cols;
    return { W, H };
  };
  t.count = () => n;
  t.cellAt = (i, j) => cells.find(c => +c.dataset.i === i && +c.dataset.j === j);
  /** Lát ô (i, j). */
  t.fill = (cell, { quiet = false } = {}) => {
    if (!cell || cell.dataset.on) return false;
    cell.dataset.on = '1';
    n++;
    const r = cell.querySelector('rect');
    const x = +r.getAttribute('x'), y = +r.getAttribute('y');
    r.setAttribute('fill', t.cellColor); r.setAttribute('stroke', INK); r.setAttribute('stroke-dasharray', ''); r.setAttribute('stroke-width', '3');
    cell.insertAdjacentHTML('beforeend', `<text class="x3g-cn" x="${x + cs / 2}" y="${y + cs / 2 + fs * 0.36}" font-size="${f1(fs)}">${n}</text>`);
    r.animate([{ transform: 'scale(0.55)', transformOrigin: `${x + cs / 2}px ${y + cs / 2}px` }, { transform: 'scale(1)', transformOrigin: `${x + cs / 2}px ${y + cs / 2}px` }], { duration: anim(240), easing: 'cubic-bezier(.2,1.5,.4,1)' });
    if (!quiet) sfx.pop(n % 10);
    t.emit('tile', n);
    return true;
  };
  /** Thầy lát cả hàng j (từng ô). */
  t.fillRow = async (j) => { for (let i = 0; i < t.cols; i++) { t.fill(t.cellAt(i, j)); await sleep(anim(140)); } };
  let rowsOn = null;
  t.only = (rows) => { rowsOn = rows; cells.forEach(c => c.classList.toggle('x3g-live', !rows || rows.includes(+c.dataset.j))); };
  /** Khung chữ nhật đậm có nhãn chiều dài / chiều rộng (đơn vị SVG của lưới). */
  t.dims = (cols, rows, { top = `${cols} cm`, left = `${rows} cm` } = {}) => {
    const W = cols * cs, H = rows * cs;
    add(`<text class="x3g-len" x="${W / 2}" y="${-fs * 0.6}" font-size="${f1(fs * 1.1)}">${top}</text>
      <text class="x3g-len" x="${-fs * 0.5}" y="${H / 2 + fs * 0.4}" font-size="${f1(fs * 1.1)}" style="text-anchor:end">${left}</text>`);
  };

  // Bấm
  svg.addEventListener('click', (e) => {
    const s = e.target.closest('.x3g-side');
    if (s && svg.classList.contains('x3g-sides-on')) { t.emit('side', +s.dataset.i); return; }
    const c = e.target.closest('.x3g-cell');
    if (c && svg.classList.contains('x3g-cells-on') && (!rowsOn || rowsOn.includes(+c.dataset.j))) t.fill(c);
  });
  t.sidesOn = (on) => svg.classList.toggle('x3g-sides-on', on);
  t.cellsOn = (on) => svg.classList.toggle('x3g-cells-on', on);
  return t;
}

/** Dòng phép tính có các ô số hạng (giữ chỗ, hiện dần). */
const termsHtml = (lead, terms, tail = '') => `${lead}${terms.map((x, k) => `${k ? ' + ' : ''}<span class="x3g-term x3g-wait" data-k="${k}">${x}</span>`).join('')}${tail}`;
const RESULT = (x) => ` = <span class="x3g-term x3g-wait" data-k="r">${x}</span>`;
const showTerm = (t, k) => t.eqEl.querySelector(`[data-k="${k}"]`)?.classList.remove('x3g-wait');

// ── Bài 50: Chu vi ────────────────────────────────────────────────────────────────────────────────────
const RECT = (a, b) => [[0, 0], [a, 0], [a, b], [0, b]];
const B50 = {
  title: 'Bài 50: Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông',
  setup: (board) => createGeo(board),
  steps: [
    async (c) => {
      const t = c.t;
      t.polygon([[0, 4.55], [2.08, 0], [6, 4.55]], { lens: ['5 cm', '6 cm', '6 cm'], names: 'ABC' });
      t.caption('Chu vi hình tam giác ABC');
      await c.say('Chú kiến bò một vòng quanh hình tam giác A B C. Đường chú kiến đi dài bao nhiêu?', 'Chú kiến bò <b>một vòng</b> quanh hình');
      t.eq(termsHtml('', ['5', '6', '6'], RESULT('17 (cm)')));
      for (let i = 0; i < 3; i++) {
        await t.walk(i);
        await t.flyLen(i, t.eqEl.querySelector(`[data-k="${i}"]`));
      }
      showTerm(t, 'r');
      sfx.ding();
      await c.say('Chu vi của một hình là tổng độ dài các cạnh của hình đó. Chu vi hình tam giác A B C là: 5 cộng 6 cộng 6 bằng 17 xăng-ti-mét.',
        '<b>Chu vi</b> = tổng độ dài các cạnh<br>5 + 6 + 6 = 17 (cm)');
    },
    async (c) => {
      const t = c.t;
      t.polygon([[0, 0], [5, 0], [4, 3], [0, 3]], { lens: ['5 dm', '3 dm', '4 dm', '3 dm'], names: 'MNPQ', fill: '#DCFCE7' });
      t.caption('Chu vi hình tứ giác MNPQ');
      const order = [];
      t.eq(termsHtml('', ['0', '0', '0', '0'], ''));
      t.sidesOn(true);
      await c.say('Đến lượt em. Bấm lần lượt từng cạnh để chú kiến bò hết một vòng.', 'Bấm <b>từng cạnh</b> của hình');
      let busy = false;
      const off = t.on(async (ev, i) => {
        if (ev !== 'side' || busy || t.sideDone(i)) return;
        busy = true;
        const k = order.length;
        order.push(i);
        const el = t.eqEl.querySelector(`[data-k="${k}"]`);
        el.textContent = t.sideEl(i).querySelector('.x3g-len').textContent.replace(' dm', '');
        await t.walk(i);
        await t.flyLen(i, el);
        busy = false;
        t.emit('walked');
      });
      await c.until(t, () => order.length === 4 && !busy, { nudge: 'Bấm vào một cạnh chưa tô màu cam.', el: () => t.sideEl([0, 1, 2, 3].find(i => !t.sideDone(i)) ?? 0) });
      off();
      t.sidesOn(false);
      await ask(c, {
        say: 'Chu vi hình tứ giác M N P Q là bao nhiêu?', shown: 'Chu vi hình tứ giác MNPQ là?',
        options: [{ html: '12 dm', value: 12 }, { html: '15 dm', value: 15 }, { html: '20 dm', value: 20 }], answer: 15,
        hint: 'Cộng độ dài bốn cạnh: 5 + 3 + 4 + 3.',
      });
      t.eq('5 + 3 + 4 + 3 = <b>15 (dm)</b>');
      await c.say('Đúng rồi! 5 cộng 3 cộng 4 cộng 3 bằng 15 đề-xi-mét.');
    },
    async (c) => {
      const t = c.t;
      t.polygon(RECT(6, 4), { lens: ['6 cm', '4 cm', '6 cm', '4 cm'], names: 'ABCD', fill: '#DBEAFE' });
      t.caption('Chu vi hình chữ nhật ABCD: dài 6 cm, rộng 4 cm');
      t.eq(termsHtml('', ['6', '4', '6', '4'], RESULT('20 (cm)')));
      await c.say('Hình chữ nhật có chiều dài 6 xăng-ti-mét, chiều rộng 4 xăng-ti-mét. Chú kiến bò một vòng.');
      for (let i = 0; i < 4; i++) { await t.walk(i); await t.flyLen(i, t.eqEl.querySelector(`[data-k="${i}"]`)); }
      showTerm(t, 'r');
      await c.say('Hai chiều dài bằng nhau, hai chiều rộng bằng nhau. Nên lấy chiều dài cộng chiều rộng, rồi nhân với 2.', 'Hai chiều dài, hai chiều rộng');
      t.eq('(6 + 4) × 2 = <b>20 (cm)</b>');
      sfx.ding();
      await c.say('Chu vi hình chữ nhật bằng chiều dài cộng chiều rộng, rồi nhân với 2.', 'Chu vi HCN = (dài + rộng) × 2');
    },
    async (c) => {
      const t = c.t;
      t.polygon(RECT(5, 3), { lens: ['5 cm', '3 cm', '5 cm', '3 cm'], names: 'MNPQ', fill: '#DBEAFE' });
      t.caption('Hình chữ nhật dài 5 cm, rộng 3 cm');
      await ask(c, {
        say: 'Chu vi hình chữ nhật này là bao nhiêu?', shown: 'Chu vi = (5 + 3) × 2 = ?',
        options: [{ html: '8 cm', value: 8 }, { html: '15 cm', value: 15 }, { html: '16 cm', value: 16 }], answer: 16,
        hint: 'Cộng chiều dài với chiều rộng, rồi nhân với 2.',
      });
      t.eq('(5 + 3) × 2 = <b>16 (cm)</b>');
      for (let i = 0; i < 4; i++) await t.walk(i);
      await c.say('Đúng rồi! 5 cộng 3 bằng 8, 8 nhân 2 bằng 16 xăng-ti-mét.');
    },
    async (c) => {
      const t = c.t;
      t.polygon(RECT(5, 5), { lens: ['5 cm', '5 cm', '5 cm', '5 cm'], names: 'ABCD', fill: '#FCE7F3' });
      t.caption('Hình vuông ABCD cạnh 5 cm');
      await c.say('Hình vuông có bốn cạnh bằng nhau. Chú kiến bò bốn cạnh, mỗi cạnh 5 xăng-ti-mét.');
      t.eq(termsHtml('', ['5', '5', '5', '5'], ''));
      for (let i = 0; i < 4; i++) { await t.walk(i); await t.flyLen(i, t.eqEl.querySelector(`[data-k="${i}"]`)); }
      t.eq('5 × 4 = <b>20 (cm)</b>');
      sfx.ding();
      await c.say('Chu vi hình vuông bằng độ dài một cạnh nhân với 4. 5 nhân 4 bằng 20 xăng-ti-mét.', 'Chu vi hình vuông = cạnh × 4');
      await ask(c, {
        say: 'Hình vuông cạnh 6 xăng-ti-mét thì chu vi là bao nhiêu?', shown: 'Hình vuông cạnh <b>6 cm</b>: chu vi = ?',
        options: [{ html: '10 cm', value: 10 }, { html: '24 cm', value: 24 }, { html: '36 cm', value: 36 }], answer: 24,
        hint: 'Lấy độ dài một cạnh nhân với 4.', ok: '6 nhân 4 bằng 24 xăng-ti-mét.', okShown: '6 × 4 = <b>24 (cm)</b>',
      });
    },
  ],
};

// ── Bài 51: Diện tích của một hình. Xăng-ti-mét vuông ────────────────────────────────────────────────
/** Hình ghép từ ô vuông (mảng [i, j]) tại gốc (ox, oy), cạnh ô s. */
const cellsShape = (cells, ox, oy, s, color, label) => `<g>${cells.map(([i, j]) => `<rect class="x3g-sq" x="${ox + i * s}" y="${oy + j * s}" width="${s}" height="${s}" fill="${color}" stroke="${INK}" stroke-width="3"/>`).join('')}
  <text class="x3g-name" x="${ox + (Math.max(...cells.map(c => c[0])) + 1) * s / 2}" y="${oy - s * 0.35}" font-size="${s * 0.6}">${label}</text></g>`;

const B51 = {
  title: 'Bài 51: Diện tích của một hình. Xăng-ti-mét vuông',
  setup: (board) => createGeo(board),
  steps: [
    async (c) => {
      const t = c.t;
      const s = 100;
      const A = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];
      const B = [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1]];
      t.clear();
      const port = t.tall([820, 320], [400, 620]);
      if (port) t.fit(0, -60, 400, 560, 0.04); else t.fit(0, -60, 820, 260, 0.06);
      t.add(cellsShape(A, port ? 50 : 0, 0, s, '#BFDBFE', 'Hình A') + cellsShape(B, port ? 0 : 420, port ? 340 : 0, s, '#FBCFE8', 'Hình B'));
      t.caption('Hình nào có diện tích lớn hơn?');
      await c.say('Diện tích là phần mặt phẳng mà hình chiếm chỗ. Hai hình ghép từ các ô vuông như nhau. Hình nào có diện tích lớn hơn?');
      const right = await c.choose([{ html: 'Hình A', value: 'A' }, { html: 'Hình B', value: 'B' }, { html: 'Bằng nhau', value: '=' }], 'B', { hint: 'Đếm số ô vuông của mỗi hình.' });
      const sq = t.svg.querySelectorAll('.x3g-sq');
      for (let k = 0; k < sq.length; k++) {
        const r = sq[k], k2 = k < 6 ? k + 1 : k - 5;
        t.add(`<text class="x3g-cn" x="${+r.getAttribute('x') + s / 2}" y="${+r.getAttribute('y') + s / 2 + 15}" font-size="42">${k2}</text>`);
        sfx.pop(k2);
        await sleep(160);
      }
      await c.say(`${right ? 'Đúng rồi! ' : ''}Hình A có 6 ô vuông, hình B có 8 ô vuông. Diện tích hình B lớn hơn diện tích hình A.`, 'A: 6 ô · B: 8 ô → diện tích <b>B lớn hơn</b>');
    },
    async (c) => {
      const t = c.t;
      t.clear();
      const port = t.tall([780, 410], [480, 780]);
      if (port) t.fit(0, -80, 480, 700, 0.03); else t.fit(0, -80, 770, 330, 0.03);
      t.add(`<rect x="40" y="40" width="200" height="200" fill="#F472B6" stroke="${INK}" stroke-width="5"/>
        <text class="x3g-len" x="140" y="20" font-size="40">1 cm</text><text class="x3g-len" x="20" y="152" font-size="40" style="text-anchor:end">1 cm</text>
        <text class="x3g-name" x="140" y="160" font-size="56" fill="#fff">1 cm²</text>`);
      t.caption('Xăng-ti-mét vuông: viết tắt là <b>cm²</b>');
      await c.say('Để đo diện tích, ta dùng xăng-ti-mét vuông. Một xăng-ti-mét vuông là diện tích hình vuông có cạnh 1 xăng-ti-mét.', '1 cm² = diện tích hình vuông cạnh <b>1 cm</b>');
      const sh = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1]];
      t.add(cellsShape(sh, port ? 30 : 330, port ? 340 : 40, 140, '#FBCFE8', ''));
      await c.say('Hình bên cạnh gồm 5 ô vuông 1 xăng-ti-mét vuông. Diện tích của hình là 5 xăng-ti-mét vuông.', 'Hình gồm 5 ô 1 cm² → diện tích <b>5 cm²</b>');
    },
    async (c) => {
      const t = c.t;
      t.grid(4, 2, { color: '#F9A8D4' });
      t.caption('Lát kín hình chữ nhật bằng ô vuông 1 cm²');
      t.cellsOn(true); t.only(null);
      await c.say('Em bấm vào từng ô để lát kín hình chữ nhật bằng các ô vuông 1 xăng-ti-mét vuông.', 'Bấm vào <b>từng ô</b> để lát kín hình');
      await c.until(t, () => t.count() === 8, { nudge: 'Bấm vào ô còn trống.', el: () => [...t.svg.querySelectorAll('.x3g-cell:not([data-on])')][0] });
      t.cellsOn(false);
      await ask(c, {
        say: 'Diện tích hình chữ nhật là bao nhiêu?', shown: 'Diện tích hình chữ nhật là?',
        options: [{ html: '6 cm²', value: 6 }, { html: '8 cm²', value: 8 }, { html: '12 cm²', value: 12 }], answer: 8,
        hint: 'Đếm số ô vuông 1 cm² đã lát.', ok: 'Hình gồm 8 ô vuông 1 xăng-ti-mét vuông, diện tích là 8 xăng-ti-mét vuông.', okShown: 'Diện tích: <b>8 cm²</b>',
      });
    },
    async (c) => {
      const t = c.t;
      t.clear();
      const port = t.tall([800, 300], [440, 500]);
      if (port) t.fit(0, 20, 440, 500, 0.03); else t.fit(0, 0, 800, 300, 0.04);
      const [bx, by] = port ? [90, 320] : [520, 90];
      t.add(`<rect x="20" y="40" width="400" height="220" fill="#FDBA74" stroke="${INK}" stroke-width="5"/><text class="x3g-name" x="220" y="168" font-size="60">12 cm²</text>
        <rect x="${bx}" y="${by}" width="260" height="140" fill="#86EFAC" stroke="${INK}" stroke-width="5"/><text class="x3g-name" x="${bx + 130}" y="${by + 90}" font-size="60">5 cm²</text>`);
      t.caption('Ghép hai tờ giấy: diện tích là?');
      t.eq('12 cm² + 5 cm² = ?');
      await ask(c, {
        say: 'Tính với số đo diện tích giống như tính với số, rồi viết cm² sau kết quả. 12 xăng-ti-mét vuông cộng 5 xăng-ti-mét vuông bằng bao nhiêu?',
        shown: '12 cm² + 5 cm² = ?',
        options: [{ html: '17', value: 'n' }, { html: '17 cm²', value: 17 }, { html: '17 cm', value: 'cm' }], answer: 17,
        hint: 'Kết quả phải có đơn vị xăng-ti-mét vuông: cm².',
      });
      t.eq('12 cm² + 5 cm² = <b>17 cm²</b>');
      await c.say('Đúng rồi! Mười bảy xăng-ti-mét vuông.');
    },
  ],
};

// ── Bài 52: Diện tích hình chữ nhật, hình vuông ──────────────────────────────────────────────────────
const B52 = {
  title: 'Bài 52: Diện tích hình chữ nhật, diện tích hình vuông',
  setup: (board) => createGeo(board),
  steps: [
    async (c) => {
      const t = c.t;
      t.grid(4, 3, { color: '#FDBA74', fitBox: [-90, -80, 490, 390] });
      t.dims(4, 3);
      t.caption('Hình chữ nhật dài 4 cm, rộng 3 cm');
      t.cellsOn(true); t.only([0]);
      await c.say('Hình chữ nhật dài 4 xăng-ti-mét, rộng 3 xăng-ti-mét. Em lát hàng trên cùng bằng các ô 1 xăng-ti-mét vuông.', 'Lát <b>hàng trên cùng</b>');
      await c.until(t, () => t.count() >= 4, { nudge: 'Bấm các ô ở hàng trên cùng.', el: () => [...t.svg.querySelectorAll('.x3g-cell[data-j="0"]:not([data-on])')][0] });
      t.cellsOn(false);
      await c.say('Một hàng có 4 ô. Có 3 hàng như vậy.', 'Mỗi hàng <b>4 ô</b>, có <b>3 hàng</b>');
      await t.fillRow(1); await t.fillRow(2);
      t.eq('4 × 3 = <b>12</b> (ô vuông)');
      sfx.ding();
      await c.say('4 nhân 3 bằng 12 ô vuông. Diện tích hình chữ nhật là 12 xăng-ti-mét vuông.', 'Diện tích: 4 × 3 = <b>12 (cm²)</b>');
    },
    async (c) => {
      const t = c.t;
      t.eq('Diện tích = chiều dài × chiều rộng');
      await c.say('Muốn tính diện tích hình chữ nhật, ta lấy chiều dài nhân với chiều rộng, cùng một đơn vị đo.', 'Diện tích HCN = <b>dài × rộng</b> (cùng đơn vị)');
      t.grid(5, 2, { color: '#93C5FD', fitBox: [-90, -80, 590, 290] });
      t.dims(5, 2);
      t.caption('Hình chữ nhật dài 5 cm, rộng 2 cm');
      t.eq('5 × 2 = ?');
      await ask(c, {
        say: 'Hình chữ nhật dài 5 xăng-ti-mét, rộng 2 xăng-ti-mét. Diện tích là bao nhiêu?', shown: 'Diện tích = 5 × 2 = ?',
        options: [{ html: '7 cm²', value: 7 }, { html: '10 cm²', value: 10 }, { html: '14 cm²', value: 14 }], answer: 10,
        hint: (v) => (v === 14 ? '14 cm là chu vi. Diện tích là dài nhân rộng.' : 'Lấy chiều dài nhân với chiều rộng.'),
      });
      for (let j = 0; j < 2; j++) await t.fillRow(j);
      t.eq('5 × 2 = <b>10 (cm²)</b>');
      await c.say('Đúng rồi! 5 nhân 2 bằng 10 xăng-ti-mét vuông.');
    },
    async (c) => {
      const t = c.t;
      t.grid(3, 3, { color: '#F9A8D4', fitBox: [-90, -80, 390, 390] });
      t.dims(3, 3);
      t.caption('Hình vuông cạnh 3 cm');
      await c.say('Hình vuông cạnh 3 xăng-ti-mét. Mỗi hàng 3 ô, có 3 hàng.');
      for (let j = 0; j < 3; j++) await t.fillRow(j);
      t.eq('3 × 3 = <b>9 (cm²)</b>');
      sfx.ding();
      await c.say('Muốn tính diện tích hình vuông, ta lấy độ dài một cạnh nhân với chính nó. 3 nhân 3 bằng 9 xăng-ti-mét vuông.', 'Diện tích hình vuông = <b>cạnh × cạnh</b>');
    },
    async (c) => {
      const t = c.t;
      t.grid(5, 5, { color: '#86EFAC', fitBox: [-90, -80, 590, 590] });
      t.dims(5, 5);
      t.caption('Hình vuông cạnh 5 cm');
      t.eq('5 × 5 = ?');
      await ask(c, {
        say: 'Hình vuông cạnh 5 xăng-ti-mét. Diện tích là bao nhiêu?', shown: 'Diện tích = 5 × 5 = ?',
        options: [{ html: '10 cm²', value: 10 }, { html: '20 cm²', value: 20 }, { html: '25 cm²', value: 25 }], answer: 25,
        hint: (v) => (v === 20 ? '20 cm là chu vi. Diện tích là cạnh nhân cạnh.' : 'Lấy độ dài cạnh nhân với chính nó.'),
      });
      for (let j = 0; j < 5; j++) await t.fillRow(j);
      t.eq('5 × 5 = <b>25 (cm²)</b>');
      await c.say('Đúng rồi! 5 nhân 5 bằng 25 xăng-ti-mét vuông.');
    },
  ],
};

export const GEO = { b50: B50, b51: B51, b52: B52 };

let styled = false;
function injectGeoCss() {
  if (styled) return;
  styled = true;
  css('x3g-css', `
    .x3g { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 1cqh 1.5cqi; font-family: 'Baloo 2', sans-serif; box-sizing: border-box; }
    .x3g-cap { flex: none; text-align: center; font-weight: 800; color: #1E293B; font-size: min(6.4cqh, 4.2cqi); line-height: 1.2; min-height: 1.25em; }
    .x3g-cap b { color: #DC2626; }
    .x3g-svg { flex: 1 1 0; min-height: 0; width: 100%; user-select: none; overflow: visible; }
    .x3g-svg text { font-family: 'Baloo 2', sans-serif; font-weight: 800; text-anchor: middle; }
    .x3g-len { fill: #1D4ED8; stroke: #fff; stroke-width: 6px; paint-order: stroke; stroke-linejoin: round; }
    .x3g-name { fill: ${INK}; }
    .x3g-cn { fill: ${INK}; pointer-events: none; }
    .x3g-eq { flex: none; text-align: center; font-weight: 800; color: #1E3A8A; font-size: min(8cqh, 5.4cqi); line-height: 1.2; min-height: 1.2em; }
    .x3g-eq b { color: #15803D; }
    .x3g-term { display: inline-block; min-width: 0.6em; }
    .x3g-wait { color: transparent; border-bottom: 3px dashed #93C5FD; }
    .x3g-pad { flex: 0 0 15cqh; }
    .x3g-fly { width: 100%; height: 100%; display: grid; place-items: center; font: 800 1.4rem 'Baloo 2', sans-serif; color: #1D4ED8; white-space: nowrap; }
    .x3g-sides-on .x3g-side { cursor: pointer; }
    .x3g-sides-on .x3g-side:not(.x3g-done) .x3g-edge { stroke: #2563EB; }
    .x3g-cells-on .x3g-cell.x3g-live:not([data-on]) { cursor: pointer; }
    .x3g-cells-on .x3g-cell.x3g-live:not([data-on]) rect { fill: #FEF3C7; }
    .x3g-ant { filter: drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff); }
    @media (orientation: portrait) {
      .x3g-cap { font-size: min(4.6cqh, 6.4cqi); }
      .x3g-eq { font-size: min(5.6cqh, 7.6cqi); }
      .x3g-pad { flex-basis: 14cqh; }
    }
  `);
}
