<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Edit Service') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="{{ route('services.update', $service->id) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <!-- Title -->
                        <div class="mb-4">
                            <label for="title" class="block text-sm font-medium">Title</label>
                            <input type="text" name="title" id="title" value="{{ $service->title }}" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required>
                        </div>

                        <!-- Icon -->
                        <div class="mb-4">
                            <label for="icon" class="block text-sm font-medium">Icon</label>
                            <input type="text" name="icon" id="icon" value="{{ $service->icon }}" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        </div>

                        <!-- Heading -->
                        <div class="mb-4">
                            <label for="heading" class="block text-sm font-medium">Heading</label>
                            <input type="text" name="heading" id="heading" value="{{ $service->heading }}" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        </div>

                        <!-- Description -->
                        <div class="mb-4">
                            <label for="description" class="block text-sm font-medium">Description</label>
                            <textarea name="description" id="description" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" rows="3">{{ $service->description }}</textarea>
                        </div>

                        <!-- Paragraph -->
                        <div class="mb-4">
                            <label for="paragraph" class="block text-sm font-medium">Paragraph</label>
                            <textarea name="paragraph" id="paragraph" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" rows="3">{{ $service->paragraph }}</textarea>
                        </div>

                <!-- List Items -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium">List Items</label>
                        <div id="list-items-container" class="mt-1 space-y-2">
                            @if(isset($service->list_items) && is_array($service->list_items))
                                @foreach ($service->list_items as $item)
                                    <div class="flex items-center space-x-2">
                                        <input type="text" name="list_items[]" value="{{ $item }}" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                                        <button type="button" class="text-red-500 hover:text-red-700" onclick="removeListItem(this)">Remove</button>
                                    </div>
                                @endforeach
                            @endif
                        </div>
                        <button type="button" onclick="addListItem()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add List Item</button>
                    </div>

                        <!-- Image -->
                        <div class="mb-4">
                            <label for="image" class="block text-sm font-medium">Image</label>
                            <input type="file" name="image" id="image" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" onchange="previewImage(event, 'image-preview')">
                            @if($service->image)
                                <img id="image-preview" src="{{ Storage::url($service->image) }}" alt="Image Preview" class="h-32 w-32 object-cover rounded mt-2">
                            @else
                                <img id="image-preview" src="#" alt="Image Preview" class="h-32 w-32 object-cover rounded mt-2 hidden">
                            @endif
                        </div>

                        <!-- Submit Button -->
                        <div class="mt-6">
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Update Service</button>
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
                <input type="text" name="list_items[]" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
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
