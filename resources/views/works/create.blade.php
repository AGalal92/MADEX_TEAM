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
                    <form id="team-member-form" action="{{ route('teams.store') }}" method="POST" enctype="multipart/form-data">
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
        function addSocialLink() {
            const container = document.getElementById('social-links-container');
            const newLink = document.createElement('div');
            newLink.classList.add('flex', 'items-center', 'space-x-2');
            newLink.innerHTML = `
                <input type="text" class="social-url mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" placeholder="URL">
                <input type="text" class="social-icon mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300" placeholder="Icon">
                <button type="button" class="text-red-500 hover:text-red-700" onclick="removeSocialLink(this)">Remove</button>
            `;
            container.appendChild(newLink);
        }

        function removeSocialLink(button) {
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

        document.getElementById('team-member-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);

            // Extract social links and structure them correctly
            const socialLinks = [];
            document.querySelectorAll('#social-links-container > div').forEach(linkDiv => {
                const url = linkDiv.querySelector('.social-url').value.trim();
                const icon = linkDiv.querySelector('.social-icon').value.trim();
                if (url && icon) {
                    socialLinks.push({ url, icon });
                }
            });

            formData.append('social_links', JSON.stringify(socialLinks));

            // Send AJAX request
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
                }
            }).then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error('Error:', error));
        });
    </script>
</x-app-layout>
