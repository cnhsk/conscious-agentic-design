// CSS animasyonlu bir HTML'i kare kare MP4'e çevirir.
// Kullanım: node araclar/mp4.mjs <girdi.html> <cikti.mp4> [genişlik=1080] [yükseklik=1350] [saniye=6] [fps=30]
// Her karede document.getAnimations() durdurulur, currentTime o karenin zamanına ayarlanır, PNG alınır
// ve ffmpeg-static'e boruyla verilir (libx264, yuv420p, crf 18, +faststart). Chrome kuruluysa onu kullanır.
import { chromium } from 'playwright';
import ffmpegYolu from 'ffmpeg-static';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [girdi, cikti, g = '1080', y = '1350', sn = '6', f = '30'] = process.argv.slice(2);
if (!girdi || !cikti) {
  console.error('Kullanım: node araclar/mp4.mjs <girdi.html> <cikti.mp4> [genişlik] [yükseklik] [saniye] [fps]');
  process.exit(1);
}
const genislik = Number(g), yukseklik = Number(y), saniye = Number(sn), fps = Number(f);
const kareSayisi = Math.round(saniye * fps);

let tarayici, kanal = 'chrome';
try {
  tarayici = await chromium.launch({ channel: 'chrome' });
} catch {
  kanal = 'chromium (Playwright)';
  tarayici = await chromium.launch();
}

const ffmpeg = spawn(ffmpegYolu, [
  '-loglevel', 'error', '-y',
  '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow',
  '-r', String(fps), '-movflags', '+faststart',
  cikti,
], { stdio: ['pipe', 'inherit', 'inherit'] });
const bitti = new Promise((ok, hata) => ffmpeg.on('close', k => (k === 0 ? ok() : hata(new Error('ffmpeg çıkış kodu ' + k)))));

try {
  const sayfa = await tarayici.newPage({ viewport: { width: genislik, height: yukseklik }, deviceScaleFactor: 1 });
  await sayfa.goto(pathToFileURL(resolve(girdi)).href, { waitUntil: 'networkidle' });
  await sayfa.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r; })));
  });
  const yazitipleri = await sayfa.evaluate(() =>
    [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))]);
  const animasyon = await sayfa.evaluate(() => document.getAnimations().length);

  for (let i = 0; i < kareSayisi; i++) {
    const ms = (i * 1000) / fps;
    await sayfa.evaluate(ms => {
      for (const a of document.getAnimations()) { a.pause(); a.currentTime = ms; }
    }, ms);
    const kare = await sayfa.screenshot({ type: 'png', clip: { x: 0, y: 0, width: genislik, height: yukseklik } });
    if (!ffmpeg.stdin.write(kare)) await new Promise(r => ffmpeg.stdin.once('drain', r));
    if ((i + 1) % 30 === 0) process.stdout.write(`\r${i + 1}/${kareSayisi} kare`);
  }
  ffmpeg.stdin.end();
  await bitti;
  console.log(`\nKaydedildi: ${cikti} (${genislik}×${yukseklik}, ${kareSayisi} kare, ${fps} fps, ${kanal})`);
  console.log(`Animasyon: ${animasyon} · Yazı tipleri: ${yazitipleri.join(', ')}`);
} catch (e) {
  ffmpeg.stdin.destroy();
  throw e;
} finally {
  await tarayici.close();
}
