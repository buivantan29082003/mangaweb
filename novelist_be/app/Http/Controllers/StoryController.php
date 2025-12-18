<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Work;
use App\Response\DataResponse;
use App\Services\Common\ValidateType;
use App\Services\User\StoryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoryController extends Controller
{ 

    protected StoryService $storyService;

    public function __construct(StoryService $storyService){
        $this->storyService=$storyService;
    }



    public function getAll(Request $request){ 
        $options = []; 
        $optionRequest = $request->query(); 
        $currentPage = ValidateType::validateInt($optionRequest['currentPage']?? null ,1);
        $sortBy =ValidateType::validateInt($optionRequest['sortBy']?? null ,1);
        $query = $optionRequest['query'] ?? null;
        $authors = ValidateType::validateArray($optionRequest['authors']?? null ,1);
        $genres = ValidateType::validateArray($optionRequest['genres']?? null ,1);   
        $options = [
            'currentPage' => $currentPage,
            'sortBy' => $sortBy,
            'query' => $query,
            'authors' => $authors,
            'genres' => $genres,
        ];  
        $data=$this->storyService->getAll(["id","title","name","image","authorId","newChapter","like","view", "following"],["author"],$options);   
        return response()->json(new DataResponse("success",$data));
    }

    public function getById(int $id,Request $request){   
        $optionRequest = $request->query(); 
        $account=Auth::guard()->user();
        // $id = ValidateType::validateInt($optionRequest['id'] ?? null, 1); 
        $data=$this->storyService->getById($id,$account->id);  
        return response()->json(new DataResponse("success",new DataResponse("success",$data))); 
    }

    public function shows(Request $request,string $id){ 
        try {
            $valid=$request->validate([
            "userName"=>"required|min:10", 
        ],$request->json()->all());
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
        return json_encode("Nguyễn van a");
    }
}
