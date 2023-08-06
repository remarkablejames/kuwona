<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

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
            'description' => 'required'
        ]);

        $idea = Idea::create($request->all());
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

    // search for an idea
    public function search($title): JsonResponse
    {
        return response()->json(Idea::where('title', 'like', '%'.$title.'%')->get(), 200);
    }

}
