<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AboutSeeder extends Seeder
{
    public function run()
    {
        DB::table('abouts')->insert([
            'title' => 'About Us',
            'img1' => 'about-image1.jpg',
            'img2' => 'about-image2.jpg',
            'slug1' => 'about-section-one',
            'slug2' => 'about-section-two',
            'par1' => 'This is the first paragraph about us.',
            'par2' => 'This is the second paragraph about us.',
            'link' => 'https://example.com/about',
            'list_items' => json_encode([
                'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'Duis aute irure dolor in reprehenderit in voluptate velit.',
                'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
