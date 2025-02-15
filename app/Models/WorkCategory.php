<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'title',
    ];

    public function works()
    {
        return $this->hasMany(Work::class, 'work_category_id');
    }
}
