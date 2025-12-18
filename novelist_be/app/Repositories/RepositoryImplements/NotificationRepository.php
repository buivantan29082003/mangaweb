<?php

namespace App\Repositories\RepositoryImplements;
use App\Models\NotificationItem;
use App\Repositories\RepoCommon;
use Illuminate\Database\Eloquent\Collection;

class NotificationRepository implements RepoCommon{
    public function getAll(array $select = ['*'], array $with = []){
         
    }
    public function getById($id,array $select = ['*'], array $with = []){

    }

    public function getNotificationByAccountIdAndNotificationId($select, $with, $accountId, $notiId){
        return NotificationItem::select($select)->with($with)->where("accountId",$accountId)->where("notificationId",$notiId)->first();
    }

    public function setReaded($accountId, $notificationId){
        NotificationItem::where("accountId",$accountId)->where("notificationId", $notificationId)->update([
            "isReaded"=>1
        ]);
    }

    public function countNotificationIsNotReaded(int $accountId):int{
        $count=NotificationItem::where("accountId", $accountId)
        ->where("isReaded",0)    
        ->count();
        return $count;
    }

    public function getNotification($select, $with,$accountId, $isReaded, $currentPage){
        $query=NotificationItem::query();
        $query->select($select);
        $query->with($with);
        if($isReaded!=1){
            $query->where("isReaded",0);
        }
        $query->where('accountId', $accountId) 
        ->orderBy('notificationId', 'desc');

        $result = $query->paginate(10, ['*'], 'page', $currentPage);
        return $result;
    }

    public function getByIds(array $ids,array $select = ['*'], array $with = []){
         
    }


    public function insert($obj){

    }
    public function update($obj){

    }
    public function delete($obj){

    }
}