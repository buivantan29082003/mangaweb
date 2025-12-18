<?php
namespace App\Services\User;

use App\Repositories\RepositoryImplements\NotificationRepository;

class NotificationService {
    
    private NotificationRepository $notificationRepo;

    public function __construct(NotificationRepository $notificationRepo)
    {
        $this->notificationRepo=$notificationRepo;
    }

    public function getNotificationItemByAccountIdAndNotiId($select, $with, $accountId,$notificationId){
        return $this->notificationRepo->getNotificationByAccountIdAndNotificationId($select, $with, $accountId,$notificationId);
    }

    public function setReaded($accountId, $notiId){
        $this->notificationRepo->setReaded($accountId, $notiId);
    }

    public function countNotificationIsNotReaded(int $accountId):int{
        return $this->notificationRepo->countNotificationIsNotReaded($accountId);
    }

    public function getNotification($select,$with,$accountId,$isReaded, $currentPage){
        $data=$this->notificationRepo->getNotification($select,$with,$accountId,$isReaded, $currentPage);
        return $data;
    }

}