# Conscious · DESIGN.md

> Kurgusal marka, eğitim amaçlı. Bu dosya her görselin, ürün sayfasının ve içerik fabrikasının sözleşmesidir.
> Değerler yalnız `gorsel-yon.md`, `marka-brief.md`, `lansman-haftasi.md`, `karar.md` ve `degerlendirme.md`'den gelir.
> Kitte olmayıp bu dosyada türetilen her değer **(türetilmiş)** diye işaretlidir; kaynağı yanında yazar.
> Her kuralın yanındaki "Bilge" sütunu, kuralın hangi arketip kararına hizmet ettiğini söyler.

---

## 1. Arketip ve görsel yön

| Kural | Değer | Bilge |
|---|---|---|
| Arketip | **Bilge (Sage).** Güveni açıklıkla kurar: anlamak ve anlatmak. | Defne'nin "hangisi bana lazım, kendim karar vereyim" işine bilgi vererek cevap verir. |
| Persona | **Defne**, 29, ürün tasarımcısı. Kaygısı: "Yine bir marka bana bir şey satmaya çalışıyor." | Satmak yerine açıklamak, bu kaygıyı boşa çıkarır. |
| Görsel yön | **A · Etiket.** Sözlük sayfası gibi düzenli satırlar, geniş kenar boşlukları, ince çizgili ızgara, büyük basılmış numara. | Etiket ve ızgara, markanın "her içeriği Türkçe anlatıyoruz" sözünü görünür kılar. |
| Rakipten ayrım | Butik markaların şiirsel dilinden ve trend markaların parlak pastelinden uzak durur. | Bilge'nin net ayrımı bu iki rakip türünden gelir (marka-brief.md). |
| Risk ve karşılığı | Soğukluğa karşı sıcak Kâğıt ve Yulaf zemin, "sen" hitabı. Eczane diline karşı her terimin yanında Türkçesi, laboratuvar görüntüsü yok. Murat'a karşı büyük numara ve 01 → 02 → 03 sırası her işte. | Bilge'nin kitteki üç riskine karar.md'de onaylanan karşılıklar. |

## 2. Renk

### Palet (Yön A · Etiket)

| Ad | Hex | Rol | Bilge |
|---|---|---|---|
| Kâğıt | `#FAF7F2` | zemin | Beyaz kâğıt, sözlük sayfası; soğuk beyaz yerine sıcak zemin Bilge'nin soğukluk riskini yumuşatır. |
| Yulaf | `#EDE3D6` | imza, ambalaj rengi | Her işte görünür; ambalajla aynı renk, etiketin kendisini hatırlatır. |
| Mürekkep | `#1F1B17` | yazı, ambalajdaki baskı | Yüksek kontrast açıklığın ilk şartıdır. |
| Mühür | `#2F4A3A` | vurgu (fiyat, tek vurgu) | Az kullanılan tek vurgu, okuru tek bilgiye yönlendirir. |
| Kurşun | `#6B645B` | çizgi; ikincil yazı yalnız düz Kâğıt ya da Yulaf zeminde | Ölçü çizgisi ve ızgara çizgisi Bilge'nin "ölçüyle konuş" ilkesinin görsel karşılığıdır. |

### Metin ve zemin çiftleri (WCAG kontrast oranı)

Eşik: normal yazı 4,5:1, büyük yazı 3:1. **Bu eşiklerin altındaki çiftler yasak.**

Büyük yazı: telefonda ekranda en az 24 px. 1080 px tuval telefonda yaklaşık 0,36 oranında küçüldüğü için (degerlendirme.md, M2) **tuvalde 67 px'in altındaki her yazı normal yazı sayılır** (türetilmiş: 24 ÷ 0,36).

"Fotoğraf kâğıdı": fotoğraftaki kâğıt zemin. Bugün ölçülen en koyu değer `#E6DDD2` (degerlendirme.md, M2, story 2).

| Yazı | Zemin | Oran | Normal yazı | Büyük yazı |
|---|---|---:|---|---|
| Mürekkep | Kâğıt | 16,01:1 | ✓ | ✓ |
| Mürekkep | Yulaf | 13,49:1 | ✓ | ✓ |
| Mürekkep | Fotoğraf kâğıdı | 12,74:1 | ✓ | ✓ |
| Mühür | Kâğıt | 9,09:1 | ✓ | ✓ |
| Mühür | Yulaf | 7,66:1 | ✓ | ✓ |
| Mühür | Fotoğraf kâğıdı | 7,23:1 | ✓ | ✓ |
| Kurşun | Kâğıt | 5,46:1 | ✓ | ✓ |
| Kurşun | Yulaf | 4,60:1 | ✓ | ✓ |
| Kurşun | Fotoğraf kâğıdı | 4,34:1 | **yasak** | ✓ |
| Kâğıt | Mürekkep | 16,01:1 | ✓ | ✓ |
| Kâğıt | Mühür | 9,09:1 | ✓ | ✓ |
| Kâğıt | Kurşun | 5,46:1 | ✓ | ✓ |
| Yulaf | Mürekkep | 13,49:1 | ✓ | ✓ |
| Yulaf | Mühür | 7,66:1 | ✓ | ✓ |
| Yulaf | Kurşun | 4,60:1 | ✓ | ✓ |
| Mürekkep | Mühür | 1,76:1 | **yasak** | **yasak** |
| Mürekkep | Kurşun | 2,93:1 | **yasak** | **yasak** |
| Mühür | Mürekkep | 1,76:1 | **yasak** | **yasak** |
| Mühür | Kurşun | 1,67:1 | **yasak** | **yasak** |
| Kurşun | Mürekkep | 2,93:1 | **yasak** | **yasak** |
| Kurşun | Mühür | 1,67:1 | **yasak** | **yasak** |
| Kâğıt | Yulaf | 1,19:1 | **yasak** | **yasak** |
| Kâğıt | Fotoğraf kâğıdı | 1,26:1 | **yasak** | **yasak** |
| Yulaf | Kâğıt | 1,19:1 | **yasak** | **yasak** |
| Yulaf | Fotoğraf kâğıdı | 1,06:1 | **yasak** | **yasak** |

Kurallar:
- **Fotoğraf üstündeki küçük yazı her zaman Mürekkep'tir** (degerlendirme.md, M2 düzeltmesi). Bilge: Okunmayan açıklama, açıklama değildir.
- Kurşun yalnız çizgide ya da düz Kâğıt veya Yulaf zeminde yazı olarak kullanılır. Bilge: İkincil bilgi geri planda durur ama okunur kalır.
- Yulaf, Kâğıt ya da fotoğraf kâğıdı üstünde yazı rengi olamaz. Yulaf kutunun zemini olur, içine Mürekkep yazılır. Bilge: İmza rengi zemin olarak görünür, okunurluktan ödün vermez.
- Fotoğraf zemininde her yeni işte yazının arkasındaki bölge ölçülür. Oran eşiği geçmiyorsa yazı Mürekkep'e ya da Yulaf kutuya alınır. Bilge: Kural ölçüyle doğrulanır, gözle tahmin edilmez.

## 3. Yazı

| Aile | Ağırlık | Kullanım | Bilge |
|---|---|---|---|
| **Fraunces** | 400, 600; optik boyut ekseni açık | Başlık, büyük ürün numarası, "conscious" kelime işareti | Büyük puntoda ince çizgileri inceltir; basılı sözlük başlığı gibi okunur. |
| **IBM Plex Sans** | 400, 500 | Gövde, alt başlık, fiyat | Sade, gündelik Türkçe okuma yazısı. |
| **IBM Plex Mono** | 400 | İçerik adları (etiketteki adı), ölçüler, numaralar, CTA | Etiketteki Latince adı ve ölçüyü "veri" gibi ayırır; terimi Türkçesinden ayırt eder. |

Üç aile de Google Fonts'tan yüklenir ve Türkçe karakterleri (ğ, ş, ı, İ) taşır. Her PNG'de yazı tipinin gerçekten yüklendiği `araclar/png.mjs` çıktısından ya da tarayıcının raporundan doğrulanır.

### 1080 px tuval ölçeği (gorsel-yon.md)

| Rol | Tuvalde | Bilge |
|---|---|---|
| Başlık | 88–140 px | Tek ana cümle, büyük ve net. |
| Alt başlık | 44–56 px | Açıklayan ikinci satır. |
| Gövde | en az 34 px | Telefonda okunur alt sınır. |
| Dipnot | en az 28 px | İçerik adı, ölçü, etiket satırı bu boyuttan küçük olamaz. |

### Web ölçeği (karar: ürün sayfası brief'ine göre)

Kitte web için punto yok. Tuvalden orantıyla türetilen ölçek (× 0,347) gövdeyi 12 px veriyordu. `urun-sayfasi-brief.md` "375 px genişlikte her şey okunur, düğmeye başparmakla rahat basılır" dediği için ölçek okunurluğa göre kuruldu (kullanıcı kararı, 9 Ekim 2026).

| Rol | Web (375 px'ten başlayarak) | Bilge |
|---|---|---|
| Başlık (h1) | 44 px, geniş ekranda 56 px | Tek ana cümle, büyük ve net. |
| Bölüm başlığı (h2) | 30 px | Sözlük maddesi başlığı gibi. |
| Alt başlık, fiyat | 22 px | Açıklayan ikinci satır. |
| Gövde | en az 17 px, satır yüksekliği 1,55 | Telefonda yarım dakikada okunur. |
| Dipnot, içerik adı (Mono) | en az 14 px | Etiketteki ad küçük ama okunur. |
| Düğme | en az 52 px yükseklik, tam genişlik | Başparmakla rahat basılır (brief). |

## 4. Boşluk ve ızgara

| Kural | Değer | Bilge |
|---|---|---|
| Kenar payı (post, kaydırmalı post, animasyonlu post) | Yazı kenarlardan **60 px** içeride. | Geniş kenar boşluğu "kitap sayfası" düzenidir. |
| Profil ızgarası kırpması | Post profilde 3:4 görünür, yanlardan yaklaşık 34 px kırpılır. 60 px'lik payla yazı kenara 26 px kalır. | Kırpıldığında da bilgi eksilmez. |
| Hizalama | Yazı sola yaslı; ürün ortada değil, ızgaranın bir hücresinde. | Ortalanmış vitrin yerine düzenli satır ve hücre. |
| Izgara çizgisi | İnce Kurşun çizgi (ölçü çizgisi, satır ayıracı). | Ölçüyle bölünmüş sayfa, ölçüyle konuşan marka. |
| Boşluk | Görselin geniş bir kısmı boş kâğıt; yazı bu boşluğa yerleşir. | Az şey söylendiğinde her şey okunur. |

## 5. Bileşen dili

| Bileşen | Kural | Bilge |
|---|---|---|
| **Başlık** | Fraunces 400, Mürekkep, sola yaslı, 88–140 px. Metni takvim.csv'deki `ana_mesaj`'dan birebir alınır. | Söz takvimden sapmaz; açıklama tek cümlede başlar. |
| **Ürün numarası** | Ürün her yerde numarasıyla anılır: "01 Temizleme Jeli". Görselde büyük Fraunces numara; yanında ad ve ölçü Mono. Üç ürün birlikteyse soldan sağa 01, 02, 03. | Numaralı sabit rutin, "hangisi önce" sorusunu baştan cevaplar. |
| **İçerik satırı** | Önce etiketteki adı (Mono), sonra Türkçesi (Plex Sans): "Niacinamide · Niasinamid. B3 vitamininin bir formu." Satırlar marka-brief.md'deki "İçerikler, Türkçe" tablosundan birebir. Her iş (görsel ve açıklaması birlikte) en az bir terim ve Türkçesi satırı taşır (karar.md, "Her istemde"). | Bilge'nin özü: terim ve Türkçesi yan yana. |
| **Düğme (CTA)** | Yulaf zemin, Mürekkep yazı, IBM Plex Mono. Metin takvim.csv'deki `cta` sütunundan. Ünlem yok. | Sakin bir davet; satış baskısı yok. |
| **Fiyat** | "Lansman fiyatı" ya da "lansman fiyatıyla" yazılır. Sayı Türkçe biçimde (1.390 TL), vurgu Mühür, Plex Sans 500. İndirim oranı ve üstü çizili fiyat yok. Tarih ve saat açık yazılır. | Fiyatı açık ve ölçülü söylemek, "bana bir şey satıyorlar" kaygısını azaltır. |
| **Kelime işareti** | Küçük harfle "conscious" (Fraunces). Cümle içinde "Conscious". | Sade imza; büyük harfli logo gösterişi yok. |

## 6. Görsel ve hareket

### Işık, kompozisyon, doku, hareket (Yön A)

| Kural | Değer | Bilge |
|---|---|---|
| Işık | Düz, net gün ışığı; gölge kısa ve sert. Sabah sekizde masaya düşen ışık. | Net ışık hiçbir şeyi saklamaz. |
| Kompozisyon | Izgara, sola yaslı yazı, çok boşluk; ürün ızgaranın bir hücresinde. | Düzen, açıklamanın görsel karşılığı. |
| Doku | Kâğıt, mat ambalaj, baskı. | Etiket ve kâğıt, "arka yüzü okuyalım" sözünü taşır. |
| Hareket | Satırlar sırayla gelir, ölçü çizgisi çizilir, numara değişir. Kamera sabit ya da düz ve yavaş ilerler. İlk karede başlık ve fiyat okunur; hareket yalnız ikincil öğelerde. | Hareket bilgiyi sırayla açar, gösteriş yapmaz. |
| İnsan | 25–45 yaş, makyajsız ya da çok hafif makyajlı, cilt dokusu görünür. Yüzün tamamı yerine el, boyun, yanak. Kullanım anlatan işlerde el ve doku girer, ışık ve ızgara Yön A'da kalır (karar.md). | Ürünün nasıl kullanıldığını gösterir, bir yüze satmaz. |
| İllüstrasyon | İnce çizgi, numaralar, adım okları, içerik için küçük diyagramlar. Hazır ikon seti yok. | Diyagram açıklar, süslemez. |

### Ambalaj tarifi (her görselde birebir)

- Üç ambalaj mat yüzeyli ve Yulaf renginde, yazılar Mürekkep. Ön yüzde büyük ürün numarası, altında ürün adı, en altta küçük harfle "conscious". Desen, çiçek, yaprak ve parlak varak yok.
- **01 Temizleme Jeli:** 150 ml yumuşak tüp, kapağı altta, düz ve Mürekkep renginde.
- **02 Niasinamid Serumu:** 30 ml buzlu cam şişe, Yulaf etiket, Mürekkep damlalık başlığı.
- **03 Seramid Krem:** 50 ml silindir pompalı şişe, Yulaf gövde, Mürekkep pompa.
- Üç ürün birlikteyse soldan sağa 01, 02, 03.
- Ambalajı sabitlemek için modele onaylı bir ambalaj görseli yalnız "ambalaj referansı" olarak verilir (degerlendirme.md, M2).

Bilge: Ambalaj her seferinde aynı görünürse etiket bir sözlük maddesi gibi tanınır.

### Model kullanımı (degerlendirme.md, M1–M2)

- Görsel istemine başlık, metin, fiyat ya da CTA yazılmaz; bunlar HTML katmanında eklenir ve `araclar/png.mjs` ile basılır (karar.md, "Görsel üstü yazı"). Bilge: Söz harfi harfine kitten gelir; model ne yazı tipini ne rengi tutturabiliyor.
- Boş alan istemde "üst %X boş" gibi bölge yüzdesiyle tarif edilmez, "tek parça, düz tonlu kâğıt" diye tarif edilir; model yüzdeleri ton bandı olarak çizdi. Bilge: Zemin temiz kalırsa bilgi öne çıkar.
- Sayı ve oranlara güvenilmez: üretimden sonra nesneler sayılır, oranlar ölçülür. Bilge: Ölçü verirken ölçü tutmalı.
- Her düzenlemeden sonra üç etiket yakından okunur; düzenleme etiketi bozabilir ("Niasinamid" → "Niosinamid"). Bilge: Etiketteki tek harf hata, markanın sözünü bozar.

### Kaçınılacaklar (gorsel-yon.md)

- **Yön A:** laboratuvar önlüğü, deney tüpü ve molekül çizimi, soğuk mavi.
- **Yön B:** spa taşları, orkide, havada uçuşan yapraklar, pembe filtre.
- **Yön C:** mermer ve altın, buz küpü, neon mavi parıltı.
- **Görselde yer almayanlar:** başka bir markanın ürünü, logosu ya da ambalajı; tanınmış bir kişiye benzeyen yüz.

Bilge: Eczane klişesi, spa klişesi ve lüks klişesi açıklamanın yerini alır; üçü de yok.

## 7. Ses ve ton (marka-brief.md)

Conscious sakin, açık ve yetişkin konuşur. Hitap "sen", cümleler kısa. Önce içeriğin adını söyler, sonra Türkçesini. Ölçü verir: ml, damla, adım, tarih, saat.

| Kural | Böyle | Böyle değil | Bilge |
|---|---|---|---|
| Ölçüyle konuş | "02 Niasinamid Serumu. 30 ml. Temizlikten sonra 3-4 damla." | "Bu serumu denemeyen kalmasın!!!" | Ölçü, abartıdan daha güçlü bir kanıttır. |
| İçeriği adıyla ve Türkçesiyle an | "Pantenol, B5 provitamini. Arka yüzde yazıyor." | "Formülümüzün sırrı yıllarca süren tutkuda saklı." | Sır yok, açıklama var. |
| Sakin bir davet | "Akşam rutini üç adım. Sırası şişelerin üstünde." | "Cildin yorgunluğunu ele veriyor mu?" | Korku yerine bilgi. |
| Türkçe | "Sabah rutini" | "Morning routine'ini level up et." | Gündelik Türkçe, eczane Latincesinden ayırır. |
| Fiyatı ve tarihi açık yaz | "Rutin Seti 19 Ekim 23.59'a kadar 1.390 TL." | "Acele et, stoklar tükeniyor!" | Açık fiyat güven kurar. |
| Ünlem ve emoji yok | "Conscious bugün açıldı." | "Yeni rutinine merhaba de! ✨💧" | Sakinlik yetişkin bir sestir. |

Yazım: ürünler numarasıyla ("01 Temizleme Jeli"); marka adı cümle içinde "Conscious", kelime işaretinde "conscious"; sayılar Türkçe biçimde (1.390 TL, %5, 30 ml).

## 8. Formatlar ve güvenli alanlar (gorsel-yon.md)

| Format | Ölçü | Oran | Güvenli alan | Not |
|---|---|---|---|---|
| Post | 1080×1350 | 4:5 | Kenarlardan 60 px içeride | Profil ızgarası 3:4 gösterir, yanlardan yaklaşık 34 px kırpılır |
| Kaydırmalı post | 1080×1350, her kare | 4:5 | Post ile aynı | İlk kare tek başına anlaşılmalı |
| Story | 1080×1920 | 9:16 | Üstte 250 px, altta 340 px boş | Yazı ve bağlantı çıkartması y = 250 ile 1580 arasında |
| Kapak (Reels kapağı) | 1080×1920 | 9:16 | Ortadaki 1080×1440 | Profil ızgarası üstten ve alttan 240'ar px kırpar; başlık y = 240 ile 1680 arasında |
| Animasyonlu post | 1080×1350, MP4 | 4:5 | Post ile aynı | 6–10 sn, 30 fps. Sessiz izlenince de anlaşılır. İlk karede mesaj okunur |
| Video (Reels) | 1080×1920, MP4 | 9:16 | Story ile aynı | 5–10 sn |
| Ürün sayfası | 375 px'ten başlar | · | · | Önce telefonda bak |

Her story ve kapak için `-kontrol.png` ya da `-izgara.png` kopyası basılır: üst ve alt boş bantlar yarı saydam kırmızı, çıkartma alanı kesikli çerçeveli (bugünkü iş akışı). Bilge: Kural gösterilerek doğrulanır.

## 9. Yasaklar

### Ürün iddiası
- **İddia:** Ürünün cilde ne yaptığını söyleyen her cümle.
- **Onaylı liste:** İddialar yalnız onaylı listeden alınır. **Listeyi Selin Uçar (ürün ve mevzuat) onaylar.** Ürün metinleri ve iddialar Selin'in onayından geçer.
- **Liste elimizde yoksa:** İddia yazılmaz. Yerine `[İDDİA · Selin'den]` yazılır ve soru `degerlendirme.md`'de "Selin'e sorulacaklar" başlığı altına eklenir.
- İçerik tablosundaki tanımlar ("Niasinamid. B3 vitamininin bir formu.") iddia değildir, olduğu gibi kullanılır.

Bilge: Bilge yalnız bildiğini söyler; bilmediğini sorar.

### Fiyat dili (lansman-haftasi.md)
- "Lansman fiyatı" yazılır. İndirim oranı ve üstü çizili fiyat kullanılmaz.
- Rutin Seti 13–19 Ekim'de 1.390 TL; lansman fiyatı 19 Ekim 2026 Pazartesi 23.59'da biter; 20 Ekim'den itibaren 1.590 TL.
- Fiyat, tarih ve hafta günü yalnız `takvim.csv` ve `lansman-haftasi.md`'den alınır; hafta günü `takvim.csv`'deki `gun` sütunundan.
- Aciliyet dili yok ("Acele et", "stoklar tükeniyor").

Bilge: Açık fiyat güvenin parçasıdır.

### Kaçın satırları
Bölüm 6'daki "Kaçınılacaklar" listesinin tamamı yasaktır.

### Bugün degerlendirme.md'ye düşen notlar
- Görsel ya da açıklamada kitte birebir geçmeyen cümle yok; uyarlama ve birleştirme de yok (M2.6). Bilge: Söz kaynağından sapmaz.
- Kurşun yazı fotoğraf zemininde yok; fotoğraf üstündeki küçük yazı Mürekkep (M2). Bilge: Okunmayan açıklama yoktur.
- Bilgiyi ambalajın küçük yazısına taşıtma. Ambalajdaki ürün adı telefonda 28 px dipnot sınırının altında kalıyor; okunması gereken bilgi HTML katmanına yazılır (M1). Bilge: Okunması gereken her şey okunur boyutta yazılır.
- Model metni, sayıyı ya da etiketi yazdıysa her çıktı yakından okunur ve sayılır: 7 yerine 8 ürün, "Niosinamid" hatası (M2). Bilge: Etiketi okuyan marka kendi etiketini de okur.
- flux-2-pro ambalajlı işlerde kullanılmaz: 03'ü atladı, 02'yi iki kez çizdi (M2). Bilge: Ambalaj tarifi tutmayan model etiketin sözünü bozar.
- "Terim · Türkçesi" satırı unutulmaz (M1, bilge.png). Bilge: Bu satır arketipin kendisidir.
