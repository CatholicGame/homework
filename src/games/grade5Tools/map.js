/**
 * 📍 Bản đồ tỉ lệ (Toán 5 Tập Hai, Bài 37): bản đồ tự vẽ (công viên, đường tàu giữa hai thành phố) có đoạn AB,
 * thước kẻ đặt dưới AB và một băng đo đỏ kéo được từ A (bước 0,5 cm). Ô tỉ lệ "TỈ LỆ 1 : n" ở góc bản đồ.
 * Bên phải (ngang) hoặc bên dưới (dọc) là vùng chừa sẵn cho các dòng tính (lines), nên hình không bị dời khi hiện lời giải.
 *
 * createMap(host, { scale, ab, scene: 'park' | 'route', measure, names, what })
 *   measure: true → em kéo chấm đỏ để đo (sự kiện 'measure', giá trị cm); false → băng đo đã nằm đủ AB.
 *   t.measureTo(cm) thầy kéo; t.seg(cm, names) vẽ thêm một đoạn mới (tính từ độ dài thật ra bản đồ);
 *   t.lines([...]) ghi các dòng tính; t.tape độ dài đang đo (cm).
 */

import { createCanvas, anim } from '../grade4Tools/canvas.js';
import { INK, sfx } from '../grade4Tools/frame.js';
import { fmt } from '../grade4Tools/num.js';
import { sleep } from '../grade3Drills/kit.js';
import { dec } from './num.js';

export function createMap(host, { scale = 1000, ab = 6, scene = 'park', measure = false, names = ['A', 'B'], what = '', tape = null, hideB = false } = {}) {
  const t = createCanvas(host, { bg: '#fff' });
  const r = t.svg.getBoundingClientRect();
  const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(1700, Math.max(380, (1000 * r.height) / r.width))) : 560;
  t.frame(0, 0, 1000, H);
  const tall = H > 820;
  // vùng bản đồ và vùng dòng tính
  const lh = Math.min(H * 0.32, 300); // dọc: vùng dòng tính bên dưới
  const M = tall ? { x: 10, y: 10, w: 980, h: H - lh - 20 } : { x: 10, y: 10, w: 600, h: H - 20 };
  const L = tall ? { x: 30, y: M.y + M.h + 10, w: 940, h: lh - 10 } : { x: 630, y: 20, w: 360, h: H - 40 };
  const maxCm = Math.max(ab, 1);
  const RN = Math.ceil(maxCm) + 1; // số cm trên thước
  const px = Math.min((M.w * 0.82) / RN, 110); // 1 cm trên bản đồ = px đơn vị vẽ
  const ax = M.x + (M.w - RN * px) / 2, ay = M.y + M.h * 0.42;
  const bx = ax + ab * px;
  t.px = px; t.tape = tape ?? (measure ? 0 : ab);
  let showB = !hideB;
  let locked = false;

  const tree = (x, y, s) => `<g><rect x="${x - s * 0.12}" y="${y}" width="${s * 0.24}" height="${s * 0.5}" fill="#92400E"/><circle cx="${x}" cy="${y - s * 0.1}" r="${s * 0.42}" fill="#22C55E" stroke="${INK}" stroke-width="2"/></g>`;
  const house = (x, y, s, c) => `<g><rect x="${x - s / 2}" y="${y - s * 0.6}" width="${s}" height="${s * 0.6}" fill="${c}" stroke="${INK}" stroke-width="2"/><path d="M${x - s * 0.62} ${y - s * 0.58} L${x} ${y - s * 1.05} L${x + s * 0.62} ${y - s * 0.58}Z" fill="#DC2626" stroke="${INK}" stroke-width="2"/></g>`;
  function backdrop() {
    let g = `<rect x="${M.x}" y="${M.y}" width="${M.w}" height="${M.h}" rx="18" fill="${scene === 'park' ? '#DCFCE7' : '#FEF3C7'}" stroke="#A3A3A3" stroke-width="3"/>`;
    g += `<clipPath id="mapclip"><rect x="${M.x}" y="${M.y}" width="${M.w}" height="${M.h}" rx="18"/></clipPath><g clip-path="url(#mapclip)">`;
    const s = Math.min(M.h, M.w) / 9;
    if (scene === 'park') {
      g += `<ellipse cx="${M.x + M.w * 0.8}" cy="${M.y + M.h * 0.78}" rx="${M.w * 0.16}" ry="${M.h * 0.13}" fill="#7DD3FC" stroke="#0284C7" stroke-width="3"/>`;
      g += `<path d="M${M.x} ${M.y + M.h * 0.7} C ${M.x + M.w * 0.3} ${M.y + M.h * 0.62}, ${M.x + M.w * 0.5} ${M.y + M.h * 0.95}, ${M.x + M.w} ${M.y + M.h * 0.9}" fill="none" stroke="#FDE68A" stroke-width="${s * 0.5}"/>`;
      g += `<rect x="${ax}" y="${ay - M.h * 0.24}" width="${ab * px}" height="${M.h * 0.24}" fill="#BBF7D0" stroke="#16A34A" stroke-width="3"/>`;
      for (let k = 0; k < Math.max(2, Math.floor(ab)); k++) g += `<circle cx="${ax + (k + 0.5) * (ab * px) / Math.max(2, Math.floor(ab))}" cy="${ay - M.h * 0.12}" r="${Math.min(14, px * 0.18)}" fill="#F472B6" stroke="${INK}" stroke-width="1.5"/>`;
      [[0.08, 0.2], [0.14, 0.85], [0.92, 0.2], [0.55, 0.88], [0.32, 0.9]].forEach(([fx, fy]) => { g += tree(M.x + M.w * fx, M.y + M.h * fy, s); });
    } else {
      g += `<path d="M${M.x + M.w * 0.62} ${M.y} C ${M.x + M.w * 0.5} ${M.y + M.h * 0.35}, ${M.x + M.w * 0.75} ${M.y + M.h * 0.6}, ${M.x + M.w * 0.6} ${M.y + M.h}" fill="none" stroke="#7DD3FC" stroke-width="${s * 0.45}"/>`;
      g += house(ax - s * 0.2, ay - s * 0.5, s * 0.9, '#FDE68A') + house(ax + s * 0.6, ay - s * 0.3, s * 0.7, '#BFDBFE');
      g += house(bx + s * 0.2, ay - s * 0.5, s * 0.9, '#FBCFE8') + house(bx - s * 0.6, ay - s * 0.3, s * 0.7, '#DDD6FE');
      [[0.1, 0.85], [0.3, 0.2], [0.85, 0.85], [0.45, 0.82]].forEach(([fx, fy]) => { g += tree(M.x + M.w * fx, M.y + M.h * fy, s * 0.8); });
    }
    g += '</g>';
    // ô tỉ lệ
    const fsS = Math.min(34, M.w / 18);
    g += `<g><rect x="${M.x + M.w - fsS * 9.2}" y="${M.y + 10}" width="${fsS * 9}" height="${fsS * 1.6}" rx="8" fill="#fff" stroke="${INK}" stroke-width="2"/>
      <text x="${M.x + M.w - fsS * 4.7}" y="${M.y + 10 + fsS * 1.12}" class="g4v-t" font-size="${fsS}">TỈ LỆ 1 : ${fmt(scale)}</text></g>`;
    return g;
  }
  function ruler() {
    const n = RN;
    const top = ay + 22, h = Math.min(70, px * 0.75);
    let g = `<g class="mp-ruler"><rect x="${ax - 18}" y="${top}" width="${n * px + 36}" height="${h}" rx="6" fill="#FEF08A" stroke="${INK}" stroke-width="2.5"/>`;
    for (let k = 0; k <= n * 2; k++) {
      const x = ax + (k * px) / 2, big = k % 2 === 0;
      g += `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + (big ? h * 0.45 : h * 0.25)}" stroke="${INK}" stroke-width="${big ? 2.5 : 1.5}"/>`;
      if (big) g += `<text x="${x}" y="${top + h * 0.88}" class="g4v-t" font-size="${Math.min(h * 0.42, px * 0.45)}">${k / 2}</text>`;
    }
    return g + '</g>';
  }
  const fsN = Math.min(44, px * 0.6);
  function pin(x, nm, c = '#DC2626') {
    return `<g><circle cx="${x}" cy="${ay}" r="${Math.min(13, px * 0.16)}" fill="${c}" stroke="#fff" stroke-width="3"/><text x="${x}" y="${ay - 22}" class="g4v-t" font-size="${fsN}" style="paint-order:stroke;stroke:#fff;stroke-width:7px">${nm}</text></g>`;
  }
  const extra = []; // các đoạn vẽ thêm
  function draw() {
    let g = backdrop();
    if (showB) g += `<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${ay}" stroke="${INK}" stroke-width="5" ${scene === 'route' ? 'stroke-dasharray="16 10"' : ''}/>`;
    if (what) g += `<text x="${(ax + bx) / 2}" y="${ay - (scene === 'park' ? M.h * 0.26 : 60)}" class="g4v-t" font-size="${Math.min(34, fsN * 0.8)}" fill="#166534" style="paint-order:stroke;stroke:#fff;stroke-width:6px">${what}</text>`;
    g += pin(ax, names[0]) + (showB ? pin(bx, names[1]) : '');
    extra.forEach((e) => { g += e; });
    g += ruler();
    // băng đo đỏ
    const tx = ax + t.tape * px;
    g += `<g class="mp-tape"><rect x="${ax}" y="${ay - 8}" width="${Math.max(0, tx - ax)}" height="16" rx="6" fill="#EF4444" opacity="0.85"/>
      ${measure ? `<circle class="mp-h" cx="${tx}" cy="${ay}" r="${Math.min(30, px * 0.36)}" fill="#EF4444" stroke="#fff" stroke-width="5" style="cursor:grab"/>` : ''}
      <text x="${tx}" y="${ay + 22 + Math.min(70, px * 0.75) + fsN}" class="g4v-t" font-size="${fsN}" fill="#DC2626" style="paint-order:stroke;stroke:#fff;stroke-width:7px">${t.tape ? `${dec(t.tape)} cm` : ''}</text></g>`;
    g += `<g class="mp-lines"></g>`;
    t.draw(g);
    paintLines(false);
  }

  let lineList = [];
  function paintLines(animate) {
    const box = t.q('.mp-lines');
    if (!box) return;
    if (!lineList.length) { box.innerHTML = ''; return; }
    const long = Math.max(...lineList.map((l) => l.replace(/<[^>]+>/g, '').length));
    const size = Math.min(tall ? 56 : 40, L.w / (long * 0.5), L.h / (lineList.length * 1.45));
    const y0 = L.y + size;
    box.innerHTML = lineList.map((l, i) => `<text x="${tall ? L.x + L.w / 2 : L.x}" y="${y0 + i * size * 1.45}" class="g4v-t" font-size="${size}" style="text-anchor:${tall ? 'middle' : 'start'}">${l}</text>`).join('');
    if (animate) [...box.children].slice(-animate).forEach((e, k) => e.animate([{ opacity: 0, transform: 'translateX(-14px)' }, { opacity: 1, transform: 'none' }], { duration: anim(350), delay: k * anim(250), fill: 'backwards' }));
  }
  /** Ghi các dòng tính (thay danh sách); các dòng mới hiện lần lượt. */
  t.lines = async (list) => {
    const added = Math.max(1, list.length - lineList.length);
    lineList = list;
    paintLines(added);
    await sleep(anim(300 + added * 250));
  };

  /** Thầy kéo băng đo tới cm. */
  t.measureTo = async (cm, ms = 900) => {
    const from = t.tape, t0 = performance.now(), dur = anim(ms);
    await new Promise((res) => {
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur);
        t.tape = from + (cm - from) * k;
        if (k >= 1) t.tape = cm;
        draw();
        if (k < 1) requestAnimationFrame(step); else res();
      };
      requestAnimationFrame(step);
    });
    sfx.ding?.();
    t.emit('measure', t.tape);
  };
  /** Vẽ thêm đoạn MN dài cm (bản đồ) dưới thước, mọc dần từ trái sang. */
  t.seg = async (cm, nm = ['M', 'N']) => {
    const y = Math.min(M.y + M.h - 30, ay + 22 + Math.min(70, px * 0.75) + fsN * 2.4);
    const x2 = ax + cm * px;
    const html = `<g class="mp-seg"><line x1="${ax}" y1="${y}" x2="${x2}" y2="${y}" stroke="#7C3AED" stroke-width="7"/>
      <circle cx="${ax}" cy="${y}" r="9" fill="#7C3AED"/><circle cx="${x2}" cy="${y}" r="9" fill="#7C3AED"/>
      <text x="${ax - 14}" y="${y + fsN * 0.35}" class="g4v-t" font-size="${fsN}" fill="#7C3AED" style="text-anchor:end">${nm[0]}</text>
      <text x="${x2 + 14}" y="${y + fsN * 0.35}" class="g4v-t" font-size="${fsN}" fill="#7C3AED" style="text-anchor:start">${nm[1]}</text>
      <text x="${(ax + x2) / 2}" y="${y - 16}" class="g4v-t" font-size="${fsN * 0.85}" fill="#7C3AED" style="paint-order:stroke;stroke:#fff;stroke-width:6px">${dec(cm)} cm</text></g>`;
    extra.push(html);
    draw();
    const el = t.q('.mp-seg:last-of-type line');
    sfx.swish?.();
    if (el) { el.style.transformBox = 'fill-box'; el.style.transformOrigin = 'left center'; await el.animate([{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: anim(800), easing: 'ease-out' }).finished; }
  };
  t.lock = (on = true) => { locked = on; };
  /** Hiện điểm B và đoạn AB (câu tính ngược: tìm ra rồi mới vẽ). */
  t.showB = () => { showB = true; draw(); };

  // kéo chấm đỏ
  if (measure) {
    let drag = false;
    const toX = (e) => { const p = t.svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(t.svg.getScreenCTM().inverse()).x; };
    t.svg.addEventListener('pointerdown', (e) => {
      if (locked || !e.target.closest('.mp-h, .mp-ruler, .mp-tape')) return;
      drag = true; t.svg.setPointerCapture?.(e.pointerId);
    });
    t.svg.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const v = Math.max(0, Math.min(RN, Math.round(((toX(e) - ax) / px) * 2) / 2));
      if (v !== t.tape) { t.tape = v; draw(); sfx.pop?.(Math.min(9, Math.round(v))); }
    });
    const up = () => { if (!drag) return; drag = false; t.emit('measure', t.tape); };
    t.svg.addEventListener('pointerup', up);
    t.svg.addEventListener('pointercancel', up);
  }
  draw();
  t.ab = ab; t.scale = scale;
  return t;
}
