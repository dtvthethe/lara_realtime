<?php

namespace Tests\Feature\Console;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class CreateUserCommandsTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_the_admin_user(): void
    {
        $this->artisan('user:create-admin')
            ->expectsOutput('Đã tạo user admin với email admin@mail.com.')
            ->assertSuccessful();

        $admin = User::where('email', 'admin@mail.com')->first();

        $this->assertNotNull($admin);
        $this->assertSame('admin', $admin->name);
        $this->assertTrue(Hash::check('123456', $admin->password));
    }

    public function test_it_does_not_create_a_duplicate_admin(): void
    {
        User::factory()->create(['email' => 'admin@mail.com']);

        $this->artisan('user:create-admin')
            ->expectsOutput('User admin với email admin@mail.com đã tồn tại.')
            ->assertSuccessful();

        $this->assertSame(1, User::where('email', 'admin@mail.com')->count());
    }

    public function test_it_creates_the_requested_number_of_users(): void
    {
        $this->artisan('user:create-users')
            ->expectsQuestion('Nhập số lượng user cần tạo', '3')
            ->expectsOutput('Đã tạo 3 user.')
            ->assertSuccessful();

        $this->assertDatabaseCount('users', 3);
        User::all()->each(function (User $user): void {
            $this->assertTrue(Hash::check('123456', $user->password));
        });
    }

    public function test_it_rejects_a_non_positive_quantity(): void
    {
        $this->artisan('user:create-users')
            ->expectsQuestion('Nhập số lượng user cần tạo', '0')
            ->expectsOutput('Số lượng user phải là số nguyên dương.')
            ->assertFailed();

        $this->assertDatabaseCount('users', 0);
    }
}
