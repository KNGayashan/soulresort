<?php
/**
 * Enqueue scripts and styles.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 *
 * @package base_theme
 */

 //Enqueue theme styles
 function base_theme_style(){

    // Enqueue your main theme stylesheet
    wp_enqueue_style('theme-style', get_stylesheet_uri());

     wp_register_style('theme', get_template_directory_uri() . '/css/theme.css?v=2.4', array(), false, 'all');
     wp_enqueue_style('theme');

     wp_register_style('remixiconcdn', 'https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.min.css', array(), false, 'all');
     wp_enqueue_style('remixiconcdn');
     
     wp_register_style('owlCarouselcss', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css', array(), false, 'all');
     wp_enqueue_style('owlCarouselcss');

     // Plyr.js CSS for enhanced video player
     wp_register_style('plyr', 'https://cdnjs.cloudflare.com/ajax/libs/plyr/3.7.8/plyr.min.css', array(), false, 'all');
     wp_enqueue_style('plyr');

     // AOS (Animate On Scroll) CSS
     wp_register_style('aos', 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css', array(), '2.3.4', 'all');
     wp_enqueue_style('aos');

 }
 add_action('wp_enqueue_scripts','base_theme_style');

// Filter to add async loading for specific styles - start
function add_async_attribute_to_style($html, $handle) {
    $async_styles = ['remixiconcdn']; 

    if (in_array($handle, $async_styles)) {
        return str_replace("rel='stylesheet'", "rel='stylesheet' media='none' onload='if(media!=\"all\")media=\"all\"'", $html);
    }
    return $html;
}
add_filter('style_loader_tag', 'add_async_attribute_to_style', 10, 2);
// Filter to add async loading for specific styles - end

// Enqueue theme scripts
 function base_theme_scripts(){

    wp_enqueue_script('jquery');

     wp_register_script('theme', get_template_directory_uri() . '/js/theme.js?v=2.55','jquery',false,true);
     wp_enqueue_script('theme');

     wp_register_script('boostrapbundle', get_template_directory_uri() . '/js/bootstrap.bundle.min.js','jquery',false,true);
     wp_enqueue_script('boostrapbundle');

     wp_register_script('OwlCarousel2js', 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js','jquery',false,true);
     wp_enqueue_script('OwlCarousel2js');

     wp_register_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/gsap.min.js','jquery',false,true);
     wp_enqueue_script('gsap');

     wp_register_script('ScrollTrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/ScrollTrigger.min.js','jquery',false,true);
     wp_enqueue_script('ScrollTrigger');
     
     wp_register_script('ScrollToPlugin', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/ScrollToPlugin.min.js','jquery',false,true);
     wp_enqueue_script('ScrollToPlugin');

     // Plyr.js for enhanced video player with autoplay handling
     wp_register_script('plyr', 'https://cdnjs.cloudflare.com/ajax/libs/plyr/3.7.8/plyr.min.js','jquery',false,true);
     wp_enqueue_script('plyr');

     // AOS (Animate On Scroll) JavaScript
     wp_register_script('aos', 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js', array(), '2.3.4', true);
     wp_enqueue_script('aos');

     // Enqueue theme JavaScript
     wp_enqueue_script(
         'meshaun-theme-js',
         get_template_directory_uri() . '/js/theme.js',
         array('jquery', 'bootstrap-js'),
         		'1.0.42', // Added GSAP ScrollTrigger animations for all template pages
         true
     );
 }
 add_action('wp_enqueue_scripts', 'base_theme_scripts');