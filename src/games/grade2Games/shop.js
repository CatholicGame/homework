/**
 * 🪙 Quầy tạp hóa — Hội chợ đồ chơi của lớp (Bài 56 Giới thiệu tiền Việt Nam; Bài 59–62 cộng, trừ trong phạm vi 1 000).
 * Thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.3. Giữ đúng các tờ tiền của Vở BT: 100, 200, 500, 1 000 đồng (vẽ lại
 * đơn giản: màu + mệnh giá, không chép mẫu tiền thật). Bé đứng quầy, khách đưa ví nhờ bé lấy tiền, tính tiền, trả lại.
 *   shop-1 (Bài 56): one   — chạm đúng MỘT tờ tiền bằng giá món hàng (như Vở BT: "mua hành hết 500 đồng").
 *                    count — đếm số tờ một loại trong ví khách (gõ số); các tờ đó bay ra xếp hàng, đánh số.
 *   shop-2 (Bài 56, 59): pay — ghép 2–3 tờ trong ví cho vừa đủ giá, bấm "Trả tiền": cô thu ngân cộng dần từng tờ.
 *   shop-3 (Bài 59–62): total  — hai món, gõ tổng tiền; hai thẻ giá bay lại cộng.
 *                       change — khách đưa tờ 1 000 đồng, gõ tiền trả lại; tờ 100 đồng bay ra, đếm thêm từ giá lên 1 000.
 * App không báo trước lúc đúng. Khung quầy dùng chung với Chợ phiên lớp 3 (market/stall.js), theme 'shop'.
 */

import { stallMeta, levelMeta } from './catalog.js';
import { NPCS, cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { flyOne, calmMotion } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const INK = '#3F3A40';
const MINUS = '−';
const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
export const fmtMoney = (n) => (n >= 1000 ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, '0')}` : String(n));
const D = (v) => `${fmtMoney(v)} đồng`;

// ── Tờ tiền (vẽ lại đơn giản) ───────────────────────────────────────────────────────────────────
const NOTE = {
  100: { bg: '#D8C79A', dark: '#7A6A3A', ink: '#4A3F1E' },
  200: { bg: '#E7B48A', dark: '#9A5A2E', ink: '#5A3215' },
  500: { bg: '#F2A7B5', dark: '#B4475E', ink: '#6E1F33' },
  1000: { bg: '#C3B1EC', dark: '#6B4FB5', ink: '#3A2470' },
};
export function noteSvg(v) {
  const c = NOTE[v];
  const big = fmtMoney(v);
  return `<svg class="g2s-note-svg" viewBox="0 0 120 60" aria-hidden="true">
    <rect x="1.5" y="1.5" width="117" height="57" rx="6" fill="${c.bg}" stroke="${INK}" stroke-width="2.2"/>
    <rect x="6" y="6" width="108" height="48" rx="4" fill="none" stroke="${c.dark}" stroke-width="1.4" stroke-dasharray="4 2.5"/>
    <circle cx="88" cy="30" r="15" fill="#fff" opacity=".55" stroke="${c.dark}" stroke-width="1.4"/>
    <path d="M88 19 l3 7 7.5 .6 -5.7 4.9 1.8 7.3 -6.6 -4 -6.6 4 1.8 -7.3 -5.7 -4.9 7.5 -.6z" fill="${c.dark}" opacity=".8"/>
    <text x="12" y="${v >= 1000 ? 31 : 33}" font-family="'Baloo 2', Quicksand, sans-serif" font-weight="800" font-size="${v >= 1000 ? 21 : 25}" fill="${c.ink}">${big}</text>
    <text x="12" y="48" font-family="'Baloo 2', Quicksand, sans-serif" font-weight="800" font-size="11" letter-spacing="1" fill="${c.ink}">ĐỒNG</text>
  </svg>`;
}
const flyNote = (v) => noteSvg(v).replace('class="g2s-note-svg"', 'width="100%" height="100%" preserveAspectRatio="none"');
export const shopIcon = (size = 56) => `<svg viewBox="0 0 120 92" width="${size}" height="${size}" aria-hidden="true">
  <g transform="translate(14 4) rotate(-8 60 30)">${noteSvg(500).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
  <g transform="translate(0 30)">${noteSvg(1000).replace(/<svg[^>]*>|<\/svg>/g, '')}</g></svg>`;

// ── Hàng ở hội chợ: giá theo các tờ tiền của sách (tròn trăm, tới 1 000 đồng) ──
const ITEMS = [
  { pic: '⭐', name: 'tờ nhãn dán ngôi sao', prices: [100, 200] },
  { pic: '🍬', name: 'viên kẹo', prices: [100, 200] },
  { pic: '🍭', name: 'cây kẹo mút', prices: [200, 300] },
  { pic: `<svg viewBox="0 0 64 64" width="1em" height="1em" aria-hidden="true"><g transform="rotate(-28 32 32)"><rect x="8" y="20" width="48" height="24" rx="5" fill="#F7A1C4" stroke="${INK}" stroke-width="3"/><path d="M30 20 H51 a5 5 0 0 1 5 5 V39 a5 5 0 0 1 -5 5 H30 Z" fill="#6FB7EA" stroke="${INK}" stroke-width="3"/><rect x="12" y="24" width="14" height="4" rx="2" fill="#fff" opacity=".6"/></g></svg>`, name: 'cục tẩy', prices: [200, 300, 500] },
  { pic: '✏️', name: 'cây bút chì', prices: [300, 500] },
  { pic: '📏', name: 'cây thước kẻ', prices: [400, 500, 600] },
  { pic: '🍪', name: 'gói bánh quy', prices: [500, 600, 700] },
  { pic: '🎈', name: 'quả bóng bay', prices: [500, 700, 800] },
  { pic: '🎀', name: 'cái nơ buộc tóc', prices: [500, 600, 900] },
  { pic: '📒', name: 'quyển vở', prices: [700, 800, 1000] },
  { pic: '🖍️', name: 'hộp bút sáp', prices: [800, 900, 1000] },
  { pic: '🪁', name: 'con diều giấy', prices: [900, 1000] },
];
const itemFor = (rng, price, avoid = []) => {
  const ok = ITEMS.filter(it => it.prices.includes(price) && !avoid.includes(it.name));
  return rng.pick(ok.length ? ok : ITEMS.filter(it => it.prices.includes(price)));
};

export const SHOP_LEVELS = [
  {
    ...levelMeta('shop-1'), missions: 5, kind: 'know',
    knowledge: 'các tờ tiền 100 đồng, 200 đồng, 500 đồng, 1 000 đồng',
    ask: (n) => `${cap(n.me)} mua đồ ở hội chợ. ${cap(n.you)} lấy tiền giúp ${n.me}!`,
    desc: 'Món hàng giá 500 đồng: chọn đúng tờ 500 đồng. Đếm số tờ tiền mỗi loại trong ví.',
    how: [['note', 'Chạm tờ tiền'], ['🔢', 'Đếm số tờ'], ['💵', 'Trả tiền']],
  },
  {
    ...levelMeta('shop-2'), missions: 5, kind: 'pay',
    knowledge: 'tiền Việt Nam, cộng các số tròn trăm',
    ask: (n) => `${cap(n.you)} lấy tiền trong ví cho vừa đủ giá giúp ${n.me}!`,
    desc: 'Quyển vở giá 700 đồng: lấy tờ 500 đồng và tờ 200 đồng, 500 + 200 = 700.',
    how: [['note', 'Chọn tờ tiền'], ['💵', 'Trả tiền'], ['🧮', 'Cô thu ngân đếm']],
  },
  {
    ...levelMeta('shop-3'), missions: 5, kind: 'calc',
    knowledge: 'cộng, trừ trong phạm vi 1 000 với tiền Việt Nam',
    ask: (n) => `${cap(n.you)} tính tiền giúp ${n.me}!`,
    desc: 'Bút chì 300 đồng, cục tẩy 200 đồng: 300 + 200 = 500 đồng. Đưa 1 000 đồng mua món 700 đồng thì được trả lại 300 đồng.',
    how: [['🧮', 'Gõ số tiền'], ['note', 'Đếm tiền'], ['😊', 'Khách vui']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
const VALUES = [100, 200, 500, 1000];
/** Có ghép được đúng `price` từ ví (đếm số cách, mỗi tờ dùng nhiều nhất một lần)? */
function ways(wallet, price) {
  let n = 0;
  const go = (i, s) => { if (s === price) { n++; return; } if (i >= wallet.length || s > price) return; go(i + 1, s + wallet[i]); go(i + 1, s); };
  go(0, 0);
  return n;
}
function makeKnow(rng, h) {
  const mode = h.length % 2 ? 'count' : 'one';
  if (mode === 'one') {
    const price = rng.pick(VALUES.filter(v => !h.some(x => x.price === v)));
    const it = itemFor(rng, price, h.map(x => x.item?.name));
    return { mode, price, item: it, wallet: rng.shuffle([...VALUES]) };
  }
  const prev = h.filter(x => x.mode === 'count').map(x => x.want);
  const want = rng.pick([100, 200, 500].filter(v => !prev.includes(v)));
  const kinds = [want, ...rng.shuffle([100, 200, 500].filter(v => v !== want)).slice(0, rng.pick([1, 2]))];
  const counts = kinds.map(() => rng.int(2, 6));
  const wallet = rng.shuffle(kinds.flatMap((k, i) => Array(counts[i]).fill(k)));
  return { mode, want, ans: counts[0], wallet };
}
function makePay(rng, h) {
  for (let t = 0; t < 300; t++) {
    const price = rng.int(3, 10) * 100;
    if (h.some(x => x.price === price)) continue;
    const wallet = rng.shuffle([500, 200, 200, 100, 100, rng.pick([100, 200, 500]), ...(price < 1000 && rng() < 0.6 ? [1000] : [])]);
    // Cần 2–3 tờ: không có tờ nào đúng bằng giá.
    if (wallet.includes(price)) continue;
    if (!ways(wallet, price)) continue;
    const it = itemFor(rng, price, h.map(x => x.item?.name));
    return { mode: 'pay', price, item: it, wallet };
  }
  return { mode: 'pay', price: 700, item: ITEMS[9], wallet: [500, 200, 200, 100, 100] };
}
function makeCalc(rng, h, lv = {}) {
  const plan = lv.op === 'sub' ? ['change'] : lv.op === 'add' ? ['total'] : ['total', 'change', 'total', 'change', 'total'];
  const mode = plan[h.length % plan.length];
  if (mode === 'total') {
    for (let t = 0; t < 300; t++) {
      const a = rng.pick([100, 200, 300, 400, 500, 600, 700]), b = rng.pick([100, 200, 300, 400, 500]);
      if (a + b > 1000 || a === b || h.some(x => x.a === a && x.b === b)) continue;
      const i1 = itemFor(rng, a), i2 = itemFor(rng, b, [i1.name]);
      if (i1.name === i2.name) continue;
      return { mode, a, b, ans: a + b, items: [i1, i2] };
    }
  }
  const price = rng.pick([200, 300, 400, 500, 600, 700, 800, 900].filter(v => !h.some(x => x.price === v)));
  return { mode: 'change', price, ans: 1000 - price, item: itemFor(rng, price) };
}
const MAKERS = { know: makeKnow, pay: makePay, calc: makeCalc };

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const SHOP_GAME = {
  ...stallMeta('shop'),
  unitWord: 'khách',
  starPrefix: 'g2games',
  levels: SHOP_LEVELS,
  stallIcon: () => shopIcon(60),
  summaryText: (ok, total) => `Em đã bán hàng đúng cho <strong>${ok}/${total}</strong> khách.`,

  howTo(level) {
    const pic = (p) => (p === 'note' ? `<span class="g2s-how">${noteSvg(500)}</span>` : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Khách vui' }];
  },

  /** Mở từ Bài 59 (chỉ cộng: tổng tiền) hoặc Bài 61 (chỉ trừ: tiền trả lại). Giá tròn trăm nên không có nhớ. */
  focus(level, { op } = {}) {
    if (!op || level.kind !== 'calc') return level;
    return { ...level, op, knowledge: op === 'add' ? 'phép cộng trong phạm vi 1 000 với tiền Việt Nam' : 'phép trừ trong phạm vi 1 000 với tiền Việt Nam' };
  },

  makeMission(rng, level, history) {
    const m = MAKERS[level.kind](rng, history, level);
    const recent = history.slice(-3).map(x => x.npc.id);
    return { ...m, level: level.kind, npc: rng.pick(NPCS.filter(n => !recent.includes(n.id))) };
  },

  mountMission(stage, m, level, api) {
    injectShopStyles();
    if (import.meta.env.DEV) window.__g2shop = m;
    return mountShop(stage, m, api);
  },
};

// ── Màn chơi ────────────────────────────────────────────────────────────────────────────────────
const SIGN = { one: 'Chọn đúng tờ tiền', count: 'Đếm tờ tiền', pay: 'Lấy tiền vừa đủ', total: 'Tính tiền', change: 'Trả lại tiền' };

function mountShop(stage, m, api) {
  const n = m.npc;
  const usePad = m.mode === 'count' || m.mode === 'total' || m.mode === 'change';
  const s = mountStall(stage, {
    npc: n, api, theme: 'shop', cameo: false,
    sign: `<span class="g2s-sign-pic">🪙</span><span><strong>Hội chợ của lớp</strong><br>${SIGN[m.mode]}</span>`,
    counter: `
      <div class="g2s-bench">
        <div class="g2s-board" data-board hidden></div>
        <div class="g2s-shelf" data-shelf></div>
        <div class="g2s-zone g2s-wallet" data-wallet><span class="g2s-zname">👛 Ví của ${n.me}</span><div class="g2s-notes" data-wnotes></div></div>
        <div class="g2s-zone g2s-tray" data-tray><span class="g2s-zname">🧺 Khay tiền</span><div class="g2s-notes" data-tnotes></div></div>
        <div class="g2s-acts" data-acts></div>
      </div>`,
  });
  const scene = stage.querySelector('.g3f-scene');
  if (!usePad) scene.classList.add('g2s-nopad');
  const { counter, main, speak, row, ask, nudge } = s;
  const q = (sel) => counter.querySelector(sel);
  const bench = q('.g2s-bench'), shelf = q('[data-shelf]'), board = q('[data-board]'), acts = q('[data-acts]');
  const wNotes = q('[data-wnotes]'), tNotes = q('[data-tnotes]');
  const say = (html) => { board.hidden = false; board.innerHTML = `<span class="g2s-say">${html}</span>`; };
  new MutationObserver(() => requestAnimationFrame(() => {
    const card = main.querySelector(':scope > .g3g-result');
    if (!card) return;
    acts.style.visibility = 'hidden';
    bench.style.paddingBottom = `${Math.max(0, card.offsetHeight - acts.offsetHeight + 8)}px`;
  })).observe(main, { childList: true });
  const ok = (text, line) => { const l = line || `Cảm ơn ${n.you}!`; speak(l, 'happy', `${l} 🎉`); api.succeed(text); };
  const bad = (line, text, tip) => { speak(line, 'sad', line); api.fail(text, tip); };

  const item = (it, price, { hidden = false } = {}) => `<div class="g2s-item"><span class="g2s-pic">${it.pic}</span>`
    + `<span class="g2s-price${hidden ? ' g2s-price-q' : ''}" data-price="${price}">${hidden ? '?' : D(price)}</span></div>`;
  const noteBtn = (v, i) => `<button type="button" class="g2s-note" data-v="${v}" data-i="${i}" aria-label="${D(v)}">${noteSvg(v)}</button>`;
  /** Tờ tiền el bay sang hộp đích `to` (thêm vào cuối), el gốc ẩn khỏi chỗ cũ. */
  function moveNote(el, to, { delay = 0, onLand } = {}) {
    const from = el.getBoundingClientRect();
    const v = +el.dataset.v;
    const clone = el.cloneNode(true);
    clone.classList.add('g2s-ghost');
    to.appendChild(clone);
    el.remove();
    const end = flyOne(flyNote(v), from, clone.getBoundingClientRect(), {
      delay, minMs: 380, maxMs: 620,
      onLand: () => { clone.classList.remove('g2s-ghost'); sfx.pop(3); onLand?.(clone); },
    });
    return { el: clone, end };
  }

  /** Ví / ngăn kéo nhiều tờ: thu nhỏ tờ tiền cho vừa quầy (cả khay đích cùng cỡ). */
  const sizeBy = (count) => {
    const cls = count > 10 ? 'g2s-lots' : count > 6 ? 'g2s-many' : '';
    if (cls) { q('[data-wallet]').classList.add(cls); q('[data-tray]').classList.add(cls); }
  };
  const MODES = { one: modeOne, count: modeCount, pay: modePay, total: modeTotal, change: modeChange };
  MODES[m.mode]();

  // ════ Chọn đúng một tờ ════
  function modeOne() {
    shelf.innerHTML = item(m.item, m.price);
    wNotes.innerHTML = m.wallet.map(noteBtn).join('');
    let done = false;
    wNotes.addEventListener('click', async (e) => {
      const b = e.target.closest('.g2s-note');
      if (!b || done) return;
      done = true;
      sfx.tap();
      const v = +b.dataset.v;
      wNotes.querySelectorAll('.g2s-note').forEach(x => { x.disabled = true; });
      moveNote(b, tNotes);
      await sleep(850);
      const good = v === m.price;
      say(`${D(v)} ${good ? '=' : '≠'} ${D(m.price)}`);
      shelf.querySelector('.g2s-price')?.classList.add(good ? 'g2s-price-ok' : 'g2s-price-bad');
      const fact = `Mua ${m.item.name} giá ${D(m.price)}: đưa tờ <b>${D(m.price)}</b>.`;
      if (good) return ok(fact, `Đúng tờ ${fmtMoney(m.price)} đồng rồi! Cảm ơn ${n.you}!`);
      bad(`Đây là tờ ${fmtMoney(v)} đồng, không phải ${fmtMoney(m.price)} đồng!`, `${cap(n.you)} đưa tờ ${D(v)}. ${fact}`, 'Nhìn số in to trên tờ tiền: số đó phải bằng giá món hàng.');
    });
    speak(`${cap(n.me)} mua ${m.item.name} giá ${fmtMoney(m.price)} đồng. ${cap(n.you)} lấy giúp ${n.me} một tờ tiền vừa đúng giá!`, null,
      `${m.item.pic} giá ${WANT(D(m.price))}. Chạm ${WANT('một tờ')} vừa đúng giá!`);
  }

  // ════ Đếm số tờ ════
  function modeCount() {
    q('[data-tray] .g2s-zname').textContent = `🧺 Tờ ${D(m.want)}`;
    shelf.hidden = true;
    wNotes.innerHTML = m.wallet.map(noteBtn).join('');
    sizeBy(m.wallet.length);
    wNotes.querySelectorAll('.g2s-note').forEach(x => { x.tabIndex = -1; x.classList.add('g2s-static'); });
    ask(row(`<span class="g2s-how">${noteSvg(m.want)}</span>`, `Tờ ${D(m.want)}`, `${Q} tờ`, true), 'tờ', async (v, pad) => {
      pad.lock();
      // Kiểm chứng: các tờ cùng loại bay ra khay, đánh số 1, 2, 3…
      const els = [...wNotes.querySelectorAll(`.g2s-note[data-v="${m.want}"]`)];
      wNotes.querySelectorAll(`.g2s-note:not([data-v="${m.want}"])`).forEach(x => x.classList.add('g2s-dim'));
      let k = 0;
      for (const el of els) {
        const num = ++k;
        moveNote(el, tNotes, { onLand: (c) => { c.insertAdjacentHTML('beforeend', `<b class="g2s-num">${num}</b>`); say(`${num} tờ`); } });
        await sleep(calmMotion() ? 520 : 420);
      }
      await sleep(600);
      const fact = `Ví có <b>${m.ans} tờ ${D(m.want)}</b>.`;
      if (v === m.ans) { pad.lock('g3g-keypad-ok'); return ok(fact, `Đúng rồi, ${m.ans} tờ ${fmtMoney(m.want)} đồng!`); }
      pad.lock('g3g-keypad-bad');
      bad(`Có ${m.ans} tờ cơ!`, fact, `Chỉ đếm các tờ có số ${fmtMoney(m.want)} in to, đếm lần lượt từng tờ.`);
    });
    speak(`Trong ví của ${n.me} có mấy tờ ${fmtMoney(m.want)} đồng?`, null, `Ví có ${WANT(`mấy tờ ${fmtMoney(m.want)} đồng`)}?`);
  }

  // ════ Lấy tiền vừa đủ giá ════
  function modePay() {
    shelf.innerHTML = item(m.item, m.price);
    wNotes.innerHTML = m.wallet.map(noteBtn).join('');
    sizeBy(m.wallet.length);
    let busy = false, over = false, nagged = false;
    const toggle = (e) => {
      const b = e.target.closest('.g2s-note');
      if (!b || busy || over) return;
      sfx.tap();
      busy = true;
      const r = moveNote(b, b.closest('[data-wnotes]') ? tNotes : wNotes);
      if (nagged) { nagged = false; speak('Lấy đủ tiền rồi thì bấm Trả tiền!', null, '👉 Lấy đủ tiền rồi bấm <b>Trả tiền</b>!'); }
      setTimeout(() => { busy = false; }, Math.max(150, r.end - 200));
    };
    wNotes.addEventListener('click', toggle);
    tNotes.addEventListener('click', toggle);
    acts.innerHTML = '<button type="button" class="g2s-act" data-done>💵 Trả tiền</button>';
    const btn = acts.querySelector('[data-done]');
    btn.onclick = async () => {
      if (over || busy) return;
      const vals = [...tNotes.querySelectorAll('.g2s-note')].map(x => +x.dataset.v);
      if (!vals.length) {
        nagged = true;
        speak(`${cap(n.you)} chạm vào tờ tiền trong ví để đưa ra khay trước đã!`, null, 'Chạm tờ tiền trong ví trước!');
        wNotes.classList.remove('g2s-hint'); void wNotes.offsetWidth; wNotes.classList.add('g2s-hint');
        return;
      }
      over = true;
      btn.disabled = true;
      sfx.swish();
      // Cô thu ngân cộng dần từng tờ trên khay.
      let sum = 0;
      const parts = [];
      for (const el of tNotes.querySelectorAll('.g2s-note')) {
        sum += +el.dataset.v;
        parts.push(fmtMoney(+el.dataset.v));
        el.classList.add('g2s-counted');
        say(`${parts.join(' + ')}${parts.length > 1 ? ` = <b>${fmtMoney(sum)}</b>` : ''} đồng`);
        sfx.pop(parts.length * 2);
        await sleep(calmMotion() ? 800 : 650);
      }
      const good = sum === m.price;
      say(`${parts.join(' + ')} = <b class="${good ? 'g2s-ans' : 'g2s-bad'}">${fmtMoney(sum)}</b> đồng ${good ? '=' : sum > m.price ? '>' : '<'} ${fmtMoney(m.price)} đồng`);
      shelf.querySelector('.g2s-price')?.classList.add(good ? 'g2s-price-ok' : 'g2s-price-bad');
      const way = waysText(m.wallet, m.price);
      const fact = `${cap(n.you)} đưa ${parts.length > 1 ? `${parts.join(' + ')} = ` : ''}${D(sum)}. Giá ${m.item.name} là <b>${D(m.price)}</b>.`;
      if (good) return ok(fact, `Vừa đủ ${fmtMoney(m.price)} đồng! Cảm ơn ${n.you}!`);
      bad(sum > m.price ? `Thừa tiền rồi, ${n.me} chỉ cần ${fmtMoney(m.price)} đồng!` : `Chưa đủ tiền, cần ${fmtMoney(m.price)} đồng cơ!`, fact,
        `Cộng dần các tờ cho tới khi vừa bằng giá, ví dụ ${way}.`);
    };
    speak(`${cap(n.me)} mua ${m.item.name} giá ${fmtMoney(m.price)} đồng. ${cap(n.you)} lấy tiền trong ví cho vừa đủ rồi bấm Trả tiền!`, null,
      `${m.item.pic} giá ${WANT(D(m.price))}. Lấy tiền ${WANT('vừa đủ')}!`);
  }

  // ════ Tổng tiền hai món ════
  function modeTotal() {
    q('[data-wallet]').hidden = true;
    q('[data-tray]').hidden = true;
    shelf.innerHTML = item(m.items[0], m.a) + '<span class="g2s-plus">+</span>' + item(m.items[1], m.b)
      + '<span class="g2s-plus">=</span><div class="g2s-item g2s-sum"><span class="g2s-pic">🧾</span><span class="g2s-price g2s-price-q">?</span></div>';
    ask(row(m.items[0].pic, D(m.a), '', false) + row(m.items[1].pic, D(m.b), '', false) + row('🧾', 'Tất cả', `${Q} đồng`, true), 'đồng', async (v, pad) => {
      pad.lock();
      const tags = [...shelf.querySelectorAll('.g2s-price[data-price]')];
      const sumTag = shelf.querySelector('.g2s-sum .g2s-price');
      for (const t of tags) {
        flyOne(`<span class="g2s-price g2s-fly">${t.textContent}</span>`, t.getBoundingClientRect(), sumTag.getBoundingClientRect(), { minMs: 450, maxMs: 650 });
        sfx.pop(4);
        await sleep(520);
      }
      sumTag.textContent = D(m.ans);
      sumTag.classList.remove('g2s-price-q');
      sumTag.classList.add('g2s-price-ok');
      say(`${fmtMoney(m.a)} + ${fmtMoney(m.b)} = <b class="g2s-ans">${fmtMoney(m.ans)}</b> đồng`);
      await sleep(400);
      const fact = `${cap(m.items[0].name)} ${D(m.a)}, ${m.items[1].name} ${D(m.b)}: ${fmtMoney(m.a)} + ${fmtMoney(m.b)} = <b>${D(m.ans)}</b>.`;
      if (v === m.ans) { pad.lock('g3g-keypad-ok'); return ok(fact, `Đúng rồi, tất cả ${fmtMoney(m.ans)} đồng!`); }
      pad.lock('g3g-keypad-bad');
      bad(`Tất cả ${fmtMoney(m.ans)} đồng cơ!`, fact, 'Mua hai món thì cộng giá hai món: cộng số trăm với số trăm.');
    });
    speak(`${cap(n.me)} mua ${m.items[0].name} giá ${fmtMoney(m.a)} đồng và ${m.items[1].name} giá ${fmtMoney(m.b)} đồng. Tất cả hết bao nhiêu tiền?`, null,
      `${m.items[0].pic} ${WANT(D(m.a))} và ${m.items[1].pic} ${WANT(D(m.b))}. Tất cả ${WANT('bao nhiêu tiền')}?`);
  }

  // ════ Trả lại tiền ════
  function modeChange() {
    shelf.innerHTML = item(m.item, m.price);
    q('[data-wallet]').hidden = true;
    q('[data-tray] .g2s-zname').textContent = `🤲 Trả lại ${n.me}`;
    // Khách đưa tờ 1 000 đồng; ngăn kéo của quầy có các tờ 100 đồng để trả lại.
    shelf.insertAdjacentHTML('beforeend', `<div class="g2s-given"><span>${n.me} đưa</span>${noteSvg(1000)}</div>`
      + '<div class="g2s-drawer" data-drawer><span class="g2s-drawer-pic">🗃️</span><span>Ngăn kéo</span></div>');
    const drawer = q('[data-drawer]');
    ask(row(m.item.pic, 'Giá', `<b>${D(m.price)}</b>`) + row('🪙', 'Đưa', `<b>${D(1000)}</b>`) + row('🤲', 'Trả lại', `${Q} đồng`, true), 'đồng', async (v, pad) => {
      pad.lock();
      // Đếm thêm: từ giá món hàng, mỗi tờ 100 đồng trả lại cộng thêm 100, tới khi đủ 1 000.
      say(`${fmtMoney(m.price)} đồng`);
      await sleep(500);
      let at = m.price, k = 0;
      while (at < 1000) {
        at += 100;
        const num = ++k;
        const now = at;
        tNotes.insertAdjacentHTML('beforeend', noteBtn(100, k));
        const el = tNotes.lastElementChild;
        el.classList.add('g2s-ghost', 'g2s-static');
        flyOne(flyNote(100), drawer.getBoundingClientRect(), el.getBoundingClientRect(), {
          minMs: 380, maxMs: 600,
          onLand: () => { el.classList.remove('g2s-ghost'); el.insertAdjacentHTML('beforeend', `<b class="g2s-num">${num}</b>`); say(`${fmtMoney(now)} đồng`); sfx.pop(num % 8); },
        });
        await sleep(calmMotion() ? 620 : 520);
      }
      await sleep(500);
      say(`1 000 ${MINUS} ${fmtMoney(m.price)} = <b class="g2s-ans">${fmtMoney(m.ans)}</b> đồng`);
      const fact = `Đưa ${D(1000)}, mua ${m.item.name} ${D(m.price)}: trả lại 1 000 ${MINUS} ${fmtMoney(m.price)} = <b>${D(m.ans)}</b>.`;
      if (v === m.ans) { pad.lock('g3g-keypad-ok'); return ok(fact, `Đúng rồi, trả lại ${fmtMoney(m.ans)} đồng!`); }
      pad.lock('g3g-keypad-bad');
      bad(`Phải trả lại ${fmtMoney(m.ans)} đồng cơ!`, fact, `Tiền trả lại = tiền khách đưa ${MINUS} giá món hàng. Hoặc đếm thêm từng trăm từ ${fmtMoney(m.price)} tới 1 000.`);
    });
    speak(`${cap(n.me)} mua ${m.item.name} giá ${fmtMoney(m.price)} đồng, ${n.me} đưa ${n.you} tờ 1 000 đồng. ${cap(n.you)} phải trả lại ${n.me} bao nhiêu tiền?`, null,
      `${m.item.pic} giá ${WANT(D(m.price))}, đưa ${WANT('1 000 đồng')}. Trả lại ${WANT('bao nhiêu')}?`);
  }
  void nudge;
}

/** Một cách ghép vừa đủ giá từ ví (cho lời mẹo): "500 + 200 = 700". */
function waysText(wallet, price) {
  const sorted = [...wallet].sort((a, b) => b - a);
  let best = null;
  const go = (i, pick, s) => {
    if (s === price) { if (!best || pick.length < best.length) best = [...pick]; return; }
    if (i >= sorted.length || s > price) return;
    go(i + 1, [...pick, sorted[i]], s + sorted[i]);
    go(i + 1, pick, s);
  };
  go(0, [], 0);
  return best ? `${best.map(fmtMoney).join(' + ')} = ${fmtMoney(price)}` : '';
}

function injectShopStyles() {
  if (document.getElementById('g2s-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2s-styles';
  st.textContent = `
    .g3f-theme-shop .g3f-awning { background: repeating-linear-gradient(90deg, #A78BFA 0 30px, #FDF4FF 30px 60px); border-bottom-color: #6D28D9; }
    .g3f-theme-shop .g3f-counter { background: linear-gradient(#FAF5FF, #F3E8FF 60%, #EDE9FE); border-bottom-color: #7C3AED; }
    .g3f-theme-shop .g3f-sign { background: #7C3AED; border-color: #4C1D95; color: #fff; text-shadow: 0 1px 0 rgba(76,29,149,.5); }
    .g3f-theme-shop .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-shop .g3f-main::after { background: rgba(15,23,42,0.06); }
    .g2s-nopad .g3f-ask { display: none; }
    .g2s-nopad .g3f-npc { flex: 1 1 auto; }
    .g2s-nopad .g3f-npc img { max-height: 420px; }
    .g2s-sign-pic { font-size: 1.7em; line-height: 1; }
    .g2s-bench { flex: 1 1 0; min-height: 0; width: 100%; display: flex; flex-direction: column; align-items: stretch; justify-content: safe center; gap: clamp(.3rem, 1.4vh, .8rem); padding: clamp(2.8rem, 8vh, 4rem) .4rem .4rem; box-sizing: border-box; --note: clamp(4.6rem, min(17vh, 14vw), 11rem); }
    .g2s-board { flex: none; display: flex; justify-content: center; font: 800 clamp(1rem, min(2.4vh + .5rem, 5vw), 1.7rem) 'Baloo 2', Quicksand, sans-serif; color: #4C1D95; text-align: center; }
    .g2s-board[hidden] { display: none; }
    .g2s-say { background: #fff; border-radius: .8rem; padding: .05em .7em; box-shadow: 0 3px 0 #DDD6FE; }
    .g2s-ans { color: #16A34A; } .g2s-bad { color: #DC2626; }
    .g2s-shelf { flex: none; display: flex; align-items: center; justify-content: center; gap: .6rem; flex-wrap: wrap; }
    .g2s-shelf[hidden] { display: none; }
    .g2s-item { display: flex; flex-direction: column; align-items: center; gap: .15rem; background: #fff; border: 3px solid #E9D5FF; border-radius: 1rem; padding: .3rem .7rem .4rem; box-shadow: 0 3px 0 #DDD6FE; }
    .g2s-pic { font-size: clamp(2.2rem, min(9vh, 9vw), 5rem); line-height: 1.05; display: flex; }
    .g2s-price { font: 800 clamp(.95rem, min(2.2vh + .4rem, 4.4vw), 1.4rem) 'Baloo 2', Quicksand, sans-serif; color: #7C2D12; background: #FEF3C7; border: 2px dashed #F59E0B; border-radius: .5rem; padding: 0 .45em; white-space: nowrap; }
    .g2s-price-q { color: #fff; background: #F97316; border-style: solid; border-color: #fff; min-width: 2.2em; text-align: center; }
    .g2s-price-ok { background: #DCFCE7; border: 2px solid #16A34A; color: #166534; }
    .g2s-price-bad { background: #FEE2E2; border: 2px solid #DC2626; color: #991B1B; }
    .g2s-fly { display: block; width: 100%; height: 100%; box-sizing: border-box; text-align: center; }
    .g2s-plus { font: 800 clamp(1.6rem, 4vh, 2.4rem) 'Baloo 2', sans-serif; color: #6D28D9; }
    .g2s-given { display: flex; flex-direction: column; align-items: center; font: 800 .95rem 'Baloo 2', sans-serif; color: #4C1D95; }
    .g2s-drawer { display: flex; flex-direction: column; align-items: center; font: 800 .9rem 'Baloo 2', sans-serif; color: #6B4E16; background: #FDE68A88; border: 3px solid #F59E0B; border-radius: .8rem; padding: .2rem .6rem; }
    .g2s-drawer-pic { font-size: clamp(1.8rem, 6vh, 3rem); line-height: 1.1; }
    .g2s-given svg { width: var(--note); display: block; filter: drop-shadow(0 2px 2px rgba(0,0,0,.18)); }
    .g2s-zone { position: relative; flex: none; border-radius: 1rem; padding: 1.35rem .5rem .5rem; min-height: calc(var(--note) * .5 + 1.9rem); box-sizing: border-box; }
    .g2s-zone[hidden] { display: none; }
    .g2s-wallet { background: #FDE68A55; border: 3px solid #F59E0B; }
    .g2s-tray { background: #fff; border: 3px dashed #A78BFA; }
    .g2s-zname { position: absolute; top: .1rem; left: .7rem; font: 800 .9rem 'Baloo 2', Quicksand, sans-serif; color: #6B4E16; }
    .g2s-tray .g2s-zname { color: #5B21B6; }
    .g2s-notes { display: flex; flex-wrap: wrap; gap: .35rem; justify-content: center; min-height: calc(var(--note) * .5); }
    .g2s-note { position: relative; width: var(--note); aspect-ratio: 2 / 1; padding: 0; border: 0; background: none; cursor: pointer; touch-action: manipulation; filter: drop-shadow(0 2px 2px rgba(0,0,0,.18)); transition: transform .15s; }
    .g2s-note:not(:disabled):not(.g2s-static):hover { transform: translateY(-3px); }
    .g2s-note:disabled, .g2s-static { cursor: default; }
    .g2s-note svg { width: 100%; height: 100%; display: block; }
    .g2s-many .g2s-note { width: calc(var(--note) * .74); }
    .g2s-lots .g2s-note { width: calc(var(--note) * .6); }
    .g2s-ghost { visibility: hidden; }
    .g2s-dim { opacity: .35; }
    .g2s-counted { outline: 3px solid #16A34A; outline-offset: 1px; border-radius: 6px; }
    .g2s-num { position: absolute; top: -.55rem; right: -.4rem; min-width: 1.5rem; height: 1.5rem; border-radius: 999px; background: #F97316; color: #fff; border: 2px solid #fff; font: 800 .9rem/1.3rem 'Baloo 2', sans-serif; text-align: center; }
    .g2s-how { display: inline-block; width: 3.4rem; }
    .g2s-how svg { width: 100%; height: auto; display: block; }
    .g2s-acts { flex: none; display: flex; justify-content: center; min-height: 0; }
    .g2s-act { border: 4px solid #fff; border-radius: 999px; padding: .3em 1.3em; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 clamp(1.1rem, 2.2vh + .6rem, 1.7rem) 'Baloo 2', Quicksand, sans-serif; text-shadow: 0 2px 0 rgba(21,128,61,.5); box-shadow: 0 5px 0 #15803D, 0 8px 18px rgba(21,128,61,.3); cursor: pointer; touch-action: manipulation; }
    .g2s-act:disabled { opacity: .4; cursor: default; }
    .g2s-hint { animation: g2sNudge .6s ease; }
    @keyframes g2sNudge { 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
    .g3g-has-result .g2s-acts { visibility: hidden; }
    @media (orientation: portrait) { .g2s-bench { padding-top: .3rem; --note: clamp(4.2rem, 21vw, 7rem); } .g3f-theme-shop .g3f-sign { display: none; } }
    @media (max-height: 500px) { .g2s-bench { padding-top: 2.4rem; --note: clamp(3.6rem, 11vh, 5rem); } .g2s-zone { padding-top: 1.15rem; } }
  `;
  document.head.appendChild(st);
}
