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
  if (!existsSync('.env')) return
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
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
  loadEnvFile()

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  const testMode = process.argv.includes('--test')

  if (!token) {
    console.error(`
Потрібен токен бота.

Кроки:
  1. Відкрийте @BotFather у Telegram
  2. /newbot → назва та username для бота
  3. Скопіюйте токен
  4. Напишіть своєму боту /start
  5. Запустіть:

     TELEGRAM_BOT_TOKEN=ВАШ_ТОКЕН node scripts/telegram-setup.mjs

Або додайте TELEGRAM_BOT_TOKEN у файл .env у корені проєкту.
`)
    process.exit(1)
  }

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

  TELEGRAM_BOT_TOKEN=${token}
  TELEGRAM_CHAT_ID=${lastChat.id}

Потім Redeploy і перевірте:

  TELEGRAM_BOT_TOKEN=${token} TELEGRAM_CHAT_ID=${lastChat.id} node scripts/telegram-setup.mjs --test
`)
  }
}

main().catch((error) => {
  console.error('Помилка:', error.message)
  process.exit(1)
})
