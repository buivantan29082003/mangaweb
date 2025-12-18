<?php

use App\Services\User\RankingService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::call(function(){
    $rankingSerivce=app(RankingService::class);
    Redis::set("topTenViewed",json_encode($rankingSerivce->getTopTenViewed())); 
    Redis::set("topThreeViewed",json_encode($rankingSerivce->getTopThreeViewed())); 
}) ->dailyAt("16:13")->timezone("Asia/Ho_Chi_Minh");