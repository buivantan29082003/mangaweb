<?php

namespace App\Providers;

use App\Repositories\RepositoryImplements\AccountRepository;
use App\Repositories\RepositoryImplements\AuthorRepository;
use App\Repositories\RepositoryImplements\BookMarkRepository;
use App\Repositories\RepositoryImplements\ChapterRepository;
use App\Repositories\RepositoryImplements\CommentRepository;
use App\Repositories\RepositoryImplements\FavoriteRepository;
use App\Repositories\RepositoryImplements\FollowRepository;
use App\Repositories\RepositoryImplements\GenresRepository;
use App\Repositories\RepositoryImplements\NotificationRepository;
use App\Repositories\RepositoryImplements\PlanRepository;
use App\Repositories\RepositoryImplements\RegistrationRepository;
use App\Repositories\RepositoryImplements\TransactionRepository;
use App\Repositories\RepositoryImplements\WorksRepository; 
use Illuminate\Support\ServiceProvider;
 
class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton("author",AuthorRepository::class);
        $this->app->singleton("genreRepository",GenresRepository::class);
        $this->app->singleton("workRepository",WorksRepository::class);
        $this->app->singleton("favoriteRepository",FavoriteRepository::class);
        $this->app->singleton("followRepository",FollowRepository::class);
        $this->app->singleton("chapterRepository",ChapterRepository::class);
        $this->app->singleton("commentRepository",CommentRepository::class);
        $this->app->singleton("registrationRepossitory",RegistrationRepository::class);
        $this->app->singleton("PlanRepository",PlanRepository::class);
        $this->app->singleton("transactionRepository",TransactionRepository::class);
        $this->app->singleton("bookMarkRepository",BookMarkRepository::class);
        $this->app->singleton("accountRepostory",AccountRepository::class);
        $this->app->singleton("notificationRepository",NotificationRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
