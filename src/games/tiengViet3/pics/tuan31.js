// Tranh Tuần 31 (Bài tập cuối tuần Tiếng Việt 3): bốn lễ hội truyền thống (Cầu Ngư, hội vật, đua voi, đua thuyền).
import { kid } from '../picKit.js';

export default {
  // a) Lễ hội Cầu Ngư: thuyền rồng kết cờ trên bãi biển, người dân rước lễ
  t31cauNgu: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Lễ hội Cầu Ngư: người dân rước thuyền kết cờ trên bãi biển">
      <rect width="200" height="140" fill="#BAE6FD"/>
      <path d="M0 52 Q60 40 120 50 T200 46 L200 78 L0 78 Z" fill="#38BDF8"/>
      <path d="M0 78 L200 78 L200 140 L0 140 Z" fill="#FDE68A"/>
      <g transform="translate(46 70)">
        <path d="M0 0 L100 0 L88 16 L12 16 Z" fill="#B45309"/>
        <path d="M100 0 Q112 -10 108 -20 Q118 -12 112 2 Z" fill="#DC2626"/>
        <path d="M0 0 Q-10 -8 -6 -16 Q-14 -6 -4 4 Z" fill="#DC2626"/>
        <line x1="30" y1="0" x2="30" y2="-44" stroke="#7C2D12" stroke-width="2"/>
        <line x1="66" y1="0" x2="66" y2="-50" stroke="#7C2D12" stroke-width="2"/>
        <path d="M30 -44 L52 -36 L30 -28 Z" fill="#EF4444"/><path d="M30 -28 L48 -22 L30 -16 Z" fill="#FACC15"/>
        <path d="M66 -50 L88 -42 L66 -34 Z" fill="#22C55E"/><path d="M66 -34 L84 -28 L66 -22 Z" fill="#3B82F6"/>
      </g>
      ${kid(30, 104, { shirt: '#F8FAFC', pants: '#1E293B', arms: 'up', s: 0.7 })}
      ${kid(80, 106, { shirt: '#DC2626', pants: '#1E293B', arms: 'up', s: 0.7 })}
      ${kid(120, 106, { shirt: '#F8FAFC', pants: '#1E293B', arms: 'up', s: 0.7 })}
      ${kid(168, 104, { shirt: '#FACC15', pants: '#1E293B', girl: true, s: 0.7 })}
    </svg>`,

  // b) Hội vật: hai đô vật trên sới, người xem vây quanh
  t31vat: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Hội vật: hai đô vật đấu trên sới, người xem đứng quanh">
      <rect width="200" height="140" fill="#DCFCE7"/>
      <rect x="10" y="14" width="6" height="60" fill="#DC2626"/><rect x="184" y="14" width="6" height="60" fill="#FACC15"/>
      <ellipse cx="100" cy="100" rx="78" ry="26" fill="#D6A26B"/>
      <g fill="#F8D3B0">
        <circle cx="84" cy="62" r="9"/><circle cx="116" cy="62" r="9"/>
        <path d="M78 70 Q84 66 100 80 L94 92 Q80 86 76 80 Z"/><path d="M122 70 Q116 66 100 80 L106 92 Q120 86 124 80 Z"/>
      </g>
      <path d="M78 70 L70 82 M122 70 L130 82" stroke="#F8D3B0" stroke-width="6" stroke-linecap="round"/>
      <rect x="80" y="88" width="14" height="8" fill="#DC2626"/><rect x="106" y="88" width="14" height="8" fill="#2563EB"/>
      <path d="M84 96 L76 114 M92 96 L94 114 M108 96 L106 114 M116 96 L124 114" stroke="#F8D3B0" stroke-width="6" stroke-linecap="round"/>
      <g fill="#3F2A1D"><path d="M75 60 Q84 48 93 60 Z"/><path d="M107 60 Q116 48 125 60 Z"/></g>
      ${kid(26, 106, { shirt: '#3B82F6', pants: '#1E293B', s: 0.6 })}
      ${kid(46, 114, { shirt: '#F97316', pants: '#1E293B', girl: true, s: 0.6 })}
      ${kid(156, 114, { shirt: '#A855F7', pants: '#1E293B', s: 0.6 })}
      ${kid(176, 106, { shirt: '#10B981', pants: '#1E293B', arms: 'up', s: 0.6 })}
    </svg>`,

  // c) Lễ hội đua voi: hai chú voi chở người chạy đua trước núi rừng
  t31duaVoi: () => {
    const elephant = (x, color, flag) => `
      <g transform="translate(${x} 70)">
        <ellipse cx="0" cy="20" rx="30" ry="18" fill="${color}"/>
        <rect x="-24" y="28" width="10" height="24" rx="4" fill="${color}"/><rect x="-6" y="30" width="10" height="22" rx="4" fill="${color}"/>
        <rect x="10" y="30" width="10" height="22" rx="4" fill="${color}"/>
        <circle cx="30" cy="12" r="14" fill="${color}"/>
        <path d="M40 18 Q50 34 42 48 L36 46 Q42 34 34 22 Z" fill="${color}"/>
        <ellipse cx="24" cy="12" rx="8" ry="11" fill="#CBD5E1"/>
        <circle cx="35" cy="8" r="1.8" fill="#1E293B"/>
        <rect x="-14" y="-2" width="24" height="6" rx="2" fill="#DC2626"/>
        ${kid(-2, -16, { shirt: flag, pants: '#1E293B', arms: 'up', legs: 'sit', s: 0.55 })}
      </g>`;
    return `
    <svg viewBox="0 0 200 140" role="img" aria-label="Lễ hội đua voi: những chú voi chở người chạy đua">
      <rect width="200" height="140" fill="#E0F2FE"/>
      <path d="M0 70 L40 34 L80 66 L120 28 L170 66 L200 50 L200 90 L0 90 Z" fill="#86EFAC"/>
      <rect y="88" width="200" height="52" fill="#FCD34D"/>
      ${elephant(52, '#94A3B8', '#EF4444')}
      ${elephant(140, '#A8A29E', '#2563EB')}
    </svg>`;
  },

  // d) Lễ hội đua thuyền: các thuyền dài nhiều người chèo trên sông
  t31duaThuyen: () => {
    const boat = (y, hull, shirt) => `
      <g transform="translate(0 ${y})">
        <path d="M20 0 L184 0 Q178 12 164 12 L34 12 Q22 12 20 0 Z" fill="${hull}"/>
        <path d="M184 0 Q194 -8 190 -16 Q198 -6 188 4 Z" fill="${hull}"/>
        ${[40, 62, 84, 106, 128, 150].map(x => `
          <circle cx="${x}" cy="-10" r="4.5" fill="#F8D3B0"/>
          <rect x="${x - 4}" y="-6" width="8" height="8" rx="2" fill="${shirt}"/>
          <line x1="${x + 2}" y1="-2" x2="${x - 8}" y2="14" stroke="#7C2D12" stroke-width="2"/>`).join('')}
      </g>`;
    return `
    <svg viewBox="0 0 200 140" role="img" aria-label="Lễ hội đua thuyền: nhiều thuyền dài cùng chèo trên sông">
      <rect width="200" height="140" fill="#DBEAFE"/>
      <rect y="0" width="200" height="30" fill="#86EFAC"/>
      <rect y="30" width="200" height="110" fill="#60A5FA"/>
      <path d="M0 30 L200 30" stroke="#F8FAFC" stroke-width="3" stroke-dasharray="6 6"/>
      ${boat(62, '#DC2626', '#FACC15')}
      ${boat(98, '#16A34A', '#F8FAFC')}
      ${boat(130, '#F59E0B', '#2563EB')}
    </svg>`;
  },
};
