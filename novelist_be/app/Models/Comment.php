<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Comment
 * 
 * @property int $id
 * @property int|null $accountId
 * @property int|null $workId
 * @property string|null $content
 * @property int|null $parentId
 * @property Carbon|null $createdDate
 * 
 * @property Account|null $account
 * @property Work|null $work
 *
 * @package App\Models
 */
class Comment extends Model
{
    protected $table = 'comments';
    public $timestamps = false;

    protected $casts = [
        'accountId' => 'int',
        'workId' => 'int',
        'parentId' => 'int',
        'createdDate' => 'datetime'
    ];

    protected $fillable = [
        'accountId',
        'workId',
        'content',
        'parentId',
        'createdDate',
        'avatar'
    ];

    // Quan hệ tài khoản
    public function account()
    {
        return $this->belongsTo(Account::class, 'accountId');
    }

    // Quan hệ truyện
    public function work()
    {
        return $this->belongsTo(Work::class, 'workId');
    }

    // 🔥 Quan hệ self: Comment cha
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parentId');
    }

    // 🔥 Quan hệ self: Các comment con
    public function children()
    {
        return $this->hasMany(Comment::class, 'parentId')
                    ->with('children'); // load đệ quy
    }
}

