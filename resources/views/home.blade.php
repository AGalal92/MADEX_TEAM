<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>Madex Team</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />

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
                <!-- Uncomment the line below if you also wish to use an image logo -->
                <!-- <img src="assets/img/logo.png" alt=""> -->
                <!-- <h1 class="sitename"> -->
                <img src="{{ url('../assets/images/MadeX - white horizontal.png') }}" />
                <!-- </h1> -->
            </a>

            <!-- <nav id="navmenu" class="navmenu">
          <ul>
            <li><a href="#hero" class="active">Home</a></li>
            <li><a href="#about" class="">About</a></li>
            <li><a href="#services" class="">Services</a></li>
            <li><a href="#portfolio" class="">Portfolio</a></li>
            <li><a href="#team" class="">Team</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav> -->

            <!-- <a
          class="cta-btn"
          href="#about"
          >Get Started</a
        > -->
        </div>
    </header>

    <main class="main">
        <!-- Hero Section -->
        <section id="hero" class="hero section dark-background">
            <!-- <img
          src="hero-bg.jpg"
          alt=""
          data-aos="fade-in"
          class="aos-init aos-animate"
        /> -->
            <ul class="slideshow">
                <!-- <li>
            <span>Image 01</span>
            <div><h3>A little something something</h3></div>
          </li> -->
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
                    style="font-size: 6em; font-weight: 900; color: #ffc907;">
                    Comming Soon
                </p>
                <div class="d-flex mt-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                    <!-- <a href="#about" class="btn-get-started">Get Started</a>
            <a
              href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
              class="glightbox btn-watch-video d-flex align-items-center"
              ><i class="bi bi-play-circle"></i><span>Watch Video</span></a
            > -->
                </div>
            </div>
        </section>
        <!-- /Hero Section -->

        <!-- About Section -->
        <section id="about" class="about section dark-background">
            <div class="container">
                <div class="row gy-4">
                    <!-- Left Column -->
                    <div class="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                        <h3>{{ $about->title }}</h3>
                        <img src="{{ $about->img1 ? asset('storage/' . $about->img1) : url('../assets/images/about.jpg') }}"
                            class="img-fluid rounded-4 mb-4" alt="About Image" />
                        <p>{{ $about->par1 }}</p>
                        <p>{{ $about->par2 }}</p>
                    </div>

                    <!-- Right Column -->
                    <div class="col-lg-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="250">
                        <div class="content ps-0 ps-lg-5">
                            <p class="fst-italic">
                                {{ $about->slug1 }}
                            </p>
                            <ul>
                                <li>
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
                                </li>
                                <li>
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span>
                                </li>
                                <li>
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                        in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat
                                        nulla pariatur.</span>
                                </li>
                            </ul>
                            <p>
                                {{ $about->slug2 }}
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
                </div>
            </div>
        </section>

        <!-- /About Section -->

        <!-- Stats Section -->
        <section id="stats" class="stats section dark-background">
            <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                <div class="row gy-4">
                    <div class="col-lg-3 col-md-6">
                        <div class="stats-item d-flex align-items-center w-100 h-100">
                            <i class="bi bi-emoji-smile color-blue flex-shrink-0"></i>
                            <div>
                                <span data-purecounter-start="0" data-purecounter-end="232"
                                    data-purecounter-duration="0" class="purecounter">232</span>
                                <p>Happy Clients</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="stats-item d-flex align-items-center w-100 h-100">
                            <i class="bi bi-journal-richtext color-orange flex-shrink-0"></i>
                            <div>
                                <span data-purecounter-start="0" data-purecounter-end="521"
                                    data-purecounter-duration="0" class="purecounter">521</span>
                                <p>Projects</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="stats-item d-flex align-items-center w-100 h-100">
                            <i class="bi bi-headset color-green flex-shrink-0"></i>
                            <div>
                                <span data-purecounter-start="0" data-purecounter-end="1463"
                                    data-purecounter-duration="0" class="purecounter">1463</span>
                                <p>Hours Of Support</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="stats-item d-flex align-items-center w-100 h-100">
                            <i class="bi bi-people color-pink flex-shrink-0"></i>
                            <div>
                                <span data-purecounter-start="0" data-purecounter-end="15"
                                    data-purecounter-duration="0" class="purecounter">15</span>
                                <p>Hard Workers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /Stats Section -->

        <!-- Services Section -->
        <section id="services" class="services section dark-background">
            <div class="container section-title aos-init aos-animate" data-aos="fade-up">
                <h2>Services</h2>
                <p>Featured Srvices<br /></p>
            </div>

            <div class="container aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                <div class="row gy-5">
                    <div class="col-xl-4 col-md-6 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="200">
                        <div class="service-item">
                            <div class="img">
                                <img src="{{ url('../assets/images/services-1.jpg') }}" class="img-fluid"
                                    alt="" />
                            </div>
                            <div class="details position-relative">
                                <div class="icon">
                                    <i class="bi bi-activity"></i>
                                </div>
                                <a href="#"
                                    class="stretched-link">
                                    <h3>Nesciunt Mete</h3>
                                </a>
                                <p>
                                    Provident nihil minus qui consequatur non omnis maiores. Eos
                                    accusantium minus dolores iure perferendis.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-6 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="300">
                        <div class="service-item">
                            <div class="img">
                                <img src="{{ url('../assets/images/services-2.jpg') }}" class="img-fluid"
                                    alt="" />
                            </div>
                            <div class="details position-relative">
                                <div class="icon">
                                    <i class="bi bi-broadcast"></i>
                                </div>
                                <a href="#"
                                    class="stretched-link">
                                    <h3>Eosle Commodi</h3>
                                </a>
                                <p>
                                    Ut autem aut autem non a. Sint sint sit facilis nam iusto
                                    sint. Libero corrupti neque eum hic non ut nesciunt dolorem.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4 col-md-6 aos-init aos-animate" data-aos="zoom-in" data-aos-delay="400">
                        <div class="service-item">
                            <div class="img">
                                <img src="{{ url('../assets/images/services-3.jpg') }}" class="img-fluid"
                                    alt="" />
                            </div>
                            <div class="details position-relative">
                                <div class="icon">
                                    <i class="bi bi-easel"></i>
                                </div>
                                <a href="#"
                                    class="stretched-link">
                                    <h3>Ledo Markt</h3>
                                </a>
                                <p>
                                    Ut excepturi voluptatem nisi sed. Quidem fuga consequatur.
                                    Minus ea aut. Vel qui id voluptas adipisci eos earum
                                    corrupti.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /Services Section -->

        <!-- Clients Section -->
        <section id="clients" class="clients section dark-background">
            <div class="container aos-init aos-animate" data-aos="fade-up">
                <div class="row gy-4">
                    <div class="col-xl-2 col-md-3 col-6 client-logo">
                        <img src="{{ url('../assets/images/client-1.png') }}" class="img-fluid" alt="" />
                    </div>

                    <div class="col-xl-2 col-md-3 col-6 client-logo">
                        <img src="{{ url('../assets/images/client-2.png') }}" class="img-fluid" alt="" />
                    </div>

                    <div class="col-xl-2 col-md-3 col-6 client-logo">
                        <img src="{{ url('../assets/images/client-3.png') }}" class="img-fluid" alt="" />
                    </div>

                    <div class="col-xl-2 col-md-3 col-6 client-logo">
                        <img src="{{ url('../assets/images/client-4.png') }}" class="img-fluid" alt="" />
                    </div>

                    <div class="col-xl-2 col-md-3 col-6 client-logo">
                        <img src="{{ url('../assets/images/client-5.png') }}" class="img-fluid" alt="" />
                    </div>

                    <div class="col-xl-2 col-md-3 col-6 client-logo">
                        <img src="{{ url('../assets/images/client-6.png') }}" class="img-fluid" alt="" />
                    </div>
                </div>
            </div>
        </section>
        <!-- /Clients Section -->

        <!-- Features Section -->
        <!-- <section id="features" class="features section dark-background">
        <div class="container">
          <ul
            class="nav nav-tabs row d-flex aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="100"
            role="tablist"
          >
            <li class="nav-item col-3" role="presentation">
              <a
                class="nav-link active show"
                data-bs-toggle="tab"
                data-bs-target="#features-tab-1"
                aria-selected="true"
                role="tab"
              >
                <i class="bi bi-binoculars"></i>
                <h4 class="d-none d-lg-block">Modi sit est dela pireda nest</h4>
              </a>
            </li>
            <li class="nav-item col-3" role="presentation">
              <a
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#features-tab-2"
                aria-selected="false"
                tabindex="-1"
                role="tab"
              >
                <i class="bi bi-box-seam"></i>
                <h4 class="d-none d-lg-block">Unde praesenti mara setra le</h4>
              </a>
            </li>
            <li class="nav-item col-3" role="presentation">
              <a
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#features-tab-3"
                aria-selected="false"
                tabindex="-1"
                role="tab"
              >
                <i class="bi bi-brightness-high"></i>
                <h4 class="d-none d-lg-block">Pariatur explica nitro dela</h4>
              </a>
            </li>
            <li class="nav-item col-3" role="presentation">
              <a
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#features-tab-4"
                aria-selected="false"
                tabindex="-1"
                role="tab"
              >
                <i class="bi bi-command"></i>
                <h4 class="d-none d-lg-block">Nostrum qui dile node</h4>
              </a>
            </li>
          </ul>

          <div
            class="tab-content aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div
              class="tab-pane fade active show"
              id="features-tab-1"
              role="tabpanel"
            >
              <div class="row">
                <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                  <h3>
                    Voluptatem dignissimos provident quasi corporis voluptates
                    sit assumenda.
                  </h3>
                  <p class="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <spab
                        >Ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.</spab
                      >
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Duis aute irure dolor in reprehenderit in voluptate
                        velit</span
                      >.
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in
                        voluptate trideta storacalaperda mastiro dolore eu
                        fugiat nulla pariatur.</span
                      >
                    </li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </p>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 text-center">
                  <img src="working-1.jpg" alt="" class="img-fluid" />
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="features-tab-2" role="tabpanel">
              <div class="row">
                <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                  <h3>
                    Neque exercitationem debitis soluta quos debitis quo
                    mollitia officia est
                  </h3>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </p>
                  <p class="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.</span
                      >
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Duis aute irure dolor in reprehenderit in voluptate
                        velit.</span
                      >
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Provident mollitia neque rerum asperiores dolores quos
                        qui a. Ipsum neque dolor voluptate nisi sed.</span
                      >
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in
                        voluptate trideta storacalaperda mastiro dolore eu
                        fugiat nulla pariatur.</span
                      >
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 text-center">
                  <img src="working-2.jpg" alt="" class="img-fluid" />
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="features-tab-3" role="tabpanel">
              <div class="row">
                <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                  <h3>
                    Voluptatibus commodi ut accusamus ea repudiandae ut autem
                    dolor ut assumenda
                  </h3>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </p>
                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.</span
                      >
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Duis aute irure dolor in reprehenderit in voluptate
                        velit.</span
                      >
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Provident mollitia neque rerum asperiores dolores quos
                        qui a. Ipsum neque dolor voluptate nisi sed.</span
                      >
                    </li>
                  </ul>
                  <p class="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 text-center">
                  <img src="working-3.jpg" alt="" class="img-fluid" />
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="features-tab-4" role="tabpanel">
              <div class="row">
                <div class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0">
                  <h3>
                    Omnis fugiat ea explicabo sunt dolorum asperiores sequi
                    inventore rerum
                  </h3>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum
                  </p>
                  <p class="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.</span
                      >
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Duis aute irure dolor in reprehenderit in voluptate
                        velit.</span
                      >
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i>
                      <span
                        >Ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in
                        voluptate trideta storacalaperda mastiro dolore eu
                        fugiat nulla pariatur.</span
                      >
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6 order-1 order-lg-2 text-center">
                  <img src="working-4.jpg" alt="" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->

        <!-- Services 2 Section -->
        <!-- <section id="services-2" class="services-2 section dark-background">
        <div
          class="container section-title aos-init aos-animate"
          data-aos="fade-up"
        >
          <h2>Services</h2>
          <p>CHECK OUR SERVICES</p>
        </div>

        <div class="container">
          <div class="row gy-4">
            <div
              class="col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="service-item d-flex position-relative h-100">
                <i class="bi bi-briefcase icon flex-shrink-0"></i>
                <div>
                  <h4 class="title">
                    <a href="#" class="stretched-link">Lorem Ipsum</a>
                  </h4>
                  <p class="description">
                    Voluptatum deleniti atque corrupti quos dolores et quas
                    molestias excepturi sint occaecati cupiditate non provident
                  </p>
                </div>
              </div>
            </div>

            <div
              class="col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div class="service-item d-flex position-relative h-100">
                <i class="bi bi-card-checklist icon flex-shrink-0"></i>
                <div>
                  <h4 class="title">
                    <a href="#" class="stretched-link">Dolor Sitema</a>
                  </h4>
                  <p class="description">
                    Minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat tarad limino ata
                  </p>
                </div>
              </div>
            </div>

            <div
              class="col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div class="service-item d-flex position-relative h-100">
                <i class="bi bi-bar-chart icon flex-shrink-0"></i>
                <div>
                  <h4 class="title">
                    <a href="#" class="stretched-link">Sed ut perspiciatis</a>
                  </h4>
                  <p class="description">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
              </div>
            </div>

            <div
              class="col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div class="service-item d-flex position-relative h-100">
                <i class="bi bi-binoculars icon flex-shrink-0"></i>
                <div>
                  <h4 class="title">
                    <a href="#" class="stretched-link">Magni Dolores</a>
                  </h4>
                  <p class="description">
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                  </p>
                </div>
              </div>
            </div>

            <div
              class="col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div class="service-item d-flex position-relative h-100">
                <i class="bi bi-brightness-high icon flex-shrink-0"></i>
                <div>
                  <h4 class="title">
                    <a href="#" class="stretched-link">Nemo Enim</a>
                  </h4>
                  <p class="description">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                  </p>
                </div>
              </div>
            </div>

            <div
              class="col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div class="service-item d-flex position-relative h-100">
                <i class="bi bi-calendar4-week icon flex-shrink-0"></i>
                <div>
                  <h4 class="title">
                    <a href="#" class="stretched-link">Eiusmod Tempor</a>
                  </h4>
                  <p class="description">
                    Et harum quidem rerum facilis est et expedita distinctio.
                    Nam libero tempore, cum soluta nobis est eligendi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->
        <!-- /Services 2 Section -->

        <!-- Testimonials Section -->
        <!-- <section id="testimonials" class="testimonials section dark-background">
        <img src="testimonials-bg.jpg" class="testimonials-bg" alt="" />

        <div
          class="container aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            class="swiper init-swiper swiper-initialized swiper-horizontal swiper-backface-hidden"
          >
            <script type="application/json" class="swiper-config">
              {
                "loop": true,
                "speed": 600,
                "autoplay": {
                  "delay": 5000
                },
                "slidesPerView": "auto",
                "pagination": {
                  "el": ".swiper-pagination",
                  "type": "bullets",
                  "clickable": true
                }
              }
            </script>
            <div
              class="swiper-wrapper"
              id="swiper-wrapper-fe9b933c4a6af3b7"
              aria-live="off"
              style="
                transition-duration: 0ms;
                transform: translate3d(-2592px, 0px, 0px);
                transition-delay: 0ms;
              "
            >
              <div
                class="swiper-slide"
                role="group"
                aria-label="1 / 5"
                data-swiper-slide-index="0"
              >
                <div class="testimonial-item">
                  <img
                    src="testimonials-1.jpg"
                    class="testimonial-img"
                    alt=""
                  />
                  <h3>Saul Goodman</h3>
                  <h4>Ceo &amp; Founder</h4>
                  <div class="stars">
                    <i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    <span
                      >Proin iaculis purus consequat sem cure digni ssim donec
                      porttitora entum suscipit rhoncus. Accusantium quam,
                      ultricies eget id, aliquam eget nibh et. Maecen aliquam,
                      risus at semper.</span
                    >
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>

              <div
                class="swiper-slide swiper-slide-prev"
                role="group"
                aria-label="2 / 5"
                data-swiper-slide-index="1"
              >
                <div class="testimonial-item">
                  <img
                    src="testimonials-2.jpg"
                    class="testimonial-img"
                    alt=""
                  />
                  <h3>Sara Wilsson</h3>
                  <h4>Designer</h4>
                  <div class="stars">
                    <i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    <span
                      >Export tempor illum tamen malis malis eram quae irure
                      esse labore quem cillum quid cillum eram malis quorum
                      velit fore eram velit sunt aliqua noster fugiat irure amet
                      legam anim culpa.</span
                    >
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>

              <div
                class="swiper-slide swiper-slide-active"
                role="group"
                aria-label="3 / 5"
                data-swiper-slide-index="2"
              >
                <div class="testimonial-item">
                  <img
                    src="testimonials-3.jpg"
                    class="testimonial-img"
                    alt=""
                  />
                  <h3>Jena Karlis</h3>
                  <h4>Store Owner</h4>
                  <div class="stars">
                    <i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    <span
                      >Enim nisi quem export duis labore cillum quae magna enim
                      sint quorum nulla quem veniam duis minim tempor labore
                      quem eram duis noster aute amet eram fore quis sint
                      minim.</span
                    >
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>

              <div
                class="swiper-slide swiper-slide-next"
                role="group"
                aria-label="4 / 5"
                data-swiper-slide-index="3"
              >
                <div class="testimonial-item">
                  <img
                    src="testimonials-4.jpg"
                    class="testimonial-img"
                    alt=""
                  />
                  <h3>Matt Brandon</h3>
                  <h4>Freelancer</h4>
                  <div class="stars">
                    <i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    <span
                      >Fugiat enim eram quae cillum dolore dolor amet nulla
                      culpa multos export minim fugiat minim velit minim dolor
                      enim duis veniam ipsum anim magna sunt elit fore quem
                      dolore labore illum veniam.</span
                    >
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>

              <div
                class="swiper-slide"
                role="group"
                aria-label="5 / 5"
                data-swiper-slide-index="4"
              >
                <div class="testimonial-item">
                  <img
                    src="testimonials-5.jpg"
                    class="testimonial-img"
                    alt=""
                  />
                  <h3>John Larson</h3>
                  <h4>Entrepreneur</h4>
                  <div class="stars">
                    <i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i
                    ><i class="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i class="bi bi-quote quote-icon-left"></i>
                    <span
                      >Quis quorum aliqua sint quem legam fore sunt eram irure
                      aliqua veniam tempor noster veniam enim culpa labore duis
                      sunt culpa nulla illum cillum fugiat legam esse veniam
                      culpa fore nisi cillum quid.</span
                    >
                    <i class="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"
            >
              <span
                class="swiper-pagination-bullet"
                tabindex="0"
                role="button"
                aria-label="Go to slide 1"
              ></span
              ><span
                class="swiper-pagination-bullet"
                tabindex="0"
                role="button"
                aria-label="Go to slide 2"
              ></span
              ><span
                class="swiper-pagination-bullet swiper-pagination-bullet-active"
                tabindex="0"
                role="button"
                aria-label="Go to slide 3"
                aria-current="true"
              ></span
              ><span
                class="swiper-pagination-bullet"
                tabindex="0"
                role="button"
                aria-label="Go to slide 4"
              ></span
              ><span
                class="swiper-pagination-bullet"
                tabindex="0"
                role="button"
                aria-label="Go to slide 5"
              ></span>
            </div>
            <span
              class="swiper-notification"
              aria-live="assertive"
              aria-atomic="true"
            ></span>
          </div>
        </div>
      </section> -->
        <!-- /Testimonials Section -->

        <!-- Portfolio Section -->
        <section id="portfolio" class="portfolio section dark-background">
            <div class="container section-title aos-init aos-animate" data-aos="fade-up">
                <h2>Portfolio</h2>
                <p>CHECK OUR PORTFOLIO</p>
            </div>

            <div class="container">
                <div class="isotope-layout" data-default-filter="*" data-layout="masonry"
                    data-sort="original-order">
                    <ul class="portfolio-filters isotope-filters aos-init aos-animate" data-aos="fade-up"
                        data-aos-delay="100">
                        <li data-filter="*" class="filter-active">All</li>
                        <li data-filter=".filter-app">App</li>
                        <li data-filter=".filter-product">Product</li>
                        <li data-filter=".filter-branding">Branding</li>
                        <li data-filter=".filter-books">Books</li>
                    </ul>

                    <div class="row gy-4 isotope-container aos-init aos-animate" data-aos="fade-up"
                        data-aos-delay="200" style="position: relative; height: 1344px">
                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                            style="position: absolute; left: 0px; top: 0px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/app-1.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>App 1</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="App 1" data-gallery="portfolio-gallery-app"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-product"
                            style="position: absolute; left: 440px; top: 0px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/product-1.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>Product 1</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="Product 1" data-gallery="portfolio-gallery-product"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding"
                            style="position: absolute; left: 880px; top: 0px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/branding-1.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>Branding 1</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="Branding 1" data-gallery="portfolio-gallery-branding"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-books"
                            style="position: absolute; left: 0px; top: 336px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/books-1.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>Books 1</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="Branding 1" data-gallery="portfolio-gallery-book"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                            style="position: absolute; left: 440px; top: 336px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/app-2.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>App 2</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="App 2" data-gallery="portfolio-gallery-app"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-product"
                            style="position: absolute; left: 880px; top: 336px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/product-2.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>Product 2</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="Product 2" data-gallery="portfolio-gallery-product"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding"
                            style="position: absolute; left: 0px; top: 672px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/branding-2.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>Branding 2</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="branding-2.jpg"
                                        title="Branding 2" data-gallery="portfolio-gallery-branding"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-books"
                            style="position: absolute; left: 440px; top: 672px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/books-2.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>Books 2</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="Branding 2" data-gallery="portfolio-gallery-book"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                            style="position: absolute; left: 880px; top: 672px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/app-3.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>App 3</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="App 3" data-gallery="portfolio-gallery-app"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-product"
                            style="position: absolute; left: 0px; top: 1008px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/product-3.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>Product 3</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="Product 3" data-gallery="portfolio-gallery-product"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-branding"
                            style="position: absolute; left: 440px; top: 1008px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/branding-3.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>Branding 3</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="Branding 2" data-gallery="portfolio-gallery-branding"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 portfolio-item isotope-item filter-books"
                            style="position: absolute; left: 880px; top: 1008px">
                            <div class="portfolio-content h-100">
                                <img src="{{ url('../assets/images/books-3.jpg') }}" class="img-fluid"
                                    alt="" />
                                <div class="portfolio-info">
                                    <h4>Books 3</h4>
                                    <p>Lorem ipsum, dolor sit amet consectetur</p>
                                    <a href="#"
                                        title="Branding 3" data-gallery="portfolio-gallery-book"
                                        class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>
                                    <a href="#"
                                        title="More Details" class="details-link"><i
                                            class="bi bi-link-45deg"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /Portfolio Section -->

        <!-- Team Section -->
        <!-- <section id="team" class="team section dark-background">
        <div
          class="container section-title aos-init aos-animate"
          data-aos="fade-up"
        >
          <h2>Team</h2>
          <p>CHECK OUR TEAM</p>
        </div>

        <div class="container">
          <div class="row gy-5">
            <div
              class="col-lg-4 col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="member">
                <div class="pic">
                  <img src="team-1.jpg" class="img-fluid" alt="" />
                </div>
                <div class="member-info">
                  <h4>Walter White</h4>
                  <span>Chief Executive Officer</span>
                  <div class="social">
                    <a href=""><i class="bi bi-twitter-x"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div class="member">
                <div class="pic">
                  <img src="team-2.jpg" class="img-fluid" alt="" />
                </div>
                <div class="member-info">
                  <h4>Sarah Jhonson</h4>
                  <span>Product Manager</span>
                  <div class="social">
                    <a href=""><i class="bi bi-twitter-x"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div class="member">
                <div class="pic">
                  <img src="team-3.jpg" class="img-fluid" alt="" />
                </div>
                <div class="member-info">
                  <h4>William Anderson</h4>
                  <span>CTO</span>
                  <div class="social">
                    <a href=""><i class="bi bi-twitter-x"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> -->
        <!-- /Team Section -->

        <!-- Contact Section -->
        <!-- <section id="contact" class="contact section dark-background">
        <div
          class="container section-title aos-init aos-animate"
          data-aos="fade-up"
        >
          <h2>Contact</h2>
          <p>Necessitatibus eius consequatur</p>
        </div>

        <div
          class="container aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="row gy-4">
            <div class="col-lg-6">
              <div class="row gy-4">
                <div class="col-lg-12">
                  <div
                    class="info-item d-flex flex-column justify-content-center align-items-center aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i class="bi bi-geo-alt"></i>
                    <h3>Address</h3>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div
                    class="info-item d-flex flex-column justify-content-center align-items-center aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i class="bi bi-telephone"></i>
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55</p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div
                    class="info-item d-flex flex-column justify-content-center align-items-center aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <i class="bi bi-envelope"></i>
                    <h3>Email Us</h3>
                    <p>info@example.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <form
                action="forms/contact.php"
                method="post"
                class="php-email-form aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div class="row gy-4">
                  <div class="col-md-6">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      placeholder="Your Name"
                      required=""
                    />
                  </div>

                  <div class="col-md-6">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Your Email"
                      required=""
                    />
                  </div>

                  <div class="col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      name="subject"
                      placeholder="Subject"
                      required=""
                    />
                  </div>

                  <div class="col-md-12">
                    <textarea class="form-control" name="message" rows="4" placeholder="Message" required=""></textarea>
                  </div>

                  <div class="col-md-12 text-center">
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message">
                      Your message has been sent. Thank you!
                    </div>

                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> -->
        <!-- /Contact Section -->
    </main>

    <!-- <footer id="footer" class="footer dark-background">
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
              <div class="loading">Loading</div>
              <div class="error-message"></div>
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
    </footer> -->

    <!-- Scroll Top -->
    <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i
            class="bi bi-arrow-up-short"></i></a>

    <!-- Preloader -->

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

    <!-- <script defer="defer" src="vcd15cbe7772f49c399c6a5babf22c1241717689176015"
        integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
        data-cf-beacon='{"rayId":"8d8b01821e4e0d86","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"version":"2024.10.4","token":"68c5ca450bae485a842ff76066d69420"}'
        crossorigin="anonymous"></script> -->
</body>

</html>
