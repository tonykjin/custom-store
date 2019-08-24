import React from 'react';
import { Col, Row, Button, InputGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        username: null,
        card: null,
        address: null
      }
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }
  handleNameChange(event) {
    this.setState({
      info: {
        username: event.target.value,
        card: this.state.info.card,
        address: this.state.info.address
      }
    });
  }
  handleCardChange(event) {
    this.setState({
      info: {
        username: this.state.info.username,
        card: event.target.value,
        address: this.state.info.address
      }
    });
  }
  handleAddressChange(event) {
    this.setState({
      info: {
        username: this.state.info.username,
        card: this.state.info.card,
        address: event.target.value
      }
    });
  }
  render() {
    let total = 0;
    this.props.cart.forEach(item => {
      total += item.price;
      return total;
    });
    total = total.toString();
    return (
      <div className="container">
        <Row className="mt-3">
          <Col />
          <Col xs="6"><h2 style={{ 'textAlign': 'center' }}>Checkout</h2></Col>
          <Col />
        </Row>
        <Row className="mt-3 mb-5">
          <Col />
          <Col xs="6"> <h4 style={{ 'textAlign': 'center' }}> Order Total: ${[total.slice(0, -2), '.', total.slice(-2)].join('')}</h4> </Col>
          <Col />
        </Row>
        <Row className="mt-3">
          <Col sm={12}>
            <h4 className="mb-2">Name</h4>
            <input className="mb-2 w-100" id="name" type="text" onChange={this.handleNameChange}/>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm={12}>
            <h4>Credit Card <FontAwesomeIcon icon={faCreditCard} /> </h4>
            <input className="mb-2 w-100" id="credit-card" type="number" onChange={this.handleCardChange}/>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <h4>Shipping Address</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputGroup>
              <Input type="textarea" name="text" onChange={this.handleAddressChange}></Input>
            </InputGroup>
          </Col>
        </Row>
        <Button className="mt-5" color="primary" onClick={() => { this.props.placeOrder(this.state.info); }}>Place Order</Button>
        <Button className="mt-5" color="secondary" onClick={() => { this.props.setView('cart', {}); }}>Back to Cart</Button>
      </div>
    );
  }
}
