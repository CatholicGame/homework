// Tranh Tuần 6 (Bài tập cuối tuần Tiếng Việt 3): thư viện, căng-tin.
import { kid } from '../picKit.js';

const BOOK_COLORS = ['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#A855F7', '#14B8A6', '#EC4899'];
/** Một hàng gáy sách trên giá. */
function books(x, y, w, h, seed) {
  let out = '';
  let at = x;
  let k = seed;
  while (at < x + w - 6) {
    const bw = 6 + (k % 3) * 2;
    const bh = h - (k % 4) * 3;
    out += `<rect x="${at}" y="${y + h - bh}" width="${bw}" height="${bh}" fill="${BOOK_COLORS[k % BOOK_COLORS.length]}"/>`;
    at += bw + 1;
    k += 5;
  }
  return out;
}

export default {
  // Thư viện: giá sách đầy sách, cô thủ thư sau quầy, các bạn xếp hàng mượn sách
  t6library: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Các bạn đang mượn sách ở thư viện">
      <rect width="200" height="140" fill="#FEF3C7"/>
      <rect x="8" y="8" width="184" height="78" rx="3" fill="#92400E"/>
      <rect x="12" y="12" width="176" height="20" fill="#FDE68A"/><rect x="12" y="36" width="176" height="20" fill="#FDE68A"/><rect x="12" y="60" width="176" height="22" fill="#FDE68A"/>
      ${books(12, 12, 176, 20, 1)}${books(12, 36, 176, 20, 3)}${books(12, 60, 176, 22, 6)}
      <rect y="118" width="200" height="22" fill="#D6A26B"/>
      ${kid(40, 70, { shirt: '#BE185D', pants: '#7C2D12', girl: true, arms: 'hold', s: 0.95 })}
      <rect x="18" y="92" width="52" height="30" rx="3" fill="#B45309"/>
      <rect x="30" y="86" width="16" height="6" fill="#3B82F6"/><rect x="48" y="87" width="14" height="5" fill="#EF4444"/>
      ${kid(96, 84, { shirt: '#22C55E', arms: 'hold', s: 0.8 })}
      <rect x="88" y="94" width="14" height="10" fill="#F59E0B"/>
      ${kid(130, 84, { shirt: '#F97316', girl: true, arms: 'down', s: 0.8 })}
      ${kid(164, 84, { shirt: '#3B82F6', arms: 'hold', s: 0.8 })}
      <rect x="157" y="94" width="14" height="10" fill="#A855F7"/>
    </svg>`,

  // Căng-tin: các bạn ngồi quanh bàn ăn trưa, có đĩa thức ăn và cốc nước
  t6canteen: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Các bạn cùng ăn trưa tại căng-tin">
      <rect width="200" height="140" fill="#E0F2FE"/>
      <rect x="20" y="10" width="160" height="26" rx="4" fill="#fff" stroke="#F97316" stroke-width="3"/>
      <text x="100" y="29" text-anchor="middle" font-size="15" font-weight="700" fill="#C2410C" font-family="sans-serif">CĂNG-TIN</text>
      <rect y="118" width="200" height="22" fill="#CBD5E1"/>
      ${kid(46, 64, { shirt: '#EC4899', girl: true, arms: 'hold', legs: 'sit', s: 0.9 })}
      ${kid(84, 58, { shirt: '#22C55E', arms: 'hold', legs: 'sit', s: 0.9 })}
      ${kid(118, 58, { shirt: '#F59E0B', girl: true, arms: 'hold', legs: 'sit', s: 0.9 })}
      ${kid(156, 64, { shirt: '#3B82F6', arms: 'hold', legs: 'sit', s: 0.9 })}
      <rect x="22" y="84" width="156" height="8" rx="3" fill="#B45309"/>
      <path d="M36 92 V124 M164 92 V124" stroke="#92400E" stroke-width="5"/>
      <ellipse cx="60" cy="82" rx="12" ry="4" fill="#fff" stroke="#94A3B8"/><circle cx="58" cy="79" r="4" fill="#F97316"/>
      <ellipse cx="102" cy="82" rx="12" ry="4" fill="#fff" stroke="#94A3B8"/><circle cx="104" cy="79" r="4" fill="#22C55E"/>
      <ellipse cx="142" cy="82" rx="12" ry="4" fill="#fff" stroke="#94A3B8"/><circle cx="140" cy="79" r="4" fill="#EF4444"/>
      <rect x="78" y="72" width="7" height="10" rx="1" fill="#BAE6FD" stroke="#0EA5E9"/><rect x="122" y="72" width="7" height="10" rx="1" fill="#BAE6FD" stroke="#0EA5E9"/>
    </svg>`,
};
