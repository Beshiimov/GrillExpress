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
		<div class="categories"></div>
	</section>
	<section class="snack">
		<div class="snack__category">
			<h2 class="h2 container">
				<span></span> ХОЛОДНЫЕ ЗАКУСКИ
			</h2>
			
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
