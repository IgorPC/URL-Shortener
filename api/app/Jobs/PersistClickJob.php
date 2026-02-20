<?php

namespace App\Jobs;

use App\Http\DTOs\PersistClickDTO;
use App\Http\Services\LinkClickService;
use App\Http\Services\LinkService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class PersistClickJob implements ShouldQueue
{
    use Queueable;

    private PersistClickDTO $persistClickDTO;

    /**
     * Create a new job instance.
     */
    public function __construct(PersistClickDTO $persistClickDTO)
    {
        $this->persistClickDTO = $persistClickDTO;
    }

    /**
     * Execute the job.
     */
    public function handle(LinkClickService $linkClickService, LinkService $linkService): void
    {
        $linkClickService->addNewClick($this->persistClickDTO->identifier, $this->persistClickDTO->ip);
        $linkService->addClick($this->persistClickDTO->identifier);
    }
}
