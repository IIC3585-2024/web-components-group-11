import { LitElement, html, css } from 'lit';

class SellItem extends LitElement {
  static properties = {
    photo: { type: String },
    title: { type: String },
    price: { type: String },
    discountPrice: { type: String },
    discount: { type: String },
    rating: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      width: 300px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin: 10px;
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
  `;

  render() {
    return html`
      <div class="product-card">
        <img class="product-photo" src="${this.photo}" alt="Product Photo">
        <div class="product-title">${this.title}</div>
        <div class="product-price">${this.price}</div>
        <div class="product-discount-price">${this.discountPrice}</div>
        <div class="product-discount">${this.discount}</div>
        <div class="product-rating">${'★'.repeat(this.rating)}</div>
      </div>
    `;
  }
}

customElements.define('sell-item', SellItem);