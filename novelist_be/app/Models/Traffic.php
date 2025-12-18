<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

// /**
//  * Class StatusWork
//  * 
//  * @property int $id
//  * @property string|null $statusName
//  * 
//  * @property Collection|Work[] $works
//  *
//  * @package App\Models
//  */
class Traffic extends Model
{
	protected $table = 'traffic';
	public $timestamps = false;


    protected $casts=[
        "workId"=>"int",
        "createdDate"=>"datetime"
    ];

	protected $fillable = [
		'workId',
        'createdDate'
	];



	public function works()
	{
		return $this->belongsTo(Work::class, 'workId');
	}
}
