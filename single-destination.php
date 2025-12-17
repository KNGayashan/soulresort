<?php
/**
 * The template for displaying all single destinationposts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package base_theme
 */

get_header();
?>

<div class="page-content single_destination">

    <!-- Hero section -->
    <setion class="hero">
        <?php if (has_post_thumbnail()): ?>
        <div class="bg_img">
            <?php the_post_thumbnail('full', ['class' => 'img-fluid image', 'width' => 424, 'height' => 271, 'decoding' => 'async', 'role' => 'img', 'aria-label' => get_the_title()]); ?>
        </div>
        <?php endif; ?>
        <div class="container">
            <div class="content_wrapper">
                <h1 class="title"><?php the_title(); ?></h1>
                <?php while (have_rows('hero_section')): the_row(); ?>
                <h6 class="description pt-2">
                    <small class="text-muted">
                        <?php the_sub_field('description'); ?>
                    </small>
                </h6>
                <?php endwhile; ?>
            </div>
        </div>
    </setion>

    <section class="destination_content">
        <div class="container">
            <div class="places_wrapper">
                <?php while (have_rows('body_content')): the_row(); ?>
                <?php while (have_rows('place_to_visit')): the_row(); ?>
                <div class="place_wrapper">
                    <div class="title_wrapper">
                        <h2 class="title"><?php the_sub_field('title'); ?></h2>
                    </div>
                    <ul class="content_wrapper_main">
                        <?php
                        if( have_rows('all_places') ):
                            $index = 0;
                            while( have_rows('all_places') ) : the_row(); 
                                $is_even = $index % 2 === 1; // alternate layout
                        ?>

                        <li class="single_item">
                            <div class=" row g-0">
                                <?php if (!$is_even): // Image right ?>

                                <div class="col-12 col-md-6 col-lg-6">
                                    <div class="thumb_wrapper">
                                        <?php $singleDestinationThumb = get_sub_field('thumbnail'); if (!empty($singleDestinationThumb)): ?>
                                        <img class="img-fluid image" width="424" height="271"
                                            src="<?php echo esc_url($singleDestinationThumb['url']); ?>"
                                            alt="<?php echo esc_attr($singleDestinationThumb['alt']); ?>"
                                            decoding="async" role="img"
                                            aria-label="<?php echo esc_attr($singleDestinationThumb['alt']); ?>">
                                        <?php endif; ?>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 col-lg-6">
                                    <div class="content_wrapper right">
                                        <h2 class="title"><?php the_sub_field('title'); ?></h2>
                                        <p class="description"><?php the_sub_field('description'); ?></p>
                                        <ul class="list_item_wrapper">

                                            <?php
                                            if( have_rows('list_items') ):
                                            while( have_rows('list_items') ) : the_row(); ?>

                                            <li class="single_item">
                                                <?php the_sub_field('item'); ?>
                                            </li>

                                            <?php // End loop.
                                                endwhile;
                                            else :
                                            endif; ?>
                                        </ul>
                                    </div>
                                </div>

                                <?php else: // Image left ?>
                                <div class="col-12 col-md-6 col-lg-6 order-2 order-md-1">
                                    <div class="content_wrapper left">
                                        <h2 class="title"><?php the_sub_field('title'); ?></h2>
                                        <p class="description"><?php the_sub_field('description'); ?></p>
                                        <ul class="list_item_wrapper">

                                            <?php
                                            if( have_rows('list_items') ):
                                            while( have_rows('list_items') ) : the_row(); ?>

                                            <li class="single_item">
                                                <?php the_sub_field('item'); ?>
                                            </li>

                                            <?php // End loop.
                                                endwhile;
                                            else :
                                            endif; ?>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6 col-lg-6 order-1 order-md-2">
                                    <div class="thumb_wrapper">
                                        <?php $singleDestinationThumb = get_sub_field('thumbnail'); if (!empty($singleDestinationThumb)): ?>
                                        <img class="img-fluid image" width="424" height="271"
                                            src="<?php echo esc_url($singleDestinationThumb['url']); ?>"
                                            alt="<?php echo esc_attr($singleDestinationThumb['alt']); ?>"
                                            decoding="async" role="img"
                                            aria-label="<?php echo esc_attr($singleDestinationThumb['alt']); ?>">
                                        <?php endif; ?>
                                    </div>
                                </div>
                                <?php endif; ?>
                            </div>
                        </li>

                        <?php 
                        $index++;
                        // End loop.
                        endwhile; 
                        else :
                        endif; ?>
                    </ul>
                </div>
                <?php endwhile; ?>

            </div>
        </div>

        <?php while (have_rows('info')): the_row(); ?>
        <div class="place_info_wrapper">
            <div class="top_thumb_wrapper">
                <?php $TopThumb = get_sub_field('top_thumbnail'); if (!empty($TopThumb)): ?>
                <img class="img-fluid image" width="424" height="271" src="<?php echo esc_url($TopThumb['url']); ?>"
                    alt="<?php echo esc_attr($TopThumb['alt']); ?>" decoding="async" role="img"
                    aria-label="<?php echo esc_attr($TopThumb['alt']); ?>">
                <?php endif; ?>
            </div>
            <div class="info_content_wrapper">
                <div class="container">
                    <div class="row g-0">
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="inner_content">
                                <h2 class="title"><?php the_sub_field('when_to_visit:'); ?></h2>
                                <p class="description"><?php the_sub_field('when_description'); ?></p>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div class="inner_content">
                                <h2 class="title"><?php the_sub_field('climate'); ?></h2>
                                <p class="description"><?php the_sub_field('climate_description'); ?></p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <?php endwhile; ?>
        <?php endwhile; ?>
        <?php $singleBlogBtmPattern = get_field('bottom_pattern_image'); if (!empty($singleBlogBtmPattern)): ?>
        <div class="bottom_image_patterns"
            style="background-image: url(<?php echo esc_url($singleBlogBtmPattern['url']); ?>);height: 76px;background-repeat: repeat-x;background-size: contain;">
        </div>
        <?php endif; ?>
    </section>
</div>


<?php
get_footer();