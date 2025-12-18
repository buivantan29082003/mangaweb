<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Library
 * 
 * @property int $chapterId
 * @property int $accountId
 * 
 * @property Account $account
 * @property Chapter $chapter
 *
 * @package App\Models
 */
class Library extends Model
{
	protected $table = 'libraries';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'chapterId' => 'int',
		'accountId' => 'int', 
		'createdDate'=>'datetime'
	];

	protected $fillable = [
		'createdDate', 
	];

	public function account()
	{
		return $this->belongsTo(Account::class, 'accountId');
	}

	public function chapter()
	{
		return $this->belongsTo(Chapter::class, 'chapterId');
	}
}
