<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        DB::table('services')->insert([
            'title' => 'Modi sit est dela pireda nest',
            'icon' => 'bi bi-binoculars',
            'image' => 'working-1.jpg',
            'heading' => 'Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'list_items' => json_encode([
                'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'Duis aute irure dolor in reprehenderit in voluptate velit.',
            ]),
            'paragraph' => 'Ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
