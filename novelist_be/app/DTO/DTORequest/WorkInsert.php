<?php
namespace App\DTO\DTORequest;

use App\Models\Work;
use App\Models\WorksGenre;
use Illuminate\Support\Facades\Validator;
use Spatie\LaravelData\Data;

class WorkInsert extends Data{
    public function __construct( 
        public string $name, 
        public string $title, 
        public string $image,
        public string $description, 
        public array $genreIds,
        public int $authorId,
        public int $statusId
    ) {}

    public static function validator($requestData){
        return Validator::make($requestData, [
            "name"          => ["required"],
            "title"         => ["required", "min:10"],
            "description"  => ["required", "min:10"],
            "genreIds"      => ["required", "array", "min:1"],
            "authorId"      => ["required","integer"],
            "statusId"      => ["required","integer"],
            "image"         => ["required"],
        ], [
            "required"  => ":attribute is required!",
            "min"       => "Please enter enough characters for :attribute",
            "genreIds.min"=>"Least one element for genreIds property",
            "genreIds.array"=>"GenreIds is array type",
            "integer"=>":attribute is required integer type"
        ]); 
    }

    public function generateWorkModel():Work{
        $work=new Work();
        $work->name=$this->name;
        $work->title=$this->title;
        $work->content=$this->description;
        $work->authorId=$this->authorId;
        $work->statusId=$this->statusId;
        $work->image=$this->image; 
        $work->updatedDate=now();
        return $work;
    }

}