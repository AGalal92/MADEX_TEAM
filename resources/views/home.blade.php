<!DOCTYPE html>
<html lang="en">

<head>
    <title>Madex Team</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="csrf-token" content="{{ csrf_token() }}">



    <meta name="robots" content="noindex, nofollow" />

    <!-- Favicons -->
    <link href="{{ url('../assets/images/faveicon.png') }}" rel="icon" />
    <link href="#" rel="apple-touch-icon" />

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/" rel="preconnect" />
    <link href="https://fonts.gstatic.com/" rel="preconnect" crossorigin="" />
    <link href="{{ url('./assets/css/css2.css') }}" rel="stylesheet" />

    <!-- Vendor CSS Files -->
    <link href="{{ url('../assets/css/bootstrap.min.css') }}" rel="stylesheet" />
    <link href="{{ url('../assets/css/bootstrap-icons.css') }}" rel="stylesheet" />
    <link href="{{ url('../assets/css/aos.css') }}" rel="stylesheet" />
    <link href="{{ url('../assets/css/glightbox.min.css') }}" rel="stylesheet" />
    <link href="{{ url('../assets/css/swiper-bundle.min.css') }}" rel="stylesheet" />

    <!-- Main CSS File -->
    <link href="{{ url('../assets/css/main.css') }}" rel="stylesheet" />

    <style>
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        fieldset,
        img {
            border: 0;
        }

        input {
            border: 1px solid #b0b0b0;
            padding: 3px 5px 4px;
            color: #979797;
            width: 190px;
        }

        address,
        caption,
        cite,
        code,
        dfn,
        th,
        var {
            font-style: normal;
            font-weight: normal;
        }

        ol,
        ul {
            list-style: none;
        }

        caption,
        th {
            text-align: left;
        }

        q:before,
        q:after {
            content: "";
        }

        abbr,
        acronym {
            border: 0;
        }

        /* General Demo Style */

        a {
            color: #333;
            text-decoration: none;
        }

        .clr {
            clear: both;
        }

        .slideshow,
        .slideshow:after {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            z-index: 0;
        }

        .slideshow:after {
            content: "";
            background: transparent url(../assets/images/pattern.png) repeat top left;
        }

        .slideshow li span {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            color: transparent;
            background-size: cover;
            background-position: 50% 50%;
            background-repeat: none;
            opacity: 0;
            z-index: 0;
            -webkit-backface-visibility: hidden;
            -webkit-animation: imageAnimation 36s linear infinite 0s;
            -moz-animation: imageAnimation 36s linear infinite 0s;
            -o-animation: imageAnimation 36s linear infinite 0s;
            -ms-animation: imageAnimation 36s linear infinite 0s;
            animation: imageAnimation 36s linear infinite 0s;
        }

        .slideshow li div {
            z-index: 1000;
            position: absolute;
            bottom: 30px;
            left: 0px;
            width: 100%;
            text-align: center;
            opacity: 0;
            -webkit-animation: titleAnimation 36s linear infinite 0s;
            -moz-animation: titleAnimation 36s linear infinite 0s;
            -o-animation: titleAnimation 36s linear infinite 0s;
            -ms-animation: titleAnimation 36s linear infinite 0s;
            animation: titleAnimation 36s linear infinite 0s;
        }

        .slideshow li div h3 {
            font-family: "helvetica neue", helvetica;
            text-transform: uppercase;
            font-size: 80px;
            padding: 0;
            line-height: 200px;
            color: rgba(255, 255, 255, 0.8);
        }

        .slideshow li:nth-child(1) span {
            background-image: url(../assets/images/mad1.jpg);
        }

        .slideshow li:nth-child(2) span {
            background-image: url(../assets/images/mad2.jpg);
            -webkit-animation-delay: 6s;
            -moz-animation-delay: 6s;
            -o-animation-delay: 6s;
            -ms-animation-delay: 6s;
            animation-delay: 6s;
        }

        .slideshow li:nth-child(3) span {
            background-image: url(../assets/images/mad3.jpg);
            -webkit-animation-delay: 12s;
            -moz-animation-delay: 12s;
            -o-animation-delay: 12s;
            -ms-animation-delay: 12s;
            animation-delay: 12s;
        }

        .slideshow li:nth-child(4) span {
            background-image: url(../assets/images/mad4.jpg);
            -webkit-animation-delay: 18s;
            -moz-animation-delay: 18s;
            -o-animation-delay: 18s;
            -ms-animation-delay: 18s;
            animation-delay: 18s;
        }

        .slideshow li:nth-child(5) span {
            background-image: url(../assets/images/mad5.jpg);
            -webkit-animation-delay: 24s;
            -moz-animation-delay: 24s;
            -o-animation-delay: 24s;
            -ms-animation-delay: 24s;
            animation-delay: 24s;
        }

        .slideshow li:nth-child(6) span {
            background-image: url(../assets/images/mad6.jpg);
            -webkit-animation-delay: 30s;
            -moz-animation-delay: 30s;
            -o-animation-delay: 30s;
            -ms-animation-delay: 30s;
            animation-delay: 30s;
        }

        .slideshow li:nth-child(2) div {
            -webkit-animation-delay: 6s;
            -moz-animation-delay: 6s;
            -o-animation-delay: 6s;
            -ms-animation-delay: 6s;
            animation-delay: 6s;
        }

        .slideshow li:nth-child(3) div {
            -webkit-animation-delay: 12s;
            -moz-animation-delay: 12s;
            -o-animation-delay: 12s;
            -ms-animation-delay: 12s;
            animation-delay: 12s;
        }

        .slideshow li:nth-child(4) div {
            -webkit-animation-delay: 18s;
            -moz-animation-delay: 18s;
            -o-animation-delay: 18s;
            -ms-animation-delay: 18s;
            animation-delay: 18s;
        }

        .slideshow li:nth-child(5) div {
            -webkit-animation-delay: 24s;
            -moz-animation-delay: 24s;
            -o-animation-delay: 24s;
            -ms-animation-delay: 24s;
            animation-delay: 24s;
        }

        .slideshow li:nth-child(6) div {
            -webkit-animation-delay: 30s;
            -moz-animation-delay: 30s;
            -o-animation-delay: 30s;
            -ms-animation-delay: 30s;
            animation-delay: 30s;
        }

        /* Animation for the slideshow images */
        @-webkit-keyframes imageAnimation {
            0% {
                opacity: 0;
                -webkit-animation-timing-function: ease-in;
            }

            8% {
                opacity: 1;
                -webkit-transform: scale(1.05);
                -webkit-animation-timing-function: ease-out;
            }

            17% {
                opacity: 1;
                -webkit-transform: scale(1.1);
            }

            25% {
                opacity: 0;
                -webkit-transform: scale(1.1);
            }

            100% {
                opacity: 0;
            }
        }

        @-moz-keyframes imageAnimation {
            0% {
                opacity: 0;
                -moz-animation-timing-function: ease-in;
            }

            8% {
                opacity: 1;
                -moz-transform: scale(1.05);
                -moz-animation-timing-function: ease-out;
            }

            17% {
                opacity: 1;
                -moz-transform: scale(1.1);
            }

            25% {
                opacity: 0;
                -moz-transform: scale(1.1);
            }

            100% {
                opacity: 0;
            }
        }

        @-o-keyframes imageAnimation {
            0% {
                opacity: 0;
                -o-animation-timing-function: ease-in;
            }

            8% {
                opacity: 1;
                -o-transform: scale(1.05);
                -o-animation-timing-function: ease-out;
            }

            17% {
                opacity: 1;
                -o-transform: scale(1.1);
            }

            25% {
                opacity: 0;
                -o-transform: scale(1.1);
            }

            100% {
                opacity: 0;
            }
        }

        @-ms-keyframes imageAnimation {
            0% {
                opacity: 0;
                -ms-animation-timing-function: ease-in;
            }

            8% {
                opacity: 1;
                -ms-transform: scale(1.05);
                -ms-animation-timing-function: ease-out;
            }

            17% {
                opacity: 1;
                -ms-transform: scale(1.1);
            }

            25% {
                opacity: 0;
                -ms-transform: scale(1.1);
            }

            100% {
                opacity: 0;
            }
        }

        @keyframes imageAnimation {
            0% {
                opacity: 0;
                animation-timing-function: ease-in;
            }

            8% {
                opacity: 1;
                transform: scale(1.05);
                animation-timing-function: ease-out;
            }

            17% {
                opacity: 1;
                transform: scale(1.1);
            }

            25% {
                opacity: 0;
                transform: scale(1.1);
            }

            100% {
                opacity: 0;
            }
        }

        /* Animation for the title */
        @-webkit-keyframes titleAnimation {
            0% {
                opacity: 0;
                -webkit-transform: translateY(200px);
            }

            8% {
                opacity: 1;
                -webkit-transform: translateY(0px);
            }

            17% {
                opacity: 1;
                -webkit-transform: scale(1);
            }

            19% {
                opacity: 0;
            }

            25% {
                opacity: 0;
                -webkit-transform: scale(10);
            }

            100% {
                opacity: 0;
            }
        }

        @-moz-keyframes titleAnimation {
            0% {
                opacity: 0;
                -moz-transform: translateY(200px);
            }

            8% {
                opacity: 1;
                -moz-transform: translateY(0px);
            }

            17% {
                opacity: 1;
                -moz-transform: scale(1);
            }

            19% {
                opacity: 0;
            }

            25% {
                opacity: 0;
                -moz-transform: scale(10);
            }

            100% {
                opacity: 0;
            }
        }

        @-o-keyframes titleAnimation {
            0% {
                opacity: 0;
                -o-transform: translateY(200px);
            }

            8% {
                opacity: 1;
                -o-transform: translateY(0px);
            }

            17% {
                opacity: 1;
                -o-transform: scale(1);
            }

            19% {
                opacity: 0;
            }

            25% {
                opacity: 0;
                -o-transform: scale(10);
            }

            100% {
                opacity: 0;
            }
        }

        @-ms-keyframes titleAnimation {
            0% {
                opacity: 0;
                -ms-transform: translateY(200px);
            }

            8% {
                opacity: 1;
                -ms-transform: translateY(0px);
            }

            17% {
                opacity: 1;
                -ms-transform: scale(1);
            }

            19% {
                opacity: 0;
            }

            25% {
                opacity: 0;
                -webkit-transform: scale(10);
            }

            100% {
                opacity: 0;
            }
        }

        @keyframes titleAnimation {
            0% {
                opacity: 0;
                transform: translateY(200px);
            }

            8% {
                opacity: 1;
                transform: translateY(0px);
            }

            17% {
                opacity: 1;
                transform: scale(1);
            }

            19% {
                opacity: 0;
            }

            25% {
                opacity: 0;
                transform: scale(10);
            }

            100% {
                opacity: 0;
            }
        }

        /* Show at least something when animations not supported */
        .no-cssanimations .slideshow li span {
            opacity: 1;
        }

        @media screen and (max-width: 1140px) {
            .slideshow li div h3 {
                font-size: 100px;
            }
        }

        @media screen and (max-width: 600px) {
            .slideshow li div h3 {
                font-size: 50px;
            }
        }

        .custom-z-index {
            z-index: 9999;
        }
    </style>
</head>

<body class="index-page">
    <header id="header" class="header d-flex align-items-center fixed-top">
        <div class="container-fluid container-xl position-relative d-flex align-items-center">
            <a href="#"
                class="logo d-flex align-items-center me-auto">
                <img src="{{ url('../assets/images/MadeX - white horizontal.png') }}" />
            </a>

            <nav id="navmenu" class="navmenu">
                <ul>
            <li><a href="#hero" class="active">Home</a></li>
            <li><a href="#about" class="">About</a></li>
            <li><a href="#services" class="">Services</a></li>
            <li><a href="#portfolio" class="">Portfolio</a></li>
            <li><a href="#team" class="">Team</a></li>
            <li><a href="#contact">Contact</a></li>
                </ul>
            <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

            <a
          class="cta-btn"
          href="#about"
          >Get Started</a
        >
        </div>
    </header>

    <main class="main">
        <!-- Hero Section -->
        <section id="hero" class="hero section dark-background">
            <ul class="slideshow">
                <li><span>Image 02</span></li>
                <li><span>Image 03</span></li>
                <li><span>Image 04</span></li>
                <li><span>Image 05</span></li>
                <li><span>Image 06</span></li>
            </ul>
            <div class="container d-flex flex-column align-items-right">
                <h2 data-aos="fade-up" data-aos-delay="100" class="aos-init aos-animate">
                    <span style="color: #ffc907;">
                        MADEX
                    </span>Team.
                </h2>
                <p data-aos="fade-up" data-aos-delay="200" class="aos-init aos-animate"
                    style="font-size: 2em; font-weight: 900; color: #ffc907;">
                    We Are Expertise In
                    <span style="color: #ffffff;">Digital Marketing</span>
                </p>
                <div class="d-flex mt-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                <a href="#about" class="btn-get-started">Get Started</a>
            <a
              href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
              class="glightbox btn-watch-video d-flex align-items-center"
              ><i class="bi bi-play-circle"></i><span>Watch Video</span></a
            >
                </div>
            </div>
        </section>
        <!-- /Hero Section -->

        <!-- About Section -->
        <section id="about" class="about section dark-background">
            <div class="container section-title aos-init aos-animate" data-aos="fade-up">
                <h2>About Us</h2>
                <p>WHO WE ARE ?</p>
            </div>

            <div class="container">
                <div class="row">
                    @if(isset($about) && $about)
                        <!-- Left Column -->
                        <div class="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                            <h3>{{ $about->title ?? 'Default Title' }}</h3>
                            <img src="{{ $about->img1 ? asset('storage/' . $about->img1) : url('../assets/images/about.jpg') }}"
                                class="img-fluid rounded-4 mb-4" alt="About Image" />
                            <p>{{ $about->par1 ?? 'Default paragraph content.' }}</p>
                            <p>{{ $about->par2 ?? 'Additional default paragraph content.' }}</p>
                        </div>

                        <!-- Right Column -->
                        <div class="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="250">
                            <div class="content ps-0 ps-lg-5">
                                <p class="fst-italic">
                                    {{ $about->slug1 ?? 'Default slug 1 text.' }}
                                </p>
                                <ul>
                                    @if (!empty($about->list_items) && is_array($about->list_items))
                                        @foreach ($about->list_items as $item)
                                            <li>
                                                <i class="bi bi-check-circle-fill"></i>
                                                <span>{{ $item }}</span>
                                            </li>
                                        @endforeach
                                    @else
                                        <li>
                                            <i class="bi bi-check-circle-fill"></i>
                                            <span>Default list item 1</span>
                                        </li>
                                        <li>
                                            <i class="bi bi-check-circle-fill"></i>
                                            <span>Default list item 2</span>
                                        </li>
                                        <li>
                                            <i class="bi bi-check-circle-fill"></i>
                                            <span>Default list item 3</span>
                                        </li>
                                    @endif
                                </ul>
                                <p>
                                    {{ $about->slug2 ?? 'Default slug 2 text.' }}
                                </p>

                                <div class="position-relative mt-4">
                                    <img src="{{ $about->img2 ? asset('storage/' . $about->img2) : url('../assets/images/about-2.jpg') }}"
                                        class="img-fluid rounded-4" alt="About Image 2" />
                                    @if ($about->link)
                                        <a href="{{ $about->link }}" class="glightbox pulsating-play-btn"
                                            target="_blank"></a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    @else
                        <div class="col-12 text-center text-white">
                            <h3>No About Information Available</h3>
                            <p>Please add content to the About section from the admin panel.</p>
                        </div>
                    @endif
                </div>
            </div>
        </section>

        <!-- /About Section -->

        <!-- Features Section -->
        <section id="services" class="features section dark-background">
            <div class="container section-title aos-init aos-animate" data-aos="fade-up">
                <h2>Services</h2>
                <p>CHECK OUR SERVICES</p>
            </div>
            <div class="container">
                @if(isset($services) && $services->count() > 0)
                    <!-- Tabs Navigation -->
                    <div class="nav nav-tabs row d-flex aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" role="tablist">
                        @foreach($services as $index => $service)
                            <li class="nav-item col-3" role="presentation">
                                <a class="nav-link {{ $index === 0 ? 'active show' : '' }}" data-bs-toggle="tab"
                                    data-bs-target="#features-tab-{{ $service->id }}" aria-selected="{{ $index === 0 ? 'true' : 'false' }}"
                                    role="tab">
                                    <i class="{{ $service->icon }}"></i>
                                    <h4 class="d-none d-lg-block">{{ $service->title }}</h4>
                                </a>
                            </li>
                        @endforeach
                    </div>

                    <!-- Tabs Content -->
                    <div class="tab-content aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                        @foreach($services as $index => $service)
                            <div class="tab-pane fade {{ $index === 0 ? 'active show' : '' }}" id="features-tab-{{ $service->id }}" role="tabpanel">
                                <div class="row">
                                    <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                                        <h3>{{ $service->heading ?? 'Default Heading' }}</h3>
                                        <p class="fst-italic">{{ $service->description ?? 'No description available.' }}</p>
                                        <ul>
                                            @if (!empty($service->list_items) && is_array($service->list_items))
                                                @foreach($service->list_items as $item)
                                                    <li>
                                                        <i class="bi bi-check2-all"></i>
                                                        <span>{{ $item }}</span>
                                                    </li>
                                                @endforeach
                                            @else
                                                <li><i class="bi bi-check2-all"></i><span>Default list item 1</span></li>
                                                <li><i class="bi bi-check2-all"></i><span>Default list item 2</span></li>
                                            @endif
                                        </ul>
                                        @if ($service->paragraph)
                                            <p>{{ $service->paragraph }}</p>
                                        @endif
                                    </div>
                                    <div class="col-lg-6 order-1 order-lg-2 text-center">
                                        <img src="{{ $service->image ? asset('storage/' . $service->image) : asset('assets/images/default-image.png') }}"
                                            alt="{{ $service->title }}" class="img-fluid" onerror="this.src='{{ asset('assets/images/default-image.png') }}';" />
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <!-- Fallback if no services available -->
                    <div class="text-center text-white">
                        <h3>No Services Available</h3>
                        <p>Please check back later or contact us for more information.</p>
                    </div>
                @endif
            </div>
        </section>


        <!-- Portfolio Section -->
        <section id="portfolio" class="portfolio section dark-background">
            <div class="container section-title aos-init aos-animate" data-aos="fade-up">
                <h2>Portfolio</h2>
                <p>CHECK OUR PORTFOLIO</p>
            </div>

            <div class="container">
                @if(isset($categories) && $categories->count() > 0 && isset($works) && $works->count() > 0)
                    <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
                        <!-- Portfolio Filters -->
                        <ul class="portfolio-filters isotope-filters aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                            <li data-filter="*" class="filter-active">All</li>
                            @foreach($categories as $category)
                                <li data-filter=".filter-{{ $category->id }}">{{ ucfirst($category->category) }}</li>
                            @endforeach
                        </ul>

                        <!-- Portfolio Items -->
                        <div class="row gy-4 isotope-container aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                            @foreach($works as $work)
                                <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-{{ $work->work_category_id }}">
                                    <div class="portfolio-content h-100">
                                        <img src="{{ $work->image ? asset('storage/' . $work->image) : asset('assets/images/default-image.png') }}"
                                            class="img-fluid" alt="{{ $work->title }}" onerror="this.src='{{ asset('assets/images/default-image.png') }}';"/>

                                        <div class="portfolio-info">
                                            <h4>{{ $work->title }}</h4>
                                            <p>{{ $work->workCategory->category ?? 'Uncategorized' }}</p>

                                            <a href="{{ $work->image ? asset('storage/' . $work->image) : asset('assets/images/default-image.png') }}"
                                                title="{{ $work->title }}" data-gallery="portfolio-gallery-{{ $work->work_category_id }}"
                                                class="glightbox preview-link">
                                                <i class="bi bi-zoom-in"></i>
                                            </a>

                                            @if($work->video)
                                                <a href="#" onclick="openVideoModal('{{ asset('storage/' . $work->video) }}'); return false;"
                                                    title="Watch Video" class="details-link">
                                                    <i class="bi bi-play-circle"></i>
                                                </a>
                                            @endif

                                            <a href="#" title="More Details" class="details-link">
                                                <i class="bi bi-link-45deg"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @else
                    <!-- Fallback if no portfolio items available -->
                    <div class="text-center text-white">
                        <h3>No Portfolio Items Available</h3>
                        <p>Please check back later or contact us for more information.</p>
                    </div>
                @endif
            </div>
        </section>

        <!-- Video Modal -->
        <div id="videoModal" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title text-white">Video Preview</h5>
                        <button type="button" class="close text-white" data-bs-dismiss="modal" aria-label="Close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <video id="portfolioVideo" width="100%" controls>
                            <source src="" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>

        <script>
            function openVideoModal(videoSrc) {
                let videoElement = document.getElementById('portfolioVideo');
                videoElement.src = videoSrc;
                let modal = new bootstrap.Modal(document.getElementById('videoModal'));
                modal.show();
            }
        </script>

        <!-- /Portfolio Section -->

        <!-- Team Section -->
        <section id="team" class="team section dark-background">
            <div class="container section-title aos-init aos-animate" data-aos="fade-up">
                <h2>Team</h2>
                <p>CHECK OUR TEAM</p>
            </div>

            <div class="container">
                @if(isset($teamMembers) && $teamMembers->count() > 0)
                    <div class="row gy-5">
                        @foreach($teamMembers as $index => $member)
                            <div class="col-lg-4 col-md-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="{{ 100 * ($index + 1) }}">
                                <div class="member">
                                    <div class="pic">
                                        <img src="{{ $member->image ? asset('storage/' . $member->image) : asset('assets/images/default-profile.png') }}"
                                            class="img-fluid" alt="{{ $member->name }}"
                                            onerror="this.src='{{ asset('assets/images/default-profile.png') }}';" />
                                    </div>
                                    <div class="member-info">
                                        <h4>{{ $member->name }}</h4>
                                        <span>{{ $member->position }}</span>
                                        <div class="social">
                                            @if (!empty($member->social_links) && is_array($member->social_links))
                                                @foreach($member->social_links as $link)
                                                    <a href="{{ $link['url'] ?? '#' }}" target="_blank" rel="noopener noreferrer">
                                                        <i class="bi {{ $link['icon'] ?? 'bi-globe' }}"></i>
                                                    </a>
                                                @endforeach
                                            @else
                                                <!-- Default social links if none are provided -->
                                                <a href="#"><i class="bi bi-twitter"></i></a>
                                                <a href="#"><i class="bi bi-facebook"></i></a>
                                                <a href="#"><i class="bi bi-instagram"></i></a>
                                                <a href="#"><i class="bi bi-linkedin"></i></a>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <!-- Fallback if no team members available -->
                    <div class="text-center text-white">
                        <h3>No Team Members Available</h3>
                        <p>Please check back later or contact us for more information.</p>
                    </div>
                @endif
            </div>
        </section>

        <!-- /Team Section -->

        <!-- Contact Section -->
     <!-- Contact Section -->
<section id="contact" class="contact section dark-background">
    <div class="container section-title aos-init aos-animate" data-aos="fade-up">
        <h2>Contact</h2>
        <p>To Reach Us</p>
    </div>

    <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
            <div class="col-lg-6">
                <div class="row gy-4">
                    <div class="col-lg-12">
                        <div class="info-item d-flex flex-column justify-content-center align-items-center aos-init aos-animate"
                            data-aos="fade-up" data-aos-delay="200">
                            <i class="bi bi-geo-alt"></i>
                            <h3>Address</h3>
                            <p>{{ $contact->address ?? 'A108 Adam Street, New York, NY 535022' }}</p>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="info-item d-flex flex-column justify-content-center align-items-center aos-init aos-animate"
                            data-aos="fade-up" data-aos-delay="300">
                            <i class="bi bi-telephone"></i>
                            <h3>Call Us</h3>
                            <p>{{ $contact->phone ?? '+1 5589 55488 55' }}</p>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="info-item d-flex flex-column justify-content-center align-items-center aos-init aos-animate"
                            data-aos="fade-up" data-aos-delay="400">
                            <i class="bi bi-envelope"></i>
                            <h3>Email Us</h3>
                            <p>{{ $contact->email ?? 'info@example.com' }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <form action="{{ route('contacts.store') }}" method="POST" class="php-email-form aos-init aos-animate"
                data-aos="fade-up" data-aos-delay="500">
                @csrf
                <div class="row gy-4">
                    <div class="col-md-6">
                        <input type="text" name="name" class="form-control" placeholder="Your Name" required>
                    </div>

                    <div class="col-md-6">
                        <input type="email" class="form-control" name="email" placeholder="Your Email" required>
                    </div>

                    <div class="col-md-12">
                        <input type="text" class="form-control" name="subject" placeholder="Subject" required>
                    </div>

                    <div class="col-md-12">
                        <textarea class="form-control" name="message" rows="4" placeholder="Message" required></textarea>
                    </div>

                    <div class="col-md-12 text-center">
                        <div class="loading d-none">Loading...</div>
                        <div class="error-message d-none"></div>
                        <div class="sent-message d-none">Your message has been sent successfully!</div>

                        @if(session('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                        @endif

                        @if(session('error'))
                            <div class="alert alert-danger">
                                {{ session('error') }}
                            </div>
                        @endif

                        <button type="submit" class="btn" style="background-color: #ffc107; color: #000;">
                            Send Message
                        </button>
                    </div>
            </form>

            </div>
        </div>
    </div>
</section>

        <!-- /Contact Section -->
    </main>

   <footer id="footer" class="footer dark-background">
      <div class="container footer-top">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-6 footer-about">
            <a
              href="#"
              class="logo d-flex align-items-center"
            >
              <span class="sitename">Madex Team</span>
            </a>
            <div class="footer-contact pt-3">
              <p>A108 Adam Street</p>
              <p>New York, NY 535022</p>
              <p class="mt-3">
                <strong>Phone:</strong> <span>+1 5589 55488 55</span>
              </p>
              <p><strong>Email:</strong> <span>info@example.com</span></p>
            </div>
            <div class="social-links d-flex mt-4">
              <a href=""><i class="bi bi-twitter-x"></i></a>
              <a href=""><i class="bi bi-facebook"></i></a>
              <a href=""><i class="bi bi-instagram"></i></a>
              <a href=""><i class="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bi bi-chevron-right"></i> <a href="#">Home</a></li>
              <li>
                <i class="bi bi-chevron-right"></i> <a href="#">About us</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i> <a href="#">Services</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="#">Terms of service</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <i class="bi bi-chevron-right"></i> <a href="#">Web Design</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="#">Web Development</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="#">Product Management</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i> <a href="#">Marketing</a>
              </li>
              <li>
                <i class="bi bi-chevron-right"></i>
                <a href="#">Graphic Design</a>
              </li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-12 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>
              Subscribe to our newsletter and receive the latest news about our
              products and services!
            </p>
            <form
              action="forms/newsletter.php"
              method="post"
              class="php-email-form"
            >
              <div class="newsletter-form">
                <input type="email" name="email" /><input
                  type="submit"
                  value="Subscribe"
                />
              </div>
              <div class="sent-message">
                Your subscription request has been sent. Thank you!
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span> <strong class="px-1 sitename">Madex Team</strong>
          <span>All Rights Reserved</span>
        </p>
        <div class="credits">
          Designed by <a href="#">Legion</a>
        </div>
      </div>
    </footer>

    <!-- Scroll Top -->
    <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>


    <!-- Vendor JS Files -->
    <script src="{{ url('../assets/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ url('../assets/js/validate.js') }}"></script>
    <script src="{{ url('../assets/js/aos.js') }}"></script>
    <script src="{{ url('../assets/js/glightbox.min.js') }}"></script>
    <script src="{{ url('../assets/js/purecounter_vanilla.js') }}"></script>
    <script src="{{ url('../assets/js/swiper-bundle.min.js') }}"></script>
    <script src="{{ url('../assets/js/imagesloaded.pkgd.min.js') }}"></script>
    <script src="{{ url('../assets/js/isotope.pkgd.min.js') }}"></script>

    <!-- Main JS File -->
    <script src="{{ url('../assets/js/main.js') }}"></script>
    <!-- Contact Form Validation Script -->
    <script>
            document.addEventListener("DOMContentLoaded", function () {
            let contactForm = document.querySelector(".php-email-form");

            contactForm.addEventListener("submit", function (event) {
                event.preventDefault();

                let formData = new FormData(contactForm);
                let loadingElement = contactForm.querySelector(".loading");
                let errorMessageElement = contactForm.querySelector(".error-message");
                let successMessageElement = contactForm.querySelector(".sent-message");

                // Show loading animation
                if (loadingElement) loadingElement.classList.remove("d-none");
                if (errorMessageElement) errorMessageElement.classList.add("d-none");
                if (successMessageElement) successMessageElement.classList.add("d-none");

                fetch(contactForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                        "X-Requested-With": "XMLHttpRequest",
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (loadingElement) loadingElement.classList.add("d-none");

                        if (data.success) {
                            if (successMessageElement) {
                                successMessageElement.classList.remove("d-none");
                                successMessageElement.innerHTML = data.message;
                            }
                            contactForm.reset(); // Reset the form fields
                        } else {
                            if (errorMessageElement) {
                                errorMessageElement.classList.remove("d-none");
                                errorMessageElement.innerHTML = data.message || "An error occurred. Please try again.";
                            }
                        }
                    })
                    .catch(() => {
                        if (loadingElement) loadingElement.classList.add("d-none");
                        if (errorMessageElement) {
                            errorMessageElement.classList.remove("d-none");
                            errorMessageElement.innerHTML = "Something went wrong. Please try again.";
                        }
                    });
            });
        });

        </script>


</body>

</html>
