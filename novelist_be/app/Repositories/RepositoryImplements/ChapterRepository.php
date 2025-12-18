<?php

namespace App\Repositories\RepositoryImplements;

use App\Models\Chapter;
use App\Models\Library;
use App\Repositories\RepoCommon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ChapterRepository implements RepoCommon
{

    public function getByWorkId($workId, $queryString, $page, array $with)
    {
        $query = Chapter::query();
        $query->where("workId", $workId);
        if ($queryString !== null) {
            $query->where(function ($q) use ($queryString) {
                $q->where('chapterName', 'like', '%' . $queryString . '%')
                    ->orWhere('id', 'like', '%' . $queryString . '%');
            });
        }
        $query->with($with);
        $result = $query->paginate(10, ['*'], 'page', $page);
        return $result;
    }

    public function checkIsBookMark(int $accountId, int $chapterId): bool
    {
        return Library::where('accountId', $accountId)->where('chapterId', $chapterId)->first() != null;
    }

    public function getAll(array $select = ['*'], array $with = []) {}

    public function bookMark(Library $lib)
    {
        DB::beginTransaction();
        $lib->save();
        DB::commit();
    }

    public function unBookMark(int $accountId, $chapterId)
    {
        Library::where("accountId", $accountId)->where("chapterId", $chapterId)->delete();
    }

    public function getById($id, array $select = ['*'], array $with = [])
    {
        return Chapter::with($with)->select($select)->find($id);
    }
    public function insert($obj) {}
    public function update($obj) {}
    public function delete($obj) {}
}
