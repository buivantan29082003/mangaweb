<?php
namespace App\Providers;
use Illuminate\Support\ServiceProvider;

class AuthService extends ServiceProvider{
    public function register(): void
    {
        echo("Xin chào bạn nha auth ơi ");
    }
}
?>