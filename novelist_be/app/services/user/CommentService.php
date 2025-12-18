<?php
namespace App\Services\User;

use App\Models\Comment;
use App\Repositories\RepositoryImplements\CommentRepository;
use App\Response\PageResponse;

class CommentService{
    

    private CommentRepository $commentRepo;

    public function __construct( CommentRepository $commentRepo)
    {
        $this->commentRepo=$commentRepo;
    }

    public function addComment(Comment $comment){
        $comment->save(); 
    }

    public function checkCommentIsExits(int $commentId){
        return $this->commentRepo->getCommentById($commentId);
    }


    public function getByWorkId($workId,$currentPage,$with){
        return new PageResponse($this->commentRepo->getByWorkId($workId,$currentPage,$with));
    }

    public function getByCommentId($commentId, $currentPage,$with){
        return new PageResponse($this->commentRepo->getByCommentId($commentId,$currentPage,$with));
    }

}