<?php
namespace App\Repositories\RepositoryImplements;

use App\Models\Account;
use App\Models\Author;
use App\Repositories\RepoCommon;

class AuthorRepository implements RepoCommon{
    public function getAll(array $select = ['*'], array $with = []){
        $authors=Author::query();
        $authors->select($select);
        return $authors->get();
    }
    public function getById($id,array $select = ['*'], array $with = []):Author{
        $account=Author::find($id);
        return $account; 
    }
    public function insert($obj){

    }
    public function update($obj){

    }
    public function delete($obj){

    }
}