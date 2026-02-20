<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ApiResponse;
use App\Http\Requests\CreateLinkRequest;
use App\Http\Services\LinkService;
use Illuminate\Http\JsonResponse;

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
}
