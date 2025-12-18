<?php
namespace App\Services\Common;
use App\Repositories\RepositoryImplements\AuthorRepository;
use App\Services\ServiceInterface;

class AuthorService implements ServiceInterface{

    private AuthorRepository $authorRepo;

    public function __construct(AuthorRepository $authorRepository){
        $this->authorRepo=$authorRepository;
    }
    public function getAll(array $select=["*"],array $with=[]){
        return $this->authorRepo->getAll($select,$with);
    }
    public function getById($id){
        return $this->authorRepo->getById($id);
    }
}