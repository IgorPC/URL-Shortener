<?php

namespace App\Http\DTOs;

readonly class StatisticsDTO
{
    public function __construct(
        public string $identifier,
        public string $original_url,
        public string $short_url,
        public string $created_at,
        public bool $is_active,
        public int $total_clicks,
        public PeriodDTO $period,
        public array $clicks
    )
    {}
}
