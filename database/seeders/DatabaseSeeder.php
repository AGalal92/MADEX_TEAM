<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            AboutSeeder::class,
            ContactSeeder::class,
            ServiceSeeder::class,
            TeamSeeder::class,
            WorkCategorySeeder::class,
            WorkSeeder::class,
            UserSeeder::class,
        ]);
    }
}
