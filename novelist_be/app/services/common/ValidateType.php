<?php

namespace App\Services\Common;

class ValidateType
{
    /**
     * Validate integer
     * @param mixed $value Giá trị truyền vào
     * @param int $defaultValue Giá trị default nếu null hoặc không phải int
     * @return int
     */
    public static function validateInt(mixed $value, int|null $defaultValue = 0): int|null
    {
        if ($value === null) {
            return $defaultValue;
        }

        if (is_numeric($value) && intval($value) == $value) {
            return (int)$value;
        }

        return $defaultValue;
    }

    /**
     * Validate array of integers
     * @param mixed $value Giá trị truyền vào
     * @return array|null
     */
    public static function validateArray(mixed $value): ?array
    {
        if ($value === null || !is_array($value)) {
            return null;
        }

        // $result = [];
        // foreach ($value as $item) {
        //     if (is_numeric($item) && intval($item) == $item) {
        //         $result[] = (int)$item;
        //     }
        // }

        return $value;
    }
}
