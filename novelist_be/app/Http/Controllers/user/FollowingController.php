<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;
use App\Models\Following;
use App\Response\DataResponse;
use App\Services\Common\ValidateType;
use App\Services\User\FollowService;
use App\Services\User\StoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowingController extends Controller{

    private FollowService $followService;
    private StoryService $storyService;

    public function __construct(FollowService $followService, StoryService $storyService)
    {
        $this->followService=$followService;
        $this->storyService=$storyService;
    }

    public function follow(int $workId,Request $request){
        
        if($this->followService->getByUserIdAndWorkId($request->user->id,$workId)==null){
            if($this->storyService->getByIdSimple($workId)!=null){
                try {
                    $following=new Following();
                    $following->accountId=Auth::guard("api")->user()->id;
                    $following->workId=$workId;
                    $this->followService->follow($following);
                    $this->followService->updateFollowForStory($workId);
                    return response()->json(new DataResponse("success !!!",null));
                } catch (\Throwable $th) {
                    return response()->json(new DataResponse($th->getMessage(),null),500);
                }
            }
            return response()->json(new DataResponse("Không tìm thấy truyện yêu cầu follow !!!",null),400);
        }
        return response()->json(new DataResponse("Bạn đã follow truyện !!!",null),400);
    }

    public function unFollow(int $workId,Request $request){
        if($this->followService->getByUserIdAndWorkId(Auth::guard("api")->user()->id,$workId)!=null){ 
            try {
                $this->followService->unFollow($workId,Auth::guard("api")->user()->id);
                $this->followService->updateFollowForStoryDecrement($workId);
                return response()->json(new DataResponse("success !!!",null)); 
            } catch (\Throwable $th) {
                return response()->json(new DataResponse($th->getMessage(),null),500);
            }
        }
        return response()->json(new DataResponse("Bạn chưa follow truyện !!!",null),400);
    }

    public function getFollowing(Request $request){
        $optionRequest=$request->query();
        $currentPage =ValidateType::validateInt($optionRequest['currentPage']?? null ,1);
        $query = $optionRequest['query'] ?? null;
        $data=$this->followService->getBookMarkChapter(Auth::guard("api")->user()->id, $query, $currentPage,["*"],['work:id,title,authorId,image', 'work.author:id,authorName']);
        return response()->json(new DataResponse("success",$data));
    }

}