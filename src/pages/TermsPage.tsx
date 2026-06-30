import { siteConfig } from '../config/site'

export function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Умови використання</h1>
      <p className="mt-2 text-sm text-slate-500">Останнє оновлення: {new Date().toLocaleDateString('uk-UA')}</p>

      <div className="mt-8 space-y-6 text-slate-600 leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">1. Призначення сайту</h2>
          <p>
            {siteConfig.name} — це інформаційний сайт-візитка незалежного дистриб'ютора Herbalife Nutrition.
            Сайт призначений для ознайомлення з асортиментом продукції та отримання консультацій.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">2. Обмеження</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>На сайті не розміщуються ціни на продукцію</li>
            <li>Сайт не містить комерційної реклами</li>
            <li>Замовлення оформлюються виключно через особисту консультацію в Telegram</li>
            <li>Сайт не є офіційним ресурсом компанії Herbalife International</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">3. Медичний дисклеймер</h2>
          <p>
            Продукція Herbalife Nutrition є харчовими добавками та продуктами харчування.
            Вона не призначена для діагностики, лікування, профілактики або запобігання будь-яким захворюванням.
            Перед вживанням проконсультуйтесь з лікарем або дієтологом.
            Результати використання продукції є індивідуальними.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">4. Інтелектуальна власність</h2>
          <p>
            Торгові марки Herbalife®, Formula 1 та інші належать Herbalife International of America, Inc.
            Контент сайту (тексти, дизайн) належить {siteConfig.name}, якщо не зазначено інше.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">5. Відповідальність</h2>
          <p>
            Ми докладаємо зусиль для забезпечення актуальності інформації на сайті,
            однак не гарантуємо її повноту та безпомилковість.
            Використання інформації з сайту — на власний розсуд користувача.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">6. Зміни умов</h2>
          <p>
            Ми залишаємо за собою право оновлювати ці умови. Актуальна версія завжди доступна на цій сторінці.
          </p>
        </section>
      </div>
    </div>
  )
}
