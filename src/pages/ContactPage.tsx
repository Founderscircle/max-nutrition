import { Send, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'
import { siteConfig, getTelegramLink } from '../config/site'

const contactMethods = [
  {
    icon: Send,
    title: 'Telegram',
    description: 'Основний канал для консультацій та замовлень',
    value: siteConfig.telegram.displayName,
    href: getTelegramLink('Вітаю! Хочу зв\'язатися з вами.'),
    primary: true,
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Для загальних запитів',
    value: siteConfig.distributor.email,
    href: `mailto:${siteConfig.distributor.email}`,
    primary: false,
  },
  {
    icon: MapPin,
    title: 'Локація',
    description: 'Працюємо по всій Україні',
    value: siteConfig.distributor.country,
    primary: false,
  },
  {
    icon: Clock,
    title: 'Час відповіді',
    description: 'Стараємось відповідати якнайшвидше',
    value: 'Зазвичай протягом 1–2 годин',
    primary: false,
  },
]

export function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10 sm:px-6">
      <div className="max-w-3xl mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Контакти</h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          Зв'яжіться з нами для отримання консультації щодо продукції Herbalife.
          Замовлення приймаються виключно через Telegram після особистої консультації.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {contactMethods.map((method) => (
          <div
            key={method.title}
            className={`rounded-2xl p-5 sm:p-6 border transition-shadow hover:shadow-md ${
              method.primary
                ? 'gradient-brand text-white border-transparent shadow-lg shadow-brand-600/20'
                : 'bg-white border-slate-200'
            }`}
            {...(method.primary ? { 'data-glow-zone': 'contrast' } : {})}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  method.primary ? 'bg-white/20' : 'bg-brand-50'
                }`}
              >
                <method.icon className={`h-6 w-6 ${method.primary ? 'text-white' : 'text-brand-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold ${method.primary ? 'text-white' : 'text-slate-900'}`}>
                  {method.title}
                </h3>
                <p className={`text-sm mt-0.5 ${method.primary ? 'text-brand-100' : 'text-slate-500'}`}>
                  {method.description}
                </p>
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`inline-block mt-2 font-medium break-all ${
                      method.primary
                        ? 'text-white underline underline-offset-2'
                        : 'text-brand-600 hover:text-brand-700'
                    }`}
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className={`mt-2 font-medium ${method.primary ? 'text-white' : 'text-slate-700'}`}>
                    {method.value}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 sm:mt-12 rounded-2xl bg-white border border-slate-200 p-5 sm:p-8">
        <div className="flex items-start sm:items-center gap-3 mb-4">
          <MessageSquare className="h-6 w-6 text-brand-600 shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Як оформити замовлення?</h2>
        </div>
        <ol className="space-y-4">
          {[
            'Напишіть нам у Telegram або зберіть кошик у каталозі та надішліть його консультанту.',
            'Консультант відповість на ваші запитання та допоможе підібрати продукцію.',
            'Після узгодження деталей (асортимент, кількість, доставка) оформлюється замовлення.',
            'Ви отримаєте підтвердження та інформацію про доставку.',
          ].map((step, i) => (
            <li key={step} className="flex gap-4 text-sm text-slate-600">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-xs">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
