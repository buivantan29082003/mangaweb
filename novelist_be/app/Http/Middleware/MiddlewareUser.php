<?php

namespace App\Http\Middleware;

use App\Services\Common\AuthorService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MiddlewareUser
{
    protected AuthorService $authService;

    public function __construct(AuthorService $authService)
    {
        $this->authService = $authService;
    }

    public function handle(Request $request, Closure $next): Response
    {
        // Lấy user 1 lần
        $user = $this->authService->getById(1);

        $request->merge([
            'user' => $user
        ]);

        return $next($request);
    }
}
