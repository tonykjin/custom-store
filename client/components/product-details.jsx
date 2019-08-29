import React from 'react';
import { Button } from 'reactstrap';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.getProduct = this.getProduct.bind(this);
    this.formatPrice = this.formatPrice.bind(this);
  }
  getProduct(id) {
    fetch(`/api/product-details?id=${id}`, { method: 'GET' })
      .then(res => { return res.json(); })
      .then(data => {
        this.setState({
          product: data
        });
      });
  }
  componentDidMount() {
    this.getProduct(this.props.view.params.id);
  }
  formatPrice() {
    this.price = '$' + this.state.product.price;
    return [this.price.slice(0, -2), '.', this.price.slice(-2)].join('');
  }
  render() {
    if (!this.state.product) {
      return null;
    } else {
      return (
        <div className="h-100 w-100">
          <Button className="m-4" onClick={() => { this.props.setView('catalog', {}); }}>Back to catalog</Button>
          <div className='container d-block'>
            <div className="col-6 d-inline-block">
              <img src={this.state.product.image} width="100%"></img>
            </div>
            <div className="col-3 d-inline-block" style={{ 'border': '0px solid gray' }}>
              <h3>{this.state.product.name}</h3>
              <h3>{this.formatPrice()}</h3>
              <div className="section">
                <p>{this.state.product.shortDescription}</p>
                <Button onClick={() => { this.props.addToCart(this.state.product); }}> Add to Cart </Button>
              </div>
            </div>
          </div>
          <div className='container mt-3' style={{ 'width': '100%', 'borderTop': '1px solid silver' }}>
            <p style={ { 'padding': '15px' } }>
              <small>
                {this.state.product.longDescription}
              </small>
            </p>
          </div>
        </div>
      );
    }
  }
}
