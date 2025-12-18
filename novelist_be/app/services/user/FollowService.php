<?php
namespace App\Services\User;

use App\Models\Following;
use App\Models\Work;
use App\Repositories\RepositoryImplements\FollowRepository;
use App\Response\PageResponse;

class FollowService{

    private FollowRepository $followRepo;

    public function __construct(FollowRepository $followRepo)
    {
        $this->followRepo=$followRepo;
    }

    public function follow(Following $following){
        $following->save();
    }

    public function updateFollowForStory($workId){
        Work::where('id', $workId)->increment('following', 1);  
    }

    public function updateFollowForStoryDecrement($workId){
        Work::where('id', $workId)->decrement('following', 1);  
    }

    public function unFollow($workId, $accountId){
        Following::where('workId', $workId)
        ->where('accountId', $accountId)
        ->delete();
    }
    

    public function getBookMarkChapter(int $accountId, string|null $query,int $currentPage, array $select=["*"], array $with=[]){
        return new PageResponse($this->followRepo->getFollowing($accountId, $query, $currentPage, $select, $with));
    }

    public function getByUserIdAndWorkId(int $userId,int $workId):bool{
        return $this->followRepo->getByUserIdAndWorkId($userId,$workId);
    }

}