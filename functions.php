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

  
  wp_enqueue_script('script-js', get_template_directory_uri() . '/js/script.js', [], $version, true);  
  wp_enqueue_script('ya-map', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=4efb335a-a405-41a7-94e9-2ca5e54a5708', ['script-js'], $version, true);  

  wp_localize_script('script-js', 'WPJS', [
    'ajaxUrl' => admin_url('admin-ajax.php'),
  ]);
}

add_action( 'after_setup_theme', 'theme_support' );
function theme_support() {
  register_nav_menu( 'menu_main_header', 'Меню в шапке' );
  add_theme_support('post-thumbnails');
  add_image_size('product', 650, 330, true);  
}

add_action( 'after_setup_theme', 'crb_load' );
function crb_load() {
    require_once( 'includes/carbon-fields/vendor/autoload.php' );
    \Carbon_Fields\Carbon_Fields::boot();
}


add_action('carbon_fields_register_fields', 'register_carbon_fields');
function register_carbon_fields() {
  require_once( 'includes/carbon-fields-options/theme-options.php' );
  require_once( 'includes/carbon-fields-options/post-meta.php' );
}

add_action('init', 'create_global_variable');
function create_global_variable() {
  global $pizza_time;
  $pizza_time = [
    'phone' => carbon_get_theme_option('site_phone'),
    'phone_digits' => carbon_get_theme_option('site_phone_digits'),
    'phone2' => carbon_get_theme_option('site_phone2'),
    'phone_digits2' => carbon_get_theme_option('site_phone_digits2'),
    'vk_url' => carbon_get_theme_option('vk_url'),
    'instagram_url' => carbon_get_theme_option('instagram_url'),
    'telegram_url' => carbon_get_theme_option('telegram_url'),
    'min_shipping_price' => carbon_get_theme_option('min_shipping_price'),
    'ship_price' => carbon_get_theme_option('ship_price'),
  ];
}



function convertToWebpSrc($src) {
  $src_webp = $src . '.webp';
  return str_replace('uploads', 'uploads-webpc/uploads', $src_webp);
}


add_action( 'init', 'register_post_types' );
function register_post_types() {
  register_post_type('product', [
    'labels' => [
      'name'               => 'Товары', // основное название для типа записи
      'singular_name'      => 'Товар', // название для одной записи этого типа
      'add_new'            => 'Добавить товар', // для добавления новой записи
      'add_new_item'       => 'Добавление товара', // заголовка у вновь создаваемой записи в админ-панели.
      'edit_item'          => 'Редактирование товара', // для редактирования типа записи
      'new_item'           => 'Новый товар', // текст новой записи
      'view_item'          => 'Смотреть товар', // для просмотра записи этого типа.
      'search_items'       => 'Искать товар', // для поиска по этим типам записи
      'not_found'          => 'Не найдено', // если в результате поиска ничего не было найдено
      'not_found_in_trash' => 'Не найдено в корзине', // если не было найдено в корзине
      'menu_name'          => 'Товары', // название меню
    ],
    'menu_icon'          => 'dashicons-cart',
    'public'             => true,
    'menu_position'      => 5,
    'supports'           => ['title', 'editor', 'thumbnail', 'excerpt'],
    'has_archive'        => true,
    'rewrite'            => ['slug' => 'products']
   ] );


   register_taxonomy('product-categories', 'product', [
    'labels'        => [
      'name'                        => 'Категории товаров',
      'singular_name'               => 'Категория товароа',
      'search_items'                =>  'Искать категории',
      'popular_items'               => 'Популярные категории',
      'all_items'                   => 'Все категории',
      'edit_item'                   => 'Изменить категорию',
      'update_item'                 => 'Обновить категорию',
      'add_new_item'                => 'Добавить новую категорию',
      'new_item_name'               => 'Новое название категории',
      'separate_items_with_commas'  => 'Отделить категории запятыми',
      'add_or_remove_items'         => 'Добавить или удалить категорию',
      'choose_from_most_used'       => 'Выбрать самую популярную категорию',
      'menu_name'                   => 'Категории',
    ],
    'hierarchical'  => true,
  ]);
};


add_action('wp_ajax_send_email', 'grillexpress_send_email');
add_action('wp_ajax_nopriv_send_email', 'grillexpress_send_email');
function grillexpress_send_email() {
  $method = $_SERVER['REQUEST_METHOD'];

  if ($method !== 'POST') {
    exit();
  }

  $admin_email = 'grillexpress.mail@grillexpress.mail';
  $form_subject = 'Заявка с сайта Grillexpress';
  $message = 'Новый Заказ';
  $name = $_POST['ФИО'];
  
  $color_counter = 1;

  foreach ($_POST as $key => $value) {
    if ($value === '') {
      continue;
    }
    $color = $color_counter % 2 === 0 ? '#fff' : '#f8f8f8';
    $message .= "
      <tr style='background-color: $color;'>
        <td style='padding: 10px; border: 1px solid #e9e9e9;'>$key</td>
        <td style='padding: 10px; border: 1px solid #e9e9e9;'>$value</td>
      </tr>";
  
    $color_counter++;
  }
  
  function adopt($name) {
    return 'Заказ от ' . $name;
  }


  $message = "<table style='width: 100%;'>$message</table>";
  
  $headers  = "MIME-Version: 1.0\r\n"; 
  $headers .= "Content-type: text/html; charset=UTF-8\r\n";
  $headers .= "From:" . "$form_subject" . " <$admin_email>\r\n";
  
  $success_send = wp_mail($admin_email, adopt($name), $message, $headers);
  
  if ($success_send) {
    echo 'success';
  } else {
    echo 'error';
  }
  wp_die();
}