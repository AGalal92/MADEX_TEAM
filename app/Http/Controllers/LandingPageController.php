<?php

namespace App\Http\Controllers;

use App\Models\About;

class LandingPageController extends Controller
{
    public function index()
    {
        $about = About::first(); // Retrieve the single About record
        return view('home', compact('about')); // Pass to the view
    }
    
}
