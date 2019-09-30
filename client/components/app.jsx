import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      products: [],
      cart: []
    };
    this.checkCart = this.checkCart.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }
  checkCart() {
    const init = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch('api/check-cart', init)
      .then(res => { return res.json(); });
  }
  getProducts() {
    fetch('api/products', { method: 'GET' })
      .then(res => { return res.json(); })
      .then(data => {
        this.setState({
          products: data.products
        });
      });
  }
  setView( name, params ) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }
  getCartItems() {
    fetch('api/cart', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          cart: data
        });
      });
  }
  addToCart( product ) {
    const init = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', init)
      .then(data => data.json())
      .then(() => {
        let newState = [...this.state.cart];
        newState.push(product);
        this.setState({
          cart: newState
        });
      });
  }
  placeOrder( details ) {
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
    fetch('/api/order', init)
      .then(res => res.json());
    this.setState({
      cart: []
    });
    this.setView('catalog', {});
  }
  componentDidMount() {
    this.checkCart();
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
