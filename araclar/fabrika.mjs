// İçerik fabrikası · basma hattı
// Kullanım: node araclar/fabrika.mjs <plan.json> [--yalniz=2026-10-14,2026-10-17]
//
// Planı (.claude/skills/icerik-fabrikasi/SKILL.md'deki şema) takvim.csv'ye göre basar:
//   - tarih, gün, saat, format, ölçü ve adet HER ZAMAN takvim.csv'den gelir; plan bunları değiştiremez.
//   - post · story · kapak → şablon doldurulur, araclar/png.mjs ile PNG; story, kapak ve post için -kontrol.png.
//   - animasyonlu post → şablon "animasyonlu" sınıfıyla, araclar/mp4.mjs ile 6 sn · 30 fps MP4 (+ ilk kare PNG).
//   - video → yeni üretim yok; plandaki (ya da cikti/hareket/<tarih>-video.mp4) dosya kopyalanır.
//   - Her kare denetlenir: güvenli alan (DESIGN.md §8), kontrast (§2), kaynak (metin kitte mi), rakam ve fiyat dili (§9).
//   - Sonunda cikti/<kosu>/index.html (temas sayfası) ve rapor.md yazılır.
// Wiro'ya bu betik dokunmaz; görsel üretimi beceriyi çalıştıran Claude yapar, harcamayı wiro-harcama.csv'ye modul=<kosu> ile yazar.

import { chromium } from 'playwright';
import ffmpegYolu from 'ffmpeg-static';
import { spawnSync, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const KOK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SABLONLAR = path.join(KOK, '.claude/skills/icerik-fabrikasi/sablonlar');
const PNG = path.join(KOK, 'araclar/png.mjs');
const MP4 = path.join(KOK, 'araclar/mp4.mjs');
const YER_TUTUCU = '[İDDİA · Selin\'den]';

// AIDA: haftanın akışı (beceri çerçevesi). Görsel ağırlık bu aşamadan gelir, plan değiştiremez.
const AIDA = {
  '2026-10-13': 'dikkat',
  '2026-10-14': 'ilgi', '2026-10-15': 'ilgi',
  '2026-10-16': 'istek', '2026-10-17': 'istek', '2026-10-18': 'istek',
  '2026-10-19': 'eylem',
};

// Format → şablon, ölçü, güvenli alan (DESIGN.md §4, §8)
const FORMAT = {
  'post':             { sablon: 'post',  w: 1080, h: 1350, alan: { x0: 60, x1: 1020, y0: 60, y1: 1290 } },
  'animasyonlu post': { sablon: 'post',  w: 1080, h: 1350, alan: { x0: 60, x1: 1020, y0: 60, y1: 1290 }, mp4: true },
  'story':            { sablon: 'story', w: 1080, h: 1920, alan: { x0: 60, x1: 1020, y0: 250, y1: 1580 }, kontrol: true },
  'kapak':            { sablon: 'kapak', w: 1080, h: 1920, alan: { x0: 60, x1: 1020, y0: 240, y1: 1680 }, kontrol: true, izgara: true },
  'video':            { video: true, w: 1080, h: 1920 },
};

// Fiyat ve rakam kuralları (lansman-haftasi.md)
const IZINLI_TL = new Set(['449', '649', '579', '1.390', '1.590', '750', '89']);
const IZINLI_GUNLER = new Set(['13', '14', '15', '16', '17', '18', '19', '20']);

// ---------- yardımcılar ----------

const goreli = p => path.relative(KOK, p) || '.';
const kacis = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Plan metninde: satır sonu "\n" → <br>, **…** → <b>…</b> (fiyat vurgusu, Mühür).
const zengin = s => kacis(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
const duz = s => String(s ?? '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

function csvOku(dosya) {
  const metin = fs.readFileSync(dosya, 'utf8').replace(/\r/g, '');
  const satirlar = []; let alan = '', satir = [], tirnak = false;
  for (let i = 0; i < metin.length; i++) {
    const c = metin[i];
    if (tirnak) {
      if (c === '"' && metin[i + 1] === '"') { alan += '"'; i++; }
      else if (c === '"') tirnak = false;
      else alan += c;
    } else if (c === '"') tirnak = true;
    else if (c === ',') { satir.push(alan); alan = ''; }
    else if (c === '\n') { satir.push(alan); satirlar.push(satir); satir = []; alan = ''; }
    else alan += c;
  }
  if (alan || satir.length) { satir.push(alan); satirlar.push(satir); }
  const [baslik, ...veri] = satirlar.filter(s => s.some(Boolean));
  return veri.map(s => Object.fromEntries(baslik.map((b, i) => [b, s[i] ?? ''])));
}

function calistir(betik, args) {
  const r = spawnSync('node', [betik, ...args], { cwd: KOK, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`${path.basename(betik)} başarısız: ${(r.stderr || r.stdout).trim().split('\n').pop()}`);
  return r.stdout.trim();
}

function ffprobe(dosya) {
  const r = spawnSync(ffmpegYolu, ['-hide_banner', '-i', dosya], { encoding: 'utf8' });
  const m = r.stderr.match(/Duration: (\d+):(\d+):([\d.]+)/), o = r.stderr.match(/Video:.*?, (\d+)x(\d+)/);
  return { sure: m ? +m[1] * 3600 + +m[2] * 60 + +m[3] : null, w: o ? +o[1] : null, h: o ? +o[2] : null };
}

// Kaynak denetimi için kit metni (DESIGN.md §9: metin kitte birebir)
const KIT = ['marka-brief.md', 'lansman-haftasi.md', 'takvim.csv', 'gorsel-yon.md', 'urun-sayfasi-brief.md']
  .map(f => fs.readFileSync(path.join(KOK, f), 'utf8')).join('\n')
  .replace(/\*\*|`|\|/g, ' ').replace(/""/g, '"').replace(/\s+/g, ' ').toLowerCase();

function kaynakDenetle(metin) {
  const sorunlar = [];
  for (const parca of duz(metin).split(/(?<=[.?!:])\s+|\s+·\s+/)) {
    const p = parca.replace(/^[“"']|[”"']$/g, '').trim();
    if (!p || p === YER_TUTUCU || /^[\d\s+\/,.·:-]*$/.test(p) || p.toLowerCase() === 'conscious') continue;
    const k = p.toLowerCase();
    if (!KIT.includes(k) && !KIT.includes(k.replace(/[.:]$/, ''))) sorunlar.push(p);
  }
  return sorunlar;
}

function rakamDenetle(metin) {
  const s = duz(metin), sorunlar = [];
  for (const m of s.matchAll(/(\d{1,3}(?:\.\d{3})*)\s*TL/g)) if (!IZINLI_TL.has(m[1])) sorunlar.push(`kitte olmayan tutar: ${m[0]}`);
  for (const m of s.matchAll(/(\d{1,2})\s+Ekim/g)) if (!IZINLI_GUNLER.has(m[1])) sorunlar.push(`lansman haftası dışında tarih: ${m[0]}`);
  if (/%\s*\d+\s*(indirim|ucuz)|indirim/i.test(s)) sorunlar.push('indirim dili (§9 yasak)');
  if (/!/.test(s)) sorunlar.push('ünlem (ses ve ton: yok)');
  if (/\p{Extended_Pictographic}/u.test(s)) sorunlar.push('emoji (ses ve ton: yok)');
  if (/acele|tükeniyor|son şans/i.test(s)) sorunlar.push('aciliyet dili (§9 yasak)');
  return sorunlar;
}

const L = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
const oran = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const ortalama = (png, k) => [...execFileSync(ffmpegYolu, ['-loglevel', 'error', '-i', png,
  '-vf', `crop=${k.w}:${k.h}:${k.x}:${k.y},scale=1:1:flags=area`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'])];

// Bir HTML karesini tarayıcıda açıp güvenli alanı, kontrastı ve yazı tiplerini ölçer.
async function kareDenetle(tarayici, html, fmt, gecici) {
  const sayfa = await tarayici.newPage({ viewport: { width: fmt.w, height: fmt.h }, deviceScaleFactor: 1 });
  await sayfa.goto(pathToFileURL(html).href, { waitUntil: 'networkidle' });
  await sayfa.evaluate(() => document.fonts.ready);
  // Animasyonlu karede ölçüm ilk karede yapılır (DESIGN.md §6: ilk karede başlık ve fiyat okunur)
  await sayfa.evaluate(() => document.getAnimations().forEach(x => { x.pause(); x.currentTime = 0; }));
  const kutular = await sayfa.evaluate(() => [...document.querySelectorAll('[data-yazi]')]
    .filter(e => e.textContent.trim() && getComputedStyle(e).display !== 'none' && e.getClientRects().length)
    .map(e => {
      const cs = getComputedStyle(e), r = document.createRange(); r.selectNodeContents(e);
      const b = r.getBoundingClientRect();
      // Range kutusu yazı tipinin içerik alanıdır (harflerin üstünde ve altında boşluk taşır).
      // Güvenli alan harf mürekkebiyle ölçülür: içerik alanı ile gerçek mürekkep arasındaki fark çıkarılır.
      const ctx = (window.__olcu ||= document.createElement('canvas').getContext('2d'));
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const m = ctx.measureText(e.textContent.trim());
      const ustPay = Math.max(0, m.fontBoundingBoxAscent - m.actualBoundingBoxAscent);
      const altPay = Math.max(0, m.fontBoundingBoxDescent - m.actualBoundingBoxDescent);
      let zemin = null;
      for (let n = e; n && !n.classList.contains('tuval'); n = n.parentElement) {
        const c = getComputedStyle(n).backgroundColor; if (c !== 'rgba(0, 0, 0, 0)') { zemin = c; break; }
      }
      return { metin: e.textContent.trim().replace(/\s+/g, ' ').slice(0, 48), renk: cs.color, zemin,
        boy: parseFloat(cs.fontSize), x: Math.floor(b.left), y: Math.floor(b.top), w: Math.ceil(b.width), h: Math.ceil(b.height),
        murekkepUst: Math.floor(b.top + ustPay), murekkepAlt: Math.ceil(b.bottom - altPay) };
    }));
  const yazitipleri = await sayfa.evaluate(() => [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))]);
  // Fotoğraf zeminini ölçmek için yazılar gizli bir kopya
  await sayfa.addStyleTag({ content: '[data-yazi]{visibility:hidden!important}' });
  await sayfa.screenshot({ path: gecici, clip: { x: 0, y: 0, width: fmt.w, height: fmt.h } });
  await sayfa.close();

  const rgb = s => s.match(/\d+/g).slice(0, 3).map(Number);
  const sonuc = { alan: [], kontrast: [], enDusuk: Infinity, yazitipleri };
  for (const k of kutular) {
    const a = fmt.alan;
    if (k.x < a.x0 - 1 || k.x + k.w > a.x1 + 1 || k.murekkepUst < a.y0 - 1 || k.murekkepAlt > a.y1 + 1)
      sonuc.alan.push(`"${k.metin}" x ${k.x}–${k.x + k.w}, harf y ${k.murekkepUst}–${k.murekkepAlt}`);
    const kx = Math.max(0, k.x), ky = Math.max(0, k.y);
    const kutu = { x: kx, y: ky, w: Math.max(1, Math.min(k.w, fmt.w - kx)), h: Math.max(1, Math.min(k.h, fmt.h - ky)) };
    const z = k.zemin ? rgb(k.zemin) : ortalama(gecici, kutu);
    const o = oran(rgb(k.renk), z);
    const esik = k.boy >= 67 ? 3 : 4.5; // DESIGN.md §2: tuvalde 67 px altı "normal yazı"
    sonuc.enDusuk = Math.min(sonuc.enDusuk, o);
    if (o < esik) sonuc.kontrast.push(`"${k.metin}" ${o.toFixed(1)}:1 (eşik ${esik}:1)`);
  }
  fs.rmSync(gecici, { force: true });
  return sonuc;
}

// ---------- ana akış ----------

const argPlan = process.argv[2];
if (!argPlan) { console.error('Kullanım: node araclar/fabrika.mjs <plan.json> [--yalniz=tarih,tarih]'); process.exit(1); }
const yalniz = (process.argv.find(a => a.startsWith('--yalniz=')) || '').split('=')[1]?.split(',').filter(Boolean);

const PLAN_YOLU = path.resolve(KOK, argPlan);
const plan = JSON.parse(fs.readFileSync(PLAN_YOLU, 'utf8'));
const KOSU = plan.kosu || 'hafta-1';
const CIKTI = path.join(KOK, 'cikti', KOSU);
const KAYNAK = path.join(CIKTI, 'kaynak');
fs.mkdirSync(KAYNAK, { recursive: true });

const takvim = csvOku(path.join(KOK, 'takvim.csv'));
const isler = new Map((plan.isler || []).map(i => [i.tarih, i]));
const eksikler = [...(plan.eksikler || [])];
const selin = [...(plan.selin || [])];
const sonuclar = [];

let tarayici;
try { tarayici = await chromium.launch({ channel: 'chrome' }); } catch { tarayici = await chromium.launch(); }

try {
  for (const satir of takvim) {
    if (yalniz && !yalniz.includes(satir.tarih)) continue;
    const fmt = FORMAT[satir.format];
    const asama = AIDA[satir.tarih] || 'ilgi';
    const kayit = { ...satir, asama, dosyalar: [], gorseller: [], denetim: [], cikartma: '' };
    sonuclar.push(kayit);
    if (!fmt) { eksikler.push(`${satir.tarih}: bilinmeyen format "${satir.format}"`); continue; }
    if (`${fmt.w}x${fmt.h}` !== satir.olcu) kayit.denetim.push(`ölçü takvimle uyuşmuyor: ${satir.olcu}`);
    const is = isler.get(satir.tarih);
    if (!is) { eksikler.push(`${satir.tarih} ${satir.gun} · ${satir.format}: planda iş yok, basılmadı`); continue; }
    const slug = satir.format.replace(/\s+/g, '-');
    console.log(`\n${satir.tarih} ${satir.gun} ${satir.saat} · ${satir.format} · ${asama}`);

    // --- video: yeni üretim yok, kopyala ---
    if (fmt.video) {
      const kaynak = path.resolve(KOK, is.video || `cikti/hareket/${satir.tarih}-video.mp4`);
      if (!fs.existsSync(kaynak)) { eksikler.push(`${satir.tarih} · video: kaynak yok (${goreli(kaynak)})`); continue; }
      const hedef = path.join(CIKTI, `${satir.tarih}-${slug}.mp4`);
      fs.copyFileSync(kaynak, hedef);
      const v = ffprobe(hedef);
      kayit.dosyalar.push(path.basename(hedef)); kayit.gorseller.push(goreli(kaynak));
      if (v.w !== fmt.w || v.h !== fmt.h) kayit.denetim.push(`video ölçüsü ${v.w}×${v.h}, beklenen ${fmt.w}×${fmt.h}`);
      if (v.sure < 5 || v.sure > 10) kayit.denetim.push(`video süresi ${v.sure?.toFixed(2)} sn (DESIGN.md §8: 5–10 sn)`);
      kayit.not = `${v.w}×${v.h}, ${v.sure?.toFixed(2)} sn`;
      console.log(`  kopyalandı → ${path.basename(hedef)} (${kayit.not})`);
      continue;
    }

    // --- kareler ---
    const kareler = is.kareler || [];
    const adet = Number(satir.adet) || 1;
    if (kareler.length !== adet) eksikler.push(`${satir.tarih} · ${satir.format}: takvim ${adet} kare istiyor, planda ${kareler.length}`);
    const sablon = fs.readFileSync(path.join(SABLONLAR, `${fmt.sablon}.html`), 'utf8');
    if (/bağlantı çıkartması/i.test(satir.cta)) kayit.cikartma = satir.cta;

    for (let i = 0; i < kareler.length; i++) {
      const k = kareler[i];
      const ad = kareler.length > 1 ? `${satir.tarih}-${slug}-${i + 1}` : `${satir.tarih}-${slug}`;
      const gorsel = k.gorsel ? path.resolve(KOK, k.gorsel) : null;
      if (!gorsel || !fs.existsSync(gorsel)) { eksikler.push(`${ad}: görsel yok (${k.gorsel || 'belirtilmedi'}), basılmadı`); continue; }
      kayit.gorseller.push(goreli(gorsel) + (k.wiro_gorev ? ` (Wiro ${k.wiro_gorev})` : ''));

      // Story'de son kare ve takvim CTA'sı bağlantı çıkartmasıysa: alan boş kalır, CTA basılmaz.
      const cikartmaKaresi = fmt.sablon === 'story' && kayit.cikartma && i === kareler.length - 1;
      const sinif = [fmt.mp4 ? 'animasyonlu' : '', cikartmaKaresi ? 'cikartma' : ''].filter(Boolean).join(' ');
      const alanlar = {
        DOSYA: kacis(ad), ASAMA: asama, SINIF: sinif, ODAK: kacis(k.odak || '50% 50%'),
        GORSEL: kacis(path.relative(KAYNAK, gorsel).split(path.sep).join('/')),
        ETIKET: zengin(k.etiket), SIRA: zengin(k.sira || (kareler.length > 1 ? `${i + 1}/${kareler.length}` : '')),
        NO: zengin(k.no), BASLIK: zengin(k.baslik), METIN: zengin(k.metin),
        TERIM_AD: zengin(k.terim?.ad), TERIM_TR: zengin(k.terim?.tr),
        CTA: cikartmaKaresi ? '' : zengin(k.cta),
      };
      const html = path.join(KAYNAK, `${ad}.html`);
      fs.writeFileSync(html, sablon.replace(/\{\{([A-Z_]+)\}\}/g, (_, a) => alanlar[a] ?? ''));

      // Metin denetimi: kaynak, rakam, yer tutucu
      const metinler = [k.etiket, k.no, k.baslik, k.metin, k.terim?.ad, k.terim?.tr, cikartmaKaresi ? '' : k.cta].filter(Boolean);
      for (const m of metinler) {
        if (duz(m).includes(YER_TUTUCU)) selin.push(`${ad}: "${duz(m)}"`);
        for (const s of kaynakDenetle(m)) kayit.denetim.push(`${ad} · kaynak: "${s}" kitte birebir yok`);
        for (const s of rakamDenetle(m)) kayit.denetim.push(`${ad} · ${s}`);
      }
      if (!fmt.mp4 && !cikartmaKaresi && !k.cta && satir.cta && fmt.sablon !== 'kapak' && i === kareler.length - 1)
        kayit.denetim.push(`${ad} · takvimdeki CTA basılmadı: "${satir.cta}"`);

      // Bas
      try {
        if (fmt.mp4) {
          calistir(MP4, [goreli(html), goreli(path.join(CIKTI, `${ad}.mp4`)), String(fmt.w), String(fmt.h), '6', '30']);
          calistir(PNG, [goreli(html), goreli(path.join(CIKTI, `${ad}-ilk-kare.png`)), String(fmt.w), String(fmt.h)]);
          kayit.dosyalar.push(`${ad}.mp4`, `${ad}-ilk-kare.png`);
        } else {
          calistir(PNG, [goreli(html), goreli(path.join(CIKTI, `${ad}.png`)), String(fmt.w), String(fmt.h)]);
          kayit.dosyalar.push(`${ad}.png`);
        }
        calistir(PNG, [`${goreli(html)}#kontrol`, goreli(path.join(CIKTI, `${ad}-kontrol.png`)), String(fmt.w), String(fmt.h)]);
        kayit.dosyalar.push(`${ad}-kontrol.png`);
        if (fmt.izgara) {
          execFileSync(ffmpegYolu, ['-loglevel', 'error', '-y', '-i', path.join(CIKTI, `${ad}.png`), '-vf', 'crop=1080:1440:0:240', path.join(CIKTI, `${ad}-izgara.png`)]);
          kayit.dosyalar.push(`${ad}-izgara.png`);
        }
      } catch (e) { eksikler.push(`${ad}: basılamadı (${e.message})`); continue; }

      // Ölç
      const d = await kareDenetle(tarayici, html, fmt, path.join(KAYNAK, `.${ad}-zemin.png`));
      for (const s of d.alan) kayit.denetim.push(`${ad} · güvenli alan dışında: ${s}`);
      for (const s of d.kontrast) kayit.denetim.push(`${ad} · kontrast düşük: ${s}`);
      for (const y of ['Fraunces', 'IBM Plex Sans', 'IBM Plex Mono'])
        if (!d.yazitipleri.includes(y) && sablon.includes(y)) kayit.denetim.push(`${ad} · yazı tipi yüklenmedi: ${y}`);
      kayit.enDusukKontrast = Math.min(kayit.enDusukKontrast ?? Infinity, d.enDusuk);
      console.log(`  ${ad}: basıldı · en düşük kontrast ${d.enDusuk.toFixed(1)}:1 · alan ${d.alan.length ? '✗' : '✓'}`);
    }
  }
} finally {
  await tarayici.close();
}

// Takvimde olup sonuçta hiç dosyası olmayan işler
for (const k of sonuclar) if (!k.dosyalar.length && !eksikler.some(e => e.startsWith(k.tarih))) eksikler.push(`${k.tarih} · ${k.format}: dosya üretilmedi`);

// ---------- Wiro harcaması (bu koşu: modul = kosu) ----------
const harcama = fs.existsSync(path.join(KOK, 'cikti/wiro-harcama.csv'))
  ? csvOku(path.join(KOK, 'cikti/wiro-harcama.csv')).filter(r => r.modul === KOSU) : [];
const toplam = harcama.reduce((t, r) => t + (parseFloat(r.usd) || 0), 0);
const tl = n => n.toFixed(3).replace('.', ',');

// ---------- temas sayfası ----------
const kart = k => {
  const medya = k.dosyalar.filter(f => !/-kontrol|-izgara|-ilk-kare/.test(f));
  const ek = k.dosyalar.filter(f => /-kontrol|-izgara/.test(f));
  const temiz = !k.denetim.length;
  return `<article>
    <header><h2>${kacis(k.tarih)} · ${kacis(k.gun)} ${kacis(k.saat)}</h2>
      <p>${kacis(k.format)} · ${kacis(k.olcu)} · ${kacis(k.adet)} adet · aşama: ${kacis(k.asama)}</p>
      <p class="konu">${kacis(k.konu)}</p></header>
    <div class="medya">${medya.length ? medya.map(f => /\.mp4$/.test(f)
      ? `<video src="${kacis(f)}" controls muted loop playsinline preload="metadata"${k.dosyalar.includes(f.replace('.mp4', '-ilk-kare.png')) ? ` poster="${kacis(f.replace('.mp4', '-ilk-kare.png'))}"` : ''}></video>`
      : `<a href="${kacis(f)}"><img src="${kacis(f)}" alt="${kacis(f)}" loading="lazy"></a>`).join('') : '<p class="yok">Basılmadı</p>'}</div>
    ${ek.length ? `<p class="ek">Kontrol: ${ek.map(f => `<a href="${kacis(f)}">${kacis(f)}</a>`).join(' · ')}</p>` : ''}
    ${k.cikartma ? `<p class="ek">Takvim CTA'sı: ${kacis(k.cikartma)} (çıkartma Instagram'da eklenir, alan boş bırakıldı)</p>` : ''}
    <p class="${temiz ? 'iyi' : 'kotu'}">${temiz ? 'Denetim temiz' : `${k.denetim.length} uyarı · rapor.md`}${k.enDusukKontrast != null && isFinite(k.enDusukKontrast) ? ` · en düşük kontrast ${k.enDusukKontrast.toFixed(1)}:1` : ''}</p>
  </article>`;
};
fs.writeFileSync(path.join(CIKTI, 'index.html'), `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hafta 1 Temas Sayfası</title>
<style>
  :root { --bg:#FAF7F2; --yuzey:#FFFFFF; --ink:#1F1B17; --soluk:#6B645B; --cizgi:#E2DAD0; --iyi:#2F4A3A; --kotu:#8F3A2A; }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --bg:#171512; --yuzey:#201D19; --ink:#EDE3D6; --soluk:#A39A8E; --cizgi:#36312B; --iyi:#8DB89B; --kotu:#E39A86; } }
  :root[data-theme="dark"] { --bg:#171512; --yuzey:#201D19; --ink:#EDE3D6; --soluk:#A39A8E; --cizgi:#36312B; --iyi:#8DB89B; --kotu:#E39A86; }
  * { box-sizing: border-box; } body { margin:0; background:var(--bg); color:var(--ink); font:15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .sutun { max-width:1440px; margin:0 auto; padding:32px 16px 48px; }
  h1 { font-size:22px; margin:0 0 4px; } .alt { color:var(--soluk); margin:0 0 24px; }
  .izgara { display:grid; grid-template-columns:repeat(auto-fill, minmax(min(100%, 420px), 1fr)); gap:20px; }
  article { background:var(--yuzey); border:1px solid var(--cizgi); border-radius:8px; padding:16px; display:flex; flex-direction:column; gap:10px; }
  article h2 { font-size:17px; margin:0; } article header p { margin:2px 0 0; color:var(--soluk); } .konu { color:var(--ink) !important; }
  .medya { display:flex; gap:8px; overflow-x:auto; align-items:flex-start; }
  .medya img, .medya video { height:300px; width:auto; border:1px solid var(--cizgi); border-radius:4px; background:var(--cizgi); flex:none; }
  .ek { margin:0; font-size:13px; color:var(--soluk); overflow-wrap:anywhere; } .ek a { color:inherit; }
  .iyi { margin:0; color:var(--iyi); font-weight:600; } .kotu { margin:0; color:var(--kotu); font-weight:600; } .yok { color:var(--kotu); }
</style></head>
<body><main class="sutun">
  <h1>Conscious · lansman haftası · ${kacis(KOSU)}</h1>
  <p class="alt">İçerik fabrikası koşusu · tarih, gün ve format takvim.csv'den · Wiro harcaması bu koşu: ${tl(toplam)} $ · <a href="rapor.md">rapor.md</a></p>
  <div class="izgara">${sonuclar.map(kart).join('\n')}</div>
</main></body></html>
`);

// ---------- rapor ----------
const satirTablo = sonuclar.map(k => `| ${k.tarih} | ${k.gun} | ${k.saat} | ${k.format} | ${k.asama} | ${k.dosyalar.filter(f => !/-kontrol|-izgara|-ilk-kare/.test(f)).join('<br>') || '—'} | ${k.gorseller.join('<br>') || '—'} | ${k.denetim.length ? `✗ ${k.denetim.length}` : '✓'} |`).join('\n');
const uyarilar = sonuclar.flatMap(k => k.denetim.map(d => `- ${k.tarih}: ${d}`));
const selinListe = [...new Set(selin)];
fs.writeFileSync(path.join(CIKTI, 'rapor.md'), `# İçerik fabrikası · ${KOSU} · rapor

- Koşu: ${(d => new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16).replace('T', ' '))(new Date())} (yerel saat) · plan: \`${goreli(PLAN_YOLU)}\`${yalniz ? ` · yalnız: ${yalniz.join(', ')}` : ''}
- Tarih, hafta günü, saat, format ve adet \`takvim.csv\`'den; aşama (AIDA): 13 dikkat · 14–15 ilgi · 16–18 istek · 19 eylem.
- Temas sayfası: \`index.html\`

## Üretilenler

| Tarih | Gün | Saat | Format | Aşama | Dosyalar | Görsel kaynağı | Denetim |
|---|---|---|---|---|---|---|---|
${satirTablo}

${uyarilar.length ? `### Denetim uyarıları\n\n${uyarilar.join('\n')}\n` : 'Denetim uyarısı yok: güvenli alan, kontrast, kaynak, rakam ve fiyat dili temiz.\n'}
## Eksikler

${eksikler.length ? eksikler.map(e => `- ${e}`).join('\n') : 'Eksik yok.'}

## Bu koşunun Wiro harcaması

${harcama.length ? `| Zaman | Model | Görev | USD | Dosya |\n|---|---|---|---:|---|\n${harcama.map(r => `| ${r.zaman} | ${r.model} | ${r.gorev} | ${tl(parseFloat(r.usd) || 0)} | ${r.dosya} |`).join('\n')}\n| **Toplam** | | | **${tl(toplam)}** | |` : `Bu koşuda Wiro üretimi yok (cikti/wiro-harcama.csv'de modul = ${KOSU} satırı bulunamadı). Toplam 0,000 $.`}

## Selin'e sorulacaklar

${selinListe.length ? selinListe.map(s => `- ${s}`).join('\n') : 'Bu koşuda yeni soru yok.'}
`);

console.log(`\nBitti → ${goreli(CIKTI)}/index.html · rapor.md · eksik ${eksikler.length} · uyarı ${uyarilar.length} · Wiro ${tl(toplam)} $`);
