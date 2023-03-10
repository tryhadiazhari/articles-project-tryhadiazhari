<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CreateDbController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('users')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('register', 'register');
        Route::post('login', 'login');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::controller(ArticleController::class)->group(function () {
        Route::post('/article', 'store');
        Route::get('/article/{limit}/{offset}', 'showAll');
        Route::get('/article/{id}', 'showById');
        Route::put('/article/{id}', 'updateById');
        Route::delete('/article/{id}', 'destroy');
    });
});
