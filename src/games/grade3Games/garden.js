/**
 * 🌱 Vườn trồng theo hàng — thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.8 (bảng nhân, bảng chia, Bài 4–13).
 * Mảnh vườn là các luống (hàng) đất, mỗi luống một số ô trồng. Mỗi luống là một nút to: chạm vào là trồng / tưới /
 * gom cả hàng, số trong vòng tròn cuối luống hiện kết quả (đếm thêm 5, 10, 15… hoặc số cây của hàng đó).
 * Bé gõ số vào máy tính TRƯỚC, rồi tự trồng, tưới, chia đều để kiểm chứng (giống các trò lớp 3 khác).
 *   plant:  trồng r hàng, mỗi hàng c cây → cần bao nhiêu cây con? (chạm từng luống, cây bay từ khay xuống)
 *   count:  vườn đã lớn, bé tự đếm số hàng, số cây mỗi hàng rồi tính cả vườn (chạm luống để tưới, đếm thêm)
 *   turn:   tính cả vườn (r hàng × c cây), rồi 🔄 xoay vườn: c hàng, mỗi hàng mấy cây? (c × r = r × c, chia ngược lại)
 *   rows:   có N cây con, mỗi hàng c cây → trồng được mấy hàng? (số chia ở cấp 3)
 *   perRow: có N cây con chia đều r hàng → mỗi hàng mấy cây? (chạm khay: mỗi lượt mỗi hàng 1 cây; thừa số ở cấp 3)
 *   start:  đã chia đều vào r hàng, mỗi hàng c cây → lúc đầu khay có mấy cây? (gom từng hàng về khay; số bị chia)
 * Dùng khung quầy của Chợ phiên (market/stall.js: người làm vườn + máy tính + thẻ kết quả), theme 'garden'.
 */

import { plantSvg, holeSvg, flyPlant, crateSvg, canSvg, dropsSvg, gardenBackdrop, gardenIcon, CROPS, GROWN, INK } from './art/garden.js';
import { NPCS, cap } from './npc.js';
import { mountStall, Q } from './market/stall.js';
import { stallMeta, levelMeta, tablesText } from './catalog.js';
import { flyOne, calmMotion } from './fly.js';
import { sfx } from '../preschool/fx.js';

const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const npcOf = (id) => NPCS.find(n => n.id === id);
const GARDENERS = [
  { ...npcOf('ong'), id: 'ong-vuon', name: 'Ông Sáu làm vườn' },
  { ...npcOf('ba'), id: 'ba-vuon', name: 'Bà Tư' },
  { ...npcOf('co'), id: 'co-vuon', name: 'Cô Lan' },
  { ...npcOf('chu'), id: 'chu-vuon', name: 'Chú Hùng' },
];
const CROP_EMOJI = { cabbage: '🥬', sunflower: '🌻', corn: '🌽' };

export const GARDEN_LEVELS = [
  {
    ...levelMeta('garden-1'), missions: 5, frame: 'mul', tables: [2, 5],
    order: ['plant', 'count', 'plant', 'count', 'plant'],
    knowledge: 'bảng nhân 2, bảng nhân 5',
    ask: (n) => `Vườn nhà ${n.me} trồng cây thành hàng. ${cap(n.you)} tính giúp ${n.me} có bao nhiêu cây!`,
    desc: 'Trồng 4 hàng, mỗi hàng 5 cây: 5 × 4 = 20 cây. Đếm thêm từng hàng: 5, 10, 15, 20.',
    how: [['🧮', 'Gõ số cây'], ['👆', 'Chạm từng hàng'], ['🌱', 'Đếm thêm']],
  },
  {
    ...levelMeta('garden-2'), missions: 5, frame: 'div', tables: [3, 4, 5, 6, 7, 8, 9],
    order: ['turn', 'rows', 'turn', 'perRow', 'turn'],
    knowledge: 'bảng nhân 3 đến 9, bảng chia 3 đến 9',
    ask: (n) => `${cap(n.me)} xoay vườn nhìn từ phía bên kia, số cây có đổi không? ${cap(n.you)} tính rồi chia cây giúp ${n.me}!`,
    desc: 'Vườn 4 hàng, mỗi hàng 6 cây: 6 × 4 = 24. Xoay vườn: 6 hàng, mỗi hàng 4 cây, 24 : 6 = 4.',
    how: [['🧮', 'Gõ số'], ['🔄', 'Xoay vườn'], ['👆', 'Chạm hàng, chạm khay']],
  },
  {
    ...levelMeta('garden-3'), missions: 6, frame: 'find', tables: [2, 3, 4, 5, 6, 7, 8, 9],
    order: null, // mỗi ván đủ ba kiểu tìm thành phần, mỗi kiểu hai lần, thứ tự ngẫu nhiên
    knowledge: 'tìm thừa số, tìm số bị chia, tìm số chia',
    ask: (n) => `${cap(n.me)} có ít cây con, cần chia đều vào các hàng. ${cap(n.you)} tìm giúp ${n.me} số còn thiếu!`,
    desc: 'Có 42 cây con trồng thành 6 hàng đều nhau: ? × 6 = 42, mỗi hàng 42 : 6 = 7 cây.',
    how: [['🧮', 'Gõ số'], ['👆', 'Chạm hàng, chạm khay'], ['🌱', 'Chia đều']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
const FIND = ['perRow', 'rows', 'start'];

function kindFor(rng, level, h) {
  if (level.order) return level.order[h.length % level.order.length];
  // Hai lượt xáo, lượt sau không bắt đầu bằng kiểu vừa chơi: không gặp cùng kiểu hai lần liền.
  let order = h[0]?.findOrder;
  if (!order) {
    const a = rng.shuffle(FIND);
    let b;
    do { b = rng.shuffle(FIND); } while (b[0] === a[2]);
    order = [...a, ...b];
  }
  return { kind: order[h.length % order.length], findOrder: order };
}

/** Một thừa số trong bảng của cấp (t), thừa số kia 2–9; không trùng cặp của lượt trước. */
function pickPair(rng, level, prev) {
  for (let k = 0; k < 40; k++) {
    const t = rng.pick(level.tables), o = rng.int(3, 9);
    if (!prev || prev.t * prev.o !== t * o) return { t, o }; // khác số cây của lượt trước (6 × 9 rồi 9 × 6 cũng tránh)
  }
  return { t: level.tables[0], o: 4 };
}

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const GARDEN_GAME = {
  ...stallMeta('garden'),
  unitWord: 'mảnh vườn',
  npcs: GARDENERS,
  levels: GARDEN_LEVELS,
  stallIcon: () => gardenIcon(64),
  againText: 'Chơi lại (vườn mới)',
  summaryText: (ok, total) => `Em đã giúp xong <strong>${ok}/${total}</strong> mảnh vườn.`,

  howTo(level) {
    return [...level.how.map(([pic, label]) => ({ pic, label })), { pic: '😊', label: 'Ông bà vui' }];
  },

  /** Mở từ một bài bảng nhân (catalog.js tablesForUnit): chỉ ra phép tính trong các bảng của bài đó. */
  focus(level, { tables } = {}) {
    if (!tables) return level;
    return { ...level, tables, knowledge: tablesText(tables, { div: level.frame !== 'mul' }) };
  },

  makeMission(rng, level, history) {
    const h = history.filter(x => x && x.kind);
    const pad = history.length - h.length; // lượt giả của trang xem thử (games-preview.html ?h=)
    const hk = [...Array(pad).fill({}), ...h];
    const k = kindFor(rng, level, hk);
    const kind = typeof k === 'string' ? k : k.kind;
    const prev = h[h.length - 1];
    let { t, o } = pickPair(rng, level, prev);
    while (kind === 'turn' && o === t) o = rng.int(2, 9); // vườn vuông xoay vẫn y như cũ: không thấy gì để học
    const recent = h.slice(-2).map(x => x.npc.id);
    const npc = rng.pick(GARDENERS.filter(n => !recent.includes(n.id)));
    let r, c;
    // r = số hàng, c = số cây mỗi hàng. Phép chia: số chia là số của bảng (rows: c; perRow: r).
    if (kind === 'rows') { c = t; r = o; } else if (kind === 'perRow') { r = t; c = o; } else if (rng() < 0.5) { r = t; c = o; } else { r = o; c = t; }
    const lastGrown = [...h].reverse().find(x => GROWN.includes(x.crop))?.crop;
    const grown = rng.pick(GROWN.filter(g => g !== lastGrown));
    const crop = kind === 'count' || kind === 'turn' ? grown : 'seed';
    const spare = kind === 'rows' ? Math.min(9, r + rng.int(1, 2)) : 0; // luống trống thêm: bé không đếm luống ra đáp số
    return { kind, findOrder: typeof k === 'string' ? null : k.findOrder, t, o, r, c, N: r * c, crop, spare, npc, frame: level.frame };
  },

  mountMission(stage, m, level, api) {
    injectGardenStyles();
    const n = m.npc;
    const { r, c, N } = m;
    const isWater = m.kind === 'count' || m.kind === 'turn';
    const usesCrate = !isWater;
    const cropName = CROPS[m.crop].name;

    const { counter, main, speak, row, ask, rest, nudge } = mountStall(stage, {
      npc: n, api, theme: 'garden', cameo: false,
      sign: `<span class="g3v-sign-pic">🌱</span><span><strong>Vườn nhà ${n.me}</strong><br>${{ mul: 'Trồng theo hàng', div: 'Xoay vườn, chia cây', find: 'Tìm số còn thiếu' }[m.frame]}</span>`,
      counter: `
        ${gardenBackdrop()}
        <div class="g3v-bench">
          <div class="g3v-plotbox"><svg class="g3v-plot" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"></svg></div>
          <div class="g3v-side">
            <div class="g3v-tool" data-act="tool">${usesCrate ? '' : `<div class="g3v-can">${canSvg()}</div>`}</div>
            <div class="g3v-info">
              <div class="g3v-tally">&nbsp;</div>
              <div class="g3v-actbar"><span class="g3v-hint">&nbsp;</span><button type="button" class="g3v-act" data-act="turn">🔄 Xoay vườn</button></div>
            </div>
          </div>
        </div>`,
    });
    // Màn ngang: thẻ kết quả đè lên cột người làm vườn + máy tính (cuối lượt không cần nữa, đáp số có trong thẻ),
    // mảnh vườn và các vòng số cuối luống vẫn thấy trọn. Màn dọc: thẻ đè dải khay / bình tưới ở đáy.
    if (matchMedia('(orientation: landscape)').matches) {
      main.removeAttribute('data-result-host');
      stage.querySelector('.g3f-customer')?.setAttribute('data-result-host', '');
    }
    const svg = counter.querySelector('.g3v-plot');
    const tool = counter.querySelector('.g3v-tool');
    const tallyEl = counter.querySelector('.g3v-tally');
    const hintEl = counter.querySelector('.g3v-hint');
    const turnBtn = counter.querySelector('[data-act="turn"]');

    // ── Trạng thái ──
    // rows × cols ô; cell: '' (không có gì), 'hole', 'faint' (chỗ trống mờ), hoặc tên cây.
    // badge[i]: chữ trong vòng tròn cuối luống i ('' = chưa hiện). done[i]: luống đã chạm.
    const st = { step: 1, phase: 'ask', guess: null, busy: false, over: false, crate: 0, rounds: 0, planted: 0, total: 0 };
    let R, C, cells, badge, done;
    function setup(rows, cols, fill) {
      R = rows; C = cols;
      cells = Array.from({ length: R }, () => Array(C).fill(fill));
      badge = Array(R).fill('');
      done = Array(R).fill(false);
    }
    if (m.kind === 'plant') setup(r, c, 'hole');
    else if (isWater) setup(r, c, m.crop);
    else if (m.kind === 'rows') { setup(m.spare, c, 'hole'); st.crate = N; }
    else if (m.kind === 'perRow') { setup(r, 9, 'faint'); st.crate = N; }
    else { setup(r, c, 'seed'); st.crate = 0; } // start
    // Khung giữ chỗ cố định cả lượt (xoay vườn: vuông K × K để hai chiều đều vừa).
    const K = Math.max(r, c);
    const RES = m.kind === 'turn' ? { rows: K, cols: K } : { rows: R, cols: C };

    // ── Vẽ mảnh vườn ──
    const P = 50, CELL = 44, PAD = 14, BADGE = 56;
    const W = PAD * 2 + RES.cols * P + BADGE, H = PAD * 2 + RES.rows * P;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const offX = () => PAD + ((RES.cols - C) * P) / 2;
    const offY = () => PAD + ((RES.rows - R) * P) / 2;
    const slotXY = (i, j) => ({ x: offX() + j * P + (P - CELL) / 2, y: offY() + i * P + (P - CELL) / 2 });
    const cellSvg = (v, x, y) => (v === 'hole' ? holeSvg(x, y, CELL) : v === 'faint' ? holeSvg(x, y, CELL, true) : v ? plantSvg(v, x, y, CELL) : '');

    function render() {
      const gx = offX(), gy = offY(), gw = C * P, gh = R * P;
      let s = `<rect class="g3v-board" x="2" y="2" width="${W - 4}" height="${H - 4}" rx="16"/>`;
      s += `<g class="g3v-grid" style="transform-origin:${gx + gw / 2}px ${gy + gh / 2}px">`;
      for (let i = 0; i < R; i++) {
        const y = gy + i * P;
        s += `<g class="g3v-row${done[i] ? ' g3v-done' : ''}" data-row="${i}">`
          + `<rect class="g3v-hit" x="${gx - 8}" y="${y}" width="${gw + 8 + BADGE}" height="${P}" rx="12"/>`
          + `<rect class="g3v-furrow" x="${gx - 4}" y="${y + 3}" width="${gw + 8}" height="${P - 6}" rx="12"/>`;
        for (let j = 0; j < C; j++) {
          const q = slotXY(i, j);
          s += `<g class="g3v-slot" data-r="${i}" data-c="${j}"><rect class="g3v-slot-box" x="${q.x}" y="${q.y}" width="${CELL}" height="${CELL}"/>${cellSvg(cells[i][j], q.x, q.y)}</g>`;
        }
        s += '</g>';
      }
      s += '</g>';
      // Vòng số cuối mỗi luống (giữ chỗ từ đầu, chỉ hiện khi có số).
      const bx = gx + gw + BADGE / 2 - 2; // ngay sau cây cuối luống (vườn đã xoay: luống ngắn hơn khung)
      for (let i = 0; i < R; i++) {
        const y = gy + i * P + P / 2;
        s += `<g class="g3v-badge${badge[i] ? ' g3v-badge-on' : ''}" data-badge="${i}"><circle cx="${bx}" cy="${y}" r="21"/><text x="${bx}" y="${y + 8}" text-anchor="middle">${badge[i]}</text></g>`;
      }
      svg.innerHTML = s;
    }
    const slotEl = (i, j) => svg.querySelector(`.g3v-slot[data-r="${i}"][data-c="${j}"]`);
    function drawSlot(i, j) {
      const el = slotEl(i, j);
      if (!el) return;
      const q = slotXY(i, j);
      el.innerHTML = `<rect class="g3v-slot-box" x="${q.x}" y="${q.y}" width="${CELL}" height="${CELL}"/>${cellSvg(cells[i][j], q.x, q.y)}`;
    }
    function setBadge(i, text) {
      badge[i] = String(text);
      const g = svg.querySelector(`[data-badge="${i}"]`);
      if (!g) return;
      g.classList.add('g3v-badge-on');
      g.querySelector('text').textContent = badge[i];
      g.classList.remove('g3v-pop'); void g.getBBox(); g.classList.add('g3v-pop');
    }
    const slotRect = (i, j) => slotEl(i, j)?.querySelector('.g3v-slot-box')?.getBoundingClientRect();

    // ── Khay cây con / bình tưới ──
    function drawCrate() {
      if (!usesCrate) return;
      const label = m.kind === 'plant' ? 'cây con' : String(st.crate);
      tool.innerHTML = crateSvg({ label, empty: m.kind !== 'plant' && st.crate === 0 });
    }
    drawCrate();
    /** Khung bay ra / vào khay: một ô cỡ ô trồng ở miệng khay. */
    function crateRect() {
      const box = tool.querySelector('svg')?.getBoundingClientRect();
      const one = slotRect(0, 0);
      if (!box || !one) return null;
      const s = one.width;
      return { left: box.left + box.width / 2 - s / 2, top: box.top + box.height * 0.08, width: s, height: s };
    }
    const setCrate = (v) => {
      st.crate = v;
      const t = tool.querySelector('.g3v-crate-num');
      if (t) t.textContent = String(v);
      if (v === 0 && m.kind !== 'start') drawCrate();
    };

    function tally() {
      if (m.kind === 'plant') return `🌱 Đã trồng: <b>${st.total}</b> cây`;
      if (isWater) return `💧 Đã tưới: <b>${st.total}</b> cây`;
      if (m.kind === 'rows') return `🌱 Đã trồng: <b>${st.planted}</b> hàng`;
      if (m.kind === 'perRow') return `🌱 Mỗi hàng: <b>${st.rounds}</b> cây`;
      return `🧺 Về khay: <b>${st.total}</b> cây`;
    }
    const showTally = () => { tallyEl.innerHTML = tally(); tallyEl.classList.add('g3v-tally-on'); };
    const hint = (text) => { hintEl.innerHTML = text || '&nbsp;'; hintEl.classList.toggle('g3v-hint-on', !!text); };

    render();
    if (import.meta.env.DEV) {
      window.__g3garden = {
        m, st,
        get answer() { return answer(); },
        /** Làm hết phần kiểm chứng (chạm mọi luống / chạm khay) — dùng khi chụp màn hình thử. */
        async auto() {
          for (let k = 0; k < 12 && st.phase === 'act'; k++) {
            if (m.kind === 'perRow') tool.click();
            else svg.querySelector(`.g3v-row:not(.g3v-done)`)?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            await new Promise(res => { const w = () => (st.busy ? setTimeout(w, 50) : res()); setTimeout(w, 60); });
          }
        },
      };
    }

    // ── Lời người làm vườn, hoá đơn ──
    function intro() {
      if (m.kind === 'plant') {
        speak(`${cap(n.me)} muốn trồng ${r} hàng, mỗi hàng ${c} cây con. Cần bao nhiêu cây con?`, null,
          `Trồng ${WANT(`${r} hàng`)}, mỗi hàng ${WANT(`${c} cây`)}. Cần mấy cây con?`);
        return row('🌱', 'Số hàng', `<b>${r} hàng</b>`) + row('🌿', 'Mỗi hàng', `<b>${c} cây</b>`) + row('🧺', 'Cần', Q, true);
      }
      if (m.kind === 'count') {
        speak(`Vườn ${cropName.replace(/^cây /, '')} của ${n.me} có bao nhiêu cây? ${cap(n.you)} đếm số hàng, số cây mỗi hàng rồi tính!`, null,
          `Vườn có bao nhiêu ${cropName}? Đếm số hàng, số cây mỗi hàng!`);
        return row('👀', 'Đếm', '<b>hàng, cây</b>') + row(CROP_EMOJI[m.crop], 'Cả vườn', Q, true);
      }
      if (m.kind === 'turn' && st.step === 1) {
        speak(`Vườn có ${r} hàng, mỗi hàng ${c} ${cropName}. Cả vườn có bao nhiêu cây?`, null,
          `${WANT(`${r} hàng`)}, mỗi hàng ${WANT(`${c} cây`)}. Cả vườn có mấy cây?`);
        return row('🌱', 'Số hàng', `<b>${r} hàng</b>`) + row('🌿', 'Mỗi hàng', `<b>${c} cây</b>`) + row(CROP_EMOJI[m.crop], 'Cả vườn', Q, true);
      }
      if (m.kind === 'turn') {
        speak(`Nhìn từ phía này, vườn có ${c} hàng. Cả vườn vẫn ${N} cây. Mỗi hàng có bao nhiêu cây?`, null,
          `Bây giờ có ${WANT(`${c} hàng`)}, cả vườn ${WANT(`${N} cây`)}. Mỗi hàng mấy cây?`);
        return row(CROP_EMOJI[m.crop], 'Cả vườn', `<b>${N} cây</b>`) + row('🌱', 'Số hàng', `<b>${c} hàng</b>`) + row('🌿', 'Mỗi hàng', Q, true);
      }
      if (m.kind === 'rows') {
        speak(`Khay có ${N} cây con. Mỗi hàng trồng ${c} cây. Trồng được bao nhiêu hàng?`, null,
          `Có ${WANT(`${N} cây con`)}, mỗi hàng ${WANT(`${c} cây`)}. Trồng được mấy hàng?`);
        return row('🧺', 'Có', `<b>${N} cây</b>`) + row('🌿', 'Mỗi hàng', `<b>${c} cây</b>`) + row('🌱', 'Số hàng', Q, true);
      }
      if (m.kind === 'perRow') {
        speak(`Khay có ${N} cây con, chia đều vào ${r} hàng. Mỗi hàng được bao nhiêu cây?`, null,
          `Có ${WANT(`${N} cây con`)}, chia đều ${WANT(`${r} hàng`)}. Mỗi hàng mấy cây?`);
        return row('🧺', 'Có', `<b>${N} cây</b>`) + row('🌱', 'Số hàng', `<b>${r} hàng</b>`) + row('🌿', 'Mỗi hàng', Q, true);
      }
      speak(`${cap(n.me)} đã chia đều cây con trong khay vào ${r} hàng, mỗi hàng ${c} cây. Lúc đầu khay có bao nhiêu cây con?`, null,
        `Chia đều ${WANT(`${r} hàng`)}, mỗi hàng ${WANT(`${c} cây`)}. Lúc đầu khay có mấy cây?`);
      return row('🌱', 'Số hàng', `<b>${r} hàng</b>`) + row('🌿', 'Mỗi hàng', `<b>${c} cây</b>`) + row('🧺', 'Lúc đầu', Q, true);
    }

    const unitOf = () => (m.kind === 'rows' ? 'hàng' : 'cây');
    function answer() {
      if (m.kind === 'turn') return st.step === 1 ? N : r;
      if (m.kind === 'rows') return r;
      if (m.kind === 'perRow') return c;
      return N;
    }
    const actHint = () => ({
      plant: '👆 Chạm từng hàng để trồng',
      count: '👆 Chạm từng hàng để tưới',
      turn: '👆 Chạm từng hàng để tưới',
      rows: `👆 Chạm hàng để trồng, mỗi hàng ${c} cây`,
      perRow: '👆 Chạm khay: mỗi hàng 1 cây',
      start: '👆 Chạm hàng, gom về khay',
    })[m.kind];

    function askNow() {
      st.phase = 'ask';
      st.guess = null;
      hint('🧮 Gõ số vào máy tính');
      const bill = intro();
      ask(bill, unitOf(), (v, pad) => {
        if (st.guess != null) return;
        st.guess = v;
        pad.lock();
        st.phase = 'act';
        showTally();
        hint(actHint());
        svg.classList.add('g3v-ready');
        if (m.kind === 'perRow') tool.classList.add('g3v-tool-tap');
        const line = actHint().replace('👆 ', '');
        speak(`${line}!`, null, `👉 ${line}!`);
      });
    }
    askNow();

    // ── Thao tác ──
    const notYet = () => {
      speak(`${cap(n.you)} gõ số vào máy tính trước đã!`, null, 'Gõ số vào máy tính trước!');
      nudge();
    };
    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    svg.addEventListener('click', (e) => {
      const g = e.target.closest('.g3v-row');
      if (!g || st.over || st.busy) return;
      if (st.phase === 'ask') return notYet();
      if (st.phase !== 'act') return;
      const i = +g.dataset.row;
      if (m.kind === 'perRow') { speak('Chạm vào khay cây con!', null, '👉 Chạm vào khay cây con!'); pulseTool(); return; }
      if (done[i]) return;
      if (m.kind === 'rows' && st.crate === 0) return;
      st.busy = true;
      sfx.tap();
      const run = m.kind === 'plant' || m.kind === 'rows' ? plantRow(i) : isWater ? waterRow(i) : collectRow(i);
      run.then(() => { st.busy = false; afterAction(); });
    });
    tool.addEventListener('click', () => {
      if (m.kind !== 'perRow' || st.over || st.busy) return;
      if (st.phase === 'ask') return notYet();
      if (st.phase !== 'act' || st.crate === 0) return;
      st.busy = true;
      sfx.tap();
      dealRound().then(() => { st.busy = false; afterAction(); });
    });
    function pulseTool() {
      tool.classList.remove('g3v-nudge'); void tool.offsetWidth; tool.classList.add('g3v-nudge');
    }

    /** Trồng cả luống i: cây con bay từ khay xuống từng hố. */
    async function plantRow(i) {
      done[i] = true;
      svg.querySelector(`.g3v-row[data-row="${i}"]`)?.classList.add('g3v-done');
      let last = 0;
      const from = crateRect();
      for (let j = 0; j < C; j++) {
        if (m.kind === 'rows') setTimeout(() => setCrate(st.crate - 1), j * 110);
        last = flyOne(flyPlant('seed'), from, slotRect(i, j), {
          delay: j * 110, minMs: 380, maxMs: 620,
          onLand: () => { cells[i][j] = 'seed'; drawSlot(i, j); sfx.pop(Math.min(8, j)); },
        });
      }
      await wait(last + 80);
      if (m.kind === 'rows') { st.planted++; setBadge(i, st.planted); } else { st.total += C; setBadge(i, st.total); }
      showTally();
    }

    /** Tưới luống i: bình tưới bay tới đầu luống rồi đi dọc luống, cây rung lên lần lượt. */
    async function waterRow(i) {
      done[i] = true;
      svg.querySelector(`.g3v-row[data-row="${i}"]`)?.classList.add('g3v-done');
      const a = slotRect(i, 0), b = slotRect(i, C - 1);
      const can = tool.querySelector('.g3v-can');
      const canBox = can?.getBoundingClientRect();
      const s = a ? a.width * 1.15 : 40;
      const start = a && { left: a.left - s * 0.55, top: a.top - s * 0.85, width: s, height: s * 0.75 };
      if (can) can.style.visibility = 'hidden';
      const t = flyOne(`<div style="width:100%;height:100%">${canSvg()}</div>`, canBox && { left: canBox.left, top: canBox.top, width: canBox.width, height: canBox.height }, start, { minMs: 380, maxMs: 600 });
      await wait(t);
      // Đi dọc luống (một khung tạm, chạy bằng transform) — cây rung khi bình đi qua.
      const walk = document.createElement('div');
      walk.className = 'g3-fly g3v-walk';
      Object.assign(walk.style, { left: `${start.left}px`, top: `${start.top}px`, width: `${start.width}px`, height: `${start.height}px` });
      walk.innerHTML = `${canSvg()}<div class="g3v-drops">${dropsSvg()}</div>`;
      document.body.appendChild(walk);
      const dist = b ? b.left - a.left : 0;
      const per = calmMotion() ? 170 : 130;
      walk.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${dist}px)` }], { duration: per * Math.max(1, C - 1), easing: 'linear', fill: 'forwards' });
      for (let j = 0; j < C; j++) {
        setTimeout(() => {
          slotEl(i, j)?.classList.add('g3v-wet');
          st.total++;
          showTally();
          sfx.pop(Math.min(8, j));
        }, per * j + 60);
      }
      await wait(per * Math.max(1, C - 1) + 260);
      walk.remove();
      if (can) can.style.visibility = '';
      setBadge(i, m.kind === 'turn' && st.step === 2 ? C : st.total);
    }

    /** Gom luống i về khay (tìm số bị chia): cây bay ngược lên khay, số trên khay đếm lên. */
    async function collectRow(i) {
      done[i] = true;
      svg.querySelector(`.g3v-row[data-row="${i}"]`)?.classList.add('g3v-done');
      const to = crateRect();
      let last = 0;
      for (let j = 0; j < C; j++) {
        const from = slotRect(i, j);
        setTimeout(() => { cells[i][j] = 'hole'; drawSlot(i, j); }, j * 110);
        last = flyOne(flyPlant('seed'), from, to, {
          delay: j * 110, minMs: 380, maxMs: 620,
          onLand: () => {
            if (st.crate === 0) tool.innerHTML = crateSvg({ label: '0' });
            setCrate(st.crate + 1);
            sfx.pop(Math.min(8, j));
          },
        });
      }
      await wait(last + 80);
      st.total += C;
      setBadge(i, st.total);
      showTally();
    }

    /** Chia đều một lượt: mỗi hàng nhận 1 cây con từ khay. */
    async function dealRound() {
      const j = st.rounds;
      const from = crateRect();
      let last = 0;
      for (let i = 0; i < R; i++) {
        setTimeout(() => setCrate(st.crate - 1), i * 120);
        last = flyOne(flyPlant('seed'), from, slotRect(i, j), {
          delay: i * 120, minMs: 380, maxMs: 620,
          onLand: () => { cells[i][j] = 'seed'; drawSlot(i, j); setBadge(i, j + 1); sfx.pop(Math.min(8, i)); },
        });
      }
      await wait(last + 80);
      st.rounds++;
      showTally();
    }

    function afterAction() {
      const finished = m.kind === 'rows' || m.kind === 'perRow' ? st.crate === 0 : done.every(Boolean);
      if (finished) setTimeout(judge, 350);
    }

    // ── 🔄 Xoay vườn (bước 2 của kiểu turn) ──
    turnBtn.onclick = () => {
      if (st.phase !== 'turn' || st.busy) return;
      st.busy = true;
      turnBtn.classList.remove('g3v-act-on');
      turnBtn.disabled = true;
      sfx.swish();
      svg.classList.add('g3v-turning');
      const grid = svg.querySelector('.g3v-grid');
      const anim = grid?.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }],
        { duration: calmMotion() ? 1400 : 1000, easing: 'cubic-bezier(.45,0,.3,1)', fill: 'forwards' });
      const after = () => {
        setup(c, r, m.crop);
        st.total = 0;
        st.step = 2;
        svg.classList.remove('g3v-turning', 'g3v-ready');
        render();
        tallyEl.innerHTML = '&nbsp;';
        tallyEl.classList.remove('g3v-tally-on');
        st.busy = false;
        askNow();
      };
      if (anim) anim.finished.then(after, after); else after();
    };

    // ── Kết luận ──
    function judge() {
      const v = st.guess, ans = answer();
      const ok = v === ans;
      svg.classList.remove('g3v-ready');
      tool.classList.remove('g3v-tool-tap');
      if (ok && m.kind === 'turn' && st.step === 1) {
        st.phase = 'turn';
        rest();
        speak(`Đúng rồi! Bây giờ ${n.you} bấm Xoay vườn, nhìn từ phía bên kia!`, 'happy', 'Đúng rồi! Bấm 🔄 Xoay vườn!');
        sfx.ding();
        hint('');
        turnBtn.disabled = false;
        turnBtn.classList.add('g3v-act-on');
        return;
      }
      st.over = true;
      st.phase = 'over';
      hint('');
      const q = main.closest('.g3f-scene')?.querySelector('.g3f-bill-q .g3f-q');
      if (q) { q.textContent = `${ans} ${unitOf()}`; q.classList.add('g3v-bill-ans'); }
      if (ok) {
        speak(`Đúng rồi! Giỏi quá ${n.you} ơi!`, 'happy', `Đúng rồi! Giỏi quá ${n.you} ơi! 🎉`);
        api.succeed(`${n.name} rất vui! <b>${formula()}</b>`);
        return;
      }
      const line = `Ơ, ${n.you} gõ ${v} ${unitOf()}, chưa đúng rồi!`;
      speak(line, 'sad', line);
      api.fail(`${cap(n.you)} gõ <b>${v}</b>. ${answerText()}`, tipText());
    }

    const seq = (step, k) => Array.from({ length: k }, (_, i) => step * (i + 1)).join(', ');
    function formula() {
      if (m.kind === 'turn') return `${c} × ${r} = ${N}; ${r} × ${c} = ${N}; ${N} : ${c} = ${r}`;
      if (m.kind === 'rows') return m.frame === 'find' ? `${N} : ? = ${c}; ${N} : ${c} = ${r}` : `${N} : ${c} = ${r}`;
      if (m.kind === 'perRow') return m.frame === 'find' ? `? × ${r} = ${N}; ${N} : ${r} = ${c}` : `${N} : ${r} = ${c}`;
      if (m.kind === 'start') return `? : ${r} = ${c}; ${c} × ${r} = ${N}`;
      return `${c} × ${r} = ${N}`;
    }
    function answerText() {
      if (m.kind === 'turn' && st.step === 1) return `${r} hàng, mỗi hàng ${c} cây: cả vườn có <b>${N} cây</b>.`;
      if (m.kind === 'turn') return `${N} cây xếp thành ${c} hàng: mỗi hàng <b>${r} cây</b>.`;
      if (m.kind === 'rows') return `${N} cây con, mỗi hàng ${c} cây: trồng được <b>${r} hàng</b>.`;
      if (m.kind === 'perRow') return `${N} cây con chia đều ${r} hàng: mỗi hàng <b>${c} cây</b>.`;
      if (m.kind === 'start') return `${r} hàng, mỗi hàng ${c} cây: lúc đầu khay có <b>${N} cây</b>.`;
      return `${r} hàng, mỗi hàng ${c} cây: có <b>${N} cây</b>.`;
    }
    function tipText() {
      if (m.kind === 'turn') return st.step === 1
        ? `Mỗi hàng ${c} cây, có ${r} hàng: ${c} × ${r} = ${N}.`
        : `Xoay vườn, số cây không đổi: ${r} × ${c} = ${c} × ${r} = ${N}. Chia ngược lại: ${N} : ${c} = ${r}.`;
      if (m.kind === 'rows') return m.frame === 'find'
        ? `${N} : ? = ${c}. Muốn tìm số chia, lấy số bị chia chia cho thương: ${N} : ${c} = ${r}.`
        : `Mỗi hàng ${c} cây: ${N} : ${c} = ${r} hàng.`;
      if (m.kind === 'perRow') return m.frame === 'find'
        ? `? × ${r} = ${N}. Muốn tìm thừa số, lấy tích chia cho thừa số kia: ${N} : ${r} = ${c}.`
        : `Chia đều ${N} cây vào ${r} hàng: ${N} : ${r} = ${c}.`;
      if (m.kind === 'start') return `? : ${r} = ${c}. Muốn tìm số bị chia, lấy thương nhân với số chia: ${c} × ${r} = ${N}.`;
      return `Mỗi hàng ${c} cây, có ${r} hàng: ${c} × ${r} = ${N}. Đếm thêm ${c}: ${seq(c, r)}.`;
    }
  },
};

/** CSS của trò 🌱 Vườn (lớp g3v-*). Khung quầy, máy tính, thẻ kết quả dùng chung với Chợ phiên (theme 'garden'). */
function injectGardenStyles() {
  if (document.getElementById('g3v-styles')) return;
  const st = document.createElement('style');
  st.id = 'g3v-styles';
  st.textContent = `
    .g3f-theme-garden { --g3v-side: clamp(170px, 26%, 340px); --g3v-side-h: clamp(150px, 32%, 300px); }
    .g3f-theme-garden .g3f-awning { background: repeating-linear-gradient(90deg, #4ADE80 0 36px, #FFF 36px 72px); border-bottom-color: #15803D; }
    .g3f-theme-garden .g3f-awning::after { display: none; }
    .g3f-theme-garden .g3f-counter { background: linear-gradient(#BAE6FD, #E0F2FE 45%, #BBF7D0 70%, #86EFAC); border-bottom: 10px solid #65A30D; overflow: hidden; padding: 0.5rem; }
    .g3f-theme-garden .g3f-sign { z-index: 3; background: #15803D; border-color: #14532D; color: #fff; text-shadow: 0 1px 0 rgba(20,83,45,0.5); }
    .g3f-theme-garden .g3f-sign strong { color: #FEF08A; }
    .g3f-theme-garden .g3f-main::after { background: rgba(15,23,42,0.06); }
    .g3f-theme-garden .g3f-customer { position: relative; }
    .g3f-theme-garden .g3f-customer > .g3g-result { position: absolute; z-index: 5; left: 0; right: 0; bottom: 0; max-height: 100%; overflow-y: auto; border-width: 3px; border-radius: 1.3rem; text-align: center; align-items: stretch; box-shadow: 0 6px 0 rgba(0,0,0,0.1), 0 16px 36px rgba(0,0,0,0.25); animation: g3lCard .35s cubic-bezier(.2,1.4,.4,1); }
    .g3f-theme-garden .g3f-customer > .g3g-result .g3g-result-text { font-size: clamp(1rem, 1.8vh + 0.55rem, 1.45rem); }
    .g3f-theme-garden .g3f-customer > .g3g-result .g3g-btn { font-size: clamp(1rem, 1.6vh + 0.6rem, 1.3rem); }
    .g3f-theme-garden .g3f-customer > .g3g-result .g3g-tip { font-size: clamp(0.95rem, 1.5vh + 0.5rem, 1.3rem); }
    .g3f-q.g3v-bill-ans { animation: none; background: #16A34A; font-size: 0.9em; padding: 0 0.4em; }
    .g3v-sign-pic { font-size: 1.7em; line-height: 1; }
    .g3v-backdrop { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 55%; z-index: 0; pointer-events: none; }
    .g3v-bench { position: relative; z-index: 1; flex: 1; min-height: 0; width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) var(--g3v-side); gap: 0.6rem; }
    .g3v-plotbox { min-width: 0; min-height: 0; display: flex; }
    .g3v-plot { flex: 1; width: 100%; height: 100%; display: block; user-select: none; -webkit-user-select: none; overflow: visible; }
    .g3v-side { min-height: 0; display: flex; flex-direction: column; gap: 0.5rem; padding-top: clamp(3rem, 9vh, 4.4rem); }
    .g3v-tool { flex: 1 1 0; min-height: 0; display: flex; align-items: flex-end; justify-content: center; border-radius: 1rem; }
    .g3v-tool > svg, .g3v-can { width: 100%; height: 100%; max-height: 240px; filter: drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff); }
    .g3v-can { max-width: 220px; }
    .g3v-crate-num { font: 900 38px 'Baloo 2', Quicksand, sans-serif; fill: #14532D; }
    .g3v-crate-num.g3v-crate-word { font-size: 22px; }
    .g3v-tool-tap { cursor: pointer; animation: g3vBob 1.3s ease-in-out infinite; }
    .g3v-tool-tap:active { transform: translateY(3px); }
    .g3v-nudge { animation: g3vShake .5s ease 2; }
    .g3v-info { flex: none; display: flex; flex-direction: column; gap: 0.4rem; container-type: inline-size; }
    .g3v-tally { background: #fff; border: 3px solid #15803D; border-radius: 0.9rem; padding: 0.25rem 0.6rem; text-align: center; font: 800 min(clamp(1rem, 1.8vh + 0.55rem, 1.45rem), 8.4cqi) 'Baloo 2', Quicksand, sans-serif; color: #14532D; visibility: hidden; white-space: nowrap; }
    .g3v-tally.g3v-tally-on { visibility: visible; }
    .g3v-tally b { color: #EA580C; font-size: 1.15em; }
    .g3v-actbar { position: relative; min-height: 3.1rem; display: flex; align-items: center; justify-content: center; }
    .g3v-hint { background: #FEF9C3; border: 2px solid #CA8A04; border-radius: 0.8rem; padding: 0.25rem 0.6rem; font: 800 clamp(0.85rem, 1.3vh + 0.5rem, 1.15rem) 'Baloo 2', Quicksand, sans-serif; color: #713F12; text-align: center; line-height: 1.25; visibility: hidden; }
    .g3v-hint.g3v-hint-on { visibility: visible; }
    .g3v-act { position: absolute; inset: 0; margin: auto; height: 3rem; width: max-content; border: 4px solid #fff; border-radius: 999px; padding: 0 1.2em; background: linear-gradient(180deg, #4ADE80, #16A34A); color: #fff; font: 800 clamp(1.05rem, 1.8vh + 0.6rem, 1.5rem) 'Baloo 2', Quicksand, sans-serif; text-shadow: 0 2px 0 rgba(21,128,61,.5); box-shadow: 0 5px 0 #15803D, 0 8px 18px rgba(21,128,61,.3); cursor: pointer; touch-action: manipulation; visibility: hidden; }
    .g3v-act.g3v-act-on { visibility: visible; animation: g3vBob 1.2s ease-in-out infinite; }
    .g3v-act:active { transform: translateY(3px); box-shadow: 0 2px 0 #15803D; }
    @keyframes g3vBob { 0%, 100% { transform: none; } 50% { transform: translateY(-5px) scale(1.04); } }
    @keyframes g3vShake { 0%, 100% { transform: none; } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
    @media (prefers-reduced-motion: reduce) { .g3v-act.g3v-act-on, .g3v-tool-tap { animation-duration: 2.4s; } }

    .g3v-board { fill: #C08A4F; stroke: ${INK}; stroke-width: 4; }
    .g3v-furrow { fill: #92582A; stroke: #6B3F1C; stroke-width: 2; transition: fill .2s; }
    .g3v-hit { fill: transparent; }
    .g3v-slot-box { fill: none; }
    .g3v-ready .g3v-row:not(.g3v-done) { cursor: pointer; }
    .g3v-ready .g3v-row:not(.g3v-done) .g3v-furrow { stroke: #FDE047; stroke-width: 3.5; stroke-dasharray: 10 6; animation: g3vDash 1.2s linear infinite; }
    .g3v-ready .g3v-row:not(.g3v-done):hover .g3v-furrow { fill: #A86A35; }
    .g3v-done .g3v-furrow { fill: #7C4A22; }
    @keyframes g3vDash { to { stroke-dashoffset: -32; } }
    .g3v-turning .g3v-badge { visibility: hidden; }
    .g3v-badge circle { fill: #fff; stroke: ${INK}; stroke-width: 3; }
    .g3v-badge text { font: 900 22px 'Baloo 2', Quicksand, sans-serif; fill: #EA580C; }
    .g3v-badge { opacity: .35; }
    .g3v-badge.g3v-badge-on { opacity: 1; }
    .g3v-badge.g3v-pop { transform-box: fill-box; transform-origin: center; animation: g3vPop .4s cubic-bezier(.2,1.6,.4,1); }
    @keyframes g3vPop { from { transform: scale(.4); } to { transform: none; } }
    .g3v-wet > g { transform-box: fill-box; transform-origin: 50% 100%; animation: g3vWet .5s ease; }
    @keyframes g3vWet { 30% { transform: scale(1.12, .9); } 65% { transform: scale(.95, 1.08); } }
    .g3v-walk { z-index: 60; pointer-events: none; }
    .g3v-walk > svg { position: absolute; inset: 0; transform: rotate(18deg); }
    .g3v-drops { position: absolute; left: 82%; top: 60%; width: 70%; height: 70%; animation: g3vDrip .35s linear infinite; }
    @keyframes g3vDrip { from { transform: translateY(-4px); opacity: 1; } to { transform: translateY(6px); opacity: .5; } }

    @media (max-height: 500px) {
      .g3f-theme-garden .g3f-bill-row { font-size: 0.8rem; gap: 0.2rem; }
      .g3v-side { padding-top: 2.6rem; gap: 0.3rem; }
      .g3v-actbar { min-height: 2.4rem; }
      .g3v-act { height: 2.3rem; font-size: 1rem; border-width: 3px; }
      .g3v-tally { padding: 0.1rem 0.4rem; font-size: min(0.95rem, 8.4cqi); }
      .g3f-theme-garden { --g3v-side: clamp(160px, 28%, 240px); }
      .g3f-theme-garden .g3f-customer > .g3g-result { padding: 0.5rem 0.6rem; gap: 0.35rem; }
      .g3f-theme-garden .g3f-customer > .g3g-result .g3g-result-text { font-size: 0.92rem; line-height: 1.3; }
      .g3f-theme-garden .g3f-customer > .g3g-result .g3g-tip { font-size: 0.85rem; padding: 0.3rem 0.5rem; }
    }
    @media (orientation: portrait) {
      .g3f-theme-garden .g3f-sign { display: none; }
      .g3v-bench { grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) var(--g3v-side-h); }
      .g3v-side { flex-direction: row; padding-top: 0; align-items: stretch; }
      .g3v-tool { flex: 0 1 38%; align-items: center; }
      .g3v-info { flex: 1 1 0; justify-content: center; }
    }
    @media (orientation: portrait) and (max-width: 600px) {
      .g3f-theme-garden { --g3v-side-h: clamp(84px, 20%, 140px); }
      .g3v-hint { display: none; } /* bong bóng lời nói đã nhắc cùng câu; nhường chỗ cho mảnh vườn */
      .g3v-actbar { min-height: 2.5rem; }
      .g3v-act { height: 2.4rem; font-size: 1rem; }
      .g3v-tally { font-size: min(1rem, 8.4cqi); padding: 0.15rem 0.4rem; }
      .g3v-side { gap: 0.3rem; }
    }
  `;
  document.head.appendChild(st);
}
