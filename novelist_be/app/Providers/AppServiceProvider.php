<?php

namespace App\Providers;

use App\Repositories\RepositoryImplements\FavoriteRepository;
use App\Repositories\RepositoryImplements\FollowRepository;
use App\Services\Admin\AccountService;
use App\Services\Admin\AdminChapterService;
use App\Services\Admin\RegistrationService as AdminRegistrationService;
use App\Services\Admin\WorkService;
use App\Services\User\BookMarkService;
use App\Services\User\ChapterService;
use App\Services\User\CommentService;
use App\Services\User\FactoryPaymentService;
use App\Services\User\FavoriteService;
use App\Services\User\FollowService;
use App\Services\User\NotificationService;
use App\Services\User\PaymentVNPayService;
use App\Services\User\PlanService;
use App\Services\User\RankingService;
use App\Services\User\RegistrationService;
use App\Services\User\TransactionService;
use Illuminate\Support\ServiceProvider; 

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton("favoriteService",function ($app){
            return new FavoriteService($app->make(FavoriteRepository::class));
        });
        $this->app->singleton("followService",function ($app){
            return new FollowService($app->make(FollowRepository::class));
        });

        $this->app->singleton("chapterService",ChapterService::class);
        $this->app->singleton("commentService",CommentService::class);
        $this->app->singleton("registrationService",RegistrationService::class);
        $this->app->singleton("vnpayPaymentService",PaymentVNPayService::class);
        $this->app->singleton("FactoryPaymentService",FactoryPaymentService::class); 
        $this->app->singleton("planService",PlanService::class);
        $this->app->singleton("transactionService",TransactionService::class); 
        $this->app->singleton("BookMarkService",BookMarkService::class); 
        $this->app->singleton("RankingService",RankingService::class);  
        $this->app->singleton("workServiceAdmin",WorkService::class);  
        $this->app->singleton("adminChapterService",AdminChapterService::class);  
        $this->app->singleton("RegistrationService",AdminRegistrationService::class); 
        $this->app->singleton("accountServiceAdmin",AccountService::class); 
        $this->app->singleton("notificationService",NotificationService::class); 
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
