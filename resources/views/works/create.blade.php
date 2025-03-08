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
                    <form id="work-form" action="{{ route('works.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <!-- Title -->
                        <div class="mb-4">
                            <label for="title" class="block text-sm font-medium">Title</label>
                            <input type="text" name="title" id="title" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required>
                            @error('title')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Slug -->
                        <div class="mb-4">
                            <label for="slug" class="block text-sm font-medium">Slug</label>
                            <input type="text" name="slug" id="slug" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required>
                            @error('slug')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Work Category -->
                        <div class="mb-4">
                            <label for="work_category_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                            <select name="work_category_id" id="work_category_id" required
                                class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                                <option value="">Select a Category</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}"> {{ $category->category }}</option>
                                @endforeach
                            </select>
                            @error('work_category_id')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Main Image -->
                        <div class="mb-4">
                            <label for="image" class="block text-sm font-medium">Main Image</label>
                            <input type="file" name="image" id="image" accept="image/jpeg,image/png,image/jpg" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" onchange="previewImage(event, 'image-preview')">
                            <img id="image-preview" src="#" alt="Image Preview" class="h-32 w-32 object-cover rounded mt-2 hidden">
                            @error('image')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Video -->
                        <div class="mb-4">
                            <label for="video" class="block text-sm font-medium">Video</label>
                            <input type="file" name="video" id="video" accept="video/mp4,video/mkv,video/avi,video/webm" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                            @error('video')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Image Before -->
                        <div class="mb-4">
                            <label for="image_before" class="block text-sm font-medium">Image Before</label>
                            <input type="file" name="image_before" id="image_before" accept="image/jpeg,image/png,image/jpg" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" onchange="previewImage(event, 'image-before-preview')">
                            <img id="image-before-preview" src="#" alt="Image Before Preview" class="h-32 w-32 object-cover rounded mt-2 hidden">
                            @error('image_before')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Image After -->
                        <div class="mb-4">
                            <label for="image_after" class="block text-sm font-medium">Image After</label>
                            <input type="file" name="image_after" id="image_after" accept="image/jpeg,image/png,image/jpg" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" onchange="previewImage(event, 'image-after-preview')">
                            <img id="image-after-preview" src="#" alt="Image After Preview" class="h-32 w-32 object-cover rounded mt-2 hidden">
                            @error('image_after')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Slider Images -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium">Slider Images</label>
                            <div id="slider-images-container" class="mt-1 space-y-2">
                                <!-- Dynamic slider image inputs will be added here -->
                            </div>
                            <button type="button" onclick="addSliderImage()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Slider Image</button>
                            @error('slider_images.*')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Submit Button -->
                        <div class="mt-6">
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Create Work</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        function addSliderImage() {
            const container = document.getElementById('slider-images-container');
            const newImageDiv = document.createElement('div');
            newImageDiv.classList.add('flex', 'items-center', 'space-x-2', 'slider-image-item');
            newImageDiv.innerHTML = `
                <input type="file" name="slider_images[]" accept="image/jpeg,image/png,image/jpg" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" onchange="previewSliderImage(event, this)">
                <img class="slider-preview h-16 w-16 object-cover rounded mt-2 hidden" src="#" alt="Slider Preview">
                <button type="button" class="text-red-500 hover:text-red-700" onclick="removeSliderImage(this)">Remove</button>
            `;
            container.appendChild(newImageDiv);
        }

        function removeSliderImage(button) {
            button.parentElement.remove();
        }

        function previewImage(event, previewId) {
            const preview = document.getElementById(previewId);
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        }

        function previewSliderImage(event, input) {
            const preview = input.nextElementSibling;
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        }
    </script>
</x-app-layout>
