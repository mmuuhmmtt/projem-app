# GitHub'a Yükleme Rehberi

Bu dosya GitHub'a yüklemeden önce yapılması gerekenleri açıklıyor.

## Güvenlik Kontrolü

.env.local dosyası .gitignore'da olduğu için GitHub'a yüklenmez. Ama yine de kontrol et:

1. git status komutu çalıştır
2. .env.local dosyasının listede görünmemesi gerekir
3. Eğer görünüyorsa, .gitignore dosyasını kontrol et

## Commit ve Push İşlemleri

Normal şekilde commit ve push yapabilirsin:

```bash
git add .
git commit -m "AI entegrasyonu eklendi, tasarım modernleştirildi"
git push origin main
```

## GitHub'da Olması Gereken Dosyalar

- Tüm kod dosyaları (.js, .jsx, .json, vb.)
- README.md
- README-AI-SETUP.md
- AI-ENTEGRASYON-MANTIGI.md
- .gitignore
- package.json

## GitHub'da OLMAMASI Gereken Dosyalar

- .env.local (API key'ler içeriyor - GİZLİ!)
- node_modules/
- .next/
- Tüm build dosyaları

## Eğer Başka Biri Bu Projeyi İndirirse

1. Repoyu clone eder
2. npm install çalıştırır
3. .env.local dosyasını kendi oluşturur
4. Kendi API key'ini ekler
5. npm run dev ile çalıştırır

## Public Repo Yapacaksan

Public repo yaparsan dikkat et:
- .env.local kesinlikle yüklenmemeli
- README'de API key'in nasıl alınacağı açıklanmalı
- Örnek .env.local dosyası eklenebilir (.env.example gibi) ama gerçek key'ler olmadan

## Özet

.env.local dosyası .gitignore'da olduğu için GitHub'a yüklenmez. Bu güvenli. Yine de git status ile kontrol etmekte fayda var.

