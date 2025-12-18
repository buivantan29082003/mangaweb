<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Following
 * 
 * @property int $notificationId
 * @property int $accountId
 * 
 * @property Account $account
 * @property Notification $work
 *
 * @package App\Models
 */
class NotificationItem extends Model
{
	protected $table = 'notificationitems';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'notificationId' => 'int',
		'accountId' => 'int',
		'isReaded'=>"int"
	];
	protected $fillable = [
		'notificationId', 
        'accountId',
		'isReaded'
	];

	public function account()
	{
		return $this->belongsTo(Account::class, 'accountId');
	}

	public function Notification()
	{
		return $this->belongsTo(Notification::class, 'notificationId');
	}
}
