// Phim truyện "Người mẹ hiền" (theo Nguyễn Văn Thịnh), Tuần 7 Tiếng Việt 3: 6 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: Nam, Minh, cô giáo (coHuong), bác bảo vệ (baoVe). Bức tường thủng vẽ nhìn ngang: trong sân trường bên trái,
// ngoài phố bên phải; bạn chui qua lỗ thì thấy chân ở bên trong, đầu ló ra bên ngoài.
import { person, headOnly } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, tree, sparkles, speech, thought, word, soundWaves, heart, school, classroom, desk, LINE } from '../sceneKit.js';

const SKIN = '#FADCC4';
const WX = 264;          // mép trái bức tường
const HY = 192;          // tâm lỗ thủng

/** Lều xiếc sọc đỏ trắng, cờ đuôi nheo. */
const circusTent = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-34 0 V-22 H34 V0Z" fill="#fff" stroke="${LINE}" stroke-width="1"/>
  ${[-26, -10, 6, 22].map(dx => `<rect x="${dx}" y="-22" width="8" height="22" fill="#EF4444"/>`).join('')}
  <path d="M-12 0 Q0 -16 12 0Z" fill="#7C2D12"/>
  <path d="M-40 -20 L0 -50 L40 -20Z" fill="#EF4444" stroke="${LINE}" stroke-width="1"/>
  <path d="M-20 -20 L0 -50 L-4 -20Z M12 -20 L0 -50 L24 -20Z" fill="#fff"/>
  <path d="M0 -50 V-64" stroke="#78350F" stroke-width="1.6"/><g class="sc-sway"><path d="M0 -64 L12 -60 L0 -56Z" fill="#FACC15"/></g></g>`;

/** Bóng tung hứng nhảy lên. */
const balls = (x, y) => ['#3B82F6', '#FACC15', '#22C55E'].map((c, i) =>
  `<g class="sc-bob" style="--d:${i * 0.5}s"><circle cx="${x + i * 10}" cy="${y - (i % 2) * 8}" r="4" fill="${c}" stroke="${LINE}" stroke-width="0.6"/></g>`).join('');

/** Hàng rào sắt và cổng trường (khóa: thêm ổ khóa). */
const gate = (x, y, locked) => `<g>
  <rect x="${x - 8}" y="${y - 96}" width="14" height="96" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x + 94}" y="${y - 96}" width="14" height="96" fill="#FDE68A" stroke="${LINE}" stroke-width="1"/>
  ${Array.from({ length: 11 }, (_, i) => `<path d="M${x + 10 + i * 8} ${y - 84} V${y}" stroke="#334155" stroke-width="2.4"/>`).join('')}
  <path d="M${x + 6} ${y - 84} H${x + 94} M${x + 6} ${y - 40} H${x + 94} M${x + 6} ${y - 8} H${x + 94}" stroke="#334155" stroke-width="3"/>
  ${locked ? `<g transform="translate(${x + 50} ${y - 40})"><path d="M-6 -2 V-9 Q0 -16 6 -9 V-2" stroke="#78716C" stroke-width="2.4" fill="none"/>
    <rect x="-9" y="-3" width="18" height="15" rx="3" fill="#F59E0B" stroke="${LINE}" stroke-width="1"/><circle cx="0" cy="4" r="2" fill="${LINE}"/></g>` : ''}</g>`;

/** Bức tường nhìn ngang, lỗ thủng giữa tường; bên phải là phố, xa xa có lều xiếc. */
const wallScene = (id) => `
  ${sky(id, '#7DD3FC', '#F0F9FF')}
  ${cloud(140, 40, 0.8, 1)}${cloud(380, 30, 0.6, 3)}
  ${school(30, 196, 170, 100)}
  ${tree(214, 196, 0.8)}
  ${circusTent(364, 196, 0.8)}${balls(334, 118)}
  <rect y="196" width="${WX}" height="${H - 196}" fill="#E7E5E4"/>
  ${[218, 248].map(y => `<path d="M0 ${y} H${WX}" stroke="#D6D3D1" stroke-width="1.2"/>`).join('')}
  <rect x="${WX}" y="196" width="${W - WX}" height="${H - 196}" fill="#CBD5E1"/>
  <rect x="${WX}" y="196" width="${W - WX}" height="16" fill="#E2E8F0"/>
  <path d="M${WX} 250 H${W}" stroke="#F8FAFC" stroke-width="3" stroke-dasharray="14 10"/>
  <rect x="${WX}" y="106" width="22" height="182" fill="#FCD9A8" stroke="${LINE}" stroke-width="1"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${WX} ${116 + i * 20} H${WX + 22}" stroke="#E8B97E" stroke-width="1"/><path d="M${WX + (i % 2 ? 8 : 14)} ${116 + i * 20} v20" stroke="#E8B97E" stroke-width="1"/>`).join('')}
  <rect x="${WX - 4}" y="100" width="30" height="8" rx="2" fill="#B45309"/>
  <path d="M${WX} ${HY - 22} Q${WX + 6} ${HY - 28} ${WX + 22} ${HY - 22} V${HY + 22} Q${WX + 12} ${HY + 26} ${WX} ${HY + 22}Z" fill="#57534E"/>
  <path d="M${WX} ${HY - 22} l-4 -4 M${WX + 22} ${HY + 22} l4 4 M${WX} ${HY + 22} l-3 5" stroke="#A8A29E" stroke-width="2" stroke-linecap="round"/>`;

/** Đống gạch dưới chân tường để trèo lên lỗ. */
const bricks = (x, y) => `<g>${[[0, 0], [20, 0], [10, -12], [30, -12], [20, -24]].map(([dx, dy]) =>
  `<rect x="${x + dx - 10}" y="${y + dy - 12}" width="20" height="12" fill="#C2410C" stroke="${LINE}" stroke-width="0.9"/>`).join('')}</g>`;

/** Phần thân dưới thò ở trong tường: quần soóc + hai chân nằm ngang (kick: giãy). */
function legsIn(who, kick) {
  const c = { nam: ['#1E3A6E', '#3B6FD8', '#FFFFFF'], minh: ['#1E2F5A', '#3368D6', '#4A8FE0'] }[who];
  const legs = [-5, 5].map((dy, i) => `<g ${kick ? `class="sc-sway" style="--d:${i * 0.4}s"` : ''}>
    <path d="M${WX - 16} ${HY + dy} L${WX - 46} ${HY + dy + (kick ? (i ? 6 : -6) : 2)}" stroke="${LINE}" stroke-width="8" stroke-linecap="round"/>
    <path d="M${WX - 16} ${HY + dy} L${WX - 46} ${HY + dy + (kick ? (i ? 6 : -6) : 2)}" stroke="${SKIN}" stroke-width="6.2" stroke-linecap="round"/>
    <ellipse cx="${WX - 50}" cy="${HY + dy + (kick ? (i ? 6 : -6) : 2)}" rx="3" ry="5.6" fill="${c[1]}" stroke="${LINE}" stroke-width="0.9"/></g>`).join('');
  return `<g>${legs}
    <path d="M${WX + 2} ${HY - 12} H${WX - 6} L${WX - 22} ${HY - 10} V${HY + 10} L${WX - 6} ${HY + 12} H${WX + 2}Z" fill="${c[0]}" stroke="${LINE}" stroke-width="1"/>
    <path d="M${WX + 2} ${HY - 13} H${WX - 4} V${HY - 8} H${WX + 2}Z" fill="${c[2]}" stroke="${LINE}" stroke-width="0.8"/></g>`;
}

/** Đầu ló ra phía ngoài tường (kèm hai tay chống). */
const headOut = (who, mood, d = 0) => `<g transform="translate(${WX + 36} ${HY - 2})"><g class="sc-bob" style="--d:${d}s">
  <path d="M-14 14 L4 22 M-14 4 L6 26" stroke="${LINE}" stroke-width="7" stroke-linecap="round"/>
  <path d="M-14 14 L4 22 M-14 4 L6 26" stroke="${SKIN}" stroke-width="5.2" stroke-linecap="round"/>
  ${headOnly(who, { mood, s: 0.82, rot: 10 })}</g></g>`;

/** Bụi đất phủi bay. */
const dust = (list) => list.map(([x, y], i) => `<g class="sc-rise" style="--d:${i * 0.5}s"><circle cx="${x}" cy="${y}" r="5" fill="#D6B38A" opacity="0.8"/><circle cx="${x + 6}" cy="${y - 4}" r="3.6" fill="#E7C9A1" opacity="0.8"/></g>`).join('');

/** Vết đất lấm lem trên người. */
const smudges = (list) => list.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="2.2" fill="#A16207" opacity="0.55"/>`).join('');

/** Cửa lớp ở bên phải (mép trong), Minh thập thò. */
const classDoor = (x) => `<rect x="${x}" y="88" width="64" height="122" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
  <rect x="${x + 6}" y="94" width="52" height="116" fill="#FDE68A" opacity="0.5"/>`;

export default {
  sentences: true,
  groups: [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [12, 13, 14, 15, 16], [17, 18], [19, 20, 21], [22, 23, 24, 25]],
  scenes: [
    // Cảnh 1: Minh thì thầm rủ Nam ra phố xem xiếc; Nam tò mò; cổng trường khóa; Minh biết chỗ tường thủng
    () => svg('Minh rủ Nam trốn ra phố xem xiếc, cổng trường đã khóa', `
      ${sky('t07s1sky', '#7DD3FC', '#F0F9FF')}
      ${sun(396, 38, 16)}${cloud(120, 34, 0.7, 2)}
      ${school(40, 196, 190, 106)}
      <rect y="196" width="${W}" height="${H - 196}" fill="#E7E5E4"/>
      ${[218, 248].map(y => `<path d="M0 ${y} H${W}" stroke="#D6D3D1" stroke-width="1.2"/>`).join('')}
      ${tree(250, 198, 0.8)}
      ${gate(300, 200, false)}
      ${at(4, gate(300, 200, true))}
      ${at(1, person(176, 284, 'minh', 'point', { s: 0.94, mood: 'joy' }), { talk: '1,2,5' })}
      ${at(1, person(232, 286, 'nam', 'stand', { s: 0.94, flip: true }), { off: 3 })}
      ${at(3, person(232, 286, 'nam', 'stand', { s: 0.94, flip: true, mood: 'wow' }))}
      ${at(2, thought(286, 70, 130, 72, 238, 150, `${circusTent(-14, 30, 0.8)}${balls(30, -4)}`))}
      ${at(4, `<path d="M330 120 L370 160 M370 120 L330 160" stroke="#DC2626" stroke-width="5" stroke-linecap="round" opacity="0.85"/>`)}
      ${at(6, speech(156, 76, 84, 68, 180, 160, `
        <rect x="-26" y="-26" width="52" height="52" fill="#FCD9A8" stroke="${LINE}" stroke-width="1"/>
        ${[-13, 0, 13].map(y => `<path d="M-26 ${y} H26" stroke="#E8B97E" stroke-width="1"/>`).join('')}
        <path d="M-12 26 V8 Q0 -2 12 8 V26Z" fill="#57534E"/>`))}`),

    // Cảnh 2: hai em ở bên bức tường; Minh chui đầu ra, Nam đẩy Minh lọt ra ngoài; Nam lách ra thì bác bảo vệ tới, nắm chặt chân
    () => svg('Minh chui qua lỗ tường, Nam lách theo thì bác bảo vệ tới', `
      ${wallScene('t07s2sky')}
      ${bricks(226, 288)}
      ${at(1, person(180, 286, 'minh', 'stand', { s: 0.9 }), { off: 2 })}
      ${at(1, person(222, 288, 'nam', 'stand', { s: 0.9 }), { off: 2 })}
      ${at(2, `${legsIn('minh')}${headOut('minh', 'wow')}`, { off: 3 })}
      ${at(2, person(196, 288, 'nam', 'give', { s: 0.9 }), { off: 4 })}
      ${at(3, person(330, 286, 'minh', 'cheer', { s: 0.9, mood: 'joy', flip: true }), { off: 4 })}
      ${at(4, `${legsIn('nam')}${headOut('nam', 'wow')}`)}
      ${at(4, person(168, 290, 'baoVe', 'give', { s: 0.86 }), { talk: '5,6' })}
      ${at(5, speech(140, 72, 60, 46, 170, 148, word('?', 26, '#2563EB', 0, 0)))}
      ${at(6, `${word('!', 22, '#DC2626', 196, 64)}`)}`),

    // Cảnh 3: Nam vùng vẫy, bác càng nắm chặt; Nam khóc toáng; có tiếng cô giáo: "Bác nhẹ tay kẻo cháu đau…"
    () => svg('Nam bị kẹt ở lỗ tường, khóc; cô giáo tới nhờ bác bảo vệ nhẹ tay', `
      ${wallScene('t07s3sky')}
      ${bricks(226, 288)}
      ${at(1, legsIn('nam', true))}
      ${at(1, headOut('nam', 'sad'), { off: 2 })}
      ${at(2, headOut('nam', 'cry'))}
      ${at(2, `${word('!', 18, '#38BDF8', 336, 160)}${word('!', 14, '#38BDF8', 346, 176)}`)}
      ${at(1, person(168, 290, 'baoVe', 'give', { s: 0.86 }), { off: 4 })}
      ${at(4, person(168, 290, 'baoVe', 'give', { s: 0.86, mood: 'wow' }))}
      ${at(3, person(96, 284, 'coHuong', 'wave', { s: 0.82 }), { off: 5, talk: '3,4' })}
      ${at(5, person(96, 284, 'coHuong', 'point', { s: 0.82 }), { talk: '5' })}
      ${at(3, soundWaves(122, 118, 0.9, '#A855F7'))}
      ${at(4, speech(154, 66, 90, 52, 116, 130, `${heart(-14, 0, 1.6, '#F43F5E', 0)}<path d="M8 -8 q8 8 0 16 M16 -12 q10 12 0 24" stroke="#A855F7" stroke-width="2" fill="none" stroke-linecap="round"/>`))}
      ${at(5, sparkles([[200, 150, 6], [246, 140, 5]]))}`),

    // Cảnh 4: cô kéo Nam lùi lại, đỡ em ngồi dậy; phủi đất cát và đưa em về lớp
    () => svg('Cô giáo đỡ Nam ngồi dậy, phủi đất cát cho em', `
      ${wallScene('t07s4sky')}
      ${bricks(226, 288)}
      ${at(1, person(212, 290, 'nam', 'sit', { s: 0.9, mood: 'sad' }), { off: 2 })}
      ${at(1, smudges([[204, 230], [220, 248], [196, 262], [214, 276]]), { off: 2 })}
      ${at(1, person(150, 286, 'coHuong', 'give', { s: 0.84 }), { off: 2 })}
      ${at(1, person(342, 290, 'minh', 'stand', { s: 0.6, mood: 'sad', flip: true }))}
      ${at(2, dust([[200, 230], [222, 214], [190, 250]]))}
      ${at(2, person(216, 288, 'nam', 'stand', { s: 0.9, mood: 'sad', flip: true }))}
      ${at(2, person(150, 286, 'coHuong', 'point', { s: 0.84, flip: true }))}`),

    // Cảnh 5: trong lớp, Nam vừa đau vừa xấu hổ bật khóc; cô xoa đầu Nam, gọi Minh thập thò ở cửa; "Từ nay các em có trốn học…?"
    () => svg('Trong lớp, cô xoa đầu Nam và gọi Minh vào', `
      ${classroom(214)}
      ${classDoor(356)}
      ${at(1, person(240, 300, 'nam', 'stand', { s: 0.9, mood: 'cry' }))}
      ${at(1, person(196, 284, 'coHuong', 'stand', { s: 0.86 }), { off: 2 })}
      ${at(2, person(196, 284, 'coHuong', 'give', { s: 0.86 }), { talk: '3' })}
      ${at(2, `<g transform="translate(372 150)">${headOnly('minh', { mood: 'sad', s: 0.9 })}</g>
        <path d="M356 166 h-6" stroke="${LINE}" stroke-width="2"/>`, { off: 3 })}
      ${at(3, person(320, 290, 'minh', 'stand', { s: 0.86, mood: 'shy', flip: true }))}
      ${at(3, speech(120, 70, 70, 50, 176, 136, word('?', 28, '#7C3AED', 0, 0)))}`),

    // Cảnh 6: hai em đáp "Thưa cô, không ạ. Chúng em xin lỗi cô."; cô hài lòng, hai em về chỗ, cô giảng bài
    () => svg('Nam và Minh xin lỗi cô, cô hài lòng tiếp tục giảng bài', `
      ${classroom(214)}
      ${at(1, person(300, 290, 'coHuong', 'stand', { s: 0.86, flip: true }), { off: 3 })}
      ${at(3, person(300, 290, 'coHuong', 'clap', { s: 0.86, flip: true, mood: 'joy' }), { off: 4 })}
      ${at(4, person(360, 280, 'coHuong', 'point', { s: 0.84, flip: true, mood: 'joy' }), { talk: '4' })}
      ${at(1, `${person(196, 292, 'nam', 'clap', { s: 0.9, mood: 'shy' })}${person(240, 292, 'minh', 'clap', { s: 0.9, mood: 'shy' })}`, { off: 4, talk: '2,3' })}
      ${at(2, speech(150, 74, 96, 62, 210, 150, `${circusTent(0, 22, 0.6)}<path d="M-22 -20 L22 22 M22 -20 L-22 22" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>`), { off: 4 })}
      ${at(3, `${heart(232, 140, 1.3, '#F43F5E', 0)}${heart(258, 120, 1, '#FB7185', 0.6)}`, { off: 4 })}
      ${at(4, `${person(160, 268, 'nam', 'sit', { s: 0.86, mood: 'joy' })}${person(270, 268, 'minh', 'sit', { s: 0.86, mood: 'joy' })}
        ${desk(160, 300, 96)}${desk(270, 300, 96)}`)}
      ${at(4, sparkles([[250, 70, 7], [320, 60, 6]]))}`),
  ],
};
