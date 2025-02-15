<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{
    /**
     * Display the About section in a Blade view.
     */
    public function index()
    {
        $about = About::first();
        return view('about.index', compact('about'));
    }

    /**
     * Show the form for creating or editing the About section.
     */
    public function edit()
    {
        $about = About::first();
        return view('about.edit', compact('about'));
    }

    /**
     * Create or update the About section.
     */
    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug1' => 'required|string|max:255',
            'slug2' => 'required|string|max:255',
            'par1' => 'required|string',
            'par2' => 'required|string',
            'link' => 'nullable|string|max:255',
            'list_items' => 'nullable|array', // Change to array validation
            'img1' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'img2' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $about = About::firstOrNew([]);

        if ($request->hasFile('img1')) {
            if ($about->img1) {
                Storage::disk('public')->delete($about->img1);
            }
            $about->img1 = $request->file('img1')->store('about_images', 'public');
        }

        if ($request->hasFile('img2')) {
            if ($about->img2) {
                Storage::disk('public')->delete($about->img2);
            }
            $about->img2 = $request->file('img2')->store('about_images', 'public');
        }

        // Handle list_items
        $listItems = $request->input('list_items', []);
        $about->list_items = array_filter($listItems); // Remove empty items

        $about->fill($request->except(['img1', 'img2', 'list_items']));
        $about->save();

        return redirect()->route('about.index')->with('success', 'About section updated successfully!');
    }
}
