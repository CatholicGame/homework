// Cảnh phim bài thơ "Bài ca môi trường" (Nguyễn Thị Loạt), Tuần 33 Tiếng Việt 3: 2 khổ, mỗi khổ một cảnh.
// data-l="k": hiện từ dòng thứ k của khổ (đếm từ 1); data-off: ẩn từ dòng đó; data-talk: nhân vật nói ở dòng đó thì nhún.
// Khổ 1: bãi biển; Linh ("bé") kể mẹ nghe bài cô dạy: mặc áo phao, không làm ồn, không vứt rác (vỏ bim bim, kẹo, bánh,
//   túi ni lông) mà bỏ vào thùng rác đúng nơi quy định. Khổ 2: biển trong xanh, tôm cá sinh sôi, thuyền đánh cá,
//   tàu bè, máy bay, khách du lịch vui lòng; Linh và cô Hương. Nhân vật: Linh, mẹ, Nam, Minh, cô Hương, khách (cast.js).
import { person, headOnly } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, sparkles, speech, heart, LINE } from '../sceneKit.js';

const SEA = '#38BDF8', SEA_D = '#0EA5E9', SAND = '#FDE68A';

/** Sóng trắng nhỏ trên mặt biển. */
const waves = (y, list) => list.map((x, i) => `<g class="sc-drift" style="--d:${i * 1.3}s"><path d="M${x} ${y} q6 -5 12 0 q6 5 12 0" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.85"/></g>`).join('');

/** Đầu bạn nhỏ đang bơi (vest: mặc áo phao cam). */
const swimmer = (x, y, who, vest, d = 0) => `<g transform="translate(${x} ${y})"><g class="sc-bob" style="--d:${d}s">
  ${vest ? `<path d="M-15 4 Q-16 -6 -8 -8 L-4 2 H4 L8 -8 Q16 -6 15 4 Q0 12 -15 4Z" fill="#F97316" stroke="${LINE}" stroke-width="0.9"/>
    <path d="M-12 0 H-6 M6 0 H12" stroke="#FEF08A" stroke-width="2"/>` : ''}
  <g transform="translate(0 -14)">${headOnly(who, { s: 0.62, mood: 'joy' })}</g>
  <path d="M-18 6 q6 -4 12 0 q6 4 12 0 q6 -4 12 0" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></g></g>`;

/** Biển báo tròn gạch chéo đỏ (inner vẽ quanh 0, 0) trên cột (x chân cột, y đất). */
const noSign = (x, y, inner, h = 70) => `<g><rect x="${x - 2}" y="${y - h}" width="4" height="${h}" fill="#64748B"/>
  <g transform="translate(${x} ${y - h})"><circle r="19" fill="#fff" stroke="#DC2626" stroke-width="4"/>${inner}<path d="M-13 -13 L13 13" stroke="#DC2626" stroke-width="4"/></g></g>`;
const speaker = `<path d="M-9 -4 H-4 L3 -10 V10 L-4 4 H-9Z" fill="#334155"/><path d="M6 -5 q4 5 0 10 M9 -8 q7 8 0 16" stroke="#334155" stroke-width="1.8" fill="none"/>`;

/** Rác: vỏ bim bim, giấy kẹo, vỏ bánh, túi ni lông, chai. */
const chipBag = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-10 -14 L10 -14 L9 12 L-9 12Z" fill="#F59E0B" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M-10 -14 l2 -3 l2 3 l2 -3 l2 3 l2 -3 l2 3 l2 -3 l2 3 l2 -3 l2 3 M-9 12 l2 3 l2 -3 l2 3 l2 -3 l2 3 l2 -3 l2 3 l2 -3 l2 3" stroke="${LINE}" stroke-width="0.7" fill="none"/>
  <circle cx="0" cy="-1" r="5" fill="#EF4444"/></g>`;
const candy = (x, y, c = '#EC4899', r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="6" ry="4.4" fill="${c}" stroke="${LINE}" stroke-width="0.8"/>
  <path d="M-6 0 L-12 -5 L-12 5Z M6 0 L12 -5 L12 5Z" fill="${c}" stroke="${LINE}" stroke-width="0.8"/></g>`;
const cakeWrap = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-12" y="-6" width="24" height="12" rx="2" fill="#A7F3D0" stroke="${LINE}" stroke-width="0.8"/><path d="M-6 -6 V6 M6 -6 V6" stroke="#10B981" stroke-width="1.4"/></g>`;
const nylon = (x, y, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-12 -10 Q-14 8 -8 12 Q0 15 8 12 Q14 8 12 -10 L6 -10 Q6 -16 3 -16 L3 -10 H-3 V-16 Q-6 -16 -6 -10Z" fill="#F1F5F9" fill-opacity="0.9" stroke="#64748B" stroke-width="0.9"/>
  <path d="M-6 0 Q0 4 6 0" stroke="#CBD5E1" stroke-width="1" fill="none"/></g>`;

/** Thùng rác có nắp (x giữa, y đất, màu). */
const bin = (x, y, c = '#16A34A', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-14 -40 H14 L11 0 H-11Z" fill="${c}" stroke="${LINE}" stroke-width="1"/>
  <rect x="-17" y="-46" width="34" height="7" rx="3" fill="${c}" stroke="${LINE}" stroke-width="1"/><rect x="-5" y="-50" width="10" height="4" rx="2" fill="${LINE}"/>
  <path d="M-5 -32 V-8 M5 -32 V-8" stroke="#fff" stroke-width="1.6" opacity="0.6"/></g>`;

/** Cá nhỏ (x, y, màu, s, flip). */
const fish = (x, y, c = '#FB923C', s = 1, flip = false, d = 0) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="sc-drift" style="--d:${d}s">
  <path d="M-12 0 Q0 -10 12 0 Q0 10 -12 0Z" fill="${c}" stroke="${LINE}" stroke-width="0.8"/><path d="M-12 0 L-20 -7 L-19 0 L-20 7Z" fill="${c}" stroke="${LINE}" stroke-width="0.8"/>
  <circle cx="6" cy="-2" r="1.8" fill="#1F2937"/><path d="M-2 -6 Q0 0 -2 6" stroke="#fff" stroke-width="1" fill="none" opacity="0.6"/></g></g>`;
const squid = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:0.7s">
  <path d="M0 -20 Q11 -10 9 6 H-9 Q-11 -10 0 -20Z" fill="#F9A8D4" stroke="${LINE}" stroke-width="0.9"/>
  ${[-7, -3.5, 0, 3.5, 7].map((dx, i) => `<path d="M${dx} 6 q${i % 2 ? 3 : -3} 8 0 16" stroke="#F472B6" stroke-width="2.4" fill="none" stroke-linecap="round"/>`).join('')}
  <circle cx="-3.4" cy="0" r="1.8" fill="#1F2937"/><circle cx="3.4" cy="0" r="1.8" fill="#1F2937"/></g></g>`;
const shrimp = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:1.3s">
  <path d="M12 -6 Q16 6 4 10 Q-8 12 -12 4 Q-6 6 -2 2 Q4 -2 6 -8Z" fill="#FB7185" stroke="${LINE}" stroke-width="0.8"/>
  <path d="M-12 4 L-18 0 M-12 4 L-18 8" stroke="#FB7185" stroke-width="2" stroke-linecap="round"/>
  <path d="M10 -8 Q20 -18 26 -12 M10 -8 Q16 -20 22 -20" stroke="#E11D48" stroke-width="0.9" fill="none"/><circle cx="9" cy="-4" r="1.4" fill="#1F2937"/>
  <path d="M0 4 v4 M4 4 v5 M-4 5 v4" stroke="#E11D48" stroke-width="0.9"/></g></g>`;
const crab = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-walk" style="--d:0.4s">
  ${[-1, 1].map(k => `<path d="M${k * 10} 0 l${k * 8} 6 M${k * 11} -3 l${k * 9} 3 M${k * 9} 3 l${k * 6} 8" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/>
    <path d="M${k * 9} -6 L${k * 16} -14" stroke="#DC2626" stroke-width="2.4"/><path d="M${k * 16} -14 a4 4 0 1 1 ${k * 1} -0.1" fill="#EF4444" stroke="${LINE}" stroke-width="0.7"/>`).join('')}
  <ellipse cx="0" cy="-2" rx="12" ry="8" fill="#EF4444" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M-3 -9 V-13 M3 -9 V-13" stroke="${LINE}" stroke-width="1"/><circle cx="-3" cy="-13.5" r="1.6" fill="#1F2937"/><circle cx="3" cy="-13.5" r="1.6" fill="#1F2937"/></g></g>`;

/** Thuyền đánh cá có buồm và lưới (x giữa, y mặt nước). */
const fishingBoat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:0.5s">
  <path d="M-30 -8 H30 L22 6 H-22Z" fill="#B45309" stroke="${LINE}" stroke-width="1"/><path d="M-28 -6 H28" stroke="#FDE68A" stroke-width="2"/>
  <path d="M0 -8 V-52" stroke="#78350F" stroke-width="2"/><path d="M2 -50 Q24 -30 2 -12Z" fill="#F87171" stroke="${LINE}" stroke-width="0.8"/>
  <path d="M-22 -8 Q-34 6 -40 20" stroke="#78350F" stroke-width="1.2" fill="none"/>
  <path d="M-40 20 Q-48 30 -36 38 Q-24 34 -30 20Z" fill="none" stroke="#475569" stroke-width="0.8" stroke-dasharray="2 2"/></g></g>`;
/** Tàu chở hàng (x giữa, y mặt nước). */
const ship = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:1.2s">
  <path d="M-46 -10 H46 L36 8 H-40Z" fill="#1E40AF" stroke="${LINE}" stroke-width="1"/><path d="M-44 -6 H44" stroke="#fff" stroke-width="2"/>
  ${[-34, -20, -6].map((dx, i) => `<rect x="${dx}" y="-22" width="13" height="12" fill="${['#EF4444', '#FACC15', '#22C55E'][i]}" stroke="${LINE}" stroke-width="0.7"/>`).join('')}
  <rect x="14" y="-32" width="22" height="22" fill="#F8FAFC" stroke="${LINE}" stroke-width="0.8"/><rect x="18" y="-28" width="14" height="5" fill="#7DD3FC"/>
  <rect x="24" y="-42" width="7" height="10" fill="#DC2626"/></g></g>`;
/** Thuyền buồm nhỏ. */
const sailboat = (x, y, s = 1, c = '#FDE047') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${(x % 3)}s">
  <path d="M-16 -4 H16 L10 4 H-10Z" fill="#F8FAFC" stroke="${LINE}" stroke-width="0.8"/><path d="M0 -4 V-34" stroke="#78350F" stroke-width="1.4"/>
  <path d="M1 -33 L16 -6 H1Z" fill="${c}" stroke="${LINE}" stroke-width="0.7"/><path d="M-1 -28 L-12 -6 H-1Z" fill="#fff" stroke="${LINE}" stroke-width="0.7"/></g></g>`;
/** Hải đăng trên mỏm đá. */
const lighthouse = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-26 6 Q-20 -10 0 -10 Q22 -10 26 6Z" fill="#78716C" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M-9 -10 L-6 -62 H6 L9 -10Z" fill="#fff" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M-8.2 -24 H8.2 L8.6 -16 H-8.6Z M-7.2 -44 H7.2 L7.6 -36 H-7.6Z" fill="#DC2626"/>
  <rect x="-8" y="-72" width="16" height="10" fill="#FDE047" stroke="${LINE}" stroke-width="0.8"/><path d="M-10 -72 L0 -80 L10 -72Z" fill="#DC2626" stroke="${LINE}" stroke-width="0.8"/>
  <path class="sc-twinkle" d="M8 -67 L40 -76 V-58Z" fill="#FEF08A" opacity="0.6"/></g>`;
/** Máy bay. */
const plane = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-drift" style="--d:2s">
  <path d="M-30 0 Q-30 -6 -20 -6 H24 Q34 -4 34 0 Q34 4 24 5 H-20 Q-30 5 -30 0Z" fill="#F8FAFC" stroke="${LINE}" stroke-width="0.9"/>
  <path d="M-2 -4 L-14 -22 H-6 L12 -4Z M-2 4 L-12 18 H-4 L12 4Z M-24 -5 L-32 -16 H-26 L-16 -5Z" fill="#60A5FA" stroke="${LINE}" stroke-width="0.8"/>
  ${[-8, -2, 4, 10, 16].map(dx => `<circle cx="${dx}" cy="-1" r="1.4" fill="#0EA5E9"/>`).join('')}<path d="M26 -3 Q31 -2 32 0 H26Z" fill="#1E40AF"/></g></g>`;
/** Chim hải âu. */
const gull = (x, y, s = 1, d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="sc-bob" style="--d:${d}s"><path d="M-12 0 Q-6 -8 0 0 Q6 -8 12 0" stroke="#475569" stroke-width="2.2" fill="none" stroke-linecap="round"/></g></g>`;
/** Ô che nắng (x chân, y đất). */
const umbrella = (x, y, c1 = '#EF4444', c2 = '#fff') => `<g><path d="M${x} ${y} V${y - 74}" stroke="#78350F" stroke-width="2.4"/>
  <path d="M${x - 46} ${y - 66} Q${x} ${y - 104} ${x + 46} ${y - 66}Z" fill="${c1}" stroke="${LINE}" stroke-width="1"/>
  <path d="M${x - 16} ${y - 66} Q${x - 10} ${y - 94} ${x} ${y - 94} Q${x - 4} ${y - 80} ${x - 16} ${y - 66}Z M${x + 16} ${y - 66} Q${x + 10} ${y - 94} ${x} ${y - 94} Q${x + 4} ${y - 80} ${x + 16} ${y - 66}Z" fill="${c2}"/></g>`;
/** Rổ hải sản (cá, tôm, mực). */
const basket = (x, y) => `<g transform="translate(${x} ${y})">
  ${fish(-8, -16, '#94A3B8', 0.8)}${shrimp(10, -16, 0.7)}${fish(4, -22, '#FB923C', 0.7, true)}
  <path d="M-24 -14 H24 L18 4 H-18Z" fill="#D4A54A" stroke="${LINE}" stroke-width="1"/>
  <path d="M-21 -8 H21 M-19 -2 H19 M-12 -14 L-10 4 M0 -14 V4 M12 -14 L10 4" stroke="#A16207" stroke-width="1"/></g>`;

export default [
  // Khổ 1: Linh kể mẹ bài cô dạy trên bãi biển; áo phao; không làm ồn; không vứt rác; bỏ rác vào thùng đúng nơi quy định
  () => svg('Trên bãi biển, bé kể mẹ nghe bài bảo vệ môi trường cô dạy', `
    ${sky('t33s1sky', '#7DD3FC', '#E0F2FE')}
    ${sun(396, 40, 18)}${cloud(150, 36, 0.7, 0)}${cloud(300, 54, 0.5, 3)}
    <rect y="108" width="${W}" height="100" fill="${SEA}"/><path d="M0 108 H${W}" stroke="${SEA_D}" stroke-width="3"/>
    ${waves(130, [120, 220, 380])}${waves(170, [80, 170, 300, 420])}
    <path d="M0 200 Q120 188 240 196 T480 194 V300 H0Z" fill="${SAND}"/>
    <path d="M0 200 Q120 188 240 196 T480 194" stroke="#fff" stroke-width="4" fill="none" opacity="0.8"/>
    ${at(1, `${person(112, 292, 'me', 'stand', { s: 0.8 })}`, { off: 9 })}
    ${at(9, person(112, 292, 'me', 'raise', { s: 0.8, mood: 'joy' }), { talk: '9,10,11,12' })}
    ${at(1, person(168, 294, 'linh', 'wave', { s: 0.84, flip: true, mood: 'joy' }), { talk: '1,2,3,4,5,6,7,8' })}
    ${at(2, speech(150, 64, 110, 62, 166, 160, `<g transform="translate(-26 8)">${headOnly('coHuong', { s: 0.72, mood: 'joy' })}</g>
      <g transform="translate(24 4)"><circle r="17" fill="#38BDF8" stroke="${LINE}" stroke-width="1"/>
      <path d="M-11 -6 q6 -6 12 -2 q2 6 -4 8 q-6 0 -8 -6Z M3 4 q6 -2 8 3 q-2 6 -7 5Z" fill="#4ADE80"/>
      <path d="M-4 -26 Q6 -30 10 -20 Q2 -18 -4 -26Z" fill="#22C55E"/></g>`))}
    ${at(3, `${swimmer(270, 152, 'nam', false, 0)}${swimmer(326, 160, 'minh', false, 0.8)}`, { off: 4 })}
    ${at(4, `${swimmer(270, 152, 'nam', true, 0)}${swimmer(326, 160, 'minh', true, 0.8)}`)}
    ${at(5, noSign(384, 222, speaker, 62))}
    ${at(6, `<g><circle cx="252" cy="244" r="36" fill="none" stroke="#DC2626" stroke-width="3" stroke-dasharray="6 5" opacity="0.8"/></g>`, { off: 10 })}
    ${at(6, `<path d="M224 220 L280 268 M280 220 L224 268" stroke="#DC2626" stroke-width="4" stroke-linecap="round" opacity="0.75"/>`, { off: 7 })}
    ${at(7, `${chipBag(236, 236, -20)}${candy(270, 262, '#EC4899', 20)}${candy(230, 266, '#8B5CF6', -30)}`, { off: 10 })}
    ${at(8, `${cakeWrap(270, 230, 15)}${nylon(252, 254, -10)}`, { off: 10 })}
    ${at(10, bin(310, 292, '#16A34A'))}
    ${at(10, `${person(264, 294, 'nam', 'give', { s: 0.76, mood: 'joy' })}${chipBag(300, 222, 10)}`)}
    ${at(11, `${bin(346, 292, '#2563EB')}${bin(382, 292, '#F59E0B')}`)}
    ${at(11, `<path d="M346 196 V214 M338 206 L346 214 L354 206" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`)}
    ${at(12, `${sparkles([[220, 230, 8], [360, 200, 7], [240, 130, 7], [130, 160, 6]])}${heart(208, 186, 1.3, '#22C55E', 0)}${heart(206, 146, 1, '#F43F5E', 0.6)}`)}`),

  // Khổ 2: biển trong xanh, không khí trong lành; mực tôm cá ghẹ sinh sôi; thức ăn cho con người; tàu thuyền, máy bay;
  //        khách du lịch vừa lòng; biển đẹp nước trong nhờ bé nhớ lời cô bảo vệ môi trường
  () => svg('Biển trong xanh, tôm cá sinh sôi, tàu thuyền tấp nập, khách du lịch vui', `
    ${sky('t33s2sky', '#7DD3FC', '#F0F9FF')}
    ${cloud(110, 30, 0.6, 1)}${cloud(250, 22, 0.5, 4)}
    <rect y="96" width="${W}" height="140" fill="#60A5FA"/>
    ${at(1, `<rect y="96" width="${W}" height="140" fill="#22D3EE" opacity="0.75"/><rect y="96" width="${W}" height="16" fill="#A5F3FC" opacity="0.6"/>`)}
    <path d="M0 96 H${W}" stroke="${SEA_D}" stroke-width="2.4"/>
    ${waves(114, [100, 260, 360])}
    ${at(1, sparkles([[140, 124, 6], [300, 126, 5]], '#fff'))}
    ${at(2, `${sun(398, 36, 18)}${gull(320, 44, 1, 0)}${gull(350, 60, 0.8, 0.7)}${gull(176, 62, 0.7, 1.4)}`)}
    ${at(3, `${fish(130, 148, '#FB923C', 1.1)}${fish(336, 150, '#FACC15', 1, true, 1)}${squid(206, 150, 1)}${shrimp(272, 160, 1.1)}`)}
    ${at(4, `${fish(370, 128, '#F472B6', 0.6, true, 2)}${fish(392, 142, '#F472B6', 0.55, true, 2.5)}${fish(362, 150, '#F472B6', 0.5, true, 3)}
      ${fish(100, 180, '#A3E635', 0.55, false, 1)}${fish(122, 194, '#A3E635', 0.5, false, 1.6)}${fish(240, 130, '#FDE047', 0.5, false, 2.2)}`)}
    ${at(5, fishingBoat(150, 100, 0.8))}
    <path d="M0 236 Q120 226 240 232 T480 230 V300 H0Z" fill="${SAND}"/>
    <path d="M0 236 Q120 226 240 232 T480 230" stroke="#fff" stroke-width="3" fill="none" opacity="0.8"/>
    ${at(3, crab(162, 264, 0.9))}
    ${at(6, basket(110, 282))}
    ${at(7, ship(330, 100, 0.7))}
    ${at(8, lighthouse(408, 104, 0.8))}
    ${at(9, plane(200, 50, 0.8))}
    ${at(10, `${sailboat(250, 104, 0.8, '#FDE047')}${sailboat(84, 108, 0.6, '#F472B6')}`)}
    ${at(11, umbrella(334, 286, '#EF4444'))}
    ${at(11, `${person(312, 294, 'khach', 'stand', { s: 0.66 })}${person(360, 294, 'chu', 'stand', { s: 0.66, flip: true })}`, { off: 12 })}
    ${at(12, `${person(312, 294, 'khach', 'wave', { s: 0.66, mood: 'joy' })}${person(360, 294, 'chu', 'clap', { s: 0.66, mood: 'joy', flip: true })}${heart(336, 172, 1, '#F43F5E', 0)}`)}
    ${at(13, sparkles([[200, 140, 8], [300, 132, 7], [120, 140, 6], [380, 130, 6]], '#fff'))}
    ${at(14, person(180, 296, 'linh', 'cheer', { s: 0.76, mood: 'joy' }))}
    ${at(15, person(244, 294, 'coHuong', 'clap', { s: 0.68, mood: 'joy', flip: true }))}
    ${at(16, `${heart(212, 200, 1.3, '#22C55E', 0)}${sparkles([[150, 210, 7], [276, 196, 6]])}`)}`),
];
