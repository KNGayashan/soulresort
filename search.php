<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package base_theme
 */

get_header();

$search_query = get_search_query();
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
$posts_per_page = 10; // Make sure this matches 'posts_per_page' in the WP_Query args

$args = array(
    's' => $search_query,
    'post_type' => 'any', // Search all post types
    'posts_per_page' => $posts_per_page,
    'paged' => $paged
);

$search_results = new WP_Query($args);

// Calculate the starting number for the ordered list
$start_number = ($paged - 1) * $posts_per_page + 1;
?>

<div class="page-content search_page_template">
    <main>
        <!-- Hero section -->
        <section class="hero">
            <div class="single-item">
                <div class="container">
                    <div class="content-wrap">
                        <h1 class="title">
                            <?php printf( esc_html__( 'Search Results for: %s', 'base_theme' ), '<span>' . $search_query . '</span>' ); ?>
                        </h1>
                        <!-- Add search form at the top -->
                        <div class="search_form_top">
                            <?php get_search_form(); ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="container">
            <div class="body_content_wrapper">

                <?php if ($search_results->have_posts()) : ?>
                <div class="search-result-count">
                    <?php printf( esc_html__( 'Found %d results', 'base_theme' ), $search_results->found_posts ); ?>
                </div>

                <ol class="search-results-list" start="<?php echo $start_number; ?>">
                    <?php while ($search_results->have_posts()) : $search_results->the_post(); ?>
                    <li class="search-result-item">
                        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                            <h4 class="entry-title">
                                <?php
                                $permalink = get_permalink();
                                $is_external = false;
                                $post_type = get_post_type();

                                if ($post_type === 'knowledge_bank') {
                                    $action_type = get_field('action_type');
                                    if ($action_type && isset($action_type['actions'])) {
                                        foreach ($action_type['actions'] as $action) {
                                            if ($action['acf_fc_layout'] === 'external_source' && !empty($action['button_link'])) {
                                                $permalink = $action['button_link'];
                                                $is_external = true;
                                                break;
                                            }
                                        }
                                    }
                                } elseif ($post_type === 'research-and-tool') {
                                    $external_link = get_field('external_link');
                                    if ($external_link && !empty($external_link['button_link'])) {
                                        $permalink = $external_link['button_link'];
                                        $is_external = true;
                                    }
                                }

                                $target = $is_external ? ' target="_blank" rel="noopener noreferrer"' : '';
                                ?>
                                <a href="<?php echo esc_url($permalink); ?>" rel="bookmark"
                                    <?php echo $target; ?>><?php the_title(); ?></a>
                            </h4>
                            <div class="excerpt_wrapper">
                                <?php
                                    $excerpt = get_the_excerpt();
                                    $words = explode(' ', $excerpt);
                                    if (count($words) > 20) { ?>
                                <p class="excerpt">
                                    <?php
                                    echo implode(' ', array_slice($words, 0, 20)) . '...';
                                    ?>
                                </p>
                                <?php
                                } else { ?> <p class="excerpt"> <?php echo $excerpt; ?></p><?php } ?>
                            </div>
                            <div class="entry-meta">
                                <h6 class="post-type">
                                    <?php
                                    $post_type_obj = get_post_type_object($post_type);

                                    if ($post_type_obj->labels->name === 'Posts') {
                                        echo 'Blog';
                                    } else {
                                        echo esc_html($post_type_obj->labels->name);
                                    }
                                    ?>
                                </h6>
                                <h6 class="posted-on"><?php echo get_the_date(); ?></h6>
                                <?php if ($post_type === 'post') : ?>
                                <span class="author d-none"><?php the_author(); ?></span>
                                <?php endif; ?>
                            </div>
                        </article>
                    </li>
                    <?php endwhile; ?>
                </ol>

                <?php
                the_posts_pagination(array(
                    'mid_size' => 2,
                    'prev_text' => __('Previous', 'base_theme'),
                    'next_text' => __('Next', 'base_theme'),
                ));
                ?>

                <?php else : ?>
                <p class="no-results">
                    <?php esc_html_e('Sorry, no results found. Please try a different search.', 'base_theme'); ?></p>
                <?php endif; ?>

                <?php wp_reset_postdata(); ?>
            </div>
        </div>
    </main>
</div>

<?php get_footer(); ?>