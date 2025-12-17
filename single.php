<?php
/**
 * The template for displaying all class single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WP_Starter_Theme
 */

get_header('dark');
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<div class="page-content blog-template">

    <section class="blog-section">
        <div class="container">
            <div class="blog-wrapper">
                <div class="blog-header">
                    <h2 class="blog-title">
                        <?php the_title(); ?>
                    </h2>
                    <div class="blog-meta">
                        <div class="row">
                            <div class="col-6 col-md-3">
                                <div class="author">
                                    <p class="author-text">
                                        <?php 
                                        // Get ACF writer title with fallback
                                        $blog_content = get_field('blog_body_content', get_the_ID());
                                        $acf_writer = isset($blog_content['writter']) ? $blog_content['writter'] : null;
                                        $writer_title = isset($acf_writer['writer_title']) ? $acf_writer['writer_title'] : 'Written By';
                                        echo esc_html($writer_title);
                                        ?>
                                    </p>
                                    <div class="author-content">
                                        <?php 
                                        // First check ACF fields (priority)
                                        $blog_content = get_field('blog_body_content', get_the_ID());
                                        $acf_writer = isset($blog_content['writter']) ? $blog_content['writter'] : null;
                                        
                                        if ($acf_writer && !empty($acf_writer['user_name'])) {
                                            // Use ACF writer data
                                            $author_name = $acf_writer['user_name'];
                                            if (!empty($acf_writer['profile_image'])) {
                                                $author_avatar = $acf_writer['profile_image']['sizes']['thumbnail'];
                                            } else {
                                                $author_avatar = get_avatar_url(0, array('size' => 40)); // Default avatar
                                            }
                                        } else {
                                            // Fallback to WordPress author
                                            $wp_author = get_the_author();
                                            $wp_author_id = get_the_author_meta('ID');
                                            
                                            if (!empty($wp_author) && $wp_author_id > 0) {
                                                $author_avatar = get_avatar_url($wp_author_id, array('size' => 40));
                                                $author_name = $wp_author;
                                            } else {
                                                // Final fallback
                                                $author_name = 'Unknown Author';
                                                $author_avatar = get_avatar_url(0, array('size' => 40));
                                            }
                                        }
                                        ?>
                                        <img src="<?php echo esc_url($author_avatar); ?>"
                                            alt="<?php echo esc_attr($author_name); ?>" class="author-avatar">
                                        <p class="user-name"><?php echo esc_html($author_name); ?></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="date">
                                    <p class="date-text">
                                        <?php 
                                        // Get ACF published on title with fallback
                                        $blog_content = get_field('blog_body_content', get_the_ID());
                                        $acf_writer = isset($blog_content['writter']) ? $blog_content['writter'] : null;
                                        $published_title = isset($acf_writer['published_on_title']) ? $acf_writer['published_on_title'] : 'Published On';
                                        echo esc_html($published_title);
                                        ?>
                                    </p>
                                    <p class="post-date"><?php echo get_the_date('j F Y'); ?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php if (have_rows('blog_body_content')):  while (have_rows('blog_body_content')): the_row(); ?>
                <div class="blog-content">
                    <div class="img_wrapper">
                        <?php 
                                        $thumb_img = get_sub_field('thumbnail');
                                        if ($thumb_img): ?>
                        <img src="<?php echo esc_url($thumb_img['url']); ?>"
                            alt="<?php echo esc_attr($thumb_img['alt']); ?>" class="blog-featured-img">
                        <?php endif; ?>
                    </div>
                    <div class="blog-main-text">
                        <?php the_sub_field('middle_content') ?>
                    </div>
                </div>
                <?php endwhile; endif; ?>
            </div>
        </div>
    </section>

    <section class="moreblogs-section">
        <div class="container">
            <div class="moreblogs-wrapper">
                <h2 class="moreblogs-title"><?php the_field('more_blogs_section_title') ?></h2>

                <div class="moreblogs-content">
                    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-3 g-3 g-lg-3">
                        <?php
                        // Get related posts (excluding current post)
                        $current_post_id = get_the_ID();
                        $related_posts = new WP_Query(array(
                            'post_type' => 'post',
                            'posts_per_page' => 3,
                            'post__not_in' => array($current_post_id),
                            'orderby' => 'rand'
                        ));

                        if ($related_posts->have_posts()) :
                            while ($related_posts->have_posts()) : $related_posts->the_post();
                        ?>
                        <div class="col">
                            <div class="moreblogs-post">
                                <div class="moreblogs-bg-image">
                                    <?php 
                                    // Get ACF archive page info thumbnail
                                    $archive_info = get_field('archive_page_info', get_the_ID());
                                    $acf_thumbnail = isset($archive_info['thumbnail']) ? $archive_info['thumbnail'] : null;
                                    
                                    if ($acf_thumbnail && !empty($acf_thumbnail['url'])) {
                                        // Use ACF thumbnail
                                        echo '<img src="' . esc_url($acf_thumbnail['url']) . '" alt="' . esc_attr($acf_thumbnail['alt'] ?: get_the_title()) . '">';
                                    } else {
                                        // Fallback to default image
                                        echo '<img src="' . get_template_directory_uri() . '/assets/images/default-blog.jpg" alt="' . esc_attr(get_the_title()) . '">';
                                    }
                                    ?>
                                </div>
                                <div class="moreblogs-content">
                                    <h3 class="moreblogs-post-title">
                                        <a class="link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                    <p class="moreblogs-post-text">
                                        <?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?></p>
                                    <div class="moreblogs-meta">
                                        <div class="row">
                                            <div class="col-6 col-md-4">
                                                <div class="author">
                                                    <p class="author-text">
                                                        <?php 
                                                        // Get ACF writer title with fallback
                                                        $blog_content = get_field('blog_body_content', get_the_ID());
                                                        $acf_writer = isset($blog_content['writter']) ? $blog_content['writter'] : null;
                                                        $writer_title = isset($acf_writer['writer_title']) ? $acf_writer['writer_title'] : 'Written By';
                                                        echo esc_html($writer_title);
                                                        ?>
                                                    </p>
                                                    <div class="author-content">
                                                        <?php 
                                                        // First check ACF fields (priority)
                                                        $blog_content = get_field('blog_body_content', get_the_ID());
                                                        $acf_writer = isset($blog_content['writter']) ? $blog_content['writter'] : null;
                                                        
                                                        if ($acf_writer && !empty($acf_writer['user_name'])) {
                                                            // Use ACF writer data
                                                            $author_name = $acf_writer['user_name'];
                                                            if (!empty($acf_writer['profile_image'])) {
                                                                $author_avatar = $acf_writer['profile_image']['sizes']['thumbnail'];
                                                            } else {
                                                                $author_avatar = get_avatar_url(0, array('size' => 30)); // Default avatar
                                                            }
                                                        } else {
                                                            // Fallback to WordPress author
                                                            $wp_author = get_the_author();
                                                            $wp_author_id = get_the_author_meta('ID');
                                                            
                                                            if (!empty($wp_author) && $wp_author_id > 0) {
                                                                $author_avatar = get_avatar_url($wp_author_id, array('size' => 30));
                                                                $author_name = $wp_author;
                                                            } else {
                                                                // Final fallback
                                                                $author_name = 'Unknown Author';
                                                                $author_avatar = get_avatar_url(0, array('size' => 30));
                                                            }
                                                        }
                                                        ?>
                                                        <img src="<?php echo esc_url($author_avatar); ?>"
                                                            alt="<?php echo esc_attr($author_name); ?>"
                                                            class="author-avatar">
                                                        <p class="user-name"><?php echo esc_html($author_name); ?></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-4">
                                                <div class="date">
                                                    <p class="date-text">
                                                        <?php 
                                                        // Get ACF published on title with fallback
                                                        $blog_content = get_field('blog_body_content', get_the_ID());
                                                        $acf_writer = isset($blog_content['writter']) ? $blog_content['writter'] : null;
                                                        $published_title = isset($acf_writer['published_on_title']) ? $acf_writer['published_on_title'] : 'Published on';
                                                        echo esc_html($published_title);
                                                        ?>
                                                    </p>
                                                    <p class="date-published"><?php echo get_the_date('M j, Y'); ?></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php
                            endwhile;
                            wp_reset_postdata();
                        else :
                            // Fallback if no related posts found
                            echo '<div class="col-12"><p>No related posts found.</p></div>';
                        endif;
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>

<?php get_footer(); ?>