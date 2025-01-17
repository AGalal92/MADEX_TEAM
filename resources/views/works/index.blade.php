<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Works') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <h3 class="text-lg font-bold mb-4">List of Works</h3>
                    <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            <tr>
                                <th class="py-2 px-4 border-b">Title</th>
                                <th class="py-2 px-4 border-b">Slug</th>
                                <th class="py-2 px-4 border-b">Category</th>
                                <th class="py-2 px-4 border-b">Image</th>
                                <th class="py-2 px-4 border-b">Slider Images</th>
                                <th class="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($works as $work)
                                <tr class="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td class="py-2 px-4">{{ $work->title }}</td>
                                    <td class="py-2 px-4">{{ $work->slug }}</td>
                                    <td class="py-2 px-4">{{ $work->category->name }}</td>
                                    <td class="py-2 px-4">
                                        <img src="{{ Storage::url($work->image) }}" alt="{{ $work->title }}" class="h-16 w-16 object-cover rounded">
                                    </td>
                                    <td class="py-2 px-4">
                                        <div class="flex space-x-2">
                                            @foreach ($work->slider_images ?? [] as $sliderImage)
                                                <img src="{{ Storage::url($sliderImage) }}" alt="Slider Image" class="h-12 w-12 object-cover rounded">
                                            @endforeach
                                        </div>
                                    </td>
                                    <td class="py-2 px-4 flex space-x-2">
                                        <a href="{{ route('works.edit', $work->id) }}" class="text-blue-500 hover:underline">Edit</a>
                                        <form action="{{ route('works.destroy', $work->id) }}" method="POST" class="inline-block">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="text-red-500 hover:underline">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                    <a href="{{ route('works.create') }}" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
                        Add New Work
                    </a>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
