/** Tranh thẻ chữ cái (preschool/flash): con dê, con đà điểu, em bé, búp bê, con gà. Vẽ riêng, nét INK; mỗi hình có động tác riêng (CSS bên dưới). */
const INK = '#3F3A40';
const O = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const O3 = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const SH = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="7" fill="#000" opacity=".08"/>`;
const BL = (x, y, rx = 7, ry = 4.5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FDA4AF" opacity=".8"/>`;
const EYE = (x, y, s = 1) => `<g class="p-eye"><ellipse cx="${x}" cy="${y}" rx="${4.5 * s}" ry="${5.5 * s}" fill="${INK}"/><circle cx="${x + 1.5 * s}" cy="${y - 2 * s}" r="${1.6 * s}" fill="#fff"/></g>`;
const TUBE = (d, w, c) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

export const ART = {
  'de': `<svg class="fa fa-de" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(104, 162, 70)}
<g class="p-all"><g class="p-body">
<g class="p-tail"><path d="M48,92 Q30,78 36,64 Q50,68 58,88 Z" fill="#fff" ${O}/></g>
<rect x="66" y="112" width="15" height="48" rx="6" fill="#E7E5E4" ${O}/><rect x="66" y="151" width="15" height="9" rx="3" fill="${INK}"/>
<rect x="144" y="112" width="15" height="48" rx="6" fill="#E7E5E4" ${O}/><rect x="144" y="151" width="15" height="9" rx="3" fill="${INK}"/>
<rect x="50" y="114" width="16" height="48" rx="7" fill="#fff" ${O}/><rect x="50" y="153" width="16" height="9" rx="3" fill="${INK}"/>
<rect x="128" y="114" width="16" height="48" rx="7" fill="#fff" ${O}/><rect x="128" y="153" width="16" height="9" rx="3" fill="${INK}"/>
<ellipse cx="98" cy="104" rx="58" ry="30" fill="#fff" ${O}/>
<path d="M68,86 Q92,78 116,86 Q108,100 88,100 Q72,96 68,86 Z" fill="#E7D3B0"/>
<path d="M58,118 Q98,134 140,120" fill="none" stroke="#E7E5E4" stroke-width="5" stroke-linecap="round"/>
<g class="p-neck">
<path d="M130,90 C136,78 141,70 146,63 L181,74 C173,86 165,96 158,106 Z" fill="#fff"/>
<path d="M131,86 C136,78 141,70 146,63 M181,74 C173,86 165,96 159,104" fill="none" ${O}/>
<path d="M168,56 C162,40 148,32 134,36 C146,42 154,50 158,60 Z" fill="#A8A29E" ${O}/>
<path d="M179,54 C177,38 165,26 150,25 C158,34 166,44 168,58 Z" fill="#A8A29E" ${O}/>
<ellipse cx="154" cy="70" rx="16" ry="7" fill="#fff" transform="rotate(25 154 70)" ${O}/>
<ellipse cx="155" cy="70" rx="8" ry="3" fill="#F9A8D4" transform="rotate(25 155 70)"/>
<g class="p-beard"><path d="M183,92 L181,120 L197,98 Z" fill="#D6D3D1" ${O}/></g>
<path d="M158,62 C160,48 182,46 194,58 C202,66 212,80 208,92 C204,102 190,102 182,96 C170,88 158,78 158,62 Z" fill="#fff" ${O}/>
${EYE(181, 66)}
<ellipse cx="205" cy="86" rx="2.5" ry="2" fill="${INK}"/>
${BL(187, 82, 6, 4)}
<path d="M191,96 Q197,99 202,95" fill="none" ${O3}/>
</g>
</g></g>
</svg>`,

  'da-dieu': `<svg class="fa fa-da-dieu" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(112, 168, 48)}
<g class="p-dust" opacity="0"><circle cx="64" cy="160" r="7" fill="#F5F5F4" ${O3}/><circle cx="50" cy="154" r="5" fill="#F5F5F4" ${O3}/><circle cx="40" cy="162" r="4" fill="#F5F5F4" ${O3}/></g>
<g class="p-run"><g class="p-bob">
<g class="p-legB">${TUBE('M116,94 L122,128', 7, '#F472B6')}<g class="p-shinB">${TUBE('M122,128 L120,166 L134,166', 6, '#F472B6')}</g></g>
<g class="p-legA">${TUBE('M98,94 L92,128', 7, '#F9A8D4')}<g class="p-shinA">${TUBE('M92,128 L98,166 L112,166', 6, '#F9A8D4')}</g></g>
<g class="p-tail"><path d="M54,60 C30,44 22,70 36,76 C22,84 32,102 52,90 Z" fill="#fff" ${O}/></g>
<path d="M48,72 C48,50 76,40 102,42 C132,44 152,58 150,76 C148,96 124,104 98,102 C70,100 48,92 48,72 Z" fill="#57534E" ${O}/>
<path d="M62,86 Q96,102 134,90" fill="none" stroke="#44403C" stroke-width="6" stroke-linecap="round"/>
<g class="p-wing"><path d="M72,60 C96,50 126,54 138,70 C126,84 102,88 82,82 Z" fill="#78716C" ${O3}/>
<path d="M82,82 C76,90 66,92 58,88 C64,98 76,100 88,93 Z" fill="#fff" ${O3}/>
<path d="M90,66 Q108,62 124,70" fill="none" stroke="#A8A29E" stroke-width="3" stroke-linecap="round"/></g>
<g class="p-neck">
${TUBE('M136,62 C152,50 150,40 164,30', 10, '#F9A8D4')}
<ellipse cx="138" cy="58" rx="11" ry="8" fill="#fff" ${O3}/>
<path d="M179,19 L205,27 L179,35 Z" fill="#FDBA74" ${O}/>
<path d="M183,27 L201,27" ${O3}/>
<circle cx="170" cy="26" r="14" fill="#F9A8D4" ${O}/>
${EYE(173, 23, 0.9)}
<path d="M174,14 L175,9 M178,15 L181,11" fill="none" ${O3}/>
${BL(164, 33, 5, 3)}
</g>
</g></g>
</svg>`,

  'em-be': `<svg class="fa fa-em-be" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(120, 168, 70)}
<g class="p-baby">
<path d="M84,104 C70,124 66,152 80,162 L160,162 C174,152 170,124 156,104 Z" fill="#60A5FA" ${O}/>
<path d="M96,134 Q120,142 144,134" fill="none" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>
<path d="M100,104 L100,124 Q120,132 140,124 L140,104" fill="#FDE047" ${O3}/>
<circle cx="110" cy="114" r="3" fill="#fff"/><circle cx="130" cy="114" r="3" fill="#fff"/>
<ellipse cx="94" cy="159" rx="19" ry="10" fill="#FDDCB5" ${O}/>
<ellipse cx="146" cy="159" rx="19" ry="10" fill="#FDDCB5" ${O}/>
<path d="M80,156 L80,162 M86,154 L86,160 M154,154 L154,160 M160,156 L160,162" fill="none" stroke="#E8B98E" stroke-width="2.5" stroke-linecap="round"/>
<g class="p-head">
<circle cx="77" cy="68" r="10" fill="#FDDCB5" ${O}/><circle cx="163" cy="68" r="10" fill="#FDDCB5" ${O}/>
<circle cx="77" cy="68" r="4" fill="#F5B98A"/><circle cx="163" cy="68" r="4" fill="#F5B98A"/>
<g class="p-tuft"><path d="M112,26 C102,14 112,4 120,15 C124,4 140,6 132,22" fill="#A16207" ${O3}/></g>
<circle cx="120" cy="64" r="44" fill="#FDDCB5" ${O}/>
<path d="M98,38 Q108,30 120,30" fill="none" stroke="#FFF1E0" stroke-width="5" stroke-linecap="round"/>
<g class="p-eyeO">${EYE(104, 62)}${EYE(136, 62)}</g>
<g class="p-eyeH" opacity="0"><path d="M97,64 Q104,55 111,64 M129,64 Q136,55 143,64" fill="none" ${O}/></g>
${BL(91, 78)}${BL(149, 78)}
<g class="p-mouth"><path d="M107,82 Q120,100 133,82 Z" fill="#EF4444" ${O3}/><path d="M113,90 Q120,94 127,90" fill="none" stroke="#FCA5A5" stroke-width="3" stroke-linecap="round"/></g>
</g>
<g class="p-armL"><ellipse cx="82" cy="119" rx="11" ry="18" fill="#60A5FA" transform="rotate(38 82 119)" ${O}/><circle cx="70" cy="134" r="10" fill="#FDDCB5" ${O}/></g>
<g class="p-armR"><ellipse cx="158" cy="119" rx="11" ry="18" fill="#60A5FA" transform="rotate(-38 158 119)" ${O}/><circle cx="170" cy="134" r="10" fill="#FDDCB5" ${O}/></g>
<g class="p-clap" opacity="0"><path d="M102,108 L95,103 M100,122 L92,124 M138,108 L145,103 M140,122 L148,124 M120,100 L120,94" fill="none" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/></g>
</g>
</svg>`,

  'bup-be': `<svg class="fa fa-bup-be" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(120, 170, 40)}
<g class="p-doll">
<rect x="104" y="134" width="13" height="28" rx="5" fill="#FDDCB5" ${O}/>
<rect x="123" y="134" width="13" height="28" rx="5" fill="#FDDCB5" ${O}/>
<ellipse cx="108" cy="164" rx="12" ry="7" fill="#EF4444" ${O}/>
<ellipse cx="132" cy="164" rx="12" ry="7" fill="#EF4444" ${O}/>
<g class="p-armL"><ellipse cx="85" cy="114" rx="8.5" ry="23" transform="rotate(22 85 114)" fill="#FDDCB5" ${O}/><circle cx="76" cy="136" r="7" fill="#FDDCB5" ${O}/></g>
<g class="p-dress">
<path d="M98,88 L142,88 L170,140 Q120,152 70,140 Z" fill="#F9A8D4" ${O}/>
<path d="M78,132 Q88,138 98,134 Q108,140 120,136 Q132,140 142,134 Q152,138 162,132" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
<circle cx="96" cy="120" r="3" fill="#F472B6"/><circle cx="144" cy="120" r="3" fill="#F472B6"/><circle cx="108" cy="128" r="3" fill="#F472B6"/><circle cx="132" cy="128" r="3" fill="#F472B6"/>
<circle cx="120" cy="112" r="3.5" fill="#FDE047" ${O3}/><circle cx="120" cy="124" r="3.5" fill="#FDE047" ${O3}/>
</g>
<circle cx="98" cy="94" r="10" fill="#F472B6" ${O3}/><circle cx="142" cy="94" r="10" fill="#F472B6" ${O3}/>
<path d="M100,88 L120,102 L140,88 Z" fill="#fff" ${O3}/>
<g class="p-head">
<g class="p-pigL"><ellipse cx="74" cy="80" rx="13" ry="23" fill="#92400E" ${O}/><path d="M70,70 Q68,84 72,96" fill="none" stroke="#B45309" stroke-width="3" stroke-linecap="round"/></g>
<g class="p-pigR"><ellipse cx="166" cy="80" rx="13" ry="23" fill="#92400E" ${O}/><path d="M170,70 Q172,84 168,96" fill="none" stroke="#B45309" stroke-width="3" stroke-linecap="round"/></g>
<ellipse cx="120" cy="56" rx="40" ry="38" fill="#92400E" ${O}/>
<circle cx="83" cy="58" r="7" fill="#F472B6" ${O3}/><circle cx="157" cy="58" r="7" fill="#F472B6" ${O3}/>
<circle cx="120" cy="58" r="31" fill="#FDDCB5" ${O}/>
<path d="M89,56 C88,30 152,30 151,56 C140,44 130,40 121,47 C112,40 98,44 89,56 Z" fill="#92400E" ${O}/>
<path d="M104,36 Q112,31 120,32" fill="none" stroke="#B45309" stroke-width="3" stroke-linecap="round"/>
<path d="M120,24 L104,14 L104,34 Z M120,24 L136,14 L136,34 Z" fill="#F472B6" ${O}/>
<circle cx="120" cy="24" r="5" fill="#EC4899" ${O3}/>
${EYE(108, 62, 1.05)}${EYE(132, 62, 1.05)}
<path d="M101,54 L99,51 M139,54 L141,51" fill="none" ${O3}/>
${BL(99, 73, 6, 4)}${BL(141, 73, 6, 4)}
<path d="M113,75 Q120,82 127,75" fill="none" ${O3}/>
</g>
<g class="p-armR"><ellipse cx="155" cy="114" rx="8.5" ry="23" transform="rotate(-22 155 114)" fill="#FDDCB5" ${O}/><circle cx="164" cy="136" r="7" fill="#FDDCB5" ${O}/></g>
</g>
</svg>`,

  'ga': `<svg class="fa fa-ga" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(116, 167, 58)}
<ellipse cx="212" cy="166" rx="3" ry="2" fill="#CA8A04"/><ellipse cx="222" cy="163" rx="3" ry="2" fill="#CA8A04"/><ellipse cx="228" cy="167" rx="3" ry="2" fill="#CA8A04"/>
<path d="M100,138 L100,164 M124,138 L124,164" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
<path d="M100,138 L100,164 M124,138 L124,164" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>
<path d="M88,166 L112,166 M100,166 L94,160 M112,166 L136,166 M124,166 L118,160" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
<path d="M88,166 L112,166 M100,166 L94,160 M112,166 L136,166 M124,166 L118,160" fill="none" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
<g class="p-body">
<g class="p-tail">
<path d="M74,98 C44,84 26,62 22,32 C46,44 68,64 84,88 Z" fill="#15803D" ${O}/>
<path d="M66,106 C38,104 16,88 8,64 C34,68 58,82 74,96 Z" fill="#1E3A8A" ${O}/>
<path d="M70,116 C42,124 22,116 10,100 C36,98 56,102 74,108 Z" fill="#22C55E" ${O}/>
</g>
<g class="p-wing2"><path d="M86,96 C100,78 140,80 148,102 C130,120 96,120 86,96 Z" fill="#C2410C" ${O}/></g>
<ellipse cx="112" cy="106" rx="60" ry="42" fill="#FB923C" ${O}/>
<path d="M70,128 Q110,150 154,126" fill="none" stroke="#F97316" stroke-width="6" stroke-linecap="round"/>
<g class="p-wing"><path d="M84,100 C98,82 142,86 148,108 C132,132 94,130 84,100 Z" fill="#EA580C" ${O}/>
<path d="M100,104 Q116,112 134,106 M104,116 Q118,122 132,116" fill="none" ${O3}/></g>
<g class="p-neck">
<path d="M148,50 C140,68 134,86 132,106 L140,98 L144,112 L152,100 L158,114 L164,100 L172,110 L174,96 C178,84 184,74 188,64 Z" fill="#FBBF24" ${O}/>
<g class="p-comb"><path d="M146,44 C140,24 156,20 160,34 C160,16 176,16 176,32 C180,20 196,26 188,44 Z" fill="#EF4444" ${O}/></g>
<path d="M189,51 L215,61 L190,63 Z" fill="#FACC15" ${O}/>
<g class="p-jaw"><path d="M190,63 L209,64 L189,72 Z" fill="#F59E0B" ${O}/></g>
<ellipse cx="186" cy="84" rx="7" ry="11" fill="#EF4444" ${O}/>
<circle cx="168" cy="62" r="25" fill="#FB923C" ${O}/>
${EYE(176, 56)}
${BL(172, 72, 6, 4)}
<g class="p-sing" opacity="0"><path d="M220,40 Q228,50 220,60 M228,32 Q240,50 228,68" fill="none" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/></g>
</g>
</g>
</svg>`,
};

/* Đà điểu chạy tại chỗ: khung hình tạo bằng vòng lặp (bước chân đổi nhau). */
const kf = (name, frames) => `@keyframes ${name} { ${frames.map(([p, v]) => `${p}% { transform: ${v} }`).join(' ')} }\n`;
function runKF(sfx, step, n, k) {
  const pts = Array.from({ length: n }, (_, i) => 6 + step * i);
  const end = pts[n - 1] + step;
  const part = (name, rest, at, mid) => {
    const fr = [[0, rest]];
    pts.forEach((p, i) => {
      fr.push([p, at(i)]);
      if (mid && i < n - 1) fr.push([+(p + step / 2).toFixed(1), mid(i)]);
    });
    fr.push([end, rest], [100, rest]);
    return kf(`fa-da-dieu-${name}${sfx}`, fr);
  };
  const r = (d) => `rotate(${+(d * k).toFixed(1)}deg)`;
  return part('legA', r(0), (i) => r(i % 2 ? 24 : -28))
    + part('legB', r(0), (i) => r(i % 2 ? -28 : 24))
    + part('shinA', r(0), (i) => r(i % 2 ? 50 : 0))
    + part('shinB', r(0), (i) => r(i % 2 ? 0 : 50))
    + part('bob', 'translateY(0)', () => 'translateY(0)', () => `translateY(${-6 * k}px)`)
    + part('neck', r(0), () => r(7), () => r(-3))
    + part('wing', r(0), () => r(22), () => r(-4));
}

const K = (v, u = 'deg') => `calc(var(--fa-k) * ${v}${u})`;

/** Động tác: chạy một lần khi một khối cha có class `is-play` (thêm lại class để chạy lại). */
export const CSS = `
.fa-de, .fa-em-be, .fa-bup-be, .fa-ga { --fa-k: 1; }
.fa-de .p-eye, .fa-da-dieu .p-eye, .fa-em-be .p-eye, .fa-bup-be .p-eye, .fa-ga .p-eye, .fa-em-be .p-mouth { transform-box: fill-box; transform-origin: center; }

.fa-de .p-all { transform-box: view-box; transform-origin: 64px 160px; }
.fa-de .p-body { transform-box: view-box; transform-origin: 64px 160px; }
.fa-de .p-neck { transform-box: view-box; transform-origin: 140px 100px; }
.fa-de .p-beard { transform-box: view-box; transform-origin: 189px 96px; }
.fa-de .p-tail { transform-box: view-box; transform-origin: 54px 90px; }
.is-play .fa-de .p-all { animation: fa-de-all 2.4s ease-in-out both; }
.is-play .fa-de .p-body { animation: fa-de-body 2.4s ease-in-out both; }
.is-play .fa-de .p-neck { animation: fa-de-neck 2.4s ease-in-out both; }
.is-play .fa-de .p-beard { animation: fa-de-beard 2.4s ease-in-out both; }
.is-play .fa-de .p-tail { animation: fa-de-tail 2.4s ease-in-out both; }
.is-play .fa-de .p-eye { animation: fa-de-eye 2.4s linear both; }
@keyframes fa-de-all { 0%,12% { transform: translate(0,0) } 26% { transform: translate(${K(-6, 'px')},0) } 36% { transform: translate(${K(13, 'px')},0) } 42% { transform: translate(${K(10, 'px')},0) } 52% { transform: translate(0,0) } 62% { transform: translate(0,${K(-7, 'px')}) } 70% { transform: translate(0,${K(-8, 'px')}) } 78% { transform: translate(0,0) } 82% { transform: translate(0,${K(1.5, 'px')}) } 88%,100% { transform: translate(0,0) } }
@keyframes fa-de-body { 0% { transform: rotate(0) } 14% { transform: rotate(${K(-7)}) } 26% { transform: rotate(${K(-8)}) } 36% { transform: rotate(${K(4)}) } 44% { transform: rotate(${K(2)}) } 52% { transform: rotate(0) } 62% { transform: rotate(${K(-6)}) } 72% { transform: rotate(${K(-5)}) } 80% { transform: rotate(${K(1.5)}) } 88%,100% { transform: rotate(0) } }
@keyframes fa-de-neck { 0% { transform: rotate(0) } 14% { transform: rotate(${K(-9)}) } 26% { transform: rotate(${K(-11)}) } 35% { transform: rotate(${K(30)}) } 40% { transform: rotate(${K(24)}) } 45% { transform: rotate(${K(28)}) } 54% { transform: rotate(0) } 64% { transform: rotate(${K(-5)}) } 76% { transform: rotate(${K(-3)}) } 86% { transform: rotate(${K(3)}) } 94%,100% { transform: rotate(0) } }
@keyframes fa-de-beard { 0%,34% { transform: rotate(0) } 39% { transform: rotate(${K(24)}) } 45% { transform: rotate(${K(-18)}) } 51% { transform: rotate(${K(12)}) } 57% { transform: rotate(${K(-8)}) } 66% { transform: rotate(${K(10)}) } 74% { transform: rotate(${K(-8)}) } 82% { transform: rotate(${K(5)}) } 90%,100% { transform: rotate(0) } }
@keyframes fa-de-tail { 0%,10% { transform: rotate(0) } 20% { transform: rotate(${K(-14)}) } 32% { transform: rotate(${K(22)}) } 40% { transform: rotate(${K(-20)}) } 48% { transform: rotate(${K(16)}) } 56% { transform: rotate(${K(-12)}) } 66% { transform: rotate(${K(12)}) } 76% { transform: rotate(${K(-8)}) } 86%,100% { transform: rotate(0) } }
@keyframes fa-de-eye { 0%,32% { transform: scaleY(1) } 35%,43% { transform: scaleY(.15) } 47%,100% { transform: scaleY(1) } }

.fa-da-dieu .p-run { transform-box: view-box; transform-origin: 112px 166px; }
.fa-da-dieu .p-legA { transform-box: view-box; transform-origin: 98px 94px; }
.fa-da-dieu .p-shinA { transform-box: view-box; transform-origin: 92px 128px; }
.fa-da-dieu .p-legB { transform-box: view-box; transform-origin: 116px 94px; }
.fa-da-dieu .p-shinB { transform-box: view-box; transform-origin: 122px 128px; }
.fa-da-dieu .p-neck { transform-box: view-box; transform-origin: 136px 64px; }
.fa-da-dieu .p-wing { transform-box: view-box; transform-origin: 134px 66px; }
.fa-da-dieu .p-tail { transform-box: view-box; transform-origin: 52px 76px; }
.fa-da-dieu .p-dust { transform-box: view-box; transform-origin: 52px 160px; }
.is-play .fa-da-dieu .p-run { animation: fa-da-dieu-run 2s ease-in-out both; }
.is-play .fa-da-dieu .p-bob { animation: fa-da-dieu-bob 2s linear both; }
.is-play .fa-da-dieu .p-legA { animation: fa-da-dieu-legA 2s ease-in-out both; }
.is-play .fa-da-dieu .p-legB { animation: fa-da-dieu-legB 2s ease-in-out both; }
.is-play .fa-da-dieu .p-shinA { animation: fa-da-dieu-shinA 2s ease-in-out both; }
.is-play .fa-da-dieu .p-shinB { animation: fa-da-dieu-shinB 2s ease-in-out both; }
.is-play .fa-da-dieu .p-neck { animation: fa-da-dieu-neck 2s ease-in-out both; }
.is-play .fa-da-dieu .p-wing { animation: fa-da-dieu-wing 2s ease-in-out both; }
.is-play .fa-da-dieu .p-tail { animation: fa-da-dieu-tail 2s ease-in-out both; }
.is-play .fa-da-dieu .p-dust { animation: fa-da-dieu-dust 2s ease-out both; }
@keyframes fa-da-dieu-run { 0% { transform: rotate(0) } 8%,88% { transform: rotate(7deg) } 96% { transform: rotate(-1.5deg) } 100% { transform: rotate(0) } }
@keyframes fa-da-dieu-tail { 0% { transform: rotate(0) } 10% { transform: rotate(-14deg) } 30% { transform: rotate(10deg) } 50% { transform: rotate(-12deg) } 70% { transform: rotate(10deg) } 90% { transform: rotate(-6deg) } 100% { transform: rotate(0) } }
@keyframes fa-da-dieu-dust { 0%,8% { opacity: 0; transform: translateX(0) scale(.6) } 18% { opacity: 1; transform: translateX(-4px) scale(1) } 32% { opacity: .2; transform: translateX(-10px) scale(1.1) } 42% { opacity: 1; transform: translateX(-2px) scale(.9) } 56% { opacity: .2; transform: translateX(-10px) scale(1.1) } 66% { opacity: 1; transform: translateX(-2px) scale(.9) } 82% { opacity: .3; transform: translateX(-10px) scale(1.1) } 94%,100% { opacity: 0; transform: translateX(0) scale(.6) } }
${runKF('', 8, 11, 1)}
.fa-em-be .p-baby { transform-box: view-box; transform-origin: 120px 166px; }
.fa-em-be .p-head { transform-box: view-box; transform-origin: 120px 106px; }
.fa-em-be .p-tuft { transform-box: view-box; transform-origin: 120px 22px; }
.fa-em-be .p-armL { transform-box: view-box; transform-origin: 92px 108px; }
.fa-em-be .p-armR { transform-box: view-box; transform-origin: 148px 108px; }
.fa-em-be .p-clap { transform-box: view-box; transform-origin: 120px 116px; }
.is-play .fa-em-be .p-baby { animation: fa-em-be-baby 2.2s ease-in-out both; }
.is-play .fa-em-be .p-head { animation: fa-em-be-head 2.2s ease-in-out both; }
.is-play .fa-em-be .p-tuft { animation: fa-em-be-tuft 2.2s ease-in-out both; }
.is-play .fa-em-be .p-armL { animation: fa-em-be-armL 2.2s ease-in-out both; }
.is-play .fa-em-be .p-armR { animation: fa-em-be-armR 2.2s ease-in-out both; }
.is-play .fa-em-be .p-clap { animation: fa-em-be-clap 2.2s linear both; }
.is-play .fa-em-be .p-eyeO { animation: fa-em-be-eyeO 2.2s linear both; }
.is-play .fa-em-be .p-eyeH { animation: fa-em-be-eyeH 2.2s linear both; }
.is-play .fa-em-be .p-mouth { animation: fa-em-be-mouth 2.2s ease-in-out both; }
@keyframes fa-em-be-armL { 0% { transform: rotate(0) } 11% { transform: rotate(-58deg) } 20%,23% { transform: rotate(-101deg) } 31% { transform: rotate(-58deg) } 40%,43% { transform: rotate(-101deg) } 52% { transform: rotate(-56deg) } 64% { transform: rotate(6deg) } 72%,100% { transform: rotate(0) } }
@keyframes fa-em-be-armR { 0% { transform: rotate(0) } 11% { transform: rotate(58deg) } 20%,23% { transform: rotate(101deg) } 31% { transform: rotate(58deg) } 40%,43% { transform: rotate(101deg) } 52% { transform: rotate(56deg) } 64% { transform: rotate(-6deg) } 72%,100% { transform: rotate(0) } }
@keyframes fa-em-be-clap { 0%,19% { opacity: 0; transform: scale(.6) } 21% { opacity: 1; transform: scale(1) } 28% { opacity: 0; transform: scale(1.25) } 39% { opacity: 0; transform: scale(.6) } 41% { opacity: 1; transform: scale(1) } 48%,100% { opacity: 0; transform: scale(1.25) } }
@keyframes fa-em-be-baby { 0%,14% { transform: translateY(0) } 21% { transform: translateY(${K(-2, 'px')}) } 26% { transform: translateY(0) } 41% { transform: translateY(${K(-2, 'px')}) } 46% { transform: translateY(0) } 54% { transform: translateY(${K(-5, 'px')}) scaleY(1.02) } 60% { transform: translateY(0) scaleY(.97) } 66% { transform: translateY(${K(-5, 'px')}) scaleY(1.02) } 72% { transform: translateY(0) scaleY(.97) } 78% { transform: translateY(${K(-4, 'px')}) } 84% { transform: translateY(0) scaleY(.98) } 90%,100% { transform: translateY(0) } }
@keyframes fa-em-be-head { 0%,10% { transform: rotate(0) } 21% { transform: rotate(${K(3)}) } 41% { transform: rotate(${K(-3)}) } 54% { transform: rotate(${K(9)}) } 66% { transform: rotate(${K(-9)}) } 78% { transform: rotate(${K(7)}) } 88% { transform: rotate(${K(-3)}) } 96%,100% { transform: rotate(0) } }
@keyframes fa-em-be-tuft { 0%,18% { transform: rotate(0) } 22% { transform: rotate(${K(-12)}) } 28% { transform: rotate(${K(8)}) } 42% { transform: rotate(${K(-12)}) } 48% { transform: rotate(${K(8)}) } 55% { transform: rotate(${K(-18)}) } 61% { transform: rotate(${K(14)}) } 67% { transform: rotate(${K(-18)}) } 73% { transform: rotate(${K(14)}) } 80% { transform: rotate(${K(-10)}) } 88% { transform: rotate(${K(6)}) } 95%,100% { transform: rotate(0) } }
@keyframes fa-em-be-eyeO { 0%,18% { opacity: 1 } 20%,26% { opacity: 0 } 28%,38% { opacity: 1 } 40%,90% { opacity: 0 } 93%,100% { opacity: 1 } }
@keyframes fa-em-be-eyeH { 0%,18% { opacity: 0 } 20%,26% { opacity: 1 } 28%,38% { opacity: 0 } 40%,90% { opacity: 1 } 93%,100% { opacity: 0 } }
@keyframes fa-em-be-mouth { 0%,46% { transform: scale(1) } 54% { transform: scale(1.2) } 60% { transform: scale(1.05) } 66% { transform: scale(1.2) } 72% { transform: scale(1.05) } 78% { transform: scale(1.15) } 90%,100% { transform: scale(1) } }

.fa-bup-be .p-doll { transform-box: view-box; transform-origin: 120px 170px; }
.fa-bup-be .p-head { transform-box: view-box; transform-origin: 120px 90px; }
.fa-bup-be .p-dress { transform-box: view-box; transform-origin: 120px 90px; }
.fa-bup-be .p-armR { transform-box: view-box; transform-origin: 146px 94px; }
.fa-bup-be .p-armL { transform-box: view-box; transform-origin: 94px 94px; }
.fa-bup-be .p-pigL { transform-box: view-box; transform-origin: 82px 60px; }
.fa-bup-be .p-pigR { transform-box: view-box; transform-origin: 158px 60px; }
.is-play .fa-bup-be .p-doll { animation: fa-bup-be-doll 2.4s ease-in-out both; }
.is-play .fa-bup-be .p-head { animation: fa-bup-be-head 2.4s ease-in-out both; }
.is-play .fa-bup-be .p-dress { animation: fa-bup-be-dress 2.4s ease-in-out both; }
.is-play .fa-bup-be .p-armR { animation: fa-bup-be-armR 2.4s ease-in-out both; }
.is-play .fa-bup-be .p-armL { animation: fa-bup-be-armL 2.4s ease-in-out both; }
.is-play .fa-bup-be .p-pigL { animation: fa-bup-be-pigL 2.4s ease-in-out both; }
.is-play .fa-bup-be .p-pigR { animation: fa-bup-be-pigR 2.4s ease-in-out both; }
.is-play .fa-bup-be .p-eye { animation: fa-bup-be-eye 2.4s linear both; }
@keyframes fa-bup-be-armR { 0% { transform: rotate(0) } 8% { transform: rotate(8deg) } 18% { transform: rotate(calc(-118deg - var(--fa-k) * 9deg)) } 28% { transform: rotate(calc(-118deg + var(--fa-k) * 15deg)) } 38% { transform: rotate(calc(-118deg - var(--fa-k) * 15deg)) } 48% { transform: rotate(calc(-118deg + var(--fa-k) * 15deg)) } 58% { transform: rotate(calc(-118deg - var(--fa-k) * 15deg)) } 68% { transform: rotate(calc(-118deg + var(--fa-k) * 8deg)) } 84% { transform: rotate(6deg) } 92%,100% { transform: rotate(0) } }
@keyframes fa-bup-be-armL { 0%,10% { transform: rotate(0) } 30% { transform: rotate(${K(-6)}) } 50% { transform: rotate(${K(4)}) } 70% { transform: rotate(${K(-4)}) } 90%,100% { transform: rotate(0) } }
@keyframes fa-bup-be-doll { 0% { transform: translateY(0) } 8% { transform: translateY(${K(2, 'px')}) } 16% { transform: translateY(${K(-4, 'px')}) } 24%,76% { transform: translateY(0) } 84% { transform: translateY(${K(-3, 'px')}) } 92%,100% { transform: translateY(0) } }
@keyframes fa-bup-be-head { 0%,10% { transform: rotate(0) } 26% { transform: rotate(${K(8)}) } 44% { transform: rotate(${K(-6)}) } 62% { transform: rotate(${K(8)}) } 80% { transform: rotate(${K(-3)}) } 92%,100% { transform: rotate(0) } }
@keyframes fa-bup-be-pigL { 0%,12% { transform: rotate(0) } 30% { transform: rotate(${K(-14)}) } 48% { transform: rotate(${K(14)}) } 66% { transform: rotate(${K(-12)}) } 82% { transform: rotate(${K(7)}) } 94%,100% { transform: rotate(0) } }
@keyframes fa-bup-be-pigR { 0%,12% { transform: rotate(0) } 30% { transform: rotate(${K(-12)}) } 48% { transform: rotate(${K(14)}) } 66% { transform: rotate(${K(-12)}) } 82% { transform: rotate(${K(6)}) } 94%,100% { transform: rotate(0) } }
@keyframes fa-bup-be-dress { 0%,10% { transform: rotate(0) } 24% { transform: rotate(${K(-5)}) } 42% { transform: rotate(${K(5)}) } 60% { transform: rotate(${K(-4)}) } 78% { transform: rotate(${K(3)}) } 92%,100% { transform: rotate(0) } }
@keyframes fa-bup-be-eye { 0%,40% { transform: scaleY(1) } 43%,46% { transform: scaleY(.1) } 50%,100% { transform: scaleY(1) } }

.fa-ga .p-body { transform-box: view-box; transform-origin: 112px 142px; }
.fa-ga .p-neck { transform-box: view-box; transform-origin: 148px 100px; }
.fa-ga .p-jaw { transform-box: view-box; transform-origin: 190px 64px; }
.fa-ga .p-comb { transform-box: view-box; transform-origin: 168px 42px; }
.fa-ga .p-wing { transform-box: view-box; transform-origin: 144px 96px; }
.fa-ga .p-wing2 { transform-box: view-box; transform-origin: 144px 94px; }
.fa-ga .p-tail { transform-box: view-box; transform-origin: 74px 104px; }
.fa-ga .p-sing { transform-box: view-box; transform-origin: 214px 50px; }
.is-play .fa-ga .p-body { animation: fa-ga-body 2.6s ease-in-out both; }
.is-play .fa-ga .p-neck { animation: fa-ga-neck 2.6s ease-in-out both; }
.is-play .fa-ga .p-jaw { animation: fa-ga-jaw 2.6s ease-in-out both; }
.is-play .fa-ga .p-comb { animation: fa-ga-comb 2.6s ease-in-out both; }
.is-play .fa-ga .p-wing { animation: fa-ga-wing 2.6s ease-in-out both; }
.is-play .fa-ga .p-wing2 { animation: fa-ga-wing2 2.6s ease-in-out both; }
.is-play .fa-ga .p-tail { animation: fa-ga-tail 2.6s ease-in-out both; }
.is-play .fa-ga .p-sing { animation: fa-ga-sing 2.6s ease-out both; }
.is-play .fa-ga .p-eye { animation: fa-ga-eye 2.6s linear both; }
@keyframes fa-ga-body { 0% { transform: translateY(0) rotate(0) } 6% { transform: translateY(${K(3, 'px')}) rotate(0) } 14%,44% { transform: translateY(${K(-4, 'px')}) rotate(${K(-3)}) } 52% { transform: translateY(0) rotate(0) } 59% { transform: translateY(0) rotate(14deg) } 65% { transform: translateY(0) rotate(6deg) } 72% { transform: translateY(0) rotate(14deg) } 80% { transform: translateY(0) rotate(-2deg) } 88% { transform: translateY(0) rotate(1deg) } 95%,100% { transform: translateY(0) rotate(0) } }
@keyframes fa-ga-neck { 0% { transform: rotate(0) } 6% { transform: rotate(${K(5)}) } 18%,46% { transform: rotate(${K(-14)}) } 52% { transform: rotate(0) } 59% { transform: rotate(56deg) } 65% { transform: rotate(24deg) } 72% { transform: rotate(56deg) } 80% { transform: rotate(-5deg) } 88% { transform: rotate(2deg) } 95%,100% { transform: rotate(0) } }
@keyframes fa-ga-jaw { 0%,24% { transform: rotate(0) } 28% { transform: rotate(${K(30)}) } 32% { transform: rotate(${K(16)}) } 36% { transform: rotate(${K(30)}) } 40% { transform: rotate(${K(18)}) } 44% { transform: rotate(${K(30)}) } 48%,100% { transform: rotate(0) } }
@keyframes fa-ga-sing { 0%,26% { opacity: 0; transform: translateX(0) scale(.7) } 30% { opacity: 1; transform: translateX(0) scale(1) } 38% { opacity: .5; transform: translateX(${K(3, 'px')}) scale(1.08) } 44% { opacity: 1; transform: translateX(${K(5, 'px')}) scale(1.12) } 50%,100% { opacity: 0; transform: translateX(${K(8, 'px')}) scale(1.2) } }
@keyframes fa-ga-comb { 0%,26% { transform: rotate(0) } 30% { transform: rotate(${K(-10)}) } 35% { transform: rotate(${K(9)}) } 40% { transform: rotate(${K(-8)}) } 45% { transform: rotate(${K(6)}) } 50% { transform: rotate(0) } 58% { transform: rotate(${K(-12)}) } 64% { transform: rotate(${K(10)}) } 71% { transform: rotate(${K(-12)}) } 78% { transform: rotate(${K(8)}) } 86% { transform: rotate(${K(-4)}) } 94%,100% { transform: rotate(0) } }
@keyframes fa-ga-wing { 0%,7% { transform: rotate(0) } 12% { transform: rotate(${K(38)}) } 17% { transform: rotate(${K(-4)}) } 22% { transform: rotate(${K(38)}) } 27% { transform: rotate(${K(-4)}) } 32% { transform: rotate(${K(26)}) } 38% { transform: rotate(0) } 100% { transform: rotate(0) } }
@keyframes fa-ga-wing2 { 0%,8% { transform: rotate(0) } 13% { transform: rotate(${K(50)}) } 18% { transform: rotate(0) } 23% { transform: rotate(${K(50)}) } 28% { transform: rotate(0) } 33% { transform: rotate(${K(34)}) } 39%,100% { transform: rotate(0) } }
@keyframes fa-ga-tail { 0%,8% { transform: rotate(0) } 13% { transform: rotate(${K(-7)}) } 18% { transform: rotate(${K(5)}) } 23% { transform: rotate(${K(-7)}) } 28% { transform: rotate(${K(5)}) } 36% { transform: rotate(0) } 59% { transform: rotate(${K(-8)}) } 66% { transform: rotate(${K(3)}) } 72% { transform: rotate(${K(-8)}) } 82% { transform: rotate(${K(4)}) } 92%,100% { transform: rotate(0) } }
@keyframes fa-ga-eye { 0%,26% { transform: scaleY(1) } 28%,46% { transform: scaleY(.15) } 49%,100% { transform: scaleY(1) } }

@media (prefers-reduced-motion: reduce) {
  .fa-de, .fa-em-be, .fa-bup-be, .fa-ga { --fa-k: .6; }
  .is-play .fa-de .p-all, .is-play .fa-de .p-body, .is-play .fa-de .p-neck, .is-play .fa-de .p-beard, .is-play .fa-de .p-tail, .is-play .fa-de .p-eye { animation-duration: 2.6s; }
  .is-play .fa-em-be .p-baby, .is-play .fa-em-be .p-head, .is-play .fa-em-be .p-tuft, .is-play .fa-em-be .p-armL, .is-play .fa-em-be .p-armR, .is-play .fa-em-be .p-clap, .is-play .fa-em-be .p-eyeO, .is-play .fa-em-be .p-eyeH, .is-play .fa-em-be .p-mouth { animation-duration: 2.6s; }
  .is-play .fa-bup-be .p-doll, .is-play .fa-bup-be .p-head, .is-play .fa-bup-be .p-dress, .is-play .fa-bup-be .p-armR, .is-play .fa-bup-be .p-armL, .is-play .fa-bup-be .p-pigL, .is-play .fa-bup-be .p-pigR, .is-play .fa-bup-be .p-eye { animation-duration: 2.6s; }
  .is-play .fa-da-dieu .p-run { animation-name: fa-da-dieu-run-calm; animation-duration: 2.6s; }
  .is-play .fa-da-dieu .p-bob { animation-name: fa-da-dieu-bob-calm; animation-duration: 2.6s; }
  .is-play .fa-da-dieu .p-legA { animation-name: fa-da-dieu-legA-calm; animation-duration: 2.6s; }
  .is-play .fa-da-dieu .p-legB { animation-name: fa-da-dieu-legB-calm; animation-duration: 2.6s; }
  .is-play .fa-da-dieu .p-shinA { animation-name: fa-da-dieu-shinA-calm; animation-duration: 2.6s; }
  .is-play .fa-da-dieu .p-shinB { animation-name: fa-da-dieu-shinB-calm; animation-duration: 2.6s; }
  .is-play .fa-da-dieu .p-neck { animation-name: fa-da-dieu-neck-calm; animation-duration: 2.6s; }
  .is-play .fa-da-dieu .p-wing { animation-name: fa-da-dieu-wing-calm; animation-duration: 2.6s; }
  .is-play .fa-da-dieu .p-tail, .is-play .fa-da-dieu .p-dust { animation-duration: 2.6s; }
  .is-play .fa-ga .p-body, .is-play .fa-ga .p-neck, .is-play .fa-ga .p-jaw, .is-play .fa-ga .p-comb, .is-play .fa-ga .p-tail, .is-play .fa-ga .p-sing, .is-play .fa-ga .p-eye { animation-duration: 2.6s; }
  .is-play .fa-ga .p-wing { animation: fa-ga-wing-calm 2.6s ease-in-out both; }
  .is-play .fa-ga .p-wing2 { animation: fa-ga-wing2-calm 2.6s ease-in-out both; }
}
@keyframes fa-da-dieu-run-calm { 0% { transform: rotate(0) } 10%,86% { transform: rotate(4deg) } 94% { transform: rotate(-1deg) } 100% { transform: rotate(0) } }
${runKF('-calm', 12, 7, 0.6)}
@keyframes fa-ga-wing-calm { 0%,7% { transform: rotate(0) } 16% { transform: rotate(23deg) } 26% { transform: rotate(0) } 35% { transform: rotate(18deg) } 44%,100% { transform: rotate(0) } }
@keyframes fa-ga-wing2-calm { 0%,8% { transform: rotate(0) } 17% { transform: rotate(30deg) } 27% { transform: rotate(0) } 36% { transform: rotate(22deg) } 45%,100% { transform: rotate(0) } }
`;
