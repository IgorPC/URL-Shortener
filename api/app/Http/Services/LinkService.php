<?php

namespace App\Http\Services;

use App\Http\DTOs\CreateLinkDTO;
use App\Http\DTOs\LinkDTO;
use App\Http\DTOs\LoadStatisticsDTO;
use App\Http\DTOs\PeriodDTO;
use App\Http\DTOs\StatisticsDTO;
use App\Http\Repositories\LinkClickRepository;
use App\Http\Repositories\LinkRepository;
use Carbon\Carbon;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class LinkService
{
    private LinkRepository $linkRepository;
    private LinkClickRepository $linkClickRepository;

    public function __construct(LinkRepository $linkRepository, LinkClickRepository $linkClickRepository)
    {
        $this->linkRepository = $linkRepository;
        $this->linkClickRepository = $linkClickRepository;
    }

    public function create(string $link): LinkDTO
    {
        $shortenedUrl = $this->linkRepository->generateUniqueShortUrl();
        $createLinkDTO = new CreateLinkDTO($link, $shortenedUrl);

        $createdLink = $this->linkRepository->create($createLinkDTO);

        if (! $createdLink) {
            throw new InternalErrorException('Error while creating link.');
        }

        return $createdLink;
    }

    public function findLinkByIdentifier(string $identifier): LinkDTO
    {
        $link = $this->linkRepository->findByIdentifier($identifier);

        if (! $link) {
            throw new NotFoundHttpException('Link does not exist or it is inactive.');
        }

        return $link;
    }

    public function linkExistsByShortenerIdentifier(string $identifier): bool
    {
        return $this->linkRepository->linkExistsByShortenerIdentifier($identifier);
    }

    public function addClick(string $identifier): void
    {
        $this->linkRepository->addClick($identifier);
    }

    public function statistics(LoadStatisticsDTO $dto): StatisticsDTO
    {
        $link = $this->linkRepository->findByIdentifier($dto->identifier, true);

        if (! $link) {
            throw new NotFoundHttpException('Link does not exist.');
        }

        $period = $this->calculatePeriod($dto->filter, $link->created_at);

        return new StatisticsDTO(
            $dto->identifier,
            $link->url,
            env('FRONT_END_URL') . '/' . env('FRONT_END_REDIRECT_PREFIX') . '/' . $dto->identifier,
            $link->created_at,
            $link->is_active,
            $link->clicks,
            $period,
            $this->linkClickRepository->getClicks($link->id, $period)
        );
    }

    private function calculatePeriod(string | int $period, string $createdAt): PeriodDTO
    {
        $from = now();
        $to = Carbon::parse($createdAt);

        if (is_numeric($period)) {
            $to = now()->subDays($period);
        }

        return new PeriodDTO($from->toDateString() . " 23:59:59", $to->toDateString() . " 00:00:00");
    }
}
