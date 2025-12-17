<?php 
/** 
* Template Name: Rooms Template
*
* @package base_theme
**/ 
get_header('dark');
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<div class="page-content rooms-template">
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

    <?php if (have_rows('experience_section')):  while (have_rows('experience_section')): the_row(); ?>
    <section class="description-section">
        <div class="container">
            <div class="description-wrapper">
                <h2 class="description-title">
                    <?php the_sub_field('experience_title') ?>
                </h2>

                <div class="description-content">
                    <div class="description-content-wrapper">
                        <div class="description-text">
                            <?php the_sub_field('description') ?>
                        </div>
                        <div class="description-rules">
                            <?php
                            if( have_rows('rules') ):
                                while( have_rows('rules') ) : the_row(); ?>

                            <div class="rule">
                                <?php 
                            $icon_img = get_sub_field('icon');
                            if ($icon_img): ?>
                                <img src="<?php echo esc_url($icon_img['url']); ?>"
                                    alt="<?php echo esc_attr($icon_img['alt']); ?>" class="rule-img">
                                <?php endif; ?>
                                <p class="rule-text"><?php the_sub_field('name') ?></p>
                            </div>

                            <?php // End loop.
                                endwhile;
                            else :
                            endif; ?>
                        </div>
                        <?php if (have_rows('bottom_action')):  while (have_rows('bottom_action')): the_row(); ?>
                        <a class="rule-more-btn" href="<?php echo esc_url(get_sub_field('link')) ?>">
                            <?php the_sub_field('name') ?>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </a>
                        <?php endwhile; endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <?php if (have_rows('room_amenities_section')):  while (have_rows('room_amenities_section')): the_row(); ?>
    <section class="amenities-section">
        <div class="container">
            <div class="amenities-wrapper">
                <h2 class="amenities-title">
                    <?php the_sub_field('section_title') ?>
                </h2>

                <div class="accordion" id="amenitiesAccordion">
                    <!-- Services & Amenities Accordion -->
                    <?php
                    if( have_rows('facilities') ):
                        $item_count = 0;
                        while( have_rows('facilities') ) : the_row(); 
                        $item_count++;
                        $is_first = ($item_count === 1);
                        $collapse_id = 'collapse' . $item_count;
                        $heading_id = 'heading' . $item_count;
                    ?>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="<?php echo $heading_id; ?>">
                            <button class="accordion-button <?php echo $is_first ? '' : 'collapsed'; ?>" type="button"
                                data-bs-toggle="collapse" data-bs-target="#<?php echo $collapse_id; ?>"
                                aria-expanded="<?php echo $is_first ? 'true' : 'false'; ?>"
                                aria-controls="<?php echo $collapse_id; ?>">
                                <span class="accordion-title"><?php the_sub_field('title') ?></span>
                            </button>
                        </h2>
                        <div id="<?php echo $collapse_id; ?>"
                            class="accordion-collapse collapse <?php echo $is_first ? 'show' : ''; ?>"
                            aria-labelledby="<?php echo $heading_id; ?>" data-bs-parent="#amenitiesAccordion">
                            <div class="accordion-body">
                                <div class="amenities-grid">
                                    <?php
                                if( have_rows('features') ):
                                    while( have_rows('features') ) : the_row(); ?>

                                    <div class="amenity-item">
                                        <span><?php the_sub_field('feature_item') ?></span>
                                    </div>
                                    <?php endwhile;
                                else :
                                endif; ?>

                                </div>
                            </div>
                        </div>
                    </div>

                    <?php endwhile;
                    else :
                    endif; ?>

                </div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

    <?php if (have_rows('gallery_section')):  while (have_rows('gallery_section')): the_row(); ?>
    <section class="gallery-section">
        <div class="container">
            <div class="gallery-wrapper">

                <div class="masonry-gallery" id="masonry-gallery">
                    <?php 
                    $gallery_items = get_sub_field('gallery_items');
                    if ($gallery_items): 
                        $image_count = 0;
                        foreach ($gallery_items as $image): 
                            $image_count++;
                            // Better fallback for image URLs
                            if (isset($image['sizes']['large'])) {
                                $image_url = $image['sizes']['large'];
                            } elseif (isset($image['sizes']['medium_large'])) {
                                $image_url = $image['sizes']['medium_large'];
                            } elseif (isset($image['sizes']['medium'])) {
                                $image_url = $image['sizes']['medium'];
                            } else {
                                $image_url = $image['url'];
                            }

                            $full_image_url = $image['url']; // Full size image for lightbox
                            
                            $image_alt = $image['alt'] ?: 'Gallery Image ' . $image_count;
                            $image_caption = $image['caption'] ?: '';
                            
                            // Better fallback for dimensions
                            if (isset($image['sizes']['large-width'])) {
                                $image_width = $image['sizes']['large-width'];
                                $image_height = $image['sizes']['large-height'];
                            } else {
                                $image_width = $image['width'] ?? 800;
                                $image_height = $image['height'] ?? 600;
                            }
                            
                            // Debug: Only show in development
                            if (WP_DEBUG) {
                                error_log("Gallery Image $image_count: URL=$image_url, Width=$image_width, Height=$image_height");
                            }
                    ?>
                    <div class="brick" data-index="<?php echo $image_count; ?>">
                        <div class="brick-inner">
                            <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($image_alt); ?>"
                                class="brick-image" loading="lazy" data-src="<?php echo esc_url($image_url); ?>"
                                data-full-src="<?php echo esc_url($full_image_url); ?>"
                                data-caption="<?php echo esc_attr($image_caption); ?>"
                                data-width="<?php echo $image_width; ?>" data-height="<?php echo $image_height; ?>">
                            <?php if ($image_caption): ?>
                            <div class="brick-overlay">
                                <div class="brick-overlay-content">
                                    <p class="brick-caption"><?php echo esc_html($image_caption); ?></p>
                                </div>
                            </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    <?php 
                        endforeach; 
                    else: 
                    ?>
                    <div class="gallery-empty">
                        <p>No gallery images found.</p>
                    </div>
                    <?php endif; ?>
                </div>

                <!-- Skeleton loading items -->
                <div class="gallery-skeleton" id="gallery-skeleton">
                    <div class="skeleton-item tall"></div>
                    <div class="skeleton-item normal"></div>
                    <div class="skeleton-item wide"></div>
                    <div class="skeleton-item normal"></div>
                    <div class="skeleton-item tall"></div>
                    <div class="skeleton-item wide"></div>
                </div>
            </div>
        </div>

        <div class="lightbox-model" id="lightbox-modal">
            <button class="lightbox-close" id="lightbox-close" aria-label="Close light">&times;</button>
            <button class="lightbox-prev" id="lightbox-prev" aria-label="Previous light">&#8249;</button>
            <button class="lightbox-next" id="lightbox-next" aria-label="Next light">&#8250;</button>
            <div class="lightbox-content">
                <img src="" alt="" class="lightbox-image" id="lightbox-image">
                <div class="lightbox-caption" id="lightbox-caption"></div>
            </div>
        </div>
    </section>
    <?php endwhile; endif; ?>

</div>

<?php
get_footer();
?>