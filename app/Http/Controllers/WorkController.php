<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\WorkCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WorkController extends Controller
{
    public function index()
    {
        $works = Work::with('category')->get();
        dd($works);
        return view('works.index', compact('works'));
    }

    public function create()
    {
        $categories = WorkCategory::all();
        return view('works.create', compact('categories'));
    }

    public function store(Request $request)
    {
        // dd($request);
        // dd($request);
        // $request->validate([
        //     'title' => 'required|string|max:255',
        //     'slug' => 'required|string|max:255|unique:works,slug',
        //     'image' => 'required|image|max:204800',
        //     'video' => 'nullable|mimes:mp4,mkv,avi,webm|max:5120000',
        //     'slider.*' => 'image|max:204800',
        //     'work_category_id' => 'required|exists:work_categories,id',
        // ]);

        $imagePath = $request->file('image')->store('works/images', 'public');
        $videoPath = $request->file('video') ? $request->file('video')->store('works/videos', 'public') : null;

        $sliderImages = [];
        if ($request->hasFile('slider')) {
            foreach ($request->file('slider') as $sliderImage) {
                $sliderImages[] = $sliderImage->store('works/slider', 'public');
            }
        }

        Work::create([
            'title' => $request->title,
            'slug' => $request->title,
            'image' => $imagePath,
            'video' => $videoPath,
            'slider' => $sliderImages,
            'work_category_id' => $request->work_category_id,
        ]);

        return redirect()->route('works.index')->with('success', 'Work created successfully.');
    }

    public function edit(Work $work)
    {
        $categories = WorkCategory::all();
        return view('works.edit', compact('work', 'categories'));
    }

    public function update(Request $request, Work $work)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:works,slug,' . $work->id,
            'image' => 'nullable|image|max:204800',
            'video' => 'nullable|mimes:mp4,mkv,avi|max:5120000',
            'slider.*' => 'image|max:204800',
            'work_category_id' => 'required|exists:work_categories,id',
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($work->image);
            $imagePath = $request->file('image')->store('works/images', 'public');
            $work->image = $imagePath;
        }

        if ($request->hasFile('video')) {
            if ($work->video) {
                Storage::disk('public')->delete($work->video);
            }
            $videoPath = $request->file('video')->store('works/videos', 'public');
            $work->video = $videoPath;
        }

        if ($request->hasFile('slider')) {
            foreach ($work->slider ?? [] as $oldSliderImage) {
                Storage::disk('public')->delete($oldSliderImage);
            }

            $sliderImages = [];
            foreach ($request->file('slider') as $sliderImage) {
                $sliderImages[] = $sliderImage->store('works/slider', 'public');
            }
            $work->slider = $sliderImages;
        }

        $work->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'work_category_id' => $request->work_category_id,
        ]);

        return redirect()->route('works.index')->with('success', 'Work updated successfully.');
    }

    public function destroy(Work $work)
    {
        if ($work->image) {
            Storage::disk('public')->delete($work->image);
        }
        if ($work->video) {
            Storage::disk('public')->delete($work->video);
        }
        if ($work->slider) {
            foreach ($work->slider as $oldSliderImage) {
                Storage::disk('public')->delete($oldSliderImage);
            }
        }

        $work->delete();

        return redirect()->route('works.index')->with('success', 'Work deleted successfully.');
    }
}
