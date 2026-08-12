<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function index(Request $request): Response
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
            ->selectSub($latestMessage('conversation_id'), 'conversation_id')
            ->selectSub($latestMessage('content'), 'last_message')
            ->selectSub($latestMessage('created_at'), 'last_message_at')
            ->orderByRaw('last_message_at IS NULL')
            ->orderByDesc('last_message_at')
            ->orderBy('users.name')
            ->get()
            ->map(fn (User $user): array => [
                'id' => $user->id,
                'conversation_id' => $user->conversation_id,
                'name' => $user->name,
                'email' => $user->email,
                'message' => $user->last_message,
                'time' => $user->last_message_at,
            ]);

        $conversationId = $request->integer('conversation_id') ?: $users->first()['conversation_id'] ?? null;
        $conversation = $conversationId
            ? Conversation::query()
                ->whereKey($conversationId)
                ->whereHas('users', fn ($query) => $query->whereKey($currentUserId))
                ->first()
            : null;

        if ($conversation && $conversation->users()->whereKeyNot($currentUserId)->exists()) {
            $otherUser = $conversation->users()->whereKeyNot($currentUserId)->first();
        } else {
            $conversation = null;
            $otherUser = null;
        }

        $conversationMessages = null;
        $pagination = null;

        if ($conversationId) {
            $conversationPaginator = Message::query()
                ->where('conversation_id', $conversationId)
                ->with('sender')
                ->latest('id')
                ->cursorPaginate(15);

            $conversationMessages = $conversationPaginator->map(fn (Message $message): array => [
                'id' => $message->id,
                'content' => $message->content,
                'sender_id' => $message->sender_id,
                'time' => $message->created_at,
                'is_mine' => $message->sender_id === $currentUserId,
            ])->values();

            $pagination = [
                'data' => $conversationMessages,
                'next_cursor' => $conversationPaginator->nextCursor()?->encode(),
                'next_page_url' => $conversationPaginator->nextPageUrl(),
                'prev_cursor' => $conversationPaginator->previousCursor()?->encode(),
                'prev_page_url' => $conversationPaginator->previousPageUrl(),
            ];
        }

        return Inertia::render('Chat/Index', [
            'users' => $users,
            'conversation' => $conversation ? [
                'id' => $conversation->id,
                'user_id' => $otherUser->id,
                'messages' => $conversationMessages ?? [],
                'pagination' => $pagination,
            ] : null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'content' => 'required|string|max:255',
        ]);

        $message = Message::query()->create([
            'conversation_id' => $request->conversation_id,
            'sender_id' => $request->user()->id,
            'content' => $request->content,
        ]);

        return redirect()->back();
    }
}
