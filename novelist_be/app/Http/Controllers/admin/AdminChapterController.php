<?php
namespace App\Http\Controllers\Admin;

use App\DTO\DTORequest\ChapterInsert;
use App\Http\Controllers\Controller;
use App\Response\DataResponse;
use App\Services\Admin\AdminChapterService;
use App\Services\User\PlanService;
use Illuminate\Http\Request;

class AdminChapterController extends Controller{

    private AdminChapterService $chapterService;
    private PlanService $planService;

    public function __construct(AdminChapterService $chapterService, PlanService $planService)
    {
        $this->chapterService=$chapterService;
        $this->planService=$planService;
    }

    public function getById(int $chapterId){
        $chapter= $this->chapterService->getById($chapterId,["*"],[]);
        return new DataResponse("success",$chapter);
    }


    public function updateChapter(int $chapterId,Request $request){
        $validator=ChapterInsert::validator($request->all());
        if($validator->stopOnFirstFailure()->fails()){
            $errors=$validator->errors()->first();
            return response()->json(new DataResponse("Request is not valid",$errors,true),400); 
        }
        $chapterDTP=ChapterInsert::from($request); 
        $chapter=$chapterDTP->generateWorkModel(); 
        if($this->chapterService->getById($chapterId,["id"],[])==null){
            return response()->json(new DataResponse("fail","Not found chapter", true),400);
        }
        if($chapter->planId!=null&&$this->planService->getById($chapter->planId,["id"],[])==null){
            return response()->json(new DataResponse("Data is Not valid","Not found plan you select",true),400);
        } 
        $chapter->id=$chapterId; 
        $this->chapterService->updateChapter($chapter);
        return response()->json(new DataResponse("Insert successfully","Update successfully",false));
    }

}