<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\User;
use App\Models\LikesAndDislikes;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class LikesAndDislikesController extends Controller
{
    //create a like idea function
    public function likeIdea(Request $request, $ideaId): JsonResponse
    {
        //Get authenticated user
        $user = $request->user();

        //check if the user has already liked the idea
        $existingLike = LikesAndDislikes::where('user_id', $user->id)
            ->where('idea_id', $ideaId)
            ->first();

        if ($existingLike) {
            $existingLike->update([
                'liked_ideas' => true,
                'disliked_ideas' => false
            ]);
        } else {
            LikesAndDislikes::create([
                'user_id' => $user->id,
                'idea_id' => $ideaId,
                'liked_ideas' => true,
                'disliked_ideas' => false
            ]);
        }

        //return a json response
        return response()->json([
            'message' => 'Idea liked successfully'
        ], 200);
    }

    //create a dislike idea function
    public function dislikeIdea(Request $request, $ideaId): JsonResponse
    {
        //Get authenticated user
        $user = $request->user();

        //check if the user has already disliked the idea
        $existingDislike = LikesAndDislikes::where('user_id', $user->id)
            ->where('idea_id', $ideaId)
            ->first();

        if ($existingDislike) {
            $existingDislike->update([
                'liked_ideas' => false,
                'disliked_ideas' => true
            ]);
        } else {
            LikesAndDislikes::create([
                'user_id' => $user->id,
                'idea_id' => $ideaId,
                'liked_ideas' => false,
                'disliked_ideas' => true
            ]);
        }

        //return a json response
        return response()->json([
            'message' => 'Idea disliked successfully'
        ], 200);
    }

    public function index() : JsonResponse
    {
        //get all likes
        $likes = LikesAndDislikes::with('user')->where('liked_ideas', true)->get();

        //get all dislikes
        $dislikes = LikesAndDislikes::with('user')->where('disliked_ideas', true)->get();

        //return a json response
        return response()->json([
            'liked_ideas' => $likes
//            'disliked_ideas' => $dislikes
        ], 200);

    }

    //get all likes and dislikes for a specific idea
    public function show($ideaId) : JsonResponse
    {
        //get all likes and dislikes for a specific idea
        $idea = Idea::find($ideaId);
        $likes = LikesAndDislikes::with('user')->where('idea_id', $ideaId)->where('liked_ideas', true)->get();
        $dislikes = LikesAndDislikes::with('user')->where('idea_id', $ideaId)->where('disliked_ideas', true)->get();
        $data = [
            'idea' => $idea,
            'liked_ideas' => $likes,
            'disliked_ideas' => $dislikes
        ];
        return response()->json($data, 200);
    }


    // update an existing idea
    public function update($id)
    {
        //Update the idea with the new like or dislike count
    }

    // delete an existing idea
    public function destroy($id)
    {
        //
    }
}
