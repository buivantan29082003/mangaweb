<?php

namespace App\Services\User;

use App\Models\Work;
use App\Repositories\RepositoryImplements\FavoriteRepository;
use App\Repositories\RepositoryImplements\FollowRepository;
use App\Repositories\RepositoryImplements\WorksRepository  ;
use App\Response\PageResponse;
use App\Services\Common\ValidateType;
use App\Services\ServiceInterface;
use Illuminate\Support\Facades\Log; 

class StoryService  
{

    protected WorksRepository $workRepo;
    private FollowRepository $followRepo;
    private FavoriteRepository $favoriteRepo;

    
     

    public function __construct(WorksRepository $workRepository,FollowRepository $followRepo,FavoriteRepository $favoriteRepo){
         $this->workRepo = $workRepository;
        $this->followRepo = $followRepo;
        $this->favoriteRepo = $favoriteRepo;
    }

    public function getByIdSimple($id)
    {
        if(!ValidateType::validateInt($id,-1)){
            return null;
        }
        $work=$this->workRepo->getById($id); 
        return $work;
    }


    public function getById($id,$userId)
    {
        if(!ValidateType::validateInt($id,-1)){
            return null;
        }
        $work=$this->workRepo->getById($id);
        if($work!=null){ 
            $work->isFollow=$this->followRepo->getByUserIdAndWorkId($userId,$work->id);
            $work->isLike=$this->favoriteRepo->getByUserIdAndWorkId($userId,$work->id);
        }
        return $work;
    }

    public function checkIsLike():bool{

        return true;
    }


    public function getAll(array $columns, array $with,array $options){ 
        $data=new PageResponse($this->workRepo->getAll($columns,$with,$options));
        return $data;
    }

    

    public function nameNovel(): string
    { 
        return "CO CAI LOL";
    }
}
