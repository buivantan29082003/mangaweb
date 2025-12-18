<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Library;
use App\Response\DataResponse;
use App\Services\Common\ValidateType;
use App\Services\User\ChapterService;
use App\Services\User\RegistrationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ChapterController extends Controller
{
    private ChapterService $chapterService;
    private RegistrationService $registrationService;

    public function __construct(ChapterService $chapterService, RegistrationService $registrationService)
    {
        $this->chapterService=$chapterService;
        $this->registrationService=$registrationService;
    }

    public function handleBookMark(int $isBookMark, int $chapterId, Request $request){ 

        if($isBookMark==1){
            if($this->chapterService->checkIsBookMark(Auth::guard("api")->user()->idd, $chapterId)==false){
                $lib=new Library();
                $lib->accountId=Auth::guard("api")->user()->id;
                $lib->chapterId=$chapterId;
                $this->chapterService->bookMark($lib);
            }else{
                return response()->json(new DataResponse("You already bookmarked this chapter !", null, true), 400);
            } 
        }else{
            
            $this->chapterService->unBookMark(Auth::guard("api")->user()->id, $chapterId);
        }
        return response()->json(new DataResponse("succcessfully", null, false), 200);
    }

    public function getById(int $chapterId, Request $request){
        $chapter= $this->chapterService->getById($chapterId,["*"],["plan","work:id,name,title,content,authorId,image","work.author:id,authorName"]);
        if($chapter->plan!=null){
            if($this->registrationService->checkExpireOfRegistration(Auth::guard("api")->user()->id,$chapter->plan->id)==false){
                return response()->json(new DataResponse("chapter requires a plan " . $chapter->plan->planName ." subsription",$chapter->plan,true));
            }
        } 
        $chapter->isBookMark=$this->chapterService->checkIsBookMark(Auth::guard("api")->user()->id, $chapterId);
        return response()->json(new DataResponse("success",$chapter));
    }
    
    public function getByWorkId($workId, Request $request){
        $currentPage = ValidateType::validateInt($request->query('currentPage', 1)?? null ,1);
        $query = $request->query('query', null) ?? null; 
        $data=$this->chapterService->getByWorkId($workId,$query,$currentPage);
        return new DataResponse("success",$data);
    }
}
