// Tranh Tuần 3 (Bài tập cuối tuần Tiếng Việt 3): 9 việc làm khi nấu ăn (câu 6).
import { SKIN } from '../picKit.js';

const BG = '#FEF9C3';
const TABLE = '#D6A26B';
const frame = (label, body) => `
  <svg viewBox="0 0 200 140" role="img" aria-label="${label}">
    <rect width="200" height="140" fill="${BG}"/>
    <rect y="112" width="200" height="28" fill="${TABLE}"/>
    ${body}
  </svg>`;
/** Bàn tay đơn giản: cổ tay áo + nắm tay. */
const hand = (x, y, rot = 0, sleeve = '#60A5FA') => `
  <g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-36" y="-9" width="26" height="18" rx="5" fill="${sleeve}"/>
    <ellipse cx="0" cy="0" rx="13" ry="10" fill="${SKIN}" stroke="#E7B48C" stroke-width="1.5"/>
  </g>`;

export default {
  // Phết bơ lên lát bánh mì
  cook_phet: () => frame('Phết bơ lên bánh mì', `
    <path d="M40 112 V70 Q40 52 60 52 Q70 40 90 46 Q112 40 122 54 Q140 54 140 72 V112Z" fill="#F59E0B"/>
    <path d="M48 110 V74 Q48 60 63 60 Q72 50 90 55 Q108 50 116 62 Q132 62 132 76 V110Z" fill="#FDE68A"/>
    <path d="M56 80 Q80 72 104 82 Q118 88 124 80 L124 96 Q96 104 60 96Z" fill="#FEF08A" stroke="#FACC15" stroke-width="2"/>
    <path d="M86 86 L150 36" stroke="#94A3B8" stroke-width="7" stroke-linecap="round"/>
    <path d="M150 36 L172 20" stroke="#78350F" stroke-width="9" stroke-linecap="round"/>
    ${hand(170, 24, -35)}`),

  // Pha trộn bột trong bát bằng phới
  cook_tron: () => frame('Pha trộn bột trong bát', `
    <path d="M44 74 H156 Q152 116 100 118 Q48 116 44 74Z" fill="#7DD3FC"/>
    <ellipse cx="100" cy="74" rx="56" ry="12" fill="#FEF3C7" stroke="#38BDF8" stroke-width="4"/>
    <path d="M78 72 Q90 66 100 72 Q112 78 122 70" stroke="#FBBF24" stroke-width="3" fill="none"/>
    <path d="M100 74 L124 24" stroke="#64748B" stroke-width="4"/>
    <path d="M100 76 Q88 64 98 54 Q108 62 100 76 Q118 66 108 54" stroke="#64748B" stroke-width="2.5" fill="none"/>
    <path d="M124 24 L132 8" stroke="#DC2626" stroke-width="8" stroke-linecap="round"/>
    ${hand(132, 14, -60, '#F472B6')}`),

  // Nạo củ trên bàn nạo
  cook_nao: () => frame('Nạo củ trên bàn nạo', `
    <path d="M82 112 L94 34 H126 L138 112Z" fill="#CBD5E1" stroke="#64748B" stroke-width="3"/>
    <rect x="98" y="22" width="24" height="14" rx="5" fill="#334155"/>
    ${[50, 62, 74, 86, 98].map(y => `<path d="M${98 - (y - 50) * 0.05} ${y} h6 M${110} ${y} h6 M${122 + (y - 50) * 0.05} ${y} h-4" stroke="#475569" stroke-width="2.5"/>`).join('')}
    <ellipse cx="78" cy="66" rx="14" ry="20" fill="#FB923C" transform="rotate(-20 78 66)"/>
    ${hand(60, 60, 10, '#A78BFA')}
    <path d="M110 112 l-6 -10 M120 112 l4 -8 M100 112 l-2 -6" stroke="#FB923C" stroke-width="3" stroke-linecap="round"/>`),

  // Luộc rau trong nồi nước sôi
  cook_luoc: () => frame('Luộc trong nồi nước sôi', `
    <path d="M40 34 Q34 24 40 14 M60 34 Q54 24 60 14 M80 34 Q74 24 80 14" stroke="#94A3B8" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="28" y="46" width="96" height="62" rx="10" fill="#F97316"/>
    <ellipse cx="76" cy="46" rx="48" ry="9" fill="#BAE6FD" stroke="#EA580C" stroke-width="4"/>
    ${[44, 58, 72, 86, 100, 112].map((x, i) => `<circle cx="${x}" cy="${44 + (i % 2) * 4}" r="3.5" fill="#fff"/>`).join('')}
    <path d="M124 54 H176" stroke="#EA580C" stroke-width="8" stroke-linecap="round"/>
    <rect x="22" y="108" width="108" height="6" rx="3" fill="#475569"/>
    <path d="M42 120 q6 -8 0 -14 M76 120 q6 -8 0 -14 M110 120 q6 -8 0 -14" stroke="#EF4444" stroke-width="4" fill="none" stroke-linecap="round"/>`),

  // Thái cà rốt trên thớt
  cook_thai: () => frame('Thái cà rốt trên thớt', `
    <ellipse cx="96" cy="104" rx="70" ry="16" fill="#A16207"/>
    <ellipse cx="96" cy="100" rx="70" ry="16" fill="#CA8A04"/>
    <path d="M40 98 L104 90 L104 104 Z" fill="#F97316"/>
    <path d="M36 94 l-10 -6 M38 98 l-12 2" stroke="#16A34A" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="118" cy="98" rx="4" ry="7" fill="#FB923C"/><ellipse cx="128" cy="99" rx="4" ry="7" fill="#FB923C"/>
    <path d="M110 96 L110 44 L138 44 L138 70 Q130 92 110 96Z" fill="#E2E8F0" stroke="#64748B" stroke-width="2"/>
    <rect x="116" y="18" width="16" height="28" rx="5" fill="#1E293B"/>
    ${hand(124, 22, -90, '#34D399')}`),

  // Cán bột bằng cây cán
  cook_can: () => frame('Cán bột bằng cây cán', `
    <ellipse cx="100" cy="106" rx="76" ry="10" fill="#FEF3C7" stroke="#FCD34D" stroke-width="2"/>
    <rect x="30" y="80" width="140" height="20" rx="10" fill="#F59E0B"/>
    <rect x="12" y="85" width="22" height="10" rx="5" fill="#B45309"/><rect x="166" y="85" width="22" height="10" rx="5" fill="#B45309"/>
    ${hand(56, 76, 90, '#F472B6')}${hand(144, 76, 90, '#F472B6')}`),

  // Rót sữa ra cốc
  cook_rot: () => frame('Rót sữa ra cốc', `
    <path d="M62 64 H110 L104 112 H68Z" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="3"/>
    <path d="M65 84 H107 L104 110 H68Z" fill="#fff"/>
    <path d="M100 30 Q92 54 88 84" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M100 30 Q92 54 88 84" stroke="#E2E8F0" stroke-width="1.5" fill="none"/>
    <g transform="rotate(-35 136 30)"><rect x="112" y="6" width="48" height="56" rx="8" fill="#EC4899"/>
      <path d="M112 14 L102 8 L112 24Z" fill="#EC4899"/><path d="M160 18 Q176 34 160 50" stroke="#DB2777" stroke-width="6" fill="none"/></g>
    ${hand(172, 40, -20, '#FACC15')}`),

  // Nướng bánh trong lò
  cook_nuong: () => frame('Nướng bánh trong lò', `
    <rect x="28" y="14" width="144" height="98" rx="8" fill="#94A3B8"/>
    <rect x="40" y="28" width="120" height="70" rx="5" fill="#1E293B"/>
    <rect x="46" y="34" width="108" height="58" rx="3" fill="#FDBA74" opacity="0.35"/>
    <path d="M50 76 H150" stroke="#64748B" stroke-width="3"/>
    ${[62, 88, 114, 140].map(x => `<path d="M${x - 10} 74 Q${x} 58 ${x + 10} 74Z" fill="#D97706"/><path d="M${x - 6} 66 q6 -4 12 0" stroke="#FDE68A" stroke-width="2" fill="none"/>`).join('')}
    <path d="M52 92 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0 q8 -6 16 0 q8 6 16 0" stroke="#EF4444" stroke-width="3" fill="none"/>
    <circle cx="150" cy="20" r="3" fill="#F8FAFC"/><circle cx="138" cy="20" r="3" fill="#F8FAFC"/>`),

  // Chiên (rán) trứng trong chảo
  cook_chien: () => frame('Chiên trứng trong chảo', `
    <ellipse cx="86" cy="94" rx="62" ry="18" fill="#334155"/>
    <ellipse cx="86" cy="88" rx="58" ry="14" fill="#64748B"/>
    <path d="M144 86 L188 70" stroke="#1E293B" stroke-width="9" stroke-linecap="round"/>
    <path d="M52 86 q-8 -10 6 -12 q6 -10 18 -2 q12 2 6 12 q-10 10 -30 2Z" fill="#fff"/><circle cx="66" cy="82" r="6" fill="#FBBF24"/>
    <path d="M94 88 q-8 -10 6 -12 q6 -10 18 -2 q12 2 6 12 q-10 10 -30 2Z" fill="#fff"/><circle cx="108" cy="84" r="6" fill="#FBBF24"/>
    <path d="M60 60 Q54 50 60 40 M86 58 Q80 48 86 38 M112 60 Q106 50 112 40" stroke="#94A3B8" stroke-width="3" fill="none" stroke-linecap="round"/>`),
};
