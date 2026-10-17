// Phim bài đọc "Cầu treo", Tuần 34 Tiếng Việt 3: 7 cảnh, đánh số theo câu (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: kĩ sư Brao (thay: áo sơ mi, đeo kính), chú nhện (vẽ riêng ở đây). Cảnh 1 vẽ mặt cắt dòng sông
// để thấy sông sâu, đáy bùn, không dựng được trụ cầu. Hai câu chú thích cuối (Brao người Ai-xơ-len, sông Tuýt ở Ai-xơ-len)
// gộp vào cảnh cầu treo hoàn thành: lá cờ Ai-xơ-len (xanh lá, trắng, cam) và tấm bản đồ đảo Ai-xơ-len có dòng sông.
import { person } from '../cast.js';
import { W, H, svg, at, talkAt, sky, cloud, sun, tree, sparkles, speech, thought, word, leaves, flowers, tufts, LINE } from '../sceneKit.js';

const WATER = '#38BDF8', DEEP = '#0369A1';

/** Chú nhện tròn xinh (x, y tâm thân), run: chân choãi đang chạy, wave: giơ một chân vẫy. */
function spider(x, y, s = 1, { run = false, wave = false } = {}) {
  const legs = [-1, 1].map(k => [0, 1, 2, 3].map(i => {
    const a = (run ? -40 : -30) + i * 28 + (run && i % 2 ? 12 : 0);
    const r = rad => (rad * Math.PI) / 180;
    const x1 = k * 6, y1 = -2 + i * 2.4;
    const x2 = k * (12 + Math.cos(r(a)) * 6), y2 = y1 + Math.sin(r(a)) * 10 - 6;
    const x3 = k * (18 + Math.cos(r(a)) * 4), y3 = y1 + Math.sin(r(a)) * 14 + 4;
    if (wave && k === 1 && i === 0) return `<path d="M${x1} ${y1} Q${x1 + 10} ${y1 - 14} ${x1 + 16} ${y1 - 22}" stroke="#3F3F46" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    return `<path d="M${x1} ${y1} Q${x2.toFixed(1)} ${y2.toFixed(1)} ${x3.toFixed(1)} ${y3.toFixed(1)}" stroke="#3F3F46" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  }).join('')).join('');
  return `<g transform="translate(${x} ${y}) scale(${s})">${legs}
    <ellipse cx="0" cy="4" rx="9" ry="10" fill="#7C3AED" stroke="#3F3F46" stroke-width="1"/>
    <ellipse cx="-3" cy="1" rx="2.4" ry="3.4" fill="#A78BFA"/>
    <circle cx="0" cy="-7" r="7" fill="#8B5CF6" stroke="#3F3F46" stroke-width="1"/>
    <circle cx="-2.6" cy="-8" r="2.2" fill="#fff"/><circle cx="2.6" cy="-8" r="2.2" fill="#fff"/>
    <circle cx="-2.2" cy="-7.8" r="1.1" fill="#1F2937"/><circle cx="3" cy="-7.8" r="1.1" fill="#1F2937"/>
    <path d="M-2.4 -4 Q0 -2 2.4 -4" stroke="#1F2937" stroke-width="1" fill="none" stroke-linecap="round"/></g>`;
}

/** Mạng nhện tâm (cx, cy), bán kính r; vòng tơ là đa giác 8 cạnh. */
function web(cx, cy, r, color = '#F8FAFC') {
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 + 0.2;
    return `<path d="M${cx} ${cy} L${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}" stroke="${color}" stroke-width="1.3"/>`;
  }).join('');
  const rings = [0.25, 0.45, 0.65, 0.85].map(k => `<polygon points="${Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 + 0.2;
    return `${(cx + Math.cos(a) * r * k).toFixed(1)},${(cy + Math.sin(a) * r * k).toFixed(1)}`;
  }).join(' ')}" fill="none" stroke="${color}" stroke-width="1.1"/>`).join('');
  return `<g opacity="0.95">${spokes}${rings}</g>`;
}

/** Cành cây nâu có lá (danh sách điểm làm đường cong, lá dọc cành). */
const branch = (d, leafs = [], w = 7) => `<path d="${d}" stroke="#7C4A21" stroke-width="${w}" fill="none" stroke-linecap="round"/>
  ${leafs.map(([x, y, r = 0], i) => `<g transform="translate(${x} ${y}) rotate(${r})"><g class="sc-sway" style="--d:${i * 0.5}s">
    <path d="M0 0 Q8 -10 0 -20 Q-8 -10 0 0Z" fill="${i % 2 ? '#22C55E' : '#16A34A'}"/></g></g>`).join('')}`;

/** Gió thổi: các nét cong trôi qua. */
const wind = (list) => list.map(([x, y, w], i) => `<path class="sc-drift" style="--d:${i * 1.3}s" d="M${x} ${y} q${w / 3} -8 ${w * 0.66} 0 t${w * 0.34} -2 q6 -2 4 -8" stroke="#E0F2FE" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('');

/** Sóng nước trôi trên mặt sông. */
const ripples = (list, c = '#E0F2FE') => list.map(([x, y], i) => `<path class="sc-drift" style="--d:${i * 0.9}s" d="M${x} ${y} q6 -4 12 0 q6 4 12 0" stroke="${c}" stroke-width="2" fill="none"/>`).join('');

/** Cầu treo nhìn ngang: mặt cầu y, hai tháp ở tx1, tx2 cao tới top, dây cáp võng xuống sag. */
function suspension(tx1, tx2, y, top, sag, { x0 = 0, x1 = W, scale = 1 } = {}) {
  const mid = (tx1 + tx2) / 2;
  const cableY = (x) => {
    if (x <= tx1) return top + (y - 14 - top) * ((tx1 - x) / (tx1 - x0)) ** 1.4;
    if (x >= tx2) return top + (y - 14 - top) * ((x - tx2) / (x1 - tx2)) ** 1.4;
    const t = (x - mid) / (tx2 - mid);
    return sag + (top - sag) * t * t;
  };
  const hangers = [];
  for (let x = x0 + 14; x < x1 - 6; x += 14 * scale) {
    if (Math.abs(x - tx1) < 8 || Math.abs(x - tx2) < 8) continue;
    const cy = cableY(x);
    if (cy < y - 4) hangers.push(`<path d="M${x.toFixed(1)} ${cy.toFixed(1)} V${y}" stroke="#94A3B8" stroke-width="1.2"/>`);
  }
  const tower = (x) => `<rect x="${x - 7 * scale}" y="${top - 6}" width="${14 * scale}" height="${y - top + 30}" fill="#B91C1C" stroke="${LINE}" stroke-width="1"/>
    <rect x="${x - 10 * scale}" y="${top - 12}" width="${20 * scale}" height="8" rx="2" fill="#991B1B" stroke="${LINE}" stroke-width="1"/>
    <rect x="${x - 7 * scale}" y="${(top + y) / 2 - 4}" width="${14 * scale}" height="5" fill="#991B1B"/>`;
  return `<g>${hangers.join('')}
    <path d="M${x0} ${y - 14} Q${(x0 + tx1) / 2} ${(top + y) / 2 + 10} ${tx1} ${top} Q${mid} ${2 * sag - top} ${tx2} ${top} Q${(tx2 + x1) / 2} ${(top + y) / 2 + 10} ${x1} ${y - 14}" stroke="#475569" stroke-width="${3 * scale}" fill="none"/>
    ${tower(tx1)}${tower(tx2)}
    <rect x="${x0}" y="${y}" width="${x1 - x0}" height="${8 * scale}" fill="#A8A29E" stroke="${LINE}" stroke-width="1"/>
    <path d="M${x0} ${y - 6 * scale} H${x1}" stroke="#78716C" stroke-width="1.5"/></g>`;
}

/** Cờ Ai-xơ-len trên cán (x chân cán, y chân). */
const irishFlag = (x, y, h = 60, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-1.5" y="${-h}" width="3" height="${h}" fill="#64748B"/>
  <g class="sc-sway" style="--d:0.4s"><rect x="1.5" y="${-h + 2}" width="13" height="22" fill="#169B62"/><rect x="14.5" y="${-h + 2}" width="13" height="22" fill="#FFFFFF"/>
  <rect x="27.5" y="${-h + 2}" width="13" height="22" fill="#FF883E"/><rect x="1.5" y="${-h + 2}" width="39" height="22" fill="none" stroke="${LINE}" stroke-width="0.8"/></g></g>`;

/** Bờ sông xa có cây (y mép nước bờ bên kia). */
const farBank = (y) => `<path d="M0 ${y} Q120 ${y - 22} 240 ${y - 12} T480 ${y - 14} V${y + 6} H0Z" fill="#65A30D"/>
  ${[90, 150, 330, 400].map((x, i) => tree(x, y - 8, 0.42 + (i % 2) * 0.08, '#4ADE80', '#22C55E')).join('')}`;

export default {
  sentences: true,
  groups: [[0, 1, 2], [3, 4, 5], [6, 7], [8, 9, 10], [11], [12], [13, 14, 15]],
  scenes: [
    // Cảnh 1: kĩ sư Brao được giao làm cầu trên sông Tuýt; khảo sát bờ và đáy sông: sông sâu, không xây trụ được; chưa có cách
    () => svg('Kĩ sư Brao đứng bên bờ sông Tuýt, đo dòng sông sâu, không thể xây trụ cầu', `
      ${sky('t34s1sky', '#7DD3FC', '#E0F2FE')}
      ${cloud(130, 40, 0.7, 0)}${cloud(330, 30, 0.6, 2)}
      <path d="M0 150 Q120 120 240 140 T480 132 V180 H0Z" fill="#A7D88A"/>
      <defs><linearGradient id="t34s1w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${WATER}"/><stop offset="1" stop-color="${DEEP}"/></linearGradient></defs>
      <rect x="140" y="184" width="210" height="116" fill="url(#t34s1w)"/>
      <path d="M140 300 V284 Q245 258 350 284 V300Z" fill="#78716C"/>
      ${[[190, 282], [230, 276], [268, 279], [306, 284]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4" fill="#57534E"/>`).join('')}
      ${ripples([[170, 196], [230, 192], [292, 198], [200, 226], [270, 236], [180, 252]])}
      <path d="M0 170 H150 Q160 220 164 300 H0Z" fill="#C08457" stroke="${LINE}" stroke-width="1"/>
      <path d="M0 166 H152 L154 178 H0Z" fill="#65A30D"/>
      <path d="M480 170 H338 Q328 220 326 300 H480Z" fill="#C08457" stroke="${LINE}" stroke-width="1"/>
      <path d="M480 166 H336 L334 178 H480Z" fill="#65A30D"/>
      ${tree(400, 168, 0.55)}${tufts([[80, 168], [370, 168]])}
      ${at(1, person(116, 170, 'thay', 'point', { s: 0.62 }))}
      ${at(1, sparkles([[148, 120, 6]]))}
      ${at(2, `<g><rect x="196" y="150" width="8" height="128" fill="#fff" stroke="${LINE}" stroke-width="1"/>
        ${Array.from({ length: 8 }, (_, i) => `<rect x="196" y="${150 + i * 16}" width="8" height="8" fill="#EF4444"/>`).join('')}
        <path d="M200 184 h16" stroke="#FACC15" stroke-width="2"/><path d="M200 276 h16" stroke="#FACC15" stroke-width="2"/>
        <path d="M212 190 V270 M208 196 l4 -6 l4 6 M208 264 l4 6 l4 -6" stroke="#FACC15" stroke-width="2" fill="none" stroke-linecap="round"/></g>`)}
      ${at(2, `<g><rect x="258" y="186" width="30" height="92" fill="none" stroke="#FEF3C7" stroke-width="2" stroke-dasharray="6 4"/>
        <path d="M252 212 L294 254 M294 212 L252 254" stroke="#EF4444" stroke-width="6" stroke-linecap="round"/></g>`)}
      ${at(2, `<path class="sc-drift" d="M226 214 h30 l-6 -5 M226 214 l24 5" stroke="#E0F2FE" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.8"/>`)}
      ${at(3, thought(240, 62, 120, 62, 138, 68, `<path d="M-50 18 V2 H-24 V18Z M50 18 V2 H24 V18Z" fill="#C08457" stroke="${LINE}" stroke-width="0.8"/>
        <path d="M-24 14 H24" stroke="${WATER}" stroke-width="6"/>
        <path d="M-24 2 H24" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 3"/>${word('?', 30, '#DC2626', 0, -12)}`))}`),

    // Cảnh 2: ông Brao đi dọc bờ sông, chân bước mà chỉ nghĩ một câu hỏi: làm cách nào để bắc cầu?
    () => svg('Ông Brao vừa đi dọc bờ sông vừa nghĩ cách bắc cầu', `
      ${sky('t34s2sky', '#7DD3FC', '#F0F9FF')}
      ${cloud(110, 36, 0.7, 1)}${cloud(380, 44, 0.6, 3)}
      ${farBank(152)}
      <rect y="150" width="${W}" height="56" fill="${WATER}"/>
      ${ripples([[90, 166], [170, 182], [260, 170], [340, 186], [410, 168]])}
      <path d="M0 204 Q120 196 240 202 T480 200 V300 H0Z" fill="#86EFAC"/>
      <path d="M0 262 Q240 244 480 258" stroke="#E7C9A1" stroke-width="30" fill="none"/>
      ${tree(400, 236, 0.8)}${tufts([[90, 230], [300, 222], [440, 286]])}
      ${flowers([[110, 296, '#F472B6'], [330, 298, '#FDE047']])}
      ${at(1, `${[[118, 270], [138, 266], [158, 270], [178, 266]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="2.4" fill="#A16207" opacity="0.5"/>`).join('')}`)}
      ${at(1, `<g class="sc-walk">${person(220, 274, 'thay', 'walk', { s: 0.86 })}</g>`)}
      ${at(2, thought(310, 70, 130, 70, 236, 120, `<path d="M-56 22 V6 H-26 V22Z M56 22 V6 H26 V22Z" fill="#C08457" stroke="${LINE}" stroke-width="0.8"/>
        <path d="M-26 18 H26" stroke="${WATER}" stroke-width="7"/>
        <path d="M-26 6 H26" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 3"/>`))}
      ${at(3, word('?', 36, '#DC2626', 310, 54))}
      ${at(3, sparkles([[262, 40, 6], [366, 36, 6]]))}`),

    // Cảnh 3: đầu ông va vào một cành cây; ông nhìn lên, thấy chú nhện bỏ chạy, để lại tấm lưới vừa chăng
    () => svg('Đầu ông Brao va vào cành cây; chú nhện bỏ chạy, để lại tấm lưới', `
      ${sky('t34s3sky', '#7DD3FC', '#F0F9FF')}
      ${cloud(120, 30, 0.6, 0)}
      ${farBank(170)}
      <rect y="168" width="${W}" height="40" fill="${WATER}"/>
      ${ripples([[90, 182], [180, 194], [400, 186]])}
      <path d="M0 206 Q120 198 240 204 T480 202 V300 H0Z" fill="#86EFAC"/>
      <path d="M0 270 Q240 252 480 266" stroke="#E7C9A1" stroke-width="30" fill="none"/>
      <path d="M352 300 L360 120 Q362 60 380 20 L404 20 Q388 70 390 130 L398 300Z" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
      <g class="sc-sway" style="--d:1s"><circle cx="420" cy="30" r="40" fill="#16A34A"/><circle cx="380" cy="10" r="34" fill="#22C55E"/></g>
      ${branch('M364 150 Q300 136 230 140 Q206 142 188 132', [[300, 140, -100], [250, 140, -80], [204, 138, -110]])}
      ${branch('M368 70 Q320 52 268 50 Q244 50 228 40', [[320, 56, -100], [270, 52, -80], [240, 46, -110]], 6)}
      ${at(1, person(222, 290, 'thay', 'stand', { s: 0.86, mood: 'wow' }), { off: 2 })}
      ${at(1, sparkles([[196, 150, 8], [246, 146, 7], [222, 136, 6]], '#FACC15'))}
      ${at(1, leaves([[180, 150, '#22C55E', 0], [270, 156, '#16A34A', 0.8]]))}
      ${at(2, person(222, 290, 'thay', 'lookUp', { s: 0.86, mood: 'wow' }))}
      ${at(2, `${web(290, 96, 40)}<path d="M290 96 L282 140 M290 96 L300 52" stroke="#F8FAFC" stroke-width="1.2"/>`)}
      ${at(2, `<path d="M330 66 L344 60" stroke="#F8FAFC" stroke-width="1"/>${spider(338, 64, 0.9, { run: true })}
        <path d="M318 76 l-10 4 M320 84 l-12 2" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`)}`),

    // Cảnh 4: ông chăm chú xem tấm mạng nhện giữa hai cành; trước gió mạng đung đưa mà không đứt; ông reo lên
    () => svg('Ông Brao chăm chú ngắm tấm mạng nhện đung đưa trước gió mà không đứt', `
      ${sky('t34s4sky', '#93C5FD', '#EFF6FF')}
      ${cloud(380, 30, 0.6, 2)}
      <path d="M0 230 Q120 220 240 226 T480 224 V300 H0Z" fill="#86EFAC"/>
      ${tufts([[120, 252], [420, 260]])}
      ${branch('M480 28 Q380 30 320 36 Q260 40 196 30', [[420, 30, -95], [350, 34, -80], [280, 40, -100], [220, 34, -85]], 8)}
      ${branch('M480 214 Q400 204 340 206 Q280 210 200 200', [[440, 210, -95], [380, 206, -80], [300, 208, -100], [230, 204, -85]], 8)}
      ${at(1, `<g>${web(290, 120, 82)}<path d="M290 120 L262 36 M290 120 L320 36 M290 120 L250 204 M290 120 L336 206" stroke="#F8FAFC" stroke-width="1.3"/></g>`, { off: 2 })}
      ${at(2, `<g class="sc-sway" style="--d:0s"><g>${web(290, 120, 82)}<path d="M290 120 L262 36 M290 120 L320 36 M290 120 L250 204 M290 120 L336 206" stroke="#F8FAFC" stroke-width="1.3"/></g></g>`)}
      ${at(1, sparkles([[250, 90, 5], [330, 130, 5], [300, 170, 4], [270, 150, 4]], '#FFFFFF'))}
      ${at(1, person(130, 292, 'thay', 'lookUp', { s: 0.86 }), { off: 3 })}
      ${at(2, wind([[100, 70, 70], [130, 160, 60], [90, 110, 50]]))}
      ${at(2, leaves([[180, 60, '#22C55E', 0], [380, 90, '#16A34A', 0.7], [240, 230, '#22C55E', 1.4]]))}
      ${at(3, person(130, 292, 'thay', 'cheer', { s: 0.86, mood: 'joy' }), { talk: '3' })}
      ${at(3, sparkles([[86, 120, 8], [176, 112, 8], [130, 96, 6]], '#FACC15'))}`),

    // Cảnh 5: "Đúng rồi, cầu trên sông Tuýt sẽ là một chiếc cầu treo."
    () => svg('Ông Brao reo lên: cầu trên sông Tuýt sẽ là cầu treo', `
      ${sky('t34s5sky', '#7DD3FC', '#FEF9C3')}
      ${sun(108, 40, 18)}
      ${farBank(190)}
      <rect y="188" width="${W}" height="30" fill="${WATER}"/>
      ${ripples([[120, 200], [330, 206]])}
      <path d="M0 216 Q120 208 240 214 T480 212 V300 H0Z" fill="#86EFAC"/>
      ${tufts([[220, 260], [420, 270]])}${flowers([[260, 296, '#F472B6'], [400, 292, '#A78BFA']])}
      ${at(1, talkAt('1', person(140, 292, 'thay', 'cheer', { s: 0.9, mood: 'joy' })))}
      ${at(1, speech(300, 104, 196, 112, 176, 158, `<rect x="-90" y="10" width="180" height="40" fill="${WATER}" opacity="0.7"/>
        <path d="M-90 14 H-64 V44 H-90Z M90 14 H64 V44 H90Z" fill="#C08457"/>
        <g transform="translate(0 0)">${suspension(-50, 50, 8, -40, 0, { x0: -88, x1: 88, scale: 0.6 })}</g>`))}
      ${at(1, sparkles([[208, 56, 7], [390, 150, 7]], '#FACC15'))}`),

    // Cảnh 6: kĩ sư Brao lao vào thiết kế cây cầu treo trên những sợi cáp
    () => svg('Kĩ sư Brao miệt mài vẽ thiết kế cầu treo trên những sợi cáp', `
      <rect width="${W}" height="${H}" fill="#FEF3C7"/>
      <rect y="232" width="${W}" height="${H - 232}" fill="#D6B48A"/><path d="M0 232 H${W}" stroke="#B88A5F" stroke-width="3"/>
      <rect x="80" y="40" width="44" height="64" rx="3" fill="#BAE6FD" stroke="#fff" stroke-width="4"/>
      ${at(1, `<g><rect x="168" y="34" width="216" height="120" rx="3" fill="#1D4ED8" stroke="${LINE}" stroke-width="1.5"/>
        <path d="M168 34 h216 v8 h-216Z" fill="#1E40AF"/>
        ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${180 + i * 32} 44 V150" stroke="#3B82F6" stroke-width="0.8"/>`).join('')}
        <g transform="translate(276 118)">${suspension(-60, 60, 10, -54, 0, { x0: -100, x1: 100, scale: 0.7 }).replace(/#B91C1C|#991B1B/g, '#DBEAFE').replace(/#A8A29E|#78716C|#475569|#94A3B8/g, '#FFFFFF')}</g></g>`)}
      ${at(1, `<g><path d="M200 300 L214 206 M340 300 L326 206" stroke="#92400E" stroke-width="6" stroke-linecap="round"/>
        <path d="M190 210 L350 196 L356 214 L196 228Z" fill="#E7C9A1" stroke="${LINE}" stroke-width="1"/>
        <path d="M214 214 L330 204" stroke="#2563EB" stroke-width="1.4"/><path d="M220 220 Q270 200 324 210" stroke="#2563EB" stroke-width="1.4" fill="none"/>
        <rect x="230" y="208" width="60" height="5" fill="#FACC15" transform="rotate(-5 260 210)"/></g>`)}
      ${at(1, `${[[352, 270, '#64748B'], [384, 266, '#475569']].map(([x, y, c]) => `<g><ellipse cx="${x}" cy="${y}" rx="18" ry="12" fill="${c}" stroke="${LINE}" stroke-width="1"/>
        <ellipse cx="${x}" cy="${y}" rx="11" ry="7" fill="none" stroke="#CBD5E1" stroke-width="2"/><circle cx="${x}" cy="${y}" r="3" fill="#1E293B"/></g>`).join('')}`)}
      ${at(1, person(140, 292, 'thay', 'raise', { s: 0.88, prop: 'pencil' }))}
      ${at(1, `<g>${web(404, 190, 22, '#CBD5E1')}${spider(398, 196, 0.7)}</g>`)}
      ${at(1, sparkles([[200, 180, 6], [370, 170, 6]], '#FACC15'))}`),

    // Cảnh 7: chiếc cầu treo đầu tiên trên thế giới ra đời từ "gợi ý" của chú nhện; Brao người Ai-xơ-len; sông Tuýt ở Ai-xơ-len
    () => svg('Chiếc cầu treo đầu tiên bắc qua sông Tuýt; kĩ sư Brao và chú nhện vui mừng', `
      ${sky('t34s7sky', '#7DD3FC', '#FEF3C7')}
      ${cloud(120, 32, 0.6, 0)}${cloud(400, 104, 0.5, 2)}
      <path d="M0 160 Q120 136 240 150 T480 144 V200 H0Z" fill="#A7D88A"/>
      <rect x="140" y="182" width="210" height="118" fill="${WATER}"/>
      ${ripples([[170, 200], [240, 214], [300, 196], [200, 240], [280, 252], [180, 276]])}
      <path d="M0 176 H150 Q160 220 164 300 H0Z" fill="#65A30D"/><path d="M480 176 H338 Q328 220 326 300 H480Z" fill="#65A30D"/>
      ${at(1, suspension(150, 336, 174, 66, 146, { x0: 60, x1: 420 }))}
      ${at(1, `${person(212, 174, 'linh', 'walk', { s: 0.3 })}${person(232, 174, 'nam', 'walk', { s: 0.3 })}${person(286, 174, 'hangXom', 'walk', { s: 0.24, flip: true })}`)}
      ${at(1, person(100, 296, 'thay', 'cheer', { s: 0.66, mood: 'joy' }))}
      ${at(1, `<path d="M366 120 V96" stroke="#F8FAFC" stroke-width="1"/>${spider(366, 128, 0.9, { wave: true })}`)}
      ${at(2, irishFlag(150, 54, 34, 0.9))}${at(2, irishFlag(336, 54, 34, 0.9))}
      ${at(2, sparkles([[130, 186, 6], [76, 210, 6]], '#FACC15'))}
      ${at(3, `<g transform="translate(244 54)"><rect x="-34" y="-30" width="68" height="60" rx="8" fill="#F0F9FF" stroke="${LINE}" stroke-width="1"/>
        <path d="M-6 -24 Q10 -26 14 -16 Q22 -8 18 4 Q22 14 10 22 Q-4 26 -14 20 Q-24 14 -20 2 Q-26 -8 -18 -14 Q-14 -24 -6 -24Z" fill="#4ADE80" stroke="#16A34A" stroke-width="1"/>
        <path d="M-12 -6 Q-2 -2 0 6 Q4 12 14 12" stroke="${WATER}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M0 6 c-5 -8 -5 -12 0 -12 c5 0 5 4 0 12Z" fill="#EF4444" stroke="${LINE}" stroke-width="0.6"/><circle cx="0" cy="-2" r="1.6" fill="#fff"/></g>`)}
      ${at(3, sparkles([[244, 232, 7], [196, 262, 5]], '#FFFFFF'))}`),
  ],
};
