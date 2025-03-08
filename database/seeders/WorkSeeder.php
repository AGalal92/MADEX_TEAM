<?php

namespace Database\Seeders;

use App\Models\Work;
use App\Models\WorkCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class WorkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure some categories exist (you can move this to a separate WorkCategorySeeder)
        $categories = [
            ['name' => 'Web Development', 'slug' => 'web-development'],
            ['name' => 'Graphic Design', 'slug' => 'graphic-design'],
            ['name' => 'Video Editing', 'slug' => 'video-editing'],
        ];

        foreach ($categories as $category) {
            WorkCategory::firstOrCreate(
                ['slug' => $category['slug']],
                ['name' => $category['name']]
            );
        }

        // Sample work data
        $works = [
            [
                'title' => 'Portfolio Website',
                'slug' => 'portfolio-website',
                'work_category_id' => WorkCategory::where('slug', 'web-development')->first()->id,
                'image' => 'works/images/portfolio-website.jpg',
                'video' => null,
                'image_before' => 'works/images/portfolio-before.jpg',
                'image_after' => 'works/images/portfolio-after.jpg',
                'slider_images' => [
                    'works/slider/portfolio-slide1.jpg',
                    'works/slider/portfolio-slide2.jpg',
                ],
            ],
            [
                'title' => 'Brand Logo Design',
                'slug' => 'brand-logo-design',
                'work_category_id' => WorkCategory::where('slug', 'graphic-design')->first()->id,
                'image' => 'works/images/brand-logo.jpg',
                'video' => null,
                'image_before' => null,
                'image_after' => null,
                'slider_images' => [
                    'works/slider/logo-slide1.jpg',
                ],
            ],
            [
                'title' => 'Promotional Video',
                'slug' => 'promotional-video',
                'work_category_id' => WorkCategory::where('slug', 'video-editing')->first()->id,
                'image' => null,
                'video' => 'works/videos/promo-video.mp4',
                'image_before' => null,
                'image_after' => null,
                'slider_images' => [],
            ],
        ];

        foreach ($works as $workData) {
            // Handle slider_images as JSON or array depending on your model
            $workData['slider_images'] = json_encode($workData['slider_images']);

            Work::create($workData);
        }

        // Optionally, fake some file uploads (for testing purposes)
        $this->fakeFiles();
    }

    /**
     * Fake file uploads for testing (optional).
     */
    private function fakeFiles(): void
    {
        // Create dummy files in storage (you can replace these with real files if needed)
        Storage::disk('public')->put('works/images/portfolio-website.jpg', 'Fake image content');
        Storage::disk('public')->put('works/images/portfolio-before.jpg', 'Fake before image content');
        Storage::disk('public')->put('works/images/portfolio-after.jpg', 'Fake after image content');
        Storage::disk('public')->put('works/slider/portfolio-slide1.jpg', 'Fake slide 1 content');
        Storage::disk('public')->put('works/slider/portfolio-slide2.jpg', 'Fake slide 2 content');

        Storage::disk('public')->put('works/images/brand-logo.jpg', 'Fake logo content');
        Storage::disk('public')->put('works/slider/logo-slide1.jpg', 'Fake logo slide content');

        Storage::disk('public')->put('works/videos/promo-video.mp4', 'Fake video content');
    }
}
