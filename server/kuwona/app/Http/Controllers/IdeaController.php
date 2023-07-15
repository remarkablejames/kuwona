<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Http\Request;

class IdeaController extends Controller
{
    public function index()
    {
        $ideas = Idea::all();
        return response()->json($ideas, 200);
    }

    public function show($id)
    {
        $idea = Idea::find($id);
        return response()->json($idea, 200);
    }

    // create a new idea
    public function store()
    {
        $idea = new Idea();
        $idea->title = request('title');
        $idea->slug = request('slug');
        $idea->description = request('description');
        $idea->rating = request('rating');
        $idea->save();

        return response()->json($idea, 201);
    }

    // update an existing idea
    public function update($id)
    {
        $idea = Idea::find($id);
        $idea->title = request('title');
        $idea->slug = request('slug');
        $idea->description = request('description');
        $idea->rating = request('rating');
        $idea->save();

        return response()->json($idea, 200);
    }

    // delete an existing idea
    public function destroy($id)
    {
        $idea = Idea::find($id);
        $idea->delete();

        return response()->json(null, 204);
    }
}
