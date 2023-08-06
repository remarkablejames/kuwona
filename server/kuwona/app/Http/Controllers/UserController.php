<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return error saying that this route is not allowed
        return response()->json(['message' => 'This route is not allowed'], 405);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return User::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // update the user
        $user = User::find($id);
        $user->update($request->only('name', 'email', 'password'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function uploadProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user = Auth::user();

        if($request->hasFile('profile_picture'))
        {
            $profilePicture = $request->file('profile_picture');
            $profilePictureName = time().'.'.$profilePicture->getClientOriginalExtension();
            $profilePicture->storeAs('public/profile_pictures', $profilePictureName);
            $user->profile_picture = $profilePictureName;
            $user->save();
        }

        return response()->json(['message' => 'Profile picture uploaded successfully'], 200);
    }
}
