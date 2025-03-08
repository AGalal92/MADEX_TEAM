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
        $teamMembers = Team::all(); // Changed variable name to match frontend
        return view('teams.index', compact('teamMembers'));
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
        'social_links' => 'nullable|array',
        'social_links.*.url' => 'nullable|url|max:255',
        'social_links.*.icon' => 'nullable|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    // Prepare data
    $data = $request->only(['name', 'position']);

    // Handle social links, adding protocol if missing
    $socialLinks = $request->input('social_links', []);
    foreach ($socialLinks as &$link) {
        if (!empty($link['url']) && !preg_match('/^https?:\/\//', $link['url'])) {
            $link['url'] = 'https://' . $link['url'];
        }
    }
    unset($link); // Unset reference to avoid issues
    $data['social_links'] = !empty($socialLinks) ? json_encode($socialLinks) : null;

    // Handle image upload
    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('team/images', 'public');
    }

    // Create the team member
    Team::create($data);

    return redirect()->route('teams.index')->with('success', 'Team member created successfully!');
}

    /**
     * Show the form for editing an existing team member.
     */
    public function edit(Team $team)
{
    if (is_string($team->social_links)) {
        $team->social_links = json_decode($team->social_links, true);
    }
    return view('teams.edit', compact('team'));
}

    /**
     * Update an existing team member.
     */

     public function update(Request $request, Team $team)
     {
         $request->validate([
             'name' => 'required|string|max:255',
             'position' => 'required|string|max:255',
             'social_links' => 'nullable|array',
             'social_links.*.url' => 'nullable|url|max:255',
             'social_links.*.icon' => 'nullable|string|max:255',
             'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
         ]);

         $data = $request->only(['name', 'position']);

         $socialLinks = $request->input('social_links', []);
         foreach ($socialLinks as &$link) {
             if (!empty($link['url']) && !preg_match('/^https?:\/\//', $link['url'])) {
                 $link['url'] = 'https://' . $link['url'];
             }
         }
         unset($link);
         $data['social_links'] = !empty($socialLinks) ? json_encode($socialLinks) : null;

         if ($request->hasFile('image')) {
             if ($team->image) {
                 Storage::disk('public')->delete($team->image);
             }
             $data['image'] = $request->file('image')->store('team/images', 'public');
         }

         $team->update($data);

         return redirect()->route('teams.index')->with('success', 'Team member updated successfully!');
     }
    /**
     * Remove a team member from the database.
     */
    public function destroy(Team $team)
    {
        if ($team->image) {
            Storage::disk('public')->delete($team->image);
        }
        $team->delete();

        return redirect()->route('teams.index')->with('success', 'Team member deleted successfully!');
    }
}
