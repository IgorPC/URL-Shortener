<?php

namespace App\Http\Controllers;

use App\Http\Helpers\ApiResponse;
use App\Http\Requests\ClickRequest;
use App\Http\Services\LinkClickService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class LinkClickController extends Controller
{
    private LinkClickService $linkClickService;

    public function __construct(LinkClickService $linkClickService)
    {
        $this->linkClickService = $linkClickService;
    }

    public function click(ClickRequest $request): JsonResponse
    {
        try {
            return ApiResponse::success(
                [
                    'url' => $this->linkClickService->persistClick($request->identifier, $request->ip())
                ],
                'Click successfully registered.'
            );
        } catch (\Exception $exception) {
            if ($exception instanceof BadRequestHttpException) {
                return ApiResponse::error($exception->getMessage(), 400);
            }

            return ApiResponse::error();
        }
    }
}
