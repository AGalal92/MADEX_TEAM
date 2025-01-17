<!-- resources/views/abouts/edit.blade.php -->
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

                    <!-- Display Success Message -->
                    @if(session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    <!-- Form for Updating About Section -->
                    <form action="{{ route('about.update') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" id="title" name="title" class="form-control" 
                                value="{{ old('title', $about->title) }}" required>
                        </div>

                        <div class="form-group">
                            <label for="img1">Image 1</label>
                            <input type="file" id="img1" name="img1" class="form-control">
                            @if($about->img1)
                                <img src="{{ asset('storage/' . $about->img1) }}" 
                                    alt="Image 1" class="img-thumbnail mt-2" style="max-width: 150px;">
                            @endif
                        </div>

                        <div class="form-group">
                            <label for="img2">Image 2</label>
                            <input type="file" id="img2" name="img2" class="form-control">
                            @if($about->img2)
                                <img src="{{ asset('storage/' . $about->img2) }}" 
                                    alt="Image 2" class="img-thumbnail mt-2" style="max-width: 150px;">
                            @endif
                        </div>

                        <div class="form-group">
                            <label for="slug1">Slug 1</label>
                            <input type="text" id="slug1" name="slug1" class="form-control" 
                                value="{{ old('slug1', $about->slug1) }}" required>
                        </div>

                        <div class="form-group">
                            <label for="slug2">Slug 2</label>
                            <input type="text" id="slug2" name="slug2" class="form-control" 
                                value="{{ old('slug2', $about->slug2) }}" required>
                        </div>

                        <div class="form-group">
                            <label for="par1">Paragraph 1</label>
                            <textarea id="par1" name="par1" class="form-control" required>{{ old('par1', $about->par1) }}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="par2">Paragraph 2</label>
                            <textarea id="par2" name="par2" class="form-control" required>{{ old('par2', $about->par2) }}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="link">Link</label>
                            <input type="text" id="link" name="link" class="form-control" 
                                value="{{ old('link', $about->link) }}">
                        </div>

                        <button type="submit" class="btn btn-primary mt-3">Update About Section</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
