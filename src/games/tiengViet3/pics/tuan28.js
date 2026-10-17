// Tranh Tuần 28 (Bài tập cuối tuần Tiếng Việt 3): viết câu có hình ảnh so sánh.

export default {
  // a) Giọt sương long lanh trên ngọn lá · b) Vầng trăng khuyết giữa trời sao
  t28SoSanh: () => `
    <svg viewBox="0 0 320 160" role="img" aria-label="a) Những giọt sương đọng trên lá cỏ. b) Vầng trăng khuyết giữa bầu trời đêm đầy sao">
      <defs>
        <radialGradient id="t28drop" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stop-color="#FFFFFF"/><stop offset="0.45" stop-color="#D9F99D" stop-opacity="0.9"/><stop offset="1" stop-color="#65A30D" stop-opacity="0.75"/>
        </radialGradient>
        <radialGradient id="t28glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#FEF9C3" stop-opacity="0.55"/><stop offset="1" stop-color="#FEF9C3" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="158" height="160" fill="#BBF7D0"/>
      <ellipse cx="40" cy="40" rx="34" ry="22" fill="#DCFCE7" opacity="0.8"/>
      <ellipse cx="120" cy="30" rx="26" ry="16" fill="#DCFCE7" opacity="0.7"/>
      <rect y="128" width="158" height="32" fill="#4ADE80" opacity="0.55"/>
      <path d="M0 136 Q40 130 80 136 T158 134" stroke="#F0FDF4" stroke-width="2" fill="none" opacity="0.8"/>
      <path d="M0 146 Q40 140 80 146 T158 144" stroke="#F0FDF4" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M14 160 Q30 90 62 20 Q46 92 30 160Z" fill="#16A34A"/>
      <path d="M8 120 Q70 76 158 82 L158 94 Q76 92 14 128Z" fill="#22C55E"/>
      <path d="M20 120 Q76 86 158 88" stroke="#BBF7D0" stroke-width="1.5" fill="none"/>
      <ellipse cx="70" cy="86" rx="12" ry="11" fill="url(#t28drop)" stroke="#4D7C0F" stroke-width="1"/>
      <ellipse cx="66" cy="82" rx="3.5" ry="2.5" fill="#fff"/>
      <ellipse cx="112" cy="76" rx="17" ry="16" fill="url(#t28drop)" stroke="#4D7C0F" stroke-width="1"/>
      <ellipse cx="106" cy="70" rx="5" ry="3.5" fill="#fff"/>
      <ellipse cx="145" cy="80" rx="6" ry="5.5" fill="url(#t28drop)" stroke="#4D7C0F" stroke-width="1"/>
      <path d="M118 64 l3 -6 M126 70 l6 -3 M100 60 l-2 -6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
      <rect x="162" width="158" height="160" fill="#172554"/>
      <circle cx="240" cy="62" r="40" fill="url(#t28glow)"/>
      <mask id="t28moon"><rect x="162" width="158" height="160" fill="#fff"/><circle cx="254" cy="50" r="27" fill="#000"/></mask>
      <g mask="url(#t28moon)">
        <circle cx="240" cy="62" r="30" fill="#F1F5F9"/>
        <circle cx="222" cy="66" r="3" fill="#CBD5E1"/><circle cx="234" cy="84" r="2.2" fill="#CBD5E1"/>
      </g>
      <g fill="#FDE68A">
        <circle cx="180" cy="22" r="1.6"/><circle cx="200" cy="48" r="1.2"/><circle cx="290" cy="20" r="1.8"/><circle cx="306" cy="58" r="1.3"/>
        <circle cx="276" cy="40" r="1.1"/><circle cx="188" cy="88" r="1.4"/><circle cx="296" cy="98" r="1.2"/><circle cx="214" cy="16" r="1"/>
        <path d="M282 112 l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2Z"/>
        <path d="M196 64 l1.5 -4.5 l1.5 4.5 l4.5 1.5 l-4.5 1.5 l-1.5 4.5 l-1.5 -4.5 l-4.5 -1.5Z"/>
      </g>
      <path d="M162 160 L162 128 Q176 112 194 122 Q206 104 226 116 Q244 108 252 124 Q270 116 282 130 Q300 120 320 132 L320 160Z" fill="#CBD5E1"/>
      <path d="M162 160 L162 140 Q186 128 206 140 Q230 130 250 144 Q280 134 320 146 L320 160Z" fill="#E2E8F0"/>
      <rect x="158" width="4" height="160" fill="#fff"/>
      <g font-family="sans-serif" font-weight="700" font-size="16" fill="#1E293B">
        <circle cx="16" cy="146" r="11" fill="#fff"/><text x="10" y="151">a</text>
        <circle cx="306" cy="16" r="11" fill="#fff"/><text x="300" y="21">b</text>
      </g>
    </svg>`,
};
