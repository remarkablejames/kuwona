<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikesAndDislikes extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'idea_id', 'liked_ideas', 'disliked_ideas'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function idea()
    {
        return $this->belongsTo(Idea::class, 'idea_id');
    }
}
