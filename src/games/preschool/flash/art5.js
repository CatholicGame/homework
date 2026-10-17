/** Tranh thẻ chữ cái (preschool/flash): quạ, rùa, sóc, tôm, mũ. Vẽ riêng, nét INK; mỗi hình có động tác riêng (CSS bên dưới). */
const INK = '#3F3A40';
const O = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const T = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none"`;
const BL = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4.5" fill="#FDA4AF" opacity=".8"/>`;
const EYE = (x, y, s = 1) => `<g class="p-eye"><ellipse cx="${x}" cy="${y}" rx="${4.6 * s}" ry="${5.8 * s}" fill="${INK}"/><circle cx="${x + 1.6 * s}" cy="${y - 2.2 * s}" r="${1.9 * s}" fill="#fff"/></g>`;
const SPARK = (x, y, s) => `<path d="M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z" fill="#FEF08A" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;

export const ART = {
  'qua': `<svg class="fa fa-qua" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<g class="p-shadow"><ellipse cx="118" cy="166" rx="66" ry="7" fill="#000" opacity=".08"/></g>
<g class="p-bird">
<path d="M104 136 L100 160 M126 138 L128 160 M100 160 L88 164 M100 160 L112 163 M128 160 L118 164 M128 160 L141 163" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M104 136 L100 160 M126 138 L128 160 M100 160 L88 164 M100 160 L112 163 M128 160 L118 164 M128 160 L141 163" fill="none" stroke="#64748B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<g class="p-tail"><path d="M80 102 L22 116 Q12 122 20 129 L16 134 Q18 143 28 140 L30 146 Q36 152 44 145 L88 126 Z" fill="#1E293B" ${O}/>
<path d="M30 126 L74 114 M38 138 L78 122" stroke="#4B5B80" stroke-width="3" stroke-linecap="round" fill="none"/></g>
<ellipse cx="112" cy="108" rx="58" ry="38" transform="rotate(-12 112 108)" fill="#2B3754" ${O}/>
<path d="M92 132 C118 140 150 130 164 112 C158 128 136 142 108 142 Z" fill="#3B4A6E"/>
<g class="p-wing"><path d="M138 92 C116 80 80 86 48 108 C41 113 44 121 52 120 L58 126 C62 131 70 131 74 126 L82 131 C92 134 120 124 140 108 Z" fill="#1E293B" ${O}/>
<path d="M62 118 L88 108 M80 126 L104 114 M96 100 C108 94 122 94 132 98" stroke="#5A6B94" stroke-width="3" stroke-linecap="round" fill="none"/></g>
<g class="p-head">
<path d="M150 40 C145 31 147 24 154 21 C156 27 162 30 170 31 C166 32 162 36 160 40 Z" fill="#2B3754" ${O}/>
<circle cx="164" cy="64" r="32" fill="#2B3754" ${O}/>
<path d="M142 52 C148 40 160 35 172 36" stroke="#5A6B94" stroke-width="5" stroke-linecap="round" fill="none"/>
<g class="p-jaw"><path d="M189 66 L222 72 Q216 82 192 83 Z" fill="#475569" ${O}/><path d="M192 68 L216 72 L193 75 Z" fill="#E11D48"/></g>
<path d="M186 54 C204 53 222 60 232 70 Q228 76 189 76 Z" fill="#64748B" ${O}/>
<path d="M196 60 C206 60 216 63 222 67" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" fill="none"/>
<circle cx="177" cy="57" r="10" fill="#fff" stroke="${INK}" stroke-width="3"/>
${EYE(178, 57, 0.95)}
${BL(166, 80)}
</g>
</g>
</svg>`,

  'rua': `<svg class="fa fa-rua" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="114" cy="166" rx="100" ry="7" fill="#000" opacity=".08"/>
<g class="p-turtle">
<g class="p-tailr"><path d="M30 124 L8 133 L30 138 Z" fill="#A3E635" ${O}/></g>
<g class="p-legb"><rect x="50" y="114" width="22" height="44" rx="9" fill="#65A30D" ${O}/><rect x="146" y="114" width="22" height="44" rx="9" fill="#65A30D" ${O}/></g>
<g class="p-head">
<path d="M166 112 C178 106 186 100 190 92 L212 112 C202 122 188 128 168 130 Z" fill="#A3E635" ${O}/>
<ellipse cx="202" cy="96" rx="27" ry="23" fill="#A3E635" ${O}/>
<circle cx="190" cy="84" r="3.5" fill="#84CC16"/><circle cx="184" cy="96" r="2.5" fill="#84CC16"/><circle cx="196" cy="78" r="2.5" fill="#84CC16"/>
${EYE(209, 89, 1.05)}
${BL(209, 106)}
<path d="M215 110 C219 113 223 112 226 108" ${T}/>
</g>
<g class="p-legf"><rect x="26" y="124" width="24" height="38" rx="10" fill="#A3E635" ${O}/>
<path d="M31 156 L31 162 M38 156 L38 162 M45 156 L45 162" ${T}/>
<g class="p-step"><rect x="124" y="124" width="24" height="38" rx="10" fill="#A3E635" ${O}/>
<path d="M129 156 L129 162 M136 156 L136 162 M143 156 L143 162" ${T}/></g></g>
<g class="p-shell">
<path d="M22 122 C26 62 72 28 104 28 C142 28 180 60 182 122 Z" fill="#22C55E"/>
<path d="M146 44 C168 62 180 92 182 122 L156 122 C164 96 160 68 146 44 Z" fill="#16A34A"/>
<path d="M22 122 C26 62 72 28 104 28 C142 28 180 60 182 122 Z" fill="none" ${O}/>
<path d="M91 95 L84 120 M113 95 L120 120 M80 76 L67 82 M124 76 L141 82 M91 57 L82 40 M113 57 L122 40 M49 114 L40 120 M159 114 L168 120" ${T}/>
<g fill="#4ADE80" ${O.replace('width="4"', 'width="3"')}>
<polygon points="124,76 113,57 91,57 80,76 91,95 113,95"/>
<polygon points="76,98 67,82 49,82 40,98 49,114 67,114"/>
<polygon points="168,98 159,82 141,82 132,98 141,114 159,114"/>
</g>
<path d="M92 66 L100 62 M48 92 L56 88 M140 92 L148 88" stroke="#BBF7D0" stroke-width="4" stroke-linecap="round" fill="none"/>
<path d="M38 82 C46 60 64 44 84 38" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".6"/>
<path d="M14 120 L190 120 C192 128 186 134 178 134 L26 134 C18 134 12 128 14 120 Z" fill="#BEF264" ${O}/>
<path d="M46 121 L46 133 M76 121 L76 133 M106 121 L106 133 M136 121 L136 133 M164 121 L164 133" ${T}/>
</g>
</g>
</svg>`,

  'soc': `<svg class="fa fa-soc" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="124" cy="168" rx="86" ry="7" fill="#000" opacity=".08"/>
<g class="p-tail">
<path d="M112 152 C58 170 12 132 16 82 C20 30 72 6 106 24 C134 40 126 80 98 84 C112 100 122 126 112 152 Z" fill="#D97706" ${O}/>
<path d="M104 142 C68 150 34 124 34 86 C34 52 64 30 90 34 C70 46 60 72 70 98 C80 118 98 126 104 142 Z" fill="#F59E0B"/>
<path d="M98 84 C80 82 76 58 96 52 M44 50 C38 64 38 80 42 94 M58 120 C66 132 78 140 92 144" ${T}/>
</g>
<g class="p-body">
<ellipse cx="124" cy="140" rx="22" ry="20" fill="#EA8A1E" ${O}/>
<ellipse cx="146" cy="160" rx="26" ry="8" fill="#EA8A1E" ${O}/>
<ellipse cx="140" cy="116" rx="34" ry="42" fill="#EA8A1E" ${O}/>
<ellipse cx="154" cy="122" rx="17" ry="28" fill="#FDE68A"/>
<g class="p-crumb" opacity="0"><circle cx="190" cy="124" r="2.5" fill="#92400E"/><circle cx="200" cy="130" r="2" fill="#92400E"/><circle cx="182" cy="132" r="2" fill="#B45309"/></g>
<g class="p-head">
<g class="p-ear"><path d="M146 46 L150 14 L172 40 Z" fill="#EA8A1E" ${O}/><path d="M153 38 L154 25 L163 37 Z" fill="#F9A8D4"/><path d="M150 14 L146 6 M150 14 L154 7" ${T}/></g>
<circle cx="168" cy="66" r="30" fill="#EA8A1E" ${O}/>
<path d="M146 50 C150 42 158 38 166 37" stroke="#FDBA74" stroke-width="5" stroke-linecap="round" fill="none"/>
<ellipse cx="190" cy="76" rx="14" ry="11" fill="#FDE68A"/>
<g class="p-cheek"><ellipse cx="174" cy="81" rx="10" ry="8" fill="#F5A04A" stroke="${INK}" stroke-width="2.5"/>${BL(174, 81)}</g>
${EYE(178, 60)}
<circle cx="201" cy="71" r="4" fill="${INK}"/>
<path d="M190 82 Q195 87 200 82" ${T}/>
<rect x="193" y="84" width="5" height="5" rx="1" fill="#fff" stroke="${INK}" stroke-width="2"/>
</g>
<g class="p-paws">
<ellipse cx="188" cy="111" rx="13" ry="14" fill="#B45309" ${O}/>
<path d="M182 104 Q185 111 183 118" stroke="#FCD34D" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M173 105 C171 91 205 91 203 105 Z" fill="#78350F" ${O}/>
<path d="M180 99 L196 99" stroke="#A16207" stroke-width="2.5" stroke-linecap="round"/>
<path d="M188 94 L190 87" ${T}/>
<ellipse cx="174" cy="112" rx="6.5" ry="6.5" fill="#EA8A1E" ${O}/>
<ellipse cx="202" cy="112" rx="6.5" ry="6.5" fill="#EA8A1E" ${O}/>
</g>
</g>
</svg>`,

  'tom': `<svg class="fa fa-tom" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<g class="p-shadow"><ellipse cx="128" cy="168" rx="72" ry="6" fill="#000" opacity=".08"/></g>
<g class="p-shrimp">
<g class="p-ant"><path d="M190 70 C184 40 152 26 116 28" ${T}/></g>
<g class="p-ant2"><path d="M196 72 C206 50 218 38 230 30" ${T}/></g>
<path d="M152 110 L146 132 M164 114 L162 136 M176 112 L182 130" ${T}/>
<path d="M146 132 L140 134 M162 136 L156 137 M182 130 L188 132" ${T}/>
<g class="p-legs"><path d="M96 80 L90 100 M110 84 L106 104 M124 86 L122 106 M138 86 L138 106" ${T}/></g>
<g class="p-rear">
<g class="p-fan">
<path d="M64 126 L50 158 Q58 168 68 160 Z" fill="#F97316" ${O}/>
<path d="M68 126 L74 166 Q86 172 92 160 Z" fill="#F97316" ${O}/>
<path d="M70 124 L100 146 Q108 154 102 160 Z" fill="#FB923C" ${O}/>
<path d="M60 146 L58 154 M78 148 L80 158 M88 144 L94 152" stroke="#FDBA74" stroke-width="3" stroke-linecap="round" fill="none"/>
</g>
<circle cx="66" cy="116" r="15" fill="#FB923C" ${O}/>
<circle cx="66" cy="95" r="18" fill="#FB923C" ${O}/>
<path d="M54 90 Q58 84 64 82" stroke="#FED7AA" stroke-width="4" stroke-linecap="round" fill="none"/>
</g>
<circle cx="80" cy="73" r="21" fill="#FB923C" ${O}/>
<path d="M66 68 Q70 58 80 56" stroke="#FED7AA" stroke-width="4" stroke-linecap="round" fill="none"/>
<circle cx="104" cy="60" r="24" fill="#FB923C" ${O}/>
<path d="M90 50 Q96 42 106 40" stroke="#FED7AA" stroke-width="4" stroke-linecap="round" fill="none"/>
<circle cx="132" cy="62" r="26" fill="#FB923C" ${O}/>
<path d="M118 48 Q126 40 136 40" stroke="#FED7AA" stroke-width="4" stroke-linecap="round" fill="none"/>
<path d="M194 76 L230 66 L200 92 Z" fill="#F97316" ${O}/>
<ellipse cx="164" cy="86" rx="38" ry="30" fill="#FDA174" ${O}/>
<path d="M138 70 Q150 86 138 104" ${T} opacity=".55"/>
<path d="M146 64 Q156 58 168 58" stroke="#FED7AA" stroke-width="5" stroke-linecap="round" fill="none"/>
<path d="M182 64 L186 56" ${T}/>
<circle cx="187" cy="53" r="8.5" fill="#fff" ${O}/>
${EYE(188, 53, 0.85)}
${BL(176, 96)}
<path d="M187 100 Q192 105 198 99" ${T}/>
</g>
</svg>`,

  'mu': `<svg class="fa fa-mu" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<g class="p-shadow"><ellipse cx="124" cy="168" rx="100" ry="8" fill="#000" opacity=".08"/></g>
<g class="p-cap">
<path d="M18 138 L8 150 L22 154 Z" fill="#B91C1C" ${O}/>
<path d="M20 144 C18 74 70 42 114 42 C160 42 200 72 200 134 C148 154 76 160 20 144 Z" fill="#EF4444"/>
<path d="M164 54 C186 72 198 98 200 134 C194 138 186 140 178 142 C182 110 178 80 164 54 Z" fill="#DC2626"/>
<path d="M20 144 C18 74 70 42 114 42 C160 42 200 72 200 134 C148 154 76 160 20 144 Z" fill="none" ${O}/>
<path d="M114 44 C96 78 88 112 92 154 M114 44 C146 70 160 104 162 146" ${T}/>
<path d="M74 54 C52 80 42 112 44 150" ${T} opacity=".45"/>
<path d="M46 94 C52 76 64 64 80 58" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".6"/>
<path d="M20 144 C76 160 148 154 200 134 L200 146 C148 166 76 172 20 156 Z" fill="#FACC15" ${O}/>
<path d="M150 140 C188 122 230 128 232 144 C232 160 188 166 146 156 Z" fill="#60A5FA" ${O}/>
<path d="M160 148 C186 138 214 138 226 144" ${T} opacity=".5"/>
<circle cx="114" cy="43" r="8" fill="#FACC15" ${O}/>
<g class="p-star"><path d="M128 72 L133 85.1 L147 85.8 L136.1 94.6 L139.8 108.2 L128 100.5 L116.2 108.2 L119.9 94.6 L109 85.8 L123 85.1 Z" fill="#FDE047" ${O}/>
<path d="M124 82 L127 78" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>
<g class="p-spark" opacity="0">${SPARK(162, 64, 9)}${SPARK(96, 68, 7)}${SPARK(160, 114, 7)}</g>
</g>
</svg>`,
};

// amplitude helpers: --k5 = 1 normally, .6 for reduced motion
const K = (v, u = 'px') => `calc(var(--k5) * ${v}${u})`;
const D = (v) => K(v, 'deg');
const SC = (x, y = x) => `scale(calc(1 + var(--k5) * ${x}), calc(1 + var(--k5) * ${y}))`;
const TS = (x, y, sx = 0, sy = 0) => `translate(${K(x)}, ${K(y)}) ${SC(sx, sy)}`;
const R = (v) => `rotate(${D(v)})`;
const OR = (key, list) => list.map(([p, x, y]) => `.fa-${key} .${p} { transform-box: view-box; transform-origin: ${x}px ${y}px; }`).join('\n');

/** Động tác: chạy một lần khi một khối cha có class `is-play` (thêm lại class để chạy lại). */
export const CSS = `
.fa-qua, .fa-rua, .fa-soc, .fa-tom, .fa-mu { --k5: 1; }
${OR('qua', [['p-bird', 118, 160], ['p-shadow', 118, 166], ['p-wing', 132, 96], ['p-head', 150, 92], ['p-jaw', 190, 72], ['p-eye', 178, 57], ['p-tail', 80, 114]])}
.is-play .fa-qua .p-bird { animation: fa-qua-hop 2.6s ease-in-out both; }
.is-play .fa-qua .p-shadow { animation: fa-qua-shadow 2.6s ease-in-out both; }
.is-play .fa-qua .p-wing { animation: fa-qua-wing 2.6s ease-in-out both; }
.is-play .fa-qua .p-tail { animation: fa-qua-tail 2.6s ease-in-out both; }
.is-play .fa-qua .p-head { animation: fa-qua-head 2.6s ease-in-out both; }
.is-play .fa-qua .p-jaw { animation: fa-qua-jaw 2.6s ease-in-out both; }
.is-play .fa-qua .p-eye { animation: fa-qua-blink 2.6s linear both; }
@keyframes fa-qua-hop {
  0%, 58%, 100% { transform: ${TS(0, 0)}; }
  5% { transform: ${TS(0, 0, .07, -.09)}; }
  13% { transform: ${TS(3, -13, -.03, .04)}; }
  21% { transform: ${TS(5, 0, .08, -.09)}; }
  27% { transform: ${TS(5, 0)}; }
  32% { transform: ${TS(5, 0, .07, -.09)}; }
  40% { transform: ${TS(2, -13, -.03, .04)}; }
  48% { transform: ${TS(0, 0, .08, -.09)}; }
  54% { transform: ${TS(0, 0)}; }
  64% { transform: ${TS(0, 0, -.02, .03)}; }
  68% { transform: ${TS(0, 0, .02, -.02)}; }
  73% { transform: ${TS(0, 0, -.02, .03)}; }
  77% { transform: ${TS(0, 0)}; }
}
@keyframes fa-qua-shadow {
  0%, 5%, 21%, 32%, 48%, 100% { transform: translateX(0) scale(1); }
  13% { transform: translateX(${K(3)}) ${SC(-.25, -.25)}; }
  27% { transform: translateX(${K(5)}) scale(1); }
  40% { transform: translateX(${K(2)}) ${SC(-.25, -.25)}; }
}
@keyframes fa-qua-wing {
  0%, 7%, 28%, 33%, 54%, 62%, 76%, 100% { transform: rotate(0); }
  11% { transform: ${R(42)}; } 16% { transform: ${R(-6)}; } 21% { transform: ${R(30)}; }
  37% { transform: ${R(42)}; } 42% { transform: ${R(-6)}; } 47% { transform: ${R(30)}; }
  68% { transform: ${R(16)}; }
}
@keyframes fa-qua-tail {
  0%, 15%, 27%, 42%, 54%, 84%, 100% { transform: rotate(0); }
  21% { transform: ${R(-12)}; } 48% { transform: ${R(-12)}; } 90% { transform: ${R(8)}; }
}
@keyframes fa-qua-head {
  0%, 27%, 54%, 59%, 100% { transform: rotate(0); }
  21% { transform: ${R(7)}; } 48% { transform: ${R(7)}; }
  64%, 81% { transform: ${R(-15)}; }
  88%, 95% { transform: ${R(13)}; }
}
@keyframes fa-qua-jaw {
  0%, 63%, 81%, 100% { transform: rotate(0); }
  67% { transform: rotate(30deg); } 71% { transform: rotate(3deg); }
  75% { transform: rotate(30deg); } 79% { transform: rotate(2deg); }
}
@keyframes fa-qua-blink {
  0%, 89%, 95%, 100% { transform: scaleY(1); } 92% { transform: scaleY(.1); }
}

${OR('rua', [['p-turtle', 104, 160], ['p-shell', 102, 134], ['p-step', 136, 160], ['p-eye', 209, 89]])}
.is-play .fa-rua .p-turtle { animation: fa-rua-body 2.6s ease-in-out both; }
.is-play .fa-rua .p-shell { animation: fa-rua-shell 2.6s ease-in-out both; }
.is-play .fa-rua .p-head { animation: fa-rua-head 2.6s ease-in-out both; }
.is-play .fa-rua .p-legf, .is-play .fa-rua .p-legb { animation: fa-rua-legs 2.6s ease-in-out both; }
.is-play .fa-rua .p-tailr { animation: fa-rua-tail 2.6s ease-in-out both; }
.is-play .fa-rua .p-step { animation: fa-rua-step 2.6s ease-in-out both; }
.is-play .fa-rua .p-eye { animation: fa-rua-blink 2.6s linear both; }
@keyframes fa-rua-head {
  0% { transform: translate(0, 0); opacity: 1; }
  5% { transform: translate(3px, -4px); opacity: 1; }
  11% { transform: translate(-30px, 4px); opacity: .8; }
  16%, 50% { transform: translate(-46px, 10px); opacity: 0; }
  55% { transform: translate(-40px, 10px); opacity: 1; }
  61%, 66% { transform: translate(-31px, 10px); opacity: 1; }
  76% { transform: translate(0, 0); opacity: 1; }
  100% { transform: translate(0, 0); opacity: 1; }
}
@keyframes fa-rua-legs {
  0%, 5% { transform: translate(0, 0); opacity: 1; }
  15%, 62% { transform: translate(0, -26px); opacity: 0; }
  72%, 100% { transform: translate(0, 0); opacity: 1; }
}
@keyframes fa-rua-tail {
  0%, 5% { transform: translate(0, 0); opacity: 1; }
  15%, 62% { transform: translate(16px, -4px); opacity: 0; }
  72%, 100% { transform: translate(0, 0); opacity: 1; }
}
@keyframes fa-rua-shell {
  0%, 5% { transform: translate(0, 0) rotate(0); }
  16% { transform: translate(0, 8px) rotate(0); }
  22% { transform: translate(0, 8px) ${R(-5)}; }
  30% { transform: translate(0, 8px) ${R(4)}; }
  38% { transform: translate(0, 8px) ${R(-3)}; }
  45% { transform: translate(0, 8px) ${R(1.5)}; }
  52%, 64% { transform: translate(0, 8px) rotate(0); }
  72%, 100% { transform: translate(0, 0) rotate(0); }
}
@keyframes fa-rua-step {
  0%, 78% { transform: translate(0, 0) rotate(0); }
  84% { transform: translate(${K(7)}, ${K(-10)}) ${R(12)}; }
  90%, 94% { transform: translate(${K(10)}, 0) rotate(0); }
  100% { transform: translate(0, 0) rotate(0); }
}
@keyframes fa-rua-body {
  0%, 80% { transform: translate(0, 0) rotate(0); }
  86% { transform: translate(${K(2)}, ${K(-2)}) ${R(-1.5)}; }
  93% { transform: translate(${K(5)}, 0) rotate(0); }
  100% { transform: translate(0, 0) rotate(0); }
}
@keyframes fa-rua-blink {
  0%, 64%, 70%, 100% { transform: scaleY(1); } 67% { transform: scaleY(.1); }
}

${OR('soc', [['p-tail', 114, 150], ['p-body', 140, 162], ['p-head', 160, 96], ['p-ear', 158, 42], ['p-cheek', 174, 81], ['p-eye', 178, 60]])}
.is-play .fa-soc .p-tail { animation: fa-soc-tail 2.4s ease-in-out both; }
.is-play .fa-soc .p-body { animation: fa-soc-body 2.4s ease-in-out both; }
.is-play .fa-soc .p-ear { animation: fa-soc-ear 2.4s ease-in-out both; }
.is-play .fa-soc .p-head { animation: fa-soc-nibble 2.4s ease-in-out both; }
.is-play .fa-soc .p-cheek { animation: fa-soc-cheek 2.4s ease-in-out both; }
.is-play .fa-soc .p-paws { animation: fa-soc-paws 2.4s ease-in-out both; }
.is-play .fa-soc .p-crumb { animation: fa-soc-crumb 2.4s ease-in both; }
.is-play .fa-soc .p-eye { animation: fa-soc-blink 2.4s linear both; }
@keyframes fa-soc-tail {
  0%, 34%, 80%, 100% { transform: rotate(0) scale(1, 1); }
  8% { transform: ${R(5)} ${SC(-.03, -.03)}; }
  18% { transform: ${R(-6)} ${SC(.06, .06)}; }
  26% { transform: ${R(4)} ${SC(.03, .03)}; }
  87% { transform: ${R(-5)} ${SC(.04, .04)}; }
  94% { transform: ${R(2)} scale(1, 1); }
}
@keyframes fa-soc-body {
  0%, 10%, 28%, 100% { transform: translateY(0) scale(1, 1); }
  14% { transform: translateY(0) ${SC(.03, -.04)}; }
  20% { transform: translateY(${K(-5)}) ${SC(-.02, .03)}; }
}
@keyframes fa-soc-ear {
  0%, 10%, 26%, 82%, 92%, 100% { transform: rotate(0); }
  13% { transform: ${R(-16)}; } 17% { transform: ${R(5)}; } 21% { transform: ${R(-11)}; }
  85% { transform: ${R(-16)}; } 88% { transform: ${R(4)}; }
}
@keyframes fa-soc-nibble {
  0%, 32%, 72%, 100% { transform: rotate(0); }
  37%, 45%, 53%, 61% { transform: ${R(9)}; }
  41%, 49%, 57%, 66% { transform: ${R(1)}; }
}
@keyframes fa-soc-nibble-calm {
  0%, 32%, 72%, 100% { transform: rotate(0); }
  42%, 60% { transform: ${R(9)}; }
  51% { transform: ${R(1)}; }
}
@keyframes fa-soc-cheek {
  0%, 32%, 74%, 100% { transform: scale(1); }
  38%, 46%, 54%, 62% { transform: ${SC(.3, .3)}; }
  42%, 50%, 58%, 68% { transform: ${SC(.2, .2)}; }
}
@keyframes fa-soc-paws {
  0%, 28%, 76%, 100% { transform: translate(0, 0); }
  35%, 68% { transform: translate(${K(-3)}, ${K(-7)}); }
}
@keyframes fa-soc-crumb {
  0%, 42% { transform: translate(0, 0); opacity: 0; }
  46% { transform: translate(0, 0); opacity: 1; }
  76% { transform: translate(0, 24px); opacity: 1; }
  84% { transform: translate(0, 26px); opacity: 0; }
  100% { transform: translate(0, 0); opacity: 0; }
}
@keyframes fa-soc-blink {
  0%, 90%, 96%, 100% { transform: scaleY(1); } 93% { transform: scaleY(.1); }
}

${OR('tom', [['p-shrimp', 124, 110], ['p-shadow', 128, 168], ['p-rear', 80, 84], ['p-fan', 66, 128], ['p-legs', 118, 84], ['p-ant', 190, 70], ['p-ant2', 196, 72], ['p-eye', 188, 53]])}
.is-play .fa-tom .p-shrimp { animation: fa-tom-jump 2.4s ease-in-out both; }
.is-play .fa-tom .p-shadow { animation: fa-tom-shadow 2.4s ease-in-out both; }
.is-play .fa-tom .p-rear { animation: fa-tom-rear 2.4s ease-in-out both; }
.is-play .fa-tom .p-fan { animation: fa-tom-fan 2.4s ease-in-out both; }
.is-play .fa-tom .p-legs { animation: fa-tom-legs 2.4s ease-in-out both; }
.is-play .fa-tom .p-ant { animation: fa-tom-ant 2.4s ease-in-out both; }
.is-play .fa-tom .p-ant2 { animation: fa-tom-ant2 2.4s ease-in-out both; }
.is-play .fa-tom .p-eye { animation: fa-tom-blink 2.4s linear both; }
@keyframes fa-tom-jump {
  0%, 100% { transform: translate(0, 0) rotate(0); }
  8% { transform: translate(${K(5)}, ${K(2)}) ${R(3)}; }
  16% { transform: translate(${K(-18)}, ${K(-10)}) ${R(-5)}; }
  24% { transform: translate(${K(-26)}, ${K(-8)}) ${R(-2)}; }
  33% { transform: translate(${K(-26)}, 0) rotate(0); }
  40% { transform: translate(${K(-25)}, 0) rotate(0); }
  64% { transform: translate(${K(-12)}, ${K(-3)}) ${R(1)}; }
  88% { transform: translate(0, 0) rotate(0); }
}
@keyframes fa-tom-shadow {
  0%, 88%, 100% { transform: translateX(0) scale(1); }
  8% { transform: translateX(${K(5)}) scale(1); }
  16% { transform: translateX(${K(-18)}) ${SC(-.15, -.15)}; }
  24% { transform: translateX(${K(-26)}) ${SC(-.12, -.12)}; }
  33%, 40% { transform: translateX(${K(-26)}) scale(1); }
  64% { transform: translateX(${K(-12)}) ${SC(-.05, -.05)}; }
}
@keyframes fa-tom-rear {
  0%, 40%, 88%, 100% { transform: rotate(0); }
  7% { transform: ${R(10)}; }
  15% { transform: ${R(-32)}; }
  25% { transform: ${R(8)}; }
  33% { transform: ${R(-4)}; }
  56% { transform: ${R(-6)}; }
  72% { transform: ${R(4)}; }
}
@keyframes fa-tom-fan {
  0%, 30%, 80%, 100% { transform: rotate(0); }
  7% { transform: ${R(-14)}; }
  14% { transform: ${R(36)}; }
  22% { transform: ${R(-12)}; }
  56% { transform: ${R(12)}; }
  68% { transform: ${R(-6)}; }
}
@keyframes fa-tom-legs {
  0%, 38%, 86%, 100% { transform: skewX(0); }
  43%, 53%, 63%, 73% { transform: skewX(${D(24)}); }
  48%, 58%, 68%, 78% { transform: skewX(${D(-16)}); }
}
@keyframes fa-tom-legs-calm {
  0%, 38%, 86%, 100% { transform: skewX(0); }
  50%, 72% { transform: skewX(${D(24)}); }
  61%, 80% { transform: skewX(${D(-16)}); }
}
@keyframes fa-tom-ant {
  0%, 100% { transform: rotate(0); }
  10% { transform: ${R(-6)}; } 22% { transform: ${R(12)}; } 38% { transform: ${R(-7)}; }
  54% { transform: ${R(6)}; } 70% { transform: ${R(-4)}; } 86% { transform: ${R(3)}; }
}
@keyframes fa-tom-ant2 {
  0%, 100% { transform: rotate(0); }
  12% { transform: ${R(8)}; } 24% { transform: ${R(-10)}; } 42% { transform: ${R(7)}; }
  60% { transform: ${R(-6)}; } 76% { transform: ${R(4)}; } 90% { transform: ${R(-2)}; }
}
@keyframes fa-tom-blink {
  0%, 91%, 97%, 100% { transform: scaleY(1); } 94% { transform: scaleY(.1); }
}

${OR('mu', [['p-cap', 122, 160], ['p-shadow', 124, 168], ['p-star', 128, 92], ['p-spark', 128, 92]])}
.is-play .fa-mu .p-cap { animation: fa-mu-hop 2.4s ease-in-out both; }
.is-play .fa-mu .p-shadow { animation: fa-mu-shadow 2.4s ease-in-out both; }
.is-play .fa-mu .p-star { animation: fa-mu-star 2.4s ease-in-out both; }
.is-play .fa-mu .p-spark { animation: fa-mu-spark 2.4s ease-out both; }
@keyframes fa-mu-hop {
  0%, 84%, 100% { transform: translateY(0) scale(1, 1); }
  10% { transform: translateY(0) ${SC(.08, -.12)}; }
  20% { transform: translateY(${K(-22)}) ${SC(-.06, .08)}; }
  24% { transform: translateY(${K(-25)}) scale(1, 1); }
  35% { transform: translateY(${K(-28)}) scale(-1, 1); }
  46% { transform: translateY(${K(-24)}) scale(1, 1); }
  56% { transform: translateY(0) ${SC(-.04, .06)}; }
  62% { transform: translateY(0) ${SC(.12, -.16)}; }
  70% { transform: translateY(${K(-5)}) ${SC(-.05, .06)}; }
  78% { transform: translateY(0) ${SC(.03, -.03)}; }
}
@keyframes fa-mu-shadow {
  0%, 10%, 56%, 100% { transform: scale(1); }
  24%, 46% { transform: ${SC(-.3, -.3)}; }
  62% { transform: ${SC(.08, .08)}; }
}
@keyframes fa-mu-star {
  0%, 78%, 100% { transform: rotate(0) scale(1); }
  86% { transform: ${R(20)} ${SC(.35, .35)}; }
  93% { transform: ${R(-6)} ${SC(-.05, -.05)}; }
}
@keyframes fa-mu-spark {
  0%, 78% { transform: scale(.3); opacity: 0; }
  87% { transform: scale(1.1); opacity: 1; }
  97% { transform: scale(.9); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .fa-qua, .fa-rua, .fa-soc, .fa-tom, .fa-mu { --k5: .6; }
  .is-play .fa-soc .p-head { animation-name: fa-soc-nibble-calm; }
  .is-play .fa-tom .p-legs { animation-name: fa-tom-legs-calm; }
}
`;
