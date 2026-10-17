// Tranh Tuần 34 (Bài tập cuối tuần Tiếng Việt 3): ba tranh cổ động bảo vệ môi trường a), b), c).
import { kid } from '../picKit.js';

const tree = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-3" y="-4" width="6" height="18" fill="#92400E"/>
    <circle cx="0" cy="-14" r="13" fill="#22C55E"/><circle cx="-8" cy="-8" r="8" fill="#16A34A"/><circle cx="8" cy="-8" r="8" fill="#16A34A"/>
  </g>`;
const stump = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-6" y="-6" width="12" height="8" fill="#B45309"/><ellipse cx="0" cy="-6" rx="6" ry="2.5" fill="#FCD34D"/></g>`;
const tag = (x, t) => `<circle cx="${x}" cy="12" r="8" fill="#FFFFFF" stroke="#94A3B8"/><text x="${x}" y="16" font-size="11" text-anchor="middle" font-family="sans-serif" font-weight="700" fill="#1E293B">${t}</text>`;

export default {
  t34posters: () => `
    <svg viewBox="0 0 330 120" role="img" aria-label="Ba tranh: a) hai bàn tay nâng Trái Đất; b) bàn tay ngăn người chặt phá rừng; c) hai bạn trồng cây, tưới cây">
      <rect width="330" height="120" fill="#F8FAFC"/>

      <!-- a) Hai bàn tay nâng Trái Đất: bên xanh cây cối, bên cháy khô -->
      <rect x="2" y="2" width="104" height="116" rx="6" fill="#BBF7D0"/>
      <path d="M54 2 L104 2 Q106 2 106 8 L106 112 Q106 118 100 118 L54 118 Z" fill="#FDBA74"/>
      ${tree(22, 92, 0.8)}${stump(80, 100)}${stump(94, 90)}
      <circle cx="54" cy="52" r="24" fill="#3B82F6"/>
      <path d="M40 40 Q48 32 56 40 Q52 50 44 50 Z M58 56 Q68 50 70 60 Q62 70 56 64 Z" fill="#22C55E"/>
      <path d="M30 70 Q34 94 50 100 L52 82 Z M78 70 Q74 94 58 100 L56 82 Z" fill="#F8D3B0"/>
      ${tag(14, 'a')}

      <!-- b) Bàn tay ngăn lại: người đang cưa cây -->
      <rect x="113" y="2" width="104" height="116" rx="6" fill="#E0F2FE"/>
      <rect x="113" y="86" width="104" height="32" fill="#D6A26B"/>
      ${tree(190, 84, 0.9)}${tree(206, 70, 0.6)}${stump(160, 100)}${stump(200, 106)}
      <rect x="113" y="44" width="22" height="26" fill="#2563EB"/>
      <path d="M134 40 L150 40 L150 76 L134 76 Z" fill="#F8D3B0"/>
      <path d="M137 40 L137 30 M141 40 L141 28 M145 40 L145 30 M149 40 L149 32" stroke="#F8D3B0" stroke-width="4" stroke-linecap="round"/>
      ${kid(176, 82, { shirt: '#DC2626', pants: '#1E293B', arms: 'side', s: 0.55 })}
      <path d="M168 86 L186 80" stroke="#64748B" stroke-width="3"/>
      ${tag(125, 'b')}

      <!-- c) Hai bạn trồng cây, tưới cây -->
      <rect x="224" y="2" width="104" height="116" rx="6" fill="#DBEAFE"/>
      <rect x="224" y="84" width="104" height="34" fill="#86EFAC"/>
      ${tree(312, 70, 0.8)}
      <path d="M276 92 L276 66 M276 74 L268 66 M276 70 L284 62" stroke="#92400E" stroke-width="2.5"/>
      <circle cx="268" cy="64" r="4" fill="#22C55E"/><circle cx="284" cy="60" r="4" fill="#22C55E"/><circle cx="276" cy="62" r="4" fill="#22C55E"/>
      <ellipse cx="276" cy="94" rx="14" ry="4" fill="#92400E"/>
      ${kid(252, 78, { shirt: '#FACC15', pants: '#EF4444', arms: 'hold', legs: 'sit', s: 0.6 })}
      ${kid(300, 66, { shirt: '#F472B6', pants: '#DB2777', girl: true, arms: 'side', s: 0.65 })}
      <rect x="282" y="66" width="10" height="8" rx="2" fill="#0EA5E9"/>
      <path d="M282 72 L276 78" stroke="#0EA5E9" stroke-width="2"/>
      <path d="M276 80 L274 86 M279 80 L278 87" stroke="#7DD3FC" stroke-width="1.5"/>
      ${tag(236, 'c')}
    </svg>`,
};
