<?php

use App\Http\Controllers\IdeaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/ideas', [IdeaController::class, 'index']);

Route::post('/ideas', [IdeaController::class, 'store']);

Route::get('/ideas/{id}', [IdeaController::class, 'show']);

Route::put('/ideas/{id}', [IdeaController::class, 'update']);

Route::delete('/ideas/{id}', [IdeaController::class, 'destroy']);

Route::get('/ideas/search/{title}', [IdeaController::class, 'search']);

