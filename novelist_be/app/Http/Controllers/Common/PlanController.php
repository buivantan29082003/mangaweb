<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Response\DataResponse;
use App\Services\User\PlanService;

class PlanController extends Controller{

    private PlanService $planService;

    public function __construct(PlanService $planService)
    {
        $this->planService=$planService;
    }

    public function getAll(){
        return new DataResponse("success",$this->planService->getAll());
    }
}