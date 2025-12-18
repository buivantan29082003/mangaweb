<?php

namespace App\Services\User;

use App\Models\Transaction;
use App\Repositories\RepositoryImplements\TransactionRepository;

class TransactionService {

    private TransactionRepository $transactionRepo;

    public function __construct(TransactionRepository $transactionRepo)
    {
        $this->transactionRepo=$transactionRepo;
    }

    public function getById($id){
        return $this->transactionRepo->getById($id,["*"], []);
    }

    public function completeTransaction($id, $transactionId){
        $this->transactionRepo->completeTransaction($id, $transactionId);
    }

    public function insert(Transaction $transaction){
        $this->transactionRepo->insertTransaction($transaction);
    }
}