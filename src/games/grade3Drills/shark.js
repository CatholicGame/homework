/**
 * 🦈 Săn cá mập: luyện tính nhanh cộng, trừ, nhân, chia (lấy ý tưởng trò luyện gõ phím bắn cá mập).
 * Thợ lặn treo dây giữa biển, cá mập mang phép tính bơi từ phải sang. Bé gõ kết quả (bàn phím trên màn hình hoặc bàn phím
 * máy): đúng kết quả của con nào thì tia điện bắn trúng con đó, cá thành bộ xương chìm xuống. Tính chậm, cá bơi tới đớp
 * thợ lặn (hiện phép tính kèm kết quả đúng và đọc to).
 * Một lượt = một đàn cá (level.count con). Thợ lặn có LIVES mạng mỗi đàn, mỗi lần bị đớp mất một mạng; hết mạng thì thợ lặn
 * chết (đứt dây, chìm xuống cát), cá còn lại bơi đi, lượt thua. Còn mạng tới hết đàn là đạt. Gõ sai không mất mạng.
 *
 * Lớp 1 (thẻ riêng grade1Shark.js), Luyện Tính lớp 2, 3, 4, 5. Lớp 4, 5 chỉ dùng số tới ba chữ số (tính nhẩm nhanh).
 * Mẫu dùng chung: sharkGame(meta, levels), mỗi cấp chỉ cần pool() → danh sách phép tính (add / sub / mul / div).
 * Đàn cá không có hai kết quả trùng nhau hay kết quả này là phần đầu của kết quả kia (4 và 40), nên gõ xong là bắn ngay
 * không cần bấm OK. Phép hay để cá đớp được ghi vào sổ phép hay sai (kit.js noteFact), ra lại nhiều hơn.
 *
 * Bố cục (không đổi trong lượt): ngang = biển | cột bàn phím; dọc = biển / bàn phím 2 hàng. Thẻ kết quả đè giữa biển
 * (lúc đó biển đã trống).
 */

import imgChuHai from '../../assets/grade3-games/npc/chu-hai.webp';
import { injectGameStyles } from '../grade3Games/styles.js';
import { sfx, calmMotion, sleep, how, weightedPick, loadWeak, noteFact, MINUS } from './kit.js';
import { sharkSvg, bonesSvg, MINI_SHARK, DIVER, SEA, HEART } from './sharkArt.js';

// ── Phép tính ─────────────────────────────────────────────────────────────────────────────────────────
const OPW = { '+': 'cộng', [MINUS]: 'trừ', '×': 'nhân', ':': 'chia' };
const fact = (a, op, b) => {
  const ans = op === '+' ? a + b : op === MINUS ? a - b : op === '×' ? a * b : a / b;
  const id = op === '×' ? `${a}x${b}` : op === ':' ? `${a}:${b}` : `${a}${op === '+' ? '+' : '-'}${b}`;
  return { id, text: `${a} ${op} ${b}`, ans, say: `${a} ${OPW[op]} ${b} bằng ${ans}.` };
};
export const add = (a, b) => fact(a, '+', b);
export const sub = (a, b) => fact(a, MINUS, b);
export const mul = (a, b) => fact(a, '×', b);
export const div = (p, b) => fact(p, ':', b);

const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
/** Bảng nhân / chia các bảng ts (thừa số thứ hai 2..10). */
export const tablePool = (ts, kinds) => ts.flatMap(t => range(2, 10).flatMap(b => kinds.map(k => (k === 'mul' ? mul(t, b) : div(t * b, t)))));
/** Cộng, trừ qua 10 (bảng cộng, bảng trừ lớp 2). */
export const crossPool = (kinds) => range(2, 9).flatMap(a => range(2, 9).filter(b => a + b > 10)
  .flatMap(b => kinds.map(k => (k === 'add' ? add(a, b) : sub(a + b, b)))));
/** Số có hai chữ số cộng / trừ số có một chữ số, có nhớ (47 + 8, 52 − 7). */
export const carryPool = () => range(11, 89).flatMap(a => range(3, 9).flatMap(b => [
  ...(a % 10 + b >= 10 && a + b < 100 ? [add(a, b)] : []),
  ...(a % 10 < b && a > 20 ? [sub(a, b)] : []),
])).filter((_, i) => i % 3 === 0);

/** Cộng, trừ trong phạm vi max (lớp 1: 3 + 4, 9 − 5). */
export const withinPool = (max, kinds) => range(0, max).flatMap(a => range(1, max).flatMap(b => [
  ...(kinds.includes('add') && a >= 1 && a + b <= max ? [add(a, b)] : []),
  ...(kinds.includes('sub') && a >= 2 && b <= a ? [sub(a, b)] : []),
]));
/** Số có hai chữ số cộng / trừ số có một chữ số, không nhớ (lớp 1: 14 + 3, 37 − 5). lo, hi: số thứ nhất. */
export const noCarryPool = (lo, hi) => range(lo, hi).flatMap(a => range(1, 9).flatMap(b => [
  ...(a % 10 + b <= 9 ? [add(a, b)] : []),
  ...(b <= a % 10 ? [sub(a, b)] : []),
]));
/** Cộng, trừ số tròn chục (lớp 1: 30 + 40, 90 − 60). */
export const tensPool = () => range(1, 9).flatMap(a => range(1, 9).flatMap(b => [
  ...(a + b <= 10 ? [add(a * 10, b * 10)] : []),
  ...(b < a ? [sub(a * 10, b * 10)] : []),
]));
// ── Lớp 4, 5: các số tới ba chữ số, kết quả tới 999 (tính nhẩm nhanh, không phải đặt tính) ──
const max3 = (fs) => fs.filter(f => Number.isInteger(f.ans) && f.ans <= 999 && f.text.split(' ').every(t => !/^\d+$/.test(t) || Number(t) <= 999));
/** 450 + 300, 820 − 60: số tròn chục cộng / trừ số tròn trăm hoặc tròn chục. */
export const roundAddPool = () => max3(range(11, 89).flatMap(a => range(1, 9).flatMap(b => [add(a * 10, b * 100), add(a * 10, b * 10), ...(a * 10 > b * 100 ? [sub(a * 10, b * 100)] : []), sub(a * 10, b * 10)])));
/** Nhân, chia nhẩm với 10, 100 (35 × 10, 7 × 100, 450 : 10, 600 : 100). */
export const tenPool = () => max3([...range(2, 99).flatMap(a => [mul(a, 10), div(a * 10, 10)]), ...range(2, 9).flatMap(a => [mul(a, 100), div(a * 100, 100)])]);
/** Nhân nhẩm số có hai chữ số / số tròn chục với số có một chữ số (24 × 4, 40 × 7, 120 × 3). */
export const mulOnePool = () => max3([...range(11, 49).flatMap(a => range(2, 5).map(b => mul(a, b))), ...range(2, 30).flatMap(a => range(2, 9).map(b => mul(a * 10, b)))]);
/** Chia nhẩm, phép ngược của mulOnePool (96 : 4, 280 : 7). */
export const divOnePool = () => max3(mulOnePool().map(f => { const [x, , y] = f.text.split(' '); return div(Number(x) * Number(y), Number(y)); }));
/** Nhân, chia số tròn chục, tròn trăm (40 × 7, 30 × 20, 200 × 4, 280 : 7, 280 : 40, 600 : 20). */
export const roundMulPool = (kinds) => max3(range(1, 9).flatMap(a => range(2, 9).flatMap(b => [[a * 10, b], [a * 10, b * 10], [a * 100, b]]))
  .filter(([x, y]) => x > 10 || y > 9)
  .flatMap(([x, y]) => [
    ...(kinds.includes('mul') ? [mul(x, y)] : []),
    ...(kinds.includes('div') ? [div(x * y, y), div(x * y, x)] : []),
  ]));

/** Kết quả này là phần đầu của kết quả kia (4 với 40, 1 với 12) hoặc trùng nhau: không cho vào cùng một đàn. */
const clash = (x, y) => { const a = String(x), b = String(y); return a.startsWith(b) || b.startsWith(a); };

function makeWave(rng, level, history) {
  const pool = level.pool();
  const used = new Set(history.flatMap(h => h?.facts?.map(f => f.id) || []));
  const weak = loadWeak();
  const facts = [];
  for (let i = 0; i < level.count; i++) {
    const ok = pool.filter(f => !facts.some(x => x.id === f.id || clash(x.ans, f.ans)));
    if (!ok.length) break; // hết phép khác kết quả: đàn cá ít con hơn
    const fresh = ok.filter(f => !used.has(f.id));
    facts.push(weightedPick(rng, fresh.length ? fresh : ok, (x) => 1 + 3 * (weak[x.id] || 0)));
  }
  // Nhanh dần qua các lượt (mỗi lượt bớt 4% thời gian bơi tới thợ lặn).
  return { facts, secs: level.secs * (1 - 0.04 * Math.min(history.length, 5)), first: history.length === 0 };
}

// ── Màn chơi ──────────────────────────────────────────────────────────────────────────────────────────
const LANES = [0.29, 0.47, 0.65, 0.83]; // chừa dải trên cùng cho bảng mạng
const COLORS = [['#7E9DB4', '#67879F'], ['#8DA4B8', '#728BA0'], ['#7895AA', '#5F7D93'], ['#94A9BA', '#7A90A3']];
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'];
const LIVES = 3;

function mountShark(stage, m, level, api) {
  injectGameStyles();
  injectSharkStyles();
  stage.innerHTML = `
    <div class="shk-scene animate-fadeIn">
      <div class="shk-ocean" data-result-host>
        ${SEA}
        <div class="shk-diver"><span class="shk-rope"></span><div class="shk-diver-body">${DIVER}<i class="shk-bub"></i><i class="shk-bub"></i><i class="shk-bub"></i></div></div>
        <div class="shk-layer"></div>
        <div class="shk-lives" aria-label="${LIVES} mạng">${Array.from({ length: LIVES }, () => `<span class="shk-heart">${HEART}</span>`).join('')}</div>
      </div>
      <div class="shk-side">
        <div class="shk-status">
          <div class="shk-count">${m.facts.map(() => `<span class="shk-mini">${MINI_SHARK}</span>`).join('')}</div>
        </div>
        <div class="shk-pad">
          <div class="shk-lcd"><span class="shk-lcd-val">&nbsp;</span></div>
          <div class="shk-keys">${KEYS.map(k => `<button type="button" class="shk-key ${k === 'del' ? 'shk-key-del' : k === 'ok' ? 'shk-key-ok' : ''}" data-k="${k}">${k === 'del' ? '⌫' : k === 'ok' ? 'OK' : k}</button>`).join('')}</div>
        </div>
      </div>
    </div>`;
  const ocean = stage.querySelector('.shk-ocean');
  const layer = ocean.querySelector('.shk-layer');
  const diver = ocean.querySelector('.shk-diver');
  const diverBody = ocean.querySelector('.shk-diver-body');
  const tip = ocean.querySelector('.shk-tip');
  const pad = stage.querySelector('.shk-pad');
  const lcd = pad.querySelector('.shk-lcd');
  const lcdVal = pad.querySelector('.shk-lcd-val');
  const minis = [...stage.querySelectorAll('.shk-mini')];
  const livesBox = ocean.querySelector('.shk-lives');
  const hearts = [...livesBox.querySelectorAll('.shk-heart')];
  const calm = calmMotion();
  const slow = calm ? 1.25 : 1; // máy tắt hiệu ứng: cá bơi chậm hơn, êm hơn (vẫn bơi)

  let W = ocean.clientWidth, H = ocean.clientHeight;
  const ro = new ResizeObserver(() => { W = ocean.clientWidth; H = ocean.clientHeight; sharks.forEach(measure); });
  ro.observe(ocean);
  const rel = (el) => {
    const r = el.getBoundingClientRect(), o = ocean.getBoundingClientRect();
    return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height };
  };

  // ── Cá mập ──
  const sharks = new Set();
  let resolved = 0, bites = 0, over = false, finished = false, lives = LIVES;
  const bitten = [];
  let lastLanes = [];
  const measure = (s) => { s.w = s.el.offsetWidth; s.h = s.el.offsetHeight; };

  function spawn(i) {
    if (over) return;
    const f = m.facts[i];
    const free = [0, 1, 2, 3].filter(l => !lastLanes.includes(l));
    const lane = free[Math.floor(Math.random() * free.length)];
    lastLanes = [...lastLanes, lane].slice(-2);
    const [c, fin] = COLORS[i % COLORS.length];
    const el = document.createElement('div');
    el.className = 'shk-shark';
    el.innerHTML = `<div class="shk-inner"><div class="shk-pic">${sharkSvg(c, fin)}</div><b class="shk-tag">${f.text}</b></div>`;
    layer.appendChild(el);
    const s = { el, f, i, lane, p: 0, secs: m.secs * slow * (0.92 + Math.random() * 0.16), state: 'swim', phase: Math.random() * 6 };
    measure(s);
    sharks.add(s);
    place(s);
  }

  /** Mép trái của cá khi tới chỗ đớp thợ lặn. */
  const attackX = () => { const d = rel(diverBody); return d.x + d.w * 0.92; };
  function place(s, t = 0) {
    const x0 = W + 6, x1 = attackX();
    s.x = x0 + (x1 - x0) * s.p;
    s.y = LANES[s.lane] * H - s.h / 2 + Math.sin(t * 2.2 + s.phase) * H * 0.012;
    s.el.style.transform = `translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px)`;
  }

  let last = performance.now(), t = 0;
  const tick = (now) => {
    if (!ocean.isConnected) { ro.disconnect(); return; }
    const dt = Math.min(0.25, (now - last) / 1000);
    last = now; t += dt;
    for (const s of sharks) {
      if (s.state !== 'swim') continue;
      s.p = Math.min(1, s.p + dt / s.secs);
      s.el.classList.toggle('shk-near', s.p > 0.72);
      place(s, t);
      if (s.p >= 1) bite(s);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // ── Bắn trúng: tia điện từ súng tới cá, cá thành bộ xương rồi chìm ──
  function zap(s) {
    s.state = 'dead';
    noteFact(s.f.id, true);
    const g = rel(tip);
    const x0 = g.x + g.w, y0 = g.y + g.h / 2;
    const x1 = s.x + s.w * 0.42, y1 = s.y + s.h * 0.5;
    const pts = [[x0, y0]];
    const n = 7;
    for (let k = 1; k < n; k++) pts.push([x0 + (x1 - x0) * k / n, y0 + (y1 - y0) * k / n + (k % 2 ? -1 : 1) * Math.min(26, s.h * 0.22)]);
    pts.push([x1, y1]);
    const bolt = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    bolt.setAttribute('class', 'shk-bolt');
    bolt.setAttribute('width', W); bolt.setAttribute('height', H);
    const line = pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ');
    bolt.innerHTML = `<polyline points="${line}" fill="none" stroke="#FACC15" stroke-width="16" stroke-linejoin="round" opacity="0.45"/><polyline points="${line}" fill="none" stroke="#EAB308" stroke-width="9" stroke-linejoin="round"/><polyline points="${line}" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>`;
    ocean.appendChild(bolt);
    setTimeout(() => bolt.remove(), 320);
    diver.classList.remove('shk-fire'); void diver.offsetWidth; diver.classList.add('shk-fire');
    sfx.swish();
    s.el.querySelector('.shk-pic').innerHTML = bonesSvg();
    s.el.classList.remove('shk-near');
    s.el.classList.add('shk-dead');
    minis[s.i].classList.add('shk-mini-dead');
    setTimeout(() => sfx.pop(resolved), 120);
    setTimeout(() => { sharks.delete(s); s.el.remove(); }, 1900);
    done1();
  }

  // ── Tính chậm: cá lao vào đớp thợ lặn, hiện kết quả đúng ──
  async function bite(s) {
    s.state = 'bite';
    bites++;
    bitten.push(s.f);
    noteFact(s.f.id, false);
    minis[s.i].classList.add('shk-mini-bit');
    const tag = s.el.querySelector('.shk-tag');
    tag.textContent = `${s.f.text} = ${s.f.ans}`;
    s.el.classList.remove('shk-near');
    s.el.classList.add('shk-biting', 'shk-show');
    const d = rel(diverBody);
    const tx = d.x + d.w * 0.35 - s.x, ty = d.y + d.h * 0.42 - (s.y + s.h * 0.55);
    s.el.querySelector('.shk-inner').style.transform = `translate(${tx.toFixed(0)}px, ${ty.toFixed(0)}px)`;
    await sleep(260);
    sfx.boing();
    lives--;
    hearts[lives]?.classList.add('shk-heart-lost');
    livesBox.classList.remove('shk-lives-hit'); void livesBox.offsetWidth; livesBox.classList.add('shk-lives-hit');
    if (!lives) die();
    else { diver.classList.remove('shk-hurt'); void diver.offsetWidth; diver.classList.add('shk-hurt'); }
    api.say(s.f.say);
    await sleep(1400);
    s.el.classList.remove('shk-biting');
    s.el.classList.add('shk-leave');
    await sleep(900);
    sharks.delete(s); s.el.remove();
    done1();
  }

  /** Hết mạng: dây đứt, thợ lặn chìm xuống cát; cá còn lại bơi đi hết. */
  async function die() {
    over = true;
    diver.classList.remove('shk-hurt');
    diver.classList.add('shk-diver-dead');
    for (const s of sharks) if (s.state === 'swim') { s.state = 'flee'; s.el.classList.remove('shk-near'); s.el.classList.add('shk-leave'); }
    await sleep(2600);
    finish();
  }

  function done1() {
    resolved++;
    if (resolved === m.facts.length && lives) finish();
  }

  async function finish() {
    if (finished) return;
    finished = true;
    over = true;
    pad.classList.add('shk-pad-off');
    document.removeEventListener('keydown', onKey);
    await sleep(900);
    const remember = bitten.map(f => `<b>${f.text} = ${f.ans}</b>`).join(', ');
    if (!lives) {
      api.fail('Thợ lặn hết mạng rồi!', `Em cần tính nhanh hơn: ${remember}.`);
    } else {
      diver.classList.add('shk-win');
      api.succeed(bites
        ? `Thợ lặn còn ${lives} mạng! Em bắn trúng ${m.facts.length - bites}/${m.facts.length} con cá mập. Ghi nhớ: ${remember}.`
        : `Thợ lặn an toàn! Em bắn trúng cả ${m.facts.length} con cá mập.`);
    }
  }

  // ── Gõ kết quả: khớp con nào thì bắn ngay con đó ──
  let typed = '';
  const show = () => { lcdVal.innerHTML = typed || '&nbsp;'; };
  const live = () => [...sharks].filter(s => s.state === 'swim');
  function wrong() {
    sfx.boing();
    lcd.classList.remove('shk-lcd-bad'); void lcd.offsetWidth; lcd.classList.add('shk-lcd-bad');
    setTimeout(() => { typed = ''; show(); }, 380);
  }
  function check(submit) {
    const alive = live();
    const hit = alive.filter(s => String(s.f.ans) === typed).sort((a, b) => b.p - a.p)[0];
    if (hit) { typed = ''; show(); zap(hit); return; }
    const longest = Math.max(0, ...alive.map(s => String(s.f.ans).length));
    if (submit || (alive.length && typed.length >= longest) || !alive.some(s => String(s.f.ans).startsWith(typed))) wrong();
  }
  function press(k) {
    if (over) return;
    if (k === 'del') { typed = typed.slice(0, -1); sfx.tap(); show(); return; }
    if (k === 'ok') { if (typed) check(true); return; }
    if (typed.length >= 4) return;
    typed = typed === '0' ? k : typed + k;
    sfx.tap();
    show();
    check(false);
  }
  pad.querySelector('.shk-keys').addEventListener('click', (e) => {
    const b = e.target.closest('[data-k]');
    if (b) press(b.dataset.k);
  });
  function onKey(e) {
    if (!ocean.isConnected) { document.removeEventListener('keydown', onKey); return; }
    if (/^[0-9]$/.test(e.key)) press(e.key);
    else if (e.key === 'Backspace') press('del');
    else if (e.key === 'Enter') press('ok');
    else return;
    e.preventDefault();
  }
  document.addEventListener('keydown', onKey);

  // ── Thả cá: con đầu sau 1,2 giây, các con sau cách nhau ~40% thời gian bơi (2 đến 3 con cùng lúc) ──
  if (m.first) api.say('Cá mập tới! Gõ kết quả để bắn!');
  const gap = m.secs * slow * 0.4;
  m.facts.forEach((_, i) => setTimeout(() => ocean.isConnected && spawn(i), (1.2 + i * gap) * 1000));

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m,
      step: () => { const s = live().sort((a, b) => b.p - a.p)[0]; if (s) for (const ch of String(s.f.ans)) press(ch); },
    };
  }
}

// ── Mẫu trò ───────────────────────────────────────────────────────────────────────────────────────────
// Hình: scripts/g3games/npc-tho-lan.jpg, tách nền + làm mờ chữ trên máy tính bảng (chưa có tấm mặt buồn).
const DIVER_NPC = { id: 'chu-hai', name: 'Chú Hải thợ lặn', me: 'chú', you: 'cháu', img: imgChuHai, sad: imgChuHai };

/** level: { id, n, title, desc, knowledge, lessons, pool() → [fact], secs (giây cá bơi tới thợ lặn), count? } */
export const sharkGame = (meta, levels) => ({
  id: 'shark', icon: '🦈', title: 'Săn cá mập', unitWord: 'đàn cá', npcs: [DIVER_NPC],
  purpose: 'Giúp em tính nhanh và thuộc bảng cộng, trừ, nhân, chia. Cá mập mang phép tính bơi tới, em gõ đúng kết quả là bắn trúng con đó. Tính chậm thì cá mập đớp thợ lặn, mất một mạng.',
  howTo: how(['🦈', 'Đọc phép tính trên cá'], ['⌨️', 'Gõ kết quả'], ['⚡', 'Bắn trúng!'], ['❤️', 'Giữ 3 mạng']),
  ...meta,
  levels: levels.map(l => ({ count: 6, missions: 5, ask: () => 'Cá mập bơi tới kìa! Cháu gõ kết quả thật nhanh để bắn trúng chúng, giữ cho chú đủ 3 mạng!', ...l })),
  stallIcon: () => '🦈',
  summaryText: (ok, total) => `Em giữ an toàn cho thợ lặn ở <strong>${ok}/${total}</strong> đàn cá.`,
  againText: 'Chơi đàn cá mới',
  makeMission: makeWave,
  mountMission: mountShark,
});

export const SHARK_GAME = sharkGame({ id: 'drill-shark', starPrefix: 'drill' }, [
  { id: 'drill-shark-1', n: 1, title: 'Bảng nhân 2, 3, 4, 5', desc: 'Vd. 4 × 7 = ?', knowledge: 'bảng nhân 2, 3, 4, 5', lessons: { workbook: ['bai-4', 'bai-5', 'bai-6'] }, secs: 13, pool: () => tablePool([2, 3, 4, 5], ['mul']) },
  { id: 'drill-shark-2', n: 2, title: 'Bảng chia 2, 3, 4, 5', desc: 'Vd. 28 : 4 = ?', knowledge: 'bảng chia 2, 3, 4, 5', lessons: { workbook: ['bai-4', 'bai-5', 'bai-6'] }, secs: 13, pool: () => tablePool([2, 3, 4, 5], ['div']) },
  { id: 'drill-shark-3', n: 3, title: 'Bảng nhân 6, 7, 8, 9', desc: 'Vd. 7 × 8 = ?', knowledge: 'bảng nhân 6, 7, 8, 9', lessons: { workbook: ['bai-9', 'bai-10', 'bai-11', 'bai-12'] }, secs: 14, pool: () => tablePool([6, 7, 8, 9], ['mul']) },
  { id: 'drill-shark-4', n: 4, title: 'Bảng chia 6, 7, 8, 9', desc: 'Vd. 56 : 7 = ?', knowledge: 'bảng chia 6, 7, 8, 9', lessons: { workbook: ['bai-9', 'bai-10', 'bai-11', 'bai-12'] }, secs: 14, pool: () => tablePool([6, 7, 8, 9], ['div']) },
  { id: 'drill-shark-5', n: 5, title: 'Trộn nhân, chia 2 đến 9', desc: 'Vd. 6 × 8, 63 : 9.', knowledge: 'bảng nhân, bảng chia 2 đến 9', lessons: { workbook: ['bai-13'] }, secs: 13, pool: () => tablePool([2, 3, 4, 5, 6, 7, 8, 9], ['mul', 'div']) },
  { id: 'drill-shark-6', n: 6, title: 'Cộng, trừ có nhớ', desc: 'Vd. 47 + 8, 52 − 7.', knowledge: 'cộng, trừ có nhớ trong phạm vi 100', lessons: { workbook: ['bai-2'] }, secs: 15, pool: carryPool },
]);

export const SHARK2_GAME = sharkGame({ id: 'd2-shark', starPrefix: 'drill2' }, [
  { id: 'd2-shark-1', n: 1, title: 'Bảng cộng qua 10', desc: 'Vd. 8 + 5 = ?', knowledge: 'cộng qua 10 trong phạm vi 20', lessons: { g2: ['bai-8'] }, secs: 15, pool: () => crossPool(['add']) },
  { id: 'd2-shark-2', n: 2, title: 'Bảng trừ qua 10', desc: 'Vd. 13 − 5 = ?', knowledge: 'trừ qua 10 trong phạm vi 20', lessons: { g2: ['bai-12'] }, secs: 15, pool: () => crossPool(['sub']) },
  { id: 'd2-shark-3', n: 3, title: 'Trộn cộng, trừ qua 10', desc: 'Vd. 7 + 6, 15 − 8.', knowledge: 'bảng cộng, bảng trừ qua 10', lessons: { g2: ['bai-8', 'bai-12'] }, secs: 15, pool: () => crossPool(['add', 'sub']) },
  { id: 'd2-shark-4', n: 4, title: 'Cộng, trừ có nhớ', desc: 'Vd. 36 + 7, 52 − 8.', knowledge: 'cộng, trừ có nhớ trong phạm vi 100', lessons: { g2: ['bai-21', 'bai-24'] }, secs: 17, pool: carryPool },
  { id: 'd2-shark-5', n: 5, title: 'Bảng nhân 2 và 5', desc: 'Vd. 2 × 7, 5 × 6.', knowledge: 'bảng nhân 2, bảng nhân 5', lessons: { g2: ['bai-39', 'bai-40'] }, secs: 15, pool: () => tablePool([2, 5], ['mul']) },
  { id: 'd2-shark-6', n: 6, title: 'Bảng chia 2 và 5', desc: 'Vd. 14 : 2, 30 : 5.', knowledge: 'bảng chia 2, bảng chia 5', lessons: { g2: ['bai-43', 'bai-44'] }, secs: 15, pool: () => tablePool([2, 5], ['div']) },
]);

export const SHARK1_GAME = sharkGame({ id: 'g1-shark', starPrefix: 'shark1' }, [
  { id: 'g1-shark-1', n: 1, title: 'Cộng trong phạm vi 10', desc: 'Vd. 3 + 4 = ?', knowledge: 'phép cộng trong phạm vi 10', secs: 18, pool: () => withinPool(10, ['add']) },
  { id: 'g1-shark-2', n: 2, title: 'Trừ trong phạm vi 10', desc: 'Vd. 9 − 5 = ?', knowledge: 'phép trừ trong phạm vi 10', secs: 18, pool: () => withinPool(10, ['sub']) },
  { id: 'g1-shark-3', n: 3, title: 'Trộn cộng, trừ trong phạm vi 10', desc: 'Vd. 6 + 3, 8 − 2.', knowledge: 'phép cộng, phép trừ trong phạm vi 10', secs: 17, pool: () => withinPool(10, ['add', 'sub']) },
  { id: 'g1-shark-4', n: 4, title: 'Cộng, trừ trong phạm vi 20', desc: 'Vd. 12 + 5, 17 − 4.', knowledge: 'số đến 20, cộng trừ không nhớ', secs: 18, pool: () => noCarryPool(10, 19) },
  { id: 'g1-shark-5', n: 5, title: 'Số tròn chục', desc: 'Vd. 30 + 40, 90 − 60.', knowledge: 'số tròn chục', secs: 18, pool: tensPool },
  { id: 'g1-shark-6', n: 6, title: 'Cộng, trừ trong phạm vi 100', desc: 'Vd. 34 + 5, 67 − 3.', knowledge: 'số có hai chữ số, cộng trừ không nhớ', secs: 18, pool: () => noCarryPool(20, 98) },
]);

export const SHARK4_GAME = sharkGame({ id: 'd4-shark', starPrefix: 'drill4', purpose: 'Giúp em tính nhẩm nhanh với số tới ba chữ số: cộng trừ số tròn, nhân chia với 10, 100, nhân chia số có hai chữ số với số có một chữ số. Gõ đúng kết quả là bắn trúng cá mập, tính chậm thì cá mập đớp thợ lặn.' }, [
  { id: 'd4-shark-1', n: 1, title: 'Cộng, trừ số tròn chục, tròn trăm', desc: 'Vd. 450 + 300, 820 − 60.', knowledge: 'số có ba chữ số, tính nhẩm', secs: 16, pool: roundAddPool },
  { id: 'd4-shark-2', n: 2, title: 'Nhân, chia với 10, 100', desc: 'Vd. 35 × 10, 600 : 100.', knowledge: 'nhân, chia với 10, 100', secs: 15, pool: tenPool },
  { id: 'd4-shark-3', n: 3, title: 'Nhân nhẩm với số có một chữ số', desc: 'Vd. 24 × 4, 40 × 7.', knowledge: 'bảng nhân, nhân số có hai chữ số với số có một chữ số', secs: 17, pool: mulOnePool },
  { id: 'd4-shark-4', n: 4, title: 'Chia nhẩm cho số có một chữ số', desc: 'Vd. 96 : 4, 280 : 7.', knowledge: 'bảng chia, chia số có hai, ba chữ số cho số có một chữ số', secs: 17, pool: divOnePool },
  { id: 'd4-shark-5', n: 5, title: 'Trộn bốn phép tính', desc: 'Vd. 450 + 300, 24 × 4, 280 : 7.', knowledge: 'cộng, trừ, nhân, chia nhẩm', secs: 16, pool: () => [...roundAddPool(), ...tenPool(), ...mulOnePool(), ...divOnePool()] },
]);

export const SHARK5_GAME = sharkGame({ id: 'd5-shark', starPrefix: 'drill5', purpose: 'Giúp em tính nhẩm thật nhanh với số tới ba chữ số: bảng nhân chia, nhân chia với 10, 100, nhân chia số tròn chục, tròn trăm. Gõ đúng kết quả là bắn trúng cá mập, tính chậm thì cá mập đớp thợ lặn.' }, [
  { id: 'd5-shark-1', n: 1, title: 'Bảng nhân, bảng chia', desc: 'Vd. 7 × 8, 63 : 9.', knowledge: 'bảng nhân, bảng chia 2 đến 9', secs: 10, pool: () => tablePool([2, 3, 4, 5, 6, 7, 8, 9], ['mul', 'div']) },
  { id: 'd5-shark-2', n: 2, title: 'Nhân, chia với 10, 100', desc: 'Vd. 35 × 10, 600 : 100.', knowledge: 'nhân, chia với 10, 100', secs: 12, pool: tenPool },
  { id: 'd5-shark-3', n: 3, title: 'Nhân số tròn chục, tròn trăm', desc: 'Vd. 30 × 20, 200 × 4.', knowledge: 'bảng nhân, nhân số tròn chục, tròn trăm', secs: 13, pool: () => roundMulPool(['mul']) },
  { id: 'd5-shark-4', n: 4, title: 'Chia số tròn chục, tròn trăm', desc: 'Vd. 600 : 20, 800 : 4.', knowledge: 'bảng chia, chia số tròn chục, tròn trăm', secs: 13, pool: () => roundMulPool(['div']) },
  { id: 'd5-shark-5', n: 5, title: 'Trộn bốn phép tính', desc: 'Vd. 820 − 60, 24 × 4, 600 : 20.', knowledge: 'cộng, trừ, nhân, chia nhẩm', secs: 13, pool: () => [...roundAddPool(), ...mulOnePool(), ...divOnePool(), ...roundMulPool(['mul', 'div'])] },
]);

// ── Kiểu dáng ─────────────────────────────────────────────────────────────────────────────────────────
let styled = false;
function injectSharkStyles() {
  if (styled) return;
  styled = true;
  const st = document.createElement('style');
  st.textContent = `
    /* Màn ngang: biển trải hết khung, bàn phím là một bảng gọn ở góc dưới phải (cá bơi ra từ sau bảng) */
    .shk-scene { position: relative; min-height: 0; height: 100%; --side: clamp(170px, 18%, 236px); }
    .shk-ocean { position: absolute; inset: 0; overflow: hidden; border-radius: 1.1rem; container-type: size; min-height: 0; background: #38BDF8;
      --sh: min(16cqh, 10.5cqi); --dh: min(36cqh, 24cqi); }
    .shk-sea { position: absolute; inset: 0; width: 100%; height: 100%; }
    .shk-weed { animation: shkWeed var(--d) ease-in-out infinite alternate; }
    @keyframes shkWeed { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }
    .shk-layer { position: absolute; inset: 0; pointer-events: none; }

    /* Thợ lặn treo dây ở mép trái, giữa biển */
    .shk-diver { position: absolute; left: 1.5cqi; top: 0; bottom: 0; width: calc(var(--dh) * 0.8); z-index: 2; animation: shkDown .9s cubic-bezier(.3,1.3,.5,1) both; }
    @keyframes shkDown { from { transform: translateY(-70cqh); } to { transform: none; } }
    .shk-rope { position: absolute; left: 45.6%; top: -2px; height: calc(50% - var(--dh) / 2 + 3px); width: max(3px, 0.5cqh); margin-left: -1.5px; background: #3F3A40; border-radius: 2px; }
    .shk-diver-body { position: absolute; left: 0; top: calc(50% - var(--dh) / 2); height: var(--dh); width: 100%; animation: shkSway 3.2s ease-in-out infinite alternate; transform-origin: 45.6% 0; }
    @keyframes shkSway { from { transform: rotate(-2.5deg); } to { transform: rotate(2.5deg); } }
    .shk-diver-svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .shk-leg { transform-box: fill-box; transform-origin: 50% 0; animation: shkKick 1.1s ease-in-out infinite alternate; }
    .shk-leg2 { animation-delay: -.55s; }
    @keyframes shkKick { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }
    .shk-oh { display: none; }
    .shk-gun { transform-box: view-box; transform-origin: 80px 82px; }
    .shk-fire .shk-gun { animation: shkRecoil .25s ease-out; }
    @keyframes shkRecoil { 30% { transform: translateX(-6px) rotate(-4deg); } }
    .shk-fire .shk-tip { animation: shkTip .3s ease-out; }
    @keyframes shkTip { 0% { fill: #fff; } 100% { fill: #FDE047; } }
    .shk-hurt .shk-diver-svg { animation: shkHurt .7s ease-in-out; }
    .shk-hurt .shk-smile { display: none; } .shk-hurt .shk-oh { display: inline; }
    @keyframes shkHurt { 0%, 100% { transform: none; filter: none; } 15% { transform: translateX(-8%) rotate(-8deg); filter: drop-shadow(0 0 10px #EF4444) saturate(1.4); } 35% { transform: translateX(6%) rotate(6deg); } 55% { transform: translateX(-4%) rotate(-4deg); filter: drop-shadow(0 0 8px #EF4444); } 75% { transform: translateX(2%); } }
    .shk-win .shk-diver-svg { animation: shkWin .6s ease-in-out 3; }
    @keyframes shkWin { 50% { transform: translateY(-8%); } }
    .shk-xeyes, .shk-sad, .shk-crack { display: none; }
    .shk-diver-dead .shk-eyes, .shk-diver-dead .shk-smile, .shk-diver-dead .shk-oh { display: none; }
    .shk-diver-dead .shk-xeyes, .shk-diver-dead .shk-sad, .shk-diver-dead .shk-crack { display: inline; }
    .shk-diver-dead .shk-rope { transform-origin: 50% 0; animation: shkSnap .35s ease-in forwards; }
    @keyframes shkSnap { to { transform: scaleY(0.3); } }
    .shk-diver-dead .shk-diver-body { transform-origin: 50% 50%; animation: shkFall 1.8s cubic-bezier(.4,0,.6,1) .25s forwards; }
    @keyframes shkFall { 0% { transform: none; } 25% { transform: translateY(-3cqh) rotate(12deg); } 100% { transform: translate(calc(var(--dh) * 0.25), calc(44cqh - var(--dh) * 0.4)) rotate(84deg); } }
    .shk-diver-dead .shk-diver-svg { filter: saturate(0.5) brightness(0.92); transition: filter .6s; }
    .shk-diver-dead .shk-leg, .shk-diver-dead .shk-bub { animation: none; }
    .shk-diver-dead .shk-bub { display: none; }
    .shk-bub { position: absolute; left: 62%; top: 4%; width: calc(var(--dh) * 0.07); aspect-ratio: 1; border-radius: 50%; border: 2px solid rgba(255,255,255,.85); background: rgba(255,255,255,.25); animation: shkBub 2.6s ease-in infinite; opacity: 0; }
    .shk-bub:nth-of-type(2) { animation-delay: .9s; left: 70%; width: calc(var(--dh) * 0.05); }
    .shk-bub:nth-of-type(3) { animation-delay: 1.7s; left: 58%; width: calc(var(--dh) * 0.04); }
    @keyframes shkBub { 0% { transform: none; opacity: 0; } 15% { opacity: 1; } 100% { transform: translate(8px, calc(var(--dh) * -1.1)); opacity: 0; } }

    /* Cá mập: cỡ theo biển, chữ to theo cỡ cá */
    .shk-shark { position: absolute; left: 0; top: 0; height: var(--sh); width: calc(var(--sh) * 2.49); container-type: size; will-change: transform; z-index: 3; }
    .shk-inner { position: absolute; inset: 0; transition: transform .26s cubic-bezier(.5,0,.8,.6); }
    .shk-pic, .shk-svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; }
    .shk-tail { transform-box: view-box; transform-origin: 208px 50px; animation: shkTail .5s ease-in-out infinite alternate; }
    @keyframes shkTail { from { transform: scaleY(0.92) rotate(-13deg); } to { transform: scaleY(1.04) rotate(13deg); } }
    .shk-pec { transform-box: view-box; transform-origin: 100px 68px; animation: shkPec .9s ease-in-out infinite alternate; }
    @keyframes shkPec { from { transform: rotate(-6deg); } to { transform: rotate(8deg); } }
    /* Hàm dưới (và lòng miệng) xoay quanh khớp hàm: hé khi tới gần, há to rồi đớp liên tục khi tấn công */
    .shk-jaw { transform-box: view-box; transform-origin: 80px 66px; transition: transform .25s ease-out; }
    .shk-near .shk-jaw { transform: rotate(-10deg); }
    .shk-biting .shk-jaw { animation: shkJaw .32s ease-in-out infinite alternate; }
    @keyframes shkJaw { from { transform: rotate(-36deg); } to { transform: rotate(-2deg); } }
    .shk-tag { position: absolute; left: 44%; top: 52%; transform: translate(-50%, -50%); white-space: nowrap; font-size: min(34cqh, 13.5cqi); line-height: 1.05; font-weight: 800;
      color: #0F172A; background: rgba(255,255,255,.92); padding: 0.02em 0.32em 0.06em; border-radius: 0.45em; border: max(2px, 2.4cqh) solid #3F3A40; font-family: 'Baloo 2', 'Quicksand', sans-serif; letter-spacing: 0.01em; }
    .shk-near .shk-tag { background: #FEF3C7; border-color: #EA580C; animation: shkWarn .5s ease-in-out infinite alternate; }
    @keyframes shkWarn { to { background: #FED7AA; } }
    .shk-show .shk-tag { top: -14%; left: 52%; background: #FEE2E2; border-color: #DC2626; color: #991B1B; animation: none; }
    .shk-biting .shk-pic { animation: shkShake .6s ease-in-out infinite alternate; transform-origin: 20% 60%; }
    @keyframes shkShake { from { transform: rotate(3deg); } to { transform: rotate(-4deg); } }
    .shk-leave .shk-inner { transition: transform 1s ease-in, opacity 1s ease-in; transform: translate(-60cqi, -80cqh) !important; opacity: 0; }
    .shk-dead { z-index: 2; }
    .shk-dead .shk-pic { filter: drop-shadow(0 0 3px #fff) drop-shadow(0 0 8px #FDE047) drop-shadow(0 0 16px #FDE047); animation: shkZap .4s steps(2) 2; }
    @keyframes shkZap { 50% { filter: drop-shadow(0 0 6px #fff) drop-shadow(0 0 20px #FEF08A) brightness(1.4); } }
    .shk-dead .shk-tag { opacity: 0; transition: opacity .2s; }
    .shk-dead .shk-inner { animation: shkSink 1.9s ease-in .5s forwards; }
    @keyframes shkSink { to { transform: translate(-4cqi, 70cqh) rotate(-18deg); opacity: 0; } }
    .shk-bolt { position: absolute; left: 0; top: 0; z-index: 4; pointer-events: none; overflow: visible; animation: shkBolt .3s steps(3) forwards; }
    @keyframes shkBolt { 0% { opacity: 1; } 50% { opacity: .5; } 100% { opacity: 0; } }

    /* Thẻ kết quả đè giữa khoảng biển bên phải thợ lặn (cá đã đi hết) */
    .shk-ocean > .g3g-result { position: absolute; z-index: 6; left: calc(var(--dh) * 0.8 + 3cqi); right: calc(var(--side) + 1.2rem); margin: 0 auto; max-width: 470px; top: 50%; transform: translateY(-50%); max-height: calc(100% - 1rem); overflow-y: auto;
      border-width: 3px; border-radius: 1.3rem; text-align: center; align-items: stretch; box-shadow: 0 6px 0 rgba(0,0,0,0.1), 0 16px 36px rgba(0,0,0,0.3); }
    .shk-ocean > .g3g-result .g3g-result-text { font-size: clamp(1rem, 1.8vh + 0.55rem, 1.45rem); }
    .shk-ocean > .g3g-result .g3g-tip { font-size: clamp(0.95rem, 1.5vh + 0.5rem, 1.3rem); }

    /* Bảng mạng: nổi giữa mép trên biển, luôn thấy rõ */
    .shk-lives { position: absolute; z-index: 5; top: 1.5cqh; left: 50%; transform: translateX(-50%); display: flex; gap: min(1.2cqh, 1cqi); padding: min(1.2cqh, 1cqi) min(2.4cqh, 2cqi);
      background: rgba(15,36,64,.82); border: 3px solid #FDE68A; border-radius: 999px; box-shadow: 0 4px 0 rgba(15,36,64,.5), 0 0 18px rgba(253,230,138,.45); }
    .shk-lives-hit { animation: shkLivesHit .6s ease-out; }
    @keyframes shkLivesHit { 0%, 100% { border-color: #FDE68A; } 20%, 60% { border-color: #EF4444; box-shadow: 0 4px 0 rgba(15,36,64,.5), 0 0 26px #EF4444; } 30% { transform: translateX(-50%) scale(1.12); } }
    .shk-heart { width: min(8cqh, 6cqi); }
    /* Cột bên: đàn cá ở trên, bàn phím gọn ở dưới */
    .shk-side { position: absolute; z-index: 5; right: 0.6rem; bottom: 0.6rem; width: var(--side); display: flex; flex-direction: column; gap: 0.45rem; }
    .shk-status { flex: 0 0 auto; display: flex; flex-direction: column; justify-content: center; gap: 0.6rem; background: #1E3A5F; border-radius: 1.1rem; padding: 0.6rem; box-shadow: 0 5px 0 #0F2440; }
    .shk-heart svg { width: 100%; display: block; overflow: visible; }
    .shk-heart path { fill: #EF4444; transform-box: fill-box; transition: transform .4s ease-out, fill .3s; }
    .shk-heart-lost { animation: shkLost .5s ease-out; }
    .shk-heart-l, .shk-heart-r { display: none; }
    .shk-heart-lost .shk-heart-whole { display: none; }
    .shk-heart-lost .shk-heart-l, .shk-heart-lost .shk-heart-r { display: inline; fill: #94A3B8; }
    .shk-heart-lost .shk-heart-l { transform: translate(-6%, 3%) rotate(-8deg); transform-origin: 100% 100%; }
    .shk-heart-lost .shk-heart-r { transform: translate(6%, 3%) rotate(8deg); transform-origin: 0 100%; }
    @keyframes shkLost { 30% { transform: scale(1.35); } }
    .shk-count { display: flex; gap: 0.2rem; justify-content: center; }
    .shk-mini { flex: 1 1 0; max-width: 3.4rem; color: #64748B; }
    .shk-mini svg { width: 100%; display: block; }
    .shk-mini-dead { color: #FDE047; }
    .shk-mini-bit { color: #F87171; }
    .shk-pad { flex: 0 0 auto; display: flex; flex-direction: column; gap: 0.4rem; background: #1E3A5F; border-radius: 1.1rem; padding: 0.5rem; box-shadow: 0 5px 0 #0F2440; }
    .shk-lcd { background: #D9F99D; border-radius: 0.6rem; display: flex; justify-content: center; align-items: center; font-family: 'Baloo 2', 'Courier New', monospace;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.3); border: 3px solid #0F2440; }
    .shk-lcd-val { font-size: clamp(1.5rem, 5.5vh, 2.5rem); font-weight: 800; color: #1A2E05; line-height: 1.15; min-width: 3ch; text-align: center; }
    .shk-lcd-bad { animation: shkBad .38s ease-in-out; }
    @keyframes shkBad { 0%, 100% { transform: none; background: #D9F99D; } 20%, 60% { transform: translateX(-6px); background: #FECACA; } 40%, 80% { transform: translateX(6px); background: #FECACA; } }
    .shk-keys { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: clamp(2.3rem, 8vh, 3.6rem); gap: 0.35rem; }
    .shk-key { border: none; border-radius: 0.7rem; background: #F8FAFC; color: #1E293B; font-weight: 800; font-size: clamp(1.1rem, 3.6vh, 1.8rem); font-family: inherit; cursor: pointer;
      box-shadow: 0 4px 0 #94A3B8; touch-action: manipulation; min-height: 0; }
    .shk-key:active { transform: translateY(3px); box-shadow: 0 1px 0 #94A3B8; }
    .shk-key-del { background: #FEE2E2; color: #991B1B; box-shadow: 0 4px 0 #FCA5A5; }
    .shk-key-ok { background: #22C55E; color: #fff; box-shadow: 0 4px 0 #15803D; }
    .shk-pad-off .shk-keys { opacity: 0.45; pointer-events: none; }

    /* Màn dọc: biển trên; dưới là một dải mạng + đàn cá, rồi ô số + bàn phím 2 hàng */
    @media (orientation: portrait) {
      .shk-scene { display: grid; grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) auto; gap: 0.5rem; --side: 0px; }
      .shk-ocean { position: relative; inset: auto; }
      .shk-side { position: static; width: auto; }
      .shk-ocean { --sh: min(15cqh, 13cqi); --dh: min(34cqh, 26cqi); }
      .shk-status { flex-direction: row; justify-content: center; align-items: center; padding: 0.4rem 0.6rem; }
      .shk-count { flex: 0 1 18rem; }
      .shk-heart { width: min(8cqh, 10cqi); }
      .shk-keys { grid-template-columns: repeat(6, 1fr); grid-auto-rows: clamp(2.5rem, 6.5vh, 3.6rem); }
    }
    @media (prefers-reduced-motion: reduce) {
      .shk-diver { animation-duration: 1.4s; animation-timing-function: ease-out; }
      .shk-tail { animation-duration: .9s; }
      .shk-near .shk-tag { animation-duration: 1s; }
    }
  `;
  document.head.appendChild(st);
}
