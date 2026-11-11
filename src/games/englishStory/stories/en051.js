/**
 * Bài 51 "The Big Race": sân trường ngày hội thể thao, trái sang phải: băng rôn SPORTS DAY + cô Hoa cầm còi ở vạch xuất phát
 * → đường chạy năm làn (vạch chéo như đường chạy thật để thấy mặt từng bạn) → khán đài có bố mẹ, Lan → vạch đích (cổng FINISH).
 * Trạng từ thành chuyển động: Tom xuất phát rất nhanh (tốc độ 300) rồi mệt chạy chậm (50), Minh chạy đều (140), thở đều
 * (hơi thở phả ra theo nhịp), về nhì. Nhãn chữ (carefully, slowly, loudly…) hiện cạnh hành động.
 * Toạ độ cảnh: rộng 2000, cao 315; làn chạy y = 238, 254, 270, 286, 302 (xa → gần). Trạng thái cảnh là class st-* trên <svg>.
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, tree, bush, label } from '../kit.js';

const FLOOR = 286;
const LANE = [238, 254, 270, 286, 302];
const START = [380, 350, 320, 290, 260];   // vạch xuất phát chéo: làn xa ở bên phải
const RUN = 1200;                            // dài đường chạy
const T = (x, y, s, c, size = 12, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${size}" fill="${c}"${extra}>${s}</text>`;

Object.assign(CAST, {
  e051_minh: { hair: 'spiky', top: 'tee', shirt: '#EF4444', bottom: 'shorts', bottomC: '#FFFFFF', shoe: '#2563EB' },
  e051_tom: { hair: 'neat', hairC: '#E0A33A', top: 'tee', shirt: '#22C55E', bottom: 'shorts', bottomC: '#FFFFFF', shoe: '#F59E0B' },
  e051_b1: { hair: 'short', top: 'tee', shirt: '#3B82F6', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F5F5F4' },
  e051_b2: { hair: 'curly', hairC: '#3F2A1E', top: 'tee', shirt: '#FACC15', bottom: 'shorts', bottomC: '#334155', shoe: '#EF4444' },
  e051_b3: { hair: 'spiky', hairC: '#1C1917', top: 'tee', shirt: '#A855F7', bottom: 'shorts', bottomC: '#1F2937', shoe: '#F5F5F4' },
  e051_p1: { adult: true, hair: 'ponytail', hairC: '#7C2D12', top: 'blouse', shirt: '#FDBA74', bottom: 'pants', bottomC: '#334155', shoe: '#F5F5F4' },
  e051_p2: { adult: true, hair: 'short', top: 'shirt', shirt: '#A7F3D0', bottom: 'pants', bottomC: '#44403C', shoe: '#1C1917' },
});

/** Số đeo trước ngực (gốc giữa bụng trẻ em). */
const BIB = (n) => `<g transform="translate(0 -14)"><rect x="-8" y="-8" width="16" height="14" rx="2" fill="#fff" stroke="${L}" stroke-width="0.7"/><g class="es-unflip">${T(0, 3.6, n, '#1F2937', 10)}</g></g>`;
const MEDAL = `<g transform="translate(0 -14)"><path d="M-6 -22 L0 -6 L6 -22" stroke="#2563EB" stroke-width="3.4" fill="none"/><circle cy="0" r="8" fill="#E2E8F0" stroke="#64748B" stroke-width="1.4"/>
  <g class="es-unflip">${T(0, 4, '2', '#475569', 10)}</g></g>`;
/** Còi (gốc = bàn tay). */
const WHISTLE = `<g transform="translate(0 -6)"><rect x="-4" y="-3" width="12" height="7" rx="3" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/><circle cx="-3" cy="2" r="4.4" fill="#CBD5E1" stroke="${L}" stroke-width="0.7"/></g>`;
const RABBIT = `<g transform="scale(0.9)"><ellipse cx="0" cy="4" rx="12" ry="8" fill="#fff" stroke="${L}"/><circle cx="10" cy="-4" r="6.4" fill="#fff" stroke="${L}"/>
  <path d="M8 -9 Q6 -22 10 -22 Q12 -16 11 -9Z M12 -9 Q14 -21 18 -20 Q17 -14 14 -8Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><circle cx="12" cy="-5" r="1.2" fill="${L}"/>
  <path d="M-22 -2 h-8 M-22 4 h-10 M-22 10 h-7" stroke="#94A3B8" stroke-width="1.6" stroke-linecap="round"/></g>`;
const TURTLE = `<g transform="scale(0.9)"><ellipse cx="0" cy="2" rx="14" ry="9" fill="#22C55E" stroke="${L}"/><path d="M-8 -2 l6 -4 l6 4 l-2 6 h-8Z" fill="#16A34A" stroke="${L}" stroke-width="0.6"/>
  <circle cx="17" cy="0" r="5" fill="#86EFAC" stroke="${L}"/><circle cx="19" cy="-1" r="1" fill="${L}"/>
  ${[-10, 8].map((x) => `<rect x="${x - 3}" y="8" width="6" height="6" rx="2" fill="#86EFAC" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>`;
const MARK = (ok) => ok
  ? `<circle r="10" fill="#22C55E" stroke="${L}"/><path d="M-5 0 L-1.6 4 L5 -4.4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  : `<circle r="10" fill="#EF4444" stroke="${L}"/><path d="M-4.4 -4.4 L4.4 4.4 M4.4 -4.4 L-4.4 4.4" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
const lbl = (k, x, y, text, c, size = 14) => label(x, y, text, c, size).replace('<g ', `<g class="e051-lb e051-lb-${k}" `);
/** Vạch chéo (xuất phát / đích) đi qua các làn: dx = độ dời so với vạch xuất phát. */
const slant = (dx, c = '#fff', w = 4) => `<path d="M${412.75 + dx} 228 L${262.75 + dx} 308" stroke="${c}" stroke-width="${w}"/>`;

function bg() {
  return `
  <defs><linearGradient id="e051sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#E0F2FE"/></linearGradient>
    <pattern id="e051chk" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><rect width="4" height="4" fill="#1F2937"/><rect x="4" y="4" width="4" height="4" fill="#1F2937"/></pattern></defs>
  <rect x="0" y="0" width="2000" height="315" fill="url(#e051sky)"/>
  ${cloud(200, 60, 1, 0)}${cloud(760, 46, 0.8, 2)}${cloud(1260, 70, 0.9, 4)}${cloud(1820, 52, 0.8, 1)}
  <!-- trường phía xa -->
  <g transform="translate(900 0)"><path d="M-170 140 L0 100 L170 140Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/><rect x="-160" y="140" width="320" height="88" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
    ${[-120, -70, -20, 30, 80, 130].map((dx) => `<rect x="${dx - 12}" y="156" width="24" height="22" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
    <path d="M140 140 V80" stroke="#78716C" stroke-width="3"/><g class="ek-flag" style="transform-origin:140px 89px"><rect x="140" y="80" width="28" height="18" fill="#DA251D"/></g></g>
  <path d="M0 214 Q300 196 620 212 T1300 208 T2000 212 V230 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(80, 226, 0.9)}${tree(1180, 224, 0.8, '')}${tree(1900, 226, 0.95)}
  <!-- băng rôn SPORTS DAY + cờ dây -->
  <path d="M250 228 V60 M560 228 V60" stroke="#92400E" stroke-width="5"/>
  <path d="M250 62 Q405 86 560 62" stroke="${L}" stroke-width="1" fill="none"/>
  ${Array.from({ length: 9 }, (_, i) => { const x = 270 + i * 34, y = 62 + Math.sin(Math.PI * (x - 250) / 310) * 24; return `<path d="M${x - 8} ${y} L${x + 8} ${y} L${x} ${y + 14}Z" fill="${['#EF4444', '#FACC15', '#3B82F6', '#22C55E'][i % 4]}" stroke="${L}" stroke-width="0.6"/>`; }).join('')}
  <rect x="290" y="98" width="230" height="40" rx="8" fill="#fff" stroke="${L}" stroke-width="1.6"/>${T(405, 126, 'SPORTS DAY', '#DC2626', 24)}
  <!-- khán đài -->
  <g transform="translate(1630 0)">
    <rect x="0" y="206" width="400" height="22" fill="#94A3B8" stroke="${L}"/><rect x="20" y="184" width="360" height="22" fill="#CBD5E1" stroke="${L}"/><rect x="40" y="162" width="320" height="22" fill="#E2E8F0" stroke="${L}"/>
    <path d="M30 162 V110 M370 162 V110" stroke="#64748B" stroke-width="4"/><path d="M20 112 Q200 84 380 112 L380 120 Q200 94 20 120Z" fill="#3B82F6" stroke="${L}"/>
  </g>
  <!-- đường chạy -->
  <rect x="0" y="228" width="2000" height="80" fill="#FB923C" stroke="${L}"/>
  ${[246, 262, 278, 294].map((y) => `<path d="M0 ${y} H2000" stroke="#FFF7ED" stroke-width="1.6" opacity="0.9"/>`).join('')}
  ${slant(0)}
  <g transform="translate(${RUN} 0)">${slant(0, 'url(#e051chk)', 8)}</g>
  <rect x="0" y="308" width="2000" height="10" fill="#86EFAC"/>
  <!-- cổng đích -->
  <path d="M${RUN + 412} 228 V96 M${RUN + 262} 308 V120" stroke="#78716C" stroke-width="5"/>
  <path d="M${RUN + 262} 122 L${RUN + 412} 98 L${RUN + 412} 128 L${RUN + 262} 152Z" fill="#FDE047" stroke="${L}" stroke-width="1.4"/>
  ${T(RUN + 337, 132, 'FINISH', '#DC2626', 18, ` transform="rotate(-9 ${RUN + 337} 128)"`)}`;
}

function fg() {
  return `
  <!-- âm thanh còi -->
  <g class="e051-loud" transform="translate(236 140)">${[0, 1, 2].map((i) => `<path class="e051-wave" style="animation-delay:${i * 0.15}s" d="M${12 + i * 9} -14 q8 14 0 28" stroke="#F97316" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- tiếng vỗ tay của khán đài -->
  <g class="e051-clapfx">${[1716, 1766, 1886, 1940].map((x, i) => `<g transform="translate(${x} 92)">${[0, 1].map((j) => `<path class="e051-wave" style="animation-delay:${i * 0.1 + j * 0.2}s" d="M${-8 + j * 16} 0 l${j ? 6 : -6} -8" stroke="#F97316" stroke-width="2.6" stroke-linecap="round"/>`).join('')}</g>`).join('')}</g>
  <!-- biển của Lan -->
  <g class="e051-sign" transform="translate(1826 104)"><path d="M0 0 V30" stroke="#92400E" stroke-width="3"/><rect x="-34" y="-22" width="68" height="24" rx="5" fill="#FDE047" stroke="${L}" stroke-width="1.2"/>${T(0, -5, 'GO MINH!', '#DC2626', 12)}</g>
  <!-- nơ dây giày -->
  <g class="e051-bow" transform="translate(${START[4] - 4} ${LANE[4] - 4})"><path d="M0 0 q-8 -6 -8 0 q0 6 8 0 q8 -6 8 0 q0 6 -8 0" stroke="#fff" stroke-width="1.8" fill="#2563EB"/></g>
  ${lbl('careful', 478, 222, 'Minh: carefully', '#2563EB', 13)}
  ${lbl('slow1', 478, 188, 'Tom: slowly', '#16A34A', 13)}
  ${lbl('loud', 240, 96, 'loudly', '#EA580C', 15)}
  ${lbl('fast', 640, 100, 'very fast!', '#DC2626', 15)}
  ${lbl('tired', 880, 92, 'tired... slowly', '#7C3AED', 13)}
  ${lbl('steady', 880, 128, 'steadily', '#2563EB', 14)}
  ${lbl('calm', 880, 156, 'calmly', '#0891B2', 13)}
  ${lbl('pass', 1340, 120, 'passed!', '#DC2626', 15)}
  ${lbl('second', 1640, 140, '2nd!', '#475569', 20)}
  ${lbl('first', 1772, 124, '1st', '#B45309', 14)}
  ${lbl('happy', 1574, 132, 'happily', '#DB2777', 14)}
  ${lbl('loud2', 1740, 70, 'loudly', '#EA580C', 14)}
  ${lbl('proud', 1640, 116, 'very proud!', '#DC2626', 17)}
  <!-- bong bóng của Tom -->
  <g class="e051-bub e051-b-well" style="transform-origin:1590px 150px"><path d="M1578 128 L1590 150 L1600 128Z" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <rect x="1500" y="94" width="130" height="38" rx="14" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="1580" y="126" width="18" height="6" fill="#fff"/>${T(1565, 119, 'really well!', '#16A34A', 15)}</g>
  <g class="e051-bub e051-b-next" style="transform-origin:1584px 150px"><circle cx="1584" cy="146" r="4" fill="#fff" stroke="${L}"/><circle cx="1576" cy="134" r="5.4" fill="#fff" stroke="${L}"/>
    <rect x="1446" y="64" width="160" height="64" rx="20" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <g transform="translate(1486 98)">${RABBIT}</g><g transform="translate(1486 76)">${MARK(false)}</g>
    <g transform="translate(1562 100)">${TURTLE}</g><g transform="translate(1562 76)">${MARK(true)}</g>
    ${T(1526, 122, 'next time', '#64748B', 9)}</g>`;
}

const CSS = `
.e051-lb, .e051-loud, .e051-clapfx, .e051-sign, .e051-bow { opacity: 0; transition: opacity .3s; }
${['careful', 'slow1', 'loud', 'fast', 'tired', 'steady', 'calm', 'pass', 'second', 'first', 'happy', 'loud2', 'proud'].map((k) => `.st-lb-${k} .e051-lb-${k}`).join(', ')},
.st-loud .e051-loud, .st-clap .e051-clapfx, .st-sign .e051-sign, .st-bow .e051-bow { opacity: 1; }
.e051-wave { opacity: 0; } .st-loud .e051-wave, .st-clap .e051-wave { animation: e051Wave .6s ease-out infinite; }
@keyframes e051Wave { from { opacity: 0; transform: translateX(-4px); } 30% { opacity: 1; } to { opacity: 0; transform: translateX(8px); } }
.st-sign .e051-sign { animation: e051Wave2 .4s ease-in-out infinite alternate; }
@keyframes e051Wave2 { from { transform: translate(1826px, 104px) rotate(-8deg); } to { transform: translate(1826px, 96px) rotate(8deg); } }
.e051-bub { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-b-well .e051-b-well, .st-b-next .e051-b-next { opacity: 1; transform: scale(1); }
.act-e051slow .pp-upwR { animation: ppRub 2.2s ease-in-out infinite alternate; }
.act-e051slow .pp-upwL { animation: ppRub 2.2s ease-in-out infinite alternate-reverse; }
.act-e051slow .pp-body { animation: e051Lean 2.2s ease-in-out infinite alternate; }
@keyframes e051Lean { from { rotate: -6deg; } to { rotate: 6deg; } }
.act-e051tie .pp-fowR, .act-e051tie .pp-fowL { animation: ppRub .35s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) { .st-sign .e051-sign { animation-duration: 1s; } .act-e051tie .pp-fowR, .act-e051tie .pp-fowL { animation-duration: .7s; } }
`;

const RUNNERS = ['w', 'b1', 'tom', 'b2', 'minh'];
const at = (k, dx) => START[RUNNERS.indexOf(k)] + dx;
/** Chạy: walk không lia camera trừ khi follow. */
const run = (st, id, x, speed, follow = false, lead = 0) => st.walk(id, x, { speed, follow, lead });
/** Hơi thở đều của Minh: phả hơi theo nhịp trong ms. */
async function breathe(st, ms) {
  if (st.instant) return;
  const t0 = performance.now();
  while (performance.now() - t0 < ms) {
    st.fx('bubbles', curX(st, 'minh') + 18, LANE[4] - 98, { quiet: true });
    st.sfx('wind', { vol: 0.25, rate: 1.4 });
    await st.wait(700);
  }
}
/** Vị trí x hiện tại (đơn vị cảnh) của nhân vật đang chạy. */
function curX(st, id) {
  const A = st.a(id);
  const r = A.el.getBoundingClientRect(), w = st.world.getBoundingClientRect();
  return (r.left + r.width / 2 - w.left) / st.u;
}

const BEATS = [
  { key: ['Sports Day', 'a big running race'], icon: '🏃', label: 'Sports Day', async play(st) {
    st.look(420);
    st.sfx('cheer', { vol: 0.5 });
    for (const id of RUNNERS) { st.mood(id, 'joy'); st.act(id, 'hop'); }
    st.pose('hoa', 'wave'); st.act('hoa', 'wave');
    await st.wait(1800);
    for (const id of RUNNERS) { st.act(id, null); st.mood(id, 'happy'); }
    st.act('hoa', null); st.pose('hoa', 'stand');
  } },
  { key: ['tied his shoes carefully', 'stretched his legs slowly'], icon: '👟', label: 'carefully, slowly', async play(st) {
    st.look(390);
    st.pose('minh', 'plant'); st.act('minh', 'e051tie'); st.set('st-lb-careful'); st.sfx('pop', { vol: 0.5 });
    st.pose('tom', 'stretch'); st.act('tom', 'e051slow');
    await st.wait(400);
    st.set('st-lb-slow1'); st.sfx('pop', { vol: 0.5, rate: 1.1 });
    await st.wait(1200);
    st.set('st-bow'); st.sfx('ding', { vol: 0.5 }); st.fx('sparkle', START[4] - 4, LANE[4] - 6, { quiet: true });
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'joy');
  } },
  { key: ['blew the whistle loudly'], icon: '📣', label: 'whistle', async play(st) {
    st.set('st-lb-careful', false); st.set('st-lb-slow1', false); st.act('tom', null); st.pose('tom', 'stand'); st.set('st-bow', false); st.mood('minh', 'happy');
    st.look(380);
    for (const id of RUNNERS) st.pose(id, 'e051_ready');
    st.hold('hoa', 'e051_whistle'); st.pose('hoa', 'e051_blow');
    await st.wait(500);
    st.set('st-loud'); st.set('st-lb-loud'); st.sfx('whistle');
    await st.wait(700);
    st.sfx('cheer', { vol: 0.4 });
    await st.wait(700);
    st.set('st-loud', false);
  } },
  { key: ['started very fast', 'ran slowly'], icon: '🐇', label: 'fast, then slowly', async play(st) {
    st.set('st-lb-loud', false); st.hold('hoa', null); st.pose('hoa', 'cheer');
    const tom = (async () => {
      await run(st, 'tom', 780, 300, true, 80);
      st.set('st-lb-fast', false); st.set('st-lb-tired'); st.sfx('pop', { vol: 0.5 });
      st.mood('tom', 'shut'); st.sfx('cough', { vol: 0.5 });
      await run(st, 'tom', 860, 60, true, -60);
      st.fx('drops', 866, LANE[2] - 108);
    })();
    st.set('st-lb-fast'); st.sfx('whoosh', { vol: 0.6 });
    await Promise.all([tom, run(st, 'w', at('w', 580), 200), run(st, 'b1', at('b1', 530), 180), run(st, 'b2', at('b2', 500), 170), run(st, 'minh', at('minh', 400), 140)]);
    st.pose('tom', 'e051_tired');
  } },
  { key: ['ran steadily', 'breathed calmly'], icon: '🫁', label: 'steadily', async play(st) {
    st.set('st-lb-tired', false); st.set('st-lb-fast', false);
    st.set('st-lb-steady'); st.set('st-lb-calm'); st.sfx('pop', { vol: 0.5 });
    await Promise.all([
      run(st, 'minh', at('minh', 600), 130, true, 60),
      breathe(st, 1500),
      run(st, 'tom', 900, 30), run(st, 'b1', at('b1', 670), 100), run(st, 'b2', at('b2', 720), 150), run(st, 'w', at('w', 800), 150),
    ]);
    st.fx('bubbles', at('minh', 600) + 18, LANE[4] - 98, { quiet: true });
  } },
  { key: ['passed Tom and two other boys'], icon: '💨', label: 'passed', async play(st) {
    st.set('st-lb-steady', false); st.set('st-lb-calm', false);
    await Promise.all([
      run(st, 'minh', at('minh', 1060), 170, true, 40),
      (async () => { await st.wait(1300); st.sfx('whoosh', { vol: 0.7 }); })(),
      run(st, 'tom', 960, 22), run(st, 'b1', at('b1', 900), 82), run(st, 'b2', at('b2', 970), 92), run(st, 'w', at('w', 1150), 130),
    ]);
    st.set('st-lb-pass'); st.mood('minh', 'joy'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
  } },
  { key: ['finished second'], icon: '🥈', label: 'second', async play(st) {
    st.set('st-lb-pass', false);
    await Promise.all([
      (async () => { await run(st, 'w', 1772, 160); st.sfx('whistle', { vol: 0.5 }); })(),
      (async () => { await st.wait(300); await run(st, 'minh', 1640, 150, true, 0); })(),
      run(st, 'b1', 1700, 120),
      run(st, 'b2', 1530, 110),
      run(st, 'tom', 1100, 40),
    ]);
    st.set('st-lb-first'); st.set('st-lb-second'); st.sfx('ding', { vol: 0.6 }); st.sfx('cheer', { vol: 0.6 });
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.pose('w', 'cheer');
    await st.wait(1200);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['finished last', 'smiled happily'], icon: '😊', label: 'smiled happily', async play(st) {
    st.set('st-lb-first', false); st.set('st-lb-second', false); st.pose('w', 'stand');
    st.mood('tom', 'happy'); st.pose('tom', 'walk');
    await run(st, 'tom', 1586, 140, true, 0);
    st.mood('tom', 'joy'); st.set('st-lb-happy'); st.pose('tom', 'open'); st.act('tom', 'hop'); st.sfx('giggle', { vol: 0.6 });
    await st.wait(1300);
    st.act('tom', null);
  } },
  { key: ['You ran really well'], icon: '👍', label: 'really well', async play(st) {
    st.set('st-lb-happy', false);
    st.look(1620);
    st.face('tom', 1); st.face('minh', -1);
    st.set('st-b-well'); st.sfx('pop', { vol: 0.5 }); st.talk('tom', true); st.pose('tom', 'raise'); st.pose('minh', 'raise');
    await st.wait(700);
    st.fx('sparkle', 1612, 150); st.sfx('hearts', { vol: 0.4 });
    st.mood('minh', 'joy');
    await st.wait(900);
    st.talk('tom', false); st.pose('minh', 'stand'); st.pose('tom', 'stand');
  } },
  { key: ["won't start so fast"], icon: '🐢', label: 'not so fast', async play(st) {
    st.set('st-b-well', false);
    st.set('st-b-next'); st.sfx('pop', { vol: 0.5 }); st.pose('tom', 'think'); st.talk('tom', true);
    await st.wait(1500);
    st.talk('tom', false); st.act('tom', 'nod');
    await st.wait(600);
    st.act('tom', null);
  } },
  { key: ['clapped loudly', 'cheered for her brother'], icon: '👏', label: 'clapped, cheered', async play(st) {
    st.set('st-b-next', false); st.pose('tom', 'stand');
    st.look(1740, { dur: 600 });
    for (const id of ['mum', 'dad', 'p1', 'p2']) { st.pose(id, 'clap'); st.act(id, 'clap'); st.mood(id, 'joy'); }
    st.set('st-clap'); st.set('st-lb-loud2'); st.sfx('clap', { vol: 0.8 });
    await st.wait(900);
    st.pose('lan', 'cheer'); st.act('lan', 'jump'); st.mood('lan', 'joy'); st.set('st-sign'); st.sfx('cheer', { vol: 0.7 });
    await st.wait(1300);
  } },
  { key: ['very proud'], icon: '🏅', label: 'very proud', async play(st) {
    st.set('st-lb-loud2', false); st.set('st-clap', false);
    for (const id of ['mum', 'dad', 'p1', 'p2']) { st.act(id, null); st.pose(id, 'stand'); }
    st.act('lan', null); st.pose('lan', 'stand'); st.set('st-sign', false);
    st.face('minh', 1);
    st.fx('poof', 1640, LANE[4] - 70);
    st.chest('minh', MEDAL);
    await st.wait(300);
    st.sfx('ding', { vol: 0.6 });
    st.pose('minh', 'e051_proud'); st.mood('minh', 'joy'); st.set('st-lb-proud');
    st.fx('sparkle', 1640, LANE[4] - 80);
    await st.wait(700);
    st.fx('hearts', 1640, LANE[4] - 120);
    await st.wait(1200);
  } },
];

export default {
  id: 'en051', worldW: 2000, floor: FLOOR, viewTop: 40, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e051_ready: { R: [-24, -40], L: [30, 50], head: 6, dy: 4 },
    e051_blow: { R: [120, 252], L: [10, 4], head: -4 },
    e051_tired: { R: [8, -40], L: [8, -40], head: 14, dy: 6 },
    e051_proud: { R: [70, -40], L: [150, 172], head: -6 },
  },
  props: { e051_whistle: WHISTLE },
  cast: [
    { id: 'p2', kind: 'adult', who: 'e051_p2', x: 1940, y: 162, s: 0.68, face: -1 },
    { id: 'p1', kind: 'adult', who: 'e051_p1', x: 1716, y: 184, s: 0.7 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1766, y: 184, s: 0.7 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1826, y: 184, s: 0.8 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 1886, y: 184, s: 0.7, face: -1 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 200, y: 232, s: 0.9 },
    { id: 'w', kind: 'kid', who: 'e051_b3', x: START[0], y: LANE[0], s: 0.86 },
    { id: 'b1', kind: 'kid', who: 'e051_b1', x: START[1], y: LANE[1], s: 0.9 },
    { id: 'tom', kind: 'kid', who: 'e051_tom', x: START[2], y: LANE[2], s: 0.94 },
    { id: 'b2', kind: 'kid', who: 'e051_b2', x: START[3], y: LANE[3], s: 0.98 },
    { id: 'minh', kind: 'kid', who: 'e051_minh', x: START[4], y: LANE[4], s: 1.02 },
  ],
  init(st) {
    st.look(420, { instant: true });
    [['w', 1], ['b1', 4], ['tom', 7], ['minh', 3], ['b2', 5]].forEach(([id, n]) => st.chest(id, BIB(n)));
  },
};
