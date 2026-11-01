# 0001. Оновлення стеку до актуального Next.js, React 19 і Tailwind 4

**Date**: 2026-11-01
**Status**: In Progress

## Summary

Сайт переходить з Next.js 13.5 і React 18 на останню стабільну версію Next.js з React 19, а потім окремим кроком на Tailwind CSS 4. Старі версії мають відомі вразливості і вже без підтримки, а всі наступні фічі (кейси, SEO, дві мови, блог) краще писати одразу на новому стеку. Оновлення йде в окремій гілці з перевіркою на Vercel Preview (тимчасова копія сайту для перевірки), сайт має виглядати і працювати як раніше. Поведінку форми контакту не змінюємо, її доробка лишається у фічі 8.

Context, Options considered і Rationale: [rationale.md](./rationale.md). Кроки перевірки: [verify.md](./verify.md).

## Requirements

**User stories**:
- Як власник сайту, я хочу, щоб сайт працював на підтримуваному стеку без відомих вразливостей, щоб не ризикувати продом і не переписувати нові фічі.
- Як відвідувач, я не помічаю оновлення: сторінка виглядає і працює як раніше.

**Acceptance criteria**:
- **AC-1**: `next` і `eslint-config-next` закріплені на одній і тій самій точній версії (без `^`), це остання стабільна мажорна версія (перевірено `npm view next version` на старті), `react` і `react-dom` на останній виправленій 19.x, `@types/react` і `@types/react-dom` на 19.
- **AC-2**: `npm run build` проходить без помилок. `npm run lint` запускає ESLint 9 з flat config (`eslint.config.mjs`, формат налаштувань ESLint 9) і проходить без помилок (попередження допустимі).
- **AC-3**: Знімки кожної секції (Header, Hero, About, Projects, Contact, Footer) на ширині 375px і 1280px після оновлення збігаються зі знімками до оновлення: макет, відступи, розміри і текст ті самі. Допустима відмінність лише в кольорах: насиченість палітри Tailwind 4 (oklch, ширша гама кольорів) і середина градієнтів (v4 змішує градієнти в oklab).
- **AC-4**: Взаємодії працюють як раніше: анімація друку і поява в Hero, перемикання вкладок About, фільтр проєктів і поява карток при прокрутці, оверлей картки з посиланнями при наведенні на десктопі і при тапі на телефоні, відкриття і закриття мобільного меню, якорі меню, кнопка Download CV віддає `cv.pdf`.
- **AC-5**: На Vercel Preview форма контакту надсилає справжній лист, він приходить на `webmagic.crafter@gmail.com`, а форма показує «Email sent successfully!». Поведінка маршруту для відвідувача не змінюється (той самий статус 200 і той самий JSON при успіху). Єдина прийнята зміна: при помилці `{ error }` тепер містить реальний текст помилки Resend, а не порожній об'єкт.
- **AC-6**: Tailwind на v4, налаштування в CSS (`@theme` у `app/globals.css`), `tailwind.config.ts` видалено, класи `primary-*` і `secondary-*` працюють.
- **AC-7**: `framer-motion` замінено на `motion`, імпорти з `motion/react`, `framer-motion` у `package.json` немає.
- **AC-8**: `npm audit --omit=dev` показує 0 high і 0 critical. Якщо вразливість у транзитивній залежності, спершу пробуємо `overrides` у `package.json`. Якщо виправленої версії ще немає, записуємо її в Follow-up і вирішуємо разом з вами, а не блокуємо реліз.
- **AC-9**: `package.json` має `"engines": { "node": ">=20.9.0" }`, збірки Vercel Preview і Production проходять.
- **AC-10**: `npm run dev` стартує без помилок у терміналі і в консолі браузера (крім тих, що були і до оновлення).

## Decision

**Chosen option**: Option 2: остання стабільна версія одним кроком через codemod, Tailwind 4 окремим зрізом.

Оновлюємо Next.js до останньої стабільної мажорної версії з React 19, переводимо лінт на ESLint 9 flat config, `framer-motion` на `motion`, `resend` на останню версію з мінімальною адаптацією, а потім окремим зрізом Tailwind на v4 з палітрою v4. Усе в гілці з перевіркою на Vercel Preview перед злиттям.

**Implementation skills**: `vercel-react-best-practices` (`vercel-labs/agent-skills`, `.claude/skills/vercel-react-best-practices/`) · `tailwind-design-system` (`wshobson/agents`, `.claude/skills/tailwind-design-system/`) · `resend` (`resend/resend-skills`, `.claude/skills/resend/`)

**Рішення, ухвалені за вас** (рекомендація, з запасним варіантом):
- **`sharp` прибрати із залежностей.** Новий Next ставить його сам для `next/image`. Запасний варіант: лишити, якщо збірка на Vercel попросить.
- **`tsconfig.json`: `target` з `es5` на `ES2017`** (як у шаблоні Next). Запасний варіант: лишити, як налаштує codemod.
- **Імпорт SVG у `EmailSection` перевести на `@/public/assets/icons/...`**, бо цього вимагає правило імпортів з AGENTS.md і так менше ризику з Turbopack. Запасний варіант: перенести іконки в `next/image` зі `src="/assets/icons/..."`.
- **Лінт: `next/core-web-vitals` плюс `next/typescript`.** Спершу запустити codemod (він може сам перевести `next lint` на ESLint CLI) і переглянути, що він зробив, а вже потім дописувати `eslint.config.mjs`. Форму конфігу звірити з установленою версією `eslint-config-next`, а не писати з пам'яті. Ігнорувати `.next/**`, `out/**`, `.claude/**`, `docs/**`, `next-env.d.ts`. Помилки, які з'являться, виправити мінімально (наприклад `any` у `handleTagChange`, невикористаний `Url` у `ProjectCard`, `String` на `string` у `ProjectTag`). Решту з фічі 6 (опечатки, `isPending`, ARIA) не чіпати, якщо лінт не дає на них помилок. Запасний варіант: лише `core-web-vitals`, якщо `next/typescript` дасть забагато помилок, а `next/typescript` тоді перенести у фічу 6.
- **Turbopack лишаємо за замовчуванням** для `dev` і `build`. Власного webpack конфігу немає, тож нічого не мігрує. Запасний варіант: `next build --webpack`, якщо Turbopack дасть помилку збірки, яку не вдається швидко виправити (записати в Follow-up).
- **Перехід на Tailwind 4 робить `npx @tailwindcss/upgrade`**, далі ручна перевірка. Він сам перейменує `bg-opacity-*`, `placeholder-[…]`, `rounded`, `bg-gradient-to-*`. Невикористані `gradient-radial` і `gradient-conic` з `extend` не переносимо.
- **Hover на сенсорних екранах.** Tailwind 4 застосовує `hover:` лише на пристроях з мишею, і тоді на телефоні оверлей картки (`hidden group-hover:flex` у `ProjectCard`) з посиланнями не відкриється тапом. Додати в `globals.css` `@custom-variant hover (&:hover);`, щоб повернути поведінку v3. Запасний варіант: окремий стан для тапу, але це вже фіча 6.
- **Градієнти.** Лишити змішування oklab за замовчуванням у v4. Запасний варіант, якщо різниця в Header, Hero чи NavLink помітна: `bg-linear-to-r/srgb`.
- **`resend` і `@react-email/render`.** Якщо остання версія `resend` вимагає `@react-email/render` для опції `react`, поставити його. Запасний варіант: передати `html`, згенерований `render` з того ж пакета.
- **Інші залежності** (`@heroicons/react`, `react-type-animation`, `typescript`, `@types/node`, `postcss`) оновити до останніх сумісних версій. `autoprefixer` прибрати, бо Tailwind 4 робить це сам.

## Feature design

**Data model sketch**: немає (бази даних немає, схема не змінюється).

**API surface**:
| Endpoint | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `/api/send` | POST | `email`, `subject`, `message` (JSON) | без змін: 200 і дані Resend при успіху | немає | без змін: 200 з `{ error }` при помилці (виправлення у фічі 8) |

Мінімальна адаптація маршруту: `const { data, error } = await resend.emails.send(...)`. Якщо `error`, повернути `NextResponse.json({ error })`, інакше `NextResponse.json(data)`. Обгортку `try/catch` лишити для мережевих винятків. Клієнт `new Resend(...)` створювати всередині обробника `POST`, а не на рівні модуля, бо новий SDK може кинути помилку при відсутньому ключі ще під час збірки. Виклик `EmailTemplate({...})` лишити як є. Адреси, `console.log` і статуси не змінювати.

**Value sourcing**:
| Action | Value | Source |
|---|---|---|
| Оновлення пакетів | цільова версія `next`, `eslint-config-next` | `npm view next version` на старті зрізу 1 |
| Оновлення пакетів | версія React | остання 19.x з `npm view react version`, сумісна з `peerDependencies` обраного `next` |
| Збірка на Vercel | версія Node | `engines.node` у `package.json`, Vercel підхоплює сам |
| Стилі | кольори `primary`, `secondary` | `@theme` у `app/globals.css`, що посилається на `--color-indigo-*` і `--color-purple-*` Tailwind 4 |
| Відправка листа | `RESEND_API_KEY` | змінні оточення Vercel (Preview і Production), без змін |
| Перевірка AC-3 | знімки «до» | локальна продакшн збірка `main` (`npm run build && npm start`) після коміту поточної зміни в `Footer.tsx`; уся сторінка на 375px і 1280px після завершення анімацій; зберігати поза репозиторієм |
| Перевірка AC-5 | лист у скриньці | перевіряєте ви, бо потрібна справжня скринька |

**Key invariants**:
- Жоден зріз не зливається в `main`, поки не пройшли `npm run build` і `npm run lint`.
- Файли в `public/` (особливо `cv.pdf`) не перейменовуються і не переносяться.
- Тексти, розмітка і порядок секцій не змінюються (виправлення тексту належать фічі 6).

**Security model**: публічний сайт без авторизації. Мета щодо безпеки: AC-8. `RESEND_API_KEY` лишається лише на сервері.

**Configuration required**: нових змінних оточення немає. Переконатися, що `RESEND_API_KEY` заданий і для середовища Preview у Vercel, інакше AC-5 не перевірити.

**Critical test scenarios**:
- Happy path: на Preview пройти всю сторінку на 375px і 1280px, порівняти зі знімками, перевіряє **AC-3**, **AC-4**.
- Відправка форми на Preview, лист приходить, перевіряє **AC-5**.
- Помилка Resend (тимчасово невірний ключ локально): форма поводиться як до оновлення (повідомлення про успіх не з'являється), перевіряє **AC-5**.
- `npm run build`, `npm run lint`, `npm audit --omit=dev`, перевіряє **AC-1**, **AC-2**, **AC-8**.

## Build plan

Порядок Tracer Bullet: перший зріз проводить усю нитку (сторінка, API, лист, деплой) через новий фреймворк, наступні нарощують. Кожен зріз закінчується зеленою збіркою і деплоєм на Preview. Кожна нумерована задача йде окремим комітом, щоб поломку було легко знайти. Для перевірки береться Preview адреса останнього пушу.

**Зріз 0. Базова лінія**
1. [x] Закомітити поточну зміну в `Footer.tsx` у `main`. Створити гілку `chore/stack-upgrade`. Зняти знімки «до» з локальної продакшн збірки `main` кожної секції на 375px і 1280px, записати поточний вивід `npm audit --omit=dev`. Перевірити, що `RESEND_API_KEY` є в Preview середовищі Vercel, satisfies **AC-3**, **AC-5**

**Зріз 1. Фреймворк, наскрізна нитка**
2. [x] Перевірити цільову версію (`npm view next version`), запустити `npx @next/codemod@latest upgrade latest`. Прийняти автоматичні правки `tsconfig.json` (`jsx`, `include`). Переконатися, що `react`, `react-dom`, `@types/react`, `@types/react-dom` на 19, а `next` і `eslint-config-next` на одній точній версії. Одразу `npm run build`, перш ніж чіпати решту, satisfies **AC-1**
3. [x] Додати `engines.node` `>=20.9.0`, прибрати `sharp`, `tsconfig` `target` на `ES2017`, satisfies **AC-9**, **AC-1**
4. [x] Імпорти SVG в `EmailSection` на `@/public/assets/icons/...`, satisfies **AC-10**, **AC-3**
5. [x] Оновити `resend` до останньої версії, адаптувати `app/api/send/route.ts` під `{ data, error }` без зміни поведінки, клієнт створювати в обробнику (за потреби `@react-email/render`), satisfies **AC-5**
6. [x] Перевести лінт: переглянути, що зробив codemod, далі `eslint` 9, `eslint.config.mjs` з `next/core-web-vitals`, `next/typescript` і списком ігнору, скрипт `"lint": "eslint ."`, видалити `.eslintrc.json`. Мінімально виправити помилки лінту (`ProjectsSection`, `ProjectCard`, `ProjectTag`), satisfies **AC-2**
7. [ ] `npm run build`, `npm run dev`, деплой на Preview, відправити форму (локально пройдено; Preview і лист чекають на вас), satisfies **AC-2**, **AC-5**, **AC-9**, **AC-10**

**Зріз 2. Анімації**
8. [x] Замінити `framer-motion` на `motion`, імпорти в `HeroSection`, `ProjectsSection` і `TabButton` на `motion/react`. Перевірити анімації Hero і появу карток, satisfies **AC-7**, **AC-4**

**Зріз 3. Tailwind 4**
9. [x] На чистому робочому дереві запустити `npx @tailwindcss/upgrade` і переглянути його diff. Перевірити результат: `tailwindcss` 4 і `@tailwindcss/postcss` у devDependencies, `@import "tailwindcss"` у `globals.css`, `postcss.config` з плагіном `@tailwindcss/postcss`, `autoprefixer` прибрано, `tailwind.config.ts` видалено, satisfies **AC-6**
10. [x] Задати `primary` і `secondary` в `@theme` як `--color-primary-50: var(--color-indigo-50)` і так далі (11 кроків, 50 до 950), так само для `secondary` з `purple`. Додати `@custom-variant hover (&:hover);`. Вручну перевірити класи, які інструмент міг пропустити: `bg-opacity-*` у `ProjectCard` стає `bg-[#181818]/0` і `group-hover:bg-[#181818]/80`, `placeholder-[#9CA2A9]` у формі стає `placeholder:text-[#9CA2A9]`, `rounded` стає `rounded-sm`, `bg-gradient-to-*` стає `bg-linear-to-*`, satisfies **AC-6**, **AC-3**, **AC-4**
11. [ ] Деплой на Preview, порівняти знімки з базовими (локальна продакшн збірка збігається; Preview чекає на вас), satisfies **AC-3**

**Зріз 4. Решта і злиття**
12. [x] Оновити `@heroicons/react`, `react-type-animation`, `typescript`, `@types/node`, `postcss`. Запустити `npm audit --omit=dev` і закрити high і critical, satisfies **AC-1**, **AC-8**
13. [ ] Фінальна перевірка на Preview: усі взаємодії, форма, знімки, консоль (локально пройдено; Preview і лист чекають на вас), satisfies **AC-3**, **AC-4**, **AC-5**, **AC-10**
14. [ ] Злити в `main`, перевірити продакшн деплой, satisfies **AC-9**

## Migration plan

**Strategy**: усе в одній гілці, злиття одним разом після перевірки на Preview.
**Phases**:
1. Зрізи 0 до 4 у гілці `chore/stack-upgrade`, кожен з деплоєм на Preview.
2. Злиття в `main` і продакшн деплой.
**Rollback**: у Vercel повернути попередній продакшн деплой (Instant Rollback), потім `git revert` коміту злиття.
**Risks**: Turbopack не збирає якийсь імпорт (запасний варіант: `--webpack`); `motion` або `react-type-animation` поводяться інакше з React 19 (видно в AC-4); зсув кольорів v4 помітніший, ніж очікувалось (тоді перенести hex v3 у `@theme`, це лише CSS).

## Consequences

**Positive**:
- Підтримуваний стек без відомих high і critical вразливостей.
- Нові фічі пишуться одразу на сучасних API Next і Tailwind 4, і скіл `tailwind-design-system` підходить напряму.
- Швидші `dev` і `build` завдяки Turbopack.

**Negative / tradeoffs**:
- Кольори градієнтів трохи зміняться (палітра oklch у v4). Ви це свідомо прийняли.
- Без автоматичних тестів «як раніше» перевіряється лише очима. Дрібну регресію (наприклад, відступ) легко пропустити.
- Форма лишається з відомими вадами (статус 200 при помилці, лог даних відвідувача) до фічі 8.
- `next/typescript` може дати нові попередження, які висітимуть до фічі 6.
- Tailwind 4 працює лише в сучасних браузерах (Safari 16.4+, Chrome 111+, Firefox 128+). Для портфоліо це прийнятно.
- До запуску `/sync` AGENTS.md описуватиме старий стек (Next 13.5, `tailwind.config.ts`).

**Neutral**:
- Змінюються конфіги: `eslint.config.mjs` замість `.eslintrc.json`, `tailwind.config.ts` зникає, `postcss.config` під `@tailwindcss/postcss`.
- Правило з AGENTS.md про `tailwind.config.ts` і `theme.colors` стане неактуальним.

## Follow-up

- [ ] Після злиття оновити AGENTS.md (стек, команди, gotcha про `tailwind.config.ts`, нове місце токенів кольорів) через `/sync`.
- [ ] Якщо довелося відкотитися на `next build --webpack`, з'ясувати причину і повернутись на Turbopack.
- [ ] Розглянути Playwright з порівнянням знімків разом з фічею 8 або `/test`, щоб наступні оновлення перевірялися автоматично.
