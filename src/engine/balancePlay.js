/**
 * ⚖️ Thử cân — bé nhấc đồ khỏi đĩa cân, đặt đồ lên đĩa khác (kể cả sang cân khác) và thấy cân phản ứng.
 *
 * Chỉ là đồ dùng dạy học: không ghi vào ô trả lời, không chấm điểm. Hình trong câu hỏi giữ nguyên
 * như sách; nút "⚖️ Thử cân" dưới hình mở một lớp phủ lớn với chính hình SVG đó (tải lại inline).
 *
 *   q.balancePlay = true | {
 *     title,        // câu hướng dẫn trên đầu
 *     scene,        // URL một hình SVG riêng (cân + đồ để chọn) khi hình trong sách không có cân
 *     tray: [{ weight: '1 kg', g: 1000, n: 2 }],   // quả cân để sẵn trong khay
 *     start: ['quả chanh'],   // tên đồ (data-name) nằm sẵn trong khay lúc mở (bé tự đặt lên)
 *     until: { dial: 4000 },  // chế độ kiểm chứng: xong khi kim cân đồng hồ chỉ ngần ấy gam
 *                             // (mặc định: khi một cân đĩa thăng bằng và hai đĩa đều có đồ)
 *   }
 *   q.balanceAfter = true   // câu tính toán: nút chỉ hiện khi bé đã làm đúng (bước kiểm chứng,
 *                           // câu cuối "Đúng như bé đã tính!"); không có: thử được ngay, không lộ số
 *
 * Hình SVG phải do scripts/redraw vẽ, có các móc data-*:
 *   Cân đĩa — balance_scale() (kit_measure.py):
 *     [data-bal]        một cái cân (data-arm, data-post: nửa đòn, độ cao trục)
 *     [data-bal-rot]    đòn cân + kim, quay quanh (0, -post)
 *     [data-bal-pan]    đĩa trái (-1) / phải (1) và đồ trên nó, đi theo đầu đòn
 *     [data-bal-hint]   chữ gợi ý trên đĩa ("?"), ẩn khi đĩa có đồ
 *   Cân đồng hồ — kitchen_scale() + round_dial() (kit_w1.py), dial_scale() (kit_measure.py):
 *     [data-dial]         một cái cân
 *     [data-dial-needle]  kim, vẽ ở vị trí sách (giá trị = phần vòng), data-cy = tâm mặt số
 *   Cả hai — bal_item():
 *     [data-bal-item]   đồ nhấc được, data-g = cân nặng (gam), data-name = tên gọi.
 *                       Đồ nằm ngoài cân (vd. bốn túi gạo để chọn) được đưa vào khay lúc mở.
 *
 * Cân đĩa như cân thật: lệch bao nhiêu cũng nghiêng hết cỡ về bên nặng hơn. Đồ nhấc khỏi cân đĩa
 * nằm vào khay dưới cảnh; chạm đồ trong khay rồi chạm một đĩa để đặt lên (hoặc kéo thả).
 * Cân đồng hồ: chạm đồ để nhấc lên / đặt lại, kim quay theo tổng cân nặng (tỉ lệ suy từ hình sách).
 */

const NS = 'http://www.w3.org/2000/svg';
const DROP = 26;        // đầu đòn lên/xuống bao nhiêu khi nghiêng hết cỡ (đơn vị hình)
const LIFT = 46;        // đồ trên cân đồng hồ đã nhấc: nâng lên bao nhiêu
const HEADROOM = 120;   // thêm vào đỉnh viewBox (đơn vị SVG gốc)
const SVG_CACHE = new Map();

function loadSvg(url) {
  if (!SVG_CACHE.has(url)) SVG_CACHE.set(url, fetch(url).then(r => r.text()));
  return SVG_CACHE.get(url);
}

export function attachBalancePlay(root, q, solved = false) {
  const img = root.querySelector('.e3-question-card > .e3-q-img');
  if (!img || !(q.img || q.balancePlay?.scene)) return;
  injectStyles();
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `bal-open${q.balanceAfter && !solved ? ' bal-locked' : ''}`;
  btn.textContent = '⚖️ Thử cân';
  // Sau hình (và sau nút "📷 Ảnh gốc" của lightbox.js nếu có).
  (img.nextElementSibling?.classList.contains('e3-orig-toggle') ? img.nextElementSibling : img).after(btn);
  btn.onclick = () => openOverlay(q);
}

/** Câu tính toán vừa được làm đúng: hiện nút "⚖️ Thử cân" và mời bé kiểm chứng dưới lời khen. */
export function revealBalancePlay(root, q, banner) {
  if (!q?.balanceAfter || !q.balancePlay) return;
  const btn = root.querySelector('.bal-open.bal-locked');
  if (!btn) return;
  btn.classList.remove('bal-locked');
  if (!banner) return;
  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'bal-cta';
  cta.textContent = '⚖️ Cân thử để kiểm chứng';
  cta.onclick = () => openOverlay(q);
  banner.after(cta);
}

async function openOverlay(q) {
  const cfg = typeof q.balancePlay === 'object' ? q.balancePlay : {};
  const after = !!q.balanceAfter;
  const overlay = document.createElement('div');
  overlay.className = 'bal-overlay';
  overlay.innerHTML = `
    <div class="bal-panel" role="dialog" aria-label="Thử cân">
      <div class="bal-head">
        <span class="bal-title">⚖️ ${cfg.title || 'Chạm đồ vật trên đĩa cân để nhấc xuống khay. Chạm đồ trong khay rồi chạm một đĩa để đặt lên.'}</span>
        <button type="button" class="bal-btn bal-reset">↺ Làm lại</button>
        <button type="button" class="bal-btn bal-close" aria-label="Đóng">✕</button>
      </div>
      <div class="bal-figure"></div>
      <div class="bal-say" aria-live="polite"></div>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => { overlay.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('.bal-close').onclick = close;
  const text = await loadSvg(cfg.scene || q.img);
  const show = () => mountScene(overlay.querySelector('.bal-figure'), text, cfg, after, overlay.querySelector('.bal-say'), overlay.querySelector('.bal-title'));
  overlay.querySelector('.bal-reset').onclick = show;
  show();
}

// ─────────────────────────────────────────────── cảnh
function mountScene(fig, text, cfg, after, say, titleEl) {
  fig.innerHTML = text;
  const svg = fig.querySelector('svg');
  if (!svg) return;
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  const [x, y, w, h] = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);

  const balances = [...svg.querySelectorAll('[data-bal]')].map(el => makeBalance(el, svg));
  const dials = [...svg.querySelectorAll('[data-dial]')].map(el => makeDial(el, svg));
  const many = balances.length + dials.length > 1;
  // Chỉ có cân đồng hồ: không có khay, đồ nhấc lên / đặt lại tại chỗ.
  if (!balances.length && !cfg.title) titleEl.textContent = '⚖️ Chạm đồ vật trên cân để nhấc lên, chạm lần nữa để đặt lại.';
  balances.forEach((b, i) => { b.label = many ? (b.tag ? `cân ${b.tag}` : `cân thứ ${['nhất', 'hai', 'ba', 'tư'][i] || i + 1}`) : 'cân'; });

  // Đồ trên cân đĩa, đồ nằm ngoài cân và quả cân để sẵn: đều đi được vào khay.
  const loose = [...svg.querySelectorAll('[data-bal-item]')].filter(el => !el.closest('[data-bal]') && !el.closest('[data-dial]'));
  const items = [];
  balances.forEach(b => b.el.querySelectorAll('[data-bal-item]').forEach(el => {
    const side = +el.closest('[data-bal-pan]').dataset.balPan;
    items.push(makeItem(el, { bal: b, side }));
  }));
  loose.forEach(el => items.push(makeItem(el, null)));
  const hasTray = balances.length > 0 && (items.length > 0 || (cfg.tray || []).length > 0);

  // Khay: dải dưới cảnh, cao theo đồ to nhất.
  const k0 = balances[0] ? balances[0].k : 1;
  const extras = [];
  (cfg.tray || []).forEach(t => { for (let i = 0; i < (t.n || 1); i++) extras.push(t); });
  const trayG = document.createElementNS(NS, 'g');
  const flyG = document.createElementNS(NS, 'g');
  svg.appendChild(trayG);
  extras.forEach(t => {
    const pw = balances[0]?.panInfo[1].w || 120; // đơn vị của cân (khay phóng theo k)
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('data-bal-item', '1');
    g.dataset.g = t.g;
    g.dataset.name = `quả cân ${t.weight}`;
    g.innerHTML = weightSvg(t.weight, pw * 0.3 * Math.min(1.25, Math.max(0.75, Math.sqrt(t.g / 1000) * 0.9)));
    trayG.appendChild(g);
    items.push(makeItem(g, null));
  });
  let trayH = 0;
  if (hasTray) {
    const tallest = Math.max(60, ...items.map(it => it.bb.height * it.k));
    trayH = tallest + 44;
  }
  const trayY = y + h + 12;
  svg.setAttribute('viewBox', `${x} ${y - HEADROOM} ${w} ${h + HEADROOM + (hasTray ? trayH + 24 : 0)}`);
  if (hasTray) {
    trayG.insertAdjacentHTML('afterbegin', `<rect class="bal-tray" x="${x + 8}" y="${trayY}" width="${w - 16}" height="${trayH}" rx="16"/>`
      + `<text x="${x + 26}" y="${trayY + 24}" class="bal-tray-label">Khay</text>`);
  }
  svg.appendChild(flyG);

  function makeItem(el, home) {
    const it = {
      el, g: +el.dataset.g || 0, name: el.dataset.name || 'đồ vật', bb: el.getBBox(),
      home: home && { ...home, parent: el.parentNode, transform: el.getAttribute('transform') },
      loc: home ? { bal: home.bal, side: home.side } : null,
      k: home ? home.bal.k : balances[0]?.k || 1,
    };
    el.classList.add('bal-item');
    return it;
  }

  // ── vị trí ──
  const rel = el => DOMMatrix.fromMatrix(svg.getScreenCTM()).inverse().multiply(DOMMatrix.fromMatrix(el.getScreenCTM()));
  const setM = (el, m) => el.setAttribute('transform', `matrix(${[m.a, m.b, m.c, m.d, m.e, m.f].map(n => +n.toFixed(3)).join(' ')})`);
  // Ma trận (toạ độ gốc svg) đặt đồ sao cho giữa đáy nằm ở (px, py), phóng k.
  const placeM = (it, px, py, k) => new DOMMatrix().translate(px, py).scale(k).translate(-(it.bb.x + it.bb.width / 2), -(it.bb.y + it.bb.height));

  function trayTargets() {
    const inTray = items.filter(it => !it.loc);
    const out = new Map();
    const gap = 18, total = inTray.reduce((s, it) => s + it.bb.width * it.k, 0) + gap * (inTray.length - 1);
    let cx = x + w / 2 - total / 2;
    const squeeze = total > w - 60 ? (w - 60) / total : 1;
    cx = x + w / 2 - (total * squeeze) / 2;
    inTray.forEach(it => {
      const ww = it.bb.width * it.k * squeeze;
      out.set(it, placeM(it, cx + ww / 2, trayY + trayH - 12, it.k * squeeze));
      cx += ww + gap * squeeze;
    });
    return out;
  }

  // Chỗ đặt đồ trên một đĩa: về đúng chỗ sách nếu là đĩa nhà, không thì xếp thành hàng trên đĩa.
  function panTargets(bal, side) {
    const out = new Map();
    const onPan = items.filter(it => it.loc && it.loc.bal === bal && it.loc.side === side);
    const homeOnes = onPan.filter(it => it.home && it.home.bal === bal && it.home.side === side);
    const guests = onPan.filter(it => !homeOnes.includes(it));
    const fallen = settle(bal, side, homeOnes);
    homeOnes.forEach(it => {
      const dy = fallen.get(it).dy;
      out.set(it, { parent: it.home.parent, local: dy ? dropM(it, dy) : it.home.transform });
    });
    if (guests.length) {
      const pan = bal.panInfo[side];
      const gap = 6, wOf = it => it.bb.width * (it.k / bal.k);
      const total = guests.reduce((s, it) => s + wOf(it), 0) + gap * (guests.length - 1);
      let base = pan.rimY, cx = pan.cx - total / 2;
      if (homeOnes.length) {
        // Đĩa còn chỗ thì đứng cạnh đồ nhà (được thò ra mép đĩa một chút), hết chỗ mới chồng lên trên.
        const boxes = homeOnes.map(it => fallen.get(it));
        const l = Math.min(...boxes.map(b => b.x1)), r = Math.max(...boxes.map(b => b.x2));
        const edgeL = pan.cx - pan.w * 0.62, edgeR = pan.cx + pan.w * 0.62;
        if (edgeR - r >= total + gap) cx = r + gap;
        else if (l - edgeL >= total + gap) cx = l - gap - total;
        // chồng lên chỉ khi đồ nhà to hơn (quả cân lên túi gạo); đồ to không đứng trên quả cam nhỏ
        else if (r - l >= total) base = Math.min(...boxes.map(b => b.y1)) - 2;
        else cx = edgeR - r >= l - edgeL ? r + gap : l - gap - total;
      }
      guests.forEach(it => {
        const kk = it.k / bal.k, ww = wOf(it);
        const m = new DOMMatrix().translate(cx + ww / 2, base).scale(kk).translate(-(it.bb.x + it.bb.width / 2), -(it.bb.y + it.bb.height));
        out.set(it, { parent: bal.extra[side], local: m });
        cx += ww + gap;
      });
    }
    return out;
  }
  // Hộp của đồ khi nằm ở chỗ nhà, trong toạ độ nhóm đĩa (bằng toạ độ nhóm đĩa phụ, cùng transform).
  function homeBox(it) {
    const pan = it.home.parent.closest('[data-bal-pan]');
    const m = DOMMatrix.fromMatrix(pan.getScreenCTM()).inverse().multiply(DOMMatrix.fromMatrix(it.home.parent.getScreenCTM())).multiply(parseM(it.home.transform));
    const a = new DOMPoint(it.bb.x, it.bb.y).matrixTransform(m), b = new DOMPoint(it.bb.x + it.bb.width, it.bb.y + it.bb.height).matrixTransform(m);
    return { x1: Math.min(a.x, b.x), x2: Math.max(a.x, b.x), y1: Math.min(a.y, b.y), y2: Math.max(a.y, b.y) };
  }

  // Trọng lực cho đồ nhà xếp chồng: đồ bên dưới bị nhấc đi thì đồ bên trên rơi xuống chỗ đỡ gần nhất
  // (đồ còn lại bên dưới, hoặc mặt đĩa). Trả về hộp sau khi rơi và độ rơi dy (toạ độ nhóm đĩa).
  function settle(bal, side, present) {
    const all = items.filter(it => it.home && it.home.bal === bal && it.home.side === side);
    const box = new Map(all.map(it => [it, homeBox(it)]));
    const tol = 4, overlap = (a, b) => Math.min(a.x2, b.x2) - Math.max(a.x1, b.x1) > 2;
    // Đồ nào trong hình sách không đứng trên đồ khác là đứng trên đĩa; mặt đĩa = đáy thấp nhất của chúng.
    const onPan = all.filter(it => !all.some(o => o !== it && overlap(box.get(it), box.get(o)) && Math.abs(box.get(o).y1 - box.get(it).y2) < tol && box.get(o).y2 > box.get(it).y2));
    const floor = onPan.length ? Math.max(...onPan.map(it => box.get(it).y2)) : bal.panInfo[side].rimY;
    const out = new Map();
    [...present].sort((a, b) => box.get(b).y2 - box.get(a).y2).forEach(it => {
      const b = box.get(it);
      if (onPan.includes(it)) { out.set(it, { ...b, oy1: b.y1, dy: 0 }); return; }
      const below = [...out.values()].filter(o => overlap(b, o) && o.oy1 >= b.y2 - tol);
      const rest = below.length ? Math.min(...below.map(o => o.y1)) : floor;
      const dy = Math.max(0, rest - b.y2);
      out.set(it, { x1: b.x1, x2: b.x2, y1: b.y1 + dy, y2: b.y2 + dy, oy1: b.y1, dy });
    });
    return out;
  }
  // Transform (trong cha nhà) của đồ nhà rơi xuống dy theo toạ độ nhóm đĩa.
  function dropM(it, dy) {
    const pan = it.home.parent.closest('[data-bal-pan]');
    const P = DOMMatrix.fromMatrix(pan.getScreenCTM()).inverse().multiply(DOMMatrix.fromMatrix(it.home.parent.getScreenCTM()));
    return P.inverse().translate(0, dy).multiply(P).multiply(parseM(it.home.transform));
  }

  // Bay: đồ nằm ở lớp trên cùng, trượt từ ma trận hiện tại tới đích, rồi gắn vào cha đích.
  async function fly(moves) {
    const list = [];
    moves.forEach(({ it, parent, local }) => {
      const from = rel(it.el);
      flyG.appendChild(it.el);
      setM(it.el, from);
      const pm = rel(parent);
      const lm = typeof local === 'string' || local == null ? parseM(local) : local;
      list.push({ it, parent, local, from, to: pm.multiply(lm) });
    });
    await animate(calm() ? 420 : 520, t => {
      const e = ease(t);
      list.forEach(({ it, from, to }) => {
        const m = new DOMMatrix([0, 1, 2, 3, 4, 5].map(i => {
          const k = 'abcdef'[i];
          return from[k] + (to[k] - from[k]) * e;
        }));
        if (!calm()) m.f -= Math.sin(Math.PI * e) * 40; // cung nhẹ khi bay
        setM(it.el, m);
      });
    });
    list.forEach(({ it, parent, local }) => {
      parent.appendChild(it.el);
      if (typeof local === 'string') it.el.setAttribute('transform', local);
      else if (local == null) it.el.removeAttribute('transform');
      else setM(it.el, local);
    });
  }

  // Sắp lại khay và đĩa (bal, side) theo vị trí mới của đồ, rồi cân phản ứng.
  async function relayout(touched) {
    const moves = [];
    const want = new Map([...trayTargets()].map(([it, m]) => [it, { parent: trayG, local: m }]));
    const keys = new Set();
    items.forEach(it => { if (it.loc) keys.add(`${balances.indexOf(it.loc.bal)}:${it.loc.side}`); });
    touched.forEach(t => keys.add(`${balances.indexOf(t.bal)}:${t.side}`));
    keys.forEach(key => {
      const [bi, side] = key.split(':').map(Number);
      panTargets(balances[bi], side).forEach((v, it) => want.set(it, v));
    });
    want.forEach((v, it) => moves.push({ it, ...v }));
    await fly(moves);
    balances.forEach(b => { b.hints(items); b.update(items); });
  }

  // ── chọn / đặt ──
  let sel = null, busy = false;
  const dropZones = balances.flatMap(b => [-1, 1].map(side => ({ bal: b, side, el: b.hit[side] })));
  const select = it => {
    sel = it;
    items.forEach(o => o.el.classList.toggle('bal-sel', o === it));
    dropZones.forEach(z => z.el.classList.toggle('bal-can-drop', !!it && !(it.loc && it.loc.bal === z.bal && it.loc.side === z.side)));
  };

  async function move(it, to) {
    if (busy) return;
    busy = true;
    select(null);
    const from = it.loc;
    it.loc = to;
    const touched = [from, to].filter(Boolean);
    await relayout(touched);
    busy = false;
    report(it, from, to);
  }

  function sideWord(s) { return s < 0 ? 'trái' : 'phải'; }
  function stateOf(b) {
    const d = b.heavier(items);
    return d === 0 ? `${b.label} thăng bằng, hai bên nặng bằng nhau.` : `${b.label} nghiêng về bên ${sideWord(d)}, bên ${sideWord(d)} nặng hơn.`;
  }
  function report(it, from, to) {
    const act = !to ? `Nhấc ${it.name} xuống khay` : `Đặt ${it.name} lên đĩa ${sideWord(to.side)}${many ? ` của ${to.bal.label}` : ''}`;
    const bals = [...new Set([from?.bal, to?.bal].filter(Boolean))];
    let msg = `${act}: ${bals.map(stateOf).join(' ')}`;
    if (after) {
      const done = bals.find(b => b.heavier(items) === 0 && [-1, 1].every(s => b.on(items, s).length));
      if (done) msg = `${cap1(done.label)} thăng bằng. Bên trái: ${listOf(done.on(items, -1))}. Bên phải: ${listOf(done.on(items, 1))}. Đúng như bé đã tính!`;
    }
    say.innerHTML = cap1(msg);
  }

  items.forEach(it => {
    let down = null, dragging = false;
    it.el.addEventListener('pointerdown', e => {
      if (busy || !balances.length) return;
      e.stopPropagation();
      down = { x: e.clientX, y: e.clientY, m: rel(it.el), p: svgPt(e) };
      dragging = false;
      try { it.el.setPointerCapture?.(e.pointerId); } catch { /* sự kiện giả lập */ }
    });
    it.el.addEventListener('pointermove', e => {
      if (!down || busy) return;
      if (!dragging && Math.hypot(e.clientX - down.x, e.clientY - down.y) < 8) return;
      if (!dragging) { dragging = true; select(it); flyG.appendChild(it.el); }
      const p = svgPt(e);
      setM(it.el, new DOMMatrix().translate(p.x - down.p.x, p.y - down.p.y).multiply(down.m));
      const z = zoneAt(p);
      dropZones.forEach(d => d.el.classList.toggle('bal-near', d === z && d.el.classList.contains('bal-can-drop')));
    });
    it.el.addEventListener('pointerup', async e => {
      if (!down) return;
      e.stopPropagation();
      const wasDrag = dragging;
      down = null; dragging = false;
      dropZones.forEach(d => d.el.classList.remove('bal-near'));
      if (busy) return;
      if (wasDrag) {
        const p = svgPt(e), z = zoneAt(p);
        if (z && !(it.loc && it.loc.bal === z.bal && it.loc.side === z.side)) return move(it, { bal: z.bal, side: z.side });
        if (p.y > trayY - 10 && it.loc) return move(it, null);
        select(null);
        return relayout(it.loc ? [it.loc] : []);
      }
      // chạm
      if (sel && sel !== it && it.loc) return move(sel, { bal: it.loc.bal, side: it.loc.side });
      if (it.loc) return move(it, null);                      // trên đĩa: nhấc xuống khay
      if (sel === it) { select(null); say.innerHTML = 'Bỏ chọn rồi.'; return; }
      select(it);
      say.innerHTML = `Đặt ${it.name} lên đĩa nào? Chạm đĩa cân.`;
    });
  });
  dropZones.forEach(z => z.el.addEventListener('pointerup', e => {
    if (!sel || busy) return;
    e.stopPropagation();
    if (sel.loc && sel.loc.bal === z.bal && sel.loc.side === z.side) return;
    move(sel, { bal: z.bal, side: z.side });
  }));

  function svgPt(e) { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
  function zoneAt(p) {
    return dropZones.find(z => {
      const r = z.el.getBBox(), m = rel(z.el);
      const a = new DOMPoint(r.x, r.y).matrixTransform(m), b = new DOMPoint(r.x + r.width, r.y + r.height).matrixTransform(m);
      return p.x >= Math.min(a.x, b.x) && p.x <= Math.max(a.x, b.x) && p.y >= Math.min(a.y, b.y) && p.y <= Math.max(a.y, b.y);
    });
  }

  // Cân đồng hồ: chạm đồ để nhấc lên / đặt lại (như trước).
  dials.forEach(sc => sc.items.forEach(item => {
    item.classList.add('bal-item');
    item.addEventListener('click', () => {
      const lifted = item.classList.toggle('bal-lifted');
      sc.update();
      const name = item.dataset.name || 'đồ vật';
      const act = lifted ? `Nhấc ${name} xuống` : `Đặt ${name} lại lên cân`;
      let msg = `${act}: ${sc.explain(item, lifted, after)}`;
      if (after && cfg.until?.dial != null && Math.abs(sc.sum() - cfg.until.dial) < 1) msg += ' Đúng như bé đã tính!';
      say.innerHTML = msg;
    });
  }));

  // Lúc mở: đồ ngoài cân và đồ trong `start` nằm sẵn trong khay.
  const start = new Set(cfg.start || []);
  items.forEach(it => { if (it.loc && start.has(it.name)) it.loc = null; });
  const init = [];
  trayTargets().forEach((m, it) => { trayG.appendChild(it.el); setM(it.el, m); init.push(it); });
  balances.forEach(b => { b.hints(items); b.update(items, true); });
  say.innerHTML = after
    ? 'Bé đã tính đúng. Giờ cân thử để kiểm chứng!'
    : balances.length ? 'Thử nhấc một đồ vật xuống khay, hoặc đặt đồ lên đĩa khác, xem cân thay đổi thế nào!' : 'Chạm đồ vật trên cân để nhấc xuống, chạm lần nữa để đặt lại.';
}

const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
function listOf(its) {
  const counts = new Map();
  its.forEach(it => counts.set(it.name, (counts.get(it.name) || 0) + 1));
  return [...counts].map(([n, c]) => (c > 1 ? `${c} ${n}` : n)).join(', ');
}
function parseM(tr) {
  if (!tr) return new DOMMatrix();
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('transform', tr);
  const list = g.transform.baseVal;
  return list.numberOfItems ? DOMMatrix.fromMatrix(list.consolidate().matrix) : new DOMMatrix();
}
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

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

// Lò xo tắt dần từ `start`: đòn cân / kim lắc nhẹ rồi dừng, như cân thật (máy tắt hiệu ứng: êm, không lắc).
function spring(svg, start, draw) {
  let value = start, speed = 0, target = start, raf = 0;
  function step() {
    const damp = calm() ? 0.6 : 0.86;
    speed = (speed + (target - value) * 0.08) * damp;
    value += speed;
    draw(value);
    if (Math.abs(target - value) > 1e-4 * (Math.abs(target) + 1) || Math.abs(speed) > 1e-4) raf = requestAnimationFrame(step);
    else { value = target; draw(value); raf = 0; }
  }
  return (to, now) => {
    target = to;
    if (now) { value = to; speed = 0; draw(value); return; }
    if (!raf && svg.isConnected) raf = requestAnimationFrame(step);
  };
}

// Nhãn "a)", "b)"… là chữ đứng ngay trước cân trong hình.
const tagOf = el => {
  const t = el.closest('svg > g')?.previousElementSibling?.textContent?.trim() || '';
  return /^[a-e]\)$/.test(t) ? t : '';
};

function makeBalance(el, svg) {
  const arm = +el.dataset.arm, post = +el.dataset.post;
  const rots = [...el.querySelectorAll('[data-bal-rot]')];
  const k = Math.abs(svg.getScreenCTM().inverse().multiply(el.getScreenCTM()).a);
  // Đĩa: nhóm [data-bal-pan] đầu tiên mỗi bên là hình cái đĩa (vẽ trước đồ).
  const panInfo = {}, extra = {}, hit = {};
  [-1, 1].forEach(side => {
    const shape = el.querySelector(`[data-bal-pan="${side}"]`);
    const bb = shape.getBBox();
    panInfo[side] = { cx: bb.x + bb.width / 2, rimY: bb.y, w: bb.width };
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('data-bal-pan', side);
    g.setAttribute('transform', shape.getAttribute('transform') || '');
    const pw = Math.max(bb.width, 60);
    g.innerHTML = `<rect class="bal-drop" x="${bb.x - 10}" y="${bb.y - pw * 1.1}" width="${bb.width + 20}" height="${pw * 1.1 + 24}" rx="14"/>`;
    el.appendChild(g);
    extra[side] = g;
    hit[side] = g.firstElementChild;
  });
  const pans = [...el.querySelectorAll('[data-bal-pan]')];
  const hintEls = [...el.querySelectorAll('[data-bal-hint]')];

  const on = (items, side) => items.filter(it => it.loc && it.loc.bal === api && it.loc.side === side);
  const sum = (items, side) => on(items, side).reduce((s, it) => s + it.g, 0);
  const heavier = items => Math.sign(sum(items, 1) - sum(items, -1));

  // Góc lúc đầu: đúng như hình sách (đọc từ transform của đòn).
  // Đĩa trong hình sách vẽ sẵn ở góc a0 (cân nghiêng như sách), nên dịch đĩa tương đối so với a0.
  const m0 = /rotate\(([-\d.]+)/.exec(rots[0]?.getAttribute('transform') || '');
  const a0 = m0 ? +m0[1] * Math.PI / 180 : 0;
  const moveTo = spring(svg, a0, angle => {
    const deg = angle * 180 / Math.PI;
    rots.forEach(g => g.setAttribute('transform', `rotate(${deg.toFixed(2)} 0 ${-post})`));
    pans.forEach(g => {
      const sg = +g.dataset.balPan;
      const dx = sg * arm * (Math.cos(angle) - Math.cos(a0)), dy = sg * arm * (Math.sin(angle) - Math.sin(a0));
      g.setAttribute('transform', `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
    });
  });

  const api = {
    el, k, panInfo, extra, hit, tag: tagOf(el), label: 'cân', on, heavier,
    panW: panInfo[1].w * k,
    update: (items, now) => moveTo(Math.atan2(DROP * heavier(items), arm), now),
    hints: items => hintEls.forEach(h => {
      const side = +h.closest('[data-bal-pan]').dataset.balPan;
      h.style.display = on(items, side).length ? 'none' : '';
    }),
  };
  return api;
}

function makeDial(el, svg) {
  const needle = el.querySelector('[data-dial-needle]');
  const items = [...el.querySelectorAll('[data-bal-item]')];
  const frac0 = +needle?.dataset.dialNeedle || 0;
  const cy = +needle?.dataset.cy || 0;
  const onPan = item => !item.classList.contains('bal-lifted');
  const sum = () => items.filter(onPan).reduce((s, i) => s + +i.dataset.g, 0);
  const full = sum();
  // Số gam một vòng mặt số, suy từ hình sách: kim chỉ frac0 vòng khi đủ đồ trên đĩa.
  const perTurn = frac0 > 0 ? full / frac0 : 0;

  const moveTo = spring(svg, full, grams => {
    if (!needle || !perTurn) return;
    const deg = 360 * (grams / perTurn - frac0);
    needle.setAttribute('transform', `rotate(${deg.toFixed(2)} 0 ${cy})`);
  });

  function explain(item, lifted, after) {
    const g = sum();
    // Chế độ kiểm chứng (bé đã làm đúng) mới đọc số trên mặt cân; không thì chỉ tả kim chuyển động.
    if (after) return g === 0 ? 'đĩa trống, kim chỉ số 0.' : `kim chỉ ${String(g / 1000).replace('.', ',')} kg.`;
    if (g === 0) return 'đĩa trống nên kim quay về vạch 0 trên cùng.';
    if (lifted) return 'đĩa nhẹ đi nên kim quay lùi lại.';
    return `kim quay tới vạch chỉ cân nặng của ${item.dataset.name || 'đồ vật'}. Bé đọc xem kim chỉ số nào?`;
  }

  return { items, sum, update: () => moveTo(sum()), explain };
}

/** Quả cân vẽ bằng JS (quả cân để sẵn trong khay), giữa đáy tại (0, 0), rộng w. */
function weightSvg(label, w) {
  const h = w * 0.9, bt = h * 0.78, tw = w * 0.36, y0 = -bt, fs = Math.max(12, w * 0.3);
  const ink = '#3F3A40', metal = '#B8C2CC';
  return `<rect x="${-w * .2}" y="${-h}" width="${w * .4}" height="${h * .14}" rx="${h * .05}" fill="${metal}" stroke="${ink}" stroke-width="3"/>`
    + `<rect x="${-w * .12}" y="${-h + h * .12}" width="${w * .24}" height="${h * .12}" fill="${metal}" stroke="${ink}" stroke-width="3"/>`
    + `<path d="M${-tw},${y0} H${tw} Q${tw + 4},${y0} ${tw + 6},${y0 + 6} L${w / 2},-6 Q${w / 2 + 1},0 ${w / 2 - 6},0 H${-w / 2 + 6} Q${-w / 2 - 1},0 ${-w / 2},-6 L${-tw - 6},${y0 + 6} Q${-tw - 4},${y0} ${-tw},${y0} Z" fill="${metal}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>`
    + `<text x="2" y="${-bt * 0.34 + fs * 0.36}" font-size="${fs}" font-weight="700" fill="${ink}" text-anchor="middle" font-family="Quicksand, sans-serif">${label}</text>`;
}

function injectStyles() {
  if (document.getElementById('bal-styles')) return;
  const style = document.createElement('style');
  style.id = 'bal-styles';
  style.textContent = `
    .bal-open {
      display: block; margin: 6px auto 0; padding: 4px 12px;
      border: 1.5px solid #F59E0B; border-radius: 999px; background: #FFFBEB; color: #92400E;
      font: 700 0.8rem Quicksand, sans-serif; cursor: pointer;
    }
    .bal-open:hover { background: #FEF3C7; }
    .bal-locked { display: none !important; }
    .gw-app .gw-pin-zone .gw-card-has-img > .bal-open { grid-column: 2; }
    .bal-cta {
      display: block; margin: 8px auto 0; padding: 8px 18px;
      border: 2px solid #F59E0B; border-radius: 999px; background: #FFFBEB; color: #92400E;
      font: 700 1rem Quicksand, sans-serif; cursor: pointer; animation: bal-pop .5s ease-out;
    }
    @keyframes bal-pop { from { transform: scale(.85); opacity: 0; } to { transform: none; opacity: 1; } }
    .bal-overlay {
      position: fixed; inset: 0; z-index: 5000;
      background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: center; justify-content: center; padding: 12px;
    }
    .bal-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      box-sizing: border-box; width: min(1100px, 100%); min-width: 0; max-height: 100%; overflow: auto;
      padding: 0.8rem 1rem 1rem; display: flex; flex-direction: column; gap: 0.6rem;
    }
    .bal-head { display: flex; align-items: center; gap: 0.5rem; }
    .bal-title { flex: 1; font: 700 0.95rem Quicksand, sans-serif; color: #334155; }
    .bal-btn {
      flex: none; height: 2.2rem; padding: 0 0.9rem; border-radius: 1.1rem;
      border: 1.5px solid #CBD5E1; background: #fff; color: #1e293b;
      font: 700 0.9rem Quicksand, sans-serif; cursor: pointer;
    }
    .bal-close { width: 2.2rem; padding: 0; }
    .bal-figure { min-width: 0; }
    .bal-figure svg { display: block; width: 100%; height: auto; max-height: 70vh; max-height: 70dvh; touch-action: none; user-select: none; -webkit-user-select: none; }
    .bal-say {
      text-align: center; font: 700 1.05rem Quicksand, sans-serif; color: #0F766E;
      background: #F0FDFA; border-radius: 0.75rem; padding: 0.5rem 0.8rem;
    }
    .bal-tray { fill: #F8FAFC; stroke: #CBD5E1; stroke-width: 2; stroke-dasharray: 8 6; }
    .bal-tray-label { font: 700 16px Quicksand, sans-serif; fill: #94A3B8; }
    .bal-drop { fill: transparent; stroke: none; pointer-events: none; }
    .bal-drop.bal-can-drop { pointer-events: all; stroke: #94A3B8; stroke-width: 3; stroke-dasharray: 10 8; }
    .bal-drop.bal-near { fill: rgba(245, 158, 11, .12); stroke: #F59E0B; stroke-dasharray: none; }
    .bal-item { cursor: pointer; }
    .bal-item:hover { filter: brightness(1.06); }
    .bal-item.bal-sel { filter: drop-shadow(0 0 6px #F59E0B) drop-shadow(0 0 2px #F59E0B); }
    [data-dial] .bal-item { transition: transform .35s ease, opacity .35s ease; }
    [data-dial] .bal-item.bal-lifted { transform: translateY(-${LIFT}px); opacity: .3; }
  `;
  document.head.appendChild(style);
}
