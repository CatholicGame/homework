// Tranh Tuần 1 (Bài tập cuối tuần Tiếng Việt 3): sân chơi, cô giáo, bác sĩ.
import { kid } from '../picKit.js';

export default {
  // Sân chơi: cầu trượt, bóng đá, bóng rổ, nhảy dây, xe đạp
  playground: () => `
    <svg viewBox="0 0 320 180" role="img" aria-label="Các bạn đang vui chơi ở sân">
      <rect width="320" height="180" fill="#DBEAFE"/>
      <circle cx="285" cy="28" r="16" fill="#FDE047"/>
      <rect y="118" width="320" height="62" fill="#86EFAC"/>
      <g><rect x="28" y="56" width="6" height="64" fill="#64748B"/><rect x="58" y="56" width="6" height="64" fill="#64748B"/>
        <rect x="26" y="52" width="40" height="8" rx="3" fill="#EF4444"/>
        <path d="M64 60 L110 118" stroke="#F59E0B" stroke-width="10" stroke-linecap="round"/>
        <path d="M30 70 H60 M30 84 H60 M30 98 H60" stroke="#94A3B8" stroke-width="3"/></g>
      ${kid(46, 34, { shirt: '#22C55E', arms: 'up', legs: 'sit', s: 0.7 })}
      ${kid(150, 92, { shirt: '#3B82F6', arms: 'side', legs: 'run', s: 0.8 })}
      <circle cx="176" cy="134" r="7" fill="#fff" stroke="#1E293B" stroke-width="1.5"/>
      ${kid(212, 88, { shirt: '#EC4899', girl: true, arms: 'side', legs: 'jump', s: 0.8 })}
      <path d="M193 92 Q212 150 231 92" stroke="#A855F7" stroke-width="2.5" fill="none"/>
      <g transform="translate(262 128)"><circle cx="-16" cy="12" r="11" fill="none" stroke="#1E293B" stroke-width="3"/>
        <circle cx="18" cy="12" r="11" fill="none" stroke="#1E293B" stroke-width="3"/>
        <path d="M-16 12 L0 -2 L18 12 M0 -2 L-4 -12 M0 -2 L12 -6" stroke="#EF4444" stroke-width="3" fill="none"/></g>
      ${kid(262, 92, { shirt: '#F97316', arms: 'hold', legs: 'sit', s: 0.7 })}
      <g transform="translate(110 60)"><rect x="-2" y="0" width="4" height="60" fill="#64748B"/><rect x="-14" y="-4" width="26" height="16" fill="#fff" stroke="#64748B"/>
        <circle cx="0" cy="18" r="7" fill="none" stroke="#EF4444" stroke-width="2"/></g>
      <circle cx="122" cy="44" r="6" fill="#F97316"/>
    </svg>`,

  // Cô giáo đứng giảng bài bên bảng
  teacher: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Cô giáo đang giảng bài">
      <rect width="200" height="140" fill="#FEF3C7"/>
      <rect x="70" y="18" width="116" height="70" rx="4" fill="#166534" stroke="#92400E" stroke-width="5"/>
      <path d="M84 40 H130 M84 54 H160 M84 68 H140" stroke="#F0FDF4" stroke-width="3" stroke-linecap="round"/>
      <rect y="118" width="200" height="22" fill="#D6A26B"/>
      ${kid(42, 62, { shirt: '#BE185D', pants: '#7C2D12', girl: true, arms: 'side', s: 1.15 })}
      <path d="M68 66 L84 48" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
    </svg>`,

  // Bác sĩ khám bệnh cho bạn nhỏ
  doctor: () => `
    <svg viewBox="0 0 200 140" role="img" aria-label="Bác sĩ đang khám bệnh">
      <rect width="200" height="140" fill="#E0F2FE"/>
      <rect x="140" y="20" width="40" height="40" rx="6" fill="#fff" stroke="#94A3B8"/>
      <path d="M160 28 V52 M148 40 H172" stroke="#EF4444" stroke-width="6"/>
      <rect y="118" width="200" height="22" fill="#CBD5E1"/>
      ${kid(70, 60, { shirt: '#F8FAFC', pants: '#334155', arms: 'side', s: 1.15 })}
      <path d="M62 66 Q70 84 78 66" stroke="#0EA5E9" stroke-width="2.5" fill="none"/><circle cx="70" cy="84" r="4" fill="#0EA5E9"/>
      ${kid(130, 78, { shirt: '#FACC15', pants: '#2563EB', legs: 'stand', s: 0.85 })}
    </svg>`,
};
