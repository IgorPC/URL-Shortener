<?php

namespace App\Http\Repositories;

use App\Http\DTOs\CreateLinkDTO;
use App\Http\DTOs\LinkDTO;
use App\Models\Link;

class LinkRepository
{
    private Link $link;

    public function __construct(Link $link)
    {
        $this->link = $link;
    }

    public function findByIdentifier(string $identifier): LinkDTO | null
    {
        $link = $this->link->where(['is_active' => true, 'short_url' => $identifier])->first();

        if (! $link) {
            return null;
        }

        return LinkDTO::fromModel($link);
    }

    public function create(CreateLinkDTO $createLinkDTO): LinkDTO | null
    {
        $link = $this->link->create([
            'url' => $createLinkDTO->url,
            'short_url' => $createLinkDTO->short_url,
            'clicks' => 0,
            'is_active' => true,
        ]);

        if (! $link) {
            return null;
        }

        return LinkDTO::fromModel($link);
    }

    public function generateUniqueShortUrl(): string
    {
        do {
            $code = bin2hex(random_bytes(8));
        } while (Link::where('short_url', $code)->exists());

        return $code;
    }

    public function addClick(string $identifier): void
    {
        $link = $this->findByIdentifier($identifier);

        if (! $link) {
            return;
        }

        $this->link->where(['short_url' => $identifier])->update(['clicks' => $link->clicks + 1]);
    }

    public function linkExistsByShortenerIdentifier(string $identifier): bool
    {
        return $this->link->where(['is_active' => true, 'short_url' => $identifier])->exists();
    }
}
