<?php
namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;
use App\Services\User\RankingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class RankingController extends Controller{

    private RankingService $rankingService;

    public function __construct(RankingService $rankingService)
    {
        $this->rankingService=$rankingService;
    }
    
    public function getTop10(Request $request){ 
        return response()->json(json_decode(Redis::get('topTenViewed')));
    }

    public function getTop3(Request $request){ 
        return response()->json(json_decode(Redis::get('topThreeViewed')));
    }


}