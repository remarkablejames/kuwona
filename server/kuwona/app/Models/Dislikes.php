<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dislikes extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'idea_post_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function idea()
    {
        return $this->belongsTo(Idea::class, 'idea_post_id');
    }
}
