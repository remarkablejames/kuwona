<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookmark;

class BookmarkController extends Controller
{
    public function index()
    {
        // Get all bookmarks and eager load the related user and idea post
        $bookmarks = Bookmark::with('user', 'idea')->get();

        // Return the bookmarks as JSON data
        return response()->json($bookmarks);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'idea_post_id' => 'required|exists:ideas,id',
        ]);

        // check if the bookmark already exists for the user
        $bookmark = Bookmark::where('user_id', $request->user_id)->where('idea_post_id', $request->idea_post_id)->first();
        if ($bookmark) {
            return response()->json(['message' => 'Bookmark already exists']);
        }

        // Create a new bookmark
        $bookmark = Bookmark::create($request->only('user_id', 'idea_post_id'));

        // Optionally, you can return a response indicating success or redirect to a different page
        return response()->json(['message' => 'Bookmark created successfully', 'bookmark' => $bookmark]);
    }

    // get all bookmarks for a user not populating the user but only idea_post
    public function show($id)
    {
        $bookmarks = Bookmark::with('idea')->where('user_id', $id)->get();
        return response()->json($bookmarks);
    }



    public function update(Request $request, Bookmark $bookmark)
    {
        // Validate the incoming request data
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'idea_post_id' => 'required|exists:idea_posts,id',
        ]);

        // Update the bookmark
        $bookmark->update($request->only('user_id', 'idea_post_id'));

        // Optionally, you can return a response indicating success or redirect to a different page
        return response()->json(['message' => 'Bookmark updated successfully', 'bookmark' => $bookmark]);
    }

    public function destroy(Bookmark $bookmark)
    {
        // Delete the bookmark
        $bookmark->delete();

        // Optionally, you can return a response indicating success or redirect to a different page
        return response()->json(['message' => 'Bookmark deleted successfully']);
    }
}
