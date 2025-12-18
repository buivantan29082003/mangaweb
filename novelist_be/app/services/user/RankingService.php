<?php

namespace App\Services\User;
use App\Models\Work;
use App\Repositories\RepositoryImplements\WorksRepository;
use App\Response\DataResponse;
use Illuminate\Support\Facades\Log;

class RankingService{ 
    private WorksRepository $workService;

    public function __construct(WorksRepository $workService)
    {
        $this->workService=$workService;
    }

    public function getTopTenViewed(){
        Log::info("Chào ");
        return new DataResponse("success",$this->workService->getTopTenViewed());
    }

    public function getTopThreeViewed(){
        return new DataResponse("success",$this->workService->getTopThreeViewed());
    }

}