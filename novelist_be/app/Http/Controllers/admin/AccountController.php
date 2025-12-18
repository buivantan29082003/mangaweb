<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Response\DataResponse;
use App\Response\PageResponse;
use App\Services\Admin\AccountService;
use App\Services\Common\ValidateType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AccountController extends Controller{
    private AccountService $accountService;

    public function __construct(AccountService $accountService)
    {
        $this->accountService=$accountService;
    }

    public function getAll(Request $request){
       $optionRequest = $request->query();
        $currentPage = ValidateType::validateInt($optionRequest['currentPage']?? null ,1); 
        $status = ValidateType::validateInt($optionRequest['status']?? null ,null);  
        $query = $optionRequest['query'] ?? null; 
        $data=$this->accountService->filter(["*"],$query,$status, $currentPage);
        return new DataResponse("success",new PageResponse($data));
    }

    public function makeStatus(int $accountId, int  $status ){
        $account=$this->accountService->getById(["*"],$accountId);
       
        if($account==null||$account->role!=="user"){
            return response()->json(new DataResponse("fail","Not found user"),400);
        }
        if($status!=1&&$status!=0){
            return response()->json(new DataResponse("fail","Status is not valid"),400);
        }
        $this->accountService->updateStatus($status, $accountId);
    }

}