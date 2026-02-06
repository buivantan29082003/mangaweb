<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\AdminChapterController;
use App\Http\Controllers\Admin\CommentController as AdminCommentController;
use App\Http\Controllers\Admin\RegistrationController as AdminRegistrationController;
use App\Http\Controllers\Admin\WorkController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Common\AuthorController;
use App\Http\Controllers\Common\GenreController;
use App\Http\Controllers\Common\PlanController;
use App\Http\Controllers\Common\StatusController;
use App\Http\Controllers\Common\UploadFileController;
use App\Http\Controllers\User\RegistrationController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\User\BookMarkController;
use App\Http\Controllers\User\ChapterController;
use App\Http\Controllers\User\CommentController;
use App\Http\Controllers\User\FollowingController;
use App\Http\Controllers\User\LikeController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\RankingController;
use App\Http\Middleware\MiddlewareUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Ramsey\Uuid\Type\Integer;

Route::prefix('user')
    ->middleware("auth:api")
    ->group(function () { 
        // Group nàу dùng StoryController
        Route::controller(StoryController::class)->group(function () {
            Route::get('/show/{id}', 'shows');
            Route::get('/works', 'getAll');
            Route::get('/work/{id}', 'getById');
        });

        Route::controller(AuthController::class)->group(function () {
            Route::get('/account/myaccount', 'getAccount'); 
        });

        Route::controller(NotificationController::class)->group(function () {
            Route::get('/notification/count', 'countNotificationIsNotReaded'); 
            Route::get("/notifications","getNotifications");
            Route::post("/notification/readed/{notificationId}","setReaded");
        }); 

        // Group này dùng ChapterController
        Route::controller(ChapterController::class)->group(function () {
            Route::get('/chapter/{workId}', 'getByWorkId');
            Route::get('/chapter/detail/{workId}', 'getById');
            Route::post('/chapter/bookmark/{isBookMark}/{chapterId}', 'handleBookMark');
            
        });

        Route::controller(CommentController::class)->group(function () {
            Route::get('/comments/{workId}', 'getByWorkId');
            Route::get('/comments/child/{commentId}', 'getByCommentId');
            Route::post('/comments/add', 'addComment'); 
        });

        Route::controller(FollowingController::class)->group(function () { 
            Route::post('/following/follow/{workId}','follow'); 
            Route::post('/following/unfollow/{workId}','unFollow'); 
            Route::get('/followings','getFollowing'); 
            
        });

        Route::controller(LikeController::class)->group(function () { 
            Route::post('/favorite/like/{workId}','like'); 
            Route::post('/favorite/unlike/{workId}','unLike'); 
        });

        Route::controller(RegistrationController::class)->group(function (){
            Route::get('/payments','getPaymentType'); 
            Route::get('/registration/register/{paymmentType}/{planId}','createUrlPayment'); 
            Route::get('/registration/getall', 'getAll'); 
        });

        Route::controller(BookMarkController::class)->group(function (){
            Route::get('/bookmark/chapter','getBookMarkChapter'); 
        });

        

        Route::controller(RankingController::class)->group(function (){
            Route::get('/ranking/topten','getTop10'); 
            Route::get('/ranking/topthree','getTop3'); 
        }); 

    });

Route::prefix('admin')
    ->middleware("auth:api")
    ->group(function () { 
        Route::controller(WorkController::class)->group(function () {
            Route::get('/show/{id}', 'shows');
            Route::get('/works', 'getAll');
            Route::get('/work/{id}', 'getById');
            Route::post('/work/create', 'created');
            Route::get('/work/newchapter/{workId}', 'getLatesChapter');
            Route::post('/work/chapter/create', 'addChapter');
            Route::get('/work/traffic/{workId}', 'trafficReport');
        }); 

        Route::controller(AdminChapterController::class)->group(function () {
            Route::get('/chapter/{chapterId}', 'getById'); 
            Route::post('/chapter/update/{chapterId}', 'updateChapter');
            
        });

        Route::controller(AdminCommentController::class)->group(function () { 
            Route::post('/comment/delete/{commentId}', 'delete');
            
        });

        Route::controller(AdminRegistrationController::class)->group(function () { 
            Route::get('/registration/getall', 'getAllRegistration'); 
            
        });

        Route::controller(AccountController::class)->group(function () { 
            Route::get('/account/getall', 'getAll'); 
            Route::post('/account/changestatus/{accountId}/{status}', 'makeStatus'); 
        });
         
    }); 

Route::post('/login',[AuthController::class,"login"]); 
Route::post('/refresh',[AuthController::class,"refresh"])->middleware("auth:api");
Route::get('/payment/callback',[RegistrationController::class,"callBackPayment"]); 
Route::get('/genres',[GenreController::class,"getAll"]);
Route::get('/authors',[AuthorController::class,"getAll"]);
Route::get('/status',[StatusController::class,"getAll"]);
Route::post('/upload',[UploadFileController::class,"uploadSingleFile"]);
Route::get('/plans',[PlanController::class,"getAll"]);