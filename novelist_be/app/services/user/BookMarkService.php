<?php

namespace App\Services\User;

use App\Repositories\RepositoryImplements\BookMarkRepository;
use App\Response\PageResponse;

class BookMarkService{
    private BookMarkRepository $bookMarkRepo;

    public function __construct(BookMarkRepository $bookMarkRepo)
    {
        $this->bookMarkRepo=$bookMarkRepo;
    }

    public function getBookMarkChapter(int $accountId, string|null $query,int $currentPage, array $select=["*"], array $with=[]){
        return new PageResponse($this->bookMarkRepo->getBookMarkChapter($accountId, $query, $currentPage, $select, $with));
    }

}