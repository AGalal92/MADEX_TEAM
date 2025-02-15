<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Team Members') }}
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

                    <h3 class="text-lg font-bold mb-4">List of Team Members</h3>

                    <a href="{{ route('teams.create') }}" class="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
                        + Add New Team Member
                    </a>

                    <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                            <tr>
                                <th class="py-2 px-4 border-b">Name</th>
                                <th class="py-2 px-4 border-b">Position</th>
                                <th class="py-2 px-4 border-b">Image</th>
                                <th class="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($team as $member)
                                <tr class="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td class="py-2 px-4">{{ $member->name }}</td>
                                    <td class="py-2 px-4">{{ $member->position }}</td>

                                    <td class="py-2 px-4">
                                        @if($member->image)
                                            <img src="{{ Storage::url($member->image) }}" alt="{{ $member->name }}" class="h-16 w-16 object-cover rounded">
                                        @else
                                            <p class="text-gray-500">No image</p>
                                        @endif
                                    </td>
                                    <td class="py-2 px-4 flex space-x-2">
                                        <a href="{{ route('teams.edit', $member->id) }}" class="text-blue-500 hover:underline">Edit</a>
                                        <form action="{{ route('teams.destroy', $member->id) }}" method="POST" class="inline-block">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="text-red-500 hover:underline" onclick="return confirm('Are you sure?');">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
