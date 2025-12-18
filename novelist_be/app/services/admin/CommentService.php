<?php

namespace App\Services\Admin;
use App\Repositories\RepositoryImplements\CommentRepository;
use App\Response\DataResponse;

class CommentService{
    private CommentRepository $commentRepo;

    public function __construct(CommentRepository $commentRepo)
    {
        $this->commentRepo=$commentRepo;
    }

    public function getById(int $commentId,$select,$with){
        return $this->commentRepo->getById($commentId,$select,$with);
    }

    public function delete(int $commentId){  
            $this->commentRepo->delete($commentId);  
    }

}