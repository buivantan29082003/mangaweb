<?php

namespace App\Repositories\RepositoryImplements;

use App\Models\Library;

class BookMarkRepository{
    public function getBookMarkChapter(int $accountId,string|null $queryString,int $currentPage, array $select=["*"], array $with=[]){
        $query = Library::query();
        $query->where('accountId', $accountId);
        $query->with($with); 
        if ($queryString != null) {
            $query->whereHas('chapter', function($q) use ($queryString) {
                $q->where('chapterName', 'like', "%{$queryString}%"); // chắc chắn cột đúng
            });
        }

        $query->orderBy('createdDate', 'desc');
        $result = $query->paginate(10, ['*'], 'page', $currentPage);

        return $result;

    }
}