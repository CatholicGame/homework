/**
 * Tranh của 8 địa điểm ở bản đồ 🏘️ Phố Kỹ Năng (thẻ chọn địa điểm). Cùng lối vẽ với tranh bìa thẻ trang chủ
 * (homeThumbs.js): khung 320×180 cắt "slice" giữa, màu phẳng tươi, viền nâu mảnh, nhân vật cast.js.
 * Hình chính nằm giữa (x ≈ 60…260) để thẻ hẹp ở màn dọc vẫn thấy đủ.
 */
import { LINE, cloud, sun, tree, tufts } from '../tiengViet3/sceneKit.js';
import { person } from '../tiengViet3/cast.js';

const FONT = 'Nunito, Quicksand, sans-serif';
const frame = (inner) => `<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${inner}</svg>`;
const txt = (x, y, t, { s = 12, c = '#3A2E48', w = 800 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${c}" text-anchor="middle" font-family="${FONT}">${t}</text>`;
const ln = `stroke="${LINE}" stroke-width="1"`;
let uid = 0;
const skyBg = (top = '#7DD3FC', bottom = '#E0F2FE') => {
  const id = `lp${++uid}`;
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
  <rect width="320" height="180" fill="url(#${id})"/>`;
};
const meadow = (y = 130, c = '#86CF6A') => `<path d="M0 ${y} Q80 ${y - 14} 160 ${y - 4} T320 ${y - 6} V180 H0Z" fill="${c}"/>`;
const shadow = (x, y, rx) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="4" fill="#000" opacity="0.1"/>`;
/** Phòng trong nhà: tường, chân tường, sàn gỗ. */
const room = (wall) => `<rect width="320" height="180" fill="${wall}"/>
  <rect y="128" width="320" height="52" fill="#E3B98A"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${i * 64} 128 V180" stroke="#C99A6A" stroke-width="1"/>`).join('')}
  <rect y="122" width="320" height="6" fill="#fff" opacity="0.7"/>`;
const win = (x, y, w = 56, h = 46) => `<g transform="translate(${x} ${y})"><rect x="-2" y="-2" width="${w + 4}" height="${h + 4}" rx="4" fill="#fff" ${ln}/>
  <rect width="${w}" height="${h}" rx="3" fill="#BAE6FD"/>${cloud(w / 2 - 4, h / 2 - 2, 0.4)}<path d="M${w / 2} 0 V${h} M0 ${h / 2} H${w}" stroke="#fff" stroke-width="3"/></g>`;

const ART = {
  // Đường đến trường: vạch kẻ qua đường, đèn cho người đi bộ, trường ở xa, hai bạn đeo cặp
  road: () => skyBg() + sun(272, 30, 14) + cloud(70, 30, 0.6) + meadow(98)
    + `<g transform="translate(150 58)"><rect width="96" height="44" fill="#FFE2B0" ${ln}/><path d="M-8 2 L48 -20 L104 2Z" fill="#F07A4F" ${ln}/>
      <rect x="30" y="-12" width="36" height="9" rx="2" fill="#fff"/><rect x="40" y="18" width="16" height="26" fill="#B45309"/>
      ${[8, 72].map(x => `<rect x="${x}" y="12" width="16" height="13" rx="2" fill="#9ED8FF" ${ln}/>`).join('')}
      <path d="M-14 -24 V44" stroke="#64748B" stroke-width="2"/><path d="M-14 -24 h16 v10 h-16Z" fill="#DA251D"/><text x="-9" y="-16" font-size="7" fill="#FFEB00">★</text></g>`
    + `<rect y="112" width="320" height="68" fill="#5B6472"/><path d="M0 116 H320" stroke="#fff" stroke-width="2" stroke-dasharray="14 10" opacity="0.6"/>`
    + [0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${96 + i * 20}" y="122" width="12" height="56" fill="#F8FAFC"/>`).join('')
    + `<g transform="translate(58 140)"><rect x="-2" y="-84" width="4" height="84" fill="#475569"/><rect x="-11" y="-118" width="22" height="42" rx="4" fill="#1F2937" ${ln}/>
      <circle cx="0" cy="-106" r="6" fill="#7F1D1D"/><circle class="hh-blink" cx="0" cy="-88" r="6" fill="#4ADE80"/></g>`
    + shadow(176, 172, 14) + shadow(204, 172, 14)
    + person(176, 172, 'na', 'walk', { s: 0.6 }) + person(206, 172, 'nam', 'walk', { s: 0.62 }),

  // Nhà em: phòng khách, cửa có mắt thần, điện thoại trên bàn, Na đứng nghe
  home: () => room('#FDE7EF') + win(30, 34)
    + `<g transform="translate(212 34)"><rect width="62" height="94" rx="3" fill="#B7794A" ${ln}/><rect x="6" y="6" width="50" height="38" rx="2" fill="#C98B55"/>
      <rect x="6" y="50" width="50" height="38" rx="2" fill="#C98B55"/><circle cx="31" cy="22" r="3.4" fill="#1F2937"/><circle cx="50" cy="52" r="3" fill="#FACC15" ${ln}/></g>`
    + `<g transform="translate(96 104)"><rect x="-2" y="0" width="66" height="7" rx="2" fill="#C98B55" ${ln}/><path d="M6 7 V24 M56 7 V24" stroke="#A86B3C" stroke-width="4"/>
      <rect x="16" y="-14" width="30" height="14" rx="3" fill="#F43F5E" ${ln}/><rect x="20" y="-20" width="22" height="7" rx="3" fill="#E11D48" ${ln}/>
      <g class="hh-blink"><path d="M50 -22 q6 -6 0 -12 M55 -24 q9 -8 0 -16" stroke="#F43F5E" stroke-width="2" fill="none" stroke-linecap="round"/></g></g>`
    + shadow(176, 168, 16) + person(176, 168, 'na', 'stand', { s: 0.66 }),

  // Siêu thị: kệ hàng nhiều màu, xe đẩy, Bin đứng giữa lối đi tìm mẹ
  market: () => `<rect width="320" height="180" fill="#ECFDF5"/><rect y="0" width="320" height="14" fill="#16A34A"/>${txt(160, 11, 'SIÊU THỊ', { s: 10, c: '#fff' })}`
    + [[14, 92], [214, 92]].map(([x]) => `<g transform="translate(${x} 26)"><rect width="92" height="104" rx="3" fill="#E7E5E4" ${ln}/>
      ${[0, 1, 2].map(r => `<rect x="4" y="${30 + r * 34}" width="84" height="4" fill="#A8A29E"/>
        ${[0, 1, 2, 3, 4].map(k => `<rect x="${7 + k * 16}" y="${10 + r * 34}" width="13" height="20" rx="2" fill="${['#F87171', '#FBBF24', '#60A5FA', '#34D399', '#F472B6'][(k + r) % 5]}" ${ln}/>`).join('')}`).join('')}</g>`).join('')
    + `<rect y="130" width="320" height="50" fill="#D1FAE5"/><path d="M0 130 H320" stroke="#A7F3D0" stroke-width="2"/>`
    + `<g transform="translate(232 124)"><path d="M0 0 H10 L18 30 H52 L58 8 H14" fill="#fff" stroke="#64748B" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="22" cy="40" r="5" fill="#334155"/><circle cx="48" cy="40" r="5" fill="#334155"/><rect x="24" y="0" width="12" height="12" rx="2" fill="#FB923C"/><rect x="38" y="2" width="12" height="10" rx="2" fill="#4ADE80"/></g>`
    + shadow(150, 170, 16) + person(150, 170, 'nam', 'lookUp', { s: 0.68 })
    + `<g transform="translate(176 92)"><circle r="11" fill="#fff" ${ln}/>${txt(0, 5, '?', { s: 15, c: '#16A34A' })}</g>`,

  // Trường học: sân trường, cột cờ, các bạn vẫy tay
  school: () => skyBg() + sun(40, 30, 13) + cloud(250, 28, 0.6) + meadow(118)
    + `<g transform="translate(92 40)"><rect width="150" height="70" fill="#FFE2B0" ${ln}/><path d="M-10 4 L75 -24 L160 4Z" fill="#3B82F6" ${ln}/>
      <rect x="55" y="-14" width="40" height="10" rx="2" fill="#fff"/>
      ${[10, 40, 96, 126].map(x => `<rect x="${x}" y="14" width="18" height="16" rx="2" fill="#9ED8FF" ${ln}/>`).join('')}
      <rect x="64" y="34" width="22" height="36" fill="#B45309" ${ln}/></g>
      <g transform="translate(60 128)"><path d="M0 0 V-92" stroke="#94A3B8" stroke-width="2.5"/><path class="hh-flag" d="M1 -92 h24 v16 h-24Z" fill="#DA251D"/><text x="9" y="-80" font-size="9" fill="#FFEB00">★</text></g>`
    + `<rect y="128" width="320" height="52" fill="#E7D3B0"/>` + tree(282, 130, 0.8)
    + shadow(140, 172, 14) + shadow(172, 172, 14) + shadow(204, 172, 14)
    + person(140, 172, 'linh', 'wave', { s: 0.6 }) + person(172, 172, 'minh', 'cheer', { s: 0.62 }) + person(204, 172, 'nam', 'stand', { s: 0.6 }),

  // Hồ, sông, bể bơi: hồ nước, biển báo nguy hiểm, phao cứu sinh, Bin đứng trên bờ
  water: () => skyBg('#7DD3FC', '#E0F2FE') + cloud(60, 26, 0.6) + cloud(250, 34, 0.5)
    + `<path d="M0 84 Q80 74 160 82 T320 80 V110 H0Z" fill="#86CF6A"/>` + tree(36, 92, 0.6) + tree(286, 90, 0.7)
    + `<path d="M0 98 Q160 86 320 98 V180 H0Z" fill="#38BDF8"/>
      ${[[40, 120], [120, 140], [250, 126], [200, 158]].map(([x, y]) => `<path class="hh-twinkle" d="M${x} ${y} q8 -5 16 0 t16 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}
      <path d="M100 180 Q130 150 210 148 Q260 148 300 180Z" fill="#E9D5A1" ${ln}/>`
    + `<g transform="translate(250 150)"><rect x="-2" y="-58" width="4" height="58" fill="#78716C"/><path d="M0 -84 L22 -56 H-22Z" fill="#FACC15" ${ln}/>${txt(0, -62, '!', { s: 16, c: '#B91C1C' })}</g>
      <g transform="translate(134 154) rotate(-10)"><circle r="13" fill="none" stroke="#EF4444" stroke-width="7"/><circle r="13" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="7 13"/></g>`
    + shadow(196, 170, 14) + person(196, 170, 'tun', 'point', { s: 0.6 }),

  // Công viên: cầu trượt, xích đu, cây, các bạn chơi
  park: () => skyBg() + sun(282, 30, 14) + cloud(80, 30, 0.6) + meadow(112, '#86CF6A')
    + tree(30, 128, 0.8) + tree(300, 126, 0.7)
    + `<g transform="translate(68 160)"><path d="M0 0 V-62 M24 0 V-62" stroke="#64748B" stroke-width="3"/><rect x="-4" y="-66" width="32" height="6" rx="2" fill="#F97316" ${ln}/>
      <path d="M24 -60 Q60 -40 76 0" stroke="#FACC15" stroke-width="9" fill="none" stroke-linecap="round"/>${[1, 2, 3, 4].map(i => `<path d="M0 ${-i * 13} H24" stroke="#64748B" stroke-width="2"/>`).join('')}</g>
      <g transform="translate(226 160)"><path d="M-30 0 L-16 -70 L16 -70 L30 0" stroke="#3B82F6" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <path d="M-6 -70 V-30 M6 -70 V-30" stroke="#94A3B8" stroke-width="1.5"/><rect x="-10" y="-30" width="20" height="5" rx="2" fill="#EC4899"/></g>`
    + tufts([[120, 170], [270, 172], [20, 172]])
    + shadow(166, 172, 14) + person(166, 172, 'mai', 'cheer', { s: 0.6 }) + person(226, 150, 'tun', 'sit', { s: 0.5 }),

  // Thế giới mạng: bàn học, máy tính bảng có khung chat, ổ khoá an toàn
  net: () => room('#EDE9FE') + win(240, 30)
    + `<g transform="translate(40 116)"><rect width="200" height="10" rx="3" fill="#C98B55" ${ln}/><path d="M12 10 V60 M188 10 V60" stroke="#A86B3C" stroke-width="5"/></g>
      <g transform="translate(70 36)"><rect width="118" height="80" rx="8" fill="#1F2937" ${ln}/><rect x="6" y="6" width="106" height="68" rx="4" fill="#F5F3FF"/>
        <rect x="12" y="12" width="56" height="14" rx="7" fill="#C4B5FD"/><rect x="50" y="32" width="56" height="14" rx="7" fill="#8B5CF6"/>
        <rect x="12" y="52" width="40" height="14" rx="7" fill="#C4B5FD"/>
        <g class="hh-bob" transform="translate(92 60)"><rect x="-9" y="-6" width="18" height="15" rx="3" fill="#FACC15" ${ln}/><path d="M-5 -6 v-5 a5 5 0 0 1 10 0 v5" stroke="${LINE}" stroke-width="2" fill="none"/></g></g>`
    + shadow(212, 170, 14) + person(212, 170, 'minh', 'point', { s: 0.64, flip: true }),

  // Khi có sự cố: bình chữa cháy, chuông báo khói, điện thoại gọi 114, bạn bình tĩnh gọi người lớn
  fire: () => room('#FEF2F2') + win(28, 30)
    + `<g transform="translate(160 18)"><rect x="-16" y="0" width="32" height="10" rx="5" fill="#fff" ${ln}/><circle class="hh-blink" cx="0" cy="5" r="2.6" fill="#EF4444"/></g>
      <g transform="translate(246 128)"><rect x="-14" y="-52" width="28" height="52" rx="8" fill="#DC2626" ${ln}/><rect x="-8" y="-62" width="16" height="10" rx="2" fill="#1F2937"/>
        <path d="M8 -58 q18 -2 16 18" stroke="#1F2937" stroke-width="3" fill="none"/><rect x="-9" y="-36" width="18" height="12" rx="2" fill="#fff"/></g>
      <g transform="translate(102 80)"><rect x="-22" y="-38" width="44" height="70" rx="8" fill="#334155" ${ln}/><rect x="-17" y="-31" width="34" height="50" rx="3" fill="#FEE2E2"/>
        ${txt(0, -4, '114', { s: 17, c: '#DC2626', w: 900 })}<circle cx="0" cy="25" r="3" fill="#94A3B8"/></g>`
    + shadow(176, 170, 14) + person(176, 170, 'linh', 'raise', { s: 0.64 }),
};

export const placeArt = (id) => frame((ART[id] || ART.road)());
