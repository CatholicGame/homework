// Tranh Tuần 15 (Bài tập cuối tuần Tiếng Việt 3): ba nghề nghiệp a) làm trang trại, b) nha sĩ, c) thu ngân siêu thị.
import { kid } from '../picKit.js';

const label = (x, t) => `<g><circle cx="${x + 14}" cy="14" r="10" fill="#fff" stroke="#334155" stroke-width="1.5"/><text x="${x + 14}" y="18.5" font-size="12" font-weight="700" text-anchor="middle" fill="#334155" font-family="sans-serif">${t}</text></g>`;

export default {
  t15jobs: () => `
    <svg viewBox="0 0 420 150" role="img" aria-label="a) Hai anh chị làm việc ở trang trại; b) Nha sĩ khám răng cho bạn nhỏ; c) Chị thu ngân tính tiền ở siêu thị">
      <!-- a) trang trại -->
      <rect x="0" y="0" width="138" height="150" fill="#DBEAFE"/>
      <path d="M0 96 Q40 60 80 92 Q110 70 138 90 V150 H0 Z" fill="#4ADE80"/>
      <rect x="0" y="112" width="138" height="38" fill="#A3E635"/>
      <g transform="translate(18 66)"><path d="M0 18 L20 0 L40 18 Z" fill="#B91C1C"/><rect x="3" y="18" width="34" height="30" fill="#DC2626"/>
        <rect x="14" y="28" width="12" height="20" fill="#FEF3C7"/><path d="M14 28 L26 48 M26 28 L14 48" stroke="#B91C1C" stroke-width="1.5"/></g>
      <ellipse cx="34" cy="132" rx="14" ry="8" fill="#F9A8D4"/><circle cx="22" cy="128" r="6" fill="#F9A8D4"/>
      ${kid(84, 86, { shirt: '#DC2626', pants: '#1E3A8A', arms: 'hold', s: 0.85 })}
      ${kid(116, 88, { shirt: '#0EA5E9', pants: '#475569', girl: true, arms: 'down', s: 0.8 })}
      <path d="M74 104 L62 140 M58 140 H68" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
      ${label(0, 'a')}
      <!-- b) nha sĩ -->
      <rect x="141" y="0" width="138" height="150" fill="#ECFEFF"/>
      <rect x="141" y="122" width="138" height="28" fill="#CBD5E1"/>
      <path d="M214 120 L262 98 L270 104 L222 128 Z" fill="#14B8A6"/><rect x="236" y="122" width="8" height="20" fill="#64748B"/>
      ${kid(240, 92, { shirt: '#F97316', pants: '#1E3A8A', legs: 'sit', arms: 'down', s: 0.7 })}
      <path d="M252 40 Q268 40 268 60" stroke="#94A3B8" stroke-width="3" fill="none"/><circle cx="252" cy="40" r="6" fill="#FDE68A"/>
      ${kid(190, 72, { shirt: '#F8FAFC', pants: '#0F766E', girl: true, arms: 'side', s: 0.95 })}
      <rect x="181" y="68" width="18" height="7" rx="3" fill="#99F6E4"/>
      <path d="M213 78 L230 80" stroke="#64748B" stroke-width="2"/>
      ${label(141, 'b')}
      <!-- c) siêu thị -->
      <rect x="282" y="0" width="138" height="150" fill="#FEF9C3"/>
      <g fill="#FDBA74" opacity=".7"><rect x="292" y="20" width="118" height="6"/><rect x="292" y="44" width="118" height="6"/></g>
      <g><circle cx="300" cy="16" r="4" fill="#EF4444"/><circle cx="312" cy="16" r="4" fill="#22C55E"/><circle cx="380" cy="40" r="4" fill="#F59E0B"/><rect x="394" y="8" width="8" height="12" fill="#3B82F6"/></g>
      ${kid(380, 66, { shirt: '#EF4444', pants: '#7F1D1D', girl: true, arms: 'hold', s: 0.85 })}
      <rect x="350" y="92" width="70" height="58" fill="#EF4444"/><rect x="350" y="88" width="70" height="8" fill="#B91C1C"/>
      <rect x="392" y="70" width="22" height="16" rx="2" fill="#334155"/><rect x="401" y="86" width="4" height="4" fill="#334155"/>
      ${kid(312, 82, { shirt: '#16A34A', pants: '#1E293B', arms: 'side', s: 0.85 })}
      <g transform="translate(326 106)"><path d="M0 0 H26 L22 22 H4 Z" fill="none" stroke="#64748B" stroke-width="2"/>
        <circle cx="6" cy="28" r="3" fill="#64748B"/><circle cx="20" cy="28" r="3" fill="#64748B"/>
        <circle cx="8" cy="0" r="5" fill="#F97316"/><circle cx="17" cy="-1" r="5" fill="#84CC16"/></g>
      ${label(282, 'c')}
    </svg>`,
};
