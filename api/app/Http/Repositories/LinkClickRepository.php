<?php

namespace App\Http\Repositories;

use App\Models\LinkClick;

class LinkClickRepository
{
    private LinkClick $linkClick;

    public function __construct(LinkClick $linkClick)
    {
        $this->linkClick = $linkClick;
    }

    public function addClick(int $linkId, string $ip): void
    {
        $this->linkClick->create([
            'link_id' => $linkId,
            'ip_address' => $ip,
        ]);
    }
}
