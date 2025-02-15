<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Edit Work') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="{{ route('works.update', $work->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <!-- Title -->
                        <div class="mb-4">
                            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                            <input type="text" name="title" id="title" value="{{ $work->title }}" required
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        </div>

                        <!-- Slug -->
                        <div class="mb-4">
                            <label for="slug" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
                            <input type="text" name="slug" id="slug" value="{{ $work->slug }}" required
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        </div>

                       <!-- Category Dropdown -->
                        <div class="mb-4">
                            <label for="work_category_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <select name="work_category_id" id="work_category_id" required
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}" {{ $work->work_category_id == $category->id ? 'selected' : '' }}>
                                        {{ $category->category }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Image -->
                        <div class="mb-4">
                            <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label>
                            <input type="file" name="image" id="image" class="mt-1 block w-full" onchange="previewImage(event, 'image-preview')">
                            <div id="image-preview" class="mt-2">
                                @if($work->image)
                                    <img src="{{ Storage::url($work->image) }}" alt="Current Image" class="h-32 w-32 object-cover rounded">
                                @endif
                            </div>
                        </div>

                        <!-- Video -->
                        <div class="mb-4">
                            <label for="video" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Video</label>
                            <input type="file" name="video" id="video" class="mt-1 block w-full">
                            @if($work->video)
                                <video src="{{ Storage::url($work->video) }}" controls class="h-32 w-32 object-cover rounded mt-2"></video>
                            @endif
                        </div>

                        <!-- Image Before -->
                        <div class="mb-4">
                            <label for="image_before" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Image Before</label>
                            <input type="file" name="image_before" id="image_before" class="mt-1 block w-full" onchange="previewImage(event, 'image-before-preview')">
                            <div id="image-before-preview" class="mt-2">
                                @if($work->image_before)
                                    <img src="{{ Storage::url($work->image_before) }}" alt="Current Image Before" class="h-32 w-32 object-cover rounded">
                                @endif
                            </div>
                        </div>

                        <!-- Image After -->
                        <div class="mb-4">
                            <label for="image_after" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Image After</label>
                            <input type="file" name="image_after" id="image_after" class="mt-1 block w-full" onchange="previewImage(event, 'image-after-preview')">
                            <div id="image-after-preview" class="mt-2">
                                @if($work->image_after)
                                    <img src="{{ Storage::url($work->image_after) }}" alt="Current Image After" class="h-32 w-32 object-cover rounded">
                                @endif
                            </div>
                        </div>

                        <!-- Slider Images -->
                        <div class="mb-4">
                            <label for="slider_images" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Slider Images</label>
                            <input type="file" name="slider_images[]" id="slider_images" multiple class="mt-1 block w-full" onchange="previewSliderImages(event)">
                            <div id="slider-images-preview" class="flex flex-wrap gap-2 mt-2">
                                @if($work->slider_images)
                                    @foreach ($work->slider_images as $sliderImage)
                                        <img src="{{ Storage::url($sliderImage) }}" alt="Slider Image" class="h-24 w-24 object-cover rounded">
                                    @endforeach
                                @endif
                            </div>
                        </div>

                        <!-- Submit -->
                        <div>
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Update Work</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Preview single image
        function previewImage(event, previewId) {
            const preview = document.getElementById(previewId);
            preview.innerHTML = ''; // Clear previous preview
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'h-32 w-32 object-cover rounded';
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            }
        }

        // Preview multiple slider images
        function previewSliderImages(event) {
            const preview = document.getElementById('slider-images-preview');
            preview.innerHTML = ''; // Clear previous previews
            const files = event.target.files;
            if (files) {
                Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.className = 'h-24 w-24 object-cover rounded';
                        preview.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                });
            }
        }
    </script>
</x-app-layout>
