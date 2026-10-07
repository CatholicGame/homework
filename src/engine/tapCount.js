/**
 * 👆 Chạm để đếm (Lớp 1, kiểu mầm non): hình của câu là một cảnh vẽ thật trên màn hình, bé chạm
 * từng vật để đếm thay vì nhìn ảnh tĩnh.
 *
 *   • Chạm một vật: vật nảy lên, hiện số thứ tự (1, 2, 3…) trong nhóm của nó, máy đọc số đó.
 *     Chạm lại vật đã đếm: số của nó lắc nhẹ, không đếm thêm.
 *   • Dưới hình là bảng tổng hợp, mỗi nhóm một ô lớn (hình nhỏ của vật + số + tên): số tăng dần khi bé
 *     đếm; đếm hết một nhóm thì ô xanh lên, máy đọc "4 cây có quả".
 *   • Không chấm điểm, không tự chọn đáp án: bé so hai số rồi tự trả lời câu hỏi như thường.
 *   • ↺ đếm lại từ đầu. Kết quả đếm giữ theo câu trong lúc mở vở (MEMO).
 * Bảng tổng hợp có sẵn chỗ từ đầu (số "?"), nên hình không xê dịch khi bé đếm.
 *
 *   q.tapCount = {
 *     svg,                                   nội dung SVG (import '...svg?raw'); mỗi vật bọc trong <g data-tc="a">
 *     groups: { a: 'cây có quả', b: 'cây không có quả' },   tên từng nhóm, theo thứ tự hiện trong bảng
 *   }
 * Câu vẫn giữ q.img (ảnh đó) cho danh sách câu và bản không có hình động.
 */

import { say, sfx } from '../games/preschool/fx.js';

const NS = 'http://www.w3.org/2000/svg';
const COLORS = ['#F97316', '#2563EB', '#16A34A', '#A855F7'];
const MEMO = new WeakMap(); // q → Set các chỉ số vật đã đếm (theo thứ tự trong hình)
const calm = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Khung của cảnh, đặt vào chỗ <img> của câu (cùng lớp e3-q-img để có cỡ như hình thường). */
export function tapCountMarkup(q) {
  const keys = Object.keys(q.tapCount.groups);
  const chips = keys.map((k, i) => `
    <div class="tc-chip" data-tc-chip="${k}" style="--tc-c:${COLORS[i % COLORS.length]}">
      <svg class="tc-mini" aria-hidden="true"></svg>
      <b class="tc-num">?</b>
      <span class="tc-label">${q.tapCount.groups[k]}</span>
    </div>`).join('');
  return `
    <div class="e3-q-img tc-wrap" role="group" aria-label="Chạm vào từng hình để đếm">
      <div class="tc-scene">${q.tapCount.svg}</div>
      <div class="tc-sum">${chips}<button type="button" class="tc-reset" title="Đếm lại" aria-label="Đếm lại">↺</button></div>
    </div>`;
}

export function attachTapCount(app, q) {
  const wrap = app.querySelector('.tc-wrap');
  if (!wrap || !q.tapCount) return;
  injectStyle();
  const svg = wrap.querySelector('.tc-scene > svg');
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  const keys = Object.keys(q.tapCount.groups);
  const vb = svg.viewBox.baseVal;
  const R = Math.max(14, Math.min(vb.width, vb.height) * 0.055); // bán kính huy hiệu số

  const items = [...svg.querySelectorAll('[data-tc]')].map((g, idx) => {
    const box = g.getBBox();
    const key = g.dataset.tc;
    // Vùng chạm rộng hơn nét vẽ (chấm tròn, ngôi sao nhỏ).
    const hit = document.createElementNS(NS, 'rect');
    const pad = 6;
    Object.entries({ x: box.x - pad, y: box.y - pad, width: box.width + 2 * pad, height: box.height + 2 * pad })
      .forEach(([a, v]) => hit.setAttribute(a, v));
    hit.setAttribute('fill', 'transparent');
    g.prepend(hit);
    g.classList.add('tc-item');
    g.style.transformOrigin = `${box.x + box.width / 2}px ${box.y + box.height}px`;
    return { g, idx, key, box, badge: null };
  });
  const total = (k) => items.filter(it => it.key === k).length;

  // Hình nhỏ của vật đầu tiên mỗi nhóm trong ô tổng hợp.
  keys.forEach((k) => {
    const first = items.find(it => it.key === k);
    const mini = wrap.querySelector(`[data-tc-chip="${k}"] .tc-mini`);
    if (!first || !mini) return;
    const { x, y, width, height } = first.box;
    mini.setAttribute('viewBox', `${x - 2} ${y - 2} ${width + 4} ${height + 4}`);
    const clone = first.g.cloneNode(true);
    clone.querySelector(':scope > rect[fill="transparent"]')?.remove();
    clone.classList.remove('tc-item');
    mini.appendChild(clone);
  });

  let counted = MEMO.get(q);
  if (!counted) { counted = new Set(); MEMO.set(q, counted); }

  // 👆 Ngón tay chỉ vào vật đầu tiên cho tới khi bé chạm lần đầu.
  const finger = document.createElementNS(NS, 'text');
  finger.classList.add('tc-finger');
  finger.textContent = '👆';
  finger.setAttribute('font-size', R * 2.6);
  finger.setAttribute('text-anchor', 'middle');
  if (items[0]) {
    finger.setAttribute('x', items[0].box.x + items[0].box.width / 2);
    finger.setAttribute('y', Math.min(vb.height - 4, items[0].box.y + items[0].box.height * 0.75 + R * 2));
  }
  svg.appendChild(finger);

  function numberInGroup(it) {
    return items.filter(o => o.key === it.key && counted.has(o.idx) && o.order <= it.order).length;
  }

  function drawBadge(it) {
    const n = numberInGroup(it);
    const color = COLORS[keys.indexOf(it.key) % COLORS.length];
    const b = document.createElementNS(NS, 'g');
    b.classList.add('tc-badge');
    const cx = it.box.x + it.box.width - R * 0.6;
    const cy = it.box.y + R * 0.6;
    b.style.transformOrigin = `${cx}px ${cy}px`;
    b.innerHTML = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${color}" stroke="#fff" stroke-width="${R * 0.22}"/>`
      + `<text x="${cx}" y="${cy}" dy="0.36em" text-anchor="middle" font-size="${R * 1.3}" font-weight="800" fill="#fff">${n}</text>`;
    svg.appendChild(b);
    it.badge = b;
  }

  function refreshSummary(speakDone) {
    keys.forEach((k) => {
      const chip = wrap.querySelector(`[data-tc-chip="${k}"]`);
      const n = items.filter(it => it.key === k && counted.has(it.idx)).length;
      const done = n === total(k);
      chip.querySelector('.tc-num').textContent = n ? n : '?';
      chip.classList.toggle('tc-done', done);
      chip.classList.toggle('tc-going', n > 0 && !done);
      if (done && speakDone === k) {
        say(`${n} ${q.tapCount.groups[k]}`, { queue: true });
        if (!calm()) { chip.classList.remove('tc-pop'); void chip.offsetWidth; chip.classList.add('tc-pop'); }
      }
    });
    finger.style.display = counted.size ? 'none' : '';
    wrap.querySelector('.tc-reset').style.visibility = counted.size ? 'visible' : 'hidden';
    if (speakDone && counted.size === items.length) sfx.fanfare();
  }

  function restore() {
    let order = 0;
    // MEMO giữ thứ tự chạm: Set theo thứ tự thêm vào.
    counted.forEach((idx) => { items[idx].order = order++; });
    items.filter(it => counted.has(it.idx)).sort((a, b) => a.order - b.order).forEach(drawBadge);
    refreshSummary(null);
  }

  function bump(el, cls) {
    if (calm()) return;
    el.classList.remove(cls); void el.getBBox(); el.classList.add(cls);
  }

  items.forEach((it) => {
    it.g.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (counted.has(it.idx)) { sfx.tap(); bump(it.badge, 'tc-shake'); return; }
      counted.add(it.idx);
      it.order = counted.size;
      drawBadge(it);
      const n = numberInGroup(it);
      sfx.pop(n);
      say(String(n));
      bump(it.g, 'tc-hop');
      bump(it.badge, 'tc-in');
      refreshSummary(n === total(it.key) ? it.key : null);
    });
  });

  wrap.querySelector('.tc-reset').onclick = () => {
    counted.clear();
    items.forEach((it) => { it.badge?.remove(); it.badge = null; });
    sfx.tap();
    refreshSummary(null);
  };

  restore();
}

function injectStyle() {
  if (document.getElementById('tc-style')) return;
  const s = document.createElement('style');
  s.id = 'tc-style';
  s.textContent = `
    .tc-wrap { cursor: default; display: flex; flex-direction: column; gap: 0.5rem; margin-left: auto; margin-right: auto; }
    .tc-scene { flex: 1 1 auto; min-height: 0; display: flex; justify-content: center; }
    .tc-scene > svg { width: 100%; height: 100%; max-height: 100%; display: block; touch-action: manipulation; user-select: none; -webkit-user-select: none; }
    .tc-item { cursor: pointer; }
    .tc-item.tc-hop { animation: tc-hop 0.38s ease-out; }
    .tc-badge.tc-in { animation: tc-in 0.3s ease-out; }
    .tc-badge.tc-shake { animation: tc-shake 0.35s ease-in-out; }
    .tc-finger { pointer-events: none; animation: tc-finger 1.1s ease-in-out infinite; }
    @keyframes tc-hop { 0% { transform: none; } 40% { transform: translateY(-6%) scale(1.06); } 100% { transform: none; } }
    @keyframes tc-in { 0% { transform: scale(0); } 70% { transform: scale(1.25); } 100% { transform: scale(1); } }
    @keyframes tc-shake { 0%, 100% { transform: none; } 25% { transform: rotate(-14deg); } 75% { transform: rotate(14deg); } }
    @keyframes tc-finger { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @media (prefers-reduced-motion: reduce) {
      .tc-finger { animation-duration: 2.4s; }
    }
    .tc-sum { flex: none; display: flex; gap: 0.5rem; align-items: stretch; justify-content: center; }
    .tc-chip {
      flex: 1 1 0; max-width: 16rem; min-width: 0; display: flex; align-items: center; gap: 0.45rem;
      padding: 0.3rem 0.7rem; border-radius: 0.9rem; background: #F8FAFC;
      border: 2px solid #E2E8F0; box-shadow: 0 3px 0 #E2E8F0; transition: background 0.2s, border-color 0.2s;
    }
    .tc-mini { width: 2.6rem; height: 2.6rem; flex: none; }
    .tc-num { font-size: 1.7rem; line-height: 1; min-width: 1.3ch; text-align: center; color: #94A3B8; font-variant-numeric: tabular-nums; }
    .tc-label { font-weight: 700; color: #475569; line-height: 1.2; font-size: 0.95rem; }
    .tc-chip.tc-going .tc-num { color: var(--tc-c); }
    .tc-chip.tc-done { background: #ECFDF5; border-color: #6EE7B7; box-shadow: 0 3px 0 #A7F3D0; }
    .tc-chip.tc-done .tc-num { color: var(--tc-c); }
    .tc-chip.tc-done .tc-label { color: #065F46; }
    .tc-chip.tc-pop { animation: tc-in 0.35s ease-out; }
    .tc-reset {
      flex: none; width: 2.6rem; border-radius: 0.9rem; border: 2px solid #E2E8F0; background: #fff;
      font-size: 1.3rem; color: #64748B; cursor: pointer; font-family: inherit;
    }
    @media (max-width: 479px) {
      .tc-chip { padding: 0.25rem 0.45rem; gap: 0.3rem; }
      .tc-mini { width: 2rem; height: 2rem; }
      .tc-num { font-size: 1.4rem; }
      .tc-label { font-size: 0.8rem; }
    }
  `;
  document.head.appendChild(s);
}
