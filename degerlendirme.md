# Değerlendirme

## M1

Görseller: `cikti/m1/stil.png`, `cikti/m1/bilge.png`, `cikti/m1/bakici.png`. İstemler: `cikti/m1/karsilastirma.html`.

### Kritik üçlüsü

> Kullanıcı Claude'un önerdiği gözlemleri kendi cevabı olarak seçti.

- **Ne işe yaradı:** Kitten gelen ölçülü tarif (hex renkler, yazı tipleri, ambalaj, metin) stil.png'deki genel "premium pastel" isteğinden çok daha tutarlı sonuç verdi.
- **Ne yaramadı:** bilge.png'de Bilge'nin "terim · Türkçesi" sözü yoktu. bakici.png'de yazı ayrı bir banda düştü.
- **Model nerede zorlandı:** Model metin rengini tutturamadı: Mürekkep ve Kahve yerine saf siyah kullandı. Ambalajdaki küçük yazılar da telefonda okunamayacak kadar küçük kaldı.

### Denetim tablosu

Kontrast görsellerden ölçüldü: yazı rengi bölgedeki en koyu piksellerden, zemin rengi zeminden. Okunabilirlik eşiği 4,5:1.

| | stil.png | bilge.png | bakici.png |
|---|---|---|---|
| **1. Arketip üç katmanda**<br>ışık ve renk / yazı / söz | **Arketip yok.** Işık ve renk kitteki rakip "parlak pastel" görünümünde. Yazının büyük harf ve sans alt satır kararını model verdi. Söz İngilizce. | **Işık ve renk: evet.** Düz gün ışığı, kısa sert gölge, Kâğıt zemin. Ancak yazı Mürekkep `#1F1B17` değil, saf siyah çıktı. **Yazı: evet.** Fraunces benzeri serif, mono altyazılar, ızgara. **Söz: kısmen.** Lansman mesajı var, Bilge'nin "terim ve Türkçesi" satırı yok. | **Işık ve renk: evet.** Yandan sıcak ışık, yumuşak gölge, Şeftali zemin. Ancak gövde yazısı Kahve `#4A3427` değil, siyah çıktı. **Yazı: evet.** Serif başlık, italik vurgu, sans gövde. **Söz: kısmen.** "Sırası şişelerin üstünde" eşlik ediyor, ama satış satırları baskın ve günün bir anına davet yok. |
| **2. Fiyat, tarih, gün kitle aynı mı** | Fiyat, tarih ve gün görselde yok. | Hepsi aynı: 1.390 TL, 13 Ekim 2026, Salı (takvim.csv `gun`). | Fiyat aynı (1.390 TL). Tarih ve gün görselde yok, yalnız "bugün" var. |
| **3. Kitte geçmeyen ifade** | **Var:** "New skincare". Kitte yok, üstelik İngilizce. | Yok. Bütün yazılar takvimden ya da ambalaj tarifinden. | Yok. "Sırası şişelerin üstünde." kitin ses-ton tablosunda geçiyor. Rozet ve etki iddiası yok. |
| **4. Zeminden okunuyor mu** | Okunuyor. CONSCIOUS gri `#5B5858` zemin `#E4DBD8` üstünde, 5,2:1. Üç görselin en zayıf başlığı bu. | Okunuyor. Siyah yazı Kâğıt zeminde yaklaşık 19:1, yeşil fiyat `#1D321F` 12,5:1. | Okunuyor. Kahve başlık 12,5:1, en zayıfı Kil renkli fiyat `#844429` şeftali `#F8D6BA` üstünde 5,4:1. |

Renk yönünden okunmayan yazı yok: ölçülen bütün yazılar 4,5:1'in üstünde. Sorun boyutta. bilge.png ve bakici.png'de ambalaj üstündeki ürün adları ("Temizleme Jeli", "Niasinamid Serumu", "Seramid Krem") 1080 px tuvalde yaklaşık 12-15 px yüksekliğinde. Bu, kitin dipnot için koyduğu en az 28 px sınırının altında; telefonda okunmaz. Ambalaj yazısı Mürekkep rengi, zemini Yulaf.

### Maliyet

| Görsel | Wiro görevi | USD |
|---|---|---:|
| stil.png | 4081436 | 0,067 |
| bilge.png | 4081479 | 0,067 |
| bakici.png | 4081513 | 0,067 |
| **Toplam** | | **0,201** |

## M2

İşler: `cikti/sosyal/2026-10-14-post.png`, `2026-10-15-story-1/2/3.png`, `2026-10-18-kapak.png`, `aciklama.md`. Temas sayfası: `cikti/sosyal/index.html`.

### Kritik üçlüsü

> Kullanıcı Claude'un önerdiği gözlemleri kendi cevabı olarak seçti.

- **Ne işe yaradı:** Ambalajı 14 Ekim görselini referans vererek sabitlemek: üç story ve kapakta ambalaj aynı kaldı. Yazıyı HTML katmanına almak: gerçek Fraunces ve IBM Plex, birebir renk, güvenli alanlar ölçülerek doğrulandı, düzeltmeler ücretsiz.
- **Ne yaramadı:** Kurşun renkli küçük etiketler fotoğraf zemininde 4,3–4,4:1'de kaldı, telefonda okunurluk sınırın altında. flux-2-pro ambalaj tarifini karıştırdı (03 yok, 02 iki kez). Kapaktaki "on bir üründen üçe" anlatısı görselde 10 ürünle tutmadı.
- **Model nerede zorlandı:** Sayı ve oranlarda: kapakta 8 yerine 7 ürün çizdi, kompozisyon yüzdelerini (sol %55, üst %45) yalnız yaklaşık uyguladı, "üst %37 boş" istemini arka planda ton bandı olarak çizdi. Yön A'nın sert güneş gölgesini her seferinde yumuşak verdi.

### Denetim tablosu

#### 1. Kontrast

Yazı rengi CSS'ten, zemin yazının dolgu kutusundan ya da yoksa altındaki fotoğraf bölgesinin ortalamasından. Bütün yazılar tuvalde ≥ 28 px, yani WCAG tanımıyla "büyük" (eşik 3:1). Tuval telefonda yaklaşık 0,36 oranında küçüldüğü için 4,5:1 sütunu da var.

| İş | Yazı | Boyut | Yazı rengi | Zemin | Oran | 3:1 (büyük) | 4,5:1 (telefonda normal) |
|---|---|---|---|---|---|---|---|
| post | Rutin Seti · 01 + 02 + 03 | 28 px | Kurşun `#6B645B` | foto `#E4DFD3` | 4,4:1 | geçer | **⚠ altında** |
| post | Önce 01, sonra 02, sonra 03. | 96 px | Mürekkep `#1F1B17` | foto `#E8E3D7` | 13,4:1 | geçer | geçer |
| post | Sıra her şişenin üstünde yazıyor. | 40 px | Mürekkep | foto `#EBE6DA` | 13,7:1 | geçer | geçer |
| post | Seti sitede incele | 30 px | Mürekkep | Yulaf dolgu `#EDE3D6` | 13,5:1 | geçer | geçer |
| post | conscious | 44 px | Mürekkep | foto `#EDE9E2` | 14,1:1 | geçer | geçer |
| story 1 | Akşam rutini | 28 px | Kurşun | foto `#E7E0D6` | 4,5:1 | geçer | sınırda |
| story 1 | 1/3 | 28 px | Kurşun | foto `#E7DED4` | 4,4:1 | geçer | **⚠ altında** |
| story 1 | 01 · Nemli yüze fındık kadar. | 132 / 56 px | Mürekkep | foto `#E9E1D7` | 13,2–13,5:1 | geçer | geçer |
| story 1 | Temizleme Jeli · 150 ml | 28 px | Kurşun | foto `#ECE5D9` | 4,7:1 | geçer | geçer |
| story 1 | İçerik kutusu (2 satır) | 28 / 34 px | Mürekkep | Yulaf dolgu | 13,5:1 | geçer | geçer |
| story 2 | Akşam rutini | 28 px | Kurşun | foto `#E7DFD5` | 4,4:1 | geçer | **⚠ altında** |
| story 2 | 2/3 | 28 px | Kurşun | foto `#E6DDD2` | 4,3:1 | geçer | **⚠ altında** |
| story 2 | 02 · 3-4 damla. | 132 / 56 px | Mürekkep | foto `#E9E1D7` | 13,2–13,3:1 | geçer | geçer |
| story 2 | Niasinamid Serumu · 30 ml | 28 px | Kurşun | foto `#EBE3D8` | 4,6:1 | geçer | geçer |
| story 2 | İçerik kutusu | 28 / 34 px | Mürekkep | Yulaf dolgu | 13,5:1 | geçer | geçer |
| story 3 | Akşam rutini | 28 px | Kurşun | foto `#E8E1D7` | 4,5:1 | geçer | sınırda |
| story 3 | 3/3 | 28 px | Kurşun | foto `#E6DFD5` | 4,4:1 | geçer | **⚠ altında** |
| story 3 | 03 · Bir pompa. | 132 / 56 px | Mürekkep | foto `#EAE3D9` | 13,4–13,6:1 | geçer | geçer |
| story 3 | Seramid Krem · 50 ml | 28 px | Kurşun | foto `#EDE5DC` | 4,7:1 | geçer | geçer |
| story 3 | İçerik kutusu | 28 / 34 px | Mürekkep | Yulaf dolgu | 13,5:1 | geçer | geçer |
| kapak | Video · Nil Aydemir, kurucu | 30 px | Mürekkep | Yulaf dolgu | 13,5:1 | geçer | geçer |
| kapak | Neden üç ürün? | 140 px | Mürekkep | foto `#F5F1EB` | 15,2:1 | geçer | geçer |
| kapak | Nil, banyosundaki on bir ürünü… | 40 px | Mürekkep | foto `#F5F0E8` | 15,1:1 | geçer | geçer |

3:1 altında yazı yok. Telefondaki gerçek boyut esas alınırsa Kurşun renkli küçük etiketlerin beşi 4,5:1'in az altında.

#### 2. Kaynak

| Cümle | Nerede | Kitte geçiyor mu |
|---|---|---|
| "Önce 01, sonra 02, sonra 03." · "Sıra her şişenin üstünde yazıyor." · "Seti sitede incele" | post | Evet. takvim.csv 2026-10-14 `ana_mesaj` ve `cta`. |
| "Rutin Seti · 01 + 02 + 03" | post | Evet. lansman-haftasi.md teklif tablosunda "Rutin Seti (01 + 02 + 03)". |
| "Nemli yüze fındık kadar." · "3-4 damla." · "Bir pompa." | story | Evet. takvim.csv 2026-10-15 `ana_mesaj`; baştaki "01, " numara olarak ayrı yazıldı. |
| "Akşam rutini" · ürün adları ve ölçüler | story | Evet. Takvim konusu ve marka-brief.md ürün tablosu. |
| İçerik kutularındaki 6 satır | story | Evet, marka-brief.md içerik tablosuyla birebir aynı. |
| "Neden üç ürün?" | kapak | Evet. takvim.csv 2026-10-18 konusu. |
| **"Nil, banyosundaki on bir ürünü neden üçe indirdiğini anlatıyor."** | kapak | **Uyarlandı.** Takvimde "Kurucu, banyosundaki on bir ürünü neden üçe indirdiğini anlatıyor."; "Kurucu" yerine Nil'in adı yazıldı. |
| **"Video · Nil Aydemir, kurucu"** | kapak | **Birleştirildi.** "Video" kitte yok. Kitte "Nil Aydemir · kurucu, kimya mühendisi". |
| "Üç ürün, bir rutin." · "Sıra her şişenin üstünde yazıyor." | aciklama.md | Evet. Takvimde 13 ve 14 Ekim satırları. |
| **"Önce 01 Temizleme Jeli, sonra 02 Niasinamid Serumu, sonra 03 Seramid Krem."** | aciklama.md | **Birleştirildi.** Takvimdeki 14 Ekim cümlesine marka-brief.md'den ürün adları eklendi. |
| "Niasinamid, B3 vitamininin bir formu." | aciklama.md | Evet, içerik tablosunda var; tabloda nokta, burada virgül. |
| **"Arka yüzde her içeriğin Türkçesi var."** | aciklama.md | **Başka sözle.** marka-brief.md'de "Conscious'ın arka yüzünde her içeriğin yanında Türkçe bir satır var." |
| "Rutin Seti lansman fiyatıyla 1.390 TL, 19 Ekim 23.59'a kadar." | aciklama.md | Evet. Ses-ton örneği "Rutin Seti 19 Ekim 23.59'a kadar 1.390 TL." ve lansman-haftasi.md. |
| "Seti sitede incele, bağlantı bio'da." | aciklama.md | Evet. Takvimdeki CTA ve lansman-haftasi.md "Bağlantı bio'da". |

Kitte hiç geçmeyen bir iddia, rozet ya da slogan yok.

#### 3. Takvim

| İş | Tarih ve gün | Fiyat | Fiyat dili |
|---|---|---|---|
| post ve aciklama.md | Dosya adı 2026-10-14. Açıklamanın başlığında "Çarşamba 12.30", takvim.csv'deki `gun` ve `saat` ile aynı. Görselde tarih yok. | Açıklamada 1.390 TL ve "19 Ekim 23.59", lansman-haftasi.md ile aynı. | Uyuyor: "lansman fiyatıyla"; indirim oranı ve üstü çizili fiyat yok. |
| story | 2026-10-15 Perşembe 19.00, "Akşam rutini" saate uyuyor. Görselde tarih yok. | Fiyat yok. | Fiyat olmadığı için geçerli değil. |
| kapak | 2026-10-18 Pazar 20.00. Görselde tarih yok. | Fiyat yok. | Fiyat olmadığı için geçerli değil. |

#### 4. Format

| İş | Kural | Ölçülen | Sonuç |
|---|---|---|---|
| post | Yazı kenardan 60 px içeride | Bütün yazılar tam 60 px içeride. | Tutuyor. Profil ızgarası yanlardan yaklaşık 34 px kırpınca yazı kenara 26 px kalıyor. |
| story 1–3 | Yazı y 250–1580 arasında | Yazılar y 264–573 (kare 1–2) ve 264–615 (kare 3). | Tutuyor |
| story 3 | Bağlantı çıkartması alanı boş | x 240–840, y 1380–1560 aralığında nesne yok, ürün y 1331'de bitiyor. | Tutuyor |
| kapak | Başlık y 240–1680 arasında | Yazılar y 310–832. | Tutuyor |
| kapak | Izgara kırpması | Üst banttan bir şey kesilmiyor. Alt bantta kenardan giren el ve bilek y 1919'a kadar uzanıyor, ızgarada bilekten kesiliyor. | Başlık tutuyor; el kesiliyor ama kenardan girdiği için doğal duruyor. |

### Maliyet

| İş | Wiro görevi | Model | USD |
|---|---|---|---:|
| 14 Ekim görsel, 1. deneme | 4082101 | nano-banana-2 | 0,067 |
| 14 Ekim görsel | 4082129 | flux-2-pro | 0,045 |
| 14 Ekim görsel, 2. deneme (seçilen) | 4082226 | nano-banana-2 | 0,067 |
| 14 Ekim post, yazıyı model çizdi (a sürümü) | 4082295 | nano-banana-2 | 0,101 |
| 15 Ekim story 1, ilk deneme (v1) | 4082438 | nano-banana-2 | 0,101 |
| 15 Ekim story 2 | 4082461 | nano-banana-2 | 0,101 |
| 15 Ekim story 3 | 4082481 | nano-banana-2 | 0,101 |
| 15 Ekim story 1 | 4082496 | nano-banana-2 | 0,101 |
| 18 Ekim kapak | 4082627 | nano-banana-2 | 0,101 |
| **M2 toplamı** | | | **0,785** |
| **M1 + M2** | | | **0,986** |

### Denetim sonrası düzeltmeler

| Konu | Ne yapıldı | Sonuç |
|---|---|---|
| Kurşun etiketlerin kontrastı (4,3–4,4:1) | Post ve story'deki Kurşun yazılar (etiket, sıra, ürün ve ölçü satırı) Mürekkep'e alındı; Kurşun yalnız çizgilerde kaldı. Post, üç story ve kontrol kopyaları yeniden çizildi. | En düşük oran 12,7:1. |
| Kapakta 10 ürün, metinde "on bir" | Kapak görseli nano-banana-2 ile düzenlendi: sol gruba bir boş ürün eklendi (görev 4082828, 0,101 $). Düzenleme 02 etiketini "Niosinamid" diye bozdu; 02 şişesi ilk görselden (v1) aynı konuma yerleştirildi (kayma 0 px). | Görselde 8 + 3 = 11 ürün, 02 etiketi doğru. İlk görsel `-v1`, düzenlenmiş ham hâli `-v2` adıyla duruyor. |

| Kitte birebir geçmeyen cümleler (kapak 2, açıklama 4) | Kapak: "Video · Nil Aydemir, kurucu" → "Nil Aydemir · kurucu"; alt metin takvimdeki hâline döndü ("Kurucu, banyosundaki…"). Açıklama baştan kuruldu, her cümle kitten birebir. Görsel üretilmedi, yalnız HTML ve PNG. | Görsellerdeki ve açıklamadaki her cümle kit dosyalarında metin aramasıyla bulundu. Ürünün cilde ne yaptığını söyleyen cümle gerekmedi, `[İDDİA · Selin'den]` kullanılmadı. |

| "Terim · Türkçesi" satırı eksik (DESIGN.md §5): 18 Ekim kapağı, 13 Ekim animasyonlu post | Satır görsele değil açıklamaya kondu: `cikti/sosyal/2026-10-18-aciklama.md` (Glycerin · Gliserin, üç üründe de var) ve `cikti/hareket/2026-10-13-aciklama.md` (Avena Sativa Kernel Extract · Yulaf özü). Wiro kullanılmadı. | Açıklamalardaki her cümle kitte birebir; gün ve saat takvim.csv ile aynı. |

Düzeltmelerle toplam Wiro harcaması 1,087 $ (16 Ekim Reels videosu hariç; video dahil 1,507 $).

## M6

İçerik fabrikası, ilk koşu: `.claude/skills/icerik-fabrikasi/`, `araclar/fabrika.mjs`, çıktı `cikti/hafta-1/` (`index.html`, `rapor.md`).

### Kritik üçlüsü

> Kullanıcı Claude'un önerdiği gözlemleri kendi cevabı olarak seçti.

- **Ne işe yaradı:** İşi ikiye bölmek. Tarih, gün, saat ve formatı betik takvimden aldı, görünümü şablonlar DESIGN.md'den. Sonuç: 13 içeriğin 13'ü çıktı, gün hatası sıfır. Her karede güvenli alan, kontrast ve kaynak kendiliğinden denetlendi. Katalogdaki yazısız görseller yeniden kullanıldığı için yalnız 2 Wiro üretimi gerekti, toplam 0,202 $.
- **Ne yaramadı:** Fabrikanın ilk güvenli alan ölçümü harfleri değil yazı tipinin satır kutusunu ölçtü ve 12 yanlış alarm verdi; betiği düzeltip haftayı yeniden basmak gerekti. "Terim · Türkçesi" satırı üç işte görselde yok, önceki açıklama dosyalarına dayanıyor. 16 Ekim videosunun açıklaması hiç yok. 17 Ekim CTA'sının yarısı tam içerik listesi kitte olmadığı için basılamadı. `/icerik-fabrikasi` bu oturumda komut olarak yüklenmedi.
- **Model nerede zorlandı:** Işığın yönünde: 13 Ekim istemi güneşi sol üstten istedi, gölgeler sola düştü (DESIGN.md §6'dan sapma). Boş alanın oranında: 13 Ekim görselinde üstteki boşluk ancak yetti; yazı y 505'te bitiyor, tüpün tepesi y 534'te. Buna karşılık ambalajı referans görsel olmadan sözle tarif edince iki görselde de etiketleri doğru yazdı.

### Denetim tablosu

Her kare bir kez yazılı, bir kez yazısız basıldı; güvenli alan iki görüntü arasında değişen piksellerle ölçüldü (fabrikanın kendi ölçümünden bağımsız).

| # | Soru | Bulgu | Sonuç |
|---|---|---|---|
| 1 | Kaç içerik çıktı, hangi satır eksik? | Takvim 13 içerik istiyor (7 satır), 13 ana dosya çıktı. Eksik satır yok. Yanında 16 yardımcı dosya (kontrol, ızgara, ilk kare). | ✓ |
| 1 | Kısmi eksik | 17 Ekim CTA'sının ikinci cümlesi ("İçerik listesinin tamamı ürün sayfasında") kitte tam liste olmadığı için bilerek basılmadı; raporda eksik ve Selin sorusu olarak var. | ⚠ bilinçli |
| 2 | Dosya adındaki tarih ve hafta günü | Bütün dosyalar takvimdeki bir tarihle başlıyor; `index.html` ve `rapor.md`'deki gün ve saatler takvim.csv ile aynı; görsellerde gün adı geçmiyor. | ✓ |
| 3 | Kitte dayanağı olmayan cümle | 54 cümle parçası; kitte birebir olmayan 0. | ✓ |
| 3 | Yer tutucular | Görsellerde `[İDDİA · Selin'den]` yok; rapordaki "Selin'e sorulacaklar"da 2 madde (tam içerik listesi, kızarma sorusu). | ✓ |
| 4 | Story güvenli alanı (y 250–1580) | 15 Ekim yazı y 266–593, 19 Ekim y 266–684; x 61–1018; 19 Ekim çıkartma alanı boş. | ✓ |
| 4 | Kapak, orta 1080×1440 (y 240–1680) | Yazı y 327–819, x 60–959. | ✓ |
| 4 | Post kenar payı (60 px) | Yazı y 62–1288, x 60–1018. | ✓ |
| 4 | Kontrast | 12 kare, 61 yazı; en düşük 11,9:1; eşik altında yok. | ✓ |
| 5 | Bu koşunun Wiro harcaması | 2 üretim (4086023, 4086052), 0,202 $. Gün sonu genel toplam 2,012 $. | ✓ |

## Selin'e sorulacaklar

Kitte cevabı olmayan, ürün metni ya da iddia gerektiren sorular. Cevap gelene kadar yerlerinde `[İDDİA · Selin'den]` ya da boşluk durur (DESIGN.md §9).

| # | Soru | Nerede gerekiyor | Şu an ne yazıyor |
|---|---|---|---|
| 1 | "Cildim kolay kızarıyor, kullanabilir miyim?" sorusuna onaylı cevap ne? (Defne parfümlü ürünlerde kızarıyor; kitte ürünlerin parfüm içerip içermediği yazmıyor.) | Ürün sayfası, Sorular | `[İDDİA · Selin'den]` ve "Her ürünün öne çıkan içerikleri ve Türkçesi 'Etiketi okuyalım' bölümünde." |
| 2 | Üç ürünün tam içerik listesi ve her içeriğin Türkçe satırı. Kitte yalnız öne çıkan dokuz içerik var; takvim.csv 17 Ekim CTA'sı "İçerik listesinin tamamı ürün sayfasında" diyor. | Ürün sayfası, Etiketi okuyalım · 17 Ekim kaydırmalı post | Kitteki dokuz satır; tam liste yok. |
