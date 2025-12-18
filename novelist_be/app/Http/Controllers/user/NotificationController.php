<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;
use App\Response\DataResponse;
use App\Response\PageResponse;
use App\Services\Common\ValidateType;
use App\Services\User\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller{
    private NotificationService $notificationService;


    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService=$notificationService;
    }

    public function getNotifications(Request $request){ 
        $account=Auth::guard("api")->user(); 
        $currentPage = ValidateType::validateInt($request->query('currentPage', 1)?? null ,1);
        $isReaded = ValidateType::validateInt($request->query('isReaded', 1)?? null ,null);
        Log::info($isReaded);
        $data=$this->notificationService->getNotification("*",["notification"],$account->id,$isReaded, $currentPage);
        return new DataResponse("success",new PageResponse($data));
    }

    public function setReaded(int $notificationId){
        $account=Auth::guard("api")->user();
        $notiItem=$this->notificationService->getNotificationItemByAccountIdAndNotiId(["*"],[],$account->id, $notificationId);
        if($notiItem!=null){
            $this->notificationService->setReaded($account->id, $notificationId);
            return new DataResponse("success","Update successfully");    
        }
        return response()->json(new DataResponse("fail","Not found notification",true),400);

    }


    public function countNotificationIsNotReaded(){
        $accountId=Auth::guard("api")->user();
        $count=$this->notificationService->countNotificationIsNotReaded($accountId->id);
        return new DataResponse("success",$count);
    }

}