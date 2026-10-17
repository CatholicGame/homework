// Tranh Tuần 11 (Bài tập cuối tuần Tiếng Việt 3): từ có vần iu / ưu (con cừu, xe cứu hoả, cây rìu, cái địu).
import { kid } from '../picKit.js';

export default {
  // Con cừu lông xoăn đứng trên cỏ
  w11Cuu: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Con cừu">
      <rect width="200" height="140" fill="#E0F2FE"/>
      <rect y="108" width="200" height="32" fill="#86EFAC"/>
      <path d="M72 96 V122 M88 98 V124 M118 98 V124 M134 96 V122" stroke="#78716C" stroke-width="7" stroke-linecap="round"/>
      <g fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2">
        <circle cx="76" cy="74" r="18"/><circle cx="100" cy="66" r="20"/><circle cx="124" cy="72" r="19"/>
        <circle cx="86" cy="92" r="17"/><circle cx="114" cy="92" r="17"/><circle cx="136" cy="88" r="14"/>
      </g>
      <ellipse cx="58" cy="76" rx="15" ry="18" fill="#E7C9A9"/>
      <ellipse cx="44" cy="70" rx="8" ry="4" fill="#D6B08A" transform="rotate(-20 44 70)"/>
      <ellipse cx="72" cy="68" rx="8" ry="4" fill="#D6B08A" transform="rotate(20 72 68)"/>
      <circle cx="58" cy="60" r="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
      <circle cx="53" cy="76" r="2" fill="#1E293B"/><circle cx="63" cy="76" r="2" fill="#1E293B"/>
      <path d="M54 85 Q58 88 62 85" stroke="#9A3412" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,

  // Xe cứu hoả màu đỏ có thang, chú lính cứu hoả ngồi trên xe
  w11CuuHoa: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Xe cứu hoả">
      <rect width="200" height="140" fill="#FEF3C7"/>
      <rect y="116" width="200" height="24" fill="#CBD5E1"/>
      <path d="M40 46 L150 30 M44 54 L152 38" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
      <path d="M60 50 L64 42 M80 47 L84 39 M100 44 L104 36 M120 41 L124 33 M140 38 L144 30" stroke="#94A3B8" stroke-width="3"/>
      ${kid(118, 52, { shirt: '#F59E0B', pants: '#92400E', arms: 'up', s: 0.6 })}
      <rect x="104" y="36" width="28" height="6" rx="2" fill="#B91C1C"/>
      <rect x="30" y="62" width="100" height="44" rx="5" fill="#DC2626"/>
      <path d="M130 106 V66 H158 L176 86 V106 Z" fill="#EF4444"/>
      <path d="M136 72 H156 L168 86 H136 Z" fill="#BAE6FD"/>
      <path d="M40 74 H120 M40 86 H120" stroke="#FDE68A" stroke-width="4"/>
      <rect x="148" y="56" width="12" height="10" rx="2" fill="#3B82F6"/>
      <g fill="#1E293B"><circle cx="58" cy="110" r="13"/><circle cx="150" cy="110" r="13"/></g>
      <g fill="#E2E8F0"><circle cx="58" cy="110" r="5"/><circle cx="150" cy="110" r="5"/></g>
    </svg>`,

  // Cây rìu: cán gỗ dài, lưỡi sắt
  w11Riu: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Cây rìu">
      <rect width="200" height="140" fill="#ECFCCB"/>
      <rect x="20" y="66" width="44" height="40" rx="6" fill="#B45309"/><ellipse cx="42" cy="66" rx="22" ry="7" fill="#FCD34D" stroke="#B45309" stroke-width="2"/>
      <path d="M58 122 L146 30" stroke="#92400E" stroke-width="10" stroke-linecap="round"/>
      <path d="M58 122 L74 105" stroke="#451A03" stroke-width="11" stroke-linecap="round"/>
      <path d="M132 34 L150 52 Q176 44 180 18 Q158 12 140 24 Z" fill="#94A3B8" stroke="#475569" stroke-width="3" stroke-linejoin="round"/>
      <path d="M176 22 Q172 40 154 48" stroke="#F1F5F9" stroke-width="3" fill="none"/>
    </svg>`,

  // Cái địu em bé: túi vải có hai quai đeo
  w11Diu: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Cái địu em bé">
      <rect width="200" height="140" fill="#FCE7F3"/>
      <path d="M78 26 Q74 70 80 74 M122 26 Q126 70 120 74" stroke="#A16207" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M70 60 Q100 52 130 60 L126 112 Q100 128 74 112 Z" fill="#D6C2A1" stroke="#A16207" stroke-width="3"/>
      <path d="M80 76 Q100 70 120 76" stroke="#A16207" stroke-width="2" fill="none"/>
      <path d="M86 92 L84 120 M114 92 L116 120" stroke="#A16207" stroke-width="2" stroke-dasharray="4 3"/>
      <rect x="56" y="86" width="88" height="10" rx="4" fill="#78350F"/>
      <rect x="94" y="84" width="12" height="14" rx="2" fill="#1E293B"/>
    </svg>`,
};
