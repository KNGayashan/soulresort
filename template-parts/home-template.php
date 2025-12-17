<?php 
/** 
* Template Name: Home Template
*
* @package base_theme
**/ 
get_header();
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<div class="page-content home-template">
    <section class="hero-section">
        <?php if (have_rows('hero_section')):  while (have_rows('hero_section')): the_row(); ?>
        <div class="video-hero">
            <!-- Background Video -->
            <div class="video_wrapper">
                <video id="heroVideo" autoplay muted loop playsinline class="background_video" preload="auto">
                    <source src="<?php the_sub_field('video_url') ?>" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <!-- Video Banner (Fallback) -->
            <?php if (get_sub_field('video_banner')): ?>
            <div class="video_banner" id="videoBanner">
                <?php 
                $banner_image = get_sub_field('video_banner');
                if ($banner_image): ?>
                <img src="<?php echo esc_url($banner_image['url']); ?>"
                    alt="<?php echo esc_attr($banner_image['alt']); ?>" class="banner_image">
                <?php endif; ?>
            </div>
            <?php endif; ?>
            <div class="video_controls">
                <div class="play-pause action">
                    <svg class="play" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M20.4086 9.35258C22.5305 10.5065 22.5305 13.4935 20.4086 14.6474L7.59662 21.6145C5.53435 22.736 3 21.2763 3 18.9671L3 5.0329C3 2.72368 5.53435 1.26402 7.59661 2.38548L20.4086 9.35258Z"
                                stroke="#ffffff" stroke-width="1.5"></path>
                        </g>
                    </svg>
                    <svg class="pause" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M9 19.75C8.80189 19.7474 8.61263 19.6676 8.47253 19.5275C8.33244 19.3874 8.25259 19.1981 8.25 19V5C8.25 4.80109 8.32902 4.61032 8.46967 4.46967C8.61032 4.32902 8.80109 4.25 9 4.25C9.19891 4.25 9.38968 4.32902 9.53033 4.46967C9.67098 4.61032 9.75 4.80109 9.75 5V19C9.74741 19.1981 9.66756 19.3874 9.52747 19.5275C9.38737 19.6676 9.19811 19.7474 9 19.75Z"
                                fill="#ffffff"></path>
                            <path
                                d="M15 19.75C14.8019 19.7474 14.6126 19.6676 14.4725 19.5275C14.3324 19.3874 14.2526 19.1981 14.25 19V5C14.25 4.80109 14.329 4.61032 14.4697 4.46967C14.6103 4.32902 14.8011 4.25 15 4.25C15.1989 4.25 15.3897 4.32902 15.5303 4.46967C15.671 4.61032 15.75 4.80109 15.75 5V19C15.7474 19.1981 15.6676 19.3874 15.5275 19.5275C15.3874 19.6676 15.1981 19.7474 15 19.75Z"
                                fill="#ffffff"></path>
                        </g>
                    </svg>
                </div>
                <div class="mute action">
                    <svg class="mute" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M3.15838 13.9306C2.44537 12.7423 2.44537 11.2577 3.15838 10.0694V10.0694C3.37596 9.70674 3.73641 9.45272 4.1511 9.36978L5.84413 9.03117C5.94499 9.011 6.03591 8.95691 6.10176 8.87788L8.17085 6.39498C9.3534 4.97592 9.94468 4.26638 10.4723 4.45742C11 4.64846 11 5.57207 11 7.41928L11 16.5807C11 18.4279 11 19.3515 10.4723 19.5426C9.94468 19.7336 9.3534 19.0241 8.17085 17.605L6.10176 15.1221C6.03591 15.0431 5.94499 14.989 5.84413 14.9688L4.1511 14.6302C3.73641 14.5473 3.37596 14.2933 3.15838 13.9306V13.9306Z"
                                stroke="#fff"></path>
                            <path d="M15 15L21 9" stroke="#fff" stroke-linecap="round"></path>
                            <path d="M21 15L15 9" stroke="#fff" stroke-linecap="round"></path>
                        </g>
                    </svg>
                    <svg class="unmute" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.4 1.8C11.5532 0.262376 14 1.07799 14 3.00001V21.1214C14 23.0539 11.5313 23.8627 10.3878 22.3049L6.49356 17H4C2.34315 17 1 15.6569 1 14V10C1 8.34315 2.34315 7 4 7H6.5L10.4 1.8ZM12 3L8.1 8.2C7.72229 8.70361 7.12951 9 6.5 9H4C3.44772 9 3 9.44772 3 10V14C3 14.5523 3.44772 15 4 15H6.49356C7.13031 15 7.72901 15.3032 8.10581 15.8165L12 21.1214V3Z"
                                fill="#ffffff"></path>
                            <path
                                d="M16.2137 4.17445C16.1094 3.56451 16.5773 3 17.1961 3C17.6635 3 18.0648 3.328 18.1464 3.78824C18.4242 5.35347 19 8.96465 19 12C19 15.0353 18.4242 18.6465 18.1464 20.2118C18.0648 20.672 17.6635 21 17.1961 21C16.5773 21 16.1094 20.4355 16.2137 19.8256C16.5074 18.1073 17 14.8074 17 12C17 9.19264 16.5074 5.8927 16.2137 4.17445Z"
                                fill="#ffffff"></path>
                            <path
                                d="M21.41 5C20.7346 5 20.2402 5.69397 20.3966 6.35098C20.6758 7.52413 21 9.4379 21 12C21 14.5621 20.6758 16.4759 20.3966 17.649C20.2402 18.306 20.7346 19 21.41 19C21.7716 19 22.0974 18.7944 22.2101 18.4509C22.5034 17.5569 23 15.5233 23 12C23 8.47672 22.5034 6.44306 22.2101 5.54913C22.0974 5.20556 21.7716 5 21.41 5Z"
                                fill="#ffffff"></path>
                        </g>
                    </svg>
                </div>
            </div>
            <div class="content_section">
                <ul class="items">
                    <?php
                    if( have_rows('title_items') ):
                        while( have_rows('title_items') ) : the_row(); ?>
                    <li class="item">
                        <h1 class="title"><?php the_sub_field('title') ?: 'Restore the Balance'; ?></h1>
                    </li>
                    <?php endwhile;
                        else :
                        endif; ?>
                </ul>
            </div>
        </div>
        <?php endwhile; endif; ?>
    </section>

    <?php if (have_rows('about_section')):  while (have_rows('about_section')): the_row(); ?>
    <section class="section-1" id="section-1-id">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-6">
                    <div class="content_wrapper pt-0 pt-md-4">
                        <h2 class="caption">
                            <?php the_sub_field('about_title') ?>
                        </h2>
                        <div class="description">
                            <?php the_sub_field('about_description') ?>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6">
                    <div class="img_box">
                        <?php 
                        $section_1_banner_image = get_sub_field('image');
                        if ($section_1_banner_image): ?>
                        <img src="<?php echo esc_url($section_1_banner_image['url']); ?>"
                            alt="<?php echo esc_attr($section_1_banner_image['alt']); ?>"
                            class="banner_image img-fluid">
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <?php if (have_rows('refresh_the_soul_section')):  while (have_rows('refresh_the_soul_section')): the_row(); ?>
    <section class="section-2" id="section-2-id">
        <div class="container">
            <div class="middle_content">
                <div class="row d-flex align-items-center">
                    <div class="col-12 col-md-6 col-lg-6">
                        <div class="content_wrapper">
                            <h2 class="caption"><?php the_sub_field('title') ?></h2>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6">
                        <div class="content_wrapper">
                            <div class="description">
                                <?php the_sub_field('description') ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section-3" id="section-3-id">
        <div class="background_image">
            <img src="" alt="" class="img-fluid image" id="section3Background">
        </div>
        <div class="section" id="hover-section">
            <?php
            if( have_rows('meals') ):
                $first_image = '';
                $meal_index = 0;
                while( have_rows('meals') ) : the_row(); 
                    $background_image = get_sub_field('background_image');
                    $image_url = $background_image ? $background_image['url'] : '';
                    
                    // Store first image for initial background
                    if ($meal_index === 0 && $image_url) {
                        $first_image = $image_url;
                    }
                    $meal_index++;
            ?>

            <div class="card" data-background-image="<?php echo esc_url($image_url); ?>"
                data-meal-index="<?php echo $meal_index - 1; ?>">
                <div class="text-wrap">
                    <h3 class="title"><?php the_sub_field('meal_title') ?></h3>
                    <p class="description"><?php the_sub_field('meal_description') ?></p>

                    <?php if (have_rows('action')): while (have_rows('action')): the_row(); ?>
                    <div class="action-button">
                        <div class="button-content">
                            <a href="<?php echo esc_url(get_sub_field('link')); ?>" class="btn-action">
                                <span class="btn-text"><?php echo esc_html(get_sub_field('name')); ?></span>
                            </a>
                        </div>
                        <div class="arrow-icon">
                            <svg width="36" height="14" viewBox="0 0 36 14" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 7.6383H35M35 7.6383L27.1127 1M35 7.6383L27.1127 13" stroke="white" />
                            </svg>
                        </div>
                    </div>
                    <?php endwhile; endif; ?>
                </div>


            </div>

            <?php // End loop.
            endwhile; endif; ?>
        </div>

        <script>
        // Set initial background image with fallback
        document.addEventListener('DOMContentLoaded', function() {
            const firstCard = document.querySelector('.section-3 .card');
            const backgroundImage = document.getElementById('section3Background');
            if (firstCard && backgroundImage) {
                const firstImageUrl = firstCard.getAttribute('data-background-image');
                if (firstImageUrl) {
                    backgroundImage.src = firstImageUrl;
                    console.log('🎨 PHP fallback: Set initial background image:', firstImageUrl);
                }
            }
        });
        </script>
    </section>
    <?php endwhile; endif; ?>

    <?php if (have_rows('ayuruweda_section')):  while (have_rows('ayuruweda_section')): the_row(); ?>
    <section class="section-4" id="section-4-id">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-6">
                    <div class="content_wrapper">
                        <h2 class="caption"><?php the_sub_field('ayuruweda_title') ?></h2>
                        <div class="description"><?php the_sub_field('ayuruweda_description') ?></div>
                        <?php if (have_rows('ayuruweda_action')):  while (have_rows('ayuruweda_action')): the_row(); ?>
                        <div class="action_wrapper">
                            <a href="<?php echo esc_url(get_sub_field('link')); ?>" class="btn_action">
                                <?php the_sub_field('name') ?>
                                <svg width="29" height="12" viewBox="0 0 29 12" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 6.53192H28M28 6.53192L21.6901 1M28 6.53192L21.6901 11" stroke="black" />
                                </svg>
                            </a>
                        </div>
                        <?php endwhile; endif; ?>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6">
                    <div class="img_box">
                        <?php 
                        $section_4_banner_image = get_sub_field('image');
                        if ($section_4_banner_image): ?>
                        <img src="<?php echo esc_url($section_4_banner_image['url']); ?>"
                            alt="<?php echo esc_attr($section_4_banner_image['alt']); ?>" class="image img-fluid">
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <?php if (have_rows('blogs_section')):  while (have_rows('blogs_section')): the_row(); ?>
    <section class="section-5" id="section-5-id">
        <div class="background_image">
            <?php 
                        $section_5_banner_image = get_sub_field('background_image');
                        if ($section_5_banner_image): ?>
            <img src="<?php echo esc_url($section_5_banner_image['url']); ?>"
                alt="<?php echo esc_attr($section_5_banner_image['alt']); ?>" class="image img-fluid">
            <?php endif; ?>
        </div>
        <h2 class="caption"><?php the_sub_field('blogs_title') ?></h2>
        <div class="slider">
            <div class="blog-slider-container">
                <div class="owl-carousel owl-theme blog-slider">
                    <?php
                    // Get latest 5 posts
                    $blog_posts = new WP_Query(array(
                        'post_type' => 'post',
                        'posts_per_page' => 5,
                        'post_status' => 'publish',
                        'orderby' => 'date',
                        'order' => 'DESC'
                    ));

                    if ($blog_posts->have_posts()) :
                        while ($blog_posts->have_posts()) : $blog_posts->the_post();
                            // Get ACF archive page info
                            $archive_info = get_field('archive_page_info');
                            
                            // Set fallback values
                            $card_title = $archive_info['title'] ?? get_the_title();
                            $card_description = $archive_info['short_description'] ?? wp_trim_words(get_the_excerpt(), 20, '...');
                            $button_text = $archive_info['button_name'] ?? 'Read More';
                    ?>
                    <div class="item">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title"><?php echo esc_html($card_title); ?></h3>
                                <p class="card-text"><?php echo esc_html($card_description); ?></p>
                                <a href="<?php echo esc_url(get_permalink()); ?>"
                                    class="btn btn-link"><?php echo esc_html($button_text); ?> →</a>
                            </div>
                        </div>
                    </div>
                    <?php
                        endwhile;
                        wp_reset_postdata();
                    else :
                        // Fallback content if no posts found
                    ?>
                    <div class="item">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">No posts found</h3>
                                <p class="card-text">Please add some blog posts to display in the slider.</p>
                                <a href="#" class="btn btn-link">Read More →</a>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>

                </div>

                <!-- Navigation Arrows -->
                <div class="blog-nav-arrows">
                    <button class="blog-nav-btn blog-nav-prev" aria-label="Previous">
                        <svg width="36" height="14" viewBox="0 0 36 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36 7.6383H1M1 7.6383L8.88732 1M1 7.6383L8.88732 13" stroke="white" />
                        </svg>

                    </button>
                    <button class="blog-nav-btn blog-nav-next" aria-label="Next">
                        <svg width="36" height="14" viewBox="0 0 36 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 7.6383H35M35 7.6383L27.1127 1M35 7.6383L27.1127 13" stroke="white" />
                        </svg>
                    </button>
                </div>
            </div>
            <!-- View All Button -->
            <?php if (have_rows('btn_action')):  while (have_rows('btn_action')): the_row(); ?>
            <div class="blog-view-all">
                <a href="<?php echo esc_url(get_permalink(get_option('btn_url'))); ?>" class="view-all-btn">
                    <span><?php the_sub_field('btn_name') ?></span>
                    <svg width="29" height="12" viewBox="0 0 29 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6.53192H28M28 6.53192L21.6901 1M28 6.53192L21.6901 11" stroke="white" />
                    </svg>

                </a>
            </div>
            <?php endwhile; endif; ?>
        </div>

    </section>
    <?php endwhile; endif; ?>

    <?php if (have_rows('offers_section')):  while (have_rows('offers_section')): the_row(); 
        $section_active = get_sub_field('section_active');
        $section_class = 'section-6' . ($section_active ? '' : ' d-none');
    ?>
    <section class="<?php echo esc_attr($section_class); ?>" id="section-6-id">
        <div class="background_image">
            <?php 
                        $section_5_banner_image = get_sub_field('background_image');
                        if ($section_5_banner_image): ?>
            <img src="<?php echo esc_url($section_5_banner_image['url']); ?>"
                alt="<?php echo esc_attr($section_5_banner_image['alt']); ?>" class="image img-fluid">
            <?php endif; ?>
        </div>
        <div class="container">
            <div class="row g-0">
                <div class="col-12 col-md-6 col-lg-6">
                    <div class="content_wrapper">
                        <h2 class="caption d-block d-md-none"><?php the_sub_field('title') ?></h2>
                        <div class="img_wrapper">
                            <?php 
                        $section_5_left_banner_image = get_sub_field('left_image');
                        if ($section_5_left_banner_image): ?>
                            <img src="<?php echo esc_url($section_5_left_banner_image['url']); ?>"
                                alt="<?php echo esc_attr($section_5_left_banner_image['alt']); ?>"
                                class="image img-fluid">
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-6">
                    <div class="content_wrapper">
                        <h2 class="caption d-none d-md-block"><?php the_sub_field('title') ?></h2>
                        <?php if (have_rows('right_card')):  while (have_rows('right_card')): the_row(); ?>
                        <div class="inner_card">
                            <h3 class="inner_title"><?php the_sub_field('inner_title') ?></h3>
                            <div class="description">
                                <?php the_sub_field('description') ?>
                            </div>
                            <a href="<?php echo esc_url(get_sub_field('button_link')) ?>" class="inner_link">
                                <span><?php the_sub_field('button_name') ?></span>
                                <svg width="36" height="14" viewBox="0 0 36 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 7.6383H35M35 7.6383L27.1127 1M35 7.6383L27.1127 13" stroke="white" />
                                </svg>

                            </a>
                        </div>
                        <?php endwhile; endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <?php if (have_rows('testimonials_section')):  while (have_rows('testimonials_section')): the_row(); ?>
    <section class="section-7" id="section-7-id">
        <h2 class="title"><?php the_sub_field('title') ?></h2>
        <div class="slider">
            <div class="blog-slider-container">
                <div class="owl-carousel owl-theme blog-slider">
                    <?php
                    // Get testimonials from ACF repeater
                    if (have_rows('all_testimonials')):
                        while (have_rows('all_testimonials')): the_row();
                            $testimonial_content = get_sub_field('content');
                            
                            // Skip if no content
                            if (empty($testimonial_content)) continue;
                    ?>
                    <div class="item">
                        <div class="card single_item">
                            <div class="card-body body_content">
                                <div class="content"><?php echo wp_kses_post($testimonial_content); ?></div>
                                <?php if (have_rows('person_details')):  while (have_rows('person_details')): the_row(); ?>
                                <div class="person_wrapper">
                                    <div class="person_image">
                                        <?php 
                                        $person_image = get_sub_field('image');
                                        if ($person_image): ?>
                                        <img src="<?php echo esc_url($person_image['url']); ?>"
                                            alt="<?php echo esc_attr($person_image['alt']); ?>" class="image img-fluid">
                                        <?php endif; ?>
                                    </div>
                                    <h5 class="person_name">
                                        <?php the_sub_field('name') ?>
                                    </h5>
                                </div>
                                <?php endwhile; endif; ?>
                            </div>
                        </div>
                    </div>
                    <?php
                        endwhile;
                    else :
                        // Fallback content if no testimonials found
                    ?>
                    <div class="item">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">No testimonials available at the moment. Please add some
                                    testimonials to display in the slider.</p>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?>

                </div>

                <!-- Navigation Arrows -->
                <div class="blog-nav-arrows">
                    <button class="blog-nav-btn blog-nav-prev" aria-label="Previous">
                        <svg width="36" height="14" viewBox="0 0 36 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36 7.6383H1M1 7.6383L8.88732 1M1 7.6383L8.88732 13" stroke="#1B4E6E" />
                        </svg>

                    </button>
                    <button class="blog-nav-btn blog-nav-next" aria-label="Next">
                        <svg width="36" height="14" viewBox="0 0 36 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 7.6383H35M35 7.6383L27.1127 1M35 7.6383L27.1127 13" stroke="#1B4E6E" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- View All Button -->
            <?php if (have_rows('btn_action')):  while (have_rows('btn_action')): the_row(); ?>
            <div class="blog-view-all">
                <a href="<?php echo esc_url(get_permalink(get_option('btn_url'))); ?>" class="view-all-btn">
                    <span><?php the_sub_field('btn_name') ?></span>
                    <svg width="29" height="12" viewBox="0 0 29 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6.53192H28M28 6.53192L21.6901 1M28 6.53192L21.6901 11" stroke="white" />
                    </svg>
                </a>
            </div>
            <?php endwhile; endif; ?>
        </div>
    </section>
    <?php endwhile; endif; ?>

</div>

<?php
get_footer();