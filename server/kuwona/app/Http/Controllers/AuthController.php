<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email'=> 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',


        ]);
        $imagePath = "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=170667a&w=0&k=20&c=bsbD0qLFJ6fSUCXG_iyo7JBnmKi6T-uUblC8FNZFJoU="; // Initialize $imagePath with a default value

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'mimes:jpeg,jpg,png,gif|required|max:2048'
            ]);
            $imagePath = $request->file('image')->store('user_images', 'public'); // Store in 'public' disk
            $imagePath = asset('storage/' . $imagePath); // Generate full URL for stored image (ex: http://localhost:8000/storage/idea_images/idea_image.jpg)
        }
        $user = new User([
            'name' => $request->name,
            'email'=> $request->email,
            'password' => bcrypt($request->password),
            'image' => $imagePath,
        ]);
        $user->save();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['message' => 'Successfully created user',
            'token' => $token,
            'user' => $user
            ], 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
//
//    public function refresh()
//    {
//        $token = auth()->refresh();
//        return response()->json(['token' => $token]);
//    }
}
