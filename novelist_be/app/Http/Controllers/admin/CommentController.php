<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Response\DataResponse;
use App\Services\Admin\CommentService;

class CommentController extends Controller{

    private CommentService $commentService;

    public function __construct(CommentService $commentService)
    {   
        $this->commentService=$commentService; 
    }


    public function delete(int $commentId){
        if($this->commentService->getById($commentId,["id"],[])!=null){
            $this->commentService->delete($commentId);
            return new DataResponse("success","success");
        }
        return response()->json(new DataResponse("fail","Not found comment which yoi require"),400);
    }

}