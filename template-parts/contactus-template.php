<?php 
/** 
* Template Name: Contact Us Template
*
* @package base_theme
**/ 
get_header();
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<div class="page-content contactus-template">
    <!-- Hero Section -->
    <?php if (have_rows('hero_section')):  while (have_rows('hero_section')): the_row(); ?>
    <section class="hero-section">
        <div class="hero-background">
            <?php 
                            $hero_background = get_sub_field('background_image');
                            if ($hero_background): ?>
            <img src="<?php echo esc_url($hero_background['url']); ?>"
                alt="<?php echo esc_attr($hero_background['alt']); ?>" class="hero-bg-image">
            <?php endif; ?>
        </div>

        <div class="hero-content">
            <div class="container">

                <div class="contact-info-section">
                    <h1 class="hero-title"><?php the_sub_field('title') ?></h1>
                    <?php if (have_rows('inner_content')):  while (have_rows('inner_content')): the_row(); ?>

                    <div class="contact-info-content">
                        <div class="contact-info-bg">
                            <?php 
                            $inner_hero_background = get_sub_field('background_image');
                            if ($inner_hero_background): ?>
                            <img src="<?php echo esc_url($inner_hero_background['url']); ?>"
                                alt="<?php echo esc_attr($inner_hero_background['alt']); ?>"
                                class="inner_hero-bg-image">
                            <?php endif; ?>
                        </div>
                        <div class="inner_content">
                            <div class="inner_Wrapper w-100">
                                <div class="row">
                                    <?php if (have_rows('call_us')):  while (have_rows('call_us')): the_row(); ?>
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <div class="contact-item">
                                            <h3><?php the_sub_field('title') ?></h3>
                                            <?php
                                            if( have_rows('numbers') ):
                                                while( have_rows('numbers') ) : the_row();?>
                                            <div class="pn_numbers">
                                                <a href="tel:<?php the_sub_field('number') ?>"
                                                    class="call-btn"><?php the_sub_field('number') ?></a>
                                            </div>

                                            <?php // End loop.
                                        endwhile;
                                        else :
                                        endif; ?>
                                        </div>
                                    </div>
                                    <?php endwhile; endif; ?>
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <?php if (have_rows('address')):  while (have_rows('address')): the_row(); ?>
                                        <div class="contact-item address">
                                            <h3><?php the_sub_field('title') ?></h3>
                                            <p class="address-text"><?php the_sub_field('location') ?></p>
                                        </div>
                                        <?php endwhile; endif; ?>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <?php if (have_rows('email_and_other_sm')):  while (have_rows('email_and_other_sm')): the_row(); ?>
                                        <div class="contact-item">
                                            <h3><?php the_sub_field('title') ?></h3>
                                            <a href="mailto:<?php the_sub_field('email') ?>"
                                                class="email-btn"><?php the_sub_field('email') ?></a>
                                            <div class="social-icons">
                                                <?php
                                                if( have_rows('single_social_media') ):
                                                    while( have_rows('single_social_media') ) : the_row();?>

                                                <a href="<?php the_sub_field('link') ?>" class="social-icon">
                                                    <?php 
                                                    $sm_icon = get_sub_field('icon');
                                                    if ($sm_icon): ?>
                                                    <img src="<?php echo esc_url($sm_icon['url']); ?>"
                                                        alt="<?php echo esc_attr($sm_icon['alt']); ?>" class="icon">
                                                    <?php endif; ?>
                                                </a>

                                                <?php 
                                        endwhile;
                                        else :
                                        endif; ?>
                                            </div>
                                        </div>
                                        <?php endwhile; endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php endwhile; endif; ?>
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <!-- Get in Touch Section -->
    <?php if (have_rows('get_in_touch_section')):  while (have_rows('get_in_touch_section')): the_row(); ?>
    <section class="get-in-touch-section">
        <div class="container">
            <h2 class="section-title"><?php the_sub_field('title') ?></h2>
            <p class="section-subtitle">
                <?php the_sub_field('description') ?>
            </p>
            <div class="contact-form">
                <?php echo do_shortcode('[forminator_form id="305"]'); ?>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <!-- How to Find Us Section -->
    <?php if (have_rows('get_in_touch_section')):  while (have_rows('get_in_touch_section')): the_row(); ?>
    <section class="how-to-find-section">
        <div class="container">
            <h2 class="section-title"><?php the_sub_field('title') ?></h2>
            <div class="map-container">
                <div id="map-zoom-15" class="map-wrapper">
                    <iframe src="https://maps.google.com/maps?q=5.956171,80.6513366&hl=en&z=15&output=embed"
                        width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                        title="Soul Resorts - Zoom Level 15">
                    </iframe>
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

</div>

<?php
get_footer();
?>