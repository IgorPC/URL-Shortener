<?php

namespace App\Http\Services;

use App\Http\DTOs\PersistClickDTO;
use App\Http\Repositories\LinkClickRepository;
use App\Jobs\PersistClickJob;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class LinkClickService
{
    private LinkClickRepository $linkClickRepository;
    private LinkService $linkService;

    public function __construct(LinkClickRepository $linkClickRepository, LinkService $linkService)
    {
        $this->linkClickRepository = $linkClickRepository;
        $this->linkService = $linkService;
    }

    public function persistClick(string $identifier, string $ip): string
    {
        if (! $this->linkService->linkExistsByShortenerIdentifier($identifier)) {
            throw new BadRequestHttpException('Link does not exist or it is inactive.');
        }

        $link = $this->linkService->findLinkByIdentifier($identifier);

        PersistClickJob::dispatch(new PersistClickDTO($identifier, $ip));

        return $link->toArray()['url'];
    }

    public function addNewClick(string $identifier, string $ip): void
    {
        try {
            $link = $this->linkService->findLinkByIdentifier($identifier);
            $this->linkClickRepository->addClick($link->id, $ip);
        } catch (\Exception $exception) {
            return;
        }

    }
}
