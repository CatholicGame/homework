// Phim truyện "Bạn mới" (theo Na-ri-u-ki), Tuần 6 Tiếng Việt 3: 6 cảnh, đánh số theo CÂU (sentences: true).
// data-l="n": hiện từ câu thứ n của cảnh (đếm từ 1); data-off: ẩn từ câu đó; data-talk: nhân vật nói ở câu đó thì nhún.
// Nhân vật: A-i-a (aia), Tét-su-ô (tetsuo), thầy giáo (thay), các bạn trong lớp (nam, minh, mai, tun).
import { person } from '../cast.js';
import { W, H, svg, at, sky, cloud, sun, tree, sparkle, sparkles, speech, word, soundWaves, heart, school, classroom, LINE } from '../sceneKit.js';

/** Sân trường: nhà trường phía sau, sân gạch, hai cây bàng. */
const yard = (id) => `
  ${sky(id, '#7DD3FC', '#F0F9FF')}
  ${sun(408, 40, 16)}${cloud(140, 36, 0.7, 1)}${cloud(300, 26, 0.6, 4)}
  ${school(130, 176, 220, 104)}
  ${tree(86, 186, 0.9)}${tree(420, 186, 0.9, '#4ADE80', '#22C55E')}
  <rect y="176" width="${W}" height="${H - 176}" fill="#E7E5E4"/>
  ${[198, 226, 258].map(y => `<path d="M0 ${y} H${W}" stroke="#D6D3D1" stroke-width="1.2"/>`).join('')}
  <path d="M0 176 H${W}" stroke="#A8A29E" stroke-width="2"/>`;

/** Bức tranh A-i-a vẽ (khung gỗ), kiểu k: 0 nhà và mặt trời, 1 hoa, 2 mèo, 3 cây và đồi, 4 thuyền. */
function picture(x, y, k, s = 1) {
  const inner = [
    `<circle cx="10" cy="-8" r="5" fill="#FACC15"/><path d="M-12 8 V-2 L-4 -9 L4 -2 V8Z" fill="#F87171"/><rect x="-7" y="1" width="5" height="7" fill="#7C2D12"/><path d="M-16 8 H16" stroke="#22C55E" stroke-width="3"/>`,
    `${[0, 72, 144, 216, 288].map(r => `<ellipse cy="-6" rx="3.4" ry="5" fill="#F472B6" transform="rotate(${r} 0 -2)"/>`).join('')}<circle cy="-2" r="3" fill="#FDE047"/><path d="M0 2 V12" stroke="#16A34A" stroke-width="2"/>`,
    `<ellipse cy="4" rx="9" ry="7" fill="#FB923C"/><circle cy="-6" r="7" fill="#FB923C"/><path d="M-6 -11 L-5 -16 L-2 -12 M6 -11 L5 -16 L2 -12" fill="#FB923C"/><circle cx="-2.6" cy="-7" r="1" fill="#1F2937"/><circle cx="2.6" cy="-7" r="1" fill="#1F2937"/>`,
    `<path d="M-16 10 Q-4 -6 16 10Z" fill="#4ADE80"/><path d="M6 8 V-2" stroke="#92400E" stroke-width="2.4"/><circle cx="6" cy="-6" r="6" fill="#16A34A"/><circle cx="-10" cy="-8" r="4" fill="#FACC15"/>`,
    `<path d="M-16 6 H16" stroke="#38BDF8" stroke-width="5"/><path d="M-10 2 H10 L6 6 H-6Z" fill="#B45309"/><path d="M0 2 V-12 L9 -2Z" fill="#fff" stroke="#94A3B8" stroke-width="0.6"/>`,
  ][k % 5];
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-20" y="-17" width="40" height="32" fill="#FFFBEB" stroke="#A16207" stroke-width="3"/>${inner}</g>`;
}

/** Hành lang trường: tường vàng, chân tường, sàn gạch, cột. */
const hall = (id) => `
  ${sky(id, '#FEF3C7', '#FDE68A')}
  <rect y="190" width="${W}" height="${H - 190}" fill="#E7C9A1"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 60} 190 L${i * 60 - 40} 300" stroke="#D6B38A" stroke-width="1.2"/>`).join('')}
  <rect y="178" width="${W}" height="14" fill="#C2410C" opacity="0.6"/>
  ${[70, 410].map(x => `<rect x="${x - 10}" y="0" width="20" height="190" fill="#FDBA74" stroke="${LINE}" stroke-width="1"/>`).join('')}`;

export default {
  sentences: true,
  groups: [[0, 1, 2, 3], [4, 5, 6], [7, 8, 9, 10], [11, 12, 13], [14, 15, 16, 17, 18], [19, 20, 21]],
  scenes: [
    // Cảnh 1: giờ ra chơi cả lớp ùa ra sân; A-i-a mới đến, đứng một mình; thầy bảo "Em vào chơi với các bạn đi!"
    () => svg('Giờ ra chơi, A-i-a đứng một mình, thầy giáo khích lệ em', `
      ${yard('t06s1sky')}
      ${at(1, `<g class="sc-walk">${person(226, 234, 'nam', 'run', { s: 0.66 })}</g>`)}
      ${at(1, `<g class="sc-walk" style="--d:0.4s">${person(270, 238, 'mai', 'run', { s: 0.66, flip: true })}</g>`)}
      ${at(1, `<g class="sc-walk" style="--d:0.2s">${person(312, 236, 'tetsuo', 'run', { s: 0.66 })}</g>`)}
      ${at(1, `<g class="sc-walk" style="--d:0.6s">${person(186, 238, 'minh', 'run', { s: 0.64, flip: true })}</g>`)}
      ${at(2, person(140, 284, 'aia', 'stand', { s: 0.92, mood: 'sad' }), { off: 4 })}
      ${at(4, person(140, 284, 'aia', 'stand', { s: 0.92, mood: 'shy' }))}
      ${at(3, person(366, 284, 'thay', 'stand', { s: 0.82, flip: true }), { off: 4 })}
      ${at(4, person(366, 284, 'thay', 'point', { s: 0.82, flip: true }), { talk: '4' })}
      ${at(4, speech(236, 92, 116, 60, 346, 146, `
        ${person(-34, 24, 'aia', 'stand', { s: 0.32, mood: 'joy' })}
        <path d="M-18 0 H4 M-6 -6 L4 0 L-6 6" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/>
        ${person(20, 24, 'nam', 'run', { s: 0.3 })}${person(40, 24, 'mai', 'run', { s: 0.3 })}`))}`),

    // Cảnh 2: A-i-a cất tiếng "Cho mình… chơi… với!" nhưng nói nhỏ quá, chẳng ai nghe thấy
    () => svg('A-i-a nói nhỏ quá, các bạn mải chơi không nghe thấy', `
      ${yard('t06s2sky')}
      ${at(1, `<g class="sc-walk">${person(250, 244, 'nam', 'run', { s: 0.7 })}</g>`)}
      ${at(1, `<g class="sc-walk" style="--d:0.4s">${person(310, 248, 'mai', 'run', { s: 0.7 })}</g>`)}
      ${at(1, `<g class="sc-walk" style="--d:0.2s">${person(366, 246, 'tetsuo', 'run', { s: 0.7 })}</g>`)}
      ${at(1, person(160, 284, 'aia', 'wave', { s: 0.94, mood: 'shy' }), { off: 3, talk: '2' })}
      ${at(3, person(160, 284, 'aia', 'stand', { s: 0.94, mood: 'sad' }))}
      ${at(2, speech(200, 130, 56, 34, 176, 164, word('...', 16, '#94A3B8', 0, -3)))}
      ${at(3, `${word('?', 18, '#94A3B8', 262, 182)}${word('?', 14, '#94A3B8', 330, 186)}`)}`),

    // Cảnh 3: "Nào, các em!", cả lớp dừng chơi; A-i-a lấy hết can đảm, nhắc lại "Cho mình… chơi với!"
    () => svg('Thầy giáo gọi, các bạn dừng chơi; A-i-a nói to hơn', `
      ${yard('t06s3sky')}
      ${at(1, person(360, 284, 'thay', 'wave', { s: 0.82, flip: true }), { talk: '1' })}
      ${at(1, soundWaves(318, 136, 1, '#F59E0B').replace('scale(1)', 'scale(-1 1)'))}
      ${at(1, `${person(220, 244, 'nam', 'run', { s: 0.7 })}${person(270, 248, 'mai', 'run', { s: 0.7, flip: true })}${person(316, 246, 'tetsuo', 'run', { s: 0.7 })}`, { off: 2 })}
      ${at(2, `${person(220, 244, 'nam', 'stand', { s: 0.7, flip: true, mood: 'wow' })}${person(270, 248, 'mai', 'stand', { s: 0.7, flip: true })}${person(316, 246, 'tetsuo', 'stand', { s: 0.7, flip: true, mood: 'wow' })}`)}
      ${at(1, person(140, 284, 'aia', 'stand', { s: 0.94, mood: 'shy' }), { off: 3 })}
      ${at(3, person(140, 284, 'aia', 'raise', { s: 0.94 }), { talk: '4' })}
      ${at(4, speech(200, 92, 90, 50, 160, 150, word('!', 30, '#DB2777', 0, 0)))}
      ${at(4, sparkles([[110, 140, 7], [250, 70, 6]]))}`),

    // Cảnh 4: đến lượt đuổi bắt, A-i-a chạy chậm, không bắt nổi ai; Tét-su-ô kêu chán quá; thầy đứng quan sát
    () => svg('A-i-a chạy chậm, Tét-su-ô kêu chán, thầy giáo quan sát', `
      ${yard('t06s4sky')}
      ${at(1, `<g class="sc-walk">${person(214, 240, 'nam', 'run', { s: 0.68 })}</g>`)}
      ${at(1, `<g class="sc-walk" style="--d:0.3s">${person(262, 244, 'mai', 'run', { s: 0.68 })}</g>`)}
      ${at(1, `<g class="sc-walk" style="--d:0.5s">${person(146, 284, 'aia', 'run', { s: 0.94, mood: 'sad' })}</g>`)}
      ${at(1, `<path d="M112 196 l-4 7 M104 206 l-3 6" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>`)}
      ${at(2, person(294, 286, 'tetsuo', 'stand', { s: 0.92, flip: true, mood: 'sad' }), { talk: '2' })}
      ${at(2, speech(290, 100, 60, 46, 292, 160, word('!', 26, '#DC2626', 0, 0)))}
      ${at(3, person(362, 282, 'thay', 'stand', { s: 0.76, flip: true }))}`),

    // Cảnh 5: thầy gọi A-i-a vào lớp hỏi xem tranh; từ đó A-i-a mang tranh đến; thầy treo tranh lên tường
    () => svg('Thầy giáo xem tranh A-i-a vẽ và treo tranh lên tường', `
      ${classroom(206)}
      ${at(4, `${picture(94, 162, 0, 0.9)}${picture(396, 162, 1, 0.9)}`)}
      ${at(5, `${picture(200, 164, 2, 0.8)}${picture(290, 164, 3, 0.8)}${sparkles([[246, 150, 6], [96, 130, 6]])}`)}
      ${at(1, person(300, 284, 'thay', 'stand', { s: 0.86, flip: true }), { off: 2 })}
      ${at(2, person(300, 284, 'thay', 'point', { s: 0.86, flip: true }), { off: 4, talk: '2,3' })}
      ${at(4, person(300, 284, 'thay', 'clap', { s: 0.86, flip: true, mood: 'joy' }))}
      ${at(1, person(196, 284, 'aia', 'stand', { s: 0.94, mood: 'shy' }), { off: 4 })}
      ${at(4, person(196, 284, 'aia', 'give', { s: 0.94, mood: 'joy', prop: 'paper' }))}
      ${at(2, speech(250, 56, 100, 56, 290, 120, `${picture(-18, 0, 4, 0.8)}${word('?', 26, '#2563EB', 28, 0)}`), { off: 4 })}
      ${at(3, `${heart(150, 150, 1.2, '#F43F5E', 0)}${heart(170, 130, 1, '#FB7185', 0.6)}`)}`),

    // Cảnh 6: các bạn bàn tán "Tranh đẹp quá!"; Tét-su-ô đến rủ A-i-a "Ngày mai cậu chơi đuổi bắt với chúng tớ nhé!"
    () => svg('Các bạn khen tranh của A-i-a, Tét-su-ô rủ A-i-a cùng chơi', `
      ${hall('t06s6sky')}
      ${[[110, 92, 0], [170, 96, 1], [230, 90, 2], [290, 96, 3], [350, 92, 4]].map(([x, y, k]) => picture(x, y, k, 1.05)).join('')}
      ${at(1, `${person(118, 250, 'mai', 'point', { s: 0.7, mood: 'wow' })}${person(166, 248, 'nam', 'clap', { s: 0.7, mood: 'joy' })}${person(330, 250, 'tun', 'lookUp', { s: 0.66 })}${person(372, 248, 'minh', 'point', { s: 0.66, flip: true, mood: 'joy' })}`, { talk: '1' })}
      ${at(1, `${heart(190, 144, 1, '#F43F5E', 0)}${heart(310, 140, 1.1, '#FB7185', 0.5)}${sparkles([[140, 60, 7], [260, 58, 8], [380, 62, 6]])}`)}
      ${at(2, person(290, 290, 'tetsuo', 'give', { s: 0.94, flip: true, mood: 'joy' }), { talk: '2,3' })}
      ${at(1, person(218, 292, 'aia', 'stand', { s: 0.94, mood: 'shy' }), { off: 3 })}
      ${at(3, person(218, 292, 'aia', 'cheer', { s: 0.94, mood: 'joy' }))}
      ${at(3, speech(318, 140, 120, 50, 296, 176, `
        ${person(-34, 20, 'aia', 'run', { s: 0.3, mood: 'joy' })}${person(-6, 20, 'tetsuo', 'run', { s: 0.3 })}${person(22, 20, 'nam', 'run', { s: 0.3 })}
        ${sparkle(46, -6, 7, "#FACC15")}`))}`),
  ],
};

