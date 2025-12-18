<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class RegistrationPlan
 * 
 * @property int $id
 * @property int|null $planId
 * @property int|null $accountId
 * @property Carbon|null $expireDate
 * @property int|null $transactionId
 * @property Carbon|null $registrationDate
 * 
 * @property Account|null $account
 * @property Plan|null $plan
 * @property Transaction|null $transaction
 *
 * @package App\Models
 */
class RegistrationPlan extends Model
{
	protected $table = 'registration_plans';
	public $timestamps = false;

	protected $casts = [
		'planId' => 'int',
		'accountId' => 'int',
		'expireDate' => 'datetime',
		'transactionId' => 'int',
		'registrationDate' => 'datetime',
		'isEnded'=>'int',
	];

	protected $fillable = [
		'planId',
		'accountId',
		'expireDate',
		'transactionId',
		'registrationDate',
		'isEnded'
	];

	public function account()
	{
		return $this->belongsTo(Account::class, 'accountId');
	}

	public function plan()
	{
		return $this->belongsTo(Plan::class, 'planId');
	}

	public function transaction()
	{
		return $this->belongsTo(Transaction::class, 'transactionId');
	}
}
