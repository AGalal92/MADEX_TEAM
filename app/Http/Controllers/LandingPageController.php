<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Service;
use App\Models\WorkCategory;
use App\Models\Work;
use App\Models\Team;
use App\Models\Contact;

class LandingPageController extends Controller
{
    public function index()
    {
        $about = About::first(); // Retrieve the first About record
        $services = Service::all(); // Get all services
        $categories = WorkCategory::all(); // Get all work categories
        $works = Work::all(); // Get all works
        $teamMembers = Team::all(); // Get all team members
        $contact = Contact::first(); // Retrieve contact details

        return view('home', compact('about', 'services', 'categories', 'works', 'teamMembers', 'contact'));
    }
}
