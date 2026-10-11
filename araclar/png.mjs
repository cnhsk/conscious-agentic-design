// Bir HTML dosyasını verilen ölçüde açar, yazı tipleri ve görseller yüklenince PNG kaydeder.
// Kullanım: node araclar/png.mjs <girdi.html[#parametre]> <cikti.png> [genişlik=1080] [yükseklik=1350]
// "#" sonrası sayfaya olduğu gibi geçer (örnek: story.html#3-kontrol).
// Google Chrome kuruluysa onu, değilse Playwright'ın Chromium'unu kullanır.
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const [girdi, cikti, g = '1080', y = '1350'] = process.argv.slice(2);
if (!girdi || !cikti) {
  console.error('Kullanım: node araclar/png.mjs <girdi.html> <cikti.png> [genişlik] [yükseklik]');
  process.exit(1);
}
const genislik = Number(g);
const yukseklik = Number(y);

let tarayici;
let kanal = 'chrome';
try {
  tarayici = await chromium.launch({ channel: 'chrome' });
} catch {
  kanal = 'chromium (Playwright)';
  tarayici = await chromium.launch();
}

try {
  const sayfa = await tarayici.newPage({ viewport: { width: genislik, height: yukseklik }, deviceScaleFactor: 1 });
  const [yol, ...parca] = girdi.split('#');
  const adres = pathToFileURL(resolve(yol)).href + (parca.length ? '#' + parca.join('#') : '');
  await sayfa.goto(adres, { waitUntil: 'networkidle' });

  // Yazı tipleri ve görseller hazır olana kadar bekle.
  await sayfa.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(i => i.complete ? null : new Promise(r => { i.onload = i.onerror = r; })));
  });

  const durum = await sayfa.evaluate(() => ({
    yazitipleri: [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight}`))],
    eksikGorsel: [...document.images].filter(i => !i.naturalWidth).map(i => i.getAttribute('src')),
  }));
  if (durum.eksikGorsel.length) throw new Error('Yüklenemeyen görsel: ' + durum.eksikGorsel.join(', '));

  await sayfa.screenshot({ path: cikti, clip: { x: 0, y: 0, width: genislik, height: yukseklik } });
  console.log(`Kaydedildi: ${cikti} (${genislik}×${yukseklik}, ${kanal})`);
  console.log('Yüklenen yazı tipleri: ' + (durum.yazitipleri.join(', ') || 'yok'));
} finally {
  await tarayici.close();
}
