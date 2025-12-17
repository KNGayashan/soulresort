<?php 
/** 
* Template Name: Ayurveda Template
*
* @package base_theme
**/ 
get_header('dark');
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<div class="page-content ayurveda-template">
    <!-- Hero Section -->
    <?php if (have_rows('hero_section')):  while (have_rows('hero_section')): the_row(); ?>
    <section class="hero-section" id="hero-section">
        <div class="hero-background">
            <div class="hero-image-container">
                <?php 
                // For ACF integration, replace the hardcoded URL with:
                // $hero_image = get_field('hero_background_image');
                // $hero_image_url = $hero_image ? $hero_image['url'] : 'default-image-url';
                $hero_image = get_sub_field('hero_banner'); 
                $hero_image_url = $hero_image ? $hero_image : 'default-image-url';
                ?>
                <div class="hero-image-clippath" id="hero-clippath"
                    style="background-image: url('<?php echo esc_url($hero_image_url); ?>');">
                </div>
            </div>
        </div>
        <!-- Text behind clippath (blue) -->
        <div class="hero-text-back">
            <div class="container">
                <div class="hero-text-wrapper">
                    <h1 class="hero-title-blue">
                        <span class="hero-title-line"><?php the_sub_field('hero_title') ?></span>
                    </h1>
                    <p class="hero-description-blue"><?php the_sub_field('hero_description') ?></p>
                </div>
            </div>
        </div>

        <!-- Text in front of clippath (white) -->
        <div class="hero-content">
            <div class="container">
                <div class="hero-text-wrapper">
                    <h1 class="hero-title-white" id="hero-title">
                        <span class="hero-title-line"><?php the_sub_field('hero_title') ?></span>
                    </h1>
                    <p class="hero-description-white"><?php the_sub_field('hero_description') ?></p>
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <section class="immunity_section" id="immunity-section-id">
        <div class="container-fluid">
            <div class="content_relative">
                <div class="fixed_content_wrapper">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-8 col-lg-6">
                            <div class="content_wrapper">
                                <div class="items">
                                    <?php if (have_rows('immunity_wellness')):  while (have_rows('immunity_wellness')): the_row(); ?>
                                    <div class="single_item first px-5">
                                        <h2 class="title">
                                            <?php echo get_sub_field('title') ?: 'Immunity Wellness'; ?>
                                        </h2>
                                        <div class="description px-5">
                                            <?php echo get_sub_field('description') ?: '<p>The ancient science of Ayurveda teaches us that the body can be empowered as a natural defence against disease, with nature providing the remedies for various ailments.</p>'; ?>
                                        </div>
                                    </div>
                                    <?php endwhile; endif; if (have_rows('what_is_ayurveda')):  while (have_rows('what_is_ayurveda')): the_row(); ?>
                                    <div class="single_item second px-3">
                                        <h2 class="title">
                                            <?php echo get_sub_field('title') ?: 'What is Ayurveda?'; ?>
                                        </h2>
                                        <div class="description px-5">
                                            <?php echo get_sub_field('description') ?: '<p>Ayurveda, derived from the Sanskrit words "Ayur" meaning "Life" and "Veda" meaning "Science" or "Knowledge," is the ancient science of living well.</p>'; ?>
                                        </div>
                                    </div>
                                    <?php endwhile; endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="images_content_wrapper">
                    <?php if (have_rows('immunity_wellness')):  while (have_rows('immunity_wellness')): the_row(); ?>
                    <div class="image_row first_image_row">
                        <div class="row justify-content-between">
                            <div class="col-12 col-md-2 col-lg-3">
                                <div class="img_wrapper left">
                                    <?php 
                            $top_left_image_img = get_sub_field('top_image_');
                            if ($top_left_image_img && is_array($top_left_image_img) && isset($top_left_image_img['url'])): ?>
                                    <img src="<?php echo esc_url($top_left_image_img['url']); ?>"
                                        alt="<?php echo esc_attr($top_left_image_img['alt'] ?? ''); ?>"
                                        class="img-fluid image">
                                    <?php elseif ($top_left_image_img && is_string($top_left_image_img)): ?>
                                    <img src="<?php echo esc_url($top_left_image_img); ?>" alt=""
                                        class="img-fluid image">
                                    <?php else: ?>
                                    <img src="" alt="Default Image" class="img-fluid image">
                                    <?php endif; ?>
                                </div>
                            </div>
                            <div class="col-12 col-md-2 col-lg-3">
                                <div class="img_wrapper right">
                                    <?php 
                            $top_right_image_img = get_sub_field('bottom_image_');
                            if ($top_right_image_img && is_array($top_right_image_img) && isset($top_right_image_img['url'])): ?>
                                    <img src="<?php echo esc_url($top_right_image_img['url']); ?>"
                                        alt="<?php echo esc_attr($top_right_image_img['alt'] ?? ''); ?>"
                                        class="img-fluid image">
                                    <?php elseif ($top_right_image_img && is_string($top_right_image_img)): ?>
                                    <img src="<?php echo esc_url($top_right_image_img); ?>" alt=""
                                        class="img-fluid image">
                                    <?php else: ?>
                                    <img src="" alt="Default Image" class="img-fluid image">
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php endwhile; endif; if (have_rows('what_is_ayurveda')):  while (have_rows('what_is_ayurveda')): the_row(); ?>
                    <div class="image_row second_image_row">
                        <div class="row justify-content-between">
                            <div class="col-12 col-md-2 col-lg-3">
                                <div class="img_wrapper left">
                                    <?php 
                            $bottom_left_image_imu = get_sub_field('top_image');
                            if ($bottom_left_image_imu && is_array($bottom_left_image_imu) && isset($bottom_left_image_imu['url'])): ?>
                                    <img src="<?php echo esc_url($bottom_left_image_imu['url']); ?>"
                                        alt="<?php echo esc_attr($bottom_left_image_imu['alt'] ?? ''); ?>"
                                        class="img-fluid image">
                                    <?php else: ?>
                                    <img src="" alt="Default Image" class="img-fluid image">
                                    <?php endif; ?>
                                </div>
                            </div>
                            <div class="col-12 col-md-2 col-lg-3">
                                <div class="img_wrapper right">
                                    <?php 
                            $bottom_right_image_imu = get_sub_field('bottom_image');
                            if ($bottom_right_image_imu && is_array($bottom_right_image_imu) && isset($bottom_right_image_imu['url'])): ?>
                                    <img src="<?php echo esc_url($bottom_right_image_imu['url']); ?>"
                                        alt="<?php echo esc_attr($bottom_right_image_imu['alt'] ?? ''); ?>"
                                        class="img-fluid image">
                                    <?php else: ?>
                                    <img src="" alt="Default Image" class="img-fluid image">
                                    <?php endif; ?>
                                </div>

                            </div>
                        </div>
                    </div>
                    <?php endwhile; endif; ?>
                </div>
            </div>
        </div>
    </section>

    <?php if (have_rows('therapies_section')):  while (have_rows('therapies_section')): the_row(); ?>
    <section class="therapies-section" id="therapies-section-id">
        <div class="container">
            <div class="therapies-wrapper">
                <div class="therapies-header">
                    <h2 class="therapies-title"><?php echo get_sub_field('title') ?: 'Immunity Wellness'; ?></h2>
                    <div class="therapies-description">
                        <?php echo get_sub_field('description') ?: 'Immunity Wellness'; ?>
                    </div>
                </div>

                <div class="therapies-container">
                    <div class="therapies-slider">
                        <?php
                        if( have_rows('therapies_container') ):
                            while( have_rows('therapies_container') ) : the_row(); ?>

                        <div class="therapies-slide">
                            <?php 
                            $therapies_bg_img = get_sub_field('background_image');
                            if ($therapies_bg_img && is_array($therapies_bg_img) && isset($therapies_bg_img['url'])): ?>
                            <img src="<?php echo esc_url($therapies_bg_img['url']); ?>"
                                alt="<?php echo esc_attr($therapies_bg_img['alt'] ?? ''); ?>" class="dining-image">
                            <?php else: ?>
                            <img src="" alt="Default Image" class="dining-image">
                            <?php endif; ?>
                            <div class="slide-overlay">
                                <div class="slide-initial-content">
                                    <h1 class="slide-title"><?php echo get_sub_field('title') ?: 'Panchakarma Detox'; ?>
                                    </h1>
                                    <button class="see-more-btn" onclick="showMoreContent(this)">
                                        <?php echo get_sub_field('action_name') ?: 'Discover'; ?>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="slide-expanded-content" style="display: none;">
                                    <h1 class="expanded-title">
                                        <?php echo get_sub_field('title') ?: 'Panchakarma Detox'; ?></h1>
                                    <div class="expanded-description">
                                        <?php echo get_sub_field('popup_content') ?: 'Panchakarma, meaning “five actions,” is Ayurveda'; ?>
                                    </div>
                                    <!-- <button class="close-btn" onclick="hideMoreContent(this)">Close</button> -->
                                </div>
                            </div>
                            <div class="slide_active_overlay">
                                <div class="content_wrapper">
                                    <div class="close_btn">
                                        <button class="close-btn"><i class="ri-close-large-line"></i></button>
                                    </div>
                                    <h2 class="title"><?php echo get_sub_field('title') ?: 'Panchakarma Detox'; ?></h2>
                                    <div class="description">
                                        <?php echo get_sub_field('popup_content') ?: 'Panchakarma, meaning "five actions," is Ayurveda'; ?>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <?php 
                            endwhile;
                        else :
                        endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <!-- Bootstrap Modal for Mobile Devices -->
    <div class="modal fade" style="z-index: 10001;" id="therapiesModal" tabindex="-1"
        aria-labelledby="therapiesModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="therapiesModalLabel">Therapy Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i
                            class="ri-close-large-line"></i></button>
                </div>
                <div class="modal-body" id="therapiesModalBody">
                    <!-- Content will be dynamically inserted here -->
                </div>
            </div>
        </div>
    </div>

    <?php if (have_rows('ayurveda_cuisine_section')):  while (have_rows('ayurveda_cuisine_section')): the_row(); ?>
    <section class="cuisine-section" id="cuisine-section-id">
        <div class="container">
            <div class="cuisine-wrapper">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-6 order-2 order-md-1">
                        <div class="cuisine-left">
                            <h2 class="cuisine-title"><?php echo get_sub_field('title') ?: 'Ayurveda Cuisine'; ?></h2>
                            <div class="cuisine-description">
                                <?php echo get_sub_field('description') ?: 'The ancient science of Ayurveda teaches'; ?>
                            </div>
                            <?php if (have_rows('action')):  while (have_rows('action')): the_row(); ?>
                            <a class="see-more-btn" href="<?php echo get_sub_field('link'); ?>">
                                <?php echo get_sub_field('name') ?: 'Discover'; ?>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                </svg>
                            </a>
                            <?php endwhile; endif; ?>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6  order-1 order-md-2">
                        <div class="cuisine-right">
                            <?php 
                            $bottom_cuisine_image = get_sub_field('image');
                            if ($bottom_cuisine_image && is_array($bottom_cuisine_image) && isset($bottom_cuisine_image['url'])): ?>
                            <img src="<?php echo esc_url($bottom_cuisine_image['url']); ?>"
                                alt="<?php echo esc_attr($bottom_cuisine_image['alt'] ?? ''); ?>"
                                class="cuisine-right-img">
                            <?php else: ?>
                            <img src="" alt="Default Image" class="cuisine-right-img">
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>


    <?php
get_footer();
?>