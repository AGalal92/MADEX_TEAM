<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\WorkCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WorkController extends Controller
{
    /**
     * Display a listing of works.
     */
    public function index()
    {
        $works = Work::with('workCategory')->get();
        return view('works.index', compact('works'));
    }

    /**
     * Show the form for creating a new work.
     */
    public function create()
    {
        $categories = WorkCategory::all();
        return view('works.create', compact('categories'));
    }

    /**
     * Store a newly created work in the database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:works,slug',
            'work_category_id' => 'required|exists:work_categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'video' => 'nullable|mimes:mp4,mkv,avi,webm|max:5120000',
            'image_before' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'image_after' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'slider_images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('works/images', 'public');
        }
        if ($request->hasFile('video')) {
            $data['video'] = $request->file('video')->store('works/videos', 'public');
        }
        if ($request->hasFile('image_before')) {
            $data['image_before'] = $request->file('image_before')->store('works/images', 'public');
        }
        if ($request->hasFile('image_after')) {
            $data['image_after'] = $request->file('image_after')->store('works/images', 'public');
        }

        $sliderImages = [];
        if ($request->hasFile('slider_images')) {
            foreach ($request->file('slider_images') as $sliderImage) {
                $sliderImages[] = $sliderImage->store('works/slider', 'public');
            }
        }
        $data['slider_images'] = $sliderImages;

        Work::create($data);

        return redirect()->route('works.index')->with('success', 'Work created successfully!');
    }

    /**
     * Show the form for editing an existing work.
     */
    public function edit(Work $work)
    {
        $categories = WorkCategory::all();
        return view('works.edit', compact('work', 'categories'));
    }

    /**
     * Update an existing work.
     */
    public function update(Request $request, Work $work)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:works,slug,' . $work->id,
            'work_category_id' => 'required|exists:work_categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'video' => 'nullable|mimes:mp4,mkv,avi,webm|max:5120000',
            'image_before' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'image_after' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'slider_images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $data = $request->except(['image', 'video', 'image_before', 'image_after', 'slider_images']);

        // Handle image upload and deletion
        if ($request->hasFile('image')) {
            if ($work->image) {
                Storage::disk('public')->delete($work->image); // Delete old image if it exists
            }
            $data['image'] = $request->file('image')->store('works/images', 'public');
        }

        // Handle video upload and deletion
        if ($request->hasFile('video')) {
            if ($work->video) {
                Storage::disk('public')->delete($work->video); // Delete old video if it exists
            }
            $data['video'] = $request->file('video')->store('works/videos', 'public');
        }

        // Handle image_before upload and deletion
        if ($request->hasFile('image_before')) {
            if ($work->image_before) {
                Storage::disk('public')->delete($work->image_before); // Delete old image_before if it exists
            }
            $data['image_before'] = $request->file('image_before')->store('works/images', 'public');
        }

        // Handle image_after upload and deletion
        if ($request->hasFile('image_after')) {
            if ($work->image_after) {
                Storage::disk('public')->delete($work->image_after); // Delete old image_after if it exists
            }
            $data['image_after'] = $request->file('image_after')->store('works/images', 'public');
        }

        // Handle slider_images upload and deletion
        if ($request->hasFile('slider_images')) {
            foreach ($work->slider_images ?? [] as $oldSliderImage) {
                Storage::disk('public')->delete($oldSliderImage); // Delete old slider images if they exist
            }

            $sliderImages = [];
            foreach ($request->file('slider_images') as $sliderImage) {
                $sliderImages[] = $sliderImage->store('works/slider', 'public');
            }
            $data['slider_images'] = $sliderImages;
        }

        $work->update($data);

        return redirect()->route('works.index')->with('success', 'Work updated successfully!');
    }

    /**
     * Remove a work from the database.
     */
    public function destroy(Work $work)
    {
        if ($work->image) {
            Storage::disk('public')->delete($work->image);
        }
        if ($work->video) {
            Storage::disk('public')->delete($work->video);
        }
        if ($work->slider_images) {
            foreach ($work->slider_images as $oldSliderImage) {
                Storage::disk('public')->delete($oldSliderImage);
            }
        }

        $work->delete();

        return redirect()->route('works.index')->with('success', 'Work deleted successfully!');
    }
}
