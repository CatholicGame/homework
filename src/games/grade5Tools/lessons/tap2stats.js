/**
 * Toán 5 Tập Hai, chủ đề 11 Một số yếu tố thống kê và xác suất (sách mẫu chưa có các trang này: chưa đối chiếu sách,
 * soạn theo chương trình KNTT; xem docs/lop_5/kien-thuc-toan5-tap2.md).
 *   Bài 63 Thu thập, phân loại, sắp xếp các số liệu (tr. 87–89): 📋 phiếu hỏi + bảng kiểm đếm (chance.js với đồ vật
 *     "xấp phiếu"), thẻ số liệu (stats.js của lớp 4): tổng, thiếu phiếu, nhiều nhất, phân loại, sắp xếp.
 *   Bài 64 Biểu đồ hình quạt tròn (tr. 90–93): 🥧 pie.js: cả hình tròn 100%, đọc, tìm % còn thiếu, tính số người, kéo tô %.
 *   Bài 65 Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện (tr. 94–95): 🎲 thí nghiệm + kiểm đếm
 *     (chance.js), viết tỉ số số lần xảy ra / tổng số lần.
 * Bài 66, 67, 74 (catalog: mix 63, 64, 65) dùng lại các dạng câu ở đây. Cuối file: cấp Luyện Tính (STATS_DRILL_LEVELS).
 */
// chưa đối chiếu sách: Bài 63–65 (số liệu ví dụ, tên dạng bài theo chương trình, không theo trang sách)

import { createStats } from '../../grade4Tools/stats.js';
import { createChance, EVART, tallySvg, dieFace } from '../../grade4Tools/chance.js';
import { BOX } from '../../grade4Tools/practice.js';
import { css, sfx, INK } from '../../grade4Tools/frame.js';
import { shake } from '../../grade3Drills/kit.js';
import { makeRng } from '../../grade3Games/loop.js';
import { calmMotion } from '../../grade3Games/fly.js';
import { createPie, pieSvg, PIE_COLORS } from '../pie.js';
import { fr, fmt, simp } from '../num.js';

const sum = (a) => a.reduce((x, y) => x + y, 0);
const ms = (n) => (calmMotion() ? Math.round(n * 0.8) : n);
const KIDS = ['Nam', 'Việt', 'Mai', 'Mi', 'Lan', 'Minh', 'Hà', 'An', 'Khoa', 'Linh', 'Quân', 'Thảo', 'Bình', 'Hùng', 'Ngọc', 'Phúc', 'Trang', 'Tú', 'Vy', 'Long'];

/** Giữ chỗ vùng nút chọn từ đầu lượt (nút hiện sau, bố cục không nhảy). */
function reserveChoices(f, n) {
  f.choicesBox.innerHTML = Array.from({ length: n }, () => '<button type="button" class="g4-choice" disabled style="visibility:hidden">&nbsp;</button>').join('');
  f.choicesBox.classList.add('g4-choices-on');
}
/** Một nút to "Kiểm tra" trong vùng nút chọn; trả về hàm chờ bấm. */
function checkButton(f, label = '✔ Kiểm tra') {
  f.choicesBox.innerHTML = `<button type="button" class="g4-choice g4-choice-go">${label}</button>`;
  f.choicesBox.classList.add('g4-choices-on');
  const b = f.choicesBox.firstElementChild;
  return {
    el: b,
    next: () => new Promise((res) => { b.onclick = () => { sfx.tap(); res(); }; if (import.meta.env.DEV) window.__g4check = b; }),
    done() { b.disabled = true; b.textContent = '✔'; },
  };
}
/** Một lỗi của bước (đếm một lần cho mỗi bước). */
const miss = (f, st) => { if (!st.missed) { st.missed = true; f.mistakes++; } };
/** Chờ một hoạt ảnh xong (không treo nếu trình duyệt bỏ qua sự kiện finish). */
const anim = (el, frames, dur, opts = {}) => new Promise((res) => {
  const a = el.animate(frames, { duration: dur, ...opts });
  const tm = setTimeout(res, dur + 120);
  a.onfinish = () => { clearTimeout(tm); res(); };
});

// ── Hình nhỏ (viewBox 0 0 40 40) cho các lựa chọn trong phiếu hỏi ────────────────────────────────────
const ST = `stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"`;
const ART = {
  football: () => `<circle cx="20" cy="20" r="15" fill="#fff" ${ST}/><path d="M20 13 L26 17.5 L24 24.5 H16 L14 17.5 Z" fill="${INK}"/><path d="M20 13 V5.5 M26 17.5 L33.5 14.5 M24 24.5 L29 31 M16 24.5 L11 31 M14 17.5 L6.5 14.5" stroke="${INK}" stroke-width="2"/>`,
  shuttle: () => `<path d="M12 8 L28 8 L23 24 H17 Z" fill="#fff" ${ST}/><path d="M16 8 L18.5 24 M20 8 V24 M24 8 L21.5 24" stroke="#94A3B8" stroke-width="1.6"/><path d="M17 24 H23 V28 Q23 34 20 34 Q17 34 17 28 Z" fill="#F87171" ${ST}/>`,
  swim: () => `<circle cx="20" cy="15" r="7" fill="#FDBA74" ${ST}/><path d="M13 13 Q20 5 27 13 Z" fill="#2563EB" ${ST}/><path d="M4 26 Q9 22 14 26 T24 26 T34 26 T40 26" fill="none" stroke="#0EA5E9" stroke-width="3.4" stroke-linecap="round"/><path d="M4 33 Q9 29 14 33 T24 33 T34 33" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>`,
  chess: () => `<circle cx="20" cy="11" r="5" fill="#334155" ${ST}/><path d="M15 17 H25 L23 27 H17 Z" fill="#334155" ${ST}/><path d="M11 33 Q11 27 20 27 Q29 27 29 33 Z" fill="#334155" ${ST}/>`,
  orange: () => `<circle cx="20" cy="22" r="13" fill="#FB923C" ${ST}/><path d="M20 9 Q24 3 30 6 Q26 11 20 9" fill="#4ADE80" ${ST}/><circle cx="15" cy="18" r="2" fill="#FED7AA"/>`,
  banana: () => `<path d="M8 12 Q10 32 32 30 Q34 27 31 26 Q16 26 14 10 Z" fill="#FDE047" ${ST}/><path d="M8 12 L6 8 L10 8 Z" fill="#78350F" ${ST}/>`,
  mango: () => `<path d="M12 28 Q6 16 16 9 Q28 3 32 16 Q35 30 22 33 Q15 34 12 28 Z" fill="#FBBF24" ${ST}/><path d="M18 9 Q19 4 24 3" fill="none" stroke="#15803D" stroke-width="2.4"/><path d="M14 18 Q18 14 22 15" fill="none" stroke="#FEF3C7" stroke-width="2"/>`,
  melon: () => `<path d="M5 15 H35 Q35 33 20 33 Q5 33 5 15 Z" fill="#EF4444" ${ST}/><path d="M5 15 Q5 35 20 35 Q35 35 35 15" fill="none" stroke="#16A34A" stroke-width="4"/><circle cx="14" cy="21" r="1.6" fill="${INK}"/><circle cx="20" cy="25" r="1.6" fill="${INK}"/><circle cx="26" cy="21" r="1.6" fill="${INK}"/>`,
  dot: (c) => `<circle cx="20" cy="20" r="14" fill="${c}" ${ST}/><ellipse cx="15" cy="15" rx="3" ry="4" fill="#fff" opacity=".5"/>`,
};

/** Các cuộc điều tra (mỗi bạn chọn một). */
const SURVEYS = [
  { id: 'sport', head: 'Môn thể thao', title: 'Môn thể thao em thích nhất', noun: 'bạn', cats: [['Bóng đá', ART.football()], ['Cầu lông', ART.shuttle()], ['Bơi', ART.swim()], ['Cờ vua', ART.chess()]] },
  { id: 'fruit', head: 'Loại quả', title: 'Loại quả em thích nhất', noun: 'bạn', cats: [['Cam', ART.orange()], ['Chuối', ART.banana()], ['Xoài', ART.mango()], ['Dưa hấu', ART.melon()]] },
  { id: 'color', head: 'Màu', title: 'Màu em thích nhất', noun: 'bạn', cats: [['Đỏ', ART.dot('#EF4444')], ['Xanh', ART.dot('#3B82F6')], ['Vàng', ART.dot('#FACC15')]] },
];
const surOf = (id) => SURVEYS.find(s => s.id === id);

/** Đồ vật "xấp phiếu hỏi" cho createChance: mỗi lần mở một phiếu, phiếu ghi tên bạn và lựa chọn của bạn ấy. */
function voteDevice(S) {
  const K = S.cats.length;
  const face = (d) => (d ? `<g transform="translate(150 118) scale(2.7) translate(-20 -20)">${S.cats[d.c][1]}</g>
      <text x="150" y="205" text-anchor="middle" font-size="26" font-weight="800" fill="${INK}" font-family="Baloo 2, sans-serif">${d.name}</text>`
    : `<text x="150" y="92" text-anchor="middle" font-size="26" font-weight="800" fill="#64748B" font-family="Baloo 2, sans-serif">PHIẾU HỎI</text>
      ${[0, 1, 2, 3].map(k => `<line x1="98" y1="${122 + k * 24}" x2="202" y2="${122 + k * 24}" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round"/>`).join('')}`);
  const card = (cls, dx, dy, extra = '') => `<g class="${cls}" transform="translate(${dx} ${dy})"><rect x="78" y="50" width="144" height="178" rx="14" fill="#fff" stroke="${INK}" stroke-width="3"/>${extra}</g>`;
  return () => ({
    act: '📄 Mở phiếu',
    html: `<svg viewBox="0 0 300 260" class="g4ce-svg">
        ${card('', 14, 10)}${card('', 7, 5)}
        <g class="p63-card" style="transform-box: fill-box; transform-origin: 50% 50%">${card('', 0, 0, '<g class="p63-face"></g>')}</g></svg>`,
    sample: (rng) => ({ c: Math.min(K - 1, Math.floor(rng() * K)), name: KIDS[Math.floor(rng() * KIDS.length)] }),
    async play(svg, d, fast) {
      const c = svg.querySelector('.p63-card'), fc = svg.querySelector('.p63-face');
      if (!fc.innerHTML) fc.innerHTML = face(null);
      sfx.swish();
      const h = ms(fast ? 140 : 300);
      await anim(c, [{ transform: 'none' }, { transform: 'translateY(-14px) scaleX(0.04)' }], h, { easing: 'ease-in', fill: 'forwards' });
      fc.innerHTML = face(d);
      await anim(c, [{ transform: 'translateY(-14px) scaleX(0.04)' }, { transform: 'none' }], h, { easing: 'ease-out', fill: 'forwards' });
      sfx.tick();
    },
    async reset(svg, d, fast) {
      const c = svg.querySelector('.p63-card'), fc = svg.querySelector('.p63-face');
      await anim(c, [{ transform: 'none', opacity: 1 }, { transform: 'translate(60px, -30px) rotate(12deg)', opacity: 0 }], ms(fast ? 120 : 260), { easing: 'ease-in', fill: 'forwards' });
      fc.innerHTML = face(null);
      await anim(c, [{ transform: 'translate(7px, 5px)', opacity: 0.4 }, { transform: 'none', opacity: 1 }], ms(fast ? 90 : 200), { fill: 'forwards' });
    },
    out: (svg) => svg.querySelector('.p63-card'),
  });
}
const surveyEvents = (S) => S.cats.map(([label, art], k) => ({ label, art, test: d => d.c === k }));

// ════ Bài 63: Thu thập, phân loại, sắp xếp các số liệu ═══════════════════════════════════════════════

const SPORT_RIG = [...Array(7).fill(0), ...Array(5).fill(1), ...Array(3).fill(2), ...Array(5).fill(3)]; // 7, 5, 3, 5 = 20 bạn
const B63 = {
  explore: {
    setup: (board) => {
      const rig = [...SPORT_RIG];
      for (let i = rig.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rig[i], rig[j]] = [rig[j], rig[i]]; }
      const S = surOf('sport');
      return createChance(board, { device: voteDevice(S), events: surveyEvents(S), trials: 20, manual: 4, style: 'classic', rig, explore: true, head: S.head, fastLabel: '⏩ Mở nhanh' });
    },
    steps: [
      async (c) => {
        await c.say('Lớp 5A có 20 bạn. Cô giáo muốn biết mỗi bạn thích môn thể thao nào nhất. Làm thế nào để biết?', 'Muốn biết <b>20 bạn</b> thích môn nào nhất?');
        await c.choose([{ html: '📄 Phát phiếu, hỏi từng bạn', value: 1 }, { html: '🤔 Đoán', value: 2 }, { html: '🙋 Hỏi một bạn', value: 3 }], 1, { hint: 'Muốn biết của cả lớp thì phải hỏi đủ từng bạn.' });
        await c.say('Mỗi bạn ghi môn mình thích vào một phiếu. Đó là thu thập số liệu.', '① <b>Thu thập</b>: mỗi bạn một phiếu');
      },
      async (c) => {
        const t = c.t;
        await c.say('Bây giờ phân loại các phiếu. Bấm Mở phiếu, xem bạn ấy thích môn gì, rồi chạm vào hàng môn đó để gạch một vạch.', '② <b>Phân loại</b>: mở phiếu, chạm đúng <b>hàng</b>');
        const off = t.on((ev, k, want) => {
          if (ev === 'wrong') c.hint(`Phiếu này ghi ${t.events[want].label}. Chạm hàng ${t.events[want].label}.`);
          if (ev === 'early') c.hint('Bấm nút Mở phiếu trước.');
        });
        await c.until(t, () => t.done >= 4, { nudge: () => (t.cur >= 0 ? 'Chạm hàng có môn ghi trên phiếu.' : 'Bấm nút Mở phiếu.'), el: () => (t.cur >= 0 ? t.row(t.cur) : t.actBtn) });
        off();
        await c.say('Mỗi phiếu một vạch. Vạch thứ năm gạch chéo qua bốn vạch, để đếm theo nhóm 5.', 'Mỗi phiếu <b>1 vạch</b>, đủ 5 thì gạch chéo');
      },
      async (c) => {
        const t = c.t;
        await c.say('Bấm Mở nhanh để phân loại nốt các phiếu còn lại.', 'Bấm <b>⏩ Mở nhanh</b> cho đủ <b>20 phiếu</b>.');
        const off = t.on((ev, k, want) => { if (ev === 'wrong') c.hint(`Chạm hàng ${t.events[want].label}.`); });
        await c.until(t, () => t.done >= 20, { nudge: 'Bấm nút Mở nhanh.', el: () => t.fastBtn });
        off();
        t.hl(0);
        await c.say('Đếm số vạch. Bao nhiêu bạn thích bóng đá?', '③ <b>Kiểm đếm</b>: bóng đá bao nhiêu bạn?');
        await c.choose([{ html: '5 bạn', value: 5 }, { html: '7 bạn', value: 7 }, { html: '12 bạn', value: 12 }], t.counts[0], { hint: 'Một nhóm gạch chéo là 5, đếm thêm các vạch lẻ.' });
        t.showCount(0);
        t.hl(2);
        await c.say('Còn môn bơi?', 'Bơi bao nhiêu bạn?');
        await c.choose([{ html: '3 bạn', value: 3 }, { html: '4 bạn', value: 4 }, { html: '8 bạn', value: 8 }], t.counts[2], { hint: 'Hàng Bơi chưa đủ một nhóm 5: đếm từng vạch.' });
        t.showCount(2);
        t.hl(-1);
        t.showCount(1); t.showCount(3);
        await c.say('Cầu lông 5 bạn, cờ vua 5 bạn. Ta được bảng số liệu.', 'Bóng đá <b>7</b> · Cầu lông <b>5</b> · Bơi <b>3</b> · Cờ vua <b>5</b>');
      },
      async (c) => {
        await c.say('Kiểm tra lại: cộng số bạn của các môn có bằng số bạn của lớp không?', '7 + 5 + 3 + 5 = ?');
        await c.choose([{ html: '20 bạn', value: 20 }, { html: '19 bạn', value: 19 }, { html: '15 bạn', value: 15 }], 20, { hint: '7 + 5 = 12, 12 + 3 = 15, 15 + 5 = 20.' });
        await c.say('7 cộng 5 cộng 3 cộng 5 bằng 20, đúng bằng số bạn của lớp. Không sót phiếu nào, không đếm trùng phiếu nào.', '7 + 5 + 3 + 5 = <b>20</b>: đủ phiếu ✓');
      },
      async (c) => {
        const t = c.use((b) => createStats(b, [['Bóng đá', 7], ['Cầu lông', 5], ['Bơi', 3], ['Cờ vua', 5]].map(([label, value]) => ({ label, value })), { unit: 'bạn', sortable: true, explore: true, seqLabel: 'Số bạn' }));
        t.caption('Sắp xếp các môn theo số bạn thích');
        await c.say('Sắp xếp các môn theo số bạn thích, từ nhiều đến ít. Kéo thẻ thả lên thẻ khác, hoặc chạm hai thẻ, để đổi chỗ.', '④ <b>Sắp xếp</b> từ <b>nhiều đến ít</b>: kéo hoặc chạm hai thẻ');
        await c.until(t, () => t.sorted('desc'), { nudge: 'Thẻ có số lớn nhất đứng đầu bên trái.', el: () => t.cards[0] });
        t.signs(true, 'desc');
        await c.say('Bóng đá được nhiều bạn thích nhất, 7 bạn. Bơi ít bạn thích nhất, 3 bạn.', 'Nhiều nhất: <b>Bóng đá</b> · ít nhất: <b>Bơi</b>');
        await c.say('Bóng đá nhiều hơn bơi bao nhiêu bạn?');
        await c.choose([{ html: '4 bạn', value: 4 }, { html: '10 bạn', value: 10 }, { html: '3 bạn', value: 3 }], 4, { hint: 'Lấy 7 trừ 3.' });
        await c.say('Thu thập, phân loại, kiểm đếm, sắp xếp: từ bảng số liệu, ta trả lời được nhiều câu hỏi.', 'Thu thập → phân loại → kiểm đếm → sắp xếp');
      },
    ],
  },
  tasks: () => [taskPTally(), taskPTotal(), taskPMiss(), taskPMost(), taskPClass(), taskPSort()],
};

/** Bảng số liệu ngẫu nhiên của một cuộc điều tra: counts khác nhau đôi một khi distinct. */
function surveyData(rng, { distinct = true, lo = 2, hi = 12 } = {}) {
  const S = rng.pick(SURVEYS);
  let counts;
  for (let k = 0; k < 50; k++) {
    counts = S.cats.map(() => rng.int(lo, hi));
    if (!distinct || new Set(counts).size === counts.length) break;
  }
  return { s: S.id, counts };
}
const cardsOf = (S, counts) => S.cats.map(([label], i) => ({ label, value: counts[i] }));

/** Mở phiếu, phân loại, kiểm đếm rồi ghi số. */
function taskPTally() {
  return {
    id: 'ptally',
    make: (rng) => ({ s: rng.pick(SURVEYS).id, n: rng.pick([10, 12, 15]), seed: rng.int(1, 1e9) }),
    async mount(f, m) {
      const S = surOf(m.s);
      const t = createChance(f.tool, { device: voteDevice(S), events: surveyEvents(S), trials: m.n, manual: 3, style: 'classic', rng: makeRng(m.seed), head: S.head, fastLabel: '⏩ Mở nhanh' });
      reserveChoices(f, 3);
      f.q.innerHTML = `${S.title} <small>Có ${m.n} phiếu. Phân loại, kiểm đếm</small>`;
      f.say(`Có ${m.n} phiếu hỏi: ${S.title.toLowerCase()}. Mở từng phiếu, rồi chạm đúng hàng để gạch một vạch.`, '👆 Bấm <b>📄 Mở phiếu</b>, rồi chạm đúng <b>hàng</b>.');
      const st = { missed: false };
      t.on((ev, k, want) => {
        if (ev === 'rolled') { st.missed = false; f.show('👆 Chạm đúng <b>hàng</b> để gạch một vạch.'); }
        if (ev === 'wrong') { miss(f, st); f.hint(`Phiếu ghi ${S.cats[want][0]}. Chạm hàng ${S.cats[want][0]}.`); }
        if (ev === 'early') f.hint('Bấm nút Mở phiếu trước.');
        if (ev === 'mark' && t.done === 3) f.say('Bấm Mở nhanh để phân loại nốt các phiếu.', `Bấm <b>⏩ Mở nhanh</b> cho đủ <b>${m.n} phiếu</b>.`);
      });
      if (import.meta.env.DEV) window.__g4ans = { kind: 'exp', t };
      await new Promise((res) => t.on((ev) => { if (ev === 'done') res(); }));
      for (let k = 0; k < S.cats.length; k++) {
        t.hl(k);
        await f.ask({ box: t.countBox(k), answer: t.counts[k], max: 2, say: k === 0 ? `Đếm vạch, ghi số ${S.noun} chọn ${S.cats[k][0].toLowerCase()}.` : `Còn ${S.cats[k][0].toLowerCase()}?`,
          hint: 'Mỗi nhóm gạch chéo là 5. Đếm 5, 10, rồi đếm thêm các vạch lẻ.' });
      }
      t.hl(-1);
      f.finish({ ok: `${S.cats.map(([l], k) => `${l} ${t.counts[k]}`).join(', ')}: cộng lại đủ ${m.n} phiếu.` });
    },
  };
}

/** Tổng số bạn được hỏi = cộng số liệu các nhóm. */
function taskPTotal() {
  return {
    id: 'ptotal',
    make: (rng) => surveyData(rng, { distinct: false, lo: 3, hi: 14 }),
    async mount(f, m) {
      const S = surOf(m.s), total = sum(m.counts);
      const t = createStats(f.tool, cardsOf(S, m.counts), { unit: S.noun, seq: false });
      t.caption(`📋 ${S.title}`);
      t.lock(true);
      f.q.innerHTML = `Có tất cả ${BOX} ${S.noun} được hỏi`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: total, max: 3, say: 'Mỗi bạn chọn một. Có tất cả bao nhiêu bạn được hỏi?',
        hint: `Cộng số bạn của các nhóm: ${m.counts.join(' + ')}.` });
      f.finish({ ok: `${m.counts.join(' + ')} = ${total} ${S.noun}.` });
    },
  };
}

/** Lớp có N bạn, bảng kiểm đếm còn thiếu mấy phiếu (tổng các nhóm chưa bằng N). */
function taskPMiss() {
  return {
    id: 'pmiss',
    make: (rng) => { const d = surveyData(rng, { distinct: false, lo: 3, hi: 10 }); return { ...d, miss: rng.int(1, 4) }; },
    async mount(f, m) {
      const S = surOf(m.s), got = sum(m.counts), N = got + m.miss;
      const t = createStats(f.tool, cardsOf(S, m.counts), { unit: S.noun, seq: false });
      t.caption(`Lớp có <b>${N}</b> bạn, mỗi bạn một phiếu`);
      t.lock(true);
      f.q.innerHTML = `Còn thiếu ${BOX} phiếu chưa kiểm đếm`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: m.miss, max: 2, say: `Lớp có ${N} bạn, mỗi bạn một phiếu. Bảng kiểm đếm còn thiếu mấy phiếu?`,
        hint: (v) => (v === got ? 'Đó là số phiếu đã đếm. Lấy số bạn của lớp trừ đi số phiếu đã đếm.' : `Cộng các nhóm: ${m.counts.join(' + ')} = ${got}. Lấy ${N} trừ ${got}.`) });
      f.finish({ ok: `${m.counts.join(' + ')} = ${got}; ${N} − ${got} = ${m.miss} phiếu còn thiếu.` });
    },
  };
}

/** Chạm nhóm nhiều nhất (ít nhất), rồi tính hơn kém. */
function taskPMost() {
  return {
    id: 'pmost',
    make: (rng) => ({ ...surveyData(rng, { distinct: true, lo: 2, hi: 15 }), most: rng.int(0, 1) }),
    async mount(f, m) {
      const S = surOf(m.s);
      const t = createStats(f.tool, cardsOf(S, m.counts), { unit: S.noun, seq: false });
      t.caption(`📋 ${S.title}`);
      const hi = m.counts.indexOf(Math.max(...m.counts)), lo = m.counts.indexOf(Math.min(...m.counts));
      const want = m.most ? hi : lo, other = m.most ? lo : hi;
      const w = m.most ? 'nhiều' : 'ít';
      f.q.innerHTML = `Chạm vào nhóm được <b>${w} bạn chọn nhất</b>`;
      f.say(`Nhóm nào được ${w} bạn chọn nhất? Chạm vào thẻ đó.`);
      const st = { missed: false };
      if (import.meta.env.DEV) window.__g4ans = { kind: 'tap', tap: () => t.tap(want) };
      await new Promise((res) => {
        const off = t.on((ev, i) => {
          if (ev !== 'tap') return;
          if (i === want) { off(); t.mark(i, m.most ? 'max' : 'min'); sfx.ding(); res(); return; }
          miss(f, st); shake(t.cards[i]); f.hint(`${S.cats[i][0]}: ${m.counts[i]} bạn. So sánh các số để tìm số ${m.most ? 'lớn' : 'bé'} nhất.`);
        });
      });
      t.mark(other, m.most ? 'min' : 'max');
      const d = Math.abs(m.counts[hi] - m.counts[lo]);
      f.q.innerHTML = `${S.cats[hi][0]} nhiều hơn ${S.cats[lo][0]} ${BOX} ${S.noun}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: d, max: 2, say: `${S.cats[hi][0]} nhiều hơn ${S.cats[lo][0]} bao nhiêu bạn?`,
        hint: `Lấy ${m.counts[hi]} trừ ${m.counts[lo]}.` });
      f.finish({ ok: `${m.counts[hi]} − ${m.counts[lo]} = ${d} ${S.noun}.` });
    },
  };
}

/** Phân loại theo tiêu chí: chạm chọn mọi thẻ thoả điều kiện (chiều cao, điểm, cân nặng), rồi kiểm tra. */
const CLASS_SETS = [
  { id: 'h', unit: 'cm', what: 'Chiều cao các bạn tổ 1', lo: 128, hi: 156, cuts: [135, 140, 145], ask: (c) => `cao từ <b>${c} cm</b> trở lên`, say: (c) => `cao từ ${c} xăng-ti-mét trở lên`, test: (v, c) => v >= c },
  { id: 'p', unit: 'điểm', what: 'Điểm bài kiểm tra Toán của tổ 2', lo: 5, hi: 10, cuts: [8, 9], ask: (c) => `được từ <b>${c} điểm</b> trở lên`, say: (c) => `được từ ${c} điểm trở lên`, test: (v, c) => v >= c },
  { id: 'w', unit: 'kg', what: 'Cân nặng các bạn tổ 3', lo: 26, hi: 42, cuts: [30, 35], ask: (c) => `nặng <b>dưới ${c} kg</b>`, say: (c) => `nặng dưới ${c} ki-lô-gam`, test: (v, c) => v < c },
];
function taskPClass() {
  return {
    id: 'pclass',
    make: (rng) => {
      const C = rng.pick(CLASS_SETS), cut = rng.pick(C.cuts), n = rng.int(6, 8);
      let values;
      for (let k = 0; k < 60; k++) {
        values = [...Array(n)].map(() => rng.int(C.lo, C.hi));
        const yes = values.filter(v => C.test(v, cut)).length;
        if (yes >= 2 && yes <= n - 2 && values.some(v => v === cut || Math.abs(v - cut) === 1)) break;
      }
      return { c: C.id, cut, values, names: rng.shuffle([...KIDS]).slice(0, n) };
    },
    async mount(f, m) {
      const C = CLASS_SETS.find(x => x.id === m.c);
      const t = createStats(f.tool, m.values.map((value, i) => ({ label: m.names[i], value })), { unit: C.unit, seq: false });
      t.caption(`📋 ${C.what}`);
      f.q.innerHTML = `Chạm chọn các bạn ${C.ask(m.cut)}`;
      f.say(`Chạm chọn tất cả các bạn ${C.say(m.cut)}, rồi bấm Kiểm tra.`);
      const want = m.values.map((v, i) => (C.test(v, m.cut) ? i : -1)).filter(i => i >= 0);
      const sel = new Set();
      t.on((ev, i) => {
        if (ev !== 'tap') return;
        if (sel.has(i)) { sel.delete(i); t.mark(i, ''); } else { sel.add(i); t.mark(i, 'sel'); }
      });
      if (import.meta.env.DEV) window.__g4ans = { kind: 'multi', solve: () => { [...sel].forEach(i => { if (!want.includes(i)) t.tap(i); }); want.forEach(i => { if (!sel.has(i)) t.tap(i); }); } };
      const btn = checkButton(f);
      const st = { missed: false };
      for (;;) {
        await btn.next();
        const ok = want.length === sel.size && want.every(i => sel.has(i));
        if (ok) break;
        miss(f, st);
        const extra = [...sel].find(i => !want.includes(i)), lack = want.find(i => !sel.has(i));
        if (extra != null) { shake(t.cards[extra]); f.hint(`${m.names[extra]}: ${m.values[extra]} ${C.unit}, chưa đúng điều kiện. Chạm lại để bỏ chọn.`); }
        else { t.pulse(lack); f.hint(`Còn sót bạn. "Từ ${m.cut} trở lên" có cả số ${m.cut}.`); }
      }
      btn.done();
      t.lock(true);
      want.forEach(i => t.mark(i, 'ok'));
      sfx.ding();
      f.q.innerHTML = `Có ${BOX} bạn ${C.ask(m.cut)}`;
      reserveChoices(f, 1);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: want.length, max: 2, say: 'Có bao nhiêu bạn như vậy?', hint: 'Đếm các thẻ đã chọn.' });
      f.finish({ ok: `${want.length} bạn: ${want.map(i => m.names[i]).join(', ')}.` });
    },
  };
}

/** Sắp xếp số liệu từ bé đến lớn (lớn đến bé). */
const SORT_SETS = [
  { unit: 'cm', what: 'Chiều cao', lo: 128, hi: 158, n: [5, 6] },
  { unit: 'kg', what: 'Cân nặng', lo: 24, hi: 45, n: [5, 6] },
  { unit: 'phút', what: 'Thời gian đi từ nhà tới trường', lo: 5, hi: 35, n: [5, 6] },
];
function taskPSort() {
  return {
    id: 'psort',
    make: (rng) => {
      const k = rng.int(0, SORT_SETS.length - 1), S = SORT_SETS[k], n = rng.int(S.n[0], S.n[1]);
      let values;
      for (let j = 0; j < 40; j++) { values = [...Array(n)].map(() => rng.int(S.lo, S.hi)); if (new Set(values).size === n && !values.every((v, i) => i === 0 || values[i - 1] < v) && !values.every((v, i) => i === 0 || values[i - 1] > v)) break; }
      return { k, values, names: rng.shuffle([...KIDS]).slice(0, n), dir: rng.pick(['asc', 'desc']) };
    },
    async mount(f, m) {
      const S = SORT_SETS[m.k];
      const t = createStats(f.tool, m.values.map((value, i) => ({ label: m.names[i], value })), { unit: S.unit, sortable: true, seqLabel: S.what });
      t.caption(`📋 ${S.what} của các bạn`);
      const w = m.dir === 'asc' ? 'từ bé đến lớn' : 'từ lớn đến bé';
      f.q.innerHTML = `Sắp xếp ${w}`;
      f.say(`Sắp xếp các số liệu ${w}: kéo thẻ thả lên thẻ khác, hoặc chạm hai thẻ để đổi chỗ. Xong thì bấm Kiểm tra.`, `Sắp xếp <b>${w}</b>: kéo hoặc chạm hai thẻ để đổi chỗ.`);
      if (import.meta.env.DEV) window.__g4ans = { kind: 'sort', solve: () => {
        for (let a = 0; a < t.n; a++) for (let b = 0; b < t.n - 1 - a; b++) { const v = t.values(); if (m.dir === 'asc' ? v[b] > v[b + 1] : v[b] < v[b + 1]) t.swap(b, b + 1); }
      } };
      const btn = checkButton(f);
      const st = { missed: false };
      for (;;) {
        await btn.next();
        if (t.sorted(m.dir)) break;
        miss(f, st);
        const v = t.values();
        const bad = v.findIndex((x, i) => i > 0 && (m.dir === 'asc' ? v[i - 1] > x : v[i - 1] < x));
        shake(t.cards[bad]);
        f.hint(`${v[bad - 1]} và ${v[bad]} chưa đúng thứ tự ${w}.`);
      }
      btn.done();
      t.lock(true);
      t.signs(true, m.dir);
      sfx.ding();
      f.finish({ ok: `${w[0].toUpperCase()}${w.slice(1)}: ${t.values().map(fmt).join(m.dir === 'asc' ? ' < ' : ' > ')} (${S.unit}).` });
    },
  };
}

// ════ Bài 64: Biểu đồ hình quạt tròn ═════════════════════════════════════════════════════════════════

const B64 = {
  explore: {
    setup: (board) => createPie(board, [{ label: 'Phần tô màu', pct: 0, color: '#60A5FA' }, { label: 'Phần còn lại', auto: true, color: '#E2E8F0' }],
      { title: 'Cả hình tròn là <b>100%</b>', explore: true, labels: [true, false] }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Cả hình tròn biểu thị 100%. Vành ngoài chia 100 vạch nhỏ, mỗi vạch là 1%.', 'Cả hình tròn: <b>100%</b> · mỗi vạch nhỏ: <b>1%</b>');
        t.drag(0, 5);
        await c.say('Kéo chấm vàng theo chiều kim đồng hồ để tô 50% hình tròn.', 'Kéo chấm vàng, tô <b>50%</b>');
        await waitDo(c, t, () => t.pct(0) === 50, { nudge: 'Kéo chấm vàng tới vạch 50%, ở phía dưới hình tròn.', el: () => t.root.querySelector('.g5pie-knob') }, () => t.set(0, 50));
        await c.say('50% là nửa hình tròn.', '<b>50%</b> = nửa hình tròn');
        await c.say('Bây giờ kéo lại để tô 25%.', 'Kéo chấm vàng, tô <b>25%</b>');
        await waitDo(c, t, () => t.pct(0) === 25, { nudge: 'Kéo chấm vàng về vạch 25%, bên phải hình tròn.', el: () => t.root.querySelector('.g5pie-knob') }, () => t.set(0, 25));
        await c.say('25% là một phần tư hình tròn. Bốn phần 25% ghép lại thành cả hình tròn, 100%.', '<b>25%</b> = một phần tư hình tròn');
        await c.say('Tô 75% hình tròn: kéo tiếp tới vạch 75%.', 'Kéo chấm vàng, tô <b>75%</b>');
        await waitDo(c, t, () => t.pct(0) === 75, { nudge: 'Kéo chấm vàng tới vạch 75%, bên trái hình tròn.', el: () => t.root.querySelector('.g5pie-knob') }, () => t.set(0, 75));
        t.undrag();
        await c.say('Phần tô 75%, phần còn lại 25%. Cộng lại vừa đủ 100%.', '75% + 25% = <b>100%</b>');
      },
      async (c) => {
        const t = c.use((b) => createPie(b, [{ label: 'Truyện thiếu nhi', pct: 50 }, { label: 'Sách giáo khoa', pct: 25 }, { label: 'Các loại sách khác', pct: 25 }],
          { title: 'SÁCH TRONG THƯ VIỆN CỦA TRƯỜNG', explore: true, shown: 0 }));
        await c.say('Biểu đồ hình quạt tròn này cho biết tỉ số phần trăm các loại sách trong thư viện.', 'Biểu đồ hình quạt tròn: <b>sách trong thư viện</b>');
        await t.grow(1600);
        await c.say('Mỗi hình quạt là một loại sách. Loại sách nào nhiều nhất? Chạm vào hình quạt đó.', 'Chạm vào loại sách <b>nhiều nhất</b>');
        let hit = false;
        const off = t.on((ev, i) => { if (ev !== 'tap') return; if (i === 0) { hit = true; t.hl(0); } else c.hint(`${t.parts()[i].label} chỉ ${t.pct(i)}%. Tìm hình quạt lớn nhất.`); });
        await waitDo(c, t, () => hit, { nudge: 'Hình quạt lớn nhất chiếm nửa hình tròn.', el: () => t.row(0) }, () => { hit = true; t.hl(0); t.emit('tap', 0); });
        off();
        await c.say('Truyện thiếu nhi chiếm 50%, tức là nửa số sách của thư viện.', 'Truyện thiếu nhi: <b>50%</b> = nửa số sách');
        t.hl(1);
        await c.say('Sách giáo khoa chiếm bao nhiêu phần trăm?');
        await c.choose([{ html: '25%', value: 25 }, { html: '50%', value: 50 }, { html: '75%', value: 75 }], 25, { hint: 'Hình quạt sách giáo khoa là một phần tư hình tròn.' });
        t.hl(-1);
        await c.say('50% cộng 25% cộng 25% bằng 100%: các phần cộng lại luôn bằng cả hình tròn.', '50% + 25% + 25% = <b>100%</b>');
      },
      async (c) => {
        const t = c.use((b) => createPie(b, [{ label: 'Bóng đá', pct: 40 }, { label: 'Cầu lông', pct: 25 }, { label: 'Bơi', pct: 20 }, { label: 'Cờ vua', pct: 15 }],
          { title: 'MÔN THỂ THAO HỌC SINH LỚP 5A THÍCH', explore: true, shown: 0, hidden: [3], labels: [true, true, true, false] }));
        await t.grow(1500);
        t.hl(3);
        await c.say('Phần cờ vua bị mất số. Cờ vua chiếm bao nhiêu phần trăm?', 'Cờ vua: <b>?%</b>');
        await c.choose([{ html: '15%', value: 15 }, { html: '25%', value: 25 }, { html: '85%', value: 85 }], 15, { hint: (v) => (v === 85 ? '85% là cả ba môn kia cộng lại. Lấy 100% trừ 85%.' : 'Cả hình tròn là 100%. Lấy 100% trừ 40%, 25% và 20%.') });
        t.reveal(3); t.label(3, true);
        await c.say('100% trừ 40%, trừ 25%, trừ 20%, còn 15%. Cờ vua chiếm 15%.', '100% − 40% − 25% − 20% = <b>15%</b>');
        t.hl(-1);
      },
      async (c) => {
        const t = c.t;
        t.caption('Lớp 5A có <b>40</b> học sinh');
        t.hl(1);
        await c.say('Lớp 5A có 40 học sinh. Cầu lông chiếm 25%. Có bao nhiêu bạn thích cầu lông?', '25% của <b>40</b> bạn là bao nhiêu bạn?');
        await c.choose([{ html: '10 bạn', value: 10 }, { html: '25 bạn', value: 25 }, { html: '40 bạn', value: 40 }], 10, { hint: (v) => (v === 25 ? '25 là số phần trăm, chưa phải số bạn. Tính 40 × 25 : 100.' : 'Tính 40 × 25 : 100.') });
        t.value(1, '25% · <b>10 bạn</b>');
        await c.say('40 nhân 25 chia 100 bằng 10. Có 10 bạn thích cầu lông.', '40 × 25 : 100 = <b>10</b> (bạn)');
        t.hl(0);
        await c.say('Bóng đá chiếm 40%. Có bao nhiêu bạn thích bóng đá?', '40% của <b>40</b> bạn?');
        await c.choose([{ html: '40 bạn', value: 40 }, { html: '16 bạn', value: 16 }, { html: '4 bạn', value: 4 }], 16, { hint: 'Tính 40 × 40 : 100.' });
        t.value(0, '40% · <b>16 bạn</b>');
        t.hl(-1);
        await c.say('40 nhân 40 chia 100 bằng 16. Muốn tìm số bạn, lấy tổng số bạn nhân với số phần trăm rồi chia cho 100.', 'Số bạn = tổng × số % : 100');
      },
    ],
  },
  tasks: () => [taskPieRead(), taskPieMiss(), taskPieCount(), taskPieDiff(), taskPieDraw(), taskPieMatch(), taskPieFrac()],
};

/** Chờ em thao tác (c.until); DEV: window.__g5solve làm thay để chạy tự động. */
async function waitDo(c, t, pred, opts, solve) {
  if (import.meta.env.DEV) window.__g5solve = () => { window.__g5solve = null; solve(); };
  try { await c.until(t, pred, opts); } finally { if (import.meta.env.DEV) window.__g5solve = null; }
}

/** Biểu đồ quạt tròn của các cuộc điều tra (phần trăm chia hết cho 5, cộng đủ 100). */
const PIES = [
  { id: 'sport', title: 'MÔN THỂ THAO HỌC SINH THÍCH', who: 'học sinh', cats: ['Bóng đá', 'Cầu lông', 'Bơi', 'Cờ vua'] },
  { id: 'go', title: 'CÁCH HỌC SINH ĐẾN TRƯỜNG', who: 'học sinh', cats: ['Đi bộ', 'Xe đạp', 'Bố mẹ đưa', 'Xe buýt'] },
  { id: 'fruit', title: 'LOẠI QUẢ BÁN ĐƯỢC TRONG NGÀY', who: 'kg quả', cats: ['Cam', 'Xoài', 'Chuối', 'Dưa hấu'] },
  { id: 'book', title: 'SÁCH TRONG TỦ SÁCH CỦA LỚP', who: 'cuốn sách', cats: ['Truyện', 'Khoa học', 'Lịch sử', 'Thơ'] },
  { id: 'club', title: 'CÂU LẠC BỘ CÁC BẠN THAM GIA', who: 'học sinh', cats: ['Vẽ', 'Hát', 'Múa', 'Đàn'] },
];
const pieOf = (id) => PIES.find(p => p.id === id);
/** k phần, mỗi phần là bội của 5 (≥ 10), khác nhau đôi một, tổng 100. */
function pcts(rng, k) {
  for (let j = 0; j < 200; j++) {
    const cut = new Set();
    while (cut.size < k - 1) cut.add(rng.int(2, 18) * 5);
    const c = [0, ...[...cut].sort((a, b) => a - b), 100];
    const p = c.slice(1).map((v, i) => v - c[i]);
    if (p.every(x => x >= 10) && new Set(p).size === k) return p;
  }
  return k === 3 ? [50, 30, 20] : [40, 25, 20, 15];
}
const partsOf = (P, p) => p.map((pct, i) => ({ label: P.cats[i], pct }));
/** Tổng số người (chia hết để mọi phần đều là số tự nhiên). */
function totalFor(rng, p) {
  const ok = [20, 40, 60, 80, 100, 120, 200, 300, 400, 500].filter(N => p.every(x => (N * x) % 100 === 0));
  return rng.pick(ok.length ? ok : [100]);
}

/** Đọc: phần nhiều nhất / ít nhất. */
function taskPieRead() {
  return {
    id: 'pieread',
    make: (rng) => { const P = rng.pick(PIES), k = rng.int(3, 4); return { p: P.id, v: pcts(rng, k), most: rng.int(0, 1) }; },
    async mount(f, m) {
      const P = pieOf(m.p);
      const t = createPie(f.tool, partsOf(P, m.v), { title: P.title });
      const want = m.v.indexOf(m.most ? Math.max(...m.v) : Math.min(...m.v));
      const w = m.most ? 'nhiều nhất' : 'ít nhất';
      f.q.innerHTML = `Phần nào chiếm <b>${w}</b>?`;
      await f.choose({ options: P.cats.slice(0, m.v.length).map((c, i) => ({ html: c, value: i })), answer: want, say: `Nhìn biểu đồ hình quạt tròn. Phần nào chiếm ${w}?`,
        hint: `So sánh các số phần trăm: hình quạt ${m.most ? 'lớn' : 'nhỏ'} nhất ứng với số phần trăm ${m.most ? 'lớn' : 'bé'} nhất.` });
      t.hl(want); t.pulse(want);
      f.finish({ ok: `${P.cats[want]}: ${m.v[want]}%, ${w}.` });
    },
  };
}

/** Phần trăm còn thiếu: 100% trừ các phần còn lại. */
function taskPieMiss() {
  return {
    id: 'piemiss',
    make: (rng) => { const P = rng.pick(PIES), k = rng.int(3, 4), v = pcts(rng, k); return { p: P.id, v, h: rng.int(0, k - 1) }; },
    async mount(f, m) {
      const P = pieOf(m.p);
      const lab = m.v.map((_, i) => i !== m.h);
      const t = createPie(f.tool, partsOf(P, m.v), { title: P.title, hidden: [m.h], labels: lab });
      t.hl(m.h);
      const box = t.legendBox(m.h);
      const others = m.v.filter((_, i) => i !== m.h), s = sum(others);
      f.q.innerHTML = `${P.cats[m.h]} chiếm bao nhiêu phần trăm?`;
      await f.ask({ box, answer: m.v[m.h], max: 3, say: `${P.cats[m.h]} chiếm bao nhiêu phần trăm?`,
        hint: (v) => (v === s ? `${s}% là các phần kia cộng lại. Lấy 100% trừ ${s}%.` : `Cả hình tròn là 100%. Lấy 100% trừ ${others.map(x => `${x}%`).join(', ')}.`) });
      t.reveal(m.h); t.label(m.h, true); t.hl(-1);
      f.finish({ ok: `100% − ${others.map(x => `${x}%`).join(' − ')} = ${m.v[m.h]}%.` });
    },
  };
}

/** Số lượng của một phần = tổng × số % : 100. */
function taskPieCount() {
  return {
    id: 'piecount',
    make: (rng) => { const P = rng.pick(PIES), k = rng.int(3, 4), v = pcts(rng, k); return { p: P.id, v, k: rng.int(0, k - 1), N: totalFor(rng, v) }; },
    async mount(f, m) {
      const P = pieOf(m.p), ans = (m.N * m.v[m.k]) / 100;
      const t = createPie(f.tool, partsOf(P, m.v), { title: P.title });
      t.caption(`${P.title} · tổng <b>${fmt(m.N)}</b> ${P.who}`);
      t.hl(m.k);
      f.q.innerHTML = `${P.cats[m.k]}: ${BOX} ${P.who}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: 4, say: `Tổng cộng có ${m.N} ${P.who}. ${P.cats[m.k]} chiếm ${m.v[m.k]}%. Đó là bao nhiêu ${P.who}?`,
        hint: (v) => (v === m.v[m.k] ? `${m.v[m.k]} là số phần trăm, chưa phải số ${P.who}. Tính ${m.N} × ${m.v[m.k]} : 100.` : `Tính ${m.N} × ${m.v[m.k]} : 100.`) });
      t.value(m.k, `${m.v[m.k]}% · <b>${fmt(ans)}</b>`);
      f.finish({ ok: `${fmt(m.N)} × ${m.v[m.k]} : 100 = ${fmt(ans)} ${P.who}.` });
    },
  };
}

/** Hai phần hơn kém nhau bao nhiêu (tính số lượng từng phần rồi trừ, hoặc trừ % trước). */
function taskPieDiff() {
  return {
    id: 'piediff',
    make: (rng) => { const P = rng.pick(PIES), k = rng.int(3, 4), v = pcts(rng, k); const [a, b] = rng.shuffle([...Array(k).keys()]).slice(0, 2); return { p: P.id, v, a, b, N: totalFor(rng, v) }; },
    async mount(f, m) {
      const P = pieOf(m.p);
      const [hi, lo] = m.v[m.a] > m.v[m.b] ? [m.a, m.b] : [m.b, m.a];
      const d = (m.N * (m.v[hi] - m.v[lo])) / 100;
      const t = createPie(f.tool, partsOf(P, m.v), { title: P.title });
      t.caption(`${P.title} · tổng <b>${fmt(m.N)}</b> ${P.who}`);
      t.hl(hi);
      f.q.innerHTML = `${P.cats[hi]} nhiều hơn ${P.cats[lo]} ${BOX} ${P.who}`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: d, max: 4, say: `Tổng có ${m.N} ${P.who}. ${P.cats[hi]} nhiều hơn ${P.cats[lo]} bao nhiêu ${P.who}?`,
        hint: (v) => (v === m.v[hi] - m.v[lo] ? `${v} là số phần trăm hơn kém. Tính tiếp ${m.N} × ${v} : 100.` : `${P.cats[hi]} hơn ${P.cats[lo]}: ${m.v[hi]}% − ${m.v[lo]}% = ${m.v[hi] - m.v[lo]}%. Rồi tính ${m.N} × ${m.v[hi] - m.v[lo]} : 100.`) });
      f.finish({ ok: `${m.v[hi]}% − ${m.v[lo]}% = ${m.v[hi] - m.v[lo]}%; ${fmt(m.N)} × ${m.v[hi] - m.v[lo]} : 100 = ${fmt(d)} ${P.who}.` });
    },
  };
}

/** Kéo tô đúng p% hình tròn. */
function taskPieDraw() {
  return {
    id: 'piedraw',
    make: (rng) => ({ p: rng.pick([20, 25, 30, 40, 45, 50, 60, 70, 75, 80, 90]), what: rng.pick(['Phần tô màu', 'Nước trong bình', 'Bánh đã ăn']) }),
    async mount(f, m) {
      const t = createPie(f.tool, [{ label: m.what, pct: 0, color: '#60A5FA' }, { label: 'Phần còn lại', auto: true, color: '#E2E8F0' }], { labels: [true, false] });
      t.drag(0, 5);
      f.q.innerHTML = `Kéo chấm vàng để tô <b>${m.p}%</b> hình tròn`;
      f.say(`Kéo chấm vàng để tô ${m.p}% hình tròn, rồi bấm Kiểm tra.`);
      if (import.meta.env.DEV) window.__g4ans = { kind: 'draw', solve: () => t.set(0, m.p) };
      const btn = checkButton(f);
      const st = { missed: false };
      for (;;) {
        await btn.next();
        if (t.pct(0) === m.p) break;
        miss(f, st);
        shake(t.root.querySelector('.g5pie-pie'));
        f.hint(`Em đang tô ${t.pct(0)}%. Mỗi vạch dài là 5%; vạch 25% ở bên phải, 50% ở dưới, 75% ở bên trái.`);
      }
      btn.done();
      t.undrag();
      t.reveal(1); t.label(1, true);
      sfx.ding();
      f.finish({ ok: `Tô ${m.p}%, còn lại ${100 - m.p}%: cộng lại 100%.` });
    },
  };
}

/** Chọn biểu đồ đúng với bảng số liệu (phương án nhiễu: đổi màu cho nhau, sai tỉ lệ). */
function taskPieMatch() {
  return {
    id: 'piematch',
    make: (rng) => {
      const P = rng.pick(PIES), v = pcts(rng, 3);
      let w;
      for (let j = 0; j < 40; j++) { w = pcts(rng, 3); if (w.join() !== v.join() && w.join() !== [v[1], v[0], v[2]].join()) break; }
      return { p: P.id, v, swap: [v[1], v[0], v[2]], w, order: rng.shuffle([0, 1, 2]) };
    },
    async mount(f, m) {
      injectMatchStyles();
      const P = pieOf(m.p);
      const cand = [m.v, m.swap, m.w];
      const letters = ['A', 'B', 'C'];
      f.q.innerHTML = `${m.v.map((x, i) => `<span class="p64-key"><i style="background:${PIE_COLORS[i]}"></i>${P.cats[i]} ${x}%</span>`).join('')}<small>Biểu đồ nào đúng?</small>`;
      f.tool.innerHTML = '<div class="p64-match"></div>';
      const host = f.tool.firstElementChild;
      const opts = m.order.map((ci, k) => ({ html: `<b>${letters[k]}</b>${pieSvg(cand[ci].map((pct, i) => ({ pct, color: PIE_COLORS[i] })))}`, value: ci }));
      await f.choose({ options: opts, answer: 0, host, cls: 'p64-opt', say: 'Biểu đồ nào biểu diễn đúng bảng số liệu? Xem cả màu và số phần trăm.',
        hint: (v) => (v === 1 ? 'Xem màu: mỗi màu phải đúng số phần trăm của phần đó.' : 'Số phần trăm trong biểu đồ phải khớp bảng.') });
      f.finish({ ok: `${P.cats.slice(0, 3).map((c, i) => `${c} ${m.v[i]}%`).join(', ')}.` });
    },
  };
}

/** 25% = 1/4 hình tròn, 50% = 1/2 … */
const FRACS = [
  [50, [1, 2], [[1, 50], [1, 5], [1, 4]]], [25, [1, 4], [[1, 25], [1, 2], [1, 3]]], [75, [3, 4], [[1, 75], [3, 5], [1, 4]]],
  [20, [1, 5], [[1, 20], [1, 2], [2, 5]]], [10, [1, 10], [[1, 100], [1, 5], [1, 2]]], [40, [2, 5], [[1, 40], [4, 5], [1, 4]]],
];
function taskPieFrac() {
  return {
    id: 'piefrac',
    make: (rng) => ({ k: rng.int(0, FRACS.length - 1) }),
    async mount(f, m) {
      injectMatchStyles();
      const [p, [a, b], bad] = FRACS[m.k];
      const t = createPie(f.tool, [{ label: 'Phần tô màu', pct: p, color: '#F472B6' }, { label: 'Phần còn lại', pct: 100 - p, color: '#E2E8F0' }], { labels: [true, false], legend: false });
      t.caption(`Phần tô màu: <b>${p}%</b>`);
      f.q.innerHTML = `${p}% bằng mấy phần hình tròn?`;
      const opts = [[a, b], ...bad];
      const sh = [0, 1, 2, 3].sort((x, y) => ((x * 7 + m.k) % 4) - ((y * 7 + m.k) % 4)).map(i => ({ html: fr(opts[i][0], opts[i][1]), value: i }));
      await f.choose({ options: sh, answer: 0, cls: 'p64-frc', say: `${p} phần trăm bằng mấy phần của hình tròn?`, hint: `${p}% = ${p}/100. Rút gọn ${p}/100.` });
      f.finish({ ok: `${p}% = ${p}/100 = ${a}/${b} hình tròn.` });
    },
  };
}

// ════ Bài 65: Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện ═════════════════════

const COIN_EV = [
  { label: 'Mặt sấp', art: EVART.coin(0), test: d => d.side === 0 },
  { label: 'Mặt ngửa', art: EVART.coin(1), test: d => d.side === 1 },
];

const B65 = {
  explore: {
    setup: (board) => {
      // 20 lần tung: 12 lần ngửa, 8 lần sấp (thứ tự xáo)
      const rig = [...Array(8).fill(0), ...Array(12).fill(1)];
      for (let i = rig.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rig[i], rig[j]] = [rig[j], rig[i]]; }
      return createChance(board, { device: 'coin', events: COIN_EV, trials: 20, manual: 4, style: 'classic', rig, explore: true });
    },
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Mai tung một đồng xu 20 lần, mỗi lần ghi mặt trên là mặt sấp hay mặt ngửa. Bấm Tung, rồi chạm hàng đúng mặt.', '🪙 Tung rồi chạm đúng <b>hàng</b> để gạch');
        const off = t.on((ev, k, want) => {
          if (ev === 'wrong') c.hint(`Đồng xu ra ${t.events[want].label.toLowerCase()}. Chạm hàng ${t.events[want].label}.`);
          if (ev === 'early') c.hint('Bấm nút Tung trước.');
        });
        await c.until(t, () => t.done >= 4, { nudge: () => (t.cur >= 0 ? 'Chạm hàng có mặt đồng xu vừa ra.' : 'Bấm nút Tung.'), el: () => (t.cur >= 0 ? t.row(t.cur) : t.actBtn) });
        off();
        await c.say('Bấm Làm nhanh để tung nốt cho đủ 20 lần.', 'Bấm <b>⏩ Làm nhanh</b> cho đủ <b>20 lần</b>');
        const off2 = t.on((ev, k, want) => { if (ev === 'wrong') c.hint(`Chạm hàng ${t.events[want].label}.`); });
        await c.until(t, () => t.done >= 20, { nudge: 'Bấm nút Làm nhanh.', el: () => t.fastBtn });
        off2();
      },
      async (c) => {
        const t = c.t;
        t.hl(1);
        await c.say('Mặt ngửa xuất hiện bao nhiêu lần?', 'Mặt ngửa: bao nhiêu lần?');
        await c.choose([{ html: '8 lần', value: 8 }, { html: '12 lần', value: 12 }, { html: '20 lần', value: 20 }], t.counts[1], { hint: 'Hai nhóm gạch chéo là 10, đếm thêm các vạch lẻ.' });
        t.showCount(1);
        t.showCount(0);
        t.hl(-1);
        await c.say('Mặt ngửa 12 lần, mặt sấp 8 lần, tất cả 20 lần tung.', 'Ngửa <b>12</b> · sấp <b>8</b> · tổng <b>20</b> lần');
      },
      async (c) => {
        const t = c.t;
        t.hl(1);
        await c.say('Tỉ số của số lần xuất hiện mặt ngửa so với tổng số lần tung là bao nhiêu? Số lần mặt ngửa viết trước, tổng số lần viết sau.', 'Số lần ngửa <b>:</b> tổng số lần tung');
        await c.choose([{ html: fr(12, 20), value: 1 }, { html: fr(20, 12), value: 2 }, { html: fr(12, 8), value: 3 }], 1, {
          hint: (v) => (v === 2 ? 'Viết ngược rồi. Số lần mặt ngửa ở trên, tổng số lần ở dưới.' : '8 là số lần sấp. So với tổng số lần tung, 20 lần.'),
        });
        await c.say('Tỉ số là 12 phần 20, tức là 12 chia 20. Rút gọn được 3 phần 5.', `Tỉ số: ${fr(12, 20)} = ${fr(3, 5)}`);
      },
      async (c) => {
        const t = c.t;
        t.hl(0);
        await c.say('Còn tỉ số của số lần xuất hiện mặt sấp so với tổng số lần tung?', 'Số lần sấp : tổng số lần?');
        await c.choose([{ html: fr(8, 12), value: 1 }, { html: fr(8, 20), value: 2 }, { html: fr(12, 20), value: 3 }], 2, { hint: (v) => (v === 1 ? '12 là số lần ngửa, chưa phải tổng số lần tung.' : 'Mặt sấp xuất hiện 8 lần trong 20 lần tung.') });
        t.hl(-1);
        await c.say('Tỉ số là 8 phần 20. Tung 20 lần không chắc được đúng 10 lần ngửa: mỗi lần làm thí nghiệm, kết quả có thể khác.', `Sấp: ${fr(8, 20)} · lần khác tung lại có thể ra số khác`);
      },
    ],
  },
  tasks: () => [taskRExp(), taskRRead(), taskRInv(), taskRChoose(), taskRDie()],
};

/** Ô phân số tử / mẫu trong câu hỏi. */
const FRBOX = () => fr(BOX, BOX);
/** Hỏi tử rồi mẫu (hai ô của FRBOX). */
async function askRatio(f, a, n, { say, what }) {
  const [b1, b2] = f.q.querySelectorAll('.g4-box');
  await f.ask({ box: b1, answer: a, max: 3, say, hint: (v) => (v === n ? 'Viết ngược rồi. Ô trên là số lần ' + what + '.' : `Ô trên là số lần ${what}.`) });
  await f.ask({ box: b2, answer: n, max: 3, say: 'Ô dưới là tổng số lần thực hiện.', hint: (v) => (v === n - a ? 'Đó là số lần không xảy ra. Ô dưới là tổng số lần.' : `Cộng tất cả các lần: tổng là ${n}.`) });
}

const EXPS65 = [
  { id: 'coin', device: 'coin', trials: 10, short: 'Tung đồng xu 10 lần.', events: COIN_EV, k: 1, what: 'mặt ngửa' },
  { id: 'coin20', device: 'coin', trials: 20, short: 'Tung đồng xu 20 lần.', events: COIN_EV, k: 0, what: 'mặt sấp' },
  { id: 'box', device: 'box', dev: { balls: ['red', 'blue', 'blue', 'blue'] }, trials: 10, short: 'Hộp có 1 bóng đỏ, 3 bóng xanh. Lấy 1 bóng rồi trả lại, 10 lần.',
    events: [{ label: 'Bóng đỏ', art: EVART.ball('red'), test: d => d.color === 'red' }, { label: 'Bóng xanh', art: EVART.ball('blue'), test: d => d.color === 'blue' }], k: 1, what: 'lấy được bóng xanh' },
  { id: 'die', device: 'die', trials: 10, short: 'Gieo xúc xắc 10 lần.',
    events: [{ label: 'Mặt 6 chấm', art: EVART.die(6), test: d => d.face === 6 }, { label: 'Mặt khác', art: EVART.die(3), test: d => d.face !== 6 }], k: 0, what: 'ra mặt 6 chấm' },
];

/** Làm thí nghiệm, kiểm đếm, viết tỉ số. */
function taskRExp() {
  return {
    id: 'rexp',
    make: (rng) => ({ x: rng.pick(EXPS65).id, seed: rng.int(1, 1e9) }),
    async mount(f, m) {
      const X = EXPS65.find(e => e.id === m.x);
      const t = createChance(f.tool, { device: X.device, dev: X.dev, events: X.events, trials: X.trials, manual: 3, style: 'classic', rng: makeRng(m.seed) });
      reserveChoices(f, 1);
      f.q.innerHTML = `${X.short} <small>Kiểm đếm, rồi viết tỉ số</small>`;
      f.say(`${X.short} Bấm nút, rồi chạm đúng hàng để gạch một vạch.`, `👆 Bấm <b>${t.actBtn.textContent}</b>, rồi chạm đúng <b>hàng</b>.`);
      const st = { missed: false };
      t.on((ev, k, want) => {
        if (ev === 'rolled') { st.missed = false; f.show('👆 Chạm đúng <b>hàng</b> để gạch một vạch.'); }
        if (ev === 'wrong') { miss(f, st); f.hint(`Kết quả là: ${X.events[want].label.toLowerCase()}. Chạm hàng ${X.events[want].label}.`); }
        if (ev === 'early') f.hint(`Bấm nút ${t.actBtn.textContent.replace(/^\S+ /, '')} trước.`);
        if (ev === 'mark' && t.done === 3) f.say('Bấm Làm nhanh để làm nốt các lần còn lại.', `Bấm <b>⏩ Làm nhanh</b> cho đủ <b>${X.trials} lần</b>.`);
      });
      if (import.meta.env.DEV) window.__g4ans = { kind: 'exp', t };
      await new Promise((res) => t.on((ev) => { if (ev === 'done') res(); }));
      X.events.forEach((_, k) => t.showCount(k));
      t.hl(X.k);
      const a = t.counts[X.k];
      f.q.innerHTML = `<span class="g5f-ql">Số lần ${X.what} : tổng số lần = ${FRBOX()}</span>`;
      await askRatio(f, a, X.trials, { say: `Viết tỉ số của số lần ${X.what} so với tổng số lần thực hiện.`, what: X.what });
      t.hl(-1);
      const [p, q] = simp(a, X.trials);
      f.finish({ ok: `${X.what[0].toUpperCase()}${X.what.slice(1)}: ${a} lần trong ${X.trials} lần → ${a}/${X.trials}${p !== a && a ? ` = ${p}/${q}` : ''}.` });
    },
  };
}

/** Bảng kiểm đếm cho sẵn (2–3 sự kiện): viết tỉ số của một sự kiện. */
const READS = [
  { id: 'coin', title: 'Tung đồng xu', ev: [['Mặt sấp', EVART.coin(0)], ['Mặt ngửa', EVART.coin(1)]], verb: (l) => `xuất hiện ${l.toLowerCase()}` },
  { id: 'ball', title: 'Lấy bóng trong hộp rồi trả lại', ev: [['Bóng đỏ', EVART.ball('red')], ['Bóng xanh', EVART.ball('blue')], ['Bóng vàng', EVART.ball('yellow')]], verb: (l) => `lấy được ${l.toLowerCase()}` },
  { id: 'wheel', title: 'Quay vòng quay', ev: [['Màu đỏ', EVART.wheel('red')], ['Màu vàng', EVART.wheel('yellow')]], verb: (l) => `dừng ở ${l.toLowerCase()}` },
];
function tallyTable(f, R, counts, k) {
  injectReadStyles();
  const G = Math.ceil(Math.max(...counts) / 5);
  f.tool.innerHTML = `<div class="p65-tbl" style="--k:${counts.length}">
      <div class="p65-hd"><span>${R.title}</span><span>Kiểm đếm</span><span>Số lần</span></div>
      ${counts.map((n, i) => `<div class="p65-row ${i === k ? 'p65-on' : ''}"><span class="p65-ev"><svg viewBox="0 0 40 40">${R.ev[i][1]}</svg>${R.ev[i][0]}</span>
        <span class="p65-t">${tallySvg(n, { style: 'classic', groups: G })}</span><b>${n}</b></div>`).join('')}</div>`;
}
function taskRRead() {
  return {
    id: 'rread',
    make: (rng) => { const R = rng.pick(READS); const counts = R.ev.map(() => rng.int(2, 12)); return { r: R.id, counts, k: rng.int(0, R.ev.length - 1) }; },
    async mount(f, m) {
      const R = READS.find(x => x.id === m.r), n = sum(m.counts), a = m.counts[m.k];
      tallyTable(f, R, m.counts, m.k);
      const what = R.verb(R.ev[m.k][0]);
      f.q.innerHTML = `<span class="g5f-ql">Số lần ${what} : tổng số lần = ${FRBOX()}</span>`;
      await askRatio(f, a, n, { say: `Viết tỉ số của số lần ${what} so với tổng số lần thực hiện.`, what });
      f.finish({ ok: `Tổng ${m.counts.join(' + ')} = ${n} lần; tỉ số ${a}/${n}.` });
    },
  };
}

/** Biết tổng số lần và số lần của một sự kiện: tỉ số của sự kiện còn lại. */
function taskRInv() {
  return {
    id: 'rinv',
    make: (rng) => { const n = rng.pick([10, 20, 25, 30, 40, 50]); return { n, a: rng.int(Math.ceil(n * 0.3), Math.floor(n * 0.7)), who: rng.pick(KIDS), side: rng.int(0, 1) }; },
    async mount(f, m) {
      const [s1, s2] = m.side ? ['mặt ngửa', 'mặt sấp'] : ['mặt sấp', 'mặt ngửa'];
      injectReadStyles();
      f.tool.innerHTML = `<div class="p65-coins"><svg viewBox="0 0 40 40">${EVART.coin(m.side)}</svg><div><b>${m.who}</b> tung đồng xu <b>${m.n}</b> lần,<br><b>${m.a}</b> lần ${s1}.</div></div>`;
      f.q.innerHTML = `<span class="g5f-ql">Số lần ${s2} : tổng số lần = ${FRBOX()}</span>`;
      const b = m.n - m.a;
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: b, max: 3, say: `${m.who} tung đồng xu ${m.n} lần, có ${m.a} lần ${s1}. Viết tỉ số của số lần ${s2} so với tổng số lần tung.`,
        hint: (v) => (v === m.a ? `${m.a} là số lần ${s1}. Số lần ${s2} là ${m.n} − ${m.a}.` : `Số lần ${s2} = ${m.n} − ${m.a}.`) });
      await f.ask({ box: b2, answer: m.n, max: 3, say: 'Ô dưới là tổng số lần tung.', hint: `${m.who} tung tất cả ${m.n} lần.` });
      f.finish({ ok: `${m.n} − ${m.a} = ${b} lần ${s2}; tỉ số ${b}/${m.n}.` });
    },
  };
}

/** Chọn tỉ số viết đúng (nhiễu: viết ngược, so với số lần không xảy ra, lấy sự kiện kia). */
function taskRChoose() {
  return {
    id: 'rchoose',
    make: (rng) => { const n = rng.pick([10, 12, 15, 20, 25, 30]); let a; do { a = rng.int(2, n - 2); } while (a * 2 === n); return { n, a, e: rng.int(0, 2), order: rng.shuffle([0, 1, 2, 3]) }; },
    async mount(f, m) {
      const E = [['Gieo xúc xắc', 'được mặt 6 chấm', 'gieo'], ['Bắn bóng vào rổ', 'bóng vào rổ', 'ném'], ['Quay vòng quay', 'dừng ở màu đỏ', 'quay']][m.e];
      injectReadStyles();
      f.tool.innerHTML = `<div class="p65-coins"><span class="p65-emo">${['🎲', '🏀', '🎡'][m.e]}</span><div>${E[0]} <b>${m.n}</b> lần,<br><b>${m.a}</b> lần ${E[1]}.</div></div>`;
      f.q.innerHTML = `Tỉ số của số lần ${E[1]} so với tổng số lần ${E[2]} là:`;
      const cand = [[m.a, m.n], [m.n, m.a], [m.a, m.n - m.a], [m.n - m.a, m.n]];
      await f.choose({ options: m.order.map(i => ({ html: fr(cand[i][0], cand[i][1]), value: i })), answer: 0, say: `${E[0]} ${m.n} lần, có ${m.a} lần ${E[1]}. Tỉ số của số lần ${E[1]} so với tổng số lần ${E[2]} là bao nhiêu?`,
        hint: (v) => (v === 1 ? 'Viết ngược rồi: số lần xảy ra ở trên, tổng số lần ở dưới.' : v === 2 ? `${m.n - m.a} là số lần không xảy ra. Ô dưới là tổng số lần, ${m.n}.` : `${m.n - m.a} là số lần không ${E[1]}.`) });
      f.finish({ ok: `${m.a} lần trong ${m.n} lần: ${m.a}/${m.n}.` });
    },
  };
}

/** Bảng kiểm đếm gieo xúc xắc 6 mặt: tỉ số của sự kiện gộp (mặt chẵn chấm, mặt lớn hơn 4…). */
const DIE_EV = [
  { name: 'được mặt có số chấm chẵn', faces: [2, 4, 6] },
  { name: 'được mặt có số chấm lẻ', faces: [1, 3, 5] },
  { name: 'được mặt có nhiều hơn 4 chấm', faces: [5, 6] },
  { name: 'được mặt có ít hơn 3 chấm', faces: [1, 2] },
];
function taskRDie() {
  return {
    id: 'rdie',
    make: (rng) => ({ counts: [...Array(6)].map(() => rng.int(1, 8)), e: rng.int(0, DIE_EV.length - 1) }),
    async mount(f, m) {
      injectReadStyles();
      const E = DIE_EV[m.e], n = sum(m.counts), a = sum(E.faces.map(x => m.counts[x - 1]));
      const G = Math.ceil(Math.max(...m.counts) / 5);
      f.tool.innerHTML = `<div class="p65-die">${m.counts.map((c, i) => `<div class="p65-dc ${E.faces.includes(i + 1) ? 'p65-on' : ''}"><svg viewBox="0 0 40 40">${dieFace(i + 1, 20, 20, 32)}</svg>
        <div class="p65-t">${tallySvg(c, { style: 'classic', groups: G })}</div><b>${c}</b></div>`).join('')}</div>`;
      f.q.innerHTML = `<span class="g5f-ql">Số lần ${E.name} : tổng số lần = ${FRBOX()}</span>`;
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: a, max: 3, say: `Gieo xúc xắc nhiều lần. Viết tỉ số của số lần ${E.name} so với tổng số lần gieo.`,
        hint: `Cộng số lần của các mặt ${E.faces.join(', ')} chấm: ${E.faces.map(x => m.counts[x - 1]).join(' + ')}.` });
      await f.ask({ box: b2, answer: n, max: 3, say: 'Ô dưới là tổng số lần gieo.', hint: `Cộng số lần của cả 6 mặt: ${m.counts.join(' + ')}.` });
      f.finish({ ok: `${E.faces.map(x => m.counts[x - 1]).join(' + ')} = ${a}; tổng ${n} lần; tỉ số ${a}/${n}.` });
    },
  };
}

// ── Kiểu dáng riêng ───────────────────────────────────────────────────────────────────────────────────
let readStyled = false;
function injectReadStyles() {
  if (readStyled) return;
  readStyled = true;
  css('g5-p65', `
    .p65-tbl { flex: 1 1 0; min-height: 0; display: grid; grid-template-rows: auto repeat(var(--k), minmax(0, 1fr)); gap: 1.4cqh; padding: 1cqh 2cqi; }
    .p65-hd, .p65-row { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.5fr) minmax(0, 0.5fr); align-items: center; gap: 1.5cqi; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
    .p65-hd { color: #475569; background: #E0F2FE; border-radius: 0.6em; padding: 0.15em 0.6em; font-size: min(6cqh, 3.4cqi); text-align: center; }
    .p65-row { background: #fff; border: 2px solid #E2E8F0; border-radius: 0.8rem; padding: 0.4cqh 1.2cqi; font-size: min(calc(36cqh / var(--k)), 4.4cqi, 9cqh); color: #1E293B; max-height: 26cqh; }
    .p65-row b, .p65-dc b { justify-self: center; color: #1D4ED8; }
    .p65-on { background: #FEF9C3; border-color: #F59E0B; }
    .p65-ev { display: flex; align-items: center; gap: 0.35em; min-width: 0; }
    .p65-ev svg { height: 1.6em; flex: none; aspect-ratio: 1; }
    .p65-t { height: 1.3em; display: flex; min-width: 0; }
    .p65-t .g4ce-tally { width: 100%; height: 100%; }
    .p65-coins { flex: 1 1 0; min-height: 0; display: flex; align-items: center; justify-content: center; gap: 4cqi; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; font-size: min(9cqh, 5cqi); line-height: 1.35; }
    .p65-coins svg { height: min(62cqh, 34cqi); flex: none; }
    .p65-emo { font-size: min(44cqh, 26cqi); line-height: 1; }
    .p65-coins b { color: #1D4ED8; }
    .p65-die { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 1.4cqi; padding: 1cqh 1cqi; }
    .p65-dc { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2cqh; background: #fff; border: 2px solid #E2E8F0; border-radius: 0.8rem; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(9cqh, 4.6cqi); }
    .p65-dc svg { width: 80%; max-height: 34cqh; }
    .p65-dc .p65-t { width: 90%; height: min(14cqh, 7cqi); }
    @container (max-aspect-ratio: 1/1) {
      .p65-die { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
      .p65-dc { font-size: min(6cqh, 8cqi); }
      .p65-dc svg { max-height: 16cqh; }
      .p65-dc .p65-t { height: min(6cqh, 12cqi); }
      .p65-coins { flex-direction: column; text-align: center; font-size: min(6cqh, 7cqi); }
      .p65-coins svg { height: min(40cqh, 50cqi); }
      .p65-row { font-size: min(calc(30cqh / var(--k)), 6.4cqi); }
      .p65-hd { font-size: min(4cqh, 5cqi); }
    }
  `);
}
let matchStyled = false;
function injectMatchStyles() {
  if (matchStyled) return;
  matchStyled = true;
  css('g5-p64m', `
    .p64-match { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2.5cqi; padding: 1cqh 1cqi 2cqh; }
    .p64-match .p64-opt { height: 100%; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1cqh; padding: 1.5cqh 1cqi; font-size: min(8cqh, 4cqi); }
    .p64-opt svg { flex: 1 1 0; min-height: 0; width: 100%; }
    .g4-choice.p64-frc { font-size: min(9cqh, 6cqi); padding: 0.1em 0.3em; }
    .p64-key { display: inline-flex; align-items: center; gap: 0.25em; margin: 0 0.45em; white-space: nowrap; }
    .p64-key i { width: 0.8em; height: 0.8em; border-radius: 0.2em; border: 2px solid ${INK}; }
    @container (max-aspect-ratio: 1/1) {
      .p64-match { grid-template-columns: minmax(0, 1fr); grid-template-rows: repeat(3, minmax(0, 1fr)); }
      .p64-match .p64-opt { flex-direction: row; font-size: min(6cqh, 7cqi); }
      .p64-opt svg { height: 100%; width: auto; flex: none; aspect-ratio: 1; }
    }
  `);
}

export const STATS_LESSONS = { 63: B63, 64: B64, 65: B65 };

// ── Luyện Tính (grade5Drills): mỗi cấp một nhóm dạng câu, số liệu mới mỗi lượt ───────────────────────
export const STATS_DRILL_LEVELS = [
  { id: 'd5-stats-1', n: 1, title: 'Bảng số liệu', desc: 'Vd. cộng tổng số bạn, tìm phiếu còn thiếu, nhiều nhất, phân loại, sắp xếp.', knowledge: 'thu thập, phân loại, sắp xếp số liệu', sgk: 63,
    say: 'Cộng các nhóm phải bằng tổng số bạn được hỏi!', tasks: [taskPTotal(), taskPMiss(), taskPMost(), taskPClass(), taskPSort()] },
  { id: 'd5-stats-2', n: 2, title: 'Biểu đồ hình quạt tròn', desc: 'Vd. cả hình tròn 100%; 25% của 40 bạn là 10 bạn; kéo tô 75%.', knowledge: 'biểu đồ hình quạt tròn, tỉ số phần trăm', sgk: 64,
    say: 'Cả hình tròn là 100%. Số người = tổng × số phần trăm : 100!', tasks: [taskPieRead(), taskPieMiss(), taskPieCount(), taskPieDiff(), taskPieDraw(), taskPieMatch(), taskPieFrac()] },
  { id: 'd5-stats-3', n: 3, title: 'Tỉ số số lần xảy ra', desc: 'Vd. tung đồng xu 20 lần, 12 lần ngửa: tỉ số 12/20.', knowledge: 'tỉ số số lần lặp lại một sự kiện so với tổng số lần', sgk: 65,
    say: 'Số lần xảy ra viết trên, tổng số lần viết dưới!', tasks: [taskRRead(), taskRInv(), taskRChoose(), taskRDie()] },
];
