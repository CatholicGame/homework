/** Tranh thẻ chữ cái (preschool/flash): sư tử, voi, xe đạp, yếm. Vẽ riêng, nét INK; mỗi hình có động tác riêng (CSS bên dưới). */
const INK = '#3F3A40';
const O = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const O3 = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const T = `${O3} fill="none"`;
const SH = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="7" fill="#000" opacity=".08"/>`;
const EYE = (x, y, s = 1) => `<ellipse cx="${x}" cy="${y}" rx="${4.5 * s}" ry="${5.5 * s}" fill="${INK}"/><circle cx="${x + 1.6 * s}" cy="${y - 2 * s}" r="${1.7 * s}" fill="#fff"/>`;
const BL = (x, y, rx = 7, ry = 4.5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FDA4AF" opacity=".8"/>`;
// thick outlined stroke: ink under, colour on top
const TUBE = (d, w, fill) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const f1 = (n) => +n.toFixed(1);
const STAR = (cx, cy, R, r, fill) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, d = i % 2 ? r : R;
    pts.push(`${f1(cx + d * Math.cos(a))},${f1(cy + d * Math.sin(a))}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
};
const SPARK = (x, y, s) => `<path d="M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s} Z" fill="#FDE047" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
// lion mane: ring of puffs round the head
const MANE = (cx, cy) => {
  let s = '';
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    s += `<circle cx="${f1(cx + 36 * Math.cos(a))}" cy="${f1(cy + 36 * Math.sin(a))}" r="16"/>`;
  }
  return `<g fill="#D97706" ${O}>${s}</g><circle cx="${cx}" cy="${cy}" r="40" fill="#D97706"/>
<g fill="none" stroke="#B45309" stroke-width="3" stroke-linecap="round"><path d="M${cx - 30},${cy - 26} q6,4 8,10 M${cx + 30},${cy - 26} q-6,4 -8,10 M${cx - 38},${cy + 6} q6,0 9,4 M${cx + 38},${cy + 6} q-6,0 -9,4 M${cx},${cy - 40} q2,5 0,9"/></g>`;
};
const SPOKES = (cx, cy, r) => {
  let d = '';
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    d += `M${cx},${cy} L${f1(cx + r * Math.cos(a))},${f1(cy + r * Math.sin(a))} `;
  }
  return `<path d="${d.trim()}" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/>`;
};
const WHEEL = (key, cx, cy) => `<g class="p-wheel p-${key}">
${SPOKES(cx, cy, 29)}
<circle cx="${cx}" cy="${cy}" r="36" fill="none" stroke="${INK}" stroke-width="11"/>
<circle cx="${cx}" cy="${cy}" r="36" fill="none" stroke="#475569" stroke-width="4"/>
<circle cx="${cx}" cy="${cy}" r="30" fill="none" stroke="${INK}" stroke-width="2"/>
<circle cx="${cx}" cy="${cy - 30}" r="3.5" fill="#FACC15" stroke="${INK}" stroke-width="2"/>
<circle cx="${cx}" cy="${cy}" r="6" fill="#CBD5E1" ${O3}/>
</g>`;
const DROP = (cls, x, y) => `<g class="p-drop ${cls}" opacity="0"><path d="M${x},${y - 8} C${x + 5},${y - 2} ${x + 7},${y + 2} ${x},${y + 7} C${x - 7},${y + 2} ${x - 5},${y - 2} ${x},${y - 8} Z" fill="#7DD3FC" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/></g>`;

export const ART = {
  'su-tu': `<svg class="fa fa-su-tu" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(112, 164, 98)}
<g class="p-tail">${TUBE('M40,106 C22,106 14,94 18,78', 5, '#FACC15')}
<path d="M18,62 C8,64 6,78 14,82 C10,88 20,92 24,84 C30,84 30,72 24,68 C28,62 22,58 18,62 Z" fill="#B45309" ${O}/></g>
<rect x="46" y="112" width="20" height="48" rx="9" fill="#EAB308" ${O}/>
<rect x="114" y="112" width="20" height="48" rx="9" fill="#EAB308" ${O}/>
<ellipse cx="94" cy="112" rx="60" ry="32" fill="#FACC15" ${O}/>
<path d="M54,124 C70,140 112,142 132,128" fill="none" stroke="#FDE68A" stroke-width="8" stroke-linecap="round"/>
<rect x="68" y="116" width="20" height="44" rx="9" fill="#FACC15" ${O}/>
<rect x="136" y="112" width="20" height="48" rx="9" fill="#FACC15" ${O}/>
<path d="M72,154 L72,160 M79,154 L79,160 M84,154 L84,160 M140,154 L140,160 M147,154 L147,160 M152,154 L152,160" ${T}/>
<g class="p-head">
<g class="p-mane">${MANE(160, 80)}</g>
<circle cx="141" cy="56" r="9" fill="#FACC15" ${O}/><circle cx="141" cy="56" r="4" fill="#F59E0B"/>
<circle cx="181" cy="56" r="9" fill="#FACC15" ${O}/><circle cx="181" cy="56" r="4" fill="#F59E0B"/>
<circle cx="161" cy="82" r="28" fill="#FDE047" ${O}/>
<ellipse cx="161" cy="96" rx="15" ry="10" fill="#FEF3C7"/>
<g class="p-eye">${EYE(150, 77)}${EYE(172, 77)}</g>
<path d="M144,68 q5,-4 10,-1 M168,67 q5,-3 10,1" ${T}/>
${BL(141, 90, 6, 4)}${BL(181, 90, 6, 4)}
<g class="p-jaw" opacity="0"><path d="M151,97 Q161,94 171,97 Q172,112 161,114 Q150,112 151,97 Z" fill="#9F1239" ${O3}/>
<ellipse cx="161" cy="109" rx="6" ry="3.5" fill="#FB7185"/><path d="M153,98 L155,103 L157,98 M165,98 L167,103 L169,98" fill="#fff" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/></g>
<path d="M155,88 L167,88 L161,94 Z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
<g class="p-smile"><path d="M161,94 L161,98 M153,98 Q157,103 161,98 Q165,103 169,98" ${T}/></g>
<g class="p-roar" opacity="0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"><path d="M214,74 L230,64 M216,90 L234,90 M214,106 L230,116"/></g>
</g>
</svg>`,

  'voi': `<svg class="fa fa-voi" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(-6,0)">
${SH(112, 166, 98)}
<g class="p-tail"><path d="M38,96 C28,104 26,114 28,122" ${T}/><path d="M28,120 C22,124 22,132 28,134 C34,132 34,124 28,120 Z" fill="#64748B" ${O3}/></g>
<rect x="44" y="112" width="24" height="50" rx="10" fill="#8BA0B8" ${O}/>
<rect x="110" y="112" width="24" height="50" rx="10" fill="#8BA0B8" ${O}/>
<g class="p-body">
<ellipse cx="94" cy="98" rx="60" ry="44" fill="#9FB3C8" ${O}/>
<path d="M50,78 C60,64 80,58 98,58" fill="none" stroke="#C3D1E0" stroke-width="7" stroke-linecap="round"/>
<g class="p-head">
<circle cx="160" cy="70" r="36" fill="#9FB3C8" ${O}/>
<path d="M148,40 C160,36 174,40 180,46" fill="none" stroke="#C3D1E0" stroke-width="6" stroke-linecap="round"/>
<path d="M159,99 Q165,105 172,101" ${T}/>
<g class="p-eye">${EYE(168, 58)}</g>
${BL(156, 80, 6, 4)}
<g class="p-trunk">${TUBE('M180,84 C188,102 192,120 198,128 C202,134 210,134 210,126', 14, '#9FB3C8')}
<circle cx="180" cy="84" r="9" fill="#9FB3C8"/>
<path d="M185,106 L195,102 M190,118 L200,115" ${T}/></g>
<g class="p-ear"><path d="M140,38 C108,34 98,68 106,96 C112,114 132,116 146,106 C156,94 154,50 140,38 Z" fill="#B7C7D9" ${O}/>
<path d="M136,52 C118,54 114,78 120,96 C126,104 138,102 142,94 C146,82 146,60 136,52 Z" fill="#F9C6D6"/></g>
</g>
</g>
<rect x="70" y="116" width="24" height="46" rx="10" fill="#9FB3C8" ${O}/>
<rect x="136" y="112" width="24" height="50" rx="10" fill="#9FB3C8" ${O}/>
<path d="M74,162 Q82,156 90,162 M140,162 Q148,156 156,162" ${T}/>
<g class="p-water">${DROP('p-d1', 198, 30)}${DROP('p-d2', 198, 30)}${DROP('p-d3', 198, 30)}${DROP('p-d4', 198, 30)}${DROP('p-d5', 198, 30)}</g>
</g>
</svg>`,

  'xe-dap': `<svg class="fa fa-xe-dap" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<g class="p-bike">
${SH(116, 166, 100)}
${WHEEL('wheel-b', 52, 122)}
${WHEEL('wheel-f', 180, 122)}
${TUBE('M12,108 C18,86 38,76 60,80', 4, '#22C55E')}
${TUBE('M214,104 C206,84 188,78 166,82', 4, '#22C55E')}
<path d="M52,122 L112,124" stroke="${INK}" stroke-width="3" stroke-dasharray="3 3"/>
${TUBE('M90,66 L88,48', 3, '#CBD5E1')}
${TUBE('M160,64 L156,40 L174,36', 3, '#CBD5E1')}
<g class="p-bell"><path d="M155,36 C155,26 171,26 171,36 Z" fill="#FACC15" ${O3}/><circle cx="163" cy="25" r="2.5" fill="#FACC15" stroke="${INK}" stroke-width="2"/>
<path d="M159,32 q2,-3 5,-3" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>
<g class="p-ring" opacity="0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"><path d="M150,18 Q145,24 147,31 M176,18 Q181,24 179,31 M144,12 Q137,22 140,32 M182,12 Q189,22 186,32"/></g>
${TUBE('M52,122 L112,124 L92,64 Z M92,64 L52,122 M96,76 L160,70 M112,124 L158,74 M160,60 L180,122', 7, '#EF4444')}
<path d="M98,74 L156,69" fill="none" stroke="#FCA5A5" stroke-width="2" stroke-linecap="round"/>
<path d="M170,36 L184,34" stroke="${INK}" stroke-width="13" stroke-linecap="round"/><path d="M170,36 L184,34" stroke="#3B82F6" stroke-width="7" stroke-linecap="round"/>
<path d="M68,48 C68,40 102,38 108,46 C106,54 78,54 68,48 Z" fill="#3B82F6" ${O}/>
<path d="M74,45 C82,42 96,42 102,45" fill="none" stroke="#93C5FD" stroke-width="2.5" stroke-linecap="round"/>
<g class="p-crank">
<path d="M112,124 L98,102" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
<g class="p-pedal2"><rect x="88" y="98" width="20" height="8" rx="3" fill="#475569" ${O3}/></g>
<circle cx="112" cy="124" r="12" fill="#FACC15" ${O}/><circle cx="112" cy="124" r="4" fill="${INK}"/>
<path d="M112,124 L126,146" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
<g class="p-pedal1"><rect x="116" y="142" width="22" height="9" rx="3" fill="#60A5FA" ${O3}/></g>
</g>
</g>
</svg>`,

  'yem': `<svg class="fa fa-yem" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<path d="M4,12 Q120,18 236,12" fill="none" stroke="#A8A29E" stroke-width="3" stroke-linecap="round"/>
<g class="p-bib">
${TUBE('M60,44 C62,26 94,14 116,13', 5, '#F9A8D4')}
${TUBE('M180,44 C178,26 146,14 124,13', 5, '#F9A8D4')}
<path d="M120,13 C108,2 98,6 100,13 C98,20 108,24 120,13 Z M120,13 C132,2 142,6 140,13 C142,20 132,24 120,13 Z" fill="#F472B6" ${O3}/>
<circle cx="120" cy="13" r="4.5" fill="#F472B6" ${O3}/>
<path d="M74,48 C76,78 98,92 120,92 C142,92 164,78 166,48 C174,38 190,40 196,50 C214,72 214,136 182,156 C150,172 90,172 58,156 C26,136 26,72 44,50 C50,40 66,38 74,48 Z" fill="#FDE047" ${O}/>
<path d="M44,112 C46,136 66,152 90,158 C70,160 48,148 40,128 Z M196,112 C194,136 174,152 150,158 C170,160 192,148 200,128 Z" fill="#FACC15"/>
<path d="M120,100 C140,100 164,88 178,68 C196,94 196,138 174,150 C146,162 94,162 66,150 C44,138 44,94 62,68 C76,88 100,100 120,100 Z" fill="none" stroke="#F9A8D4" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round"/>
<g fill="#fff" opacity=".7"><circle cx="58" cy="70" r="3"/><circle cx="182" cy="70" r="3"/><circle cx="96" cy="150" r="3"/><circle cx="144" cy="150" r="3"/></g>
<g class="p-heart"><path d="M120,146 C96,130 88,120 90,108 C92,96 108,94 120,108 C132,94 148,96 150,108 C152,120 144,130 120,146 Z" fill="#F472B6" ${O}/>
<ellipse cx="104" cy="108" rx="5" ry="3.5" fill="#fff" opacity=".7" transform="rotate(-30 104 108)"/></g>
<g class="p-star1">${STAR(68, 118, 12, 5.5, '#60A5FA')}</g>
<g class="p-star2">${STAR(172, 118, 12, 5.5, '#4ADE80')}</g>
<g class="p-spark1" opacity="0">${SPARK(56, 100, 6)}</g>
<g class="p-spark2" opacity="0">${SPARK(186, 98, 6)}</g>
<g class="p-spark3" opacity="0">${SPARK(84, 132, 5)}</g>
</g>
</svg>`,
};

const R = (v, a) => `rotate(${f1(v * a)}deg)`;

/** Keyframes (a = biên độ; calm = bản êm cho prefers-reduced-motion: nhỏ hơn, không rung nhanh). */
const KF = (a, calm) => {
  const s = calm ? '-calm' : '';
  const aT = calm ? 0.84 : 1; // vòi voi vẫn phải giơ lên cao để phun nước
  const shake = calm
    ? `0% { transform: rotate(0) scale(1) } 14% { transform: ${R(-12, a)} scale(1) } 30% { transform: ${R(12, a)} scale(1) } 44% { transform: rotate(0) scale(1) }`
    : `0% { transform: rotate(0) scale(1) } 5% { transform: ${R(-13, a)} scale(1) } 12% { transform: ${R(13, a)} scale(1) } 19% { transform: ${R(-11, a)} scale(1) } 26% { transform: ${R(9, a)} scale(1) } 33% { transform: ${R(-6, a)} scale(1) } 40% { transform: ${R(3, a)} scale(1) } 46% { transform: rotate(0) scale(1) }`;
  const headShake = calm
    ? `0% { transform: rotate(0) } 14% { transform: ${R(-4, a)} } 30% { transform: ${R(4, a)} } 44% { transform: rotate(0) }`
    : `0% { transform: rotate(0) } 5% { transform: ${R(-4, a)} } 12% { transform: ${R(4, a)} } 19% { transform: ${R(-4, a)} } 26% { transform: ${R(3, a)} } 33% { transform: ${R(-2, a)} } 40% { transform: rotate(0) }`;
  const flaps = calm
    ? `0% { transform: scaleX(1) } 22% { transform: scaleX(${f1(1 - 0.28 * a)}) } 46% { transform: scaleX(1) } 70% { transform: scaleX(${f1(1 - 0.28 * a)}) } 100% { transform: scaleX(1) }`
    : `0% { transform: scaleX(1) } 10% { transform: scaleX(.72) } 20% { transform: scaleX(1.04) } 30% { transform: scaleX(.72) } 40% { transform: scaleX(1.04) } 55% { transform: scaleX(.74) } 66% { transform: scaleX(1.03) } 78% { transform: scaleX(.74) } 90% { transform: scaleX(1.02) } 100% { transform: scaleX(1) }`;
  const bell = calm
    ? `0%, 52% { transform: rotate(0) } 60% { transform: ${R(-16, a)} } 70% { transform: ${R(16, a)} } 80% { transform: ${R(-8, a)} } 88%, 100% { transform: rotate(0) }`
    : `0%, 52% { transform: rotate(0) } 56% { transform: rotate(-18deg) } 60% { transform: rotate(18deg) } 64% { transform: rotate(-15deg) } 68% { transform: rotate(13deg) } 72% { transform: rotate(-8deg) } 76% { transform: rotate(4deg) } 80%, 100% { transform: rotate(0) }`;
  const tk = (sx, sy, ex, ey, mx, my) => `0% { opacity: 0; transform: translate(0, 0) } 2% { opacity: 1; transform: translate(0, 0) } 40% { opacity: 1; transform: translate(${mx}px, ${my}px) } 80% { opacity: 1; transform: translate(${ex}px, ${ey}px) } 100% { opacity: 0; transform: translate(${f1(ex * 1.15)}px, ${f1(ey + 8)}px) }`;
  return `
@keyframes fa-su-tu-mane${s} { ${shake} 62% { transform: rotate(0) scale(${f1(1 + 0.1 * a)}) } 80% { transform: rotate(0) scale(1) } 100% { transform: rotate(0) scale(1) } }
@keyframes fa-su-tu-head${s} { ${headShake} 50% { transform: ${R(5, a)} } 60% { transform: ${R(-12, a)} } 80% { transform: ${R(-11, a)} } 90% { transform: ${R(2, a)} } 100% { transform: rotate(0) } }
@keyframes fa-su-tu-jaw${s} { 0%, 50% { opacity: 0; transform: scaleY(.3) } 56% { opacity: 1; transform: scaleY(.5) } 64% { opacity: 1; transform: scaleY(${calm ? '.85' : '1.05'}) } 82% { opacity: 1; transform: scaleY(${calm ? '.8' : '1'}) } 90%, 100% { opacity: 0; transform: scaleY(.3) } }
@keyframes fa-su-tu-smile${s} { 0%, 50% { opacity: 1 } 54%, 86% { opacity: 0 } 92%, 100% { opacity: 1 } }
@keyframes fa-su-tu-roar${s} { 0%, 56% { opacity: 0; transform: scale(.7) } 64% { opacity: 1; transform: scale(.9) } 82% { opacity: 1; transform: scale(${f1(1 + 0.18 * a)}) } 92% { opacity: 0; transform: scale(1.2) } 100% { opacity: 0; transform: scale(.7) } }
@keyframes fa-su-tu-tail${s} { 0% { transform: rotate(0) } 8% { transform: ${R(-8, a)} } 20% { transform: ${R(28, a)} } 32% { transform: ${R(-8, a)} } 44% { transform: ${R(18, a)} } 56% { transform: ${R(-6, a)} } 66% { transform: ${R(30, a)} } 76% { transform: ${R(-8, a)} } 88% { transform: ${R(6, a)} } 100% { transform: rotate(0) } }
@keyframes fa-su-tu-eye${s} { 0%, 40% { transform: scaleY(1) } 43% { transform: scaleY(.1) } 46%, 100% { transform: scaleY(1) } }

@keyframes fa-voi-trunk${s} { 0% { transform: rotate(0) } 12% { transform: ${R(10, a)} } 34% { transform: ${R(-132, aT)} } 42% { transform: ${R(-122, aT)} } 50% { transform: ${R(-127, aT)} } 60% { transform: ${R(-122, aT)} } 70% { transform: ${R(-126, aT)} } 78% { transform: ${R(-122, aT)} } 94% { transform: ${R(4, a)} } 100% { transform: rotate(0) } }
@keyframes fa-voi-ear${s} { ${flaps} }
@keyframes fa-voi-head${s} { 0% { transform: rotate(0) } 12% { transform: ${R(3, a)} } 34%, 76% { transform: ${R(-5, a)} } 94%, 100% { transform: rotate(0) } }
@keyframes fa-voi-body${s} { 0% { transform: translateY(0) } 12% { transform: translateY(${f1(2 * a)}px) } 34% { transform: translateY(${f1(-3 * a)}px) } 46%, 100% { transform: translateY(0) } }
@keyframes fa-voi-tail${s} { 0%, 30% { transform: rotate(0) } 40% { transform: ${R(18, a)} } 52% { transform: ${R(-10, a)} } 64% { transform: ${R(14, a)} } 76%, 100% { transform: rotate(0) } }
@keyframes fa-voi-eye${s} { 0%, 84% { transform: scaleY(1) } 87% { transform: scaleY(.1) } 90%, 100% { transform: scaleY(1) } }
@keyframes fa-voi-dropa${s} { ${tk(0, 0, -50, 6, -26, -16)} }
@keyframes fa-voi-dropb${s} { ${tk(0, 0, -22, 4, -10, -14)} }
@keyframes fa-voi-dropc${s} { ${tk(0, 0, 18, 14, 10, -10)} }

@keyframes fa-xe-dap-bike${s} { 0% { transform: translateX(0) } 8% { transform: translateX(${f1(-3 * a)}px) } 42%, 52% { transform: translateX(${f1(12 * a)}px) } 84% { transform: translateX(${f1(-2 * a)}px) } 92%, 100% { transform: translateX(0) } }
@keyframes fa-xe-dap-wheel${s} { 0% { transform: rotate(0) } 8% { transform: ${R(-20, a)} } 42%, 52% { transform: ${R(380, a)} } 84% { transform: ${R(-10, a)} } 92%, 100% { transform: rotate(0) } }
@keyframes fa-xe-dap-crank${s} { 0%, 8% { transform: rotate(0) } 42%, 100% { transform: rotate(360deg) } }
@keyframes fa-xe-dap-pedal${s} { 0%, 8% { transform: rotate(0) } 42%, 100% { transform: rotate(-360deg) } }
@keyframes fa-xe-dap-bell${s} { ${bell} }
@keyframes fa-xe-dap-ring${s} { 0%, 53% { opacity: 0; transform: scale(.8) } 56% { opacity: 1; transform: scale(.95) } 64% { opacity: 1; transform: scale(1.1) } 68% { opacity: 0; transform: scale(1.25) } 69% { opacity: 0; transform: scale(.8) } 72% { opacity: 1; transform: scale(.95) } 80% { opacity: 1; transform: scale(1.1) } 85% { opacity: 0; transform: scale(1.25) } 100% { opacity: 0; transform: scale(.8) } }

@keyframes fa-yem-bib${s} { 0% { transform: rotate(0) } 16% { transform: ${R(6, a)} } 36% { transform: ${R(-5, a)} } 56% { transform: ${R(3.5, a)} } 74% { transform: ${R(-2, a)} } 88% { transform: ${R(.8, a)} } 100% { transform: rotate(0) } }
@keyframes fa-yem-heart${s} { 0%, 22% { transform: scale(1) } 29% { transform: scale(${f1(1 + 0.2 * a)}) } 35% { transform: scale(1) } 42% { transform: scale(${f1(1 + 0.2 * a)}) } 50%, 100% { transform: scale(1) } }
@keyframes fa-yem-star${s} { 0%, 50% { transform: rotate(0) scale(1) } 62% { transform: rotate(36deg) scale(${f1(1 + 0.35 * a)}) } 74%, 100% { transform: rotate(72deg) scale(1) } }
@keyframes fa-yem-spark${s} { 0%, 52% { opacity: 0; transform: scale(.3) } 62% { opacity: 1; transform: scale(1.1) } 74% { opacity: 1; transform: scale(.9) } 84%, 100% { opacity: 0; transform: scale(.3) } }
`;
};

const ORIGIN = (sel, x, y) => `.fa-${sel} { transform-box: view-box; transform-origin: ${x}px ${y}px; }`;
/** Động tác: chạy một lần khi một khối cha có class `is-play` (thêm lại class để chạy lại). */
const PLAYS = [
  // [selector after .fa-<key>, keyframes name, duration, timing, delay]
  ['su-tu .p-mane', 'su-tu-mane', 2.4], ['su-tu .p-head', 'su-tu-head', 2.4], ['su-tu .p-jaw', 'su-tu-jaw', 2.4],
  ['su-tu .p-smile', 'su-tu-smile', 2.4], ['su-tu .p-roar', 'su-tu-roar', 2.4], ['su-tu .p-tail', 'su-tu-tail', 2.4], ['su-tu .p-eye', 'su-tu-eye', 2.4],
  ['voi .p-trunk', 'voi-trunk', 2.4], ['voi .p-ear', 'voi-ear', 2.4], ['voi .p-head', 'voi-head', 2.4], ['voi .p-body', 'voi-body', 2.4],
  ['voi .p-tail', 'voi-tail', 2.4], ['voi .p-eye', 'voi-eye', 2.4],
  ['voi .p-d1', 'voi-dropa', 0.7, 'linear', 0.86], ['voi .p-d2', 'voi-dropb', 0.6, 'linear', 0.96], ['voi .p-d3', 'voi-dropc', 0.6, 'linear', 1.06],
  ['voi .p-d4', 'voi-dropa', 0.7, 'linear', 1.2], ['voi .p-d5', 'voi-dropb', 0.6, 'linear', 1.36],
  ['xe-dap .p-bike', 'xe-dap-bike', 2.4], ['xe-dap .p-wheel', 'xe-dap-wheel', 2.4], ['xe-dap .p-crank', 'xe-dap-crank', 2.4],
  ['xe-dap .p-pedal1', 'xe-dap-pedal', 2.4], ['xe-dap .p-pedal2', 'xe-dap-pedal', 2.4], ['xe-dap .p-bell', 'xe-dap-bell', 2.4], ['xe-dap .p-ring', 'xe-dap-ring', 2.4],
  ['yem .p-bib', 'yem-bib', 2.4], ['yem .p-heart', 'yem-heart', 2.4], ['yem .p-star1', 'yem-star', 2.4], ['yem .p-star2', 'yem-star', 2.4, 'ease-in-out', 0.2],
  ['yem .p-spark1', 'yem-spark', 2.4], ['yem .p-spark2', 'yem-spark', 2.4, 'ease-in-out', 0.2], ['yem .p-spark3', 'yem-spark', 2.2, 'ease-in-out', 0.35],
];
const play = (calm) => PLAYS.map(([sel, name, dur, ease = 'ease-in-out', delay = 0]) =>
  `.is-play .fa-${sel} { animation: fa-${name}${calm ? '-calm' : ''} ${dur}s ${ease} ${delay}s both; }`).join('\n');

export const CSS = `
${ORIGIN('su-tu .p-tail', 40, 106)}
${ORIGIN('su-tu .p-head', 150, 116)}
${ORIGIN('su-tu .p-mane', 160, 80)}
${ORIGIN('su-tu .p-jaw', 161, 96)}
${ORIGIN('su-tu .p-roar', 214, 90)}
${ORIGIN('su-tu .p-eye', 161, 77)}
${ORIGIN('voi .p-trunk', 180, 84)}
${ORIGIN('voi .p-ear', 150, 72)}
${ORIGIN('voi .p-head', 140, 100)}
${ORIGIN('voi .p-body', 94, 140)}
${ORIGIN('voi .p-tail', 38, 96)}
${ORIGIN('voi .p-eye', 168, 58)}
${ORIGIN('voi .p-drop', 198, 30)}
${ORIGIN('xe-dap .p-bike', 116, 160)}
${ORIGIN('xe-dap .p-wheel-b', 52, 122)}
${ORIGIN('xe-dap .p-wheel-f', 180, 122)}
${ORIGIN('xe-dap .p-crank', 112, 124)}
${ORIGIN('xe-dap .p-pedal1', 127, 146.5)}
${ORIGIN('xe-dap .p-pedal2', 98, 102)}
${ORIGIN('xe-dap .p-bell', 163, 36)}
${ORIGIN('xe-dap .p-ring', 163, 26)}
${ORIGIN('yem .p-bib', 120, 13)}
${ORIGIN('yem .p-heart', 120, 120)}
${ORIGIN('yem .p-star1', 68, 118)}
${ORIGIN('yem .p-star2', 172, 118)}
${ORIGIN('yem .p-spark1', 56, 100)}
${ORIGIN('yem .p-spark2', 186, 98)}
${ORIGIN('yem .p-spark3', 84, 132)}
${play(false)}
${KF(1, false)}
@media (prefers-reduced-motion: reduce) {
${play(true)}
.fa-voi .p-water { transform: translate(15px, 15px); }
}
${KF(0.6, true)}
`;
