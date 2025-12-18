<?php

namespace App\Repositories\RepositoryImplements;
use App\Models\Plan;
use App\Repositories\RepoCommon;

class PlanRepository implements  RepoCommon{

    public function getAll(array $select = ['*'], array $with = []){
        return Plan::all();
    }
    public function getById($id,array $select = ['*'], array $with = []){
        return Plan::select($select)->find($id);
    }
    public function insert($obj){

    }
    public function update($obj){

    }
    public function delete($obj){

    }
}