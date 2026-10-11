# Conscious · marka karakteri kararı

> Bugünkü her istemin çerçevesi bu dosya. Kaynak: senin cevapların, `marka-brief.md`, `gorsel-yon.md`.

| | Karar |
|---|---|
| **Arketip** | Bilge (Sage). Güveni açıklıkla kurar: anlamak ve anlatmak. |
| **Görsel yön** | A · Etiket. Düz, net gün ışığı; kısa, sert gölge. Izgara, sola yaslı yazı, bol boşluk. Ürün ızgaranın bir hücresinde. Kâğıt, mat ambalaj, baskı dokusu. |
| **Palet** | A · Etiket: Kâğıt `#FAF7F2` zemin · Yulaf `#EDE3D6` imza · Mürekkep `#1F1B17` yazı · Mühür `#2F4A3A` vurgu · Kurşun `#6B645B` ikincil yazı ve çizgi |
| **Yazı tipleri** | Başlık Fraunces (400, 600) · gövde IBM Plex Sans (400, 500) · içerik adları, ölçüler ve numaralar IBM Plex Mono (400) |
| **Gerekçe** | **Persona: Defne.** Onun işi, her hafta gördüğü yeni bir "şart" ürünün kendisine lazım olup olmadığına kendisi karar verebilmek. Açık etiket ve kısa, sabit bir rutin onu çekiyor. Bilge ona karar verecek bilgiyi veriyor, ürünü dayatmıyor. Bu, "yine bir marka bana bir şey satmaya çalışıyor" kaygısına da cevap veriyor.<br>**Rakiplerden ayrım** (kitten): butik ve trend markalardan net ayrılıyor. Markanın "etiketteki her içeriği Türkçe anlatıyoruz" sözüyle örtüşüyor. |
| **Risk** | Soğuk ve ders gibi durabilir. Eczane markalarının diline yaklaşabilir. Murat'a uzak gelebilir. |
| **Görsel üstü yazı** | HTML katmanı. Başlık, metin, fiyat ve CTA görselin üstüne HTML olarak konur, `node araclar/png.mjs <html> <png> <genişlik> <yükseklik>` ile PNG'ye çevrilir. Model yalnız yazısız görsel üretir; ambalajdaki numara ve "conscious" modelden gelir. Gerekçe: gerçek Fraunces ve IBM Plex, birebir hex renk, kesin 60 px kenar payı, ücretsiz düzeltme. (M2.3, 14 Ekim postu) |
| **Riske karşı** | **Soğukluğa karşı:** zemin hep sıcak Kâğıt ve Yulaf olacak, beyaz ve mavi kullanılmayacak. Hitap "sen", cümleler kısa, davet sakin olacak (ses-ton tablosu).<br>**Eczane diline karşı:** Latince terim hiçbir yerde tek başına durmayacak, hemen yanında gündelik Türkçesi olacak. Test, onay ve laboratuvar görüntüsü kullanılmayacak (Yön A "kaçın" listesi).<br>**Murat'a karşı:** büyük ürün numarası ve "önce 01, sonra 02, sonra 03" sırası her işte görünecek. Kullanım anlatılan işlerde (15 Ekim story, 16 Ekim video) el ve doku girecek, ama ışık ve ızgara Yön A'da kalacak. |

## Her istemde

- Üç katmanı kitten tarif et: ışık ve renk (palet hex'leriyle), yazı (yazı tipleri ve puntolar), söz (takvimin ana mesajı).
- Bilge'nin sözü için en az bir "terim · Türkçesi" satırı koy, yalnız `marka-brief.md`'deki içerik tablosundan al. M1'de bilge.png'de bu satır eksikti.
- Ambalaj `gorsel-yon.md`'deki tarife uysun: soldan sağa 01, 02, 03.
- Görsel istemine başlık, metin, fiyat ve CTA koyma; bunlar HTML katmanında, Mürekkep `#1F1B17` ve Yön A yazı tipleriyle eklenir. Yazı kenarlardan 60 px içeride.
