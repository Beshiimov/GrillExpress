<?php 

if (!defined('ABSPATH')) {
  exit;
}

use Carbon_Fields\Container;
use Carbon_Fields\Field;

Container::make( 'theme_options', 'Настройки сайта' )
->add_tab( 'Общие настройки', [
    Field::make( 'image', 'site_logo', 'Логотип' ),
])
->add_tab( 'Контакты', [
    Field::make( 'text', 'site_phone', 'Телефон' ),
    Field::make( 'text', 'site_phone_digits', 'Телефон без пробелов' ),
    Field::make( 'text', 'site_phone2', ' Второй Телефон' ),
    Field::make( 'text', 'site_phone_digits2', 'Второй Телефон без пробелов' ),
    Field::make( 'text', 'work_time', 'Рабочее время (С, до)' ),
    Field::make( 'text', 'vk_url', 'Ссылька на ВК' ),
    Field::make( 'text', 'instagram_url', 'Ссылька на Instagram' ),
    Field::make( 'text', 'telegram_url', 'Ссылька на Телеграм' ),
])
->add_tab( 'Доставка', [
    Field::make( 'text', 'min_shipping_price', 'Минимальная бесплатная доставка' ),
    Field::make( 'text', 'ship_price', 'Наценка доставка' ),
]);