<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class StatusWork
 * 
 * @property int $id
 * @property string|null $statusName
 * 
 * @property Collection|Work[] $works
 *
 * @package App\Models
 */
class StatusWork extends Model
{
	protected $table = 'status_work';
	public $timestamps = false;

	protected $fillable = [
		'statusName'
	];

	public function works()
	{
		return $this->hasMany(Work::class, 'statusId');
	}
}
