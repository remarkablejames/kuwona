<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_picture',
    ];

//    public $appends = ['user_image_url'];

    public function idea(){
        return $this->hasMany(Idea::class);
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }

    public function likedIdeas()
    {
        return $this->belongsToMany(Idea::class, 'likes', 'user_id', 'idea_id');
    }

    public function dislikedIdeas()
    {
        return $this->belongsToMany(Idea::class, 'dislikes', 'user_id', 'idea_id');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

//    public function getUserImageUrlAttribute()
//    {
//        return asset('/uploads/profile_pictures/' . $this->profile_picture);
//    }
}
