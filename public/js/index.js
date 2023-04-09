"use strict";

import dom from "./create.js";

// KONSTANTEN / VARIABLEN
const elements = {};
elements.sum = 0;
elements.s = 0;
// FUNKTIONEN
const domMapping = () => {
  elements.cartIcon = document.querySelector("#cart-icon");
  elements.cart = document.querySelector(".cart");
  elements.closeCart = document.querySelector("#close-cart");

  elements.removeCartButtons = document.querySelectorAll(".cart-remove");
  elements.cartQuantity = document.querySelectorAll(".cart-quantity");
  elements.cartPrice = document.querySelector(".cart-price");
  elements.cartPrices = document.querySelectorAll(".cart-price");
  elements.totalPrice = document.querySelector(".total-price");
  elements.cartBox = document.querySelectorAll(".cart-box");
  elements.cartContent = document.querySelector(".cart-content");
  elements.cartContents = document.querySelectorAll(".cart-content");
  elements.iconAddToCart = document.querySelectorAll("#cart-icon");
  elements.buy = document.querySelector(".btn-buy");
};

// Update Total
const updateTotal = () => {
  let total = 0;
  elements.cartBox.forEach((el) => {
    let priceElement = el.getElementsByClassName("cart-price")[0];
    let quantityElement = el.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("€", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  });
  total = Math.round(total * 100) / 100;
  elements.totalPrice.innerText = "€" + total;
};

// quantity Change
const quantityChange = () => {
  elements.cartQuantity.forEach((el) => {
    el.addEventListener("change", (e) => {
      let input = e.target;
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
    });
    domMapping();
    updateTotal();
  });
};

// prepare the product to add it to the cart
const addProductToCArt = (e) => {
  let productToCart = e.target.parentElement;
  let title = "";
  let price = "";
  let productImage = "";
  if (productToCart.getElementsByClassName("product-title")[0] != undefined) {
    title = productToCart.getElementsByClassName("product-title")[0].innerText;
  }
  if (productToCart.getElementsByClassName("price")[0] != undefined) {
    price = productToCart.getElementsByClassName("price")[0].innerText;
  }
  if (productToCart.getElementsByClassName("product-img")[0] != undefined) {
    productImage = productToCart.getElementsByClassName("product-img")[0].src;
  }
  if (title != "" && price != "" && productImage != "") {
    addProduct(title, price, productImage);
  }
  domMapping();
  updateTotal();
};

// Adding product to the cart
const addProduct = (title, price, productImage) => {
  const box = dom.create({
    element: "div",
    classes: ["cart-box"],
    parent: elements.cartContent,
  });
  dom.create({
    element: "img",
    classes: ["cart-img"],
    src: productImage,
    parent: box,
  });
  const detailBox = dom.create({
    element: "div",
    classes: ["detail-box"],
    parent: box,
  });
  dom.create({
    content: title,
    element: "div",
    classes: ["cart-product-title"],
    parent: detailBox,
  });
  dom.create({
    content: price,
    element: "div",
    classes: ["cart-price"],
    parent: detailBox,
  });
  dom.create({
    element: "input",
    type: "number",
    classes: ["cart-quantity"],
    value: "1",
    parent: detailBox,
  });
  dom.create({
    element: "i",
    classes: ["bx", "bx-trash", "cart-remove"],
    parent: box,
  });

  box
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCart);
  box
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChange);
  domMapping();
  updateTotal();

  // ///////////////////////////////////////////
  let newProduct = {
    t: title,
    p: price,
    i: productImage,
  };

  fetch("/save_product", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      title: newProduct.t,
      price: newProduct.p,
      productImage: newProduct.i
    }),
  })
    .then((res) => res.json())
    .catch(console.warn);
};

// buy Button Work
const buyOrder = () => {
  elements.buy.addEventListener("click", handleBuy);
};

const handleBuy = () => {
  alert("Your Order Is Placed");
  let currentContent = elements.cartContents[0];
  while (currentContent.hasChildNodes()) {
    currentContent.removeChild(currentContent.firstChild);
    domMapping();
    updateTotal();
  }
};

const removeCart = (e) => {
  e.target.parentElement.remove();
  domMapping();
  updateTotal();
};

const appendEventlisteners = () => {
  // Show or hide The cart by clicking on the bag icon
  elements.cartIcon.addEventListener("click", () => {
    if (elements.cart.classList.contains("active"))
      elements.cart.classList.remove("active");
    else elements.cart.classList.add("active");
  });

  // hide the cart by clicking on 'X'
  elements.closeCart.addEventListener("click", () => {
    elements.cart.classList.remove("active");
  });

  // remove Products Frome Cart
  elements.removeCartButtons.forEach((btn) => {
    btn.addEventListener("click", removeCart);
    updateTotal();
  });

  elements.iconAddToCart.forEach((el) => {
    el.addEventListener("click", addProductToCArt);
  });
};

const init = () => {

  domMapping();
  appendEventlisteners();
  updateTotal();
  quantityChange();
  buyOrder();
};

// INIT
document.addEventListener("DOMContentLoaded", init);
