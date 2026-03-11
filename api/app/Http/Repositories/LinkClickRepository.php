<?php

namespace App\Http\Repositories;

use App\Http\DTOs\ClickDTO;
use App\Http\DTOs\PeriodDTO;
use App\Models\LinkClick;
use Carbon\Carbon;

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

    public function getClicks(int $linkId, PeriodDTO $periodDTO): array
    {
        return $this->linkClick
            ->where('created_at', '>=', $periodDTO->to)
            ->where('created_at', '<=', $periodDTO->from)
            ->where(['link_id' => $linkId])
            ->get(['ip_address', 'created_at'])
            ->map(fn($click) => new ClickDTO($click['ip_address'], Carbon::parse($click['created_at'])->format('Y-m-d H:i:s')))
            ->toArray();
    }
}
