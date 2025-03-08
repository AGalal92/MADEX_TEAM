<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Create Service') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="{{ route('services.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <!-- Title -->
                        <div class="mb-4">
                            <label for="title" class="block text-sm font-medium">Title</label>
                            <input type="text" name="title" id="title" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required>
                            @error('title')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Icon -->
                        <div class="mb-4">
                            <label for="icon" class="block text-sm font-medium">Icon (e.g., Font Awesome class)</label>
                            <input type="text" name="icon" id="icon" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" placeholder="fas fa-star">
                            @error('icon')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Heading -->
                        <div class="mb-4">
                            <label for="heading" class="block text-sm font-medium">Heading</label>
                            <input type="text" name="heading" id="heading" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                            @error('heading')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Description -->
                        <div class="mb-4">
                            <label for="description" class="block text-sm font-medium">Description</label>
                            <textarea name="description" id="description" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" rows="3"></textarea>
                            @error('description')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Paragraph -->
                        <div class="mb-4">
                            <label for="paragraph" class="block text-sm font-medium">Paragraph</label>
                            <textarea name="paragraph" id="paragraph" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" rows="5"></textarea>
                            @error('paragraph')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- List Items -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium">List Items</label>
                            <div id="list-items-container" class="mt-1 space-y-2">
                                <!-- Dynamic list items will be added here -->
                            </div>
                            <button type="button" onclick="addListItem()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add List Item</button>
                            @error('list_items')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Image -->
                        <div class="mb-4">
                            <label for="image" class="block text-sm font-medium">Image</label>
                            <input type="file" name="image" id="image" accept="image/jpeg,image/png,image/jpg" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" onchange="previewImage(event, 'image-preview')">
                            <img id="image-preview" src="#" alt="Image Preview" class="h-32 w-32 object-cover rounded mt-2 hidden">
                            @error('image')
                                <span class="text-red-500 text-sm">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Submit Button -->
                        <div class="mt-6">
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Create Service</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Add List Item
        function addListItem() {
            const container = document.getElementById('list-items-container');
            const newItem = document.createElement('div');
            newItem.classList.add('flex', 'items-center', 'space-x-2');
            newItem.innerHTML = `
                <input type="text" name="list_items[]" placeholder="Enter list item" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                <button type="button" class="text-red-500 hover:text-red-700" onclick="removeListItem(this)">Remove</button>
            `;
            container.appendChild(newItem);
        }

        // Remove List Item
        function removeListItem(button) {
            button.parentElement.remove();
        }

        // Image Preview
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
    </script>
</x-app-layout>
