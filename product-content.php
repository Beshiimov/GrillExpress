<?php
  $product_id = get_the_ID();

  $product_price = carbon_get_post_meta($product_id, 'product_price');
  $product_attributes = carbon_get_post_meta($product_id, 'product_attributes');
  $product_img_src = get_the_post_thumbnail_url($product_id, 'product');
  $product_img_src_webp = convertToWebpSrc($product_img_src);


  $product_categories = get_the_terms($product_id, 'product-categories');
  $product_categories_str = '';
  foreach ($product_categories as $category) {
    $product_categories_str .= "$category->slug,";
  }
  $product_categories_str = substr($product_categories_str, 0, -1);


  $title = get_the_title(); 
  $str = preg_replace('/\s+/', '_', $title);
  $productName = preg_replace('/[\s,\.,!]/', '-', $str);;
?>


<div class="snacks product <?php echo $productName .' ' ; echo $product_categories_str; ?>" data-category="<?php echo $product_categories_str; ?>">
  <div class="snacks__img">
    <picture>
      <source type="image/webp" srcset="<?php echo $product_img_src_webp; ?>" data-src="data:image/gif;base64,R0lGODlhIQAXAIAAAP///wAAACH5BAEAAAEALAAAAAAhABcAAAIajI+py+0Po5y02ouz3rz7D4biSJbmiaaqVQAAOw==">
      <img data-src="<?php  echo $product_img_src; ?>" src="data:image/gif;base64,R0lGODlhIQAXAIAAAP///wAAACH5BAEAAAEALAAAAAAhABcAAAIajI+py+0Po5y02ouz3rz7D4biSJbmiaaqVQAAOw=="
      alt="Не удалось загрузить картинку. Перезагрузите страницу пожалуйста">
    </picture>
  </div>
  <div class="snacks__body">
    <h3 class="snacks__title product__title">
      <?php echo the_title(); ?>
    </h3>
    <div class="snacks__about">
      <?php echo the_excerpt(); ?>
    </div>
    <?php if ($product_attributes) : ?>
      <div class="snacks__ingredients">
        <?php foreach ($product_attributes as $attribute) : ?>
          <?php
            $attribute_active_class = $is_first_item ? ' is-active' : ''; ?>
        <label>
          <input type="checkbox" snacks__ingredient-price="<?php echo $attribute['price']; ?>" class="snacks__ingredient-add" value="<?php echo $attribute['name']; ?>"><?php echo $attribute['name']; ?>
        </label>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
  <div class="snacks__buttons">
    <button class="snacks__basket minus decrease" style="display: none;">-</button>
    <span class="snacks__price">
      <?php echo $product_price; ?>
    </span>
    <button class="snacks__basket basket__default basketDefault">
      <span class="basketDefault">В корзину</span>
      <span class="basket__icon basketDefault">
        <img class="basketDefault" src="<?php echo get_template_directory_uri(); ?>/img/icon/Buy.svg" alt="Buy">
      </span>
    </button>
    <button class="snacks__basket plus increase" style="display: none;">+</button>
  </div>
  <div class="snacks-quantity"></div>
</div>
