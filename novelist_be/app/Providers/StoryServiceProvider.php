<?php

namespace App\Providers;

use App\Repositories\RepositoryImplements\WorksRepository;
use Illuminate\Support\ServiceProvider;

class StoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton("storyService",\App\Services\User\StoryService::class);
    }


    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
