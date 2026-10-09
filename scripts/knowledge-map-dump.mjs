// Dump Bài list (id, number, title, question count) of every book, for building src/data/knowledgeMap.js.
// Usage: node scripts/knowledge-map-dump.mjs [--write]  (--write regenerates src/data/knowledgeUnits.js)
import { createServer } from 'vite';
import { writeFileSync } from 'node:fs';

const BOOKS = [
  { star: 'workbook1', grade: 1, parts: ['grade1Workbook/bai01-06', 'grade1Workbook/bai07-12', 'grade1Workbook/bai13-18', 'grade1Workbook/bai19-23', 'grade1Workbook/bai24-28', 'grade1Workbook/bai29-34'] },
  { star: 'workbook2', grade: 2, parts: ['grade2Workbook/bai01-06', 'grade2Workbook/bai07-12', 'grade2Workbook/bai13-18', 'grade2Workbook/bai19-24', 'grade2Workbook/bai25-30', 'grade2Workbook/bai31-36', 'grade2Workbook/bai37-44', 'grade2Workbook/bai45-51', 'grade2Workbook/bai52-58', 'grade2Workbook/bai59-64', 'grade2Workbook/bai65-70', 'grade2Workbook/bai71-75'] },
  { star: 'workbook', grade: 3, exportName: 'WORKBOOK3_UNITS', parts: ['grade3Workbook', 'grade3Workbook2/bai45-48', 'grade3Workbook2/bai49-51', 'grade3Workbook2/bai52-54', 'grade3Workbook2/bai55-58', 'grade3Workbook2/bai59-62', 'grade3Workbook2/bai63-67', 'grade3Workbook2/bai68-71', 'grade3Workbook2/bai72-75', 'grade3Workbook2/bai76-78', 'grade3Workbook2/bai79-81'] },
  { star: 'practice', grade: 3, parts: ['grade3Practice/tuan01-04', 'grade3Practice/tuan05-08', 'grade3Practice/tuan09-12', 'grade3Practice/tuan13-15', 'grade3Practice/tuan16-18'] },
  { star: 'textbook4', grade: 4, exportName: 'UNITS', parts: ['grade4Textbook'] },
];

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
globalThis.window ??= globalThis;
globalThis.localStorage ??= { getItem: () => null, setItem() {}, removeItem() {} };
const out = {};
for (const b of BOOKS) {
  const units = [];
  for (const p of b.parts) {
    const mod = await server.ssrLoadModule(`/src/games/${p}.js`);
    const arr = b.exportName && mod[b.exportName] ? mod[b.exportName] : Object.values(mod).find(Array.isArray);
    units.push(...arr);
  }
  out[b.star] = units.map((u) => ({ id: u.id, n: u.number, t: u.title, q: (u.questions || []).length }));
}
for (const [book, file] of [['tool4', 'grade4Tools/catalog'], ['tool5', 'grade5Tools/catalog']]) {
  const { TOPICS } = await server.ssrLoadModule(`/src/games/${file}.js`);
  out[book] = TOPICS.flatMap((t) => t.lessons.map((l) => ({ id: l.id, n: l.num ?? l.n, t: l.title, topic: t.title, q: 1 })));
}
await server.close();

if (process.argv.includes('--write')) {
  const lines = [];
  for (const [book, units] of Object.entries(out)) for (const u of units) lines.push(`  ${JSON.stringify(`${book}:${u.id}`)}: [${u.q}, ${JSON.stringify(u.t)}],`);
  writeFileSync('src/data/knowledgeUnits.js', [
    '// Mọi Bài của các sách: "sao:bai-N": [số câu có sao, tên bài]. Bản đồ kiến thức dùng để tính % đã học.',
    '// Sinh tự động: node scripts/knowledge-map-dump.mjs --write (chạy lại khi thêm Bài / câu). Đừng sửa tay.',
    'export const UNIT_INFO = {', ...lines, '};', ''].join('\n'));
  console.log('wrote src/data/knowledgeUnits.js', lines.length);
} else {
  for (const [book, units] of Object.entries(out)) {
    console.log(`## ${book}`);
    for (const u of units) console.log(`${u.id}\t${u.q}\t${u.topic ? u.topic + ' | ' : ''}${u.t}`);
  }
}
process.exit(0);
