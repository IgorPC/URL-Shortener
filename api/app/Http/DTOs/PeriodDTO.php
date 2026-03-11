<?php

namespace App\Http\DTOs;

readonly class PeriodDTO
{
    public function __construct(
        public string $from,
        public string $to
    )
    {}
}
