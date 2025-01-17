<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'img1', 'img2', 'slug1', 'slug2', 'par1', 'par2', 'link'
    ];
}
