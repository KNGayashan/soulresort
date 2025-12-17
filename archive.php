<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package base_theme
 */

get_header();
?>

<main id="primary" class="site-main">

    <main id="main" class="site-main">

        <header class="page-header">
            <?php
	the_archive_title('<h1 class="page-title">', '</h1>');
	the_archive_description('<div class="archive-description">', '</div>');
	?>
        </header>

        <div class="page-header">
            <h1 class="page-title">
                <?php single_tag_title(); ?>
            </h1>
        </div>

        <?php 
        // Check if it's a tag archive page
        if (is_tag()) {
            $queried_object = get_queried_object(); // Get the current queried object
            $tag_id = $queried_object->term_id; // Get the ID of the tag

            $args = array(
                'post_type' => 'any', // Fetches any type of post including custom post types
                'posts_per_page' => -1, // Show all posts
                'tag__in' => array($tag_id) // Filter by the current tag
            );

            $tag_query = new WP_Query($args);

            if ($tag_query->have_posts()) {
                echo '<ul>';

                while ($tag_query->have_posts()) {
                    $tag_query->the_post();
                    echo '<li><a href="' . get_permalink() . '">' . get_the_title() . '</a> (' . get_post_type() . ')</li>';
                }

                echo '</ul>';
            } else {
                echo '<p>No posts found for this tag.</p>';
            }
        } else {
            // Normal archive code here for other types of archives (categories, authors, dates, etc.)
        }
        ?>

    </main>

</main><!-- #main -->

<?php
get_footer();