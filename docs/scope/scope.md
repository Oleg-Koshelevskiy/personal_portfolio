# Scope: Web Magic Crafter (портфоліо)

Особистий сайт fullstack розробника. Він працює для двох аудиторій: роботодавці (кейси, CV, контакт) і клієнти на фриланс (послуги, заявка).

**Build approach:** Tracer Bullet (кожна фіча робиться повністю, від даних до UI, і одразу виходить на прод; наступні кроки нарощують те, що вже працює).
**Workflow:** Alpha (після `/develop` запускаємо `/check verify` на живому сайті). Це рівень перевірок за замовчуванням. `/architect` варто пройти першим для фічі, де є справжнє рішення, але його можна пропустити, якщо ви вже знаєте, як її зробити. Будь яка фіча може мати свій тег (наприклад `· Beta`), щоб перевірок було більше чи менше.

_Це рекомендації, щоб робота йшла впорядковано, а не обов'язкові правила. Пропускайте все, що не підходить: якщо ви вже знаєте, як зробити фічу, запускайте `/develop` і пропускайте `/architect`. Коли фіча `done`, вирішуєте ви._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Головна сторінка (Hero, About, Header, Footer) | Existing | existing |
| 2 | Сітка проєктів з фільтром | Existing | existing |
| 3 | Форма контакту | Existing | in-progress |
| 4 | Стандарти коду і AGENTS.md | Foundation | planned |
| 5 | Оновлення стеку | Foundation | in-progress |
| 6 | Дрібні виправлення і доступність | Foundation | planned |
| 7 | Модель контенту | Foundation | planned |
| 8 | Надійна форма контакту | Slice 1 | planned |
| 9 | Сторінки кейсів | Slice 2 | planned |
| 10 | SEO основа | Slice 3 | planned |
| 11 | Блок послуг для клієнтів | Slice 4 | planned |
| 12 | Дві мови UA/EN | Slice 5 | planned |
| 13 | Блог | Slice 6 | planned |
| 14 | Аналітика і згода на cookies | Slice 7 | planned |

## Вже є

### 1. Головна сторінка (Hero, About, Header, Footer) · existing
Одна сторінка з анімованим Hero, кнопками Hire Me і Download CV, вкладками About (Skills, Education, Certifications), шапкою з мобільним меню і футером. code in `app/page.tsx`, `components/layout/`

### 2. Сітка проєктів з фільтром · existing
Три проєкти, фільтр за тегами All / Commercial / Opensource, анімація появи. Дані зашиті прямо в компонент. code in `components/layout/ProjectsSection.tsx`

### 3. Форма контакту · in-progress
Форма відправляє лист через API маршрут. Працює, але неповна: помилки сервера повертаються зі статусом 200, у формі немає стану завантаження і помилки, немає захисту від спаму, дані відвідувача пишуться в лог. Доробка у фічі 8. code in `app/api/send/route.ts`, `components/layout/EmailSection.tsx`

## Foundations

### 4. Стандарти коду і AGENTS.md
Зафіксувати стек, структуру і правила проєкту в `AGENTS.md`, щоб кожен наступний крок спирався на них.
**Done when:** root `AGENTS.md` описує реальний стек і конвенції, а `npm run lint` і `npm run build` проходять чисто.
- [ ] Зафіксувати конвенції: `/audit`

### 5. Оновлення стеку · in-progress
Next.js 13.5 і React 18 вже давно застаріли, а старі версії мають відомі вразливості. Оновлення варто зробити до нових фіч, щоб не переписувати їх потім.
**Done when:** проєкт на актуальній підтримуваній версії фреймворку і залежностей, збірка і лінт проходять, сайт виглядає і працює як раніше.
spec [0001](../specs/0001-stack-upgrade/index.md) · code in `package.json`, `app/globals.css`, `eslint.config.mjs`, `app/api/send/route.ts`, `components/` (гілка `chore/stack-upgrade`)
- [x] Design it (spec): `/architect оновлення стеку`
- [ ] Build it: `/develop оновлення стеку`
  - [x] Базова лінія: коміт Footer, гілка, знімки «до» (AC-3, AC-5)
  - [ ] Фреймворк наскрізно: Next і React 19, Node, Resend, ESLint 9, деплой на Preview (AC-1, AC-2, AC-5, AC-9, AC-10) · локально готово, чекає Preview і лист
  - [x] Анімації на `motion` (AC-4, AC-7)
  - [x] Tailwind 4 з токенами і hover для тапу (AC-3, AC-4, AC-6)
  - [ ] Решта залежностей, аудит, фінальна перевірка, злиття (AC-1, AC-3, AC-4, AC-5, AC-8, AC-9, AC-10) · залежності й аудит готові, чекає Preview і злиття
- [ ] Verify it: `/check verify оновлення стеку`

### 6. Дрібні виправлення і доступність
Швидкі правки, які видно відвідувачу вже зараз: заголовок `Let`'s Connect` з зайвим символом, помилки в словах `Opensouce` і `Sertified`, шляхи до картинок з подвійним слешем, `key={index}` у списку, невикористаний `isPending`, слабкі `alt` тексти, футер без тегу `<footer>`, зовнішні посилання без `target` і `rel`, вкладки без ARIA ролей, шаблонний README.
**Done when:** усі пункти виправлені, текст на сторінці без помилок, вкладки і меню працюють з клавіатури, у README є опис проєкту і як його запустити.
- [ ] Зробити: `/develop дрібні виправлення і доступність`

### 7. Модель контенту · needs a decision
Де живуть проєкти, статті, послуги і переклади, і як їх додавати без правки компонентів. Це одне рішення, на яке спираються кейси, блог, послуги і дві мови.
**Done when:** є одне джерело даних для проєктів (а згодом для статей і послуг), новий проєкт додається без зміни коду компонентів, структура готова до двох мов.
- [ ] Design it (spec): `/architect модель контенту`

## Slice 1: Надійна форма контакту

### 8. Надійна форма контакту · needs a decision
Форма, якій можна довіряти: лист або доходить, або відвідувач бачить зрозумілу помилку. Це головний канал і для роботодавців, і для клієнтів.
**Done when:** сервер перевіряє поля і повертає правильний статус; форма показує стан відправки, успіх і помилку; спам відсікається; дані відвідувача не пишуться в лог; адреси відправника і отримувача беруться з налаштувань оточення.
- [ ] Design it (spec): `/architect надійна форма контакту`

## Slice 2: Сторінки кейсів

### 9. Сторінки кейсів · needs a decision
Окрема сторінка для кожного проєкту: задача, ваша роль, рішення, стек, результат, скриншоти. Картка на головній веде на кейс.
**Done when:** кожен проєкт має свою сторінку з адресою, яку можна поділитися; картка на головній веде на неї; на сторінці є посилання на демо і код; є метадані для пошуку і соцмереж.
- [ ] Design it (spec): `/architect сторінки кейсів`

## Slice 3: SEO основа

### 10. SEO основа
Щоб сайт добре знаходився і гарно виглядав, коли ним діляться: зараз є лише назва і короткий опис.
**Done when:** є повні метадані і картки для соцмереж, `sitemap` і `robots`, структуровані дані про особу, правильна ієрархія заголовків; Lighthouse SEO і Accessibility не нижче 90.
- [ ] Зробити: `/develop SEO основа`

## Slice 4: Блок послуг для клієнтів

### 11. Блок послуг для клієнтів · needs a decision
Окремий блок або сторінка для фриланс клієнтів: що ви робите, як проходить співпраця, як замовити. Кнопка веде на форму контакту з уже вибраною темою.
**Done when:** відвідувач бачить перелік послуг і процес роботи, може одним кліком перейти до заявки, а в листі видно, що це запит на послугу.
- [ ] Design it (spec): `/architect блок послуг для клієнтів`

## Slice 5: Дві мови UA/EN

### 12. Дві мови UA/EN · needs a decision
Увесь контент доступний українською і англійською, з перемикачем мов.
**Done when:** кожна сторінка відкривається обома мовами за окремою адресою; перемикач зберігає поточну сторінку; атрибут `lang` і метадані відповідають мові; пошуковики бачать обидві версії.
- [ ] Design it (spec): `/architect дві мови UA/EN`

## Slice 6: Блог

### 13. Блог · needs a decision
Статті і нотатки, які показують ваше мислення і приводять трафік з пошуку.
**Done when:** є список статей і сторінка статті з датою і тегами; нова стаття додається без зміни коду; статті мають метадані і потрапляють у `sitemap`; працює для обох мов.
- [ ] Design it (spec): `/architect блог`

## Slice 7: Аналітика

### 14. Аналітика і згода на cookies · needs a decision
Бачити, скільки людей приходить і що вони роблять: відкривають кейси, качають CV, відправляють форму.
**Done when:** видно відвідування і ключові події (завантаження CV, відправка форми, перехід на кейс); якщо обраний спосіб потребує згоди, є банер згоди і сторінка політики приватності.
- [ ] Design it (spec): `/architect аналітика і згода на cookies`

## Deferred
Поза поточним планом, записано, щоб план залишався чесним.
- **Відгуки**: відгуки клієнтів і колег · needs a decision
- **RSS для блогу**: підписка на нові статті
- **Темна і світла тема**: перемикач теми · needs a decision
- **Автоматичне порівняння знімків (Playwright)**: щоб наступні оновлення перевірялися без ручного порівняння · from spec 0001

## Legend

**The decision box.** Every feature carries exactly one, the sub-task whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned` · needs a decision | `/scope` | one box: `Design it (spec): /architect <feature>` |
| `in-progress` (designed) | **`/architect` at spec capture** | `Design it` ticked; spec linked; `Build it: /develop <feature>` + **2 to 5 milestones**; the tier's closing boxes (`Verify it` Alpha+, `Test it` Beta+, `Review it` + `Document it` GA); any surfaced follow-up enrolled |
| `in-progress` (building) | `/develop` | milestone sub-boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` + milestones ticked; `Verify it` ticked |
| `done` | **you, when you decide it is** (any skill sets it when you say so); `/sync` reconciles | boxes you ran ticked, skipped ones marked skipped; the tier's last stage (`Prototype` → after `/develop`; `Alpha` → after `/check verify`; `Beta`/`GA` → after `/test`) is the suggested point to call it done; `/sync` captures conventions |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/develop` (or `/audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (pre-workflow) and `dropped` (de-scoped, kept for history).
- **Approach tag** beside a heading (e.g. `· Facade`) overrides the project default for that feature; no tag = inherits it.
- **Workflow tier tag** beside a heading (e.g. `· GA`, `· Prototype`) sets that one feature's rigor above or below the project default; no tag inherits the default. It decides the feature's check boxes and each skill's next suggestion.
- **Workflow** (header line) is the project default, what runs after `/develop`: **Prototype** = nothing (trust develop's own build time self check); **Alpha** = `/check verify`; **Beta** = `/check verify` then `/test`; **GA** = adds a fresh model `/check review` then `/document`. A feature built on an unratified decision (an `Assumed` spec) stays flagged, but that never blocks `done`.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/develop`.
