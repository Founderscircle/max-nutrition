/**
 * Допомога з налаштуванням Telegram-бота для заявок з сайту.
 *
 * 1. Створіть бота: @BotFather → /newbot
 * 2. Напишіть боту /start
 * 3. Запустіть:
 *    TELEGRAM_BOT_TOKEN=123:ABC node scripts/telegram-setup.mjs
 *
 * Опційно надіслати тестове повідомлення:
 *    TELEGRAM_BOT_TOKEN=... TELEGRAM_CHAT_ID=... node scripts/telegram-setup.mjs --test
 */
import { readFileSync, existsSync } from 'fs'

function loadEnvFile() {
  if (!existsSync('.env')) return false
  let loaded = 0
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (!value) continue
    if (!process.env[key]) {
      process.env[key] = value
      loaded++
    }
  }
  return loaded > 0
}

async function telegram(method, body) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) throw new Error('Потрібен TELEGRAM_BOT_TOKEN')

  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  if (!data.ok) {
    throw new Error(data.description ?? `Telegram API: ${method} failed`)
  }
  return data.result
}

function printChat(chat) {
  const label = [chat.first_name, chat.last_name].filter(Boolean).join(' ')
  const username = chat.username ? `@${chat.username}` : 'без username'
  console.log(`  chat_id: ${chat.id}`)
  console.log(`  ім'я: ${label || '—'}`)
  console.log(`  username: ${username}`)
  console.log(`  тип: ${chat.type}`)
}

async function main() {
  const envLoaded = loadEnvFile()

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  const testMode = process.argv.includes('--test')

  if (!token) {
    console.error(`
Потрібен токен бота.${existsSync('.env') ? ' Файл .env знайдено, але TELEGRAM_BOT_TOKEN порожній — збережіть файл (Cmd+S).' : ''}

Кроки:
  1. Відкрийте @BotFather у Telegram
  2. /newbot → назва та username для бота
  3. Скопіюйте токен у .env → TELEGRAM_BOT_TOKEN=...
  4. Збережіть .env (Cmd+S)
  5. Напишіть своєму боту /start
  6. Запустіть: npm run telegram:setup
`)
    process.exit(1)
  }

  if (envLoaded) console.log('Завантажено змінні з .env')

  console.log('Перевірка бота...')
  const me = await telegram('getMe', {})
  console.log(`✓ Бот: @${me.username} (${me.first_name})`)

  if (testMode) {
    if (!chatId) {
      console.error('Для --test потрібен TELEGRAM_CHAT_ID')
      process.exit(1)
    }

    await telegram('sendMessage', {
      chat_id: chatId,
      text: [
        '✅ Тест з Max Nutrition',
        '',
        'Якщо ви бачите це повідомлення — бот налаштовано правильно.',
        'Заявки з форм на сайті будуть приходити сюди.',
        '',
        'Кошик на сайті надсилається через посилання t.me/max_nutrition_herbalife',
      ].join('\n'),
    })
    console.log(`✓ Тестове повідомлення надіслано в chat_id ${chatId}`)
    return
  }

  console.log('\nОстанні повідомлення боту (для chat_id):')
  const updates = await telegram('getUpdates', { limit: 10 })

  if (!updates.length) {
    console.log(`
  (порожньо)

  Напишіть боту @${me.username} команду /start і запустіть скрипт знову.
`)
    return
  }

  const seen = new Set()
  for (const update of updates) {
    const chat = update.message?.chat ?? update.edited_message?.chat
    if (!chat || seen.has(chat.id)) continue
    seen.add(chat.id)
    console.log('')
    printChat(chat)
  }

  const lastChat = updates.at(-1)?.message?.chat ?? updates.at(-1)?.edited_message?.chat
  if (lastChat) {
    console.log(`
Додайте в Vercel → Settings → Environment Variables:

  TELEGRAM_BOT_TOKEN = (з вашого .env)
  TELEGRAM_CHAT_ID = ${lastChat.id}

Або натисніть «Import .env» і завантажте файл .env з проєкту.

Потім Redeploy і перевірте:

  npm run telegram:test
`)
  }
}

main().catch((error) => {
  console.error('Помилка:', error.message)
  process.exit(1)
})
