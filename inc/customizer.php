<?php
/**
 * base_theme Theme Customizer
 *
 * @package base_theme
 */

//Theme Options

// Set up the WordPress Theme logo feature.
 add_theme_support( 'custom-logo' );

// Add support for responsive embedded content.
add_theme_support( 'responsive-embeds' );

//Enable support for Post Thumbnails on posts and pages.
add_theme_support( 'post-thumbnails' );

//Enable Menu
add_theme_support( 'menus' );

//Enable Tag
add_theme_support( 'title-tag' );

// Enable HTML5 markup for search form, comment form, and comments
add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));

// Enable support for post formats (e.g., video, audio)
add_theme_support('post-formats', array('video', 'audio'));

// Add excerpts to pages
add_post_type_support('page', 'excerpt');

// Enable automatic feed links (RSS)
add_theme_support('automatic-feed-links');

// Enable selective refresh for widgets in the customizer
add_theme_support('customize-selective-refresh-widgets');

// Enable support for wide and full-width alignment for blocks
// add_theme_support('align-wide');


//login page Styles
function enqueue_custom_login_styles() {
    wp_enqueue_style('custom-login-styles', get_template_directory_uri() . '/css/login-styles.css', array(), '1.0', 'all');
}
add_action('login_enqueue_scripts', 'enqueue_custom_login_styles');

// remove default editor
// add_filter( 'use_block_editor_for_post', '__return_false' );

function my_acf_format_date_field($value, $post_id, $field) {
    // Check if the value is empty or a default value
    if (empty($value) || $value === 'default_value') {
        return '';
    }
    return $value;
}
add_filter('acf/format_value/name=your_date_field_name', 'my_acf_format_date_field', 10, 3);


//Prevent self-pingbacks from your own site.
function disable_self_pingbacks($links) {
    foreach ($links as $l => $link)
        if (0 === strpos($link, get_option('home')))
            unset($links[$l]);
    return $links;
}
add_action('pre_ping', 'disable_self_pingbacks');

//Remove WordPress Version from Head: Enhance security
function remove_wp_version() {
    return '';
}
add_filter('the_generator', 'remove_wp_version');

// Remove WordPress Version from Dashboard Footer
function remove_wp_version_from_footer() {
    remove_filter('update_footer', 'core_update_footer');
}
add_action('admin_menu', 'remove_wp_version_from_footer');


//Add Custom Dashboard Footer Text:
function custom_dashboard_footer() {
    echo 'All Rights Reserved. Developed by SAVINDU THATHSARA </a>';
}
add_filter('admin_footer_text', 'custom_dashboard_footer');

// Add WP admin background image
function add_wp_admin_background_image( $wp_customize ) {
    $wp_customize->add_section( 'your_theme_login_background', array(
        'title'          => __( 'Login Background', 'your-theme-text-domain' ),
        'priority'       => 30,
        'capability'     => 'edit_theme_options',
    ));

    $wp_customize->add_setting( 'your_theme_login_background_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));

    $wp_customize->add_control(
        new WP_Customize_Image_Control(
            $wp_customize,
            'your_theme_login_background_image',
            array(
                'label'       => __( 'Login Background Image', 'your-theme-text-domain' ),
                'section'     => 'your_theme_login_background',
                'settings'    => 'your_theme_login_background_image',
            )
        )
    );
}
add_action( 'customize_register', 'add_wp_admin_background_image' );

function theme_login_background() {
    $login_background_image = get_theme_mod( 'your_theme_login_background_image' );
    if ( $login_background_image ) {
        ?>
<style type="text/css">
body.login {
    background-image: url('<?php echo esc_url( $login_background_image ); ?>');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
    position: sticky;
}
</style>
<?php
    }
}
add_action( 'login_head', 'theme_login_background' );
// End wp admin background image add


//acf option page
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> 'Theme Options',
		'menu_title'	=> 'Theme Options',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
        'icon_url' =>   'dashicons-admin-generic',
		'position'      => 3,
		'redirect'		=> true
	));
	
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Header Settings',
		'menu_title'	=> 'Header',
		'parent_slug'	=> 'theme-general-settings',
	));
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Footer Settings',
		'menu_title'	=> 'Footer',
		'parent_slug'	=> 'theme-general-settings',
	));
}

// disable wordpress default image sizing
function disable_image_sizes($sizes) {
    unset($sizes['medium']);
    unset($sizes['large']);
    unset($sizes['medium_large']);
    unset($sizes['1536x1536']);
    unset($sizes['2048x2048']);
    return $sizes;
}
add_filter('intermediate_image_sizes_advanced', 'disable_image_sizes');

add_filter('big_image_size_threshold', '__return_false');


/**
 * Filters wp_title to print a neat <title> tag based on what is being viewed.
 *
 * @param string $title Default title text for current view.
 * @param string $sep   Optional separator.
 * @return string The filtered title.
 */
function theme_title( $title, $sep ) {
    if ( is_feed() ) {
        return $title;
    }
     
    global $page, $paged;
 
    // Add the blog name
    $title .= get_bloginfo( 'name', 'display' );
 
    // Add the blog description for the home/front page.
    $site_description = get_bloginfo( 'description', 'display' );
    if ( $site_description && ( is_home() || is_front_page() ) ) {
        $title .= " $sep $site_description";
    }
 
    // Add a page number if necessary:
    if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
        $title .= " $sep " . sprintf( __( 'Page %s', '_s' ), max( $paged, $page ) );
    }
    return $title;
}
add_filter( 'wp_title', 'theme_title', 10, 2 );


/**
* Register Custom Navigation Walker
**/
function register_navwalker(){
	require_once get_template_directory() . '/inc/class-wp-bootstrap-navwalker.php';
}
add_action( 'after_setup_theme', 'register_navwalker' );

add_filter( 'nav_menu_link_attributes', 'prefix_bs5_dropdown_data_attribute', 20, 3 );
/**
 * Use namespaced data attribute for Bootstrap's dropdown toggles.
 *
 * @param array    $atts HTML attributes applied to the item's `<a>` element.
 * @param WP_Post  $item The current menu item.
 * @param stdClass $args An object of wp_nav_menu() arguments.
 * @return array
 */
function prefix_bs5_dropdown_data_attribute( $atts, $item, $args ) {
    if ( is_a( $args->walker, 'WP_Bootstrap_Navwalker' ) ) {
        if ( array_key_exists( 'data-toggle', $atts ) ) {
            unset( $atts['data-toggle'] );
            $atts['data-bs-toggle'] = 'dropdown';
        }
    }
    return $atts;
}


// Add Menu locations
register_nav_menus( array(
    'primary' => __( 'Primary Menu', 'base_theme'),
    'secondary' => __( 'Secondary Menu', 'base_theme'),
    'footer' => __( 'Footer Primary Menu', 'base_theme'),
    'third' => __( 'Footer Secondary Menu', 'base_theme'),
) );

// Change Login logo Icon
function my_login_logo() {
    $custom_logo_id = get_theme_mod('custom_logo');
    $logo = wp_get_attachment_image_src($custom_logo_id, 'full');

    if ($logo) {
        $logo_url = esc_url($logo[0]);
    } else {
        // If no logo is set, you can provide a default URL here
        $logo_url = get_stylesheet_directory_uri() . '/assets/images/default-logo.png';
    }
    ?>
<style type="text/css">
#login h1 a,
.login h1 a {
    background-image: url(<?php echo $logo_url; ?>);
    height: 52px;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
}
</style>
<?php
}
add_action( 'login_enqueue_scripts', 'my_login_logo' );

// Remove default block libry css
function remove_block_library_css(){
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-block-style' );
}
add_action( 'wp_enqueue_scripts', 'remove_block_library_css', 100 );

// ACF Image placeholder field enable start
function add_default_value_to_image_field($field) {
	acf_render_field_setting( $field, array(
		'label'			=> 'Default Image',
		'instructions'		=> 'Appears when creating a new post',
		'type'			=> 'image',
		'name'			=> 'default_value',
	));
}

add_action('acf/render_field_settings/type=image', 'add_default_value_to_image_field');
add_filter( 'wpcf7_validate_configuration', '__return_false' );
// ACF Image placeholder field enable end

// Ajax Request
// Add searchbox function
function enqueue_custom_scripts() {
    wp_enqueue_script('theme', get_template_directory_uri() . '/theme.js', array('jquery'), '1.0', true);
  
    // Localize script with Ajax URL
    wp_localize_script('theme', 'mytheme_ajax_object', array('ajaxurl' => admin_url('admin-ajax.php')));
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

// AJAX Tour Package Filter Handler
function ajax_filter_tour_packages() {
    // Verify nonce for security
    if (!wp_verify_nonce($_POST['nonce'], 'tour_filter_nonce')) {
        wp_die('Security check failed');
    }

    $taxonomy_slug = sanitize_text_field($_POST['taxonomy']);
    $paged = intval($_POST['page']);
    $posts_per_page = intval($_POST['posts_per_page']) ?: 8;

    // Build query arguments
    $args = array(
        'post_type' => 'package',
        'post_status' => 'publish',
        'posts_per_page' => $posts_per_page,
        'paged' => $paged,
    );

    // Add taxonomy filter if not "all"
    if ($taxonomy_slug && $taxonomy_slug !== 'all') {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'package',
                'field'    => 'slug',
                'terms'    => $taxonomy_slug,
            ),
        );
    }

    $query = new WP_Query($args);
    
    $response = array();

    if ($query->have_posts()) {
        ob_start();
        
        while ($query->have_posts()) {
            $query->the_post();
            
            // Get location data for the map from ACF group field
            $latitude = '7.8731';  // Default to Sri Lanka center
            $longitude = '80.7718'; // Default to Sri Lanka center
            $location_name = get_the_title(); // Default to post title
            
            // Check if map_details group exists and has data
            if (have_rows('map_details')) {
                while (have_rows('map_details')) {
                    the_row();
                    $lat_field = get_sub_field('latitude');
                    $lng_field = get_sub_field('longitude');
                    
                    // Only use ACF values if they're not empty
                    if (!empty($lat_field)) {
                        $latitude = $lat_field;
                    }
                    if (!empty($lng_field)) {
                        $longitude = $lng_field;
                    }
                }
            }
            
            // Get ACF fields for modal content
            $inner_title = get_field('inner_title') ?: get_the_title();
            $inner_description = get_field('inner_page_top_description') ?: '';
            $inner_bottom_description = get_field('inner_page_bottom_description') ?: '';
            $side_image = get_field('side_image');
            $side_image_url = !empty($side_image) ? $side_image['url'] : '';
            $side_image_alt = !empty($side_image) ? $side_image['alt'] : '';
            
            // Get background pattern image for modal
            $background_pattern = get_field('background_image_pattern');
            $background_pattern_url = !empty($background_pattern) ? $background_pattern['url'] : '';
            $background_pattern_alt = !empty($background_pattern) ? $background_pattern['alt'] : '';
            ?>
<div class="col">
    <?php 
    // Debug output (remove this after testing)
    echo "<!-- Debug: Post ID: " . get_the_ID() . ", Lat: $latitude, Lng: $longitude -->";
    ?>
    <div class="card h-100 package-card single_item" data-post-id="<?php echo get_the_ID(); ?>"
        data-post-title="<?php echo esc_attr(get_the_title()); ?>"
        data-inner-title="<?php echo esc_attr($inner_title); ?>"
        data-inner-description="<?php echo esc_attr(strip_tags($inner_description)); ?>"
        data-inner-bottom-description="<?php echo esc_attr(strip_tags($inner_bottom_description)); ?>"
        data-side-image-url="<?php echo esc_attr($side_image_url); ?>"
        data-side-image-alt="<?php echo esc_attr($side_image_alt); ?>"
        data-background-pattern-url="<?php echo esc_attr($background_pattern_url); ?>"
        data-background-pattern-alt="<?php echo esc_attr($background_pattern_alt); ?>"
        data-latitude="<?php echo esc_attr($latitude); ?>" data-longitude="<?php echo esc_attr($longitude); ?>"
        data-location-name="<?php echo esc_attr($location_name); ?>" style="cursor: pointer;">
        <?php while (have_rows('archive_page_details')): the_row(); ?>
        <div class="img_wrapper">
            <?php $packagesImg = get_sub_field('thumbnail'); if (!empty($packagesImg)): ?>
            <img class="img-fluid image" width="424" height="271" src="<?php echo esc_url($packagesImg['url']); ?>"
                alt="<?php echo esc_attr($packagesImg['alt']); ?>" decoding="async" role="img"
                aria-label="<?php echo esc_attr($packagesImg['alt']); ?>">
            <?php endif; ?>
        </div>
        <?php endwhile; ?>
        <div class="card-body">
            <div class="inner_content">
                <h6 class="category_name">
                    <?php 
                                $terms = get_the_terms(get_the_ID(), 'package');
                                if ($terms && !is_wp_error($terms)) {
                                    echo esc_html($terms[0]->name);
                                }
                                ?>
                </h6>
                <h5 class="name"><?php the_title(); ?></h5>
                <?php while (have_rows('archive_page_details')): the_row(); ?>
                <div class="description">
                    <?php the_sub_field('description'); ?>
                </div>
                <?php endwhile; ?>
            </div>
            <div class="starts_wrapper">
                <?php 
                // Get rating from ACF group field
                $package_rating = 5; // Default rating
                $reviews_text = ''; // Default reviews text
                
                // Get rating group field
                $rating_group = get_field('rating');
                if ($rating_group && !empty($rating_group['start_count'])) {
                    $package_rating = intval($rating_group['start_count']);
                    $reviews_text = isset($rating_group['reviews_text']) ? $rating_group['reviews_text'] : '';
                }
                
                // Ensure rating is between 1 and 5
                $package_rating = max(1, min(5, $package_rating));
                ?>

                <div class="stars_container">
                    <?php
                    // Display stars
                    for ($i = 1; $i <= 5; $i++): ?>
                    <span class="star <?php echo ($i <= $package_rating) ? 'filled' : 'empty'; ?>"></span>
                    <?php endfor; ?>
                </div>

                <?php if (!empty($reviews_text)): ?>
                <span class="reviews_text"><?php echo esc_html($reviews_text); ?></span>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
<?php
        }
        
        $response['html'] = ob_get_clean();
        $response['found_posts'] = $query->found_posts;
        $response['max_pages'] = $query->max_num_pages;
        $response['current_page'] = $paged;
        
        // Generate pagination HTML
        if ($query->max_num_pages > 1) {
            ob_start();
            ?>
<div class="pagination_inner_wrap">
    <?php if ($paged > 1): ?>
    <a href="#" class="pagination_link" data-page="<?php echo ($paged - 1); ?>">Previous</a>
    <?php endif; ?>

    <?php for ($i = 1; $i <= $query->max_num_pages; $i++): ?>
    <?php if ($i == $paged): ?>
    <span class="current"><?php echo $i; ?></span>
    <?php else: ?>
    <a href="#" class="pagination_link <?php echo $i; ?>" data-page="<?php echo $i; ?>"><?php echo $i; ?>.</a>
    <?php endif; ?>
    <?php endfor; ?>

    <?php if ($paged < $query->max_num_pages): ?>
    <a href="#" class="pagination_link next_btn" data-page="<?php echo ($paged + 1); ?>">Next</a>
    <?php endif; ?>
</div>
<?php
            $response['pagination'] = ob_get_clean();
        } else {
            $response['pagination'] = '';
        }
        
    } else {
        $response['html'] = '<div class="col-12"><div class="no-packages-found"><p>No packages found.</p></div></div>';
        $response['pagination'] = '';
        $response['found_posts'] = 0;
        $response['max_pages'] = 0;
    }

    wp_reset_postdata();
    
    wp_send_json_success($response);
}

// Register AJAX handlers
add_action('wp_ajax_filter_tour_packages', 'ajax_filter_tour_packages');
add_action('wp_ajax_nopriv_filter_tour_packages', 'ajax_filter_tour_packages');

// Function to get package taxonomy terms for dropdown
function get_package_taxonomy_terms() {
    $terms = get_terms(array(
        'taxonomy' => 'package',
        'hide_empty' => true,
    ));
    
    if (!is_wp_error($terms) && !empty($terms)) {
        return $terms;
    }
    
    return array();
}

//  iframe google map Wysiwyg Editor
function allow_iframe_in_wysiwyg($allowedposttags){
    $allowedposttags['iframe'] = array(
        'src'             => true,
        'height'          => true,
        'width'           => true,
        'frameborder'     => true,
        'allowfullscreen' => true,
        'loading'         => true,
        'referrerpolicy'  => true,
    );
    return $allowedposttags;
}
add_filter('wp_kses_allowed_html', 'allow_iframe_in_wysiwyg', 10, 1);
//  iframe google map Wysiwyg Editor

//  Destinations slug
function register_destination_post_type() {
    register_post_type('destination', [
        'labels' => [
            'name' => __('Destinations'),
            'singular_name' => __('Destination')
        ],
        'public' => true,
        'has_archive' => false, // set true if you want /destinations/sri-lanka/
        'rewrite' => [
            'slug' => 'destinations/sri-lanka', // this creates the desired URL structure
            'with_front' => false
        ],
        'supports' => ['title', 'editor', 'thumbnail'],
        'menu_position' => 5,
        'show_in_rest' => true,
    ]);
}
add_action('init', 'register_destination_post_type');
//  Destinations slug

// Tours slug
function register_tour_post_type() {
    register_post_type('tour', [
        'labels' => [
            'name' => __('Tours'),
            'singular_name' => __('Tour')
        ],
        'public' => true,
        'has_archive' => false, // enables /tour/ archive page
        'rewrite' => [
            'slug' => 'tour', // ensures /tour/slug works
            'with_front' => false
        ],
        'supports' => ['title', 'editor', 'thumbnail'],
        'menu_position' => 6,
        'show_in_rest' => true,
    ]);
}
add_action('init', 'register_tour_post_type');

