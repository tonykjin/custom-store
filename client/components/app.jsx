import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      products: [],
      cart: []
    };
    this.getProducts = this.getProducts.bind(this);
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }
  getProducts() {
    fetch('api/products.php', { method: 'GET' })
      .then(res => { return res.json(); })
      .then(data => {
        this.setState({
          products: data
        });
      });
  }
  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }
  getCartItems() {
    fetch('/api/cart.php', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          cart: data
        });
      });
  }
  addToCart(product) {
    const init = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart.php', init)
      .then(data => data.json())
      .then(() => {
        let newState = [...this.state.cart];
        newState.push(product);
        this.setState({
          cart: newState
        });
      });
  }
  placeOrder(details) {
    const init = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: {
        'user-details': JSON.stringify(details),
        'cart': JSON.stringify(this.state.cart)
      }
    };
    fetch('/api/orders.php', init)
      .then(res => res.json());

    this.setState({
      cart: []
    });
    this.setView('catalog', {});
  }
  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }
  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          <ProductList setView={this.setView} products={this.state.products}/>)
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <ProductDetails setView={this.setView} product={this.state.products} view={this.state.view} addToCart={this.addToCart} />
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} />
          <CartSummary cartItems={this.state.cart} setView={this.setView}/>
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} />
          <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} cart={this.state.cart}/>
        </div>
      );
    }
  }
}