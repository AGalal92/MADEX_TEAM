<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkCategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['category' => 'app', 'title' => 'App 1'],
            ['category' => 'product', 'title' => 'Product 1'],
            ['category' => 'branding', 'title' => 'Branding 1'],
            ['category' => 'books',  'title' => 'Books 1'],
        ];

        foreach ($categories as $category) {
            DB::table('work_categories')->insert([
                'category' => $category['category'],
                'title' => $category['title'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
