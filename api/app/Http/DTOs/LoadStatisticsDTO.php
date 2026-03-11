<?php

namespace App\Http\DTOs;

use App\Http\Enums\StatisticsFilterOptions;

readonly class LoadStatisticsDTO
{
    public function __construct(
        public string $identifier,
        public string | int $filter = StatisticsFilterOptions::SEVEN_DAYS
    )
    {}
}
