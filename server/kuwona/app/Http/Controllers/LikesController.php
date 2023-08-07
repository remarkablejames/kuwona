<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Likes;
use App\Models\Dislikes;

class LikesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // fetch all likes and dislikes from the database and return them as JSON of two arrays
        $likes = Likes::with('user', 'idea')->get();
        $dislikes = Dislikes::with('user', 'idea')->get();

        return response()->json(['likes' => $likes, 'dislikes' => $dislikes]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate the incoming request data
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'idea_post_id' => 'required|exists:ideas,id',
            'action' => 'required|in:like,dislike'
        ]);

        // check if the user has already liked or disliked the idea post
        $like = Likes::where('user_id', $request->user_id)->where('idea_post_id', $request->idea_post_id)->first();
        $dislike = Dislikes::where('user_id', $request->user_id)->where('idea_post_id', $request->idea_post_id)->first();

        // if idea is already liked and action is dislike, remove the like and add a dislike
        if ($like && $request->action === 'dislike') {
            $like->delete();
            $dislike = Dislikes::create($request->only('user_id', 'idea_post_id'));
            return response()->json(['message' => 'Dislike created successfully', 'dislike' => $dislike]);
        }

        // if idea is already disliked and action is like, remove the dislike and add a like
        if ($dislike && $request->action === 'like') {
            $dislike->delete();
            $like = Likes::create($request->only('user_id', 'idea_post_id'));
            return response()->json(['message' => 'Like created successfully', 'like' => $like]);
        }

        // if idea is already liked and action is like, return a message
        if ($like && $request->action === 'like') {
            return response()->json(['message' => 'Like already exists']);
        }

        // if idea is already disliked and action is dislike, return a message
        if ($dislike && $request->action === 'dislike') {
            return response()->json(['message' => 'Dislike already exists']);
        }

        // if idea is not liked or disliked, create a new like or dislike

        if ($request->action === 'like') {
            $like = Likes::create($request->only('user_id', 'idea_post_id'));
            return response()->json(['message' => 'Like created successfully', 'like' => $like]);
        }

        if ($request->action === 'dislike') {
            $dislike = Dislikes::create($request->only('user_id', 'idea_post_id'));
            return response()->json(['message' => 'Dislike created successfully', 'dislike' => $dislike]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // return two arrays of likes and dislikes for the specified user id
        $likes = Likes::where('user_id', $id)->get();
        $dislikes = Dislikes::where('user_id', $id)->get();

        return response()->json(['likes' => $likes, 'dislikes' => $dislikes]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
