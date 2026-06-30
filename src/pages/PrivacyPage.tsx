import { siteConfig } from '../config/site'

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Політика конфіденційності</h1>
      <p className="mt-2 text-sm text-slate-500">Останнє оновлення: {new Date().toLocaleDateString('uk-UA')}</p>

      <div className="mt-8 space-y-6 text-slate-600 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">1. Загальні положення</h2>
          <p>
            Ця політика конфіденційності описує, як {siteConfig.name} (незалежний дистриб'ютор Herbalife)
            збирає, використовує та захищає персональні дані відвідувачів сайту.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">2. Які дані ми збираємо</h2>
          <p>Ми можемо збирати наступну інформацію:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Дані, які ви надаєте при зверненні через Telegram (ім'я, контактні дані, запити)</li>
            <li>Технічні дані: IP-адреса, тип браузера, сторінки перегляду (через аналітику)</li>
            <li>Дані cookies для покращення роботи сайту</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">3. Мета збору даних</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Надання консультацій щодо продукції Herbalife</li>
            <li>Обробка запитів та оформлення замовлень</li>
            <li>Покращення роботи сайту та користувацького досвіду</li>
            <li>Дотримання законодавства України</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">4. Передача даних третім особам</h2>
          <p>
            Ми не продаємо та не передаємо ваші персональні дані третім особам,
            за винятком випадків, передбачених законодавством, або для виконання замовлення
            (наприклад, служби доставки).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">5. Ваші права</h2>
          <p>
            Відповідно до Закону України «Про захист персональних даних», ви маєте право
            на доступ, виправлення, видалення своїх даних. Для цього зверніться до нас через Telegram
            або email: {siteConfig.distributor.email}.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">6. Контакти</h2>
          <p>
            З питань щодо обробки персональних даних звертайтесь: {siteConfig.distributor.email},
            Telegram: {siteConfig.telegram.displayName}.
          </p>
        </section>
      </div>
    </div>
  )
}
