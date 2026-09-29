/**
 * Cân đĩa SVG điều khiển được — cùng kiểu cân Rô-béc-van trong vở bài tập
 * (balance_scale() ở scripts/redraw/kit_measure.py): đế xanh, trụ, mặt kim nửa
 * vòng, đòn cân quay quanh trục; hai đĩa luôn nằm ngang, chỉ lên/xuống theo đầu đòn.
 * Đĩa trái đựng hàng, đĩa phải đựng quả cân.
 * Như cân thật: lệch ít thì nghiêng ít, lệch nhiều thì nghiêng hết cỡ (chạm chốt chặn);
 * thêm dần bên nhẹ thì đòn nâng dần lên, bằng nhau thì thăng bằng (setTilt nhận số lẻ).
 * Không hiện số — bé phải đọc nhãn quả cân và cộng lại.
 */

import { weightSize, weightSvg, INK } from './weights.js';

const SCALE = '#7FB2DE', SCALE_D = '#4F8FC4', PAN = '#EEF2F6', YELLOW = '#FFD166', RED = '#F07167';
const SW = 2.6;

const W = 480, H = 300;
const CX = W / 2, BASE_Y = H - 8; // tâm đáy đế
const POST = 84;                  // độ cao trục đòn so với đáy
const PIVOT_Y = BASE_Y - POST;
const ARM = 120;                  // nửa khoảng cách hai tâm đĩa
const DROP = 24;                  // đầu đòn lên/xuống khi nghiêng hết cỡ (≈ 11°)
const PAN_W = 144;
const SURFACE = -35;              // mặt đĩa so với đầu đòn (như bản vở: 22 + 10 + 3)
const R = 26;                     // bán kính mặt kim

const st = `stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"`;

/**
 * Vẽ cân vào `host`. tight: bỏ lề hai bên (chỗ để hàng cạnh cân) cho cân to hơn trên màn hẹp.
 * Trả về { setLeft(svg), setRight(items), setStock(svg), setTilt(dir) }.
 * items: [{ id, g }] — quả cân trên đĩa phải (bấm vào để nhấc ra: onRightTap(id)).
 * Đồ trên đĩa trái có data-pid thì bấm vào gọi onLeftTap(pid).
 */
export function mountScale(host, { onRightTap, onLeftTap, tight = false } = {}) {
  const bw = ARM + PAN_W * 0.25;
  const ticks = [-50, -25, 0, 25, 50].map(t => {
    const r = (t * Math.PI) / 180;
    const p = (k) => `${(CX + k * Math.sin(r)).toFixed(1)} ${(PIVOT_Y - k * Math.cos(r)).toFixed(1)}`;
    return `<path d="M${p(R - 3)} L${p(R - 9)}" stroke="${INK}" stroke-width="${SW * 0.6}" stroke-linecap="round"/>`;
  }).join('');
  host.innerHTML = `
    <svg class="g3-scale" viewBox="${tight ? `${CX - 200} 0 400` : `0 0 ${W}`} ${H}" role="img" aria-label="Cân đĩa">
      <g data-stock transform="translate(62 ${BASE_Y}) scale(0.72)"></g>
      <g transform="translate(${CX} ${BASE_Y})">
        <ellipse cx="0" cy="-1" rx="${bw + 22}" ry="5" fill="${INK}" opacity=".12"/>
        <path d="M${-bw - 14},-4 Q${-bw - 12},-17 ${-bw + 12},-18 H${bw - 12} Q${bw + 12},-17 ${bw + 14},-4 Q${bw},0 ${bw - 20},0 H${-bw + 20} Q${-bw},0 ${-bw - 14},-4 Z" fill="${SCALE}" ${st}/>
        <path d="M${-bw + 16},-12 H${-bw * 0.35}" stroke="#fff" stroke-width="${SW}" stroke-linecap="round" opacity=".6"/>
        <path d="M-10,-17 L-7,${-POST} H7 L10,-17 Z" fill="${SCALE_D}" ${st}/>
      </g>
      <path d="M${CX - R},${PIVOT_Y} A${R},${R} 0 0 1 ${CX + R},${PIVOT_Y} Z" fill="#fff" ${st}/>
      ${ticks}
      <g data-beam>
        <path d="M${CX},${PIVOT_Y} L${CX},${PIVOT_Y - R + 6}" stroke="${RED}" stroke-width="${SW * 1.2}" stroke-linecap="round"/>
        <rect class="g3-scale-arm" x="${CX - ARM - 6}" y="${PIVOT_Y - 5}" width="${2 * ARM + 12}" height="10" rx="5" fill="${SCALE_D}" ${st}/>
      </g>
      <circle cx="${CX}" cy="${PIVOT_Y}" r="7" fill="${YELLOW}" ${st}/>
      <g data-pan="-1">${panSvg()}</g>
      <g data-pan="1">${panSvg()}</g>
      <g data-pan-load="-1"></g>
      <g data-pan-load="1"></g>
      <foreignObject class="g3-scale-center" x="${CX - 95}" y="${PIVOT_Y + 14}" width="190" height="${BASE_Y - 18 - PIVOT_Y - 16}">
        <div xmlns="http://www.w3.org/1999/xhtml" class="g3-scale-center-box"></div>
      </foreignObject>
    </svg>`;
  const svg = host.querySelector('svg');
  const beam = svg.querySelector('[data-beam]');
  const pans = { '-1': svg.querySelector('[data-pan="-1"]'), 1: svg.querySelector('[data-pan="1"]') };
  // Đồ trên đĩa vẽ sau cùng (đè lên đòn, đĩa bên kia), đi cùng đĩa.
  const loads = { '-1': svg.querySelector('[data-pan-load="-1"]'), 1: svg.querySelector('[data-pan-load="1"]') };
  let angle = 0, target = 0, raf = 0;

  function place(a) {
    beam.setAttribute('transform', `rotate(${a.toFixed(2)} ${CX} ${PIVOT_Y})`);
    const rad = (a * Math.PI) / 180;
    for (const side of [-1, 1]) {
      const t = `translate(${(CX + side * ARM * Math.cos(rad)).toFixed(1)} ${(PIVOT_Y + side * ARM * Math.sin(rad)).toFixed(1)})`;
      pans[side].setAttribute('transform', t);
      loads[side].setAttribute('transform', `${t} translate(0 ${SURFACE})`);
    }
  }
  function animate() {
    cancelAnimationFrame(raf);
    const from = angle, t0 = performance.now();
    const step = () => {
      // Đọc đồng hồ ngay trong khung hình: mốc thời gian rAF truyền vào có thể sớm hơn t0
      // (đòn vung quá đà) hoặc chậm hẳn (trình duyệt headless) — kẹp về [0, 1].
      const k = Math.max(0, Math.min(1, (performance.now() - t0) / 450));
      const e = 1 - (1 - k) ** 3;
      angle = from + (target - from) * e;
      place(angle);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }
  place(0);

  loads[1].addEventListener('click', (e) => {
    const w = e.target.closest('[data-wid]');
    if (w) onRightTap?.(w.dataset.wid);
  });
  loads[-1].addEventListener('click', (e) => {
    const p = e.target.closest('[data-pid]');
    if (p) onLeftTap?.(p.dataset.pid);
  });

  return {
    /** Chỗ trống trên trụ cân, giữa đòn và đế (nút "Cân xong"…) — co giãn cùng hình cân. */
    center: svg.querySelector('.g3-scale-center-box'),
    /** Hàng hoá trên đĩa trái (chuỗi SVG, gốc toạ độ = mặt đĩa, giữa đĩa). */
    setLeft(inner) { loads[-1].innerHTML = inner; },
    /** Quả cân trên đĩa phải. */
    setRight(items) { loads[1].innerHTML = stackWeights(items); },
    /** Hàng hoá trên đĩa phải (so hai món hàng, không dùng quả cân — quầy rau củ lớp 2). */
    setRightSvg(inner) { loads[1].innerHTML = inner; },
    /** Nhóm SVG đồ trên đĩa (side -1 trái / 1 phải) — đổi toạ độ mặt đĩa ra màn hình để đồ bay đáp đúng chỗ. */
    load(side) { return loads[side]; },
    /** Hàng của quầy để cạnh cân (chuỗi SVG, gốc = giữa đáy). */
    setStock(inner) { svg.querySelector('[data-stock]').innerHTML = inner; },
    /**
     * Độ nghiêng từ -1 (bên trái nặng hơn, hết cỡ) qua 0 (thăng bằng) tới 1 (bên phải nặng hơn, hết cỡ).
     * level: tô xanh đòn cân báo "đã thăng bằng" (mặc định khi tilt = 0).
     */
    setTilt(tilt, level = tilt === 0) {
      target = (Math.atan2(DROP * tilt, ARM) * 180) / Math.PI; // góc dương = đầu phải chúc xuống
      svg.classList.toggle('g3-scale-level', level);
      animate();
    },
  };
}

/** Một đĩa cân: chân đĩa + khớp vàng ở đầu đòn (0,0), lòng đĩa, vành trắng (mặt đĩa ở y = SURFACE). */
function panSvg() {
  const top = -22, rim = top - 10, hw = PAN_W / 2;
  return `
    <rect x="-6" y="${top - 2}" width="12" height="${-top + 2}" fill="${SCALE_D}" ${st}/>
    <circle cx="0" cy="0" r="7" fill="${YELLOW}" ${st}/>
    <path d="M${-hw + 4},${rim} Q${-hw + 12},${top} ${-hw + 30},${top} H${hw - 30} Q${hw - 12},${top} ${hw - 4},${rim} Z" fill="${PAN}" ${st}/>
    <rect x="${-hw - 4}" y="${rim - 3}" width="${PAN_W + 8}" height="6" rx="3" fill="#fff" ${st}/>`;
}

/** Xếp quả cân thành hàng trên mặt đĩa (y = 0), hàng đầy thì chồng lên hàng trên. */
function stackWeights(items) {
  const rows = [[]];
  let rowW = 0;
  for (const it of items) {
    const { w } = weightSize(it.g);
    if (rowW + w > PAN_W - 8 && rows[rows.length - 1].length) { rows.push([]); rowW = 0; }
    rows[rows.length - 1].push(it);
    rowW += w + 3;
  }
  let y = 0;
  let out = '';
  for (const row of rows) {
    const total = row.reduce((s, it) => s + weightSize(it.g).w + 3, -3);
    let x = -total / 2;
    const rowH = Math.max(...row.map(it => weightSize(it.g).h));
    for (const it of row) {
      const { w } = weightSize(it.g);
      out += `<g data-wid="${it.id}" class="g3-w-on-pan" transform="translate(${(x + w / 2).toFixed(1)} ${y})">${weightSvg(it.g)}</g>`;
      x += w + 3;
    }
    y -= rowH + 1;
  }
  return out;
}
