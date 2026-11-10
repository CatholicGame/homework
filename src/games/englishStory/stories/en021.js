/**
 * Bài 21 "Minh's Morning": ngôi nhà cắt ngang (phòng tắm · phòng ngủ · bếp · hành lang) rồi ra phố, tới trường.
 * Mỗi câu của bài là một nhịp; Minh đi qua các phòng theo đúng thứ tự câu chuyện (lộ trình trong đầu giúp bé nhớ thứ tự).
 * Toạ độ cảnh: rộng 2480, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { lying, headOnly } from '../../tiengViet3/cast.js';

const L = '#6B4A3A';
const FLOOR = 282;

// ── Đồ vật nhỏ ────────────────────────────────────────────────────────────
const cloud = (x, y, s = 1, d = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="e21-cloud" style="animation-delay:${d}s">
  <ellipse cx="0" cy="0" rx="34" ry="13" fill="#fff"/><ellipse cx="-15" cy="-8" rx="15" ry="11" fill="#fff"/><ellipse cx="12" cy="-11" rx="17" ry="13" fill="#fff"/></g></g>`;
const tree = (x, s = 1) => `<g transform="translate(${x} ${FLOOR - 8}) scale(${s})"><rect x="-6" y="-60" width="12" height="60" rx="3" fill="#A16207" stroke="${L}"/>
  <g class="e21-sway"><circle cx="0" cy="-86" r="34" fill="#22C55E" stroke="${L}"/><circle cx="-22" cy="-70" r="20" fill="#16A34A" stroke="${L}"/><circle cx="22" cy="-72" r="22" fill="#4ADE80" stroke="${L}"/>
  <circle cx="-8" cy="-96" r="5" fill="#EF4444"/><circle cx="14" cy="-84" r="5" fill="#EF4444"/></g></g>`;
const sunFace = (r) => `<circle r="${r}" fill="#FDE047" stroke="#F59E0B" stroke-width="2"/>
  ${Array.from({ length: 10 }, (_, i) => `<path d="M0 ${-r - 6} V${-r - 14}" stroke="#FBBF24" stroke-width="4" stroke-linecap="round" transform="rotate(${i * 36})"/>`).join('')}
  <circle cx="${-r * 0.35}" cy="${-r * 0.12}" r="${r * 0.09}" fill="#78350F"/><circle cx="${r * 0.35}" cy="${-r * 0.12}" r="${r * 0.09}" fill="#78350F"/>
  <g class="e21-smile0"><path d="M${-r * 0.3} ${r * 0.25} Q0 ${r * 0.45} ${r * 0.3} ${r * 0.25}" stroke="#78350F" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
  <g class="e21-smile1"><path d="M${-r * 0.4} ${r * 0.2} Q0 ${r * 0.75} ${r * 0.4} ${r * 0.2}Z" fill="#B4363C" stroke="#78350F" stroke-width="1.6"/></g>
  <ellipse cx="${-r * 0.55}" cy="${r * 0.2}" rx="${r * 0.14}" ry="${r * 0.08}" fill="#FB923C" opacity="0.6"/><ellipse cx="${r * 0.55}" cy="${r * 0.2}" rx="${r * 0.14}" ry="${r * 0.08}" fill="#FB923C" opacity="0.6"/>`;
const steam = (x, y, cls) => `<g class="${cls}" transform="translate(${x} ${y})">${[-8, 0, 8].map((dx, i) => `<path class="e21-steam" style="animation-delay:${i * 0.5}s" d="M${dx} 0 q-5 -8 0 -16 q5 -8 0 -16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"/>`).join('')}</g>`;
const doorway = (x) => `<rect x="${x - 12}" y="0" width="24" height="98" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${x - 12}" y="98" width="5" height="${FLOOR - 98}" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/><rect x="${x + 7}" y="98" width="5" height="${FLOOR - 98}" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/>`;
export const BOWL = `<path d="M-14 -4 H14 Q13 9 0 10 Q-13 9 -14 -4Z" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/><path d="M-12 -4 Q0 -10 12 -4Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/>
  <path d="M-8 -6 q4 -3 8 0 q4 -3 8 0" stroke="#F59E0B" stroke-width="1" fill="none"/><circle cx="-5" cy="-6" r="2.2" fill="#22C55E"/><ellipse cx="5" cy="-6" rx="3" ry="1.6" fill="#F87171"/>`;
export const GLASS = `<rect x="-6" y="-12" width="12" height="20" rx="2" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1"/><rect x="-5" y="-7" width="10" height="14" rx="1.5" fill="#fff" stroke="#E2E8F0" stroke-width="0.6"/>`;
const BAG = (c) => `<rect x="-11" y="-14" width="22" height="28" rx="5" fill="${c}" stroke="${L}" stroke-width="1"/><rect x="-8" y="-2" width="16" height="10" rx="2" fill="none" stroke="${L}" stroke-width="0.9"/><path d="M-6 -14 Q0 -24 6 -14" stroke="${L}" stroke-width="1.4" fill="none"/>`;

function bg() {
  const tiles = Array.from({ length: 9 }, (_, i) => `<path d="M0 ${i * 30 + 20} H300" stroke="#BFDBFE" stroke-width="1"/>`).join('') + Array.from({ length: 10 }, (_, i) => `<path d="M${i * 30 + 15} 10 V${FLOOR}" stroke="#BFDBFE" stroke-width="1"/>`).join('');
  return `
  <defs>
    <linearGradient id="e21sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient>
    <linearGradient id="e21win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDBA74"/><stop offset="1" stop-color="#BAE6FD"/></linearGradient>
    <clipPath id="e21winclip"><rect x="622" y="72" width="116" height="126"/></clipPath>
  </defs>
  <!-- Ngoài trời -->
  <rect x="1620" y="0" width="860" height="315" fill="url(#e21sky)"/>
  <g transform="translate(1980 100)"><g class="e21-osun">${sunFace(30)}</g></g>
  ${cloud(1760, 50, 1.1, 0)}${cloud(2200, 40, 0.9, 3)}${cloud(2380, 90, 0.7, 6)}
  <path d="M1620 240 Q1760 200 1900 236 T2200 228 T2480 236 V282 H1620Z" fill="#86EFAC" stroke="${L}"/>
  ${tree(1720, 1)}${tree(2080, 1.1)}
  <g>${Array.from({ length: 22 }, (_, i) => `<rect x="${1660 + i * 26}" y="246" width="8" height="30" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/>`).join('')}<rect x="1656" y="254" width="580" height="6" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>
  <rect x="1620" y="272" width="860" height="18" fill="#E5E7EB" stroke="${L}"/>
  <rect x="1620" y="290" width="860" height="25" fill="#64748B"/>
  ${Array.from({ length: 14 }, (_, i) => `<rect x="${1640 + i * 62}" y="301" width="30" height="4" rx="2" fill="#F8FAFC"/>`).join('')}
  <!-- Trường -->
  <g transform="translate(2370 0)">
    <path d="M-110 120 L0 70 L110 120Z" fill="#EF4444" stroke="${L}" stroke-width="1.4"/>
    <rect x="-100" y="120" width="200" height="152" fill="#FDE68A" stroke="${L}" stroke-width="1.4"/>
    ${[-70, -30, 30, 70].map((x) => `<rect x="${x - 14}" y="140" width="28" height="30" fill="#BAE6FD" stroke="${L}"/><path d="M${x} 140 V170 M${x - 14} 155 H${x + 14}" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <rect x="-24" y="196" width="48" height="76" rx="4" fill="#B45309" stroke="${L}"/><circle cx="14" cy="236" r="3" fill="#FDE68A"/>
    <rect x="-46" y="94" width="92" height="22" rx="4" fill="#fff" stroke="${L}"/><text x="0" y="111" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#1D4ED8">SCHOOL</text>
    <path d="M90 120 V40" stroke="#78716C" stroke-width="3"/><g class="e21-flag"><rect x="90" y="40" width="34" height="22" fill="#DA251D"/><path d="M107 44 l2.4 6.6 h7 l-5.6 4.2 l2.2 6.8 l-6 -4.2 l-6 4.2 l2.2 -6.8 l-5.6 -4.2 h7Z" fill="#FFFF00" transform="scale(0.7) translate(46 18)"/></g>
  </g>
  <!-- Trong nhà: tường các phòng -->
  <rect x="0" y="0" width="300" height="${FLOOR}" fill="#E0F2FE"/>${tiles}
  <rect x="300" y="0" width="600" height="${FLOOR}" fill="#FEF3C7"/>
  ${Array.from({ length: 18 }, (_, i) => `<circle cx="${320 + (i * 97) % 560}" cy="${30 + (i * 53) % 120}" r="2.4" fill="#FCD34D"/>`).join('')}
  <rect x="900" y="0" width="520" height="${FLOOR}" fill="#DCFCE7"/>
  <rect x="910" y="150" width="190" height="80" fill="#fff" stroke="#BBF7D0"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${910 + i * 32} 150 V230" stroke="#BBF7D0"/>`).join('')}<path d="M910 190 H1100" stroke="#BBF7D0"/>
  <rect x="1420" y="0" width="200" height="${FLOOR}" fill="#FFEDD5"/>
  <rect x="0" y="0" width="1640" height="12" fill="#E9D5B5" stroke="${L}"/>
  <rect x="0" y="${FLOOR}" width="1620" height="${315 - FLOOR}" fill="#D9A066" stroke="${L}"/>
  ${Array.from({ length: 27 }, (_, i) => `<path d="M${i * 60} ${FLOOR} V315" stroke="#B9824F" stroke-width="1.2"/>`).join('')}
  <!-- Phòng tắm -->
  <path d="M18 222 H128 Q126 270 100 274 H44 Q20 270 18 222Z" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="14" y="216" width="118" height="10" rx="5" fill="#93C5FD" stroke="${L}"/>
  <path d="M110 216 V120 Q110 106 96 106" stroke="#94A3B8" stroke-width="4" fill="none"/><circle cx="92" cy="112" r="8" fill="#CBD5E1" stroke="${L}"/>
  <ellipse cx="190" cy="132" rx="34" ry="44" fill="#E0F2FE" stroke="#A16207" stroke-width="5"/><path d="M174 108 l14 -10 M170 122 l26 -20" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
  <rect x="178" y="232" width="24" height="50" fill="#fff" stroke="${L}"/>
  <path d="M146 214 H234 Q232 236 190 238 Q148 236 146 214Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  <path d="M190 214 V200 H204" stroke="#94A3B8" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path class="e21-tapwater" d="M203 204 V222" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" stroke-dasharray="4 4"/>
  <g transform="translate(226 206)"><rect x="-6" y="-8" width="12" height="16" rx="2" fill="#F9A8D4" stroke="${L}"/><path d="M-2 -8 L-4 -20 M2 -8 L4 -19" stroke="#22D3EE" stroke-width="2.4" stroke-linecap="round"/></g>
  <path d="M244 150 H290" stroke="#A16207" stroke-width="4" stroke-linecap="round"/><path d="M252 150 V196 H282 V150" fill="#F472B6" stroke="${L}"/><path d="M252 186 H282" stroke="#fff" stroke-width="3"/>
  <!-- Phòng ngủ -->
  <g class="e21-balloon"><path d="M338 176 Q330 150 340 128" stroke="${L}" stroke-width="1" fill="none"/>
    <g transform="translate(340 104)"><circle class="e21-glow" r="30" fill="#FDE68A" opacity="0"/><ellipse rx="20" ry="24" fill="#EF4444" stroke="${L}"/><path d="M-3 24 h6 l-3 5Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/>
    <text x="0" y="9" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="26" fill="#fff">8</text><path d="M-10 -12 q4 -6 10 -6" stroke="#fff" stroke-width="2.4" fill="none" opacity="0.6"/></g></g>
  <rect x="330" y="176" width="16" height="106" rx="3" fill="#A16207" stroke="${L}"/>
  <rect x="330" y="236" width="210" height="26" rx="4" fill="#fff" stroke="${L}"/><rect x="330" y="258" width="210" height="10" fill="#C2410C" stroke="${L}"/>
  <rect x="530" y="222" width="12" height="60" rx="3" fill="#A16207" stroke="${L}"/>
  <g class="e21-sleeper">${lying(445, 250, 'en_minh_pj', { s: 1, len: 120, blanket: '#93C5FD' })}</g>
  <g class="e21-made"><rect x="356" y="222" width="44" height="18" rx="8" fill="#fff" stroke="${L}"/><path d="M420 238 Q480 226 528 236 V244 H420Z" fill="#93C5FD" stroke="${L}"/></g>
  <rect x="548" y="236" width="48" height="46" rx="3" fill="#D97706" stroke="${L}"/><rect x="554" y="250" width="36" height="10" rx="2" fill="none" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(572 222)"><g class="e21-clock"><circle r="14" fill="#fff" stroke="#EF4444" stroke-width="3"/><path d="M0 0 V-8 M0 0 H6" stroke="${L}" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="-10" cy="-13" r="5" fill="#EF4444" stroke="${L}"/><circle cx="10" cy="-13" r="5" fill="#EF4444" stroke="${L}"/><path d="M-9 13 l-3 4 M9 13 l3 4" stroke="${L}" stroke-width="2"/></g>
    <g class="e21-ringlines"><path d="M-22 -18 l-7 -5 M22 -18 l7 -5 M-24 -4 h-8 M24 -4 h8" stroke="#EF4444" stroke-width="2.4" stroke-linecap="round"/></g></g>
  <rect x="616" y="66" width="128" height="138" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <g clip-path="url(#e21winclip)"><rect x="622" y="72" width="116" height="126" fill="url(#e21win)"/>
    <g transform="translate(680 150)"><g class="e21-wsun">${sunFace(22)}</g></g>${cloud(650, 110, 0.6, 2)}
    <path d="M622 186 Q660 170 700 182 T738 178 V198 H622Z" fill="#86EFAC"/></g>
  <path d="M680 72 V198 M622 135 H738" stroke="#fff" stroke-width="3" opacity="0.7"/>
  <g class="e21-shL"><rect x="622" y="72" width="58" height="126" fill="#60A5FA" stroke="${L}"/>${[86, 102, 118, 134, 150, 166, 182].map((y) => `<path d="M628 ${y} H674" stroke="#2563EB" stroke-width="2"/>`).join('')}<circle cx="672" cy="136" r="2.6" fill="#FDE68A"/></g>
  <g class="e21-shR"><rect x="680" y="72" width="58" height="126" fill="#60A5FA" stroke="${L}"/>${[86, 102, 118, 134, 150, 166, 182].map((y) => `<path d="M686 ${y} H732" stroke="#2563EB" stroke-width="2"/>`).join('')}<circle cx="688" cy="136" r="2.6" fill="#FDE68A"/></g>
  <polygon class="e21-beam" points="622,198 738,198 790,${FLOOR} 600,${FLOOR}" fill="#FEF08A"/>
  <ellipse cx="690" cy="${FLOOR}" rx="80" ry="7" fill="#FDA4AF" opacity="0.6"/>
  <rect x="790" y="118" width="96" height="164" rx="4" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <rect x="796" y="124" width="84" height="150" fill="#78350F"/>
  <path d="M806 134 H870" stroke="#D6D3D1" stroke-width="3"/>
  <g class="e21-hang"><path d="M838 134 v6 M826 146 L838 140 L850 146" stroke="#D6D3D1" stroke-width="2" fill="none"/><path d="M822 146 H854 L858 186 H818Z" fill="#4A8FE0" stroke="${L}"/><path d="M832 146 L838 158 L844 146" fill="#E11D2A"/></g>
  <path d="M866 140 L860 200" stroke="#F59E0B" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
  <g class="e21-wdL"><rect x="796" y="124" width="42" height="150" fill="#D97706" stroke="${L}"/><circle cx="832" cy="200" r="3" fill="#FDE68A"/></g>
  <g class="e21-wdR"><rect x="838" y="124" width="42" height="150" fill="#D97706" stroke="${L}"/><circle cx="844" cy="200" r="3" fill="#FDE68A"/></g>
  <!-- Bếp -->
  <rect x="930" y="60" width="140" height="40" rx="6" fill="#E5E7EB" stroke="${L}"/><path d="M960 100 L950 140 M1000 100 V146 M1040 100 L1050 140" stroke="#94A3B8" stroke-width="2"/>
  <g transform="translate(950 144)"><ellipse rx="12" ry="5" fill="#475569"/></g><g transform="translate(1050 140)"><circle r="9" fill="#F59E0B" stroke="${L}"/></g>
  <rect x="1150" y="70" width="90" height="80" rx="4" fill="#BAE6FD" stroke="${L}" stroke-width="1.4"/><path d="M1195 70 V150 M1150 110 H1240" stroke="#fff" stroke-width="3"/>
  <rect x="1146" y="148" width="98" height="8" fill="#A16207" stroke="${L}"/><path d="M1172 148 q-6 -14 0 -24 q6 10 0 24Z M1214 148 q-8 -12 -2 -22 q8 8 2 22Z" fill="#22C55E" stroke="${L}" stroke-width="0.8"/>
  <path d="M1218 236 V156 Q1218 148 1226 148 H1250 Q1258 148 1258 156 V236" fill="#FBBF24" stroke="${L}" stroke-width="1.2"/>
  <path d="M1326 236 V150 Q1326 142 1334 142 H1360 Q1368 142 1368 150 V236" fill="#FBBF24" stroke="${L}" stroke-width="1.2"/>
  <!-- Hành lang -->
  <path d="M1440 120 H1520" stroke="#A16207" stroke-width="5" stroke-linecap="round"/>${[1462, 1500].map((x) => `<path d="M${x} 120 v10" stroke="${L}" stroke-width="2.4"/>`).join('')}
  <g class="e21-hookbag" transform="translate(1462 150)">${BAG('#F59E0B')}</g>
  <g class="e21-hookbag2" transform="translate(1500 150)">${BAG('#EC4899')}</g>
  <rect x="1540" y="120" width="64" height="162" rx="4" fill="#FEF9C3" stroke="${L}" stroke-width="1.2"/>
  <rect x="1544" y="124" width="56" height="158" fill="#FEF08A"/>
  <g class="e21-door"><rect x="1544" y="124" width="56" height="158" fill="#B45309" stroke="${L}"/><rect x="1552" y="134" width="40" height="50" rx="4" fill="#92400E"/><rect x="1552" y="194" width="40" height="76" rx="4" fill="#92400E"/><circle cx="1590" cy="200" r="3.4" fill="#FDE68A" stroke="${L}"/></g>
  <ellipse cx="1520" cy="${FLOOR}" rx="36" ry="6" fill="#F87171" opacity="0.7"/>
  ${doorway(300)}${doorway(900)}${doorway(1420)}
  <rect x="1620" y="0" width="22" height="104" fill="#E9D5B5" stroke="${L}"/><rect x="1620" y="104" width="6" height="178" fill="#C08B5C" stroke="${L}" stroke-width="0.8"/>`;
}

/** Lớp trước nhân vật: quầy bếp, bàn ăn (che chân người ngồi), đồ ăn. */
function fg() {
  return `
  <rect x="916" y="226" width="170" height="56" fill="#16A34A" stroke="${L}" stroke-width="1.2"/>
  <rect x="910" y="220" width="182" height="10" rx="3" fill="#F5F5F4" stroke="${L}"/>${[960, 1040].map((x) => `<rect x="${x - 26}" y="236" width="52" height="38" rx="3" fill="#15803D" stroke="${L}" stroke-width="0.8"/><circle cx="${x + 18}" cy="255" r="2.4" fill="#FDE68A"/>`).join('')}
  <g transform="translate(1004 208)"><path d="M-20 -6 H20 V10 Q20 14 16 14 H-16 Q-20 14 -20 10Z" fill="#94A3B8" stroke="${L}"/><path d="M-26 -2 H-20 M20 -2 H26" stroke="${L}" stroke-width="3" stroke-linecap="round"/><ellipse cx="0" cy="-6" rx="20" ry="4" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>
  ${steam(1004, 196, 'e21-potsteam')}
  <rect x="1194" y="258" width="10" height="24" fill="#92400E" stroke="${L}"/><rect x="1366" y="258" width="10" height="24" fill="#92400E" stroke="${L}"/>
  <path d="M1182 238 H1388 V266 ${Array.from({ length: 10 }, (_, i) => `Q${1378 - i * 20.6} 276 ${1367.4 - i * 20.6} 266`).join(' ')} Z" fill="#FFF7ED" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${1202 + i * 20.6} 240 V266" stroke="#FCA5A5" stroke-width="3" opacity="0.7"/>`).join('')}
  <path d="M1182 248 H1388 M1182 258 H1388" stroke="#FCA5A5" stroke-width="3" opacity="0.7"/>
  <rect x="1176" y="232" width="218" height="8" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
  <g class="e21-food"><g transform="translate(1246 228)"><g class="e21-noodles">${BOWL}</g><path class="e21-empty" d="M-14 -4 H14 Q13 9 0 10 Q-13 9 -14 -4Z" fill="#fff" stroke="#3B82F6" stroke-width="1.4"/></g>
    ${steam(1246, 218, 'e21-bowlsteam')}
    <g class="e21-tglass" transform="translate(1276 226)"><rect x="-6" y="-12" width="12" height="20" rx="2" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1"/><g class="e21-tmilk"><rect x="-5" y="-7" width="10" height="14" rx="1.5" fill="#fff" stroke="#E2E8F0" stroke-width="0.6"/></g></g></g>`;
}

const CSS = `
.e21-cloud { animation: e21Cloud 9s ease-in-out infinite alternate; }
@keyframes e21Cloud { to { transform: translateX(26px); } }
.e21-sway { transform-origin: 0 -60px; animation: e21Sway 3.6s ease-in-out infinite alternate; }
@keyframes e21Sway { from { transform: rotate(-1.6deg); } to { transform: rotate(1.6deg); } }
.e21-flag { transform-origin: 90px 51px; animation: e21Sway 1.4s ease-in-out infinite alternate; }
.e21-balloon { transform-origin: 338px 176px; animation: e21Sway 2.4s ease-in-out infinite alternate; }
.e21-glow { transition: opacity .5s; }
.st-age .e21-glow { opacity: .8; animation: e21Pulse .8s ease-in-out infinite alternate; }
@keyframes e21Pulse { from { transform: scale(.9); } to { transform: scale(1.15); } }
.e21-sleeper, .e21-made { transition: opacity .4s; }
.e21-made { opacity: 0; } .st-sleep .e21-sleeper { opacity: 1; } .e21-sleeper { opacity: 0; } svg:not(.st-sleep) .e21-made { opacity: 1; }
.e21-ringlines { opacity: 0; }
.st-ring .e21-clock { animation: e21Shake .09s linear infinite alternate; }
.st-ring .e21-ringlines { opacity: 1; animation: e21Pulse .2s infinite alternate; }
@keyframes e21Shake { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
.e21-wsun { transform: translateY(46px); transition: transform 1.6s cubic-bezier(.3,0,.3,1); }
.st-sunUp .e21-wsun { transform: translateY(-22px); }
.e21-shL { transform-origin: 622px 135px; transition: transform .7s cubic-bezier(.4,0,.2,1); }
.e21-shR { transform-origin: 738px 135px; transition: transform .7s cubic-bezier(.4,0,.2,1); }
.st-open .e21-shL, .st-open .e21-shR { transform: scaleX(.14); }
.e21-beam { opacity: 0; transition: opacity 1s; }
.st-open .e21-beam { opacity: .4; }
.e21-smile1 { display: none; }
.st-sunSmile .e21-smile1 { display: inline; } .st-sunSmile .e21-smile0 { display: none; }
.e21-tapwater { opacity: 0; transition: opacity .3s; animation: e21Flow .3s linear infinite; }
.st-tap .e21-tapwater { opacity: 1; }
@keyframes e21Flow { to { stroke-dashoffset: -8; } }
.e21-wdL { transform-origin: 796px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.e21-wdR { transform-origin: 880px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); }
.st-ward .e21-wdL, .st-ward .e21-wdR { transform: scaleX(.12); }
.e21-hang { transition: opacity .3s; } .st-wardEmpty .e21-hang { opacity: 0; }
.e21-steam { animation: e21Steam 1.5s ease-out infinite; opacity: 0; }
@keyframes e21Steam { from { transform: translateY(6px); opacity: 0; } 30% { opacity: .9; } to { transform: translateY(-14px); opacity: 0; } }
.e21-potsteam, .e21-bowlsteam { opacity: 0; transition: opacity .4s; }
.st-cook .e21-potsteam { opacity: 1; }
.st-food .e21-bowlsteam { opacity: 1; } .st-eaten .e21-bowlsteam { opacity: 0; }
.e21-food { opacity: 0; transition: opacity .3s; } .st-food .e21-food { opacity: 1; }
.e21-empty { opacity: 0; } .st-eaten .e21-noodles { opacity: 0; } .st-eaten .e21-empty { opacity: 1; }
.e21-tglass { transition: opacity .2s; } .st-glassTaken .e21-tglass { opacity: 0; }
.e21-tmilk { transform-origin: 0 7px; } .st-milkDone .e21-tmilk { transform: scaleY(.06); }
.e21-hookbag, .e21-hookbag2 { transition: opacity .2s; } .st-bagTaken .e21-hookbag, .st-lanBag .e21-hookbag2 { opacity: 0; }
.e21-door { transform-origin: 1544px 200px; transition: transform .6s cubic-bezier(.4,0,.2,1); } .st-door .e21-door { transform: scaleX(.12); }
@media (prefers-reduced-motion: reduce) { .e21-cloud, .e21-sway, .e21-flag, .e21-balloon { animation-duration: 12s; } }
`;

// Ở chế độ nhảy câu (instant), các lệnh của sân khấu làm xong ngay, nên mỗi nhịp vừa là phim vừa là "trạng thái cuối".
const BEATS = [
  { key: ['eight years old'], icon: '🎈', label: 'eight', async play(st) {
    st.look(470);
    st.set('st-age');
    st.fx('zzz', 440, 200);
    st.fx('sparkle', 340, 104);
    await st.wait(2200);
    st.set('st-age', false);
  } },
  { key: ['gets up'], icon: '⏰', label: 'gets up', async play(st) {
    st.look(500);
    st.set('st-ring');
    st.sfx('alarm-clock');
    st.fx('zzz', 440, 200, { quiet: true });
    await st.wait(1100);
    st.set('st-ring', false);
    st.set('st-sleep', false);
    st.show('minh', true);
    st.pose('minh', 'stretch'); st.act('minh', 'stretch'); st.mood('minh', 'shut');
    st.set('st-sunUp');
    await st.wait(1300);
    st.act('minh', null); st.mood('minh', 'happy'); st.pose('minh', 'stand');
    await st.wait(300);
  } },
  { key: ['opens the window', 'says hello to the sun'], icon: '🪟', label: 'opens the window', async play(st) {
    await st.walk('minh', 664);
    st.pose('minh', 'reach');
    await st.wait(350);
    st.set('st-open'); st.sfx('window-open'); st.sfx('birds', { vol: 0.7 });
    await st.wait(800);
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.set('st-sunSmile');
    await st.say('minh', 'Hello, sun!', 1500);
    st.act('minh', null); st.pose('minh', 'stand'); st.set('st-sunSmile', false);
  } },
  { key: ['goes to the bathroom'], icon: '🚿', label: 'bathroom', async play(st) {
    await st.walk('minh', 190, { speed: 135 });
  } },
  { key: ['washes his face', 'brushes his teeth'], icon: '🪥', label: 'brushes his teeth', async play(st) {
    st.set('st-tap'); st.sfx('tap-water');
    st.pose('minh', 'wash'); st.act('minh', 'wash'); st.mood('minh', 'shut');
    st.fx('drops', 190, 186);
    await st.wait(800);
    st.fx('drops', 190, 186);
    await st.wait(800);
    st.act('minh', null); st.mood('minh', 'happy'); st.set('st-tap', false);
    st.hold('minh', 'toothbrush'); st.pose('minh', 'brush');
    await st.wait(350);
    st.act('minh', 'brush'); st.sfx('brush-teeth');
    st.fx('bubbles', 186, 192);
    await st.wait(900);
    st.fx('bubbles', 186, 192);
    await st.wait(900);
    st.act('minh', null); st.hold('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'joy');
    st.fx('sparkle', 190, 192);
    await st.wait(500);
    st.mood('minh', 'happy');
  } },
  { key: ['waits at the door'], icon: '🐶', label: 'waits at the door', async play(st) {
    await st.look(1520);
    st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    await st.wait(500);
    st.sfx('dog-bark', { vol: 0.7, rate: 1.08 });
    await st.wait(1500);
  } },
  { key: ['puts on his school uniform', 'combs his hair'], icon: '👕', label: 'school uniform', async play(st) {
    await st.look(st.a('minh').x, { dur: 700 });
    await st.walk('minh', 838, { speed: 140 });
    st.set('st-ward'); st.sfx('wardrobe-open');
    await st.wait(600);
    await st.dress('minh', 'en_minh');
    st.set('st-wardEmpty'); st.mood('minh', 'joy');
    await st.wait(500);
    st.set('st-ward', false); st.mood('minh', 'happy');
    st.hold('minh', 'comb'); st.pose('minh', 'comb');
    await st.wait(300);
    st.act('minh', 'comb'); st.sfx('comb-hair');
    await st.wait(1400);
    st.act('minh', null); st.hold('minh', null); st.pose('minh', 'stand');
    st.fx('sparkle', 838, 166);
  } },
  { key: ['makes breakfast'], icon: '🍳', label: 'makes breakfast', async play(st) {
    await st.look(1090);
    st.set('st-cook'); st.sfx('pot-stir');
    st.pose('mum', 'stir'); st.act('mum', 'stir');
    await st.wait(1500);
    st.act('mum', null); st.pose('mum', 'give');
    await st.fly(BOWL, [1004, 200], [1246, 228], { dur: 750 });
    st.set('st-food'); st.sfx('bowl-down');
    st.pose('mum', 'stand'); st.mood('mum', 'joy');
    await st.wait(400);
    st.mood('mum', 'happy');
  } },
  { key: ['eats a bowl of pho', 'drinks a glass of milk'], icon: '🍜', label: 'eats pho', async play(st) {
    await st.walk('minh', 1232, { speed: 135 });
    st.pose('minh', 'sit');
    await st.wait(450);
    st.hold('minh', 'chopsticks'); st.pose('minh', 'eat');
    await st.wait(300);
    st.act('minh', 'eat'); st.sfx('slurp');
    await st.wait(1800);
    st.act('minh', null); st.set('st-eaten');
    st.hold('minh', 'glass'); st.set('st-glassTaken'); st.pose('minh', 'drink');
    await st.wait(350);
    st.act('minh', 'drink'); st.sfx('gulp');
    await st.wait(2100);
    st.act('minh', null); st.hold('minh', null); st.set('st-glassTaken', false); st.set('st-milkDone');
    st.pose('minh', 'sit'); st.mood('minh', 'joy');
    await st.wait(400);
    st.mood('minh', 'happy');
  } },
  { key: ['reads a book'], icon: '📖', label: 'reads a book', async play(st) {
    await st.look(1300);
    st.act('lan', 'read'); st.mood('lan', 'joy');
    await st.wait(400);
    st.sfx('page-turn');
    await st.wait(1800);
    st.mood('lan', 'happy');
  } },
  { key: ['drives to the hospital'], icon: '🚗', label: 'drives', async play(st) {
    await st.look(1830);
    st.fx('sparkle', 1790, 250);
    await st.wait(500);
    st.sfx('car-go');
    await st.walk('car', 2640, { speed: 280, follow: false });
  } },
  { key: ['takes his school bag', 'says goodbye to Lucky'], icon: '🎒', label: 'goodbye', async play(st) {
    st.pose('minh', 'stand');
    await st.look(1300, { dur: 700 });
    await st.walk('minh', 1462, { speed: 125 });
    await st.fly(`<g transform="scale(1.2)">${BAG('#F59E0B')}</g>`, [1462, 150], [1452, 210], { size: 40, dur: 500 });
    st.set('st-bagTaken'); st.bag('minh', true); st.sfx('bag-on');
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.pose('minh', 'wave'); st.act('minh', 'wave');
    st.say('lucky', 'Woof!', 1300); st.sfx('dog-bark');
    await st.say('minh', 'Bye, Lucky!', 1600);
    st.act('minh', null); st.pose('minh', 'stand'); st.act('lucky', null);
  } },
  { key: ['walks to school with Lan'], icon: '🏫', label: 'walks to school', async play(st) {
    st.act('lan', null); st.chest('lan', null); st.pose('lan', 'stand'); st.set('st-lanBag'); st.bag('lan', true);
    st.dog('lucky', 'sit'); st.act('lucky', 'wag');
    await st.walk('lan', 1410, { follow: false, speed: 120 });
    st.set('st-door'); st.sfx('door-open');
    await Promise.all([
      st.walk('minh', 2262, { speed: 135, lead: -40 }),
      (async () => { await st.wait(350); await st.walk('lan', 2196, { follow: false, speed: 135 }); })(),
    ]);
  } },
  { key: ['likes his mornings'], icon: '❤️', label: 'likes his mornings', async play(st) {
    st.pose('minh', 'cheer'); st.act('minh', 'cheer'); st.mood('minh', 'joy');
    st.pose('lan', 'wave'); st.act('lan', 'wave'); st.mood('lan', 'joy');
    st.fx('hearts', 2262, 140);
    await st.wait(700);
    st.fx('hearts', 2200, 150);
    await st.wait(1600);
    st.act('minh', null); st.act('lan', null);
  } },
];

export default {
  id: 'en021', worldW: 2480, floor: FLOOR, viewTop: 40, camStart: 260, css: CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'minh', kind: 'kid', who: 'en_minh_pj', x: 600 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 1347, s: 1.08 },
    { id: 'mum', kind: 'adult', who: 'en_mum', x: 1004, s: 0.95 },
    { id: 'lucky', kind: 'dog', x: 1520, s: 0.95 },
    { id: 'car', kind: 'car', x: 1790, y: 314, svg: headOnly('en_dad', { s: 0.8 }) },
  ],
  init(st) {
    st.show('minh', false);
    st.set('st-sleep');
    st.pose('lan', 'read'); st.chest('lan', 'book');
    st.dog('lucky', 'sit');
  },
};
