<?php

namespace App\Http\Enums;

enum StatisticsFilterOptions
{
    public const ALL = 'all';
    public const SEVEN_DAYS = 7;
    public const HALF_MONTH = 15;
    public const MONTH = 30;
    public const THREE_MONTHS = 90;

    public const OPTIONS = [
        self::ALL,
        self::SEVEN_DAYS,
        self::HALF_MONTH,
        self::MONTH,
        self::THREE_MONTHS,
    ];

    public static function getFilter(string | int $type): int | string
    {
        if (! in_array($type, self::OPTIONS)) {
            return self::SEVEN_DAYS;
        }

        return $type;
    }
}
