<?php

namespace App\Services\User;

use App\Models\Plan;
use App\Repositories\RepositoryImplements\PlanRepository;

class PlanService{
    private PlanRepository $planRepo;

    public function __construct(PlanRepository $planRepo)
    {
        $this->planRepo=$planRepo;
    }

    public function getAll(array $select=["*"], array $with=[]){
        return $this->planRepo->getAll($select,$with);
    }

    public function getCurrentPlanLessThanPlanId(int $priorit):Plan|null{
        return null;
    }

    public function getById(int $id,array $select=["*"], array $with=[]){
        return $this->planRepo->getById($id,$select,$with);
    }

}