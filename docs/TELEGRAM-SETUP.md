# Налаштування Telegram для Max Nutrition

На сайті є **два канали** замовлень через Telegram:

| Що | Як працює | Що потрібно |
|----|-----------|-------------|
| **Кошик / кнопки Telegram** | Відкриває чат з `@max_nutrition_herbalife` з готовим текстом | Ваш особистий Telegram `@max_nutrition_herbalife` |
| **Форми заявок** (продукт, контакти) | Сайт надсилає повідомлення через бота на ваш chat_id | Бот + токен + chat_id у Vercel |

---

## Частина 1 — Особистий Telegram (кошик)

Це вже налаштовано в `src/config/site.ts`:

```ts
telegram: {
  username: 'max_nutrition_herbalife',
  displayName: '@max_nutrition_herbalife',
}
```

Переконайтесь, що:

1. У вас є акаунт **@max_nutrition_herbalife** (або змініть username у `site.ts`)
2. У налаштуваннях Telegram → **Privacy** → **Messages** дозволено писати вам усім (або з контактів)

Клієнт натискає «Надіслати в Telegram» → відкривається чат з вами з готовим списком продуктів.

---

## Частина 2 — Бот для заявок з форм

### Крок 1. Створити бота

1. Відкрийте [@BotFather](https://t.me/BotFather)
2. Надішліть `/newbot`
3. Назва: `Max Nutrition` (або як вам зручно)
4. Username: наприклад `max_nutrition_order_bot` (має закінчуватись на `bot`)
5. Скопіюйте **токен** (виглядає як `7123456789:AAH...`)

### Крок 2. Активувати бота

1. Знайдіть свого бота в Telegram
2. Натисніть **Start** або надішліть `/start`

### Крок 3. Дізнатись chat_id

У терміналі в папці проєкту:

```bash
TELEGRAM_BOT_TOKEN=ВАШ_ТОКЕН node scripts/telegram-setup.mjs
```

Скрипт покаже ваш `chat_id` — це число, наприклад `123456789`.

Або створіть файл `.env` (не комітити в git!):

```env
TELEGRAM_BOT_TOKEN=7123456789:AAH...
```

і запустіть:

```bash
node scripts/telegram-setup.mjs
```

### Крок 4. Тестове повідомлення

```bash
TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=... node scripts/telegram-setup.mjs --test
```

У Telegram має прийти тестове повідомлення.

### Крок 5. Vercel

1. [vercel.com](https://vercel.com) → проєкт **max-nutrition**
2. **Settings** → **Environment Variables**
3. Додайте для **Production** (і Preview, якщо потрібно):

| Змінна | Значення |
|--------|----------|
| `TELEGRAM_BOT_TOKEN` | токен від BotFather |
| `TELEGRAM_CHAT_ID` | ваш chat_id (число) |
| `UPSTASH_REDIS_REST_URL` | з Upstash (аналітика, необов'язково) |
| `UPSTASH_REDIS_REST_TOKEN` | з Upstash |
| `SITE_URL` | `https://max-nutrition.in.ua` |

4. **Deployments** → останній деплой → **Redeploy**

### Крок 6. Перевірка на сайті

1. Відкрийте сторінку продукту → форма «Залишити заявку»
2. Або `/contact` → форма контакту
3. Після відправки у Telegram-бот має прийти повідомлення

---

## Що приходить у Telegram

**З форми продукту:**
```
🛒 Запит щодо продукту
Ім'я: ...
Контакт: ...
Продукт: ...
Артикул: ...
```

**З кошика** (через кнопку, не через бота):
```
Вітаю! Мене цікавить такий список продукції:
1. Формула 1, смак: ... (4466) × 2
...
```

---

## Проблеми

| Симптом | Рішення |
|---------|---------|
| Форма: «Сервіс тимчасово недоступний» | Немає `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` у Vercel → додайте і redeploy |
| Бот не відповідає | Це нормально — бот лише **надсилає** вам заявки, не веде діалог |
| Кошик не відкриває Telegram | Перевірте username у `site.ts` |
| `getUpdates` порожній | Напишіть боту `/start` і запустіть скрипт знову |

---

## Корисні посилання

- [@BotFather](https://t.me/BotFather) — створення бота
- [@userinfobot](https://t.me/userinfobot) — дізнатись свій user id (альтернатива chat_id)
- Ваш консультаційний канал: [@max_nutrition_herbalife](https://t.me/max_nutrition_herbalife)
