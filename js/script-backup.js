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

function lazyScroll() {
  if (document.querySelectorAll(`img[data-srcset], img[data-src], source[data-srcset]`).length > 0) {
    lazyScrollCheck();

  }
  if (lazyMap.classList.contains(`_preload-section`)) {
    lazyMapCheck();
  }
}

function lazyScrollCheck() {
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

function lazyMapCheck() {
  const lazyMapPos = lazyMap.getBoundingClientRect().top + pageYOffset - 200;
  if (pageYOffset > lazyMapPos - windowHeight) {
    lazyMap.innerHTML = `<div id="map"></div>`;
    lazyMap.classList.remove(`_preload-section`);
    mapInit();
  }
}


const scroll = () => {
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
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  });

};


function scrollBlock() {
  //nothing
}

const hamburger = document.querySelector(`.hamb`);
const popup = document.querySelector(`.popup`);
const menu = document.querySelector(`.menu`);

hamburger.addEventListener(`click`, hamburgerPopup)

function hamburgerPopup() {
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

  const renderCartItem = ({
    productName,
    productPrice,
    productAbout,
    src,
    quantity
  }) => {
    const productNameWithoutProbels = productName.replace(/ /g, '_').replace(/[.,]/g, '-'); 

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
      <div class="product-send">
        <input type="hidden" name="Заказ" value="${productNameWithoutProbels}">
        <input class="product-input-quantity" type="hidden" name="${productName} Количество" value="${quantity}">
        <input class="product-input-price" type="hidden" name="${productName} (Цена за штуку)" value="${productPrice}">
        <input class="product-input-price-total" type="hidden" name="${productName} (Общая Цена)" value="${productPrice * quantity}">
      </div>
    `;

    cartItemDOMElement.innerHTML = cartItemTemplate;
    cartItemDOMElement.classList.add(`product`);
    cartItemDOMElement.classList.add(`productInBasket`);
    cartItemDOMElement.classList.add(`${productNameWithoutProbels}`);
    cartDOMElement.appendChild(cartItemDOMElement);

  };

  const formUpdate = (id,  quantity) => {
    if (quantity > 0) {
      const cartItemDOMElement = cartDOMElement.querySelector(`.${id}`);
      cartItemDOMElement.querySelector(`.product-input-quantity`).value = quantity;
      cartItemDOMElement.querySelector(`.product-input-price`).value = cart[id].productPrice;
      cartItemDOMElement.querySelector(`.product-input-price-total`).value = cart[id].productPrice * quantity;
    }
  };

  const totalInputUpdate = () => {
    const totalPrice = basketWindow.querySelector(`.total__title`).textContent.trim();
    basketWindow.querySelector(`.input-total`).value = totalPrice;
  };

  const saveCart = () => {
    localStorage.setItem(`cart`, JSON.stringify(cart));
  };

  const snacksAttributes = target => {
    target.parentNode.classList.toggle(`checked`);
  };

  const activateCheckoutForm = (checkout) => {
    const checkoutForm = basketWindow.querySelector(`.checkoutForm`);

    const showForms = () => {
      checkoutForm.classList.add(`_active`);
      const cartItemTemplate = `
        <div class="form__block">
          <h2>Оформление заказа</h2>
          <div class="form__item">
            <label for="formName" class="form__label">ФИО*</label>
            <input type="text" name="ФИО" class="form__input" id="formName" required="Пожалуйста, заполните это поле">
          </div>
          <div class="form__item">
            <label for="formPhone" class="form__label">Ваш номер телефона*</label>
            <input type="tel" name="Номер" class="form__input" id="formPhone" required="Пожалуйста, заполните это поле">
          </div>
        </div>

        <div class="form__block">
          <h2>Доставка</h2>
          <div class="form__item">
            <label for="formStreet" class="form__label">Укажите улицу*</label>
            <input type="text" name="Улица" class="form__input" id="formStreet" required="Пожалуйста, заполните это поле">
          </div>
          <div class="form__item">
            <label for="formHouse" class="form__label">Дом и подъезд*</label>
            <input type="text" name="Дом" class="form__input" id="formHouse" required="Пожалуйста, заполните это поле">
          </div>
          <div class="form__item">
            <label for="formComment" class="form__label">Комментарии</label>
            <textarea  type="text" name="Комментарии" class="form__input" id="formComment"></textarea>
          </div>
        </div>
          
        <div class="form__block">
          <h2>Оплата</h2>
          <div class="form__item">
            Оплата только при получении заказа (наличными или картой)
          </div>
          <div class="pay-methods">
            <div class="pay-methods__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="2500" height="2500" viewBox="0 0 141.732 141.732"><g fill="#2566af"><path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"/></g><path d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z" fill="#e6a540"/><path fill="none" d="M0 0h141.732v141.732H0z"/></svg>
            </div>
            <div class="pay-methods__item">
              <svg id="Laag_1" data-name="Laag 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1556"><defs><style>.cls-1{fill:#231f20;}.cls-2{fill:#f79410;}.cls-3{fill:#ff5f00;}.cls-4{fill:#eb001b;}.cls-5{fill:#f79e1b;}</style></defs><title>Tekengebied 1</title><path class="cls-1" d="M1960.59,1534.9v4h3.73a3.93,3.93,0,0,0,2-.51,1.78,1.78,0,0,0,.75-1.53,1.71,1.71,0,0,0-.75-1.49,3.59,3.59,0,0,0-2-.51h-3.73Zm3.77-2.83a6.92,6.92,0,0,1,4.48,1.3,4.3,4.3,0,0,1,1.57,3.54,4.06,4.06,0,0,1-1.26,3.11,6.14,6.14,0,0,1-3.58,1.49l5,5.7h-3.85l-4.6-5.66h-1.49v5.66h-3.22v-15.13h7Zm-1,20.36a12,12,0,0,0,4.91-1,12.86,12.86,0,0,0,4-2.71,12.63,12.63,0,0,0,2.71-4,12.94,12.94,0,0,0,0-9.9,13.07,13.07,0,0,0-2.71-4,12.89,12.89,0,0,0-4-2.71,12.59,12.59,0,0,0-4.91-.94,13.12,13.12,0,0,0-5,.94,12.77,12.77,0,0,0-4.09,2.71,12.92,12.92,0,0,0-2.67,14,11.92,11.92,0,0,0,2.67,4,12.81,12.81,0,0,0,4.09,2.71,12.45,12.45,0,0,0,5,1m0-29a16.74,16.74,0,0,1,11.75,4.8,16,16,0,0,1,3.54,5.19,16.09,16.09,0,0,1,0,12.65,16.88,16.88,0,0,1-3.54,5.19,17.85,17.85,0,0,1-5.27,3.5,16.33,16.33,0,0,1-6.48,1.3,16.6,16.6,0,0,1-6.56-1.3,17.08,17.08,0,0,1-5.31-3.5A16.88,16.88,0,0,1,1948,1546a16.09,16.09,0,0,1,0-12.65,16,16,0,0,1,3.54-5.19,15.8,15.8,0,0,1,5.31-3.5,16.6,16.6,0,0,1,6.56-1.3M432.16,1465.1c0-28.85,18.9-52.55,49.79-52.55,29.52,0,49.44,22.68,49.44,52.55s-19.92,52.55-49.44,52.55c-30.89,0-49.79-23.7-49.79-52.55m132.88,0V1383H529.35V1403c-11.32-14.78-28.49-24.05-51.84-24.05-46,0-82.1,36.08-82.1,86.19s36.08,86.19,82.1,86.19c23.34,0,40.52-9.28,51.84-24.05v19.93H565V1465.1Zm1205.92,0c0-28.85,18.9-52.55,49.8-52.55,29.55,0,49.44,22.68,49.44,52.55s-19.89,52.55-49.44,52.55c-30.89,0-49.8-23.7-49.8-52.55m132.92,0v-148h-35.72V1403c-11.32-14.78-28.49-24.05-51.84-24.05-46,0-82.1,36.08-82.1,86.19s36.08,86.19,82.1,86.19c23.35,0,40.52-9.28,51.84-24.05v19.93h35.72V1465.1ZM1008,1410.86c23,0,37.77,14.42,41.54,39.81H964.38c3.81-23.7,18.2-39.81,43.63-39.81m.71-32c-48.1,0-81.75,35-81.75,86.19,0,52.19,35,86.19,84.14,86.19,24.72,0,47.36-6.17,67.28-23l-17.49-26.45c-13.76,11-31.28,17.17-47.75,17.17-23,0-43.94-10.65-49.09-40.2h121.87c.35-4.44.71-8.92.71-13.72-.36-51.17-32-86.19-77.94-86.19m430.9,86.19c0-28.85,18.9-52.55,49.79-52.55,29.52,0,49.44,22.68,49.44,52.55s-19.92,52.55-49.44,52.55c-30.89,0-49.8-23.7-49.8-52.55m132.88,0V1383H1536.8V1403c-11.36-14.78-28.49-24.05-51.84-24.05-46,0-82.1,36.08-82.1,86.19s36.08,86.19,82.1,86.19c23.35,0,40.48-9.28,51.84-24.05v19.93h35.68V1465.1Zm-334.42,0c0,49.79,34.66,86.19,87.56,86.19,24.72,0,41.19-5.5,59-19.57l-17.14-28.85c-13.4,9.63-27.47,14.78-43,14.78-28.49-.35-49.44-20.95-49.44-52.55s20.95-52.19,49.44-52.55c15.49,0,29.56,5.15,43,14.78l17.14-28.85c-17.84-14.07-34.31-19.57-59-19.57-52.9,0-87.56,36.39-87.56,86.19m460.1-86.19c-20.59,0-34,9.63-43.27,24.05V1383h-35.37v164.12h35.73v-92c0-27.16,11.67-42.25,35-42.25a57.87,57.87,0,0,1,22.32,4.13l11-33.64c-7.9-3.11-18.2-4.48-25.43-4.48m-956.64,17.17c-17.17-11.32-40.83-17.17-66.93-17.17-41.58,0-68.35,19.93-68.35,52.54,0,26.76,19.93,43.27,56.63,48.42l16.86,2.4c19.57,2.75,28.81,7.9,28.81,17.17,0,12.69-13,19.93-37.41,19.93-24.72,0-42.56-7.9-54.59-17.17L599.74,1530c19.57,14.42,44.29,21.3,71.06,21.3,47.4,0,74.87-22.32,74.87-53.57,0-28.85-21.62-43.94-57.34-49.09l-16.82-2.44c-15.45-2-27.83-5.11-27.83-16.11,0-12,11.67-19.22,31.25-19.22,20.95,0,41.23,7.9,51.17,14.07l15.45-28.85ZM1202,1378.91c-20.59,0-34,9.63-43.23,24.05V1383h-35.37v164.12h35.69v-92c0-27.16,11.67-42.25,35-42.25a57.87,57.87,0,0,1,22.32,4.13l11-33.64c-7.9-3.11-18.2-4.48-25.43-4.48M897.44,1383H839.08v-49.79H803V1383H769.71v32.62H803v74.87c0,38.08,14.78,60.76,57,60.76,15.49,0,33.33-4.8,44.65-12.69L894.34,1508c-10.65,6.17-22.32,9.28-31.6,9.28-17.84,0-23.66-11-23.66-27.47v-74.16h58.36ZM363.85,1547.16v-103c0-38.79-24.72-64.89-64.57-65.24-20.95-.35-42.56,6.17-57.69,29.2-11.32-18.2-29.16-29.2-54.24-29.2-17.53,0-34.66,5.15-48.07,24.37V1383H103.56v164.12h36v-91c0-28.49,15.8-43.63,40.2-43.63,23.7,0,35.69,15.45,35.69,43.27v91.34h36.08v-91c0-28.49,16.47-43.63,40.16-43.63,24.37,0,36,15.45,36,43.27v91.34Z"/><path class="cls-2" d="M1980.94,1001.22v-24h-6.25l-7.23,16.47-7.19-16.47H1954v24h4.44V983.14l6.76,15.6h4.6l6.76-15.64v18.12h4.4Zm-39.65,0V981.33h8v-4.05h-20.44v4.05h8v19.89h4.4Z"/><path class="cls-3" d="M1270.57,1104.15H729.71v-972h540.87Z"/><path class="cls-4" d="M764,618.17c0-197.17,92.32-372.81,236.08-486A615.46,615.46,0,0,0,618.09,0C276.72,0,0,276.76,0,618.17s276.72,618.17,618.09,618.17a615.46,615.46,0,0,0,382-132.17C856.34,991,764,815.35,764,618.17"/><path class="cls-5" d="M2000.25,618.17c0,341.41-276.72,618.17-618.09,618.17a615.65,615.65,0,0,1-382.05-132.17c143.8-113.19,236.12-288.82,236.12-486s-92.32-372.81-236.12-486A615.65,615.65,0,0,1,1382.15,0c341.37,0,618.09,276.76,618.09,618.17"/></svg>
            </div>
            <div class="pay-methods__item">
              <svg xmlns="http://www.w3.org/2000/svg" width="2500" height="708" viewBox="252.448 288.608 776.384 219.776"><path fill="#4DB45E" d="M461.664 288.608v.096c-.096 0-30.336-.096-38.4 28.8-7.392 26.496-28.224 99.616-28.8 101.632h-5.76s-21.312-74.752-28.8-101.728c-8.064-28.896-38.4-28.8-38.4-28.8h-69.056v219.776h69.088V377.855h5.76l40.32 130.528h47.968l40.32-130.432h5.76v130.432h69.088V288.608h-69.088zM714.048 288.608s-20.256 1.824-29.76 23.041L635.36 419.136h-5.76V288.608h-69.088v219.776h65.248s21.216-1.92 30.721-23.04l47.968-107.488h5.76v130.528h69.088V288.608h-65.249zM810.016 388.416v119.968h69.088v-70.048h74.849c32.64 0 60.256-20.832 70.528-49.888H810.016v-.032z"/><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="1065.561" y1="-978.524" x2="1779.66" y2="-978.524" gradientTransform="matrix(.32 0 0 .32 459.34 646.84)"><stop offset=".3" stop-color="#00b4e6"/><stop offset="1" stop-color="#088ccb"/></linearGradient><path fill="url(#a)" d="M953.984 288.608H800.32c7.68 41.856 39.071 75.424 79.647 86.368a110.449 110.449 0 0 0 28.896 3.841h118.432c1.056-4.992 1.536-10.08 1.536-15.36.001-41.345-33.503-74.849-74.847-74.849z"/></svg>
            </div>
          </div>
          <div class="form__item">
            <div class="form__checkbox">
              <input type="checkbox" id="formAgreement" class="checkbox__input " checked required>
              <label for="formAgreement" class="checkbox__label"><span>Я даю согласие на обработку персональных данных</span></label>
            </div>
          </div>
          <button type="submit" class="form__button">Оформить заказ</button>
        </div>
      `;
      checkoutForm.innerHTML = cartItemTemplate;
      basketWindow.querySelector(`.total__checkout`).style.display = `none`;
    };
    checkout.addEventListener(`click`, showForms);
  };

  const deactivateCheckoutForm = () => {
    basketWindow.querySelector(`.checkoutForm`).classList.remove(`_active`);
    basketWindow.querySelector(`.checkoutForm`).innerHTML = ``;
    basketWindow.querySelector(`.total__checkout`).style.display = `block`;
  };

  const checkoutDOMElement = () => {
    const checkout = document.querySelector(`.total__checkout`);
    if (Object.keys(cart).length == 0) {
      checkout.textContent = `Корзина пока пуста`;
      checkout.style.color = `#000`;
      checkout.style.background = `#eee`;
      checkout.style.pointerEvents = `none`
      deactivateCheckoutForm();
    } else {
      checkout.textContent = `Перейти к Оформлению заказа`;
      checkout.style.color = null;
      checkout.style.background = null;
      checkout.style.pointerEvents = `auto`
      activateCheckoutForm(checkout);
    }
    
  };
  
  const minShippingDOMElement = basketWindow.querySelector(`.total__min`);
  const shippingPrice = basketWindow.querySelector(`.shipping-price`);
  
  const updateCartTotalPrice = () => {
    const totalPrice = Object.keys(cart).reduce((acc, id) => {
      const {
        quantity,
        productPrice
      } = cart[id];
      return acc + productPrice * quantity;
    }, 0);

    
    if (totalPrice < +minShippingDOMElement.textContent && totalPrice > 0) {
      totalPriceDOMElement.textContent = totalPrice + +shippingPrice.textContent;
    } else {
      totalPriceDOMElement.textContent = totalPrice;
    };

    minShippingPrice(totalPrice);
  };
  
  const minShippingPrice = (totalPrice) => {
    const totalEnough = basketWindow.querySelector(`.totalEnough`);
    const notEnoughPriceDOMElement = basketWindow.querySelector(`.total__need4free`);
    const notEnoughPriceDOMElementRubles = basketWindow.querySelector(`.total__need4free-rubles`);
    let newQuantityNotEnough = 750;

    if (newQuantityNotEnough > 0) {
      newQuantityNotEnough = minShippingDOMElement.textContent - totalPrice;
      notEnoughPriceDOMElement.textContent = newQuantityNotEnough;
      totalEnough.textContent = `До бесплатной доставки не хватет:`;
      notEnoughPriceDOMElement.style.display = "inline-block";
      notEnoughPriceDOMElementRubles.style.display = "inline-block";
      shippingPrice.style.display = null;
      minShippingDOMElement.style.display = null;
    }
    if (newQuantityNotEnough <= 0) {
      shippingPrice.style.display = `none`;
      minShippingDOMElement.style.display = `none`;
      totalEnough.textContent = `У вас доставка будет бесплатной`;
      notEnoughPriceDOMElement.style.display = "none";
      notEnoughPriceDOMElementRubles.style.display = "none";
    }
    checkoutDOMElement();
  };

  const updateCartTotalItemsCounter = () => {
    const totalQuantity = Object.keys(cart).reduce((acc, id) => {
      const {
        quantity
      } = cart[id];
      return acc + quantity;
    }, 0);

    if (cartItemsCounterDOMElement) {
      cartItemsCounterDOMElement.textContent = totalQuantity;
      cartItemsCounterDOMElementWindow.textContent = totalQuantity;
    }
  };

  const updateCart = () => {
    updateCartTotalPrice();
    updateCartTotalItemsCounter();
    saveCart();
    totalInputUpdate();
  };

  const productDelete = (id, cartItemDOMElement) => {
    const productName = id.replace(/ /g, '_').replace(/[.,]/g, '-');
    snacks.querySelector(`.${productName}`).querySelector(`.snacks__price`).textContent = cart[id].productPrice;


    delete cart[id];
    cartItemDOMElement.parentNode.removeChild(cartItemDOMElement);
    updateCart();
  };

  const addCartItem = (data) => {
    const { productName } = data;
    const productNameWithoutProbels = productName.replace(/ /g, '_').replace(/[.,]/g, '-');

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
  };

  const showBasketButton = (id) => {
    const product = snacks.querySelector(`.${id}`);
    product.querySelector(`.basketDefault`).style.display = `flex`;
    product.querySelector(`.snacks__price`).classList.remove(`_active`);
    product.querySelector(`.plus`).style.display = `none`;
    product.querySelector(`.minus`).style.display = `none`;
    product.querySelector(`.snacks-quantity`).textContent = ``;
    product.querySelector(`.snacks-quantity`).classList.remove(`_active`);
  };

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
  };

  const updateSnacksQuantity = (id, quantity) => {
    if (quantity > 0) {
      const product = snacks.querySelector(`.${id}`);
      const cartItemQuantityDOMElement = product.querySelector(`.snacks-quantity`);
      const cartItemPriceDOMElement = product.querySelector(`.snacks__price`);
      cartItemQuantityDOMElement.textContent = quantity;
      cartItemPriceDOMElement.textContent = quantity * cart[id].productPrice;
    } else {
      showBasketButton(id);
    }
    updateCart();
  };

  const updateQuantity = (id, quantity, cartItemDOMElement, target) => {
    
    cart[id].quantity = quantity;

    if (quantity > 0) {
      const product = cartDOMElement.querySelector(`.${id}`);
      const cartItemQuantityDOMElement = product.querySelector(`.quantity`);
      const cartItemPriceDOMElement = product.querySelector(`.snacks__price`);

      cartItemQuantityDOMElement.textContent = quantity;
      cartItemPriceDOMElement.textContent = quantity * cart[id].productPrice;
      updateSnacksQuantity(id, quantity);

      if (target && cartItemDOMElement.classList.contains(`snacks`)) {
        showSnacksQuantity(id);
        hideBasketButton(id);
      }
      updateCart();
    }

    if (quantity === 0) {
      showBasketButton(id);
      const product = cartDOMElement.querySelector(`.${id}`);
      updateSnacksQuantity(id, quantity);
      productDelete(id, product);
    };
    updateCart();
    formUpdate(id,  quantity);
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

      if (target.classList.contains(`snacks__ingredient-add`)) {
        snacksAttributes(target);
      }

      if (target.classList.contains(`basketDefault`)) {
        e.preventDefault();
        const product = target.closest(`.snacks`);
        const data = getProductData(product);
        addCartItem(data);
      }

      if (target.classList.contains(`product-delete`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        const idWithoutProbels = productID.replace(/ /g, '_').replace(/[.,]/g, '-');
        showBasketButton(idWithoutProbels);
        productDelete(idWithoutProbels, cartItemDOMElement);
      }

      if (target.classList.contains(`plus`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        const idWithoutProbels = productID.replace(/ /g, '_').replace(/[.,]/g, '-');

        plusQuantity(idWithoutProbels, cartItemDOMElement, target);
        hideBasketButton(idWithoutProbels);
        showSnacksQuantity(idWithoutProbels, cartItemDOMElement);
      }

      if (target.classList.contains(`minus`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        const idWithoutProbels = productID.replace(/ /g, '_').replace(/[.,]/g, '-');

        showSnacksQuantity(idWithoutProbels, cartItemDOMElement);
        hideBasketButton(idWithoutProbels);
        minusQuantity(idWithoutProbels, cartItemDOMElement, target);
      }


      if (target.classList.contains(`basketDefault`)) {
        e.preventDefault();
        const cartItemDOMElement = target.closest(`.product`);
        const productID = cartItemDOMElement.querySelector(`.product__title`).textContent.trim();
        const idWithoutProbels = productID.replace(/ /g, '_').replace(/[.,]/g, '-');
        hideBasketButton(idWithoutProbels);
        showSnacksQuantity(idWithoutProbels, cartItemDOMElement);
        updateCart();
      }
    })
  };

  cartInit();
})();


/* form start */
;(function() {
  const forms = document.querySelectorAll('.form-send');


  if (forms.length === 0) {
    return;
  }

  const serialize = function(form) {
    const items = form.querySelectorAll('input, select, textarea');
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      const name = item.name;
      const value = item.value;
      let separator = i === 0 ? '' : '&';

      if (value) {
        str += separator + name + '=' + value;
      }
    }
    return str;
  };

  const formSend = function(form) {
    const data = serialize(form);
    const xhr = new XMLHttpRequest();
    const url = WPJS.ajaxUrl + '?action=send_email';
    
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.onload = function() {
        const activePopup = document.querySelector('.basket._active');
        activePopup.classList.add(`_sending`);
        const form = document.querySelector(`.form-send`);
        
        if (xhr.response === 'success') {
          
          activePopup.classList.remove(`_sending`);
          alert('Спасибо за ваш заказ. Мы уже начали готовить!')
        } else {
          alert('Ошибка')
        }

        form.reset();
      };

    xhr.send(data);
  };

  for (let i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', function(e) {
      e.preventDefault();
      const form = e.currentTarget;
      formSend(form);
    });
  }
})();
/* form end */


/* category navigation */
(function () {
  const filterSnacks = document.querySelectorAll(`.snacks`);
  
  document.querySelector(`nav`).addEventListener(`click`, e => {
    if (e.target.tagName !== `BUTTON`) return false;
    else {
      const deactiveBtn = e.target.closest(`ul`).querySelectorAll(`.catalog-nav__btn`);
      deactiveBtn.forEach(btn => {
        btn.classList.remove(`_active`);
      });
      e.target.classList.add(`_active`);
    };
    
    let filterClass = e.target.dataset['filter'];
    
    filterSnacks.forEach(elem => {
      elem.classList.remove(`hide`);
      if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
        elem.classList.add('hide');
      }
    });
  });
  
})();


/* category navigation end */


function mapInit() {
  ymaps.ready(init);

  function init() {
    const myMap = new ymaps.Map("map", {
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