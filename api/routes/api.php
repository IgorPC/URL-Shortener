<?php

use App\Http\Controllers\LinkClickController;
use App\Http\Controllers\LinkController;
use Illuminate\Support\Facades\Route;

Route::post('/link', [LinkController::class, 'create']);
Route::post('/click', [LinkClickController::class, 'click']);
