<?php
namespace App\Services\User;

use App\Models\Library;
use App\Repositories\RepositoryImplements\ChapterRepository;
use App\Response\PageResponse;

class ChapterService{

    private ChapterRepository $chapterRepo;

    public function __construct(ChapterRepository $chapterRepo)
    {
        $this->chapterRepo=$chapterRepo;
    }

    public function getByWorkId($workId,$queryString,$currentPage){
        $data= $this->chapterRepo->getByWorkId($workId,$queryString,$currentPage,["plan"]);
        
        return new PageResponse($data);
    }

    public function bookMark(Library $lib){
        $this->chapterRepo->bookMark($lib);
    }

    public function unBookMark(int $accountId, int $chapterId){
        $this->chapterRepo->unBookMark($accountId, $chapterId);
    }

    public function checkIsBookMark(int $accountId,int $chapterId):bool{
        return $this->chapterRepo->checkIsBookMark($accountId,$chapterId);
    }

    public function getById(int $chapterId, array $select=["*"], array $with=["*"]){
        return $this->chapterRepo->getById($chapterId,$select,$with);
    }
}