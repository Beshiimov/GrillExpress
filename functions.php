<?php

add_filter('show_admin_bar', '__return_false');

remove_action('wp_head',             'print_emoji_detection_script', 7 );
remove_action('admin_print_scripts', 'print_emoji_detection_script' );
remove_action('wp_print_styles',     'print_emoji_styles' );
remove_action('admin_print_styles',  'print_emoji_styles' );

remove_action('wp_head', 'wp_resource_hints', 2 ); //remove dns-prefetch
remove_action('wp_head', 'wp_generator'); //remove meta name="generator"
remove_action('wp_head', 'wlwmanifest_link'); //remove wlwmanifest 
remove_action('wp_head', 'rsd_link'); // remove EditURI
remove_action('wp_head', 'rest_output_link_wp_head');// remove 'https://api.w.org/
remove_action('wp_head', 'rel_canonical'); //remove canonical
remove_action('wp_head', 'wp_shortlink_wp_head', 10); //remove shortlink
remove_action('wp_head', 'wp_oembed_add_discovery_links'); //remove alternate

add_action('wp_enqueue_scripts', 'site_scripts');
function site_scripts() {
  $version = '0.0';
  wp_dequeue_style( 'wp-block-library' );
  wp_dequeue_style( 'global-styles' );
  wp_deregister_script( 'wp-embed' );

  wp_enqueue_style('main-style', get_stylesheet_uri(), [], $version);
  wp_enqueue_style('swiper-min', get_template_directory_uri() . '/css/swiper.min.css', [], $version);
  wp_enqueue_style('style-css', get_template_directory_uri() . '/css/style.css', ['swiper-min'], $version);

  
  wp_enqueue_script('swiper-min', get_template_directory_uri() . '/js/swiper.min.js', [], $version, true);  
  wp_enqueue_script('script-js', get_template_directory_uri() . '/js/script.js', ['swiper-min'], $version, true);  
  wp_enqueue_script('ya-map', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=4efb335a-a405-41a7-94e9-2ca5e54a5708', [], $version, true);  

  wp_localize_script('main-js', 'WPJS', [
  'siteUrl' => get_template_directory_uri(),
  ]);
}