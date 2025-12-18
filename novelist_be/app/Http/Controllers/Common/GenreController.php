<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Response\DataResponse;
use App\Services\Common\GenreService;
use Illuminate\Http\Request;

class GenreController extends Controller
{

    private GenreService $genreService;

    public function __construct(GenreService $genreService){
        $this->genreService=$genreService;
    }


    public function getAll(){
        try {
            return new DataResponse("success",$this->genreService->getAll());
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
