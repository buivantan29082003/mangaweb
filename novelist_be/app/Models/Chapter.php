<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Chapter
 * 
 * @property int $id
 * @property string|null $chapterName
 * @property string|null $content
 * @property Carbon|null $createdDate
 * @property Carbon|null $updatedDate
 * @property int $workId
 * @property int|null $planId
 * 
 * @property Plan|null $plan
 * @property Work $work
 * @property Collection|Library[] $libraries
 *
 * @package App\Models
 */
class Chapter extends Model
{
	protected $table = 'chapters';
	public $timestamps = false;

	protected $casts = [
		'createdDate' => 'datetime',
		'updatedDate' => 'datetime',
		'workId' => 'int',
		'planId' => 'int',
		'chapterIndex'=>'int'
	];

	protected $fillable = [
		'chapterName',
		'content',
		'createdDate',
		'updatedDate',
		'workId',
		'planId',
		'chapterIndex'
	];

	public function plan()
	{
		return $this->belongsTo(Plan::class, 'planId');
	}

	public function work()
	{
		return $this->belongsTo(Work::class, 'workId');
	}

	public function libraries()
	{
		return $this->hasMany(Library::class, 'chapterId');
	}
}
