<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\LikesAndDislikesController;

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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/ideas', [IdeaController::class, 'index']);
Route::get('/ideas/{id}', [IdeaController::class, 'show']);
Route::get('/ideas/search/{title}', [IdeaController::class, 'search']);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
// logout
//authenticating routes
Route::group(["middleware" => "auth:sanctum"], function(){

    Route::post('/upload', [UserController::class, 'uploadProfilePicture']);

    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('/ideas', [IdeaController::class, 'store']);
    Route::get('/userideas/{id}', [IdeaController::class, 'userIdeas']);
    Route::put('/ideas/{id}', [IdeaController::class, 'update']);
    Route::delete('/ideas/{id}', [IdeaController::class, 'destroy']);
    Route::resource('comment', CommentController::class);

    Route::post('/ideas/{ideaId}/like', [LikesAndDislikesController::class, 'likeIdea'])->name('ideas.like');
    Route::post('/ideas/{ideaId}/dislike', [LikesAndDislikesController::class, 'dislikeIdea'])->name('ideas.dislike');

   //get all likes and dislikes
    Route::get('/likes', [LikesAndDislikesController::class, 'index']);



    //get all likes and dislikes for a specific idea
    Route::get('/likes/{Id}', [LikesAndDislikesController::class, 'show']);

    Route::put('/users/{id}', [UserController::class, 'update']);

    Route::resource('/bookmarks', BookmarkController::class);
    Route::resource('/users', UserController::class);
});





