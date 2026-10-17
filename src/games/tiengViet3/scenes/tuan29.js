// Phim bài đọc "Rừng trưa" (theo Đoàn Giỏi), Tuần 29 Tiếng Việt 3: 5 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó (đổi dáng nhân vật).
// Nhân vật: "tôi" là người đi rừng (bo trong cast.js). Rừng tràm thân trắng thẳng như cây nến, ngọn lá rủ như liễu;
// chim, ong, chuồn chuồn, bướm và hoa rừng vẽ ở các hàm dưới đây.
import { person, lying } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, tree, sparkles, word, soundWaves, LINE } from '../sceneKit.js';

/** Cây tràm: thân trắng thẳng có vân xám, tán hẹp trên cao (x gốc, y đất, h cao); droop: thêm ngọn lá rủ. */
const tram = (x, y, h, { droop = false, tone = '#4D7C0F', light = '#84CC16' } = {}) => {
  const top = y - h;
  return `<g>
    <path d="M${x - 5} ${y} L${x - 3.4} ${top + 10} H${x + 3.4} L${x + 5} ${y}Z" fill="#F8FAFC" stroke="#A8A29E" stroke-width="0.9"/>
    ${Array.from({ length: Math.floor(h / 22) }, (_, i) => `<path d="M${x - 3} ${y - 12 - i * 22} q3 -2 6 1" stroke="#A8A29E" stroke-width="1" fill="none"/>`).join('')}
    <g class="sc-sway" style="--d:${(x % 7) / 3}s"><ellipse cx="${x}" cy="${top}" rx="16" ry="22" fill="${tone}"/>
    <ellipse cx="${x - 7}" cy="${top + 6}" rx="9" ry="14" fill="${light}"/><ellipse cx="${x + 8}" cy="${top - 4}" rx="8" ry="12" fill="${light}" opacity="0.8"/></g>
    ${droop ? `<g class="sc-sway" style="--d:${(x % 5) / 2}s">${[-14, -8, -2, 4, 10, 15].map((dx, i) =>
      `<path d="M${x + dx} ${top + 4} Q${x + dx * 1.5} ${top + 22} ${x + dx * 1.3} ${top + 36 + (i % 2) * 8}" stroke="${i % 2 ? light : tone}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`).join('')}</g>` : ''}</g>`;
};

/** Chim bay (x, y, s, màu). */
const bird = (x, y, s = 1, c = '#334155', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <path d="M-12 -2 Q-6 -10 0 0 Q6 -10 12 -2" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="0" cy="0" r="2.4" fill="${c}"/></g></g>`;

/** Ong (x, y, s). */
const bee = (x, y, s = 1, d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <ellipse cx="-2" cy="-7" rx="5" ry="6" fill="#E0F2FE" opacity="0.9" stroke="#94A3B8" stroke-width="0.6"/><ellipse cx="4" cy="-7" rx="5" ry="6" fill="#E0F2FE" opacity="0.9" stroke="#94A3B8" stroke-width="0.6"/>
  <ellipse rx="8" ry="5.5" fill="#FACC15" stroke="${LINE}" stroke-width="0.8"/><path d="M-3 -5 V5 M2 -5 V5" stroke="#1F2937" stroke-width="2"/>
  <circle cx="7" cy="-1" r="1.1" fill="#1F2937"/>
  <path d="M-14 -2 h-5 M-14 3 h-7" stroke="#94A3B8" stroke-width="1.2" stroke-linecap="round"/></g></g>`;

/** Chuồn chuồn (x, y, s, màu). */
const dragonfly = (x, y, s = 1.6, c = '#0EA5E9', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <ellipse cx="-4" cy="-5" rx="9" ry="3" fill="#E0F2FE" opacity="0.85" transform="rotate(-20 -4 -5)"/><ellipse cx="4" cy="-5" rx="9" ry="3" fill="#E0F2FE" opacity="0.85" transform="rotate(20 4 -5)"/>
  <path d="M0 -2 V18" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/><circle cx="0" cy="-4" r="3" fill="${c}"/></g></g>`;

/** Bướm (x, y, s, màu). */
const butterfly = (x, y, s = 1, c = '#F472B6', d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s">
  <path d="M0 0 Q-12 -14 -14 -4 Q-14 4 0 0Z M0 0 Q12 -14 14 -4 Q14 4 0 0Z" fill="${c}" stroke="${LINE}" stroke-width="0.7"/>
  <path d="M0 0 Q-9 10 -6 4 Z M0 0 Q9 10 6 4Z" fill="${c}" stroke="${LINE}" stroke-width="0.7"/><path d="M0 -4 V4" stroke="#1F2937" stroke-width="2"/></g></g>`;

/** Hoa rừng sặc sỡ (x, y gốc, c màu, r); wilt: hoa đã héo gục. */
const wildFlower = (x, y, c, r = 7, wilt = false) => wilt
  ? `<g><path d="M${x} ${y} Q${x + 2} ${y - 18} ${x + 8} ${y - 20}" stroke="#65A30D" stroke-width="2" fill="none"/>
    ${[0, 1, 2].map(k => `<ellipse cx="${x + 9 + k * 2}" cy="${y - 16 + k * 3}" rx="${r * 0.4}" ry="${r * 0.7}" fill="#A8A29E" transform="rotate(${20 + k * 15} ${x + 9} ${y - 16})"/>`).join('')}
    <ellipse cx="${x + 14}" cy="${y - 4}" rx="2.4" ry="1.4" fill="#A8A29E"/></g>`
  : `<g transform="translate(${x} ${y})"><g class="sc-sway" style="--d:${(x % 5) / 2}s"><path d="M0 0 V-22" stroke="#16A34A" stroke-width="2"/>
    <path d="M0 -8 q8 -6 10 -2 q-6 4 -10 2Z" fill="#22C55E"/>
    ${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cy="${-22 - r * 0.7}" rx="${r * 0.42}" ry="${r * 0.7}" fill="${c}" transform="rotate(${a} 0 -22)"/>`).join('')}<circle cy="-22" r="${r * 0.36}" fill="#FDE047"/></g></g>`;

/** Bụi cây thấp (x giữa, y đáy). */
const bush = (x, y, s = 1, c = '#22C55E', d = '#16A34A') => `<g transform="translate(${x} ${y}) scale(${s})">
  <ellipse cx="-14" cy="-10" rx="16" ry="12" fill="${d}"/><ellipse cx="12" cy="-12" rx="18" ry="14" fill="${d}"/><ellipse cx="0" cy="-18" rx="16" ry="14" fill="${c}"/></g>`;

/** Hương bay lên (lượn sóng mờ). */
const scent = (list, c = '#FDE68A') => list.map(([x, y, d]) =>
  `<path class="sc-rise" style="--d:${d}s" d="M${x} ${y} q-8 -12 0 -24 q8 -12 0 -24" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.9"/>`).join('');

/** Nốt nhạc nhỏ (tiếng chim). */
const note = (x, y, c = '#F59E0B', d = 0) => `<g class="sc-bob" style="--d:${d}s"><path d="M${x} ${y} V${y - 14} l8 -3 V${y - 3}" stroke="${c}" stroke-width="2" fill="none"/>
  <ellipse cx="${x - 2.4}" cy="${y}" rx="3.4" ry="2.6" fill="${c}"/><ellipse cx="${x + 5.6}" cy="${y - 3}" rx="3.4" ry="2.6" fill="${c}"/></g>`;

/** Nền rừng khô: đất vàng nâu, cỏ úa. */
const floor = (y = 230, c = '#D9B26F') => `<path d="M0 ${y} Q240 ${y - 10} 480 ${y + 2} V${H} H0Z" fill="${c}"/>
  ${[[90, y + 30], [170, y + 50], [260, y + 40], [350, y + 56], [410, y + 30]].map(([x, yy]) => `<path d="M${x} ${yy} l-4 -10 M${x} ${yy} l0 -12 M${x} ${yy} l5 -9" stroke="#A16207" stroke-width="2" stroke-linecap="round"/>`).join('')}`;

const T29TREES = [[104, 240, 196], [152, 246, 214], [202, 238, 186], [252, 248, 222], [302, 242, 200], [348, 246, 150]];

const z = (x, y, s, d) => `<g class="sc-rise" style="--d:${d}s">${word('z', s, '#6366F1', x, y)}</g>`;

export default {
  sentences: true,
  groups: [[0], [1, 2, 3], [4, 5], [6, 7], [8, 9, 10]],
  scenes: [
    // Cảnh 1: đi quanh co trong rừng chừng một giờ, "tôi" ngồi nghỉ dưới một gốc cây to
    () => svg('Người đi rừng ngồi nghỉ dưới gốc cây to', `
      ${sky('t29s1sky', '#7DD3FC', '#FEF9C3')}
      ${cloud(140, 36, 0.6, 0)}
      ${tram(70, 214, 150)}${tram(118, 210, 130)}${tram(200, 206, 120)}${tram(250, 210, 140)}
      ${floor(214)}
      ${tram(300, 212, 150)}${tram(352, 214, 170)}${tram(404, 210, 140)}
      <path d="M120 300 Q110 266 190 250 Q250 236 222 220 Q206 210 232 202 L240 203 Q218 212 236 222 Q270 240 210 258 Q160 272 196 300Z" fill="#F5DEB3"/>
      ${tree(340, 264, 1.5, '#65A30D', '#4D7C0F')}
      <path d="M318 262 q-10 4 -18 2 M342 262 q10 4 18 2" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
      ${at(1, `${person(306, 282, 'bo', 'sit', { s: 0.82 })}`)}
      ${at(1, `<path d="M200 270 q8 -2 10 4 M226 250 q8 -2 10 4 M246 232 q8 -2 10 4" stroke="#A16207" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/>`)}`),

    // Cảnh 2: rừng khô uy nghi trong nắng vàng óng; thân tràm trắng vươn thẳng như cây nến khổng lồ; đầu lá rủ như lá liễu
    () => svg('Rừng tràm thân trắng vươn thẳng lên trời trong nắng vàng', `
      ${sky('t29s2sky', '#60A5FA', '#FEF3C7')}
      ${at(1, `${sun(394, 40, 20)}<path d="M394 40 L60 300 H200Z M394 40 L260 300 H420Z" fill="#FDE047" opacity="0.16"/>`)}
      <g opacity="0.55">${[80, 128, 178, 228, 278, 326, 376, 410].map((x, i) => tram(x, 236, 110 + (i % 3) * 16, { tone: '#6B8E4E', light: '#A3B86C' })).join('')}</g>
      ${floor(232, '#E2B86B')}
      ${at(1, `<rect y="0" width="${W}" height="${H}" fill="#FACC15" opacity="0.1"/>${sparkles([[120, 260, 6], [300, 270, 6]], '#FEF3C7')}`)}
      ${at(2, `${T29TREES.map(([x, y, h]) => tram(x, y, h)).join('')}
        ${sparkles([[160, 22, 6], [262, 14, 7]], '#FEF9C3')}`, { off: 3 })}
      ${at(3, `${T29TREES.map(([x, y, h]) => tram(x, y, h, { droop: true })).join('')}`)}`),

    // Cảnh 3: biển lá xanh rờn ngả màu cỏ úa, ngát mùi lá tràm hun nóng; tiếng chim vang xa lên trời cao xanh thẳm
    () => svg('Biển lá tràm xanh ngả vàng tỏa hương dưới nắng, chim hót vang trời', `
      ${sky('t29s3sky', '#1D4ED8', '#BAE6FD')}
      ${sun(110, 50, 20)}
      ${cloud(330, 40, 0.5, 1)}
      ${Array.from({ length: 4 }, (_, r) => Array.from({ length: 9 }, (_, k) => {
        const x = k * 58 + (r % 2) * 29 - 10, y = 160 + r * 36;
        const c = (k + r) % 3 === 0 ? '#BEB15A' : (k + r) % 3 === 1 ? '#65A30D' : '#4D7C0F';
        return `<g class="sc-sway" style="--d:${(k + r) * 0.4}s"><ellipse cx="${x}" cy="${y}" rx="36" ry="26" fill="${c}"/><ellipse cx="${x - 10}" cy="${y - 8}" rx="14" ry="10" fill="#A3E635" opacity="0.5"/></g>`;
      }).join('')).join('')}
      ${at(1, `${Array.from({ length: 6 }, (_, k) => `<ellipse cx="${100 + k * 52}" cy="${172 + (k % 2) * 30}" rx="18" ry="12" fill="#D6B656" opacity="0.85"/>`).join('')}
        ${scent([[120, 168, 0], [190, 186, 0.8], [256, 166, 1.6], [320, 190, 2.4], [372, 170, 1.2]])}`)}
      ${at(2, `${bird(170, 110, 1, '#334155', 0)}${bird(214, 84, 0.8, '#334155', 0.7)}${bird(300, 100, 1.1, '#1F2937', 1.3)}${bird(346, 70, 0.7, '#334155', 0.4)}
        ${note(150, 80, '#FDE047', 0.2)}${note(260, 60, '#FDE047', 1)}${note(380, 110, '#FDE047', 0.6)}
        ${soundWaves(306, 96, 0.9, '#FDE68A')}`)}`),

    // Cảnh 4: trảng rộng, lùm bụi thấp bên lạch nước còn xanh, côn trùng kêu vù vù; chúng bay đi bay lại trên hoa nhiệt đới nở rồi vội tàn
    () => svg('Bên lạch nước, ong bướm chuồn chuồn bay trên những bông hoa rừng sặc sỡ', `
      ${sky('t29s4sky', '#7DD3FC', '#FEF9C3')}
      ${tram(80, 170, 120)}${tram(400, 170, 130)}${tram(360, 168, 100)}
      <path d="M0 170 Q240 160 480 172 V${H} H0Z" fill="#A3E635"/>
      ${at(1, `<path d="M60 300 Q120 240 220 236 Q320 232 330 200 Q336 182 420 176" stroke="#38BDF8" stroke-width="18" fill="none" stroke-linecap="round"/>
        <path d="M70 296 Q124 244 220 240 Q318 236 330 204" stroke="#BAE6FD" stroke-width="3" fill="none" stroke-dasharray="10 12"/>
        ${bush(110, 230, 1)}${bush(380, 218, 0.9)}${bush(260, 222, 0.8, '#4ADE80')}
        ${bee(150, 180, 1, 0)}${bee(300, 160, 0.9, 0.8)}${dragonfly(220, 150, 1.6, '#0EA5E9', 0.4)}${dragonfly(372, 136, 1.4, '#EF4444', 1.2)}`)}
      ${at(2, `${[[150, 272, '#EF4444'], [184, 264, '#F97316'], [214, 280, '#A855F7'], [250, 268, '#EC4899'], [284, 280, '#FACC15'], [396, 276, '#F43F5E'], [118, 282, '#FB923C']]
          .map(([x, y, c]) => wildFlower(x, y, c, 8)).join('')}
        ${wildFlower(310, 272, '', 8, true)}${wildFlower(352, 282, '', 8, true)}
        ${butterfly(196, 228, 1.2, '#F472B6', 0)}${butterfly(268, 232, 1.1, '#FACC15', 0.9)}${butterfly(392, 236, 1, '#A78BFA', 1.5)}
        ${bee(232, 246, 0.9, 1.1)}`)}`),

    // Cảnh 5: hương hoa rừng ngòn ngọt hòa vào nắng trưa; mùi hương khiến người dễ buồn ngủ; ngả lưng dưới bóng cây, ngủ lúc nào không biết
    () => svg('Hương hoa rừng hòa vào nắng trưa, người đi rừng ngả lưng ngủ dưới bóng cây', `
      ${sky('t29s5sky', '#7DD3FC', '#FEF3C7')}
      ${sun(380, 46, 22)}
      ${tram(84, 214, 150)}${tram(136, 218, 130)}
      ${floor(220, '#D9B26F')}
      ${tree(230, 248, 1.35, '#65A30D', '#4D7C0F')}
      <ellipse cx="260" cy="262" rx="110" ry="18" fill="#4D7C0F" opacity="0.25"/>
      ${at(1, `${[[110, 280, '#EC4899'], [140, 270, '#F97316'], [176, 286, '#A855F7'], [408, 266, '#EF4444'], [130, 292, '#FACC15']].map(([x, y, c]) => wildFlower(x, y, c, 8)).join('')}
        ${scent([[124, 250, 0], [392, 248, 0.9], [368, 260, 1.8]], '#F9A8D4')}
        <circle cx="380" cy="46" r="50" fill="#FDE68A" opacity="0.35"/>`)}
      ${at(1, person(232, 276, 'bo', 'sit', { s: 0.8 }), { off: 2 })}
      ${at(2, person(232, 276, 'bo', 'sit', { s: 0.8, mood: 'sleep' }), { off: 3 })}
      ${at(2, `${z(258, 172, 12, 0)}${z(268, 156, 15, 1.2)}`, { off: 3 })}
      ${at(3, lying(326, 280, 'bo', { s: 0.9, mood: 'sleep', blanket: '#60A5FA', len: 110 }))}
      ${at(3, `${z(274, 226, 13, 0)}${z(288, 206, 16, 1.2)}${z(304, 184, 19, 2.4)}`)}`),
  ],
};
