/**
 * Bài 53 "Too Hot to Play" (too / enough): phố Hà Nội nắng gắt (lịch JULY, nhiệt kế lên 38°C) → nhà ống cắt ngang:
 * phòng khách (mẹ, đồng hồ, quạt trần) → sân trong (vòi nước, bể bơi phao bé xíu) → bếp (Lan, máy xay sinh tố, bàn có Lucky nằm dưới)
 * → cửa sau, ngõ → công viên (khung thành, bảng tỉ số). 6 giờ chiều cả thế giới ngả màu chiều.
 * too / enough hiện thành nhãn có thanh đo: "too small" (bể không đủ chỗ), "not enough milk" (sữa chỉ còn vài giọt), "cool enough".
 * Toạ độ cảnh: rộng 2800, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, tree, bush, sun, label, room, doorway, windowBox, fence, thought, BALL } from '../kit.js';

const FLOOR = 282;
const X = { street: 230, door: 540, mum: 800, tap: 940, pool: 1100, kitchen: 1300, fridge: 1340, blender: 1430, clock: 1490, table: 1610, back: 1720, goal: 2660 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Nhà phố Hà Nội phía sau (mặt đứng). */
const shop = (x, w, h, c, roof) => `<g transform="translate(${x} ${FLOOR})"><rect x="0" y="${-h}" width="${w}" height="${h}" fill="${c}" stroke="${L}" stroke-width="1.1"/>
  <rect x="-4" y="${-h - 8}" width="${w + 8}" height="9" fill="${roof}" stroke="${L}"/>
  ${[0, 1].map((i) => `<rect x="${12 + i * (w - 40)}" y="${-h + 18}" width="16" height="22" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="${w / 2 - 14}" y="-44" width="28" height="44" fill="#92400E" stroke="${L}"/></g>`;
/** Nhiệt kế to (gốc = bầu đỏ). */
const THERMO = `<rect x="-11" y="-118" width="22" height="126" rx="11" fill="#fff" stroke="${L}" stroke-width="1.3"/>
  ${[0, 1, 2, 3, 4].map((i) => `<path d="M6 ${-20 - i * 22} H11" stroke="${L}" stroke-width="1"/><text x="16" y="${-17 - i * 22}" ${NUN} font-size="9" fill="#475569">${10 + i * 10}</text>`).join('')}
  <rect x="-4" y="-108" width="8" height="108" rx="4" fill="#FEE2E2"/>
  <g class="e053-merc"><rect x="-4" y="-108" width="8" height="108" rx="4" fill="#EF4444"/></g>
  <circle cy="6" r="10" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>`;
/** Quạt giấy (cầm tay). */
const FAN = `<g transform="rotate(180) translate(0 2)"><path d="M0 0 V10" stroke="#92400E" stroke-width="2"/><path d="M0 10 L-13 26 Q0 32 13 26Z" fill="#F87171" stroke="${L}" stroke-width="0.8"/>
  <path d="M0 10 L-6 28 M0 10 L0 30 M0 10 L6 28" stroke="#FEE2E2" stroke-width="0.8"/></g>`;
/** Hộp sữa (nghiêng khi rót). */
const MILK = `<g transform="rotate(200) translate(0 4)"><rect x="-6" y="0" width="12" height="20" rx="1" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M-6 0 L0 -6 L6 0Z" fill="#E0F2FE" stroke="${L}" stroke-width="0.8"/>
  <rect x="-6" y="6" width="12" height="7" fill="#60A5FA"/><text x="0" y="12" text-anchor="middle" ${NUN} font-size="5" fill="#fff">MILK</text></g>`;
/** Chai nước của Tom. */
const BOTTLE = `<g transform="rotate(180) translate(0 -2)"><rect x="-5" y="0" width="10" height="22" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.9"/><rect x="-3" y="-4" width="6" height="5" rx="1" fill="#2563EB" stroke="${L}" stroke-width="0.6"/>
  <rect x="-5" y="9" width="10" height="5" fill="#38BDF8"/></g>`;
const MANGO = `<ellipse rx="8" ry="6" fill="#FBBF24" stroke="${L}" stroke-width="0.9" transform="rotate(-20)"/><path d="M5 -5 q3 -3 6 -2" stroke="#16A34A" stroke-width="2" fill="none"/>`;
/** Lucky nằm dài dưới bàn, thè lưỡi thở (gốc = mặt đất, mặt quay phải). */
const DOG_LIE = `<g class="e053-pant" style="transform-origin:0px -8px">
  <path d="M-30 -2 Q-34 -20 -12 -20 L14 -18 Q22 -16 22 -4 L22 0 H-30Z" fill="#B7794A" stroke="${L}" stroke-width="1"/>
  <path d="M-30 -8 Q-44 -6 -46 2" stroke="${L}" stroke-width="6.4" fill="none" stroke-linecap="round"/><path d="M-30 -8 Q-44 -6 -46 2" stroke="#B7794A" stroke-width="4.8" fill="none" stroke-linecap="round"/>
  <ellipse cx="-16" cy="-14" rx="8" ry="5" fill="#7A4B2A" opacity="0.5"/>
  <ellipse cx="12" cy="-1" rx="12" ry="3" fill="#F5E6D3" stroke="${L}" stroke-width="0.8"/><ellipse cx="-24" cy="-1" rx="8" ry="3" fill="#F5E6D3" stroke="${L}" stroke-width="0.8"/></g>
  <g transform="translate(30 -12)"><path d="M-8 -6 Q-16 0 -12 12 Q-6 12 -4 0Z" fill="#7A4B2A" stroke="${L}" stroke-width="0.9"/>
    <circle r="11" fill="#B7794A" stroke="${L}" stroke-width="1"/><ellipse cx="9" cy="5" rx="8" ry="6" fill="#F5E6D3" stroke="${L}" stroke-width="0.9"/><ellipse cx="16" cy="2" rx="3" ry="2.3" fill="#2B1D16"/>
    <path d="M1 -4 q2.4 -2 4.8 0" stroke="${L}" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    <g class="e053-tongue" style="transform-origin:12px 10px"><path d="M9 9 q3 9 6 0Z" fill="#F472B6" stroke="${L}" stroke-width="0.7"/></g>
    <rect x="-13" y="2" width="5" height="12" rx="2" fill="#EF4444" stroke="${L}" stroke-width="0.7"/></g>`;
const BALL_T = `<g class="e053-roll" style="transform-origin:0px -8px"><g transform="translate(0 -8)"><circle r="8" fill="#fff" stroke="${L}"/>
  <path d="M0 -3.2 l3 2.2 -1.2 3.6 h-3.6 l-1.2 -3.6Z" fill="#1F2937"/><path d="M0 -3.2 V-8 M3 -1 L7.6 -2.3 M1.8 2.6 L4.6 6.4 M-1.8 2.6 L-4.6 6.4 M-3 -1 L-7.6 -2.3" stroke="#1F2937" stroke-width="0.8"/></g></g>`;
/** Đồng hồ treo tường: kim giờ quay theo class (gốc = tâm). */
const clockFace = (cls) => `<circle r="20" fill="#fff" stroke="${L}" stroke-width="2"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -17 V-14" stroke="${L}" stroke-width="${i % 3 ? 1 : 2}" transform="rotate(${i * 30})"/>`).join('')}
  <g class="${cls}-h"><path d="M0 2 V-10" stroke="${L}" stroke-width="3" stroke-linecap="round"/></g><path d="M0 2 V-15" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round"/><circle r="2" fill="${L}"/>`;

const POSES = {
  e053_fan: { R: [96, 150], L: [10, 4], head: -4 },
  e053_hot: { R: [96, 150], L: [150, 220], head: 4 },
  e053_ask: { R: [24, -86], L: [55, 40], head: -5 },
  e053_pour: { R: [96, 120], L: [30, -60], head: 8 },
  e053_drink: { R: [124, 250], L: [70, -40], head: -10 },
  e053_kick: { R: [-20, -30], L: [40, 60] },
  e053_tired: { R: [40, -60], L: [40, -60], head: 10 },
  e053_tap: { R: [100, 112], L: [10, 4], head: -4 },
};
const PROPS = { e053_fan: FAN, e053_milk: MILK, e053_bottle: BOTTLE };

function bg() {
  const tiles = Array.from({ length: 12 }, (_, i) => `<rect x="${904 + i * 32}" y="${FLOOR}" width="32" height="33" fill="${i % 2 ? '#FCA5A5' : '#FECACA'}" stroke="${L}" stroke-width="0.6"/>`).join('');
  return `
  ${sky(0, 2800, 315, 'e053sky')}
  <rect class="e053-hazy" x="0" y="0" width="2800" height="315" fill="#FDBA74"/>
  <g transform="translate(130 74)"><g class="e053-sunp"><g class="e053-glow"><circle r="44" fill="#FDE047" opacity="0.35"/></g>${sun(28)}</g></g>
  ${cloud(420, 46, 0.7, 0)}${cloud(1080, 40, 0.8, 2)}${cloud(2100, 56, 1, 1)}${cloud(2500, 44, 0.8, 4)}
  <!-- Phố Hà Nội -->
  ${shop(-10, 110, 150, '#FDE68A', '#EF4444')}${shop(110, 96, 176, '#BFDBFE', '#2563EB')}${shop(216, 120, 138, '#FBCFE8', '#DB2777')}${shop(346, 100, 164, '#BBF7D0', '#16A34A')}
  <rect x="0" y="${FLOOR - 6}" width="${X.door - 30}" height="18" fill="#E5E7EB" stroke="${L}"/>
  <rect x="0" y="${FLOOR + 12}" width="${X.door - 30}" height="30" fill="#64748B"/>
  <g transform="translate(266 130)"><rect x="-38" y="-30" width="76" height="52" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-38" y="-30" width="76" height="15" rx="5" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-20" cy="-30" r="3" fill="#1F2937"/><circle cx="20" cy="-30" r="3" fill="#1F2937"/>
    <text x="0" y="8" text-anchor="middle" ${NUN} font-size="17" fill="#DC2626">JULY</text></g>
  <g transform="translate(70 120)"><rect x="-34" y="-16" width="68" height="22" rx="4" fill="#1D4ED8" stroke="${L}"/><text x="0" y="0" text-anchor="middle" ${NUN} font-size="13" fill="#fff">HANOI</text></g>
  <g class="e053-heat">${[100, 215, 336, 446].map((x, i) => `<path class="e053-wave" style="animation-delay:${i * 0.3}s" d="M${x} ${FLOOR - 8} q-6 -10 0 -20 q6 -10 0 -20" stroke="#F97316" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.7"/>`).join('')}</g>
  <g transform="translate(470 238)">${THERMO}</g>
  <g class="e053-lb e053-lb-38">${label(430, 108, '38°C', '#DC2626', 20)}</g>
  <g class="e053-lb e053-lb-hot">${label(330, 82, 'very hot', '#EA580C', 16)}</g>
  <!-- Nhà ống cắt ngang: phòng khách -->
  <rect x="${X.door - 30}" y="20" width="12" height="${FLOOR - 20}" fill="#C08B5C" stroke="${L}"/>
  ${room(X.door - 18, 918 - X.door, FLOOR, '#FEF3C7')}
  ${windowBox(590, 84, 86, 76)}
  <g transform="translate(720 34)"><path d="M0 -14 V0" stroke="${L}" stroke-width="2"/><g class="e053-cfan"><ellipse cx="-24" rx="24" ry="4" fill="#E5E7EB" stroke="${L}" stroke-width="0.8"/><ellipse cx="24" rx="24" ry="4" fill="#E5E7EB" stroke="${L}" stroke-width="0.8"/></g><circle r="5" fill="#94A3B8" stroke="${L}"/></g>
  <g transform="translate(860 110)">${clockFace('e053-c1')}</g>
  <g class="e053-lb e053-lb-toohot">${label(720, 74, 'too hot', '#DC2626', 18)}</g>
  <g transform="translate(660 0)"><rect x="-54" y="226" width="108" height="34" rx="9" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/><rect x="-48" y="250" width="96" height="14" rx="5" fill="#93C5FD" stroke="${L}"/>
    <path d="M-44 264 V${FLOOR} M44 264 V${FLOOR}" stroke="${L}" stroke-width="3"/></g>
  <!-- Sân trong (trời thoáng) -->
  <rect x="918" y="0" width="12" height="${FLOOR}" fill="#C08B5C" stroke="${L}"/>
  <rect x="930" y="0" width="${X.kitchen - 948}" height="40" fill="#FEF3C7" opacity="0"/>
  ${tiles}
  <rect x="930" y="150" width="${X.kitchen - 948}" height="${FLOOR - 150}" fill="#FDE7C7" stroke="${L}" stroke-width="0.8"/>
  ${[0, 1, 2, 3].map((i) => `<path d="M930 ${170 + i * 28} H${X.kitchen - 18}" stroke="#E9C9A0" stroke-width="1"/>`).join('')}
  <g transform="translate(${X.tap} 196)"><rect x="-4" y="-6" width="22" height="7" rx="2" fill="#94A3B8" stroke="${L}"/><rect x="12" y="-2" width="7" height="12" rx="2" fill="#94A3B8" stroke="${L}"/>
    <g class="e053-knob" style="transform-origin:4px -10px"><rect x="-2" y="-14" width="12" height="5" rx="2" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g></g>
  <path class="e053-hose" d="M${X.tap + 15} 206 Q${X.tap + 30} 270 ${X.tap + 70} ${FLOOR + 2} T${X.pool - 30} ${FLOOR - 26}" stroke="#22C55E" stroke-width="4" fill="none" stroke-linecap="round"/>
  ${[1000].map((x, i) => `<g transform="translate(${x} ${FLOOR})"><path d="M-14 0 L-18 -26 H18 L14 0Z" fill="#C2410C" stroke="${L}"/>${bush(0, -24, 0.8, i ? '#4ADE80' : '#22C55E')}</g>`).join('')}
  <!-- bể bơi phao (mặt sau + nước) -->
  <g transform="translate(${X.pool} ${FLOOR})"><ellipse cx="0" cy="-20" rx="56" ry="14" fill="#7DD3FC" stroke="${L}" stroke-width="1.1"/>
    <g class="e053-fill" style="transform-origin:0px -14px"><ellipse cx="0" cy="-20" rx="48" ry="10" fill="#38BDF8"/><path d="M-30 -22 q6 -3 12 0 M8 -18 q6 -3 12 0" stroke="#E0F2FE" stroke-width="1.6" fill="none"/></g></g>
  <g class="e053-lb e053-lb-small">${label(X.pool, 104, 'too small', '#DC2626', 16)}</g>
  <!-- Bếp -->
  <rect x="${X.kitchen - 18}" y="20" width="12" height="${FLOOR - 20}" fill="#C08B5C" stroke="${L}"/>
  ${room(X.kitchen - 6, X.back - X.kitchen + 6, FLOOR, '#DCFCE7', '#C08B5C')}
  <g transform="translate(${X.fridge} 0)"><rect x="-26" y="120" width="52" height="${FLOOR - 120}" rx="5" fill="#F1F5F9" stroke="${L}" stroke-width="1.2"/><path d="M-26 172 H26" stroke="${L}"/>
    <rect x="16" y="134" width="4" height="24" rx="2" fill="#94A3B8"/><rect x="16" y="182" width="4" height="30" rx="2" fill="#94A3B8"/></g>
  <rect x="1380" y="210" width="110" height="${FLOOR - 210}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><rect x="1374" y="204" width="122" height="8" rx="2" fill="#E5E7EB" stroke="${L}"/>
  <g transform="translate(${X.blender} 204)"><rect x="-12" y="-8" width="24" height="8" rx="2" fill="#475569" stroke="${L}"/>
    <path d="M-10 -8 L-12 -46 H12 L10 -8Z" fill="#E0F2FE" stroke="${L}" stroke-width="1" opacity="0.9"/>
    <g class="e053-mango"><path d="M-9 -9 L-10 -20 H10 L9 -9Z" fill="#FBBF24"/></g>
    <g class="e053-milkin"><path d="M-10 -20 L-10.6 -24 H10.6 L10 -20Z" fill="#FEF9C3"/></g>
    <rect x="-13" y="-50" width="26" height="5" rx="2" fill="#475569" stroke="${L}"/></g>
  <g transform="translate(1466 196)">${MANGO}</g>
  <g class="e053-lb e053-lb-milk">${label(1400, 112, 'not enough milk', '#DC2626', 14)}</g>
  <g transform="translate(${X.clock} 96)">${clockFace('e053-c2')}</g>
  <g class="e053-lb e053-lb-six">${label(X.clock, 60, "6 o'clock", '#7C3AED', 14)}</g>
  <!-- bàn bếp (Lucky nằm dưới) -->
  <g transform="translate(${X.table} 0)"><rect x="-58" y="214" width="116" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <rect x="-52" y="223" width="8" height="${FLOOR - 223}" fill="#92400E" stroke="${L}"/><rect x="44" y="223" width="8" height="${FLOOR - 223}" fill="#92400E" stroke="${L}"/>
    <g transform="translate(-20 214)"><path d="M-8 0 L-6 -12 H6 L8 0Z" fill="#fff" stroke="#3B82F6" stroke-width="1"/></g></g>
  <g class="e053-lb e053-lb-tired">${label(X.table, 150, 'too tired', '#B45309', 15)}</g>
  <!-- Cửa sau, ngõ, công viên -->
  <rect x="${X.back}" y="110" width="12" height="${FLOOR - 110}" fill="#C08B5C" stroke="${L}"/>
  <path d="M${X.back + 12} 230 Q2000 200 2200 226 T2560 220 T2800 226 V${FLOOR} H${X.back + 12}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(1820, 238, 0.85)}${tree(2120, 232, 1, '#F59E0B')}${tree(2760, 232, 0.9)}
  <rect x="${X.back + 12}" y="${FLOOR - 4}" width="${2800 - X.back}" height="40" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 22 }, (_, i) => `<path d="M${X.back + 40 + i * 48} ${FLOOR + 12} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  ${fence(1760, 130, FLOOR)}
  <g transform="translate(2556 0)"><rect x="-4" y="150" width="8" height="${FLOOR - 150}" fill="#78716C" stroke="${L}"/><rect x="-48" y="112" width="96" height="44" rx="6" fill="#1E293B" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="128" text-anchor="middle" ${NUN} font-size="10" fill="#FDE68A">GOALS</text>
    <text x="-22" y="150" text-anchor="middle" ${NUN} font-size="11" fill="#93C5FD">MINH</text>
    <g class="e053-g0"><text x="22" y="151" text-anchor="middle" ${NUN} font-size="17" fill="#fff">0</text></g>
    <g class="e053-g1"><text x="22" y="151" text-anchor="middle" ${NUN} font-size="17" fill="#FDE047">1</text></g>
    <g class="e053-g2"><text x="22" y="151" text-anchor="middle" ${NUN} font-size="17" fill="#FDE047">2</text></g></g>
  <g class="e053-lb e053-lb-fast">${label(2430, 92, 'fast enough', '#15803D', 15)}</g>
  <g class="e053-lb e053-lb-slow">${label(2330, 120, 'too slow', '#DC2626', 15)}</g>
  <g class="e053-lb e053-lb-water">${label(2350, 78, 'enough water', '#0369A1', 15)}</g>`;
}

function fg() {
  return `
  <!-- Mặt trước bể bơi (che chân người ngồi trong bể) -->
  <g transform="translate(${X.pool} ${FLOOR})"><path d="M-56 -20 Q-58 2 0 4 Q58 2 56 -20 Q50 -8 0 -6 Q-50 -8 -56 -20Z" fill="#F472B6" stroke="${L}" stroke-width="1.1"/>
    ${[-36, -12, 12, 36].map((x) => `<circle cx="${x}" cy="-4" r="3" fill="#FDE047" stroke="${L}" stroke-width="0.5"/>`).join('')}</g>
  <!-- Khung thành -->
  <g transform="translate(${X.goal} 0)"><path d="M-30 ${FLOOR} V208 L0 214 V${FLOOR}" stroke="#fff" stroke-width="4" fill="none" stroke-linejoin="round"/><path d="M-30 ${FLOOR} V208 L0 214 V${FLOOR}" stroke="${L}" stroke-width="0.8" fill="none"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M-30 ${222 + i * 12} L0 ${226 + i * 11}" stroke="#E2E8F0" stroke-width="1"/>`).join('')}</g>
  <!-- Lớp chiều: cả thế giới ngả cam -->
  <rect class="e053-eve" x="0" y="0" width="2800" height="315" fill="#F97316"/>
  <g class="e053-lb e053-lb-cool">${label(1236, 76, 'cool enough', '#0369A1', 16)}</g>`;
}

const CSS = `
.e053-lb { opacity: 0; transition: opacity .35s; }
.st-lb-small .e053-lb-small, .st-lb-milk .e053-lb-milk, .st-lb-six .e053-lb-six, .st-lb-tired .e053-lb-tired, .st-lb-fast .e053-lb-fast,
.st-lb-slow .e053-lb-slow, .st-lb-water .e053-lb-water, .st-lb-38 .e053-lb-38, .st-lb-hot .e053-lb-hot, .st-lb-cool .e053-lb-cool, .st-lb-toohot .e053-lb-toohot { opacity: 1; }
/* nắng nóng */
.e053-hazy { opacity: .28; transition: opacity 1s; }
.st-eve .e053-hazy { opacity: 0; }
.e053-glow { animation: e053Glow 1.2s ease-in-out infinite alternate; }
@keyframes e053Glow { from { transform: scale(.9); } to { transform: scale(1.25); } }
.e053-sunp { transition: transform 1.6s cubic-bezier(.4,0,.3,1); }
.st-eve .e053-sunp { transform: translateY(120px); }
.e053-wave { animation: e053Wave 1.4s ease-in-out infinite; opacity: 0; }
@keyframes e053Wave { 0% { transform: translateY(6px); opacity: 0; } 40% { opacity: .8; } 100% { transform: translateY(-16px); opacity: 0; } }
.st-eve .e053-heat { opacity: 0; transition: opacity .8s; }

.e053-merc { transform: scaleY(.45); transform-box: fill-box; transform-origin: 50% 100%; transition: transform 1.8s cubic-bezier(.3,0,.3,1); }
.st-38 .e053-merc { transform: scaleY(.755); }
.e053-cfan { animation: e053Spin .5s linear infinite; }
@keyframes e053Spin { from { transform: scaleX(1); } 50% { transform: scaleX(-1); } to { transform: scaleX(1); } }
/* đồng hồ: 3 giờ chiều → 6 giờ */
.e053-c1-h, .e053-c2-h { transform: rotate(90deg); transition: transform 1.8s cubic-bezier(.4,0,.3,1); }
.st-six .e053-c1-h, .st-six .e053-c2-h, .e053-c3-h { transform: rotate(180deg); }
.e053-eve { opacity: 0; transition: opacity 1.6s; pointer-events: none; }
.st-eve .e053-eve { opacity: .2; }
/* bể bơi */
.e053-knob { transition: transform .4s; } .st-tap .e053-knob { transform: rotate(-60deg); }
.e053-fill { transform: scale(.2, .1); transition: transform 2s ease-out; } .st-fill .e053-fill { transform: scale(1); }
.e053-hose { stroke-dasharray: 260; stroke-dashoffset: 0; }
/* sinh tố */
.e053-mango { transform: scaleY(0); transform-box: fill-box; transform-origin: 50% 100%; transition: transform .5s; } .st-mango .e053-mango { transform: scaleY(1); }
.e053-milkin { opacity: 0; transition: opacity .5s 1s; } .st-drip .e053-milkin { opacity: 1; }
/* tỉ số */
.e053-g1, .e053-g2 { opacity: 0; transition: opacity .2s; }
.st-g1 .e053-g0, .st-g2 .e053-g0, .st-g2 .e053-g1 { opacity: 0; }
.st-g1 .e053-g1, .st-g2 .e053-g2 { opacity: 1; }
/* Lucky thở, lưỡi thè */
.e053-pant { animation: e053Pant .5s ease-in-out infinite alternate; }
@keyframes e053Pant { to { transform: scale(1.03, 1.07); } }
.e053-tongue { animation: e053Tongue .25s ease-in-out infinite alternate; }
@keyframes e053Tongue { to { transform: scaleY(1.35); } }
.es-thing.is-walk .e053-roll { animation: e053Roll .35s linear infinite; }
@keyframes e053Roll { to { transform: rotate(360deg); } }
/* quạt tay */
.es-ac.act-e053-fan .pp-fowR { animation: e053Fan .18s ease-in-out infinite alternate; }
@keyframes e053Fan { from { transform: rotate(-20deg); } to { transform: rotate(16deg); } }
.es-ac.act-e053-kick .pp-legwR { animation: e053Kick .42s ease-in-out infinite alternate; }
@keyframes e053Kick { from { transform: rotate(0); } to { transform: rotate(-52deg); } }
@media (prefers-reduced-motion: reduce) {
  .e053-glow, .e053-pant { animation-duration: 3s; }
  .e053-wave { animation-duration: 3s; }
  .e053-cfan { animation-duration: 1.6s; }
  .es-ac.act-e053-fan .pp-fowR { animation-duration: .5s; }
  .e053-tongue { animation-duration: .8s; }
}
`;

/** Giọt mồ hôi rơi trên đầu người id. */
function sweat(st, id) { const A = st.a(id); st.fx('drops', A.x + 8, A.y - 128 * A.s, { n: 0.5 }); st.sfx('drip', { vol: 0.4 }); }
async function kick(st, who, to, speed) {
  st.pose(who, 'e053_kick'); st.act(who, 'e053-kick');
  await st.wait(260);
  st.sfx('kick', { vol: 0.8 });
  st.act(who, null);
  await st.walk('ball', to, { speed, follow: false });
  st.pose(who, 'stand');
}

const BEATS = [
  { key: ['July', 'very hot'], icon: '☀️', label: 'very hot', async play(st) {
    st.look(260);
    st.hold('minh', 'e053_fan'); st.pose('minh', 'e053_fan'); st.act('minh', 'e053-fan');
    st.pose('tom', 'e053_hot'); st.mood('tom', 'sad'); st.mood('minh', 'sad');
    st.sfx('wind', { vol: 0.4, rate: 1.2 });
    st.set('st-lb-hot'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
    sweat(st, 'tom'); sweat(st, 'minh');
    await st.wait(900);
    sweat(st, 'tom');
    await st.wait(600);
  } },
  { key: ['thirty-eight degrees'], icon: '🌡️', label: '38 degrees', async play(st) {
    st.set('st-lb-hot', false);
    st.look(360);
    st.set('st-38'); st.sfx('tick', { vol: 0.6 });
    st.act('minh', null); st.pose('minh', 'point'); st.mood('minh', 'wow'); st.face('tom', 1);
    await st.wait(1500);
    st.set('st-lb-38'); st.sfx('pop', { vol: 0.6 }); st.mood('tom', 'wow');
    await st.wait(900);
  } },
  { key: ['play football in the park'], icon: '⚽', label: 'play football?', async play(st) {
    st.set('st-lb-38', false);
    st.hold('minh', 'ball'); st.pose('minh', 'carry'); st.mood('minh', 'happy'); st.mood('tom', 'happy'); st.pose('tom', 'stand');
    st.sfx('door-open', { vol: 0.5 });
    await Promise.all([st.walk('minh', 740, { speed: 150, lead: 20 }), st.walk('tom', 680, { speed: 150, follow: false })]);
    st.pose('minh', 'e053_ask'); st.mood('minh', 'joy');
    await st.say('minh', 'Football in the park?', 1500);
  } },
  { key: ['Minh asks'], icon: '🙋', label: 'Minh asks', async play(st) {
    st.look(760);
    st.face('mum', -1); st.mood('mum', 'happy');
    st.pose('minh', 'raise'); st.act('minh', 'hop'); st.pose('tom', 'clap'); st.act('tom', 'clap'); st.sfx('clap', { vol: 0.5 });
    await st.say('minh', 'Please, Mum?', 1600);
    st.act('minh', null); st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['too hot to play outside'], icon: '🚫', label: 'too hot to play', async play(st) {
    st.hold('minh', null); st.chest('minh', `<g transform="translate(0 -6)">${BALL('#fff')}</g>`); st.pose('minh', 'carry');
    st.pose('mum', 'stand'); st.act('mum', 'no'); st.sfx('buzz-no', { vol: 0.6 });
    await st.wait(300);
    st.mood('minh', 'sad'); st.mood('tom', 'sad');
    st.pose('mum', 'point'); st.face('mum', -1);
    st.look(650, { dur: 800 }); st.set('st-lb-toohot'); st.sfx('pop', { vol: 0.5 });
    await st.say('mum', "It's too hot!", 1600);
    st.act('mum', null);
  } },
  { key: ['Wait until the evening'], icon: '🕕', label: 'wait until evening', async play(st) {
    st.set('st-lb-toohot', false);
    st.look(780);
    st.face('mum', 1); st.pose('mum', 'pointUp');
    st.show('think', true); st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    st.sfx('tick', { vol: 0.6 });
    await st.wait(1400);
    st.mood('minh', 'happy'); st.mood('tom', 'happy'); st.act('minh', 'nod');
    await st.wait(500);
    st.act('minh', null);
  } },
  { key: ['fills the paddling pool', 'too small'], icon: '🛁', label: 'too small', async play(st) {
    st.show('think', false); st.pose('mum', 'stand');
    st.chest('minh', null); st.pose('minh', 'stand');
    await Promise.all([st.walk('minh', X.tap - 34, { speed: 170, lead: 110 }), st.walk('tom', X.pool + 70, { speed: 170, follow: false })]);
    st.face('minh', 1); st.pose('minh', 'e053_tap'); st.set('st-tap'); st.sfx('tap-water', { vol: 0.6 });
    st.set('st-fill');
    st.fx('drops', X.pool - 30, FLOOR - 40);
    await st.wait(900);
    st.fx('drops', X.pool - 20, FLOOR - 40);
    await st.wait(500);
    st.set('st-tap', false);
    await st.walk('minh', X.pool - 16, { speed: 150, follow: false });
    st.pose('minh', 'sit'); st.mood('minh', 'joy'); st.sfx('splash', { vol: 0.4, rate: 1.2 });
    await st.wait(350);
    await st.walk('tom', X.pool + 20, { speed: 110, follow: false });
    st.face('tom', -1); st.pose('tom', 'sit'); st.fx('drops', X.pool + 50, FLOOR - 30); st.fx('drops', X.pool - 50, FLOOR - 30); st.sfx('splash', { vol: 0.8 });
    st.mood('minh', 'wow'); st.mood('tom', 'wow'); st.set('st-lb-small'); st.sfx('pop', { vol: 0.5 });
    await st.wait(700);
    st.pose('tom', 'stand');
    await st.walk('tom', X.pool + 72, { speed: 120, follow: false });
    st.face('tom', -1); st.pose('tom', 'shrug'); st.mood('tom', 'sad');
    await st.wait(500);
  } },
  { key: ['mango smoothie', "isn't enough milk"], icon: '🥭', label: 'not enough milk', async play(st) {
    st.set('st-lb-small', false); st.pose('tom', 'stand'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
    await st.look(1440, { dur: 900 });
    st.pose('lan', 'reach');
    await st.fly(MANGO, [1466, 190], [X.blender, 176], { size: 18, dur: 600 });
    st.set('st-mango'); st.sfx('pop', { vol: 0.5, rate: 0.8 }); st.mood('lan', 'joy');
    st.hold('lan', 'e053_milk'); st.pose('lan', 'e053_pour');
    await st.wait(300);
    st.sfx('pour', { vol: 0.5 });
    await st.wait(300);
    st.fx('drops', X.blender, 150, { n: 0.3 });
    st.set('st-drip'); st.sfx('drip', { vol: 0.6 });
    await st.wait(700);
    st.set('st-lb-milk'); st.sfx('buzz-no', { vol: 0.5 }); st.mood('lan', 'sad'); st.pose('lan', 'shrug');
    await st.wait(900);
  } },
  { key: ['under the table'], icon: '🐶', label: 'under the table', async play(st) {
    st.set('st-lb-milk', false); st.hold('lan', null); st.pose('lan', 'stand');
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy');
    st.look(1440);
    await st.loop('steps', () => st.walk('lucky', X.table - 6, { speed: 130, follow: true, lead: -40 }), { vol: 0.4 });
    st.show('lucky', false); st.show('lucky2', true);
    st.fx('poof', X.table, FLOOR - 10, { quiet: true }); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(400);
    st.sfx('snore', { vol: 0.3 });
    await st.wait(500);
  } },
  { key: ['too tired to move'], icon: '😴', label: 'too tired', async play(st) {
    st.look(1540);
    await st.walk('lan', X.table - 70, { speed: 100, follow: false });
    st.pose('lan', 'wave'); st.act('lan', 'wave'); st.mood('lan', 'joy');
    await st.say('lan', 'Come, Lucky!', 1200);
    st.act('lan', null); st.set('st-lb-tired'); st.sfx('pop', { vol: 0.5 });
    st.fx('zzz', X.table + 40, FLOOR - 36);
    st.pose('lan', 'shrug'); st.mood('lan', 'happy');
    await st.wait(1300);
  } },
  { key: ["At six o'clock", 'cool enough'], icon: '🌇', label: 'cool enough', async play(st) {
    st.set('st-lb-tired', false); st.pose('lan', 'stand');
    st.look(1350);
    st.set('st-six'); st.set('st-lb-six'); st.sfx('tick', { vol: 0.6 });
    await st.wait(1200);
    st.set('st-eve'); st.sfx('birds', { vol: 0.5 });
    st.pose('minh', 'stand'); st.pose('tom', 'stand');
    st.place('minh', X.pool - 70); st.place('tom', X.pool + 72);
    await Promise.all([st.walk('minh', 1268, { speed: 160, follow: false }), st.walk('tom', 1212, { speed: 160, follow: false })]);
    st.set('st-lb-cool'); st.sfx('cheer', { vol: 0.5 });
    st.hold('minh', 'ball'); st.pose('minh', 'cheer'); st.act('minh', 'cheer'); st.pose('tom', 'cheer'); st.act('tom', 'cheer');
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(1000);
    st.act('minh', null); st.act('tom', null);
  } },
  { key: ['run to the park'], icon: '🏃', label: 'run to the park', async play(st) {
    st.set('st-lb-six', false); st.set('st-lb-cool', false);
    st.pose('minh', 'carry');
    st.pose('lan', 'wave'); st.act('lan', 'wave'); st.sfx('whoosh', { vol: 0.5 });
    await Promise.all([
      st.walk('minh', 2420, { speed: 250, lead: 60 }),
      st.walk('tom', 2290, { speed: 240, follow: false }),
    ]);
    st.act('lan', null);
    st.hold('minh', null); st.place('ball', 2446); st.show('ball', true); st.sfx('bowl-down', { vol: 0.4, rate: 1.3 });
  } },
  { key: ['fast enough', 'two goals'], icon: '🥅', label: 'two goals', async play(st) {
    st.look(2500);
    await kick(st, 'minh', X.goal - 14, 320);
    st.set('st-g1'); st.sfx('whistle', { vol: 0.5 }); st.fx('sparkle', X.goal - 14, 240, { quiet: true });
    st.mood('minh', 'joy');
    await st.walk('ball', 2446, { speed: 300, follow: false });
    st.set('st-lb-fast'); st.sfx('pop', { vol: 0.5 });
    await kick(st, 'minh', X.goal - 14, 360);
    st.set('st-g2'); st.fx('sparkle', X.goal - 14, 240, { quiet: true }); st.sfx('cheer', { vol: 0.7 });
    st.pose('minh', 'cheer'); st.act('minh', 'jump');
    await st.wait(900);
    st.act('minh', null);
  } },
  { key: ['too slow today', 'he laughs'], icon: '🐢', label: 'too slow', async play(st) {
    st.set('st-lb-fast', false); st.pose('minh', 'stand');
    st.look(2420);
    st.set('st-lb-slow'); st.sfx('pop', { vol: 0.5 });
    await st.walk('tom', 2350, { speed: 40, follow: false });
    sweat(st, 'tom');
    st.pose('tom', 'e053_tired'); st.mood('tom', 'sad');
    await st.wait(600);
    st.mood('tom', 'joy'); st.pose('tom', 'clap'); st.act('tom', 'hop'); st.talk('tom', true); st.sfx('giggle', { vol: 0.7 });
    st.face('minh', -1); st.mood('minh', 'joy');
    await st.wait(1200);
    st.act('tom', null); st.talk('tom', false);
  } },
  { key: ['drink enough water'], icon: '💧', label: 'enough water', async play(st) {
    st.set('st-lb-slow', false);
    st.hold('tom', 'e053_bottle'); st.pose('tom', 'e053_drink'); st.mood('tom', 'shut');
    st.sfx('gulp', { vol: 0.6 });
    await st.wait(900);
    st.set('st-lb-water'); st.sfx('pop', { vol: 0.5 });
    st.pose('tom', 'e053_ask'); st.mood('tom', 'joy');
    await st.say('tom', 'Next time!', 1600);
  } },
];

export default {
  id: 'en053', worldW: 2800, floor: FLOOR, viewTop: 40, camStart: 20, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'think', kind: 'thing', x: 840, y: 150, svg: thought(0, -40, 110, 70, `<g transform="translate(-24 4)">${clockFace('e053-c3')}</g>
      <g transform="translate(26 6)"><circle r="14" fill="#FB923C" stroke="${L}"/><path d="M-22 6 H22" stroke="${L}" stroke-width="2"/><rect x="-22" y="6" width="44" height="12" fill="#fff"/></g>
      <text x="0" y="-22" text-anchor="middle" ${NUN} font-size="12" fill="#7C3AED">evening</text>`, [-40, 10]), box: [-70, -90, 140, 110] },
    { id: 'lucky2', kind: 'thing', x: X.table - 6, svg: DOG_LIE, box: [-48, -26, 92, 28] },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1470, s: 1.08, face: -1 },
    { id: 'lucky', kind: 'dog', x: 1244, s: 0.85, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 330, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.street },
    { id: 'ball', kind: 'thing', x: 2446, svg: BALL_T, box: [-9, -17, 18, 18] },
  ],
  init(st) {
    st.show('think', false); st.show('lucky2', false); st.show('ball', false);
    st.dog('lucky', 'sit');
  },
};
