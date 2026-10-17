// Tranh Tuần 10 (Bài tập cuối tuần Tiếng Việt 3): hai tình huống đặt câu khiến.
import { kid } from '../picKit.js';

export default {
  // a) Cô giáo chỉ lên bảng, hai bạn ngồi bàn mở vở · b) Hai bạn mặc đồng phục, đeo cặp, đứng dưới hàng cây
  w10Khien: () => `
    <svg viewBox="0 0 320 160" role="img" aria-label="a) Cô giáo chỉ lên bảng trong lớp học. b) Hai bạn nhỏ đeo cặp chuẩn bị đi học">
      <rect width="158" height="160" fill="#FEF3C7"/>
      <rect x="20" y="16" width="118" height="52" rx="3" fill="#166534" stroke="#92400E" stroke-width="4"/>
      <path d="M32 32 H86 M32 44 H110 M32 56 H76" stroke="#F0FDF4" stroke-width="2.5" stroke-linecap="round"/>
      <rect y="132" width="158" height="28" fill="#D6A26B"/>
      ${kid(110, 70, { shirt: '#14B8A6', pants: '#334155', girl: true, arms: 'side', s: 0.95 })}
      <path d="M88 76 L66 52" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
      <rect x="128" y="72" width="14" height="11" rx="1" fill="#3B82F6"/>
      ${kid(32, 104, { shirt: '#F8FAFC', pants: '#1E3A8A', arms: 'hold', legs: 'sit', s: 0.7 })}
      ${kid(74, 104, { shirt: '#F8FAFC', pants: '#1E3A8A', girl: true, arms: 'hold', legs: 'sit', s: 0.7 })}
      <rect x="14" y="120" width="84" height="8" rx="2" fill="#B45309"/>
      <rect x="22" y="114" width="18" height="7" fill="#fff" stroke="#22C55E"/><rect x="64" y="114" width="18" height="7" fill="#fff" stroke="#EF4444"/>
      <rect x="162" width="158" height="160" fill="#DBEAFE"/>
      <rect x="162" y="124" width="158" height="36" fill="#86EFAC"/>
      <rect x="182" y="70" width="5" height="60" fill="#78350F"/><ellipse cx="184" cy="62" rx="16" ry="34" fill="#22C55E"/>
      <rect x="296" y="66" width="5" height="64" fill="#78350F"/><ellipse cx="298" cy="58" rx="17" ry="36" fill="#F59E0B"/>
      <rect x="208" y="96" width="22" height="22" rx="5" fill="#EF4444"/>
      ${kid(222, 92, { shirt: '#F8FAFC', pants: '#1E3A8A', arms: 'side', s: 0.85 })}
      <rect x="252" y="96" width="22" height="22" rx="5" fill="#A855F7"/>
      ${kid(262, 92, { shirt: '#F8FAFC', pants: '#1E3A8A', girl: true, arms: 'down', s: 0.85 })}
      <rect x="158" width="4" height="160" fill="#fff"/>
      <g font-family="sans-serif" font-weight="700" font-size="16" fill="#1E293B">
        <circle cx="16" cy="146" r="11" fill="#fff"/><text x="10" y="151">a</text>
        <circle cx="176" cy="146" r="11" fill="#fff"/><text x="170" y="151">b</text>
      </g>
    </svg>`,
};
