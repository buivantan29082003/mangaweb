<?php

namespace App\Services\User;

use App\Models\Plan;
use App\Models\RegistrationPlan;
use App\Models\Transaction;
use App\Repositories\RepositoryImplements\RegistrationRepository;

class RegistrationService{
    private RegistrationRepository $registrationRepo;

    public function getAll($select,$with,$plainId, $currentPage, $userId){
        return $this->registrationRepo->filterUser($select,$with,$plainId, $currentPage, $userId);
    }

    public function __construct(RegistrationRepository $registrationRepo)
    {
        $this->registrationRepo=$registrationRepo;
    }

    public function endedPlan(  int $planId){
        $this->registrationRepo->endedPlan( $planId);
    }

    public function insert(RegistrationPlan $transaction){
        $this->registrationRepo->insertTransaction($transaction);
    }
   
    public function checkExpireOfRegistration(int $userId, int $planId){
        return $this->registrationRepo->checkExpireOfRegistration($userId,$planId)!=null;
    }

    public function getCurrentPlan(int $userId):RegistrationPlan|null{
        return $this->registrationRepo->getCurrentPlanByUserId($userId);
    }

    public function getCurrentPlanLessThanPlanId(int $userId, int $planId):Plan{
        return $this->registrationRepo->checkExpireOfRegistration($userId,$planId);
    }

}