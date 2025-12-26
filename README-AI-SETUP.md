# Yapay Zeka API Kurulumu

Bu proje Groq veya Hugging Face API kullanabiliyor. Groq önerilir çünkü daha hızlı ve stabil.

## Groq API Kurulumu (Önerilen)

Groq çok hızlı yanıt veriyor ve ücretsiz. Kurulumu da kolay.

1. https://console.groq.com/ adresine git ve kaydol
2. https://console.groq.com/keys sayfasına git
3. "Create API Key" butonuna tıkla
4. Bir isim ver (örn: "chat-app")
5. API key'i kopyala
6. Proje klasöründe .env.local dosyası oluştur (yoksa)
7. Şunu ekle:

```
NEXT_PUBLIC_AI_PROVIDER=groq
NEXT_PUBLIC_GROQ_API_KEY=buraya_kopyaladigin_api_key
```

8. Uygulamayı yeniden başlat (npm run dev)

## Hugging Face (Alternatif)

Hugging Face de kullanılabilir ama endpoint sorunları olabiliyor. Yine de kurmak istersen:

1. https://huggingface.co/ adresine git ve kaydol
2. Settings > Access Tokens sayfasına git
3. "New token" butonuna tıkla
4. Token name ver, "Read" seç, onay kutularını işaretle
5. Token'ı kopyala
6. .env.local dosyasına ekle:

```
NEXT_PUBLIC_AI_PROVIDER=huggingface
NEXT_PUBLIC_HUGGINGFACE_API_KEY=buraya_token
```

## GitHub'a Yüklerken

.env.local dosyası .gitignore'da olduğu için GitHub'a yüklenmez. Bu güvenli. Ama yine de dikkat et:
- .env.local dosyasını asla commit etme
- API key'lerini kimseyle paylaşma
- Public repo yapacaksan daha dikkatli ol

## .env.local Dosyası Örneği

Proje klasöründe .env.local dosyası oluştur ve şunu ekle:

```
NEXT_PUBLIC_AI_PROVIDER=groq
NEXT_PUBLIC_GROQ_API_KEY=buraya_api_key_yapistir
```

## Kullanım

1. .env.local dosyasını oluştur ve API key ekle
2. npm run dev ile uygulamayı başlat
3. Bir kullanıcı, agent ve oturum seç
4. Mesaj gönder - AI yanıt verecek

## Sorun Giderme

API anahtarı bulunamadı hatası alırsan:
- .env.local dosyasının proje klasöründe olduğundan emin ol
- Değişken isimlerinin doğru olduğunu kontrol et
- Uygulamayı yeniden başlat (Ctrl+C sonra npm run dev)

Yavaş yanıtlar alıyorsan:
- Groq kullan, çok daha hızlı
- Model değiştirmeyi dene

## Mantık

Detaylı mantığı anlamak için AI-ENTEGRASYON-MANTIGI.md dosyasına bak.
