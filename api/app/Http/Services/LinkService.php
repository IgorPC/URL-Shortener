<?php

namespace App\Http\Services;

use App\Http\DTOs\CreateLinkDTO;
use App\Http\DTOs\LinkDTO;
use App\Http\Repositories\LinkRepository;
use App\Http\Requests\CreateLinkRequest;
use Symfony\Component\CssSelector\Exception\InternalErrorException;

class LinkService
{
    private LinkRepository $linkRepository;

    public function __construct(LinkRepository $linkRepository)
    {
        $this->linkRepository = $linkRepository;
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
            throw new InternalErrorException('Link does not exist or it is inactive.');
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
}
