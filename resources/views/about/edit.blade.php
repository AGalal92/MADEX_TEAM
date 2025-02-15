<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Edit About Section') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="{{ route('about.update') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <!-- Title -->
                        <div class="mb-4">
                            <label for="title" class="block text-sm font-medium">Title</label>
                            <input type="text" name="title" id="title" value="{{ $about->title ?? '' }}" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required>
                        </div>

                        <!-- Slug 1 -->
                        <div class="mb-4">
                            <label for="slug1" class="block text-sm font-medium">Slug 1</label>
                            <input type="text" name="slug1" id="slug1" value="{{ $about->slug1 ?? '' }}" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required>
                        </div>

                        <!-- Slug 2 -->
                        <div class="mb-4">
                            <label for="slug2" class="block text-sm font-medium">Slug 2</label>
                            <input type="text" name="slug2" id="slug2" value="{{ $about->slug2 ?? '' }}" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required>
                        </div>

                        <!-- Paragraph 1 -->
                        <div class="mb-4">
                            <label for="par1" class="block text-sm font-medium">Paragraph 1</label>
                            <textarea name="par1" id="par1" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" rows="3" required>{{ $about->par1 ?? '' }}</textarea>
                        </div>

                        <!-- Paragraph 2 -->
                        <div class="mb-4">
                            <label for="par2" class="block text-sm font-medium">Paragraph 2</label>
                            <textarea name="par2" id="par2" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" rows="3" required>{{ $about->par2 ?? '' }}</textarea>
                        </div>

                        <!-- Link -->
                        <div class="mb-4">
                            <label for="link" class="block text-sm font-medium">Link</label>
                            <input type="text" name="link" id="link" value="{{ $about->link ?? '' }}" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        </div>

                        <!-- List Items -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium">List Items</label>
                            <div id="list-items-container" class="mt-1 space-y-2">
                                @if($about && $about->list_items)
                                    @foreach ($about->list_items as $item)
                                        <div class="flex items-center space-x-2">
                                            <input type="text" name="list_items[]" value="{{ $item }}" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                                            <button type="button" class="text-red-500 hover:text-red-700" onclick="removeListItem(this)">Remove</button>
                                        </div>
                                    @endforeach
                                @endif
                            </div>
                            <button type="button" onclick="addListItem()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add List Item</button>
                        </div>

                        <!-- Image 1 -->
                        <div class="mb-4">
                            <label for="img1" class="block text-sm font-medium">Image 1</label>
                            <input type="file" name="img1" id="img1" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" onchange="previewImage(event, 'img1-preview')">
                            @if($about && $about->img1)
                                <img id="img1-preview" src="{{ Storage::url($about->img1) }}" alt="Image 1" class="h-32 w-32 object-cover rounded mt-2">
                            @else
                                <img id="img1-preview" src="#" alt="Image 1 Preview" class="h-32 w-32 object-cover rounded mt-2 hidden">
                            @endif
                        </div>

                        <!-- Image 2 -->
                        <div class="mb-4">
                            <label for="img2" class="block text-sm font-medium">Image 2</label>
                            <input type="file" name="img2" id="img2" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" onchange="previewImage(event, 'img2-preview')">
                            @if($about && $about->img2)
                                <img id="img2-preview" src="{{ Storage::url($about->img2) }}" alt="Image 2" class="h-32 w-32 object-cover rounded mt-2">
                            @else
                                <img id="img2-preview" src="#" alt="Image 2 Preview" class="h-32 w-32 object-cover rounded mt-2 hidden">
                            @endif
                        </div>

                        <!-- Submit Button -->
                        <div class="mt-6">
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Save Changes</button>
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
