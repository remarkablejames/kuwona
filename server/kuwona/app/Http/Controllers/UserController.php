<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

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

//    public function update_user(Request $request)
//    {
//        $validated = $request->validate([
//            'name' => 'required|string|max:255',
//            'email' => 'required|email',
//            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
//        ]);
//        if (!$validated) {
//            return response()->json(['message' => 'Validation failed'], 400);
//        }
//
//        $user=$request->user();
//
//        if($request->hasFile('profile_picture')){
//            if ($user->profile_picture){
//                $old_image_path = public_path(). '/uploads/profile_pictures/' . $user->profile_picture;
//                if (File::exists($old_image_path)) {
//                    File::delete($old_image_path);
//                }
//            }
//            $image_name = 'profile_picture_' . time() . '.' . $request->profile_picture->
//                extension();
//            $request->profile_picture->move(public_path('uploads/profile_pictures'), $image_name);
//        }
//        else{
//            $image_name = $user->profile_picture;
//        }
//
//        $user->update([
//            'name' => $request->name,
//            'email' => $request->email,
//            'profile_picture' => $image_name,
//        ]);
//
//        return response()->json(['message' => 'User updated successfully'], 200);
//    }
}
