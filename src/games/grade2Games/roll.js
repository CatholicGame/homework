/**
 * 🎳 Thử lăn khối hình — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.9. Bài 46: Khối trụ, khối cầu.
 * Sân chơi có dốc trượt; bạn Tí rủ bé thử đồ chơi.
 *   roll-1 sort: lần lượt từng đồ vật hiện trên băng chuyền, bé chạm hộp "Khối trụ" / "Khối cầu" / "Khối khác",
 *          đồ vật bay vào hộp. Xếp xong 5 món thì từng hộp mở ra kiểm tra (✓ / ✗).
 *   roll-2 guess: đồ vật đặt trên đỉnh dốc (lon nằm ngang, lon dựng đứng, quả bóng, hộp sữa…): bé đoán "Lăn" /
 *          "Không lăn", rồi xem đồ vật thả trên dốc. Khối cầu, khối trụ nằm ngang lăn; khối trụ dựng đứng, hộp không lăn.
 * Hình đồ vật vẽ SVG (góc nhìn chéo, có bóng sáng). App không báo trước lúc đúng. Khung quầy: market/stall.js, theme 'roll'.
 */

import { stallMeta, levelMeta } from './catalog.js';
import { NPCS, cap } from '../grade3Games/npc.js';
import { mountStall } from '../grade3Games/market/stall.js';
import { flyOne, calmMotion } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const INK = '#3F3A40';
const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const FRIEND = NPCS.find(n => n.id === 'ti');
let gid = 0;

// ── Hình đồ vật (viewBox 0 0 100 100) ───────────────────────────────────────────────────────────
function sphereSvg(c, pattern) {
  const id = `g2l${++gid}`;
  const pat = {
    ball: `<path d="M14 46 Q50 30 86 46 L86 58 Q50 42 14 58 Z" fill="#fff" opacity=".95"/>`,
    basket: `<path d="M50 12 V92 M12 52 H88 M22 24 Q44 52 22 80 M78 24 Q56 52 78 80" stroke="${INK}" stroke-width="2.4" fill="none"/>`,
    globe: `<path d="M30 30 q10 -6 18 2 q4 10 -6 14 q-10 2 -12 10 q-8 -4 -6 -14 z M58 54 q12 -4 18 6 q-2 12 -12 16 q-8 -4 -6 -22 z" fill="#4ADE80" stroke="${INK}" stroke-width="1.6"/>`,
    orange: `<path d="M48 12 q4 -8 12 -6 q-2 8 -12 6" fill="#22C55E" stroke="${INK}" stroke-width="1.6"/>${[[38, 40], [60, 34], [64, 60], [40, 66], [52, 52], [30, 56], [70, 46]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3" fill="#C2410C" opacity=".6"/>`).join('')}`,
    marble: `<path d="M30 40 q20 -20 40 6 q-16 -8 -28 8 q-6 -6 -12 -14z" fill="#fff" opacity=".55"/>`,
    melon: `<path d="M30 18 Q22 52 30 86 M50 12 V92 M70 18 Q78 52 70 86" stroke="#14532D" stroke-width="5" fill="none" opacity=".7"/>`,
  }[pattern] || '';
  return `<defs><radialGradient id="${id}" cx=".38" cy=".34" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".45" stop-color="${c}" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></radialGradient>
      <clipPath id="${id}c"><circle cx="50" cy="52" r="38"/></clipPath></defs>
    <circle cx="50" cy="52" r="38" fill="${c}"/><g clip-path="url(#${id}c)">${pat}</g>
    <circle cx="50" cy="52" r="38" fill="url(#${id})"/><circle cx="50" cy="52" r="38" fill="none" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="36" cy="36" rx="8" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 36 36)"/>`;
}
/** Khối trụ dựng đứng (lying = false) hoặc nằm ngang (lying = true, trục theo chiều ngang). */
function cylSvg(c, band, { lying = false, tall = 1 } = {}) {
  const dark = shade(c);
  if (!lying) {
    const top = 50 - 34 * tall, bot = 82;
    return `<ellipse cx="50" cy="${bot + 8}" rx="32" ry="5" fill="#000" opacity=".13"/>
      <path d="M24 ${top} V${bot} A26 8 0 0 0 76 ${bot} V${top} Z" fill="${c}" stroke="${INK}" stroke-width="3"/>
      ${band ? `<path d="M24 ${(top + bot) / 2 - 7} A26 8 0 0 0 76 ${(top + bot) / 2 - 7} V${(top + bot) / 2 + 7} A26 8 0 0 1 24 ${(top + bot) / 2 + 7} Z" fill="${band}"/>` : ''}
      <path d="M30 ${top + 6} V${bot - 2}" stroke="#fff" stroke-width="4" opacity=".45" stroke-linecap="round"/>
      <ellipse cx="50" cy="${top}" rx="26" ry="8" fill="${dark}" stroke="${INK}" stroke-width="3"/>
      <ellipse cx="50" cy="${top}" rx="18" ry="5" fill="${c}" opacity=".7"/>`;
  }
  // Nằm ngang, trục hướng vào trong màn hình (góc nhìn chéo): thấy mặt đáy tròn phía trước, thân lùi về sau.
  // Mặt đáy (data-face, tâm 44, 58) là phần quay khi lăn.
  const rings = band ? `<circle cx="44" cy="58" r="20" fill="none" stroke="${band}" stroke-width="5"/>` : `<circle cx="44" cy="58" r="20" fill="none" stroke="${dark}" stroke-width="2"/><circle cx="44" cy="58" r="11" fill="none" stroke="${dark}" stroke-width="2"/>`;
  return `<ellipse cx="54" cy="92" rx="36" ry="5" fill="#000" opacity=".13"/>
    <path d="M44 26 L64 14 A32 32 0 0 1 64 78 L44 90 Z" fill="${dark}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M52 22 L68 13" stroke="#fff" stroke-width="4" opacity=".4" stroke-linecap="round"/>
    <g data-face><circle cx="44" cy="58" r="32" fill="${c}" stroke="${INK}" stroke-width="3"/>${rings}
      <path d="M44 30 V40 M44 76 V86" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle cx="44" cy="58" r="3" fill="${INK}"/></g>`;
}
function boxSvg(c, kind) {
  const dark = shade(c), darker = shade(c, 0.62);
  const dots = kind === 'dice' ? [[38, 64], [52, 58], [44, 72], [30, 70], [46, 50]].slice(0, 3).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${INK}"/>`).join('')
    + `<circle cx="66" cy="34" r="3" fill="${INK}"/><circle cx="76" cy="58" r="3" fill="${INK}"/><circle cx="66" cy="66" r="3" fill="${INK}"/>` : '';
  const milk = kind === 'milk' ? `<rect x="26" y="52" width="30" height="16" rx="3" fill="#fff" opacity=".9"/><path d="M30 60 h22" stroke="#3B82F6" stroke-width="3"/>` : '';
  const ribbon = kind === 'gift' ? `<path d="M42 42 V90 M60 24 L80 34" stroke="#FDE047" stroke-width="6"/><path d="M48 30 l8 -12 l6 12 z" fill="#FDE047" stroke="${INK}" stroke-width="2"/>` : '';
  const H = kind === 'milk' ? 22 : 40; // hộp sữa cao hơn
  return `<ellipse cx="54" cy="93" rx="34" ry="5" fill="#000" opacity=".13"/>
    <path d="M20 ${H} L60 ${H + 8} L60 90 L20 82 Z" fill="${c}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M60 ${H + 8} L84 ${H - 6} L84 76 L60 90 Z" fill="${dark}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M20 ${H} L44 ${H - 14} L84 ${H - 6} L60 ${H + 8} Z" fill="${shade(c, 1.12)}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    ${kind === 'milk' ? `<path d="M30 ${H - 6} L50 ${H - 22} L74 ${H - 10} L60 ${H + 2}" fill="${darker}" stroke="${INK}" stroke-width="2.4"/>` : ''}
    ${milk}${dots}${ribbon}`;
}
function coneSvg(c) {
  return `<ellipse cx="50" cy="92" rx="30" ry="5" fill="#000" opacity=".13"/>
    <path d="M50 10 L80 82 A30 9 0 0 1 20 82 Z" fill="${c}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M44 24 L30 76" stroke="#fff" stroke-width="4" opacity=".45" stroke-linecap="round"/>`;
}
function shade(hex, k = 0.78) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.max(0, Math.min(255, Math.round(v * k))).toString(16).padStart(2, '0');
  return `#${ch(n >> 16)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
}

/** shape: 'cau' | 'tru' | 'khac'. draw(lying) → nội dung SVG. */
const OBJECTS = [
  { id: 'bong', name: 'quả bóng', shape: 'cau', draw: () => sphereSvg('#EF4444', 'ball') },
  { id: 'cam', name: 'quả cam', shape: 'cau', draw: () => sphereSvg('#FB923C', 'orange') },
  { id: 'dia', name: 'quả địa cầu', shape: 'cau', draw: () => sphereSvg('#60A5FA', 'globe') },
  { id: 'bi', name: 'viên bi', shape: 'cau', draw: () => sphereSvg('#A78BFA', 'marble') },
  { id: 'ro', name: 'quả bóng rổ', shape: 'cau', draw: () => sphereSvg('#F97316', 'basket') },
  { id: 'dua', name: 'quả dưa hấu', shape: 'cau', draw: () => sphereSvg('#22C55E', 'melon') },
  { id: 'lon', name: 'lon nước', shape: 'tru', draw: (l) => cylSvg('#EF4444', '#fff', { lying: l }) },
  { id: 'pin', name: 'cục pin', shape: 'tru', draw: (l) => cylSvg('#1F2937', '#FACC15', { lying: l }) },
  { id: 'trong', name: 'cái trống', shape: 'tru', draw: (l) => cylSvg('#F472B6', '#FDE68A', { lying: l, tall: 0.75 }) },
  { id: 'go', name: 'khúc gỗ', shape: 'tru', draw: (l) => cylSvg('#B7793F', null, { lying: l }) },
  { id: 'hopbut', name: 'hộp bút tròn', shape: 'tru', draw: (l) => cylSvg('#38BDF8', '#fff', { lying: l }) },
  { id: 'sua', name: 'hộp sữa', shape: 'khac', draw: () => boxSvg('#93C5FD', 'milk') },
  { id: 'xx', name: 'con xúc xắc', shape: 'khac', draw: () => boxSvg('#F8FAFC', 'dice') },
  { id: 'qua', name: 'hộp quà', shape: 'khac', draw: () => boxSvg('#F87171', 'gift') },
  { id: 'non', name: 'cái nón', shape: 'khac', draw: () => coneSvg('#FDE68A') },
];
const OBJ = Object.fromEntries(OBJECTS.map(o => [o.id, o]));
const svgOf = (o, lying = false, cls = '') => `<svg class="g2l-obj ${cls}" viewBox="0 0 100 100" aria-hidden="true">${o.draw(lying)}</svg>`;
const BOXES = [{ key: 'tru', label: 'Khối trụ' }, { key: 'cau', label: 'Khối cầu' }, { key: 'khac', label: 'Khối khác' }];
const SAMPLE = { tru: 'lon', cau: 'bong', khac: 'sua' };
const SHAPE_NAME = { tru: 'khối trụ', cau: 'khối cầu', khac: 'khối khác' };

export const ROLL_LEVELS = [
  {
    ...levelMeta('roll-1'), missions: 5, kind: 'sort',
    knowledge: 'khối trụ, khối cầu',
    ask: (n) => `${cap(n.you)} xếp đồ chơi vào đúng hộp giúp ${n.me}!`,
    desc: 'Quả bóng, quả cam có dạng khối cầu. Lon nước, cục pin có dạng khối trụ. Hộp sữa, xúc xắc là khối khác.',
    how: [['👀', 'Nhìn đồ vật'], ['📦', 'Chạm đúng hộp'], ['✓', 'Kiểm tra hộp']],
  },
  {
    ...levelMeta('roll-2'), missions: 5, kind: 'guess',
    knowledge: 'khối trụ, khối cầu (lăn, không lăn)',
    ask: (n) => `${cap(n.you)} đoán xem đồ vật có lăn xuống dốc không!`,
    desc: 'Khối cầu luôn lăn. Khối trụ nằm ngang thì lăn, dựng đứng thì không lăn. Hộp vuông không lăn.',
    how: [['🤔', 'Đoán'], ['🛝', 'Thả xuống dốc'], ['👀', 'Xem thử']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
function makeSort(rng, h) {
  const used = h.flatMap(x => x.items);
  const pick = (shape, k) => rng.shuffle(OBJECTS.filter(o => o.shape === shape && !used.includes(o.id)).concat(rng.shuffle(OBJECTS.filter(o => o.shape === shape)))).slice(0, k).map(o => o.id);
  const nc = rng.pick([1, 2, 2]), nt = rng.pick([1, 2, 2]), nk = 5 - nc - nt;
  const items = [...new Set([...pick('cau', nc), ...pick('tru', nt), ...pick('khac', Math.max(1, nk))])].slice(0, 5);
  return { mode: 'sort', items: rng.shuffle(items) };
}
function makeGuess(rng, h) {
  const first = h[0]?.order || rng.shuffle(['cau', 'lying', 'stand', 'box']);
  const kind = h.length < 4 ? first[h.length] : rng.pick(['lying', 'stand']);
  const usedIds = h.map(x => x.obj);
  const of = (shape) => rng.pick(OBJECTS.filter(o => o.shape === shape && o.id !== 'non' && !usedIds.includes(o.id)));
  const o = kind === 'cau' ? of('cau') : kind === 'box' ? of('khac') : of('tru');
  return { mode: 'guess', kind, obj: o.id, lying: kind === 'lying', rolls: kind === 'cau' || kind === 'lying', order: first };
}
const MAKERS = { sort: makeSort, guess: makeGuess };

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const ROLL_GAME = {
  ...stallMeta('roll'),
  unitWord: 'lượt',
  npcs: [FRIEND],
  starPrefix: 'g2games',
  levels: ROLL_LEVELS,
  stallIcon: () => `<span style="display:inline-flex;width:3.6rem">${svgOf(OBJ.bong)}${svgOf(OBJ.lon)}</span>`,
  summaryText: (ok, total) => `Em đã làm đúng <strong>${ok}/${total}</strong> lượt thử.`,
  howTo(level) {
    return [...level.how.map(([pic, label]) => ({ pic, label })), { pic: '😊', label: 'Bạn Tí vui' }];
  },
  makeMission(rng, level, history) {
    return { ...MAKERS[level.kind](rng, history), level: level.kind, npc: FRIEND };
  },
  mountMission(stage, m, level, api) {
    injectRollStyles();
    if (import.meta.env.DEV) window.__g2roll = m;
    return mountRoll(stage, m, api);
  },
};

function mountRoll(stage, m, api) {
  const n = m.npc;
  const s = mountStall(stage, {
    npc: n, api, theme: 'roll', cameo: false,
    sign: `<span class="g2l-sign-pic">🛝</span><span><strong>Sân chơi</strong><br>${m.mode === 'sort' ? 'Xếp đồ vào hộp' : 'Thử lăn xuống dốc'}</span>`,
    counter: `<div class="g2l-bench"><div class="g2l-board" data-board><span class="g2l-say">&nbsp;</span></div><div class="g2l-play" data-play></div></div>`,
  });
  stage.querySelector('.g3f-scene').classList.add('g2l-nopad');
  const { counter } = s;
  const board = counter.querySelector('[data-board]'), play = counter.querySelector('[data-play]');
  // Bố cục cố định suốt lượt: bảng giữ sẵn chỗ (ẩn bằng visibility), thẻ kết quả đè lên đáy hộp (đáy hộp chừa sẵn chỗ).
  board.style.visibility = 'hidden';
  const ok = (text, line) => { const l = line || `Cảm ơn ${n.you}!`; s.speak(l, 'happy', `${l} 🎉`); api.succeed(text); };
  const bad = (line, text, tip) => { s.speak(line, 'sad', line); api.fail(text, tip); };
  const say = (html) => { board.style.visibility = ''; board.innerHTML = `<span class="g2l-say">${html}</span>`; };
  (m.mode === 'sort' ? modeSort : modeGuess)({ m, n, speak: s.speak, ok, bad, say, play });
}

// ════ Cấp 1: xếp vào hộp ════════════════════════════════════════════════════════════════════════
function modeSort({ m, n, speak, ok, bad, say, play }) {
  play.innerHTML = `
    <div class="g2l-belt"><div class="g2l-cur" data-cur></div><div class="g2l-queue" data-queue></div></div>
    <div class="g2l-boxes">${BOXES.map(b => `
      <button type="button" class="g2l-box" data-box="${b.key}">
        <span class="g2l-boxname">${b.label}</span><span class="g2l-inbox" data-in="${b.key}" data-n="0"><span class="g2l-wm">${svgOf(OBJ[SAMPLE[b.key]])}</span></span>
      </button>`).join('')}</div>`;
  const cur = play.querySelector('[data-cur]'), queue = play.querySelector('[data-queue]');
  const placed = []; // { id, box }
  let i = 0, busy = false;
  const show = () => {
    const o = OBJ[m.items[i]];
    cur.innerHTML = `${svgOf(o, false, 'g2l-pop')}<span class="g2l-name">${o.name}</span>`;
    queue.innerHTML = m.items.slice(i + 1).map(id => svgOf(OBJ[id], false, 'g2l-mini')).join('');
    say(`${i + 1}/${m.items.length}`);
  };
  show();
  play.addEventListener('click', async (e) => {
    const box = e.target.closest('.g2l-box');
    if (!box || busy || i >= m.items.length) return;
    busy = true;
    sfx.tap();
    const id = m.items[i];
    const inbox = box.querySelector('.g2l-inbox');
    inbox.insertAdjacentHTML('beforeend', `<span class="g2l-got g2l-ghost" data-id="${id}">${svgOf(OBJ[id])}</span>`);
    inbox.dataset.n = inbox.querySelectorAll('.g2l-got').length; // đồ vật to theo số món trong hộp
    const el = inbox.lastElementChild;
    const from = cur.querySelector('svg').getBoundingClientRect();
    cur.innerHTML = '';
    placed.push({ id, box: box.dataset.box, el });
    flyOne(svgOf(OBJ[id]).replace('class="g2l-obj "', 'width="100%" height="100%"'), from, el.getBoundingClientRect(), {
      minMs: 420, maxMs: 620, onLand: () => { el.classList.remove('g2l-ghost'); sfx.pop(3); },
    });
    await sleep(calmMotion() ? 700 : 560);
    i++;
    busy = false;
    if (i < m.items.length) return show();
    check();
  });
  // Băng chuyền đã trống: lời báo kiểm tra hiện to ngay trên băng (không để khoảng trống, không đổi bố cục).
  const beltMsg = (html) => {
    const belt = play.querySelector('.g2l-belt');
    let el = belt.querySelector('.g2l-beltmsg');
    if (!el) { el = document.createElement('div'); el.className = 'g2l-beltmsg'; belt.appendChild(el); }
    el.innerHTML = html;
  };
  async function check() {
    beltMsg('📦 Mở hộp kiểm tra…');
    await sleep(500);
    let wrong = 0;
    for (const p of placed) {
      const right = OBJ[p.id].shape === p.box;
      if (!right) wrong++;
      p.el.classList.add(right ? 'g2l-ok' : 'g2l-bad');
      p.el.insertAdjacentHTML('beforeend', `<b class="g2l-mark">${right ? '✓' : '✗'}</b>`);
      sfx.pop(right ? 6 : 1);
      await sleep(calmMotion() ? 450 : 350);
    }
    const list = (shape) => m.items.filter(id => OBJ[id].shape === shape).map(id => OBJ[id].name).join(', ');
    const parts = ['cau', 'tru', 'khac'].filter(sh => m.items.some(id => OBJ[id].shape === sh)).map(sh => `${SHAPE_NAME[sh]}: ${list(sh)}`);
    const fact = `${cap(parts.join('; '))}.`;
    beltMsg(wrong ? `<span class="g2l-bad-t">✗ ${wrong} món xếp nhầm hộp</span>` : '<span class="g2l-ok-t">✓ Đúng hết!</span>');
    if (!wrong) return ok(fact, 'Xếp đúng hết rồi! Giỏi quá!');
    bad('Có món xếp nhầm hộp rồi!', fact, 'Khối cầu tròn đều mọi phía (như quả bóng). Khối trụ có hai mặt đáy tròn (như lon nước).');
  }
  speak(`${cap(n.you)} xếp từng đồ vật vào đúng hộp: khối trụ, khối cầu hay khối khác?`, null, `Xếp vào hộp ${WANT('khối trụ, khối cầu')} hay khối khác?`);
}

// ════ Cấp 2: đoán rồi thử lăn ═══════════════════════════════════════════════════════════════════
function modeGuess({ m, n, speak, ok, bad, say, play }) {
  const o = OBJ[m.obj];
  const pose = m.kind === 'lying' ? 'nằm ngang' : m.kind === 'stand' ? 'dựng đứng' : '';
  // Dốc: từ (40, 70) xuống (520, 250) trong khung 600 × 290; đồ vật đặt ở đỉnh dốc.
  const A = { x: 40, y: 78 }, B = { x: 520, y: 248 };
  const ang = Math.atan2(B.y - A.y, B.x - A.x) * 180 / Math.PI;
  const S = 74;
  play.innerHTML = `
    <div class="g2l-hill">
      <svg class="g2l-ramp" viewBox="0 0 600 290" aria-hidden="true">
        <rect x="0" y="252" width="600" height="38" fill="#86EFAC"/>
        <path d="M${A.x - 30} ${A.y} L${B.x} ${B.y + 4} L${A.x - 30} ${B.y + 4} Z" fill="#FCD34D" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
        <path d="M${A.x - 30} ${A.y} L${B.x} ${B.y + 4}" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/>
        <g data-obj transform="translate(${A.x + 20} ${A.y + 6}) rotate(${ang})"><g data-spin><svg x="0" y="${-S}" width="${S}" height="${S}" viewBox="0 0 100 100" overflow="visible">${o.draw(m.lying)}</svg></g></g>
      </svg>
      <div class="g2l-q"><span class="g2l-qname">${o.name}${pose ? ` ${pose}` : ''}</span>
        <div class="g2l-cards"><button type="button" class="g2l-card" data-g="1">🎳 Lăn</button><button type="button" class="g2l-card" data-g="0">✋ Không lăn</button></div></div>
    </div>`;
  const g = play.querySelector('[data-obj]'), spin = play.querySelector('[data-spin]');
  const face = play.querySelector('[data-face]');
  let done = false;
  play.addEventListener('click', async (e) => {
    const c = e.target.closest('.g2l-card');
    if (!c || done) return;
    done = true;
    sfx.tap();
    c.classList.add('g2l-picked');
    play.querySelectorAll('.g2l-card').forEach(b => { b.disabled = true; });
    const guess = c.dataset.g === '1';
    say('Thả xuống dốc…');
    await sleep(400);
    sfx.swish();
    const calm = calmMotion();
    if (m.rolls) {
      // Lăn: đi dọc mặt dốc, quay quanh tâm (tâm đồ vật ở giữa ô S × S).
      const L = Math.hypot(B.x - A.x, B.y - A.y) - S - 30;
      const turns = L / (Math.PI * S * (face ? 0.64 : 0.76)) * 360;
      const ms = calm ? 2200 : 1600;
      const t0 = performance.now();
      await new Promise((res) => {
        const step = (now) => {
          const t = Math.min(1, (now - t0) / ms), e2 = t * t;
          g.setAttribute('transform', `translate(${A.x + 20 + Math.cos(ang * Math.PI / 180) * L * e2} ${A.y + 6 + Math.sin(ang * Math.PI / 180) * L * e2}) rotate(${ang})`);
          if (face) face.setAttribute('transform', `rotate(${turns * e2} 44 58)`); // khối trụ: mặt đáy quay
          else spin.setAttribute('transform', `rotate(${turns * e2} ${S / 2} ${-S / 2})`);
          if (t < 1) requestAnimationFrame(step); else res();
        };
        requestAnimationFrame(step);
      });
      say('🎳 Lăn xuống dốc!');
    } else {
      // Không lăn: lắc nhẹ rồi đứng yên trên dốc.
      for (const d of [-4, 4, -2, 0]) { spin.setAttribute('transform', `rotate(${d} ${S / 2} 0)`); await sleep(calm ? 260 : 180); }
      say('✋ Đứng yên, không lăn!');
    }
    await sleep(500);
    const why = m.kind === 'cau' ? `${cap(o.name)} có dạng khối cầu: luôn lăn được.`
      : m.kind === 'lying' ? `${cap(o.name)} có dạng khối trụ, nằm ngang thì lăn được.`
        : m.kind === 'stand' ? `${cap(o.name)} có dạng khối trụ, dựng đứng (mặt đáy phẳng chạm dốc) thì không lăn.`
          : `${cap(o.name)} có các mặt phẳng, không lăn được.`;
    if (guess === m.rolls) return ok(why, m.rolls ? 'Đúng rồi, lăn vèo xuống dốc!' : 'Đúng rồi, đứng yên luôn!');
    bad(m.rolls ? 'Ơ, nó lăn xuống dốc rồi!' : 'Ơ, nó đứng yên không lăn!', why, 'Mặt cong tròn chạm dốc thì lăn. Mặt phẳng chạm dốc thì không lăn.');
  });
  speak(`${cap(n.me)} đặt ${o.name}${pose ? ` ${pose}` : ''} trên dốc trượt. ${cap(n.you)} đoán xem nó có lăn xuống không?`, null,
    `${cap(o.name)}${pose ? ` ${WANT(pose)}` : ''}: ${WANT('lăn hay không lăn')}?`);
}

function injectRollStyles() {
  if (document.getElementById('g2l-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2l-styles';
  st.textContent = `
    .g3f-theme-roll .g3f-awning { background: repeating-linear-gradient(90deg, #FB923C 0 30px, #FFF7ED 30px 60px); border-bottom-color: #C2410C; }
    .g3f-theme-roll .g3f-counter { background: linear-gradient(#ECFEFF, #DCFCE7); border-bottom-color: #16A34A; }
    .g3f-theme-roll .g3f-sign { background: #EA580C; border-color: #9A3412; color: #fff; }
    .g3f-theme-roll .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-roll .g3f-main::after { background: rgba(15,23,42,0.06); }
    .g2l-nopad .g3f-ask { display: none; }
    .g2l-nopad .g3f-npc { flex: 1 1 auto; }
    .g2l-nopad .g3f-npc img { max-height: 420px; }
    .g2l-sign-pic { font-size: 1.7em; line-height: 1; }
    .g2l-bench { flex: 1 1 0; min-height: 0; width: 100%; display: flex; flex-direction: column; gap: .5rem; padding: clamp(2.8rem, 8vh, 4rem) .5rem .5rem; box-sizing: border-box; font-family: 'Baloo 2', Quicksand, sans-serif; }
    .g2l-board { flex: none; display: flex; justify-content: center; font: 800 clamp(1rem, min(2.3vh + .5rem, 5vw), 1.6rem) 'Baloo 2', sans-serif; color: #9A3412; }
    .g2l-say { background: #fff; border-radius: .8rem; padding: .05em .7em; box-shadow: 0 3px 0 #FED7AA; }
    .g2l-play { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; gap: .6rem; justify-content: safe center; }
    .g2l-obj { display: block; overflow: visible; }
    .g2l-ghost { visibility: hidden; }
    /* Băng chuyền cao cố định; món đang xếp luôn ở giữa (cột giữa rộng cố định), hàng chờ ở cột phải: không món nào xê dịch. */
    .g2l-belt { flex: none; display: grid; grid-template-columns: 1fr clamp(7rem, 22vh, 11rem) 1fr; align-items: end; gap: 1rem; padding: .4rem 1rem .6rem; border-radius: 1rem; background: repeating-linear-gradient(90deg, #94A3B8 0 14px, #CBD5E1 14px 28px) bottom / 100% 14px no-repeat, #fff; border: 3px solid #CBD5E1; height: clamp(8.5rem, 27vh, 12.5rem); box-sizing: border-box; }
    .g2l-cur { grid-column: 2; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .g2l-cur .g2l-obj { width: clamp(5rem, 18vh, 9.5rem); height: clamp(5rem, 18vh, 9.5rem); }
    .g2l-pop { animation: g2lPop .4s cubic-bezier(.2,1.5,.4,1); }
    @keyframes g2lPop { from { transform: translateX(60px) scale(.7); opacity: 0; } }
    .g2l-name { font-weight: 800; color: #9A3412; font-size: clamp(1rem, 2.2vh + .3rem, 1.4rem); }
    .g2l-belt { position: relative; }
    .g2l-beltmsg { position: absolute; inset: 0 0 14px; display: grid; place-items: center; font: 800 clamp(1.4rem, 5vh + .4rem, 3rem) 'Baloo 2', sans-serif; color: #9A3412; animation: g2lPop .4s cubic-bezier(.2,1.5,.4,1); }
    .g2l-ok-t { color: #15803D; } .g2l-bad-t { color: #B91C1C; }
    .g2l-queue { grid-column: 3; min-width: 0; align-self: center; display: flex; gap: .3rem; opacity: .55; }
    .g2l-mini { flex: 0 1 2.4rem; min-width: 0; aspect-ratio: 1; height: auto; }
    .g2l-boxes { flex: 1 1 0; min-height: 0; display: flex; gap: .6rem; }
    .g2l-box { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; align-items: stretch; gap: .3rem; border: 4px solid #EA580C; border-radius: 1rem; background: linear-gradient(#FFF7ED, #FFEDD5); padding: .35rem; cursor: pointer; box-shadow: 0 5px 0 #C2410C; touch-action: manipulation; }
    .g2l-box:active { transform: translateY(3px); box-shadow: 0 2px 0 #C2410C; }
    .g2l-boxname { font: 800 clamp(1.05rem, 2.4vh + .4rem, 1.6rem) 'Baloo 2', sans-serif; color: #9A3412; }
    .g2l-inbox { position: relative; flex: 1; min-height: 3.2rem; padding-bottom: clamp(1rem, 12vh, 7.5rem); box-sizing: border-box; display: flex; flex-wrap: wrap; align-content: center; justify-content: center; gap: .4rem; container-type: size; }
    /* Hình mờ khối mẫu giữa hộp: hộp trống không trơ trọi, bé thấy hộp đựng loại khối nào. */
    .g2l-wm { position: absolute; inset: 0; display: grid; place-items: center; opacity: .13; pointer-events: none; }
    .g2l-wm .g2l-obj { width: min(70cqi, 70cqh); height: min(70cqi, 70cqh); }
    .g2l-inbox:not([data-n="0"]) .g2l-wm { display: none; }
    /* Cỡ đồ vật cố định (đủ chỗ 2 × 2): thêm món không làm các món đã xếp co lại. Chỉ khi bé dồn 5 món vào một hộp mới thu nhỏ.
       Đáy hộp chừa sẵn chỗ (padding-bottom) cho thẻ kết quả đè lên, nên hộp không co lại lúc thẻ hiện. */
    .g2l-got { --s: min(calc(50cqi - .4rem), 46cqh, 10rem); position: relative; width: var(--s); height: var(--s); border-radius: .8rem; }
    [data-n="5"] > .g2l-got { --s: min(31cqi, 46cqh, 9rem); }
    .g2l-mark { width: 1.8rem !important; height: 1.8rem !important; line-height: 1.8rem !important; font-size: 1.1rem !important; }
    .g2l-got .g2l-obj { width: 100%; height: 100%; }
    .g2l-ok { background: #DCFCE7; } .g2l-bad { background: #FEE2E2; outline: 2px solid #DC2626; }
    .g2l-mark { position: absolute; top: -.3rem; right: -.3rem; width: 1.3rem; height: 1.3rem; border-radius: 50%; background: #16A34A; color: #fff; font-size: .85rem; line-height: 1.3rem; text-align: center; }
    .g2l-bad .g2l-mark { background: #DC2626; }
    .g2l-hill { display: flex; flex-direction: column; align-items: center; gap: .5rem; }
    .g2l-ramp { width: 100%; max-height: 56vh; display: block; }
    .g2l-q { display: flex; flex-direction: column; align-items: center; gap: .4rem; }
    .g2l-qname { font-weight: 800; font-size: clamp(1.1rem, 2.6vh + .4rem, 1.7rem); color: #9A3412; background: #fff; border-radius: .8rem; padding: 0 .7em; }
    .g2l-cards { display: flex; gap: .7rem; }
    .g2l-card { border: 4px solid #fff; border-radius: 999px; background: linear-gradient(#FB923C, #EA580C); color: #fff; font: 800 clamp(1.1rem, 2.4vh + .5rem, 1.7rem) 'Baloo 2', sans-serif; padding: .2em 1.1em; cursor: pointer; box-shadow: 0 5px 0 #9A3412; touch-action: manipulation; }
    .g2l-card:disabled { opacity: .45; cursor: default; }
    .g2l-card.g2l-picked { opacity: 1; background: linear-gradient(#FDE047, #F59E0B); color: #7C2D12; }
    .g3g-has-result .g2l-cards { visibility: hidden; }
    @media (orientation: portrait) {
      .g2l-bench { padding-top: .3rem; } .g3f-theme-roll .g3f-sign { display: none; } .g2l-boxes { gap: .3rem; } .g2l-boxname { font-size: 1rem; }
      .g2l-card { font-size: 1.15rem; padding: .2em .8em; white-space: nowrap; }
      .g2l-qname { font-size: 1.15rem; }
    }
    @media (max-height: 500px) { .g2l-bench { padding-top: 2.4rem; } }
  `;
  document.head.appendChild(st);
}
