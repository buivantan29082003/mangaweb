<?php

namespace App\Services\Admin;

use App\Repositories\RepositoryImplements\AccountRepository;

class AccountService{
    private AccountRepository $accountRepo;

    public function __construct(AccountRepository $accountRepo)
    {
        $this->accountRepo=$accountRepo;
    }

    public function filter($select,$query, $status, $currentPage){
        return $this->accountRepo->filters($select,$query,$status,$currentPage);
    }

    public function getById($select,$id){
        return $this->accountRepo->getById($id,$select,[]);
    }

    public function updateStatus(int $status, int $accountId){
        $this->accountRepo->updateStatus($status, $accountId);
    }

}