const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
    display: block;
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
}
.product-photo {
    width: 70%;
    height: 200px;
    object-fit: cover;
}
.product-title {
    font-size: 1.2em;
    margin: 10px 0;
    color: black;
}
.product-price,
.product-discount-price {
    font-size: 1.1em;
    margin: 5px 0;
}
.product-price {
    text-decoration: line-through;
    color: #999;
}
.product-discount {
    color: #ff0000;
    font-weight: bold;
}
.product-rating {
    color: #f5c518;
    font-size: 1em;
}
</style>
<div class="product-card">
    <img class="product-photo" src="" alt="Product Photo">
    <div class="product-title"></div>
    <div class="product-price"></div>
    <div class="product-discount-price"></div>
    <div class="product-discount"></div>
    <div class="product-rating"></div>
</div>`;


class SellItem extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.append(template.content.cloneNode(true));

      this.photo = shadow.querySelector('.product-photo');
      this.title = shadow.querySelector('.product-title');
      this.price = shadow.querySelector('.product-price');
      this.discountPrice = shadow.querySelector('.product-discount-price');
      this.discount = shadow.querySelector('.product-discount');
      this.rating = shadow.querySelector('.product-rating');

      this.updateAttributes();
    }

    static get observedAttributes() {
      return ['photo', 'title', 'price', 'discount-price', 'discount', 'rating'];
    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    updateAttributes() {
      this.photo.src = this.getAttribute('photo') || '';
      this.title.textContent = this.getAttribute('title') || 'Item Title';
      this.price.textContent = this.getAttribute('price') || '$0';
      this.discountPrice.textContent = this.getAttribute('discount-price') || '$0';
      this.discount.textContent = this.getAttribute('discount') || '0%';
      this.rating.innerHTML = this.getAttribute('rating') ? '★'.repeat(this.getAttribute('rating')) : 'No rating';
    }
}

customElements.define('sell-item', SellItem)