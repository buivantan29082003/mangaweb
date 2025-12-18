<?php
namespace App\DTO\DTORequest;

use App\Models\Chapter;
use App\Models\Work;
use App\Models\WorksGenre;
use Illuminate\Support\Facades\Validator;
use Spatie\LaravelData\Data;

class ChapterInsert extends Data{
    public function __construct( 
        public string $chapterName, 
        public int $chapterIndex, 
        public string $content, 
        public int $planId,
        public int $workId,
    ) {}

    public static function validator($requestData){
        return Validator::make($requestData, [
            "chapterName"          => ["required"],
            "chapterIndex"         => ["required","int", "gt:0"],
            "content"  => ["required" , "min:10"],
            "planId"      => ["required", "int","nullable"], 
            "workId"      => ["required", "int"], 
        ], [
            "required"  => ":attribute is required!",
            "min"       => "Please enter enough characters for :attribute",
            "chapterIndex.gt"=>"Least one for chapterIndex property",
            "integer"=>":attribute is required integer type"
        ]); 
    }

    public function generateWorkModel():Chapter{
        $work=new Chapter();
        $work->chapterName=$this->chapterName;
        $work->chapterIndex=$this->chapterIndex;
        $work->content=$this->content;
        $work->planId=$this->planId; 
        $work->updatedDate=now();
        $work->workId=$this->workId;
        return $work;
    }

}