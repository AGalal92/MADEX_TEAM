<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkSeeder extends Seeder
{
    public function run()
    {
        DB::table('works')->insert([
            [
                'title' => 'Portfolio Website',
                'slug' => 'portfolio-website',
                'image' => 'portfolio.jpg',
                'video' => 'portfolio.mp4',
                'slider_images' => json_encode(['image1.jpg', 'image2.jpg', 'image3.jpg']),
                'work_category_id' => 1, // Ensure valid category ID
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'E-commerce App',
                'slug' => 'ecommerce-app',
                'image' => 'ecommerce.jpg',
                'video' => 'ecommerce.mp4',
                'slider_images' => json_encode(['product1.jpg', 'product2.jpg', 'product3.jpg']),
                'work_category_id' => 2, // Ensure valid category ID
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
