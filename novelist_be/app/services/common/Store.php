<?php
namespace App\Services;

use Spatie\Async\Pool;
use Illuminate\Support\Facades\Log;

class AsyncPool
{
    private static ?Pool $pool = null;

    public static function pool(): Pool
    {
        if (!self::$pool) {
            self::$pool = Pool::create()
                ->concurrency(5)
                ->timeout(30000);
        } 
        return self::$pool;
    }

    public static function dispatch(callable $task)
    {
        $pool = self::pool();

        $pool->add($task)
            ->then(function ($output) {
                Log::info("Async OK:", $output ? [$output] : []);
            })
            ->catch(function ($e) {
                Log::error("Async ERROR: " . $e->getMessage());
            }); 
        $pool->clearFinished();
    }

    public static function waitAll()
    {
        if (self::$pool) {
            self::$pool->wait();
        }
    }
}
