<?php 
/** 
* Template Name: Blogs Template
*
* @package base_theme
**/ 
get_header('dark');
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<div class="page-content blog-template">

    <section class="popular-section">
        <div class="container">
            <div class="popular-wrapper">
                <h2 class="popular-title">
                    <?php 
                    // Get ACF hero section title with fallback
                    $hero_section = get_field('hero_section');
                    $page_title = isset($hero_section['page_title']) ? $hero_section['page_title'] : 'Popular Blogs';
                    echo esc_html($page_title);
                    ?>
                </h2>
                <div class="row">
                    <div class="col-12 col-md-8">
                        <div class="popular-right">
                            <?php
                            // Get the most recent post for hero section
                            $hero_post = new WP_Query(array(
                                'post_type' => 'post',
                                'posts_per_page' => 1,
                                'orderby' => 'date',
                                'order' => 'DESC'
                            ));

                            if ($hero_post->have_posts()) :
                                while ($hero_post->have_posts()) : $hero_post->the_post();
                            ?>
                            <div class="hero-main-post">
                                <div class="hero-bg-image">
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
                                <div class="hero-overlay"></div>
                                <div class="hero-content">
                                    <h3 class="hero-title">
                                        <a class="link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                    <div class="hero-meta">
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
                                                        // ACF author fallback system
                                                        $blog_content = get_field('blog_body_content', get_the_ID());
                                                        $acf_writer = isset($blog_content['writter']) ? $blog_content['writter'] : null;
                                                        
                                                        if ($acf_writer && !empty($acf_writer['user_name'])) {
                                                            // Use ACF writer data
                                                            $author_name = $acf_writer['user_name'];
                                                            if (!empty($acf_writer['profile_image'])) {
                                                                $author_avatar = $acf_writer['profile_image']['sizes']['thumbnail'];
                                                            } else {
                                                                $author_avatar = get_avatar_url(0, array('size' => 40));
                                                            }
                                                        } else {
                                                            // Fallback to WordPress author
                                                            $wp_author = get_the_author();
                                                            $wp_author_id = get_the_author_meta('ID');
                                                            
                                                            if (!empty($wp_author) && $wp_author_id > 0) {
                                                                $author_avatar = get_avatar_url($wp_author_id, array('size' => 40));
                                                                $author_name = $wp_author;
                                                            } else {
                                                                $author_name = 'Unknown Author';
                                                                $author_avatar = get_avatar_url(0, array('size' => 40));
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
                            <?php
                                endwhile;
                                wp_reset_postdata();
                            endif;
                            ?>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="popular-left">
                            <?php
                            // Get 2 recent posts for side posts
                            $side_posts = new WP_Query(array(
                                'post_type' => 'post',
                                'posts_per_page' => 2,
                                'orderby' => 'date',
                                'order' => 'DESC',
                                'offset' => 1 // Skip the first post (already used in hero)
                            ));

                            if ($side_posts->have_posts()) :
                                while ($side_posts->have_posts()) : $side_posts->the_post();
                            ?>
                            <div class="side-post">
                                <div class="side-post-image">
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
                                <div class="side-post-content">
                                    <h4 class="side-post-title">
                                        <a class="link" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h4>
                                    <p class="side-post-excerpt">
                                        <?php echo wp_trim_words(get_the_excerpt(), 15, '...'); ?></p>
                                </div>
                            </div>
                            <?php
                                endwhile;
                                wp_reset_postdata();
                            endif;
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="featured-section">
        <div class="container">
            <div class="featured-wrapper">
                <h2 class="featured-title">
                    <?php 
                    // Get ACF featured blogs title with fallback
                    $featured_blogs = get_field('featured_blogs');
                    $featured_title = isset($featured_blogs['featured_title']) ? $featured_blogs['featured_title'] : 'Featured Blog Posts';
                    echo esc_html($featured_title);
                    ?>
                </h2>
                <p class="featured-text">
                    <?php 
                    // Get ACF featured blogs description with fallback
                    $featured_blogs = get_field('featured_blogs');
                    $featured_description = isset($featured_blogs['featured_description']) ? $featured_blogs['featured_description'] : 'Discover our latest insights on wellness, Ayurveda, and holistic living. Explore articles written by our expert team and guest contributors.';
                    echo esc_html($featured_description);
                    ?>
                </p>

                <div class="featured-content">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 g-lg-3">
                        <?php
                        // Get featured blog posts (excluding the 3 already shown in hero and side posts)
                        $featured_posts = new WP_Query(array(
                            'post_type' => 'post',
                            'posts_per_page' => 6,
                            'orderby' => 'date',
                            'order' => 'DESC',
                            'offset' => 3 // Skip the first 3 posts (hero + 2 side posts)
                        ));

                        if ($featured_posts->have_posts()) :
                            while ($featured_posts->have_posts()) : $featured_posts->the_post();
                        ?>
                        <div class="col">
                            <div class="featured-post">
                                <div class="featured-bg-image">
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
                                <div class="featured-overlay"></div>
                                <div class="featured-content">
                                    <h3 class="featured-post-title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h3>
                                    <p class="featured-post-text">
                                        <?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?></p>
                                    <div class="featured-meta">
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
                                                        // ACF author fallback system
                                                        $blog_content = get_field('blog_body_content', get_the_ID());
                                                        $acf_writer = isset($blog_content['writter']) ? $blog_content['writter'] : null;
                                                        
                                                        if ($acf_writer && !empty($acf_writer['user_name'])) {
                                                            // Use ACF writer data
                                                            $author_name = $acf_writer['user_name'];
                                                            if (!empty($acf_writer['profile_image'])) {
                                                                $author_avatar = $acf_writer['profile_image']['sizes']['thumbnail'];
                                                            } else {
                                                                $author_avatar = get_avatar_url(0, array('size' => 30));
                                                            }
                                                        } else {
                                                            // Fallback to WordPress author
                                                            $wp_author = get_the_author();
                                                            $wp_author_id = get_the_author_meta('ID');
                                                            
                                                            if (!empty($wp_author) && $wp_author_id > 0) {
                                                                $author_avatar = get_avatar_url($wp_author_id, array('size' => 30));
                                                                $author_name = $wp_author;
                                                            } else {
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
                            // Fallback if no posts found
                            echo '<div class="col-12"><p>No blog posts found.</p></div>';
                        endif;
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </section>


</div>

<?php
get_footer();
?>