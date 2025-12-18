<?php

use App\Models\Notification;
use App\Services\Common\Task;
use App\Models\NotificationItem;
class SendNotificationPayment implements Task{
    
    private int $registrationId;
    private string $planName;
    private string $link="/user/yourpackage";
    private int $accountId;


    public function execute()
    {
        $this->saveNotification();
    }

    public function setBaseInfo(int $accountId, int $registrationId,string $planName){
        $this->registrationId=$registrationId;
        $this->accountId=$accountId;
        $this->planName=$planName;
    }

    public function saveNotification( ){
        $not=new Notification();
        $not->createdDate=now();
        $not->title="Congratulation!. Your package is registed successfully";
        $not->content="Chúc mừng bạn đã đăng ký thành công gói ".$this->planName . ". Từ thời điểm này bạn hoàn toàn có thể sử dụng các dịch vụ thuộc gói, Chân thành cám ơn ban.";
        $not->data=$this->registrationId;
        $not->link=$this->link;
        $not->save();
        $notItem=new NotificationItem();
        $notItem->notificationId=$not->id;
        $notItem->accountId=$this->accountId;
        $notItem->save();
    }

}