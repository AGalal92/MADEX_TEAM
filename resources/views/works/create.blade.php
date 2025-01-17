<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Create Work') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="{{ route('works.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <!-- Title -->
                        <div class="mb-4">
                            <label for="title"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input type="text" name="title" id="title" required
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        </div>

                        <!-- Category -->
                        <div class="mb-4">
                            <label for="work_category_id"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <select name="work_category_id" id="work_category_id" required
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                                <option value="" disabled selected>Select a category</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @endforeach
                            </select>

                        </div>

                        <!-- Other Fields (Image, Video, Slider, etc.) -->
                        <div class="mb-4">
                            <label for="image"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                            <input type="file" name="image" id="image" class="mt-1 block w-full">
                        </div>

                        <div class="mb-4">
                            <label for="slider"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Slider (Multiple
                                Images)</label>
                            <input type="file" name="slider[]" id="slider" multiple class="mt-1 block w-full">
                        </div>

                        <div class="mb-4">
                            <label for="video"
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300">Video</label>
                            <input type="file" name="video" id="video" accept="video/*"
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        </div>

                        <!-- Submit Button -->
                        <div>
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Create Work</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
