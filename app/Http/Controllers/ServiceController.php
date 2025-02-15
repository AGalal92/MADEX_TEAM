<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    /**
     * Display a listing of services.
     */
    public function index()
    {
        $services = Service::all();
        return view('services.index', compact('services'));
    }

    /**
     * Show the form for creating a new service.
     */
    public function create()
    {
        return view('services.create');
    }

    /**
     * Store a newly created service in the database.
     */
    public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'icon' => 'nullable|string|max:255',
        'heading' => 'nullable|string|max:255',
        'description' => 'nullable|string',
        'paragraph' => 'nullable|string',
        'list_items' => 'nullable|array',
        'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    $data = $request->except('image');

    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('services/images', 'public');
    }

    // Remove empty items from list_items array
    $data['list_items'] = array_filter($request->list_items ?? []);

    Service::create($data);

    return redirect()->route('services.index')->with('success', 'Service created successfully!');
}

    /**
     * Show the form for editing an existing service.
     */
    public function edit(Service $service)
    {
        return view('services.edit', compact('service'));
    }

    /**
     * Update an existing service.
     */
    public function update(Request $request, Service $service)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'icon' => 'nullable|string|max:255',
        'heading' => 'nullable|string|max:255',
        'description' => 'nullable|string',
        'paragraph' => 'nullable|string',
        'list_items' => 'nullable|array',
        'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    $data = $request->except('image');

    if ($request->hasFile('image')) {
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }
        $data['image'] = $request->file('image')->store('services/images', 'public');
    }

    // Remove empty items from list_items array
    $data['list_items'] = array_filter($request->list_items ?? []);

    $service->update($data);

    return redirect()->route('services.index')->with('success', 'Service updated successfully!');
}

    /**
     * Remove a service from the database.
     */
    public function destroy(Service $service)
    {
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        return redirect()->route('services.index')->with('success', 'Service deleted successfully!');
    }
}
