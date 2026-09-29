/**
 * 🥕 Quầy rau củ (Chợ phiên của bé, lớp 2) — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.3.
 * Bám từng tiết của Bài 15 "Ki-lô-gam" (và Bài 17, 18):
 *   pair   (cấp 1, tiết 1, chưa có số): khách đưa hai món, bé đặt từng món lên một đĩa cân, nhìn cân nghiêng rồi chọn
 *          câu đúng như trong vở "… nhẹ hơn / nặng hơn / nặng bằng …". Có lượt nặng bằng và lượt món to mà nhẹ.
 *   kg1    (cấp 2, tiết 2): rau củ một bên, quả cân 1 kg bên kia → "… nặng hơn / nhẹ hơn / nặng bằng 1 kg".
 *          Hai cấp so sánh: câu trả lời chỉ hiện khi cả hai bên đã nằm trên cân (bé phải cân rồi mới chọn).
 *   weigh  (cấp 3, tiết 3 câu 2, Bài 17): túi hàng chưa biết cân nặng; bé thêm, bớt quả cân 1, 2, 5 kg cho cân thăng
 *          bằng, tự bấm "Cân xong" (app không báo trước), rồi gõ túi nặng mấy ki-lô-gam (cộng các quả cân).
 *   addsub (cấp 4, tiết 3, Bài 17, 18): hai túi có thẻ ghi số kg; "cả hai túi nặng …?", "túi này nặng hơn túi kia …?".
 *          Bé gõ số TRƯỚC, rồi cân kiểm chứng: túi và quả cân đúng bằng số bé gõ bay lên đĩa, đúng thì cân thăng bằng.
 * Không tính tiền (phép nhân với giá tiền là kiến thức lớp 3). Dùng khung quầy của Chợ phiên lớp 3 (market/stall.js)
 * và cân đĩa (art/scale.js), theme 'veg'.
 */

import { VEG, vegHeap, vegIcon, vegLabel, vegLooks, BAGS, bagArt, bagIcon } from './art/veg.js';
import { stallMeta, levelMeta } from './catalog.js';
import { injectVegStyles } from './styles.js';
import { NPCS, cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { mountScale } from '../grade3Games/art/scale.js';
import { weightSvg, weightSize, weightIcon } from '../grade3Games/art/weights.js';
import { flyOne, svgBoxOnScreen } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const MINUS = '−';

export const VEG_LEVELS = [
  {
    ...levelMeta('veg-1'), missions: 5, kind: 'pair',
    knowledge: 'nặng hơn, nhẹ hơn, nặng bằng',
    ask: (n) => `${cap(n.you)} cân giúp ${n.me} xem bên nào nặng hơn!`,
    desc: 'Đặt hai món lên hai đĩa cân. Bên nào thấp hơn thì bên đó nặng hơn. Cân thăng bằng là nặng bằng nhau.',
    how: [['bapcai', 'Đặt lên cân'], ['⚖️', 'Nhìn cân'], ['👆', 'Chọn câu đúng']],
  },
  {
    ...levelMeta('veg-2'), missions: 5, kind: 'kg1',
    knowledge: 'ki-lô-gam, nặng hơn, nhẹ hơn 1 kg',
    ask: (n) => `${cap(n.you)} xem rau củ nặng hơn hay nhẹ hơn 1 ki-lô-gam!`,
    desc: 'Rau củ một bên, quả cân 1 kg bên kia. Cân nghiêng về bên nào thì bên đó nặng hơn.',
    how: [['w1000', 'Đặt lên cân'], ['⚖️', 'Nhìn cân'], ['👆', 'Chọn câu đúng']],
  },
  {
    ...levelMeta('veg-3'), missions: 5, kind: 'weigh',
    knowledge: 'ki-lô-gam, cộng các quả cân',
    ask: (n) => `${cap(n.you)} cân xem túi hàng của ${n.me} nặng mấy ki-lô-gam!`,
    desc: 'Đặt quả cân 1 kg, 2 kg, 5 kg cho cân thăng bằng. Túi nặng bằng các quả cân cộng lại: 5 kg + 2 kg = 7 kg.',
    how: [['w5000', 'Thêm quả cân'], ['⚖️', 'Cân thăng bằng'], ['🧮', 'Gõ số ki-lô-gam']],
  },
  {
    ...levelMeta('veg-4'), missions: 5, kind: 'addsub',
    knowledge: 'cộng, trừ với đơn vị ki-lô-gam',
    ask: (n) => `${cap(n.you)} tính giúp ${n.me} rồi cân lại cho chắc!`,
    desc: 'Túi gạo 6 kg, túi đường 3 kg: cả hai túi nặng 6 kg + 3 kg = 9 kg; túi gạo nặng hơn túi đường 6 kg − 3 kg = 3 kg.',
    how: [['🧮', 'Gõ số ki-lô-gam'], ['⚖️', 'Cân kiểm tra']],
  },
];

const PAN = 132; // bề rộng hàng trên đĩa cân (đĩa rộng 144)
const ANS = ['lighter', 'heavier', 'equal']; // thứ tự ba câu như trong vở: nhẹ hơn, nặng hơn, nặng bằng
const WORD = { lighter: 'nhẹ hơn', heavier: 'nặng hơn', equal: 'nặng bằng' };
const KG_SET = [5000, 2000, 2000, 1000, 1000];         // bộ quả cân ở quầy (cấp 3): cân được 1 tới 11 kg
const KG_SET_BIG = [10000, 5000, 2000, 2000, 1000];     // cấp 4: tới 20 kg

function shuffle(rng, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = rng.int(0, i); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const vb = (b) => `${b.x.toFixed(1)} ${b.y.toFixed(1)} ${b.w.toFixed(1)} ${b.h.toFixed(1)}`;
/** Nghiêng như cân thật: lệch nhiều nghiêng nhiều, chạm chốt khi lệch từ khoảng nửa bên nặng; lệch ít vẫn thấy rõ. */
const tiltOf = (right, left) => {
  const d = right - left;
  return d === 0 ? 0 : Math.sign(d) * Math.min(1, 0.45 + 0.55 * Math.abs(d) / Math.max(right, left));
};

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
// Cấp 1: mọi cặp nhóm (loại, số củ) khác loại nhau, chia 3 kiểu:
//   equal:  nặng bằng nhau (cân thăng bằng);
//   tricky: bên nặng hơn lại trông nhỏ hơn hẳn (bó rau muống to mà nhẹ…);
//   normal: lệch rõ (gấp rưỡi trở lên), bên nặng trông cũng to hơn hoặc ngang.
const gramsOf = (s) => (s.kg ? s.kg * 1000 : VEG[s.id].g * s.n);
const GROUPS = Object.keys(VEG).flatMap(id => Array.from({ length: VEG[id].max }, (_, i) => ({ id, n: i + 1 })));
const PAIRS = (() => {
  const out = { equal: [], tricky: [], normal: [] };
  GROUPS.forEach((a, i) => GROUPS.slice(i + 1).forEach(b => {
    if (a.id === b.id) return;
    const wa = gramsOf(a), wb = gramsOf(b);
    if (wa === wb) return out.equal.push([a, b]);
    const [hi, lo] = wa > wb ? [a, b] : [b, a];
    const lookHi = vegLooks(hi.id, hi.n), lookLo = vegLooks(lo.id, lo.n);
    if (lookHi < lookLo * 0.8) out.tricky.push([a, b]);
    else if (gramsOf(hi) >= gramsOf(lo) * 1.5 && lookHi >= lookLo * 0.9) out.normal.push([a, b]);
  }));
  return out;
})();
// Cấp 2: nhóm rau củ so với 1 kg (cà rốt, cà chua quá nhẹ — 4 củ vẫn chưa tới nửa ki-lô-gam, bỏ qua cho khỏi dễ ẹc).
const KG1 = (() => {
  const out = { heavier: [], lighter: [], equal: [] };
  GROUPS.forEach(s => {
    const g = gramsOf(s);
    if (g < 500) return;
    out[g === 1000 ? 'equal' : g > 1000 ? 'heavier' : 'lighter'].push(s);
  });
  return out;
})();

const lastOf = (h) => h[h.length - 1];

function makePair(rng, history) {
  // 5 lượt: lượt đầu dễ (lệch rõ), sau đó có một lượt nặng bằng và một lượt "to mà nhẹ", xếp ngẫu nhiên.
  const plan = history[0]?.plan || ['normal', ...shuffle(rng, ['normal', 'normal', 'equal', 'tricky'])];
  const kind = plan[history.length % plan.length];
  const prev = lastOf(history);
  const used = new Set(prev ? [prev.L.id, prev.R.id] : []);
  const key = (p) => p.map(s => s.id + s.n).sort().join();
  const seen = new Set(history.map(h => key([h.L, h.R])));
  let pool = PAIRS[kind].filter(p => !seen.has(key(p)) && !p.some(s => used.has(s.id)));
  if (!pool.length) pool = PAIRS[kind].filter(p => !seen.has(key(p)));
  const [L, R] = shuffle(rng, rng.pick(pool));
  const subj = rng.pick(['L', 'R']);
  return { plan, kind, L, R, subj };
}

function makeKg1(rng, history) {
  const plan = history[0]?.plan || [...shuffle(rng, ['heavier', 'lighter']), ...shuffle(rng, ['equal', 'heavier', 'lighter'])];
  const kind = plan[history.length % plan.length];
  const usedIds = history.slice(-2).map(h => h.L.id);
  let pool = KG1[kind].filter(s => !usedIds.includes(s.id));
  if (!pool.length) pool = KG1[kind];
  return { plan, kind, L: rng.pick(pool), R: { kg: 1 }, subj: 'L' };
}

function makeWeigh(rng, history) {
  const prev = lastOf(history);
  const type = rng.pick(Object.keys(BAGS).filter(t => t !== prev?.bag.type));
  const seen = history.map(h => h.bag.kg);
  const kgs = BAGS[type].kg.filter(k => !seen.includes(k));
  return { bag: { type, kg: rng.pick(kgs.length ? kgs : BAGS[type].kg) } };
}

function makeAddSub(rng, history) {
  const prev = lastOf(history);
  const op = prev ? (prev.op === 'sum' ? 'diff' : 'sum') : rng.pick(['sum', 'diff']);
  const seen = new Set(history.map(h => `${h.A.type}${h.A.kg}${h.B.type}${h.B.kg}`));
  for (let tries = 0; ; tries++) {
    const [ta, tb] = shuffle(rng, Object.keys(BAGS)).slice(0, 2);
    const A = { type: ta, kg: rng.pick(BAGS[ta].kg) }, B = { type: tb, kg: rng.pick(BAGS[tb].kg) };
    if (A.kg === B.kg) continue;
    if (op === 'sum' && A.kg + B.kg > 20) continue;
    if (seen.has(`${A.type}${A.kg}${B.type}${B.kg}`) && tries < 40) continue;
    // Hiệu: A là túi nặng hơn. Hỏi "A nặng hơn B" hoặc "B nhẹ hơn A", xen kẽ.
    const [H, Lt] = A.kg > B.kg ? [A, B] : [B, A];
    const say = op === 'diff' ? (history.filter(h => h.op === 'diff').length % 2 ? 'less' : 'more') : '';
    return op === 'sum' ? { op, A, B, ans: A.kg + B.kg } : { op, A: H, B: Lt, say, ans: H.kg - Lt.kg };
  }
}

const MAKERS = { pair: (rng, level, h) => makePair(rng, h), kg1: (rng, level, h) => makeKg1(rng, h), weigh: (rng, level, h) => makeWeigh(rng, h), addsub: (rng, level, h) => makeAddSub(rng, h) };

/** Tách số kg thành các quả cân có ở quầy (lớn trước). Không tách được thì null. */
function splitKg(set, kg) {
  const out = [];
  let left = kg * 1000;
  set.forEach((g, i) => { if (g <= left) { out.push(i); left -= g; } });
  return left === 0 ? out : null;
}
const kgText = (g) => `${g / 1000} kg`;

/**
 * Xếp các món (gốc = giữa đáy) thành hàng trên mặt đĩa rộng PAN, đầy hàng thì chồng lên hàng trên.
 * items: [{ key, svg, w, h }]. Trả về { svg, at: { key: { x, y, w, h } } } — khung từng món trong toạ độ mặt đĩa.
 */
function panRow(items) {
  const rows = [[]];
  let rowW = 0;
  for (const it of items) {
    if (rowW + it.w > PAN && rows[rows.length - 1].length) { rows.push([]); rowW = 0; }
    rows[rows.length - 1].push(it);
    rowW += it.w + 3;
  }
  let y = 0, svg = '';
  const at = {};
  for (const row of rows) {
    let x = -row.reduce((s, it) => s + it.w + 3, -3) / 2;
    for (const it of row) {
      const cx = x + it.w / 2;
      at[it.key] = { x: cx - it.w / 2, y: y - it.h, w: it.w, h: it.h };
      svg += `<g data-k="${it.key}" transform="translate(${cx.toFixed(1)} ${y})">${it.svg}</g>`;
      x += it.w + 3;
    }
    y -= Math.max(...row.map(it => it.h)) - 2;
  }
  return { svg, at };
}
const weightItem = (key, g) => ({ key, svg: weightSvg(g), ...weightSize(g) });
const bagItem = (key, bag, tag) => { const a = bagArt(bag.type, bag.kg, tag); return { key, svg: a.svg, w: a.w, h: a.h }; };
/** Hình bay của một món: svg khung đúng bằng khung món (gốc giữa đáy). */
const flyPic = (it) => `<svg viewBox="${(-it.w / 2).toFixed(1)} ${(-it.h).toFixed(1)} ${it.w.toFixed(1)} ${it.h.toFixed(1)}" style="width:100%;height:100%;display:block;overflow:visible">${it.svg}</svg>`;
/** Nút trong khay: cùng khung với hình bay, cỡ theo --u chung của khay. */
const trayPic = (it) => `<svg viewBox="${(-it.w / 2).toFixed(1)} ${(-it.h).toFixed(1)} ${it.w.toFixed(1)} ${it.h.toFixed(1)}" style="--w:${it.w.toFixed(1)};--h:${it.h.toFixed(1)}" aria-hidden="true">${it.svg}</svg>`;

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const VEG_GAME = {
  ...stallMeta('veg'),
  unitWord: 'khách',
  starPrefix: 'g2games',
  levels: VEG_LEVELS,
  stallIcon: () => vegIcon('bi', 56),
  summaryText: (ok, total) => `Em đã cân đúng cho <strong>${ok}/${total}</strong> khách.`,

  howTo(level) {
    const pic = (p) => (p.startsWith('w') ? weightIcon(Number(p.slice(1))) : VEG[p] ? vegIcon(p, 44) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Khách vui' }];
  },

  makeMission(rng, level, history) {
    const m = MAKERS[level.kind](rng, level, history);
    const recentNpcs = history.slice(-3).map(x => x.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recentNpcs.includes(n.id)));
    return { ...m, level: level.kind, npc };
  },

  mountMission(stage, m, level, api) {
    injectVegStyles();
    if (import.meta.env.DEV) window.__g2veg = m;
    if (m.level === 'weigh') return mountWeigh(stage, m, api);
    if (m.level === 'addsub') return mountAddSub(stage, m, api);
    return mountCompare(stage, m, api);
  },
};

/** Khung quầy chung: cân ở giữa, dưới cân là khay. nopad: cấp chọn câu, không có máy tính tiền. */
function stall(stage, m, api, { counter, nopad = false }) {
  const s = mountStall(stage, {
    npc: m.npc, api, theme: 'veg', cameo: false, // chỗ đúng / sai nằm trên cân: khách không nhảy xuống đứng che cân
    sign: `${vegIcon('bapcai', 30)}<span><strong>Quầy rau củ</strong><br>${m.level === 'pair' ? 'Cân xem bên nào nặng hơn' : 'Cân theo ki-lô-gam'}</span>`,
    counter: `<div class="g3f-scale-host"></div>${counter}`,
  });
  if (nopad) stage.querySelector('.g3f-scene').classList.add('g2v-nopad');
  const scale = mountScale(s.counter.querySelector('.g3f-scale-host'), { tight: true });
  scale.setTilt(0, false);
  /** Thẻ kết quả bật lên ở đáy quầy: cất phần thao tác dưới cân, thu cân lên phía trên thẻ để bé vẫn nhìn thấy cân. */
  const afterCard = () => requestAnimationFrame(() => {
    const card = s.main.querySelector(':scope > .g3g-result');
    if (!card) return;
    s.counter.querySelectorAll('.g2v-choices, .g2v-dock').forEach(el => { el.hidden = true; });
    s.counter.style.paddingBottom = `${card.offsetHeight + 12}px`;
  });
  /** Dấu "?" trên hoá đơn hiện đáp số thật sau khi chấm. */
  const showAnswer = (text) => {
    const q = s.main.closest('.g3f-scene')?.querySelector('.g3f-bill-q .g3f-q');
    if (q) { q.textContent = text; q.classList.add('g2v-bill-ans'); }
  };
  return { ...s, scale, afterCard, showAnswer };
}

// ── Cấp 1, 2: đặt hai bên lên cân, chọn câu ─────────────────────────────────────────────────────
function mountCompare(stage, m, api) {
  const n = m.npc;
  const side = { '-1': m.L, 1: m.R };
  const lab = (s) => (s.kg ? `${s.kg} kg` : vegLabel(s.id, s.n));
  const trayName = (s) => (s.kg ? `Quả cân ${s.kg} kg` : cap(vegLabel(s.id, s.n)));
  const art = (s) => {
    if (!s.kg) return vegHeap(s.id, s.n, PAN);
    const { w, h } = weightSize(s.kg * 1000);
    return { svg: weightSvg(s.kg * 1000), box: { x: -w / 2 - 3, y: -h - 3, w: w + 6, h: h + 5 } };
  };
  const heaps = { '-1': art(m.L), 1: art(m.R) };
  const [S, O] = m.subj === 'L' ? [m.L, m.R] : [m.R, m.L];
  const ans = gramsOf(S) === gramsOf(O) ? 'equal' : gramsOf(S) > gramsOf(O) ? 'heavier' : 'lighter';
  m.ans = ans;
  const sentence = (a) => `${cap(lab(S))} ${WORD[a]} ${lab(O)}.`;

  // Hai khay vẽ cùng một tỉ lệ (--u, styles.js): củ to trông to, củ nhỏ trông nhỏ, như lúc nằm trên cân.
  const { counter, speak, fail, scale, afterCard } = stall(stage, m, api, {
    nopad: true,
    counter: `
      <div class="g2v-dock g2v-dock-hint" style="--hmax:${Math.max(heaps[-1].box.h, heaps[1].box.h).toFixed(1)};--wmax:${Math.max(heaps[-1].box.w, heaps[1].box.w).toFixed(1)}">
        ${[-1, 1].map(k => `
          <button type="button" class="g2v-tray" data-side="${k}" aria-label="Đặt ${lab(side[k])} lên đĩa cân bên ${k < 0 ? 'trái' : 'phải'}">
            <svg viewBox="${vb(heaps[k].box)}" style="--w:${heaps[k].box.w.toFixed(1)};--h:${heaps[k].box.h.toFixed(1)}" aria-hidden="true">${heaps[k].svg}</svg>
            <span class="g2v-tray-name">${trayName(side[k])}</span>
          </button>`).join('')}
      </div>
      <div class="g2v-choices" hidden>
        ${ANS.map((a, i) => `<button type="button" class="g2v-choice" data-a="${a}"><b>${'ABC'[i]}</b><span>${sentence(a)}</span></button>`).join('')}
      </div>`,
  });
  const dock = counter.querySelector('.g2v-dock');
  const choices = counter.querySelector('.g2v-choices');

  // Cân thật: có một bên thì nghiêng hết cỡ về bên đó; hai bên thì lệch nhiều nghiêng nhiều, bằng nhau thì thăng bằng.
  const on = { '-1': false, 1: false };
  const flying = new Set();
  const tilt = () => scale.setTilt(tiltOf(on[1] ? gramsOf(m.R) : 0, on[-1] ? gramsOf(m.L) : 0), false);

  function place(k) {
    if (on[k] || flying.has(k)) return;
    const btn = dock.querySelector(`[data-side="${k}"]`);
    const { box, svg } = heaps[k];
    flying.add(k);
    dock.classList.remove('g2v-dock-hint');
    sfx.tap();
    const from = btn.querySelector('svg').getBoundingClientRect();
    const to = svgBoxOnScreen(scale.load(k), box.x, box.y, box.w, box.h);
    btn.classList.add('g2v-tray-empty');
    btn.disabled = true;
    flyOne(`<svg viewBox="${vb(box)}" style="width:100%;height:100%;display:block">${svg}</svg>`, from, to, {
      minMs: 550, maxMs: 900, spin: k * 8,
      onLand: () => {
        flying.delete(k);
        on[k] = true;
        (k < 0 ? scale.setLeft : scale.setRightSvg)(svg);
        sfx.pop(k < 0 ? 2 : 4);
        tilt();
        if (on[-1] && on[1]) setTimeout(showChoices, 750); // chờ đòn cân nghiêng xong
        else {
          const other = side[k < 0 ? 1 : -1];
          const what = other.kg ? `quả cân ${other.kg} kg` : lab(other);
          dock.classList.add('g2v-dock-hint');
          speak(`Đặt tiếp ${what} lên cân!`, null, `👉 Đặt tiếp <b>${what}</b> lên cân!`);
        }
      },
    });
  }
  dock.addEventListener('click', (e) => {
    const b = e.target.closest('[data-side]');
    if (b) place(Number(b.dataset.side));
  });

  function showChoices() {
    dock.hidden = true;
    choices.hidden = false;
    counter.classList.add('g2v-asking');
    speak('Nhìn cân rồi chọn câu đúng!', null, '👉 Nhìn cân rồi chọn câu đúng!');
  }

  choices.addEventListener('click', (e) => {
    const b = e.target.closest('[data-a]');
    if (!b || choices.classList.contains('g2v-locked')) return;
    choices.classList.add('g2v-locked');
    const pick = b.dataset.a;
    choices.querySelector(`[data-a="${ans}"]`).classList.add('g2v-right');
    if (pick === ans) {
      sfx.tap();
      speak(`Đúng rồi! ${sentence(ans)}`, 'happy', `Đúng rồi ${n.you} ơi! 🎉`);
      const extra = m.kind === 'tricky' ? ' To chưa chắc đã nặng!' : ans === 'equal' ? ' Cân thăng bằng.' : '';
      api.succeed(`<b>${sentence(ans)}</b>${extra}`);
      return afterCard();
    }
    b.classList.add('g2v-wrong');
    const heavy = gramsOf(m.L) > gramsOf(m.R) ? m.L : m.R;
    const tip = ans === 'equal'
      ? 'Đòn cân nằm ngang, kim chỉ giữa: hai bên nặng bằng nhau.'
      : `Đĩa bên ${heavy.kg ? 'quả cân' : lab(heavy)} thấp hơn nên ${lab(heavy)} nặng hơn.${m.kind === 'tricky' ? ' Món trông to chưa chắc đã nặng: nhìn cân.' : ''}`;
    fail(`Câu đúng là: <b>${sentence(ans)}</b>`, tip);
    afterCard();
  });

  if (m.level === 'kg1') {
    speak(`${cap(n.you)} xem ${lab(m.L)} nặng hơn hay nhẹ hơn 1 ki-lô-gam?`, null,
      `<b>${cap(lab(m.L))}</b> nặng hơn hay nhẹ hơn <b>1 kg</b>?`);
  } else {
    speak(`${cap(n.you)} cân giúp ${n.me}: ${lab(m.L)} và ${lab(m.R)}, bên nào nặng hơn?`, null,
      `<b>${cap(lab(m.L))}</b> và <b>${lab(m.R)}</b>: bên nào nặng hơn?`);
  }
}

// ── Cấp 3: thêm quả cân cho thăng bằng, gõ số kg ───────────────────────────────────────────────
function mountWeigh(stage, m, api) {
  const n = m.npc;
  const bag = m.bag, name = BAGS[bag.type].name;
  const set = KG_SET;
  const bagIt = bagItem('bag', bag);
  const wIt = set.map((g, i) => weightItem(`w${i}`, g));
  const hmax = Math.max(bagIt.h, ...wIt.map(it => it.h));

  const { counter, speak, row, ask, fail, scale, afterCard, showAnswer } = stall(stage, m, api, {
    counter: `
      <div class="g2v-dock g2v-dock-kg g2v-dock-hint" style="--hmax:${hmax.toFixed(1)};--wsum:${[bagIt, ...wIt].reduce((a, it) => a + it.w, 0).toFixed(1)};--gaps:2">
        <button type="button" class="g2v-tray g2v-tray-bag" data-bag aria-label="Đặt ${name} lên đĩa cân">${trayPic(bagIt)}<span class="g2v-tray-name">${cap(name)}</span></button>
        <div class="g2v-tray g2v-wtray" aria-label="Khay quả cân">
          <div class="g2v-wrow">${wIt.map((it, i) => `<button type="button" class="g2v-w" data-w="${i}" aria-label="Quả cân ${kgText(set[i])}">${trayPic(it)}</button>`).join('')}</div>
          <span class="g2v-tray-name">Quả cân</span>
        </div>
      </div>`,
  });
  const dock = counter.querySelector('.g2v-dock');
  const bagBtn = dock.querySelector('[data-bag]');
  const doneBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'g3g-btn g3g-btn-primary g3f-done', disabled: true });
  doneBtn.innerHTML = '<b>✓ Cân xong</b><small>Cân xong hãy xác nhận</small>';
  scale.center.appendChild(doneBtn);

  let bagOn = false, locked = false;
  const onPan = new Set();          // quả cân đã chạm đĩa phải (chỉ số trong set)
  const flying = new Map();         // "bag" / "w3" → true: đang bay lên đĩa, false: đang bay về khay
  const sum = () => [...onPan].reduce((s, i) => s + set[i], 0);
  const tilt = () => scale.setTilt(tiltOf(sum(), bagOn ? bag.kg * 1000 : 0), false);
  const rightItems = () => [...onPan, ...[...flying].filter(([k, up]) => up && k[0] === 'w').map(([k]) => Number(k.slice(1)))]
    .sort((a, b) => set[b] - set[a]).map(i => wIt[i]);
  let rightAt = {};

  function redraw() {
    scale.setLeft(bagOn || flying.get('bag') ? panRow([bagIt]).svg : '');
    const r = panRow(rightItems());
    rightAt = r.at;
    scale.setRightSvg(r.svg);
    // Đồ đang bay lên: đã có chỗ trên đĩa nhưng ẩn tới lúc đáp.
    for (const [k, up] of flying) if (up) scale.load(k === 'bag' ? -1 : 1).querySelector(`[data-k="${k}"]`)?.style.setProperty('opacity', '0');
    dock.querySelectorAll('[data-w]').forEach(b => {
      const i = Number(b.dataset.w);
      const away = onPan.has(i) || flying.has(`w${i}`); // đang bay về khay: chỗ trống tới lúc đáp
      b.classList.toggle('g2v-w-away', away);
      b.disabled = away || locked;
    });
    bagBtn.classList.toggle('g2v-tray-empty', bagOn || flying.has('bag'));
    bagBtn.disabled = bagOn || flying.has('bag') || locked;
    dock.classList.toggle('g2v-hint-bag', !bagOn && !flying.has('bag') && !locked);
    dock.classList.toggle('g2v-hint-w', bagOn && onPan.size === 0 && !flying.size && !locked);
    doneBtn.disabled = locked || !bagOn || onPan.size === 0 || flying.size > 0;
  }
  const panBox = (k) => {
    const a = k === 'bag' ? panRow([bagIt]).at.bag : rightAt[k];
    return a && svgBoxOnScreen(scale.load(k === 'bag' ? -1 : 1), a.x, a.y, a.w, a.h);
  };
  const trayBox = (k) => (k === 'bag' ? bagBtn : dock.querySelector(`[data-w="${k.slice(1)}"]`))?.querySelector('svg')?.getBoundingClientRect();

  function move(k, up) {
    if (locked || flying.has(k)) return;
    const it = k === 'bag' ? bagIt : wIt[Number(k.slice(1))];
    const from = up ? trayBox(k) : panBox(k);
    if (!up) onPan.delete(Number(k.slice(1)));
    flying.set(k, up);
    redraw();
    tilt();
    const to = up ? panBox(k) : trayBox(k);
    sfx.tap();
    flyOne(flyPic(it), from, to, {
      minMs: 480, maxMs: 820, spin: up ? 8 : -8,
      onLand: () => {
        flying.delete(k);
        if (up) { if (k === 'bag') bagOn = true; else onPan.add(Number(k.slice(1))); }
        redraw();
        if (!flying.size || up) tilt();
        if (up && k === 'bag') speak('Thêm quả cân cho cân thăng bằng!', null, '👉 Thêm quả cân cho cân thăng bằng!');
      },
    });
  }
  bagBtn.onclick = () => move('bag', true);
  dock.addEventListener('click', (e) => {
    const b = e.target.closest('[data-w]');
    if (b && !b.disabled) move(`w${b.dataset.w}`, true);
  });
  // Chạm quả cân trên đĩa để nhấc xuống.
  scale.load(1).addEventListener('click', (e) => {
    const g = e.target.closest('[data-k]');
    if (g && onPan.has(Number(g.dataset.k.slice(1)))) move(g.dataset.k, false);
  });

  const parts = () => [...onPan].map(i => set[i]).sort((a, b) => b - a).map(kgText).join(' + ');
  doneBtn.onclick = () => {
    locked = true;
    redraw();
    const d = sum() - bag.kg * 1000;
    if (d !== 0) {
      const few = d < 0; // bên túi nặng hơn → quả cân chưa đủ
      speak(few ? `Cân còn nghiêng về bên ${name} mà ${n.you}!` : `Cân lệch sang bên quả cân rồi, nhiều quá!`, 'sad',
        few ? 'Cân còn nghiêng, chưa đủ quả cân!' : 'Cân lệch, quả cân nhiều quá!');
      api.fail(`Cân còn nghiêng về bên <b>${few ? name : 'quả cân'}</b>: ${name} ${few ? 'nặng hơn' : 'nhẹ hơn'} ${parts()}.`,
        `Đòn cân nằm ngang, kim chỉ giữa mới là cân xong. ${few ? 'Thêm quả cân' : 'Bớt quả cân'} cho tới khi thăng bằng.`);
      return afterCard();
    }
    scale.setTilt(0, true);
    speak(`Cân thăng bằng rồi! ${cap(name)} nặng mấy ki-lô-gam?`, null, `Cân thăng bằng rồi! ${cap(name)} nặng mấy ki-lô-gam?`);
    ask(row(bagIcon(bag.type, bag.kg), cap(name), Q, true), 'kg', (v, pad) => {
      const how = onPan.size > 1 ? `${parts()} = ${bag.kg} kg` : `${bag.kg} kg`;
      showAnswer(`${bag.kg} kg`);
      if (v === bag.kg) {
        pad.lock('g3g-keypad-ok');
        const b = bagItem('bag', bag, `${bag.kg} kg`);
        scale.setLeft(panRow([b]).svg); // túi được treo thẻ số kg vừa cân
        speak(`Đúng rồi! Cảm ơn ${n.you}!`, 'happy', `Đúng rồi! Cảm ơn ${n.you}! 🎉`);
        api.succeed(`<b>${cap(name)} nặng ${bag.kg} kg.</b> ${onPan.size > 1 ? how : ''}`);
      } else {
        pad.lock('g3g-keypad-bad');
        fail(`${cap(name)} nặng <b>${bag.kg} kg</b>, không phải ${v} kg.`,
          `Cân thăng bằng: ${name} nặng bằng các quả cân cộng lại: ${how}.`);
      }
      afterCard();
    });
  };

  redraw();
  speak(`${cap(n.you)} cân giúp ${n.me} ${name} này nặng mấy ki-lô-gam!`, null, `Cân giúp ${n.me} <b>${name}</b> này!`);
}

// ── Cấp 4: cộng, trừ kg, gõ số rồi cân kiểm chứng ─────────────────────────────────────────────
function mountAddSub(stage, m, api) {
  const n = m.npc;
  const nameA = BAGS[m.A.type].name, nameB = BAGS[m.B.type].name;
  const set = KG_SET_BIG;
  const aIt = bagItem('a', m.A, `${m.A.kg} kg`), bIt = bagItem('b', m.B, `${m.B.kg} kg`);
  const wIt = set.map((g, i) => weightItem(`w${i}`, g));
  const hmax = Math.max(aIt.h, bIt.h, ...wIt.map(it => it.h));
  const sum = m.op === 'sum';

  const { counter, speak, row, ask, fail, scale, afterCard, showAnswer } = stall(stage, m, api, {
    counter: `
      <div class="g2v-dock g2v-dock-kg" style="--hmax:${hmax.toFixed(1)};--wsum:${[aIt, bIt, ...wIt].reduce((a, it) => a + it.w, 0).toFixed(1)};--gaps:3">
        <div class="g2v-tray g2v-tray-bag" data-bag="a">${trayPic(aIt)}<span class="g2v-tray-name">${cap(nameA)}</span></div>
        <div class="g2v-tray g2v-tray-bag" data-bag="b">${trayPic(bIt)}<span class="g2v-tray-name">${cap(nameB)}</span></div>
        <div class="g2v-tray g2v-wtray" aria-label="Khay quả cân">
          <div class="g2v-wrow">${wIt.map((it, i) => `<span class="g2v-w" data-w="${i}">${trayPic(it)}</span>`).join('')}</div>
          <span class="g2v-tray-name">Quả cân</span>
        </div>
      </div>`,
  });
  const dock = counter.querySelector('.g2v-dock');

  const q = sum ? `Cả ${nameA} và ${nameB} nặng bao nhiêu ki-lô-gam?`
    : m.say === 'less' ? `${cap(nameB)} nhẹ hơn ${nameA} mấy ki-lô-gam?` : `${cap(nameA)} nặng hơn ${nameB} mấy ki-lô-gam?`;
  speak(`${cap(nameA)} nặng ${m.A.kg} ki-lô-gam, ${nameB} nặng ${m.B.kg} ki-lô-gam. ${q}`, null, q);
  const bill = row(bagIcon(m.A.type, m.A.kg), cap(nameA), `<b>${m.A.kg} kg</b>`)
    + row(bagIcon(m.B.type, m.B.kg), cap(nameB), `<b>${m.B.kg} kg</b>`)
    + row('⚖️', sum ? 'Cả hai túi' : m.say === 'less' ? 'Nhẹ hơn' : 'Nặng hơn', Q, true);
  const formula = sum ? `${m.A.kg} kg + ${m.B.kg} kg = ${m.ans} kg` : `${m.A.kg} kg ${MINUS} ${m.B.kg} kg = ${m.ans} kg`;

  ask(bill, 'kg', (v, pad) => {
    pad.lock();
    const pick = splitKg(set, v);
    if (!v || !pick) { // không có quả cân nào như vậy: không cân được, báo luôn
      pad.lock('g3g-keypad-bad');
      showAnswer(`${m.ans} kg`);
      fail(`${sum ? 'Cả hai túi nặng' : m.say === 'less' ? `${cap(nameB)} nhẹ hơn` : `${cap(nameA)} nặng hơn`} <b>${m.ans} kg</b>.`, tipText());
      return afterCard();
    }
    speak('Cân lại cho chắc!', null, '⚖️ Cân lại cho chắc!');
    verify(v, pick);
  });

  function tipText() {
    return sum ? `Cả hai túi: cộng cân nặng hai túi: ${formula}.` : `Nặng hơn, nhẹ hơn mấy ki-lô-gam: lấy số lớn trừ số bé: ${formula}.`;
  }

  /**
   * Kiểm chứng như ngoài chợ. Cộng: hai túi lên đĩa trái, quả cân đúng bằng số bé gõ lên đĩa phải.
   * Trừ: túi nặng lên đĩa trái; túi nhẹ và quả cân bằng số bé gõ lên đĩa phải. Thăng bằng là bé đúng.
   */
  function verify(v, pick) {
    const left = [], right = [];
    const order = sum ? [['a', -1], ['b', -1]] : [['a', -1], ['b', 1]];
    order.forEach(([k, s]) => (s < 0 ? left : right).push(k === 'a' ? aIt : bIt));
    const ws = pick.map(i => wIt[i]);
    const landed = new Set();
    const grams = { a: m.A.kg * 1000, b: m.B.kg * 1000 };
    pick.forEach(i => { grams[`w${i}`] = set[i]; });
    const layout = (items) => panRow(items);
    const L = layout(left), R = layout([...right, ...ws]);
    const draw = () => {
      scale.setLeft(L.svg);
      scale.setRightSvg(R.svg);
      for (const s of [-1, 1]) scale.load(s).querySelectorAll('[data-k]').forEach(g => { g.style.opacity = landed.has(g.dataset.k) ? '' : '0'; });
    };
    const weigh = () => {
      const side = (items) => items.filter(it => landed.has(it.key)).reduce((s, it) => s + grams[it.key], 0);
      scale.setTilt(tiltOf(side([...right, ...ws]), side(left)), false);
    };
    draw();
    const steps = [...order.map(([k, s]) => ({ k, s, it: k === 'a' ? aIt : bIt, from: dock.querySelector(`[data-bag="${k}"] svg`) })),
      ...pick.map(i => ({ k: `w${i}`, s: 1, it: wIt[i], from: dock.querySelector(`[data-w="${i}"] svg`) }))];
    let t = 250;
    steps.forEach((st, idx) => {
      const at = (st.s < 0 ? L : R).at[st.k];
      const to = svgBoxOnScreen(scale.load(st.s), at.x, at.y, at.w, at.h);
      const fromBox = st.from?.getBoundingClientRect();
      setTimeout(() => { st.from?.closest('.g2v-w, .g2v-tray-bag')?.classList.add(st.k[0] === 'w' ? 'g2v-w-away' : 'g2v-tray-empty'); }, t);
      const end = flyOne(flyPic(st.it), fromBox, to, {
        delay: t, minMs: 520, maxMs: 850, spin: 8,
        onLand: () => {
          landed.add(st.k);
          draw();
          weigh();
          sfx.pop(Math.min(8, idx + 2));
          if (idx === steps.length - 1) setTimeout(() => judge(v), 900);
        },
      });
      t = Math.max(t + 480, end - 250);
    });
  }

  function judge(v) {
    showAnswer(`${m.ans} kg`);
    const what = sum ? 'Cả hai túi nặng' : m.say === 'less' ? `${cap(nameB)} nhẹ hơn ${nameA}` : `${cap(nameA)} nặng hơn ${nameB}`;
    if (v === m.ans) {
      scale.setTilt(0, true);
      speak(`Cân thăng bằng! Đúng rồi ${n.you} ơi!`, 'happy', `Cân thăng bằng! Đúng rồi ${n.you} ơi! 🎉`);
      api.succeed(`${what} <b>${m.ans} kg</b>. <b>${formula}</b>`);
    } else {
      const line = v < m.ans ? `Cân còn nghiêng, ${v} kg là chưa đủ!` : `Cân lệch sang bên quả cân, ${v} kg nhiều quá!`;
      speak(line, 'sad', line);
      api.fail(`${cap(n.you)} gõ <b>${v} kg</b>. ${what} <b>${m.ans} kg</b>.`, tipText());
    }
    afterCard();
  }
}
