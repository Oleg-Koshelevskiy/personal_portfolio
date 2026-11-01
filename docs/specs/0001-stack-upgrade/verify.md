# Verify: Оновлення стеку · spec 0001 · updated 2026-11-01
_Steps derived from spec 0001 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

Гілка: `chore/stack-upgrade`. Знімки «до» лежать поза репозиторієм, у scratchpad сесії `/develop` (`before/`, 375px і 1280px).

## UI / manual
- [ ] Запушити гілку, збірка Vercel Preview проходить → AC-9
- [ ] У Vercel `RESEND_API_KEY` заданий для середовища Preview → AC-5
- [ ] На Preview надіслати форму: лист приходить на `webmagic.crafter@gmail.com`, форма показує «Email sent successfully!» → AC-5
- [ ] На Preview на 375px і 1280px пройти Header, Hero, About, Projects, Contact, Footer і порівняти зі знімками «до»: макет, відступи, розміри і текст ті самі, відрізнятися можуть лише кольори → AC-3
- [ ] Hero на 1280px: рядок з анімацією друку стоїть одразу під «Hello, I'm», без великого проміжку → AC-3
- [ ] Анімація друку і поява Hero, вкладки About, фільтр проєктів і поява карток при прокрутці → AC-4
- [ ] Оверлей картки з посиланнями: наведення на десктопі, тап на телефоні → AC-4
- [ ] Мобільне меню відкривається і закривається, якорі меню прокручують до секцій → AC-4
- [ ] Download CV віддає `cv.pdf` → AC-4
- [ ] Курсор над кнопками (фільтр, вкладки, Send Message) показує руку, як до оновлення → AC-4
- [ ] Після злиття в `main` збірка Production проходить → AC-9

## Commands
- [ ] `npm ls next eslint-config-next react react-dom @types/react` → 16.4.3, 16.4.3, 19.3.1, 19.3.1, 19.x; `next` і `eslint-config-next` без `^` у `package.json` → AC-1
- [ ] `npm run build` проходить, також без `RESEND_API_KEY` в оточенні → AC-2
- [ ] `npm run lint` (ESLint 9, `eslint.config.mjs`) → 0 помилок → AC-2
- [ ] `npm run dev` → без помилок у терміналі і консолі браузера → AC-10
- [ ] `npm audit --omit=dev` → 0 high, 0 critical → AC-8
- [ ] `framer-motion` немає в `package.json`, імпорти з `motion/react` → AC-7
- [ ] `tailwind.config.ts` немає, `primary-*` і `secondary-*` задані в `@theme` у `app/globals.css` → AC-6
- [ ] `package.json` має `engines.node` `>=20.9.0` → AC-9

## Value sourcing
- [ ] `npm view next version` збігається з закріпленою версією `next` (або різниця лише в новому patch після збірки) → AC-1
- [ ] React 19.x задовольняє `peerDependencies` встановленого `next` (`npm ls react` без помилок) → AC-1
- [ ] Vercel бере Node з `engines.node`: у лозі збірки Preview версія Node 20.9 або новіша → AC-9
- [ ] `primary-500` у браузері дає колір `indigo-500` палітри v4, `secondary-500` дає `purple-500` (DevTools, обчислене значення) → AC-6
- [ ] Ключ з Vercel: з невірним ключем локально `/api/send` повертає 200 і `{ error }` з текстом помилки Resend → AC-5
- [ ] Лист у скриньці перевіряєте ви → AC-5

## Acceptance-criteria coverage
- AC-1: Commands 1, Value sourcing 1, 2
- AC-2: Commands 2, 3
- AC-3: UI 4, 5
- AC-4: UI 6, 7, 8, 9, 10
- AC-5: UI 2, 3, Value sourcing 5, 6
- AC-6: Commands 7, Value sourcing 4
- AC-7: Commands 6
- AC-8: Commands 5
- AC-9: UI 1, 11, Commands 8, Value sourcing 3
- AC-10: Commands 4
