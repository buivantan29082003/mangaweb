<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Plan
 * 
 * @property int $id
 * @property string|null $planName
 * @property float|null $fee
 * @property int|null $months
 * 
 * @property Collection|Chapter[] $chapters
 * @property Collection|RegistrationPlan[] $registration_plans
 *
 * @package App\Models
 */
class Plan extends Model
{
	protected $table = 'plans';
	public $timestamps = false;

	protected $casts = [
		'fee' => 'float',
		'months' => 'int'
	];

	protected $fillable = [
		'planName',
		'fee',
		'months'
	];

	public function chapters()
	{
		return $this->hasMany(Chapter::class, 'planId');
	}

	public function registration_plans()
	{
		return $this->hasMany(RegistrationPlan::class, 'planId');
	}
}
