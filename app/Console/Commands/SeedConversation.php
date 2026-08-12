<?php

namespace App\Console\Commands;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Console\Command;

class SeedConversation extends Command
{
    protected $signature = 'conversation:seed
        {--user-id= : ID của user sẽ tham gia conversation}
        {--messages=6 : Số lượng message mẫu cần tạo}';

    protected $description = 'Tạo một conversation và messages mẫu giữa hai user';

    public function handle(): int
    {
        $user = $this->option('user-id')
            ? User::find($this->option('user-id'))
            : User::query()->oldest('id')->first();

        if (! $user) {
            $this->error('Không tìm thấy user. Hãy tạo user trước bằng user:create-admin hoặc user:create-users.');

            return self::FAILURE;
        }

        $otherUser = User::firstOrCreate(
            ['email' => 'conversation.demo@example.com'],
            [
                'name' => 'Conversation Demo',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
        );

        if ($user->is($otherUser)) {
            $otherUser = User::query()->whereKeyNot($user->id)->oldest('id')->first();
        }

        if (! $otherUser) {
            $this->error('Cần có ít nhất hai user để tạo conversation.');

            return self::FAILURE;
        }

        $messageCount = (int) $this->option('messages');

        if ($messageCount < 1) {
            $this->error('Số lượng message phải là số nguyên dương.');

            return self::FAILURE;
        }

        $conversation = Conversation::create();
        $conversation->users()->attach([$user->id, $otherUser->id]);

        $contents = [
            'Chào bạn! Dạo này bạn thế nào rồi?',
            'Mình vẫn khỏe, cảm ơn bạn. Còn bạn thì sao?',
            'Mình cũng ổn. Hôm nay công việc của bạn thế nào?',
            'Khá tốt, mình vừa hoàn thành một tính năng realtime.',
            'Hay quá! Khi nào rảnh mình xem thử nhé.',
            'Được, mình sẽ gửi bạn link conversation này.',
        ];

        foreach (range(0, $messageCount - 1) as $index) {
            Message::create([
                'conversation_id' => $conversation->id,
                'sender_id' => $index % 2 === 0 ? $otherUser->id : $user->id,
                'content' => $contents[$index % count($contents)],
            ]);
        }

        $this->info("Đã tạo conversation #{$conversation->id} giữa {$user->email} và {$otherUser->email} với {$messageCount} messages.");

        return self::SUCCESS;
    }
}
