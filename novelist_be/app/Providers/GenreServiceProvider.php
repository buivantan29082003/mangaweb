<?php

namespace App\Providers;

use App\Repositories\RepositoryImplements\GenresRepository;
use App\Services\Common\GenreService;
use Illuminate\Support\ServiceProvider;

class GenreServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton("genreServiceProvider",function ($app){
            return new GenreService($app->make(GenresRepository::class));
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
