<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    /**
     * Display a listing of team members.
     */
    public function index()
    {
        $team = Team::all();
        return view('teams.index', compact('team'));
    }

    /**
     * Show the form for creating a new team member.
     */
    public function create()
    {
        return view('teams.create');
    }

    /**
     * Store a newly created team member in the database.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'social_links' => 'nullable|string', // JSON string
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Decode social_links JSON string to an array
        $socialLinks = json_decode($request->social_links, true);
        if (!is_array($socialLinks)) {
            $socialLinks = [];
        }

        // Handle image upload
        $data = $request->except(['image', 'social_links']);
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('team/images', 'public');
        }

        // Store social links as JSON only if it's not empty
        $data['social_links'] = !empty($socialLinks) ? json_encode($socialLinks) : null;

        // Create the team member
        Team::create($data);

        return redirect()->route('teams.index')->with('success', 'Team member created successfully!');
    }

    /**
     * Show the form for editing an existing team member.
     */
    public function edit(Team $team)
    {
        return view('teams.edit', compact('team'));
    }

    /**
     * Update an existing team member.
     */
    public function update(Request $request, Team $team)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'social_links' => 'nullable|string', // JSON string
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Decode social_links JSON string to an array
        $socialLinks = json_decode($request->social_links, true);
        if (!is_array($socialLinks)) {
            $socialLinks = [];
        }

        // Handle image upload
        $data = $request->except(['image', 'social_links']);
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($team->image) {
                Storage::disk('public')->delete($team->image);
            }
            // Store the new image
            $data['image'] = $request->file('image')->store('team/images', 'public');
        }

        // Store social links as JSON only if it's not empty
        $data['social_links'] = !empty($socialLinks) ? json_encode($socialLinks) : null;

        // Update the team member
        $team->update($data);

        return redirect()->route('teams.index')->with('success', 'Team member updated successfully!');
    }

    /**
     * Remove a team member from the database.
     */
    public function destroy(Team $team)
    {
        // Delete the image if it exists
        if ($team->image) {
            Storage::disk('public')->delete($team->image);
        }

        // Delete the team member
        $team->delete();

        return redirect()->route('teams.index')->with('success', 'Team member deleted successfully!');
    }
}
