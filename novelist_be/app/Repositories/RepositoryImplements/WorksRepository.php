<?php 
namespace App\Repositories\RepositoryImplements;
use App\Models\Work;
use App\Models\WorksGenre;
use App\Repositories\RepoCommon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class WorksRepository implements RepoCommon{ 
 
    protected $propNames = [
        'id'          => 'id',
        'name'        => 'name',
        'title'       => 'title',
        'authorName'  => 'author_name',
        'createdAt'   => 'created_at',
        'updatedAt'   => 'updated_at',
    ];

    public function getTopTenViewed(){
        $query=Work::query();
        $query->select(["id","name","title","newChapter","view","like","image"]);
        $query->orderBy("view", "DESC");
        $data= $query-> limit(10)->get(); 
        return $data;
    }

    public function updateInsertChapter(int $chapterIndex,int $workId){
        Work::find($workId)->update([
            "newChapter"=>$chapterIndex,
            "updatedDate"=>now()
        ]);
    }

    public function insertWork(Work $work){
        $work->save();
    }

    public function getTopThreeViewed(){
        $query=Work::query();
        $query->select(["id","name","title","newChapter","view","like","image","authorId"]);
        $query->with("author:id,authorName");
        $query->orderBy("view", "DESC");
        $data= $query-> limit(3)->get(); 
        return $data;
    }
    
    public function getAll(array $select = ['*'], array $with = [],array $options = []):LengthAwarePaginator{
        $works=Work::query(); 
        $works->select($select); 
        if($with!=null){
            $works->with($with);
        }   
        if ($options['query'] !== null) {
            $works->where('name', 'like', '%' . $options['query'] . '%');
        } 
        if ($options['authors'] !== null && count($options['authors']) > 0) {
            $works->whereIn('authorId', $options['authors']);
        } 
        if ($options['genres'] !== null && count($options['genres']) > 0) { 
            $workInGenreIds = WorksGenre::whereIn('genreId', $options['genres'])
                ->pluck('workId')
                ->toArray(); 
            if (!empty($workInGenreIds)) {
                $works->whereIn('id', $workInGenreIds);
            }
        } 
        $result = $works->paginate(5, ['*'], 'page', $options["currentPage"]); 
        return $result;    
    }
    public function getById($id,array $select = ['*'], array $with = []){
        $query=Work::query();
        $query->with("author","genres","statusWork");
        $work=$query->find($id);
        return $work;
    }
    public function insert($work){

    }
    public function update($work){

    }
    public function delete($work){

    }
}