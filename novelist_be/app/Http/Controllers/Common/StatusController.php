<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\StatusWork;
use App\Response\DataResponse;
use App\Services\Common\GenreService;
use Illuminate\Http\Request;

class StatusController extends Controller
{

    

    public function getAll(){
        try {
            return new DataResponse("success",StatusWork::all());
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
}
