# Yapay Zeka Entegrasyonu Nasıl Çalışıyor



## Genel Mantık

Uygulama şu şekilde çalışıyor:
1. Kullanıcı mesaj yazar
2. Mesaj API'ye gönderilir
3. AI yanıt üretir
4. Yanıt kullanıcıya gösterilir

## Dosya Yapısı

### 1. lib/ai-service.js
Bu dosya AI API'leri ile konuşuyor. İki sağlayıcı destekliyor:
- Groq (önerilen)
- Hugging Face (alternatif)

sendAIMessage fonksiyonu ana fonksiyon. Bu fonksiyon:
- Hangi API kullanılacağını kontrol eder (NEXT_PUBLIC_AI_PROVIDER)
- Mesajı ve konuşma geçmişini alır
- Uygun API'ye gönderir
- Yanıtı döndürür

### 2. app/api/chat/route.js
Next.js API route'u. Client tarafından çağrılıyor.

Bu route:
- Client'tan mesaj ve konuşma geçmişini alır
- lib/ai-service.js'deki sendAIMessage fonksiyonunu çağırır
- Yanıtı JSON olarak döndürür
- Hata durumunda uygun hata mesajı döndürür

### 3. context/app-context.js
React Context. Uygulamanın state'ini yönetiyor.

sendMessage fonksiyonu şunları yapıyor:
1. Kullanıcı mesajını hemen ekler (state'e)
2. Loading state'ini açır
3. /api/chat endpoint'ine POST request gönderir
4. AI yanıtını alır
5. AI yanıtını state'e ekler
6. Loading state'ini kapatır

## Veri Akışı

```
Kullanıcı Mesajı Yazıyor
    ↓
ChatInput bileşeni handleSubmit çağırıyor
    ↓
Context'teki sendMessage çağrılıyor
    ↓
Kullanıcı mesajı state'e ekleniyor
    ↓
Loading başlıyor
    ↓
fetch('/api/chat') çağrılıyor
    ↓
Next.js API route çalışıyor
    ↓
lib/ai-service.js sendAIMessage çağrılıyor
    ↓
Groq veya Hugging Face API'ye istek gönderiliyor
    ↓
AI yanıt üretiyor
    ↓
Yanıt API route'a dönüyor
    ↓
Yanıt Context'e ekleniyor
    ↓
Loading kapanıyor
    ↓
ChatHistory bileşeni yeni mesajı gösteriyor
```

## Önemli Detaylar

### Konuşma Geçmişi
AI'ya gönderilirken son 10 mesaj gönderiliyor. Bu sayede AI bağlamı hatırlıyor.

### Loading State
Mesaj gönderilirken isLoading true oluyor. Bu sayede:
- Gönder butonu disable oluyor
- Chat history'de loading animasyonu gösteriliyor
- Kullanıcı birden fazla mesaj gönderemiyor

### Hata Yönetimi
API hatası olursa:
- Hata mesajı state'e ekleniyor
- Kullanıcıya gösteriliyor
- Loading kapanıyor

### Environment Variables
.env.local dosyasında:
- NEXT_PUBLIC_AI_PROVIDER: Hangi API kullanılacak (groq veya huggingface)
- NEXT_PUBLIC_GROQ_API_KEY: Groq API key (eğer groq kullanılıyorsa)
- NEXT_PUBLIC_HUGGINGFACE_API_KEY: Hugging Face token (eğer huggingface kullanılıyorsa)

NEXT_PUBLIC_ öneki önemli çünkü bu değişkenler client tarafında kullanılabiliyor.

## Neden Bu Yapı?

### API Route Kullanma
API route kullanmamızın sebebi:
- API key'ler server tarafında kalıyor (güvenlik)
- CORS sorunları olmuyor
- Rate limiting eklenebilir
- Logging yapılabilir

### Context API Kullanma
Context API kullanmamızın sebebi:
- Tüm uygulama state'i tek yerde
- Her bileşen state'e erişebiliyor
- Prop drilling yok

### Service Layer (lib/ai-service.js)
Service layer kullanmamızın sebebi:
- API mantığı ayrı dosyada
- Farklı AI sağlayıcıları kolayca eklenebilir
- Test edilebilir
- Yeniden kullanılabilir

## Sonuç

Bu yapı sayesinde:
- AI entegrasyonu kolayca değiştirilebilir
- Farklı AI sağlayıcıları eklenebilir
- Kod organize ve okunabilir
- Güvenlik sağlanıyor (API key'ler server'da)

