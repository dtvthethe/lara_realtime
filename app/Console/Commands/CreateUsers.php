<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateUsers extends Command
{
    protected $signature = 'user:create-users';

    protected $description = 'Tạo nhiều user bình thường';

    public function handle(): int
    {
        $quantity = (int) $this->ask('Nhập số lượng user cần tạo');

        if ($quantity < 1) {
            $this->error('Số lượng user phải là số nguyên dương.');

            return self::FAILURE;
        }

        User::factory()
            ->count($quantity)
            ->create(['password' => '123456']);

        $this->info("Đã tạo {$quantity} user.");

        return self::SUCCESS;
    }
}
