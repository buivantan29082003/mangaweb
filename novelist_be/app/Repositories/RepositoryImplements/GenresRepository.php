<?php

namespace App\Repositories\RepositoryImplements;
use App\Models\Genre;
use App\Repositories\RepoCommon;
use Illuminate\Database\Eloquent\Collection;

class GenresRepository implements RepoCommon{
    public function getAll(array $select = ['*'], array $with = []){
        return Genre::all();
    }
    public function getById($id,array $select = ['*'], array $with = []){

    }

    public function getByIds(array $ids,array $select = ['*'], array $with = []):Collection{
        return Genre::select($select)->with($with)->whereIn('id',$ids)->get();
    }


    public function insert($obj){

    }
    public function update($obj){

    }
    public function delete($obj){

    }
}