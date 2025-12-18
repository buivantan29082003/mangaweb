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
 *
 * @package App\Models
 */
class Notification extends Model
{
	protected $table = 'notifications';
	public $timestamps = false;

	protected $casts = [ 
		'createdDate'=>'datetime'
	];

	protected $fillable = [
		'createdDate', 
        'content',
        'title',
        'link',
        'data'
	];

	
}
