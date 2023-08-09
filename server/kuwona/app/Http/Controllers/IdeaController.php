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
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:5000', // Adjust accepted formats and size
        ]);

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

    // update an existing idea
    public function update($id): JsonResponse
    {
        $idea = Idea::find($id);
        $idea->title = request('title');
        $idea->slug = request('slug');
        $idea->description = request('description');
        $idea->save();

        return response()->json($idea, 200);
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
        return response()->json(Idea::where('title', 'like', '%'.$title.'%')->get(), 200);
    }

}
