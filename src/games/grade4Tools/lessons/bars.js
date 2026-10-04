/**
 * Bài 5: Giải bài toán có ba bước tính — 📊 sơ đồ ba đoạn thẳng, mỗi bước tính một toa.
 * Bài 25: Tìm hai số biết tổng và hiệu — sơ đồ hai đoạn; cách 1 cắt phần hơn (kéo), cách 2 bù phần thiếu.
 */

import { createCanvas } from '../canvas.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx, INK } from '../frame.js';
import { fmt } from '../num.js';

const C1 = '#60A5FA', C2 = '#F472B6', CX = '#FDE047';
const X0 = 230;

/** Một đoạn có nhãn tên bên trái, số ở giữa. */
const bar = (cls, x, y, w, fill, text = '', { dash = false } = {}) => `<g class="${cls}"><rect x="${x}" y="${y}" width="${w}" height="56" rx="6" fill="${fill}" stroke="${INK}" stroke-width="4" ${dash ? 'stroke-dasharray="12 8" fill-opacity="0.35"' : ''}/>
  ${text ? `<text x="${x + w / 2}" y="${y + 39}" class="g4v-t" font-size="30">${text}</text>` : ''}</g>`;
const name = (y, s) => `<text x="${X0 - 20}" y="${y + 39}" class="g4v-t" font-size="32" style="text-anchor:end">${s}</text>`;
/** Ngoặc nhọn bên phải từ y1 tới y2, nhãn. */
const brace = (cls, x, y1, y2, s) => { const m = (y1 + y2) / 2; return `<g class="${cls}"><path d="M${x} ${y1} Q${x + 24} ${y1} ${x + 24} ${y1 + 20} V${m - 14} Q${x + 24} ${m} ${x + 40} ${m} Q${x + 24} ${m} ${x + 24} ${m + 14} V${y2 - 20} Q${x + 24} ${y2} ${x} ${y2}" fill="none" stroke="${INK}" stroke-width="4"/>
  <text x="${x + 50}" y="${m + 11}" class="g4v-t" font-size="32" style="text-anchor:start">${s}</text></g>`; };

// ── Bài 5 ─────────────────────────────────────────────────────────────────────────────────────────────
function threeBars(t, A, d1, d2, { show = { b: false, c: false, total: false } } = {}) {
  const B = A + d1, C = B - d2, k = 520 / Math.max(A, B, C);
  t.draw(`${name(60, '4A')}${bar('b-a', X0, 60, A * k, C1, String(A))}
    ${name(170, '4B')}${bar('b-b', X0, 170, A * k, C1)}${bar('b-b2', X0 + A * k, 170, d1 * k, CX, `${d1}`)}
    ${show.b ? `<text x="${X0 + (B * k) / 2}" y="${160}" class="g4v-t" font-size="28" fill="#16A34A">${B}</text>` : ''}
    ${name(280, '4C')}${bar('b-c', X0, 280, C * k, C1)}${bar('b-c2', X0 + C * k, 280, d2 * k, '#fff', `${d2}`, { dash: true })}
    ${show.c ? `<text x="${X0 + (C * k) / 2}" y="${270}" class="g4v-t" font-size="28" fill="#16A34A">${C}</text>` : ''}
    ${brace('b-br', X0 + Math.max(B, C + d2) * k + 30, 60, 336, show.total ? `${A + B + C} con` : '? con')}`);
}

const B5 = {
  explore: {
    setup: (board) => createCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('4A gấp <b>45</b> con hạc. 4B gấp nhiều hơn 4A <b>15</b> con. 4C gấp ít hơn 4B <b>8</b> con. Cả ba lớp gấp bao nhiêu con?');
        threeBars(t, 45, 15, 8);
        t.anim('g', [{ opacity: 0, transform: 'translateX(-30px)' }, { opacity: 1, transform: 'none' }], 400, { stagger: 600 });
        await c.say('Lớp 4A gấp được 45 con hạc giấy. Lớp 4B gấp nhiều hơn lớp 4A 15 con. Lớp 4C gấp ít hơn lớp 4B 8 con. Hỏi cả ba lớp gấp được bao nhiêu con hạc?');
        await c.say('Vẽ sơ đồ: đoạn 4B dài hơn đoạn 4A một phần 15 con. Đoạn 4C ngắn hơn đoạn 4B 8 con. Câu hỏi là tổng cả ba đoạn.');
      },
      async (c) => {
        const t = c.t;
        await c.say('Bước một: tìm số hạc của lớp 4B. Chọn phép tính.', 'Bước 1: số hạc lớp 4B');
        await c.choose([{ html: '45 + 15', value: 1 }, { html: '45 − 15', value: 2 }, { html: '45 × 15', value: 3 }], 1, { hint: 'Lớp 4B gấp nhiều hơn, nên cộng thêm.' });
        threeBars(t, 45, 15, 8, { show: { b: true } });
        await c.say('45 cộng 15 bằng 60. Lớp 4B gấp 60 con.', '4B: 45 + 15 = <b>60</b> (con)');
      },
      async (c) => {
        const t = c.t;
        await c.say('Bước hai: tìm số hạc của lớp 4C. Chọn phép tính.', 'Bước 2: số hạc lớp 4C');
        await c.choose([{ html: '60 + 8', value: 1 }, { html: '60 − 8', value: 2 }, { html: '45 − 8', value: 3 }], 2, { hint: 'Lớp 4C ít hơn lớp 4B, mà lớp 4B có 60 con.' });
        threeBars(t, 45, 15, 8, { show: { b: true, c: true } });
        await c.say('60 trừ 8 bằng 52. Lớp 4C gấp 52 con.', '4C: 60 − 8 = <b>52</b> (con)');
      },
      async (c) => {
        const t = c.t;
        await c.say('Bước ba: tìm số hạc cả ba lớp.', 'Bước 3: cả ba lớp');
        await c.choose([{ html: '45 + 15 + 8', value: 1 }, { html: '45 + 60 + 52', value: 2 }, { html: '60 + 52', value: 3 }], 2, { hint: 'Cộng số hạc của cả ba lớp: 4A, 4B, 4C.' });
        threeBars(t, 45, 15, 8, { show: { b: true, c: true, total: true } });
        t.caption('45 + 60 + 52 = <b>157</b> (con hạc) · Ba bước tính');
        await c.say('45 cộng 60 cộng 52 bằng 157. Cả ba lớp gấp được 157 con hạc. Bài toán giải bằng ba bước tính.');
      },
    ],
  },
  tasks: () => [taskThree(), taskThree({ less: true }), taskThree()],
};

// ── Bài 25 ────────────────────────────────────────────────────────────────────────────────────────────
function twoBars(t, S, D, { cut = false, glue = false, small = null, big = null, nameA = 'Nam', nameB = 'Việt' } = {}) {
  const s = (S - D) / 2, k = 560 / (s + D);
  const total = cut ? S - D : glue ? S + D : S;
  t.draw(`${name(110, nameA)}${bar('t-a', X0, 110, s * k, C1, big != null ? String(big) : '')}${cut ? '' : bar('t-a2', X0 + s * k, 110, D * k, CX, String(D))}
    ${name(230, nameB)}${bar('t-b', X0, 230, s * k, C2, small != null ? String(small) : '')}${glue ? bar('t-b2', X0 + s * k, 230, D * k, CX, String(D), { dash: true }) : ''}
    ${brace('t-br', X0 + (s + D) * k + 26, 110, 286, `${total}`)}`);
  return { s, k };
}

const B25 = {
  explore: {
    setup: (board) => createCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Hai bạn có <b>30</b> viên bi. Nam nhiều hơn Việt <b>6</b> viên. Mỗi bạn có mấy viên?');
        twoBars(t, 30, 6);
        t.anim('g', [{ opacity: 0 }, { opacity: 1 }], 400, { stagger: 600 });
        await c.say('Nam và Việt có tất cả 30 viên bi. Nam nhiều hơn Việt 6 viên. Hỏi mỗi bạn có bao nhiêu viên bi?');
        await c.say('Tổng là 30, hiệu là 6. Đoạn của Nam dài hơn đoạn của Việt một phần bằng 6 viên, tô màu vàng.', 'Tổng <b>30</b> · hiệu <b>6</b>');
      },
      async (c) => {
        const t = c.t;
        t.caption('Cách 1: <b>bỏ phần hơn</b> để hai đoạn bằng nhau');
        await c.say('Cách một: cắt bỏ phần hơn của Nam, hai đoạn sẽ bằng nhau. Bấm cái kéo.', 'Cách 1: bấm ✂️ cắt phần hơn');
        await c.choose([{ html: '✂️ Cắt phần hơn', value: 1 }], 1);
        sfx.swish();
        await t.anim('.t-a2', [{ transform: 'none', opacity: 1 }, { transform: 'translate(120px, -80px) rotate(20deg)', opacity: 0 }], 700);
        twoBars(t, 30, 6, { cut: true });
        await c.say('Bỏ phần hơn 6 viên, tổng còn lại là hai lần số bé. Chọn phép tính.', 'Hai lần số bé = ?');
        await c.choose([{ html: '30 − 6', value: 1 }, { html: '30 + 6', value: 2 }], 1, { hint: 'Đã cắt bớt đi 6 viên.' });
        await c.say('30 trừ 6 bằng 24. Đó là hai đoạn bằng nhau. Mỗi đoạn là số bé. Chọn phép tính.', '30 − 6 = 24 · số bé = ?');
        await c.choose([{ html: '24 : 2', value: 1 }, { html: '24 − 2', value: 2 }], 1, { hint: 'Hai đoạn bằng nhau, chia đôi.' });
        twoBars(t, 30, 6, { cut: true, small: 12, big: 12 });
        await c.say('24 chia 2 bằng 12. Việt có 12 viên. Nam có 12 cộng 6 bằng 18 viên.', 'Việt: (30 − 6) : 2 = <b>12</b> · Nam: 12 + 6 = <b>18</b>');
      },
      async (c) => {
        const t = c.t;
        twoBars(t, 30, 6);
        t.caption('Cách 2: <b>bù phần thiếu</b> để hai đoạn bằng nhau');
        await c.say('Cách hai: bù thêm cho Việt 6 viên, hai đoạn cũng bằng nhau.', 'Cách 2: bấm 🧩 bù phần thiếu');
        await c.choose([{ html: '🧩 Bù phần thiếu', value: 1 }], 1);
        twoBars(t, 30, 6, { glue: true });
        await t.anim('.t-b2', [{ transform: 'translateY(-90px)', opacity: 0 }, { transform: 'none', opacity: 1 }], 600);
        sfx.pop(3);
        await c.say('Tổng thành 30 cộng 6 bằng 36, là hai lần số lớn. Số lớn là 36 chia 2 bằng 18.', 'Nam: (30 + 6) : 2 = <b>18</b> · Việt: 18 − 6 = <b>12</b>');
        t.caption('Số bé = (Tổng − Hiệu) : 2 · Số lớn = (Tổng + Hiệu) : 2');
        await c.say('Ghi nhớ: số bé bằng tổng trừ hiệu, rồi chia 2. Số lớn bằng tổng cộng hiệu, rồi chia 2.');
      },
    ],
  },
  tasks: () => [taskSumDiff('bi'), taskSumDiff('tuoi'), taskSumDiff('hs'), taskSumDiff('cv')],
};

// ── Thực hành ─────────────────────────────────────────────────────────────────────────────────────────

/** Bài toán ba bước (dạng 4A, 4B, 4C): hỏi bước 1 rồi đáp số. */
function taskThree({ less = false } = {}) {
  const THINGS = [['cây', 'trồng'], ['quyển sách', 'quyên góp'], ['con hạc', 'gấp'], ['bông hoa', 'cắm']];
  return {
    id: `three${less ? 'l' : ''}`,
    make: (rng) => ({ A: rng.int(30, 90), d1: less ? rng.int(5, 15) : rng.int(5, 25), d2: rng.int(3, 10), th: rng.int(0, THINGS.length - 1) }),
    async mount(f, { A, d1, d2, th }) {
      const [thing, verb] = THINGS[th];
      const B = less ? A - d1 : A + d1, C = B - d2;
      f.q.innerHTML = `<small>Đội Một ${verb} ${A} ${thing}, đội Hai ${less ? 'ít' : 'nhiều'} hơn đội Một ${d1} ${thing}, đội Ba ít hơn đội Hai ${d2} ${thing}.</small>Đội Hai: ${BOX} · Cả ba đội: ${BOX}`;
      const t = createCanvas(f.tool);
      const k = 520 / Math.max(A, B, C);
      t.draw(`${name(40, 'Đội Một')}${bar('', X0, 40, A * k, C1, String(A))}${name(150, 'Đội Hai')}${bar('', X0, 150, B * k, C1, '?')}${name(260, 'Đội Ba')}${bar('', X0, 260, C * k, C1, '?')}
        ${brace('', X0 + Math.max(A, B, C) * k + 30, 40, 316, '?')}`);
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: B, max: 3, say: `Đội Hai ${verb} bao nhiêu ${thing}?`, hint: less ? `Đội Hai ít hơn: lấy ${A} trừ ${d1}.` : `Đội Hai nhiều hơn: lấy ${A} cộng ${d1}.` });
      await f.ask({ box: b2, answer: A + B + C, max: 4, say: `Cả ba đội ${verb} bao nhiêu ${thing}?`, hint: `Đội Ba có ${B} trừ ${d2}. Rồi cộng số của cả ba đội.` });
      f.finish({ ok: `Đội Hai: ${B}, đội Ba: ${C}, cả ba đội: ${A + B + C} ${thing}.` });
    },
  };
}

/** Tổng – hiệu: hỏi số bé rồi số lớn. */
function taskSumDiff(kind) {
  return {
    id: `sd-${kind}`,
    make: (rng) => { const s = rng.int(8, 60), d = rng.int(2, 20); return { s, d }; },
    async mount(f, { s, d }) {
      const S = 2 * s + d;
      const T = {
        bi: [`Hai bạn có ${S} viên bi, Nam nhiều hơn Việt ${d} viên.`, 'Việt', 'Nam', 'viên'],
        tuoi: [`Tổng số tuổi của hai chị em là ${S}, chị hơn em ${d} tuổi.`, 'Em', 'Chị', 'tuổi'],
        hs: [`Lớp có ${S} học sinh, số bạn nữ nhiều hơn số bạn nam ${d} bạn.`, 'Nam', 'Nữ', 'bạn'],
        cv: [`Nửa chu vi hình chữ nhật là ${S} cm, chiều dài hơn chiều rộng ${d} cm.`, 'Chiều rộng', 'Chiều dài', 'cm'],
      }[kind];
      f.q.innerHTML = `<small>${T[0]}</small>${T[1]}: ${BOX} ${T[3]} · ${T[2]}: ${BOX} ${T[3]}`;
      const t = createCanvas(f.tool);
      twoBars(t, S, d, { nameA: T[2], nameB: T[1] });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: s, max: 3, say: `${T[1]} là bao nhiêu?`, hint: `Số bé = (tổng − hiệu) : 2 = (${S} − ${d}) : 2.` });
      twoBars(t, S, d, { nameA: T[2], nameB: T[1], small: s });
      await f.ask({ box: b2, answer: s + d, max: 3, say: `${T[2]} là bao nhiêu?`, hint: `Số lớn = số bé + hiệu = ${s} + ${d}.` });
      twoBars(t, S, d, { nameA: T[2], nameB: T[1], small: s, big: s + d });
      f.finish({ ok: `${T[1]}: ${s}, ${T[2].toLowerCase()}: ${s + d} ${T[3]}.` });
    },
  };
}

export const BAR_LESSONS = { 5: B5, 25: B25 };
export { sleep, fmt };
