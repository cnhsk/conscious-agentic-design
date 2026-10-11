# Görsel modelleri · Wiro şemaları

> 9 Ekim 2026'da Wiro `get_model_schema` ile okundu, üretim yapılmadı. "Bizim boyut" 1080×1350 (4:5 post) ve 1080×1920 (9:16 story).
> `recommend_model` görevi ("cilt bakım ürünü fotoğrafı, 4:5 ve 9:16, gerçekçi ışık, ambalajda okunur yazı") Türkçe ve İngilizce iki kez boş liste döndürdü, öneri vermedi.

| Model | 4:5 var mı | 9:16 var mı | Bizim boyutta tek görselin fiyatı | Referans görsel alıyor mu | Görsel içine yazı için ne söylüyor |
|---|---|---|---|---|---|
| google/nano-banana-2 | Evet, `aspectRatio: 4:5` | Evet, `aspectRatio: 9:16` | Şema: çıktı başına 0,045–0,151 $. M1'de 1K, 4:5 üç kez **0,067 $** ödendi. 1K çıktı 928×1152, 1080×1350'ye büyütmek gerekiyor. | Evet, en fazla 14: 10 nesne, 4 karakter | Şemada yazıyla ilgili bir şey yok. M1'de Türkçe karakterleri doğru yazdı, ama ambalajdaki küçük yazı telefonda okunmayacak kadar küçük kaldı. |
| black-forest-labs/flux-2-pro | Evet, oran seçimi yok ama genişlik ve yükseklik serbest (16'nın katı, en fazla 2048). 1088×1360 tam 4:5. | Evet, 1152×2048 tam 9:16. 1080×1920 tam tutturulamıyor, 1080 16'nın katı değil. | Şema: "0,03 $ / per pixel". Belgeye göre bu 1 MP başına 0,03 $ demek. 1088×1360 (1,48 MP) için tahminen **0,03–0,06 $**, 1152×2048 (2,36 MP) için **0,06–0,09 $**. Kademenin nasıl yuvarlandığı yazmıyor. | Evet, sayı belirtilmemiş | Yazıdan söz etmiyor, yalnız "fotogerçekçilik ve isteme bağlılık" diyor. |
| bytedance/seedream-v5-pro | **Hayır.** En yakını 3:4, kırpmak gerekir. | Evet, `aspectRatio: 9:16` | Şema: istek başına **0,045–0,09 $** (1k ya da 2k). Hangi kademenin hangi fiyat olduğu yazmıyor. | Evet, en fazla 10 | **"Güçlü yerleşim kontrolü ve çok dilli yazı oluşturma"** diyor. Dördü içinde yazıyı açıkça öne çıkaran tek model. Not: `watermark` alanı zorunlu, `false` seçilmeli. |
| openai/gpt-image-2-5-sunburst | **Hayır.** En yakını 3:4. | Evet, `ratio: 9:16` | Şema: istek başına **0,003–0,712 $**. Fiyat çözünürlüğe (1k, 2k, 4k), kaliteye (low…max) ve görsel sayısına göre değişiyor, kademe tablosu verilmemiş. | Evet, en fazla 16. Maskeyle bölgesel düzenleme ve şeffaf zemin de var. | Yazıdan söz etmiyor. 4K ve "referans ve maskeyle hassas düzenleme" diyor. |

**Önerilen karşılaştırma: nano-banana-2 ve seedream-v5-pro.** nano-banana-2 bilinen taban çizgimiz: 4:5 doğrudan var, 14 referans alıyor, maliyeti ölçülmüş. seedream-v5-pro ise brief'in en zor şartı olan "ambalajda okunur yazı" için çok dilli yazı oluşturmayı açıkça vaat eden tek model ve 9:16'yı doğrudan veriyor.

**Neden diğerleri değil:** seedream-v5-pro'nun 4:5 eksiği 3:4 üretip 1080×1350'ye kırpmakla ya da yazıyı tasarım katmanına almakla çözülür. flux-2-pro tam 4:5 verir ama yazı konusunda bir şey söylemiyor. gpt-image-2-5'in fiyatı 0,003 ile 0,712 $ arasında belirsiz, 4:5 de yok.
