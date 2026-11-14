/**
 * Bài 84 "She Asked Me Why" (câu hỏi tường thuật: asked me how old I was, when I had started, why, whether, if). Đi từ trái
 * sang phải: phòng mĩ thuật ở trường (cửa, tranh con vật của học sinh trên tường, giá vẽ của Minh) → cửa nhà → phòng khách
 * (sofa: bố, mẹ, Lan; thảm: Lucky; ghế bành của Minh; Kitty ngồi cạnh kệ sách).
 * Câu hỏi của cô nhà báo được Minh kể lại hiện trong bong bóng nhớ lại có đầu cô và nhãn "Journalist", kèm câu hỏi gốc
 * (lời nói trực tiếp, trong ngoặc kép) và hình trả lời: bánh sinh nhật số 11, Minh lúc nhỏ vẽ bằng bút sáp, bức tranh Lucky
 * và Kitty, Minh lớn lên làm hoạ sĩ, bìa tạp chí có tranh Lucky. Việc thật (cô đến trường, phỏng vấn, Minh kể, Lan tò mò,
 * bố cười, mẹ ôm) thì nhân vật làm thật.
 * Toạ độ cảnh: rộng 1800, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, windowBox, thought, speaker, shelf, books, rug } from '../kit.js';

const FLOOR = 282;
const W = 1800;
const X = { sdoor: 70, jour: 330, minhS: 486, easel: 548, wall: 760, hdoor: 900, dad: 1150, mum: 1200, lan: 1254, sofa: 1202, lucky: 1322, chair: 1404, kitty: 1560 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e084_jour: { adult: true, hair: 'bob', hairC: '#7C2D12', top: 'blouse', shirt: '#14B8A6', bottom: 'pants', bottomC: '#334155', shoe: '#1F2937' },
});

// ── Đồ vật (gốc ở giữa) ────────────────────────────────────────────────────
const MAG = (pic = '') => `<rect x="-17" y="-22" width="34" height="44" rx="2" fill="#FDE047" stroke="${L}" stroke-width="1"/><rect x="-17" y="-22" width="34" height="11" fill="#EF4444"/>
  <text y="-13.6" text-anchor="middle" ${NUN} font-size="8" fill="#fff">KIDS</text><rect x="-13" y="-8" width="26" height="26" rx="2" fill="#fff" stroke="${L}" stroke-width="0.6"/>${pic}`;
/** Tranh Lucky của Minh (gốc ở giữa, cỡ ≈ 24). */
const DOGPIC = `<g transform="translate(0 6) scale(0.34)"><ellipse cx="0" cy="-10" rx="28" ry="14" fill="#B7794A" stroke="${L}" stroke-width="2"/><circle cx="28" cy="-24" r="13" fill="#B7794A" stroke="${L}" stroke-width="2"/>
  <ellipse cx="38" cy="-20" rx="8" ry="6" fill="#F5E6D3"/><circle cx="44" cy="-22" r="3" fill="#2B1D16"/><circle cx="30" cy="-28" r="2.4" fill="#2B1D16"/><path d="M20 -30 Q12 -26 14 -14" stroke="#7A4B2A" stroke-width="5" fill="none"/>
  <path d="M-18 0 V18 M-8 0 V18 M10 0 V18 M20 0 V18" stroke="#B7794A" stroke-width="6" stroke-linecap="round"/><path d="M-26 -14 Q-40 -20 -40 -32" stroke="#B7794A" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
const CATPIC = `<g transform="translate(0 6) scale(0.34)"><ellipse cx="0" cy="-8" rx="22" ry="12" fill="#fff" stroke="${L}" stroke-width="2"/><circle cx="22" cy="-22" r="11" fill="#fff" stroke="${L}" stroke-width="2"/>
  <path d="M14 -30 L14 -42 L22 -32 M24 -32 L32 -42 L32 -28" fill="#fff" stroke="${L}" stroke-width="2"/><circle cx="25" cy="-23" r="2.4" fill="#22C55E"/>
  <path d="M-12 2 V16 M-2 2 V16 M8 2 V16 M16 2 V16" stroke="#94A3B8" stroke-width="5" stroke-linecap="round"/><path d="M-20 -10 Q-36 -14 -32 -32" stroke="#E2E8F0" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
const CAKE = `<rect x="-20" y="-6" width="40" height="22" rx="3" fill="#F9A8D4" stroke="${L}" stroke-width="1"/><path d="M-20 0 Q-14 6 -8 0 Q-2 6 4 0 Q10 6 20 0" stroke="#fff" stroke-width="2.4" fill="none"/>
  <text y="13" text-anchor="middle" ${NUN} font-size="11" fill="#BE185D">11</text>
  ${[-10, 0, 10].map((x) => `<rect x="${x - 1.6}" y="-16" width="3.2" height="10" fill="#93C5FD" stroke="${L}" stroke-width="0.5"/><path class="e084-flame" d="M${x} -16 q-3 -4 0 -8 q3 4 0 8Z" fill="#F97316"/>`).join('')}`;
const PROPS = {
  e084_mic: `<g transform="rotate(200)"><rect x="-2" y="-2" width="4" height="16" rx="1.5" fill="#1F2937" stroke="${L}" stroke-width="0.6"/><circle cy="18" r="5.4" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/></g>`,
  e084_pad: `<g transform="translate(0 -4)"><rect x="-8" y="-11" width="16" height="20" rx="1.5" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M-5 -6 H5 M-5 -2 H5 M-5 2 H3" stroke="#94A3B8" stroke-width="0.9"/></g>`,
};
const POSES = {
  e084_ask: { R: [70, 80], L: [24, -86], head: -4 },
  e084_tell: { R: [70, 120], L: [40, 110], dy: 20, head: -4 },
  e084_yes: { R: [150, 172], L: [150, 172], dy: 20 },
  e084_point: { R: [84, 92], L: [40, 110], dy: 20 },
  e084_lean: { R: [40, 110], L: [40, 110], dy: 14, head: -14 },
  e084_lpoint: { R: [84, 92], L: [40, 110], dy: 14 },
  e084_lsit: { R: [40, 110], L: [40, 110], dy: 14 },
  e084_sit: { R: [40, 110], L: [40, 110], dy: 34 },
  e084_shrug: { R: [50, 130], L: [50, 130], dy: 34, head: -5 },
  e084_laugh: { R: [30, -96], L: [30, -96], dy: 34, head: -6 },
  e084_hug: { R: [62, 84], L: [24, -86], head: 10 },
  e084_close: { R: [10, 4], L: [10, 4], head: -10 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const frame = (x, y, inner, c = '#fff') => `<g transform="translate(${x} ${y})"><rect x="-22" y="-18" width="44" height="36" rx="2" fill="${c}" stroke="${L}" stroke-width="1"/><g transform="translate(0 -4) scale(1.2)">${inner}</g></g>`;
function bg() {
  return `
  <!-- phòng mĩ thuật -->
  ${room(0, X.wall, FLOOR, '#ECFCCB')}
  <rect x="${X.sdoor - 24}" y="128" width="48" height="${FLOOR - 128}" fill="#7C2D12" stroke="${L}"/>
  <g class="e084-sd"><rect x="${X.sdoor - 22}" y="130" width="44" height="${FLOOR - 130}" fill="#22C55E" stroke="${L}"/><circle cx="${X.sdoor + 14}" cy="${FLOOR - 70}" r="2.6" fill="#FDE68A"/></g>
  <rect x="140" y="54" width="170" height="24" rx="5" fill="#fff" stroke="${L}"/><text x="225" y="71" text-anchor="middle" ${NUN} font-size="14" fill="#16A34A">ART ROOM</text>
  ${frame(170, 120, DOGPIC)}${frame(240, 112, CATPIC, '#FEF9C3')}${frame(390, 116, `<circle r="8" fill="#FDE047" stroke="${L}"/>`, '#E0F2FE')}
  ${windowBox(600, 70, 96, 86)}
  <!-- giá vẽ của Minh -->
  <g transform="translate(${X.easel} ${FLOOR})"><path d="M-22 0 L0 -130 L22 0 M0 -130 V0" stroke="#A16207" stroke-width="4"/>
    <rect x="-34" y="-122" width="68" height="56" fill="#fff" stroke="${L}" stroke-width="1.2"/><g transform="translate(0 -96) scale(1.8)">${DOGPIC}</g>
    <rect x="-38" y="-66" width="76" height="6" fill="#B45309" stroke="${L}"/></g>
  <!-- ngoài trời giữa trường và nhà -->
  ${sky(X.wall, X.hdoor - X.wall - 40, 315, 'e084sky')}${cloud(820, 70, 0.6, 0)}
  ${tree(830, FLOOR, 0.7)}
  <rect x="${X.wall}" y="${FLOOR}" width="${X.hdoor - X.wall - 40}" height="33" fill="#86EFAC" stroke="${L}"/>
  <!-- phòng khách -->
  ${room(X.hdoor - 40, W - X.hdoor + 40, FLOOR, '#FEF3C7', '#D9A066')}
  <rect x="${X.hdoor - 40}" y="0" width="10" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${X.hdoor - 24}" y="128" width="48" height="${FLOOR - 128}" fill="#7C2D12" stroke="${L}"/>
  <g class="e084-hd"><rect x="${X.hdoor - 22}" y="130" width="44" height="${FLOOR - 130}" fill="#B45309" stroke="${L}"/><circle cx="${X.hdoor + 14}" cy="${FLOOR - 70}" r="2.6" fill="#FDE68A"/></g>
  ${windowBox(990, 66, 96, 86)}
  <g transform="translate(${X.sofa} 96)"><rect x="-34" y="-26" width="68" height="50" rx="2" fill="#fff" stroke="${L}"/><g transform="translate(0 0) scale(1.9)">${CATPIC}</g></g>
  ${shelf(1610, 140, 120, books(1620, 140, 6) + `<g transform="translate(1712 140)"><path d="M-7 0 L-5 -14 H5 L7 0Z" fill="#60A5FA" stroke="${L}" stroke-width="0.7"/></g>`)}
  ${shelf(1610, 196, 120, books(1626, 196, 4))}
  <rect x="1606" y="200" width="128" height="${FLOOR - 200}" fill="#B45309" stroke="${L}"/>
  ${rug(X.lucky + 20, FLOOR, 170, '#FDA4AF')}
  <!-- sofa (lưng ghế) -->
  <rect x="${X.sofa - 92}" y="${FLOOR - 92}" width="184" height="62" rx="16" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.sofa - 100}" y="${FLOOR - 40}" width="200" height="40" rx="8" fill="#2563EB" stroke="${L}" stroke-width="1.2"/>
  <!-- ghế bành của Minh -->
  <g transform="translate(${X.chair} ${FLOOR})"><rect x="-32" y="-88" width="64" height="60" rx="14" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/>
    <rect x="-38" y="-36" width="76" height="36" rx="8" fill="#D97706" stroke="${L}" stroke-width="1.2"/></g>`;
}

function fg() {
  const jHead = `<g transform="translate(-90 16)">${headOnly('e084_jour', { s: 0.7, mood: 'happy' })}</g>${speaker(-90, -8, 'She', '#0D9488')}`;
  const q = (l1, l2 = '') => `<text x="24" y="${l2 ? -30 : -22}" text-anchor="middle" ${NUN} font-size="14" fill="#0F766E">${l1}</text>${l2 ? `<text x="24" y="-13" text-anchor="middle" ${NUN} font-size="14" fill="#0F766E">${l2}</text>` : ''}`;
  const inner = `<rect x="-118" y="-44" width="236" height="90" rx="14" fill="#F0FDFA"/>${jHead}
    <g class="e084-in e084-in-age">${q('"How old are you?"')}<g class="e084-pop"><g transform="translate(24 16) scale(1.1)">${CAKE}</g></g></g>
    <g class="e084-in e084-in-when">${q('"When did you', 'start drawing?"')}<g transform="translate(-12 24)">${headOnly('en_minh_home', { s: 0.46, mood: 'joy' })}</g>
      <g transform="translate(46 22)"><rect x="-24" y="-14" width="48" height="30" fill="#fff" stroke="${L}" stroke-width="0.8"/>
        <g class="e084-crayon"><circle cx="-10" cy="-3" r="6" fill="none" stroke="#F59E0B" stroke-width="2.4"/><path d="M4 9 L11 -7 L18 9 Z M-19 12 H19" stroke="#EF4444" stroke-width="2" fill="none"/></g></g></g>
    <g class="e084-in e084-in-why">${q('"Why do you love', 'painting animals?"')}
      <g transform="translate(24 24)"><rect x="-40" y="-16" width="80" height="34" fill="#fff" stroke="${L}" stroke-width="0.9"/><g class="e084-paint"><g transform="translate(-16 2) scale(1.1)">${DOGPIC}</g><g transform="translate(18 4) scale(1.1)">${CATPIC}</g></g></g></g>
    <g class="e084-in e084-in-future">${q('"Do you want to be', 'an artist?"')}
      <g class="e084-grow"><g transform="translate(-12 24)">${headOnly('en_minh', { s: 0.5, mood: 'joy' })}<path d="M-11 -11 Q0 -22 11 -11 Q2 -15 -11 -11Z" fill="#DC2626" stroke="${L}" stroke-width="0.7"/></g></g>
      <g transform="translate(40 18)"><path d="M-12 24 L0 -10 L12 24" stroke="#A16207" stroke-width="2.2" fill="none"/><rect x="-17" y="-12" width="34" height="24" fill="#fff" stroke="${L}" stroke-width="0.8"/><g transform="translate(0 -4) scale(0.8)">${DOGPIC}</g></g>
      <text x="90" y="30" text-anchor="middle" ${NUN} font-size="12" fill="#7C3AED">future</text></g>
    <g class="e084-in e084-in-mag">${q('"Can I put your picture', 'in the magazine?"')}
      <g class="e084-cover"><g transform="translate(24 22) scale(0.62)">${MAG(DOGPIC)}</g></g></g>`;
  const qm = `<g class="e084-qm">${[[-16, 0], [0, -10], [16, 0]].map(([x, y], i) => `<text class="e084-q" style="animation-delay:${i * 0.2}s" x="${X.lan + x}" y="${142 + y}" text-anchor="middle" ${NUN} font-size="20" fill="#7C3AED">?</text>`).join('')}</g>`;
  return `
  ${bush(X.wall + 40, FLOOR + 30, 0.5)}
  <!-- đệm sofa và ghế bành phía trước (che chân người ngồi) -->
  <rect x="${X.sofa - 100}" y="${FLOOR - 46}" width="200" height="46" rx="8" fill="#2563EB" stroke="${L}" stroke-width="1.2"/>
  <rect x="${X.sofa - 108}" y="${FLOOR - 62}" width="18" height="62" rx="8" fill="#3B82F6" stroke="${L}"/><rect x="${X.sofa + 90}" y="${FLOOR - 62}" width="18" height="62" rx="8" fill="#3B82F6" stroke="${L}"/>
  <rect x="${X.chair - 30}" y="${FLOOR - 34}" width="60" height="34" rx="6" fill="#D97706" stroke="${L}"/>
  <rect x="${X.chair - 42}" y="${FLOOR - 52}" width="14" height="52" rx="6" fill="#F59E0B" stroke="${L}"/><rect x="${X.chair + 28}" y="${FLOOR - 52}" width="14" height="52" rx="6" fill="#F59E0B" stroke="${L}"/>
  <!-- bong bóng nghĩ của cô nhà báo: viết về hoạ sĩ nhí -->
  ${thought(200, 110, 210, 104, `<g transform="translate(-40 6)"><ellipse rx="26" ry="18" fill="#FDE68A" stroke="${L}"/>${['#EF4444', '#3B82F6', '#22C55E', '#A855F7'].map((c, i) => `<circle cx="${-14 + i * 8}" cy="${-6 + (i % 2) * 8}" r="4" fill="${c}"/>`).join('')}<circle cx="12" cy="8" r="5" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>
    <g transform="translate(26 10)">${[-18, 0, 18].map((x, i) => `<g transform="translate(${x} 0)">${headOnly(['en_minh', 'en_lan', 'en_tom'][i], { s: 0.4, mood: 'joy' })}</g>`).join('')}</g>
    <text x="22" y="-18" text-anchor="middle" ${NUN} font-size="13" fill="#0D9488">young artists</text>`, [X.jour - 6, 122], 'e084-jt')}
  ${thought(1440, 112, 270, 112, inner, [X.chair + 4, 176], 'e084-mem')}
  ${qm}
  <!-- nhãn -->
  <g class="e084-lb e084-lb-week">${label(230, 104, 'Last week', '#EA580C', 15)}</g>
  <g class="e084-lb e084-lb-home">${label(1040, 64, 'At home', '#16A34A', 16)}</g>
  <g class="e084-lb e084-lb-int">${label(430, 64, 'interview', '#0D9488', 15)}</g>`;
}

const CSS = `
.e084-lb { opacity: 0; transition: opacity .35s; }
.st-lb-week .e084-lb-week, .st-lb-home .e084-lb-home, .st-lb-int .e084-lb-int { opacity: 1; }
.e084-sd { transform-origin: ${X.sdoor - 22}px 0; transition: transform .45s; }
.st-sdoor .e084-sd { transform: scaleX(.15); }
.e084-hd { transform-origin: ${X.hdoor - 22}px 0; transition: transform .45s; }
.st-hdoor .e084-hd { transform: scaleX(.15); }
.e084-jt, .e084-mem { opacity: 0; transform: scale(.4); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.e084-jt { transform-origin: ${X.jour}px 130px; } .e084-mem { transform-origin: ${X.chair}px 176px; }
.st-jt .e084-jt, .st-mem .e084-mem { opacity: 1; transform: none; }
.e084-in { opacity: 0; transition: opacity .3s; }
${['age', 'when', 'why', 'future', 'mag'].map((k) => `.st-${k} .e084-in-${k}`).join(', ')} { opacity: 1; }
.e084-pop { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .2s, transform .45s cubic-bezier(.3,1.6,.6,1); }
.st-age2 .e084-pop { opacity: 1; transform: none; }
.e084-flame { transform-box: fill-box; transform-origin: 50% 100%; animation: e084Flame .3s ease-in-out infinite alternate; }
@keyframes e084Flame { to { transform: scale(.8, 1.15); } }
.e084-crayon { clip-path: inset(0 100% 0 0); }
.st-when .e084-crayon { clip-path: inset(0 0 0 0); transition: clip-path 2s linear .4s; }
.e084-paint { clip-path: inset(0 100% 0 0); }
.st-why .e084-paint { clip-path: inset(0 0 0 0); transition: clip-path 1.8s linear .3s; }
.e084-grow { transform: scale(.6); transform-box: fill-box; transform-origin: 50% 100%; opacity: .4; }
.st-future .e084-grow { transform: none; opacity: 1; transition: transform 1.2s ease-out .3s, opacity 1.2s .3s; }
.e084-cover { opacity: 0; transform: rotate(-30deg) scale(.4); transform-box: fill-box; transform-origin: 50% 50%; }
.st-cover .e084-cover { opacity: 1; transform: none; transition: opacity .2s, transform .5s cubic-bezier(.3,1.5,.6,1); }
.e084-qm { opacity: 0; transition: opacity .3s; } .st-qm .e084-qm { opacity: 1; }
.e084-q { transform-box: fill-box; transform-origin: 50% 100%; }
.st-qm .e084-q { animation: e084Q .5s ease-in-out infinite alternate; }
@keyframes e084Q { from { transform: translateY(2px) rotate(-8deg); } to { transform: translateY(-6px) rotate(8deg); } }
@media (prefers-reduced-motion: reduce) { .e084-flame, .st-qm .e084-q { animation-duration: 1.2s; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const talk = async (st, id, ms) => { st.talk(id, true); await st.wait(ms); st.talk(id, false); };
const FAM = ['dad', 'mum', 'lan'];
/** Minh kể lại câu hỏi k của cô nhà báo (bong bóng nhớ lại). */
const recall = (st, k) => {
  off(st, 'st-age', 'st-age2', 'st-when', 'st-why', 'st-future', 'st-mag', 'st-cover');
  st.set('st-mem'); st.set(`st-${k}`);
  st.pose('minh', 'e084_tell'); st.mood('minh', 'joy');
};

const BEATS = [
  { key: ['a journalist from a children\'s magazine', "came to Minh's school"], icon: '📰', label: 'a journalist', async play(st) {
    st.look(300);
    st.set('st-lb-week');
    st.hold('minh', 'paintbrush'); st.pose('minh', 'paint'); st.act('minh', 'paint');
    st.set('st-sdoor'); st.sfx('door-open', { vol: 0.6 });
    st.show('jour', true);
    await st.walk('jour', X.jour, { speed: 110, follow: false });
    st.set('st-sdoor', false);
    st.pose('jour', 'wave'); st.act('jour', 'wave'); st.mood('jour', 'joy'); st.sfx('page-turn', { vol: 0.4 });
    await st.wait(1100);
    st.act('jour', null); st.pose('jour', 'carry');
  } },
  { key: ['write about young artists', 'she interviewed Minh'], icon: '🎤', label: 'interviewed Minh', async play(st) {
    st.set('st-lb-week', false);
    st.look(300);
    st.act('minh', 'paint'); st.sfx('paint', { vol: 0.4 });
    st.set('st-jt'); st.sfx('pop', { vol: 0.5 }); st.pose('jour', 'think');
    await st.wait(1500);
    st.set('st-jt', false);
    st.chest('jour', null); st.hold('jour', 'e084_mic'); st.pose('jour', 'stand');
    st.look(420);
    await st.walk('jour', 420, { speed: 110, follow: false });
    st.act('minh', null); st.hold('minh', null); st.face('minh', -1); st.pose('minh', 'stand');
    st.pose('jour', 'e084_ask'); st.set('st-lb-int');
    const t = talk(st, 'minh', 1600);
    await st.wait(300);
    await st.loop('pencil', () => st.wait(1200), { vol: 0.6 });
    await t;
  } },
  { key: ['At home', 'told his family about it'], icon: '🛋️', label: 'told his family', async play(st) {
    st.set('st-lb-int', false);
    st.place('minh', X.hdoor - 60, FLOOR, 1); st.mood('minh', 'joy'); st.pose('minh', 'stand');
    st.look(X.hdoor + 140, { instant: true });
    st.set('st-lb-home'); st.set('st-hdoor'); st.sfx('door-open', { vol: 0.6 });
    await st.walk('minh', X.chair, { speed: 130, lead: -40 });
    st.set('st-hdoor', false);
    st.face('minh', -1); st.pose('minh', 'sit'); st.sfx('bump', { vol: 0.3 });
    for (const id of FAM) st.mood(id, 'joy');
    st.pose('minh', 'e084_tell'); st.act('minh', 'hop');
    await talk(st, 'minh', 1200);
    st.act('minh', null);
  } },
  { key: ['she asked me how old I was'], icon: '🎂', label: 'how old I was', async play(st) {
    st.set('st-lb-home', false);
    st.look(st.VW < 420 ? 1440 : 1360);
    recall(st, 'age'); st.sfx('pop', { vol: 0.5 });
    const t = talk(st, 'minh', 2200);
    await st.wait(1000);
    st.set('st-age2'); st.sfx('ding', { vol: 0.5 });
    await t;
  } },
  { key: ['when I had started drawing'], icon: '🖍️', label: 'when I started', async play(st) {
    recall(st, 'when');
    const t = talk(st, 'minh', 2400);
    await st.wait(400);
    await st.loop('pencil', () => st.wait(2000), { vol: 0.7 });
    await t;
  } },
  { key: ['Lan was curious'], icon: '❓', label: 'Lan was curious', async play(st) {
    off(st, 'st-when', 'st-mem');
    st.pose('minh', 'sit');
    st.pose('lan', 'e084_lean'); st.mood('lan', 'wow');
    st.set('st-qm'); st.sfx('pop', { vol: 0.5 });
    await st.wait(400); st.sfx('pop', { vol: 0.4, rate: 1.3 });
    await st.wait(1000);
  } },
  { key: ['Did she ask you why you liked drawing'], icon: '🙋', label: 'Lan asked', async play(st) {
    st.set('st-qm', false);
    st.pose('lan', 'e084_lpoint'); st.mood('lan', 'joy'); st.sfx('pop', { vol: 0.4 });
    await st.say('lan', 'Did she ask you why you liked drawing?', 2600);
    st.pose('lan', 'e084_lsit');
  } },
  { key: ['Yes'], icon: '✅', label: 'Yes!', async play(st) {
    st.act('minh', 'nod'); st.mood('minh', 'joy');
    await st.wait(300);
    st.pose('minh', 'e084_yes'); st.sfx('ding', { vol: 0.6 });
    await st.say('minh', 'Yes!', 1000);
    st.act('minh', null);
  } },
  { key: ['why I loved painting animals', 'because of Lucky and Kitty'], icon: '🐶', label: 'Lucky and Kitty', async play(st) {
    recall(st, 'why'); st.sfx('pop', { vol: 0.4 });
    const t = talk(st, 'minh', 3800);
    await st.loop('paint', () => st.wait(1900), { vol: 0.6 });
    st.pose('minh', 'e084_point'); st.face('minh', -1);
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.mood('lucky', 'joy'); st.sfx('dog-bark', { vol: 0.7 });
    await st.wait(700);
    st.dog('kitty', 'stand'); st.act('kitty', 'jump'); st.mood('kitty', 'joy'); st.sfx('meow', { vol: 0.7 });
    await t;
    st.act('lucky', null); st.act('kitty', null); st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
    st.act('lucky', 'wag');
  } },
  { key: ['Dad laughed'], icon: '😄', label: 'Dad laughed', async play(st) {
    off(st, 'st-why', 'st-mem');
    st.pose('minh', 'sit');
    st.mood('dad', 'joy'); st.pose('dad', 'e084_laugh'); st.act('dad', 'hop'); st.sfx('giggle', { vol: 0.7 });
    await st.wait(1400);
    st.act('dad', null); st.pose('dad', 'e084_sit');
  } },
  { key: ['What else did she want to know'], icon: '🤷', label: 'What else?', async play(st) {
    st.pose('dad', 'e084_shrug'); st.mood('dad', 'happy'); st.sfx('pop', { vol: 0.4 });
    await st.say('dad', 'What else did she want to know?', 2400);
    st.pose('dad', 'e084_sit');
  } },
  { key: ['whether I wanted to be an artist', 'in the future'], icon: '🎨', label: 'an artist', async play(st) {
    recall(st, 'future'); st.sfx('whoosh', { vol: 0.5 });
    const t = talk(st, 'minh', 3000);
    await st.wait(1500); st.sfx('paint', { vol: 0.5 });
    await st.wait(600);
    st.mood('mum', 'wow'); st.mood('lan', 'wow');
    await t;
  } },
  { key: ['put my picture of Lucky in the magazine'], icon: '📖', label: 'in the magazine', async play(st) {
    recall(st, 'mag');
    const t = talk(st, 'minh', 3200);
    await st.wait(1200);
    st.set('st-cover'); st.sfx('page-turn', { vol: 0.7 });
    await st.wait(500);
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.sfx('dog-bark', { vol: 0.7 });
    for (const id of FAM) st.mood(id, 'joy');
    await t;
    st.act('lucky', null); st.act('lucky', 'wag');
  } },
  { key: ['Mum hugged him proudly'], icon: '🤗', label: 'hugged him', async play(st) {
    off(st, 'st-mag', 'st-cover', 'st-mem');
    st.pose('minh', 'stand'); st.mood('minh', 'joy');
    st.look(st.VW < 420 ? 1440 : 1360);
    await st.walk('mum', X.chair + 34, { speed: 120, follow: false });
    st.face('mum', -1); st.pose('mum', 'e084_hug'); st.pose('minh', 'e084_close');
    st.mood('mum', 'joy');
    st.fx('hearts', X.chair + 14, 120);
    await st.wait(1500);
  } },
];

export default {
  id: 'en084', worldW: W, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 2, 3, 8, 13],
  cast: [
    { id: 'jour', kind: 'adult', who: 'e084_jour', x: X.sdoor - 10 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.dad },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.lan, s: 1.08, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.minhS },
    { id: 'lucky', kind: 'dog', x: X.lucky, s: 0.85, face: 1 },
    { id: 'kitty', kind: 'cat', x: X.kitty, s: 0.9, face: -1 },
  ],
  init(st) {
    st.show('jour', false);
    st.chest('jour', `<g transform="translate(0 -6)">${MAG()}</g>`);
    st.pose('jour', 'carry');
    st.pose('dad', 'e084_sit'); st.pose('mum', 'e084_sit'); st.pose('lan', 'e084_lsit');
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
  },
};
