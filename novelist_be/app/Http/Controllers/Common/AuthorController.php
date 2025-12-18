<?php
namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Response\DataResponse;
use App\Services\Common\AuthorService;
use Illuminate\Http\Request;

class AuthorController extends Controller
{

    private AuthorService $authorService;

    public function __construct(AuthorService $authorService)
    {
        $this->authorService=$authorService;
    }


    public function getAll(){
        return new DataResponse("success",$this->authorService->getAll());
    }



}
