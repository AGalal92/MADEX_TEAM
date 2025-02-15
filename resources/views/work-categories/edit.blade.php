<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Edit Work Category') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="{{ route('work-categories.update', $workCategory->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="mb-4">
                            <label for="category" class="block text-sm font-medium">Category</label>
                            <input
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                             type="text" name="category" id="category" value="{{ $workCategory->category }}" class="mt-1 block w-full" required>
                        </div>
                        <div class="mb-4">
                            <label for="title" class="block text-sm font-medium">Title</label>
                            <input
                            class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" type="text" name="title" id="title" value="{{ $workCategory->title }}" class="mt-1 block w-full" required>
                        </div>
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
