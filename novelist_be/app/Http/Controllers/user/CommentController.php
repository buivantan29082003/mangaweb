<?php

namespace App\Http\Controllers\User;

use App\DTO\DTORequest\CommentDTO;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Repositories\RepositoryImplements\WorksRepository;
use App\Response\DataResponse;
use App\Services\Common\ValidateType;
use App\Services\User\CommentService;
use App\Services\User\StoryService;
use Carbon\Carbon; 
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class CommentController extends Controller
{
    private CommentService $commentService;

    private StoryService $workService;

    public function __construct(CommentService $commentService, StoryService $workService)
    {
        $this->commentService=$commentService;
        $this->workService=$workService;
    }

    public function addComment(Request $request)
    {
        try {
            $comment = CommentDTO::from($request);
            $work=$this->workService->getByIdSimple($comment->workId);
            if($work!=null){
                if($comment->parentId!=null){
                    $commentParent=$this->commentService->checkCommentIsExits($comment->parentId);
                    if($commentParent==null||$commentParent->workId!=$comment->workId){
                        return response()->json(new DataResponse("Không tìm thấy ",null),400);
                    } 
                }
                $commentSave = new Comment();
                $commentSave->accountId = $commentDTO->accountId ?? null;
                $commentSave->workId = $comment->workId;
                $commentSave->content = $comment->content;
                $commentSave->parentId = $comment->parentId ?? null;
                $commentSave->createdDate = Carbon::now();  
                $commentSave->accountId=$request->user->id;
                $this->commentService->addComment($commentSave);
                $commentSave->account=$request->user;
                $commentSave->childrenCount=0; 
                return response()->json(new DataResponse("success",$commentSave));
            } 
            return response()->json(new DataResponse("Không tìm thấy truyện cần thêm",null),400);

        } catch (ValidationException $e) { 
            return response()->json(new DataResponse($e,null), 422);
        }
    }

    public function getByWorkId($workId, Request $request){
        $currentPage = ValidateType::validateInt($request->query('currentPage', 1)?? null ,1);
        $query = $request->query('query', 1) ?? null; 
        $data=$this->commentService->getByWorkId($workId,$currentPage,['account:id,fullName,avatar']);
        return new DataResponse("success",$data);
    }
    public function getByCommentId($commentId, Request $request){
        $currentPage = ValidateType::validateInt($request->query('currentPage', 1)?? null ,1);
        $query = $request->query('query', 1) ?? null; 
        $data=$this->commentService->getByCommentId($commentId,$currentPage,['account:id,fullName,avatar']);
        return new DataResponse("success",$data);
    }

    

}
