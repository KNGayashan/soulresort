<?php
/**
 * base_theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package base_theme
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}


/**
 * Include Enqueue.
 */
require get_template_directory() . '/inc/enqueue.php'; //Enqueue scripts and styles.

/**
 * Include Widgets.
 */
require get_template_directory() . '/inc/widgets.php'; //Register widget area.

/**
 * Include Shortcode
 */
require get_template_directory() . '/inc/shortcode.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Extra func.
 */
require get_template_directory() . '/inc/extra-func.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}