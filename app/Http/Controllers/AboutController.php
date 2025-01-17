<?php

namespace App\Http\Controllers;

use App\Models\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    // Display the edit form
    public function edit()
    {
        $about = About::first(); // Retrieve the single record
        if (!$about) {
            // Create the record if it doesn't exist
            $about = About::create([
                'title' => '',
                'img1' => null,
                'img2' => null,
                'slug1' => '',
                'slug2' => '',
                'par1' => '',
                'par2' => '',
                'link' => '',
            ]);
        }

        return view('abouts.edit', compact('about'));
    }

    // Update the record
    public function update(Request $request)
    {
        // dd('sss');

        $about = About::first();

        // $request->validate([
        //     'title' => 'required|string|max:255',
        //     'slug1' => 'required|string|max:255',
        //     'slug2' => 'required|string|max:255',
        //     'par1' => 'required|string',
        //     'par2' => 'required|string',
        //     'link' => 'nullable|string|max:255',
        //     'img1' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        //     'img2' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        // ]);

        $data = $request->all();
        // dd($data);

        // Handle file uploads
        if ($request->hasFile('img1')) {
            $data['img1'] = $request->file('img1')->store('about_images', 'public');
        }

        if ($request->hasFile('img2')) {
            $data['img2'] = $request->file('img2')->store('about_images', 'public');
        }

        $about->update($data);

        return redirect()->route('about.edit')->with('success', 'About section updated successfully.');
    }
}
