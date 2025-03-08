<!-- resources/views/layouts/project-layout.blade.php -->

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $work->title ?? 'Project Details' }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body >
    <div class="min-h-screen">
        <!-- Navigation -->

        <!-- Page Content -->
        <main>
            @yield('content')
        </main>
    </div>

    <!-- JavaScript for Sliders -->
    <script>
        // Carousel for Slider Images
        document.addEventListener('DOMContentLoaded', function () {
            const images = document.querySelectorAll('.carousel-image');
            const dots = document.querySelectorAll('.carousel-dot');
            let currentIndex = 0;

            function showImage(index) {
                images.forEach((img, i) => {
                    img.classList.toggle('hidden', i !== index);
                });
                dots.forEach((dot, i) => {
                    dot.classList.toggle('bg-yellow-500', i === index);
                    dot.classList.toggle('bg-gray-500', i !== index);
                });
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    showImage(currentIndex);
                });
            });

            document.querySelector('.carousel-prev').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            });

            document.querySelector('.carousel-next').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            });

            // Show the first image initially
            showImage(currentIndex);
        });

        // Before and After Slider
        const sliderHandle = document.getElementById('slider-handle');
        const beforeAfterImages = document.querySelectorAll('.before-after-image');

        if (sliderHandle && beforeAfterImages.length === 2) {
            let isDragging = false;

            sliderHandle.addEventListener('mousedown', () => {
                isDragging = true;
            });

            window.addEventListener('mouseup', () => {
                isDragging = false;
            });

            window.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    const container = sliderHandle.parentElement;
                    const rect = container.getBoundingClientRect();
                    const offsetX = e.clientX - rect.left;
                    const percentage = (offsetX / rect.width) * 100;

                    // Clamp the percentage between 0 and 100
                    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

                    // Move the slider handle
                    sliderHandle.style.left = `${clampedPercentage}%`;

                    // Adjust the opacity of the "after" image
                    beforeAfterImages[1].style.opacity = clampedPercentage / 100;
                }
            });
        }
    </script>
</body>
</html>
