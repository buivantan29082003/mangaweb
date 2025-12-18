<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Response\DataResponse;
use App\Response\PageResponse;
use App\Services\Admin\RegistrationService;
use App\Services\Common\ValidateType;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RegistrationController extends Controller{

    public  static int $count=1;
    
    private RegistrationService $registrationService;

    public function __construct(RegistrationService $registrationService)
    {
        $this->registrationService=$registrationService;
    }

    public function getAllRegistration(Request $request){ 
        $optionRequest = $request->query(); 
        $currentPage = ValidateType::validateInt($optionRequest['currentPage']?? null ,1); 
        $status = ValidateType::validateInt($optionRequest['status']?? null ,null);  
        $query = $optionRequest['query'] ?? null;
        $startDate = $optionRequest['startDate'] ?? null;
        $endDate = $optionRequest['endDate'] ?? null; 
        $planId = ValidateType::validateInt($optionRequest['planId']?? null ,null); 
        $data=$this->registrationService->filter(["*"],["account:fullName,id,avatar","transaction","plan"],$startDate,$endDate,$query,$planId,$currentPage,$status);
        return new DataResponse("success",new PageResponse($data));
    }

}