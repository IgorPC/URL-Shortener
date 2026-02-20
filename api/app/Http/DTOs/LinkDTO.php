<?php

namespace App\Http\DTOs;

use App\Models\Link;

class LinkDTO
{
    public int $id;
    public string $url;
    public string $short_url;
    public int $clicks;
    public bool $is_active;
    public string $created_at;
    public string $updated_at;

    public function __construct(
        int $id,
        string $url,
        string $short_url,
        int $clicks,
        bool $is_active,
        string $created_at,
        string $updated_at
    )
    {
        $this->id = $id;
        $this->url = $url;
        $this->short_url = $short_url;
        $this->clicks = $clicks;
        $this->is_active = $is_active;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public static function fromModel(Link $link): self
    {
        return new self(
            $link->id,
            $link->url,
            $link->short_url,
            $link->clicks,
            $link->is_active,
            $link->created_at,
            $link->updated_at,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'url' => $this->url,
            'identifier' => $this->short_url,
            'short_url' => env('FRONT_END_URL') . '/' . env('FRONT_END_REDIRECT_PREFIX') . '/' . $this->short_url,
            'short_url_statistics' => env('FRONT_END_URL') . '/' . env('FRONT_END_STATISTICS_PREFIX') . '/' . $this->short_url,
            'clicks' => $this->clicks,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
