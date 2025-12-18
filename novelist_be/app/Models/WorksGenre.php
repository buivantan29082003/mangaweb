<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class WorksGenre
 * 
 * @property int|null $workId
 * @property int|null $genreId
 * 
 * @property Genre|null $genre
 * @property Work|null $work
 *
 * @package App\Models
 */
class WorksGenre extends Model
{
	protected $table = 'works_genres';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'workId' => 'int',
		'genreId' => 'int'
	];

	protected $fillable = [
		'workId',
		'genreId'
	];

	public function genre()
	{
		return $this->belongsTo(Genre::class, 'genreId');
	}

	public function work()
	{
		return $this->belongsTo(Work::class, 'workId');
	}
}
