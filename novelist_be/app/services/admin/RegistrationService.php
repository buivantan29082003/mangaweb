<?php
namespace App\Services\Admin;
use App\Repositories\RepositoryImplements\RegistrationRepository;

class RegistrationService {

    private RegistrationRepository $registrationRepo;

    public function __construct(RegistrationRepository $registrationRepo)
    {
        $this->registrationRepo=$registrationRepo;
    }

    public function filter($select, $with, $startDate, $endDate,  $query,  $planId, $currentPage, $status){
        return $this->registrationRepo->filter($select, $with, $startDate, $endDate, $query, $planId, $currentPage, $status);
    }

}