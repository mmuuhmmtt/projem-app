# Chat Uygulaması

Next.js ile geliştirilmiş modern bir sohbet uygulaması. Kullanıcı, agent ve oturum yönetimi ile gerçek YAPAY ZEKA API entegrasyonu içerir.

## Özellikler

- **Kullanıcı Yönetimi**: Var olan kullanıcı seçme veya yeni kullanıcı oluşturma
- **Agent Yönetimi**: Her kullanıcıya özel agent atama ve yönetimi
- **Oturum Yönetimi**: Her agent için birden fazla oturum oluşturma
- **Gerçek AI Entegrasyonu**: Groq veya Hugging Face API ile yapay zeka yanıtları
- **Modern Tasarım**: Dark mode desteği, gradient renkler, smooth animasyonlar
- **Responsive**: Mobil ve masaüstü cihazlarda çalışır

## Teknoloji Stack

- **Framework**: Next.js 15 (React 19)
- **Stil**: Tailwind CSS 4
- **State Management**: React Context API
- **AI API**: Groq (önerilen) / Hugging Face
- **Tema**: next-themes (dark/light mode)

## Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn

### Adımlar

1. Projeyi klonlayın:
```bash
git clone https://github.com/mmuuhmmtt/projem-app.git
cd projem-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment değişkenlerini ayarlayın:
Proje klasöründe `.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_AI_PROVIDER=groq
NEXT_PUBLIC_GROQ_API_KEY=your_api_key_here
```

4. Uygulamayı başlatın:
```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## AI API Kurulumu

### Groq API (Önerilen)

Groq hızlı yanıt süresi ve stabil çalışma sunar. Ücretsiz tier mevcuttur.

1. [Groq Console](https://console.groq.com/) adresine gidin ve kaydolun
2. [API Keys](https://console.groq.com/keys) sayfasından yeni bir API key oluşturun
3. API key'i `.env.local` dosyasına ekleyin

```env
NEXT_PUBLIC_AI_PROVIDER=groq
NEXT_PUBLIC_GROQ_API_KEY=your_api_key_here
```



```env
NEXT_PUBLIC_AI_PROVIDER=huggingface
NEXT_PUBLIC_HUGGINGFACE_API_KEY=your_token_here
```

## Kullanım

1. Sol menüden bir kullanıcı seçin veya yeni kullanıcı oluşturun
2. Seçili kullanıcı için bir agent seçin veya yeni agent ekleyin
3. "Yeni Oturum Başlat" butonuna tıklayın
4. Mesaj yazın ve gönderin - AI gerçek zamanlı yanıt verecektir





## AI Entegrasyonu Nasıl Çalışır

Uygulama şu şekilde çalışır:

1. **Kullanıcı mesaj yazar** → ChatInput bileşeni
2. **Mesaj Context'e gönderilir** → sendMessage fonksiyonu
3. **API route'a istek gönderilir** → `/api/chat` endpoint'i
4. **AI service çağrılır** → Groq veya Hugging Face API'ye istek
5. **AI yanıt üretir** → API'den gelen yanıt
6. **Yanıt Context'e eklenir** → State güncellenir
7. **Ekranda gösterilir** → ChatHistory bileşeni



## Güvenlik

- `.env.local` dosyası `.gitignore`'da olduğu için GitHub'a yüklenmez
- API key'ler asla commit edilmemelidir
- Public repo kullanıyorsanız ekstra dikkatli olun
- Environment değişkenleri server tarafında kullanılır





## Lisans

Bu proje açık kaynaklıdır. İstediğiniz gibi kullanabilirsiniz.



## İletişim

Sorularınız için muhammedcosgun12@gmail.com adresine mail atabilirsiniz.
