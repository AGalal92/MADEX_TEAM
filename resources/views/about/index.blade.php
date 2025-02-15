<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('About Section') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    @if(session('success'))
                        <div class="mb-4 text-green-600 dark:text-green-400">
                            {{ session('success') }}
                        </div>
                    @endif

                    <h3 class="text-lg font-bold mb-4">About Section</h3>

                    @if($about)
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium">Title</label>
                                <p class="mt-1">{{ $about->title }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium">Slug 1</label>
                                <p class="mt-1">{{ $about->slug1 }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium">Slug 2</label>
                                <p class="mt-1">{{ $about->slug2 }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium">Paragraph 1</label>
                                <p class="mt-1">{{ $about->par1 }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium">Paragraph 2</label>
                                <p class="mt-1">{{ $about->par2 }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium">Link</label>
                                <p class="mt-1">{{ $about->link }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium">List Items</label>
                                <ul class="mt-1 list-disc list-inside">
                                    @foreach ($about->list_items as $item)
                                        <li>{{ $item }}</li>
                                    @endforeach
                                </ul>
                            </div>
                            <div>
                                <label class="block text-sm font-medium">Image 1</label>
                                @if($about->img1)
                                    <img src="{{ Storage::url($about->img1) }}" alt="Image 1" class="h-32 w-32 object-cover rounded mt-2">
                                @else
                                    <p class="mt-1 text-gray-500">No image uploaded.</p>
                                @endif
                            </div>
                            <div>
                                <label class="block text-sm font-medium">Image 2</label>
                                @if($about->img2)
                                    <img src="{{ Storage::url($about->img2) }}" alt="Image 2" class="h-32 w-32 object-cover rounded mt-2">
                                @else
                                    <p class="mt-1 text-gray-500">No image uploaded.</p>
                                @endif
                            </div>
                        </div>

                        <div class="mt-6">
                            <a href="{{ route('about.edit') }}" class="px-4 py-2 bg-blue-500 text-white rounded">Edit About Section</a>
                        </div>
                    @else
                        <p class="text-gray-500">No about section data found.</p>
                        <div class="mt-6">
                            <a href="{{ route('about.edit') }}" class="px-4 py-2 bg-blue-500 text-white rounded">Create About Section</a>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
