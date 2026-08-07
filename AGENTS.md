# Repository Guidance

## Project Scope

- This project is for learning realtime communication and messaging workflows.
- The primary feature is sending messages directly between users.
- Always respond in Vietnamese.
- For frontend code, use Tailwind CSS with as few utility classes as practical and keep the UI simple.

## Stack and Entry Points

- This is a Laravel 13 application requiring PHP 8.3; backend dependencies are managed with Composer.
- Application wiring starts in `bootstrap/app.php`; web routes are in `routes/web.php`, console commands in `routes/console.php`, and application code in `app/`.
- Vite builds `resources/css/app.css` and `resources/js/app.jsx`; Tailwind CSS 4 is configured through `@tailwindcss/vite` and CSS `@source` directives.
- Inertia uses `resources/views/app.blade.php` as its root template, `resources/js/app.jsx` as its React entry point, and page components under `resources/js/Pages/`.

## Setup and Development

- Run `composer run setup` for a fresh checkout. It installs Composer and npm dependencies, creates `.env`, generates the app key, migrates, and builds frontend assets.
- Run `composer run dev` for the full local stack: Laravel server, queue listener, Pail logs, and Vite. It requires `npx concurrently` from the npm dependencies.
- Use `npm run build` for a frontend production build; use `npm run dev` when only the Vite watcher is needed.
- Local `.env` defaults to MySQL plus database-backed sessions, queues, and cache; ensure that database is available before running migrations or the full app.

## Verification

- Run `composer run test`; it clears Laravel config before invoking `php artisan test`.
- Tests are split into `tests/Unit` and `tests/Feature` by `phpunit.xml` and use in-memory SQLite, so they do not require the local MySQL database.
- Run one focused test with `php artisan test --filter=TestName` (or add a test path) rather than running the entire suite while iterating.
- Format PHP with `vendor/bin/pint`; no separate lint or typecheck script is configured.

## Generated Files

- Do not edit or commit `vendor/`, `node_modules/`, `public/build/`, or `public/hot`; these are dependencies or generated Vite output and are ignored by Git.
- Database schema changes belong in new files under `database/migrations/`; apply them locally with `php artisan migrate`.
