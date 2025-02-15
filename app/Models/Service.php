<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'icon',
        'image',
        'heading',
        'description',
        'paragraph',
        'list_items',
    ];

    protected $casts = [
        'list_items' => 'array',
    ];
}
