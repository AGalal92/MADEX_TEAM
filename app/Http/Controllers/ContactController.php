<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display the contact messages in a Blade view.
     */
    public function index()
    {
        $contacts = Contact::all();
        return view('contacts.index', compact('contacts'));
    }

    /**
     * Get a single contact message by ID.
     */
    public function show($id)
    {
        $contact = Contact::findOrFail($id);
        return view('contacts.show', compact('contact'));
    }

    /**
     * Create a new contact message (Accessible to Everyone).
     */
    public function store(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            // Create the contact message
            Contact::create($validatedData);

            // Return JSON for AJAX request
            if ($request->ajax()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Your message has been sent successfully!',
                ]);
            }

            // Return success message for normal submission
            return redirect()->route('home')->with('success', 'Your message has been sent successfully!');
        } catch (\Exception $e) {
            // Handle errors for both AJAX and normal requests
            if ($request->ajax()) {
                return response()->json([
                    'success' => false,
                    'message' => 'An error occurred while sending your message. Please try again.',
                ], 500);
            }

            return redirect()->route('home')->with('error', 'An error occurred while sending your message. Please try again.');
        }
    }

    /**
     * Delete a contact message.
     */
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return redirect()->route('contacts.index')->with('success', 'Contact message deleted successfully!');
    }
}
