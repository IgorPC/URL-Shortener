<?php

namespace App\Http\DTOs;

readonly class PersistClickDTO
{
    public function __construct(
        public string $identifier,
        public string $ip
    )
    {}
}
