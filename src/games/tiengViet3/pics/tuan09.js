// Tranh Tuần 9 (Bài tập cuối tuần Tiếng Việt 3): hai tranh a) an ủi bạn, b) phát vở cho bạn.
import { kid } from '../picKit.js';

/** Bàn học nhỏ nhìn ngang. */
const desk = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="7" rx="2" fill="#B45309"/>
  <path d="M${x + 6} ${y + 7} V${y + 40} M${x + w - 6} ${y + 7} V${y + 40}" stroke="#92400E" stroke-width="4"/>`;

export default {
  t9pictures: () => `
    <svg viewBox="0 0 320 170" role="img" aria-label="Tranh a: hai bạn an ủi một bạn đang buồn. Tranh b: bạn nam phát vở cho bạn nữ">
      <rect width="320" height="170" fill="#F1F5F9"/>
      <rect x="6" y="6" width="150" height="158" rx="8" fill="#FEF3C7"/>
      <rect x="164" y="6" width="150" height="158" rx="8" fill="#DCFCE7"/>
      <text x="16" y="26" font-size="16" font-weight="700" fill="#1E293B" font-family="sans-serif">a)</text>
      <text x="174" y="26" font-size="16" font-weight="700" fill="#1E293B" font-family="sans-serif">b)</text>
      <rect x="6" y="140" width="150" height="24" fill="#E9C99A"/><rect x="164" y="140" width="150" height="24" fill="#BBF7D0"/>

      ${kid(81, 98, { shirt: '#A855F7', girl: true, arms: 'hold', legs: 'sit', s: 1.15 })}
      <rect x="76.5" y="90.5" width="9" height="4" fill="#F8D3B0"/>
      <path d="M77.5 94 Q81 91.2 84.5 94" stroke="#9A3412" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M76.5 88.5 q-1.6 2.6 0 3.6 q1.6 -1 0 -3.6Z" fill="#60A5FA"/>
      ${desk(54, 122, 54)}
      <rect x="62" y="114" width="22" height="8" fill="#22C55E"/><rect x="64" y="109" width="18" height="5" fill="#3B82F6"/>
      ${kid(34, 91, { shirt: '#3B82F6', pants: '#92400E', arms: 'side', s: 1.15 })}
      ${kid(128, 91, { shirt: '#F97316', girl: true, arms: 'side', s: 1.15 })}

      ${kid(200, 91, { shirt: '#0EA5E9', pants: '#1E3A8A', arms: 'side', s: 1.15 })}
      <rect x="220" y="86" width="24" height="6" fill="#22C55E"/><rect x="220" y="92" width="24" height="6" fill="#3B82F6"/><rect x="220" y="98" width="24" height="6" fill="#EF4444"/>
      ${kid(280, 98, { shirt: '#fff', pants: '#1E3A8A', girl: true, arms: 'hold', legs: 'sit', s: 1.15 })}
      ${desk(250, 122, 60)}
      <rect x="266" y="116" width="28" height="6" fill="#fff" stroke="#94A3B8"/>
    </svg>`,
};
