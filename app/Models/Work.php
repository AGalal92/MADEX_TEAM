<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'image', 'video', 'image_before', 'image_after', 'slider_images', 'work_category_id'
    ];

    protected $casts = [
        'slider_images' => 'array', // ✅ Ensure it's cast as an array
    ];

    public function workCategory()
    {
        return $this->belongsTo(WorkCategory::class, 'work_category_id');
    }
}
