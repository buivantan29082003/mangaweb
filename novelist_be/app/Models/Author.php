<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Author
 * 
 * @property int $id
 * @property int|null $authorName
 * 
 * @property Collection|Work[] $works
 *
 * @package App\Models
 */
class Author extends Model
{
	protected $table = 'authors';
	public $timestamps = false;

	protected $casts = [
		'authorName' => 'string'
	];

	protected $fillable = [
		'authorName'
	];

	public function works()
	{
		return $this->hasMany(Work::class, 'authorId');
	}
}
