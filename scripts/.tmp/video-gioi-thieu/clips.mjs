// node clips.mjs: cắt các đoạn app quay sẵn (scripts/video/out/*.mp4) thành clip ngắn không tiếng vào ./app/clip-<tên>.mp4
// Cắt bỏ 6% đáy (nhãn chú thích của video cũ), thu về 720 ngang.
import { spawnSync } from 'node:child_process';
const FF = 'E:/ManC/congiaoquiz/homework/scripts/video/.pylib/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
const SRC = 'E:/ManC/congiaoquiz/homework/scripts/video/out/';
const CLIPS = {
  'tho-dem': ['tien-tieu-hoc', 27, 16],
  'chan-le': ['g4-chan-le', 14, 18],
  'met-vuong': ['tour-cac-lop', 62, 14],
  'can-xoai': ['tour-cac-lop', 47.5, 10],
  'xe-buyt': ['tour-cac-lop', 34.5, 12],
  'dat-tinh': ['g4-nhan-3-chu-so', 18, 56],
};
{
  for (const [name, [src, ss, t]] of Object.entries(CLIPS)) {
    const out = new URL(`./app/clip-${name}.mp4`, import.meta.url).pathname.slice(1);
    const r = spawnSync(FF, ['-v', 'error', '-y', '-ss', String(ss), '-t', String(t), '-i', `${SRC}${src}.mp4`, '-an',
      '-vf', 'crop=iw:ih*0.94:0:0,scale=720:-2', '-c:v', 'libx264', '-crf', '22', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
    console.log(name, r.status, String(r.stderr || '').slice(0, 200));
  }
}
