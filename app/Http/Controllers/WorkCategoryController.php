<?php

namespace App\Http\Controllers;

use App\Models\WorkCategory;
use Illuminate\Http\Request;

class WorkCategoryController extends Controller
{
    public function index()
    {
        $categories = WorkCategory::all();
        return view('work-categories.index', compact('categories'));
    }

    public function create()
    {
        return view('work-categories.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:work_categories,name',
            'slug' => 'required|string|max:255|unique:work_categories,slug',
        ]);

        WorkCategory::create($request->all());
        return redirect()->route('work-categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(WorkCategory $workCategory)
    {
        return view('work-categories.edit', compact('workCategory'));
    }

    public function update(Request $request, WorkCategory $workCategory)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:work_categories,name,' . $workCategory->id,
            'slug' => 'required|string|max:255|unique:work_categories,slug,' . $workCategory->id,
        ]);

        $workCategory->update($request->all());
        return redirect()->route('work-categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(WorkCategory $workCategory)
    {
        $workCategory->delete();
        return redirect()->route('work-categories.index')->with('success', 'Category deleted successfully.');
    }
}
