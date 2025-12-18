<?php
namespace App\Repositories\RepositoryImplements;

use App\Models\Comment;
use App\Repositories\RepoCommon;

class CommentRepository implements RepoCommon{
    

    public function getByWorkId($workId, $currentPage, $with){
        $query=Comment::query(); 
        $query->where("workId",$workId);
        $query->whereNull('parentId'); 
        $query->with($with);
        $query->withCount('children');
        $result = $query->paginate(10, ['*'], 'page', $currentPage); 
        return $result;
    }

    public function getCommentById($commentId){
        $data=Comment::find($commentId);
        return $data;
    }

    public function getByCommentId($commentId, $currentPage, $with){
        $query=Comment::query(); 
        $query->where("parentId",$commentId);
        $query->with($with);
        $query->withCount('children');
        $result = $query->paginate(10, ['*'], 'page', $currentPage); 
        return $result;
    }

    public function getAll(array $select = ['*'], array $with = []){

    }
    public function getById($id,array $select = ['*'], array $with = []){
        return Comment::select($select)->where("id",$id)->with($with)->get();
    }
    public function insert($obj){

    }
    public function update($obj){

    }
    public function delete($obj){
        Comment::find($obj)->delete();
    }
    

}