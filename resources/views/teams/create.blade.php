<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Create Team Member') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100">
                    <form action="{{ route('teams.store') }}" method="POST" enctype="multipart/form-data">
                        @csrf

                        <!-- Name -->
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium">Name</label>
                            <input type="text" name="name" id="name" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required>
                        </div>

                        <!-- Position -->
                        <div class="mb-4">
                            <label for="position" class="block text-sm font-medium">Position</label>
                            <input type="text" name="position" id="position" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" required>
                        </div>

                        <!-- Social Links -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium">Social Links</label>
                            <div id="social-links-container" class="mt-1 space-y-2">
                                <!-- Dynamic social links will be added here -->
                            </div>
                            <button type="button" onclick="addSocialLink()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Social Link</button>
                        </div>

                        <!-- Image -->
                        <div class="mb-4">
                            <label for="image" class="block text-sm font-medium">Image</label>
                            <input type="file" name="image" id="image" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" onchange="previewImage(event, 'image-preview')">
                            <img id="image-preview" src="#" alt="Image Preview" class="h-32 w-32 object-cover rounded mt-2 hidden">
                        </div>

                        <!-- Submit Button -->
                        <div class="mt-6">
                            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Create Team Member</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Add Social Link
        function addSocialLink() {
            const container = document.getElementById('social-links-container');
            const newLink = document.createElement('div');
            newLink.classList.add('flex', 'items-center', 'space-x-2');
            newLink.innerHTML = `
                <input type="text" name="social_links[][url]" placeholder="URL" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                <input type="text" name="social_links[][icon]" placeholder="Icon" class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                <button type="button" class="text-red-500 hover:text-red-700" onclick="removeSocialLink(this)">Remove</button>
            `;
            container.appendChild(newLink);
        }

        // Remove Social Link
        function removeSocialLink(button) {
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
