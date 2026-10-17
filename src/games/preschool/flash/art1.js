/** Tranh thẻ chữ cái (preschool/flash): cá sấu, rắn, gấu, bò, cò. Vẽ riêng, nét INK; mỗi hình có động tác riêng (CSS bên dưới). */
const INK = '#3F3A40';
const O = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const O3 = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const SH = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="7" fill="#000" opacity=".08"/>`;
const EYE = (x, y, s = 1) => `<ellipse cx="${x}" cy="${y}" rx="${4.5 * s}" ry="${5.5 * s}" fill="${INK}"/><circle cx="${x + 1.6 * s}" cy="${y - 2 * s}" r="${1.7 * s}" fill="#fff"/>`;
const BL = (x, y, rx = 7, ry = 4.5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FDA4AF" opacity=".8"/>`;
// thick outlined stroke (limbs, necks): ink under, colour on top
const TUBE = (d, w, fill) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

export const ART = {
  'ca-sau': `<svg class="fa fa-ca-sau" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(114, 152, 100)}
<g class="p-walk">
<g class="p-legff"><rect x="156" y="104" width="17" height="38" rx="7" fill="#16A34A" ${O}/><ellipse cx="168" cy="143" rx="11" ry="5" fill="#16A34A" ${O}/></g>
<g class="p-legfb"><rect x="96" y="106" width="17" height="38" rx="7" fill="#16A34A" ${O}/><ellipse cx="108" cy="145" rx="11" ry="5" fill="#16A34A" ${O}/></g>
<g class="p-tail">
<g fill="#22C55E" ${O3}><circle cx="56" cy="104" r="5"/><circle cx="40" cy="111" r="4"/><circle cx="26" cy="117" r="3.5"/></g>
<path d="M72,98 C52,102 30,112 8,123 Q5,128 12,128 C34,130 54,128 74,126 Z" fill="#4ADE80" ${O}/>
<path d="M30,124 Q50,124 68,121" fill="none" ${O3}/>
</g>
<g fill="#22C55E" ${O3}><circle cx="78" cy="92" r="6"/><circle cx="100" cy="84" r="7"/><circle cx="124" cy="80" r="7"/><circle cx="148" cy="80" r="7"/></g>
<path d="M62,102 C80,84 136,76 172,84 L178,120 C152,132 100,134 64,126 C54,120 54,108 62,102 Z" fill="#4ADE80" ${O}/>
<path d="M68,119 C100,126 148,124 175,113 L176,119 C150,128 100,130 67,124 Z" fill="#BBF7D0"/>
<g fill="#22C55E"><ellipse cx="96" cy="100" rx="9" ry="5"/><ellipse cx="126" cy="95" rx="10" ry="5.5"/><ellipse cx="153" cy="99" rx="7" ry="4.5"/><ellipse cx="76" cy="108" rx="5" ry="3.5"/></g>
<path d="M66,118 C100,126 148,124 176,112" fill="none" ${O3}/>
<g class="p-legnb"><rect x="72" y="110" width="20" height="36" rx="8" fill="#4ADE80" ${O}/><ellipse cx="86" cy="147" rx="13" ry="6" fill="#4ADE80" ${O}/><path d="M86,150 L87,153 M94,149 L96,152" ${O3}/></g>
<g class="p-legnf"><rect x="132" y="112" width="20" height="36" rx="8" fill="#4ADE80" ${O}/><ellipse cx="146" cy="148" rx="13" ry="6" fill="#4ADE80" ${O}/><path d="M146,151 L147,154 M154,150 L156,153" ${O3}/></g>
<g class="p-head">
<path d="M170,104 L204,80 L214,104 L206,113 Z" fill="#9F1239"/>
<g class="p-roof"><path d="M170,104 L227,103 L220,114 L178,116 Z" fill="#9F1239"/></g>
<g class="p-jaw">
<path d="M171,104 L225,102 L216,90 L186,88 Z" fill="#9F1239"/>
<path d="M180,103 Q200,93 220,101 Z" fill="#FB7185"/>
<path d="M170,104 L226,102 Q234,104 229,111 Q212,119 176,118 Z" fill="#4ADE80" ${O}/>
<path d="M182,114 Q206,116 224,109" fill="none" stroke="#BBF7D0" stroke-width="4" stroke-linecap="round"/>
<g fill="#fff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"><polygon points="189,104 193,97 197,104"/><polygon points="203,103.5 207,96.5 211,103.5"/><polygon points="216,103 219.5,97 223,103"/></g>
</g>
<g class="p-snout">
<path d="M158,88 C160,70 172,60 186,62 C196,64 200,72 204,77 L224,83 Q234,88 230,96 L228,103 L170,104 Z" fill="#4ADE80" ${O}/>
<g fill="#fff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"><polygon points="182,103 186,111 190,103"/><polygon points="196,102.5 200,110 204,102.5"/><polygon points="210,102 214,109 218,102"/></g>
<path d="M212,80 Q218,78 224,83" fill="none" stroke="#86EFAC" stroke-width="3" stroke-linecap="round"/>
<circle cx="186" cy="68" r="10" fill="#fff" ${O3}/>
${EYE(188, 69, 0.9)}
<ellipse cx="223" cy="87" rx="2.5" ry="2" fill="${INK}"/>
${BL(198, 92)}
<path d="M170,104 Q165,100 167,95" fill="none" ${O3}/>
</g>
</g>
</g>
</svg>`,

  'ran': `<svg class="fa fa-ran" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(112, 164, 92)}
<g class="p-c1">
${TUBE('M44,146 Q14,152 16,128', 9, '#FB923C')}
<ellipse cx="112" cy="138" rx="92" ry="26" fill="#FB923C" ${O}/>
<path d="M40,146 C80,162 150,162 190,142" fill="none" stroke="#FED7AA" stroke-width="5" stroke-linecap="round"/>
<g fill="#FDE047" ${O3}><ellipse cx="44" cy="140" rx="8" ry="5"/><ellipse cx="86" cy="152" rx="9" ry="5"/><ellipse cx="136" cy="152" rx="9" ry="5"/><ellipse cx="180" cy="140" rx="8" ry="5"/></g>
</g>
<g class="p-c2">
<ellipse cx="112" cy="114" rx="70" ry="22" fill="#FB923C" ${O}/>
<g fill="#FDE047" ${O3}><ellipse cx="62" cy="118" rx="7" ry="4.5"/><ellipse cx="108" cy="127" rx="8" ry="4.5"/><ellipse cx="156" cy="120" rx="7" ry="4.5"/></g>
</g>
<g class="p-neck">
${TUBE('M110,96 C104,70 126,60 152,54', 22, '#FB923C')}
<path d="M108,84 C110,70 124,64 140,60" fill="none" stroke="#FED7AA" stroke-width="5" stroke-linecap="round"/>
<g fill="#FDE047" ${O3}><ellipse cx="120" cy="66" rx="5" ry="3.5" transform="rotate(-40 120 66)"/><ellipse cx="138" cy="56" rx="5" ry="3.5" transform="rotate(-15 138 56)"/></g>
<g class="p-head">
<g class="p-tongue"><path d="M190,57 L210,58 M210,58 L219,52 M210,58 L219,64" fill="none" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></g>
<ellipse cx="168" cy="46" rx="30" ry="23" fill="#FB923C" ${O}/>
<path d="M146,40 Q158,26 176,26" fill="none" stroke="#FED7AA" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="158" cy="38" rx="5" ry="3.5" fill="#FDE047" ${O3}/>
<circle cx="177" cy="39" r="9" fill="#fff" ${O3}/>
${EYE(179, 40, 0.95)}
<ellipse cx="193" cy="44" rx="1.8" ry="1.5" fill="${INK}"/>
${BL(186, 54, 6, 4)}
<path d="M176,58 Q186,63 194,55" fill="none" ${O3}/>
</g>
</g>
<g class="p-c3">
<ellipse cx="112" cy="94" rx="46" ry="17" fill="#FB923C" ${O}/>
<g fill="#FDE047" ${O3}><ellipse cx="88" cy="99" rx="6" ry="4"/><ellipse cx="134" cy="99" rx="6" ry="4"/></g>
</g>
</svg>`,

  'gau': `<svg class="fa fa-gau" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(120, 162, 74)}
<rect x="56" y="122" width="32" height="42" rx="14" fill="#92400E" ${O}/>
<rect x="152" y="122" width="32" height="42" rx="14" fill="#92400E" ${O}/>
<ellipse cx="71" cy="157" rx="9" ry="4" fill="#FCD9A8"/><ellipse cx="169" cy="157" rx="9" ry="4" fill="#FCD9A8"/>
<g class="p-up">
<ellipse cx="120" cy="122" rx="50" ry="40" fill="#B45309" ${O}/>
<ellipse cx="120" cy="130" rx="28" ry="24" fill="#FCD9A8"/>
<g class="p-head">
<g class="p-earl"><circle cx="84" cy="38" r="15" fill="#B45309" ${O}/><circle cx="85" cy="39" r="7" fill="#FDBA74"/></g>
<g class="p-earr"><circle cx="156" cy="38" r="15" fill="#B45309" ${O}/><circle cx="155" cy="39" r="7" fill="#FDBA74"/></g>
<circle cx="120" cy="68" r="42" fill="#B45309" ${O}/>
<path d="M92,44 Q104,32 120,32" fill="none" stroke="#D97706" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="120" cy="88" rx="22" ry="16" fill="#FCD9A8" ${O}/>
<ellipse cx="120" cy="80" rx="9" ry="6" fill="${INK}"/><ellipse cx="117" cy="78" rx="3" ry="1.6" fill="#fff"/>
<path d="M120,86 L120,91 M110,93 Q115,98 120,91 Q125,98 130,93" fill="none" ${O3}/>
${EYE(103, 62)} ${EYE(137, 62)}
${BL(92, 80)} ${BL(148, 80)}
</g>
<g class="p-arml"><rect x="78" y="102" width="26" height="58" rx="13" fill="#B45309" ${O}/><ellipse cx="91" cy="151" rx="8" ry="5" fill="#FCD9A8"/><path d="M84,158 L84,162 M91,158 L91,162 M98,158 L98,162" ${O3}/></g>
<g class="p-armr"><rect x="136" y="102" width="26" height="58" rx="13" fill="#B45309" ${O}/><ellipse cx="149" cy="151" rx="8" ry="5" fill="#FCD9A8"/><path d="M142,158 L142,162 M149,158 L149,162 M156,158 L156,162" ${O3}/></g>
</g>
</svg>`,

  'bo': `<svg class="fa fa-bo" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
${SH(116, 162, 96)}
<g class="p-tail">
<path d="M34,72 Q16,90 22,116" fill="none" ${O}/>
<path d="M16,116 Q22,108 28,116 Q30,128 22,130 Q14,128 16,116 Z" fill="${INK}" ${O3}/>
</g>
<rect x="58" y="110" width="20" height="48" rx="8" fill="#E2E8F0" ${O}/>
<rect x="128" y="110" width="20" height="48" rx="8" fill="#E2E8F0" ${O}/>
<rect x="58" y="150" width="20" height="9" rx="3" fill="${INK}"/>
<rect x="128" y="150" width="20" height="9" rx="3" fill="${INK}"/>
<g class="p-body">
<ellipse cx="104" cy="126" rx="17" ry="11" fill="#F9A8D4" ${O}/>
<path d="M96,134 L96,140 M104,135 L104,141 M112,134 L112,140" ${O3}/>
<rect x="28" y="56" width="150" height="72" rx="34" fill="#fff" ${O}/>
<g fill="${INK}"><path d="M60,62 Q80,58 90,72 Q86,92 66,90 Q50,84 52,70 Z"/><path d="M120,90 Q140,84 152,96 Q150,116 130,120 Q114,110 120,90 Z"/><path d="M138,60 Q156,58 164,70 Q154,80 140,74 Z"/><path d="M38,98 Q48,96 50,108 Q44,118 36,112 Z"/></g>
<path d="M50,66 Q70,58 96,58" fill="none" stroke="#F1F5F9" stroke-width="5" stroke-linecap="round"/>
</g>
<rect x="40" y="114" width="22" height="48" rx="9" fill="#fff" ${O}/>
<rect x="146" y="114" width="22" height="48" rx="9" fill="#fff" ${O}/>
<rect x="40" y="152" width="22" height="10" rx="3" fill="${INK}"/>
<rect x="146" y="152" width="22" height="10" rx="3" fill="${INK}"/>
<g class="p-head">
<path d="M164,44 Q154,28 162,18 Q168,30 174,40 Z" fill="#FEF3C7" ${O}/>
<path d="M198,40 Q206,26 216,22 Q214,34 208,44 Z" fill="#FEF3C7" ${O}/>
<g class="p-earl"><ellipse cx="152" cy="58" rx="15" ry="8" fill="#fff" transform="rotate(-20 152 58)" ${O}/><ellipse cx="152" cy="58" rx="7" ry="3.5" fill="#F9A8D4" transform="rotate(-20 152 58)"/></g>
<g class="p-earr"><ellipse cx="220" cy="56" rx="15" ry="8" fill="#fff" transform="rotate(20 220 56)" ${O}/><ellipse cx="220" cy="56" rx="7" ry="3.5" fill="#F9A8D4" transform="rotate(20 220 56)"/></g>
<ellipse cx="186" cy="70" rx="30" ry="32" fill="#fff" ${O}/>
<path d="M170,44 Q184,38 196,46 Q190,58 176,56 Z" fill="${INK}"/>
${EYE(174, 66)} ${EYE(198, 66)}
${BL(163, 80, 6, 4)} ${BL(210, 80, 6, 4)}
<ellipse cx="187" cy="96" rx="30" ry="18" fill="#F9A8D4" ${O}/>
<ellipse cx="177" cy="92" rx="3" ry="4" fill="${INK}"/>
<ellipse cx="197" cy="92" rx="3" ry="4" fill="${INK}"/>
<path class="p-smile" d="M178,103 Q187,109 196,103" fill="none" ${O3}/>
<g class="p-moo" opacity="0"><ellipse cx="187" cy="104" rx="9" ry="7" fill="#7F1D1D" ${O3}/><ellipse cx="187" cy="108" rx="5" ry="2.5" fill="#FB7185"/></g>
</g>
</svg>`,

  'co': `<svg class="fa fa-co" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="138" cy="166" rx="88" ry="10" fill="#7DD3FC" opacity=".55"/>
<path d="M76,164 Q90,161 104,164 M150,168 Q166,165 182,168" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>
<ellipse class="p-ripple" cx="190" cy="166" rx="22" ry="6" fill="none" stroke="#fff" stroke-width="3" opacity="0"/>
<g class="p-legf">
${TUBE('M98,104 L92,134 L96,163', 4, '#EAB308')}
${TUBE('M86,164 L106,164', 4, '#EAB308')}
</g>
<g class="p-legn">
${TUBE('M116,104 L122,134', 4, '#FACC15')}
<g class="p-shin">${TUBE('M122,134 L118,163', 4, '#FACC15')}${TUBE('M108,164 L130,164', 4, '#FACC15')}</g>
</g>
<g class="p-bird">
<g class="p-wingf"><path d="M126,80 C110,64 78,64 54,78 L44,90 L58,90 L50,99 L66,96 L62,104 C88,104 114,98 126,80 Z" fill="#E2E8F0" ${O}/></g>
<path d="M54,80 L14,92 L26,98 L16,108 L60,102 Z" fill="#fff" ${O}/>
<g class="p-neck">
${TUBE('M130,74 C150,62 140,44 150,32 C156,25 162,23 168,24', 12, '#fff')}
<g class="p-head">
<path d="M158,18 Q146,12 138,18 Q148,18 156,24 Z" fill="#fff" ${O3}/>
<path d="M178,20 L226,29 L178,33 Z" fill="#FACC15" ${O}/>
<path d="M180,27 L222,29" fill="none" stroke="#CA8A04" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="170" cy="26" r="14" fill="#fff" ${O}/>
${EYE(173, 22, 0.8)}
${BL(166, 33, 5, 3)}
</g>
</g>
<path d="M38,90 C48,62 90,56 128,64 C152,70 158,92 140,106 C120,120 66,118 38,90 Z" fill="#fff" ${O}/>
<path d="M60,104 C84,114 118,112 136,100" fill="none" stroke="#E2E8F0" stroke-width="5" stroke-linecap="round"/>
<g class="p-wingn"><path d="M128,80 C112,64 80,64 56,78 L46,90 L60,90 L52,99 L68,96 L64,104 C90,104 116,98 128,80 Z" fill="#F8FAFC" ${O}/><path d="M76,88 Q96,84 116,86" fill="none" ${O3}/></g>
</g>
</svg>`,
};

// biên độ nhân với --k (1 bình thường, .6 khi giảm chuyển động)
const K = v => `calc(${v} * var(--k, 1))`;
const R = d => `rotate(${K(d + 'deg')})`;
const T = (x, y) => `translate(${K(x + 'px')}, ${K(y + 'px')})`;
const S = (a, b) => `scale(calc(1 + ${+(a - 1).toFixed(3)} * var(--k, 1)), calc(1 + ${+(b - 1).toFixed(3)} * var(--k, 1)))`;
// tư thế lớn (há miệng, giơ tay, cúi mổ): phần gốc giữ nguyên, phần thêm nhân --k
const P = (base, extra) => `rotate(calc(${base}deg + ${extra}deg * var(--k, 1)))`;
const PIV = (key, part, x, y) => `.fa-${key} .${part} { transform-box: view-box; transform-origin: ${x}px ${y}px; }`;

/** Động tác: chạy một lần khi một khối cha có class `is-play` (thêm lại class để chạy lại). */
export const CSS = `
${PIV('ca-sau', 'p-walk', 120, 150)}
${PIV('ca-sau', 'p-tail', 72, 112)}
${PIV('ca-sau', 'p-legnb', 82, 114)}
${PIV('ca-sau', 'p-legnf', 142, 116)}
${PIV('ca-sau', 'p-legfb', 104, 110)}
${PIV('ca-sau', 'p-legff', 164, 108)}
${PIV('ca-sau', 'p-head', 168, 104)}
${PIV('ca-sau', 'p-snout', 171, 103)}
${PIV('ca-sau', 'p-roof', 171, 103)}
${PIV('ca-sau', 'p-jaw', 171, 104)}
.is-play .fa-ca-sau .p-walk { animation: fa-ca-sau-walk 2.4s ease-in-out both; }
.is-play .fa-ca-sau .p-tail { animation: fa-ca-sau-tail 2.4s ease-in-out both; }
.is-play .fa-ca-sau .p-legnb, .is-play .fa-ca-sau .p-legff { animation: fa-ca-sau-stepa 2.4s ease-in-out both; }
.is-play .fa-ca-sau .p-legnf, .is-play .fa-ca-sau .p-legfb { animation: fa-ca-sau-stepb 2.4s ease-in-out both; }
.is-play .fa-ca-sau .p-head { animation: fa-ca-sau-head 2.4s ease-in-out both; }
.is-play .fa-ca-sau .p-snout, .is-play .fa-ca-sau .p-roof { animation: fa-ca-sau-snout 2.4s ease-in-out both; }
.is-play .fa-ca-sau .p-jaw { animation: fa-ca-sau-jaw 2.4s ease-in-out both; }
@keyframes fa-ca-sau-walk { 0%,100% { transform: none } 9% { transform: ${T(3, -2)} } 18% { transform: ${T(5, 0)} } 27% { transform: ${T(8, -2)} } 36%,84% { transform: ${T(10, 0)} } }
@keyframes fa-ca-sau-stepa { 0%,40%,100% { transform: none } 9% { transform: ${R(-16)} translateY(-3px) } 18% { transform: ${R(10)} } 27% { transform: ${R(-16)} translateY(-3px) } 36% { transform: ${R(6)} } }
@keyframes fa-ca-sau-stepb { 0%,40%,100% { transform: none } 9% { transform: ${R(10)} } 18% { transform: ${R(-16)} translateY(-3px) } 27% { transform: ${R(10)} } 36% { transform: ${R(-8)} translateY(-2px) } }
@keyframes fa-ca-sau-tail { 0%,100% { transform: none } 12% { transform: ${R(8)} } 24% { transform: ${R(-8)} } 36% { transform: ${R(8)} } 50% { transform: ${R(-5)} } 70% { transform: ${R(7)} } 78% { transform: ${R(-6)} } 90% { transform: ${R(3)} } }
@keyframes fa-ca-sau-head { 0%,40%,86%,100% { transform: none } 46% { transform: ${R(4)} } 55%,68% { transform: ${R(-8)} } 73% { transform: ${R(4)} } 79% { transform: ${R(-2)} } }
@keyframes fa-ca-sau-snout { 0%,42%,77%,100% { transform: none } 46% { transform: ${R(3)} } 55% { transform: ${P(-22, -12)} } 68% { transform: ${P(-20, -10)} } 72% { transform: ${R(2)} } }
@keyframes fa-ca-sau-jaw { 0%,46%,77%,100% { transform: none } 55% { transform: ${P(10, 5)} } 68% { transform: ${P(9, 4)} } 72% { transform: ${R(-1)} } }

${PIV('ran', 'p-neck', 112, 98)}
${PIV('ran', 'p-head', 150, 56)}
${PIV('ran', 'p-tongue', 190, 58)}
${PIV('ran', 'p-c1', 112, 162)}
${PIV('ran', 'p-c2', 112, 134)}
${PIV('ran', 'p-c3', 112, 110)}
.is-play .fa-ran .p-neck { animation: fa-ran-neck 2.4s ease-in-out both; }
.is-play .fa-ran .p-head { animation: fa-ran-head 2.4s ease-in-out both; }
.is-play .fa-ran .p-tongue { animation: fa-ran-tongue 2.4s linear both; }
.is-play .fa-ran .p-c1 { animation: fa-ran-c1 2.4s ease-in-out both; }
.is-play .fa-ran .p-c2 { animation: fa-ran-c2 2.4s ease-in-out both; }
.is-play .fa-ran .p-c3 { animation: fa-ran-c3 2.4s ease-in-out both; }
@keyframes fa-ran-neck { 0%,100% { transform: none } 10% { transform: ${T(0, 4)} ${R(4)} } 26% { transform: ${T(0, -12)} ${R(-10)} } 44% { transform: ${T(0, -12)} ${R(8)} } 62% { transform: ${T(0, -8)} ${R(-7)} } 78% { transform: ${T(0, -3)} ${R(3)} } 90% { transform: ${R(-1)} } }
@keyframes fa-ran-head { 0%,100% { transform: none } 10% { transform: ${R(-4)} } 26% { transform: ${R(13)} } 44% { transform: ${R(-12)} } 62% { transform: ${R(10)} } 78% { transform: ${R(-4)} } 90% { transform: ${R(1)} } }
@keyframes fa-ran-tongue { 0%,28%,66%,100% { transform: none } 34% { transform: scale(.1, 1) } 41% { transform: scale(1.2, 1.1) } 48% { transform: scale(.1, 1) } 56% { transform: scale(1.2, 1.1) } }
@keyframes fa-ran-c1 { 0%,36%,100% { transform: none } 18% { transform: ${S(1.04, 0.94)} } 60% { transform: ${S(0.98, 1.03)} } 76% { transform: ${S(1.03, 0.96)} } 90% { transform: none } }
@keyframes fa-ran-c2 { 0%,46%,100% { transform: none } 28% { transform: ${S(1.05, 0.93)} } 66% { transform: ${S(0.98, 1.04)} } 82% { transform: ${S(1.03, 0.96)} } 94% { transform: none } }
@keyframes fa-ran-c3 { 0%,56%,100% { transform: none } 38% { transform: ${S(1.06, 0.92)} } 72% { transform: ${S(0.97, 1.05)} } 88% { transform: ${S(1.03, 0.96)} } }

${PIV('gau', 'p-up', 120, 162)}
${PIV('gau', 'p-head', 120, 104)}
${PIV('gau', 'p-earl', 94, 50)}
${PIV('gau', 'p-earr', 146, 50)}
${PIV('gau', 'p-arml', 91, 112)}
${PIV('gau', 'p-armr', 149, 112)}
.is-play .fa-gau .p-up { animation: fa-gau-up 2.5s ease-in-out both; }
.is-play .fa-gau .p-head { animation: fa-gau-head 2.5s ease-in-out both; }
.is-play .fa-gau .p-earl { animation: fa-gau-earl 2.5s ease-in-out both; }
.is-play .fa-gau .p-earr { animation: fa-gau-earr 2.5s ease-in-out both; }
.is-play .fa-gau .p-arml { animation: fa-gau-arml 2.5s ease-in-out both; }
.is-play .fa-gau .p-armr { animation: fa-gau-armr 2.5s ease-in-out both; }
@keyframes fa-gau-up { 0%,100% { transform: none } 10% { transform: ${T(0, 2)} ${S(1.05, 0.93)} } 24% { transform: ${T(0, -15)} ${S(0.97, 1.04)} } 30%,70% { transform: ${T(0, -13)} } 80% { transform: ${T(0, 2)} ${S(1.05, 0.93)} } 88% { transform: ${S(0.99, 1.01)} } }
@keyframes fa-gau-arml { 0%,88%,100% { transform: none } 10% { transform: ${R(-6)} } 24% { transform: ${P(124, 16)} } 32%,68% { transform: ${P(118, 10)} } 50% { transform: ${P(124, 12)} } 80% { transform: ${R(-4)} } }
@keyframes fa-gau-armr { 0%,88%,100% { transform: none } 10% { transform: ${R(6)} } 24% { transform: ${P(-124, -16)} } 32% { transform: ${P(-134, -18)} } 40% { transform: ${P(-134, 16)} } 48% { transform: ${P(-134, -18)} } 56% { transform: ${P(-134, 16)} } 64%,68% { transform: ${P(-124, -14)} } 80% { transform: ${R(4)} } }
@keyframes fa-gau-head { 0%,24%,78%,100% { transform: none } 34% { transform: ${R(-7)} } 48% { transform: ${R(7)} } 62% { transform: ${R(-5)} } }
@keyframes fa-gau-earl { 0%,26%,48%,58%,72%,100% { transform: none } 32% { transform: ${R(-16)} } 38% { transform: ${R(8)} } 44% { transform: ${R(-10)} } 64% { transform: ${R(-14)} } }
@keyframes fa-gau-earr { 0%,26%,48%,58%,72%,100% { transform: none } 32% { transform: ${R(16)} } 38% { transform: ${R(-8)} } 44% { transform: ${R(10)} } 64% { transform: ${R(14)} } }

${PIV('bo', 'p-tail', 34, 72)}
${PIV('bo', 'p-body', 104, 128)}
${PIV('bo', 'p-head', 168, 98)}
${PIV('bo', 'p-earl', 164, 62)}
${PIV('bo', 'p-earr', 208, 60)}
${PIV('bo', 'p-moo', 187, 104)}
.is-play .fa-bo .p-tail { animation: fa-bo-tail 2.4s ease-in-out both; }
.is-play .fa-bo .p-body { animation: fa-bo-body 2.4s ease-in-out both; }
.is-play .fa-bo .p-head { animation: fa-bo-head 2.4s ease-in-out both; }
.is-play .fa-bo .p-earl { animation: fa-bo-earl 2.4s ease-in-out both; }
.is-play .fa-bo .p-earr { animation: fa-bo-earr 2.4s ease-in-out both; }
.is-play .fa-bo .p-moo { animation: fa-bo-moo 2.4s ease-in-out both; }
.is-play .fa-bo .p-smile { animation: fa-bo-smile 2.4s ease-in-out both; }
@keyframes fa-bo-tail { 0%,100% { transform: none } 12% { transform: ${R(20)} } 26% { transform: ${R(-18)} } 40% { transform: ${R(22)} } 54% { transform: ${R(-16)} } 68% { transform: ${R(14)} } 82% { transform: ${R(-7)} } }
@keyframes fa-bo-body { 0%,16%,74%,100% { transform: none } 24% { transform: ${S(1.03, 0.95)} } 36% { transform: ${S(0.98, 1.03)} } 50% { transform: ${S(1.01, 0.99)} } 64% { transform: ${S(0.99, 1.02)} } }
@keyframes fa-bo-head { 0%,14%,88%,100% { transform: none } 22% { transform: ${T(0, 3)} ${R(5)} } 36% { transform: ${P(-10, -7)} } 48% { transform: ${P(-9, -5)} } 60% { transform: ${P(-10, -7)} } 68% { transform: ${P(-9, -6)} } 78% { transform: ${R(3)} } }
@keyframes fa-bo-earl { 0%,18%,72%,84%,100% { transform: none } 6% { transform: ${R(22)} } 12% { transform: ${R(-8)} } 36% { transform: ${R(-14)} } 78% { transform: ${R(20)} } }
@keyframes fa-bo-earr { 0%,18%,72%,84%,100% { transform: none } 6% { transform: ${R(-22)} } 12% { transform: ${R(8)} } 36% { transform: ${R(14)} } 78% { transform: ${R(-20)} } }
@keyframes fa-bo-moo { 0%,26%,72%,100% { opacity: 0; transform: scale(.3) } 36% { opacity: 1; transform: scale(1) } 50% { opacity: 1; transform: scale(1.12, 1.2) } 64% { opacity: 1; transform: scale(1) } }
@keyframes fa-bo-smile { 0%,26%,72%,100% { opacity: 1 } 32%,66% { opacity: 0 } }

${PIV('co', 'p-bird', 108, 108)}
${PIV('co', 'p-neck', 132, 76)}
${PIV('co', 'p-head', 166, 26)}
${PIV('co', 'p-wingn', 126, 80)}
${PIV('co', 'p-wingf', 122, 78)}
${PIV('co', 'p-legn', 116, 104)}
${PIV('co', 'p-shin', 122, 134)}
${PIV('co', 'p-ripple', 190, 166)}
.is-play .fa-co .p-bird { animation: fa-co-bird 2.6s ease-in-out both; }
.is-play .fa-co .p-neck { animation: fa-co-neck 2.6s ease-in-out both; }
.is-play .fa-co .p-head { animation: fa-co-head 2.6s ease-in-out both; }
.is-play .fa-co .p-wingn { animation: fa-co-wingn 2.6s ease-in-out both; }
.is-play .fa-co .p-wingf { animation: fa-co-wingf 2.6s ease-in-out both; }
.is-play .fa-co .p-legn { animation: fa-co-legn 2.6s ease-in-out both; }
.is-play .fa-co .p-shin { animation: fa-co-shin 2.6s ease-in-out both; }
.is-play .fa-co .p-ripple { animation: fa-co-ripple 2.6s ease-out both; }
@keyframes fa-co-wingn { 0%,38%,100% { transform: none } 9% { transform: ${R(78)} } 17% { transform: ${R(8)} } 26% { transform: ${R(82)} } 34% { transform: ${R(6)} } }
@keyframes fa-co-wingf { 0%,38%,100% { transform: none } 9% { transform: ${R(62)} } 17% { transform: ${R(6)} } 26% { transform: ${R(66)} } 34% { transform: ${R(4)} } }
@keyframes fa-co-legn { 0%,52%,100% { transform: none } 18%,42% { transform: ${R(-22)} } }
@keyframes fa-co-shin { 0%,52%,100% { transform: none } 18%,42% { transform: ${R(80)} } }
@keyframes fa-co-bird { 0%,100% { transform: none } 9% { transform: ${T(0, -5)} } 17% { transform: ${T(0, 1)} } 26% { transform: ${T(0, -5)} } 34%,44% { transform: none } 60%,70% { transform: ${P(10, 6)} } 86% { transform: ${R(-2)} } 94% { transform: none } }
@keyframes fa-co-neck { 0%,44%,100% { transform: none } 60% { transform: ${P(32, 18)} } 64% { transform: ${P(36, 20)} } 68% { transform: ${P(32, 18)} } 70% { transform: ${P(34, 20)} } 86% { transform: ${R(-4)} } 94% { transform: none } }
@keyframes fa-co-head { 0%,44%,100% { transform: none } 60%,70% { transform: ${P(18, 8)} } 86% { transform: ${R(-3)} } 94% { transform: none } }
@keyframes fa-co-ripple { 0%,62%,100% { opacity: 0; transform: scale(.3) } 65% { opacity: 1; transform: scale(.5) } 84% { opacity: 0; transform: scale(1.5) } }

@media (prefers-reduced-motion: reduce) {
  .fa-ca-sau, .fa-ran, .fa-gau, .fa-bo, .fa-co { --k: .6; }
}
`;
