<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Genre
 * 
 * @property int $id
 * @property string|null $genreName
 * 
 * @property Collection|Work[] $works
 *
 * @package App\Models
 */
class Genre extends Model
{
	protected $table = 'genres';
	public $timestamps = false;

	protected $fillable = [
		'genreName'
	];

	public function works()
	{
		return $this->belongsToMany(Work::class, 'works_genres', 'genreId', 'workId');
	}
}
