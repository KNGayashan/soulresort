<?php 
/** 
* Template Name: About Us Template
*
* @package base_theme
**/ 
get_header('dark');
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<div class="page-content aboutus-template">
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
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <!-- Journey Section -->
    <section class="common_wrapper">
        <?php if (have_rows('journey_begin_section')):  while (have_rows('journey_begin_section')): the_row(); ?>
        <div class="journey-section" id="journey-section-id">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-12">
                        <div class="journey-content text-center">
                            <h2 class="journey-title"><?php the_sub_field('journey_title') ?></h2>
                            <div class="journey-text">
                                <?php the_sub_field('journey_description') ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php endwhile; endif; ?>

        <!-- Vision Philosophy Section -->
        <?php if (have_rows('philosophy_section')):  while (have_rows('philosophy_section')): the_row(); ?>
        <div class="vision-section" id="vision-section-id">
            <div class="container">
                <div class="content_wrapper">
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <div class="vision-content">
                                <h2 class="vision-title"><?php the_sub_field('philosophy_title') ?></h2>
                                <p class="vision-text">
                                    <?php the_sub_field('philosophy_description') ?>
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="vision-image">
                                <?php 
                            $vision_banner_image = get_sub_field('philosophy_right_image');
                            if ($vision_banner_image): ?>
                                <img src="<?php echo esc_url($vision_banner_image['url']); ?>"
                                    alt="<?php echo esc_attr($vision_banner_image['alt']); ?>"
                                    class="banner_image img-fluid">
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php endwhile; endif; ?>
    </section>


</div>

<?php
get_footer();
?>