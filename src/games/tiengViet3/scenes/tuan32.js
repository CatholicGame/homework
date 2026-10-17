// Phim bài đọc "Chồi biếc", Tuần 32 Tiếng Việt 3: 6 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó.
// Bài tả đời một chiếc lá như đời người: mùa xuân mưa bụi, chồi nhú (tím biếc như em bé mới sinh), lá non xanh nõn
// vẫy như bàn tay em bé, tháng năm ve kêu lá xanh đậm, ra hoa kết quả, mùa thu lá già gân guốc, mùa đông lá úa lìa cành
// nhường chỗ cho chồi mới. Lá có mặt cười nho nhỏ cho bé thấy lá "lớn lên"; em bé, bạn nhỏ: Mai (cast.js).
import { person, headOnly } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, grass, tufts, flowers, sparkles, thought, soundWaves, heart, leaves, LINE } from '../sceneKit.js';

const BARK = '#7C4A21', BARK_D = '#5B3416';
const PURPLE = '#A855F7', NON = '#A3E635', DAM = '#15803D';

/** Mặt nhỏ trên lá / chồi: mood happy · wow · sleep · old. */
function face(r, mood = 'happy') {
  const e = r * 0.28, ey = -r * 0.05, er = Math.max(0.9, r * 0.1);
  const eyes = mood === 'sleep' || mood === 'old'
    ? [-1, 1].map(s => `<path d="M${s * e - er * 1.4} ${ey} q${er * 1.4} ${er * 1.2} ${er * 2.8} 0" stroke="#3F2A1D" stroke-width="${er * 0.7}" fill="none" stroke-linecap="round"/>`).join('')
    : [-1, 1].map(s => `<circle cx="${s * e}" cy="${ey}" r="${er}" fill="#3F2A1D"/><circle cx="${s * e + er * 0.35}" cy="${ey - er * 0.35}" r="${er * 0.35}" fill="#fff"/>`).join('');
  const mouth = mood === 'wow' ? `<ellipse cy="${r * 0.3}" rx="${er * 0.8}" ry="${er}" fill="#9F1239"/>`
    : mood === 'old' ? `<path d="M${-er * 1.4} ${r * 0.34} q${er * 1.4} ${-er} ${er * 2.8} 0" stroke="#3F2A1D" stroke-width="${er * 0.6}" fill="none" stroke-linecap="round"/>`
      : `<path d="M${-er * 1.6} ${r * 0.22} q${er * 1.6} ${er * 1.6} ${er * 3.2} 0" stroke="#3F2A1D" stroke-width="${er * 0.6}" fill="none" stroke-linecap="round"/>`;
  const cheeks = mood === 'old' ? '' : [-1, 1].map(s => `<ellipse cx="${s * e * 1.6}" cy="${r * 0.18}" rx="${er * 1.1}" ry="${er * 0.7}" fill="#F9A8A8" opacity="0.8"/>`).join('');
  return `${cheeks}${eyes}${mouth}`;
}

/** Chiếc lá mọc từ (x, y) theo góc rot (0 = thẳng lên), dài len; veins: gân nổi; withFace: mặt (mood). */
function leaf(x, y, len, rot, fill, { veins = false, mood, sway = true, d = 0 } = {}) {
  const w = len * 0.42;
  const body = `<path d="M0 0 Q${w} ${-len * 0.35} 0 ${-len} Q${-w} ${-len * 0.35} 0 0Z" fill="${fill}" stroke="${LINE}" stroke-width="0.9"/>
    <path d="M0 0 V${-len * 0.9}" stroke="${LINE}" stroke-width="${veins ? 1.6 : 0.8}" opacity="${veins ? 0.8 : 0.45}"/>
    ${veins ? [0.32, 0.52, 0.72].map(k => `<path d="M0 ${-len * k} l${w * (k < 0.4 ? 0.38 : k < 0.6 ? 0.36 : 0.24)} ${-len * 0.12} M0 ${-len * k} l${-w * (k < 0.4 ? 0.38 : k < 0.6 ? 0.36 : 0.24)} ${-len * 0.12}" stroke="${LINE}" stroke-width="1.2" opacity="0.7" fill="none"/>`).join('') : ''}
    ${mood ? `<g transform="translate(0 ${-len * 0.45}) rotate(${-rot})">${face(w * 0.75, mood)}</g>` : ''}`;
  return `<g transform="translate(${x} ${y}) rotate(${rot})">${sway ? `<g class="sc-sway" style="--d:${d}s">${body}</g>` : body}</g>`;
}

/** Chồi nhỏ (búp) mọc từ (x, y). */
const bud = (x, y, s = 1, rot = 0, c = PURPLE) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
  <path d="M0 0 Q6 -6 0 -16 Q-6 -6 0 0Z" fill="${c}" stroke="${LINE}" stroke-width="0.8"/><path d="M0 0 Q4 -4 3 -10" stroke="#fff" stroke-width="1" fill="none" opacity="0.5"/></g>`;

/** Cây trơ cành giữa cảnh (x gốc, y đất); trả về cả các đầu cành để gắn chồi. */
const TIPS = [[-62, -126], [-40, -150], [-6, -170], [30, -156], [62, -132], [-74, -96], [78, -100], [12, -138]];
function bareTree(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-12 0 Q-8 -40 -6 -70 L6 -70 Q8 -40 12 0Z" fill="${BARK}" stroke="${LINE}" stroke-width="1"/>
    <path d="M-4 -66 Q-30 -90 -62 -126 M-4 -70 Q-26 -110 -40 -150 M0 -70 Q-4 -120 -6 -170 M4 -70 Q20 -120 30 -156 M6 -66 Q40 -96 62 -132
      M-20 -84 Q-50 -90 -74 -96 M22 -84 Q50 -90 78 -100 M2 -100 Q10 -120 12 -138" stroke="${BARK}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
}
const tipAt = (x, y, s, i) => [x + TIPS[i][0] * s, y + TIPS[i][1] * s];

/** Mưa bụi li ti. */
const drizzle = (list) => list.map(([x, y], i) => `<g class="sc-rain" style="--d:${(i * 0.23) % 0.9}s"><path d="M${x} ${y} l-1.2 5" stroke="#E0F2FE" stroke-width="1.6" stroke-linecap="round"/></g>`).join('');
const RAIN = Array.from({ length: 46 }, (_, i) => [70 + (i * 53) % 350, 20 + (i * 37) % 180]);

/** Cành cây to vắt ngang (cảnh cận): từ trái dưới lên phải. */
const branch = () => `<path d="M40 250 Q160 210 260 190 Q340 174 440 120" stroke="${BARK}" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M40 250 Q160 210 260 190 Q340 174 440 120" stroke="${BARK_D}" stroke-width="3" fill="none" stroke-dasharray="10 18" opacity="0.4"/>`;

/** Gió thổi: các đường cong. */
const wind = (x, y, s = 1, d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-drift" style="--d:${d}s">
  <path d="M0 0 H40 Q52 0 52 -10 Q52 -20 42 -18 M0 12 H58 Q72 12 70 24 Q66 32 58 28 M8 -14 H26" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"/></g></g>`;

/** Ve sầu bám thân cây. */
const cicada = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <ellipse cx="0" cy="0" rx="5" ry="10" fill="#57534E" stroke="${LINE}" stroke-width="0.8"/>
  <path d="M-1 -4 Q-14 2 -10 16 Q-4 10 -1 0Z M1 -4 Q14 2 10 16 Q4 10 1 0Z" fill="#E0F2FE" opacity="0.75" stroke="#94A3B8" stroke-width="0.7"/>
  <circle cx="-3" cy="-9" r="2" fill="#B91C1C"/><circle cx="3" cy="-9" r="2" fill="#B91C1C"/></g>`;

/** Chùm hoa nhỏ (x, y, màu). */
const bloom = (x, y, c, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${(x % 5) / 2}s">
  ${[[0, 0], [-7, 5], [7, 5], [0, 9]].map(([dx, dy]) => `<g transform="translate(${dx} ${dy})">${[0, 72, 144, 216, 288].map(r => `<ellipse cy="-3.4" rx="2.2" ry="3.4" fill="${c}" transform="rotate(${r})"/>`).join('')}<circle r="1.6" fill="#FDE047"/></g>`).join('')}</g></g>`;

/** Quả tròn. */
const fruit = (x, y, c = '#F97316', r = 6) => `<g><path d="M${x} ${y - r} q1 -5 4 -6" stroke="#78350F" stroke-width="1.4" fill="none"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${LINE}" stroke-width="0.8"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.25}" fill="#fff" opacity="0.6"/></g>`;

/** Em bé quấn tã (x, y tâm). */
const baby = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-14 -6 Q-18 24 0 30 Q18 24 14 -6Z" fill="#F5D0FE" stroke="${LINE}" stroke-width="1"/>
  <path d="M-14 4 Q0 12 14 4" stroke="#E9D5FF" stroke-width="3" fill="none"/>
  <g transform="translate(0 -12)">${headOnly('mai', { s: 0.6, mood: 'sleep' })}</g>
  <path d="M-12 -22 Q0 -34 12 -22" stroke="#E9D5FF" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;

/** Tán cây tròn lớn (cây mùa hạ) quanh (x, y). */
const crown = (x, y, s, c1, c2) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-sway" style="--d:1s">
  <circle cx="-46" cy="10" r="38" fill="${c2}"/><circle cx="46" cy="6" r="40" fill="${c2}"/><circle cx="0" cy="-30" r="46" fill="${c1}"/>
  <circle cx="-30" cy="-6" r="34" fill="${c1}"/><circle cx="30" cy="-10" r="34" fill="${c1}"/><circle cx="0" cy="18" r="34" fill="${c2}"/></g></g>`;

export default {
  sentences: true,
  groups: [[0, 1], [2, 3], [4, 5, 6], [7, 8, 9], [10], [11]],
  scenes: [
    // Cảnh 1: mùa xuân mưa bụi li ti, cây ngủ qua mùa đông chợt bừng tỉnh; mưa cho cây nhú chồi biếc, hớn hở đón xuân
    () => {
      const x = 240, y = 236, s = 0.95;
      return svg('Mưa xuân li ti, cây bừng tỉnh và nhú chồi biếc', `
      ${sky('t32s1sky', '#94A3B8', '#E2E8F0')}
      ${cloud(130, 40, 0.9, 0, '#F1F5F9')}${cloud(330, 30, 1, 2, '#F1F5F9')}${cloud(220, 56, 0.6, 4, '#E2E8F0')}
      <path d="M0 196 Q120 170 240 190 T480 186 V300 H0Z" fill="#86B7A0"/>
      ${grass(236, '#A7D7A0')}
      ${bareTree(x, y, s)}
      ${bareTree(110, 230, 0.45)}${bareTree(380, 228, 0.5)}
      ${at(1, drizzle(RAIN))}
      ${at(1, `<g transform="translate(${x} ${y - 40})"><ellipse rx="22" ry="14" fill="${BARK}"/>${face(20, 'wow')}</g>`, { off: 2 })}
      ${at(2, `<g transform="translate(${x} ${y - 40})"><ellipse rx="22" ry="14" fill="${BARK}"/>${face(20, 'happy')}</g>`)}
      ${at(2, TIPS.map((_, i) => { const [bx, by] = tipAt(x, y, s, i); return bud(bx, by + 2, 1.2, (i % 3 - 1) * 20, i % 2 ? PURPLE : '#84CC16'); }).join(''))}
      ${at(2, [0, 2, 4, 6].map(i => { const [bx, by] = tipAt(110, 230, 0.45, i); return bud(bx, by, 0.7, 0, '#84CC16'); }).join('') + [1, 3, 5, 7].map(i => { const [bx, by] = tipAt(380, 228, 0.5, i); return bud(bx, by, 0.7, 0, PURPLE); }).join(''))}
      ${at(2, `${flowers([[150, 276, '#F9A8D4'], [320, 282, '#FDE047'], [380, 270, '#C4B5FD'], [110, 290, '#FDE047']])}${sparkles([[180, 110, 6], [300, 100, 7]], '#FEF9C3')}`)}
      ${tufts([[130, 290], [260, 296], [350, 292]])}`);
    },

    // Cảnh 2: chồi cây giống như cuộc đời một con người; mới nứt nanh, màu tím biếc dễ thương như cu con mới lọt lòng
    () => svg('Chồi cây như đời người; chồi tím biếc như em bé mới sinh', `
      ${sky('t32s2sky', '#BAE6FD', '#F0FDF4')}
      ${cloud(380, 250, 0.8, 1)}${cloud(120, 270, 0.7, 3)}
      ${branch()}
      ${leaf(150, 222, 30, -30, '#65A30D', { sway: false })}${leaf(380, 150, 26, 40, '#65A30D', { sway: false })}
      ${at(1, thought(240, 66, 260, 76, 214, 140, `
        <g transform="translate(-96 8)">${headOnly('mai', { s: 0.55, mood: 'sleep' })}</g>
        <g transform="translate(-34 6)">${headOnly('lan', { s: 0.75, mood: 'joy' })}</g>
        <g transform="translate(30 2)">${headOnly('bo', { s: 0.8 })}</g>
        <g transform="translate(94 2)">${headOnly('ba', { s: 0.8 })}</g>
        ${[-66, -2, 62].map(dx => `<path d="M${dx - 6} 4 H${dx + 6} M${dx + 2} 0 L${dx + 6} 4 L${dx + 2} 8" stroke="#94A3B8" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}`))}
      ${at(1, bud(256, 188, 2.2, 6, '#84CC16'), { off: 2 })}
      ${at(2, `<g transform="translate(256 188) rotate(6) scale(1.5)"><path d="M0 0 Q14 -14 4 -40 Q0 -20 0 0Z" fill="${PURPLE}" stroke="${LINE}" stroke-width="0.9"/>
        <path d="M0 0 Q-14 -14 -4 -40 Q0 -20 0 0Z" fill="#C084FC" stroke="${LINE}" stroke-width="0.9"/>
        <g transform="translate(0 -18)">${face(9, 'sleep')}</g></g>${sparkles([[230, 150, 7], [286, 146, 6]], '#E9D5FF')}`)}
      ${at(2, `${baby(330, 236, 1.2)}${heart(352, 200, 1, '#F472B6', 0)}`)}`),

    // Cảnh 3: lá non chui ra, yếu ớt, mềm mại, ngơ ngác; nắng gió luyện rèn, tím biếc chuyển xanh nõn; lá như bàn tay em bé vẫy theo gió xuân
    () => svg('Lá non tím biếc ngơ ngác, nắng gió làm lá xanh nõn, lá vẫy như bàn tay em bé', `
      ${sky('t32s3sky', '#7DD3FC', '#F0FDF4')}
      ${grass(250, '#86EFAC')}
      ${branch()}
      ${at(1, [[120, 226, -40], [200, 206, -10], [280, 186, 20], [356, 166, -20], [420, 132, 30]].map(([x, y, r], i) => leaf(x, y, 36, r, i % 2 ? '#C084FC' : PURPLE, { mood: 'wow', d: i * 0.4 })).join(''), { off: 2 })}
      ${at(2, `<g transform="translate(130 50)"><circle r="40" fill="#FEF08A" opacity="0.3"/></g>${sun(130, 50, 22)}${wind(320, 70, 1, 0)}${wind(260, 120, 0.7, 2)}`)}
      ${at(2, [[120, 226, -40], [200, 206, -10], [280, 186, 20], [356, 166, -20], [420, 132, 30]].map(([x, y, r], i) => leaf(x, y, 42, r, i % 2 ? '#BEF264' : NON, { mood: 'happy', d: i * 0.4 })).join(''))}
      ${at(3, person(196, 300, 'mai', 'wave', { s: 0.8, mood: 'joy' }))}
      ${at(3, `${sparkles([[244, 150, 6], [176, 150, 6]])}${wind(90, 160, 0.6, 1)}`)}`),

    // Cảnh 4: tháng năm tiếng ve, lá xanh đậm; lá sung sức nhất; nách lá nảy chùm hoa đỏ, vàng, tím rồi kết quả
    () => svg('Tháng năm ve kêu, lá xanh đậm, cây ra hoa đỏ vàng tím rồi kết quả', `
      ${sky('t32s4sky', '#38BDF8', '#E0F2FE')}
      ${sun(400, 42, 22)}
      ${grass(236, '#4ADE80')}${grass(262, '#22C55E')}
      <path d="M226 240 Q230 180 232 140 L248 140 Q250 180 254 240Z" fill="${BARK}" stroke="${LINE}" stroke-width="1"/>
      ${crown(240, 110, 1, '#84CC16', '#65A30D')}
      ${at(1, crown(240, 110, 1, '#16A34A', DAM))}
      ${at(1, `${cicada(232, 186, 1.5)}${soundWaves(252, 182, 0.9, '#F59E0B')}${cicada(250, 220, 1.3, true)}${soundWaves(232, 216, 0.8, '#F59E0B')}`)}
      ${at(2, `${crown(240, 108, 1.12, '#16A34A', DAM)}${sparkles([[150, 60, 8], [330, 54, 9], [120, 140, 7]], '#FEF08A')}`)}
      ${at(2, `<g transform="translate(240 90)">${face(26, 'happy')}</g>`)}
      ${at(3, [[180, 80, '#EF4444'], [300, 70, '#FACC15'], [190, 140, '#A855F7'], [300, 140, '#EF4444'], [240, 40, '#A855F7'], [150, 120, '#FACC15'], [330, 110, '#A855F7']].map(([x, y, c]) => bloom(x, y, c, 1.3)).join(''))}
      ${at(3, `${fruit(214, 160, '#F97316', 7)}${fruit(272, 166, '#F97316', 7)}${fruit(340, 140, '#EAB308', 6)}${fruit(140, 146, '#F97316', 6)}`)}
      ${at(1, flowers([[120, 286, '#F472B6'], [360, 290, '#FDE047']]))}`),

    // Cảnh 5: mùa thu lá về già, gân guốc nổi lên chống chọi gió táp, sương sa
    () => svg('Mùa thu, lá già gân guốc chống chọi gió táp, sương sa', `
      ${sky('t32s5sky', '#FDBA74', '#FEF3C7')}
      ${cloud(140, 40, 0.8, 0, '#FFF7ED')}
      ${grass(250, '#D9A441')}
      ${branch()}
      ${at(1, [[120, 226, -40], [200, 206, -10], [280, 186, 20], [356, 166, -20]].map(([x, y, r], i) => leaf(x, y, 54, r, ['#EAB308', '#D97706', '#CA8A04', '#EA580C'][i], { veins: true, mood: 'old', d: i * 0.5 })).join(''))}
      ${at(1, `${wind(300, 60, 1.2, 0)}${wind(140, 110, 0.9, 2)}${wind(380, 230, 0.8, 1)}`)}
      ${at(1, [[150, 168], [226, 150], [304, 132], [380, 108], [270, 176]].map(([x, y], i) => `<g class="sc-bob" style="--d:${i * 0.5}s"><path d="M${x} ${y - 5} Q${x + 4} ${y + 1} ${x} ${y + 3} Q${x - 4} ${y + 1} ${x} ${y - 5}Z" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="0.8"/></g>`).join(''))}
      ${at(1, leaves([[200, 40, '#D97706', 0], [320, 20, '#EAB308', 2.5], [400, 60, '#EA580C', 4.5]]))}`),

    // Cảnh 6: mùa đông lá như cụ già lụ khụ, úa vàng, úa đỏ, lìa cành để cây ấp ủ chồi biếc mai sau
    () => svg('Mùa đông, lá úa vàng úa đỏ lìa cành, nhường chỗ cho chồi biếc mai sau', `
      ${sky('t32s6sky', '#CBD5E1', '#F1F5F9')}
      ${cloud(130, 40, 0.9, 0, '#F8FAFC')}${cloud(350, 34, 0.8, 2, '#F8FAFC')}
      <path d="M0 210 Q120 196 240 206 T480 204 V300 H0Z" fill="#D6D3D1"/>
      ${bareTree(240, 252, 1.05)}
      ${at(1, [1, 4, 6].map((i, k) => { const [bx, by] = tipAt(240, 252, 1.05, i); return leaf(bx, by, 28, [125, -130, 130][k], ['#CA8A04', '#B91C1C', '#D97706'][k], { veins: true }); }).join(''))}
      ${at(1, leaves([[180, 60, '#CA8A04', 0], [280, 40, '#B91C1C', 1.8], [340, 80, '#D97706', 3.6], [220, 30, '#EAB308', 5.2]]))}
      ${at(1, `${leaf(120, 262, 46, 76, '#CA8A04', { veins: true, mood: 'old', sway: false })}${leaf(370, 264, 44, -76, '#B91C1C', { veins: true, mood: 'old', sway: false })}`)}
      ${at(1, [0, 2, 3, 5, 7].map(i => { const [bx, by] = tipAt(240, 252, 1.05, i); return bud(bx, by + 2, 1.3, 0, i % 2 ? PURPLE : '#84CC16'); }).join(''))}
      ${at(1, sparkles([[240, 60, 8], [176, 116, 6], [312, 110, 6]], '#FDE68A'))}`),
  ],
};
