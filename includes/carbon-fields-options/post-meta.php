<?php 

if (!defined('ABSPATH')) {
  exit;
}

use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make( 'post_meta', 'Дополнительные поля' )
->show_on_page(28)

  ->add_tab( 'Главный экран', [
      Field::make( 'text', 'top_info', 'Заголовок' ),
      Field::make( 'image', 'top_img', 'Главное изображение' ),
  ])
  ->add_tab( 'Каталог', [
]);
