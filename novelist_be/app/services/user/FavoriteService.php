<?php
namespace App\Services\User;

use App\Models\Favorite;
use App\Models\Work;
use App\Repositories\RepositoryImplements\FavoriteRepository;

class FavoriteService{
    private FavoriteRepository $followRepo;

    public function __construct(FavoriteRepository $followRepo)
    {
        $this->followRepo=$followRepo;
    }

    public function like(Favorite $favorite){
        $favorite->save();
    }

    public function increaseLikeOfWork($workId){
        Work::where('id', $workId)->increment('like', 1); 
    }

    public function decreaseLikeOfWork($workId){
        Work::where('id', $workId)->decrement('like', 1); 
    }

    public function unLike($workId, $accountId){
        Favorite::where('workId', $workId)
        ->where('accountId', $accountId)
        ->delete();
    }

    public function getByUserIdAndWorkId(int $userId,int $workId):bool{
        return $this->followRepo->getByUserIdAndWorkId($userId,$workId);
    }
}