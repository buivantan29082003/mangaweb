<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Work
 * 
 * @property string|null $name
 * @property string|null $title
 * @property string|null $content
 * @property Carbon|null $createdDate
 * @property Carbon|null $updatedDate
 * @property int $id
 * @property string|null $image
 * @property int $authorId
 * @property int|null $statusId
 * 
 * @property Author $author
 * @property StatusWork|null $status_work
 * @property Collection|Chapter[] $chapters
 * @property Collection|Comment[] $comments
 * @property Collection|Favorite[] $favorites
 * @property Collection|Following[] $followings
 * @property Collection|Rating[] $ratings
 * @property Collection|Genre[] $genres
 *
 * @package App\Models
 */
class Work extends Model 
{

	 
	protected $table = 'works';
	public $timestamps = false;
	protected $primaryKey="id";

	protected $casts = [
		'createdDate' => 'datetime',
		'updatedDate' => 'datetime',
		'authorId' => 'int',
		'statusId' => 'int',
		'following'=>'int'
	];

	protected $fillable = [
		'name',
		'title',
		'content',
		'createdDate',
		'updatedDate',
		'image',
		'authorId',
		'statusId',
		'view',
		'like',
		'following'
	];

	public function author()
	{
		return $this->belongsTo(Author::class, 'authorId');
	}

	public function statusWork()
	{
		return $this->belongsTo(StatusWork::class, 'statusId');
	}

	public function chapters()
	{
		return $this->hasMany(Chapter::class, 'workId');
	}

	public function comments()
	{
		return $this->hasMany(Comment::class, 'workId');
	}

	public function favorites()
	{
		return $this->hasMany(Favorite::class, 'workId');
	}

	public function followings()
	{
		return $this->hasMany(Following::class, 'workId');
	}

	public function ratings()
	{
		return $this->hasMany(Rating::class, 'workId');
	}

	public function genres()
	{
		return $this->belongsToMany(Genre::class, 'works_genres', 'workId', 'genreId');
	}
}
