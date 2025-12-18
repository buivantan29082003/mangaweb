<?php

namespace App\Providers;

use App\Repositories\RepositoryImplements\AuthorRepository;
use App\Services\Common\AuthorService;
use Illuminate\Support\ServiceProvider;

class AuthorServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton("authorServiceProvider",function ($app){
            return new AuthorService($app->make(AuthorRepository::class));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
