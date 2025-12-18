<?php

namespace App\Http\Controllers\Admin;

use App\DTO\DTORequest\ChapterInsert;
use App\DTO\DTORequest\WorkInsert;
use App\Http\Controllers\Controller;
use App\Models\Work;
use App\Models\WorksGenre;
use App\Response\DataResponse;
use App\Services\Admin\WorkService;
use App\Services\Common\ValidateType;
use App\Services\User\PlanService;
use App\Services\User\StoryService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\Types\Object_;

class WorkController extends Controller
{ 


    private PlanService $planService;
    protected WorkService $storyService;

    public function __construct(PlanService $planService,WorkService $storyService){
        $this->storyService=$storyService;
        $this->planService=$planService;
    } 

    public function created(Request $request){
        $validator=WorkInsert::validator($request->all());
        if($validator->stopOnFirstFailure()->fails()){
            $errors=$validator->errors()->first();
            return response()->json(new DataResponse("Request is not valid",$errors,true),400); 
        }
        $workDTO=WorkInsert::from($request);
        if(!$this->storyService->checkAuthorIsRight($workDTO->authorId)){
            return response()->json(new DataResponse("Request is not valid","Not found author",true),400); 
        }
        if(!$this->storyService->checkGenresIsRight($workDTO->genreIds)){
            return response()->json(new DataResponse("Request is not valid","Genre is not valid",true),400); 
        }
        $work=$workDTO->generateWorkModel();
        $this->storyService->saveWork($work);
        $workGenres = []; 
        foreach ($workDTO->genreIds as $gen) {  
            $workGenres[] = [
                'workId'  => $work->id,  
                'genreId' => $gen
            ];
        } 
        $this->storyService->saveWorkGenre($workGenres); 
        return response()->json(new DataResponse("Insert successfully","thank you for upload",false));
    }

    public function addChapter(Request $request){
        $validator=ChapterInsert::validator($request->all());
        if($validator->stopOnFirstFailure()->fails()){
            $errors=$validator->errors()->first();
            return response()->json(new DataResponse("Request is not valid",$errors,true),400); 
        }
        $chapterDTP=ChapterInsert::from($request); 
        $chapter=$chapterDTP->generateWorkModel(); 
        if($this->storyService->getByIdSimple($chapter->workId)==null){
            return response()->json(new DataResponse("Data is Not valid","Not found work you select",true),400);
        }
        if($chapter->planId!=null&&$this->planService->getById($chapter->planId,["id"],[])==null){
            return response()->json(new DataResponse("Data is Not valid","Not found plan you select",true),400);
        } 
        $this->storyService->addChapter($chapter);
        $this->storyService->updateNewChapter($chapter->chapterIndex,$chapter->workId);
        return response()->json(new DataResponse("Insert successfully","thank you for upload",false));
    }

    public function getLatesChapter(int $workId){
        $chapterLatest=$this->storyService->getLatesChapter($workId);
        return response()->json(new DataResponse("success",$chapterLatest,false));
    }


    public function trafficReport(int $workId){
        $rawData = DB::table('traffic as p')
        ->selectRaw("DATE_FORMAT(p.createdDate, '%Y-%m') as month, COUNT(p.id) as total")
        ->where('p.workId', $workId)
        ->where('p.createdDate', '>=', now()->subMonths(5)->startOfMonth())
        ->groupBy('month')
        ->pluck('total', 'month');

        $data = []; 
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format('Y-m');
            $data[] = (int) ($rawData[$month] ?? 0);
        } 
        $rawData1 = DB::table('following as p')
        ->selectRaw("DATE_FORMAT(p.createdDate, '%Y-%m') as month, COUNT(p.workId) as total")
        ->where('p.workId', $workId)
        ->where('p.createdDate', '>=', now()->subMonths(5)->startOfMonth())
        ->groupBy('month')
        ->pluck('total', 'month');

        $data1 = []; 
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format('Y-m');
            $data1[] = (int) ($rawData1[$month] ?? 0);
        } 
        $rawData2 = DB::table('favorites as p')
        ->selectRaw("DATE_FORMAT(p.createdDate, '%Y-%m') as month, COUNT(p.workId) as total")
        ->where('p.workId', $workId)
        ->where('p.createdDate', '>=', now()->subMonths(5)->startOfMonth())
        ->groupBy('month')
        ->pluck('total', 'month');

        $data2 = []; 
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format('Y-m');
            $data2[] = (int) ($rawData2[$month] ?? 0);
        } 
        $total = [
            [
                "name" => "view",
                "data" => $data
            ],
            [
                "name" => "following",
                "data" => $data1
            ],
            [
                "name" => "favorites",
                "data" => $data2
            ]
        ]; 
        $months = [];

        for ($i = 5; $i >= 0; $i--) {
            $months[] = Carbon::now()
                ->subMonths($i)
                ->format('Y-m');
        }
        $overal=[
            "months"=>$months,
            "data"=>$total
        ];
        return new DataResponse("success",$overal,false); 
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
        $data=$this->storyService->getAll(["id","title","name","image","authorId","newChapter","like","view", "following", "statusId"],[ "statusWork"],$options);   
        return response()->json(new DataResponse("success",$data));
    }

    public function getById(int $id,Request $request){   
        $optionRequest = $request->query(); 
        // $id = ValidateType::validateInt($optionRequest['id'] ?? null, 1); 
        $data=$this->storyService->getById($id,$request->user->id);  
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
