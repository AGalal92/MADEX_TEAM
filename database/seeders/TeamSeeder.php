<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
{
    public function run()
    {
        DB::table('teams')->insert([
            [
                'image' => 'team-1.jpg',
                'name' => 'Walter White',
                'position' => 'Chief Executive Officer',
                'social_links' => json_encode([
                    ['icon' => 'bi bi-twitter', 'url' => '#'],
                    ['icon' => 'bi bi-facebook', 'url' => '#'],
                    ['icon' => 'bi bi-instagram', 'url' => '#'],
                    ['icon' => 'bi bi-linkedin', 'url' => '#'],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'image' => 'team-2.jpg',
                'name' => 'Jesse Pinkman',
                'position' => 'Marketing Head',
                'social_links' => json_encode([
                    ['icon' => 'bi bi-twitter', 'url' => '#'],
                    ['icon' => 'bi bi-facebook', 'url' => '#'],
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
