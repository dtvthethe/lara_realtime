# Lara Realtime

Dự án học tập về giao tiếp realtime và quy trình nhắn tin trực tiếp giữa người dùng.

## Công nghệ

- Laravel 13 và PHP 8.3+
- Inertia.js 3 với React 19
- Tailwind CSS 4
- Vite 8
- MySQL cho môi trường local

## Yêu cầu

- PHP >= 8.3
- Composer
- Node.js và npm
- MySQL đang chạy local

## Cài đặt

```bash
composer run setup
```

Lệnh này sẽ cài dependency PHP và JavaScript, tạo file `.env`, sinh application key, chạy migration và build frontend.

Nếu cần tạo file môi trường thủ công:

```bash
cp .env.example .env
php artisan key:generate
```

Cập nhật thông tin database trong `.env` trước khi chạy migration.

## Chạy local

Chạy toàn bộ stack Laravel, queue, log viewer và Vite:

```bash
composer run dev
```

Hoặc chỉ chạy frontend Vite:

```bash
npm run dev
```

Ứng dụng Laravel có thể truy cập tại `http://localhost:8000`.

## Kiểm thử Và Build

Chạy test:

```bash
composer run test
```

Chạy một test cụ thể:

```bash
php artisan test --filter=TestName
```

Build frontend production:

```bash
npm run build
```

Format PHP:

```bash
vendor/bin/pint
```

## Cấu trúc Frontend

- `resources/js/app.jsx`: entry point React và Inertia
- `resources/js/Pages/`: các page React được render bởi Inertia
- `resources/views/app.blade.php`: root template của Inertia
- `resources/css/app.css`: import và cấu hình Tailwind CSS
- `vite.config.js`: cấu hình Laravel Vite, React và Tailwind

Route web nằm trong `routes/web.php`; middleware Inertia nằm tại `app/Http/Middleware/HandleInertiaRequests.php`.

## Database

Migration nằm trong `database/migrations/`. Chạy migration bằng:

```bash
php artisan migrate
```
