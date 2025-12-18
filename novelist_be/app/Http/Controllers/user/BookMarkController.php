<?php
namespace App\Http\Controllers\User;

use App\Response\DataResponse;
use App\Services\Common\ValidateType;
use App\Services\User\BookMarkService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookMarkController{

    private BookMarkService $bookMarkService;

    public function __construct(BookMarkService $bookMarkService)
    {
        $this->bookMarkService=$bookMarkService;
    }

    function getBookMarkChapter(Request $request){
        $optionRequest=$request->query();
        $currentPage =ValidateType::validateInt($optionRequest['currentPage']?? null ,1);
        $query = $optionRequest['query'] ?? null;
        $data=$this->bookMarkService->getBookMarkChapter(Auth::guard("api")->user()->id, $query, $currentPage,["*"],['chapter:id,chapterName,workId','chapter.work:id,image,title' ]);
        return response()->json(new DataResponse("success",$data));
    }

}