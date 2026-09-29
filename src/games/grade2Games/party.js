/**
 * 🎂 Tiệc sinh nhật chia kẹo — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.4. Bám Vở BT Toán 2 Tập Hai, Bài 37–44
 * (chỉ bảng 2 và bảng 5, chia luôn chia hết):
 *   plates (cấp 1; Bài 37): q đĩa, mỗi đĩa k cái kẹo. Bé chạm từng đĩa cho kẹo bay vào, dưới bảng hiện k + k + …;
 *          chọn phép nhân đúng (k × q, thẻ bẫy q × k) rồi gõ số kẹo.
 *   times  (cấp 2; Bài 39, 40): tất, bánh quy, cánh hoa, kẹo trong túi quà — gõ số trước, rồi bấm phát: đồ bay vào
 *          từng chỗ, dưới mỗi chỗ hiện số đếm thêm 2, 4, 6… (5, 10, 15…).
 *   share  (cấp 3; Bài 41, 43, 44): N cái kẹo chia đều cho 2 hoặc 5 bạn. Gõ số kẹo mỗi bạn, bấm "Chia kẹo": kẹo bay
 *          lần lượt mỗi bạn một cái, vòng tới vòng. Gõ ít thì kẹo còn thừa; gõ nhiều thì ô trống viền đỏ, bạn buồn.
 *   group  (cấp 4, xen kẽ với share): N cái bánh, mỗi túi 2 hoặc 5 cái, được mấy túi? Túi hiện đúng số bé gõ.
 *   names  (cấp 5; Bài 38, 42): gắn nhãn Thừa số / Tích / Số bị chia / Số chia / Thương lên phép tính trên bảng; xen kẽ
 *          "Tích là 10, một thừa số là 2, thừa số kia là mấy?" (kiểm chứng bằng cách xếp kẹo ra đĩa).
 * Dùng khung quầy Chợ phiên lớp 3 (market/stall.js), theme 'party'. App không báo trước lúc đúng: bé tự bấm nút.
 */

import {
  holder, bowlSvg, bowlSize, flyItem, itemBody, itemIcon, cakeIcon, holderIcon, CANDY_COLORS,
} from './art/party.js';
import { stallMeta, levelMeta } from './catalog.js';
import { injectPartyStyles } from './styles.js';
import { NPCS, cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { flyOne } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const MAX_HOLDERS = 12; // gõ số lớn hơn thì không vẽ (chỉ báo sai)
// Người mời tiệc: các bạn nhỏ và chị Mai, cô Lan (thứ tự = người giao nhiệm vụ ở màn giới thiệu cấp 1…5).
const HOSTS = ['ban', 'ti', 'chi', 'bin', 'co'].map(id => NPCS.find(n => n.id === id));

export const PARTY_LEVELS = [
  {
    ...levelMeta('party-1'), missions: 5, kind: 'plates',
    knowledge: 'phép nhân, cộng các số bằng nhau',
    ask: (n) => `${cap(n.you)} xếp kẹo ra đĩa rồi tính giúp ${n.me} có tất cả bao nhiêu cái kẹo!`,
    desc: '4 đĩa, mỗi đĩa 5 cái kẹo: 5 + 5 + 5 + 5 = 20. 5 được lấy 4 lần, ta viết 5 × 4 = 20.',
    how: [['plate', 'Xếp kẹo ra đĩa'], ['✖️', 'Chọn phép nhân'], ['🧮', 'Gõ số kẹo']],
  },
  {
    ...levelMeta('party-2'), missions: 5, kind: 'times',
    knowledge: 'bảng nhân 2, bảng nhân 5',
    ask: (n) => `Tiệc cần bao nhiêu chiếc tất, cái bánh, cánh hoa? ${cap(n.you)} tính giúp ${n.me}!`,
    desc: 'Mỗi bạn 1 đôi tất (2 chiếc), 7 bạn cần 2 × 7 = 14 chiếc tất. Gõ số trước, rồi phát quà để kiểm tra.',
    how: [['🧮', 'Gõ số'], ['🎁', 'Phát quà'], ['count', 'Đếm thêm']],
  },
  {
    ...levelMeta('party-3'), missions: 5, kind: 'share',
    knowledge: 'phép chia, bảng chia 2, bảng chia 5',
    ask: (n) => `${cap(n.you)} chia đều kẹo cho các bạn giúp ${n.me}!`,
    desc: '15 cái kẹo chia đều cho 5 bạn: 15 : 5 = 3, mỗi bạn 3 cái. Chia đều là mỗi bạn nhận bằng nhau.',
    how: [['🧮', 'Gõ số kẹo mỗi bạn'], ['🍬', 'Chia kẹo'], ['guest', 'Bạn nào cũng vui']],
  },
  {
    ...levelMeta('party-4'), missions: 5, kind: 'split',
    knowledge: 'phép chia, bảng chia 2, bảng chia 5',
    ask: (n) => `Xếp bánh vào túi quà, chia kẹo cho các bạn. ${cap(n.you)} tính giúp ${n.me}!`,
    desc: '10 cái bánh, mỗi túi 2 cái: 10 : 2 = 5, được 5 túi. 10 cái kẹo chia đều cho 2 bạn: mỗi bạn 5 cái.',
    how: [['🧮', 'Gõ số'], ['bag', 'Đóng túi'], ['guest', 'Chia đều']],
  },
  {
    ...levelMeta('party-5'), missions: 5, kind: 'names',
    knowledge: 'thừa số, tích, số bị chia, số chia, thương',
    ask: (n) => `${cap(n.you)} gắn tên cho các số trên bảng tiệc giúp ${n.me}!`,
    desc: 'Trong 2 × 5 = 10: 2 và 5 là thừa số, 10 là tích. Trong 10 : 2 = 5: 10 là số bị chia, 2 là số chia, 5 là thương.',
    how: [['🏷️', 'Gắn tên'], ['🧮', 'Tìm số'], ['✓', 'Gắn xong']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
const lastOf = (h) => h[h.length - 1];
const altK = (rng, h) => (lastOf(h) ? (lastOf(h).k === 2 ? 5 : 2) : rng.pick([2, 5]));
const tries = (make, ok) => { let v; for (let t = 0; t < 40; t++) { v = make(); if (ok(v)) break; } return v; };

// Cấp 2: đồ vật trong bảng nhân 2 và bảng nhân 5.
const THEMES = {
  sock: { k: 2, holder: 'guest', item: 'sock', unit: 'chiếc', each: 'bạn', act: '🧦 Phát tất' },
  cookie: { k: 2, holder: 'plate', item: 'cookie', unit: 'cái', each: 'đĩa', act: '🍪 Xếp bánh' },
  petal: { k: 5, holder: 'flower', item: 'petal', unit: 'cánh', each: 'bông hoa', act: '🌸 Gắn cánh hoa' },
  bag: { k: 5, holder: 'bag', item: 'candy', unit: 'viên', each: 'túi', act: '🍬 Bỏ kẹo vào túi' },
};

function makePlates(rng, h) {
  const k = altK(rng, h);
  const q = tries(() => rng.int(2, 6), (v) => v !== k && !h.some(x => x.k === k && x.q === v));
  return { mode: 'plates', k, q, ans: k * q, item: 'candy' };
}

function makeTimes(rng, h) {
  const order = h[0]?.order || [...rng.shuffle(Object.keys(THEMES)), rng.pick(['sock', 'petal'])];
  const th = order[h.length % order.length];
  const { k } = THEMES[th];
  const q = tries(() => (k === 2 ? rng.int(3, 10) : rng.int(3, 8)), (v) => v !== lastOf(h)?.q && !h.some(x => x.theme === th && x.q === v));
  return { mode: 'times', order, theme: th, k, q, ans: k * q, item: THEMES[th].item };
}

function makeShare(rng, h) {
  const n = lastOf(h) ? (lastOf(h).n === 2 ? 5 : 2) : rng.pick([2, 5]);
  const q = tries(() => (n === 2 ? rng.int(3, 10) : rng.int(2, 8)), (v) => !h.some(x => x.n === n && x.q === v));
  return { mode: 'share', n, q, N: n * q, ans: q, item: 'candy' };
}

function makeGroup(rng, h) {
  const k = altK(rng, h.filter(x => x.mode === 'group'));
  const t = tries(() => (k === 2 ? rng.int(3, 10) : rng.int(2, 8)), (v) => !h.some(x => x.mode === 'group' && x.k === k && x.t === v));
  return { mode: 'group', k, t, N: k * t, ans: t, item: 'cookie' };
}

function makeSplit(rng, h) {
  // Xen kẽ hai kiểu chia để bé phân biệt: đóng túi (chia theo nhóm) trước, rồi chia đều.
  return h.length % 2 === 0 ? makeGroup(rng, h) : makeShare(rng, h.filter(x => x.mode === 'share'));
}

function makeNames(rng, h) {
  const plan = h[0]?.plan || ['lmul', 'fmul', 'ldiv', 'fdiv', rng.pick(['lmul', 'ldiv'])];
  const mode = plan[h.length % plan.length];
  const k = altK(rng, h);
  const q = tries(() => rng.int(2, 10), (v) => v !== k && !h.some(x => x.k === k && x.q === v));
  const mul = mode === 'lmul' || mode === 'fmul';
  const want = mul ? ['Thừa số', 'Thừa số', 'Tích'] : ['Số bị chia', 'Số chia', 'Thương'];
  const chips = rng.shuffle([...want, mul ? rng.pick(['Thương', 'Số chia']) : rng.pick(['Tích', 'Thừa số'])]);
  // fmul: k × ? = p (? đĩa, mỗi đĩa k cái). fdiv: p : k = ? (xếp p cái kẹo, mỗi đĩa k cái).
  return { mode, plan, k, q, p: k * q, want, chips, ans: q, N: k * q, t: q, item: 'candy' };
}

const MAKERS = { plates: makePlates, times: makeTimes, share: makeShare, split: makeSplit, names: makeNames };

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const PARTY_GAME = {
  ...stallMeta('party'),
  unitWord: 'lượt',
  npcs: HOSTS,
  starPrefix: 'g2games',
  levels: PARTY_LEVELS,
  stallIcon: () => cakeIcon(60),
  summaryText: (ok, total) => `Em đã chuẩn bị tiệc đúng <strong>${ok}/${total}</strong> lượt.`,

  howTo(level) {
    const pic = (p) => (p === 'plate' ? holderIcon('plate', 50, 'candy', 5)
      : p === 'guest' ? holderIcon('guest', 38, 'candy', 3)
        : p === 'bag' ? holderIcon('bag', 38, 'cookie', 2)
          : p === 'count' ? '<b class="g2p-how-count">2, 4, 6</b>' : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Bạn vui' }];
  },

  makeMission(rng, level, history) {
    const m = MAKERS[level.kind](rng, history);
    const recent = history.slice(-2).map(x => x.npc.id);
    return {
      ...m, level: level.kind, npc: rng.pick(HOSTS.filter(n => !recent.includes(n.id))),
      colors: rng.shuffle(CANDY_COLORS), tone: rng.int(0, 99),
    };
  },

  mountMission(stage, m, level, api) {
    injectPartyStyles();
    if (import.meta.env.DEV) window.__g2party = m;
    return mountParty(stage, m, api);
  },
};

// ── Cảnh chung ──────────────────────────────────────────────────────────────────────────────────
const SIGN = {
  plates: 'Phép nhân', times: 'Bảng nhân 2, 5', share: 'Chia đều', group: 'Chia vào túi', lmul: 'Tên các số', ldiv: 'Tên các số',
  fmul: 'Tìm thừa số', fdiv: 'Tìm thương',
};
const ITEM_NAME = { candy: 'cái kẹo', cookie: 'cái bánh', sock: 'chiếc tất', petal: 'cánh hoa' };
const TAG_H = 26; // chỗ cho nhãn số dưới mỗi đĩa / túi (px)

function mountParty(stage, m, api) {
  const n = m.npc;
  const labels = m.mode === 'lmul' || m.mode === 'ldiv';
  const s = mountStall(stage, {
    npc: n, api, theme: 'party', cameo: false,
    sign: `${cakeIcon(34)}<span><strong>Tiệc sinh nhật</strong><br>${SIGN[m.mode]}</span>`,
    counter: `
      <div class="g2p-bench">
        <div class="g2p-board" data-board></div>
        <div class="g2p-stage" data-stage${labels ? ' hidden' : ''}>
          <div class="g2p-src" data-src><div class="g2p-bowl" data-bowl></div><span class="g2p-src-cap" data-cap></span></div>
          <div class="g2p-dst" data-dst></div>
        </div>
        <div class="g2p-acts" data-acts></div>
      </div>`,
  });
  if (labels) stage.querySelector('.g3f-scene').classList.add('g2p-nopad');
  const { counter, main, speak, row, ask, nudge } = s;
  const q = (sel) => counter.querySelector(sel);
  const bench = q('.g2p-bench'), board = q('[data-board]'), stageEl = q('[data-stage]');
  const src = q('[data-src]'), bowlEl = q('[data-bowl]'), capEl = q('[data-cap]'), dst = q('[data-dst]'), acts = q('[data-acts]');

  // Thẻ kết quả: cất hàng nút, chừa đáy quầy để bé vẫn thấy đĩa, túi, các bạn.
  new MutationObserver(() => requestAnimationFrame(() => {
    const card = main.querySelector(':scope > .g3g-result');
    if (!card) return;
    acts.style.visibility = 'hidden';
    bench.style.paddingBottom = `${Math.max(0, card.offsetHeight - acts.offsetHeight + 8)}px`;
  })).observe(main, { childList: true });

  // ── Đĩa to (đồ chưa chia) và các chỗ đựng ──
  let stock = 0, bowlN = 0, bowlKnown = false, flying = 0;
  // Tất theo đôi, cánh hoa theo bông: mỗi nhóm lấy ra từ cuối đĩa to cùng một màu.
  const per = { sock: 2, petal: 5 }[m.item] || 1;
  const bowlColor = (i) => m.colors[Math.floor(i / per) % m.colors.length];
  let bowlCols = 10;
  const drawBowl = () => { bowlEl.innerHTML = bowlN ? bowlSvg(bowlN, m.item, plural(bowlN).map(bowlColor), bowlCols) : ''; };
  const colsChoices = (cnt) => (cnt <= 5 ? [cnt] : cnt <= 10 ? [cnt, 5] : [10, 5]);
  const setBowl = (count, known) => {
    bowlN = stock = count; bowlKnown = known;
    bowlCols = colsChoices(count)[0];
    drawBowl();
    src.hidden = !count;
    stageEl.classList.toggle('g2p-nosrc', !count);
    drawCap();
  };
  const drawCap = () => {
    if (!bowlN) return;
    const what = ITEM_NAME[m.item];
    capEl.innerHTML = !bowlKnown ? cap(what.replace(/^(cái|chiếc) /, '')) : stock === bowlN ? `<b>${bowlN}</b> ${what}` : stock ? `Còn <b>${stock}</b> ${what}` : 'Hết rồi';
  };
  const bowlSlot = (i) => bowlEl.querySelector(`[data-slot="${i}"]`);

  let H = []; // { hd, landed: [màu], opts }
  const setHolders = (list, { buttons = false } = {}) => {
    H = list.map(hd => ({ hd, landed: [], opts: {} }));
    dst.innerHTML = H.map((h, i) => `<${buttons ? 'button type="button"' : 'div'} class="g2p-h" data-h="${i}">${h.hd.svg(0)}<span class="g2p-h-tag" data-tag></span></${buttons ? 'button' : 'div'}>`).join('');
    fit();
  };
  /** Vẽ lại một chỗ đựng (giữ đồ đã bay tới, đúng màu). opts: { miss, mood }. */
  const redraw = (i, opts = {}) => {
    const h = H[i];
    h.opts = { ...h.opts, ...opts };
    const el = dst.querySelector(`[data-h="${i}"]`);
    el.querySelector('svg').outerHTML = h.hd.svg(h.landed.length, { ...h.opts, colors: h.landed.length ? h.landed : undefined });
    fit();
  };
  const tag = (i, text) => { const t = dst.querySelector(`[data-h="${i}"] [data-tag]`); if (t) t.innerHTML = text; };
  const slotEl = (i, si) => dst.querySelector(`[data-h="${i}"] [data-slot="${si}"]`);

  // Co giãn: đồ vật trên đĩa to và trong chỗ đựng CÙNG MỘT TỈ LỆ (đồ chỉ chuyển từ đĩa to sang chỗ đựng).
  // Thử mọi cách xếp: đĩa to bên trái / ở trên, hàng 10 / hàng 5 (chỉ khi chưa lấy đồ ra), lưới chỗ đựng 1…n cột;
  // lấy cách cho đồ vật to nhất rồi chia khung cho đĩa to đúng phần nó cần.
  const fit = () => {
    if (!bench.isConnected) { obs.disconnect(); return; }
    const hsv = [...dst.querySelectorAll('.g2p-h > svg')];
    if (!hsv.length) return;
    // Chừa 8px mỗi chiều: làm tròn cỡ hình không được đẩy chỗ đựng cuối xuống dòng mới (bị cắt mất).
    const W = stageEl.clientWidth - 8, Hs = stageEl.clientHeight - 8;
    if (W <= 0 || Hs <= 0) return;
    const G = 10, gap = 8;
    const cw = Number(hsv[0].dataset.vw), ch = Number(hsv[0].dataset.vh), cnt = hsv.length;
    const withSrc = bowlN > 0;
    const capH = withSrc ? capEl.offsetHeight + 8 : 0;
    const bowlFree = stock === bowlN && !flying;
    let best = { s: -Infinity }; // khung quá bé (mọi cách đều âm) vẫn chọn được một cách
    for (const bc of withSrc ? (bowlFree ? colsChoices(bowlN) : [bowlCols]) : [0]) {
      const b = withSrc ? bowlSize(bowlN, m.item, bc) : { w: 0, h: 0 };
      for (let dc = 1; dc <= cnt; dc++) {
        const rows = Math.ceil(cnt / dc);
        const fW = gap * (dc - 1), fH = gap * (rows - 1) + rows * TAG_H;
        const opts = withSrc
          ? [
            { side: true, s: Math.min((W - G - fW) / (b.w + dc * cw), (Hs - capH) / b.h, (Hs - fH) / (rows * ch)) },
            { side: false, s: Math.min(W / b.w, (W - fW) / (dc * cw), (Hs - capH - G - fH) / (b.h + rows * ch)) },
          ]
          : [{ side: true, s: Math.min((W - fW) / (dc * cw), (Hs - fH) / (rows * ch)) }];
        for (const o of opts) if (o.s > best.s + 0.005) best = { ...o, bc, b };
      }
    }
    const sc = Math.max(0.3, Math.min(3.2, best.s));
    if (withSrc) {
      if (best.bc !== bowlCols) { bowlCols = best.bc; drawBowl(); }
      stageEl.style.gridTemplateColumns = best.side ? `${Math.ceil(best.b.w * sc) + 2}px minmax(0, 1fr)` : 'minmax(0, 1fr)';
      stageEl.style.gridTemplateRows = best.side ? 'minmax(0, 1fr)' : `${Math.ceil(best.b.h * sc + capH) + 2}px minmax(0, 1fr)`;
    } else {
      stageEl.style.gridTemplateColumns = 'minmax(0, 1fr)';
      stageEl.style.gridTemplateRows = 'minmax(0, 1fr)';
    }
    const bsv = bowlEl.querySelector('svg');
    for (const el of [...hsv, bsv].filter(Boolean)) {
      el.style.width = `${Math.floor(Number(el.dataset.vw) * sc)}px`;
      el.style.height = `${Math.floor(Number(el.dataset.vh) * sc)}px`;
    }
  };
  const obs = new ResizeObserver(fit);
  obs.observe(stageEl); // bảng phép tính, hàng nút, thẻ kết quả đổi cỡ thì khung chỗ đựng đổi theo

  /**
   * Đồ bay từ đĩa to vào chỗ đựng, lần lượt từng cái theo `pairs` [{ h, s }] (chỗ đựng h, ô s). Lấy từ cuối đĩa to.
   * onEach(pair, j) khi từng cái đáp. Trả về Promise khi cái cuối đáp xong.
   */
  const deal = (pairs, { onEach, gapMs } = {}) => new Promise((res) => {
    if (!pairs.length) { res(); return; }
    flying++;
    const gap = gapMs ?? Math.round(Math.max(60, Math.min(260, 7000 / pairs.length)));
    let left = pairs.length;
    pairs.forEach((p, j) => {
      const si = --stock;
      const from = bowlSlot(si);
      const color = bowlColor(si);
      const to = slotEl(p.h, p.s);
      const delay = j * gap;
      setTimeout(() => { if (from) from.style.opacity = '0'; drawCap(); }, delay);
      flyOne(flyItem(m.item, color), from?.getBoundingClientRect(), to?.getBoundingClientRect(), {
        delay, minMs: 380, maxMs: 720, spin: j % 2 ? -16 : 16,
        onLand: () => {
          if (to) { to.innerHTML = itemBody(m.item, color); to.style.opacity = ''; }
          H[p.h].landed.push(color);
          sfx.tap();
          onEach?.(p, j);
          if (--left === 0) { flying--; setTimeout(res, 260); }
        },
      });
    });
  });

  // ── Nút, lời nói, kết quả ──
  const ok = (text, line) => { speak(line || `Cảm ơn ${n.you}!`, 'happy', `${line || `Cảm ơn ${n.you}!`} 🎉`); api.succeed(text); };
  const bad = (line, text, tip) => { speak(line, 'sad', line); api.fail(text, tip); };
  const actBtn = (label) => {
    acts.insertAdjacentHTML('beforeend', `<button type="button" class="g2p-act" data-go>${label}</button>`);
    return acts.querySelector('[data-go]');
  };
  /** Nhắc bé làm bước trước: nói, rồi rung chỗ cần làm. */
  const remind = (line, shown, el) => {
    speak(line, null, shown);
    if (el) { el.classList.remove('g2p-hint'); void el.offsetWidth; el.classList.add('g2p-hint'); } else nudge();
  };
  const ctx = {
    m, n, speak, row, ask, nudge, ok, bad, board, dst, acts, setBowl, setHolders, redraw, tag, deal, actBtn, remind,
    get stock() { return stock; }, get H() { return H; }, busy: () => flying > 0,
  };
  ({ plates: levelPlates, times: levelTimes, share: levelShare, group: levelGroup, fmul: levelGroup, fdiv: levelGroup, lmul: levelLabels, ldiv: levelLabels })[m.mode](ctx);
  requestAnimationFrame(fit);
}

const plural = (k) => Array.from({ length: k }, (_, s) => s);

// ════ Cấp 1: phép nhân là cộng nhiều lần ════════════════════════════════════════════════════════
function levelPlates({ m, n, speak, row, ask, ok, bad, board, dst, acts, setBowl, setHolders, tag, deal, remind }) {
  const { k, q } = m;
  setBowl(Math.ceil((m.ans + 3) / 10) * 10, false);
  setHolders(plural(q).map(i => holder('plate', k, 'candy', i)), { buttons: true });
  const filled = new Set();
  let pending = 0, cardsShown = false;
  const plateBtns = () => [...dst.querySelectorAll('[data-h]')];
  const markNext = () => {
    plateBtns().forEach(b => b.classList.remove('g2p-next'));
    plateBtns().find(b => !filled.has(Number(b.dataset.h)))?.classList.add('g2p-next');
  };
  markNext();
  const sum = () => Array(filled.size).fill(k).join(' + ');

  dst.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-h]');
    if (!b) return;
    const i = Number(b.dataset.h);
    if (filled.has(i)) return;
    filled.add(i);
    b.disabled = true;
    markNext();
    tag(i, `${k}`);
    board.hidden = false;
    board.innerHTML = `<span class="g2p-sum">${sum()}</span>`;
    pending++;
    await deal(plural(k).map(s => ({ h: i, s })), { gapMs: k === 2 ? 220 : 150 });
    pending--;
    if (filled.size === q && !pending && !cardsShown) showCards();
  });

  function showCards() {
    cardsShown = true;
    const right = `${k} × ${q}`, trap = `${q} × ${k}`;
    const order = (m.tone % 2) ? [right, trap] : [trap, right];
    board.innerHTML = `<span class="g2p-sum">${sum()}</span><span class="g2p-note">${k} được lấy ${q} lần</span>`;
    acts.innerHTML = `<div class="g2p-cards">${order.map(t => `<button type="button" class="g2p-card" data-card="${t}">${t}</button>`).join('')}</div>`;
    speak(`${q} đĩa, mỗi đĩa ${k} cái kẹo. ${k} được lấy ${q} lần. Viết thành phép nhân nào?`, null, `Viết thành <b class="g3f-want">phép nhân</b> nào?`);
    acts.querySelector('.g2p-cards').addEventListener('click', (e) => {
      const c = e.target.closest('[data-card]');
      if (!c || acts.querySelector('.g2p-cards').classList.contains('g2p-locked')) return;
      acts.querySelector('.g2p-cards').classList.add('g2p-locked');
      if (c.dataset.card !== right) {
        c.classList.add('g2p-wrong');
        acts.querySelector(`[data-card="${right}"]`).classList.add('g2p-right');
        return bad('Chưa đúng phép nhân rồi!', `${sum()}: ${k} được lấy ${q} lần, ta viết <b>${right}</b>.`,
          `Số kẹo mỗi đĩa (${k}) viết trước, số đĩa (${q}) viết sau.`);
      }
      c.classList.add('g2p-right');
      board.innerHTML = `<span class="g2p-sum">${sum()}</span><span class="g2p-eq">${right} = ${Q}</span>`;
      speak(`Đúng rồi, ${k} nhân ${q}! Tất cả có bao nhiêu cái kẹo?`, null, `Tất cả có ${WANT('mấy cái kẹo')}?`);
      ask(row(itemIcon('candy', 26, m.colors[0]), '1 đĩa', `<b>${k} cái</b>`) + row(holderIcon('plate', 30, 'candy', k), `${q} đĩa`, `${Q} cái`, true), 'cái', (v, pad) => {
        const fact = `${sum()} = <b>${m.ans}</b>. Ta viết <b>${right} = ${m.ans}</b>.`;
        board.innerHTML = `<span class="g2p-sum">${sum()}</span><span class="g2p-eq">${right} = <b class="g2p-ans">${m.ans}</b></span>`;
        if (v === m.ans) { pad.lock('g3g-keypad-ok'); return ok(fact); }
        pad.lock('g3g-keypad-bad');
        bad(`Có ${m.ans} cái kẹo cơ!`, fact, `Đếm thêm ${k}: ${plural(q).map(i => k * (i + 1)).join(', ')}.`);
      });
    });
  }

  speak(`${q} đĩa, mỗi đĩa ${k} cái kẹo. ${cap(n.you)} chạm vào từng đĩa để xếp kẹo!`, null,
    `${WANT(`${q} đĩa`)}, mỗi đĩa ${WANT(`${k} cái kẹo`)}. 👉 Chạm vào từng đĩa!`);
  void remind;
}

// ════ Cấp 2: bảng nhân 2, bảng nhân 5 ═══════════════════════════════════════════════════════════
function levelTimes({ m, n, speak, row, ask, ok, bad, board, setBowl, setHolders, tag, deal, actBtn, remind }) {
  const th = THEMES[m.theme];
  const { k, q, ans } = m;
  setBowl(Math.ceil((ans + 3) / 10) * 10, false);
  setHolders(plural(q).map(i => holder(th.holder, k, th.item, m.tone + i)));
  const texts = {
    sock: [`Mỗi bạn được tặng 1 đôi tất. Có ${q} bạn. Cần tất cả bao nhiêu chiếc tất?`, `${WANT(`${q} bạn`)}, mỗi bạn 1 đôi tất (2 chiếc). Cần ${WANT('mấy chiếc tất')}?`],
    cookie: [`Mỗi đĩa có 2 cái bánh quy. ${q} đĩa có tất cả bao nhiêu cái bánh quy?`, `${WANT(`${q} đĩa`)}, mỗi đĩa 2 cái bánh. Tất cả ${WANT('mấy cái')}?`],
    petal: [`Mỗi bông hoa có 5 cánh. ${q} bông hoa có tất cả bao nhiêu cánh hoa?`, `${WANT(`${q} bông hoa`)}, mỗi bông 5 cánh. Tất cả ${WANT('mấy cánh')}?`],
    bag: [`Mỗi túi quà có 5 viên kẹo. ${q} túi quà có tất cả bao nhiêu viên kẹo?`, `${WANT(`${q} túi quà`)}, mỗi túi 5 viên kẹo. Tất cả ${WANT('mấy viên')}?`],
  }[m.theme];
  const oneLabel = { sock: '1 đôi tất', cookie: '1 đĩa', petal: '1 bông hoa', bag: '1 túi' }[m.theme];
  const go = actBtn(th.act);
  go.classList.add('g2p-wait');
  let armed = null;
  go.onclick = async () => {
    if (!armed) { remind('Tính rồi gõ số vào máy tính trước đã!', '👉 Gõ số trước!'); return; }
    const { v, pad } = armed; armed = null;
    go.disabled = true; go.classList.remove('g2p-ready');
    board.hidden = false;
    board.innerHTML = '<span class="g2p-sum" data-count></span>';
    const counts = [];
    // Từng chỗ một: đủ k cái thì dưới chỗ đó hiện số đếm thêm.
    for (let i = 0; i < q; i++) {
      await deal(plural(k).map(s => ({ h: i, s })), { gapMs: k === 2 ? 200 : 110 });
      counts.push(k * (i + 1));
      tag(i, `${k * (i + 1)}`);
      board.querySelector('[data-count]').textContent = counts.join(', ');
      sfx.pop(Math.min(8, i));
    }
    const fact = `${q} ${th.each}, mỗi ${th.each} ${k} ${th.unit}: <b>${k} × ${q} = ${ans}</b> ${th.unit}.`;
    board.innerHTML = `<span class="g2p-sum">${counts.join(', ')}</span><span class="g2p-eq">${k} × ${q} = <b class="g2p-ans">${ans}</b></span>`;
    if (v === ans) { pad.lock('g3g-keypad-ok'); return ok(fact); }
    pad.lock('g3g-keypad-bad');
    bad(`Có ${ans} ${th.unit} cơ!`, fact, `Đếm thêm ${k}: ${counts.join(', ')}. Hoặc nhớ bảng nhân ${k}: ${k} × ${q} = ${ans}.`);
  };
  ask(row(itemIcon(th.item, 26, m.colors[0]), oneLabel, `<b>${k} ${th.unit}</b>`) + row(holderIcon(th.holder, 24, th.item, k), `${q} ${th.each}`, `${Q} ${th.unit}`, true), th.unit, (v, pad) => {
    pad.lock();
    armed = { v, pad };
    go.classList.remove('g2p-wait'); go.classList.add('g2p-ready');
    speak(`Bấm ${th.act.replace(/^\S+ /, '').toLowerCase()} để kiểm tra!`, null, `👉 Bấm <b>${th.act}</b>!`);
  });
  speak(texts[0], null, texts[1]);
  void n;
}

// ════ Cấp 3 (và cấp 4 xen kẽ): chia đều ════════════════════════════════════════════════════════
function levelShare({ m, n, speak, row, ask, ok, bad, board, setBowl, setHolders, redraw, deal, actBtn, remind }) {
  const { n: kids, q, N } = m;
  setBowl(N, true);
  const guests = (slots) => plural(kids).map(i => holder('guest', slots, 'candy', m.tone + i));
  setHolders(guests(0));
  const go = actBtn('🍬 Chia kẹo');
  go.classList.add('g2p-wait');
  let armed = null;
  const eq = `${N} : ${kids} = ${q}`;
  const fact = `${N} cái kẹo chia đều cho ${kids} bạn: <b>${eq}</b>, mỗi bạn <b>${q} cái</b>.`;
  go.onclick = async () => {
    if (!armed) { remind('Tính rồi gõ số kẹo mỗi bạn vào máy tính trước đã!', '👉 Gõ số kẹo mỗi bạn trước!'); return; }
    const { v, pad } = armed; armed = null;
    go.disabled = true; go.classList.remove('g2p-ready');
    // Vòng tới vòng: mỗi bạn một cái, hết kẹo thì dừng.
    const pairs = [];
    for (let r = 0; r < v; r++) for (let g = 0; g < kids; g++) if (pairs.length < N) pairs.push({ h: g, s: r });
    await deal(pairs);
    board.hidden = false;
    board.innerHTML = `<span class="g2p-eq">${N} : ${kids} = <b class="g2p-ans">${q}</b></span>`;
    if (v === q) {
      pad.lock('g3g-keypad-ok');
      plural(kids).forEach(i => redraw(i, { mood: 'happy' }));
      return ok(fact, 'Bạn nào cũng được bằng nhau! Cảm ơn nhiều!');
    }
    pad.lock('g3g-keypad-bad');
    if (v < q) {
      return bad(`Còn thừa ${N - v * kids} cái kẹo chưa chia!`, fact, 'Còn kẹo thì chia tiếp, mỗi bạn thêm một cái, tới khi hết kẹo.');
    }
    plural(kids).forEach(i => redraw(i, { miss: true, mood: 'sad' }));
    bad('Không đủ kẹo cho mỗi bạn!', fact, `Mỗi bạn ${v} cái thì cần ${v * kids} cái kẹo, mà chỉ có ${N} cái.`);
  };
  ask(row(itemIcon('candy', 26, m.colors[0]), 'Có', `<b>${N} cái</b>`) + row(holderIcon('guest', 22, 'candy', 0), 'Số bạn', `<b>${kids} bạn</b>`)
    + row('🍬', 'Mỗi bạn', `${Q} cái`, true), 'cái', (v, pad) => {
    if (!v || v > MAX_HOLDERS) {
      pad.lock('g3g-keypad-bad');
      return bad(`Mỗi bạn ${q} cái cơ!`, fact, 'Chia đều là mỗi bạn nhận bằng nhau.');
    }
    pad.lock();
    armed = { v, pad };
    setHolders(guests(v)); // đĩa mỗi bạn có đúng số chỗ bé gõ
    go.classList.remove('g2p-wait'); go.classList.add('g2p-ready');
    speak('Bấm chia kẹo để kiểm tra!', null, '👉 Bấm <b>🍬 Chia kẹo</b>!');
  });
  speak(`Có ${N} cái kẹo, chia đều cho ${kids} bạn. Mỗi bạn được mấy cái kẹo?`, null,
    `${WANT(`${N} cái kẹo`)} chia đều cho ${WANT(`${kids} bạn`)}. Mỗi bạn ${WANT('mấy cái')}?`);
  void n;
}

// ════ Cấp 4 (và tìm số ở cấp 5): chia theo nhóm ════════════════════════════════════════════════
function levelGroup({ m, n, speak, row, ask, ok, bad, board, dst, setBowl, setHolders, redraw, deal, actBtn, remind }) {
  const find = m.mode === 'fmul' || m.mode === 'fdiv';
  const { k, t, N } = m;
  const box = find ? 'plate' : 'bag';
  const item = m.item;
  const word = find ? 'đĩa' : 'túi';
  const what = ITEM_NAME[item];
  setBowl(N, true);
  const holders = (cnt) => plural(cnt).map(i => holder(box, k, item, m.tone + i));
  setHolders(holders(1));
  const ghost = dst.querySelector('[data-h="0"]');
  ghost?.classList.add('g2p-ghost');
  ghost?.insertAdjacentHTML('beforeend', '<b class="g2p-ghost-q">?</b>');
  const go = actBtn(find ? '🍬 Xếp ra đĩa' : '🎁 Đóng túi');
  go.classList.add('g2p-wait');

  // Bảng: cấp 5 ghi phép tính kèm tên các số; cấp 4 ghi phép chia khi kiểm tra xong.
  const tok = (num, lab, cls = '') => `<span class="g2p-tok"><span class="g2p-num ${cls}">${num}</span><span class="g2p-lab g2p-lab-fixed">${lab}</span></span>`;
  const findBoard = (x) => (m.mode === 'fmul'
    ? `${tok(k, 'Thừa số')}<span class="g2p-op">×</span>${tok(x, 'Thừa số', 'g2p-num-q')}<span class="g2p-op">=</span>${tok(N, 'Tích')}`
    : `${tok(N, 'Số bị chia')}<span class="g2p-op">:</span>${tok(k, 'Số chia')}<span class="g2p-op">=</span>${tok(x, 'Thương', 'g2p-num-q')}`);
  if (find) { board.hidden = false; board.innerHTML = findBoard(Q); }

  const eq = m.mode === 'fmul' ? `${k} × ${t} = ${N}` : `${N} : ${k} = ${t}`;
  const fact = m.mode === 'fmul'
    ? `${k} × <b>${t}</b> = ${N}: thừa số kia là <b>${t}</b> (${t} đĩa, mỗi đĩa ${k} cái là ${N} cái).`
    : m.mode === 'fdiv'
      ? `<b>${eq}</b>: thương là <b>${t}</b> (${N} cái kẹo xếp mỗi đĩa ${k} cái được ${t} đĩa).`
      : `${N} ${what}, mỗi túi ${k} cái: <b>${eq}</b>, được <b>${t} túi</b>.`;
  let armed = null;
  go.onclick = async () => {
    if (!armed) { remind('Tính rồi gõ số vào máy tính trước đã!', '👉 Gõ số trước!'); return; }
    const { v, pad } = armed; armed = null;
    go.disabled = true; go.classList.remove('g2p-ready');
    const pairs = [];
    for (let b = 0; b < v; b++) for (let s = 0; s < k; s++) if (pairs.length < N) pairs.push({ h: b, s });
    await deal(pairs);
    board.hidden = false;
    board.innerHTML = find ? findBoard(`<b class="g2p-ans">${t}</b>`) : `<span class="g2p-eq">${N} : ${k} = <b class="g2p-ans">${t}</b></span>`;
    if (v === t) { pad.lock('g3g-keypad-ok'); return ok(fact); }
    pad.lock('g3g-keypad-bad');
    if (v < t) {
      return bad(`Còn thừa ${N - v * k} ${what}!`, fact, `Mỗi ${word} ${k} cái. Còn đủ ${k} cái thì xếp thêm được 1 ${word}.`);
    }
    plural(v).forEach(i => { if (i >= t) redraw(i, { miss: true }); });
    bad(`Thừa ${v - t} ${word} trống rồi!`, fact, `${v} ${word}, mỗi ${word} ${k} cái thì cần ${v * k} cái, mà chỉ có ${N} cái.`);
  };
  const bill = m.mode === 'fmul'
    ? row('', 'Thừa số', `<b>${k}</b>`) + row('', 'Tích', `<b>${N}</b>`) + row('', 'Thừa số kia', Q, true)
    : m.mode === 'fdiv'
      ? row('', 'Số bị chia', `<b>${N}</b>`) + row('', 'Số chia', `<b>${k}</b>`) + row('', 'Thương', Q, true)
      : row(itemIcon(item, 24), 'Có', `<b>${N} cái</b>`) + row(holderIcon('bag', 22, item, k), '1 túi', `<b>${k} cái</b>`) + row('🎁', 'Số túi', `${Q} túi`, true);
  ask(bill, find ? '' : 'túi', (v, pad) => {
    if (!v || v > MAX_HOLDERS) {
      pad.lock('g3g-keypad-bad');
      board.hidden = false;
      if (find) board.innerHTML = findBoard(`<b class="g2p-ans">${t}</b>`);
      return bad(find ? `Số đúng là ${t} cơ!` : `Được ${t} túi cơ!`, fact, `Nhớ bảng ${find && m.mode === 'fmul' ? 'nhân' : 'chia'} ${k}: ${eq}.`);
    }
    pad.lock();
    armed = { v, pad };
    setHolders(holders(v)); // hiện đúng số túi / đĩa bé gõ
    if (find) board.innerHTML = findBoard(`<b class="g2p-typed">${v}</b>`);
    go.classList.remove('g2p-wait'); go.classList.add('g2p-ready');
    speak(`Bấm ${find ? 'xếp ra đĩa' : 'đóng túi'} để kiểm tra!`, null, `👉 Bấm <b>${go.textContent}</b>!`);
  });
  const opening = m.mode === 'fmul'
    ? [`Tích là ${N}, một thừa số là ${k}. Thừa số kia là mấy?`, `Tích là ${WANT(N)}, một thừa số là ${WANT(k)}. Thừa số kia là ${WANT('mấy')}?`]
    : m.mode === 'fdiv'
      ? [`Số bị chia là ${N}, số chia là ${k}. Thương là mấy?`, `Số bị chia ${WANT(N)}, số chia ${WANT(k)}. Thương là ${WANT('mấy')}?`]
      : [`Có ${N} ${what}, xếp mỗi túi ${k} cái. Được mấy túi?`, `${WANT(`${N} ${what}`)}, mỗi túi ${WANT(`${k} cái`)}. Được ${WANT('mấy túi')}?`];
  speak(opening[0], null, opening[1]);
  void n;
}

// ════ Cấp 5: tên các thành phần ═════════════════════════════════════════════════════════════════
function levelLabels({ m, n, speak, ok, bad, board, acts }) {
  const mul = m.mode === 'lmul';
  const { k, q, p, want, chips } = m;
  const nums = mul ? [k, q, p] : [p, k, q];
  const ops = mul ? ['×', '='] : [':', '='];
  const eq = mul ? `${k} × ${q} = ${p}` : `${p} : ${k} = ${q}`;
  board.hidden = false;
  board.classList.add('g2p-board-big');
  const tok = (i) => `<span class="g2p-tok"><span class="g2p-num">${nums[i]}</span><button type="button" class="g2p-lab${i === 0 ? ' g2p-lab-on' : ''}" data-lab="${i}" aria-label="Tên của số ${nums[i]}"></button></span>`;
  board.innerHTML = `${tok(0)}<span class="g2p-op">${ops[0]}</span>${tok(1)}<span class="g2p-op">${ops[1]}</span>${tok(2)}`;
  acts.innerHTML = `<div class="g2p-chips">${chips.map((c, i) => `<button type="button" class="g2p-chip" data-c="${i}">${c}</button>`).join('')}</div>
    <button type="button" class="g2p-act g2p-ready" data-done>✓ Gắn xong</button>`;
  const put = [null, null, null]; // chỉ số thẻ đã gắn vào ô i
  let active = 0, locked = false;
  const boxes = [...board.querySelectorAll('[data-lab]')];
  const chipEls = [...acts.querySelectorAll('[data-c]')];
  const setActive = (i) => {
    active = i;
    boxes.forEach((b, j) => b.classList.toggle('g2p-lab-on', j === i));
  };
  const nextEmpty = () => put.findIndex(x => x == null);

  board.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lab]');
    if (!b || locked) return;
    const i = Number(b.dataset.lab);
    if (put[i] != null) { // gỡ nhãn ra, trả về hàng thẻ
      chipEls[put[i]].classList.remove('g2p-chip-used');
      put[i] = null;
      b.textContent = '';
      b.classList.remove('g2p-lab-full');
      sfx.tap();
    }
    setActive(i);
  });
  acts.querySelector('.g2p-chips').addEventListener('click', (e) => {
    const c = e.target.closest('[data-c]');
    if (!c || locked || c.classList.contains('g2p-chip-used')) return;
    if (active < 0) { speak('Chạm vào một ô trống trước đã!', null, '👉 Chạm vào ô trống dưới số!'); return; }
    const i = active, ci = Number(c.dataset.c), box = boxes[i];
    put[i] = ci;
    c.classList.add('g2p-chip-used');
    const land = () => { box.textContent = chips[ci]; box.classList.add('g2p-lab-full'); sfx.pop(i); };
    flyOne(`<span class="g2p-chip g2p-chip-fly">${chips[ci]}</span>`, c.getBoundingClientRect(), box.getBoundingClientRect(), { minMs: 380, maxMs: 620, onLand: land });
    setActive(nextEmpty());
  });
  acts.querySelector('[data-done]').onclick = () => {
    if (locked) return;
    const empty = nextEmpty();
    if (empty >= 0) {
      setActive(empty);
      boxes[empty].classList.remove('g2p-hint'); void boxes[empty].offsetWidth; boxes[empty].classList.add('g2p-hint');
      speak('Gắn đủ tên cho ba số đã!', null, '👉 Gắn đủ tên cho <b>ba số</b>!');
      return;
    }
    locked = true;
    setActive(-1);
    acts.querySelectorAll('button').forEach(b => { b.disabled = true; });
    let allRight = true;
    boxes.forEach((b, i) => {
      const right = chips[put[i]] === want[i];
      allRight &&= right;
      b.classList.add(right ? 'g2p-lab-right' : 'g2p-lab-wrong');
      if (!right) b.innerHTML = `<s>${chips[put[i]]}</s> ${want[i]}`;
    });
    const fact = mul
      ? `Trong <b>${eq}</b>: ${k} và ${q} là <b>thừa số</b>, ${p} là <b>tích</b>.`
      : `Trong <b>${eq}</b>: ${p} là <b>số bị chia</b>, ${k} là <b>số chia</b>, ${q} là <b>thương</b>.`;
    if (allRight) return ok(fact);
    bad('Có tên gắn chưa đúng rồi!', fact, mul ? 'Hai số nhân với nhau là thừa số, kết quả của phép nhân là tích.'
      : 'Số đem chia là số bị chia, số chia đứng sau dấu :, kết quả của phép chia là thương.');
  };
  speak(`Gắn tên cho các số trong phép ${mul ? 'nhân' : 'chia'} ${mul ? `${k} nhân ${q} bằng ${p}` : `${p} chia ${k} bằng ${q}`}!`, null,
    `Gắn ${WANT('tên')} cho các số trong phép ${mul ? 'nhân' : 'chia'}!`);
  void n;
}
