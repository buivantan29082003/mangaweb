<?php
namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Response\DataResponse;
use App\Services\User\FavoriteService;
use App\Services\User\StoryService;
use Illuminate\Http\Request;

class LikeController extends Controller{
    
    private FavoriteService $favoriteService;
    private StoryService $storyService;

    public function __construct(FavoriteService $favoriteService, StoryService $storyService)
    {
        $this->favoriteService=$favoriteService;
        $this->storyService=$storyService;
    }

    public function like(int $workId, Request  $request){
        $work=$this->storyService->getByIdSimple($workId);
        if($work!=null){
            $liking=$this->favoriteService->getByUserIdAndWorkId($request->user->id,$workId);
            if($liking==null){
                $favorite=new Favorite();
                $favorite->workId=$workId;
                $favorite->accountId=$request->user->id;
                $this->favoriteService->like($favorite);
                $this->favoriteService->increaseLikeOfWork($workId);
                return response()->json(new DataResponse("success",null));
            }
            return response()->json(new DataResponse("Bạn đã yêu thích truyện này",null));
        }
        return response()->json(new DataResponse("Không tìm thấy truyện !!!",null));
    }

    public function unLike($workId, Request  $request){
        $liking=$this->favoriteService->getByUserIdAndWorkId($request->user->id,$workId);
        if($liking!=null){
                $favorite=new Favorite();
                $favorite->workId=$workId;
                $favorite->accountId=$request->user->id;
                $this->favoriteService->unLike($workId,$request->user->id);
                $this->favoriteService->decreaseLikeOfWork($workId);
                return response()->json(new DataResponse("success",null));
        }
        return response()->json(new DataResponse("Không tìm thấy lịch sử yêu thích",null));
    }

}