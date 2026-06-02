# TachoTR — Next.js

Dijital takograf simülatörü, Next.js (App Router) uygulaması olarak paketlendi.

## Yerelde çalıştırma
```bash
npm install
npm run dev      # http://localhost:3000
```

## Production
```bash
npm run build
npm start
```

## Yapı
- `app/page.tsx` — uygulama markup'ını sunucu tarafında basar, `/app.js`'i yükler
- `app/globals.css` — tüm stiller
- `public/app.js` — uygulama mantığı (tüm JS)
