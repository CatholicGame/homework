/**
 * 🏙️ Bản đồ dân số (Toán 4, Bài 10–14). Thiết kế: docs/lop_4/thiet-ke-tro-choi.md §4.6.
 * Bé làm phóng viên bản tin thời sự: bản đồ Việt Nam tự vẽ (34 tỉnh, thành, có Hoàng Sa, Trường Sa) bên trái,
 * màn hình bản tin ở giữa, chị phóng viên bên phải. Số dân thật theo Nghị quyết 202/2025/QH15 (art/city.js).
 *   Cấp 1 (Bài 10, 11, 12): read  — chọn cách đọc đúng số dân (bẫy: đổi chỗ hai chữ số, bỏ một chữ số)
 *                            write — nghe / đọc lời, gõ số lên bảng điện tử (số tự tách lớp, tô màu theo lớp)
 *                            digit — chữ số được tô thuộc hàng nào (có ngoặc lớp triệu / nghìn / đơn vị dưới số)
 *   Cấp 2 (Bài 14): compare — tỉnh nào đông / ít dân hơn; order — chạm 4 tỉnh theo thứ tự từ ít đến nhiều (hoặc ngược)
 *   Cấp 3 (Bài 13): round — làm tròn số dân đến hàng trăm nghìn trên tia số; viên bi lăn về mốc gần hơn
 * Nút "Xong" có từ đầu, đúng sai chỉ lộ sau Xong (thanh dân số mọc lên, bi lăn, chị phóng viên đọc bản tin).
 */

import { css, sfx } from '../grade4Tools/frame.js';
import { calmMotion } from '../grade3Games/fly.js';
import { npcPic } from '../grade3Games/npc.js';
import imgReporter from '../../assets/grade4-games/city/reporter.webp';
import { docSo } from '../../engine/numberWords.js';
import { stallMeta, levelMeta } from './catalog.js';
import { WITH_POP, SOURCE, MAP_W, MAP_H, mapBaseSvg, mapDotsSvg, pinsSvg, studioSvg, cityIcon } from './art/city.js';

// Chị Hà phóng viên: nhân vật duy nhất của trò (src/assets/phong_vien.png, Real-ESRGAN anime x4 làm nét). Chưa có mặt buồn: 'sad' dùng lại hình thường.
const EDITOR = { id: 'pv', name: 'Chị Hà phóng viên', me: 'chị', you: 'em', img: imgReporter, sad: imgReporter };
const PLACES = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn', 'triệu', 'chục triệu', 'trăm triệu'];
const CLASS_OF = (k) => (k < 3 ? 'đơn vị' : k < 6 ? 'nghìn' : 'triệu');
const CLASS_COLOR = ['#16A34A', '#2563EB', '#7C3AED']; // lớp đơn vị, nghìn, triệu (như bảng hàng của công cụ)
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const slow = (ms) => (calmMotion() ? Math.round(ms * 1.15) : ms);
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
/** 4952238 → "4 952 238" (khoảng trắng hẹp giữa các lớp như sách). */
export const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Số tô màu theo lớp; hi = vị trí chữ số được tô (0 = hàng đơn vị); brackets: ngoặc tên lớp dưới số. */
function numHtml(n, { hi = -1, brackets = false } = {}) {
  const s = String(n), L = s.length;
  const groups = [];
  for (let end = L; end > 0; end -= 3) groups.unshift([Math.max(0, end - 3), end]);
  return `<span class="g4c-num">${groups.map(([a, b]) => {
    const cls = Math.floor((L - b) / 3);
    const digits = [...s.slice(a, b)].map((d, i) => { const k = L - 1 - (a + i); return `<i class="${k === hi ? 'g4c-hi' : ''}" data-k="${k}">${d}</i>`; }).join('');
    return `<span class="g4c-grp" style="--c:${CLASS_COLOR[cls]}">${digits}${brackets ? `<small>lớp ${['đơn vị', 'nghìn', 'triệu'][cls]}</small>` : ''}</span>`;
  }).join('')}</span>`;
}

// ── Sinh đề ───────────────────────────────────────────────────────────────────────────────────────
function freshProvince(rng, history, pool = WITH_POP) {
  const used = new Set(history.flatMap(h => h.ids || []));
  const left = pool.filter(p => !used.has(p.id));
  return rng.pick(left.length ? left : pool);
}
const swapAdj = (n, i) => { const s = [...String(n)]; [s[i], s[i + 1]] = [s[i + 1], s[i]]; return Number(s.join('')); };

function genRead(rng, history) {
  const p = freshProvince(rng, history);
  const n = p.pop, s = String(n);
  const swaps = [];
  for (let i = 1; i < s.length - 1; i++) if (s[i] !== s[i + 1]) swaps.push(swapAdj(n, i));
  const alts = [rng.pick(swaps), Math.floor(n / 10)].filter(x => x !== n);
  const opts = rng.shuffle([n, ...alts].map(v => ({ v, text: docSo(v) })));
  return { kind: 'read', ids: [p.id], p, n, opts };
}

function genDigit(rng, history) {
  const p = freshProvince(rng, history);
  const s = String(p.pop), L = s.length;
  const unique = (k) => s.split('').filter(d => d === s[L - 1 - k]).length === 1;
  const cand = [];
  for (let k = 2; k < L; k++) if (unique(k) && s[L - 1 - k] !== '0') cand.push(k);
  const k = cand.length ? rng.pick(cand) : L - 1;
  const set = k >= L - 1 ? [k - 2, k - 1, k] : k <= 1 ? [0, 1, 2] : [k - 1, k, k + 1];
  return { kind: 'digit', ids: [p.id], p, n: p.pop, k, d: s[L - 1 - k], opts: set };
}

function genCompare(rng, history) {
  const a = freshProvince(rng, history, WITH_POP.filter(p => p.pop < 1e7));
  const same = WITH_POP.filter(p => p.id !== a.id && String(p.pop).length === String(a.pop).length && String(p.pop)[0] === String(a.pop)[0]);
  const b = rng.pick(same.length ? same : WITH_POP.filter(p => p.id !== a.id));
  const more = history.filter(h => h.kind === 'compare').length % 2 === 0;
  const pair = rng.shuffle([a, b]);
  return { kind: 'compare', ids: pair.map(p => p.id), cards: pair, more };
}

function genOrder(rng, history) {
  const asc = history.filter(h => h.kind === 'order').length % 2 === 0;
  const pool = rng.shuffle(WITH_POP);
  const pick = [];
  for (const p of pool) { if (pick.length < 4 && !pick.some(q => Math.abs(q.pop - p.pop) < 30000)) pick.push(p); }
  return { kind: 'order', ids: pick.map(p => p.id), cards: pick, asc };
}

function genRound(rng, history) {
  const p = freshProvince(rng, history);
  const n = p.pop, lo = Math.floor(n / 1e5) * 1e5, hi = lo + 1e5;
  const good = n - lo >= 5e4 ? hi : lo;
  let wrong = Math.round(n / 1e4) * 1e4;
  if (wrong === lo || wrong === hi) wrong = Math.round(n / 1e3) * 1e3;
  return { kind: 'round', ids: [p.id], p, n, lo, hi, good, opts: rng.shuffle([lo, hi, wrong]) };
}

const KINDS = { read: genRead, write: (rng, h) => { const p = freshProvince(rng, h); return { kind: 'write', ids: [p.id], p, n: p.pop }; }, digit: genDigit, compare: genCompare, order: genOrder, round: genRound };

export const CITY_LEVELS = [
  {
    ...levelMeta('city-1'), missions: 6, kinds: ['read', 'write', 'digit'],
    knowledge: 'đọc, viết số có nhiều chữ số, hàng và lớp, lớp triệu',
    ask: () => 'Đọc số dân các tỉnh, thành cho bản tin thời sự!',
    desc: 'Tách số thành từng lớp ba chữ số từ phải sang trái, rồi đọc từng lớp từ trái sang phải: lớp triệu, lớp nghìn, lớp đơn vị.',
    how: [['🗺️', 'Xem bản đồ'], ['🔢', 'Tách lớp'], ['📢', 'Đọc số']],
  },
  {
    ...levelMeta('city-2'), missions: 6, kinds: ['compare', 'order'],
    knowledge: 'so sánh các số có nhiều chữ số, sắp xếp thứ tự',
    ask: (n) => `Tỉnh nào đông dân hơn? Xếp hạng giúp ${n.me} nào!`,
    desc: 'Số nào nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so từng hàng từ trái sang phải.',
    how: [['👀', 'So từ trái'], ['👆', 'Chạm chọn'], ['📊', 'Xếp hạng']],
  },
  {
    ...levelMeta('city-3'), missions: 6, kinds: ['round'],
    knowledge: 'làm tròn số đến hàng trăm nghìn',
    ask: (n) => `Bản tin chỉ đọc số tròn trăm nghìn. Làm tròn giúp ${n.me}!`,
    desc: 'Nhìn chữ số hàng chục nghìn: bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
    how: [['📏', 'Xem tia số'], ['👀', 'Hàng chục nghìn'], ['⚪', 'Bi lăn']],
  },
];

let styled = false;

export const CITY_GAME = {
  ...stallMeta('city'),
  starPrefix: 'g4games',
  unitWord: 'bản tin',
  npcs: [EDITOR],
  levels: CITY_LEVELS,
  againText: 'Chơi lại (bản tin mới)',
  stallIcon: () => cityIcon(56),
  summaryText: (ok, total) => `Em đã làm đúng <strong>${ok}/${total}</strong> bản tin dân số.`,
  howTo: (level) => [...level.how.map(([pic, label]) => ({ pic, label })), { pic: '📺', label: 'Lên sóng' }],

  makeMission(rng, level, history) {
    const kind = level.kinds[history.length % level.kinds.length];
    return { idx: history.length, ...KINDS[kind](rng, history.filter(h => h.kind)) };
  },

  mountMission(stage, m, level, api) {
    injectCityStyles();
    const npc = EDITOR;
    if (import.meta.env.DEV) window.__g4city = m;
    const pins = m.kind === 'order' || m.kind === 'compare' ? m.cards : [m.p];
    stage.innerHTML = `
      <div class="g4c-scene animate-fadeIn">
        ${studioSvg()}
        <div class="g4c-mapb">
          <svg class="g4c-map" viewBox="-6 -6 ${MAP_W + 12} ${MAP_H + 12}" preserveAspectRatio="xMidYMid meet" aria-label="Bản đồ Việt Nam">
            ${mapBaseSvg()}${mapDotsSvg()}<g class="g4c-pins">${pinsSvg(pins)}</g>
          </svg>
          <div class="g4c-src">Số dân: ${SOURCE}</div>
        </div>
        <div class="g4c-main">
          <div class="g4c-screen"><div class="g4c-live">● BẢN TIN DÂN SỐ</div><div class="g4c-show"></div></div>
          <div class="g4c-work"></div>
        </div>
        <div class="g4c-side" data-result-host>
          <div class="g4c-npc">
            <div class="g4c-bubble"><b class="g4c-name">${npc.name}</b><span class="g4c-say">&nbsp;</span></div>
            <div class="g4c-npc-pic">${npcPic(npc, 'wait')}</div>
          </div>
          <div class="g4c-acts">
            ${m.kind === 'order' ? '<button type="button" class="g4c-small" data-act="reset">↺ Chọn lại</button>' : ''}
            <button type="button" class="g4c-done g4c-wait" data-act="done">✔ Xong</button>
          </div>
        </div>
      </div>`;
    const scene = stage.querySelector('.g4c-scene');
    const show = stage.querySelector('.g4c-show');
    const work = stage.querySelector('.g4c-work');
    const sayBox = stage.querySelector('.g4c-say');
    const picBox = stage.querySelector('.g4c-npc-pic');
    const doneBtn = stage.querySelector('[data-act="done"]');
    const speak = (text, mood, shown) => { sayBox.innerHTML = shown || text; if (mood) picBox.innerHTML = npcPic(npc, mood); api.say(text); };
    const blink = (els) => [...els].forEach(el => { el.classList.remove('g4c-blink'); void el.offsetWidth; el.classList.add('g4c-blink'); });

    // Bản đồ cao hết khung, rộng theo tỉ lệ (--mw).
    const mapb = stage.querySelector('.g4c-mapb');
    const fit = () => {
      if (!scene.isConnected) { ro.disconnect(); return; }
      const portrait = matchMedia('(orientation: portrait)').matches;
      const h = mapb.clientHeight;
      const src = stage.querySelector('.g4c-src').offsetHeight;
      const w = Math.min((h - src - 12) * ((MAP_W + 12) / (MAP_H + 12)) + 12, scene.clientWidth * (portrait ? 0.56 : 0.36));
      scene.style.setProperty('--mw', `${Math.max(120, Math.floor(w))}px`);
    };
    const ro = new ResizeObserver(fit);
    ro.observe(scene);
    fit();

    let ready = false, locked = false;
    const setReady = (on) => { ready = on; doneBtn.classList.toggle('g4c-wait', !on); };
    let notReady = () => {};
    let finish = async () => {};
    doneBtn.onclick = () => {
      if (locked) return;
      sfx.tap();
      if (!ready) { notReady(); return; }
      locked = true;
      stage.querySelectorAll('.g4c-acts button, .g4c-work button').forEach(b => { b.disabled = true; });
      finish();
    };
    const conclude = (ok, text, tip, line) => {
      m.ok = ok;
      speak(line, ok ? 'happy' : 'sad');
      if (ok) api.succeed(text); else api.fail(text, tip);
    };
    /** Một nhóm nút chọn (chạm là sáng, bấm Xong mới chấm). */
    const choices = (html, onPick) => {
      work.innerHTML = html;
      work.querySelectorAll('[data-opt]').forEach(b => {
        b.onclick = () => {
          if (locked) return;
          sfx.tap();
          work.querySelectorAll('[data-opt]').forEach(x => x.classList.toggle('g4c-on', x === b));
          onPick(b.dataset.opt);
          setReady(true);
        };
      });
      notReady = () => { speak('Em chọn một đáp án trước!', null, 'Chọn một đáp án trước!'); blink(work.querySelectorAll('[data-opt]')); };
    };
    const mark = (val, good) => work.querySelectorAll('[data-opt]').forEach(b => {
      if (b.dataset.opt === String(good)) b.classList.add('g4c-good');
      else if (b.dataset.opt === String(val)) b.classList.add('g4c-bad');
    });
    const steps = [];
    if (import.meta.env.DEV) window.__g3drill = { step: () => steps.shift()?.() };
    const head = (p) => `<div class="g4c-prov">${p.name}</div>`;

    // ════════ read: chọn cách đọc ════════
    if (m.kind === 'read') {
      show.innerHTML = `${head(m.p)}${numHtml(m.n)}<div class="g4c-capt">người</div>`;
      let pick = null;
      choices(m.opts.map((o, i) => `<button type="button" class="g4c-opt g4c-opt-long" data-opt="${o.v}"><b>${'ABC'[i]}</b><span>${cap(o.text)} người</span></button>`).join(''), (v) => { pick = +v; });
      speak(`Số dân của ${m.p.name} đọc là gì?`, null, `Số dân <b>${m.p.name}</b> đọc là gì?`);
      finish = async () => {
        mark(pick, m.n);
        const ok = pick === m.n;
        await sleep(slow(500));
        const line = `${m.p.name} có ${docSo(m.n)} người.`;
        if (ok) conclude(true, `Đúng! ${line}`, null, line);
        else conclude(false, `Số ${fmt(m.n)} đọc là: ${docSo(m.n)}.`, 'Tách lớp từ phải sang trái, mỗi lớp ba chữ số, rồi đọc từ lớp triệu.', line);
      };
      steps.push(() => work.querySelector(`[data-opt="${m.n}"]`).click(), () => doneBtn.click());
    }

    // ════════ write: gõ số theo lời đọc ════════
    if (m.kind === 'write') {
      let typed = '';
      const words = docSo(m.n);
      const led = () => {
        const v = typed ? numHtml(Number(typed) || 0).replace(/^<span class="g4c-num">/, '<span class="g4c-num g4c-led">') : '<span class="g4c-num g4c-led g4c-empty">?</span>';
        show.innerHTML = `${head(m.p)}<div class="g4c-words">“${cap(words)} người”</div>${typed && typed[0] === '0' ? '<span class="g4c-num g4c-led">0</span>' : v}`;
      };
      led();
      work.innerHTML = `<div class="g4c-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'del', 0].map(k => `<button type="button" class="g4c-key${k === 'del' ? ' g4c-key-del' : ''}" data-k="${k}">${k === 'del' ? '⌫' : k}</button>`).join('')}</div>`;
      work.querySelectorAll('[data-k]').forEach(b => {
        b.onclick = () => {
          if (locked) return;
          sfx.tap();
          const k = b.dataset.k;
          if (k === 'del') typed = typed.slice(0, -1);
          else if (typed.length < 9 && !(typed === '' && k === '0')) typed += k;
          led();
          setReady(typed.length > 0);
        };
      });
      speak(`Viết số: ${words}.`, null, `Nghe ${npc.me} đọc, gõ số dân lên bảng!`);
      notReady = () => { speak('Em gõ số lên bảng trước!', null, 'Gõ số lên bảng trước!'); blink(work.querySelectorAll('.g4c-key')); };
      finish = async () => {
        const ok = Number(typed) === m.n;
        show.querySelector('.g4c-led')?.classList.add(ok ? 'g4c-led-ok' : 'g4c-led-bad');
        await sleep(slow(500));
        if (!ok) show.insertAdjacentHTML('beforeend', `<div class="g4c-fix">Đúng là: ${numHtml(m.n)}</div>`);
        if (ok) conclude(true, `Đúng! ${m.p.name} có ${fmt(m.n)} người.`, null, 'Chính xác! Lên sóng thôi!');
        else conclude(false, `Số đúng là ${fmt(m.n)}.`, 'Viết từng lớp: lớp triệu, lớp nghìn, lớp đơn vị. Lớp nào đọc "không trăm" thì viết chữ số 0.', 'Ơ, số trên bảng chưa đúng rồi.');
      };
      steps.push(...[...String(m.n)].map(d => () => work.querySelector(`[data-k="${d}"]`).click()), () => doneBtn.click());
    }

    // ════════ digit: chữ số thuộc hàng nào ════════
    if (m.kind === 'digit') {
      show.innerHTML = `${head(m.p)}${numHtml(m.n, { hi: m.k, brackets: true })}`;
      let pick = null;
      choices(m.opts.map(k => `<button type="button" class="g4c-opt" data-opt="${k}">Hàng ${PLACES[k]}</button>`).join(''), (v) => { pick = +v; });
      speak(`Trong số dân của ${m.p.name}, chữ số ${m.d} thuộc hàng nào?`, null, `Chữ số <b>${m.d}</b> thuộc hàng nào?`);
      finish = async () => {
        mark(pick, m.k);
        const ok = pick === m.k;
        await sleep(slow(500));
        const fact = `Chữ số ${m.d} ở hàng ${PLACES[m.k]}, lớp ${CLASS_OF(m.k)}.`;
        if (ok) conclude(true, `Đúng! ${fact}`, null, 'Đúng rồi! Em nắm hàng và lớp rất chắc.');
        else conclude(false, fact, 'Đếm từ phải sang trái: đơn vị, chục, trăm (lớp đơn vị); nghìn, chục nghìn, trăm nghìn (lớp nghìn); triệu… (lớp triệu).', 'Ơ, chưa đúng hàng rồi.');
      };
      steps.push(() => work.querySelector(`[data-opt="${m.k}"]`).click(), () => doneBtn.click());
    }

    // ════════ compare, order: thẻ tỉnh có số dân, thanh dân số mọc lên sau Xong ════════
    if (m.kind === 'compare' || m.kind === 'order') {
      const max = Math.max(...m.cards.map(c => c.pop));
      const card = (p) => `<button type="button" class="g4c-card" data-id="${p.id}"><span class="g4c-rank"></span>
        <span class="g4c-card-name">${p.name}</span>${numHtml(p.pop)}<span class="g4c-bar"><i style="--w:${(p.pop / max * 100).toFixed(1)}%"></i></span></button>`;
      work.innerHTML = `<div class="g4c-cards g4c-cards-${m.cards.length}">${m.cards.map(card).join('')}</div>`;
      const cards = [...work.querySelectorAll('.g4c-card')];
      let picks = [];
      const sync = () => {
        cards.forEach(c => {
          const i = picks.indexOf(c.dataset.id);
          c.classList.toggle('g4c-on', i >= 0);
          c.querySelector('.g4c-rank').textContent = m.kind === 'order' && i >= 0 ? i + 1 : '';
        });
        setReady(m.kind === 'compare' ? picks.length === 1 : picks.length === m.cards.length);
      };
      cards.forEach(c => {
        c.onclick = () => {
          if (locked) return;
          sfx.tap();
          const id = c.dataset.id, i = picks.indexOf(id);
          if (m.kind === 'compare') picks = [id];
          else if (i >= 0) picks = picks.slice(0, i); else picks.push(id);
          sync();
        };
      });
      stage.querySelector('[data-act="reset"]')?.addEventListener('click', () => { if (!locked) { sfx.tap(); picks = []; sync(); } });
      const right = [...m.cards].sort((a, b) => (m.kind === 'order' && !m.asc ? b.pop - a.pop : a.pop - b.pop)).map(p => p.id);
      if (m.kind === 'compare') {
        const q = m.more ? 'đông dân hơn' : 'ít dân hơn';
        show.innerHTML = `<div class="g4c-q">Tỉnh, thành nào <b>${q}</b>?</div>`;
        speak(`Tỉnh, thành nào ${q}? Chạm chọn!`, null, `Nơi nào <b>${q}</b>?`);
        notReady = () => { speak('Em chạm chọn một tỉnh trước!', null, 'Chạm chọn một tỉnh!'); blink(cards); };
      } else {
        const q = m.asc ? 'từ ít dân đến nhiều dân' : 'từ nhiều dân đến ít dân';
        show.innerHTML = `<div class="g4c-q">Xếp hạng <b>${q}</b>: chạm lần lượt 1, 2, 3, 4.</div>`;
        speak(`Xếp các tỉnh, thành ${q}. Chạm lần lượt từng tỉnh!`, null, `Xếp <b>${q}</b>!`);
        notReady = () => { speak('Em chạm đủ bốn tỉnh theo thứ tự trước!', null, 'Chạm đủ <b>4</b> tỉnh theo thứ tự!'); blink(cards.filter(c => !picks.includes(c.dataset.id))); };
      }
      finish = async () => {
        scene.classList.add('g4c-bars-on');
        sfx.swish();
        await sleep(slow(900));
        const good = m.kind === 'compare' ? (m.more ? right[1] : right[0]) : null;
        let ok;
        if (m.kind === 'compare') {
          ok = picks[0] === good;
          cards.forEach(c => { if (c.dataset.id === good) c.classList.add('g4c-good'); else if (c.dataset.id === picks[0]) c.classList.add('g4c-bad'); });
        } else {
          ok = picks.every((id, i) => id === right[i]);
          cards.forEach(c => {
            const r = right.indexOf(c.dataset.id), mine = picks.indexOf(c.dataset.id);
            c.querySelector('.g4c-rank').textContent = r + 1;
            c.classList.add(r === mine ? 'g4c-good' : 'g4c-bad');
          });
        }
        await sleep(slow(400));
        if (m.kind === 'compare') {
          const [a, b] = right.map(id => m.cards.find(p => p.id === id)); // a ít, b nhiều
          const line = `${fmt(a.pop)} < ${fmt(b.pop)}`;
          if (ok) conclude(true, `Đúng! ${line}. ${(m.more ? b : a).name} ${m.more ? 'đông' : 'ít'} dân hơn.`, null, 'Đúng rồi! So từ hàng cao nhất là ra.');
          else conclude(false, `${line}, nên ${(m.more ? b : a).name} ${m.more ? 'đông' : 'ít'} dân hơn.`, 'Hai số cùng số chữ số: so từng cặp chữ số từ trái sang phải, cặp đầu tiên khác nhau quyết định.', 'Ơ, nhìn thanh dân số nè!');
        } else {
          const names = right.map(id => m.cards.find(p => p.id === id).name).join(', ');
          if (ok) conclude(true, `Đúng! Thứ tự: ${names}.`, null, 'Bảng xếp hạng chính xác!');
          else conclude(false, `Thứ tự đúng: ${names}.`, 'So từng cặp số từ trái sang phải, tìm số bé nhất (hoặc lớn nhất) trước rồi tới số tiếp theo.', 'Ơ, bảng xếp hạng chưa đúng rồi.');
        }
      };
      if (m.kind === 'compare') steps.push(() => work.querySelector(`[data-id="${m.more ? right[1] : right[0]}"]`).click(), () => doneBtn.click());
      else steps.push(...right.map(id => () => work.querySelector(`[data-id="${id}"]`).click()), () => doneBtn.click());
    }

    // ════════ round: làm tròn đến hàng trăm nghìn trên tia số ════════
    if (m.kind === 'round') {
      show.innerHTML = `${head(m.p)}${numHtml(m.n, { hi: 4 })}<div class="g4c-capt">người · làm tròn đến hàng <b>trăm nghìn</b></div>`;
      const W = 1000, x0 = 120, x1 = 880, X = (v) => x0 + ((v - m.lo) / 1e5) * (x1 - x0);
      let ticks = '';
      for (let i = 0; i <= 10; i++) {
        const x = x0 + i * (x1 - x0) / 10, big = i === 0 || i === 10, mid = i === 5;
        ticks += `<line x1="${x}" y1="${big ? 70 : mid ? 78 : 86}" x2="${x}" y2="${big ? 122 : mid ? 114 : 106}" stroke="#334155" stroke-width="${big ? 5 : 3}"/>`;
      }
      const bx = X(m.n);
      work.innerHTML = `
        <svg class="g4c-line" viewBox="0 0 ${W} 190" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g class="g4c-tilt"><line x1="${x0 - 30}" y1="96" x2="${x1 + 30}" y2="96" stroke="#334155" stroke-width="6" stroke-linecap="round"/>${ticks}
            <circle class="g4c-ball" cx="${bx}" cy="72" r="18" fill="#F97316" stroke="#3F3A40" stroke-width="3"/>
            <path d="M${bx} 40 V54" stroke="#F97316" stroke-width="4"/><text x="${bx}" y="32" class="g4c-ln-val" text-anchor="middle">${fmt(m.n)}</text></g>
          <text x="${x0}" y="160" class="g4c-ln-end" text-anchor="middle">${fmt(m.lo)}</text>
          <text x="${x1}" y="160" class="g4c-ln-end" text-anchor="middle">${fmt(m.hi)}</text>
          <text x="${(x0 + x1) / 2}" y="150" class="g4c-ln-mid" text-anchor="middle">${fmt(m.lo + 5e4)}</text>
        </svg>
        <div class="g4c-opts3">${m.opts.map(v => `<button type="button" class="g4c-opt" data-opt="${v}">${fmt(v)}</button>`).join('')}</div>`;
      const optsHost = work.querySelector('.g4c-opts3');
      let pick = null;
      optsHost.querySelectorAll('[data-opt]').forEach(b => {
        b.onclick = () => {
          if (locked) return;
          sfx.tap();
          optsHost.querySelectorAll('[data-opt]').forEach(x => x.classList.toggle('g4c-on', x === b));
          pick = +b.dataset.opt;
          setReady(true);
        };
      });
      notReady = () => { speak('Em chọn một số tròn trăm nghìn trước!', null, 'Chọn một đáp án trước!'); blink(optsHost.querySelectorAll('[data-opt]')); };
      speak(`Làm tròn số dân của ${m.p.name} đến hàng trăm nghìn!`, null, `Làm tròn số dân <b>${m.p.name}</b> đến hàng trăm nghìn!`);
      finish = async () => {
        // Tia số nghiêng về mốc gần hơn, viên bi lăn về mốc đó.
        const up = m.good === m.hi;
        const tilt = work.querySelector('.g4c-tilt'), ball = work.querySelector('.g4c-ball');
        tilt.style.transformOrigin = '500px 96px';
        tilt.style.transition = `transform ${slow(500)}ms ease`;
        tilt.style.transform = `rotate(${up ? 4 : -4}deg)`;
        await sleep(slow(550));
        const to = up ? x1 : x0;
        await ball.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${to - bx}px)` }], { duration: slow(900), easing: 'ease-in', fill: 'forwards' }).finished;
        sfx.pop(1);
        optsHost.querySelectorAll('[data-opt]').forEach(b => {
          if (+b.dataset.opt === m.good) b.classList.add('g4c-good'); else if (+b.dataset.opt === pick) b.classList.add('g4c-bad');
        });
        const d = String(m.n).padStart(7, '0').slice(-5, -4);
        const line = `${m.p.name} có khoảng ${docSo(m.good)} người.`;
        if (pick === m.good) conclude(true, `Đúng! ${fmt(m.n)} làm tròn đến hàng trăm nghìn là ${fmt(m.good)}.`, null, line);
        else conclude(false, `${fmt(m.n)} làm tròn đến hàng trăm nghìn là ${fmt(m.good)}.`, `Chữ số hàng chục nghìn là ${d}: ${+d < 5 ? 'bé hơn 5 nên làm tròn xuống' : 'từ 5 trở lên nên làm tròn lên'}.`, 'Ơ, viên bi lăn về phía kia rồi.');
      };
      steps.push(() => optsHost.querySelector(`[data-opt="${m.good}"]`).click(), () => doneBtn.click());
    }
  },
};

function injectCityStyles() {
  if (styled) return;
  styled = true;
  css('g4-city', `
    .g4c-scene { position: relative; flex: 1; min-height: 0; display: grid; grid-template-columns: var(--mw, 26%) minmax(0, 1fr) clamp(12rem, 22%, 22rem); grid-template-rows: minmax(0, 1fr);
      gap: 0.6rem; padding: 0.55rem; border-radius: 1rem; overflow: hidden; background: linear-gradient(180deg, #93C5FD 0%, #DBEAFE 70%, #334155 70%); font-family: 'Baloo 2', Quicksand, sans-serif; }
    .g4c-back { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .g4c-mapb { position: relative; z-index: 1; min-height: 0; min-width: 0; display: flex; flex-direction: column; background: #fff; border-radius: 1.1rem; padding: 0.3rem; box-shadow: 0 6px 0 rgba(30, 58, 95, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15); }
    .g4c-map { flex: 1; min-height: 0; width: 100%; }
    .g4c-src { flex: none; text-align: center; font-size: 0.78rem; font-weight: 700; color: #64748B; line-height: 1.2; padding: 0.1rem 0.2rem 0.15rem; }
    .g4c-cap { font-size: 15px; font-weight: 800; fill: #B91C1C; paint-order: stroke; stroke: #fff; stroke-width: 4px; }
    .g4c-pinlab { font-size: 17px; font-weight: 800; fill: #1E293B; }
    .g4c-isl { font-size: 14px; font-weight: 800; fill: #0F766E; }
    .g4c-isl2 { font-size: 12px; font-weight: 700; fill: #0F766E; }
    .g4c-sea { font-size: 17px; font-weight: 800; fill: #0369A1; letter-spacing: 2px; opacity: 0.7; }
    .g4c-pulse { animation: g4cPulse 1.4s ease-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes g4cPulse { from { transform: scale(0.6); opacity: 1; } to { transform: scale(1.8); opacity: 0; } }
    .g4c-main { position: relative; z-index: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column; gap: 0.5rem; background: #fff; border-radius: 1.1rem; padding: 0.6rem; container-type: size;
      box-shadow: 0 6px 0 rgba(30, 58, 95, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15); }
    .g4c-screen { flex: none; min-height: 34cqh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2rem; background: linear-gradient(180deg, #1E3A8A, #172554); border: 6px solid #0F172A;
      border-radius: 1rem; color: #fff; padding: 1.6rem 0.8rem 0.8rem; position: relative; text-align: center; }
    @container (max-height: 330px) { .g4c-live { display: none; } }
    .g4c-live { position: absolute; top: 0.4rem; left: 0.7rem; font-size: max(0.75rem, 2.4cqh); font-weight: 800; color: #FCA5A5; letter-spacing: 1px; }
    .g4c-show { display: flex; flex-direction: column; align-items: center; gap: 0.15rem; width: 100%; }
    .g4c-prov { font-size: clamp(1rem, min(4.2cqw, 6cqh), 2rem); font-weight: 800; color: #FDE68A; line-height: 1.1; }
    .g4c-num { display: inline-flex; gap: 0.45em; font-weight: 800; font-size: clamp(1.6rem, min(8.5cqw, 12cqh), 4.4rem); line-height: 1; font-variant-numeric: tabular-nums; }
    .g4c-grp { display: inline-flex; flex-direction: column; align-items: center; color: var(--c); }
    .g4c-screen .g4c-grp { color: color-mix(in srgb, var(--c) 45%, #fff); }
    .g4c-grp > i { font-style: normal; display: inline-block; padding: 0 0.02em; }
    .g4c-grp { flex-direction: row; flex-wrap: wrap; justify-content: center; }
    .g4c-grp small { flex-basis: 100%; font-size: 0.28em; font-weight: 800; border-top: 3px solid currentColor; margin-top: 0.15em; padding-top: 0.1em; text-align: center; }
    .g4c-hi { background: #F97316; color: #fff !important; border-radius: 0.15em; box-shadow: 0 0 0 3px #FDBA74; }
    .g4c-capt { font-size: clamp(0.9rem, min(3cqw, 4.4cqh), 1.4rem); font-weight: 700; color: #BFDBFE; }
    .g4c-capt b { color: #FDE68A; }
    .g4c-words { font-size: clamp(0.95rem, min(3.4cqw, 5cqh), 1.6rem); font-weight: 700; color: #E0F2FE; line-height: 1.25; max-width: 95%; }
    .g4c-led { background: #0F172A; border-radius: 0.6rem; padding: 0.12em 0.4em; min-width: 5em; justify-content: center; letter-spacing: 0.04em; }
    .g4c-empty { color: #475569; }
    .g4c-led-ok { box-shadow: 0 0 0 4px #4ADE80; }
    .g4c-led-bad { box-shadow: 0 0 0 4px #F87171; }
    .g4c-fix { font-weight: 800; color: #86EFAC; font-size: clamp(0.9rem, 3cqh, 1.2rem); display: flex; align-items: center; gap: 0.5rem; }
    .g4c-fix .g4c-num { font-size: 1.6em; }
    .g4c-q { font-size: clamp(1.1rem, min(4.4cqw, 7cqh), 2.2rem); font-weight: 800; line-height: 1.25; }
    .g4c-q b { color: #FDE68A; }
    .g4c-work { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; gap: 0.75rem; justify-content: center; padding-bottom: 6px; }
    /* Nút chọn, thẻ tỉnh, phím số: viền xanh rõ trên bảng trắng, nền sáng dần xuống, bóng 3D liền khối. */
    .g4c-opt, .g4c-card, .g4c-key { border: 3px solid #93C5FD; background: linear-gradient(180deg, #FFFFFF, #E0F2FE); box-shadow: 0 6px 0 #3B82F6, 0 9px 14px rgba(37, 99, 235, 0.18); transition: transform .08s, box-shadow .08s; }
    .g4c-opt { flex: 1 1 0; min-height: 0; display: flex; align-items: center; justify-content: center; gap: 0.6rem; border-radius: 1.1rem; color: #1E3A8A; font-weight: 800; cursor: pointer;
      font-size: clamp(1rem, min(3.6cqw, 6cqh), 1.9rem); padding: 0.3rem 0.8rem; line-height: 1.2; font-family: inherit; }
    .g4c-opt-long { justify-content: flex-start; gap: 0.8em; text-align: left; padding: 0.4rem 1.1rem 0.4rem 0.8rem; font-size: clamp(1rem, min(3cqw, 5.4cqh), 1.75rem); line-height: 1.3; }
    .g4c-opt-long span { text-wrap: balance; }
    .g4c-opt-long b { flex: none; width: 2em; height: 2em; border-radius: 50%; display: grid; place-items: center; background: linear-gradient(180deg, #3B82F6, #1D4ED8); color: #fff; font-weight: 900; box-shadow: 0 3px 0 #1E3A8A; }
    .g4c-opt:active, .g4c-card:active, .g4c-key:active { transform: translateY(4px); box-shadow: 0 2px 0 #3B82F6, 0 3px 6px rgba(37, 99, 235, 0.18); }
    .g4c-on { background: linear-gradient(180deg, #FFFBEB, #FDE68A) !important; border-color: #F59E0B !important; box-shadow: 0 6px 0 #D97706, 0 9px 14px rgba(217, 119, 6, 0.25) !important; }
    .g4c-good { background: linear-gradient(180deg, #F0FDF4, #BBF7D0) !important; border-color: #22C55E !important; box-shadow: 0 6px 0 #15803D !important; }
    .g4c-bad { background: linear-gradient(180deg, #FFF1F2, #FECACA) !important; border-color: #EF4444 !important; box-shadow: 0 6px 0 #B91C1C !important; }
    .g4c-on.g4c-opt-long b { background: linear-gradient(180deg, #FBBF24, #D97706); box-shadow: 0 3px 0 #92400E; }
    .g4c-good.g4c-opt-long b { background: linear-gradient(180deg, #4ADE80, #16A34A); box-shadow: 0 3px 0 #14532D; }
    .g4c-bad.g4c-opt-long b { background: linear-gradient(180deg, #F87171, #DC2626); box-shadow: 0 3px 0 #7F1D1D; }
    .g4c-opts3 { flex: 0 0 28cqh; display: flex; gap: 0.6rem; }
    .g4c-line { flex: 1 1 0; min-height: 0; width: 100%; }
    .g4c-ln-val { font-size: 30px; font-weight: 800; fill: #C2410C; }
    .g4c-ln-end { font-size: 32px; font-weight: 800; fill: #1E293B; }
    .g4c-ln-mid { font-size: 22px; font-weight: 700; fill: #64748B; }
    .g4c-pad { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr); gap: 0.6rem; max-width: 34rem; width: 100%; align-self: center; }
    .g4c-key { border-radius: 0.9rem; font-weight: 800; font-size: clamp(1.2rem, min(5cqw, 8cqh), 2.4rem); color: #1E3A8A; cursor: pointer; font-family: inherit; }
    .g4c-key-del { background: linear-gradient(180deg, #FFFFFF, #FFE4E6); border-color: #FDA4AF; color: #BE123C; box-shadow: 0 6px 0 #E11D48, 0 9px 14px rgba(225, 29, 72, 0.15); }
    .g4c-cards { flex: 1 1 0; min-height: 0; display: grid; gap: 0.75rem; }
    .g4c-cards-2 { grid-template-columns: 1fr 1fr; }
    .g4c-cards-4 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
    .g4c-card { position: relative; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; border-radius: 1.1rem; cursor: pointer;
      padding: 0.4rem 0.6rem; font-family: inherit; }
    .g4c-card .g4c-num { font-size: clamp(1.2rem, min(4.6cqw, 7.5cqh), 2.8rem); }
    .g4c-cards-2 .g4c-card .g4c-num { font-size: clamp(1.4rem, min(7.4cqw, 12cqh), 4.4rem); }
    .g4c-cards-2 .g4c-card-name { font-size: clamp(1.1rem, min(5cqw, 7cqh), 2.4rem); }
    .g4c-card-name { font-weight: 800; color: #1E293B; font-size: clamp(1rem, min(3.4cqw, 5.4cqh), 1.8rem); line-height: 1.1; }
    .g4c-rank { position: absolute; top: 0.35rem; left: 0.45rem; min-width: 1.8em; height: 1.8em; border-radius: 50%; display: grid; place-items: center; font-weight: 900; color: #fff; background: #F97316; font-size: clamp(0.9rem, 4cqh, 1.4rem); }
    .g4c-rank:empty { visibility: hidden; }
    .g4c-good .g4c-rank { background: #16A34A; }
    .g4c-bad .g4c-rank { background: #DC2626; }
    .g4c-bar { width: 90%; height: 0.7rem; border-radius: 999px; background: #E2E8F0; overflow: hidden; visibility: hidden; }
    .g4c-bar i { display: block; height: 100%; width: var(--w); background: linear-gradient(90deg, #38BDF8, #2563EB); border-radius: 999px; transform-origin: left; transform: scaleX(0); transition: transform .8s ease-out; }
    .g4c-bars-on .g4c-bar { visibility: visible; }
    .g4c-bars-on .g4c-bar i { transform: scaleX(1); }
    .g4c-side { position: relative; z-index: 2; min-height: 0; display: flex; flex-direction: column; gap: 0.5rem; container-type: size; }
    .g4c-npc { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; }
    .g4c-bubble { position: relative; flex: none; background: #fff; border-radius: 1rem; padding: 0.45rem 0.7rem 0.55rem; color: #1E293B; font-weight: 700; line-height: 1.3; font-size: clamp(0.85rem, min(5.6cqi, 4.4cqh), 1.4rem); min-height: 3.9em; box-shadow: 0 4px 0 rgba(30, 58, 95, 0.15); }
    .g4c-bubble::after { content: ''; position: absolute; left: 50%; bottom: -10px; border: 10px solid transparent; border-bottom: 0; border-top-color: #fff; transform: translateX(-50%); }
    .g4c-name { display: block; font-size: 0.72em; color: #0369A1; }
    .g4c-say b { color: #DC2626; }
    .g4c-npc-pic { flex: 1 1 0; min-height: 0; display: flex; justify-content: center; align-items: flex-end; padding-top: 0.6rem; }
    .g4c-npc-pic img { height: 100%; width: auto; max-width: 100%; object-fit: contain; object-position: bottom; }
    .g4c-acts { flex: none; display: flex; flex-direction: column; gap: 0.45rem; }
    .g3g-has-result .g4c-acts { visibility: hidden; }
    .g4c-small { align-self: center; border: 0; border-radius: 999px; background: #fff; color: #334155; font-weight: 800; cursor: pointer; padding: 0.3rem 1.1rem; font-size: clamp(0.9rem, 4.6cqi, 1.2rem); box-shadow: 0 4px 0 #CBD5E1; font-family: inherit; }
    .g4c-done { width: 100%; border: 4px solid #fff; border-radius: 1.1rem; background: linear-gradient(180deg, #4ADE80, #22C55E); color: #fff; font-weight: 800; cursor: pointer; font-family: inherit;
      font-size: clamp(1.05rem, min(7cqi, 7cqh), 1.8rem); padding: clamp(0.25rem, 2cqh, 0.7rem) 0.8rem; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); box-shadow: 0 6px 0 #15803D; }
    .g4c-done.g4c-wait { background: linear-gradient(180deg, #CBD5E1, #94A3B8); box-shadow: 0 6px 0 #64748B; }
    .g4c-blink { animation: g4cBlink .5s ease-in-out 3; }
    @keyframes g4cBlink { 50% { filter: drop-shadow(0 0 10px #F97316) brightness(1.1); transform: scale(1.04); } }
    .g4c-side > .g3g-result { position: absolute; z-index: 5; left: 0; right: 0; bottom: 0; max-height: 100%; overflow-y: auto; border-width: 3px; border-radius: 1.2rem; text-align: center; align-items: stretch;
      box-shadow: 0 6px 0 rgba(0, 0, 0, 0.1), 0 16px 36px rgba(0, 0, 0, 0.25); }
    .g4c-side > .g3g-result .g3g-result-text { font-size: clamp(1rem, 5.4cqi, 1.35rem); }
    .g4c-side > .g3g-result .g3g-tip { font-size: clamp(0.9rem, 4.8cqi, 1.2rem); }
    .g4c-side > .g3g-result .g3g-btn { white-space: normal; font-size: clamp(1rem, 5.6cqi, 1.4rem); }
    @media (orientation: portrait) {
      /* Dọc: hàng trên bản đồ + chị phóng viên, hàng dưới màn hình bản tin rộng hết khung. */
      .g4c-scene { grid-template-columns: var(--mw, 50%) minmax(0, 1fr); grid-template-rows: clamp(15rem, 40%, 30rem) minmax(0, 1fr); }
      .g4c-mapb { grid-row: 1; grid-column: 1; }
      .g4c-side { grid-row: 1; grid-column: 2; }
      .g4c-main { grid-row: 2; grid-column: 1 / span 2; }
    }
  `);
}
