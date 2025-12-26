# Chat Uygulaması

Bu proje Next.js ile yapılmış bir sohbet uygulaması. Kullanıcı, agent ve oturum yönetimi var. Gerçek bir yapay zeka API'si ile çalışıyor (Groq veya Hugging Face).

## Canlı Demo
[Projeyi Görüntüle](https://projem-app.vercel.app/)

## Özellikler

- Kullanıcı Yönetimi: Var olan kullanıcı seçme veya yeni kullanıcı oluşturma
- Agent Yönetimi: Her kullanıcıya agent atama veya yeni agent ekleme
- Oturum Yönetimi: Her agent için birden fazla oturum açabilme
- Gerçek AI: Groq API ile gerçek yapay zeka yanıtları
- Modern Tasarım: Dark mode desteği, gradient renkler, animasyonlar

## Teknik Detaylar

- Framework: Next.js 15 (React 19)
- Durum Yönetimi: React Context API
- Stil: Tailwind CSS
- AI API: Groq (veya Hugging Face)
- Deployment: Vercel

## Kurulum

1. Repoyu klonla
2. `npm install` çalıştır
3. `.env.local` dosyası oluştur ve Groq API key ekle (README-AI-SETUP.md'ye bak)
4. `npm run dev` ile çalıştır

## GitHub'a Yüklerken Dikkat

.env.local dosyası gitignore'da olduğu için GitHub'a yüklenmez. Bu güvenli. Ama yine de kontrol et:
- .env.local dosyası commit edilmemeli
- API key'ler asla paylaşılmamalı
- Public repo ise daha dikkatli ol


