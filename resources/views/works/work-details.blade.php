@extends('layouts.project-layout')

@section('content')
    <style>
        /* Custom CSS Variables */
        :root {
            --carousel-height-sm: 250px;
            --carousel-height-md: 350px;
            --carousel-height-lg: 400px;
            --carousel-bg: #000;
            --arrow-bg: rgba(0, 0, 0, 0.5);
            --arrow-hover-bg: rgba(0, 0, 0, 0.7);
            --dot-active-bg: #facc15; /* Yellow-500 */
            --dot-inactive-bg: #6b7280; /* Gray-500 */
        }

        /* Carousel Container */
        .carousel-container {
            width: 100%;
            height: var(--carousel-height-sm);
            background: var(--carousel-bg);
            border-radius: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            position: relative; /* Keep relative for positioning controls */
        }

        /* Carousel Images */
        .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
            display: none; /* Hidden by default */
        }
        .carousel-image.active {
            display: block; /* Only active image is visible */
        }

        /* Navigation Arrows */
        .carousel-prev, .carousel-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: var(--arrow-bg);
            padding: 0.5rem;
            border-radius: 9999px; /* Full circle */
            color: var(--dot-active-bg);
            transition: background 0.3s ease;
        }
        .carousel-prev:hover, .carousel-next:hover {
            background: var(--arrow-hover-bg);
        }
        .carousel-prev {
            left: 0.75rem;
        }
        .carousel-next {
            right: 0.75rem;
        }

        /* Dots */
        .carousel-dots {
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 0.5rem;
        }
        .carousel-dot {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: var(--dot-inactive-bg);
            cursor: pointer;
            transition: background 0.3s ease, transform 0.3s ease;
        }
        .carousel-dot.active {
            background: var(--dot-active-bg);
            transform: scale(1.25);
        }

        /* Before/After Container */
        .before-after-container {
            width: 100%;
            height: var(--carousel-height-sm);
            position: relative;
            border-radius: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Before/After Images */
        .before-after-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
            position: absolute;
            top: 0;
            left: 0;
        }

        /* Slider Handle */
        .slider-handle {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 100%;
            width: 4px;
            background: var(--dot-active-bg);
            cursor: pointer;
            z-index: 10;
        }

        /* Responsive Heights */
        @media (min-width: 640px) {
            .carousel-container, .before-after-container {
                height: var(--carousel-height-md);
            }
        }
        @media (min-width: 1024px) {
            .carousel-container, .before-after-container {
                height: var(--carousel-height-lg);
            }
        }
    </style>

    <div class="bg-black text-white min-h-screen py-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Back Link -->
            <div class="mb-8">
                <a href="{{ url('/#portfolio') }}"
                   class="text-yellow-500 text-sm md:text-base font-raleway flex items-center gap-2 hover:underline">
                    ← {{ __('Back to Portfolio') }}
                </a>
                <!-- Project Details -->
                <div class="w-full md:w-1/2">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold font-raleway">{{ $work->title }}</h1>

                </div>
            </div>


            <!-- Project Header -->
            <div class="flex flex-col md:flex-row gap-8 items-center">
                <!-- Image Carousel -->
                <div class="w-full md:w-1/2">
                    <div class="carousel-container">
                        @if($work->slider_images && is_array($work->slider_images) && count($work->slider_images) > 0)
                            @foreach($work->slider_images as $index => $slider_image)
                                <img src="{{ asset('storage/' . $slider_image) }}"
                                     alt="Slider Image {{ $index + 1 }}"
                                     class="carousel-image {{ $index === 0 ? 'active' : '' }}"
                                     onerror="this.src='{{ asset('assets/images/default-image.png') }}';"/>
                            @endforeach

                            <!-- Navigation Arrows -->
                            <button class="carousel-prev">←</button>
                            <button class="carousel-next">→</button>

                            <!-- Dots -->
                            <div class="carousel-dots">
                                @foreach($work->slider_images as $index => $slider_image)
                                    <div class="carousel-dot {{ $index === 0 ? 'active' : '' }}"
                                         data-index="{{ $index }}"></div>
                                @endforeach
                            </div>
                        @else
                            <img src="{{ $work->image ? asset('storage/' . $work->image) : asset('assets/images/default-image.png') }}"
                                 alt="{{ $work->title }}"
                                 class="w-full h-full object-cover rounded-[20px]"
                                 onerror="this.src='{{ asset('assets/images/default-image.png') }}';"/>
                        @endif
                    </div>
                </div>

                 <!-- Before and After Slider -->
            @if($work->image_before && $work->image_after)
            <div class="w-full md:w-1/2">
                <h3 class="text-xl sm:text-2xl md:text-3xl font-semibold font-raleway mb-4">
                    {{ __('Before and After') }}
                </h3>
                <div class="before-after-container w-full ">
                    <img src="{{ asset('storage/' . $work->image_before) }}"
                         alt="Before"
                         class="before-after-image  w-full"
                         onerror="this.src='{{ asset('assets/images/default-image.png') }}';"/>
                    <img src="{{ asset('storage/' . $work->image_after) }}"
                         alt="After"
                         class="before-after-image opacity-0"
                         onerror="this.src='{{ asset('assets/images/default-image.png') }}';"/>
                    <div class="slider-handle" id="slider-handle"></div>
                </div>
            </div>
        @endif


            </div>



            <!-- Project Videos -->
            @if($work->video)
                <div class="mt-10">
                    <h3 class="text-xl sm:text-2xl md:text-3xl font-semibold font-raleway mb-4">
                        {{ __('Project Videos') }}
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="relative w-full overflow-hidden rounded-[20px] shadow-lg" style="padding-bottom: 56.25%;">
                            <video src="{{ asset('storage/' . $work->video) }}"
                                   controls
                                   class="absolute top-0 left-0 w-full h-full rounded-[20px]"
                                   allowfullscreen></video>
                        </div>
                    </div>
                </div>
            @endif
        </div>
    </div>

    <!-- JavaScript for Sliders -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Carousel for Slider Images
            const images = document.querySelectorAll('.carousel-image');
            const dots = document.querySelectorAll('.carousel-dot');
            const prevBtn = document.querySelector('.carousel-prev');
            const nextBtn = document.querySelector('.carousel-next');
            let currentIndex = 0;

            if (images.length > 0) {
                function showImage(index) {
                    console.log('Showing image at index:', index);
                    images.forEach((img, i) => {
                        img.classList.toggle('active', i === index);
                    });
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === index);
                    });
                }

                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        console.log('Dot clicked, index:', index);
                        currentIndex = index;
                        showImage(currentIndex);
                    });
                });

                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    console.log('Previous clicked, new index:', currentIndex);
                    showImage(currentIndex);
                });

                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % images.length;
                    console.log('Next clicked, new index:', currentIndex);
                    showImage(currentIndex);
                });

                showImage(currentIndex);
            }

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
                        const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

                        sliderHandle.style.left = `${clampedPercentage}%`;
                        beforeAfterImages[1].style.opacity = clampedPercentage / 100;
                    }
                });
            }
        });
    </script>
@endsection
