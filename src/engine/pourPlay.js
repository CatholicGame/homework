/**
 * 🫗 Thử rót — bé tự rót nước từ đồ đựng này sang đồ đựng kia để kiểm chứng
 * ("Bình D đựng nhiều hơn 1 l nước": rót D vào bình C 1 l trống, C đầy mà D còn nước;
 *  "can 12 l rót đầy ca 4 l còn mấy lít": rót rồi đọc vạch trên can).
 *
 * Chỉ là đồ dùng dạy học: không ghi vào ô trả lời, không chấm điểm.
 *
 *   q.pourPlay = [thí nghiệm, …]   thí nghiệm i gắn nút "🫗 Thử rót" ở ô trả lời i (null: bỏ qua)
 *   q.pourAfter = true   // câu tính toán: nút chỉ hiện khi bé đã làm đúng (bước kiểm chứng, câu cuối
 *                        // "Đúng như bé đã tính!"); không có: câu quan sát, thử được ngay, câu nói chỉ kể điều thấy
 *   thí nghiệm = {
 *     vessels: [đồ đựng, …],
 *     title, tab,   // câu hỏi trên đầu và tên thẻ (mặc định lấy từ nhãn ô trả lời)
 *     row,          // ô trả lời có nút (số hoặc mảng); mặc định = vị trí trong q.pourPlay.
 *                   // Câu không có ô điền (bảng, nối, chọn) hoặc không tìm thấy ô: một nút dưới hình.
 *     liquid,       // 'water' (mặc định) | 'honey' (mật ong) | 'fishsauce' (nước mắm)
 *     count,        // true: khi rót hết một bình, đếm số đồ đựng được rót đầy ("đầy 8 cốc")
 *     until,        // khi nào là xong (chỉ khi xong mới nói "Đúng như bé đã tính!"):
 *                   //   không có: sau mỗi lần rót; 'empty': mọi đồ đựng lúc đầu có nước đã hết
 *                   //   hoặc mọi đồ đựng lúc đầu trống đã đầy; { name, v }: đồ đựng tên name có v lít
 *     end,          // câu cuối thay cho "Đúng như bé đã tính!"
 *   }
 *   đồ đựng = {
 *     shape: 'cup' | 'jug' | 'beaker' | 'can' | 'bucket',  // cốc, ca có vạch, bình thẳng, can nhựa, xô
 *     cap, v,     // sức chứa và lượng lúc đầu (lít); hình vẽ to theo đúng số lít
 *     label,      // chữ dưới hình ("A", "can 12 l"); '' nếu không có
 *     name,       // tên trong câu nói ("bình D", "cốc")
 *     tag,        // nhãn số lít trên thân; ca: vạch ghi tag lít
 *     marks,      // true: vạch chia lít để bé đọc số lít (bước vạch tự giãn theo sức chứa)
 *     aspect,     // rộng / cao phần đựng nước
 *     row,        // hàng trong cảnh (0 trên, 1 dưới) — bình trên, hàng cốc dưới
 *     color,      // màu thân (xô đỏ, xô xanh)
 *     fixed,      // thùng to đứng yên: bé múc bằng ca (ca nhúng vào thùng), thùng không bị nhấc
 *     scoop,      // ca múc: câu nói đếm số lần đổ ("Đã đổ 3 ca vào xô")
 *     twin,       // nhãn đồ đựng mà cái này giống hệt (để so mực nước); dưới hình ghi "giống hệt D"
 *   }
 *
 * Rót: chạm đồ đựng có nước rồi chạm đồ đựng muốn rót vào, hoặc kéo thả. Rót tới khi đồ đựng
 * nhận đầy hoặc đồ đựng rót hết thì dừng, như người lớn rót cẩn thận.
 */

import { sfx } from '../games/preschool/fx.js';

const INK = '#3F3A40';
const GLASS = '#EEF7FC';
const LIQUIDS = {
  water: { fill: '#BFE6F7', line: '#7CC6E8', noun: 'nước' },
  honey: { fill: '#F9D57A', line: '#E0A526', noun: 'mật' },
  fishsauce: { fill: '#EDB27A', line: '#C47A3A', noun: 'nước mắm' },
};
const SW = 3.5;
const UNIT = 9000;       // px² nước cho 1 lít — mọi đồ đựng trong cảnh cùng tỉ lệ
const HEAD = 150;        // chỗ trống phía trên để nhấc đồ đựng đi rót
const MAX_H = 250;       // phần đựng nước cao nhất trong cảnh (đơn vị hình)
const LABEL_H = 64;      // chỗ ghi chữ A, B… dưới đáy
const EPS = 0.005;
const L = '<i style="font-family:Georgia,serif">l</i>';
const L_SVG = '<tspan font-family="Georgia, Times New Roman, serif" font-style="italic" font-weight="400">l</tspan>';
const f1 = n => (Math.round(n * 10) / 10).toString();
let seq = 0;

const rowsOf = (exp, i) => [].concat(exp.row ?? i);

export function attachPourPlay(root, q, solved = false) {
  const exps = q.pourPlay;
  if (!Array.isArray(exps)) return;
  injectStyles();
  const locked = q.pourAfter && !solved;
  const lockCls = locked ? ' pour-locked' : '';
  const rows = root.querySelectorAll('#e3-blanks > .e3-blank-row');
  const done = new Set();
  let imgFirst = -1;
  exps.forEach((exp, i) => {
    if (!exp) return;
    const found = rowsOf(exp, i).map(r => [r, rows[r]]).filter(([, el]) => el);
    if (!found.length) { if (imgFirst < 0) imgFirst = i; return; }
    found.forEach(([r, row]) => {
      if (done.has(r)) return;   // nhiều thí nghiệm cùng một ô: một nút, mở thí nghiệm đầu
      done.add(r);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `pour-chip${lockCls}`;
      btn.innerHTML = '🫗 Thử rót';
      btn.title = 'Rót nước để kiểm chứng câu này';
      const label = row.querySelector('.e3-blank-label');
      const input = label?.querySelector('input');
      // Câu Đ/S: nút ngay sau câu, trước dòng điền. Câu tính toán: cuối dòng, sau đáp án bé đã ghi.
      if (q.pourAfter || !input) (label || row).appendChild(btn); else input.before(btn);
      btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); openOverlay(q, i); });
    });
  });
  // Câu bảng / nối / chọn: một nút dưới hình (sau nút "📷 Ảnh gốc" nếu có).
  if (imgFirst >= 0) {
    const img = root.querySelector('.e3-question-card > .e3-q-img');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pour-open${lockCls}`;
    btn.innerHTML = '🫗 Thử rót';
    btn.onclick = () => openOverlay(q, imgFirst);
    if (img) (img.nextElementSibling?.classList.contains('e3-orig-toggle') ? img.nextElementSibling : img).after(btn);
    else root.querySelector('.e3-question-card')?.appendChild(btn);
  }
}

/**
 * Câu tính toán vừa được làm đúng: hiện các nút "🫗 Thử rót" và mời bé kiểm chứng ngay dưới lời khen.
 * banner: dòng "✅ Đúng rồi!" của engine.
 */
export function revealPourPlay(root, q, banner) {
  if (!q?.pourAfter || !Array.isArray(q.pourPlay)) return;
  const chips = root.querySelectorAll('.pour-locked');
  chips.forEach(c => c.classList.remove('pour-locked'));
  if (!chips.length || !banner) return;
  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'pour-cta';
  cta.innerHTML = '🫗 Rót thử để kiểm chứng';
  cta.onclick = () => openOverlay(q, q.pourPlay.findIndex(Boolean));
  banner.after(cta);
}

// Câu hỏi ghi trên đầu thí nghiệm: nhãn của ô, bỏ phần "..." (chỗ bé điền).
const claimOf = (q, r) => String(q.blanks?.[r]?.label || '').replace(/<br\s*\/?>/g, ' ').replace(/\s*\.\.\.\s*/g, ' ').trim();
const tagOf = claim => (claim.match(/^([a-zđ]\))/i) || [])[1] || '';

function openOverlay(q, start) {
  const idxs = q.pourPlay.map((e, i) => (e ? i : -1)).filter(i => i >= 0);
  const claim = i => claimOf(q, rowsOf(q.pourPlay[i], i)[0]);
  const overlay = document.createElement('div');
  overlay.className = 'pour-overlay';
  overlay.innerHTML = `
    <div class="pour-panel" role="dialog" aria-label="Thử rót">
      <div class="pour-head">
        <div class="pour-tabs">${idxs.length > 1 ? idxs.map(i => `<button type="button" class="pour-tab" data-i="${i}">${q.pourPlay[i].tab || tagOf(claim(i)) || i + 1}</button>`).join('') : ''}</div>
        <button type="button" class="pour-btn pour-reset">↺ Làm lại</button>
        <button type="button" class="pour-btn pour-close" aria-label="Đóng">✕</button>
      </div>
      <div class="pour-claim"></div>
      <div class="pour-guide">👆 Chạm đồ đựng có nước, rồi chạm đồ đựng muốn rót vào. Kéo thả cũng được.</div>
      <div class="pour-figure"></div>
      <div class="pour-say" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(overlay);
  let lab = null, cur = start;
  const close = () => { lab?.stop(); overlay.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('.pour-close').onclick = close;

  const show = i => {
    lab?.stop();
    cur = i;
    overlay.querySelectorAll('.pour-tab').forEach(t => t.classList.toggle('on', +t.dataset.i === i));
    const exp = q.pourPlay[i], c = claim(i);
    overlay.querySelector('.pour-claim').innerHTML = exp.title || `${c.replace(/\.$/, '')}?`;
    overlay.querySelector('.pour-guide').innerHTML = exp.vessels.some(d => d.fixed)
      ? '👆 Chạm ca rồi chạm thùng để múc nước, chạm ca rồi chạm chỗ muốn đổ vào. Kéo thả cũng được.'
      : '👆 Chạm đồ đựng có nước, rồi chạm đồ đựng muốn rót vào. Kéo thả cũng được.';
    lab = mountLab(overlay.querySelector('.pour-figure'), exp, overlay.querySelector('.pour-say'), tagOf(c), !!q.pourAfter);
  };
  overlay.querySelectorAll('.pour-tab').forEach(t => { t.onclick = () => show(+t.dataset.i); });
  overlay.querySelector('.pour-reset').onclick = () => show(cur);
  show(start);
}

// ─────────────────────────────────────────────── hình đồ đựng
/** Bước vạch và bước ghi số cho sức chứa cap: ≤ 25 vạch, ≤ 12 số. */
function markSteps(cap) {
  const tick = [1, 5, 10, 50, 100].find(t => cap / t <= 25) || 100;
  const label = [1, 2, 5, 10, 20, 50, 100].find(t => t >= tick && cap / t <= 12) || 100;
  return { tick, label };
}

/**
 * Đồ đựng vẽ quanh gốc (0, 0) = giữa đáy. Trả về { back, front, clipId, w, top, cap, levelY(v), spout(dir) }.
 * Phần đựng nước là hình chữ nhật w × hIn (w × hIn = cap × unit) nên mực nước lên đều theo số lít.
 */
const ASPECT = { cup: 1.25, jug: 0.96, beaker: 0.6, can: 0.68, bucket: 1 };

function makeVessel(d, unit = UNIT, liq = LIQUIDS.water) {
  const shape = d.shape || 'beaker';
  const aspect = d.aspect || ASPECT[shape];
  const hIn = Math.sqrt(d.cap * unit / aspect), w = hIn * aspect;
  const innerBot = -SW / 2, fullY = innerBot - hIn;
  // vạch trên cùng có số: chừa chỗ để vành miệng không che chữ
  const rimGap = Math.max({ jug: 10, can: 26, bucket: 10 }[shape] || 8, d.marks ? 20 : 0);
  const top = fullY - rimGap, r = Math.min(14, w * 0.16);
  const clipId = `pour-clip-${++seq}`;
  const body = `M${f1(-w / 2)},${f1(top)} V${f1(-r)} Q${f1(-w / 2)},0 ${f1(-w / 2 + r)},0 H${f1(w / 2 - r)} Q${f1(w / 2)},0 ${f1(w / 2)},${f1(-r)} V${f1(top)} Z`;
  const levelY = v => innerBot - (v / d.cap) * hIn;
  const tagFs = Math.max(14, Math.min(30, w * 0.3));
  let back = `<clipPath id="${clipId}"><path d="${body}"/></clipPath>`;
  const shine = d.marks ? w / 2 - Math.min(12, w * 0.15) : -w / 2 + Math.min(12, w * 0.15); // vệt sáng tránh bên có vạch
  let front = `<line x1="${f1(shine)}" y1="${f1(top + Math.min(10, hIn * 0.1))}" x2="${f1(shine)}" y2="${f1(-Math.min(12, hIn * 0.12))}" stroke="#fff" stroke-width="${f1(Math.min(5.6, w * 0.07))}" stroke-linecap="round" opacity=".85"/>`
    + `<path d="${body}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  let bodyFill = d.color || GLASS, rim = true;
  if (d.marks) {
    // vạch bên trái, ghi số mỗi `label` lít (và vạch trên cùng)
    const { tick, label } = markSteps(d.cap);
    const fs = Math.max(14, Math.min(22, hIn / d.cap * label * 0.9));
    for (let i = tick; i <= d.cap + EPS; i += tick) {
      const y = levelY(i), big = i % label === 0 || Math.abs(i - d.cap) < EPS;
      front += `<line x1="${f1(-w / 2)}" y1="${f1(y)}" x2="${f1(-w / 2 + (big ? w * 0.2 : w * 0.11))}" y2="${f1(y)}" stroke="${INK}" stroke-width="${big ? 2.6 : 1.8}" stroke-linecap="round"/>`;
      if (big) front += `<text x="${f1(-w / 2 + w * 0.24)}" y="${f1(y + fs * 0.36)}" font-size="${f1(fs)}" font-weight="700" fill="${INK}" font-family="Quicksand, sans-serif" stroke="#fff" stroke-width="3.5" paint-order="stroke">${i} ${L_SVG}</text>`;
    }
  }
  if (shape === 'can') {
    // can nhựa trong: quai xách trên nắp (trái), cổ rót có nắp xanh (phải)
    bodyFill = d.color || '#E6F3FC'; rim = false;
    const hx0 = -w * 0.4, hx1 = w * 0.02, hy = top - Math.min(22, hIn * 0.12);
    const grip = `M${f1(hx0)},${f1(top + 2)} V${f1(hy)} H${f1(hx1)} V${f1(top + 2)}`;
    back += `<path d="${grip}" fill="none" stroke="${INK}" stroke-width="${f1(Math.min(12, w * 0.12))}" stroke-linejoin="round"/>`
      + `<path d="${grip}" fill="none" stroke="#7CC4EE" stroke-width="${f1(Math.min(5, w * 0.05))}" stroke-linejoin="round"/>`
      + `<rect x="${f1(w * 0.18)}" y="${f1(top - Math.min(16, hIn * 0.09))}" width="${f1(w * 0.24)}" height="${f1(Math.min(20, hIn * 0.11))}" rx="4" fill="#5AAEE3" stroke="${INK}" stroke-width="3"/>`;
    front += `<line x1="${f1(-w / 2 + 2)}" y1="${f1(top + Math.min(12, hIn * 0.07))}" x2="${f1(w / 2 - 2)}" y2="${f1(top + Math.min(12, hIn * 0.07))}" stroke="#7CC4EE" stroke-width="5"/>`;
  } else if (shape === 'bucket') {
    bodyFill = d.color || '#FFE7A3';
    const arc = `M${f1(-w / 2 + 6)},${f1(top + 4)} Q0,${f1(top - w * 0.7)} ${f1(w / 2 - 6)},${f1(top + 4)}`;
    back += `<path d="${arc}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  }
  if (shape === 'jug') {
    // quai bên phải, mỏ rót bên trái như sách; vạch "tag l" trên thân
    const hy0 = top + hIn * 0.14, hy1 = top + hIn * 0.72, hx = w / 2;
    const handle = `M${f1(hx - 2)},${f1(hy0)} C${f1(hx + w * 0.34)},${f1(hy0 - 4)} ${f1(hx + w * 0.34)},${f1(hy1 + 4)} ${f1(hx)},${f1(hy1)}`;
    back += `<path d="${handle}" fill="none" stroke="${INK}" stroke-width="${f1(Math.min(11.5, w * 0.12))}" stroke-linecap="round"/><path d="${handle}" fill="none" stroke="${GLASS}" stroke-width="${f1(Math.min(4.5, w * 0.05))}" stroke-linecap="round"/>`
      + `<path d="M${f1(-w / 2 + 2)},${f1(top + 12)} L${f1(-w / 2 - 16)},${f1(top - 6)} L${f1(-w / 2 + 14)},${f1(top)} Z" fill="${GLASS}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`;
    if (d.tag) {
      const y = levelY(d.tag);
      front += `<line x1="${f1(w / 2 - 22)}" y1="${f1(y)}" x2="${f1(w / 2)}" y2="${f1(y)}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`
        + [0.25, 0.5, 0.75].map(t => `<line x1="${f1(w / 2 - 12)}" y1="${f1(levelY(d.tag * t))}" x2="${f1(w / 2)}" y2="${f1(levelY(d.tag * t))}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`).join('')
        + `<text x="${f1(w * 0.06)}" y="${f1(levelY(d.tag * 0.5) + tagFs * 0.36)}" font-size="${f1(tagFs)}" font-weight="600" fill="${INK}" text-anchor="middle" font-family="Quicksand, sans-serif">${d.tag} ${L_SVG}</text>`;
    }
  } else if (d.tag && !d.marks) {
    front += `<text x="${f1(w * 0.08)}" y="${f1(levelY(d.cap * 0.5) + tagFs * 0.36)}" font-size="${f1(tagFs)}" font-weight="600" fill="${INK}" text-anchor="middle" font-family="Quicksand, sans-serif" stroke="#fff" stroke-width="3" paint-order="stroke">${d.tag} ${L_SVG}</text>`;
  }
  // vành miệng
  if (rim) front += `<rect x="${f1(-w / 2 - 4.8)}" y="${f1(top - 4)}" width="${f1(w + 9.6)}" height="9" rx="4.5" fill="${shape === 'bucket' ? '#F5C542' : '#fff'}" stroke="${INK}" stroke-width="${SW}"/>`;
  back += `<path d="${body}" fill="${bodyFill}"/>`;
  return {
    back, front, clipId, w, top, cap: d.cap, levelY, hIn, liq,
    // mỏ rót: góc miệng phía đồ đựng nhận (dir = 1 phải, -1 trái)
    spout: dir => (shape === 'can'
      ? { x: dir > 0 ? w * 0.42 : -w / 2 - 2, y: dir > 0 ? top - Math.min(16, hIn * 0.09) : top }
      : { x: dir * (w / 2 + (shape === 'jug' && dir < 0 ? 16 : 4)), y: top - (shape === 'jug' && dir < 0 ? 6 : 2) }),
  };
}

/**
 * Nước trong đồ đựng (cắt theo thân); a = góc nghiêng (độ). Mặt nước luôn nằm ngang và giữ đúng lượng nước:
 * tìm độ sâu k sao cho phần thân (toạ độ riêng) có "độ sâu thế giới" ≥ k có diện tích = v lít × diện tích 1 lít.
 */
function waterSvg(vs, v, a = 0) {
  if (v <= EPS) return '';
  const k = surfaceDepth(vs, Math.min(v, vs.cap), a);
  const r = a * Math.PI / 180, dx = Math.sin(r), dy = Math.cos(r);
  const px = k * dx, py = k * dy; // một điểm trên mặt nước
  const x0 = px - vs.w * 4, wd = vs.w * 8;
  return `<g clip-path="url(#${vs.clipId})"><g transform="rotate(${f1(-a)} ${f1(px)} ${f1(py)})">`
    + `<rect x="${f1(x0)}" y="${f1(py)}" width="${f1(wd)}" height="${f1(vs.hIn * 4)}" fill="${vs.liq.fill}"/>`
    + `<rect x="${f1(x0)}" y="${f1(py)}" width="${f1(wd)}" height="5" fill="${vs.liq.line}" opacity=".45"/>`
    + `<line x1="${f1(x0)}" y1="${f1(py)}" x2="${f1(x0 + wd)}" y2="${f1(py)}" stroke="${vs.liq.line}" stroke-width="2.8"/></g></g>`;
}

/** Độ sâu k của mặt nước: phía "dưới" (thế giới) trong toạ độ riêng là hướng (sin a, cos a). */
function surfaceDepth(vs, v, a) {
  const r = a * Math.PI / 180, dx = Math.sin(r), dy = Math.cos(r);
  const y0 = vs.levelY(vs.cap) - 6, y1 = vs.levelY(0), hw = vs.w / 2;
  const box = [[-hw, y0], [hw, y0], [hw, y1], [-hw, y1]];
  const target = (v / vs.cap) * vs.w * (y1 - vs.levelY(vs.cap));
  const depth = p => p[0] * dx + p[1] * dy;
  const ds = box.map(depth);
  let lo = Math.min(...ds), hi = Math.max(...ds);
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (areaBelow(box, depth, mid) > target) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Diện tích phần đa giác có depth ≥ k (cắt Sutherland–Hodgman một nửa mặt phẳng). */
function areaBelow(poly, depth, k) {
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length];
    const dp = depth(p) - k, dq = depth(q) - k;
    if (dp >= 0) out.push(p);
    if ((dp >= 0) !== (dq >= 0)) { const t = dp / (dp - dq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); }
  }
  let s = 0;
  for (let i = 0; i < out.length; i++) { const p = out[i], q = out[(i + 1) % out.length]; s += p[0] * q[1] - q[0] * p[1]; }
  return Math.abs(s) / 2;
}

// ─────────────────────────────────────────────── thí nghiệm
function mountLab(fig, exp, say, tag, after) {
  const defs = exp.vessels;
  const liq = LIQUIDS[exp.liquid] || LIQUIDS.water;
  // Can 20 l vẽ theo UNIT thì quá to so với chữ: thu cả cảnh (vẫn đúng tỉ lệ giữa các đồ đựng).
  const hMax = Math.max(...defs.map(d => Math.sqrt(d.cap * UNIT / (d.aspect || ASPECT[d.shape || 'beaker']))));
  const unit = UNIT * Math.min(1, (MAX_H / hMax) ** 2);
  const shapes = defs.map(d => makeVessel(d, unit, liq));
  const pad = s => Math.max(16, Math.min(40, s.w * 0.3));

  // Xếp theo hàng: hàng 0 trên cùng (bình), hàng sau ở dưới (hàng cốc).
  const rowIds = [...new Set(defs.map(d => d.row || 0))].sort((a, b) => a - b);
  const rows = rowIds.map(r => {
    const ks = defs.map((d, k) => ((d.row || 0) === r ? k : -1)).filter(k => k >= 0);
    const ws = ks.map(k => shapes[k].w + pad(shapes[k]));
    const gap = Math.max(20, Math.min(56, ws.reduce((a, b) => a + b, 0) / ws.length * 0.35));
    return { ks, ws, gap, width: ws.reduce((a, b) => a + b, 0) + gap * (ks.length - 1), tall: Math.max(...ks.map(k => -shapes[k].top)) };
  });
  let floorY = 0;
  rows.forEach((row, i) => { if (i) floorY += LABEL_H + 24 + row.tall; row.floor = floorY; });
  const maxW = Math.max(...rows.map(r => r.width));
  const head = Math.max(HEAD, Math.max(...shapes.map(s => s.w)) * 1.15);
  const vbX = -20, vbY = -rows[0].tall - head, vbW = maxW + 40, vbH = rows[0].tall + head + floorY + LABEL_H;
  fig.innerHTML = `<svg viewBox="${vbX} ${f1(vbY)} ${f1(vbW)} ${f1(vbH)}" aria-hidden="true">
    ${rows.map(r => `<line x1="${vbX}" y1="${f1(r.floor + 2)}" x2="${f1(vbX + vbW)}" y2="${f1(r.floor + 2)}" stroke="#E2E8F0" stroke-width="3"/>`).join('')}
    <g data-labels></g><g data-items></g><g data-stream></g></svg>`;
  const svg = fig.querySelector('svg');
  const itemsG = svg.querySelector('[data-items]'), streamG = svg.querySelector('[data-stream]'), labelsG = svg.querySelector('[data-labels]');

  const homes = [];
  rows.forEach(row => {
    let x = (maxW - row.width) / 2;
    row.ks.forEach((k, j) => { homes[k] = { x: x + row.ws[j] / 2, y: row.floor }; x += row.ws[j] + row.gap; });
  });

  const vs = defs.map((d, k) => {
    const shape = shapes[k];
    const { x: hx, y: hy } = homes[k];
    const long = d.label && d.label.replace(/<[^>]+>/g, '').length > 2; // "can 12 l" nhỏ hơn chữ "A"
    const fs = Math.min(long ? 26 : 34, Math.max(18, shape.w * 0.45));
    labelsG.insertAdjacentHTML('beforeend', d.label
      ? `<text x="${f1(hx)}" y="${f1(hy + (long ? 40 : 46))}" font-size="${f1(fs)}" font-weight="600" fill="${INK}" text-anchor="middle" font-family="Quicksand, sans-serif">${svgText(d.label)}</text>`
      : `<text x="${f1(hx)}" y="${f1(hy + 40)}" font-size="22" font-weight="600" fill="#64748B" text-anchor="middle" font-family="Quicksand, sans-serif">${d.twin ? `giống hệt ${d.twin}` : ''}</text>`);
    itemsG.insertAdjacentHTML('beforeend', `<g class="pour-vessel${d.fixed ? ' pour-fixed' : ''}"><rect class="pour-hit" x="${f1(-shape.w / 2 - 14)}" y="${f1(shape.top - 14)}" width="${f1(shape.w + 28)}" height="${f1(-shape.top + 20)}" rx="12"/><g>${shape.back}</g><g data-water></g><g>${shape.front}</g></g>`);
    const el = itemsG.lastElementChild;
    const water = el.querySelector('[data-water]');
    const st = { x: hx, y: hy, a: 0, ax: 0, ay: 0, v: d.v || 0 };
    const o = {
      d, shape, el, st, home: hx, homeY: hy, v0: d.v || 0, got: new Map(), pours: new Map(),
      name: d.name || (d.twin ? `bình giống hệt ${d.twin}` : d.label ? `bình ${d.label}` : 'bình'),
      draw() { el.setAttribute('transform', `translate(${f1(st.x)} ${f1(st.y)}) rotate(${f1(st.a)} ${f1(st.ax)} ${f1(st.ay)})`); },
      set(v) { st.v = Math.max(0, Math.min(shape.cap, v)); water.innerHTML = waterSvg(shape, st.v, st.a); el.classList.toggle('pour-has', st.v > EPS); },
      full: () => st.v >= shape.cap - EPS,
      empty: () => st.v <= EPS,
    };
    o.set(o.st.v);
    o.draw();
    return o;
  });

  let busy = false, picked = null, alive = true;
  const intro = () => { say.innerHTML = after ? 'Bé đã tính đúng. Giờ rót thử để kiểm chứng!' : 'Bé rót thử rồi tự nhìn xem câu này đúng hay sai.'; };
  intro();

  const setPicked = p => {
    picked = p;
    vs.forEach(o => {
      o.el.classList.toggle('pour-picked', o === p);
      // Chọn rồi thì viền đều mọi chỗ rót vào được — không gợi ý chỗ nào đúng.
      o.el.classList.toggle('pour-can-drop', !!p && o !== p && (p.empty() ? o.d.fixed && !o.empty() : !o.full()));
    });
  };

  const svgPoint = e => {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };
  const vesselAt = (p, except) => {
    let best = null, bd = Infinity;
    vs.forEach(o => {
      if (o === except) return;
      const dx = Math.abs(p.x - o.st.x), inY = p.y > o.homeY + o.shape.top - 60 && p.y < o.homeY + 30;
      if (dx < o.shape.w / 2 + 30 && inY && dx < bd) { best = o; bd = dx; }
    });
    return best;
  };

  const record = (src, dst, amount) => {
    dst.got.set(src, (dst.got.get(src) || 0) + amount);
    src.pours.set(dst, (src.pours.get(dst) || 0) + 1);
  };

  function isDone() {
    const u = exp.until;
    if (!u) return true;
    if (u === 'empty') {
      const filled = vs.filter(o => o.v0 > EPS && !o.d.fixed), blank = vs.filter(o => o.v0 <= EPS);
      return (filled.length && filled.every(o => o.empty())) || (blank.length && blank.every(o => o.full()));
    }
    const o = vs.find(v => v.name === u.name);
    return !!o && Math.abs(o.st.v - u.v) < 0.01;
  }

  function finish(src, dst) {
    sfx.pop?.(2);
    if (!after) { say.innerHTML = observe(src, dst, vs, tag); return; }
    const done = isDone();
    say.innerHTML = confirm(src, dst, vs, exp, done);
    // Rót lần lượt (hàng cốc, múc từng ca): bình vẫn đang cầm để bé chạm cốc kế tiếp.
    if (!done && exp.until && !src.empty() && !src.d.fixed) setPicked(src);
  }

  // Bình đang cầm lơ lửng trên hàng cốc sau một lần rót (rót nối tiếp): { src, dir }.
  let held = null;
  // Đang rót một cốc trong hàng mà bé đã chạm cốc kế tiếp: nhớ lại, rót xong là lướt sang luôn.
  let chainSrc = null, chainCup = null, queued = [];
  const queue = o => {
    if (o === chainSrc || o.full() || o.d.shape !== chainCup.d.shape || o.d.cap !== chainCup.d.cap) return;
    if (queued.includes(o)) return;
    queued.push(o);
    o.el.classList.add('pour-next');
  };
  // Cốc chạm sẵn kế tiếp còn rót được (bỏ cốc đã đầy).
  const takeQueued = () => {
    let o;
    while ((o = queued.shift())) { o.el.classList.remove('pour-next'); if (!o.full()) return o; }
    return null;
  };
  const clearQueue = () => { queued.forEach(o => o.el.classList.remove('pour-next')); queued = []; };
  const HOLD_TILT = 60; // nghiêng vừa đủ để thấy sắp rót, nước chưa chảy

  // Còn cốc giống hệt cốc vừa rót mà chưa đầy thì bình ở lại trên hàng cốc, bé chạm cốc kế tiếp là rót luôn.
  const moreLike = (src, dst) => !src.empty() && vs.some(v => v !== src && v !== dst && !v.full() && !v.d.fixed
    && v.d.shape === dst.d.shape && v.d.cap === dst.d.cap);

  // Điểm thấp nhất (toạ độ cảnh) của đồ đựng o khi xoay góc a quanh (ax, ay), ở vị trí hiện tại.
  function lowest(o, a) {
    const r = a * Math.PI / 180, { ax, ay } = o.st, w = o.shape.w / 2 + 6;
    return Math.max(...[[-w, o.shape.top - 6], [w, o.shape.top - 6], [-w, 4], [w, 4]]
      .map(([x, y]) => o.st.y + ay + (x - ax) * Math.sin(r) + (y - ay) * Math.cos(r)));
  }

  // Bình (đang cầm) về chỗ cũ theo đường vòng lên, dựng thẳng lại trong lúc bay.
  // keep: chỉ đổi phía rót giữa chừng hàng cốc, giữ các cốc bé đã chạm sẵn.
  async function goHome(src, keep = false) {
    held = null;
    if (!keep) { chainSrc = null; clearQueue(); }
    const back = { x: src.st.x, y: src.st.y }, a0 = src.st.a;
    const up = { x: (back.x + src.home) / 2, y: Math.min(back.y, src.homeY) - 90 };
    await animate(760, t => {
      const e = ease(t), u = 1 - e;
      src.st.x = u * u * back.x + 2 * u * e * up.x + e * e * src.home;
      src.st.y = u * u * back.y + 2 * u * e * up.y + e * e * src.homeY;
      src.st.a = a0 * (1 - ease(Math.min(1, t / 0.65)));
      src.draw(); src.set(src.st.v);
    });
    src.st.ax = src.st.ay = 0; src.st.a = 0; src.draw();
  }

  // Bình nghiêng rót sang đồ đựng khác.
  async function pour(src, dst) {
    if (busy) return;
    if (src.d.fixed) return scoop(src, dst);
    if (src.empty()) { say.innerHTML = `${cap1(src.name)} không còn ${liq.noun} để rót.`; return; }
    if (dst.full()) { say.innerHTML = `${cap1(dst.name)} đầy rồi, không rót thêm được.`; return; }
    busy = true;
    setPicked(null);
    const dir = dst.st.x > src.home ? 1 : -1;
    // Đang cầm trên hàng cốc: lướt sang cốc mới (đổi phía thì về chỗ cũ trước đã).
    let chain = held && held.src === src;
    if (chain && held.dir !== dir) { await goHome(src, true); chain = false; }
    if (held && held.src !== src) { const h = held.src; await goHome(h); }
    held = null;
    chainSrc = moreLike(src, dst) ? src : null;
    chainCup = dst;
    say.innerHTML = `Đang rót ${liq.noun} ${src.name} sang ${dst.name}.`;
    itemsG.appendChild(src.el); // rót thì đồ đựng nằm trên cùng
    const sp = src.shape.spout(dir);
    // xoay quanh mỏ rót; đặt mỏ rót ngay trên miệng đồ đựng nhận, lệch vào trong một chút
    const from = { x: src.st.x, y: src.st.y }, a0 = src.st.a;
    src.st.ax = sp.x; src.st.ay = sp.y;
    const mouthX = dst.st.x - dir * Math.min(dst.shape.w * 0.22, 18);
    const to = { x: mouthX - sp.x, y: dst.st.y + dst.shape.top - 34 - sp.y };
    const mid = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - (chain ? 24 : 90) };
    const tilt = dir * 110; // quá 90°: miệng chúc xuống thấp hơn đáy như rót thật
    sfx.swish?.();
    // Nhấc lên rồi nghiêng dần trong lúc bay tới: bình cao không chúc đáy xuống đè đồ đựng thấp.
    await animate(chain ? 420 : 820, t => {
      const e = ease(t), u = 1 - e;
      src.st.x = u * u * from.x + 2 * u * e * mid.x + e * e * to.x;
      src.st.y = u * u * from.y + 2 * u * e * mid.y + e * e * to.y;
      src.st.a = a0 + (tilt - a0) * ease(Math.max(0, (t - (chain ? 0.2 : 0.35)) / (chain ? 0.8 : 0.65)));
      src.draw(); src.set(src.st.v);
    });
    const amount = Math.min(src.st.v, dst.shape.cap - dst.st.v);
    const s0 = src.st.v, d0 = dst.st.v;
    // Rót đầy cả một đồ đựng mất ~2,4 giây dù to hay nhỏ (10 l không phải chờ 24 giây);
    // cốc nhỏ trong hàng cốc (bình to rót ra nhiều cốc) đầy nhanh hơn, ~1,3 giây.
    const base = dst.shape.cap * 3 <= src.shape.cap ? 1300 : 2400;
    await animate(Math.max(600, base * amount / Math.min(dst.shape.cap, Math.max(src.shape.cap, 1))), t => {
      src.set(s0 - amount * t);
      dst.set(d0 + amount * t);
      const sx = src.st.x + sp.x, sy = src.st.y + sp.y;
      streamG.innerHTML = t < 0.98 ? stream(sx + dir * 2, sy + 2, dst.st.y + dst.shape.levelY(dst.st.v), liq) : '';
    });
    streamG.innerHTML = '';
    record(src, dst, amount);
    if (alive && moreLike(src, dst) && !(after && isDone())) {
      held = { src, dir };
      const next = takeQueued();
      // Bé đã chạm sẵn cốc kế tiếp: lướt sang rót luôn, không dừng.
      if (next) { busy = false; finish(src, dst); return pour(src, next); }
      // Dựng bình lên một chút, ở lại trên hàng cốc chờ bé chạm cốc kế tiếp. Bình xoay quanh mỏ rót
      // nên thân bình chúc xuống: nhấc cao tới khi điểm thấp nhất của bình ở trên miệng cốc,
      // không che cốc bên cạnh (bé chạm cốc là trúng cốc).
      const hold = dir * HOLD_TILT;
      const lift = Math.max(30, lowest(src, hold) - (dst.st.y + dst.shape.top - 44));
      const p0 = { y: src.st.y };
      await animate(320, t => {
        const e = ease(t);
        src.st.a = tilt + (hold - tilt) * e;
        src.st.y = p0.y - lift * e;
        src.draw(); src.set(src.st.v);
      });
      busy = false;
      if (!alive) return;
      const late = takeQueued();
      if (late) { finish(src, dst); return pour(src, late); }
      finish(src, dst);
      setPicked(src);
      say.innerHTML += ` Chạm cốc tiếp theo để rót tiếp, chạm ${src.name} để đặt về chỗ.`;
      return;
    }
    await goHome(src);
    busy = false;
    if (alive) finish(src, dst);
  }

  // Múc: ca bay tới thùng đứng yên, nhúng xuống cho đầy rồi nhấc về.
  async function scoop(tank, cup) {
    if (tank.empty()) { say.innerHTML = `${cap1(tank.name)} hết ${liq.noun} rồi.`; return; }
    if (cup.full()) { say.innerHTML = `${cap1(cup.name)} đầy rồi, đổ vào chỗ khác trước đã.`; return; }
    busy = true;
    setPicked(null);
    if (held) await goHome(held.src);
    say.innerHTML = `Đang múc ${liq.noun} trong ${tank.name}.`;
    itemsG.appendChild(cup.el);
    const from = { x: cup.st.x, y: cup.st.y };
    const above = { x: tank.st.x, y: tank.st.y + tank.shape.top - 30 };
    // đáy ca chìm xuống dưới mặt nước thùng một chút
    const dip = { x: tank.st.x, y: tank.st.y + tank.shape.levelY(tank.st.v) + Math.min(-cup.shape.top * 0.6, tank.shape.hIn * 0.25) };
    sfx.swish?.();
    await animate(700, t => {
      const e = ease(t), u = 1 - e, mid = { x: (from.x + above.x) / 2, y: Math.min(from.y, above.y) - 60 };
      cup.st.x = u * u * from.x + 2 * u * e * mid.x + e * e * above.x;
      cup.st.y = u * u * from.y + 2 * u * e * mid.y + e * e * above.y;
      cup.draw();
    });
    await animate(420, t => { cup.st.y = above.y + (dip.y - above.y) * ease(t); cup.draw(); });
    const amount = Math.min(tank.st.v, cup.shape.cap - cup.st.v);
    const t0 = tank.st.v, c0 = cup.st.v;
    await animate(700, t => { tank.set(t0 - amount * t); cup.set(c0 + amount * t); });
    record(tank, cup, amount);
    await animate(420, t => { cup.st.y = dip.y + (above.y - dip.y) * ease(t); cup.draw(); });
    await animate(620, t => {
      const e = ease(t), u = 1 - e, mid = { x: (above.x + cup.home) / 2, y: Math.min(above.y, cup.homeY) - 60 };
      cup.st.x = u * u * above.x + 2 * u * e * mid.x + e * e * cup.home;
      cup.st.y = u * u * above.y + 2 * u * e * mid.y + e * e * cup.homeY;
      cup.draw();
    });
    busy = false;
    if (!alive) return;
    sfx.pop?.(1);
    say.innerHTML = `${cap1(cup.name)} đầy rồi. Chạm ${cup.name} rồi chạm chỗ muốn đổ vào.`;
    setPicked(cup);
  }

  const canStart = o => !o.empty() || (!o.d.fixed && vs.some(v => v.d.fixed && !v.empty()));

  // Chạm — chạm, hoặc kéo thả.
  vs.forEach(o => {
    let down = null, dragging = false;
    o.el.addEventListener('pointerdown', e => {
      if (busy) { if (chainSrc) queue(o); return; }
      down = { x: e.clientX, y: e.clientY, p: svgPoint(e) };
      dragging = false;
      o.el.setPointerCapture?.(e.pointerId);
    });
    o.el.addEventListener('pointermove', e => {
      if (!down || busy || o.d.fixed || !canStart(o) || held?.src === o) return;
      if (!dragging && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 8) return;
      if (!dragging) { dragging = true; setPicked(o); itemsG.appendChild(o.el); o.el.classList.add('pour-drag'); }
      const p = svgPoint(e);
      o.st.x = o.home + (p.x - down.p.x); o.st.y = o.homeY + (p.y - down.p.y);
      o.draw();
      const near = vesselAt(p, o);
      vs.forEach(v => v.el.classList.toggle('pour-near', v === near && v.el.classList.contains('pour-can-drop')));
    });
    const up = async e => {
      if (!down) return;
      const wasDrag = dragging;
      down = null; dragging = false;
      o.el.classList.remove('pour-drag');
      vs.forEach(v => v.el.classList.remove('pour-near'));
      if (busy) return;
      if (wasDrag) {
        const tgt = vesselAt(svgPoint(e), o);
        const ok = tgt && tgt.el.classList.contains('pour-can-drop');
        if (!ok) {
          setPicked(null);
          const from = { x: o.st.x, y: o.st.y };
          await animate(300, t => { const k = ease(t); o.st.x = from.x + (o.home - from.x) * k; o.st.y = from.y + (o.homeY - from.y) * k; o.draw(); });
          if (tgt?.full()) say.innerHTML = `${cap1(tgt.name)} đầy rồi, không rót thêm được.`;
          return;
        }
        // thả ca rỗng vào thùng: ca về chỗ rồi múc như chạm
        if (o.empty() && tgt.d.fixed) { o.st.x = o.home; o.st.y = o.homeY; o.draw(); return scoop(tgt, o); }
        return pour(o, tgt);
      }
      // chạm
      if (picked && picked !== o) {
        if (picked.empty() && o.d.fixed) return scoop(o, picked);
        if (picked.d.fixed) return scoop(picked, o);
        return pour(picked, o);
      }
      if (held && held.src === o) {
        setPicked(null);
        busy = true;
        await goHome(o);
        busy = false;
        say.innerHTML = `Đã đặt ${o.name} về chỗ.`;
        return;
      }
      if (picked === o) return setPicked(null);
      if (o.d.fixed) {
        say.innerHTML = o.empty() ? `${cap1(o.name)} hết ${liq.noun} rồi.` : `Múc bằng gì? Chạm ca muốn múc.`;
        if (!o.empty()) setPicked(o);
        return;
      }
      if (!canStart(o)) { say.innerHTML = `${cap1(o.name)} chưa có ${liq.noun}. Chạm đồ đựng có ${liq.noun} trước.`; return; }
      setPicked(o);
      say.innerHTML = o.empty()
        ? `Chạm thùng để múc ${liq.noun} vào ${o.name}.`
        : `Rót ${liq.noun} ${o.name} vào đâu? Chạm đồ đựng muốn rót vào.`;
    };
    o.el.addEventListener('pointerup', up);
    o.el.addEventListener('pointercancel', () => { down = null; dragging = false; o.el.classList.remove('pour-drag'); });
  });

  return { stop() { alive = false; } };
}

const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
// Chữ "l" nghiêng của vở (<i>l</i>) trong SVG phải là tspan.
const svgText = s => String(s).replace(/<i[^>]*>l<\/i>/g, L_SVG);
const lit = v => `${String(Math.round(v * 10) / 10).replace('.', ',')} ${L}`;

/** Câu nói sau khi rót: chỉ kể điều nhìn thấy, không nói câu Đ/S nào đúng. */
function observe(src, dst, vs, tag) {
  const ask = `Vậy câu ${tag || 'này'} đúng hay sai? Bé tự ghi vào ô.`;
  const twinOf = dst.d.twin && vs.find(v => v.d.label === dst.d.twin && v !== dst);
  if (twinOf && src.empty()) {
    return `Đã rót hết nước ${src.name} sang bình giống hệt ${dst.d.twin}. Bé so mực nước hai bình. ${ask}`;
  }
  if (dst.full() && src.empty()) return `Rót hết nước ${src.name} thì ${dst.name} vừa đầy. ${ask}`;
  if (dst.full()) return `${cap1(dst.name)} đã đầy mà ${src.name} vẫn còn nước. ${ask}`;
  return `Rót hết nước ${src.name} mà ${dst.name} vẫn chưa đầy. ${ask}`;
}

/**
 * Bước kiểm chứng (câu tính toán, bé đã làm đúng): kể điều vừa xảy ra, đếm số đồ đựng rót đầy,
 * đọc vạch lít; khi thí nghiệm xong mới thêm "Đúng như bé đã tính!".
 */
function confirm(src, dst, vs, exp, done) {
  const out = [];
  if (exp.count && src.empty()) {
    // câu đếm bên dưới đã nói đủ
  } else if (src.d.scoop) {
    const n = src.pours.get(dst) || 0;
    out.push(`Đã đổ ${n} ${src.name} vào ${dst.name}.`);
  } else if (dst.full() && src.empty()) out.push(`Rót hết ${src.name} thì ${dst.name} vừa đầy.`);
  else if (dst.full()) out.push(`${cap1(dst.name)} đã đầy.`);
  else if (!dst.d.marks) out.push(`Đã rót hết ${src.name} mà ${dst.name} vẫn chưa đầy.`);
  else out.push(`Đã rót hết ${src.name}.`);

  // Đếm: rót hết một bình được đầy mấy cốc.
  if (exp.count && src.empty()) {
    const filled = vs.filter(o => o.got.has(src) && o.full());
    if (filled.length) out.push(`${cap1(src.name)} rót được đầy ${filled.length} ${filled[0].d.unit || filled[0].name}.`);
  }
  // Nhiều bình cùng rót ra hàng cốc: xong thì đếm cả hàng.
  const givers = vs.filter(o => o.v0 > EPS && !o.d.marks);
  if (exp.count && done && givers.length > 1) {
    const all = vs.filter(o => o.v0 <= EPS && o.got.size && o.full());
    if (all.length) out.push(`Tất cả được đầy ${all.length} ${all[0].d.unit || all[0].name}.`);
  }
  // Đọc vạch: đồ đựng có vạch vừa được rót vào hoặc rót ra.
  // (bình có vạch vừa rót cạn thì không đọc "còn lại 0 l")
  const marked = vs.filter(o => o.d.marks && !(o === src && o.empty()) && (o === src || o === dst || (done && o.got.size)));
  if (marked.length === 1) {
    const m = marked[0];
    out.push(`Nhìn vạch trên ${m.name}: ${m === src || m.v0 > EPS ? 'còn lại' : 'có'} ${lit(m.st.v)}.`);
  } else if (marked.length > 1) {
    out.push(`Nhìn vạch: ${marked.map(m => `${m.name} có ${lit(m.st.v)}`).join(', ')}.`);
  }
  if (done) out.push(exp.end || 'Đúng như bé đã tính!');
  return out.join(' ');
}

function stream(x, y1, y2, liq) {
  if (y2 <= y1) return '';
  return `<rect x="${f1(x - 4)}" y="${f1(y1)}" width="8" height="${f1(y2 - y1)}" rx="4" fill="${liq.fill}" stroke="${liq.line}" stroke-width="1.6"/>`;
}

function animate(ms, fn) {
  return new Promise(res => {
    const t0 = performance.now();
    const step = now => {
      const t = Math.min(1, (now - t0) / ms);
      fn(t);
      if (t < 1) requestAnimationFrame(step); else res();
    };
    requestAnimationFrame(step);
  });
}
const ease = t => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function injectStyles() {
  if (document.getElementById('pour-styles')) return;
  const style = document.createElement('style');
  style.id = 'pour-styles';
  style.textContent = `
    .pour-chip {
      flex: none; padding: 2px 10px; line-height: 1.6;
      border: 1.5px solid #38BDF8; border-radius: 999px; background: #F0F9FF; color: #075985;
      font: 700 0.78rem Quicksand, sans-serif; cursor: pointer;
    }
    .pour-chip:hover, .pour-open:hover { background: #E0F2FE; }
    .pour-open {
      display: block; margin: 6px auto 0; padding: 4px 12px;
      border: 1.5px solid #38BDF8; border-radius: 999px; background: #F0F9FF; color: #075985;
      font: 700 0.8rem Quicksand, sans-serif; cursor: pointer;
    }
    .gw-app .gw-pin-zone .gw-card-has-img > .pour-open { grid-column: 2; }
    .pour-locked { display: none !important; }
    .pour-cta {
      display: block; margin: 8px auto 0; padding: 8px 18px;
      border: 2px solid #0EA5E9; border-radius: 999px; background: #F0F9FF; color: #075985;
      font: 700 1rem Quicksand, sans-serif; cursor: pointer; animation: pour-pop .5s ease-out;
    }
    @keyframes pour-pop { from { transform: scale(.85); opacity: 0; } to { transform: none; opacity: 1; } }
    .pour-overlay {
      position: fixed; inset: 0; z-index: 5000;
      background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: center; justify-content: center; padding: 12px;
    }
    .pour-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      box-sizing: border-box; width: min(900px, 100%); min-width: 0; max-height: 100%; overflow: auto;
      padding: 0.8rem 1rem 1rem; display: flex; flex-direction: column; gap: 0.55rem;
    }
    .pour-head { display: flex; align-items: center; gap: 0.5rem; }
    .pour-tabs { flex: 1; display: flex; gap: 0.35rem; flex-wrap: wrap; }
    .pour-tab, .pour-btn {
      flex: none; height: 2.2rem; min-width: 2.6rem; padding: 0 0.8rem; border-radius: 1.1rem;
      border: 1.5px solid #CBD5E1; background: #fff; color: #1e293b;
      font: 700 0.9rem Quicksand, sans-serif; cursor: pointer;
    }
    .pour-tab.on { background: #0EA5E9; border-color: #0EA5E9; color: #fff; }
    .pour-close { width: 2.2rem; min-width: 0; padding: 0; }
    .pour-claim { font: 700 1.1rem Quicksand, sans-serif; color: #1e293b; }
    .pour-guide { font: 600 0.85rem Quicksand, sans-serif; color: #64748B; }
    .pour-figure { min-width: 0; }
    .pour-figure svg { display: block; width: 100%; height: auto; max-height: 58vh; max-height: 58dvh; user-select: none; -webkit-user-select: none; touch-action: none; }
    .pour-say {
      text-align: center; font: 700 1.05rem Quicksand, sans-serif; color: #0F766E;
      background: #F0FDFA; border-radius: 0.75rem; padding: 0.5rem 0.8rem; min-height: 1.6em;
    }
    .pour-vessel { cursor: pointer; }
    .pour-hit { fill: transparent; stroke: none; }
    .pour-vessel.pour-can-drop .pour-hit { stroke: #94A3B8; stroke-width: 3; stroke-dasharray: 10 8; }
    .pour-vessel.pour-near .pour-hit, .pour-vessel.pour-next .pour-hit { fill: #E0F2FE; stroke: #0EA5E9; stroke-dasharray: none; }
    .pour-vessel.pour-picked .pour-hit { stroke: #F59E0B; stroke-width: 4; stroke-dasharray: none; }
    .pour-vessel.pour-drag { cursor: grabbing; }
  `;
  document.head.appendChild(style);
}
