<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 * 
 * @package base_theme
 */
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<footer class="footer mt-auto">
    <div class="container">
        <div class="section-title">
            <h2 class="title"><?php the_field('get_in_touch_title', 'option') ?></h2>
        </div>
        <div class="row main-row">
            <div class="col-12 col-md-6 col-lg-4 order-2 order-md-1">
                <?php if (have_rows('stay_tuned_column', 'option')):  while (have_rows('stay_tuned_column', 'option')): the_row(); ?>
                <div class="left-col pt-4 pt-md-0">
                    <h5 class="title">
                        <?php the_sub_field('title', 'option') ?>
                    </h5>
                    <p class="description">
                        <?php the_sub_field('description', 'option') ?>
                    </p>
                    <div class="button">
                        <a class="btn footer-btn"
                            href="<?php the_sub_field('action_link', 'option') ?>"><?php the_sub_field('action_name', 'option') ?>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l14 0" />
                                <path d="M15 16l4 -4" />
                                <path d="M15 8l4 4" />
                            </svg>
                        </a>
                    </div>
                </div>
                <?php endwhile; endif; ?>
            </div>
            <div class="col-12 col-md-6 col-lg-8 order-1 order-md-2">
                <div class="right-col">
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="footer-details">
                                <div class="row row-cols-2 row-cols-md-3 g-4">
                                    <div class="col">
                                        <?php if (have_rows('home_page_section_links', 'option')):  while (have_rows('home_page_section_links', 'option')): the_row(); ?>
                                        <div class="card">
                                            <h5 class="title">
                                                <?php the_sub_field('title', 'option') ?>
                                            </h5>
                                            <ul class="links">
                                                <?php
                                    if( have_rows('section_links') ):
                                        while( have_rows('section_links') ) : the_row(); ?>
                                                <li class="link"><a
                                                        href="<?php the_sub_field('link', 'option') ?>"><?php the_sub_field('name', 'option') ?></a>
                                                </li>
                                                <?php
                                        endwhile;
                                    else :
                                    endif; ?>
                                            </ul>
                                        </div>
                                        <?php endwhile; endif; ?>
                                    </div>
                                    <div class="col">
                                        <?php if (have_rows('soul_story_links', 'option')):  while (have_rows('soul_story_links', 'option')): the_row(); ?>
                                        <div class="card">
                                            <h5 class="title">
                                                <?php the_sub_field('title', 'option') ?>
                                            </h5>
                                            <ul class="links">
                                                <?php
                                    if( have_rows('section_links') ):
                                        while( have_rows('section_links') ) : the_row(); ?>
                                                <li class="link"><a
                                                        href="<?php the_sub_field('link', 'option') ?>"><?php the_sub_field('name', 'option') ?></a>
                                                </li>
                                                <?php
                                        endwhile;
                                    else :
                                    endif; ?>
                                            </ul>
                                        </div>
                                        <?php endwhile; endif; ?>
                                    </div>
                                    <div class="col">
                                        <?php if (have_rows('ayurveda_at_soul_links', 'option')):  while (have_rows('ayurveda_at_soul_links', 'option')): the_row(); ?>
                                        <div class="card">
                                            <h5 class="title">
                                                <?php the_sub_field('title', 'option') ?>
                                            </h5>
                                            <ul class="links"> <?php
                                    if( have_rows('section_links') ):
                                        while( have_rows('section_links') ) : the_row(); ?>
                                                <li class="link"><a
                                                        href="<?php the_sub_field('link', 'option') ?>"><?php the_sub_field('name', 'option') ?></a>
                                                </li>
                                                <?php
                                        endwhile;
                                    else :
                                    endif; ?>
                                            </ul>
                                        </div>
                                        <?php endwhile; endif; ?>
                                    </div>
                                    <div class="col">
                                        <?php if (have_rows('experiences_links', 'option')):  while (have_rows('experiences_links', 'option')): the_row(); ?>
                                        <div class="card">
                                            <h5 class="title">
                                                <?php the_sub_field('title', 'option') ?>
                                            </h5>
                                            <ul class="links">
                                                <?php
                                    if( have_rows('section_links') ):
                                        while( have_rows('section_links') ) : the_row(); ?>
                                                <li class="link"><a
                                                        href="<?php the_sub_field('link', 'option') ?>"><?php the_sub_field('name', 'option') ?></a>
                                                </li>
                                                <?php
                                        endwhile;
                                    else :
                                    endif; ?>
                                            </ul>
                                        </div>
                                        <?php endwhile; endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="footer-details">
                                <div class="row row-cols-1 row-cols-md-1 g-4">
                                    <div class="col">
                                        <?php if (have_rows('contact_us_details', 'option')):  while (have_rows('contact_us_details', 'option')): the_row(); ?>
                                        <div class="card pt-3 pt-md-0">
                                            <h5 class="title">
                                                <?php the_sub_field('title', 'option') ?>
                                            </h5>
                                            <div class="contact_details">
                                                <p class="address"><?php the_sub_field('address', 'option') ?></p>
                                                <ul class="tel_wrapper">
                                                    <li class="tel_item">
                                                        <span><?php the_sub_field('reservations_text', 'option') ?></span>
                                                        <a href="tel:<?php the_sub_field('reservations_number', 'option') ?>"
                                                            class="tel"><?php the_sub_field('reservations_number', 'option') ?></a>
                                                    </li>
                                                    <li class="tel_item">
                                                        <span><?php the_sub_field('hotel_text', 'option') ?></span><a
                                                            href="tel:<?php the_sub_field('hotel_number', 'option') ?>"
                                                            class="tel"><?php the_sub_field('hotel_number', 'option') ?></a>
                                                    </li>
                                                </ul>

                                                <div class="sm_wrapper">
                                                    <?php if (have_rows('follow_us', 'option')):  while (have_rows('follow_us', 'option')): the_row(); ?>
                                                    <div class="social-icons">
                                                        <h5 class="title"><?php the_sub_field('title', 'option') ?>
                                                        </h5>
                                                        <?php
                                                    if( have_rows('social_medias', 'option') ):
                                                        while( have_rows('social_medias', 'option') ) : the_row();?>
                                                        <a href="<?php the_sub_field('url', 'option') ?>"
                                                            class="social-icon">
                                                            <i class="<?php the_sub_field('icon', 'option') ?>"></i>
                                                        </a>
                                                        <?php 
                                                    endwhile;
                                                    else :
                                                    endif; ?>
                                                    </div>
                                                    <?php endwhile; endif; ?>
                                                </div>
                                            </div>
                                        </div>
                                        <?php endwhile; endif; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-info">
            <p class="info"><sup>©</sup> <?php echo date("Y"); ?> <?php bloginfo( 'name' ); ?>. |
                <?php the_field('footer_note', 'option') ?></a>.
            </p>
        </div>
</footer>

</div><!-- #page we need this extra closing tag here -->


<?php wp_footer(); ?>

</html>