<?php

namespace App\Repositories\RepositoryImplements;
use App\Models\Following;
use App\Repositories\RepoCommon;

class FollowRepository implements RepoCommon{

    public function getByUserIdAndWorkId(int $userId,int $workId):bool{
       return Following::where('workId', $workId)
                    ->where('accountId', $userId)
                    ->exists(); 
    }

    public function getFollowing(int $accountId,string|null $queryString,int $currentPage, array $select=["*"], array $with=[]){
        $query = Following::query();
        $query->where('accountId', $accountId);
        $query->with($with); 
        if ($queryString != null) {
            $query->whereHas('work', function($q) use ($queryString) {
                $q->where('title', 'like', "%{$queryString}%"); // chắc chắn cột đúng
            });
        } 
        $query->orderBy('createdDate', 'desc');
        $result = $query->paginate(10, ['*'], 'page', $currentPage); 
        return $result;

    }

    public function getAll(array $select = ['*'], array $with = []){

    }
    public function getById($id,array $select = ['*'], array $with = []){

    }
    public function insert($obj){

    }
    public function update($obj){

    }
    public function delete($obj){

    }
}