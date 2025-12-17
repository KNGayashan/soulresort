<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package base_theme
 */
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="preload" href="<?php echo get_template_directory_uri(); ?>/assets/fonts/AdeDisplay.woff2" as="font"
        type="font/woff2" crossorigin>
    <title>
        <?php wp_title( '-', true, 'right' ); ?>
    </title>
    <?php wp_head(); ?>

</head>

<body class="">

    <div id="page" class="site-main d-flex flex-column min-vh-100">
        <header class="main-header dark_header_nomark">
            <nav class="navbar navbar-expand-lg fixed-top main-navigation dark header-animate" id="navigation-scroll">
                <div class="container container-nav">

                    <!-- Site Logo for Mobile -->
                    <a class="navbar-brand d-block d-lg-none" href="<?php echo esc_url( home_url( '/' ) ); ?>"
                        rel="home">
                        <?php if ( has_custom_logo() ) : ?>
                        <?php 
                            $custom_logo_id = get_theme_mod( 'custom_logo' );
                            $logo = wp_get_attachment_image_src( $custom_logo_id, 'full' );
                            if ( $logo ) : ?>
                        <img src="<?php echo esc_url( $logo[0] ); ?>"
                            alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" class="custom-logo">
                        <?php endif; ?>
                        <?php else : ?>
                        <span class="site-title"><?php bloginfo( 'name' ); ?></span>
                        <?php endif; ?>
                    </a>
                    <!-- Offcanvas toggle button -->
                    <button class="navbar-toggler menu-button border-0" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#mobileMenu" aria-controls="mobileMenu">
                        <span class="navbar-toggler-icon">
                        </span>
                    </button>

                    <!-- Offcanvas menu -->
                    <div class="offcanvas offcanvas-end offcanva_wrap" tabindex="-1" id="mobileMenu">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title">
                                <a class="mb-logo-wrap" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                                    <?php if ( has_custom_logo() ) : ?>
                                    <?php the_custom_logo(); ?>
                                    <?php else : ?>
                                    <span class="site-title"><?php bloginfo( 'name' ); ?></span>
                                    <?php endif; ?>
                                </a>
                            </h5>
                            <button type="button" class="btn-close text-reset offcanvas-close-btn"
                                data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body me-auto mx-md-auto navigation-wrapper">
                            <!-- The WordPress Menu goes here -->
                            <?php wp_nav_menu(array(
    						'theme_location'  => 'primary',
							'container'       => 'main-header',
    						'container_class' => 'navbar w-100 justify-content-center',
    						'container_id'    => 'navbarSupportedContent',
    						'menu_class'      => 'navbar-nav left-menu',
    						'fallback_cb'     => '',
							'depth'           => 2, // 1 = no dropdowns, 2 = with dropdowns.
    						'walker'          => new WP_Bootstrap_Navwalker(),
							));?>
                            <a class="logo-wrap d-none d-md-block middle_logo"
                                href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                                <?php if ( has_custom_logo() ) : ?>
                                <?php 
                                $custom_logo_id = get_theme_mod( 'custom_logo' );
                                $logo = wp_get_attachment_image_src( $custom_logo_id, 'full' );
                                if ( $logo ) : ?>
                                <img src="<?php echo esc_url( $logo[0] ); ?>"
                                    alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" class="custom-logo">
                                <?php endif; ?>
                                <?php else : ?>
                                <span class="site-title"><?php bloginfo( 'name' ); ?></span>
                                <?php endif; ?>
                            </a>
                            <!-- Secondary Menu -->
                            <?php wp_nav_menu(array(
    						'theme_location'  => 'secondary',
							'container'       => 'main-header',
    						'container_class' => 'navbar w-100 justify-content-center',
    						'container_id'    => 'navbarSupportedContent',
    						'menu_class'      => 'navbar-nav right-menu',
    						'fallback_cb'     => '',
							'depth'           => 2, // 1 = no dropdowns, 2 = with dropdowns.
    						'walker'          => new WP_Bootstrap_Navwalker(),
							));?>
                        </div>

                    </div>


                </div>
            </nav>



        </header>

        <script>
        document.addEventListener('DOMContentLoaded', function() {
            const header = document.querySelector('.header-animate');
            if (!header) return;

            let lastScrollTop = 0;
            let isAnimating = false;
            let animationTimeout = null;

            function animateHeader() {
                if (isAnimating) return;

                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollDifference = Math.abs(scrollTop - lastScrollTop);
                
                // Only animate if there's significant scroll movement (prevents micro-movements)
                if (scrollDifference < 5) {
                    lastScrollTop = scrollTop;
                    return;
                }

                const isScrollingUp = scrollTop < lastScrollTop;
                const isAtTop = scrollTop <= 10;

                // Clear any existing timeout
                if (animationTimeout) {
                    clearTimeout(animationTimeout);
                }

                if (isAtTop) {
                    // At top - reset all states immediately
                    header.classList.remove('header-coming-up', 'header-going-down', 'header-visible');
                    header.style.backdropFilter = 'blur(0px)';
                    header.style.webkitBackdropFilter = 'blur(0px)';
                } else if (isScrollingUp && scrollTop > 100) {
                    // Header coming up - ensure it starts hidden then animates up
                    header.classList.remove('header-going-down', 'header-visible');
                    
                    // Set initial hidden state for smooth animation
                    header.style.transform = 'translateY(-100%)';
                    header.style.opacity = '0';
                    
                    // Add blur effect
                    header.style.backdropFilter = 'blur(20px)';
                    header.style.webkitBackdropFilter = 'blur(20px)';

                    // Trigger smooth slide-up animation
                    animationTimeout = setTimeout(() => {
                        header.classList.add('header-coming-up');
                        // Reset inline styles to let CSS animation take over
                        header.style.transform = '';
                        header.style.opacity = '';
                    }, 10);

                } else if (scrollTop > 100) {
                    // Header going down
                    header.classList.remove('header-coming-up', 'header-visible');
                    header.classList.add('header-going-down');

                    // Remove blur effect
                    header.style.backdropFilter = 'blur(0px)';
                    header.style.webkitBackdropFilter = 'blur(0px)';
                }

                lastScrollTop = scrollTop;
            }

            // Throttle scroll events for better performance
            let ticking = false;

            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        animateHeader();
                        ticking = false;
                    });
                    ticking = true;
                }
            }

            window.addEventListener('scroll', requestTick, {
                passive: true
            });

            // Initialize header animation
            animateHeader();
            initHeaderAnimation();
        });

        // Initial load animation function
        function initHeaderAnimation() {
            const header = document.querySelector('.header-animate');
            if (header) {
                header.classList.add('header-initial-load');

                // Add entrance animation
                setTimeout(() => {
                    header.classList.add('header-entrance');
                }, 100);

                // Remove initial classes after animation
                setTimeout(() => {
                    header.classList.remove('header-initial-load', 'header-entrance');
                }, 2000);
            }
        }
        </script>