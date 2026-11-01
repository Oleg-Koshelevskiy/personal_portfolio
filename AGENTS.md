# Web Magic Crafter (personal portfolio)

Односторінковий сайт портфоліо: Hero, About, Projects, Contact. Форма контакту надсилає лист через Resend.

## Stack

- **Language / Runtime**: TypeScript (strict), Node
- **Framework**: Next.js 13.5 (App Router), React 18. Застаріло, оновлення заплановано (scope, фіча 5)
- **Key dependencies**: Tailwind CSS 3, framer-motion, react-type-animation, @heroicons/react, resend
- **Package manager**: npm (`package-lock.json`)

## Build approach

Tracer Bullet (кожна фіча робиться повністю, від даних до UI, і одразу виходить на прод; наступні кроки нарощують те, що вже працює).

## Commands

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Lint
npm run lint

# Test
# тестів поки немає
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`.

## Rules

- Секції сторінки живуть у `components/layout/*Section.tsx`, дрібні спільні компоненти в `components/`, спільні типи в `types/`.
- Компоненти пишуться як стрілочні функції з `export default` наприкінці файлу.
- Імпорти через аліас `@/` (корінь репозиторію); старий код подекуди має відносні `../`.
- `"use client"` став лише там, де є стан, обробники подій або framer-motion. Header і Footer серверні.
- Стилі тільки Tailwind класами. Акцентні кольори через `primary` (indigo) і `secondary` (purple) з `tailwind.config.ts`; сірі тексти поки задані як `#ADB7BE`, `#181818`.
- Картинки лежать у `public/assets/images`, іконки в `public/assets/icons`; показуй їх через `next/image`.
- Контент (проєкти, вкладки About, посилання меню) поки зашитий у компоненти як масиви констант.
- Лінт: `next/core-web-vitals`. Prettier і тестового фреймворку немає.

## Gotchas

- `app/api/send/route.ts` потребує `RESEND_API_KEY` у `.env` (файл у `.gitignore`). Адреси відправника і отримувача зашиті в код, домен відправника має бути підтверджений у Resend.
- `tailwind.config.ts` перевизначає `theme.colors` (не `extend`) і розгортає всю палітру `tailwindcss/colors`.
- `public/cv.pdf` віддається кнопкою Download CV у Hero, при заміні CV залиш ту саму назву файлу.

## Agent skills

- [vercel-react-best-practices](.claude/skills/vercel-react-best-practices/): `vercel-labs/agent-skills`, React і Next.js патерни, продуктивність
- [resend](.claude/skills/resend/): `resend/resend-skills`, відправка листів і обробка помилок Resend
- [tailwind-design-system](.claude/skills/tailwind-design-system/): `wshobson/agents`, дизайн токени і компоненти на Tailwind
- [animation-performance](.claude/skills/animation-performance/): `emilkowalski/skills`, плавні анімації, reduced motion

## Context files

<!-- Nested AGENTS.md files are listed here as they are created -->

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
