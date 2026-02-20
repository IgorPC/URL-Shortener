<?php

namespace App\Http\DTOs;

readonly class CreateLinkDTO
{
    public function __construct(
        public string $url,
        public string $short_url
    )
    {}
}
