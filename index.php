<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package base_theme
 */

get_header();
?>

<div class="main-content home">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <?php the_content(); ?>
    <?php endwhile; else: ?>
    <p class="text-center"><?php _e('Sorry, there are no posts.'); ?></p>
    <?php endif; ?>
    
</div>

<?php
get_footer();
