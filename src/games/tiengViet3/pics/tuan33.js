// Tranh Tuần 33 (Bài tập cuối tuần Tiếng Việt 3): bãi biển đầy rác → hai bạn nhặt rác → bãi biển sạch.
import { kid } from '../picKit.js';

const palm = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 0 Q4 -30 -2 -60" stroke="#A16207" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g fill="#22C55E">
      <path d="M-2 -60 Q-22 -70 -32 -54 Q-18 -62 -2 -58 Z"/><path d="M-2 -60 Q18 -72 30 -56 Q14 -62 -2 -58 Z"/>
      <path d="M-2 -60 Q-10 -80 -26 -76 Q-12 -72 -2 -60 Z"/><path d="M-2 -60 Q8 -80 22 -78 Q8 -72 -2 -60 Z"/>
    </g>
  </g>`;

const island = (x) => `
  <g transform="translate(${x} 0)">
    <path d="M2 104 Q50 92 98 104 L98 130 L2 130 Z" fill="#38BDF8"/>
    <path d="M10 100 Q50 84 90 100 Q70 112 50 110 Q28 112 10 100 Z" fill="#FDE68A"/>
    ${palm(26, 98, 0.9)}${palm(76, 96, 0.8)}
  </g>`;

const trash = (x, y) => `
  <g transform="translate(${x} ${y})">
    <rect x="0" y="0" width="6" height="9" rx="1.5" fill="#EF4444"/>
    <rect x="9" y="3" width="8" height="5" fill="#94A3B8"/>
    <path d="M-8 6 L-2 2 L-4 9 Z" fill="#A855F7"/>
  </g>`;

const arrow = (x) => `<path d="M${x} 92 L${x + 10} 92 L${x + 10} 87 L${x + 18} 96 L${x + 10} 105 L${x + 10} 100 L${x} 100 Z" fill="#DC2626"/>`;

export default {
  t33beach: () => `
    <svg viewBox="0 0 320 140" role="img" aria-label="Ba tranh: bãi biển đầy rác, hai bạn nhỏ nhặt rác, bãi biển sạch đẹp">
      <rect width="320" height="140" fill="#E0F2FE"/>
      ${island(0)}${trash(28, 96)}${trash(52, 100)}${trash(70, 94)}${trash(40, 108)}
      ${arrow(100)}
      ${island(118)}${trash(140, 100)}${trash(184, 104)}
      ${kid(160, 76, { shirt: '#F472B6', pants: '#7C3AED', girl: true, arms: 'hold', s: 0.55 })}
      ${kid(176, 74, { shirt: '#3B82F6', pants: '#1E293B', girl: true, arms: 'hold', s: 0.6 })}
      <path d="M164 88 Q170 84 176 88 L178 104 Q170 108 162 104 Z" fill="#1E293B"/>
      ${arrow(218)}
      ${island(222)}
    </svg>`,
};
