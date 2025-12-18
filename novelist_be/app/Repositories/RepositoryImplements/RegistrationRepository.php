<?php

namespace App\Repositories\RepositoryImplements;

use App\Models\RegistrationPlan;
use App\Models\Transaction;
use App\Repositories\RepoCommon;
use DateTime;
use Exception;
use Illuminate\Support\Facades\Log;
use Ramsey\Collection\Collection;

class RegistrationRepository implements RepoCommon
{


    public function filter($select = ["*"], $with = [], $startDate, $endDate,  $queryString,  $planId,  $currentPage, $status)
    {
        $query = RegistrationPlan::query();
        $query->select($select);
        $query->with($with);
        if ($queryString != null) {
            $query->whereHas('account', function ($q) use ($queryString) {
                $q->where('fullName', 'like', "%{$queryString}%");
            });
        }
        if ($planId != null) {
            $query->where("planId", $planId);
        }
        if($status!==null){ 
            $query->where("isEnded",$status);
        }
        if ($this->isStartDateBeforeEndDate($startDate, $endDate)) {

            $query->whereBetween('registrationDate', [$startDate, $endDate]);
        }
        $result = $query->paginate(10, ['*'], 'page', $currentPage);
        return $result;
    }

    public function filterUser($select, $with,$planId, $currentPage, $userId){
        $query = RegistrationPlan::query();
        $query->select($select);
        $query->with($with);
        
        if ($planId != null) {
            $query->where("planId", (int)$planId);
        }
        $query->where("accountId", $userId);
        $query->orderBy('id', 'desc');
        $result = $query->paginate(10, ['*'], 'page', $currentPage);
        return $result;
    }   

    function isStartDateBeforeEndDate(string|null $startDate, string|null $endDate): bool
    {
        if ($startDate == null || $endDate == null) {
            return false;
        }
        try {
            $start = new DateTime($startDate);
            $end   = new DateTime($endDate);

            return $start < $end;
        } catch (Exception $e) {
            return false; // sai format datetime
        }
    }




    public function checkExpireOfRegistration(int $userId, int $planId)
    {
        $record = RegistrationPlan::where('accountId', $userId)
            ->where('expireDate', '>=', now())
            ->where('registrationDate', '<=', now())
            ->where('planId', '>=', $planId)
            ->where('isEnded', 0)
            ->first();
        return $record;
    }

    public function getCurrentPlanByUserId(int $userId): RegistrationPlan|null
    {
        $record = RegistrationPlan::where('accountId', $userId)
            ->where('expireDate', '>=', now())
            ->where('registrationDate', '<=', now())
            ->where('isEnded', 0)
            ->first();
        return $record;
    }

    public function endedPlan(int $planId)
    {
        RegistrationPlan::where('id', $planId)
            ->update([
                'isEnded' => 1
            ]);
    }

    public function getAll(array $select = ['*'], array $with = [])
    {
        // return Plan::all();
    }
    public function getById($id, array $select = ['*'], array $with = []) {}

    public function insertTransaction(RegistrationPlan $transaction)
    {
        $transaction->save();
    }

    public function insert($obj)
    {
        $registrationPlan = new RegistrationPlan();
        $registrationPlan->fill($obj);
        $registrationPlan->save();
    }
    public function update($obj) {}
    public function delete($obj) {}
}
