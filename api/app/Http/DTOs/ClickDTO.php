<?php

namespace App\Http\DTOs;

readonly class ClickDTO
{
    public function __construct(
        public string $ip,
        public string $clicked_at
    )
    {}
}
