<?php
/*
Template Name: Главная Страница
*/
?>
<?php $page_id = get_the_ID(); ?>
<?php get_header(); ?>


<main>
	<?php
		$top_img_id = carbon_get_post_meta( $page_id, 'top_img');
		$top_img_src = wp_get_attachment_image_url( $top_img_id, 'full');
		$top_img_src_webp = convertToWebpSrc($top_img_src);
	 ?>
	<section class="hero">
		<div class="hero__body">
			<h1>
				<?php echo carbon_get_post_meta( $page_id, 'top_info' )?>
			</h1>
		</div>
		<div class="hero__background">
			<picture>
				<source type="image/webp" data-srcset="<?php echo $top_img_src_webp ?>">
				<source type="image/jpg" data-srcset="<?php echo $top_img_src ?>">
				<img src="<?php echo $top_img_src ?>" alt="Тут обои сайта">
			</picture>
		</div>
		<div class="bg-gradient"></div>
	</section>
	<section class="category">
		<div class="categories"></div>
	</section>
	<section class="snack">
		<h2 class="h2 container">
			<span></span> ХОЛОДНЫЕ ЗАКУСКИ
		</h2>
		<div class="swiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide snacks product Кола_1-5_Литра">
					<div class="snacks__img">
						<img data-src="<?php echo get_template_directory_uri(); ?>/img/cold-snacks/cola.png" src="data:image/gif;base64,R0lGODlhIQAXAIAAAP///wAAACH5BAEAAAEALAAAAAAhABcAAAIajI+py+0Po5y02ouz3rz7D4biSJbmiaaqVQAAOw==" alt="cold-snack">
					</div>
					<div class="snacks__body">
						<h3 class="snacks__title product__title">
							Кола 1.5 Литра
						</h3>
						<p class="snacks__about">
							Новинка
						</p>
						<div class="snacks__buttons">
							<button class="snacks__basket minus decrease" style="display: none;">-</button>
							<span class="snacks__price">
								109
							</span>
							<button class="snacks__basket basket__default basketDefault">
								<span class="basketDefault">В корзину</span>
								<div class="basket__icon basketDefault">
									<img class="basketDefault" src="<?php echo get_template_directory_uri(); ?>/img/icon/Buy.svg" alt="Buy">
								</div>
							</button>
							<button class="snacks__basket plus increase" style="display: none;">+</button>
						</div>
						<p class="snacks__mass">
							225
						</p>
					</div>
					<div class="snacks-quantity"></div>
				</div>
				<div class="swiper-slide snacks product Суп">
					<div class="snacks__img">
						<img data-src="<?php echo get_template_directory_uri(); ?>/img/cold-snacks/cold-snacks-2.jpg" src="data:image/gif;base64,R0lGODlhIQAXAIAAAP///wAAACH5BAEAAAEALAAAAAAhABcAAAIajI+py+0Po5y02ouz3rz7D4biSJbmiaaqVQAAOw==" alt="cold-snack">
					</div>
					<div class="snacks__body">
						<h3 class="snacks__title product__title">
							Суп
						</h3>
						<p class="snacks__about">
							Новинка
						</p>
						<div class="snacks__buttons">
							<button class="snacks__basket minus decrease" style="display: none;">-</button>
							<span class="snacks__price">
								180
							</span>
							<button class="snacks__basket basket__default basketDefault">
								<span class="basketDefault">В корзину</span>
								<div class="basket__icon basketDefault">
									<img class="basketDefault" src="<?php echo get_template_directory_uri(); ?>/img/icon/Buy.svg" alt="Buy">
								</div>
							</button>
							<button class="snacks__basket plus increase" style="display: none;">+</button>
						</div>
						<p class="snacks__mass">
							225
						</p>
					</div>
					<div class="snacks-quantity"></div>
				</div>


			</div>
		</div>
	</section>
	<section class="map _preload-section _preloading">
		<id id="map"></id>
	</section>
	<section class="basket">
		<div class="basket-top">
			<div class="basket-title h2">
				<span></span> КОРЗИНА <p class="total-quantity-products">0</p>
			</div>
		</div>
		<div class="basket-products">
		</div>

		<div class="checkout">
			
		</div>

		<div class="basket-total">
			<div class="total__body">
				<div class="total__title">
					500
				</div>
				<p class="totalEnough">
					До бесплатной доставки не хватет:
				</p>
				<p class="total__need4free">0 </p>
				<span class="total__need4free-rubles"> ₽</span>
				<p class="total__min">700</p>
			</div>
			<button class="total__checkout">
				Перейти к заказу
			</button>
		</div>

	</section>
</main>

<?php get_footer(); ?>