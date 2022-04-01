<!DOCTYPE html>
<html lang="ru">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<title>#Гриль Экспресс</title>
	<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/img/icon/logo_transparent.png" type="image/x-icon">
	<meta name="theme-color" content="#403c3b">

	<meta name="description" content="Доставка вкуснейших блюд за 60 минут">
	<meta name="keywords"
		content="#Гриль, Грил саранск, достака шаурмы саранск, Гриль экспресс, гамбургер сарсанск доставка">
	<meta name="robots" content="noimageindex, nofollow">
	<meta name="Address" content="Саранск, улица Титова, 10с1">

	<meta property="og:locale" content="ru_RU">
	<meta property="og:title" content="#Гриль Экспресс">
	<meta property="og:description" content="Доставка вкуснейших блюд за 60 минут">
	<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/img/icon/share.png">
	<meta property="og:site_name" content="#Гриль Экспресс">

	<?php wp_head(); ?>
</head>

<body>
	<header class="header">
		<div class="header-row container">
			<div class="hamb">
				<div class="hamb__field"></div>
				<p class="menu">МЕНЮ</p>
			</div>
			<a class="logo scroll-up">
				#ГРИЛЛЬ <br><span> экспресс</span>
			</a>
			<div class="header__right">
				<div class="call">
					<a class="call__icon" href="tel:+7900123456">
						<img src="<?php echo get_template_directory_uri(); ?>/img/icon/Calling.svg" alt="call">
					</a>
					<a class="call__contact" href="tel:+7900123456">
						<span>Контакты:</span><br>
						+7 (917) 510-57-59
					</a>
				</div>
				<button class="basket-button">
					<p>Корзина</p>
					<span></span>
					<img src="<?php echo get_template_directory_uri(); ?>/img/icon/Buy.svg" alt="Buy">
					<p class="basket-quantity">0</p>
				</button>
			</div>
		</div>
		<div class="popup">
			<div class="call">
				<a class="call__icon" href="tel:+7900123456">
					<img src="<?php echo get_template_directory_uri(); ?>/img/icon/Calling.svg" alt="call">
				</a>
				<a class="call__contact" href="tel:+7900123456">
					<span>Контакты:</span><br>
					+7 (917) 510-57-59
				</a>
			</div>
		</div>
	</header>