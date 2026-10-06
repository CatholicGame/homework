/**
 * Chủ đề 5 (Toán 5 Tập Một): Bài 25 🔺 tam giác (tri.js), Bài 26 🔷 hình thang (trap.js), Bài 27 ⭕ đường tròn (circle.js).
 * Khám phá theo đúng cách sách dạy (cắt ghép có chuyển động); Thực hành: nhận dạng, đường cao, tính diện tích, chu vi,
 * tính ngược, bài toán thực tế. Hình vẽ tỉ lệ đúng với số đo; phương án nhiễu là lỗi hay gặp (quên chia 2, lấy
 * đường kính làm bán kính, cm thay vì cm²).
 */

import { createTri, createGeo, fitTo, txt, dim, rightMark, unit, pts, rot, BLUE, BLUE_D, RED, GREEN, INK } from '../tri.js';
import { createTrap } from '../trap.js';
import { createCompass, createWheel, createSectors } from '../circle.js';
import { BOX } from '../../grade4Tools/practice.js';
import { css } from '../../grade4Tools/frame.js';
import { dec, decKey, clean } from '../num.js';
import { calmMotion } from '../../grade3Games/fly.js';

/** Chờ em thao tác (c.until); DEV: window.__g5solve làm thay để chạy tự động. */
async function waitDo(c, t, pred, opts, solve) {
  if (import.meta.env.DEV) window.__g5solve = () => { window.__g5solve = null; solve(); };
  try { await c.until(t, pred, opts); } finally { if (import.meta.env.DEV) window.__g5solve = null; }
}
/** Ghi dạng câu đang chạy (DEV, cho kịch bản kiểm thử). */
const mark = (id) => { if (import.meta.env.DEV) window.__g5sh = { task: id }; };
/** Số thập phân viết kiểu Việt: 6.28 → "6,28" (không tách lớp ở phần nhỏ). */
const D = (x) => dec(clean(x));
const UNIT_SAY = { cm: 'xăng-ti-mét', dm: 'đề-xi-mét', m: 'mét' };

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 25. Hình tam giác. Diện tích hình tam giác
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const portrait = (board) => board.clientHeight > board.clientWidth * 0.8;

const B25 = {
  explore: {
    setup: (board) => createTri(board, { A: { x: 3, y: 0 }, B: { x: 0, y: 5 }, C: { x: 7, y: 5 }, box: { x: -3, y: -2, w: 13, h: 8 }, kind: true, drag: 'free' }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Kéo chấm vàng ở đỉnh A để đổi hình tam giác. Mỗi lần đổi, xem tam giác có góc gì.', 'Kéo chấm vàng ở đỉnh <b>A</b>');
        for (const [k, ask, ok] of [
          ['vuông', 'Em hãy kéo đỉnh A để được tam giác vuông.', 'Tam giác vuông có một góc vuông.'],
          ['tù', 'Bây giờ kéo đỉnh A để được tam giác tù.', 'Tam giác tù có một góc tù, tô đỏ.'],
          ['nhọn', 'Cuối cùng, kéo đỉnh A để được tam giác nhọn.', 'Tam giác nhọn có ba góc đều nhọn.'],
        ]) {
          await c.say(ask, `Kéo <b>A</b> để được tam giác <b>${k}</b>`);
          await waitDo(c, t, () => t.kind() === k, { nudge: k === 'vuông' ? 'Kéo A thẳng lên trên đỉnh B hoặc đỉnh C.' : k === 'tù' ? 'Kéo A ra xa, vượt ra ngoài cạnh BC.' : 'Kéo A về giữa, phía trên cạnh BC.', el: () => t.q('.g5t-h') }, () => t.solveKind(k));
          await c.say(ok);
        }
      },
      async (c) => {
        const t = c.use((b) => createTri(b, { A: { x: 3, y: 0 }, B: { x: 0, y: 6 }, C: { x: 9, y: 6 }, box: { x: -3, y: -1.5, w: 14, h: 8.6 } }));
        t.caption('Đáy <b>BC</b>, hạ đường cao từ đỉnh <b>A</b>');
        await c.say('Chọn cạnh BC làm đáy. Đường cao đi từ đỉnh A xuống, vuông góc với đáy.');
        t.ekeShow(7);
        await c.say('Kéo ê ke trượt dọc theo đáy BC tới khi cạnh kia của ê ke chạm đỉnh A.', 'Trượt <b>ê ke</b> dọc đáy tới khi chạm <b>A</b>');
        await waitDo(c, t, () => t.ekeOk(), { nudge: 'Kéo ê ke sang trái, dọc theo cạnh BC.', el: () => t.q('.g5t-eke') }, () => t.ekeTo(t.S.A.x, 600));
        await c.choose([{ html: '✏️ Vẽ theo cạnh ê ke', value: 1 }], 1);
        await t.dropAlt();
        t.ekeHide();
        t.set({ dims: false });
        t.caption('<b>AH</b> là đường cao, độ dài AH là <b>chiều cao</b>');
        await c.say('AH vuông góc với BC. AH là đường cao, độ dài AH là chiều cao của tam giác.');
      },
      async (c) => {
        let t = c.use((b) => createTri(b, { A: { x: 10, y: 0 }, B: { x: 0, y: 5 }, C: { x: 6, y: 5 }, box: { x: -1.5, y: -1.5, w: 13, h: 8 }, kind: true }));
        t.caption('Tam giác <b>tù</b>: chân đường cao nằm <b>ngoài</b> đáy');
        await c.say('Với tam giác tù ABC, đỉnh A nằm lệch ra ngoài. Ta phải kéo dài đáy BC.');
        await t.extendBase();
        t.ekeShow(4);
        await t.ekeTo(10, 1300);
        await t.dropAlt();
        t.ekeHide();
        await c.say('Chân đường cao H nằm trên phần kéo dài của đáy. AH vẫn là đường cao.');
        t = c.use((b) => createTri(b, { A: { x: 0, y: 0 }, B: { x: 0, y: 5 }, C: { x: 8, y: 5 }, box: { x: -2.5, y: -1.5, w: 13, h: 8 }, kind: true }));
        t.caption('Tam giác <b>vuông</b> ABC, đáy <b>BC</b>');
        await c.say('Tam giác vuông ABC có đáy BC. Đường cao là đoạn nào?');
        await c.choose([{ html: 'AB', value: 'AB' }, { html: 'AC', value: 'AC' }, { html: 'BC', value: 'BC' }], 'AB', { hint: 'Đường cao đi từ A và vuông góc với BC.' });
        t.set({ alt: true });
        t.caption('Cạnh góc vuông <b>AB</b> chính là đường cao');
        await c.say('Đúng rồi! Cạnh góc vuông AB vuông góc với đáy BC, nên AB là đường cao.');
      },
      async (c) => {
        const port = portrait(c.board);
        const t = c.use((b) => createTri(b, { A: { x: 2, y: 0 }, B: { x: 0, y: 5 }, C: { x: 7, y: 5 }, fill: '#86EFAC',
          box: port ? { x: -1.5, y: -1.2, w: 10, h: 14.4 } : { x: -1.5, y: -1.2, w: 19, h: 7.6 } }));
        const Dlt = port ? { x: 0, y: 7 } : { x: 9.5, y: 0 };
        t.caption('Hai tấm bìa tam giác <b>giống hệt nhau</b>');
        await c.say('Có hai tấm bìa hình tam giác giống hệt nhau: một tấm xanh, một tấm trắng.');
        await t.copyShow(Dlt);
        t.caption('Cắt tấm trắng theo <b>đường cao</b>');
        await c.say('Cắt tấm trắng theo đường cao, được hai mảnh 1 và 2.', 'Bấm <b>Cắt</b>');
        await c.choose([{ html: '✂️ Cắt theo đường cao', value: 1 }], 1);
        await t.copyCut();
        t.caption('Ghép mảnh <b>1</b> và mảnh <b>2</b> vào tấm xanh');
        await c.say('Ghép hai mảnh 1 và 2 vào tấm xanh.', 'Bấm <b>Ghép</b>');
        await c.choose([{ html: '🧩 Ghép vào tấm xanh', value: 1 }], 1);
        await t.copyJoin();
        await t.zoomTo({ x: -2.8, y: -1, w: 11.6, h: 7.6 });
        await t.rectShow();
        t.caption('Hình chữ nhật <b>NMCB</b>: dài = đáy, rộng = chiều cao');
        await c.say('Ta được hình chữ nhật NMCB. Chiều dài bằng đáy BC, chiều rộng bằng chiều cao AH.');
        await c.say('Tấm xanh bằng mấy phần hình chữ nhật?');
        await c.choose([{ html: 'Bằng cả hình', value: 1 }, { html: 'Một nửa', value: 2 }, { html: 'Gấp đôi', value: 3 }], 2, { hint: 'Hình chữ nhật gồm tấm xanh và hai mảnh trắng. Hai mảnh trắng ghép lại bằng tấm xanh.' });
        await t.halfShow();
        t.caption('S hình chữ nhật = a × h · S tam giác = <b>a × h : 2</b>');
        await c.say('Diện tích hình chữ nhật là đáy nhân chiều cao. Tam giác bằng một nửa, nên diện tích tam giác là đáy nhân chiều cao rồi chia cho 2.');
      },
      async (c) => {
        const port = portrait(c.board);
        const t = c.use((b) => createTri(b, { A: { x: 1, y: 0 }, B: { x: 0, y: 3 }, C: { x: 4, y: 3 }, dims: true, alt: true,
          box: port ? { x: -1.6, y: -1, w: 7.2, h: 11 } : { x: -1.5, y: -1, w: 14, h: 5.6 } }));
        t.caption('Đáy <b>4 cm</b>, chiều cao <b>3 cm</b> (mỗi ô 1 cm)');
        await c.say('Muốn tính diện tích hình tam giác, ta lấy độ dài đáy nhân với chiều cao, cùng một đơn vị đo, rồi chia cho 2.');
        const p = port ? t.X({ x: -0.6, y: 5.6 }) : t.X({ x: 6.2, y: 0.2 });
        await t.lines(p.x, p.y, ['S = a × h : 2', '   = 4 × 3 : 2', '   = 12 : 2', '   = <tspan fill="#DC2626">6 (cm²)</tspan>'], { size: port ? 64 : 56 });
        await c.say('4 nhân 3 bằng 12, 12 chia 2 bằng 6. Diện tích là 6 xăng-ti-mét vuông.');
        t.caption('Đáy <b>10 cm</b>, chiều cao <b>8 cm</b>. Diện tích là?');
        await c.say('Tam giác có đáy 10 xăng-ti-mét, chiều cao 8 xăng-ti-mét. Diện tích là bao nhiêu?');
        await c.choose(['80 cm²', '40 cm', '40 cm²', '80 cm'].map(v => ({ html: v, value: v })), '40 cm²', {
          hint: (v) => (v.startsWith('80') ? 'Em quên chia cho 2.' : 'Diện tích dùng đơn vị vuông: xăng-ti-mét vuông.'),
        });
        await c.say('Đúng rồi! 10 nhân 8 bằng 80, chia 2 được 40 xăng-ti-mét vuông.');
      },
      async (c) => {
        const t = c.use((b) => createTri(b, { A: { x: 2, y: 0 }, B: { x: 0, y: 4 }, C: { x: 5, y: 4 }, drag: 'par', par: true, dims: true, area: true, alt: true,
          box: { x: -4, y: -1.2, w: 13, h: 7 } }));
        await c.say('Đỉnh A chỉ chạy trên đường tím song song với đáy. Kéo A sang trái, sang phải, xem diện tích thay đổi không.', 'Kéo <b>A</b> dọc đường tím');
        await waitDo(c, t, () => t.S.moves.size >= 4, { nudge: 'Kéo chấm vàng sang trái hoặc sang phải.', el: () => t.q('.g5t-h') },
          async () => { await t.moveA({ x: 6, y: 0 }, 500); await t.moveA({ x: -2, y: 0 }, 500); await t.moveA({ x: 0, y: 0 }, 400); t.S.moves.add('x'); t.emit('move'); });
        await c.say('Diện tích tam giác có thay đổi không?');
        await c.choose([{ html: 'Không đổi', value: 0 }, { html: 'Lớn hơn', value: 1 }, { html: 'Nhỏ hơn', value: 2 }], 0, { hint: 'Nhìn dòng diện tích ở trên: đáy và chiều cao có đổi không?' });
        await c.say('Đúng rồi! Đáy và chiều cao không đổi, nên diện tích tam giác không đổi.');
      },
    ],
  },
  tasks: () => [taskTriKind(), taskTriAlt(), taskTriArea(), taskTriChoose(), taskTriUnits(), taskTriBase()],
};

// ── Hình vẽ cho Thực hành ─────────────────────────────────────────────────────────────────────────────
/**
 * Tấm vẽ trong ô công cụ. steps: số dòng phép tính sẽ hiện sau khi em làm đúng → chừa sẵn vùng cho các dòng đó
 * từ đầu (ngang: bên phải; dọc: bên dưới) để hình không bị chữ đè và không phải dời hình.
 */
function board(f, steps = 0) {
  const t = createGeo(f.tool);
  t.box = { x: 70, y: 40, w: t.W - 140, h: t.H - 120 };
  if (steps) {
    const side = t.H / t.W < 0.62;
    if (side) { t.box.w = t.W * 0.52 - 70; t.stepBox = { x: t.W * 0.55, y: 30, w: t.W * 0.43, h: t.H - 60 }; }
    else { const sh = Math.min(t.H * 0.42, steps * 70 + 20); t.box.h = t.H - 150 - sh; t.stepBox = { x: 40, y: t.H - sh - 10, w: t.W - 80, h: sh }; }
  }
  return t;
}
const vLabel = (P, G, n, size = 40) => { const u = unit(G, P); return txt(P.x + u.x * 34, P.y + u.y * 34 + 13, n, { size }); };

/** Tam giác (đơn vị thật, y hướng xuống) vẽ vừa ô; trả về toạ độ SVG các đỉnh. */
function drawTri(t, P, { names = ['A', 'B', 'C'], fill = BLUE, extra = '' } = {}) {
  const f = fitTo(P, t.box.x, t.box.y, t.box.w, t.box.h);
  const Q = P.map(f);
  const G = { x: (Q[0].x + Q[1].x + Q[2].x) / 3, y: (Q[0].y + Q[1].y + Q[2].y) / 3 };
  t.L.fig.innerHTML = `<polygon points="${pts(Q)}" fill="${fill}" fill-opacity="0.75" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    ${names.map((n, i) => (n ? vLabel(Q[i], G, n) : '')).join('')}${extra}`;
  return { Q, f };
}

// ── Thực hành Bài 25 ──────────────────────────────────────────────────────────────────────────────────
const KINDS = ['nhọn', 'vuông', 'tù'];
function triOfKind(rng, k) {
  let P;
  if (k === 'vuông') { const p = rng.int(3, 7), q = rng.int(3, 6); P = [{ x: 0, y: -q }, { x: 0, y: 0 }, { x: p, y: 0 }]; }
  else if (k === 'tù') { const a = rng.int(4, 7), e = rng.int(2, 4), h = rng.int(2, 4); P = [{ x: a + e, y: -h }, { x: 0, y: 0 }, { x: a, y: 0 }]; }
  else {
    const a = rng.int(5, 8), x = rng.int(2, a - 2);
    const h = Math.max(rng.int(3, 6), Math.ceil(Math.sqrt(x * (a - x))) + 2);
    P = [{ x, y: -h }, { x: 0, y: 0 }, { x: a, y: 0 }];
  }
  return P;
}

function taskTriKind() {
  return {
    id: 'trikind',
    make: (rng) => { const k = rng.pick(KINDS); return { k, P: triOfKind(rng, k), r: rng.pick([0, 0, 25, 60, 100, 160, 200, 250, 300]) }; },
    async mount(f, { k, P, r }) {
      mark('trikind');
      f.q.innerHTML = 'Đây là hình tam giác gì?';
      const t = board(f);
      const R = P.map(p => rot(p, { x: 0, y: 0 }, r));
      const { Q } = drawTri(t, R, { names: ['', '', ''] });
      if (k === 'vuông') {
        const v = Q[1];
        t.L.fig.insertAdjacentHTML('beforeend', rightMark(v, unit(v, Q[0]), unit(v, Q[2]), 26));
      }
      await f.choose({ options: KINDS.map(x => ({ html: `Tam giác ${x}`, value: x })), answer: k, say: 'Đây là hình tam giác gì?', hint: 'Nhìn ba góc: có góc vuông không? Có góc tù không?' });
      if (k === 'tù') { const v = Q[2]; t.L.fig.insertAdjacentHTML('beforeend', `<circle cx="${v.x}" cy="${v.y}" r="34" fill="${RED}" fill-opacity="0.25" stroke="${RED}" stroke-width="4"/>`); }
      f.finish({ ok: k === 'nhọn' ? 'Tam giác nhọn: ba góc đều nhọn.' : k === 'vuông' ? 'Tam giác vuông: có một góc vuông.' : 'Tam giác tù: có một góc tù.' });
    },
  };
}

function taskTriAlt() {
  return {
    id: 'trialt',
    make: (rng) => {
      const kind = rng.pick(['nhọn', 'tù', 'vuông']);
      const a = rng.int(6, 9), h = rng.int(4, 6);
      const names = rng.shuffle(['H', 'K', 'M']);
      let x;
      if (kind === 'vuông') x = 0; else if (kind === 'tù') x = a + rng.int(2, 3); else x = rng.int(2, a - 3);
      return { kind, a, h, x, names, k2: rng.int(0, 1) };
    },
    async mount(f, { kind, a, h, x, names, k2 }) {
      mark('trialt');
      f.q.innerHTML = 'Đáy là <b>BC</b>. Đường cao hạ từ đỉnh <b>A</b> là đoạn nào?';
      const t = board(f);
      const A = { x, y: -h }, B = { x: 0, y: 0 }, C = { x: a, y: 0 };
      // các đoạn để chọn: đường cao đúng + đoạn xiên tới một điểm trên đáy + một cạnh
      const cand = [];
      if (kind === 'vuông') {
        cand.push({ name: 'AB', to: B, ok: true }, { name: 'AC', to: C, side: true });
        cand.push({ name: `A${names[0]}`, to: { x: Math.round(a / 2), y: 0 }, pt: names[0] });
      } else {
        cand.push({ name: `A${names[0]}`, to: { x, y: 0 }, pt: names[0], ok: true });
        const kx = kind === 'tù' ? Math.round(a / 2) : (x + (k2 ? 2 : -2) > 0 && x + (k2 ? 2 : -2) < a ? x + (k2 ? 2 : -2) : x + 2);
        cand.push({ name: `A${names[1]}`, to: { x: kx, y: 0 }, pt: names[1] });
        cand.push(kind === 'tù' ? { name: 'AC', to: C, side: true } : { name: k2 ? 'AB' : 'AC', to: k2 ? B : C, side: true });
      }
      const all = [A, B, C, ...cand.map(c => c.to), { x: Math.min(0, x) - 1, y: 0 }, { x: Math.max(a, x) + 1, y: 0 }];
      const fz = fitTo(all, t.box.x, t.box.y, t.box.w, t.box.h);
      const [qa, qb, qc] = [A, B, C].map(fz);
      const G = { x: (qa.x + qb.x + qc.x) / 3, y: (qa.y + qb.y + qc.y) / 3 };
      let g = `<line x1="${t.box.x - 40}" y1="${qb.y}" x2="${t.box.x + t.box.w + 40}" y2="${qb.y}" stroke="${INK}" stroke-width="2.5" stroke-dasharray="12 9"/>
        <polygon points="${pts([qa, qb, qc])}" fill="${BLUE}" fill-opacity="0.6" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
      for (const cd of cand) {
        const q = fz(cd.to);
        if (!cd.side) g += `<line x1="${qa.x}" y1="${qa.y}" x2="${q.x}" y2="${q.y}" stroke="#7C3AED" stroke-width="5" stroke-dasharray="12 8"/><circle cx="${q.x}" cy="${q.y}" r="7" fill="#7C3AED"/>`;
        if (cd.pt) g += txt(q.x, q.y + 46, cd.pt, { size: 40, color: '#7C3AED' });
      }
      g += vLabel(qa, G, 'A') + txt(qb.x - 24, qb.y + 44, 'B', { size: 40 }) + txt(qc.x + 24, qc.y + 44, 'C', { size: 40 });
      t.L.fig.innerHTML = g;
      const right = cand.find(c => c.ok);
      const opts = [...cand].sort((p, q) => (p.name < q.name ? -1 : 1)).map(c => ({ html: c.name, value: c.name }));
      await f.choose({ options: opts, answer: right.name, say: 'Đường cao hạ từ đỉnh A xuống đáy BC là đoạn nào?',
        hint: kind === 'tù' ? 'Đường cao vuông góc với đáy. Ở tam giác tù, chân đường cao nằm trên phần kéo dài của đáy.' : 'Đường cao đi từ A và vuông góc với đáy BC.' });
      const fq = fz(right.to);
      t.L.fig.insertAdjacentHTML('beforeend', `<line x1="${qa.x}" y1="${qa.y}" x2="${fq.x}" y2="${fq.y}" stroke="${RED}" stroke-width="7"/>${rightMark(fq, { x: fq.x <= qb.x + 1 ? 1 : -1, y: 0 }, { x: 0, y: -1 }, 24)}`);
      f.finish({ ok: `${right.name} vuông góc với đáy BC: ${right.name} là đường cao.` });
    },
  };
}

/** Hình tam giác có số đo: đáy a, chiều cao h (cùng đơn vị để vẽ), nhãn chữ. */
function drawTriDims(t, a, h, x, la, lh, { fill = BLUE } = {}) {
  const A = { x, y: -h }, B = { x: 0, y: 0 }, C = { x: a, y: 0 };
  const all = [A, B, C, { x: Math.min(0, x), y: 0 }, { x: Math.max(a, x), y: 0 }];
  const fz = fitTo(all, t.box.x + 40, t.box.y, t.box.w - 80, t.box.h);
  const [qa, qb, qc] = [A, B, C].map(fz), H = fz({ x, y: 0 });
  const right = x === 0;
  let g = '';
  if (x < 0 || x > a) g += `<line x1="${x < 0 ? H.x : qc.x}" y1="${qb.y}" x2="${x < 0 ? qb.x : H.x}" y2="${qb.y}" stroke="${INK}" stroke-width="2.5" stroke-dasharray="12 9"/>`;
  g += `<polygon points="${pts([qa, qb, qc])}" fill="${fill}" fill-opacity="0.7" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
  g += `<line x1="${qa.x}" y1="${qa.y}" x2="${H.x}" y2="${H.y}" stroke="${RED}" stroke-width="${right ? 7 : 5}" ${right ? '' : 'stroke-dasharray="12 8"'}/>`;
  g += rightMark(H, { x: x < a / 2 ? 1 : -1, y: 0 }, { x: 0, y: -1 }, 22);
  g += dim(qb, qc, la, { off: 30, color: BLUE_D, size: 40 });
  g += txt(H.x + (right ? -16 : 16), (qa.y + H.y) / 2 + 14, lh, { size: 40, color: RED, anchor: right ? 'end' : 'start' });
  t.L.fig.innerHTML = g;
}

const UN = ['cm', 'dm', 'm'];
/** Dòng phép tính (sau khi em làm đúng) trong vùng chừa sẵn t.stepBox. */
async function showSteps(t, lines) {
  const b = t.stepBox || { x: 40, y: 30, w: t.W - 80, h: t.H - 60 };
  const long = Math.max(...lines.map(l => l.length));
  const size = Math.min(58, b.w / (long * 0.43), b.h / (lines.length * 1.35));
  const y = b.y + (b.h - size * 1.35 * (lines.length - 1)) / 2 + size * 0.35;
  await t.lines(b.x + b.w / 2, y, lines, { size, anchor: 'middle', ms: 250 });
}

function taskTriArea() {
  return {
    id: 'triarea',
    make: (rng) => {
      const v = rng.int(0, 3);
      const u = rng.pick(UN);
      if (v === 0) { const a = rng.int(4, 16), h = rng.int(3, 12); return { a, h, x: rng.int(1, a - 1), u, right: 0 }; }
      if (v === 1) { const a = rng.int(3, 9), h = rng.int(3, 8); return { a, h, x: 0, u, right: 1 }; } // tam giác vuông
      if (v === 2) { const a = rng.int(5, 12), h = rng.int(2, 6); return { a, h, x: a + rng.int(1, 3), u, right: 0 }; } // tam giác tù
      const a = rng.int(2, 9) + 0.5, h = rng.int(2, 8); return { a, h, x: Math.floor(a / 2), u: rng.pick(['m', 'dm']), right: 0 };
    },
    async mount(f, { a, h, x, u }) {
      mark('triarea');
      const S = clean((a * h) / 2);
      f.q.innerHTML = `Đáy ${D(a)} ${u}, chiều cao ${D(h)} ${u}. &nbsp;S = ${BOX} ${u}²`;
      const t = board(f, 3);
      drawTriDims(t, a, h, x, `${D(a)} ${u}`, `${D(h)} ${u}`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: Number.isInteger(S) ? S : decKey(S), max: 6,
        say: `Tính diện tích hình tam giác có đáy ${D(a)} ${UNIT_SAY[u]}, chiều cao ${D(h)} ${UNIT_SAY[u]}.`,
        hint: (v) => (Math.abs(v - a * h) < 1e-9 ? 'Em quên chia cho 2.' : 'Lấy đáy nhân chiều cao rồi chia cho 2.') });
      await showSteps(t, [`S = ${D(a)} × ${D(h)} : 2`, `= ${D(a * h)} : 2`, `= ${D(S)} (${u}²)`]);
      f.finish({ ok: `S = ${D(a)} × ${D(h)} : 2 = ${D(S)} ${u}²` });
    },
  };
}

function taskTriChoose() {
  return {
    id: 'trichoose',
    make: (rng) => { const a = rng.int(3, 15) * (rng.int(0, 1) ? 2 : 1), h = rng.int(3, 12); return { a, h, u: rng.pick(UN), x: rng.int(1, 3) }; },
    async mount(f, { a, h, u, x }) {
      mark('trichoose');
      const S = (a * h) / 2;
      f.q.innerHTML = `Đáy ${a} ${u}, chiều cao ${h} ${u}. Diện tích là:`;
      const t = board(f);
      drawTriDims(t, a, h, Math.min(x, a - 1), `${a} ${u}`, `${h} ${u}`);
      const opts = [`${D(S)} ${u}²`, `${a * h} ${u}²`, `${D(S)} ${u}`, `${a * h} ${u}`];
      await f.choose({ options: shuffleBy(opts, a + h).map(v => ({ html: v, value: v })), answer: `${D(S)} ${u}²`,
        say: 'Chọn diện tích đúng của hình tam giác.',
        hint: (v) => (v.startsWith(String(a * h)) ? 'Em quên chia cho 2.' : 'Diện tích phải dùng đơn vị vuông.') });
      f.finish({ ok: `${a} × ${h} : 2 = ${D(S)} ${u}²` });
    },
  };
}
/** Trộn cố định theo hạt (mount không có rng). */
function shuffleBy(arr, seed) {
  const a = [...arr];
  let s = seed * 9301 + 49297;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function taskTriUnits() {
  return {
    id: 'triunits',
    make: (rng) => { const a = rng.int(1, 5), h = rng.pick([12, 15, 16, 18, 24, 25, 30, 35, 40]); return { a, h }; },
    async mount(f, { a, h }) {
      mark('triunits');
      const ac = a * 10, S = (ac * h) / 2;
      f.q.innerHTML = `Đáy <b>${a} dm</b>, chiều cao <b>${h} cm</b>. Diện tích là:`;
      const t = board(f);
      drawTriDims(t, ac, h, Math.round(ac / 3), `${a} dm = ${ac} cm`, `${h} cm`);
      const raw = [`${D(S)} cm²`, `${D((a * h) / 2)} cm²`, `${D(ac * h)} cm²`, `${D(S)} cm`];
      const opts = [...new Set(raw)];
      await f.choose({ options: shuffleBy(opts, a * 7 + h).map(v => ({ html: v, value: v })), answer: `${D(S)} cm²`,
        say: `Đáy ${a} đề-xi-mét, chiều cao ${h} xăng-ti-mét. Chọn diện tích đúng.`,
        hint: (v) => (v === `${D((a * h) / 2)} cm²` ? `Phải đổi về cùng đơn vị: ${a} dm = ${ac} cm.` : v === `${D(ac * h)} cm²` ? 'Em quên chia cho 2.' : 'Diện tích phải dùng đơn vị vuông.') });
      f.finish({ ok: `${a} dm = ${ac} cm · ${ac} × ${h} : 2 = ${D(S)} cm²` });
    },
  };
}

function taskTriBase() {
  return {
    id: 'tribase',
    make: (rng) => { const a = rng.int(4, 16), h = rng.int(3, 12); return { a, h, u: rng.pick(UN) }; },
    async mount(f, { a, h, u }) {
      mark('tribase');
      const S = (a * h) / 2;
      f.q.innerHTML = `Tam giác có diện tích ${D(S)} ${u}², chiều cao ${h} ${u}. Đáy a = ${BOX} ${u}`;
      const t = board(f, 3);
      drawTriDims(t, a, h, Math.round(a / 3), `a = ? ${u}`, `${h} ${u}`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: a, max: 3,
        say: `Tam giác có diện tích ${D(S)} ${u === 'cm' ? 'xăng-ti-mét vuông' : u === 'dm' ? 'đề-xi-mét vuông' : 'mét vuông'}, chiều cao ${h} ${UNIT_SAY[u]}. Tìm độ dài đáy.`,
        hint: (v) => (Math.abs(v - S / h) < 1e-9 ? 'Nhớ nhân diện tích với 2 trước.' : 'Đáy = diện tích × 2 : chiều cao.') });
      await showSteps(t, [`a = ${D(S)} × 2 : ${h}`, `= ${D(S * 2)} : ${h}`, `= ${a} (${u})`]);
      f.finish({ ok: `a = ${D(S)} × 2 : ${h} = ${a} ${u}` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 26. Hình thang. Diện tích hình thang
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const B26 = {
  explore: {
    setup: (board) => createTrap(board, { A: { x: 2, y: 0 }, B: { x: 6, y: 0 }, C: { x: 9, y: 5 }, D: { x: 0, y: 5 }, box: { x: -2, y: -1.5, w: 13, h: 8 } }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Hình thang ABCD có hai cạnh đáy AB và DC song song với nhau. AD và BC là hai cạnh bên.');
        t.set({ drag: true });
        await c.say('Kéo các chấm vàng để đổi hình. Hai đáy luôn song song.', 'Kéo các chấm vàng');
        await waitDo(c, t, () => t.S.moves >= 4, { nudge: 'Kéo một chấm vàng sang trái hoặc sang phải.', el: () => t.q('.g5p-h') },
          async () => { await t.moveTo({ A: { x: 3, y: 1 }, B: { x: 8, y: 1 } }, 500); await t.moveTo({ C: { x: 10, y: 5 } }, 400); t.S.moves += 4; t.emit('move'); });
        await c.say('Bây giờ kéo đỉnh A thẳng lên trên đỉnh D để được hình thang vuông.', 'Kéo để được <b>hình thang vuông</b>');
        await waitDo(c, t, () => t.kind() === 'Hình thang vuông', { nudge: 'Kéo A để A nằm thẳng trên D.', el: () => t.q('[data-v="A"]') },
          () => t.moveTo({ A: { x: t.S.D.x, y: t.S.A.y }, B: { x: Math.max(t.S.B.x, t.S.D.x + 2), y: t.S.A.y }, C: { x: Math.max(t.S.C.x, t.S.D.x + 6), y: t.S.C.y } }, 600));
        t.set({ drag: false });
        await c.say('Hình thang vuông có một cạnh bên vuông góc với hai đáy.');
      },
      async (c) => {
        const t = c.use((b) => createTrap(b, { A: { x: 2, y: 0 }, B: { x: 7, y: 0 }, C: { x: 10, y: 5 }, D: { x: 0, y: 5 }, box: { x: -1.5, y: -1.5, w: 13, h: 8 } }));
        t.caption('Đường cao của hình thang');
        await c.say('Từ đỉnh A, kẻ đoạn thẳng vuông góc với đáy DC.');
        await t.dropAlt();
        t.caption('<b>AH</b> vuông góc với DC: AH là đường cao');
        await c.say('AH vuông góc với DC. AH là đường cao, độ dài AH là chiều cao của hình thang.');
        await c.say('Chiều cao của hình thang là đoạn nào?');
        await c.choose([{ html: 'AD', value: 'AD' }, { html: 'AH', value: 'AH' }, { html: 'BC', value: 'BC' }], 'AH', { hint: 'Chiều cao phải vuông góc với hai đáy. Cạnh bên AD bị xiên.' });
        await c.say('Đúng rồi! Cạnh bên AD xiên, không phải chiều cao.');
      },
      async (c) => {
        const t = c.use((b) => createTrap(b, { A: { x: 1, y: 0 }, B: { x: 5, y: 0 }, C: { x: 9, y: 5 }, D: { x: 0, y: 5 }, alt: true, kind: false, box: { x: -1.5, y: -1.5, w: 16, h: 8.4 } }));
        t.caption('Hình thang ABCD, <b>M</b> là trung điểm của BC');
        await c.say('M là trung điểm của cạnh bên BC.');
        await t.showM();
        await c.say('Cắt theo đoạn AM, được tam giác ABM.', 'Bấm <b>Cắt</b>');
        await c.choose([{ html: '✂️ Cắt theo AM', value: 1 }], 1);
        await t.cutAM();
        t.caption('Xoay tam giác ABM quanh điểm <b>M</b>');
        await c.say('Xoay tam giác ABM nửa vòng quanh điểm M.', 'Bấm <b>Xoay</b>');
        await c.choose([{ html: '🔄 Xoay quanh M', value: 1 }], 1);
        await t.rotateABM();
        t.caption('Hình thang ABCD thành tam giác <b>ADK</b>');
        await c.say('Hình thang thành tam giác ADK. Đáy DK bằng DC cộng CK, mà CK bằng AB.');
        await c.say('Diện tích tam giác ADK là DK nhân AH chia 2. Vậy diện tích hình thang là tổng hai đáy nhân với chiều cao rồi chia cho 2.', '<b>S = (a + b) × h : 2</b>');
        t.caption('S = (DC + AB) × AH : 2 = <b>(a + b) × h : 2</b>');
      },
      async (c) => {
        const port = portrait(c.board);
        const t = c.use((b) => createTrap(b, { A: { x: 1, y: 0 }, B: { x: 5, y: 0 }, C: { x: 6, y: 3 }, D: { x: 0, y: 3 }, alt: true, dims: true, labels: false, kind: false,
          box: port ? { x: -1.5, y: -1.4, w: 9, h: 13 } : { x: -1.5, y: -1.4, w: 17, h: 5.8 } }));
        t.caption('Đáy <b>6 cm</b> và <b>4 cm</b>, chiều cao <b>3 cm</b>');
        await c.say('Hình thang có hai đáy 6 xăng-ti-mét và 4 xăng-ti-mét, chiều cao 3 xăng-ti-mét.');
        const p = port ? t.X({ x: -0.6, y: 5.8 }) : t.X({ x: 8, y: 0 });
        await t.lines(p.x, p.y, ['S = (a + b) × h : 2', '   = (6 + 4) × 3 : 2', '   = 10 × 3 : 2', '   = 30 : 2', '   = <tspan fill="#DC2626">15 (cm²)</tspan>'], { size: port ? 60 : 50 });
        await c.say('Đáy lớn, đáy bé ta mang cộng vào, rồi đem nhân với chiều cao, chia đôi kết quả thế nào cũng ra.');
        t.caption('Đáy <b>5 cm</b> và <b>3 cm</b>, cao <b>4 cm</b>. Diện tích là?');
        await c.say('Hình thang có hai đáy 5 xăng-ti-mét và 3 xăng-ti-mét, chiều cao 4 xăng-ti-mét. Diện tích là bao nhiêu?');
        await c.choose(['32 cm²', '16 cm', '16 cm²', '60 cm²'].map(v => ({ html: v, value: v })), '16 cm²', {
          hint: (v) => (v === '32 cm²' ? 'Em quên chia cho 2.' : v === '60 cm²' ? 'Cộng hai đáy trước: 5 + 3.' : 'Diện tích dùng đơn vị vuông.') });
        await c.say('Đúng rồi! 5 cộng 3 bằng 8, 8 nhân 4 bằng 32, chia 2 được 16 xăng-ti-mét vuông.');
      },
      async (c) => {
        const t = c.use((b) => createTrap(b, { A: { x: 2, y: 0 }, B: { x: 5, y: 0 }, C: { x: 7, y: 4 }, D: { x: 0, y: 4 }, slider: true, area: true, alt: true, labels: true,
          box: { x: -1.5, y: -1.4, w: 11, h: 9 } }));
        await c.say('Kéo thanh trượt b để đổi đáy bé. Thử kéo b về 0.', 'Kéo thanh <b>b</b> về <b>0</b>');
        await waitDo(c, t, () => t.b() === 0, { nudge: 'Kéo nút b sang trái hết cỡ.', el: () => t.q('.g5p-knob') }, () => t.moveTo({ B: { x: t.S.A.x, y: t.S.A.y } }, 700));
        await c.say('Đáy bé bằng 0: hình thang thành hình tam giác. Công thức còn a nhân h chia 2, đúng như tam giác.');
        await c.say('Bây giờ kéo b dài bằng đáy lớn a.', 'Kéo <b>b</b> bằng <b>a</b>');
        await waitDo(c, t, () => t.b() === t.a(), { nudge: 'Kéo nút b sang phải hết cỡ.', el: () => t.q('.g5p-knob') }, () => t.moveTo({ B: { x: t.S.A.x + t.a(), y: t.S.A.y } }, 700));
        await c.say('Hai đáy bằng nhau: hình bình hành. Diện tích là a cộng a, nhân h, chia 2, tức là a nhân h.');
      },
    ],
  },
  tasks: () => [taskTrapPick(), taskTrapHeight(), taskTrapArea(), taskTrapChoose(), taskTrapField()],
};

// ── Hình nhỏ trong nút chọn ───────────────────────────────────────────────────────────────────────────
const PIC_W = 220, PIC_H = 150;
function picSvg(P, { fill = '#86EFAC' } = {}) {
  const f = fitTo(P, 16, 14, PIC_W - 32, PIC_H - 28);
  const Q = P.map(f);
  return `<svg class="g5sh-svg" viewBox="0 0 ${PIC_W} ${PIC_H}"><polygon points="${pts(Q)}" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/></svg>`;
}
const rotAll = (P, a) => P.map(p => rot(p, { x: 0, y: 0 }, a));
function trapPts(rng, right = false) {
  const a = rng.int(6, 9), b = rng.int(2, a - 2), h = rng.int(3, 5), s = right ? 0 : rng.int(1, Math.max(1, a - b - 1));
  return [{ x: s, y: -h }, { x: s + b, y: -h }, { x: a, y: 0 }, { x: 0, y: 0 }];
}
/** Tứ giác lồi rõ ràng (mỗi góc từ 40° tới 140°) không có cặp cạnh nào song song. */
function notTrapPts(rng) {
  const ang = (o, p, q) => { const u = { x: p.x - o.x, y: p.y - o.y }, v = { x: q.x - o.x, y: q.y - o.y }; return (Math.acos((u.x * v.x + u.y * v.y) / Math.hypot(u.x, u.y) / Math.hypot(v.x, v.y)) * 180) / Math.PI; };
  const cr = (p, q, r, t) => (q.x - p.x) * (t.y - r.y) - (q.y - p.y) * (t.x - r.x);
  let P;
  for (let k = 0; k < 60; k++) {
    const a = rng.int(6, 9), h = rng.int(3, 5), s = rng.int(0, 2), b = rng.int(2, 4), dh = rng.pick([-2, -1, 1, 2]);
    P = [{ x: s, y: -h }, { x: Math.min(a + 1, s + b + rng.int(0, 1)), y: -h - dh }, { x: a, y: 0 }, { x: 0, y: 0 }];
    const ok = [0, 1, 2, 3].every(i => { const g = ang(P[i], P[(i + 1) % 4], P[(i + 3) % 4]); return g > 40 && g < 140; })
      && Math.abs(cr(P[0], P[1], P[3], P[2])) > 0.5 && Math.abs(cr(P[3], P[0], P[2], P[1])) > 0.5;
    if (ok) break;
  }
  return P;
}

function taskTrapPick() {
  return {
    id: 'trappick',
    make: (rng) => {
      const right = rng.int(0, 2) === 0;
      const shapes = right
        ? [{ P: trapPts(rng, true), ok: 1 }, { P: trapPts(rng), ok: 0 }, { P: notTrapPts(rng), ok: 0 }]
        : [{ P: trapPts(rng), ok: 1 }, { P: notTrapPts(rng), ok: 0 }, { P: notTrapPts(rng), ok: 0 }];
      return { right, shapes: rng.shuffle(shapes.map(s => ({ ...s, P: rotAll(s.P, rng.pick([0, 0, 30, 90, 150, 180, 210, 270, 330])) }))) };
    },
    async mount(f, { right, shapes }) {
      mark('trappick');
      f.q.innerHTML = right ? 'Hình nào là <b>hình thang vuông</b>?' : 'Hình nào là <b>hình thang</b>?';
      f.choicesBox.classList.add('g5sh-pics');
      const opts = shapes.map((s, i) => ({ html: picSvg(s.P), value: i }));
      const ans = shapes.findIndex(s => s.ok);
      await f.choose({ options: opts, answer: ans, say: right ? 'Hình nào là hình thang vuông?' : 'Hình nào là hình thang?',
        hint: right ? 'Hình thang vuông có một cạnh bên vuông góc với hai đáy.' : 'Hình thang có một cặp cạnh đối diện song song. Hình có thể bị xoay nghiêng.' });
      f.finish({ ok: right ? 'Hình thang vuông: một cạnh bên vuông góc với hai đáy.' : 'Hình thang có một cặp cạnh đối diện song song.' });
    },
  };
}

function taskTrapHeight() {
  return {
    id: 'trapheight',
    make: (rng) => { const a = rng.int(7, 10), b = rng.int(3, a - 3), h = rng.int(3, 5), right = rng.int(0, 2) === 0; return { a, b, h, s: right ? 0 : rng.int(1, a - b - 1), right, nm: rng.pick(['H', 'K', 'I']), nm2: rng.pick(['E', 'G']) }; },
    async mount(f, { a, b, h, s, right, nm, nm2 }) {
      mark('trapheight');
      f.q.innerHTML = 'Chiều cao của hình thang ABCD là đoạn nào?';
      const t = board(f);
      const A = { x: s, y: -h }, B = { x: s + b, y: -h }, C = { x: a, y: 0 }, Dp = { x: 0, y: 0 };
      const Hx = right ? null : { x: s, y: 0 }, Kx = { x: Math.min(a - 1, s + Math.max(2, Math.round(b / 2) + 1)), y: 0 };
      const fz = fitTo([A, B, C, Dp, { x: -0.6, y: 0 }], t.box.x, t.box.y, t.box.w, t.box.h);
      const [qa, qb, qc, qd] = [A, B, C, Dp].map(fz);
      let g = `<polygon points="${pts([qa, qb, qc, qd])}" fill="#86EFAC" fill-opacity="0.8" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
      const seg = (q, n) => `<line x1="${qa.x}" y1="${qa.y}" x2="${q.x}" y2="${q.y}" stroke="#7C3AED" stroke-width="5" stroke-dasharray="12 8"/><circle cx="${q.x}" cy="${q.y}" r="7" fill="#7C3AED"/>${txt(q.x, q.y + 46, n, { size: 40, color: '#7C3AED' })}`;
      if (Hx) g += seg(fz(Hx), nm);
      g += seg(fz(Kx), nm2);
      g += txt(qa.x - 22, qa.y - 14, 'A', { size: 40 }) + txt(qb.x + 22, qb.y - 14, 'B', { size: 40 }) + txt(qc.x + 26, qc.y + 40, 'C', { size: 40 }) + txt(qd.x - 26, qd.y + 40, 'D', { size: 40 });
      t.L.fig.innerHTML = g;
      const ans = right ? 'AD' : `A${nm}`;
      const opts = (right ? ['AD', `A${nm2}`, 'BC'] : [`A${nm}`, `A${nm2}`, 'AD']).sort().map(v => ({ html: v, value: v }));
      await f.choose({ options: opts, answer: ans, say: 'Chiều cao của hình thang là đoạn nào?', hint: 'Chiều cao vuông góc với hai đáy AB và DC.' });
      const fq = right ? qd : fz(Hx);
      t.L.fig.insertAdjacentHTML('beforeend', `<line x1="${qa.x}" y1="${qa.y}" x2="${fq.x}" y2="${fq.y}" stroke="${RED}" stroke-width="7"/>${rightMark(fq, { x: 1, y: 0 }, { x: 0, y: -1 }, 24)}`);
      f.finish({ ok: `${ans} vuông góc với hai đáy: ${ans} là chiều cao.` });
    },
  };
}

/** Hình thang có số đo (vẽ đúng tỉ lệ). */
function drawTrapDims(t, a, b, h, la, lb, lh, { fill = '#86EFAC', s = null } = {}) {
  const sx = s ?? (a - b) / 3;
  const A = { x: sx, y: -h }, B = { x: sx + b, y: -h }, C = { x: a, y: 0 }, Dp = { x: 0, y: 0 };
  const fz = fitTo([A, B, C, Dp], t.box.x + 30, t.box.y + 34, t.box.w - 60, t.box.h - 34);
  const [qa, qb, qc, qd] = [A, B, C, Dp].map(fz), H = fz({ x: sx, y: 0 });
  t.L.fig.innerHTML = `<polygon points="${pts([qa, qb, qc, qd])}" fill="${fill}" fill-opacity="0.8" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
    <line x1="${qa.x}" y1="${qa.y}" x2="${H.x}" y2="${H.y}" stroke="${RED}" stroke-width="5" stroke-dasharray="12 8"/>${rightMark(H, { x: 1, y: 0 }, { x: 0, y: -1 }, 22)}
    ${dim(qd, qc, la, { off: 30, color: BLUE_D, size: 40 })}${dim(qb, qa, lb, { off: 26, color: BLUE_D, size: 40 })}
    ${txt(H.x + 14, (qa.y + H.y) / 2 + 14, lh, { size: 40, color: RED, anchor: 'start' })}`;
}

function trapNums(rng) {
  const v = rng.int(0, 2), u = rng.pick(UN);
  if (v < 2) { const a = rng.int(6, 18), b = rng.int(2, a - 2), h = rng.int(3, 12); return { a, b, h, u }; }
  const a = rng.int(5, 12) + 0.5, b = rng.int(2, 4), h = rng.int(2, 8); return { a, b, h, u: rng.pick(['m', 'dm']) };
}

function taskTrapArea() {
  return {
    id: 'traparea',
    make: (rng) => trapNums(rng),
    async mount(f, { a, b, h, u }) {
      mark('traparea');
      const S = clean(((a + b) * h) / 2);
      f.q.innerHTML = `Đáy ${D(a)} ${u} và ${D(b)} ${u}, cao ${D(h)} ${u}. &nbsp;S = ${BOX} ${u}²`;
      const t = board(f, 4);
      drawTrapDims(t, a, b, h, `${D(a)} ${u}`, `${D(b)} ${u}`, `${D(h)} ${u}`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: Number.isInteger(S) ? S : decKey(S), max: 6,
        say: `Tính diện tích hình thang có hai đáy ${D(a)} ${UNIT_SAY[u]} và ${D(b)} ${UNIT_SAY[u]}, chiều cao ${D(h)} ${UNIT_SAY[u]}.`,
        hint: (v) => (Math.abs(v - (a + b) * h) < 1e-9 ? 'Em quên chia cho 2.' : Math.abs(v - a * b) < 1e-9 || Math.abs(v - (a * b * h) / 2) < 1e-9 ? 'Cộng hai đáy với nhau trước.' : 'Lấy tổng hai đáy nhân với chiều cao rồi chia cho 2.') });
      await showSteps(t, [`S = (${D(a)} + ${D(b)}) × ${D(h)} : 2`, `= ${D(a + b)} × ${D(h)} : 2`, `= ${D((a + b) * h)} : 2`, `= ${D(S)} (${u}²)`]);
      f.finish({ ok: `(${D(a)} + ${D(b)}) × ${D(h)} : 2 = ${D(S)} ${u}²` });
    },
  };
}

function taskTrapChoose() {
  return {
    id: 'trapchoose',
    make: (rng) => { const a = rng.int(5, 14), b = rng.int(2, a - 2), h = rng.int(2, 10); return { a, b, h, u: rng.pick(UN) }; },
    async mount(f, { a, b, h, u }) {
      mark('trapchoose');
      const S = ((a + b) * h) / 2;
      f.q.innerHTML = `Đáy ${a} ${u} và ${b} ${u}, chiều cao ${h} ${u}. Diện tích là:`;
      const t = board(f);
      drawTrapDims(t, a, b, h, `${a} ${u}`, `${b} ${u}`, `${h} ${u}`);
      const ok = `${D(S)} ${u}²`;
      const opts = [...new Set([ok, `${(a + b) * h} ${u}²`, `${D(S)} ${u}`, `${D((a * b * h) / 2)} ${u}²`, `${a * b + h} ${u}²`])].slice(0, 4);
      await f.choose({ options: shuffleBy(opts, a * 3 + b + h).map(v => ({ html: v, value: v })), answer: ok, say: 'Chọn diện tích đúng của hình thang.',
        hint: (v) => (v === `${(a + b) * h} ${u}²` ? 'Em quên chia cho 2.' : v.endsWith('²') ? 'Cộng hai đáy, nhân với chiều cao, rồi chia cho 2.' : 'Diện tích phải dùng đơn vị vuông.') });
      f.finish({ ok: `(${a} + ${b}) × ${h} : 2 = ${D(S)} ${u}²` });
    },
  };
}

function taskTrapField() {
  return {
    id: 'trapfield',
    make: (rng) => { const a = rng.int(6, 12) * 5, b = rng.int(3, a / 5 - 2) * 5, h = rng.int(2, 6) * 5; return { a, b, h }; },
    async mount(f, { a, b, h }) {
      mark('trapfield');
      const S = ((a + b) * h) / 2;
      f.q.innerHTML = `🌾 Thửa ruộng hình thang: đáy lớn ${a} m, đáy bé ${b} m, cao ${h} m. Diện tích ${BOX} m²`;
      const t = board(f, 3);
      drawTrapDims(t, a, b, h, `${a} m`, `${b} m`, `${h} m`, { fill: '#A3E635' });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: S, max: 6,
        say: `Thửa ruộng hình thang có đáy lớn ${a} mét, đáy bé ${b} mét, chiều cao ${h} mét. Tính diện tích thửa ruộng.`,
        hint: (v) => (v === (a + b) * h ? 'Em quên chia cho 2.' : 'Lấy tổng hai đáy nhân với chiều cao rồi chia cho 2.') });
      await showSteps(t, [`(${a} + ${b}) × ${h} : 2`, `= ${a + b} × ${h} : 2`, `= ${D(S)} (m²)`]);
      f.finish({ ok: `Diện tích thửa ruộng: (${a} + ${b}) × ${h} : 2 = ${D(S)} m²` });
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════════════════════════════
// Bài 27. Đường tròn. Chu vi và diện tích hình tròn
// ═════════════════════════════════════════════════════════════════════════════════════════════════════
const B27 = {
  explore: {
    setup: (board) => createCompass(board, { r: 3 }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Vẽ đường tròn bằng <b>com-pa</b>');
        await c.say('Muốn vẽ đường tròn bán kính 3 xăng-ti-mét, trước hết mở com-pa đúng 3 xăng-ti-mét trên thước.');
        await t.open();
        await c.say('Đặt đầu nhọn của com-pa vào tâm O.');
        await t.toCenter();
        t.caption('Kéo đầu bút chì quay <b>một vòng</b>');
        await c.say('Giữ đầu nhọn, kéo chấm vàng ở đầu bút chì quay một vòng.', 'Kéo chấm vàng quay một vòng');
        await waitDo(c, t, () => t.done(), { nudge: 'Kéo chấm vàng đi vòng xuống dưới, theo chiều kim đồng hồ.', el: () => t.q('.g5c-h') }, () => t.sweep(1200));
        t.finishDraw();
        t.caption('<b>Đường tròn</b> tâm O');
        await c.say('Com-pa vạch ra đường tròn tâm O.');
        await t.radius();
        t.caption('OA là <b>bán kính</b>');
        await c.say('Nối tâm O với điểm A trên đường tròn: OA là bán kính. Mọi bán kính đều bằng nhau, bằng 3 xăng-ti-mét.');
        await t.diameter();
        t.caption('MN là <b>đường kính</b>: d = r × 2');
        await c.say('MN đi qua tâm O là đường kính. Đường kính dài gấp 2 lần bán kính.');
      },
      async (c) => {
        const t = c.t;
        t.caption('Đường tròn hay hình tròn?');
        await t.flashLine();
        await c.say('Nét com-pa vạch ra là đường tròn.');
        await t.fill();
        await c.say('Đường tròn cùng cả phần bên trong là hình tròn.');
        await c.say('Phần tô màu xanh là gì?');
        await c.choose([{ html: 'Đường tròn', value: 0 }, { html: 'Hình tròn', value: 1 }], 1, { hint: 'Đường tròn chỉ là nét vẽ. Cả phần bên trong là hình tròn.' });
        t.caption('<b>Hình tròn</b> tâm O, bán kính 3 cm');
        await c.say('Đúng rồi! Đó là hình tròn.');
      },
      async (c) => {
        const t = c.use((b) => createWheel(b, { d: 2 }));
        t.caption('Bánh xe đường kính <b>2 dm</b> lăn một vòng');
        await c.say('Bánh xe có đường kính 2 đề-xi-mét. Kéo bánh xe lăn trên thước đúng một vòng, tới khi chấm đỏ chạm thước lần nữa.', 'Kéo bánh xe lăn <b>một vòng</b>');
        await waitDo(c, t, () => t.done(), { nudge: 'Kéo bánh xe sang phải.', el: () => t.q('.g5w-wheel') }, () => t.roll(1500));
        t.markC();
        t.caption('Một vòng lăn = <b>chu vi</b> bánh xe');
        await c.say('Vết đỏ trên thước dài bằng chu vi bánh xe: khoảng 6 phẩy 28 đề-xi-mét.');
        await c.say('Thử đặt các đường kính dọc theo vết lăn.');
        await t.diameters();
        t.caption('Chu vi = <b>3 lần</b> đường kính và thêm một chút');
        await c.say('Ba đường kính vẫn chưa đủ, còn thừa một chút. Chu vi gấp khoảng 3 phẩy 14 lần đường kính.');
      },
      async (c) => {
        const port = portrait(c.board);
        const t = c.use((b) => createGeo(b, { reserve: 0.17 }));
        t.caption('Chu vi hình tròn');
        const size = port ? 62 : 50, size2 = port ? 54 : 44;
        await c.say('Muốn tính chu vi hình tròn, ta lấy 3 phẩy 14 nhân với đường kính. Hoặc lấy 3 phẩy 14 nhân với bán kính rồi nhân với 2.');
        const y0 = port ? 150 : 70;
        await t.lines(t.W / 2, y0, ['C = 3,14 × d', 'hoặc  C = 3,14 × r × 2'], { size, anchor: 'middle', color: BLUE_D });
        await t.lines(t.W / 2, y0 + size * 1.35 * 2 + size2 * 0.9, ['d = 2 dm:  3,14 × 2 = <tspan fill="#DC2626">6,28 (dm)</tspan>', 'r = 5 m:  3,14 × 5 × 2 = <tspan fill="#DC2626">31,4 (m)</tspan>'], { size: size2, anchor: 'middle', color: '#334155' });
        if (port) {
          const R = 80, cx = 140, cy = y0 + size * 1.35 * 2 + size2 * 4.2 + R;
          t.L.fig.innerHTML = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#E0F2FE" stroke="${BLUE_D}" stroke-width="7"/><line x1="${cx - R}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="${GREEN}" stroke-width="6"/>
            ${txt(cx, cy - 14, 'd', { size: 40, color: GREEN })}<line x1="${cx + R + 40}" y1="${cy + R}" x2="${cx + R + 40 + 2 * R * 3.14}" y2="${cy + R}" stroke="${RED}" stroke-width="10" stroke-linecap="round"/>
            ${[0, 1, 2].map(k => `<line x1="${cx + R + 40 + 2 * R * k}" y1="${cy + R - 24}" x2="${cx + R + 40 + 2 * R * (k + 1)}" y2="${cy + R - 24}" stroke="${GREEN}" stroke-width="8"/><line x1="${cx + R + 40 + 2 * R * (k + 1)}" y1="${cy + R - 36}" x2="${cx + R + 40 + 2 * R * (k + 1)}" y2="${cy + R - 12}" stroke="${GREEN}" stroke-width="4"/>`).join('')}
            ${txt(cx + R + 40 + R * 3.14, cy + R + 50, 'C = 3,14 × d', { size: 44, color: RED })}`;
        }
        await c.say('Hình tròn đường kính 2 đề-xi-mét có chu vi 6 phẩy 28 đề-xi-mét. Bán kính 5 mét thì chu vi 31 phẩy 4 mét.');
        t.caption('Bán kính <b>4 cm</b>. Chu vi là?');
        await c.say('Hình tròn bán kính 4 xăng-ti-mét có chu vi bao nhiêu?');
        await c.choose(['12,56 cm', '25,12 cm', '50,24 cm'].map(v => ({ html: v, value: v })), '25,12 cm', { hint: (v) => (v === '12,56 cm' ? 'Đây là bán kính, phải nhân thêm với 2.' : 'Chu vi = 3,14 × r × 2.') });
        await c.say('Đúng rồi! 3 phẩy 14 nhân 4 nhân 2 bằng 25 phẩy 12 xăng-ti-mét.');
      },
      async (c) => {
        const t = c.use((b) => createSectors(b));
        t.caption('Cắt hình tròn thành các <b>múi</b>');
        await c.say('Muốn tính diện tích hình tròn, ta cắt hình tròn thành nhiều múi rồi ghép lại.');
        for (const n of [4, 8, 16, 32]) {
          await t.cutInto(n);
          t.caption(`Cắt thành <b>${n} múi</b>`);
          await c.choose([{ html: `🧩 Xếp ${n} múi xen kẽ`, value: 1 }], 1);
          await t.unroll();
          if (n === 4) await c.say('Xếp xen kẽ, múi xanh úp xuống, múi vàng ngửa lên. Hình còn gợn sóng.');
          if (n === 16) await c.say('Càng cắt nhiều múi, hình ghép càng giống hình chữ nhật.');
        }
        t.dims();
        t.caption('Gần thành hình chữ nhật: dài <b>3,14 × r</b>, rộng <b>r</b>');
        await c.say('Hình ghép gần thành hình chữ nhật. Chiều dài bằng nửa chu vi, tức là 3 phẩy 14 nhân r. Chiều rộng bằng bán kính r.');
        await c.say('Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng. Vậy diện tích hình tròn bằng bao nhiêu?');
        await c.choose([{ html: '3,14 × r × 2', value: 0 }, { html: '3,14 × r × r', value: 1 }, { html: '3,14 × r', value: 2 }], 1, { hint: 'Nhân chiều dài 3,14 × r với chiều rộng r.' });
        t.caption('<b>S = 3,14 × r × r</b> · r = 10 cm: 3,14 × 10 × 10 = 314 cm²');
        await c.say('Đúng rồi! Diện tích hình tròn bằng 3 phẩy 14 nhân bán kính rồi nhân bán kính. Bán kính 10 xăng-ti-mét thì diện tích 314 xăng-ti-mét vuông.');
      },
    ],
  },
  tasks: () => [taskCircC(), taskCircS(), taskCircFormula(), taskCircHalf(), taskCircWheel(), taskCircChoose()],
};

// ── Thực hành Bài 27 ──────────────────────────────────────────────────────────────────────────────────
const PI = 3.14;
const P1 = (x) => clean(PI * x);
/** Hình tròn tâm O, bán kính hoặc đường kính có nhãn. */
function drawCircle(t, { show = 'r', label = '', fill = '#BAE6FD', half = false, emoji = '' } = {}) {
  const R = half ? Math.min(t.box.h * 0.85, t.box.w / 2.4) : Math.min(t.box.h / 2, t.box.w / 3);
  const O = { x: t.box.x + t.box.w / 2, y: half ? t.box.y + t.box.h * 0.88 : t.box.y + t.box.h / 2 + 10 };
  let g = half
    ? `<path d="M${O.x - R} ${O.y} A${R} ${R} 0 0 1 ${O.x + R} ${O.y} Z" fill="${fill}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`
    : `<circle cx="${O.x}" cy="${O.y}" r="${R}" fill="${fill}" stroke="${INK}" stroke-width="4"/>`;
  if (emoji) g += `<text x="${O.x}" y="${O.y - R * 0.45}" font-size="${R * 0.4}" text-anchor="middle" dominant-baseline="middle">${emoji}</text>`;
  g += `<circle cx="${O.x}" cy="${O.y}" r="7" fill="${INK}"/>`;
  if (show === 'r') g += `<line x1="${O.x}" y1="${O.y}" x2="${O.x + R}" y2="${O.y}" stroke="${RED}" stroke-width="6"/>${txt(O.x + R / 2, O.y + 46, label, { size: 42, color: RED })}`;
  else g += `<line x1="${O.x - R}" y1="${O.y}" x2="${O.x + R}" y2="${O.y}" stroke="${GREEN}" stroke-width="6"/>${txt(O.x, O.y + (half ? -16 : 46), label, { size: 42, color: GREEN })}`;
  t.L.fig.innerHTML = g;
}

function taskCircC() {
  return {
    id: 'circc',
    make: (rng) => ({ x: rng.int(0, 3) === 3 ? rng.int(1, 9) + 0.5 : rng.int(2, 15), u: rng.pick(UN), by: rng.pick(['d', 'r']) }),
    async mount(f, { x, u, by }) {
      mark('circc');
      const C = by === 'd' ? P1(x) : P1(x * 2);
      f.q.innerHTML = `Hình tròn ${by === 'd' ? 'đường kính' : 'bán kính'} ${D(x)} ${u}. &nbsp;C = ${BOX} ${u}`;
      const t = board(f, 2);
      drawCircle(t, { show: by, label: `${by} = ${D(x)} ${u}` });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(C), max: 7,
        say: `Tính chu vi hình tròn có ${by === 'd' ? 'đường kính' : 'bán kính'} ${D(x)} ${UNIT_SAY[u]}.`,
        hint: (v) => (by === 'r' && Math.abs(v - P1(x)) < 1e-9 ? 'Đây là bán kính, phải nhân thêm với 2.' : by === 'd' ? 'C = 3,14 × d.' : 'C = 3,14 × r × 2.') });
      await showSteps(t, by === 'd' ? [`C = 3,14 × ${D(x)}`, `= ${D(C)} (${u})`] : [`C = 3,14 × ${D(x)} × 2`, `= ${D(C)} (${u})`]);
      f.finish({ ok: `C = 3,14 × ${D(x)}${by === 'r' ? ' × 2' : ''} = ${D(C)} ${u}` });
    },
  };
}

function taskCircS() {
  return {
    id: 'circs',
    make: (rng) => { const by = rng.pick(['r', 'r', 'd']); const u = rng.pick(UN); const x = by === 'd' ? rng.int(1, 10) * 2 : rng.pick([rng.int(2, 12), rng.int(1, 5) + 0.5]); return { x, u, by }; },
    async mount(f, { x, u, by }) {
      mark('circs');
      const r = by === 'd' ? x / 2 : x, S = clean(PI * r * r);
      f.q.innerHTML = `Hình tròn ${by === 'd' ? 'đường kính' : 'bán kính'} ${D(x)} ${u}. &nbsp;S = ${BOX} ${u}²`;
      const t = board(f, 3);
      drawCircle(t, { show: by, label: `${by} = ${D(x)} ${u}` });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: Number.isInteger(S) ? S : decKey(S), max: 7,
        say: `Tính diện tích hình tròn có ${by === 'd' ? 'đường kính' : 'bán kính'} ${D(x)} ${UNIT_SAY[u]}.`,
        hint: (v) => (by === 'd' && Math.abs(v - P1(x * x)) < 1e-6 ? 'Đề cho đường kính. Bán kính bằng đường kính chia 2.' : Math.abs(v - P1(r * 2)) < 1e-6 ? 'Đó là chu vi. Diện tích = 3,14 × r × r.' : 'S = 3,14 × r × r.') });
      await showSteps(t, [...(by === 'd' ? [`r = ${D(x)} : 2 = ${D(r)} (${u})`] : []), `S = 3,14 × ${D(r)} × ${D(r)}`, `= ${D(S)} (${u}²)`]);
      f.finish({ ok: `S = 3,14 × ${D(r)} × ${D(r)} = ${D(S)} ${u}²` });
    },
  };
}

const THINGS = [['🌸', 'Bồn hoa hình tròn', 'm'], ['🧶', 'Tấm thảm hình tròn', 'dm'], ['🕰️', 'Mặt đồng hồ hình tròn', 'cm'], ['🍽️', 'Mặt bàn hình tròn', 'dm'], ['⛲', 'Hồ nước hình tròn', 'm']];
function taskCircFormula() {
  return {
    id: 'circform',
    make: (rng) => ({ k: rng.int(0, THINGS.length - 1), r: rng.pick([3, 4, 5, 6, 7, 8, 9]), what: rng.pick(['C', 'S']) }),
    async mount(f, { k, r, what }) {
      mark('circform');
      const [ic, name, u] = THINGS[k];
      f.q.innerHTML = `${name} bán kính ${r} ${u}. Tính <b>${what === 'C' ? 'chu vi' : 'diện tích'}</b> bằng phép tính nào?`;
      const t = board(f);
      drawCircle(t, { show: 'r', label: `r = ${r} ${u}`, emoji: ic });
      const opts = [`3,14 × ${r} × 2`, `3,14 × ${r} × ${r}`, `3,14 × ${r}`];
      const ans = what === 'C' ? opts[0] : opts[1];
      await f.choose({ options: shuffleBy(opts, r + k).map(v => ({ html: v, value: v })), answer: ans,
        say: `${name} bán kính ${r} ${UNIT_SAY[u]}. Tính ${what === 'C' ? 'chu vi' : 'diện tích'} bằng phép tính nào?`,
        hint: what === 'C' ? 'Chu vi là đường bao quanh: 3,14 × r × 2.' : 'Diện tích là cả mặt bên trong: 3,14 × r × r.' });
      const val = what === 'C' ? P1(r * 2) : P1(r * r);
      f.finish({ ok: `${what === 'C' ? 'Chu vi' : 'Diện tích'}: ${ans} = ${D(val)} ${u}${what === 'S' ? '²' : ''}` });
    },
  };
}

function taskCircHalf() {
  return {
    id: 'circhalf',
    make: (rng) => ({ d: rng.int(2, 10) * 2, u: rng.pick(['m', 'dm', 'cm']), ic: rng.int(0, 1) }),
    async mount(f, { d, u, ic }) {
      mark('circhalf');
      const half = P1(d / 2), C = clean(half + d);
      const name = ic ? 'Mặt bàn hình nửa hình tròn' : 'Cái ao hình nửa hình tròn';
      f.q.innerHTML = `${name}, đường kính ${d} ${u}. Chu vi = ${BOX} ${u}`;
      const t = board(f, 2);
      drawCircle(t, { show: 'd', label: `d = ${d} ${u}`, half: true, fill: ic ? '#FED7AA' : '#7DD3FC', emoji: ic ? '' : '🦆' });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(C), max: 7,
        say: `${name} có đường kính ${d} ${UNIT_SAY[u]}. Tính chu vi.`,
        hint: (v) => (Math.abs(v - half) < 1e-9 ? 'Chu vi gồm cả cạnh thẳng: cộng thêm đường kính.' : 'Nửa đường tròn: 3,14 × d : 2, rồi cộng thêm đường kính.') });
      await showSteps(t, [`3,14 × ${d} : 2 = ${D(half)}`, `${D(half)} + ${d} = ${D(C)} (${u})`]);
      f.finish({ ok: `3,14 × ${d} : 2 + ${d} = ${D(C)} ${u}` });
    },
  };
}

function taskCircWheel() {
  return {
    id: 'circwheel',
    make: (rng) => ({ d: rng.pick([0.5, 0.6, 0.7, 0.8, 0.65, 0.4]), n: rng.pick([10, 20, 50, 100, 200]), bike: rng.int(0, 1) }),
    async mount(f, { d, n, bike }) {
      mark('circwheel');
      const one = P1(d), all = clean(one * n);
      f.q.innerHTML = `${bike ? '🚲 Bánh xe đạp' : '🛞 Bánh xe'} đường kính ${D(d)} m lăn ${n} vòng. Quãng đường ${BOX} m`;
      const t = board(f, 2);
      const R = Math.min(t.box.h / 2.4, Math.max(130, (t.box.w - 300) / 2.2), 240), y = t.box.y + t.box.h + 10, cx = t.box.x + R + 20; // bánh to theo chỗ trống, chừa mũi tên "n vòng"
      let spokes = '';
      for (let k = 0; k < 8; k++) spokes += `<line x1="${cx}" y1="${y - R}" x2="${cx + (R - 12) * Math.cos(k * Math.PI / 4)}" y2="${y - R + (R - 12) * Math.sin(k * Math.PI / 4)}" stroke="#94A3B8" stroke-width="4"/>`;
      t.L.fig.innerHTML = `<rect x="0" y="${y}" width="${t.W}" height="36" fill="#D6D3D1"/><line x1="0" y1="${y}" x2="${t.W}" y2="${y}" stroke="${INK}" stroke-width="3.5"/>
        <line class="g5w-trail" x1="${cx}" y1="${y + 3}" x2="${cx}" y2="${y + 3}" stroke="${RED}" stroke-width="10" stroke-linecap="round"/>
        <g class="g5w-wheel" style="transform-origin:${cx}px ${y - R}px"><circle cx="${cx}" cy="${y - R}" r="${R}" fill="#E0F2FE" stroke="${INK}" stroke-width="9"/>${spokes}
        <circle cx="${cx}" cy="${y - R}" r="14" fill="${INK}"/><line x1="${cx - R}" y1="${y - R}" x2="${cx + R}" y2="${y - R}" stroke="${GREEN}" stroke-width="6"/></g>
        <g class="g5w-d">${txt(cx, y - R - 18, `d = ${D(d)} m`, { size: Math.max(40, R * 0.24), color: GREEN })}</g>
        <g class="g5w-d"><path d="M${cx + R + 50} ${y - 40} H${t.box.x + t.box.w}" stroke="${RED}" stroke-width="6" stroke-dasharray="14 10"/><path d="M${t.box.x + t.box.w - 22} ${y - 58} L${t.box.x + t.box.w + 6} ${y - 40} L${t.box.x + t.box.w - 22} ${y - 22}" fill="none" stroke="${RED}" stroke-width="6"/>
        ${txt((cx + R + 50 + t.box.x + t.box.w) / 2, y - 62, `${n} vòng`, { size: 42, color: RED })}</g>`;
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(all), max: 8,
        say: `Bánh xe có đường kính ${D(d)} mét lăn ${n} vòng. Tính quãng đường bánh xe đi được.`,
        hint: (v) => (Math.abs(v - one) < 1e-9 ? `Đó là quãng đường lăn 1 vòng. Nhân với ${n}.` : 'Một vòng lăn bằng chu vi bánh xe: 3,14 × d.') });
      // Bước kiểm chứng: bánh xe lăn thật trên đường (quay đúng theo quãng đường: góc = đường đi : bán kính), vệt đỏ là quãng đường
      const dist = t.box.x + t.box.w - R - cx;
      const ms = calmMotion() ? 1400 : 1800, easing = 'ease-in-out';
      t.L.fig.querySelectorAll('.g5w-d').forEach(e => e.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }));
      t.L.fig.querySelector('.g5w-wheel').animate([{ transform: 'none' }, { transform: `translateX(${dist}px) rotate(${(dist / R) * 180 / Math.PI}deg)` }], { duration: ms, easing, fill: 'forwards' });
      const trail = t.L.fig.querySelector('.g5w-trail'), t0 = performance.now();
      await new Promise((res) => {
        const step = (now) => {
          const k = Math.min(1, (now - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
          trail.setAttribute('x2', cx + dist * e);
          if (k < 1) requestAnimationFrame(step); else res();
        };
        requestAnimationFrame(step);
      });
      await showSteps(t, [`3,14 × ${D(d)} = ${D(one)} (m)`, `${D(one)} × ${n} = ${D(all)} (m)`]);
      f.finish({ ok: `${D(one)} × ${n} = ${D(all)} m` });
    },
  };
}

function taskCircChoose() {
  return {
    id: 'circchoose',
    make: (rng) => ({ r: rng.int(3, 10), u: rng.pick(UN), by: rng.pick(['r', 'd']) }),
    async mount(f, { r, u, by }) {
      mark('circchoose');
      const x = by === 'd' ? r * 2 : r;
      const S = P1(r * r);
      f.q.innerHTML = `Hình tròn ${by === 'd' ? 'đường kính' : 'bán kính'} ${x} ${u}. Diện tích là:`;
      const t = board(f);
      drawCircle(t, { show: by, label: `${by} = ${x} ${u}` });
      const ok = `${D(S)} ${u}²`;
      const wrong = by === 'd' ? [`${D(P1(x * x))} ${u}²`, `${D(P1(x))} ${u}`, `${D(S)} ${u}`] : [`${D(P1(r * 2))} ${u}²`, `${D(S)} ${u}`, `${D(P1(r * r * 2))} ${u}²`];
      const opts = [...new Set([ok, ...wrong])];
      await f.choose({ options: shuffleBy(opts, r * 5 + x).map(v => ({ html: v, value: v })), answer: ok, say: 'Chọn diện tích đúng của hình tròn.',
        hint: (v) => (by === 'd' && v === `${D(P1(x * x))} ${u}²` ? 'Đề cho đường kính. Bán kính = đường kính : 2.' : !v.endsWith('²') ? 'Diện tích phải dùng đơn vị vuông.' : 'S = 3,14 × r × r.') });
      f.finish({ ok: `${by === 'd' ? `r = ${x} : 2 = ${r} ${u} · ` : ''}S = 3,14 × ${r} × ${r} = ${D(S)} ${u}²` });
    },
  };
}

css('g5-shapes', `
  .g4-pboard .g4-choices.g5sh-pics { flex: 1 1 0 !important; min-height: 0; }
  .g5sh-pics .g4-choice { display: flex; align-items: center; justify-content: center; padding: 0.25em; min-height: 0; }
  @container (orientation: portrait) { .g4-pboard .g4-choices.g5sh-pics { flex-direction: column; } }
  .g4-pboard:has(.g5sh-pics) .g4-q { flex: none !important; display: block !important; }
  .g5sh-svg { display: block; width: 100%; height: 100%; max-height: 100%; }
`);

export const SHAPE_LESSONS = { 25: B25, 26: B26, 27: B27 };
