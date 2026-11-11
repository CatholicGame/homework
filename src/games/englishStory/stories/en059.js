/**
 * Bài 59 "The Robot Show": phố Hà Nội (hồ Gươm, tháp Rùa) → sảnh triển lãm robot (robot khắp nơi, robot to ở cửa có màn hình
 * chào "Hello! / Welcome! / Xin chào!") → phòng 1 (robot nhỏ đá bóng, một robot ngã mãi; chó robot ngồi, lăn tròn)
 * → phòng 2 (robot đầu bếp lật bánh kếp cho các bạn) → nhà Minh buổi tối (bữa tối: Lan hỏi, Tom nghĩ tới ba máy bay không
 * người lái, Minh buồn vì không có robot làm bài tập). there was = một cái (đếm 1), there were = nhiều cái (đếm 1, 2, 3).
 * Toạ độ cảnh: rộng 2000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { dogSvg } from '../rig.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, windowBox, thought, water, steam } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e059_tom: { ...CAST.en_tom_home },
});

const T = (x, y, s, c, txt, w = 900) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="${w}" font-size="${s}" fill="${c}">${txt}</text>`;

// ── Robot ─────────────────────────────────────────────────────────────────
/** Robot nhỏ (gốc = chân, cao ≈ 52). */
const robot = (c, eye = '#22D3EE') => `<rect x="-9" y="-14" width="6" height="14" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/><rect x="3" y="-14" width="6" height="14" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>
  <path d="M-12 -30 L-19 -18 M12 -30 L19 -18" stroke="${L}" stroke-width="4.4" stroke-linecap="round"/><path d="M-12 -30 L-19 -18 M12 -30 L19 -18" stroke="#CBD5E1" stroke-width="2.8" stroke-linecap="round"/>
  <rect x="-13" y="-36" width="26" height="23" rx="6" fill="${c}" stroke="${L}" stroke-width="1"/><circle cy="-25" r="3.4" fill="#FDE047" stroke="${L}" stroke-width="0.6"/>
  <path d="M0 -50 V-58" stroke="${L}" stroke-width="1.4"/><circle cy="-59" r="2.6" fill="#EF4444" stroke="${L}" stroke-width="0.6"/>
  <rect x="-11" y="-52" width="22" height="16" rx="5" fill="#E5E7EB" stroke="${L}" stroke-width="1"/><circle cx="-4.5" cy="-44" r="2.6" fill="${eye}"/><circle cx="4.5" cy="-44" r="2.6" fill="${eye}"/>`;
/** Robot to ở cửa (gốc = chân, cao ≈ 196); màn hình ngực đổi chữ theo class st-*. */
const BIG = `<rect x="-26" y="-74" width="20" height="74" rx="5" fill="#94A3B8" stroke="${L}" stroke-width="1.2"/><rect x="6" y="-74" width="20" height="74" rx="5" fill="#94A3B8" stroke="${L}" stroke-width="1.2"/>
  <rect x="-30" y="-6" width="28" height="8" rx="3" fill="#475569" stroke="${L}"/><rect x="2" y="-6" width="28" height="8" rx="3" fill="#475569" stroke="${L}"/>
  <g class="e059-bigL" style="transform-origin:-40px -140px"><path d="M-40 -140 L-48 -96" stroke="${L}" stroke-width="12" stroke-linecap="round"/><path d="M-40 -140 L-48 -96" stroke="#CBD5E1" stroke-width="9.6" stroke-linecap="round"/><circle cx="-48" cy="-92" r="7" fill="#64748B" stroke="${L}"/></g>
  <g class="e059-bigR" style="transform-origin:40px -140px"><path d="M40 -140 L48 -96" stroke="${L}" stroke-width="12" stroke-linecap="round"/><path d="M40 -140 L48 -96" stroke="#CBD5E1" stroke-width="9.6" stroke-linecap="round"/><circle cx="48" cy="-92" r="7" fill="#64748B" stroke="${L}"/></g>
  <rect x="-42" y="-150" width="84" height="80" rx="14" fill="#3B82F6" stroke="${L}" stroke-width="1.4"/>
  <rect x="-32" y="-140" width="64" height="40" rx="6" fill="#0F172A" stroke="${L}"/>
  <g class="e059-scr e059-scr0">${T(0, -114, 14, '#22D3EE', ':-)')}</g>
  <g class="e059-scr e059-scr1">${T(0, -114, 14, '#FDE047', 'Hello!')}</g>
  <g class="e059-scr e059-scr2">${T(0, -114, 12.5, '#4ADE80', 'Welcome!')}</g>
  <g class="e059-scr e059-scr3">${T(0, -114, 11.5, '#F472B6', 'Xin chào!')}</g>
  ${[-22, -8, 6, 20].map((x, i) => `<circle class="e059-led" style="animation-delay:${i * 0.2}s" cx="${x}" cy="-86" r="3" fill="${['#EF4444', '#FACC15', '#22C55E', '#22D3EE'][i]}"/>`).join('')}
  <rect x="-10" y="-160" width="20" height="12" fill="#94A3B8" stroke="${L}"/>
  <rect x="-34" y="-200" width="68" height="44" rx="12" fill="#E5E7EB" stroke="${L}" stroke-width="1.4"/>
  <g class="e059-bigeye"><rect x="-22" y="-188" width="44" height="16" rx="8" fill="#1E293B"/><circle cx="-10" cy="-180" r="5" fill="#22D3EE"/><circle cx="10" cy="-180" r="5" fill="#22D3EE"/></g>
  <path d="M-10 -165 Q0 -160 10 -165" stroke="${L}" stroke-width="1.6" fill="none"/>
  <path d="M0 -200 V-212" stroke="${L}" stroke-width="2"/><circle class="e059-led" cy="-214" r="4" fill="#EF4444" stroke="${L}" stroke-width="0.6"/>`;
/** Chó robot nhìn nghiêng quay phải (gốc = chân, dài ≈ 50, cao ≈ 34). */
const RDOG = `<g class="e059-dog"><g class="e059-dsit">
  <g class="e059-dtail" style="transform-origin:-20px -20px"><path d="M-20 -20 L-30 -32" stroke="${L}" stroke-width="3" stroke-linecap="round"/><circle cx="-31" cy="-33" r="2.6" fill="#EF4444" stroke="${L}" stroke-width="0.6"/></g>
  ${[[-14, 'e059-dl1'], [-6, 'e059-dl2'], [8, 'e059-dl2'], [16, 'e059-dl1']].map(([x, c]) => `<g transform="translate(${x} -14)"><g class="${c}"><path d="M0 0 L0 13" stroke="${L}" stroke-width="5" stroke-linecap="round"/><path d="M0 0 L0 13" stroke="#94A3B8" stroke-width="3.4" stroke-linecap="round"/></g></g>`).join('')}
  <rect x="-22" y="-28" width="44" height="18" rx="8" fill="#F97316" stroke="${L}" stroke-width="1"/><path d="M-14 -24 H10" stroke="#FDBA74" stroke-width="2.4" stroke-linecap="round"/>
  <g transform="translate(24 -32)"><rect x="-8" y="-10" width="20" height="16" rx="5" fill="#E5E7EB" stroke="${L}" stroke-width="1"/><rect x="0" y="-6" width="10" height="6" rx="3" fill="#1E293B"/><circle cx="6" cy="-3" r="1.8" fill="#22D3EE"/>
    <path d="M-6 -10 L-10 -18 L-2 -12Z" fill="#F97316" stroke="${L}" stroke-width="0.7"/><rect x="10" y="0" width="5" height="4" rx="1.5" fill="#94A3B8" stroke="${L}" stroke-width="0.5"/></g></g></g>`;
/** Robot đầu bếp sau quầy (gốc = chân). */
const COOK = `<rect x="-22" y="-120" width="44" height="60" rx="10" fill="#E5E7EB" stroke="${L}" stroke-width="1.2"/><rect x="-16" y="-110" width="32" height="40" rx="3" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  <rect x="-6" y="-60" width="12" height="60" fill="#94A3B8" stroke="${L}"/><ellipse cx="0" cy="-2" rx="24" ry="6" fill="#64748B" stroke="${L}"/>
  <path d="M-22 -110 L-36 -84" stroke="${L}" stroke-width="7" stroke-linecap="round"/><path d="M-22 -110 L-36 -84" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round"/>
  <g class="e059-cookArm" style="transform-origin:22px -110px"><path d="M22 -110 L40 -96" stroke="${L}" stroke-width="7" stroke-linecap="round"/><path d="M22 -110 L40 -96" stroke="#CBD5E1" stroke-width="5" stroke-linecap="round"/>
    <path d="M40 -96 L52 -96" stroke="#1F2937" stroke-width="3"/><ellipse cx="64" cy="-95" rx="14" ry="4" fill="#1F2937" stroke="${L}"/>
    <g class="e059-flip"><ellipse cx="64" cy="-99" rx="10" ry="3" fill="#FBBF24" stroke="${L}" stroke-width="0.8"/></g></g>
  <rect x="-20" y="-150" width="40" height="30" rx="8" fill="#E5E7EB" stroke="${L}" stroke-width="1.2"/><rect x="-14" y="-142" width="28" height="11" rx="5" fill="#1E293B"/><circle cx="-6" cy="-136" r="3" fill="#22D3EE"/><circle cx="6" cy="-136" r="3" fill="#22D3EE"/>
  <rect x="-15" y="-160" width="30" height="12" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-15 -158 C-26 -162 -22 -178 -10 -174 C-8 -184 8 -184 10 -174 C22 -178 26 -162 15 -158Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>`;
/** Máy bay không người lái (gốc giữa). */
const DRONE = (c) => `<path d="M-16 -2 H16" stroke="${L}" stroke-width="2.4"/><g class="e059-prop"><ellipse cx="-17" cy="-5" rx="9" ry="2" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/></g><g class="e059-prop"><ellipse cx="17" cy="-5" rx="9" ry="2" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/></g>
  <path d="M-17 -2 V-5 M17 -2 V-5" stroke="${L}" stroke-width="1.4"/><rect x="-8" y="-4" width="16" height="9" rx="4" fill="${c}" stroke="${L}" stroke-width="0.8"/><circle cx="0" cy="1" r="2" fill="#22D3EE"/>`;
const PANCAKE = `<ellipse rx="10" ry="3.4" fill="#FBBF24" stroke="${L}" stroke-width="0.8"/><path d="M-5 -1 Q0 -3 5 -1" stroke="#B45309" stroke-width="0.8" fill="none"/>`;
const PLATE = (on) => `<ellipse rx="14" ry="3.4" fill="#fff" stroke="${L}" stroke-width="0.8"/>${on ? `<g class="e059-pc" transform="translate(0 -3)">${PANCAKE}<path d="M-4 -4 q2 -3 4 0" stroke="#B91C1C" stroke-width="1.4" fill="none"/></g>` : ''}`;
const COUNT = (n, c = '#EA580C') => `<circle r="9" fill="#fff" stroke="${c}" stroke-width="1.6"/>${T(0, 4.5, 12, c, n)}`;

function bg() {
  const mini = (x, y, c, i, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="e059-mini" style="animation-delay:${i * 0.13}s">${robot(c)}</g></g>`;
  return `
  <!-- PHỐ HÀ NỘI -->
  ${sky(0, 470, 315, 'e059sky')}
  ${cloud(90, 64, 0.9, 0)}${cloud(330, 50, 0.8, 2)}
  <path d="M0 220 Q120 196 260 214 T470 210 V250 H0Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
  ${water(0, 300, 236)}
  <!-- tháp Rùa -->
  <g transform="translate(150 244)"><ellipse cx="0" cy="2" rx="30" ry="5" fill="#65A30D" stroke="${L}" stroke-width="0.8"/>
    <rect x="-16" y="-26" width="32" height="26" fill="#FDE68A" stroke="${L}"/><path d="M-6 0 V-12 Q0 -18 6 -12 V0" fill="#A16207" stroke="${L}" stroke-width="0.8"/>
    <rect x="-12" y="-44" width="24" height="18" fill="#FDE68A" stroke="${L}"/><circle cy="-36" r="4" fill="#A16207"/><rect x="-7" y="-56" width="14" height="12" fill="#FDE68A" stroke="${L}"/>
    <path d="M-20 -26 H20 M-15 -44 H15 M-10 -56 H10" stroke="#B91C1C" stroke-width="3" stroke-linecap="round"/><path d="M-3 -56 L0 -64 L3 -56Z" fill="#B91C1C"/></g>
  ${tree(330, 250, 0.8)}${tree(30, 250, 0.7, '')}
  <rect x="0" y="${FLOOR - 32}" width="470" height="40" fill="#E5E7EB" stroke="${L}"/>
  <rect x="0" y="${FLOOR + 8}" width="470" height="30" fill="#64748B"/>${[30, 120, 210, 300, 390].map((x) => `<rect x="${x}" y="${FLOOR + 18}" width="34" height="4" rx="2" fill="#F8FAFC"/>`).join('')}
  ${label(110, 112, 'HANOI', '#B91C1C', 17)}
  <!-- tường ngoài + cửa vào -->
  <rect x="440" y="0" width="34" height="${FLOOR}" fill="#E0E7FF"/><rect x="440" y="0" width="34" height="96" fill="#CBD5E1" stroke="${L}" stroke-width="1.2"/>${doorway(457, FLOOR)}

  <!-- SẢNH (robot khắp nơi) -->
  ${room(474, 236, FLOOR, '#E0E7FF', '#CBD5E1')}
  ${room(710, 456, FLOOR, '#DCFCE7', '#CBD5E1')}
  ${room(1166, 352, FLOOR, '#FEF3C7', '#CBD5E1')}
  <rect x="474" y="0" width="1044" height="34" fill="#1E3A8A" stroke="${L}"/>
  ${Array.from({ length: 26 }, (_, i) => `<circle class="e059-bulb" style="animation-delay:${(i % 4) * 0.25}s" cx="${490 + i * 40}" cy="17" r="5" fill="${['#FACC15', '#F472B6', '#22D3EE', '#4ADE80'][i % 4]}" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <g transform="translate(600 76)"><rect x="-74" y="-20" width="148" height="34" rx="8" fill="#FACC15" stroke="${L}" stroke-width="1.4"/>${T(0, 5, 19, '#1E3A8A', 'ROBOT SHOW')}</g>
  <!-- robot nhỏ trên kệ và bệ (hiện ra khi "robots everywhere") -->
  <rect x="610" y="150" width="90" height="7" rx="2" fill="#A16207" stroke="${L}"/>
  <g class="e059-every">${mini(630, 150, '#F472B6', 0, 0.8)}${mini(660, 150, '#4ADE80', 1, 0.8)}${mini(688, 150, '#FACC15', 2, 0.8)}
    ${mini(620, FLOOR - 2, '#A855F7', 3, 0.9)}${mini(690, FLOOR - 2, '#22D3EE', 4, 0.9)}
    ${mini(760, 110, '#EF4444', 5, 0.7)}${mini(1220, 110, '#22C55E', 6, 0.7)}${mini(1480, 110, '#3B82F6', 7, 0.7)}</g>
  <g transform="translate(548 ${FLOOR})">${BIG}</g>
  <!-- PHÒNG 1: sân bóng robot -->
  <rect x="790" y="${FLOOR - 4}" width="260" height="10" rx="3" fill="#22C55E" stroke="${L}"/><path d="M920 ${FLOOR - 4} V${FLOOR + 6}" stroke="#fff" stroke-width="2"/>
  <g transform="translate(1036 ${FLOOR - 2})"><path d="M-16 0 V-40 H16" stroke="#fff" stroke-width="4" fill="none"/><path d="M-16 0 V-40 H16" stroke="${L}" stroke-width="0.8" fill="none"/></g>
  <g transform="translate(800 ${FLOOR - 2})"><path d="M16 0 V-40 H-16" stroke="#fff" stroke-width="4" fill="none"/><path d="M16 0 V-40 H-16" stroke="${L}" stroke-width="0.8" fill="none"/></g>
  <g transform="translate(860 ${FLOOR - 2}) scale(1.15)"><g class="e059-fa">${robot('#EF4444')}</g></g>
  <g transform="translate(990 ${FLOOR - 2}) scale(1.15)"><g class="e059-fc">${robot('#22C55E')}</g></g>
  <g transform="translate(930 ${FLOOR - 2}) scale(1.15)"><g class="e059-fb"><g class="e059-fbin">${robot('#FACC15', '#F472B6')}</g></g></g>
  <g class="e059-ball"><circle cx="900" cy="${FLOOR - 8}" r="6" fill="#fff" stroke="${L}"/><path d="M896 ${FLOOR - 9} l4 -3 l4 3 l-1.6 4 h-4.8Z" fill="#1F2937"/></g>
  <g class="e059-sign1">${label(920, 120, 'ROBOT FOOTBALL', '#15803D', 13)}</g>
  ${doorway(1166, FLOOR)}
  <!-- PHÒNG 2: robot đầu bếp -->
  <g transform="translate(1270 ${FLOOR})">${COOK}</g>
  ${steam(1334, 172, 'e059-steam')}
  <rect x="1500" y="0" width="18" height="${FLOOR}" fill="#CBD5E1" stroke="${L}"/>

  <!-- NHÀ MINH, BỮA TỐI -->
  ${room(1518, 482, FLOOR, '#FDE68A', '#C08B5C')}
  <rect x="1518" y="0" width="482" height="${FLOOR}" fill="#1E1B4B" opacity="0.08"/>
  <g transform="translate(1600 70)"><rect x="-6" y="-6" width="102" height="86" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="0" y="0" width="90" height="74" fill="#1E3A8A"/>
    <circle cx="66" cy="20" r="10" fill="#FEF9C3"/><circle cx="71" cy="16" r="9" fill="#1E3A8A"/>${[[14, 14], [36, 40], [20, 56], [52, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#FDE68A"/>`).join('')}<path d="M45 0 V74 M0 37 H90" stroke="#fff" stroke-width="3" opacity="0.7"/></g>
  <g transform="translate(1860 46)"><path d="M0 0 V30" stroke="${L}"/><path d="M-20 54 Q-20 30 0 30 Q20 30 20 54Z" fill="#FDE047" stroke="${L}"/><ellipse cx="0" cy="58" rx="24" ry="8" fill="#FEF9C3" opacity="0.6"/></g>

  <!-- nhãn -->
  <g class="e059-lb e059-lb-show">${label(250, 104, 'robot show', '#1D4ED8', 15)}</g>
  <g class="e059-lb e059-lb-big">${label(600, 112, 'a big robot', '#1D4ED8', 13)}<g transform="translate(656 112)">${COUNT('1')}</g></g>
  <g class="e059-lb e059-lb-flags">
    <g transform="translate(372 92)"><rect x="-18" y="-12" width="36" height="24" fill="#1E3A8A" stroke="${L}"/><path d="M-18 -12 L18 12 M18 -12 L-18 12" stroke="#fff" stroke-width="5"/><path d="M-18 -12 L18 12 M18 -12 L-18 12" stroke="#DC2626" stroke-width="2"/><path d="M0 -12 V12 M-18 0 H18" stroke="#fff" stroke-width="7"/><path d="M0 -12 V12 M-18 0 H18" stroke="#DC2626" stroke-width="4"/>${T(0, 28, 10, '#1E3A8A', 'English')}</g>
    <g transform="translate(432 92)"><rect x="-18" y="-12" width="36" height="24" fill="#DA251D" stroke="${L}"/><path d="M0 -7 l2 5.4 h5.6 l-4.6 3.4 l1.8 5.6 l-4.8 -3.4 l-4.8 3.4 l1.8 -5.6 l-4.6 -3.4 h5.6Z" fill="#FFFF00"/>${T(0, 28, 10, '#B91C1C', 'Vietnamese')}</g></g>
  <g class="e059-lb e059-lb-small">${label(920, 150, 'small robots', '#15803D', 13)}<g transform="translate(860 196)">${COUNT('1', '#15803D')}</g><g transform="translate(930 196)">${COUNT('2', '#15803D')}</g><g transform="translate(990 196)">${COUNT('3', '#15803D')}</g></g>
  <g class="e059-lb e059-lb-ha">${label(800, 132, 'Ha ha!', '#DB2777', 14)}</g>
  <g class="e059-lb e059-lb-dog">${label(1078, 196, 'a robot dog', '#EA580C', 13)}</g>
  <g class="e059-lb e059-lb-roll">${label(1100, 160, 'sit', '#EA580C', 13)}${label(1100, 132, 'roll over', '#EA580C', 13)}</g>
  <g class="e059-lb e059-lb-cook">${label(1270, 100, 'a robot cook', '#B45309', 13)}<g transform="translate(1330 100)">${COUNT('1', '#B45309')}</g></g>
  <g class="e059-lb e059-lb-q">${label(1700, 128, '?', '#EA580C', 18)}</g>`;
}

const bub = (k, x, y, w, h, inner, tip) => `<g class="e059-bub e059-bub-${k}" style="transform-origin:${tip[0]}px ${tip[1]}px">${thought(x, y, w, h, inner, tip)}</g>`;

function fg() {
  const lucky = `<g transform="translate(-24 22) scale(0.5)">${dogSvg()}</g><g transform="translate(26 6)"><g class="e059-rollme">${`<g transform="scale(0.85)">${RDOG}</g>`}</g></g>${T(0, -28, 11, '#B45309', 'like Lucky')}`;
  const drones = [0, 1, 2].map((i) => `<g transform="translate(${-44 + i * 44} ${i === 1 ? -10 : 0})"><g class="e059-hover" style="animation-delay:${i * 0.2}s">${DRONE(['#EF4444', '#22C55E', '#3B82F6'][i])}</g><g transform="translate(0 20)">${COUNT(String(i + 1))}</g></g>`).join('') + T(0, -28, 11, '#1D4ED8', 'three drones');
  const hw = `<g transform="translate(-6 26) scale(0.9)">${robot('#A855F7')}</g><rect x="-36" y="0" width="60" height="5" rx="2" fill="#B45309" stroke="${L}" stroke-width="0.7"/><rect x="-30" y="-8" width="22" height="8" fill="#fff" stroke="${L}" stroke-width="0.6"/>${T(-19, -2, 6, '#1D4ED8', '2+3=5', 800)}
    <path d="M-34 -24 L30 24 M30 -24 L-34 24" stroke="#DC2626" stroke-width="5" stroke-linecap="round" opacity="0.9"/>${T(0, -30, 11, '#DC2626', 'homework')}`;
  return `
  <!-- quầy bếp robot (che chân robot) -->
  <rect x="1226" y="216" width="150" height="${FLOOR - 216}" fill="#94A3B8" stroke="${L}" stroke-width="1.2"/><rect x="1220" y="208" width="162" height="10" rx="3" fill="#E5E7EB" stroke="${L}"/>
  <rect x="1312" y="198" width="44" height="10" rx="2" fill="#1F2937" stroke="${L}"/><g class="e059-flame"><path d="M1322 198 q3 -6 6 0 M1338 198 q3 -6 6 0" fill="#FDBA74" stroke="#F97316" stroke-width="1.4"/></g>
  <!-- bàn các bạn nhỏ (phòng 2) -->
  <g transform="translate(1440 0)"><rect x="-56" y="232" width="112" height="8" rx="3" fill="#F59E0B" stroke="${L}"/><path d="M-48 240 V${FLOOR} M48 240 V${FLOOR}" stroke="#92400E" stroke-width="5"/>
    <g transform="translate(-24 232)"><g class="e059-plate0">${PLATE(false)}</g><g class="e059-plate1">${PLATE(true)}</g></g>
    <g transform="translate(26 232)"><g class="e059-plate0">${PLATE(false)}</g><g class="e059-plate1">${PLATE(true)}</g></g></g>
  <!-- bàn ăn tối -->
  <g transform="translate(1770 0)"><rect x="-130" y="226" width="260" height="10" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/><path d="M-118 236 V${FLOOR} M118 236 V${FLOOR}" stroke="#92400E" stroke-width="6"/>
    <path d="M-120 226 H120" stroke="#FEF3C7" stroke-width="2"/>
    ${[-90, -30, 30, 90].map((x) => `<g transform="translate(${x} 224)"><path d="M-12 -2 H12 Q11 8 0 9 Q-11 8 -12 -2Z" fill="#fff" stroke="#3B82F6" stroke-width="1.2"/><path d="M-10 -2 Q0 -7 10 -2Z" fill="#FEF3C7" stroke="${L}" stroke-width="0.5"/></g>`).join('')}
    <g transform="translate(0 222)"><ellipse rx="22" ry="5" fill="#fff" stroke="${L}"/><path d="M-16 -2 Q-8 -14 0 -6 Q8 -14 16 -2Z" fill="#22C55E" stroke="${L}" stroke-width="0.7"/><path d="M-10 -4 q3 -5 6 0 M4 -4 q3 -5 6 0" stroke="#F97316" stroke-width="2" fill="none"/></g>
    ${steam(0, 206, 'e059-dsteam')}</g>
  ${bush(250, FLOOR + 20, 0.9, '#4ADE80')}
  <!-- bong bóng nghĩ -->
  ${bub('lucky', 872, 108, 150, 86, lucky, [780, 158])}
  ${bub('drone', 1856, 104, 160, 90, drones, [1834, 158])}
  ${bub('hw', 1880, 100, 150, 90, hw, [1890, 158])}`;
}

const CSS = `
.e059-lb { opacity: 0; transition: opacity .35s; }
${['show', 'big', 'flags', 'small', 'ha', 'dog', 'roll', 'cook', 'q'].map((k) => `.st-lb-${k} .e059-lb-${k}`).join(', ')} { opacity: 1; }
.e059-bub { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .5s cubic-bezier(.3,1.5,.6,1); }
.st-bub-lucky .e059-bub-lucky, .st-bub-drone .e059-bub-drone, .st-bub-hw .e059-bub-hw { opacity: 1; transform: scale(1); }
.e059-bulb { animation: e059Blink 1s steps(2) infinite; } .e059-led { animation: e059Blink .8s steps(2) infinite; }
@keyframes e059Blink { 50% { opacity: .35; } }
.e059-every { opacity: 0; transition: opacity .3s; } .st-every .e059-every { opacity: 1; }
.e059-mini { transform-box: fill-box; transform-origin: 50% 100%; }
.st-every .e059-mini { animation: e059Pop .5s cubic-bezier(.3,1.6,.6,1) both, e059Bob .4s .5s ease-in-out 6 alternate; }
@keyframes e059Pop { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes e059Bob { from { transform: translateY(0); } to { transform: translateY(-5px); } }
.e059-scr { opacity: 0; } .e059-scr0 { opacity: 1; }
.st-scr1 .e059-scr1, .st-scr2 .e059-scr2, .st-scr3 .e059-scr3 { opacity: 1; }
.st-scr1 .e059-scr0, .st-scr2 .e059-scr0, .st-scr3 .e059-scr0 { opacity: 0; }
.e059-bigR, .e059-bigL { transition: transform .5s cubic-bezier(.3,1.4,.6,1); }
.st-bigwave .e059-bigR { transform: rotate(-150deg); animation: e059Wave .35s ease-in-out infinite alternate; }
@keyframes e059Wave { from { rotate: -14deg; } to { rotate: 14deg; } }
.st-bigopen .e059-bigR { transform: rotate(-70deg); } .st-bigopen .e059-bigL { transform: rotate(70deg); }
.e059-bigeye { transition: opacity .2s; } .st-bigon .e059-bigeye circle { fill: #FDE047; }
.e059-fa, .e059-fc, .e059-fb, .e059-ball { transform-box: fill-box; transform-origin: 50% 100%; }
.st-play .e059-fa { animation: e059RunA 1.2s ease-in-out infinite alternate; }
.st-play .e059-fc { animation: e059RunC 1.4s ease-in-out infinite alternate; }
.st-play .e059-ball { animation: e059Ball 1.2s ease-in-out infinite alternate; }
@keyframes e059RunA { from { transform: translateX(-24px); } to { transform: translateX(10px); } }
@keyframes e059RunC { from { transform: translateX(14px); } to { transform: translateX(-20px); } }
@keyframes e059Ball { from { transform: translateX(-30px); } 50% { transform: translateX(30px) translateY(-6px); } to { transform: translateX(80px); } }
.e059-fbin { transform-box: fill-box; transform-origin: 50% 100%; }
.st-fall .e059-fbin { animation: e059Fall 1.1s ease-in-out 4; }
@keyframes e059Fall { 0%, 15% { transform: rotate(0); } 40%, 70% { transform: rotate(-90deg) translateX(-2px); } 100% { transform: rotate(0); } }
.e059-steam, .e059-flame { opacity: 0; transition: opacity .4s; } .st-cooking .e059-steam, .st-cooking .e059-flame { opacity: 1; }
.e059-cookArm { transition: transform .4s; } .st-cooking .e059-cookArm { animation: e059Pan .7s ease-in-out infinite alternate; }
@keyframes e059Pan { from { transform: rotate(4deg); } to { transform: rotate(-10deg); } }
.st-cooking .e059-flip { animation: e059Flip .7s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
@keyframes e059Flip { from { transform: translateY(0) rotate(0); } to { transform: translateY(-24px) rotate(180deg); } }
.e059-plate1 { opacity: 0; transition: opacity .3s; } .st-plates .e059-plate1 { opacity: 1; } .st-plates .e059-plate0 { opacity: 0; }
.st-eaten .e059-pc { opacity: .35; transition: opacity 1.4s; }
.e059-dsteam { opacity: .8; }
.st-bub-lucky .e059-rollme { animation: e059Roll 1.4s linear infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e059Roll { to { transform: rotate(360deg); } }
.e059-prop { transform-box: fill-box; transform-origin: center; animation: e059Prop .12s linear infinite alternate; }
@keyframes e059Prop { to { transform: scaleX(.3); } }
.st-bub-drone .e059-hover { animation: e059Bob .5s ease-in-out infinite alternate; }
/* chó robot (diễn viên kind 'thing'): đi, ngồi, lăn */
.es-thing.is-walk .e059-dl1 { animation: ppStepA .22s ease-in-out infinite alternate; }
.es-thing.is-walk .e059-dl2 { animation: ppStepB .22s ease-in-out infinite alternate; }
.e059-dtail { animation: e059Tail .25s ease-in-out infinite alternate; }
@keyframes e059Tail { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
.e059-dsit { transform-box: fill-box; transform-origin: 20% 100%; transition: transform .4s; }
.act-e059sit .e059-dsit { transform: rotate(-24deg) translate(-2px, 4px); }
.e059-dog { transform-box: fill-box; transform-origin: 50% 60%; }
.act-e059roll .e059-dog { animation: e059RollD 1s ease-in-out 2; }
@keyframes e059RollD { 0% { transform: translateX(0) rotate(0); } 50% { transform: translateX(12px) translateY(-6px) rotate(180deg); } 100% { transform: translateX(0) rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .e059-bulb, .e059-led { animation-duration: 2.4s; }
  .st-every .e059-mini { animation: e059Pop .8s ease-out both; }
  .st-bigwave .e059-bigR { animation-duration: .8s; }
  .st-play .e059-fa, .st-play .e059-fc, .st-play .e059-ball { animation-duration: 2.6s; }
  .st-fall .e059-fbin { animation-duration: 1.8s; animation-iteration-count: 3; }
  .st-cooking .e059-cookArm, .st-cooking .e059-flip { animation-duration: 1.4s; }
  .st-bub-lucky .e059-rollme { animation-duration: 3s; }
  .act-e059roll .e059-dog { animation-duration: 1.8s; animation-iteration-count: 1; }
  .e059-prop { animation-duration: .4s; } .st-bub-drone .e059-hover { animation-duration: 1.2s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));

const BEATS = [
  { key: ['Last Sunday', 'a robot show in Hanoi'], icon: '🏙️', label: 'robot show', async play(st) {
    st.look(200);
    await Promise.all([
      st.walk('dad', 340, { speed: 130, lead: 60 }),
      st.walk('tom', 392, { speed: 130, follow: false }),
      st.walk('minh', 438, { speed: 130, follow: false }),
    ]);
    st.set('st-lb-show'); st.sfx('pop', { vol: 0.6 }); st.sfx('robot-beep', { vol: 0.4 });
    st.pose('dad', 'point');
    await st.wait(1000);
    st.pose('dad', 'stand');
  } },
  { key: ['There were robots everywhere'], icon: '🤖', label: 'robots everywhere', async play(st) {
    st.set('st-lb-show', false);
    st.look(560);
    st.set('st-every'); st.sfx('pop', { vol: 0.5 }); st.sfx('robot-walk', { vol: 0.5 });
    st.mood('minh', 'wow'); st.mood('tom', 'wow'); st.pose('minh', 'open'); st.pose('tom', 'open');
    await st.wait(700); st.sfx('robot-beep', { vol: 0.45, rate: 1.2 });
    await st.wait(1500);
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
  } },
  { key: ['There was a big robot at the door'], icon: '🦾', label: 'a big robot', async play(st) {
    st.look(520);
    st.pose('minh', 'point'); st.pose('tom', 'stand');
    st.set('st-bigon'); st.set('st-lb-big'); st.sfx('robot-walk', { vol: 0.6, rate: 0.85 });
    await st.wait(2200);
    st.pose('minh', 'stand');
  } },
  { key: ['Hello'], icon: '👋', label: 'Hello!', async play(st) {
    st.set('st-lb-big', false);
    st.look(520);
    st.set('st-scr1'); st.set('st-bigwave'); st.sfx('robot-beep', { vol: 0.6 });
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(1600);
    st.set('st-bigwave', false);
  } },
  { key: ['Welcome'], icon: '🎉', label: 'Welcome!', async play(st) {
    st.look(520);
    st.set('st-scr1', false); st.set('st-scr2'); st.set('st-bigopen');
    st.sfx('ding', { vol: 0.6 });
    st.pose('tom', 'wave'); st.act('tom', 'wave');
    await st.wait(1600);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['in English and Vietnamese'], icon: '🇻🇳', label: 'English and Vietnamese', async play(st) {
    st.look(520);
    st.set('st-bigopen', false);
    st.set('st-lb-flags'); st.sfx('pop', { vol: 0.6 });
    st.set('st-scr2', false); st.set('st-scr1');
    await st.wait(1100);
    st.set('st-scr1', false); st.set('st-scr3'); st.sfx('robot-beep', { vol: 0.5, rate: 1.15 });
    st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    await st.wait(1300);
    st.pose('minh', 'stand');
  } },
  { key: ['there were small robots playing football'], icon: '⚽', label: 'robots playing football', async play(st) {
    off(st, 'st-lb-flags', 'st-scr3', 'st-bigon');
    await Promise.all([
      st.walk('minh', 760, { speed: 170, lead: 100 }),
      st.walk('tom', 720, { speed: 170, follow: false }),
      st.walk('dad', 670, { speed: 170, follow: false }),
    ]);
    st.set('st-play'); st.set('st-lb-small'); st.sfx('whistle', { vol: 0.4 });
    st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await st.wait(600); st.sfx('kick', { vol: 0.5 });
    await st.wait(1200); st.sfx('kick', { vol: 0.45, rate: 1.1 });
    await st.wait(200);
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
  } },
  { key: ['Minh laughed', 'fell over again and again'], icon: '😂', label: 'fell over', async play(st) {
    st.set('st-lb-small', false);
    st.look(880);
    st.set('st-fall');
    await st.wait(500); st.sfx('bump', { vol: 0.6 });
    st.pose('minh', 'e059_laugh'); st.act('minh', 'hop'); st.mood('minh', 'joy');
    st.set('st-lb-ha'); st.sfx('giggle', { vol: 0.7 });
    await st.wait(1100); st.sfx('bump', { vol: 0.55, rate: 0.9 });
    await st.wait(1100); st.sfx('giggle', { vol: 0.6 });
    await st.wait(1200);
    st.act('minh', null); st.pose('minh', 'stand'); st.set('st-fall', false); st.set('st-lb-ha', false);
  } },
  { key: ['There was a robot dog, too'], icon: '🐕', label: 'a robot dog', async play(st) {
    st.look(940);
    st.show('rdog', true);
    await st.loop('robot-walk', () => st.walk('rdog', 1100, { speed: 90, follow: false }), { vol: 0.5 });
    st.set('st-lb-dog'); st.sfx('dog-bark', { vol: 0.4, rate: 1.6 });
    st.mood('tom', 'wow'); st.pose('tom', 'point');
    await st.wait(1200);
    st.pose('tom', 'stand'); st.mood('tom', 'joy');
  } },
  { key: ['sit and roll over like Lucky'], icon: '🔄', label: 'roll over', async play(st) {
    st.set('st-lb-dog', false);
    st.look(980);
    st.act('rdog', 'e059sit'); st.set('st-lb-roll'); st.sfx('robot-beep', { vol: 0.5 });
    await st.wait(1100);
    st.act('rdog', 'e059roll'); st.sfx('whoosh', { vol: 0.4 }); st.set('st-bub-lucky'); st.sfx('pop', { vol: 0.5 }); st.pose('minh', 'think'); st.mood('minh', 'joy');
    await st.wait(2200);
    st.act('rdog', null); st.pose('minh', 'stand');
  } },
  { key: ['there was a robot cook'], icon: '👨‍🍳', label: 'a robot cook', async play(st) {
    off(st, 'st-bub-lucky', 'st-lb-roll', 'st-play');
    await Promise.all([
      st.walk('tom', 1414, { speed: 190, lead: -80 }),
      st.walk('minh', 1466, { speed: 190, follow: false }),
      st.walk('dad', 1196, { speed: 190, follow: false }),
    ]);
    st.face('dad', 1);
    st.pose('tom', 'sit'); st.pose('minh', 'sit');
    st.set('st-cooking'); st.set('st-lb-cook'); st.sfx('sizzle', { vol: 0.5 });
    await st.wait(1600);
  } },
  { key: ['made pancakes for the children'], icon: '🥞', label: 'pancakes', async play(st) {
    st.set('st-lb-cook', false);
    st.look(1360);
    await st.wait(600); st.sfx('whoosh', { vol: 0.45 });
    await Promise.all([
      st.fly(PANCAKE, [1334, 186], [1416, 226], { size: 22, dur: 700 }),
      st.fly(PANCAKE, [1334, 186], [1466, 226], { size: 22, dur: 850 }),
    ]);
    st.set('st-plates'); st.sfx('bowl-down', { vol: 0.4 });
    st.hold('tom', 'spoon'); st.hold('minh', 'spoon');
    st.pose('tom', 'eat'); st.act('tom', 'eat'); st.pose('minh', 'eat'); st.act('minh', 'eat');
    st.mood('tom', 'joy'); st.mood('minh', 'joy'); st.set('st-eaten');
    await st.wait(2000);
    st.act('tom', null); st.act('minh', null);
  } },
  { key: ['Were there any flying robots'], icon: '🛸', label: 'flying robots?', async play(st) {
    off(st, 'st-cooking');
    st.hold('tom', null); st.hold('minh', null);
    st.place('dad', 1680, FLOOR, 1); st.place('tom', 1830, FLOOR, -1); st.place('minh', 1890, FLOOR, -1);
    for (const id of ['dad', 'tom', 'minh']) { st.pose(id, 'sit'); st.mood(id, 'happy'); }
    await st.look(1780, { dur: 1000 });
    st.pose('lan', 'open'); st.mood('lan', 'wow'); st.sfx('dishes', { vol: 0.35 }); st.sfx('pop', { vol: 0.5 });
    await st.say('lan', 'Were there any flying robots?', 2200);
    st.pose('lan', 'sit');
  } },
  { key: ['Lan asked at dinner'], icon: '🍲', label: 'at dinner', async play(st) {
    st.look(1780);
    st.pose('lan', 'e059_ask'); st.set('st-lb-q'); st.sfx('pop', { vol: 0.6 });
    st.hold('dad', 'chopsticks'); st.pose('dad', 'eat'); st.act('dad', 'eat'); st.sfx('slurp', { vol: 0.5 });
    await st.wait(1600);
    st.act('dad', null); st.hold('dad', null); st.pose('dad', 'sit');
  } },
  { key: ['there were three drones'], icon: '🚁', label: 'three drones', async play(st) {
    st.set('st-lb-q', false); st.pose('lan', 'sit');
    st.look(1780);
    st.pose('tom', 'sitWave'); st.mood('tom', 'joy');
    st.set('st-bub-drone'); st.sfx('pop', { vol: 0.6 }); st.sfx('robot-beep', { vol: 0.4, rate: 1.3 });
    await st.loop('drone', () => st.say('tom', 'Yes, three drones!', 1800), { vol: 0.5 });
    await st.wait(800);
    st.pose('tom', 'sit');
  } },
  { key: ["There wasn't a robot for homework", 'sadly'], icon: '😢', label: 'no homework robot', async play(st) {
    st.set('st-bub-drone', false);
    st.look(1780);
    st.pose('minh', 'e059_sadsit'); st.mood('minh', 'sad');
    st.set('st-bub-hw'); st.sfx('pop', { vol: 0.6 });
    await st.wait(600); st.sfx('buzz-no', { vol: 0.6 });
    st.mood('lan', 'joy'); st.mood('dad', 'joy');
    await st.wait(2400);
  } },
];

export default {
  id: 'en059', worldW: 2000, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e059_laugh: { R: [30, -120], L: [30, -120], head: -8 },
    e059_ask: { R: [55, 40], L: [40, 110], dy: 20, head: 9 },
    e059_sadsit: { R: [40, 110], L: [40, 110], dy: 20, head: 12 },
  },
  order: [0, 2, 6, 8, 11, 14],
  cast: [
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1740, s: 1.08 },
    { id: 'rdog', kind: 'thing', svg: RDOG, box: [-40, -50, 84, 54], x: 1190, s: 1.2, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 40, s: 0.95 },
    { id: 'tom', kind: 'kid', who: 'e059_tom', x: 100 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 150 },
  ],
  init(st) {
    st.pose('lan', 'sit');
    st.show('rdog', false);
  },
};
