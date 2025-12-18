<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class Account
 * 
 * @property int $id
 * @property string|null $email
 * @property string|null $fullName
 * @property string|null $password
 * 
 * @property Collection|Comment[] $comments
 * @property Collection|Favorite[] $favorites
 * @property Collection|Following[] $followings
 * @property Collection|Library[] $libraries
 * @property Collection|Rating[] $ratings
 * @property Collection|RegistrationPlan[] $registration_plans
 *
 * @package App\Models
 */
class Account extends Authenticatable implements JWTSubject
{
	protected $table = 'accounts';
	public $timestamps = false;

	public function getJWTIdentifier()
		{
			return $this->getKey();
		}

    public function getJWTCustomClaims()
    { 
        return [];
    }

	protected $hidden = [
		'password'
	];

	protected $casts = [
		'isActive'=>'int'
	];

	protected $fillable = [
		'email',
		'fullName',
		'password',
		'isActive',
		'role'
	];

	public function comments()
	{
		return $this->hasMany(Comment::class, 'accountId');
	}

	public function favorites()
	{
		return $this->hasMany(Favorite::class, 'accountId');
	}

	public function followings()
	{
		return $this->hasMany(Following::class, 'accountId');
	}

	public function libraries()
	{
		return $this->hasMany(Library::class, 'accountId');
	}

	public function ratings()
	{
		return $this->hasMany(Rating::class, 'accountId');
	}

	public function registration_plans()
	{
		return $this->hasMany(RegistrationPlan::class, 'accountId');
	}
}
