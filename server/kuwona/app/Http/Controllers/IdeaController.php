<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class IdeaController extends Controller
{
    public function index(): JsonResponse
    {
        $ideas = Idea::with('user','comments')->get();
        return response()->json($ideas, 200);
    }

    public function show($id): JsonResponse
    {
        $idea = Idea::with('user', 'comments', 'comments.user')->find($id);

        if (!$idea) {
            return response()->json(['error' => 'Idea not found'], 404);
        }

        return response()->json($idea, 200);
    }


    // create a new idea
    public function store(Request $request): JsonResponse
    {
        $request -> validate([
            'title' => 'required',
            'slug' => 'required',
            'description' => 'required',
            'category' => 'required',
        ]);

        // if image is uploaded, validate it
        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'mimes:jpeg,jpg,png,gif|required|max:10000'
            ]);
        }

        $imagePath = null; // Initialize $imagePath with a default value

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('idea_images', 'public'); // Store in 'public' disk
            $imagePath = asset('storage/' . $imagePath); // Generate full URL for stored image (ex: http://localhost:8000/storage/idea_images/idea_image.jpg)
        }

        Log::debug('Image Upload Request:', ['image' => $imagePath]);



        $idea = Idea::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'category' => $request->category,
            'image' => $imagePath ?? null,
        ]);
        return response()->json($idea, 201);
    }

    public function updateIdea(Request $request, string $id): JsonResponse
    {
        $idea = Idea::find($id);
        $imagePath = $idea->image; // Keep the existing image path if no new image is uploaded
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('idea_images', 'public');
            $imagePath = asset('storage/' . $imagePath);
        }

        Log::debug('Image Upload Request:', ['image' => $imagePath]);

        $idea->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'category' => $request->category,
            'image' => $imagePath,
        ]);

        return response()->json($idea, 201);
    }

    // delete an existing idea
    public function destroy($id): JsonResponse
    {
        $idea = Idea::find($id);
        $idea->delete();

        return response()->json(null, 204);
    }

    // get all ideas by a user (id)
    public function userIdeas($id): JsonResponse
    {
        $ideas = Idea::where('user_id', $id)->get();
        return response()->json($ideas, 200);
    }

    // search for an idea
    public function search($title): JsonResponse
    {
        // return idea with associated user
        return response()->json(Idea::with('user')->where('title', 'like', '%' . $title . '%')->get(), 200);
    }

}
