/**
 * Số thập phân: Bài 4 (Phân số thập phân), Bài 10 (Khái niệm số thập phân), Bài 11 (So sánh các số thập phân),
 * Bài 13 (Làm tròn số thập phân). Công cụ: 🟩 lưới 100 ô (grid.js), 🧮 bảng hàng thập phân + máy soi (dplace.js),
 * 📏 tia số có kính lúp + bi lăn (dline.js).
 * Giọng đọc luôn đọc số bằng chữ (readDec, frSay); bong bóng hiện chữ số.
 */

import { createGrid } from '../grid.js';
import { createDPlace, createDCompare, decHtml, PLACE5, placeName, splitDec } from '../dplace.js';
import { createDLine, fracLabel } from '../dline.js';
import { createCanvas } from '../../grade4Tools/canvas.js';
import { BOX } from '../../grade4Tools/practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx, INK } from '../../grade4Tools/frame.js';
import { dec, decKey, readDec, fr, mixed, clean, readVN, frSay } from '../num.js';
import { capFirst } from '../../grade4Tools/num.js';

const RD = readDec;
/** Làm tròn x tới dp chữ số thập phân (đúng giữa thì lên). */
const roundDp = (x, dp) => clean(Math.round(clean(x * 10 ** dp) + 1e-9) / 10 ** dp);
const dpOfS = (s) => splitDec(s).d.length;
const valOf = (s) => +String(s).replace(/\s/g, '').replace(',', '.');
/** Số thập phân ngẫu nhiên (chuỗi): phần nguyên trong [lo, hi], dp chữ số thập phân, chữ số cuối khác 0. */
function randDec(rng, lo, hi, dp, { lead0 = 0 } = {}) {
  const i = rng.int(lo, hi);
  let d = '';
  for (let k = 0; k < dp; k++) d += k === dp - 1 ? rng.int(1, 9) : (k === 0 && rng() < lead0 ? 0 : rng.int(0, 9));
  return dp ? `${i},${d}` : String(i);
}
/** Chữ số của s ở hàng p (p ≥ 0 phần nguyên, p < 0 phần thập phân). */
const digitAt = (s, p) => { const { i, d } = splitDec(s); return p >= 0 ? i[i.length - 1 - p] : d[-p - 1]; };
/** Nhãn SVG có một chữ số tô đỏ gạch chân (mũi tên trên tia số). */
const svgMark = (s, p) => {
  const { i, d } = splitDec(s);
  const ch = (c, q) => (q === p ? `<tspan fill="#DC2626" text-decoration="underline">${c}</tspan>` : c);
  return [...i].map((c, k) => ch(c, i.length - 1 - k)).join('') + (d ? ',' + [...d].map((c, k) => ch(c, -(k + 1))).join('') : '');
};
const cmpSign = (a, b) => (valOf(a) > valOf(b) + 1e-12 ? '>' : valOf(a) < valOf(b) - 1e-12 ? '<' : '=');
const big = (html) => `<span style="font-size:1.35em">${html}</span>`;

// ═══ Bài 4: Phân số thập phân ═════════════════════════════════════════════════════════════════════════
const B4 = {
  explore: {
    setup: (board) => createGrid(board, { bar: true, show: 'frac', split: false, color: '#FB923C' }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Băng giấy được chia thành 10 phần bằng nhau. Em tô màu 3 phần.', 'Băng giấy chia <b>10 phần</b> bằng nhau. Tô màu <b>3 phần</b>.');
        await c.until(t, () => t.n === 3, { nudge: 'Bấm vào phần thứ ba, hoặc bấm nút cộng 1 phần.', el: () => t.btn(1) });
        t.set(3); t.lock(true);
        await c.say('Đã tô màu ba phần mười băng giấy.', `Đã tô màu ${fr(3, 10)} băng giấy.`);
      },
      async (c) => {
        const t = c.t;
        t.lock(false);
        await c.say('Bây giờ tô màu 8 phần.', 'Tô màu <b>8 phần</b> băng giấy.');
        await c.until(t, () => t.n === 8, { nudge: 'Đếm đủ 8 phần, bấm vào phần thứ tám.', el: () => t.btn(1) });
        t.set(8); t.lock(true);
        await c.say('Đã tô màu tám phần mười băng giấy.', `Đã tô màu ${fr(8, 10)} băng giấy.`);
      },
      async (c) => {
        const t = c.use((b) => createGrid(b, { show: 'frac', split: false, color: '#60A5FA' }));
        await c.say('Hình vuông này chia thành 100 ô bằng nhau. Em tô màu 57 ô: 5 cột và 7 ô.', 'Tô màu <b>57 ô</b>: bấm <b>+ 1 cột</b> 5 lần, <b>+ 1 ô</b> 7 lần.');
        await c.until(t, () => t.n === 57, {
          nudge: () => (t.n < 50 ? 'Mỗi cột có 10 ô. Bấm cộng 1 cột cho đủ 5 cột.' : 'Bấm cộng 1 ô cho đủ 57 ô.'),
          el: () => t.btn(t.n < 50 ? 10 : 1),
        });
        t.set(57); t.lock(true);
        await c.say('Đã tô màu năm mươi bảy phần một trăm hình vuông.', `Đã tô màu ${fr(57, 100)} hình vuông.`);
      },
      async (c) => {
        await c.say('Các phân số ba phần mười, tám phần mười, năm mươi bảy phần một trăm có mẫu số là 10, 100. Các phân số có mẫu số là 10, 100, 1 000 gọi là phân số thập phân.',
          `${fr(3, 10)}, ${fr(8, 10)}, ${fr(57, 100)}, ${fr(351, '1 000')} là các <b>phân số thập phân</b>: mẫu số là 10, 100, 1 000, …`);
        await c.say('Phân số nào là phân số thập phân?', 'Phân số nào là <b>phân số thập phân</b>?');
        await c.choose([[9, 20], [100, 59], [351, '1 000'], [1, 3]].map(([a, b]) => ({ html: big(fr(a, b)), value: `${a}/${b}` })), '351/1 000',
          { hint: (v) => (v === '100/59' ? 'Số 100 nằm ở tử số. Phải nhìn mẫu số.' : 'Nhìn mẫu số: phải là 10, 100, 1 000.') });
        await c.say('Đúng rồi! Mẫu số là một nghìn. Còn chín phần hai mươi có chữ số 0 nhưng mẫu số 20 không phải 10, 100, 1 000.', `${fr(351, '1 000')} là phân số thập phân. ${fr(9, 20)} thì không.`);
      },
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        const x0 = 100, w = 800, y = 200, h = 130;
        const part = (n, k, fill) => Array.from({ length: n }, (_, i) => `<rect class="g5x-p${n}" x="${x0 + (i * w) / n}" y="${y}" width="${w / n}" height="${h}" fill="${i < k ? fill : '#fff'}" stroke="${INK}" stroke-width="${n === 5 ? 5 : 3}"/>`).join('');
        t.draw(`<g class="g5x-b5">${part(5, 3, '#FB923C')}</g><text x="500" y="${y + h + 70}" class="g4v-t" font-size="44">3 phần trong 5 phần bằng nhau</text>`);
        t.caption(`${fr(3, 5)} = ${fr('3 × ?', '5 × ?')} = ${fr('?', 10)}`);
        await c.say('Một số phân số viết được thành phân số thập phân. Ba phần năm bằng bao nhiêu phần mười?', `${fr(3, 5)} bằng bao nhiêu phần mười?`);
        await c.choose([2, 5, 10].map(m => ({ html: `nhân với ${m}`, value: m })), 2, { hint: 'Năm nhân mấy bằng mười?' });
        // mỗi phần chia đôi
        t.add(`<g class="g5x-cut">${Array.from({ length: 5 }, (_, i) => `<line x1="${x0 + (i + 0.5) * (w / 5)}" y1="${y - 10}" x2="${x0 + (i + 0.5) * (w / 5)}" y2="${y + h + 10}" stroke="#DC2626" stroke-width="5" stroke-dasharray="12 8"/>`).join('')}</g>`);
        t.qa('.g5x-cut line').forEach((l) => { l.style.transformBox = 'fill-box'; l.style.transformOrigin = 'center'; });
        await t.anim('.g5x-cut line', [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], 450, { stagger: 150 });
        sfx.ding();
        t.caption(`${fr(3, 5)} = ${fr('3 × 2', '5 × 2')} = <b>${fr(6, 10)}</b>`);
        t.q('text').textContent = '6 phần trong 10 phần bằng nhau';
        await c.say('Nhân cả tử số và mẫu số với 2. Mỗi phần chia đôi: ba phần năm bằng sáu phần mười.', `${fr(3, 5)} = ${fr('3 × 2', '5 × 2')} = ${fr(6, 10)}`);
      },
      async (c) => {
        const t = c.use((b) => createDLine(b, { lo: 0, hi: 1, step: 1, minor: 0.1, label: fracLabel(10) }));
        t.caption(`Tia số từ 0 đến 1 chia 10 phần: mỗi phần là ${fr(1, 10)}`);
        await c.say('Trên tia số, đoạn từ 0 đến 1 chia thành 10 phần bằng nhau. Mỗi vạch là một phần mười.');
        await c.say('Bấm vào vạch một phần mười để soi kính lúp.', `Bấm vào vạch <b>${fr(1, 10)}</b>.`);
        let ok = false;
        const off = t.on((ev, v) => { if (ev !== 'tap') return; if (Math.abs(v - 0.1) < 1e-9) ok = true; else c.hint('Vạch một phần mười là vạch ngay sau số 0.'); });
        await c.until(t, () => ok, { nudge: 'Bấm vào vạch đầu tiên sau số 0.' });
        off();
        await t.zoomInto(0, 0.1, { minor: 0.01, label: fracLabel(100, { whole: false }) });
        t.caption(`Mỗi phần nhỏ là ${fr(1, 100)}. Vậy ${fr(1, 10)} = <b>${fr(10, 100)}</b>`);
        await c.say('Phóng to đoạn từ 0 đến một phần mười: lại chia 10 phần, mỗi phần là một phần trăm. Một phần mười bằng mười phần trăm.');
      },
    ],
  },
  tasks: () => [task4Read(), task4Shade(), task4IsDec(), task4ToDec(), task4Line()],
};

/** Đọc phần đã tô trên băng giấy / lưới: điền tử số. */
function task4Read() {
  return {
    id: 'g5fr-read',
    make: (rng) => (rng() < 0.4 ? { bar: true, n: rng.int(1, 9) } : { bar: false, n: rng.int(11, 99) }),
    async mount(f, { bar, n }) {
      const den = bar ? 10 : 100;
      f.q.innerHTML = `Phân số chỉ phần đã tô màu: ${fr(BOX, den)}`;
      const t = createGrid(f.tool, { bar, value: n, show: 'none', buttons: false, edit: false, split: false, color: bar ? '#FB923C' : '#60A5FA' });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: n, max: 3, say: 'Đã tô màu bao nhiêu phần?',
        hint: bar ? 'Đếm số phần đã tô màu.' : 'Mỗi cột có 10 ô. Đếm số cột rồi đếm thêm số ô lẻ.' });
      t.show('frac');
      f.finish({ ok: `Đã tô màu ${frSay(n, den)}.` });
    },
  };
}

/** Tô màu đúng phân số rồi bấm Xong. */
function task4Shade() {
  return {
    id: 'g5fr-shade',
    make: (rng) => ({ n: rng.int(12, 88) }),
    mount(f, { n }) {
      f.q.innerHTML = `Tô màu ${fr(n, 100)} hình vuông rồi bấm <b>Xong</b>`;
      const t = createGrid(f.tool, { show: 'none', split: false, color: '#60A5FA' });
      f.say(`Tô màu ${frSay(n, 100)} hình vuông.`, `Tô màu <b>${n} ô</b> rồi bấm Xong.`);
      f.choicesBox.innerHTML = '<button type="button" class="g4-choice g4-choice-go">✓ Xong</button>';
      f.choicesBox.classList.add('g4-choices-on');
      const btn = f.choicesBox.firstElementChild;
      if (import.meta.env.DEV) window.__g4solve = () => { t.set(n); btn.click(); };
      btn.onclick = () => {
        sfx.tap();
        if (t.n === n) {
          btn.disabled = true; btn.classList.add('g4-choice-ok'); t.lock(true); t.show('frac');
          f.finish({ ok: `${n} ô trong 100 ô là ${frSay(n, 100)}.` });
          return;
        }
        f.mistakes++;
        t.show('frac');
        f.hint(`Em đã tô ${t.n} ô. Cần tô ${n} ô: ${Math.floor(n / 10)} cột và ${n % 10} ô.`, `Em đã tô <b>${t.n}</b> ô. Cần <b>${n}</b> ô: ${Math.floor(n / 10)} cột và ${n % 10} ô.`);
        setTimeout(() => t.show('none'), 2500);
      };
    },
  };
}

/** Chọn phân số thập phân. */
function task4IsDec() {
  return {
    id: 'g5fr-is',
    make: (rng) => {
      const D = rng.pick([10, 100, 1000]);
      const right = [rng.int(1, D === 10 ? 19 : 99), D];
      const traps = rng.shuffle([[rng.int(1, 19), 20], [100, rng.pick([37, 59, 71, 99])], [rng.int(1, 9), rng.pick([200, 50, 25])], [rng.int(1, 2), 3], [10, rng.pick([7, 11, 13])]]).slice(0, 3);
      return { opts: rng.shuffle([right, ...traps]), right };
    },
    async mount(f, { opts, right }) {
      const fmtD = (b) => (b === 1000 ? '1 000' : b);
      f.q.innerHTML = '<span>Phân số nào là <b>phân số thập phân</b>?</span>';
      await f.choose({ options: opts.map(([a, b]) => ({ html: big(fr(a, fmtD(b))), value: `${a}/${b}` })), answer: `${right[0]}/${right[1]}`, say: 'Phân số nào là phân số thập phân?',
        hint: (v) => (v.startsWith('100/') || v.startsWith('10/') ? 'Số tròn chục nằm ở tử số. Phải nhìn mẫu số.' : 'Mẫu số của phân số thập phân là 10, 100, 1 000.') });
      f.finish({ ok: `${frSay(...right)} có mẫu số ${readVN(right[1])}.` });
    },
  };
}

/** Viết thành phân số thập phân: tìm số nhân (chia) rồi tử số, từng dòng như sách. */
function task4ToDec() {
  const MUL = [[2, 10], [5, 10], [4, 100], [20, 100], [25, 100], [50, 100], [8, 1000], [125, 1000], [40, 1000], [200, 1000]];
  return {
    id: 'g5fr-to',
    make: (rng) => {
      if (rng() < 0.25) { // chia: 25/500 = 5/100
        const [b, D] = rng.pick([[500, 100], [300, 100], [2000, 1000], [40, 10], [60, 10]]);
        const m = b / D, a = m * rng.int(1, D / 10 > 1 ? 9 : 3);
        return { a, b, D, m, div: true };
      }
      const [b, D] = rng.pick(MUL);
      let a = rng.int(1, b - 1);
      if (b === 2) a = 1;
      return { a, b, D, m: D / b, div: false };
    },
    async mount(f, { a, b, D, m, div }) {
      const op = div ? ':' : '×';
      const fd = (x) => dec(x);
      f.q.innerHTML = `<div>${b} ${op} ${BOX} = ${fd(D)}</div><div class="g5x-l2" style="visibility:hidden">${fr(a, fd(b))} = ${fr(`${a} ${op} ${m}`, `${fd(b)} ${op} ${m}`)} = ${fr(BOX, fd(D))}</div>`;
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: m, max: 3, say: `Viết ${frSay(a, b)} thành phân số thập phân có mẫu số ${readVN(D)}. Trước hết, ${readVN(b)} ${div ? 'chia' : 'nhân'} mấy bằng ${readVN(D)}?`,
        shown: `Mẫu số ${fd(b)} ${div ? 'chia' : 'nhân'} mấy để được ${fd(D)}?`, hint: div ? `${fd(b)} chia cho mấy thì được ${fd(D)}?` : `${fd(b)} nhân với mấy thì được ${fd(D)}?` });
      const l2 = f.q.querySelector('.g5x-l2');
      l2.style.visibility = '';
      l2.animate([{ opacity: 0, transform: 'translateY(-0.4em)' }, { opacity: 1, transform: 'none' }], { duration: 350 });
      const ans = div ? a / m : a * m;
      await f.ask({ box: b2, answer: ans, max: 4, say: `${div ? 'Chia' : 'Nhân'} cả tử số và mẫu số với ${readVN(m)}. Tử số mới là bao nhiêu?`, hint: `${a} ${op} ${m} = ?` });
      f.finish({ ok: `${frSay(a, b)} bằng ${frSay(ans, D)}.` });
    },
  };
}

/** Vị trí trên tia số: điền tử số của phân số thập phân. */
function task4Line() {
  return {
    id: 'g5fr-line',
    make: (rng) => (rng() < 0.5 ? { den: 10, k: rng.int(1, 9) } : { den: 100, k: rng.int(1, 9) }),
    async mount(f, { den, k }) {
      f.q.innerHTML = `Mũi tên chỉ phân số: ${fr(BOX, den)}`;
      const t = createDLine(f.tool, den === 10
        ? { lo: 0, hi: 1, step: 1, minor: 0.1, labels: 'ends', label: fracLabel(10), caption: false }
        : { lo: 0, hi: 0.1, step: 0.1, minor: 0.01, labels: 'ends', label: fracLabel(100, { whole: false }), caption: false });
      const v = k / den;
      t.pin(v, { text: '?' });
      t.blank(v);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: k, max: 2, say: 'Mũi tên chỉ phân số nào?', hint: `Từ 0 đếm từng vạch, mỗi vạch là một phần ${den === 10 ? 'mười' : 'trăm'}.` });
      t.reset({ lo: t.range().lo, hi: t.range().hi, step: t.range().step, minor: t.range().minor, labels: 'ends', label: den === 10 ? fracLabel(10) : fracLabel(100, { whole: false }) });
      t.pin(v, { text: `${k}/${den}` });
      f.finish({ ok: `Mũi tên chỉ ${frSay(k, den)}.` });
    },
  };
}

// ═══ Bài 10: Khái niệm số thập phân ═══════════════════════════════════════════════════════════════════
const B10 = {
  explore: {
    setup: (board) => createDLine(board, { lo: 0, hi: 1, step: 1, minor: 0.1, label: (v) => (v === 0 ? '0' : v === 1 ? '1 m' : `${Math.round(v * 10)} dm`) }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('1 m = 10 dm');
        await c.say('Một mét chia thành 10 phần bằng nhau, mỗi phần là 1 đề-xi-mét.');
        t.pin(0.9, { text: 'Rô-bốt: 9 dm' });
        t.caption(`9 dm = ${fr(9, 10)} m`);
        await c.say('Rô-bốt cao 9 đề-xi-mét, tức là chín phần mười mét.');
        t.caption(`9 dm = ${fr(9, 10)} m = <b>0,9 m</b>`);
        await c.say('Chín phần mười mét còn viết là không phẩy chín mét.', `${fr(9, 10)} m viết thành <b>0,9 m</b>, đọc là: không phẩy chín mét.`);
        t.reset({ lo: 0, hi: 1, step: 1, minor: 0.1 });
        t.pin(0.9, { text: '0,9 m' });
        await c.say('Các vạch một phần mười viết là không phẩy một, không phẩy hai, và cứ thế.', `${fr(1, 10)} = 0,1; ${fr(2, 10)} = 0,2; …`);
      },
      async (c) => {
        const t = c.t;
        t.reset({ lo: 1, hi: 2, step: 1, minor: 0.1 });
        t.caption('Mi cao 118 cm = 1 m 18 cm');
        await c.say('Mi cao 118 xăng-ti-mét, tức là 1 mét 18 xăng-ti-mét. Mi cao hơn 1 mét một chút. Bấm vào vạch một phẩy một để soi kính lúp.', 'Bấm vào vạch <b>1,1</b> để soi kính lúp.');
        let ok = false;
        const off = t.on((ev, v) => { if (ev !== 'tap') return; if (Math.abs(v - 1.1) < 1e-9) ok = true; else c.hint('Vạch một phẩy một ở ngay sau số 1.'); });
        await c.until(t, () => ok, { nudge: 'Bấm vào vạch đầu tiên sau số 1.' });
        off();
        await t.zoomInto(1.1, 1.2, { minor: 0.01 });
        t.pin(1.18, { text: 'Mi: 118 cm' });
        t.caption(`118 cm = 1 m 18 cm = ${mixed(1, 18, 100)} m = <b>1,18 m</b>`);
        await c.say('Mỗi vạch nhỏ là 1 xăng-ti-mét, tức là một phần trăm mét. Mi cao một và mười tám phần trăm mét, viết là một phẩy mười tám mét.');
      },
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        const part = (x, txt, w, color, anchor) => `<path d="M${x} 285 v20 h${w} v-20" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/><text x="${anchor === 'end' ? x + w : x}" y="350" class="g4v-t" font-size="40" style="fill:${color};text-anchor:${anchor}">${txt}</text>`;
        // cầu dây văng nhiều trụ (vẽ đơn giản) dưới con số
        let br = `<rect x="-200" y="505" width="1400" height="80" fill="#7DD3FC"/><path d="M-200 520 q 50 -8 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0 t 100 0" fill="none" stroke="#fff" stroke-width="4"/>`;
        for (const x of [180, 340, 500, 660, 820]) {
          for (let k = 1; k <= 4; k++) br += `<line x1="${x}" y1="${398 + k * 6}" x2="${x - k * 18}" y2="478" stroke="#F59E0B" stroke-width="2.5"/><line x1="${x}" y1="${398 + k * 6}" x2="${x + k * 18}" y2="478" stroke="#F59E0B" stroke-width="2.5"/>`;
          br += `<path d="M${x - 8} 520 L${x} 392 L${x + 8} 520 Z" fill="#FDE68A" stroke="${INK}" stroke-width="3"/>`;
        }
        br += `<rect x="40" y="474" width="920" height="16" rx="4" fill="#94A3B8" stroke="${INK}" stroke-width="3"/>`;
        t.draw(`${br}<text x="465" y="265" class="g4v-t" font-size="180" style="fill:${PLACE5[0].ink};text-anchor:end">9</text><text x="488" y="265" class="g4v-t" font-size="180" style="fill:#DC2626">,</text>
          <text x="512" y="265" class="g4v-t" font-size="180" style="fill:${PLACE5[-1].ink};text-anchor:start">17</text>
          <text x="500" y="70" class="g4v-t" font-size="40" style="fill:#64748B">Cầu Nhật Tân dài 9,17 km</text>`);
        t.caption('Số thập phân gồm <b>phần nguyên</b> và <b>phần thập phân</b>');
        await c.say('Cầu Nhật Tân dài chín phẩy mười bảy ki-lô-mét. Mỗi số thập phân gồm hai phần, phân cách bởi dấu phẩy.');
        t.add(`<g class="g5x-parts">${part(365, 'phần nguyên', 100, PLACE5[0].ink, 'end')}${part(512, 'phần thập phân', 200, PLACE5[-1].ink, 'start')}</g>`);
        await t.anim('.g5x-parts', [{ opacity: 0 }, { opacity: 1 }], 500);
        await c.say('Bên trái dấu phẩy là phần nguyên. Bên phải dấu phẩy là phần thập phân. Trong số chín phẩy mười bảy, phần nguyên là mấy?', 'Phần nguyên của 9,17 là?');
        await c.choose(['9', '17', '917'].map(x => ({ html: x, value: x })), '9', { hint: 'Phần nguyên ở bên trái dấu phẩy.' });
      },
      async (c) => {
        const t = c.use((b) => createGrid(b, { grids: 3, show: 'both', split: true }));
        t.lock(true);
        await c.say('Mỗi hình vuông là 1 đơn vị. Tô kín 2 hình vuông là 2 đơn vị.');
        await t.fillTo(200, { gap: 500 });
        t.lock(false);
        await c.say('Em tô thêm 3 cột và 8 ô.', 'Tô thêm <b>3 cột</b> và <b>8 ô</b>.');
        await c.until(t, () => t.n === 238, {
          nudge: () => (t.n < 230 ? 'Bấm cộng 1 cột cho đủ 3 cột.' : 'Bấm cộng 1 ô cho đủ 8 ô.'),
          el: () => t.btn(t.n < 230 ? 10 : 1),
        });
        t.set(238); t.lock(true);
        await c.say('2 đơn vị, 3 phần mười và 8 phần trăm viết là hai phẩy ba mươi tám.', '2 đơn vị, 3 phần mười, 8 phần trăm: <b>2,38</b>');
      },
      async (c) => {
        const t = c.use((b) => createDPlace(b, { int: 3, dec: 3 }));
        t.only(-1);
        await c.say('Đây là bảng hàng của số thập phân. Cột dấu phẩy ngăn phần nguyên và phần thập phân. Bấm thẻ một phần mười cho đủ 10 thẻ.', 'Bấm thẻ <b>1/10</b> cho đủ <b>10 thẻ</b>.');
        await c.until(t, () => t.counts[0] >= 1, { nudge: 'Bấm tiếp thẻ một phần mười màu cam.', el: () => t.src(-1) });
        if (t.counts[0] < 1) t.set(1);
        t.lock(true);
        await c.say('10 phần mười gộp thành 1 đơn vị. Cũng vậy: 10 phần trăm là 1 phần mười, 10 phần nghìn là 1 phần trăm.', '10 phần mười = 1 đơn vị<br>10 phần trăm = 1 phần mười<br>10 phần nghìn = 1 phần trăm');
      },
      async (c) => {
        const t = c.t;
        t.set(0); t.only(null); t.lock(true);
        await c.say('Thầy lập số ba trăm hai mươi lăm phẩy bốn trăm ba mươi mốt.', 'Lập số <b>325,431</b>');
        await t.fill(325.431, { gap: 90 });
        t.glowComma(true);
        await c.say('Số này gồm 3 trăm, 2 chục, 5 đơn vị, 4 phần mười, 3 phần trăm, 1 phần nghìn.');
        await c.say('Đọc phần nguyên, đọc chữ phẩy, rồi đọc phần thập phân: ba trăm hai mươi lăm phẩy bốn trăm ba mươi mốt.', 'Đọc phần nguyên, đọc "<b>phẩy</b>", rồi đọc phần thập phân.');
        t.glowComma(false);
      },
      async (c) => {
        const t = c.t;
        t.set(0); t.lock(false); t.only(null);
        await c.say('Đến lượt em. Lập số gồm 4 đơn vị và 7 phần trăm.', 'Lập số gồm <b>4 đơn vị</b> và <b>7 phần trăm</b>.');
        let warned = null;
        const off = t.on(() => {
          const over = t.counts[-1] ? -1 : t.counts[0] > 4 ? 0 : t.counts[-2] > 7 ? -2 : null;
          if (over != null && over !== warned) { warned = over; c.hint(over === -1 ? 'Không có phần mười nào. Bấm vào thẻ trong cột phần mười để bỏ ra.' : `Hàng ${placeName(over)} có quá nhiều thẻ. Bấm vào thẻ trong cột để bỏ ra.`); }
        });
        await c.until(t, () => t.k === 4070, { nudge: 'Cần 4 thẻ 1 và 7 thẻ một phần trăm.', el: () => (t.counts[0] < 4 ? t.src(0) : t.src(-2)) });
        off();
        if (t.k !== 4070) t.set(4.07);
        t.lock(true);
        t.glow(-1);
        await c.say('Hàng phần mười không có thẻ nào nên viết chữ số 0. Số này đọc thế nào?', 'Hàng phần mười viết <b>0</b>: 4,07. Đọc thế nào?');
        await c.choose(['bốn phẩy bảy', 'bốn phẩy không bảy', 'bốn phẩy bảy mươi'].map(x => ({ html: capFirst(x), value: x })), 'bốn phẩy không bảy', { hint: 'Chữ số 0 ở phần thập phân cũng phải đọc: không.' });
        t.glow(null);
        await c.say('Đúng rồi! Bốn phẩy không bảy. Chữ số 0 ở phần thập phân vẫn phải đọc.');
      },
    ],
  },
  tasks: () => [task10Write(), task10Read(), task10Frac(), task10Place(), task10Grid(), task10Build()],
};

/** Mô tả số theo hàng: "5 đơn vị, 8 phần trăm" (bỏ hàng có chữ số 0, trừ khi parts = false: phần nguyên + phần nghìn). */
function describe(s, { style = 'places' } = {}) {
  const { i, d } = splitDec(s);
  if (style === 'parts') return `${readVN(+i)} đơn vị và ${readVN(+d)} phần ${['mười', 'trăm', 'nghìn'][d.length - 1]}`;
  const items = [];
  for (let k = 0; k < i.length; k++) { const p = i.length - 1 - k; if (+i[k] || i.length === 1) items.push(`${i[k]} ${placeName(p)}`); }
  [...d].forEach((ch, k) => { if (+ch) items.push(`${ch} ${placeName(-(k + 1))}`); });
  return items.join(', ');
}

/** Viết số từ mô tả hàng; bảng hàng lập số để kiểm chứng. */
function task10Write() {
  return {
    id: 'g5d-write',
    make: (rng) => {
      if (rng() < 0.35) {
        const len = rng.int(2, 3), z = rng.int(0, len - 1);
        const rest = String(rng.int(10 ** (len - z - 1), 10 ** (len - z) - 1)).replace(/0$/, '1');
        return { s: `${rng.int(2, 99)},${'0'.repeat(z)}${rest}`, style: 'parts' };
      }
      return { s: randDec(rng, rng.pick([0, 1, 10, 100]), rng.pick([9, 99, 999]), rng.int(1, 3), { lead0: 0.6 }), style: 'places' };
    },
    async mount(f, { s, style }) {
      const { i } = splitDec(s);
      f.q.innerHTML = `Số gồm <span style="color:#1D4ED8">${describe(s, { style })}</span><br>viết là: ${BOX}`;
      const t = createDPlace(f.tool, { int: Math.max(2, Math.min(3, i.length)), dec: 3, read: false, parts: false });
      t.lock(true);
      t.hideTop(true);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(valOf(s)), max: s.length + 2, say: `Viết số gồm ${describe(s, { style })}.`, shown: 'Viết số thập phân.',
        hint: 'Viết phần nguyên, dấu phẩy, rồi từng hàng phần mười, phần trăm, phần nghìn. Hàng nào không có thì viết 0.' });
      if (i.length <= 3) { t.hideTop(false); await t.fill(valOf(s), { gap: 40 }); }
      f.finish({ ok: `Số đó là ${s}.` });
    },
  };
}

/** Chọn cách đọc đúng (bẫy "không phẩy bốn" cho 0,04). */
function task10Read() {
  return {
    id: 'g5d-read',
    make: (rng) => {
      const i = rng.pick([0, rng.int(1, 9), rng.int(10, 99), rng.int(100, 999)]);
      const dp = rng.int(2, 3);
      let d = '';
      for (let k = 0; k < dp; k++) d += k === dp - 1 ? rng.int(1, 9) : (rng() < 0.55 ? 0 : rng.int(1, 9));
      if (!d.startsWith('0') && rng() < 0.6) d = '0' + d.slice(1);
      const s = `${i},${d}`;
      const nz = d.replace(/^0+/, '');
      const cand = [RD(s), `${readVN(i)} phẩy ${readVN(+nz)}`, RD(`${i},0${d}`), readVN(+`${i}${d}`)];
      const opts = [...new Set(cand)].slice(0, 3);
      return { s, opts: rng.shuffle(opts) };
    },
    async mount(f, { s, opts }) {
      f.q.innerHTML = `${big(decHtml(s))}<small>Số này đọc là:</small>`;
      f.choicesBox.classList.add('g4-choices-col');
      await f.choose({ options: opts.map(o => ({ html: capFirst(o), value: o })), answer: RD(s), say: 'Chọn cách đọc đúng.',
        hint: 'Đọc phần nguyên, đọc phẩy, rồi đọc phần thập phân. Chữ số 0 đứng đầu phần thập phân đọc là không.' });
      f.finish({ ok: `${s} đọc là: ${RD(s)}.` });
    },
  };
}

/** Phân số thập phân ↔ số thập phân, số đo (9 dm = 0,9 m). */
function task10Frac() {
  return {
    id: 'g5d-frac',
    make: (rng) => {
      const kind = rng.pick(['toDec', 'toFrac', 'measure', 'toDec']);
      if (kind === 'toDec') { const D = rng.pick([10, 100, 1000]); return { kind, a: rng.int(1, D === 10 ? 99 : D === 100 ? 999 : 2999), D }; }
      if (kind === 'toFrac') { const D = rng.pick([10, 100]); return { kind, a: rng.int(1, D - 1), D }; }
      const [u, big, D] = rng.pick([['dm', 'm', 10], ['cm', 'm', 100], ['g', 'kg', 1000], ['m', 'km', 1000], ['mm', 'm', 1000], ['cm', 'dm', 10]]);
      return { kind, u, big, D, a: rng.int(1, D === 10 ? 9 : D === 100 ? 250 : 999) };
    },
    async mount(f, m) {
      const fd = (x) => (x === 1000 ? '1 000' : x);
      const x = m.a / m.D;
      if (m.kind === 'toFrac') {
        f.q.innerHTML = big(`${decHtml(decKey(x))} = ${fr(BOX, m.D)}`);
        const g = createGrid(f.tool, { value: m.a * (100 / m.D), show: 'none', buttons: false, edit: false });
        await f.ask({ box: f.q.querySelector('.g4-box'), answer: m.a, max: 3, say: `Viết ${RD(x)} thành phân số thập phân.`, hint: `${decKey(x)} có ${dpOfS(decKey(x))} chữ số sau dấu phẩy: mẫu số là ${m.D}.` });
        g.show('both');
        f.finish({ ok: `${dec(x)} = ${m.a}/${m.D}` });
        return;
      }
      if (m.kind === 'toDec') {
        f.q.innerHTML = big(`${fr(m.a, fd(m.D))} = ${BOX}`);
        const t = createDPlace(f.tool, { int: 1, dec: 3, read: true, parts: false });
        t.lock(true); t.hideTop(true);
        await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(x), max: 6, say: `Viết ${frSay(m.a, m.D)} thành số thập phân.`,
          hint: `Mẫu số ${fd(m.D)} có ${String(m.D).length - 1} chữ số 0: phần thập phân có ${String(m.D).length - 1} chữ số.` });
        t.hideTop(false);
        await t.fill(x, { gap: 40 });
        f.finish({ ok: `${m.a}/${m.D} = ${dec(x)}` });
        return;
      }
      const W = { dm: 'đề-xi-mét', m: 'mét', cm: 'xăng-ti-mét', g: 'gam', kg: 'ki-lô-gam', km: 'ki-lô-mét', mm: 'mi-li-mét' };
      f.q.innerHTML = big(`${m.a} ${m.u} = ${BOX} ${m.big}`);
      const t = createDPlace(f.tool, { int: 1, dec: 3, read: false, parts: false });
      t.lock(true); t.hideTop(true);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(x), max: 6, say: `${readVN(m.a)} ${W[m.u]} bằng bao nhiêu ${W[m.big]}?`, shown: 'Viết dưới dạng số thập phân.',
        hint: `1 ${m.u} = ${fr(1, fd(m.D))} ${m.big}. Vậy ${m.a} ${m.u} = ${fr(m.a, fd(m.D))} ${m.big}.` });
      t.hideTop(false);
      await t.fill(x, { gap: 40 });
      f.finish({ ok: `${m.a} ${m.u} = ${fr(m.a, fd(m.D))} ${m.big} = ${dec(x)} ${m.big}` });
    },
  };
}

/** Chữ số thuộc hàng nào: bấm cột trên bảng hàng. */
function task10Place() {
  return {
    id: 'g5d-place',
    make: (rng) => {
      for (let k = 0; k < 50; k++) {
        const s = randDec(rng, 10, 999, rng.int(2, 3));
        const { i, d } = splitDec(s);
        const all = [...i].map((ch, j) => [ch, i.length - 1 - j]).concat([...d].map((ch, j) => [ch, -(j + 1)]));
        const uniq = all.filter(([ch]) => all.filter(([c2]) => c2 === ch).length === 1);
        const dec_ = uniq.filter(([, p]) => p < 0);
        if (dec_.length) { const [ch, p] = rng() < 0.75 ? rng.pick(dec_) : rng.pick(uniq); return { s, ch, p }; }
      }
      return { s: '325,431', ch: '4', p: -1 };
    },
    async mount(f, { s, ch, p }) {
      const { i } = splitDec(s);
      f.q.innerHTML = `Chữ số <b class="g4-u">${ch}</b> trong số ${decHtml(s, { color: false, mark: p })} thuộc hàng nào?`;
      const t = createDPlace(f.tool, { int: i.length, dec: 3, value: valOf(s), tray: false, read: false, parts: false });
      t.hideTop(true);
      t.pickMode(true);
      f.say(`Chữ số ${readVN(+ch)} thuộc hàng nào? Bấm vào cột.`, `Bấm vào <b>cột</b> có chữ số ${ch}.`);
      if (import.meta.env.DEV) window.__g4solve = () => t.emit('pick', p);
      await new Promise((res) => {
        let wrong = 0;
        t.on((ev, q) => {
          if (ev !== 'pick') return;
          if (q === p) { t.glow(p); sfx.ding(); res(); return; }
          if (!wrong++) f.mistakes++;
          f.hint(`Đó là hàng ${placeName(q)}. Tìm cột có chữ số ${ch}.`);
        });
      });
      t.pickMode(false);
      f.finish({ ok: `Chữ số ${ch} thuộc hàng ${placeName(p)}.` });
    },
  };
}

/** Lưới 100 ô: viết số thập phân chỉ phần đã tô. */
function task10Grid() {
  return {
    id: 'g5d-grid',
    make: (rng) => { const w = rng.int(0, 2); return { w, a: rng.int(0, 9), b: rng.int(w ? 0 : 1, 9) }; },
    async mount(f, { w, a, b }) {
      const n = w * 100 + a * 10 + b;
      f.q.innerHTML = `Số thập phân chỉ phần đã tô màu: ${BOX}`;
      const t = createGrid(f.tool, { grids: Math.max(1, w + 1), value: n, show: 'none', buttons: false, edit: false });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(n / 100), max: 5, say: 'Viết số thập phân chỉ phần đã tô màu.',
        hint: 'Mỗi hình vuông tô kín là 1 đơn vị, mỗi cột là 1 phần mười, mỗi ô lẻ là 1 phần trăm.' });
      t.show('both');
      f.finish({ ok: `${w} đơn vị, ${a} phần mười, ${b} phần trăm: ${dec(n / 100, 2)}` });
    },
  };
}

/** Lập số trên bảng hàng theo cách đọc, bấm Xong. */
function task10Build() {
  return {
    id: 'g5d-build',
    make: (rng) => ({ s: randDec(rng, 0, 99, rng.int(1, 3), { lead0: 0.5 }) }),
    mount(f, { s }) {
      f.q.innerHTML = `Lập số: <span style="color:#1D4ED8">${capFirst(RD(s))}</span>`;
      const t = createDPlace(f.tool, { int: 2, dec: 3, read: false, parts: false });
      t.hideTop(true);
      f.say(`Lập số ${RD(s)} trên bảng hàng rồi bấm Xong.`, 'Lập số rồi bấm <b>Xong</b>.');
      f.choicesBox.innerHTML = '<button type="button" class="g4-choice g4-choice-go">✓ Xong</button>';
      f.choicesBox.classList.add('g4-choices-on');
      const btn = f.choicesBox.firstElementChild;
      const want = Math.round(valOf(s) * 1000);
      if (import.meta.env.DEV) window.__g4solve = () => { t.set(valOf(s)); btn.click(); };
      btn.onclick = () => {
        sfx.tap();
        t.hideTop(false);
        if (t.k === want) { btn.disabled = true; btn.classList.add('g4-choice-ok'); t.lock(true); f.finish({ ok: `Em lập đúng số ${s}.` }); return; }
        f.mistakes++;
        const p = t.places.find(q => t.counts[q] !== Math.floor(want / 10 ** (q + 3)) % 10);
        t.glow(p);
        f.hint(`Bảng đang là số ${RD(t.str())}. Hàng ${placeName(p)} cần ${Math.floor(want / 10 ** (p + 3)) % 10} thẻ.`, `Bảng đang là <b>${t.str()}</b>. Hàng ${placeName(p)} cần <b>${Math.floor(want / 10 ** (p + 3)) % 10}</b> thẻ.`);
        setTimeout(() => { t.hideTop(true); t.glow(null); }, 2500);
      };
    },
  };
}

// ═══ Bài 11: So sánh các số thập phân ════════════════════════════════════════════════════════════════
const BRIDGES = [['Long Biên', '2,29', '#F97316'], ['An Đông', '3,5', '#22C55E'], ['Cần Thơ', '2,75', '#3B82F6']];
const B11 = {
  explore: {
    setup: (board) => createCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        // ba cây cầu vẽ dài theo đúng tỉ lệ (1 km = 200)
        const K = 200, x0 = 120;
        let g = `<line x1="${x0}" y1="470" x2="${x0 + 4 * K + 20}" y2="470" stroke="${INK}" stroke-width="5"/>`;
        for (let k = 0; k <= 4; k++) g += `<line x1="${x0 + k * K}" y1="458" x2="${x0 + k * K}" y2="482" stroke="${INK}" stroke-width="4"/><text x="${x0 + k * K}" y="520" class="g4v-t" font-size="32">${k} km</text>`;
        BRIDGES.forEach(([name, s, col], i) => {
          const y = 90 + i * 120, w = valOf(s) * K;
          g += `<g class="g5x-br"><rect x="${x0}" y="${y}" width="${w}" height="34" rx="6" fill="${col}" stroke="${INK}" stroke-width="4"/>`;
          for (let k = 1; k < 8; k++) g += `<path d="M${x0 + (k * w) / 8} ${y + 34} v40" stroke="${INK}" stroke-width="4"/>`;
          g += `<text x="${x0 + 8}" y="${y - 12}" class="g4v-t" font-size="36" style="text-anchor:start">Cầu ${name}: ${s} km</text></g>`;
        });
        t.draw(g);
        t.qa('.g5x-br').forEach((e) => { e.style.transformBox = 'fill-box'; e.style.transformOrigin = 'left center'; });
        await t.anim('.g5x-br', [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 700, { stagger: 250 });
        t.caption('Cầu nào dài nhất?');
        await c.say('Cầu Long Biên dài hai phẩy hai mươi chín ki-lô-mét, cầu An Đông dài ba phẩy năm ki-lô-mét, cầu Cần Thơ dài hai phẩy bảy mươi lăm ki-lô-mét. Cầu nào dài nhất?');
        await c.choose(BRIDGES.map(([n]) => ({ html: n, value: n })), 'An Đông', { hint: 'Nhìn phần nguyên trước: số nào có phần nguyên lớn nhất?' });
        await c.say('Đúng rồi! Cùng xem máy soi so sánh từng số.');
      },
      async (c) => {
        const t = c.use((b) => createDCompare(b, '3,5', '2,75', { ov: true }));
        await c.say('Máy soi xem phần nguyên trước.', 'So sánh <b>3,5</b> và <b>2,75</b>');
        const r = await t.scan();
        t.setSign(r.sign);
        await c.say('Phần nguyên 3 lớn hơn 2, nên ba phẩy năm lớn hơn hai phẩy bảy mươi lăm. Không cần xem phần thập phân.', 'Phần nguyên 3 &gt; 2 → 3,5 <b>&gt;</b> 2,75');
      },
      async (c) => {
        const t = c.use((b) => createDCompare(b, '2,75', '2,29', { ov: true }));
        await c.say('Còn hai phẩy bảy mươi lăm và hai phẩy hai mươi chín thì sao?', 'So sánh <b>2,75</b> và <b>2,29</b>');
        const r = await t.scan();
        t.setSign(r.sign);
        await c.say('Phần nguyên bằng nhau thì so tiếp hàng phần mười: 7 lớn hơn 2. Vậy hai phẩy bảy mươi lăm lớn hơn.', 'Phần nguyên bằng nhau → so hàng phần mười: 7 &gt; 2 → 2,75 <b>&gt;</b> 2,29');
      },
      async (c) => {
        const t = c.use((b) => createDCompare(b, '0,7', '0,70', { ov: true }));
        await c.say('So sánh không phẩy bảy và không phẩy bảy mươi. Chỗ trống của số thứ nhất hiện chữ số 0 mờ.', 'So sánh <b>0,7</b> và <b>0,70</b>');
        t.ghosts(true);
        const r = await t.scan();
        t.setSign(r.sign);
        await c.say('Mọi hàng đều bằng nhau. Viết thêm hoặc bỏ chữ số 0 ở tận cùng bên phải phần thập phân thì được số bằng nó.', '0,7 = 0,70; 10,5070 = 10,507<br>Thêm hoặc bỏ <b>chữ số 0 ở tận cùng bên phải</b>');
      },
      async (c) => {
        const t = c.use((b) => createDCompare(b, '2,875', '3,1', { ov: true }));
        await c.say('Đến lượt em. Chọn dấu, máy soi sẽ kiểm tra.', 'Chọn dấu: 2,875 ? 3,1');
        await c.choose(['>', '<', '='].map(x => ({ html: x, value: x })), '<', { hint: 'So phần nguyên trước. Số nhiều chữ số hơn chưa chắc lớn hơn.' });
        const r = await t.scan();
        t.setSign(r.sign);
        await c.say('Phần nguyên 2 bé hơn 3. Hai phẩy tám trăm bảy mươi lăm có nhiều chữ số hơn nhưng vẫn bé hơn.', 'Phần nguyên 2 &lt; 3 → 2,875 <b>&lt;</b> 3,1');
      },
      async (c) => {
        const t = c.use((b) => createDCompare(b, '46,258', '46,52', { ov: true }));
        await c.say('Thêm một cặp nữa.', 'Chọn dấu: 46,258 ? 46,52');
        await c.choose(['>', '<', '='].map(x => ({ html: x, value: x })), '<', { hint: 'Phần nguyên bằng nhau. So hàng phần mười.' });
        const r = await t.scan();
        t.setSign(r.sign);
        await c.say('Phần nguyên bằng nhau. Hàng phần mười: 2 bé hơn 5. Vậy bốn mươi sáu phẩy hai trăm năm mươi tám bé hơn.', 'Hàng phần mười: 2 &lt; 5 → 46,258 <b>&lt;</b> 46,52');
      },
    ],
  },
  tasks: () => [task11Cmp(), task11Cmp({ trap: true }), task11Max(), task11Sort(), task11Zero(), task11Real()],
};

/** Cặp số để so sánh: trap = số nhiều chữ số hơn nhưng bé hơn; còn lại cùng phần nguyên khác ở một hàng, hoặc bằng nhau (0 ở cuối). */
function cmpPair(rng, trap) {
  if (trap) {
    const kind = rng.int(0, 2);
    if (kind === 0) { const i = rng.int(1, 40); return [randDec(rng, i, i, 3), randDec(rng, i + 1, i + 1, 1)]; } // 2,875 vs 3,1
    if (kind === 1) { const i = rng.int(1, 99); return [`${i},${rng.int(1, 4)}${rng.int(0, 9)}${rng.int(1, 9)}`, `${i},${rng.int(5, 9)}${rng.int(1, 9)}`]; } // 46,258 vs 46,52
    const i = rng.int(0, 9), a = rng.int(1, 8); return [`${i},${a}${rng.int(1, 9)}`, `${i},${a + 1}`]; // 0,45 vs 0,9
  }
  const r = rng();
  if (r < 0.2) { const dp = rng.int(1, 2), s = randDec(rng, 0, 50, dp); return [s, s + '0'.repeat(rng.int(1, 3 - dp))]; }
  const i = rng.int(1, 99), dp = rng.int(2, 3);
  const a = randDec(rng, i, i, dp);
  const d = splitDec(a).d.split('');
  const k = rng.int(0, dp - 1);
  d[k] = String((+d[k] + rng.int(1, 8)) % 10);
  if (k === dp - 1 && d[k] === '0') d[k] = '1';
  return [a, `${i},${d.join('')}`];
}

function task11Cmp({ trap = false } = {}) {
  return {
    id: `g5c-cmp${trap ? 't' : ''}`,
    make: (rng) => { const [a, b] = cmpPair(rng, trap); return rng() < 0.5 ? { a, b } : { a: b, b: a }; },
    async mount(f, { a, b }) {
      f.q.innerHTML = 'So sánh hai số:';
      const t = createDCompare(f.tool, a, b);
      const sign = cmpSign(a, b);
      await f.choose({ options: ['>', '<', '='].map(s => ({ html: s, value: s })), answer: sign, cls: 'g4-choice-big', say: 'Chọn dấu thích hợp.',
        hint: splitDec(a).i !== splitDec(b).i ? 'So phần nguyên trước.' : 'Phần nguyên bằng nhau: so lần lượt hàng phần mười, phần trăm, phần nghìn.' });
      t.ghosts(true);
      const r = await t.scan({ gap: 420 });
      t.setSign(r.sign);
      f.finish({ ok: `${a} ${sign} ${b}`, tip: 'So phần nguyên trước, rồi lần lượt từng hàng phần mười, phần trăm, phần nghìn.' });
    },
  };
}

function task11Max() {
  return {
    id: 'g5c-max',
    make: (rng) => {
      const i = rng.int(1, 30);
      const s = new Set();
      s.add(`${i},${rng.int(1, 4)}${rng.int(1, 9)}${rng.int(1, 9)}`);
      s.add(`${i},${rng.int(5, 9)}`);
      s.add(`${i},${rng.int(1, 9)}${rng.int(1, 9)}`);
      while (s.size < 4) s.add(randDec(rng, Math.max(0, i - 1), i, rng.int(1, 3)));
      const ns = rng.shuffle([...s].slice(0, 4));
      return { ns, max: rng() < 0.6 };
    },
    async mount(f, { ns, max }) {
      const vals = ns.map(valOf);
      const ans = ns[vals.indexOf(max ? Math.max(...vals) : Math.min(...vals))];
      f.q.innerHTML = `<span>Số nào <b>${max ? 'lớn' : 'bé'} nhất</b>?</span>`;
      await f.choose({ options: ns.map(n => ({ html: decHtml(n), value: n })), answer: ans, say: `Chọn số ${max ? 'lớn' : 'bé'} nhất.`,
        hint: 'So phần nguyên trước, rồi so hàng phần mười. Số nhiều chữ số hơn chưa chắc lớn hơn.' });
      f.finish({ ok: `Số ${max ? 'lớn' : 'bé'} nhất là ${ans}.` });
    },
  };
}

/** Sắp xếp từ bé đến lớn: chọn lần lượt số bé nhất còn lại. */
function task11Sort() {
  return {
    id: 'g5c-sort',
    make: (rng) => {
      const i = rng.int(0, 9);
      const s = new Set([`${i},${rng.int(1, 9)}`, `${i},${rng.int(1, 9)}${rng.int(1, 9)}`, `${i},0${rng.int(1, 9)}${rng.int(1, 9)}`, `${i + 1},${rng.int(0, 9)}${rng.int(1, 9)}`]);
      while (s.size < 4) s.add(randDec(rng, i, i, rng.int(1, 3)));
      const ns = [...s];
      if (new Set(ns.map(valOf)).size < 4) return { ns: [`${i},5`, `${i},45`, `${i},405`, `${i + 1},05`] };
      return { ns: rng.shuffle(ns) };
    },
    async mount(f, { ns }) {
      const sorted = [...ns].sort((a, b) => valOf(a) - valOf(b));
      f.q.innerHTML = `<small>Xếp từ bé đến lớn:</small><span class="g5x-sorted">${sorted.map(() => '<span class="g4-box g5x-slot"></span>').join(' &lt; ')}</span>`;
      const slots = [...f.q.querySelectorAll('.g5x-slot')];
      slots.forEach(s => { s.style.minWidth = '3.2em'; });
      const used = new Set();
      for (let k = 0; k < 4; k++) {
        const ans = sorted[k];
        const pr = f.choose({ options: ns.map(n => ({ html: decHtml(n), value: n })), answer: ans, say: k ? 'Số bé nhất còn lại?' : 'Chọn số bé nhất trước.',
          hint: 'So phần nguyên trước, rồi so hàng phần mười, phần trăm.' });
        f.choicesBox.querySelectorAll('.g4-choice').forEach((b, i) => { if (used.has(ns[i])) { b.disabled = true; b.style.opacity = '0.3'; } });
        await pr;
        used.add(ans);
        slots[k].innerHTML = decHtml(ans);
        slots[k].classList.add('g4-box-ok');
        slots[k].animate([{ transform: 'scale(0.4)' }, { transform: 'scale(1)' }], { duration: 300, easing: 'ease-out' });
        await sleep(250);
      }
      f.finish({ ok: sorted.join(' < ') });
    },
  };
}

/** Thêm / bỏ chữ số 0 ở tận cùng bên phải. */
function task11Zero() {
  return {
    id: 'g5c-zero',
    make: (rng) => {
      if (rng() < 0.5) { // Số nào bằng 10,507?
        const i = rng.int(1, 30), d = `${rng.int(1, 9)}0${rng.int(1, 9)}`;
        const s = `${i},${d}`;
        const opts = [`${s}0`, `${i},0${d}`, `${i},${d.replace('0', '')}`, `${i}${d[0]},${d.slice(1)}`];
        return { kind: 'eq', s, opts: rng.shuffle(opts), ans: `${s}0` };
      }
      const i = rng.int(0, 20), d = String(rng.int(1, 9));
      const s = `${i},${d}`;
      const opts = [`${i},${d}00`, `${i},00${d}`, `${i},0${d}0`, `${i || ''}${d},00`];
      return { kind: 'pad', s, opts: rng.shuffle(opts), ans: `${i},${d}00` };
    },
    async mount(f, { kind, s, opts, ans }) {
      f.q.innerHTML = `<span>${kind === 'eq' ? `Số nào <b>bằng</b> ${decHtml(s)}?` : `Viết ${decHtml(s)} thành số có <b>3 chữ số</b> ở phần thập phân:`}</span>`;
      await f.choose({ options: opts.map(o => ({ html: decHtml(o), value: o })), answer: ans, say: kind === 'eq' ? `Số nào bằng ${RD(s)}?` : 'Viết thêm chữ số 0 để phần thập phân có ba chữ số.',
        hint: 'Chỉ thêm hoặc bỏ chữ số 0 ở tận cùng bên phải phần thập phân.' });
      f.finish({ ok: `${s} = ${ans}`, tip: 'Viết thêm hoặc bỏ chữ số 0 ở tận cùng bên phải phần thập phân thì được số bằng nó.' });
    },
  };
}

/** So sánh số liệu thật. */
function task11Real() {
  const KIDS = ['Mai', 'Việt', 'Nam', 'Mi', 'Lan', 'Minh'];
  return {
    id: 'g5c-real',
    make: (rng) => {
      const [p, q] = rng.shuffle(KIDS).slice(0, 2);
      const kind = rng.pick(['cao', 'nặng', 'xa']);
      let a, b;
      if (kind === 'cao') { a = `1,${rng.int(30, 45)}`; b = `1,${rng.int(3, 4)}`; }
      else if (kind === 'nặng') { const i = rng.int(28, 38); a = `${i},${rng.int(1, 4)}${rng.int(1, 9)}`; b = `${i},${rng.int(5, 9)}`; }
      else { a = `2,${rng.int(60, 79)}`; b = `2,${rng.int(7, 8)}`; }
      if (valOf(a) === valOf(b)) b = `${splitDec(b).i},${+splitDec(b).d[0] + 1}`;
      return rng() < 0.5 ? { p, q, a, b, kind } : { p, q, a: b, b: a, kind };
    },
    async mount(f, { p, q, a, b, kind }) {
      const U = { cao: 'm', nặng: 'kg', xa: 'm' };
      const verb = { cao: 'cao', nặng: 'cân nặng', xa: 'nhảy xa được' };
      const more = { cao: 'cao hơn', nặng: 'nặng hơn', xa: 'nhảy xa hơn' };
      f.q.innerHTML = `<span>${p} ${verb[kind]} <b>${a} ${U[kind]}</b>, ${q} ${verb[kind]} <b>${b} ${U[kind]}</b>.<br>Bạn nào ${more[kind]}?</span>`;
      const t = createDCompare(f.tool, a, b);
      const ans = valOf(a) > valOf(b) ? p : q;
      await f.choose({ options: [p, q].map(x => ({ html: x, value: x })), answer: ans, say: `Bạn nào ${more[kind]}?`, hint: 'Phần nguyên bằng nhau thì so hàng phần mười.' });
      t.ghosts(true);
      const r = await t.scan({ gap: 420 });
      t.setSign(r.sign);
      f.finish({ ok: `${a} ${cmpSign(a, b)} ${b}: ${ans} ${more[kind]}.` });
    },
  };
}

// ═══ Bài 13: Làm tròn số thập phân ═══════════════════════════════════════════════════════════════════
const B13 = {
  explore: {
    setup: (board) => createDLine(board, { lo: 31, hi: 32, step: 1, minor: 0.1 }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Làm tròn <b>31,2</b> đến số tự nhiên gần nhất');
        await c.say('Số ba mươi mốt phẩy hai nằm giữa hai số tự nhiên 31 và 32. Thả bi xem nó lăn về đâu!');
        await t.roundDemo(31.2, 31, 32);
        t.caption('31,2 làm tròn thành <b>31</b>');
        await c.say('Bi lăn về 31, mốc gần hơn. Ba mươi mốt phẩy hai làm tròn thành 31.');
        await t.tilt(0);
      },
      async (c) => {
        const t = c.t;
        t.caption('Làm tròn <b>31,56</b> đến số tự nhiên gần nhất');
        await c.say('Còn ba mươi mốt phẩy năm mươi sáu thì sao?');
        await t.roundDemo(31.56, 31, 32);
        t.caption('31,56 làm tròn thành <b>32</b>');
        await c.say('Số này gần 32 hơn, nên làm tròn lên 32.');
        await t.tilt(0);
      },
      async (c) => {
        const t = c.t;
        t.caption('Đúng giữa: <b>31,5</b>');
        await c.say('Ba mươi mốt phẩy năm nằm đúng chính giữa, cách hai mốc bằng nhau. Quy ước: đúng giữa thì làm tròn lên.');
        await t.roundDemo(31.5, 31, 32);
        t.caption('31,5 làm tròn thành <b>32</b> (đúng giữa thì làm tròn lên)');
        await t.tilt(0);
        t.caption('Nhìn chữ số <b>hàng phần mười</b>: bé hơn 5 thì làm tròn xuống, còn lại làm tròn lên');
        await c.say('Cách nhanh: nhìn chữ số hàng phần mười. Bé hơn 5 thì làm tròn xuống. Từ 5 trở lên thì làm tròn lên.');
      },
      async (c) => {
        const t = c.t;
        t.reset({ lo: 9, hi: 10, step: 1, minor: 0.1 });
        t.caption('Làm tròn <b>9,82</b> đến số tự nhiên gần nhất');
        t.pin(9.82, { html: svgMark('9,82', -1) });
        await c.say('Làm tròn chín phẩy tám mươi hai đến số tự nhiên gần nhất. Chữ số hàng phần mười là 8. Được số nào?', '9,<b>8</b>2 làm tròn thành số nào?');
        await c.choose(['9', '10', '9,10'].map(x => ({ html: x, value: x })), '10', { hint: '8 lớn hơn 5 nên làm tròn lên: 9 thêm 1 thành 10.' });
        await t.roundDemo(9.82, 9, 10, { html: svgMark('9,82', -1) });
        t.caption('9,82 làm tròn thành <b>10</b>');
        await c.say('Đúng rồi! Làm tròn lên: 9 thêm 1 là 10, không phải chín phẩy mười.');
        await t.tilt(0);
      },
      async (c) => {
        const t = c.t;
        t.reset({ lo: 2, hi: 3, step: 1, minor: 0.1 });
        t.caption('Quả dưa cân nặng <b>2,52 kg</b>. Làm tròn đến <b>hàng phần mười</b>');
        await c.say('Quả dưa cân nặng hai phẩy năm mươi hai ki-lô-gam. Làm tròn đến hàng phần mười. Soi kính lúp vào đoạn từ hai phẩy năm đến hai phẩy sáu.');
        await t.zoomInto(2.5, 2.6, { minor: 0.01 });
        const to = await t.roundDemo(2.52, 2.5, 2.6, { html: svgMark('2,52', -2) });
        t.caption(`Chữ số hàng phần trăm là 2 &lt; 5: 2,52 làm tròn thành <b>${dec(to)}</b>`);
        await c.say('Nhìn chữ số hàng phần trăm: 2 bé hơn 5, làm tròn xuống. Quả dưa nặng khoảng hai phẩy năm ki-lô-gam.');
        await t.tilt(0);
      },
      async (c) => {
        const t = c.t;
        t.reset({ lo: 6.3, hi: 6.4, step: 0.1, minor: 0.01 });
        t.caption('Làm tròn <b>6,325</b> đến <b>hàng phần trăm</b>');
        await c.say('Làm tròn sáu phẩy ba trăm hai mươi lăm đến hàng phần trăm. Phải nhìn chữ số ngay bên phải hàng phần trăm, là chữ số hàng phần nghìn.', 'Nhìn chữ số <b>ngay bên phải</b> hàng cần làm tròn.');
        await t.zoomInto(6.32, 6.33, { minor: 0.001 });
        t.pin(6.325, { html: svgMark('6,325', -3) });
        await c.say('Chữ số hàng phần nghìn là 5. Được số nào?', '6,32<b>5</b> làm tròn đến hàng phần trăm?');
        await c.choose(['6,32', '6,33', '6,3'].map(x => ({ html: x, value: x })), '6,33', { hint: 'Chữ số 5: đúng giữa, làm tròn lên.' });
        await t.roundDemo(6.325, 6.32, 6.33, { html: svgMark('6,325', -3) });
        t.caption('6,325 làm tròn thành <b>6,33</b>');
        await c.say('Đúng rồi! Chữ số 5 thì làm tròn lên: sáu phẩy ba mươi ba.');
        await t.tilt(0);
      },
    ],
  },
  tasks: () => [task13Round(0), task13Round(1), task13Round(2), task13Digit(), task13Real()],
};

/** Làm tròn đến số tự nhiên (dp 0), hàng phần mười (1), phần trăm (2): gõ số, bi lăn kiểm chứng. */
function task13Round(dp) {
  const LV = ['số tự nhiên gần nhất', 'hàng phần mười', 'hàng phần trăm'];
  const LOOK = ['phần mười', 'phần trăm', 'phần nghìn'];
  return {
    id: `g5r-${dp}`,
    make: (rng) => {
      const n = Math.min(3, dp + rng.int(1, 2));
      let i = rng.int(0, dp === 0 ? 99 : 30);
      let d = Array.from({ length: n }, () => rng.int(0, 9));
      const r = rng();
      // hay nhầm: làm tròn lên có nhớ (9,82 → 10; 2,96 → 3) và đúng giữa (… 5)
      if (r < 0.25) { if (dp === 0) i = i - (i % 10) + 9; else d[dp - 1] = 9; d[dp] = rng.int(5, 9); }
      else if (r < 0.4) { d = d.slice(0, dp + 1); d[dp] = 5; }
      if (!d[d.length - 1]) d[d.length - 1] = rng.int(1, 9);
      return { s: `${i},${d.join('')}` };
    },
    async mount(f, { s }) {
      const x = valOf(s), unit = 10 ** -dp;
      const lo = clean(Math.floor(clean(x / unit) + 1e-9) * unit), hi = clean(lo + unit), ans = roundDp(x, dp);
      const look = -(dp + 1), dgt = +digitAt(s, look);
      f.q.innerHTML = `Làm tròn ${decHtml(s, { mark: look })} đến ${LV[dp]}: ${BOX}`;
      const t = createDLine(f.tool, { lo, hi, step: unit, minor: unit / 10, labels: 'majors', caption: false });
      t.flag(lo); t.flag(hi);
      t.pin(x, { html: svgMark(s, look) });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: dp ? decKey(ans) : ans, max: String(Math.floor(ans)).length + dp + 2, say: `Làm tròn ${RD(s)} đến ${LV[dp]}.`,
        hint: `Chữ số hàng ${LOOK[dp]} là ${dgt}: ${dgt < 5 ? 'bé hơn 5 nên làm tròn xuống' : 'từ 5 trở lên nên làm tròn lên'}.` });
      await t.roundDemo(x, lo, hi, { html: svgMark(s, look), keep: true });
      f.finish({ ok: `${s} làm tròn thành ${dec(ans)}.`, tip: `Nhìn chữ số hàng ${LOOK[dp]} (ngay bên phải hàng cần làm tròn): bé hơn 5 thì làm tròn xuống, còn lại làm tròn lên.` });
    },
  };
}

/** Làm tròn đến hàng nào thì nhìn chữ số nào. */
function task13Digit() {
  const LV = ['số tự nhiên', 'hàng phần mười', 'hàng phần trăm'];
  return {
    id: 'g5r-digit',
    make: (rng) => ({ s: randDec(rng, 1, 99, 3), dp: rng.int(0, 2) }),
    async mount(f, { s, dp }) {
      const look = -(dp + 1);
      const ps = [0, -1, -2, -3];
      f.q.innerHTML = `<span>Làm tròn ${decHtml(s)} đến <b>${LV[dp]}</b>,<br>em nhìn chữ số nào?</span>`;
      await f.choose({ options: ps.map(p => ({ html: decHtml(s, { color: false, mark: p }), value: p })), answer: look,
        say: `Làm tròn ${RD(s)} đến ${LV[dp]}, em nhìn chữ số nào?`, hint: 'Nhìn chữ số ngay bên phải hàng cần làm tròn, không phải chính hàng đó.' });
      f.finish({ ok: `Nhìn chữ số hàng ${placeName(look)}: ${digitAt(s, look)}.` });
    },
  };
}

/** Số liệu thật: chọn số làm tròn đúng (có đáp án bẫy). */
function task13Real() {
  const ITEMS = [
    { make: (r) => `${r.int(1, 4)},${r.int(10, 99)}`, text: (s) => `Quả dưa hấu cân nặng <b>${s} kg</b>.`, dp: 1, u: 'kg' },
    { make: (r) => `1,${r.int(300, 459)}`.replace(/0$/, '1'), text: (s) => `Bạn Nam cao <b>${s} m</b>.`, dp: 2, u: 'm' },
    { make: (r) => `${r.int(26, 40)},${r.int(1, 9)}`, text: (s) => `Bạn Mai cân nặng <b>${s} kg</b>.`, dp: 0, u: 'kg' },
    { make: (r) => `${r.int(19, 25)},${r.int(10, 99)}`, text: (s) => `1 lít xăng giá <b>${s} nghìn đồng</b>.`, dp: 0, u: 'nghìn đồng' },
    { make: (r) => r.pick(['139,7', '108,0', '163,9', '81,3']).replace(',0', ',4'), text: (s) => `Màn hình ti vi có đường chéo dài <b>${s} cm</b>.`, dp: 0, u: 'cm' },
    { make: () => '3,14159', text: () => 'Số Pi bằng <b>3,14159…</b>', dp: 2, u: '' },
  ];
  const LV = ['số tự nhiên gần nhất', 'hàng phần mười', 'hàng phần trăm'];
  return {
    id: 'g5r-real',
    make: (rng) => { const k = rng.int(0, ITEMS.length - 1); return { k, s: ITEMS[k].make(rng) }; },
    async mount(f, { k, s }) {
      const it = ITEMS[k], x = valOf(s), dp = it.dp;
      const ans = roundDp(x, dp);
      const down = clean(Math.floor(clean(x * 10 ** dp) + 1e-9) / 10 ** dp), up = clean(down + 10 ** -dp);
      const other = roundDp(x, dp === 0 ? 1 : dp - 1);
      const opts = [...new Set([ans, down, up, other].map(v => decKey(v)))].slice(0, 3);
      if (!opts.includes(decKey(ans))) opts[2] = decKey(ans);
      f.q.innerHTML = `<span>${it.text(s)}<br>Làm tròn đến ${LV[dp]}: khoảng bao nhiêu${it.u ? ` ${it.u}` : ''}?</span>`;
      const sh = [...opts].sort((a, b) => valOf(a) - valOf(b));
      await f.choose({ options: sh.map(o => ({ html: `${dec(valOf(o))}${it.u ? ` ${it.u}` : ''}`, value: o })), answer: decKey(ans), say: `Làm tròn đến ${LV[dp]}.`,
        hint: `Nhìn chữ số hàng ${['phần mười', 'phần trăm', 'phần nghìn'][dp]}: bé hơn 5 thì làm tròn xuống, còn lại làm tròn lên.` });
      const u = it.u ? ` ${it.u}` : '';
      f.finish({ ok: `${s}${u} làm tròn thành ${dec(ans)}${u}.` });
    },
  };
}

export const DECIMAL_LESSONS = { 4: B4, 10: B10, 11: B11, 13: B13 };
