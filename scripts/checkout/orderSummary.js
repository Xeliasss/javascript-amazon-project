import { cart, removeFromCart, updateDeliveryOption, calculateCartQuantity, updateQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find(p => p.id === productId);

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>

            <div class="product-quantity">
              <span>Quantity:
                <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">Update</span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Delete
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`)?.remove();
      updateCartQuantity();
    });
  });

  // Update (enter editing)
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`)?.classList.add('is-editing-quantity');
    });
  });

  // Save quantity
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container?.classList.remove('is-editing-quantity');

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }

      updateQuantity(productId, newQuantity);
      document.querySelector(`.js-quantity-label-${productId}`).textContent = newQuantity;
      updateCartQuantity();
    });
  });

  // Delivery option
  document.querySelectorAll('.js-delivery-option').forEach((el) => {
    el.addEventListener('click', () => {
      const { productId, deliveryOptionId } = el.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); // re-render after change
    });
  });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link').textContent = `${cartQuantity} items`;
  }

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((opt) => {
      const deliveryDate = dayjs().add(opt.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = opt.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(opt.priceCents)} Shipping`;
      const isChecked = opt.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
             data-product-id="${matchingProduct.id}"
             data-delivery-option-id="${opt.id}">
          <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}" ${isChecked ? 'checked' : ''}>
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString}</div>
          </div>
        </div>`;
    });
    return html;
  }
}
