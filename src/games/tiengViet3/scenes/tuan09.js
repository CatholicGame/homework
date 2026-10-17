// Phim truyện "Phần thưởng" (theo Blaga Đi-mi-tơ-rô-va), Tuần 9 Tiếng Việt 3: 6 cảnh, đọc từng câu.
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: Na, Lan, Minh, Nam, Linh, Mai, Tùn (cast.js), cô Hương là cô giáo, "khach" là mẹ của Na.
import { person } from '../cast.js';
import { W, H, svg, at, classroom, desk, school, tree, cloud, sun, sky, heart, sparkles, speech, thought, word, soundWaves, LINE } from '../sceneKit.js';

/** Chổi rơm cầm chéo trong tay (dáng dig), quét sàn: (x, y) là chân người quét. */
const broom = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M20 -84 L-18 -14" stroke="#A16207" stroke-width="3" stroke-linecap="round"/>
  <path d="M-14 -20 L-40 -2 Q-30 4 -12 2 Z" fill="#FCD34D" stroke="#B45309" stroke-width="0.9"/>
  <path d="M-16 -14 L-34 -1 M-14 -12 L-26 1 M-13 -10 L-18 2" stroke="#D97706" stroke-width="0.8"/></g>`;

/** Bụi quét bay lên. */
const dust = (x, y) => [0, 1, 2].map(i => `<circle class="sc-rise" style="--d:${i * 0.8}s" cx="${x + i * 9}" cy="${y - i * 3}" r="${3 + i}" fill="#D6D3D1" opacity="0.8"/>`).join('');

/** Nửa cục tẩy trong tay (hx, hy). */
const eraser = (hx, hy) => `<g transform="translate(${hx} ${hy - 6}) rotate(-12)"><rect x="-6" y="-4" width="12" height="8" rx="1.5" fill="#F9A8D4" stroke="${LINE}" stroke-width="0.8"/>
  <rect x="-6" y="-4" width="5" height="8" rx="1" fill="#60A5FA"/></g>`;

/** Giấy khen nhỏ trong bong bóng. */
const award = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-16" y="-12" width="32" height="24" rx="1.5" fill="#FFFBEB" stroke="#D97706" stroke-width="1.4"/>
  <path d="M-10 -5 H10 M-10 0 H6" stroke="#D97706" stroke-width="1.2"/><circle cx="8" cy="6" r="4.6" fill="#DC2626"/><path d="M6 9 l-2 7 M10 9 l2 7" stroke="#DC2626" stroke-width="1.6"/></g>`;

/** Hội trường lễ tổng kết: tường, cờ dây, phông đỏ, sân khấu (mặt sân khấu y 190), sàn. */
const hall = () => `
  <rect width="${W}" height="${H}" fill="#FDE7C7"/>
  <rect y="214" width="${W}" height="${H - 214}" fill="#E7C9A1"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 60} 214 L${i * 60 - 40} 300" stroke="#D6B28A" stroke-width="1.2"/>`).join('')}
  <rect x="108" y="34" width="264" height="146" fill="#9F1239"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${118 + i * 22} 34 V180" stroke="#881337" stroke-width="3"/>`).join('')}
  <g transform="translate(240 92)">${Array.from({ length: 10 }, (_, i) => `<ellipse cy="-20" rx="7" ry="16" fill="${i % 2 ? '#FDE047' : '#FACC15'}" transform="rotate(${i * 36})"/>`).join('')}<circle r="12" fill="#F59E0B"/></g>
  ${sparkles([[168, 70, 7], [312, 64, 8], [196, 128, 5], [292, 132, 6]])}
  <path d="M60 26 Q150 50 240 26 T420 26" stroke="#78716C" stroke-width="1.2" fill="none"/>
  ${Array.from({ length: 15 }, (_, i) => { const x = 66 + i * 24; const y = 26 + Math.abs(Math.sin((x - 60) / 180 * Math.PI)) * 18; return `<path d="M${x - 6} ${y} L${x + 6} ${y} L${x} ${y + 12}Z" fill="${['#EF4444', '#FACC15', '#22C55E', '#3B82F6', '#EC4899'][i % 5]}"/>`; }).join('')}
  <path d="M96 30 Q120 110 104 188 L132 188 Q116 110 130 30Z" fill="#DC2626" stroke="#991B1B" stroke-width="1"/>
  <path d="M384 30 Q360 110 376 188 L348 188 Q364 110 350 30Z" fill="#DC2626" stroke="#991B1B" stroke-width="1"/>
  <rect x="92" y="178" width="296" height="12" fill="#B45309" stroke="${LINE}" stroke-width="1"/>
  <rect x="92" y="190" width="296" height="26" fill="#92400E" stroke="${LINE}" stroke-width="1"/>
  <path d="M210 190 V216 M270 190 V216" stroke="#78350F" stroke-width="1.4"/>`;


export default {
  sentences: true,
  groups: [[0, 1, 2, 3], [4, 5, 6, 7, 8], [9, 10, 11], [12, 13, 14], [15, 16, 17], [18, 19, 20, 21]],
  scenes: [
    // Cảnh 1: Na tốt bụng, ai cũng mến; Na gọt bút chì giúp Lan, cho Minh nửa cục tẩy
    () => svg('Na gọt bút chì giúp Lan, cho Minh nửa cục tẩy', `
      ${classroom(214)}
      ${at(2, person(156, 268, 'lan', 'stand', { s: 0.88 }))}
      ${at(2, person(330, 268, 'minh', 'stand', { s: 0.88 }))}
      ${desk(150, 290, 96)}${desk(332, 290, 96)}
      ${at(3, `<g transform="translate(150 246)"><path d="M-8 0 L14 -4" stroke="#FACC15" stroke-width="4" stroke-linecap="round"/><path d="M14 -4 l4 -1" stroke="#1F2937" stroke-width="2"/>
        ${[0, 1, 2].map(i => `<path d="M${-14 - i * 6} ${2 + i} q3 -4 6 0" stroke="#D97706" stroke-width="1.4" fill="none"/>`).join('')}</g>`)}
      ${at(1, person(240, 282, 'na', 'stand', { s: 0.94, mood: 'joy' }), { off: 3 })}
      ${at(3, person(240, 282, 'na', 'give', { s: 0.94, flip: true, prop: 'pencil' }), { off: 4 })}
      ${at(4, `${person(240, 282, 'na', 'give', { s: 0.94 })}${eraser(240 + 44, 282 - 62)}`)}
      ${at(2, `${heart(140, 150, 1.1, '#F43F5E', 0)}${heart(240, 136, 1.4, '#FB7185', 0.6)}${heart(344, 150, 1.1, '#F43F5E', 1.2)}`)}
      ${at(4, person(330, 268, 'minh', 'stand', { s: 0.88, mood: 'joy' }))}`),

    // Cảnh 2: Na làm trực nhật giúp bạn; Na buồn vì học chưa giỏi; cuối năm cả lớp bàn tán điểm thi, phần thưởng; Na lặng yên
    () => svg('Na quét lớp giúp bạn, cuối năm các bạn bàn về phần thưởng', `
      ${classroom(214, '#FDE68A')}
      ${desk(330, 298, 120)}
      ${at(1, `${person(170, 282, 'na', 'dig', { s: 0.94 })}${broom(170, 282, 0.94)}${dust(120, 280)}`, { off: 2 })}
      ${at(2, person(160, 282, 'na', 'stand', { s: 0.94, mood: 'sad' }))}
      ${at(3, person(262, 274, 'lan', 'point', { s: 0.84 }), { talk: '3' })}
      ${at(3, person(312, 270, 'nam', 'wave', { s: 0.84, flip: true }), { talk: '3' })}
      ${at(3, person(360, 274, 'minh', 'cheer', { s: 0.84, flip: true }), { talk: '3' })}
      ${at(3, speech(282, 74, 72, 50, 290, 150, award(0, 0, 1)))}
      ${at(3, speech(352, 100, 50, 40, 352, 150, word('10', 20, '#DC2626')))}
      ${at(4, soundWaves(206, 140, -0.8, '#94A3B8').replace('scale(-0.8)', 'scale(-0.8 0.8)'))}
      ${at(5, thought(142, 84, 92, 58, 156, 150, `<g transform="translate(-14 2)"><path d="M-18 -12 L0 -8 L18 -12 V12 L0 16 L-18 12Z" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/><path d="M0 -8 V16" stroke="#3B82F6" stroke-width="1.2"/></g>${word('?', 24, '#64748B', 26, 0)}`))}`),

    // Cảnh 3: giờ ra chơi, các bạn túm tụm bàn bạc bí mật, kéo nhau đi gặp cô giáo; cô khen sáng kiến hay
    () => svg('Các bạn túm tụm bàn bạc rồi đến gặp cô giáo', `
      ${sky('t09s3sky')}
      ${cloud(140, 34, 0.7, 0)}${cloud(330, 26, 0.6, 2)}
      ${school(150, 184, 200, 100)}
      ${tree(104, 190, 1)}${tree(390, 192, 0.9)}
      <rect y="184" width="${W}" height="${H - 184}" fill="#E5D3B3"/>
      <path d="M0 184 H${W}" stroke="#C9AE86" stroke-width="2"/>
      ${at(1, `${person(150, 274, 'linh', 'stand', { s: 0.82 })}${person(214, 274, 'mai', 'stand', { s: 0.82, flip: true })}
        ${person(126, 280, 'lan', 'point', { s: 0.86 })}${person(182, 282, 'minh', 'clap', { s: 0.86 })}${person(240, 280, 'nam', 'stand', { s: 0.86, flip: true })}
        ${speech(184, 120, 60, 36, 184, 160, word('...', 22, '#64748B', 0, -4))}`, { off: 2 })}
      ${at(2, `${person(120, 276, 'linh', 'walk', { s: 0.8 })}${person(160, 284, 'lan', 'walk', { s: 0.84 })}${person(204, 276, 'mai', 'walk', { s: 0.8 })}
        ${person(242, 280, 'minh', 'walk', { s: 0.86 })}${person(280, 280, 'nam', 'walk', { s: 0.84 })}`, { off: 3 })}
      ${at(3, `${person(140, 278, 'linh', 'cheer', { s: 0.82 })}${person(186, 280, 'lan', 'clap', { s: 0.84, mood: 'joy' })}${person(232, 280, 'minh', 'cheer', { s: 0.86 })}${person(276, 280, 'nam', 'clap', { s: 0.84, mood: 'joy' })}`)}
      ${at(1, person(346, 280, 'coHuong', 'stand', { s: 0.86, flip: true }), { off: 3 })}
      ${at(3, person(346, 280, 'coHuong', 'clap', { s: 0.86, flip: true, mood: 'joy' }))}
      ${at(3, `<g transform="translate(350 70)"><circle r="24" fill="#FEF9C3"/><circle cy="-2" r="11" fill="#FDE047" stroke="#CA8A04" stroke-width="1.2"/><rect x="-5" y="8" width="10" height="7" rx="1.5" fill="#94A3B8"/>
        ${[0, 60, 120, 180, 240, 300].map(r => `<path d="M0 -20 V-26" stroke="#FACC15" stroke-width="2.4" stroke-linecap="round" transform="rotate(${r} 0 -2)"/>`).join('')}</g>`)}`),

    // Cảnh 4: ngày tổng kết, học sinh giỏi lên bục nhận thưởng; cha mẹ hồi hộp; cô giáo bất ngờ nói
    () => svg('Lễ tổng kết, học sinh giỏi lên bục nhận phần thưởng', `
      ${hall()}
      ${at(1, `${person(200, 182, 'linh', 'hold', { s: 0.66, prop: 'award', mood: 'joy' })}${person(244, 182, 'nam', 'hold', { s: 0.66, prop: 'award', mood: 'joy' })}`)}
      ${at(1, person(310, 182, 'coHuong', 'clap', { s: 0.68, flip: true, mood: 'joy' }), { off: 3 })}
      ${at(3, person(310, 182, 'coHuong', 'point', { s: 0.68, flip: true }), { talk: '3' })}
      ${at(2, `${person(120, 284, 'bo', 'clap', { s: 0.76 })}${person(158, 284, 'me', 'clap', { s: 0.74, mood: 'wow' })}`)}
      ${at(1, person(318, 284, 'na', 'stand', { s: 0.82, flip: true }))}
      ${at(2, person(362, 284, 'khach', 'clap', { s: 0.74, flip: true }))}
      ${at(3, word('!', 26, '#DC2626', 336, 104))}`),

    // Cảnh 5: cô trao phần thưởng đặc biệt cả lớp đề nghị tặng Na; Na có tấm lòng đáng quý
    () => svg('Cô giáo trao phần thưởng đặc biệt cả lớp tặng Na', `
      ${hall()}
      ${at(1, person(240, 182, 'coHuong', 'hold', { s: 0.7, prop: 'gift', mood: 'joy' }), { talk: '1,2,3' })}
      ${at(1, sparkles([[214, 100, 7], [266, 96, 8]]))}
      ${at(2, `${person(120, 284, 'lan', 'point', { s: 0.82 })}${person(166, 284, 'minh', 'point', { s: 0.84 })}`)}
      ${at(1, person(318, 284, 'na', 'stand', { s: 0.82, flip: true }), { off: 2 })}
      ${at(2, person(318, 284, 'na', 'stand', { s: 0.82, flip: true, mood: 'wow' }))}
      ${at(1, person(362, 284, 'khach', 'stand', { s: 0.74, flip: true }))}
      ${at(3, `${heart(300, 150, 1.2, '#F43F5E', 0)}${heart(330, 132, 1.5, '#FB7185', 0.6)}${heart(360, 152, 1.2, '#F43F5E', 1.2)}`)}`),

    // Cảnh 6: Na đỏ mặt bước lên bục; tiếng vỗ tay vang dậy; mẹ Na lặng lẽ chấm khăn lên mắt
    () => svg('Na bước lên bục nhận thưởng, mẹ Na rưng rưng', `
      ${hall()}
      ${at(1, person(318, 284, 'na', 'stand', { s: 0.82, flip: true, mood: 'wow' }), { off: 2 })}
      ${at(1, word('?', 22, '#64748B', 318, 158), { off: 2 })}
      ${at(2, person(232, 182, 'na', 'hold', { s: 0.68, prop: 'gift', mood: 'shy' }))}
      ${at(1, person(290, 182, 'coHuong', 'stand', { s: 0.68, flip: true, mood: 'joy' }), { off: 3 })}
      ${at(3, person(290, 182, 'coHuong', 'clap', { s: 0.68, flip: true, mood: 'joy' }))}
      ${at(1, `${person(120, 284, 'lan', 'stand', { s: 0.82 })}${person(166, 284, 'minh', 'stand', { s: 0.84 })}`, { off: 3 })}
      ${at(3, `${person(120, 284, 'lan', 'cheer', { s: 0.82, mood: 'joy' })}${person(166, 284, 'minh', 'clap', { s: 0.84, mood: 'joy' })}`)}
      ${at(3, `${soundWaves(176, 168, 0.8)}${soundWaves(96, 168, 0.8).replace('scale(0.8)', 'scale(-0.8 0.8)')}${sparkles([[200, 112, 7], [268, 104, 8], [140, 140, 6]])}`)}
      ${at(1, person(362, 284, 'khach', 'stand', { s: 0.76, flip: true }), { off: 4 })}
      ${at(4, `${person(362, 284, 'khach', 'clap', { s: 0.76, flip: true, mood: 'cry' })}
        <g transform="translate(362 284) scale(-0.76 0.76)"><path d="M-3 -112 L5 -132 L11 -128 L3 -109Z" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1"/></g>`)}`),
  ],
};
