<!DOCTYPE html>
<html lang="ru">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<title>#Гриль Экспресс</title>
	<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/img/icon/logo.svg" type="image/x-icon">
	<meta name="theme-color" content="#403c3b">
	<link rel="preconnect" href="https://fonts.googleapis.com">

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
				<img src="<?php echo wp_get_attachment_image_url(carbon_get_theme_option( 'site_logo'));?>" alt="Логотип">
			</a>
			<div class="header__right">
				<div class="call">
					<a class="call__contact" href="tel:<?php echo $GLOBALS['pizza_time']['phone_digits2']?>">
						<?php echo $GLOBALS['pizza_time']['phone2']?>
					</a>
					<a class="call__contact" href="tel:<?php echo $GLOBALS['pizza_time']['phone_digits']?>">
						<?php echo $GLOBALS['pizza_time']['phone']?>
					</a>
				</div>
				<button class="basket-button">
					<span>Корзина</span>
					<span></span>
					<span class="basket-quantity">0</span>
				</button>
			</div>
		</div>
		<div class="popup">
			<div class="contacts">
				<div class="popup__call">
					<a class="popup-call__contact" href="tel:<?php echo $GLOBALS['pizza_time']['phone_digits']?>">
						<?php echo $GLOBALS['pizza_time']['phone']?>
					</a>
					<a class="popup-call__contact" href="tel:<?php echo $GLOBALS['pizza_time']['phone_digits2']?>">
						<?php echo $GLOBALS['pizza_time']['phone2']?>
					</a>
				</div>
				<div class="social">
					<?php if ($GLOBALS['pizza_time']['vk_url']) : ?>
						<a href="<?php echo $GLOBALS['pizza_time']['vk_url']; ?>">
							<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:#4489c8;}.cls-2{fill:#fff;}</style></defs><title/><g data-name="32-vk" id="_32-vk"><rect class="cls-1" height="64" rx="11.2" ry="11.2" width="64"/><path class="cls-2" d="M9.62,19.77H17.3a.79.79,0,0,1,.74.51c.85,2.19,4.38,10.76,7.61,11.46,2.4,0,1.55-11.4-1.5-11.4-.8,0,1.42-1.42,1.57-1.48a16.38,16.38,0,0,1,8.66,0c1.53.64,1.79,2.43,1.83,3.95s-1.7,8,.59,8.7c3,.92,6.86-8.49,7.76-10.8a.79.79,0,0,1,.74-.5h8.55a.8.8,0,0,1,.74,1.11,74.74,74.74,0,0,1-6.31,11.52,1.59,1.59,0,0,0,.16,2C51,37.58,58,45.34,54,45.34H45.37a1.57,1.57,0,0,1-1.18-.53c-1.34-1.48-5.24-5.6-7-5.27-1.46.27-1.6,2.75-1.53,4.37a1.6,1.6,0,0,1-1.48,1.68c-1.53.09-3.62.13-3.81.12-6.1-.39-9.71-4.46-13.16-9A56.33,56.33,0,0,1,8.86,20.83.81.81,0,0,1,9.62,19.77Z"/></g>
							</svg>
						</a>
					<?php endif; ?>
					<?php if ($GLOBALS['pizza_time']['instagram_url']) : ?>
						<a href="<?php echo $GLOBALS['pizza_time']['instagram_url']; ?>">
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							viewBox="0 0 551.034 551.034" style="enable-background:new 0 0 551.034 551.034;" xml:space="preserve">
							<g id="XMLID_13_">

							<linearGradient id="XMLID_2_" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.5714" x2="275.517" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)">
							<stop  offset="0" style="stop-color:#E09B3D"/>
							<stop  offset="0.3" style="stop-color:#C74C4D"/>
							<stop  offset="0.6" style="stop-color:#C21975"/>
							<stop  offset="1" style="stop-color:#7024C4"/>
							</linearGradient>
							<path id="XMLID_17_" style="fill:url(#XMLID_2_);" d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722
							c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156
							C551.033,73.64,477.393,0,386.878,0z M495.6,386.878c0,60.045-48.677,108.722-108.722,108.722H164.156
							c-60.045,0-108.722-48.677-108.722-108.722V164.156c0-60.046,48.677-108.722,108.722-108.722h222.722
							c60.045,0,108.722,48.676,108.722,108.722L495.6,386.878L495.6,386.878z"/>

							<linearGradient id="XMLID_3_" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.5714" x2="275.517" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)">
							<stop  offset="0" style="stop-color:#E09B3D"/>
							<stop  offset="0.3" style="stop-color:#C74C4D"/>
							<stop  offset="0.6" style="stop-color:#C21975"/>
							<stop  offset="1" style="stop-color:#7024C4"/>
							</linearGradient>
							<path id="XMLID_81_" style="fill:url(#XMLID_3_);" d="M275.517,133C196.933,133,133,196.933,133,275.516
							s63.933,142.517,142.517,142.517S418.034,354.1,418.034,275.516S354.101,133,275.517,133z M275.517,362.6
							c-48.095,0-87.083-38.988-87.083-87.083s38.989-87.083,87.083-87.083c48.095,0,87.083,38.988,87.083,87.083
							C362.6,323.611,323.611,362.6,275.517,362.6z"/>

							<linearGradient id="XMLID_4_" gradientUnits="userSpaceOnUse" x1="418.306" y1="4.5714" x2="418.306" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)">
							<stop  offset="0" style="stop-color:#E09B3D"/>
							<stop  offset="0.3" style="stop-color:#C74C4D"/>
							<stop  offset="0.6" style="stop-color:#C21975"/>
							<stop  offset="1" style="stop-color:#7024C4"/>
							</linearGradient>
							<circle id="XMLID_83_" style="fill:url(#XMLID_4_);" cx="418.306" cy="134.072" r="34.149"/>
							</g>
							</svg>

						</a>
					<?php endif; ?>
					<?php if ($GLOBALS['pizza_time']['telegram_url']) : ?>
						<a href="<?php echo $GLOBALS['pizza_time']['telegram_url']; ?>">
							<svg id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
							.st0{fill:url(#SVGID_1_);}
							.st1{fill:#FFFFFF;}
							.st2{fill:#D2E4F0;}
							.st3{fill:#B5CFE4;}
							</style><g><linearGradient gradientUnits="userSpaceOnUse" id="SVGID_1_" x1="256" x2="256" y1="0" y2="510.1322"><stop offset="0" style="stop-color:#41BCE7"/><stop offset="1" style="stop-color:#22A6DC"/></linearGradient><circle class="st0" cx="256" cy="256" r="256"/><g><path class="st1" d="M380.6,147.3l-45.7,230.5c0,0-6.4,16-24,8.3l-105.5-80.9L167,286.7l-64.6-21.7c0,0-9.9-3.5-10.9-11.2    c-1-7.7,11.2-11.8,11.2-11.8l256.8-100.7C359.5,141.2,380.6,131.9,380.6,147.3z"/><path class="st2" d="M197.2,375.2c0,0-3.1-0.3-6.9-12.4c-3.8-12.1-23.3-76.1-23.3-76.1l155.1-98.5c0,0,9-5.4,8.6,0    c0,0,1.6,1-3.2,5.4c-4.8,4.5-121.8,109.7-121.8,109.7"/><path class="st3" d="M245.8,336.2l-41.7,38.1c0,0-3.3,2.5-6.8,0.9l8-70.7"/></g></g></svg>
						</a>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</header>
