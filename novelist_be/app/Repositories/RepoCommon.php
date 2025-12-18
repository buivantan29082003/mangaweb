<?php 

namespace App\Repositories;
interface RepoCommon {
    public function getAll(array $select = ['*'], array $with = []);
    public function getById($id,array $select = ['*'], array $with = []);
    public function insert($obj);
    public function update($obj);
    public function delete($obj); 
}