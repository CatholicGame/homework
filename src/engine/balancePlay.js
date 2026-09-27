/**
 * ⚖️ Thử cân — bé nhấc đồ khỏi đĩa cân / đặt lại và thấy cân phản ứng.
 *
 * Chỉ là đồ dùng dạy học: không ghi vào ô trả lời, không chấm điểm. Hình
 * trong câu hỏi giữ nguyên như sách; nút "⚖️ Thử cân" dưới hình mở một lớp
 * phủ lớn với chính hình SVG đó (tải lại dạng inline để điều khiển được).
 *
 *   q.balancePlay = true
 *
 * Hình SVG phải do scripts/redraw vẽ, có các móc data-*:
 *   Cân đĩa — balance_scale() (kit_measure.py):
 *     [data-bal]        một cái cân (data-arm, data-post: nửa đòn, độ cao trục)
 *     [data-bal-rot]    đòn cân + kim, quay quanh (0, -post)
 *     [data-bal-pan]    đĩa trái (-1) / phải (1) và đồ trên nó, đi theo đầu đòn
 *   Cân đồng hồ — kitchen_scale() + round_dial() (kit_w1.py):
 *     [data-dial]         một cái cân
 *     [data-dial-needle]  kim, vẽ ở vị trí sách (giá trị = phần vòng), data-cy = tâm mặt số
 *   Cả hai — bal_item() (kit_w1.py):
 *     [data-bal-item]   đồ nhấc được, data-g = cân nặng (gam), data-name = tên gọi
 *
 * Cân đĩa như cân thật: lệch bao nhiêu cũng nghiêng hết cỡ về bên nặng hơn.
 * Cân đồng hồ: kim quay theo tổng cân nặng trên đĩa (tỉ lệ suy từ hình sách).
 * Không hiện số gam — để không lộ đáp án.
 */

const DROP = 26;        // đầu đòn lên/xuống bao nhiêu khi nghiêng hết cỡ (đơn vị hình)
const LIFT = 46;        // đồ đã nhấc: nâng lên khỏi đĩa bao nhiêu
const HEADROOM = 120;   // thêm vào đỉnh viewBox (đơn vị SVG gốc)
const SVG_CACHE = new Map();

function loadSvg(url) {
  if (!SVG_CACHE.has(url)) SVG_CACHE.set(url, fetch(url).then(r => r.text()));
  return SVG_CACHE.get(url);
}

export function attachBalancePlay(root, q) {
  const img = root.querySelector('.e3-question-card > .e3-q-img');
  if (!img || !q.img) return;
  injectStyles();
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'bal-open';
  btn.textContent = '⚖️ Thử cân';
  // Sau hình (nút "📷 Ảnh gốc" của lightbox.js chèn ngay sau hình, trước nút này).
  img.after(btn);
  btn.onclick = () => openOverlay(q.img);
}

async function openOverlay(url) {
  const overlay = document.createElement('div');
  overlay.className = 'bal-overlay';
  overlay.innerHTML = `
    <div class="bal-panel" role="dialog" aria-label="Thử cân">
      <div class="bal-head">
        <span class="bal-title">⚖️ Chạm vào đồ vật trên đĩa cân để nhấc xuống, chạm lần nữa để đặt lại.</span>
        <button type="button" class="bal-btn bal-reset">↺ Đặt lại</button>
        <button type="button" class="bal-btn bal-close" aria-label="Đóng">✕</button>
      </div>
      <div class="bal-figure"></div>
      <div class="bal-say" aria-live="polite">Thử nhấc một đồ vật xuống xem cân thay đổi thế nào nhé!</div>
    </div>`;
  document.body.appendChild(overlay);
  const close = () => { overlay.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  overlay.querySelector('.bal-close').onclick = close;

  const fig = overlay.querySelector('.bal-figure');
  fig.innerHTML = await loadSvg(url);
  const svg = fig.querySelector('svg');
  if (!svg) return;
  svg.removeAttribute('width');
  svg.removeAttribute('height');
  // Chừa chỗ phía trên cho đồ cao (hộp sữa) khi được nhấc lên.
  const [x, y, w, h] = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);
  svg.setAttribute('viewBox', `${x} ${y - HEADROOM} ${w} ${h + HEADROOM}`);

  const say = overlay.querySelector('.bal-say');
  const scales = [
    ...[...svg.querySelectorAll('[data-bal]')].map(el => makeBalance(el, svg)),
    ...[...svg.querySelectorAll('[data-dial]')].map(el => makeDial(el, svg)),
  ];
  const many = scales.length > 1;

  scales.forEach(sc => sc.items.forEach(item => {
    item.classList.add('bal-item');
    item.addEventListener('click', () => {
      const lifted = item.classList.toggle('bal-lifted');
      sc.update();
      const name = item.dataset.name || 'đồ vật';
      const act = lifted ? `Nhấc ${name} xuống` : `Đặt ${name} lại lên cân`;
      say.textContent = `${act}: ${sc.explain(item, lifted, many && sc.tag ? `cân ${sc.tag}` : 'cân')}`;
    });
  }));
  overlay.querySelector('.bal-reset').onclick = () => {
    scales.forEach(sc => { sc.items.forEach(i => i.classList.remove('bal-lifted')); sc.update(); });
    say.textContent = 'Đã đặt lại mọi thứ như trong sách.';
  };
}

// Lò xo tắt dần từ `start`: đòn cân / kim lắc nhẹ rồi dừng, như cân thật.
function spring(svg, start, draw) {
  let value = start, speed = 0, target = start, raf = 0;
  function step() {
    speed = (speed + (target - value) * 0.08) * 0.86;
    value += speed;
    draw(value);
    if (Math.abs(target - value) > 1e-4 * (Math.abs(target) + 1) || Math.abs(speed) > 1e-4) raf = requestAnimationFrame(step);
    else { value = target; draw(value); raf = 0; }
  }
  return to => {
    target = to;
    if (!raf && svg.isConnected) raf = requestAnimationFrame(step);
  };
}

const onPan = item => !item.classList.contains('bal-lifted');
const sum = items => items.filter(onPan).reduce((s, i) => s + +i.dataset.g, 0);
// Nhãn "a)", "b)"… là chữ đứng ngay trước cân trong hình.
const tagOf = el => el.closest('svg > g')?.previousElementSibling?.textContent?.trim() || '';

function makeBalance(el, svg) {
  const arm = +el.dataset.arm, post = +el.dataset.post;
  const rots = [...el.querySelectorAll('[data-bal-rot]')];
  const pans = [...el.querySelectorAll('[data-bal-pan]')];
  const items = [...el.querySelectorAll('[data-bal-item]')];
  const sideOf = item => +item.closest('[data-bal-pan]').dataset.balPan;
  const heavier = () => Math.sign(sum(items.filter(i => sideOf(i) === 1)) - sum(items.filter(i => sideOf(i) === -1)));

  const moveTo = spring(svg, 0, angle => {
    const deg = angle * 180 / Math.PI;
    rots.forEach(g => g.setAttribute('transform', `rotate(${deg.toFixed(2)} 0 ${-post})`));
    pans.forEach(g => {
      const sg = +g.dataset.balPan;
      const dx = sg * arm * (Math.cos(angle) - 1), dy = sg * arm * Math.sin(angle);
      g.setAttribute('transform', `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
    });
  });

  function explain(item, lifted, scaleName) {
    const side = heavier();
    if (side === 0) return `${scaleName} thăng bằng — hai bên nặng bằng nhau.`;
    const s = side < 0 ? 'trái' : 'phải';
    return `${scaleName} nghiêng về bên ${s} — bên ${s} nặng hơn.`;
  }

  return { items, tag: tagOf(el), update: () => moveTo(Math.atan2(DROP * heavier(), arm)), explain };
}

function makeDial(el, svg) {
  const needle = el.querySelector('[data-dial-needle]');
  const items = [...el.querySelectorAll('[data-bal-item]')];
  const frac0 = +needle?.dataset.dialNeedle || 0;
  const cy = +needle?.dataset.cy || 0;
  const full = sum(items);
  // Số gam một vòng mặt số, suy từ hình sách: kim chỉ frac0 vòng khi đủ đồ trên đĩa.
  const perTurn = frac0 > 0 ? full / frac0 : 0;

  const moveTo = spring(svg, full, grams => {
    if (!needle || !perTurn) return;
    const deg = 360 * (grams / perTurn - frac0);
    needle.setAttribute('transform', `rotate(${deg.toFixed(2)} 0 ${cy})`);
  });

  function explain(item, lifted) {
    if (sum(items) === 0) return 'đĩa trống nên kim quay về vạch 0 trên cùng.';
    if (lifted) return 'đĩa nhẹ đi nên kim quay lùi lại.';
    return `kim quay tới vạch chỉ cân nặng của ${item.dataset.name || 'đồ vật'} — bé đọc xem kim chỉ số nào?`;
  }

  return { items, tag: '', update: () => moveTo(sum(items)), explain };
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
    .gw-app .gw-pin-zone .gw-card-has-img > .bal-open { grid-column: 2; }
    .bal-overlay {
      position: fixed; inset: 0; z-index: 5000;
      background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: center; justify-content: center; padding: 12px;
    }
    .bal-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      width: min(1100px, 100%); max-height: 100%; overflow: auto;
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
    .bal-figure svg { display: block; width: 100%; height: auto; max-height: 70vh; max-height: 70dvh; }
    .bal-say {
      text-align: center; font: 700 1.05rem Quicksand, sans-serif; color: #0F766E;
      background: #F0FDFA; border-radius: 0.75rem; padding: 0.5rem 0.8rem;
    }
    .bal-item { cursor: pointer; transition: transform .35s ease, opacity .35s ease; }
    .bal-item:hover { filter: brightness(1.06); }
    .bal-item.bal-lifted { transform: translateY(-${LIFT}px); opacity: .3; }
  `;
  document.head.appendChild(style);
}
