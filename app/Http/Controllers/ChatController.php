<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $currentUserId = $request->user()->id;

        $latestMessage = fn (string $column) => Message::query()
            ->select("messages.$column")
            ->join('conversation_user as recipient', 'recipient.conversation_id', '=', 'messages.conversation_id')
            ->whereColumn('recipient.user_id', 'users.id')
            ->whereExists(function ($query) use ($currentUserId): void {
                $query->selectRaw('1')
                    ->from('conversation_user as current_participant')
                    ->whereColumn('current_participant.conversation_id', 'messages.conversation_id')
                    ->where('current_participant.user_id', $currentUserId);
            })
            ->latest('messages.created_at')
            ->latest('messages.id')
            ->limit(1);

        $users = User::query()
            ->whereKeyNot($currentUserId)
            ->select(['users.id', 'users.name', 'users.email'])
            ->selectSub($latestMessage('content'), 'last_message')
            ->selectSub($latestMessage('created_at'), 'last_message_at')
            ->orderByRaw('last_message_at IS NULL')
            ->orderByDesc('last_message_at')
            ->orderBy('users.name')
            ->get()
            ->map(fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'message' => $user->last_message,
                'time' => $user->last_message_at,
            ]);

        return Inertia::render('Chat/Index', [
            'users' => $users,
        ]);
    }
}
