<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Contact Message Details') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <div class="space-y-4">
                        <!-- Name -->
                        <div>
                            <label class="block text-sm font-medium">Name</label>
                            <p class="mt-1">{{ $contact->name }}</p>
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-medium">Email</label>
                            <p class="mt-1">{{ $contact->email }}</p>
                        </div>

                        <!-- Subject -->
                        <div>
                            <label class="block text-sm font-medium">Subject</label>
                            <p class="mt-1">{{ $contact->subject }}</p>
                        </div>

                        <!-- Message -->
                        <div>
                            <label class="block text-sm font-medium">Message</label>
                            <p class="mt-1 whitespace-pre-wrap">{{ $contact->message }}</p>
                        </div>
                    </div>

                    <!-- Back Button -->
                    <div class="mt-6">
                        <a href="{{ route('contacts.index') }}" class="px-4 py-2 bg-blue-500 text-white rounded">Back to List</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
