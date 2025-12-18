<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Favorite
 * 
 * @property int $workId
 * @property int $accountId
 * 
 * @property Account $account
 * @property Work $work
 *
 * @package App\Models
 */
class Favorite extends Model
{
	protected $table = 'favorites';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'workId' => 'int',
		'accountId' => 'int'
	];

	public function account()
	{
		return $this->belongsTo(Account::class, 'accountId');
	}

	public function work()
	{
		return $this->belongsTo(Work::class, 'workId');
	}
}
