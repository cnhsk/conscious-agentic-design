# Conscious — Lansman Haftası Çalışma Kuralları

## Kaynak
- Conscious kurgusal bir marka; internette arama yapma.
- Fiyat, tarih, hafta günü ve ürün bilgisi yalnız bu klasördeki kitten gelir.
- Hafta gününü `takvim.csv` dosyasındaki `gun` sütunundan al; kendin hesaplama.

## Wiro
- Bir modeli ilk kez kullanmadan önce `get_model_schema` ile şemasını ve fiyatını oku.
- Aynı anda tek Wiro üretimi.
- `run_model`'i bir iş için bir kez çağır. Süre dolarsa `wait_for_task` ile bekle; `run_model`'i yeniden çağırma.
- Tek üretimin fiyatı 1 doları geçecekse önce kullanıcıya sor.
- Wiro çıktı adresleri süreli: her çıktıyı hemen `cikti/ham/` altına indir, her yerde yerel kopyayı kullan.
- Her üretimden sonra `get_task_price` ile maliyeti al ve `cikti/wiro-harcama.csv` dosyasına bir satır ekle:
  `zaman,modul,model,gorev,usd,adres,dosya`

## Dosyalar
- Dosya adları ISO tarihle başlar. Örnek: `2026-10-14-post.png`.

## Tasarım sözleşmesi
- `DESIGN.md` her görselin, ürün sayfasının ve içerik fabrikasının sözleşmesidir.
- `frontend-design` becerisi (ya da başka bir tasarım becerisi) `DESIGN.md` ile çelişirse **`DESIGN.md` kazanır.** Beceri yalnız `DESIGN.md`'nin boş bıraktığı yerlerde yol gösterir.
- Bilinen çelişkiler, hepsinde `DESIGN.md` uygulanır:
  - Sıcak krem zemin ve yüksek kontrastlı serif başlık (Kâğıt `#FAF7F2` ve Fraunces) beceride "üretilmiş tasarım" işareti sayılıyor; Conscious'ta Yön A'nın kendisi.
  - İnce çizgiler, ızgara ve sözlük sayfası düzeni beceride "broadsheet" kalıbı sayılıyor; Conscious'ta Yön A'nın kendisi.
  - Beceri en fazla iki yazı tipi ailesi öneriyor; Conscious üç aile kullanır: Fraunces, IBM Plex Sans, IBM Plex Mono.
  - Beceri küçük veri etiketlerinde mono yazıyı, "A · B" biçimindeki orta noktalı satırları ve başlık üstü etiketleri kalıp sayıyor; Conscious'ta içerik adı ve ölçü Mono yazılır, "terim · Türkçesi" satırı orta noktayla kurulur.
  - Beceri tek bir hareket anı öneriyor; Conscious'ın hareket tarifi "satırlar sırayla gelir, ölçü çizgisi çizilir, numara değişir".
  - Beceri başlıkta tek kelimeyi başka renkle vurgulamayı kalıp sayıyor; Conscious'ta fiyat Mühür renginde vurgulanır (başlıkta değil, fiyat satırında).
- 01, 02, 03 numaraları becerinin şartına zaten uyar: numara yalnız gerçek bir sıra varsa kullanılır, Conscious'ın rutini de bir sıradır.

## Güvenlik
- Wiro anahtarını ya da başka bir şifreyi hiçbir dosyaya ve sohbete yazma.
