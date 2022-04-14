<?php
  $product_id = get_the_ID();

  $product_img_src = get_the_post_thumbnail_url($product_id, 'full');
  $product_img_src_webp = convertToWebpSrc($product_img_src);
?>




<div class="snacks product <?php echo the_title(); ?>">
  <div class="snacks__img">
    <img data-src="<?php  echo $product_img_src_webp; ?>" src="data:image/gif;base64,R0lGODlhIQAXAIAAAP///wAAACH5BAEAAAEALAAAAAAhABcAAAIajI+py+0Po5y02ouz3rz7D4biSJbmiaaqVQAAOw=="
     alt="cold-snack">
  </div>
  <div class="snacks__body">
    <h3 class="snacks__title product__title">
      <?php echo the_title(); ?>
    </h3>
    <div class="snacks__about">
      <?php echo the_excerpt(); ?>
    </div>
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
