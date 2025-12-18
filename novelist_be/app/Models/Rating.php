<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Rating
 * 
 * @property int $accountId
 * @property int $workId
 * @property int|null $rate
 * 
 * @property Account $account
 * @property Work $work
 *
 * @package App\Models
 */
class Rating extends Model
{
	protected $table = 'ratings';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'accountId' => 'int',
		'workId' => 'int',
		'rate' => 'int'
	];

	protected $fillable = [
		'rate'
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
