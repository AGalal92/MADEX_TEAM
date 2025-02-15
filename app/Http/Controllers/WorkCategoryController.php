<?php

namespace App\Http\Controllers;

use App\Models\WorkCategory;
use Illuminate\Http\Request;

class WorkCategoryController extends Controller
{
    /**
     * Display a listing of work categories.
     */
    public function index()
    {
        $categories = WorkCategory::all();
        return view('work-categories.index', compact('categories'));
    }

    /**
     * Show the form for creating a new work category.
     */
    public function create()
    {
        return view('work-categories.create');
    }

    /**
     * Store a newly created work category in the database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
        ]);

        WorkCategory::create($request->all());

        return redirect()->route('work-categories.index')->with('success', 'Category created successfully!');
    }

    /**
     * Show the form for editing an existing work category.
     */
    public function edit(WorkCategory $workCategory)
    {
        return view('work-categories.edit', compact('workCategory'));
    }

    /**
     * Update an existing work category.
     */
    public function update(Request $request, WorkCategory $workCategory)
    {
        $request->validate([
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
        ]);

        $workCategory->update($request->all());

        return redirect()->route('work-categories.index')->with('success', 'Category updated successfully!');
    }

    /**
     * Remove a work category from the database.
     */
    public function destroy(WorkCategory $workCategory)
    {
        $workCategory->delete();

        return redirect()->route('work-categories.index')->with('success', 'Category deleted successfully!');
    }
}
