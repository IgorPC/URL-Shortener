<?php

use App\Http\Helpers\ApiResponse;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->renderable(function (\Throwable $e) {
            if ($e instanceof NotFoundHttpException) {
                return ApiResponse::error('Route not found.', 404);
            }

            if ($e instanceof MethodNotAllowedHttpException) {
                return ApiResponse::error('Method not allowed.', 405);
            }

            if ($e instanceof ValidationException) {
                return ApiResponse::error('Validation error.', 422, $e->errors());
            }

            return ApiResponse::error('Internal Server Error.', 500);
        });
    })->create();
