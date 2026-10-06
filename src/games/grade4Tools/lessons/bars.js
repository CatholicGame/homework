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

/**
 * Khung vẽ theo đúng tỉ lệ chỗ trống của tờ giấy (như frac.js): n hàng thanh giãn kín chiều cao.
 * Ngang: tên bên trái thanh. Dọc (tờ giấy dựng đứng): tên nằm trên thanh, thanh dài gần hết bề ngang.
 * Trả về { x0, span (bề dài thanh dài nhất), h (bề dày thanh), fs (cỡ chữ), bf (cỡ chữ ngoặc), ys (đỉnh từng thanh), tall }.
 */
function geo(t, n) {
  const r = t.svg.getBoundingClientRect();
  const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(1800, Math.max(380, (1000 * r.height) / r.width))) : 560;
  t.frame(0, 0, 1000, H);
  const tall = H > 860;
  const top = 16, slot = (H - top - 16) / n;
  const h = Math.min(tall ? 220 : 160, slot * (tall ? 0.46 : 0.55));
  const fs = Math.round(Math.min(tall ? 66 : 52, h * 0.5));
  const lead = tall ? fs * 1.15 : 0; // chỗ dòng tên phía trên thanh (dọc)
  const ys = [...Array(n)].map((_, i) => top + slot * i + (slot - h - lead) / 2 + lead);
  return { tall, x0: tall ? 30 : 270, span: tall ? 650 : 480, h, fs, nf: tall ? fs : Math.min(fs, 40), bf: tall ? fs : Math.min(fs, 40), ys };
}

/** Một đoạn có số ở giữa. */
const bar = (G, cls, x, y, w, fill, text = '', { dash = false } = {}) => `<g class="${cls}"><rect x="${x}" y="${y}" width="${w}" height="${G.h}" rx="${G.h * 0.12}" fill="${fill}" stroke="${INK}" stroke-opacity="0.55" stroke-width="2.5" ${dash ? 'stroke-dasharray="12 8" fill-opacity="0.35"' : ''}/>
  ${text ? `<text x="${x + w / 2}" y="${y + G.h / 2 + G.h * 0.21}" class="g4v-t" font-size="${Math.max(G.fs * 0.9, G.h * 0.6)}">${text}</text>` : ''}</g>`;
/** Tên thanh: ngang thì bên trái, dọc thì phía trên. */
const name = (G, y, s) => (G.tall
  ? `<text x="${G.x0}" y="${y - G.fs * 0.3}" class="g4v-t" font-size="${G.fs}" style="text-anchor:start">${s}</text>`
  : `<text x="${G.x0 - 22}" y="${y + G.h / 2 + G.fs * 0.33}" class="g4v-t" font-size="${G.nf}" style="text-anchor:end">${s}</text>`);
/** Số ghi ngay trên một thanh (kết quả vừa tính), màu xanh lá. */
const over = (G, x, y, s) => `<text x="${x}" y="${y - G.fs * 0.25}" class="g4v-t" font-size="${G.fs * 0.85}" fill="#16A34A" style="paint-order:stroke;stroke:#fff;stroke-width:8px">${s}</text>`;
/** Ngoặc nhọn bên phải từ y1 tới y2, nhãn. */
const brace = (G, cls, x, y1, y2, s) => { const m = (y1 + y2) / 2; return `<g class="${cls}"><path d="M${x} ${y1} Q${x + 24} ${y1} ${x + 24} ${y1 + 20} V${m - 14} Q${x + 24} ${m} ${x + 40} ${m} Q${x + 24} ${m} ${x + 24} ${m + 14} V${y2 - 20} Q${x + 24} ${y2} ${x} ${y2}" fill="none" stroke="${INK}" stroke-width="2.5"/>
  <text x="${x + 48}" y="${m + G.bf * 0.34}" class="g4v-t" font-size="${G.bf}" style="text-anchor:start">${s}</text></g>`; };

// ── Bài 5 ─────────────────────────────────────────────────────────────────────────────────────────────
function threeBars(t, A, d1, d2, { show = { b: false, c: false, total: false } } = {}) {
  const G = geo(t, 3), [ya, yb, yc] = G.ys, X0 = G.x0;
  const B = A + d1, C = B - d2, k = G.span / Math.max(A, B, C + d2);
  t.draw(`${name(G, ya, '4A')}${bar(G, 'b-a', X0, ya, A * k, C1, String(A))}
    ${name(G, yb, '4B')}${bar(G, 'b-b', X0, yb, A * k, C1)}${bar(G, 'b-b2', X0 + A * k, yb, d1 * k, CX, `${d1}`)}
    ${show.b ? over(G, X0 + (B * k) / 2, yb, B) : ''}
    ${name(G, yc, '4C')}${bar(G, 'b-c', X0, yc, C * k, C1)}${bar(G, 'b-c2', X0 + C * k, yc, d2 * k, '#fff', `${d2}`, { dash: true })}
    ${show.c ? over(G, X0 + (C * k) / 2, yc, C) : ''}
    ${brace(G, 'b-br', X0 + G.span + 26, ya, yc + G.h, show.total ? `${A + B + C} con` : '? con')}`);
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
  const G = geo(t, 2), [ya, yb] = G.ys, X0 = G.x0;
  const s = (S - D) / 2, k = G.span / (s + D);
  const total = cut ? S - D : glue ? S + D : S;
  t.draw(`${name(G, ya, nameA)}${bar(G, 't-a', X0, ya, s * k, C1, big != null ? String(big) : '')}${cut ? '' : bar(G, 't-a2', X0 + s * k, ya, D * k, CX, String(D))}
    ${name(G, yb, nameB)}${bar(G, 't-b', X0, yb, s * k, C2, small != null ? String(small) : '')}${glue ? bar(G, 't-b2', X0 + s * k, yb, D * k, CX, String(D), { dash: true }) : ''}
    ${brace(G, 't-br', X0 + G.span + 26, ya, yb + G.h, `${total}`)}`);
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
      const G = geo(t, 3), [y1, y2, y3] = G.ys;
      const k = G.span / Math.max(A, B, C);
      t.draw(`${name(G, y1, 'Đội Một')}${bar(G, '', G.x0, y1, A * k, C1, String(A))}${name(G, y2, 'Đội Hai')}${bar(G, '', G.x0, y2, B * k, C1, '?')}${name(G, y3, 'Đội Ba')}${bar(G, '', G.x0, y3, C * k, C1, '?')}
        ${brace(G, '', G.x0 + G.span + 26, y1, y3 + G.h, '?')}`);
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
