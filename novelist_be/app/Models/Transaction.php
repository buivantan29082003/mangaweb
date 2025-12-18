<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Transaction
 * 
 * @property int $id
 * @property string|null $transactionId
 * @property string|null $bankCode
 * @property Carbon|null $createdDate
 * 
 * @property Collection|RegistrationPlan[] $registration_plans
 *
 * @package App\Models
 */
class Transaction extends Model
{
	protected $table = 'transactions';
	public $timestamps = false;

	protected $casts = [
		'createdDate' => 'datetime',
		'totalAmount'=>'double',
		'accountId'=>'int'
	];

	protected $fillable = [
		'transactionId',
		'bankCode',
		'createdDate',
		'totalAmount',
		'accountId'
	];

	public function registration_plans()
	{
		return $this->hasMany(RegistrationPlan::class, 'transactionId');
	}

	public function account()
	{
		return $this->belongsTo(Work::class, 'accountId');
	}

}
