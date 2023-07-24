<?php


use App\Http\Controllers\IdeaController;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');});


Route::get('/ideas', [IdeaController::class, 'index']);

Route::post('/ideas', [IdeaController::class, 'store']);

Route::get('/ideas/{id}', [IdeaController::class, 'show']);

Route::put('/ideas/{id}', [IdeaController::class, 'update']);

Route::delete('/ideas/{id}', [IdeaController::class, 'destroy']);

Route::get('/ideas/search/{title}', [IdeaController::class, 'search']);

