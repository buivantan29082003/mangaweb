<?php

namespace App\Repositories\RepositoryImplements;
use App\Models\Plan;
use App\Models\RegistrationPlan;
use App\Models\Transaction;
use App\Repositories\RepoCommon;

class TransactionRepository implements  RepoCommon{

    public function getAll(array $select = ['*'], array $with = []){
        // return Plan::all();
    }
    public function getById($id,array $select = ['*'], array $with = []){
        return Transaction::select($select)->where("id",$id)->first();
    }

    

   
    public function insertTransaction(Transaction $obj){
          $obj->save();
    }

    public function completeTransaction($id, $transactionId ){
        Transaction::where('id', $id) 
        ->update([
            'transactionId' => $transactionId
        ]);
    }

    public function insert($obj){
          $obj->save();
    }
    public function update($obj){

    }
    public function delete($obj){

    }
}