<?php

namespace App\Response;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use JsonSerializable;

class PageResponse implements JsonSerializable
{
    private int $totalPage;
    private int $currentPage;
    private object|array|null $data; // tùy bạn muốn data là object/array
    
    // public function __construct(int $totalPage = 0, int $currentPage = 1, object|array|null $data = null)
    // {
    //     $this->totalPage = $totalPage;
    //     $this->currentPage = $currentPage;
    //     $this->data = $data;
    // }

    public function jsonSerialize(): mixed {
        return [
            'currentPage' => $this->currentPage,
            'data' => $this->data,
            'totalPage' => $this->totalPage,
        ];
    }

    public function __construct(LengthAwarePaginator $paginator)
    {
        // Nếu dùng paginate() trả về LengthAwarePaginator
        if ($paginator instanceof LengthAwarePaginator) {
            $this->totalPage = $paginator->lastPage(); // tổng số trang
        } else {
            $this->totalPage = 0; // simplePaginate không có tổng trang
        }

        $this->currentPage = $paginator->currentPage();
        $this->data = $paginator->items();
    }

    // Getter & Setter

    public function getTotalPage(): int
    {
        return $this->totalPage;
    }

    public function setTotalPage(int $totalPage): void
    {
        $this->totalPage = $totalPage;
    }

    public function getCurrentPage(): int
    {
        return $this->currentPage;
    }

    public function setCurrentPage(int $currentPage): void
    {
        $this->currentPage = $currentPage;
    }

    public function getData(): object|array|null
    {
        return $this->data;
    }

    public function setData(object|array|null $data): void
    {
        $this->data = $data;
    }
}
