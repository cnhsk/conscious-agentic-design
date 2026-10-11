---
name: icerik-fabrikasi
description: Conscious lansman haftasının içeriklerini takvim.csv'deki her satır için üretir. Uygun yazısız görsel cikti/ altında varsa onu kullanır, yoksa Wiro'da üretir; metni DESIGN.md şablonlarına dizer, araclar/fabrika.mjs ile PNG ya da MP4 basar; cikti/<kosu>/ altına ISO tarihli dosyalar, temas sayfası (index.html) ve rapor.md yazar. "İçerik fabrikasını çalıştır", "haftayı bas", "takvimi üret" gibi isteklerde kullan.
---

# İçerik fabrikası

Fabrika bir sözleşmeyi uygular:
- **DESIGN.md** nasıl görüneceğini belirler: renk, yazı tipi, güvenli alan, ambalaj, yasaklar.
- **takvim.csv** ne zaman ne söyleneceğini belirler: tarih, gün, saat, format, adet, `ana_mesaj`, `cta`.

İşi ikiye ayır:
- **Sen (Claude):** görseli seçer ya da Wiro'da üretir, metni kurar ve `plan.json`'a yazarsın.
- **`araclar/fabrika.mjs`:** planı şablonlara dizer, basar, denetler; temas sayfasını ve raporu yazar. Tarih, gün, saat, format ve adedi **her zaman takvim.csv'den** alır; planla değiştirilemez.

Varsayılan koşu adı `hafta-1`; çıktı `cikti/hafta-1/` altına gider.

## 0. Önce oku

1. `CLAUDE.md`: Wiro kuralları, dosya adı kuralı, şifre yasağı.
2. `DESIGN.md`: §2 renk çiftleri, §5 bileşenler, §6 görsel ve ambalaj tarifi, §8 güvenli alanlar, §9 yasaklar.
3. `takvim.csv`: satırları ve `gun` sütunu. Hafta gününü kendin hesaplama.
4. `degerlendirme.md` → "Selin'e sorulacaklar": açık iddia soruları.
5. `cikti/wiro-harcama.csv`: koşudan önceki toplam (raporla karşılaştırmak için).

## 1. Haftanın akışı: AIDA

Her içeriğin görsel ağırlığı kendi aşamasından gelir. Aşamayı betik tarihten kendisi atar, şablon da ona göre ölçekler (`asama-…` sınıfı). Sen metni ve görseli bu ağırlığa göre seç.

| Tarih | Gün (takvim) | Format | Aşama | Görsel ağırlık | Şablonda ne değişir |
|---|---|---|---|---|---|
| 2026-10-13 | Salı | animasyonlu post | **dikkat** | Fotoğraf ve iri başlık; gövde en az | Başlık 120 px, en fazla iki kısa satır gövde |
| 2026-10-14 | Çarşamba | post | **ilgi** | Başlık + açıklama + içerik satırı dengede | Başlık 96 px, gövde 40 px, terim kutusu |
| 2026-10-15 | Perşembe | story ×3 | **ilgi** | Adım numarası + takvimdeki cümle + terim | Numara 132 px, cümle 56 px |
| 2026-10-16 | Cuma | video | **istek** | Doku, hareket; yazı yok | Video kopyalanır |
| 2026-10-17 | Cumartesi | post ×4 (kaydırmalı) | **istek** | Fotoğraf baskın, tek duyusal ya da açıklayıcı satır | Başlık 72 px |
| 2026-10-18 | Pazar | kapak | **istek** | Nil'in sorusu, fotoğraf baskın | Başlık 132 px, ızgara alanında |
| 2026-10-19 | Pazartesi | story ×2 | **eylem** | Yazı baskın: fiyat ve son an iri; fotoğraf küçük bir hücrede | Başlık 104 px, fotoğraf 460 px hücre |

## 2. Görsel seç: önce cikti/'de ara

Önce aşağıdaki katalogdan uygun yazısız görseli seç. Dosyanın hâlâ var olduğunu `ls` ile doğrula.

**Uygunluk şartları** (hepsi tutmalı):
- Görselde modelin yazdığı başlık, fiyat ya da cümle yok (DESIGN.md §6).
- Ambalaj tarife uyuyor: 01, 02 ve 03 doğru ve okunur, sıra soldan sağa 01-02-03.
- Oran uyuyor ya da `odak` ile kırpılabiliyor: post 4:5, story ve kapak 9:16.
- Fotoğrafın boş kâğıt alanı, o aşamanın yazı bloğunu taşıyacak kadar büyük.

| Dosya | İçerik | Oran | Boş alan | Not |
|---|---|---|---|---|
| `cikti/sosyal/2026-10-14-gorsel-nanobanana-2.png` | Üç ürün yan yana, sol-orta | 4:5 | Üst ≈ %33 | Ambalaj ✓. 14 Ekim postunun görseli |
| `cikti/2026-10-13-post-sonra-gorsel.png` | Üç ürün, üç sütunda geniş aralıklı | 4:5 | Üst ≈ %43 | ⚠ 03'ün pompası kapak gibi, ambalajlarda "ml" satırı var, gölge uzun |
| `cikti/ham/2026-10-09-site-giris.jpeg` | Üç ürün tek set, sıkı | 4:5 (1856×2304) | Üst ≈ %27 | Ambalaj en doğru olan (pompa ucu görünür). Üstüne az yazı sığar; eylem hücresi için iyi |
| `cikti/sosyal/2026-10-15-story-1-gorsel.png` | El + 01, parmakta jel | 9:16 | Üst ≈ %35 | |
| `cikti/sosyal/2026-10-15-story-2-gorsel.png` | El + 02, damlalık, damlalar | 9:16 | Üst ≈ %31 | |
| `cikti/sosyal/2026-10-15-story-3-gorsel.png` | El + 03, pompa, krem | 9:16 | Üst ≈ %36 | |
| `cikti/sosyal/2026-10-18-kapak-gorsel.png` | Yukarıdan: 8 etiketsiz ürün + 01-02-03 + el | 9:16 | Üst ≈ %45 | 02 etiketi yamalı ve doğru. Ham `-v2` dosyasını **kullanma** ("Niosinamid") |
| `cikti/hareket/2026-10-16-video.mp4` | 02 damla, 5 sn | 9:16 | — | 16 Ekim video satırı bunu kopyalar |

**Kullanma:**
- `cikti/m1/*` ve `*-post-model*`: yazıları model çizmiş.
- `*-flux*`: ambalaj yanlış.
- `*-v1*`, `*-v2*`: elenmiş denemeler.
- `site/` altındakiler: sitenin kopyaları.

## 3. Uygun görsel yoksa: Wiro'da üret

Yalnız katalogda uygun görsel yoksa üret. Örneğin 17 Ekim kaydırmalı postu için 02'nin tek başına yakın planı yok. CLAUDE.md kuralları geçerli:

1. **Önce fiyat:** Modeli bu koşuda ilk kez kullanıyorsan `get_model_schema` ile şemasını ve fiyatını oku. Tek üretim 1 $'ı geçecekse önce kullanıcıya sor.
2. **Aynı anda tek üretim.** Her iş için `run_model`'i **bir kez** çağır. Süre dolarsa `wait_for_task` ile bekle, `run_model`'i yeniden çağırma.
3. **Hemen indir:** Wiro adresi süreli. Çıktıyı hemen `cikti/ham/<tarih>-<ad>.jpeg` olarak indir, her yerde yerel kopyayı kullan. Gerekirse `araclar/node_modules/ffmpeg-static/ffmpeg` ile ölçekle.
4. **Harcamaya yaz:** `get_task_price` ile maliyeti al ve `cikti/wiro-harcama.csv`'ye satır ekle: `zaman,modul,model,gorev,usd,adres,dosya`. **`modul` sütununa koşu adını yaz** (ör. `hafta-1`); raporun harcama bölümü bu sütunla süzülür.
5. **Model:** `google/nano-banana-2`. Post için 4:5, story ve kapak için 9:16; 2K.

İstem kalıbı (DESIGN.md §6, bugünkü notlar):
- **Işık:** Tek, sert sabah güneşi sol üstten. Dolgu ışığı yok. Gölge kısa, koyu ve sağ alta düşüyor. Renk nötr gün ışığı.
- **Zemin:** "Tek parça, kesintisiz, düz tonlu sıcak kırık beyaz mat kâğıt (#FAF7F2); bant yok, ton geçişi yok." Boş alanı **yüzdeyle bölge olarak tarif etme**; model bunu ton bandı olarak çiziyor. "Ürünler karede küçük, üstte geniş boş kâğıt" de.
- **Ambalaj:** Her ürünü tarifle yaz. Mat yulaf beyi (#EDE3D6), baskı mürekkep siyahı (#1F1B17), sade grotesk sans. Ön yüzde **yalnız üç öğe**: büyük numara, ürün adı, küçük harf "conscious". "ml ya da başka yazı yok."
  - 01: 150 ml tüp, düz siyah kapağının üstünde ters duruyor.
  - 02: 30 ml buzlu cam şişe, yulaf etiketli, siyah damlalık.
  - 03: 50 ml silindir şişe, siyah pompa başlı, **yan çıkış ucu görünür**.
  - Birlikteyse soldan sağa 01, 02, 03.
- **Yasaklar:** Başlık, fiyat, metin yok. Önce-sonra yok, cilt üstünde etki sahnesi yok. Başka marka ya da logo yok. Laboratuvar, molekül, soğuk mavi, çiçek, yaprak, varak yok.
- **Referans görsel verme:** Süreli Wiro adresi gerekiyor ve model referansın kompozisyonunu kopyalıyor. Ambalajı sözle tarif et; bugün en iyi sonucu bu verdi.

Üretimden sonra görseli **aç ve bak** (Read):
- Üç etiketi tek tek oku.
- Nesneleri say.
- Sahnede yazı olmadığını doğrula.

Hata varsa ikinci bir üretim yeni bir iştir. Fiyatı küçükse yapabilirsin, ama raporda ikisini de göster.

## 4. Metni kur

Kurallar:
- **Kaynak:** Metin yalnız o satırın `ana_mesaj` ve `cta` sütunlarından ve kitteki olgulardan gelir: `marka-brief.md`, `lansman-haftasi.md`, takvimin `konu` sütunu. Cümleyi kısaltabilir ve satırlara bölebilirsin, ama sözcük ekleme. Betik her cümleyi kitte birebir arar ve bulamadığını uyarı olarak raporlar.
- **Ürün iddiası:** Ürünün cilde ne yaptığını söyleyen bir cümle gerekiyorsa **uydurma**, `[İDDİA · Selin'den]` yaz. Betik bunları rapordaki "Selin'e sorulacaklar"a ekler. İçerik tablosundaki tanımlar ("Niasinamid. B3 vitamininin bir formu.") iddia değildir.
- **Terim satırı:** Her iş, görselde ya da açıklamasında en az bir "terim · Türkçesi" satırı taşır (DESIGN.md §5). Satır `marka-brief.md` "İçerikler, Türkçe" tablosundan birebir alınır: `terim.ad` = etiketteki adı, `terim.tr` = Türkçesi.
- **Fiyat:** Yalnız "lansman fiyatı" ya da "lansman fiyatıyla" de. İndirim oranı, üstü çizili fiyat, ünlem, emoji ve aciliyet dili yok. Fiyatı Mühür rengiyle vurgulamak için `**1.390 TL**` yaz. Satır sonu için `\n` kullan.
- **Story CTA'sı:** Takvimde "Bağlantı çıkartması: …" yazıyorsa CTA basılmaz. Betik son karede x 240–840, y 1380–1560 alanını boş bırakır; çıkartmayı Instagram'da sen eklersin.
- **Kapak:** Kapakta CTA basılmaz, Reels açıklamasına gider.
- **Hafta günü:** Gün görselde geçecekse takvimdeki `gun` sütunundan yaz.

Satır satır öneri (karar senin, ama sözcükler kaynaktan):

| Tarih | Kare | `etiket` | `no` | `baslik` | `metin` | `terim` | `cta` |
|---|---|---|---|---|---|---|---|
| 13 | 1 | Rutin Seti | | Conscious\nbugün açıldı. | Üç ürün, bir rutin.\nRutin Seti lansman fiyatıyla **1.390 TL**. | | Bio'daki bağlantıdan siteye git |
| 14 | 1 | Rutin Seti · 01 + 02 + 03 | | Önce 01, sonra 02,\nsonra 03. | Sıra her şişenin üstünde yazıyor. | Glycerin · Gliserin. Suyu kendine çeken, nem tutucu bir bileşen. | Seti sitede incele |
| 15 | 1–3 | Akşam rutini | 01 · 02 · 03 | Nemli yüze fındık kadar. · 3-4 damla. · Bir pompa. | | ürünün öne çıkan içeriği | çıkartma (son kare boş) |
| 17 | 1 | Etiketi okuyalım · 02 Niasinamid Serumu | | Arka yüzdeki üç içerik ve Türkçesi | niasinamid, pantenol, sodyum hiyalüronat. | | |
| 17 | 2–4 | Etiketi okuyalım | | Niasinamid. · Pantenol. · Sodyum hiyalüronat. | | Niacinamide · B3 vitamininin bir formu. vb. | 4. karede: Kaydet. |
| 18 | 1 | Nil Aydemir · kurucu | | Neden\nüç ürün? | Kurucu, banyosundaki on bir ürünü neden üçe indirdiğini anlatıyor. | | — |
| 19 | 1–2 | Lansman fiyatının son günü | | Rutin Seti'nin lansman fiyatı **1.390 TL**, · bu gece 23.59'da bitiyor. | | | çıkartma (son kare boş) |

**Bilinen açık:** 17 Ekim CTA'sının ikinci cümlesi "İçerik listesinin tamamı ürün sayfasında". Kitte tam liste yok, ürün sayfası yalnız dokuz satır gösteriyor. Bu cümleyi basma; `eksikler`e ve `selin`e "Tam içerik listesi Selin'den bekleniyor" diye yaz (degerlendirme.md, Selin #2).

## 5. plan.json yaz

`cikti/<kosu>/plan.json`:

```json
{
  "kosu": "hafta-1",
  "isler": [
    {
      "tarih": "2026-10-13",
      "kareler": [
        {
          "gorsel": "cikti/2026-10-13-post-sonra-gorsel.png",
          "odak": "50% 50%",
          "etiket": "Rutin Seti",
          "baslik": "Conscious\nbugün açıldı.",
          "metin": "Üç ürün, bir rutin.\nRutin Seti lansman fiyatıyla **1.390 TL**.",
          "cta": "Bio'daki bağlantıdan siteye git"
        }
      ]
    },
    {
      "tarih": "2026-10-15",
      "kareler": [
        { "gorsel": "cikti/sosyal/2026-10-15-story-1-gorsel.png", "etiket": "Akşam rutini", "no": "01",
          "baslik": "Nemli yüze fındık kadar.",
          "terim": { "ad": "Avena Sativa Kernel Extract", "tr": "Yulaf özü. Yulaf tanesinden elde ediliyor." } }
      ]
    },
    { "tarih": "2026-10-16", "video": "cikti/hareket/2026-10-16-video.mp4" }
  ],
  "eksikler": ["…betiğin bilemeyeceği eksikler…"],
  "selin": ["…betiğin bilemeyeceği iddia soruları…"]
}
```

Alanlar:
- **Kare alanları:** `gorsel` (zorunlu, kök göreli yol), `odak` (CSS object-position), `etiket`, `sira` (story ve kaydırmalıda boşsa "1/3" gibi otomatik), `no`, `baslik`, `metin`, `terim {ad, tr}`, `cta`, `wiro_gorev` (bu koşuda üretildiyse görev numarası).
- **Kare sayısı:** Takvimdeki `adet` kadar kare olmalı; eksikse rapora düşer.
- **Video satırı:** `video` alanı (kopyalanacak dosya). Yeni video **üretme**.

## 6. Bas

```bash
node araclar/fabrika.mjs cikti/hafta-1/plan.json
```

Yalnız bazı günleri yeniden basmak için: `--yalniz=2026-10-14,2026-10-17`. Temas sayfası ve rapor yalnız o günlerle yeniden yazılır. Bitince bütün haftayı bir kez daha bas.

Betiğin ürettikleri, hepsi `cikti/<kosu>/` altında:

| Format | Dosyalar |
|---|---|
| post | `<tarih>-post.png` (kaydırmalıda `-post-1.png` … `-post-4.png`) ve her karenin `-kontrol.png`'si |
| animasyonlu post | `<tarih>-animasyonlu-post.mp4` (6 sn, 30 fps, `araclar/mp4.mjs`), `-ilk-kare.png`, `-kontrol.png` |
| story | `<tarih>-story-1.png` … ve her karenin `-kontrol.png`'si (kırmızı bantlar, çıkartma alanı) |
| kapak | `<tarih>-kapak.png`, `-kontrol.png`, `-izgara.png` (orta 1080×1440) |
| video | `<tarih>-video.mp4` (kopya; ölçü ve süre denetlenir) |

Ek olarak:
- `kaynak/`: doldurulmuş HTML kareleri.
- `index.html`: temas sayfası; her içerik tarihi, hafta günü, saati, formatı ve aşamasıyla.
- `rapor.md`: üretilenler, denetim uyarıları, eksikler, bu koşunun Wiro harcaması, "Selin'e sorulacaklar".

Betik her karede şunları denetler:
- **Güvenli alan** (§8): post her kenarda 60 px; story y 250–1580; kapak y 240–1680; yanlarda 60 px.
- **Kontrast** (§2): yazının arkasındaki fotoğraf bölgesinin ortalaması ölçülür. Tuvalde 67 px altı yazı 4,5:1, üstü 3:1.
- **Yazı tipleri:** Fraunces, IBM Plex Sans ve IBM Plex Mono yüklenmiş olmalı.
- **Kaynak:** Her cümle kitte birebir geçmeli.
- **Rakamlar:** Tutarlar kitteki fiyatlardan, tarihler lansman haftasından.
- **Yasak dil:** indirim, ünlem, emoji, aciliyet.

## 7. Sonucu oku, gözle bak, düzelt

1. `rapor.md`'yi oku.
   - Her **denetim uyarısını** düzelt: planı değiştir, `--yalniz` ile yeniden bas.
   - Kaynak uyarısı, kitte birebir olmayan bir sözcük demek. Yazıyı kitteki hâline döndür; gerekiyorsa `[İDDİA · Selin'den]` yaz.
2. Basılan her PNG'yi **aç ve bak** (Read). Betik yazının ürünün üstüne binip binmediğini ölçemez.
   - Yazı fotoğraftaki bir ürünü kapatıyorsa `odak`'ı değiştir, daha boş bir görsel seç ya da yazıyı kısalt.
   - Kontrol kopyalarında kırmızı bantların içinde yazı olmamalı.
3. Kullanıcıya kısa bir özet göster:
   - `cikti/<kosu>/index.html` yolu (tarayıcıda açmak için),
   - üretilen dosya sayısı,
   - eksikler,
   - bu koşunun Wiro harcaması,
   - "Selin'e sorulacaklar".

## Yapma

- Takvimdeki tarihi, günü, saati, formatı ya da adedi değiştirme; betik zaten takvimden alır.
- Görsel istemine başlık, fiyat ya da metin yazma (karar.md, "Görsel üstü yazı").
- Video satırında yeni video üretme; `cikti/hareket/`'teki videoyu kopyala.
- Wiro anahtarını ya da başka bir şifreyi hiçbir dosyaya ve sohbete yazma.
- `frontend-design` ya da başka bir beceri DESIGN.md ile çelişirse DESIGN.md kazanır (CLAUDE.md).
