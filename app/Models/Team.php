<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name', 'position', 'social_links', 'image'];

    protected $casts = [
        'social_links' => 'array', // Automatically casts JSON to array
    ];
}
