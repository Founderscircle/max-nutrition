# Max Nutrition — Сайт-візитка Herbalife Україна

Інформаційний сайт-візитка незалежного дистриб'ютора Herbalife з каталогом продукції (без цін та реклами). Замовлення через Telegram.

## Відповідність правилам

- Каталог продукції без цін
- Без комерційної реклами
- Дисклеймер незалежного дистриб'ютора
- Медичний дисклеймер
- Замовлення лише через Telegram-консультацію
- Політика конфіденційності та умови використання

## Налаштування

Відредагуйте `src/config/site.ts`:

```ts
telegram: {
  username: 'ваш_telegram',  // без @
}
distributor: {
  names: ['Максим'],
  email: 'info@example.com',
  phone: '+380...',
}
```

## Запуск

```bash
npm install
npm run dev
```

Відкрийте http://localhost:5173

## Збірка

```bash
npm run build
npm run preview
```

## Структура

- `/` — головна з категоріями та популярними продуктами
- `/catalog` — повний каталог з пошуком і фільтрами
- `/catalog/:id` — сторінка продукту
- `/about` — про дистриб'юторів
- `/contact` — контакти та інструкція замовлення
- `/privacy` — політика конфіденційності
- `/terms` — умови використання

## Деплой на Vercel

1. Підключіть репозиторій на [vercel.com](https://vercel.com) (Framework: **Vite**)
2. Build: `npm run build`, Output: `dist`
3. Додайте **Environment Variables** (див. `.env.example`):
   - `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` — заявки з форми
   - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` — аналітика
   - `SITE_URL` — `https://max-nutrition.in.ua`

Детальна інструкція з Telegram: [docs/TELEGRAM-SETUP.md](docs/TELEGRAM-SETUP.md)
4. Додайте домен `max-nutrition.net.ua` у Vercel → DNS у imena.ua

### API (serverless)

| Endpoint | Опис |
|----------|------|
| `GET /api/stats` | Статистика сайту, трендові продукти |
| `POST /api/inquiry` | Заявка з форми → Telegram |
| `POST /api/track` | Трекінг переглядів |
| `GET /api/products` | Каталог (JSON) |
| `GET /sitemap.xml` | SEO-карта сайту |

Локально з API: `npm run dev:full` (потрібен Vercel CLI).

`vercel.json` налаштований для React Router (SPA) та API routes.
