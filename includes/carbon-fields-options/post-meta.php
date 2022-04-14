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
    Field::make( 'text', 'catalog_title', 'Заголовок' ),
    Field::make( 'association', 'catalog_products', 'Товары' )
    ->set_types( [
        [
            'type'      => 'post',
            'post_type' => 'product',
        ]
     ] )
]);



Container::make( 'post_meta', 'Дополнительные поля' )
  ->show_on_post_type('product')

  ->add_tab( 'Информация товара', [
      Field::make( 'text', 'product_price', 'Цена' ),
      Field::make( 'complex', 'product_attributes', 'Атрибуты' )
      ->set_max(2)
      ->add_fields([
        Field::make('text', 'name', 'Название')->set_width(50),
        Field::make('text', 'price', 'Цена')->set_width(50),
      ])
  ]);