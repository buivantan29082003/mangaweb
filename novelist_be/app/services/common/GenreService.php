<?php

namespace App\Services\Common;
use App\Repositories\RepositoryImplements\GenresRepository;
use App\Services\ServiceInterface;

class GenreService implements ServiceInterface{

    private GenresRepository $genreRepo;

    public function __construct(GenresRepository $genreRepository){
        $this->genreRepo=$genreRepository;
    }

    public function getAll(array $select=["*"],array $with=[]){
        return  $this->genreRepo->getAll($select,$with);
    }
    public function getById($id){

    }
}