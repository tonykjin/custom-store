import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default class Header extends React.Component {
  render() {
    return (
      <div className="container d-block">
        <h1 className="col-6 d-inline-block">Wicked Sales</h1>
        <div className="col-3 d-inline-block"></div>
        <div className='col-3 d-inline-block' style={{ 'textAlign': 'right' }}>
          {this.props.cartItemCount} Items
          <FontAwesomeIcon icon={faShoppingCart} onClick={() => { this.props.setView('cart', {}); }}/>
        </div>
      </div>
    );
  }
}
