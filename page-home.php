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
		<div class="scroll-down"></div>
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
	</section>
	<section class="category">
		<nav class="catalog-nav">
  
			<?php
				$catalog_nav = carbon_get_post_meta($page_id, 'catalog_nav');
				$catalog_nav_ids = wp_list_pluck($catalog_nav, 'id');
				
				$catalog_nav_items = get_terms([
				'include' => $catalog_nav_ids,
				]);
			?>
			<ul class="categories">
				<li>
					<button class="catalog-nav__btn _active" type="button" data-filter="all">все</button>
				</li>

				<?php foreach ($catalog_nav_items as $item) : ?>
					<li class="catalog-nav__item">
						<button class="catalog-nav__btn" type="button" data-filter="<?php echo $item->slug; ?>"><?php echo $item->name; ?></button>
					</li>
				<?php endforeach; ?>

			</ul>
		</nav>
	</section>
	<section class="snack">
		<div class="snack__category">		
			<?php  
				$catalog_products = carbon_get_post_meta( $page_id, 'catalog_products' );
				$catalog_products_ids = wp_list_pluck($catalog_products, 'id');
				
				$catalog_products_args = [
					'post_type' => 'product',
					'post_in' => $catalog_products_ids

				]; 
				$catalog_products_query = new WP_Query( $catalog_products_args ); 
			?>

			
			<?php if ( $catalog_products_query->have_posts() ) : ?>
				<div class="snack__items">

				
				
				<!-- цикл -->
				<?php while ( $catalog_products_query->have_posts() ) : $catalog_products_query->the_post(); ?>
					<?php get_template_part('product-content');  ?>
				<?php endwhile; ?>

				<?php wp_reset_postdata(); ?>
				
				</div>
			<?php endif; ?>

		</div>

	</section>
	<section class="map _preload-section _preloading">
		<div id="map"></div>
	</section>
	<section class="basket">
		<div class="basket-top">
			<div class="basket-title h2">
				<span></span> КОРЗИНА <p class="total-quantity-products">0</p>
			</div>
		</div>
		<form action="#" enctype="multipart/form-data" method="POST" id="form" class="form-send">
			<div class="basket-products">
			</div>
			<div class="checkoutForm"></div>
			<div class="basket-total">
				<div class="total__body">
					<div class="total__title">
						0
					</div>
					<input class="input-total" type="hidden" name="Сумма заказа" value="">
					<p class="totalEnough">
						До бесплатной доставки не хватет:
					</p>
					<p class="total__need4free">800 </p>
					<span class="total__need4free-rubles"> ₽</span>
					<p class="shipping-price"><?php echo carbon_get_theme_option('ship_price');?></p>
					<p class="total__min"><?php echo carbon_get_theme_option('min_shipping_price');?></p>
				</div>
				<button class="total__checkout">
					Перейти к заказу
				</button>
			</div>
		</form>
	</section>
</main>

<?php get_footer(); ?>
