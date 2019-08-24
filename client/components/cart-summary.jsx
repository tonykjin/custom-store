import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    let total = 0;
    this.props.cartItems.forEach(item => {
      total += item.price;
      return total;
    });
    total = total.toString();
    if (!this.props.cartItems) {
      return (
        <div className="container">
          <Button className="m-4" onClick={() => { this.props.setView('catalog', {}); }}> Back to Catalog </Button>
          <h3> My Cart </h3>
          <div> There are no items in your cart! </div>
          <div> Cart Total $0</div>
        </div>
      );
    } else {
      return (
        <div className="container h-100 w-100">
          <Button className="m-4" onClick={() => { this.props.setView('catalog', {}); }}> Back to Catalog </Button>
          <h3> My Cart </h3>
          {this.props.cartItems.map(item => {
            return <CartSummaryItem key={item.id} item={item}/>;
          })}
          <Row>
            <Col xs={6} className='m-4'>
              <div className='d-inline-block'> Cart Total ${[total.slice(0, -2), '.', total.slice(-2)].join('')}</div>
            </Col>
            <Col xs={6} className="text-right m-3">
              <Button className="d-inline-block" color="primary" onClick={() => this.props.setView('checkout', {})}>Checkout</Button>
            </Col>
          </Row>
        </div>
      );
    }
  }
}
