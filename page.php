<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package base_theme
 */

get_header();
?>

<div class="page-content ">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <?php the_content(); ?>
    <?php endwhile; else: ?>
    <p class="text-center"><?php _e('Sorry, there are no posts.'); ?></p>
    <?php endif; ?>

</div>

<?php
get_footer();