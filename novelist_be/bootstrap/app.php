<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })->withSchedule(function (Illuminate\Console\Scheduling\Schedule $schedule) {

        $schedule->command('task:daily')->dailyAt('14:41');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
       
 
         $exceptions->render(function (\Throwable $e, Request $request) {

    if ($e instanceof TokenExpiredException) {
        return response()->json([
            'error' => 'TOKEN_EXPIRED',
            'message' => 'Access token đã hết hạn'
        ], 401);
    }

    if ($e instanceof TokenInvalidException) {
        return response()->json([
            'error' => 'TOKEN_INVALID',
            'message' => 'Token không hợp lệ hoặc refresh đã hết hạn'
        ], 401);
    }

    if ($e instanceof JWTException) {
        return response()->json([
            'error' => 'TOKEN_ABSENT',
            'message' => 'Không tìm thấy JWT token'
        ], 401);
    }

    if ($e instanceof AuthenticationException) {
        return response()->json([
            'error' => 'UNAUTHENTICATED',
            'message' => 'Chưa đăng nhập hoặc không có token'
        ], 401);
    }

    return null; // Nếu không phải các exception trên, Laravel xử lý mặc định
});
    })->create();
