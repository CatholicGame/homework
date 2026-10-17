// Tranh Tuần 14 (Bài tập cuối tuần Tiếng Việt 3): cặp từ trái nghĩa dài/ngắn, to/nhỏ, cao/thấp.
import { kid } from '../picKit.js';

const pencil = (x, y, len, body) => `
  <g transform="translate(${x} ${y})">
    <path d="M0 0 L18 -8 L18 8 Z" fill="#F5D0A9"/><path d="M0 0 L7 -3 L7 3 Z" fill="#334155"/>
    <rect x="18" y="-8" width="${len}" height="16" fill="${body}"/>
    <rect x="18" y="-3" width="${len}" height="6" fill="#1D4ED8" opacity=".55"/>
    <rect x="${18 + len}" y="-8" width="8" height="16" fill="#CBD5E1"/>
    <rect x="${26 + len}" y="-8" width="12" height="16" rx="5" fill="#F9A8D4"/>
  </g>`;

export default {
  // a) Bút chì dài và bút chì ngắn
  t14pencils: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Một bút chì dài và một bút chì ngắn">
      <rect width="200" height="140" fill="#FEF9C3"/>
      <rect y="112" width="200" height="28" fill="#D6A26B"/>
      ${pencil(14, 54, 140, '#EF4444')}
      ${pencil(14, 92, 52, '#EF4444')}
    </svg>`,

  // b) Con voi to và con chuột nhỏ
  t14elephant: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Con voi to và con chuột nhỏ">
      <rect width="200" height="140" fill="#DBEAFE"/>
      <rect y="112" width="200" height="28" fill="#86EFAC"/>
      <g fill="#94A3B8">
        <ellipse cx="88" cy="70" rx="52" ry="34"/>
        <rect x="48" y="80" width="16" height="36" rx="6"/><rect x="72" y="84" width="16" height="32" rx="6"/>
        <rect x="100" y="84" width="16" height="32" rx="6"/><rect x="122" y="80" width="16" height="36" rx="6"/>
        <circle cx="40" cy="56" r="24"/>
        <path d="M24 64 Q14 92 26 108 L32 104 Q24 90 34 70 Z"/>
      </g>
      <ellipse cx="52" cy="54" rx="16" ry="20" fill="#CBD5E1"/>
      <circle cx="32" cy="50" r="2.6" fill="#1E293B"/>
      <path d="M138 66 Q150 74 146 90" stroke="#94A3B8" stroke-width="3" fill="none"/>
      <g transform="translate(172 108)">
        <ellipse cx="0" cy="0" rx="9" ry="6" fill="#A8A29E"/>
        <circle cx="-8" cy="-3" r="4" fill="#A8A29E"/><circle cx="-8" cy="-8" r="3" fill="#F9A8D4"/>
        <circle cx="-10" cy="-3" r="1" fill="#1E293B"/>
        <path d="M9 0 Q18 -2 20 -9" stroke="#A8A29E" stroke-width="1.5" fill="none"/>
      </g>
    </svg>`,

  // c) Anh trai cao và em gái thấp
  t14tall: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Bạn trai cao và bạn gái thấp">
      <rect width="200" height="140" fill="#FCE7F3"/>
      <rect y="122" width="200" height="18" fill="#86EFAC"/>
      ${kid(70, 36, { shirt: '#3B82F6', pants: '#334155', s: 1.6 })}
      ${kid(136, 84, { shirt: '#FACC15', pants: '#F59E0B', girl: true, s: 0.9 })}
    </svg>`,
};
