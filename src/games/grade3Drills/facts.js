/**
 * Luyện nhanh từng phép, mỗi lượt 4 phép xếp thành 4 dòng to trên tờ vở:
 *   🔢 Bảng nhân, bảng chia 2–9 (và tìm số còn thiếu: 7 × □ = 42).
 *   🧠 Tính nhẩm số tròn chục, tròn trăm, tròn nghìn, tròn chục nghìn theo cách ở lớp: 3 nghìn + 5 nghìn = 8 nghìn.
 * Gõ sai: ô hiện số đúng, thầy nhắc cách nhớ (mẹo bảng nhân, đổi ra "nghìn") rồi sang phép sau.
 * Phép hay sai được ghi lại (kit.js noteFact) và ra lại nhiều hơn ở các lượt sau.
 */

import { mountDrill, setActive, shake, fmt, weightedPick, loadWeak, noteFact, sfx, sleep, how, TEACHER } from './kit.js';

const PER = 4; // số phép mỗi lượt

// ── Bảng nhân, bảng chia ──────────────────────────────────────────────────────────────────────────────
function tableFact(t, b, kind) {
  const p = t * b;
  const tip = {
    mul: `${t} × ${b} = ${p}.${b > 2 ? ` Mẹo: ${t} × ${b - 1} = ${t * (b - 1)}, thêm ${t} nữa là ${p}.` : ''}`,
    div: `${p} : ${t} = ${b}, vì ${t} × ${b} = ${p}.`,
  };
  switch (kind) {
    case 'mul': return { id: `${t}x${b}`, parts: [t, '×', b, '=', null], ans: p, say: `${t} nhân ${b} bằng ${p}.`, tip: tip.mul };
    case 'div': return { id: `${p}:${t}`, parts: [p, ':', t, '=', null], ans: b, say: `${p} chia ${t} bằng ${b}.`, tip: tip.div };
    case 'mulA': return { id: `${t}x?${b}`, parts: [t, '×', null, '=', p], ans: b, say: `${t} nhân ${b} bằng ${p}, số cần điền là ${b}.`, tip: `${t} × ${b} = ${p}. Muốn tìm thừa số, lấy tích chia cho thừa số kia: ${p} : ${t} = ${b}.` };
    case 'divA': return { id: `${p}:?${b}`, parts: [p, ':', null, '=', b], ans: t, say: `${p} chia ${t} bằng ${b}, số cần điền là ${t}.`, tip: `${p} : ${t} = ${b}. Muốn tìm số chia, lấy số bị chia chia cho thương: ${p} : ${b} = ${t}.` };
    default: return { id: `?:${t}=${b}`, parts: [null, ':', t, '=', b], ans: p, say: `${p} chia ${t} bằng ${b}, số cần điền là ${p}.`, tip: `Muốn tìm số bị chia, lấy thương nhân với số chia: ${b} × ${t} = ${p}.` };
  }
}

function makeTables(tables, kinds) {
  return (rng, history) => {
    const used = new Set(history.flatMap(h => h?.facts?.map(f => f.id) || []));
    const weak = loadWeak();
    const pool = [];
    for (const t of tables) for (let b = 2; b <= 10; b++) for (const kd of kinds) pool.push(tableFact(t, b, kd));
    const facts = [];
    for (let i = 0; i < PER; i++) {
      const free = pool.filter(f => !used.has(f.id) && !facts.some(x => x.id === f.id));
      const f = weightedPick(rng, free.length ? free : pool, (x) => 1 + 3 * (weak[x.id] || 0));
      facts.push(f);
    }
    return { facts };
  };
}

export const TABLE_LEVELS = [
  { id: 'drill-tab-1', n: 1, title: 'Bảng nhân 2, 3, 4, 5', desc: 'Vd. 4 × 7 = ?', knowledge: 'bảng nhân 2, 3, 4, 5', lessons: { workbook: ['bai-4', 'bai-5', 'bai-6'] }, gen: makeTables([2, 3, 4, 5], ['mul']) },
  { id: 'drill-tab-2', n: 2, title: 'Bảng chia 2, 3, 4, 5', desc: 'Vd. 28 : 4 = ?', knowledge: 'bảng chia 2, 3, 4, 5', lessons: { workbook: ['bai-4', 'bai-5', 'bai-6'] }, gen: makeTables([2, 3, 4, 5], ['div']) },
  { id: 'drill-tab-3', n: 3, title: 'Bảng nhân 6, 7, 8, 9', desc: 'Vd. 7 × 8 = ?', knowledge: 'bảng nhân 6, 7, 8, 9', lessons: { workbook: ['bai-9', 'bai-10', 'bai-11', 'bai-12'] }, gen: makeTables([6, 7, 8, 9], ['mul']) },
  { id: 'drill-tab-4', n: 4, title: 'Bảng chia 6, 7, 8, 9', desc: 'Vd. 56 : 7 = ?', knowledge: 'bảng chia 6, 7, 8, 9', lessons: { workbook: ['bai-9', 'bai-10', 'bai-11', 'bai-12'] }, gen: makeTables([6, 7, 8, 9], ['div']) },
  { id: 'drill-tab-5', n: 5, title: 'Trộn nhân chia, số còn thiếu', desc: 'Vd. 6 × ? = 42, ? : 7 = 8.', knowledge: 'bảng nhân, bảng chia 2 đến 9', lessons: { workbook: ['bai-13'] }, gen: makeTables([2, 3, 4, 5, 6, 7, 8, 9], ['mul', 'div', 'mulA', 'divA', 'divB']) },
].map(l => ({ ...l, missions: 5, ask: () => 'Mỗi lượt 4 phép tính. Tính thật nhanh mà vẫn đúng!' }));

// ── Tính nhẩm số tròn ─────────────────────────────────────────────────────────────────────────────────
const UNIT = { 10: 'chục', 100: 'trăm', 1000: 'nghìn', 10000: 'chục nghìn' };
const OPW = { '+': 'cộng', '−': 'trừ', '×': 'nhân', ':': 'chia' };

function mentalFact(rng, U, op) {
  const u = UNIT[U];
  let a, b, x, y, r, ra;
  if (op === '+') { a = rng.int(1, 8); b = rng.int(1, 9 - a); x = a * U; y = b * U; r = x + y; ra = a + b; }
  else if (op === '−') { a = rng.int(3, 9); b = rng.int(1, a - 1); x = a * U; y = b * U; r = x - y; ra = a - b; }
  else if (op === '×') { b = rng.int(2, 5); a = rng.int(1, Math.floor(9 / b)); x = a * U; y = b; r = x * y; ra = a * b; }
  else { y = rng.int(2, 5); ra = rng.int(1, Math.floor(9 / y)); a = ra * y; x = a * U; r = x / y; }
  const right = op === '×' || op === ':' ? `${y}` : `${b} ${u}`;
  const tip = `${a} ${u} ${op} ${right} = ${ra} ${u}, vậy ${fmt(x)} ${op} ${fmt(y)} = ${fmt(r)}.`;
  return { id: `m:${x}${op}${y}`, parts: [x, op, y, '=', null], ans: r, say: `${x} ${OPW[op]} ${y} bằng ${r}.`, tip };
}

function makeMental(units, ops) {
  return (rng, history) => {
    const used = new Set(history.flatMap(h => h?.facts?.map(f => f.id) || []));
    const weak = loadWeak();
    const facts = [];
    for (let i = 0; i < PER; i++) {
      // Mỗi lượt đủ các phép (cộng, trừ, nhân, chia lần lượt); phép hay sai có cơ hội ra lại.
      const op = ops[(history.length * PER + i) % ops.length];
      let f;
      for (let k = 0; k < 40; k++) {
        f = mentalFact(rng, rng.pick(units), op);
        if (!used.has(f.id) && !facts.some(x => x.id === f.id) && (k > 20 || rng() < 0.4 + 0.15 * (weak[f.id] || 0) || !weak[f.id])) break;
      }
      facts.push(f);
    }
    return { facts };
  };
}

export const MENTAL_LEVELS = [
  { id: 'drill-men-1', n: 1, title: 'Cộng, trừ số tròn trăm', desc: 'Vd. 400 + 300, 900 − 600.', knowledge: 'cộng, trừ trong phạm vi 10', lessons: { workbook: ['bai-2'] }, gen: makeMental([10, 100], ['+', '−']) },
  { id: 'drill-men-2', n: 2, title: 'Nhân, chia số tròn chục, tròn trăm', desc: 'Vd. 20 × 3, 300 × 2, 80 : 4.', knowledge: 'bảng nhân, bảng chia', lessons: { workbook: ['bai-23', 'bai-36', 'bai-37'] }, gen: makeMental([10, 100], ['×', ':']) },
  { id: 'drill-men-3', n: 3, title: 'Số tròn nghìn', desc: 'Vd. 3 000 + 5 000, 2 000 × 4, 8 000 : 2.', knowledge: 'bảng nhân, bảng chia, số có bốn chữ số', lessons: { workbook: ['bai-54', 'bai-55', 'bai-56', 'bai-57'] }, gen: makeMental([1000], ['+', '−', '×', ':']) },
  { id: 'drill-men-4', n: 4, title: 'Số tròn chục nghìn', desc: 'Vd. 30 000 + 50 000, 20 000 × 3.', knowledge: 'số có năm chữ số', lessons: { workbook: ['bai-63', 'bai-64', 'bai-70', 'bai-71'] }, gen: makeMental([10000], ['+', '−', '×', ':']) },
].map(l => ({ ...l, missions: 5, ask: () => 'Nhẩm theo chục, trăm, nghìn: 3 nghìn cộng 5 nghìn bằng 8 nghìn!' }));

// ── Phần chơi chung: 4 dòng phép tính ─────────────────────────────────────────────────────────────────
function mountFacts(stage, m, level, api) {
  const longest = Math.max(...m.facts.map(f => f.parts.map(p => (p == null ? fmt(f.ans) : fmt(p))).join(' ').length + 3));
  const boxw = (f) => `${Math.max(2, String(fmt(f.ans)).length + 1) * 0.6 + 0.4}em`;
  const rows = m.facts.map((f, i) => `
    <div class="g3d-row" data-i="${i}">
      ${f.parts.map(p => (p == null ? `<span class="g3d-box" style="--boxw:${boxw(f)}" data-box></span>` : `<span>${typeof p === 'number' ? fmt(p) : p}</span>`)).join('')}
      <span class="g3d-mark" data-mark></span>
      <span class="g3d-row-hint" data-hint style="visibility:hidden">&nbsp;</span>
    </div>`).join('');
  // Chữ to nhất mà dòng dài nhất vẫn vừa bề ngang tờ vở.
  const board = `<div class="g3d-rows" style="--rowfs:min(14cqh, ${Math.floor(1000 / (longest * 0.62)) / 10}cqi)">${rows}</div>`;
  const { paper, show, hint, pad, done } = mountDrill(stage, { api, board, cls: 'g3d-facts' });
  const rowEls = [...paper.querySelectorAll('.g3d-row')];
  let mistakes = 0;
  let tip = '';
  let i = -1;

  function next() {
    i++;
    if (i >= m.facts.length) return finish();
    const f = m.facts[i];
    const row = rowEls[i];
    const box = row.querySelector('[data-box]');
    rowEls.forEach((r, j) => r.classList.toggle('g3d-row-now', j === i));
    setActive(paper, box);
    show(f.parts[0] == null || f.parts[2] == null ? 'Điền <b>số còn thiếu</b>.' : 'Tính rồi gõ <b>kết quả</b>.');
    pad.want({
      max: String(f.ans).length + 1,
      onType: (t) => { box.textContent = t ? fmt(t) : ''; },
      onSubmit: (t) => {
        const ok = Number(t) === f.ans;
        noteFact(f.id, ok);
        box.textContent = fmt(f.ans);
        setActive(paper, null);
        if (ok) {
          box.classList.add('g3d-box-ok');
          row.querySelector('[data-mark]').textContent = '✅';
          sfx.pop(i);
          setTimeout(next, 250);
        } else {
          mistakes++;
          tip ||= f.tip;
          box.classList.add('g3d-box-fix');
          row.querySelector('[data-mark]').textContent = '❌';
          const h = row.querySelector('[data-hint]');
          h.innerHTML = `em gõ ${fmt(t)}`;
          h.style.visibility = '';
          shake(box);
          hint(f.say, f.tip);
          pad.off();
          setTimeout(next, 1600);
        }
      },
    });
  }

  async function finish() {
    rowEls.forEach(r => r.classList.remove('g3d-row-now'));
    await sleep(300);
    done(mistakes, { ok: `Đúng cả ${m.facts.length} phép!`, tip });
  }

  if (import.meta.env.DEV) window.__g3drill = { m, step: () => pad.type(String(m.facts[i]?.ans ?? '')), wrong: () => pad.type(String((m.facts[i]?.ans ?? 0) + 1)) };
  injectFactStyles();
  next();
}

const gameOf = (meta, levels) => ({
  ...meta, unitWord: 'lượt', starPrefix: 'drill', npcs: [TEACHER], levels,
  stallIcon: () => meta.icon,
  summaryText: (ok, total) => `Em làm đúng cả 4 phép ở <strong>${ok}/${total}</strong> lượt.`,
  againText: 'Làm lượt mới',
  makeMission(rng, level, history) { return level.gen(rng, history); },
  mountMission: mountFacts,
});

export const TABLES_GAME = gameOf({
  id: 'drill-tab', icon: '🔢', title: 'Bảng nhân, bảng chia',
  purpose: 'Giúp em thuộc bảng nhân, bảng chia 2 đến 9. Phép nào em hay sai sẽ được ra lại nhiều hơn cho tới khi em thuộc.',
  howTo: how(['👀', 'Đọc phép tính'], ['⌨️', 'Gõ kết quả'], ['✅', 'Đúng cả 4 phép']),
}, TABLE_LEVELS);

export const MENTAL_GAME = gameOf({
  id: 'drill-men', icon: '🧠', title: 'Tính nhẩm số tròn',
  purpose: 'Giúp em tính nhẩm với số tròn chục, tròn trăm, tròn nghìn như cách học ở lớp: đổi ra chục, trăm, nghìn rồi tính với số nhỏ.',
  howTo: how(['🔟', 'Đổi ra chục, trăm, nghìn'], ['🧠', 'Nhẩm số nhỏ'], ['⌨️', 'Gõ kết quả']),
}, MENTAL_LEVELS);

let factStyles = false;
function injectFactStyles() {
  if (factStyles) return;
  factStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3d-row-now { background: linear-gradient(90deg, #FEF9C3, #FFFBEB 70%, transparent); border-radius: 0.3em; }
  `;
  document.head.appendChild(st);
}
