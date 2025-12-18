<?php

namespace App\Repositories\RepositoryImplements;

use App\Models\Favorite; 
use App\Repositories\RepoCommon;

class FavoriteRepository implements RepoCommon{

    public function getByUserIdAndWorkId(int $userId,int $workId):bool{
       return Favorite::where('workId', $workId)
                    ->where('accountId', $userId)
                    ->exists(); 
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