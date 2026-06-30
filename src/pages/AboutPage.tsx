import { Users, Target, Heart, Award } from 'lucide-react'
import { siteConfig } from '../config/site'

const values = [
  {
    icon: Heart,
    title: 'Турбота про клієнтів',
    text: 'Я допомагаю кожному клієнту підібрати продукцію, яка відповідає його цілям та способу життя.',
  },
  {
    icon: Target,
    title: 'Професійний підхід',
    text: 'Надаємо детальні консультації щодо продукції, способу застосування та програм харчування.',
  },
  {
    icon: Award,
    title: 'Якість Herbalife',
    text: 'Працюємо виключно з оригінальною продукцією Herbalife Nutrition через офіційні канали дистрибуції.',
  },
]

export function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Про нас</h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Я — {siteConfig.distributor.names[0]}, незалежний дистриб'ютор
          Herbalife Nutrition в {siteConfig.distributor.city}, {siteConfig.distributor.country}.
        </p>
      </div>

      <div className="mt-10 sm:mt-12 grid gap-8 lg:grid-cols-2 items-center">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-slate-100 max-h-[280px] sm:max-h-none">
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop"
            alt="Здоровий спосіб життя"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            Моя місія — допомагати людям досягати своїх цілей у сфері здорового харчування
            та активного способу життя за допомогою якісної продукції Herbalife Nutrition.
          </p>
          <p>
            Я працюю з клієнтами по всій Україні, надаючи персональні консультації
            та супровід на кожному етапі. Замовлення оформлюються через Telegram
            після узгодження всіх деталей.
          </p>
          <p>
            Цей сайт є інформаційним ресурсом — каталогом продукції без цін та комерційної реклами,
            що відповідає правилам компанії Herbalife для українського ринку.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
          <Users className="h-5 w-5 text-brand-600 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Мої цінності</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 mb-4">
                <v.icon className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 sm:mt-16 rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-8">
        <h2 className="font-semibold text-slate-900 mb-4">Юридична інформація</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• {siteConfig.legal.companyNote}</li>
          <li>• {siteConfig.legal.noPricesNote}</li>
          <li>• {siteConfig.legal.orderNote}</li>
          <li>• Ми не робимо медичних заяв та не обіцяємо конкретних результатів.</li>
          <li>• Торгова марка Herbalife належить Herbalife International of America, Inc.</li>
        </ul>
      </div>
    </div>
  )
}
