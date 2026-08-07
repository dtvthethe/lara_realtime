<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateAdminUser extends Command
{
    protected $signature = 'user:create-admin';

    protected $description = 'Tạo user admin mặc định';

    public function handle(): int
    {
        $email = 'admin@mail.com';

        if (User::where('email', $email)->exists()) {
            $this->warn("User admin với email {$email} đã tồn tại.");

            return self::SUCCESS;
        }

        User::create([
            'name' => 'admin',
            'email' => $email,
            'password' => '123456',
            'email_verified_at' => now(),
        ]);

        $this->info("Đã tạo user admin với email {$email}.");

        return self::SUCCESS;
    }
}
