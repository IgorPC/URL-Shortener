<?php

namespace App\Http\Controllers;

use App\Http\DTOs\LoadStatisticsDTO;
use App\Http\Enums\StatisticsFilterOptions;
use App\Http\Helpers\ApiResponse;
use App\Http\Requests\CreateLinkRequest;
use App\Http\Services\LinkService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class LinkController extends Controller
{
    private LinkService $linkService;

    public function __construct(LinkService $linkService)
    {
        $this->linkService = $linkService;
    }

    public function create(CreateLinkRequest $request): JsonResponse
    {
        try {
            $newLink = $this->linkService->create($request->link);
            return ApiResponse::success($newLink->toArray(), 'Shorten URL successfully created.');
        } catch (\Exception $exception) {
            return ApiResponse::error();
        }
    }

    public function statistics(string $id, Request $request): JsonResponse
    {
        try {
            $period = $request->period ? StatisticsFilterOptions::getFilter($request->period) : StatisticsFilterOptions::SEVEN_DAYS;
            $statistics = $this->linkService->statistics(new LoadStatisticsDTO($id, $period));

            return ApiResponse::success($statistics, 'Statistics successfully loaded.');
        } catch (\Exception $exception) {
            if ($exception instanceof NotFoundHttpException) {
                return ApiResponse::error($exception->getMessage(), 404);
            }

            return ApiResponse::error();
        }
    }
}
