<?php
namespace App\Services;

interface ServiceInterface{
    public function getAll(array $select=["*"],array $with=[]);
    public function getById($id); 
}