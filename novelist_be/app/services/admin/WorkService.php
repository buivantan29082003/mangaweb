<?php
namespace App\Services\Admin;

use App\Models\Chapter;
use App\Models\Work;
use App\Models\WorksGenre;
use App\Repositories\RepositoryImplements\AuthorRepository;
use App\Repositories\RepositoryImplements\ChapterRepository;
use App\Repositories\RepositoryImplements\FavoriteRepository;
use App\Repositories\RepositoryImplements\FollowRepository;
use App\Repositories\RepositoryImplements\GenresRepository;
use App\Repositories\RepositoryImplements\WorksRepository;
use App\Response\PageResponse;
use App\Services\Common\ValidateType;

class WorkService {
    protected WorksRepository $workRepo;
    private FollowRepository $followRepo;
    private FavoriteRepository $favoriteRepo; 
    private AuthorRepository $authorRepo;
    private GenresRepository $genreRepo;

    public function __construct(GenresRepository $genreRepo,WorksRepository $workRepository,FollowRepository $followRepo,FavoriteRepository $favoriteRepo,  AuthorRepository $authorRepo){
         $this->workRepo = $workRepository;
        $this->followRepo = $followRepo;
        $this->favoriteRepo = $favoriteRepo;
        $this->authorRepo=$authorRepo;
        $this->genreRepo=$genreRepo;
    }

    public function updateNewChapter(int $chapterIndex, int $workId){
        $this->workRepo->updateInsertChapter($chapterIndex, $workId);
    }

    public function checkAuthorIsRight(int $authorId):bool{
        return $this->authorRepo->getById($authorId,["id"],[])!=null;
    }

    public function checkGenresIsRight(array  $genres):bool{
        return $this->genreRepo->getByIds($genres,["id"],[])->count()===count($genres);
    }

    public function saveWork(Work $work){
        $this->workRepo->insertWork($work);
    }

    public function addChapter(Chapter $c){
        $c->save();
    }

    

    public function saveWorkGenre(array $workGenres){
        WorksGenre::insert($workGenres);
    }

    public function getLatesChapter(int $workId):int|null{
        return Chapter::select("id")->where('workId', $workId)->max('chapterIndex');
    }

    public function getAll(array $columns, array $with,array $options){ 
        $data=new PageResponse($this->workRepo->getAll($columns,$with,$options));
        return $data;
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
}