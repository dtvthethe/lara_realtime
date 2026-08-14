<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.store');
});

Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('chat')
        : redirect()->route('login');
});

Route::get('/chat', [ChatController::class, 'index'])
    ->middleware('auth')
    ->name('chat');

Route::post('/chat/message', [ChatController::class, 'store'])
    ->middleware('auth')
    ->name('chat.message');

Route::post('/chat/start', [ChatController::class, 'startConversation'])
    ->middleware('auth')
    ->name('chat.start');
