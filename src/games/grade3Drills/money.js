/**
 * 💵 Tiền Việt Nam (Toán 3 KNTT Tập 2, Bài 68: các tờ 1 000 … 100 000 đồng). Bốn dạng, đề mới mỗi lượt:
 *   count: Đếm tiền. Vài tờ tiền nằm trên bàn; em chạm tờ lớn nhất trước, tờ tiền bay xuống hàng xếp từ lớn đến bé,
 *          rồi em gõ tổng. Sai: thầy nhắc đếm thêm (hiện số đếm dần dưới từng tờ). Đúng: số đếm dần chạy dưới hàng.
 *   pay:   Lấy đủ tiền. Món hàng có giá ghi rõ ("1 hộp bút màu giá 35 000 đồng."). Ví tiền nằm ở chỗ bàn phím:
 *          chạm tờ tiền → bay lên quầy (chạm tờ trên quầy → cất lại), bấm "Trả tiền": cô bán hàng đếm thêm từng tờ.
 *          Nhiều cách đúng; trả bằng ít tờ nhất được khen thêm.
 *   calc:  Tính tiền và tiền trả lại: bài giải hai dòng như trong vở (chọn phép tính, gõ kết quả), cuối lượt tiền
 *          trả lại bay ra quầy.
 *   swap:  Đổi tiền: 1 tờ 20 000 đồng đổi được mấy tờ 5 000 đồng (hoặc 1 tờ 20 000 đồng và mấy tờ 10 000 đồng).
 *          Đúng: các tờ nhỏ bay xuống hàng, đếm thêm tới đúng số tiền tờ lớn.
 * Tờ tiền vẽ phẳng của Khám phá Bài 68 (grade3Explore/tap2/money.js), không chép mẫu tiền thật.
 * Bố cục không đổi trong lượt: mọi hàng tờ tiền, nhãn đếm, ô trả lời đều giữ chỗ từ đầu.
 */

import { mountDrill, shake, setActive, setUse, flyDigit, flyOne, fmt, fresh, sfx, sleep, how, TEACHER, MINUS } from './kit.js';
import { noteSvg } from '../grade3Explore/tap2/money.js';
import { readVN } from '../grade4Tools/num.js';

const NOTES = [1000, 2000, 5000, 10000, 20000, 50000];
// Số tiền viết liền một khối (dấu cách không ngắt dòng): "20 000 đồng" không bị xuống dòng giữa chừng.
const NBSP = String.fromCharCode(160);
const D = (v) => `${fmt(v)} đồng`.split(' ').join(NBSP);
// Số tiền dài ("10 000", "100 000") thu nhỏ một chút cho nằm gọn trong khung tờ tiền.
const art = (v) => noteSvg(v).replace(/x="128" y="58"([^>]*)font-size="(\d+)"/, (_, a, f) => `x="130" y="58"${a}font-size="${String(v).length >= 6 ? 27 : String(v).length === 5 ? 32 : f}"`);
const noteHtml = (v) => art(v).replace('class="x3m-note"', 'class="mny-svg"');
const flyNote = (v) => art(v).replace('class="x3m-note"', 'width="100%" height="100%" style="display:block"');
/** Tờ tiền đặt trong một ô (ô là khung chứa: tờ tiền to hết cỡ ô, giữ đúng tỉ lệ). */
const noteIn = (v, rot = 0) => `<span class="mny-n" data-v="${v}"${rot ? ` style="transform:rotate(${rot}deg)"` : ''}>${noteHtml(v)}</span>`;

/** Câu cho giọng đọc: số từ 1 000 trở lên đọc thành chữ (máy đọc chữ số dễ sai), dấu phép tính thành chữ. */
function spk(s) {
  return String(s).replace(/<[^>]*>/g, '').replace(/💡\s*/g, '').split(NBSP).join(' ')
    .replace(/\d{1,3}(?: \d{3})+/g, (x) => readVN(Number(x.replace(/ /g, ''))))
    .replace(/ × /g, ' nhân ').replace(/ − /g, ' trừ ').replace(/ \+ /g, ' cộng ').replace(/ = /g, ' bằng ');
}

/** Ít tờ nhất (dãy 1 – 2 – 5: lấy tờ lớn nhất còn lấy được là ít tờ nhất). */
function fewest(v, notes = NOTES) {
  const out = [];
  for (const n of [...notes].sort((a, b) => b - a)) while (v >= n) { out.push(n); v -= n; }
  return out;
}

// ── Hàng hoá: giá thật (nghìn đồng) ─────────────────────────────────────────────────────────────────
const IT = (pic, unit, noun, prices) => ({ pic, unit, noun, prices: prices.map(p => p * 1000), of: (n) => `${n} ${unit} ${noun}` });
const ITEMS = [
  IT('📒', 'quyển', 'vở', [6, 7, 8, 9, 10, 12]),
  IT('🖊️', 'cái', 'bút bi', [4, 5, 6, 7]),
  IT('✏️', 'cái', 'bút chì', [3, 4, 5, 6]),
  IT('📏', 'cái', 'thước kẻ', [5, 6, 8, 10]),
  IT('📘', 'quyển', 'truyện tranh', [15, 18, 20, 22, 25]),
  IT('🖍️', 'hộp', 'bút màu', [25, 28, 32, 35, 38]),
  IT('🥖', 'ổ', 'bánh mì', [12, 15, 18, 20]),
  IT('🥛', 'hộp', 'sữa', [7, 8, 9, 10]),
  IT('🍊', 'kg', 'cam', [25, 30, 35, 40]),
  IT('🍌', 'nải', 'chuối', [20, 25, 30]),
  IT('⚽', 'quả', 'bóng', [45, 55, 65, 75, 85]),
  IT('🧢', 'cái', 'mũ', [35, 45, 55, 65]),
  IT('🧸', 'con', 'gấu bông', [65, 75, 85, 95]),
  IT('🎒', 'cái', 'cặp sách', [85, 90, 95]),
];
const NAMES = ['Mai', 'Lan', 'Nam', 'Hùng', 'Hoa', 'An', 'Minh', 'Bình', 'Linh', 'Khoa'];

// ── Sinh đề ─────────────────────────────────────────────────────────────────────────────────────────
function genCount(rng, k) {
  const n = [3, 4, 5, 4, 6][k % 5];
  for (let t = 0; t < 80; t++) {
    const vals = Array.from({ length: n }, () => rng.pick(rng() < 0.3 ? [10000, 20000, 50000] : NOTES));
    const total = vals.reduce((a, b) => a + b, 0);
    if (total > 100000 || new Set(vals).size < 2 || vals.filter(v => v === 50000).length > 1) continue;
    const sorted = [...vals].sort((a, b) => b - a);
    let lay = rng.shuffle(vals);
    if (lay.join() === sorted.join()) lay = [...lay].reverse();
    return { t: 'count', lay, sorted, total, key: `count:${sorted.join('+')}` };
  }
  return { t: 'count', lay: [5000, 20000, 2000], sorted: [20000, 5000, 2000], total: 27000, key: 'count:27000' };
}

function genPay(rng) {
  for (let t = 0; t < 80; t++) {
    const item = rng.pick(ITEMS), price = rng.pick(item.prices);
    const best = fewest(price);
    if (best.length < 2 || best.length > 5) continue;
    return { t: 'pay', item, price, best, key: `pay:${item.noun}:${price}` };
  }
  return { t: 'pay', item: ITEMS[5], price: 35000, best: [20000, 10000, 5000], key: 'pay:35000' };
}

function genCalc(rng, k) {
  const who = rng.pick(NAMES);
  for (let t = 0; t < 120; t++) {
    const mul = (k + rng.int(0, 1)) % 2 === 0;
    let total, story, step1, items;
    if (mul) {
      const item = rng.pick(ITEMS.filter(i => i.prices[0] <= 20000));
      const price = rng.pick(item.prices.filter(p => p <= 25000)), n = rng.int(2, 5);
      total = price * n;
      items = [{ item, price, n }];
      step1 = {
        label: `Số tiền mua ${item.of(n)} là`, val: total,
        opts: [{ l: price, op: '×', r: n, ok: true }, { l: price, op: '+', r: n, rule: `Mỗi ${item.unit} giá ${D(price)}, mua ${n} ${item.unit}: lấy ${fmt(price)} × ${n}.` }],
      };
    } else {
      const [A, B] = rng.shuffle(ITEMS.filter(i => i.prices[0] <= 45000)).slice(0, 2);
      const a = rng.pick(A.prices), b = rng.pick(B.prices);
      if (a === b) continue;
      total = a + b;
      items = [{ item: A, price: a, n: 1 }, { item: B, price: b, n: 1 }];
      const [hi, lo] = a > b ? [a, b] : [b, a];
      step1 = {
        label: `Số tiền mua ${A.noun} và ${B.noun} là`, val: total,
        opts: [{ l: a, op: '+', r: b, ok: true }, { l: hi, op: MINUS, r: lo, rule: `Mua cả hai thứ thì cộng giá hai thứ: ${fmt(a)} + ${fmt(b)}.` }],
      };
    }
    const paid = [20000, 50000, 100000].find(p => p > total);
    if (!paid || paid - total < 1000 || total < paid / 4) continue;
    const change = paid - total;
    const one = items[0].price;
    step1.opts.push({ l: paid, op: MINUS, r: one, rule: mul ? `Trước hết tính tiền mua cả ${items[0].n} ${items[0].item.unit}.` : 'Trước hết tính tiền mua cả hai thứ.' });
    const step2 = {
      label: 'Số tiền cô trả lại là', val: change,
      opts: [
        { l: paid, op: MINUS, r: total, mid: 'r', ok: true },
        { l: paid, op: '+', r: total, mid: 'r', rule: `Trả lại thì lấy tiền đưa trừ đi tiền mua hàng: ${fmt(paid)} − ${fmt(total)}.` },
        { l: paid, op: MINUS, r: one, rule: mul ? `Trừ đi tiền mua cả ${items[0].n} ${items[0].item.unit} (${D(total)}), không phải giá 1 ${items[0].item.unit}.` : `Trừ đi tiền mua cả hai thứ (${D(total)}), không phải giá một thứ.` },
      ],
    };
    if (mul) story = `1 ${items[0].item.unit} ${items[0].item.noun} giá <b>${D(one)}</b>. ${who} mua <b>${items[0].n}</b> ${items[0].item.unit} và đưa cô bán hàng tờ <b>${D(paid)}</b>. Cô trả lại ${who} bao nhiêu tiền?`;
    else story = `${who} mua 1 ${items[0].item.unit} ${items[0].item.noun} giá <b>${D(items[0].price)}</b> và 1 ${items[1].item.unit} ${items[1].item.noun} giá <b>${D(items[1].price)}</b>, đưa cô bán hàng tờ <b>${D(paid)}</b>. Cô trả lại ${who} bao nhiêu tiền?`;
    return { t: 'calc', mul, who, items, total, paid, change, story, steps: [step1, step2], key: `calc:${items.map(i => `${i.item.noun}${i.price}x${i.n}`).join('+')}:${paid}` };
  }
  return genCalc(rng, k + 1);
}

const SWAP_ONE = [];
const SWAP_MIX = [];
for (const big of [2000, 5000, 10000, 20000, 50000, 100000]) {
  for (const b of NOTES) if (b < big && big % b === 0 && big / b <= 10) SWAP_ONE.push({ big, b, ans: big / b });
  for (const a of NOTES) for (const b of NOTES) {
    if (a >= big || b >= big || a === b || (big - a) % b) continue;
    const ans = (big - a) / b;
    if (ans >= 2 && ans <= 8 && big >= 10000) SWAP_MIX.push({ big, a, b, ans });
  }
}
function genSwap(rng, k) {
  const mix = k % 3 === 2;
  const s = rng.pick(mix ? SWAP_MIX : SWAP_ONE);
  return { t: 'swap', ...s, a: s.a || 0, key: `swap:${s.big}:${s.a || 0}:${s.b}` };
}

const GEN = { count: genCount, pay: genPay, calc: genCalc, swap: genSwap };
const LEVEL = (id, n, title, desc, knowledge, kinds, missions, ask) => ({ id, n, title, desc, knowledge, lessons: { workbook: ['bai-68'] }, kinds, missions, ask: () => ask });

export const MONEY_LEVELS = [
  LEVEL('drill-money-1', 1, 'Đếm tiền', 'Vd. tờ 20 000, 5 000, 2 000 đồng: xếp tờ lớn trước, đếm thêm được 27 000 đồng.',
    'đếm tiền: xếp tờ lớn đến tờ bé rồi đếm thêm', ['count'], 5, 'Xếp tờ lớn trước, rồi đếm thêm từng tờ!'),
  LEVEL('drill-money-2', 2, 'Lấy đủ tiền', 'Vd. 1 hộp bút màu giá 35 000 đồng: lấy tờ 20 000, 10 000 và 5 000 đồng.',
    'lấy đủ tiền để trả, dùng ít tờ nhất', ['pay'], 5, 'Lấy tờ lớn nhất còn lấy được, rồi lấy tiếp!'),
  LEVEL('drill-money-3', 3, 'Tính tiền và tiền trả lại', 'Vd. 1 quyển vở giá 8 000 đồng, mua 3 quyển, đưa 50 000 đồng. Cô trả lại bao nhiêu tiền?',
    'tính tiền mua hàng và tiền trả lại, viết bài giải hai bước', ['calc'], 4, 'Bước 1 tính tiền mua hàng, bước 2 tính tiền trả lại!'),
  LEVEL('drill-money-4', 4, 'Đổi tiền', 'Vd. 1 tờ 20 000 đồng đổi được mấy tờ 5 000 đồng?',
    'đổi tờ tiền lớn ra các tờ tiền nhỏ', ['swap'], 5, 'Đếm thêm tờ nhỏ đến khi bằng tờ lớn!'),
  LEVEL('drill-money-5', 5, 'Trộn các dạng', 'Đếm tiền, lấy đủ tiền, tính tiền trả lại và đổi tiền, trộn lẫn.',
    'tiền Việt Nam: đếm, trả, tính, đổi tiền', ['count', 'pay', 'calc', 'swap', 'count', 'swap'], 6, 'Đọc kĩ số tiền trên từng tờ!'),
];

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────────
export const MONEY_GAME = {
  id: 'drill-money', icon: '💵', title: 'Tiền Việt Nam',
  purpose: 'Giúp em đếm tiền, lấy đủ tiền để trả, tính tiền trả lại và đổi tiền với các tờ từ 1 000 đến 100 000 đồng.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: MONEY_LEVELS,
  stallIcon: () => '💵',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['💵', 'Xem tờ tiền'], ['🔢', 'Đếm thêm'], ['🛒', 'Trả tiền'], ['⌨️', 'Gõ số']),

  makeMission(rng, level, history) {
    const k = history.length;
    const kind = level.kinds[k % level.kinds.length];
    return fresh(history, () => GEN[kind](rng, k), (m) => m.key);
  },

  mountMission(stage, m, level, api) {
    ({ count: mountCount, pay: mountPay, calc: mountCalc, swap: mountSwap })[m.t](stage, m, api);
  },
};

/** Ô kết quả đủ rộng cho số dài nhất từ đầu lượt. */
const boxW = (v) => `${String(fmt(v)).length * 0.58 + 0.9}em`;

function setup(stage, api, board, cls) {
  const d = mountDrill(stage, { api, board, cls: `mny-scene ${cls}` });
  injectMoneyStyles();
  const talk = (shown, mood) => d.say(spk(shown), shown, mood);
  const tell = (shown) => d.hint(spk(shown), shown);
  return { ...d, talk, tell };
}

/** Bay một tờ tiền từ phần tử `from` (tờ tiền đang hiện) vào ô `slot`; đáp xong thì tờ tiền hiện trong ô. */
function flyInto(v, from, slot, { rot = 0, onLand } = {}) {
  slot.innerHTML = noteIn(v, rot);
  const el = slot.firstElementChild;
  el.style.visibility = 'hidden';
  return flyOne(flyNote(v), from.getBoundingClientRect(), el.getBoundingClientRect(), {
    minMs: 380, maxMs: 620, spin: 10, onLand: () => { el.style.visibility = ''; el.classList.add('mny-land'); onLand?.(); },
  });
}

/** Nhãn đếm thêm dưới hàng tờ tiền: hiện lần lượt, tờ đang đếm sáng lên. */
async function countOn(cells, values, { from = 0, start = 0, gap = 420 } = {}) {
  let s = start;
  for (let i = 0; i < values.length; i++) {
    s += values[i];
    const c = cells[from + i];
    const lab = c.querySelector('.mny-lab');
    setUse(c.closest('.mny'), c.querySelector('.mny-n'));
    lab.textContent = fmt(s);
    lab.classList.add('mny-lab-on');
    lab.classList.remove('mny-pop'); void lab.offsetWidth; lab.classList.add('mny-pop');
    sfx.pop(Math.min(i, 5));
    await sleep(gap);
  }
  setUse(cells[0].closest('.mny'), null);
}
const cellHtml = (i) => `<div class="mny-cell" data-c="${i}"><div class="mny-slot"></div><div class="mny-lab">&nbsp;</div></div>`;

// ── 1. Đếm tiền ─────────────────────────────────────────────────────────────────────────────────────
function mountCount(stage, m, api) {
  const n = m.lay.length;
  const rots = [-8, 6, -4, 9, -6, 4];
  // Tờ tiền nằm rải trên bàn 3 × 2 ô (ít tờ thì so le, không dồn một hàng).
  const pos = { 3: [0, 4, 2], 4: [0, 2, 4, 3], 5: [0, 1, 2, 3, 5], 6: [0, 1, 2, 3, 4, 5] }[n];
  const at = (cell) => pos.indexOf(cell);
  const board = `
    <div class="mny mny-count">
      <div class="mny-head">Có tất cả bao nhiêu tiền?</div>
      <div class="mny-table">${Array.from({ length: 6 }, (_, c) => { const i = at(c); return `<div class="mny-slot mny-tslot">${i >= 0 ? `<button type="button" class="mny-pick" data-i="${i}" aria-label="${D(m.lay[i])}">${noteIn(m.lay[i], rots[c])}</button>` : ''}</div>`; }).join('')}</div>
      <div class="mny-row mny-row32">${Array.from({ length: 6 }, (_, i) => cellHtml(i)).join('')}</div>
      <div class="mny-ansl"><span>Có tất cả:</span><span class="g3d-box" style="--boxw:${boxW(m.total)}" data-ans></span><span>đồng</span></div>
    </div>`;
  const { paper, talk, tell, pad, done } = setup(stage, api, board, 'mny-s-count');
  const cells = [...paper.querySelectorAll('.mny-row .mny-cell')];
  const box = paper.querySelector('[data-ans]');
  let placed = 0, mistakes = 0, tip = '', phase = 'sort', wrongs = 0, shownSums = false;
  const left = () => [...paper.querySelectorAll('.mny-pick:not(.mny-gone)')];

  talk('Xếp tiền từ tờ lớn đến tờ bé. Chạm <b>tờ lớn nhất</b>!');
  setActive(paper, null);

  paper.querySelector('.mny-table').addEventListener('click', async (e) => {
    const b = e.target.closest('.mny-pick');
    if (!b || phase !== 'sort' || b.classList.contains('mny-gone')) return;
    const v = m.lay[+b.dataset.i];
    const max = Math.max(...left().map(x => m.lay[+x.dataset.i]));
    if (v < max) {
      mistakes++;
      tip ||= 'Xếp tờ lớn trước rồi đếm thêm từng tờ.';
      shake(b);
      tell(`Còn tờ <b>${D(max)}</b> lớn hơn. Chạm tờ lớn nhất trước.`);
      return;
    }
    sfx.tap();
    phase = 'fly';
    const j = placed++;
    const src = b.querySelector('.mny-n');
    const ms = flyInto(v, src, cells[j].querySelector('.mny-slot'), { onLand: () => sfx.pop(Math.min(j, 5)) });
    b.classList.add('mny-gone');
    await sleep(ms + 60);
    if (placed < n) { phase = 'sort'; return; }
    askTotal();
  });

  function askTotal() {
    phase = 'type';
    talk('Đếm thêm từ tờ lớn nhất. Có tất cả <b>bao nhiêu đồng</b>?');
    setActive(paper, box);
    const want = {
      max: 6,
      onType: (t) => { box.textContent = t ? fmt(t) : ''; },
      onSubmit: async (t) => {
        if (Number(t) !== m.total) {
          mistakes++;
          wrongs++;
          tip ||= 'Xếp tờ lớn trước rồi đếm thêm từng tờ.';
          box.textContent = '';
          shake(box);
          const sums = m.sorted.map((_, i) => m.sorted.slice(0, i + 1).reduce((a, b) => a + b, 0));
          if (wrongs === 1) {
            cells.slice(0, n - 1).forEach((c, i) => { c.querySelector('.mny-lab').textContent = fmt(sums[i]); c.querySelector('.mny-lab').classList.add('mny-lab-hint'); });
            tell(`Đếm thêm: ${sums.slice(0, -1).map(fmt).join(', ')}, rồi thêm tờ <b>${D(m.sorted[n - 1])}</b>.`);
          } else {
            shownSums = true;
            cells.slice(0, n).forEach((c, i) => { c.querySelector('.mny-lab').textContent = fmt(sums[i]); c.querySelector('.mny-lab').classList.add('mny-lab-hint'); });
            tell(`Có tất cả <b>${D(m.total)}</b>. Em gõ lại.`);
          }
          pad.want(want);
          return;
        }
        pad.off();
        phase = 'done';
        setActive(paper, null);
        box.classList.add('g3d-box-ok');
        sfx.pop(4);
        if (!shownSums) {
          cells.forEach(c => { c.querySelector('.mny-lab').innerHTML = '&nbsp;'; c.querySelector('.mny-lab').classList.remove('mny-lab-hint'); });
          talk('Cùng đếm thêm nào!');
          await countOn(cells, m.sorted);
        }
        await sleep(300);
        done(mistakes, { ok: `Có tất cả ${D(m.total)}.`, tip });
      },
    };
    pad.want(want);
  }

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m,
      step: () => {
        if (phase === 'sort') {
          const l = left();
          const b = l.reduce((x, y) => (m.lay[+y.dataset.i] > m.lay[+x.dataset.i] ? y : x));
          b.click();
        } else if (phase === 'type') pad.type(String(m.total));
      },
      wrong: () => { if (phase === 'type') pad.type(String(m.total + 1000)); },
    };
  }
}

// ── 2. Lấy đủ tiền ──────────────────────────────────────────────────────────────────────────────────
function mountPay(stage, m, api) {
  const SL = 6;
  const board = `
    <div class="mny mny-pay">
      <div class="mny-item"><span class="mny-pic">${m.item.pic}</span><span class="mny-price">1 ${m.item.unit} ${m.item.noun} giá <b>${D(m.price)}</b>.</span></div>
      <div class="mny-counter"><div class="mny-row mny-row32">${Array.from({ length: SL }, (_, i) => cellHtml(i)).join('')}</div></div>
      <div class="mny-payl"><span class="mny-status">&nbsp;</span><button type="button" class="g3g-btn g3d-choice mny-paybtn" disabled>💵 Trả tiền</button></div>
    </div>`;
  const { scene, paper, talk, tell, show, done } = setup(stage, api, board, 'mny-s-pay mny-walletmode');
  const zone = scene.querySelector('.g3d-padzone');
  zone.insertAdjacentHTML('beforeend', `<div class="mny-wallet"><span class="mny-wname">👛 Ví tiền</span><div class="mny-wnotes">${NOTES.map(v => `<button type="button" class="mny-wbtn" data-v="${v}" aria-label="${D(v)}"><span class="mny-slot">${noteIn(v)}</span></button>`).join('')}</div></div>`);
  const wallet = zone.querySelector('.mny-wallet');
  const cells = [...paper.querySelectorAll('.mny-cell')];
  const slots = cells.map(c => c.querySelector('.mny-slot'));
  const vals = Array(SL).fill(0);
  const payBtn = paper.querySelector('.mny-paybtn');
  const status = paper.querySelector('.mny-status');
  let mistakes = 0, tip = '', busy = false, wrongs = 0, over = false;
  const clearLabs = () => cells.forEach(c => { const l = c.querySelector('.mny-lab'); l.innerHTML = '&nbsp;'; l.classList.remove('mny-lab-on'); });
  const refresh = () => { payBtn.disabled = busy || !vals.some(Boolean); };

  talk(`1 ${m.item.unit} ${m.item.noun} giá <b>${D(m.price)}</b>. Lấy tiền trong ví, trả <b>vừa đủ</b>!`);

  wallet.addEventListener('click', async (e) => {
    const b = e.target.closest('.mny-wbtn');
    if (!b || busy || over) return;
    const v = +b.dataset.v;
    const i = vals.indexOf(0);
    if (i < 0) { shake(b); tell('Quầy đủ 6 tờ rồi. Cất bớt tờ nhỏ, lấy tờ lớn hơn.'); return; }
    sfx.tap();
    clearLabs();
    status.innerHTML = '&nbsp;';
    vals[i] = v;
    busy = true; refresh();
    await sleep(flyInto(v, b.querySelector('.mny-n'), slots[i], { onLand: () => sfx.pop(i % 6) }) + 30);
    busy = false; refresh();
  });

  paper.querySelector('.mny-counter').addEventListener('click', async (e) => {
    const c = e.target.closest('.mny-cell');
    if (!c || busy || over) return;
    const i = +c.dataset.c;
    const v = vals[i];
    if (!v) return;
    sfx.tap();
    clearLabs();
    status.innerHTML = '&nbsp;';
    vals[i] = 0;
    const el = slots[i].querySelector('.mny-n');
    const to = wallet.querySelector(`.mny-wbtn[data-v="${v}"] .mny-n`);
    busy = true; refresh();
    const r = el.getBoundingClientRect();
    slots[i].innerHTML = '';
    await sleep(flyOne(flyNote(v), r, to.getBoundingClientRect(), { minMs: 300, maxMs: 480 }) + 20);
    busy = false; refresh();
  });

  payBtn.addEventListener('click', async () => {
    if (busy || over) return;
    busy = true; refresh();
    sfx.tap();
    const idx = vals.map((v, i) => (v ? i : -1)).filter(i => i >= 0);
    show('Cô bán hàng đếm tiền…');
    await countOn(idx.map(i => cells[i]), idx.map(i => vals[i]), { gap: 480 });
    const sum = idx.reduce((s, i) => s + vals[i], 0);
    if (sum === m.price) {
      over = true;
      status.innerHTML = `Em đưa <b>${D(sum)}</b>. Vừa đủ!`;
      const few = idx.length <= m.best.length;
      sfx.ding();
      await sleep(500);
      done(mistakes, { ok: few ? `Em trả vừa đủ ${D(m.price)} bằng ít tờ nhất!` : `Em trả vừa đủ ${D(m.price)}. Ít tờ nhất: ${m.best.map(fmt).join(' + ')}.`, tip });
      return;
    }
    mistakes++;
    wrongs++;
    tip ||= 'Lấy tờ lớn nhất còn lấy được, cộng dần cho tới đúng giá.';
    status.innerHTML = `Em đưa <b>${D(sum)}</b>.`;
    shake(status);
    const more = sum > m.price;
    const extra = wrongs > 1 ? ` Thử: ${m.best.map(fmt).join(' + ')}.` : '';
    tell(more
      ? `Em đưa ${D(sum)}, <b>nhiều hơn</b> giá ${D(sum - m.price)}. Chạm tờ trên quầy để cất lại.${extra}`
      : `Em đưa ${D(sum)}, <b>còn thiếu</b> ${D(m.price - sum)}. Lấy thêm tiền trong ví.${extra}`);
    busy = false; refresh();
  });

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m,
      step: () => {
        if (busy || over) return;
        const have = vals.filter(Boolean).sort((a, b) => b - a);
        const need = m.best.find((v, i) => have[i] !== v);
        if (need && have.length < m.best.length) wallet.querySelector(`.mny-wbtn[data-v="${need}"]`).click();
        else payBtn.click();
      },
      wrong: () => { if (!busy && !over) wallet.querySelector('.mny-wbtn[data-v="50000"]').click(); },
    };
  }
}

// ── 3. Tính tiền và tiền trả lại ────────────────────────────────────────────────────────────────────
const optText = (o) => `${fmt(o.l)} ${o.op} ${fmt(o.r)}`;
function mountCalc(stage, m, api) {
  const exprW = Math.max(...m.steps.flatMap(st => st.opts.map(o => optText(o).length))) * 0.5 + 0.7;
  const ansW = Math.max(...m.steps.map(st => String(fmt(st.val)).length)) * 0.58 + 0.9;
  const finalText = D(m.change);
  const shelf = m.items.map(({ item, price, n }) => `<div class="mny-goods">
      <div class="mny-gpics" style="--k:${n}">${Array.from({ length: n }, () => `<span>${item.pic}</span>`).join('')}</div>
      <div class="mny-tag">${fmt(price)} đ</div></div>`).join('');
  const lineHtml = (st, i) => `
    <div class="w2-line" data-i="${i}">
      <span class="w2-label">${st.label}:</span>
      <span class="w2-calc"><span class="w2-expr" data-expr style="min-width:${exprW}em">…</span><span class="w2-eq">=</span><span class="g3d-box w2-ans" style="--boxw:${ansW}em" data-ans></span><span class="w2-unit">(đồng)</span></span>
    </div>`;
  const board = `
    <div class="mny mny-calc">
      <div class="mny-story">${m.story}</div>
      <div class="mny-shop">
        <div class="mny-shelf">${shelf}</div>
        <div class="mny-give"><span class="mny-cap">${m.who} đưa</span><div class="mny-slot mny-gslot">${noteIn(m.paid)}</div></div>
        <div class="mny-back"><span class="mny-cap">Trả lại</span><div class="mny-bgrid">${Array.from({ length: 6 }, () => '<div class="mny-slot"></div>').join('')}</div></div>
      </div>
      <div class="w2-choices mny-choices" data-choices></div>
      <div class="w2-sol mny-sol">
        <div class="w2-head">Bài giải</div>
        <div class="w2-lines">
          ${m.steps.map(lineHtml).join('')}
          <div class="w2-line w2-dap"><span class="w2-label">Đáp số:</span><span class="w2-final" data-final style="min-width:${finalText.length * 0.5 + 0.5}em">&nbsp;</span></div>
        </div>
      </div>
    </div>`;
  const { paper, talk, tell, show, pad, done } = setup(stage, api, board, 'mny-s-calc');
  const choices = paper.querySelector('[data-choices]');
  const lines = [...paper.querySelectorAll('.w2-line[data-i]')];
  const exprEl = (i) => lines[i].querySelector('[data-expr]');
  const ansEl = (i) => lines[i].querySelector('[data-ans]');
  let s = 0, phase = 'op', mistakes = 0, tip = '', opts = [];
  const wrong = (el, text) => { mistakes++; tip ||= text; shake(el); tell(text); };

  function startStep() {
    const st = m.steps[s];
    phase = 'op';
    opts = [...st.opts].sort((x, y) => (optText(x) < optText(y) ? -1 : 1));
    choices.style.setProperty('--ol', Math.max(...opts.map(o => optText(o).length)) * 0.56 + 1.2);
    choices.innerHTML = opts.map((o, i) => {
      const side = (v, me) => (s && o.mid === me ? `<span class="w2-midn">${fmt(v)}</span>` : fmt(v));
      return `<button type="button" class="g3g-btn g3d-choice w2-btn${s ? ' w2-btn-in' : ''}" data-o="${i}">${side(o.l, 'l')} ${o.op} ${side(o.r, 'r')}</button>`;
    }).join('');
    if (s) sfx.pop(1);
    choices.querySelectorAll('[data-o]').forEach(b => { b.onclick = () => pick(b); });
    setActive(paper, exprEl(s));
    if (s === 0) talk(`${m.story} <b>Bước 1:</b> ${st.label} …? Chọn phép tính.`);
    else talk(`<b>Bước 2:</b> ${st.label} …? Chọn phép tính.`);
    if (s === 0) show(`<b>Bước 1:</b> ${st.label} …? Chọn phép tính.`);
  }

  async function pick(btn) {
    if (phase !== 'op') return;
    sfx.tap();
    const st = m.steps[s];
    const o = opts[Number(btn.dataset.o)];
    if (!o.ok) { wrong(btn, o.rule); return; }
    phase = 'fly';
    btn.classList.add('g3d-choice-ok');
    choices.querySelectorAll('[data-o]').forEach(x => { x.disabled = true; });
    const ex = exprEl(s);
    setActive(paper, null);
    ex.classList.add('w2-expr-on');
    ex.innerHTML = `<span data-side="l">${fmt(o.l)}</span> ${o.op} <span data-side="r">${fmt(o.r)}</span>`;
    ex.style.color = 'transparent';
    const midEl = s && o.mid ? ex.querySelector(`[data-side="${o.mid}"]`) : null;
    if (midEl) midEl.style.visibility = 'hidden';
    const fs = parseFloat(getComputedStyle(btn).fontSize);
    await sleep(flyOne(`<div class="w2-fly" style="font-size:${fs}px">${optText(o)}</div>`, btn.getBoundingClientRect(), ex.getBoundingClientRect(), { minMs: 450, maxMs: 750 }) + 60);
    ex.style.color = '';
    sfx.pop(2);
    if (midEl) {
      const from = ansEl(0);
      setUse(paper, from);
      show(`Dùng kết quả <b>bước 1</b>: <b>${fmt(m.steps[0].val)}</b>.`);
      await sleep(flyDigit(fmt(m.steps[0].val), from, midEl, { minMs: 500, maxMs: 800 }) + 80);
      midEl.style.visibility = '';
      midEl.classList.add('w2-midn');
      sfx.pop(3);
      await sleep(300);
      setUse(paper, null);
    }
    phase = 'calc';
    const a = ansEl(s);
    setActive(paper, a);
    talk(`Tính <b>${optText(o)}</b>.`);
    const want = {
      max: 6,
      onType: (t) => { a.textContent = t ? fmt(t) : ''; },
      onSubmit: (t) => {
        if (Number(t) !== st.val) { a.textContent = ''; wrong(a, `${optText(o)} = ${fmt(st.val)}.`); pad.want(want); return; }
        pad.off();
        setActive(paper, null);
        a.classList.add('g3d-box-ok');
        sfx.pop(3);
        if (s === 0) { s = 1; setTimeout(startStep, 350); } else finish();
      },
    };
    pad.want(want);
  }

  async function finish() {
    phase = 'done';
    const fin = paper.querySelector('[data-final]');
    show(`<b>Đáp số:</b> ${finalText}.`);
    await sleep(flyDigit(fmt(m.change), ansEl(1), fin, { minMs: 450, maxMs: 750, onLand: () => { fin.textContent = finalText; fin.classList.add('w2-final-on'); sfx.pop(4); } }) + 150);
    // Cô bán hàng trả lại tiền: các tờ bay ra quầy (ít tờ nhất).
    const give = paper.querySelector('.mny-gslot .mny-n');
    const bs = [...paper.querySelectorAll('.mny-bgrid .mny-slot')];
    const back = fewest(m.change);
    talk(`Cô trả lại <b>${D(m.change)}</b>.`);
    for (let i = 0; i < back.length && i < bs.length; i++) await sleep(flyInto(back[i], give, bs[i], { onLand: () => sfx.pop(i) }) * 0.6 + 80);
    await sleep(600);
    done(mistakes, { ok: `Cô trả lại ${D(m.change)}.`, tip: tip ? 'Bước 1 tính tiền mua hàng, bước 2 lấy tiền đưa trừ tiền mua hàng.' : '' });
  }

  startStep();

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m,
      step: () => {
        if (phase === 'op') choices.querySelector(`[data-o="${opts.findIndex(o => o.ok)}"]`)?.click();
        else if (phase === 'calc') pad.type(String(m.steps[s].val));
      },
      wrong: () => { if (phase === 'op') choices.querySelector(`[data-o="${opts.findIndex(o => !o.ok)}"]`)?.click(); },
    };
  }
}

// ── 4. Đổi tiền ─────────────────────────────────────────────────────────────────────────────────────
function mountSwap(stage, m, api) {
  const q = m.a
    ? `1 tờ <b>${D(m.big)}</b> đổi được 1 tờ <b>${D(m.a)}</b> và mấy tờ <b>${D(m.b)}</b>?`
    : `1 tờ <b>${D(m.big)}</b> đổi được mấy tờ <b>${D(m.b)}</b>?`;
  const board = `
    <div class="mny mny-swap">
      <div class="mny-head">${q}</div>
      <div class="mny-eq">
        <div class="mny-slot mny-eqn" data-big>${noteIn(m.big)}</div>
        <span>=</span>
        ${m.a ? `<div class="mny-slot mny-eqn" data-a>${noteIn(m.a)}</div><span>+</span>` : ''}
        <span class="g3d-box" style="--boxw:1.6em" data-ans></span><span>tờ</span>
        <div class="mny-slot mny-eqn" data-b>${noteIn(m.b)}</div>
      </div>
      <div class="mny-row mny-row5">${Array.from({ length: 10 }, (_, i) => cellHtml(i)).join('')}</div>
    </div>`;
  const { paper, talk, tell, show, pad, done } = setup(stage, api, board, 'mny-s-swap');
  const box = paper.querySelector('[data-ans]');
  const cells = [...paper.querySelectorAll('.mny-row .mny-cell')];
  let mistakes = 0, tip = '', wrongs = 0, filled = false, phase = 'type';

  talk(m.a
    ? `1 tờ ${D(m.big)} đổi được 1 tờ ${D(m.a)} và <b>mấy tờ ${D(m.b)}</b>?`
    : `1 tờ ${D(m.big)} đổi được <b>mấy tờ ${D(m.b)}</b>?`);
  setActive(paper, box);

  /** Các tờ nhỏ bay xuống hàng, đếm thêm tới đúng số tiền tờ lớn. */
  async function fill() {
    filled = true;
    const srcB = paper.querySelector('[data-b] .mny-n');
    let k = 0;
    if (m.a) {
      await sleep(flyInto(m.a, paper.querySelector('[data-a] .mny-n'), cells[0].querySelector('.mny-slot')) + 40);
      k = 1;
    }
    for (let i = 0; i < m.ans; i++) await sleep(flyInto(m.b, srcB, cells[k + i].querySelector('.mny-slot'), { onLand: () => sfx.pop(i % 6) }) * 0.55 + 60);
    await sleep(250);
    await countOn(cells, [...(m.a ? [m.a] : []), ...Array(m.ans).fill(m.b)], { gap: 380 });
    paper.querySelector('[data-big] .mny-n').classList.add('mny-glow');
    sfx.ding();
  }

  const want = {
    max: 2,
    onType: (t) => { box.textContent = t; },
    onSubmit: async (t) => {
      if (Number(t) !== m.ans) {
        mistakes++;
        wrongs++;
        tip ||= `Đếm thêm ${fmt(m.b)} đồng mỗi tờ đến khi được ${D(m.big)}.`;
        box.textContent = '';
        shake(box);
        if (wrongs === 1) {
          tell(m.a
            ? `Đếm thêm từ ${fmt(m.a)}: mỗi tờ thêm ${fmt(m.b)}, đến khi được <b>${fmt(m.big)}</b>.`
            : `Đếm thêm: ${fmt(m.b)}, ${fmt(m.b * 2)}, … đến khi được <b>${fmt(m.big)}</b>.`);
          pad.want(want);
        } else {
          phase = 'fly';
          pad.off();
          show('Xem đổi tiền: đếm số tờ trên hàng.');
          if (!filled) await fill();
          tell(`Đếm số tờ <b>${D(m.b)}</b> trên hàng rồi gõ.`);
          phase = 'type';
          setActive(paper, box);
          pad.want(want);
        }
        return;
      }
      pad.off();
      phase = 'done';
      setActive(paper, null);
      box.classList.add('g3d-box-ok');
      sfx.pop(4);
      if (!filled) { talk('Đổi thử nào!'); await fill(); }
      await sleep(400);
      done(mistakes, { ok: m.a ? `1 tờ ${D(m.big)} đổi được 1 tờ ${D(m.a)} và ${m.ans} tờ ${D(m.b)}.` : `1 tờ ${D(m.big)} đổi được ${m.ans} tờ ${D(m.b)}.`, tip });
    },
  };
  pad.want(want);

  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { if (phase === 'type') pad.type(String(m.ans)); }, wrong: () => { if (phase === 'type') pad.type(String(m.ans + 1)); } };
  }
}

// ── Kiểu ────────────────────────────────────────────────────────────────────────────────────────────
let moneyStyles = false;
function injectMoneyStyles() {
  if (moneyStyles) return;
  moneyStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .mny { flex: 1; min-height: 0; display: grid; gap: 1.4cqh; padding: 1.6cqh 2.4cqi 1.6cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.6cqi);
      font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .mny > * { min-height: 0; min-width: 0; }
    .mny b { color: #C2410C; }
    .mny-head { font-size: min(6.2cqh, 3.6cqi, 2.5rem); line-height: 1.25; text-align: center; }
    .mny-slot { container-type: size; display: grid; place-items: center; position: relative; min-width: 0; min-height: 0; }
    .mny-n { display: block; width: min(96cqw, 96cqh * 2.083); aspect-ratio: 200 / 96; }
    .mny-svg { width: 100%; height: 100%; display: block; filter: drop-shadow(0 2px 2px rgba(0,0,0,.2)); }
    .mny-land { animation: mnyLand .3s ease; }
    @keyframes mnyLand { 50% { transform: scale(1.06); } }
    .mny-glow { filter: drop-shadow(0 0 10px #FACC15) drop-shadow(0 0 4px #F59E0B); }
    .mny .g3d-use .mny-svg, .mny-n.g3d-use { box-shadow: none; background: none; }
    .mny-n.g3d-use { outline: 0.35cqh solid #F59E0B; outline-offset: 3px; border-radius: 8px; }

    /* Hàng tờ tiền + nhãn đếm thêm (giữ chỗ từ đầu) */
    .mny-row { display: grid; gap: 1cqh 1.2cqi; }
    .mny-row6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
    .mny-row32 { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
    .mny-row5 { grid-template-columns: repeat(5, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
    .mny-cell { display: grid; grid-template-rows: minmax(0, 1fr) auto; min-height: 0; min-width: 0; border-bottom: 2px dashed #BFDBFE; }
    .mny-lab { text-align: center; font-size: min(4.6cqh, 2.4cqi, 2rem); line-height: 1.2; color: #94A3B8; }
    .mny-lab-hint { color: #B45309; }
    .mny-lab-on { color: #15803D; }
    .mny-pop { animation: mnyPop .35s cubic-bezier(.2,1.6,.4,1); }
    @keyframes mnyPop { from { transform: scale(0.5); } }

    /* 1. Đếm tiền: bàn gỗ, hàng xếp, dòng trả lời */
    .mny-count { grid-template-rows: auto minmax(0, 1fr) minmax(0, 1fr) auto; }
    .mny-table { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 1.2cqh 2cqi; padding: 1.6cqh 2cqi;
      background: linear-gradient(#E3B474, #D69E58); border-radius: 1rem; box-shadow: inset 0 0 0 3px #C08440, 0 5px 0 #A86E2E; }
    .mny-pick { width: 100%; height: 100%; padding: 0; border: 0; background: none; cursor: pointer; display: grid; place-items: center; container-type: size; touch-action: manipulation; }
    .mny-pick:not(.mny-gone):hover .mny-n { translate: 0 -3px; }
    .mny-gone { visibility: hidden; pointer-events: none; }
    .mny-ansl { display: flex; align-items: center; justify-content: center; gap: 0.35em; font-size: min(8cqh, 5cqi, 3.2rem); line-height: 1.25; white-space: nowrap; }
    .mny-ansl .g3d-box { height: 1.2em; }

    /* 2. Lấy đủ tiền: món hàng, quầy, ví ở chỗ bàn phím */
    .mny-pay { grid-template-rows: minmax(0, 0.9fr) minmax(0, 1fr) auto; }
    .mny-item { display: flex; align-items: center; justify-content: center; gap: 3cqi; background: #FFF7ED; border: 2px solid #FED7AA; border-radius: 1rem; padding: 1cqh 2cqi; }
    .mny-pic { font-size: min(22cqh, 14cqi); line-height: 1; filter: drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff); }
    .mny-price { font-size: min(7cqh, 4.2cqi, 3rem); line-height: 1.25; }
    .mny-counter { background: linear-gradient(#E3B474, #D69E58); border-radius: 1rem; padding: 1.4cqh 1.6cqi; box-shadow: inset 0 0 0 3px #C08440, 0 5px 0 #A86E2E; display: flex; }
    .mny-counter .mny-row { flex: 1; }
    .mny-counter .mny-cell { cursor: pointer; border-bottom-color: rgba(255,255,255,.5); }
    .mny-counter .mny-lab { color: #7C2D12; }
    .mny-counter .mny-lab-on, .mny-swap .mny-lab-on { justify-self: center; color: #166534; background: #DCFCE7; border-radius: 999px; padding: 0 0.5em; text-shadow: none; }
    .mny-payl { display: flex; align-items: center; justify-content: space-between; gap: 2cqi; }
    .mny-status { font-size: min(6.4cqh, 3.8cqi, 2.6rem); line-height: 1.2; }
    .mny-paybtn { flex: 0 0 auto; font-size: min(7cqh, 4.4cqi, 2.8rem); padding: 0.15em 0.9em; background: #22C55E; color: #fff; border-color: #16A34A; box-shadow: 0 5px 0 #15803D; }
    .mny-paybtn:disabled { background: #fff; }
    .mny-walletmode .g3d-keys { display: none; }
    .mny-wallet { height: 100%; box-sizing: border-box; background: #7C4A1E; border-radius: 1.1rem; padding: min(2.4cqh, 3cqi); display: flex; flex-direction: column; gap: 1.2cqh; box-shadow: inset 0 0 0 3px #5B3412; }
    .mny-wname { color: #FDE68A; font-weight: 800; font-size: min(6cqh, 6cqi, 1.4rem); line-height: 1; }
    .mny-wnotes { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr)); gap: min(2.4cqh, 3cqi); }
    @container (aspect-ratio > 1.7) { .mny-wnotes { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); } }
    .mny-wbtn { padding: 0.3rem; border: 0; border-radius: 0.8rem; background: #FEF3C7; box-shadow: 0 5px 0 #B45309; cursor: pointer; display: flex; min-height: 0; touch-action: manipulation; }
    .mny-wbtn:active { transform: translateY(3px); box-shadow: 0 2px 0 #B45309; }
    .mny-wbtn .mny-slot { flex: 1; }
    .g3g-has-result .mny-wallet { visibility: hidden; }

    /* 3. Tính tiền: đề, quầy hàng, nút phép tính, bài giải */
    .mny-calc { grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.42fr) auto; gap: 1.2cqh; }
    .mny-story { font-size: min(4.6cqh, 2.7cqi, 2.2rem); line-height: 1.32; font-weight: 600; }
    .mny-shop { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 1.6cqi; background: linear-gradient(#E3B474, #D69E58); border-radius: 1rem; padding: 1cqh 1.4cqi; box-shadow: inset 0 0 0 3px #C08440, 0 5px 0 #A86E2E; }
    .mny-shelf { display: flex; gap: 1.4cqi; min-width: 0; }
    .mny-goods { flex: 1 1 0; min-width: 0; display: grid; grid-template-rows: minmax(0, 1fr) auto; background: #FFFBEB; border-radius: 0.8rem; padding: 0.6cqh 0.8cqi; }
    .mny-gpics { container-type: size; display: flex; align-items: center; justify-content: center; flex-wrap: nowrap; min-height: 0; }
    .mny-gpics span { font-size: min(70cqh, calc(78cqi / var(--k, 1))); line-height: 1.1; }
    .mny-tag { justify-self: center; background: #FEF08A; border: 2px solid #CA8A04; border-radius: 999px; padding: 0 0.6em; font-size: min(4cqh, 2.2cqi, 1.6rem); color: #92400E; line-height: 1.3; }
    .mny-give, .mny-back { display: grid; grid-template-rows: auto minmax(0, 1fr); min-width: 0; min-height: 0; }
    .mny-cap { text-align: center; color: #fff; text-shadow: 0 1px 0 #7C2D12; font-size: min(4cqh, 2.2cqi, 1.6rem); line-height: 1.2; }
    .mny-bgrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr)); gap: 0.4cqh 0.6cqi; min-height: 0; }

    /* Bài giải (cùng kiểu word2.js) */
    .w2-choices { display: flex; gap: 2.5cqi; justify-content: center; align-items: stretch; }
    .w2-btn { max-width: 34cqi; white-space: nowrap; }
    .w2-btn-in { animation: w2In .35s cubic-bezier(.2,1.4,.4,1) both; }
    .w2-btn-in:nth-child(2) { animation-delay: .06s; } .w2-btn-in:nth-child(3) { animation-delay: .12s; }
    @keyframes w2In { from { transform: scale(0.6); opacity: 0; } }
    .w2-midn { color: #7C3AED; background: #F3E8FF; border-radius: 0.25em; padding: 0 0.12em; }
    .w2-sol { border-top: 2px dashed #BFDBFE; padding-top: 0.4cqh; line-height: 1.2; }
    .w2-head { text-align: center; font-size: 0.75em; color: #475569; text-decoration: underline; text-underline-offset: 0.15em; }
    .w2-lines { display: grid; grid-template-columns: minmax(0, max-content) max-content; justify-content: center; column-gap: 0.5em; row-gap: 0.35em; align-items: center; }
    .w2-line { display: contents; }
    .w2-label { color: #475569; font-weight: 600; }
    .w2-calc { display: inline-flex; align-items: center; gap: 0.25em; white-space: nowrap; }
    .w2-expr { display: inline-grid; place-items: center; height: 1.3em; padding: 0 0.15em; border: 3px dashed #93C5FD; border-radius: 0.2em; color: #94A3B8; box-sizing: border-box; }
    .w2-expr.g3d-on { border-style: solid; border-color: #F59E0B; }
    .w2-expr-on { border-color: transparent; color: #1D4ED8; display: inline-flex; justify-content: center; gap: 0.25em; }
    .w2-ans { height: 1.3em; }
    .w2-eq, .w2-unit { color: #475569; }
    .w2-dap .w2-label { grid-column: 1; text-align: right; color: #15803D; font-weight: 800; }
    .w2-final { grid-column: 2; display: inline-block; border-bottom: 3px dashed #86EFAC; color: #15803D; font-weight: 800; }
    .w2-final-on { border-bottom-color: transparent; }
    .w2-fly { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1D4ED8; white-space: nowrap; line-height: 1; }
    .mny-choices .w2-btn { font-size: min(6.4cqh, calc(29cqi / var(--ol, 10))); }
    .mny-sol { font-size: min(5.6cqh, 2.7cqi, 2.6rem); }

    /* 4. Đổi tiền */
    .mny-swap { grid-template-rows: auto minmax(0, 0.8fr) minmax(0, 1.4fr); }
    .mny-eq { display: flex; align-items: center; justify-content: center; gap: 1.2cqi; font-size: min(9cqh, 5.4cqi, 3.6rem); line-height: 1; white-space: nowrap; }
    .mny-swap .mny-row { background: linear-gradient(#E3B474, #D69E58); border-radius: 1rem; padding: 1.4cqh 1.6cqi; box-shadow: inset 0 0 0 3px #C08440, 0 5px 0 #A86E2E; }
    .mny-swap .mny-cell { border-bottom-color: rgba(255,255,255,.5); }
    .mny-swap .mny-lab { color: #7C2D12; }
    .mny-eqn { align-self: stretch; width: min(26cqi, 40cqh); }
    .mny-eq .g3d-box { height: 1.2em; }

    @container (aspect-ratio < 1.25) {
      .mny-head { font-size: min(4.4cqh, 5.6cqi); }
      .mny-lab { font-size: min(3.4cqh, 4.4cqi); }
      .mny-ansl { font-size: min(6cqh, 7cqi); }
      .mny-pay { grid-template-rows: minmax(0, 0.7fr) minmax(0, 1.2fr) auto; }
      .mny-price { font-size: min(5cqh, 5.4cqi); }
      .mny-status { font-size: min(4.4cqh, 5cqi); }
      .mny-paybtn { font-size: min(5.4cqh, 6cqi); }
      .mny-calc { grid-template-rows: auto minmax(0, 1fr) minmax(0, 0.5fr) auto; }
      .mny-story { font-size: min(3.8cqh, 4.8cqi); }
      .mny-tag, .mny-cap { font-size: min(3cqh, 3.8cqi); }
      .mny-choices .w2-btn { font-size: min(5cqh, calc(28cqi / var(--ol, 10))); }
      .mny-sol { font-size: min(4cqh, 5cqi); }
      .mny-calc .w2-btn { max-width: 42cqi; }
      .mny-calc .w2-lines { grid-template-columns: max-content; justify-content: start; row-gap: 0.1em; }
      .mny-calc .w2-calc { padding-left: 2.2em; margin-bottom: 0.25em; }
      .mny-calc .w2-dap { display: flex; gap: 0.4em; align-items: center; }
      .mny-calc .w2-dap .w2-label { text-align: left; }
      .mny-eq { font-size: min(6cqh, 7cqi); }
      .mny-eqn { width: min(30cqi, 30cqh); }
      .mny-swap { grid-template-rows: auto minmax(0, 0.6fr) minmax(0, 1.6fr); }
    }
    @media (prefers-reduced-motion: reduce) {
      .mny-land { animation: none; }
      .w2-btn-in { animation: mnyFade .35s ease both; }
      .mny-pop { animation: mnyFade .4s ease; }
      @keyframes mnyFade { from { opacity: 0.3; } }
    }
  `;
  document.head.appendChild(st);
}
