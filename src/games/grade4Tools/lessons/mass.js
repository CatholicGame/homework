/** Bài 17: Yến, tạ, tấn — ⚖️ Thang đơn vị (bảng hàng với đơn vị kg, yến, tạ, tấn: đủ 10 thì đổi lên). */

import { createPlace } from '../place.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx, INK, css } from '../frame.js';
import { calmMotion } from '../../grade3Games/fly.js';
import { fmt, fmtSp } from '../num.js';

const ST = `stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"`;
const ART = {
  kg: `<svg viewBox="0 0 120 60"><path d="M40 14 H80 L88 52 H32 Z" fill="#FEF3C7" ${ST}/><path d="M48 14 Q60 2 72 14" fill="none" ${ST}/><text x="60" y="44" text-anchor="middle" font-size="20" font-weight="800" fill="${INK}">1 kg</text></svg>`,
  yen: `<svg viewBox="0 0 120 60"><path d="M34 10 Q60 0 86 10 L92 52 Q60 60 28 52 Z" fill="#FDE68A" ${ST}/><path d="M40 14 H80" stroke="${INK}" stroke-width="2.5"/><text x="60" y="42" text-anchor="middle" font-size="19" font-weight="800" fill="${INK}">10 kg</text></svg>`,
  ta: `<svg viewBox="0 0 120 60"><rect x="18" y="12" width="74" height="30" rx="4" fill="#FB923C" ${ST}/><path d="M92 22 H112" ${ST}/><circle cx="34" cy="48" r="9" fill="#fff" ${ST}/><circle cx="76" cy="48" r="9" fill="#fff" ${ST}/><text x="55" y="34" text-anchor="middle" font-size="17" font-weight="800" fill="${INK}">100 kg</text></svg>`,
  tan: `<svg viewBox="0 0 120 60"><rect x="6" y="8" width="72" height="36" rx="4" fill="#60A5FA" ${ST}/><path d="M78 18 H100 L112 32 V44 H78 Z" fill="#93C5FD" ${ST}/><circle cx="26" cy="49" r="8" fill="#fff" ${ST}/><circle cx="94" cy="49" r="8" fill="#fff" ${ST}/><text x="42" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="${INK}">1 tấn</text></svg>`,
};
const UNITS = [
  { name: 'kg', art: ART.kg, bg: '#FFFBEB', light: '#FEF3C7', ink: '#92400E', kg: 1 },
  { name: 'yến', art: ART.yen, bg: '#FEF9C3', light: '#FEF9C3', ink: '#A16207', kg: 10 },
  { name: 'tạ', art: ART.ta, bg: '#FFEDD5', light: '#FFEDD5', ink: '#C2410C', kg: 100 },
  { name: 'tấn', art: ART.tan, bg: '#DBEAFE', light: '#DBEAFE', ink: '#1D4ED8', kg: 1000 },
];
const NAMES = UNITS.map(u => u.name);

/** "3 tạ 2 yến" từ các số đếm (bỏ đơn vị bằng 0). */
const mixed = (counts) => counts.map((c, p) => [c, p]).reverse().filter(([c]) => c).map(([c, p]) => `${c} ${NAMES[p]}`).join(' ') || '0 kg';
const topOf = (counts, v) => ({ num: counts.slice(1).some(Boolean) ? `${mixed(counts)} = <span style="color:#1D4ED8">${fmt(v)} kg</span>` : `<span style="color:#1D4ED8">${fmt(v)} kg</span>`, read: '' });

const massBoard = (board, value = 0) => createPlace(board, { cols: 4, units: UNITS, value, sum: false, read: true, top: topOf });

const B17 = {
  explore: {
    setup: (board) => { const t = massBoard(board); t.lock(true); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Để đo các vật nặng hàng chục, hàng trăm, hàng nghìn ki-lô-gam, người ta còn dùng yến, tạ, tấn.', 'Vật nặng: dùng <b>yến, tạ, tấn</b>');
        t.lock(false); t.only(0);
        await c.say('Bấm thêm túi 1 ki-lô-gam cho đủ 10 túi.', 'Bấm <b>+1 kg</b> cho đủ <b>10 túi</b>.');
        await c.until(t, () => t.counts[1] >= 1, { nudge: 'Bấm nút +1 kg ở cột bên phải.', el: () => t.src(0) });
        t.lock(true);
        await c.say('10 ki-lô-gam đổ vào một bao: 1 yến.', '<b>1 yến = 10 kg</b>');
      },
      async (c) => {
        const t = c.t;
        t.set(90);
        t.lock(false); t.only(1);
        await c.say('Đang có 9 bao 1 yến. Thêm 1 bao nữa.', 'Có 9 yến. Bấm <b>+1 yến</b>.');
        await c.until(t, () => t.counts[2] >= 1, { nudge: 'Bấm nút +1 yến.', el: () => t.src(1) });
        t.lock(true);
        await c.say('10 yến chất lên một xe ba gác: 1 tạ, bằng 100 ki-lô-gam.', '<b>1 tạ = 10 yến = 100 kg</b>');
      },
      async (c) => {
        const t = c.t;
        t.set(900);
        t.lock(false); t.only(2);
        await c.say('Có 9 xe ba gác, mỗi xe 1 tạ. Thêm 1 xe nữa.', 'Có 9 tạ. Bấm <b>+1 tạ</b>.');
        await c.until(t, () => t.counts[3] >= 1, { nudge: 'Bấm nút +1 tạ.', el: () => t.src(2) });
        t.lock(true);
        await c.say('10 tạ chất lên một xe tải: 1 tấn, bằng 1000 ki-lô-gam.', '<b>1 tấn = 10 tạ = 1 000 kg</b>');
        await c.say('Mỗi đơn vị gấp 10 lần đơn vị liền sau nó, giống như các hàng của số.', 'tấn → tạ → yến → kg: mỗi bậc <b>gấp 10 lần</b>');
      },
      async (c) => {
        const t = c.t;
        t.set(0);
        t.lock(false); t.only(null);
        await c.say('Đổi đơn vị: đặt 3 tạ 2 yến lên bảng, xem bằng bao nhiêu ki-lô-gam.', 'Đặt <b>3 tạ 2 yến</b> lên bảng.');
        let warned = false;
        const off = t.on(() => { if (!warned && (t.counts[2] > 3 || t.counts[1] > 2 || t.counts[0] || t.counts[3])) { warned = true; c.hint('Chỉ cần 3 xe tạ và 2 bao yến. Bấm vào vật thừa để bỏ ra.'); } });
        await c.until(t, () => t.value === 320, { nudge: 'Bấm +1 tạ ba lần, +1 yến hai lần.' });
        off();
        t.lock(true);
        await c.say('3 tạ là 300 ki-lô-gam, 2 yến là 20 ki-lô-gam. Vậy 3 tạ 2 yến bằng 320 ki-lô-gam.', '3 tạ 2 yến = 300 kg + 20 kg = <b>320 kg</b>');
      },
      async (c) => {
        await c.say('Con vật nào nặng khoảng 4 tấn?');
        const opts = [{ html: '🐘 Con voi', value: 'voi' }, { html: '🐄 Con bò', value: 'bo' }, { html: '🐒 Con khỉ', value: 'khi' }, { html: '🐈 Con mèo', value: 'meo' }];
        await c.choose(opts, 'voi', { hint: '4 tấn là 4 000 ki-lô-gam, rất nặng!' });
        await c.say('Đúng rồi! Voi nặng khoảng 4 tấn. Bò khoảng 4 tạ, khỉ khoảng 4 yến, mèo khoảng 4 ki-lô-gam.', 'Voi ~ 4 tấn · bò ~ 4 tạ · khỉ ~ 4 yến · mèo ~ 4 kg');
      },
    ],
  },
  tasks: () => [taskConvert(), taskConvert({ mixed: true }), taskCompare(), taskReal(), taskCalc(), taskBridge()],
};

// ── Thực hành ─────────────────────────────────────────────────────────────────────────────────────────

/** Đổi đơn vị: "3 tạ = ? kg", "4 yến 5 kg = ? kg", "2 000 kg = ? tấn", "30 tạ = ? tấn". */
function taskConvert({ mixed: mx = false } = {}) {
  return {
    id: `mconv${mx ? 'm' : ''}`,
    make: (rng) => {
      if (mx) {
        const hi = rng.int(1, 3), lo = hi - 1; // tạ+yến, yến+kg, tấn+tạ
        const a = rng.int(1, 9), b = rng.int(1, 9);
        return { kind: 'mixed', hi, lo, a, b };
      }
      const from = rng.int(1, 3), to = rng.int(0, from - 1);
      const a = rng.int(2, 9);
      return rng() < 0.5 ? { kind: 'down', from, to, a } : { kind: 'up', from, to, a };
    },
    async mount(f, m) {
      let q, ans, value, spoken;
      if (m.kind === 'mixed') {
        q = `${m.a} ${NAMES[m.hi]} ${m.b} ${NAMES[m.lo]} = ${BOX} ${NAMES[m.lo]}`;
        ans = m.a * 10 + m.b; value = m.a * UNITS[m.hi].kg + m.b * UNITS[m.lo].kg;
        spoken = `${m.a} ${NAMES[m.hi]} ${m.b} ${NAMES[m.lo]} bằng bao nhiêu ${NAMES[m.lo]}?`;
      } else if (m.kind === 'down') {
        q = `${m.a} ${NAMES[m.from]} = ${BOX} ${NAMES[m.to]}`;
        ans = m.a * 10 ** (m.from - m.to); value = m.a * UNITS[m.from].kg;
        spoken = `${m.a} ${NAMES[m.from]} bằng bao nhiêu ${NAMES[m.to]}?`;
      } else {
        const n = m.a * 10 ** (m.from - m.to);
        q = `${fmt(n)} ${NAMES[m.to]} = ${BOX} ${NAMES[m.from]}`;
        ans = m.a; value = m.a * UNITS[m.from].kg;
        spoken = `${fmtSp(n)} ${NAMES[m.to]} bằng bao nhiêu ${NAMES[m.from]}?`;
      }
      f.q.innerHTML = q;
      const t = massBoard(f.tool, value);
      t.lock(true);
      t.root.querySelector('.g4p-num').style.visibility = 'hidden';
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: 5, say: spoken, hint: 'Mỗi bậc tấn, tạ, yến, ki-lô-gam gấp nhau 10 lần.' });
      t.root.querySelector('.g4p-num').style.visibility = '';
      f.finish({ ok: q.replace(BOX, fmt(ans)) });
    },
  };
}

/** So sánh hai khối lượng ghi bằng đơn vị khác nhau. */
function taskCompare() {
  return {
    id: 'mcmp',
    make: (rng) => {
      const a = rng.int(2, 9), b = rng.int(1, 9);
      const kgA = a * 100 + b * 10; // a tạ b yến
      const kgB = kgA + rng.pick([-12, -2, 0, 3, 8, 15]);
      return { a, b, kgB };
    },
    async mount(f, { a, b, kgB }) {
      const kgA = a * 100 + b * 10;
      f.q.innerHTML = `${a} tạ ${b} yến ${BOX} ${fmt(kgB)} kg`;
      const t = massBoard(f.tool, kgA);
      t.lock(true);
      t.root.querySelector('.g4p-num').style.visibility = 'hidden';
      const sign = kgA > kgB ? '>' : kgA < kgB ? '<' : '=';
      await f.choose({ options: ['>', '<', '='].map(s => ({ html: s, value: s })), answer: sign, cls: 'g4-choice-big', say: 'Chọn dấu thích hợp.', hint: `Đổi ${a} tạ ${b} yến ra ki-lô-gam trước rồi so sánh.` });
      t.root.querySelector('.g4p-num').style.visibility = '';
      f.q.querySelector('.g4-box').textContent = sign;
      f.finish({ ok: `${a} tạ ${b} yến = ${kgA} kg ${sign} ${kgB} kg` });
    },
  };
}

/** Cân nặng hợp lý của con vật / đồ vật. */
function taskReal() {
  const ITEMS = [
    ['🐘', 'Con voi', 4, 'tấn'], ['🐄', 'Con bò', 4, 'tạ'], ['🐒', 'Con khỉ', 4, 'yến'], ['🐈', 'Con mèo', 4, 'kg'],
    ['🦒', 'Con hươu cao cổ', 1, 'tấn'], ['🐖', 'Con lợn', 1, 'tạ'], ['🐕', 'Con chó', 2, 'yến'], ['🚛', 'Xe tải chở cát', 5, 'tấn'],
    ['🌾', 'Bao gạo', 5, 'yến'], ['🐑', 'Con cừu', 5, 'yến'],
  ];
  return {
    id: 'mreal',
    make: (rng) => ({ i: rng.int(0, ITEMS.length - 1) }),
    async mount(f, { i }) {
      const [ic, name, n, u] = ITEMS[i];
      f.q.innerHTML = `<span style="font-size:2.4em">${ic}</span><br>${name} nặng khoảng bao nhiêu?`;
      await f.choose({ options: NAMES.map(x => ({ html: `${n} ${x}`, value: x })), answer: u, say: `${name} nặng khoảng bao nhiêu?`, hint: '1 yến = 10 kg, 1 tạ = 100 kg, 1 tấn = 1 000 kg. Nghĩ xem con vật nặng cỡ nào.' });
      f.finish({ ok: `${name} nặng khoảng ${n} ${u}.` });
    },
  };
}

/** Tính với đơn vị yến, tạ, tấn. */
function taskCalc() {
  return {
    id: 'mcalc',
    make: (rng) => {
      const u = rng.pick(['yến', 'tạ', 'tấn']);
      const op = rng.pick(['+', '-', '×', ':']);
      if (op === '+') { const a = rng.int(12, 150), b = rng.int(12, 99); return { u, op, a, b, r: a + b }; }
      if (op === '-') { const a = rng.int(40, 400), b = rng.int(10, a - 5); return { u, op, a, b, r: a - b }; }
      if (op === '×') { const a = rng.int(12, 60), b = rng.int(2, 9); return { u, op, a, b, r: a * b }; }
      const b = rng.int(2, 9), r = rng.int(12, 300); return { u, op, a: r * b, b, r };
    },
    async mount(f, { u, op, a, b, r }) {
      const unitB = op === '×' || op === ':' ? '' : ` ${u}`;
      f.q.innerHTML = `<span style="font-size:1.3em">${fmt(a)} ${u} ${op} ${fmt(b)}${unitB} = ${BOX} ${u}</span>`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: r, max: 5, say: 'Tính rồi ghi tên đơn vị.', hint: 'Tính như với số tự nhiên, kết quả giữ nguyên đơn vị.' });
      f.finish({ ok: `${fmt(a)} ${u} ${op} ${fmt(b)}${unitB} = ${fmt(r)} ${u}` });
    },
  };
}

/** Một cây cầu (nút chọn): bờ trái có voi chờ, sông, mặt cầu, biển tải trọng. */
const bridgeSvg = () => `<svg class="g4b-svg" viewBox="0 0 300 200" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
  <rect x="-600" y="-800" width="1500" height="1000" fill="#E0F2FE"/>
  <circle cx="262" cy="34" r="16" fill="#FDE047" stroke="${INK}" stroke-width="2.5"/>
  <g fill="#fff" stroke="${INK}" stroke-width="2.5"><ellipse cx="96" cy="40" rx="30" ry="12"/><ellipse cx="190" cy="66" rx="24" ry="10"/></g>
  <path d="M-600 150 Q75 140 150 150 T900 148 V400 H-600 Z" fill="#38BDF8"/><path d="M20 172 h30 M120 182 h40 M220 170 h34" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
  <path d="M-600 112 H58 L66 400 H-600 Z" fill="#86EFAC" ${ST}/><path d="M900 112 H242 L234 400 H900 Z" fill="#86EFAC" ${ST}/>
  <g class="g4b-deck"><rect x="54" y="104" width="192" height="16" rx="3" fill="#D97706" ${ST}/>
    <path d="M70 120 Q150 178 230 120" fill="none" ${ST}/><path d="M100 120 V140 M150 120 V149 M200 120 V140" stroke="${INK}" stroke-width="3"/>
    <path class="g4b-crack" d="M146 104 L154 112 L146 120" fill="none" stroke="#DC2626" stroke-width="5" stroke-linecap="round" opacity="0"/></g>
  <g class="g4b-ele"><text x="0" y="0" font-size="70" text-anchor="middle" transform="translate(30 106) scale(-1 1)">🐘</text></g>
</svg>`;

/** Voi qua cầu: cầu nào chịu được con voi nặng X kg? Chọn đúng: voi đi qua cầu. Chọn sai: cầu võng, nứt, voi lùi lại. */
function taskBridge() {
  return {
    id: 'mbridge',
    make: (rng) => {
      const w = rng.pick([150, 180, 240, 320]);
      return { w, s: rng.int(0, 1e6) };
    },
    async mount(f, { w, s }) {
      injectBridgeStyles();
      // Ba biển cầu: một biển chịu được (≥ w), hai biển không (< w), ghi bằng đơn vị khác nhau.
      const ok = w + [10, 20, 60][s % 3];
      const bad = [w - [10, 30, 50][s % 3], w - [60, 40, 20][(s >> 2) % 3]];
      const label = (kg) => (kg >= 100 && kg % 100 === 0 ? `${kg / 100} tạ` : kg >= 100 ? `${Math.floor(kg / 100)} tạ ${kg % 100} kg` : `${kg / 10} yến`);
      const signs = [ok, ...bad].sort((x, y) => ((x * 7 + s) % 5) - ((y * 7 + s) % 5));
      f.q.innerHTML = `🐘 Voi con nặng <b>${w} kg</b>. Voi đi qua được cầu nào?`;
      // Ba cây cầu là ba nút to nằm trong vùng công cụ (kín tờ giấy); biển tải trọng ghi ngay trên cầu.
      f.tool.innerHTML = '<div class="g4-choices g4b-row"></div>';
      const host = f.tool.firstElementChild;
      const btnOf = (kg) => host.querySelector(`[data-i="${signs.indexOf(kg)}"]`);
      const walk = (b, frames, ms) => b.querySelector('.g4b-ele').animate(frames, { duration: calmMotion() ? ms * 0.8 : ms, easing: 'ease-in-out', fill: 'forwards' }).finished;
      await f.choose({
        host,
        options: signs.map(kg => ({ html: `${bridgeSvg()}<span class="g4b-sign">tối đa <b>${label(kg)}</b></span>`, value: kg })),
        answer: ok, say: `Voi con nặng ${w} ki-lô-gam. Voi đi qua được cầu nào?`,
        hint: (kg) => {
          // voi bước lên cầu yếu: cầu võng xuống, nứt; voi lùi về bờ
          const b = btnOf(kg);
          walk(b, [{ transform: 'none' }, { transform: 'translate(80px, 0)', offset: 0.45 }, { transform: 'translate(80px, 8px)', offset: 0.6 }, { transform: 'none' }], 1300);
          b.querySelector('.g4b-deck').animate([{ transform: 'none' }, { transform: 'none', offset: 0.4 }, { transform: 'translateY(10px) rotate(2deg)', offset: 0.6 }, { transform: 'translateY(6px)' }], { duration: 1300, fill: 'forwards' });
          b.querySelector('.g4b-crack').animate([{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }], { duration: 1300, fill: 'forwards' });
          return `${label(kg)} là ${kg} ki-lô-gam, bé hơn ${w} ki-lô-gam. Cầu sẽ gãy!`;
        },
      });
      // voi đi qua cầu chịu được, nhún nhảy từng bước
      const steps = [...Array(9)].map((_, i) => ({ transform: `translate(${i * 30}px, ${i % 2 ? -6 : 0}px)` }));
      await walk(btnOf(ok), steps, 1800);
      sfx.ding();
      f.finish({ ok: `Cầu chịu được ${label(ok)} = ${ok} kg, nặng hơn voi con.` });
    },
  };
}

function injectBridgeStyles() {
  css('g4-bridge', `
    .g4b-row { flex: 1 1 0; min-height: 0; display: flex; gap: 1.6cqi; }
    .g4b-row .g4-choice { min-height: 0; display: flex; flex-direction: column; align-items: stretch; gap: 0.2em; padding: 0.3em; font-size: min(7cqh, 3.6cqi); overflow: hidden; }
    /* trời, bờ, sông vẽ tràn ra ngoài khung nhìn: nút cao hay dẹt thì hình vẫn kín nút (cầu bám đáy) */
    .g4b-svg { flex: 1 1 0; min-height: 0; width: 100%; overflow: visible; border-radius: 0.4em; }
    .g4b-ele { transform-box: view-box; }
    .g4b-deck { transform-box: view-box; transform-origin: 150px 112px; }
    .g4b-sign { flex: none; line-height: 1.15; position: relative; background: #fff; border-radius: 0.3em; }
    .g4b-sign b { color: #B45309; white-space: nowrap; }
    @container (orientation: portrait) {
      .g4b-row { flex-direction: column; gap: 1.2cqh; }
      .g4b-row .g4-choice { font-size: min(4.6cqh, 6.4cqi); }
    }
  `);
}

export const MASS_LESSONS = { 17: B17 };
export { sleep, UNITS };
