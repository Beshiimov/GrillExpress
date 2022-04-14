const lazyImages = document.querySelectorAll(`img[data-srcset], img[data-src]`);
const lazyMap = document.querySelector(`._preload-section`);
const windowHeight = document.documentElement.clientHeight;


let lazyImagesPosition = [];
if (lazyImages.length > 0) {
  lazyImages.forEach(img => {
    if (img.dataset.src || img.dataset.src) {
      lazyImagesPosition.push(img.getBoundingClientRect().top + pageYOffset - 100);
      lazyScrollCheck();
    }
  });
}

window.addEventListener(`scroll`, lazyScroll);

function lazyScroll () {
  if (document.querySelectorAll(`img[data-srcset], img[data-src], source[data-srcset]`).length > 0) {
    lazyScrollCheck();

  }
  if (lazyMap.classList.contains(`_preload-section`)) {
    lazyMapCheck();
  }
}

function lazyScrollCheck () {
  let imgIndex = lazyImagesPosition.findIndex(
    item => pageYOffset > item - windowHeight
  );
  if (imgIndex >= 0) {
    if (lazyImages[imgIndex].dataset.src) {
      lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
      lazyImages[imgIndex].removeAttribute(`data-src`);
    } else if (lazyImages[imgIndex].dataset.srcset) {
      lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
      lazyImages[imgIndex].removeAttribute(`data-srcset`);
    }
    delete lazyImagesPosition[imgIndex];
  }
}

function lazyMapCheck () {
  const lazyMapPos = lazyMap.getBoundingClientRect().top + pageYOffset - 200;
  if (pageYOffset > lazyMapPos - windowHeight) {
    lazyMap.innerHTML = `<div id="map"></div>`;
    lazyMap.classList.remove(`_preload-section`);
    mapInit();
  }
}


window.addEventListener('load', function() {
  const mediaQuery = window.matchMedia('(min-width: 767px)');
  function handleTabletChange(e) {
    if (e.matches && popup.classList.contains(`_active`)) {
      hamburgerPopup();
    };
  };
  mediaQuery.addListener(handleTabletChange);
  handleTabletChange(mediaQuery);
  
  
  const scrollUp = document.querySelectorAll(`.scroll-up`);
  scrollUp.forEach(item => {
    item.addEventListener(`click`, e => {
      e.preventDefault
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  });
  
  document.querySelector('.scroll-down').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.categories').scrollIntoView({ behavior: 'smooth' });
  });
});

function scrollBlock () {
  const body = document.querySelector(`body`);
  body.classList.toggle(`_scroll-block`);
}

const hamburger = document.querySelector(`.hamb`);
const popup = document.querySelector(`.popup`);
const menu = document.querySelector(`.menu`);

hamburger.addEventListener(`click`, hamburgerPopup)
function hamburgerPopup () {
  popup.classList.toggle(`_active`);
  hamburger.classList.toggle(`_active`);
  if (menu.textContent == `МЕНЮ`) {
    menu.textContent = `ЗАКРЫТЬ`;
  } else {
    menu.textContent = `МЕНЮ`;
  }
  scrollBlock();
};


const basketButton = document.querySelector(`.basket-button`);

basketButton.addEventListener(`click`, clickBasket = () => {
  const basketWindow = document.querySelector(`.basket`);
  basketWindow.classList.toggle(`_active`);
  scrollBlock();
});


(function () {
  const cartDOMElement = document.querySelector(`.basket-products`);
  const basketWindow = document.querySelector(`.basket`)
  const totalPriceDOMElement = basketWindow.querySelector(`.total__title`);
  const cartItemsCounterDOMElement = document.querySelector(`.basket-quantity`);
  const cartItemsCounterDOMElementWindow = document.querySelector(`.total-quantity-products`);
  const snacks = document.querySelector(`.snack`);
  
  const cart = JSON.parse(localStorage.getItem(`cart`)) || {};

  
  const renderCartItem = ({ productName, productPrice, productAbout, src, quantity }) => {
    const productNameWithoutProbels = productName.replace(/ /g, '_').replace(/[.]/g, '-'); 
    const cartItemDOMElement = document.createElement(`div`);

    const cartItemTemplate = `
      <div class="product__img">
          <img src="${src}" alt="фото товара">
      </div>
      <div class="product__body">
          <div class="snacks__title product__title">
              ${productName}
          </div>
          <p class="product__about">
              ${productAbout}
          </p>
      </div>
      <div class="product-edit">
          <button class="minus">-</button>
          <div class="quantity">
              ${quantity}
          </div>
          <button class="plus">+</button>
      </div>
      <div class="product-price">
          <div class="snacks__price">
          ${productPrice * quantity}
          </div>
          <button class="product-delete">X</button>
      </div>
    `;

    cartItemDOMElement.innerHTML = cartItemTemplate;
    cartItemDOMElement.classList.add(`product`);
    cartItemDOMElement.classList.add(`productInBasket`);
    cartItemDOMElement.classList.add(`${productNameWithoutProbels}`);
    cartDOMElement.appendChild(cartItemDOMElement);
  };


  const saveCart = () => {
    localStorage.setItem(`cart`, JSON.stringify(cart));
  };

  const checkoutDOMElement = (quantity) => {
    const checkout = document.querySelector(`.total__checkout`);

    if (quantity === 0) {
      checkout.textContent = `Корзина пока пуста`;
      checkout.style.color = `#000`;
      checkout.style.background = `#eee`;
      checkout.style.cursor = `inherit`;
    }
    if (quantity > 0) {
      checkout.textContent = `Перейти к заказу`;
      checkout.style.color = null;
      checkout.style.background = null;
      checkout.style.cursor = null;
    }
  }

  const updateCartTotalPrice = () => {
    const totalPrice = Object.keys(cart).reduce((acc, id) => {
      const { quantity, productPrice } = cart[id];
      return acc + productPrice * quantity;
    }, 0);


    if (totalPriceDOMElement) {
      totalPriceDOMElement.textContent = totalPrice;
      }
    minShippingPrice(totalPrice);

  };

  const minShippingPrice = (totalPrice) => {
    const totalEnough = basketWindow.querySelector(`.totalEnough`);
    const notEnoughPriceDOMElement = basketWindow.querySelector(`.total__need4free`);
    const notEnoughPriceDOMElementRubles = basketWindow.querySelector(`.total__need4free-rubles`);
    const minShippingDOMElement = basketWindow.querySelector(`.total__min`);
    let newQuantityNotEnough = 750;

    if (newQuantityNotEnough > 0){
      newQuantityNotEnough = minShippingDOMElement.textContent - totalPrice;
      notEnoughPriceDOMElement.textContent = newQuantityNotEnough;
      totalEnough.textContent = `До бесплатной доставки не хватет:`;
      notEnoughPriceDOMElement.style.display = "inline-block";
      notEnoughPriceDOMElementRubles.style.display = "inline-block";
    }
    if (newQuantityNotEnough <= 0) {
      totalEnough.textContent = `У вас доставка будет бесплатной`;
      notEnoughPriceDOMElement.style.display = "none";
      notEnoughPriceDOMElementRubles.style.display = "none";
    }
  }

  const updateCartTotalItemsCounter = () => {
    const totalQuantity = Object.keys(cart).reduce((acc, id) => {
      const { quantity } = cart[id];
      return acc + quantity;
    }, 0);

    if (cartItemsCounterDOMElement) {
      cartItemsCounterDOMElement.textContent = totalQuantity;
      cartItemsCounterDOMElementWindow.textContent = totalQuantity;
    }
    checkoutDOMElement(totalQuantity);
  };

  const updateCart = () => {
    updateCartTotalPrice();
    updateCartTotalItemsCounter();
    saveCart();
  };

  const productDelete = (id, cartItemDOMElement) => {
    const productName = id.replace(/ /g, '_').replace(/[.]/g, '-');
    snacks.querySelector(`.${productName}`).querySelector(`.snacks__price`).textContent = cart[id].productPrice;
    
     
    delete cart[id];
    cartItemDOMElement.parentNode.removeChild(cartItemDOMElement);
    updateCart();
  };


  const addCartItem = (data) => {
    const { productName } = data;
    const productNameWithoutProbels = productName.replace(/ /g, '_').replace(/[.]/g, '-');

    if (cart[productNameWithoutProbels]) {
      plusQuantity(productNameWithoutProbels);
      return;
    }

    cart[productNameWithoutProbels] = data;
    renderCartItem(data);
    updateCart();
  };
  
  const hideBasketButton = (id) => {
    showSnacksQuantity(id);
    const product = snacks.querySelector(`.${id}`);
    product.querySelector(`.basketDefault`).style.display = `none`;
    product.querySelector(`.snacks__price`).classList.add(`_active`);
    product.querySelector(`.plus`).style.display = `inline-block`;
    product.querySelector(`.minus`).style.display = `inline-block`;
  }
  
  const showBasketButton = (id) => {
    const product = snacks.querySelector(`.${id}`);
    product.querySelector(`.basketDefault`).style.display = `flex`;
    product.querySelector(`.snacks__price`).classList.remove(`_active`);
    product.querySelector(`.plus`).style.display = `none`;
    product.querySelector(`.minus`).style.display = `none`;
    product.querySelector(`.snacks-quantity`).textContent = ``;
    product.querySelector(`.snacks-quantity`).classList.remove(`_active`);
  }
  
  const showSnacksQuantity = (id) => {
    const product = snacks.querySelector(`.${id}`);
    const productLegacyPrice = cart[id].productPrice;
    const quantity = cart[id].quantity;
    const showSnacksQuantity = product.querySelector(`.snacks-quantity`);
    const productPrice = product.querySelector(`.snacks__price`);

    productPrice.textContent = productLegacyPrice * quantity;
    showSnacksQuantity.classList.add(`_active`);
    showSnacksQuantity.textContent = quantity;

    updateCart();
  }

  const updateSnacksQuantity = (id, quantity) => {
    console.log(id);
    if (quantity > 0) {
      const product = snacks.querySelector(`.${id}`);
      const cartItemQuantityDOMElement = product.querySelector(`.snacks-quantity`);
      const cartItemPriceDOMElement = product.querySelector(`.snacks__price`);
      cartItemQuantityDOMElement.textContent = quantity;
      cartItemPriceDOMElement.textContent = quantity * cart[id].productPrice;
    } else {
      showBasketButton(id);
    }
  }
 
  const updateQuantity = (id, quantity, cartItemDOMElement, target) => {
    cart[id].quantity = quantity;

    if (quantity > 0) {
      const product = cartDOMElement.querySelector(`.${id}`);
      const cartItemQuantityDOMElement = product.querySelector(`.quantity`);
      const cartItemPriceDOMElement = product.querySelector(`.snacks__price`);
      
      cartItemQuantityDOMElement.textContent = quantity;
      cartItemPriceDOMElement.textContent = quantity * cart[id].productPrice;
      updateSnacksQuantity(id, quantity);
      
      if(target && cartItemDOMElement.classList.contains(`snacks`)) {
        showSnacksQuantity(id);
        hideBasketButton(id);
      }
    } 
    
    if (quantity === 0) {
      showBasketButton(id);
      const product = cartDOMElement.querySelector(`.${id}`);
      updateSnacksQuantity(id, quantity);
      productDelete(id, product);
    }
    updateCart();
  };
  
  const plusQuantity = (id, cartItemDOMElement, target) => {
    const newQuantity = cart[id].quantity + 1;
    updateQuantity(id, newQuantity, cartItemDOMElement, target);
  };
  
  const minusQuantity = (id, cartItemDOMElement, target) => {
    if (cart[id].quantity > 0) {
      const newQuantity = cart[id].quantity - 1;
      updateQuantity(id, newQuantity, cartItemDOMElement, target);
    }
  };



  const getProductData = (product) => {
    const productName = product.querySelector(`.snacks__title`).textContent.trim();
    const productAbout = product.querySelector(`.snacks__about`).textContent.trim();
    const productPrice = +product.querySelector(`.snacks__price`).textContent.trim();
    const src = product.querySelector('img').getAttribute('src');
    const quantity = 1;
    return {
      productName,
      productPrice,
      productAbout,
      src,
      quantity
    }
  };

  const renderCart = () => {
    const ids = Object.keys(cart);
    ids.forEach((id) => renderCartItem(cart[id]));
  };

  const cartInit = () => {
    renderCart();
    updateCart();

    addEventListener(`click`, e => {
      const target = e.target;

      
      if (target.classList.contains(`basketDefault` )) {
        e.preventDefault();
        const product = target.closest(`.snacks`);
        const data = getProductData(product);
        addCartItem(data);
      }

      if (target.classList.contains(`product-delete`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        const idWithoutProbels = productID.replace(/ /g, '_').replace(/[.]/g, '-'); 
        showBasketButton(idWithoutProbels);
        productDelete(idWithoutProbels, cartItemDOMElement);
      }

      if (target.classList.contains(`plus`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        const idWithoutProbels = productID.replace(/ /g, '_').replace(/[.]/g, '-'); 
        
        plusQuantity(idWithoutProbels, cartItemDOMElement, target);
        hideBasketButton(idWithoutProbels);
        showSnacksQuantity(idWithoutProbels, cartItemDOMElement);
      }

      if (target.classList.contains(`minus`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        const idWithoutProbels = productID.replace(/ /g, '_').replace(/[.]/g, '-'); 
        
        showSnacksQuantity(idWithoutProbels, cartItemDOMElement);
        hideBasketButton(idWithoutProbels);
        minusQuantity(idWithoutProbels, cartItemDOMElement, target);
      }
      
      
      if (target.classList.contains(`basketDefault`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        const idWithoutProbels = productID.replace(/ /g, '_').replace(/[.]/g, '-'); 
        hideBasketButton(idWithoutProbels);
        showSnacksQuantity(idWithoutProbels, cartItemDOMElement);
        updateCart();
      }
    })
  };

  cartInit();

})();



function mapInit () {
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [54.193616, 45.160650],
      zoom: 17
    }, {
      searchControlProvider: 'yandex#search'
    }),
    myPlacemark = new ymaps.Placemark([54.193616, 45.160650], {
      // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
      balloonContentHeader: "#ГРИЛЛЬ экспресс",
        balloonContentBody: "улица Титова, 10с1",
        balloonContentFooter: "Мы здесь",
        hintContent: "Посмотреть адресс",
        size: 800,
      });
      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom');
    }
}

  //
  // //вывод запросов
  // var suggestView1 = new ymaps.SuggestView('suggest');
  // var arr = [
  //   "Саранск, улица"
  // ];
  //
  // var find = function (arr, find) {
  //   return arr.filter(function (value) {
  //     return (value + "").toLowerCase().indexOf(find.toLowerCase()) != -1;
  //   });
  // };
  // var myProvider = {
  //   suggest: function (request, options) {
  //     var res = find(arr, request),
  //       arrayResult = [],
  //       results = Math.min(options.results, res.length);
  //     for (var i = 0; i < results; i++) {
  //       arrayResult.push({
  //         displayName: res[i],
  //         value: res[i]
  //       })
  //     }
  //     return ymaps.vow.resolve(arrayResult);
  //   }
  // }
  // var suggestView = new ymaps.SuggestView('suggest', {
  //   provider: myProvider,
  //   results: 3
  // });
  //
