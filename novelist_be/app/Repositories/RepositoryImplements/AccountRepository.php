<?php
namespace App\Repositories\RepositoryImplements;

use App\Models\Account;
use App\Repositories\RepoCommon;
use Illuminate\Support\Facades\Log;

class AccountRepository implements RepoCommon{
    public function getAll(array $select = ['*'], array $with = []){
         
    }

    public function filters($select=["*"],$queryString, $status, $currentPage){
        $query=Account::query();
        $query->select($select);
        if ($queryString !== null && $queryString !== '') {
            $query->where(function ($q) use ($queryString) {
                $q->where('fullName', 'like', "%{$queryString}%")
                ->orWhere('id', 'like', "%{$queryString}%");
            });
        } 
        if($status!==null){ 
            $query->where("isActive",(int)$status);
        }
        $query->where("role","user");
        $result = $query->paginate(10, ['*'], 'page', $currentPage);
        return $result;
    }

    public function getById($id,array $select = ['*'], array $with = []){
        return Account::find($id, $select);
    }
    public function updateStatus(int $status, int $accountId){
        Account::find($accountId)->update([
            "isActive"=>$status
        ]);
    }
    public function insert($obj){

    }
    public function update($obj){

    }
    public function delete($obj){

    }
}