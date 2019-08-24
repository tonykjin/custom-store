import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.formatPrice = this.formatPrice.bind(this);
  }
  formatPrice() {
    this.price = '$' + this.props.item.price;
    return [this.price.slice(0, -2), '.', this.price.slice(-2)].join('');
  }
  render() {
    return (
      <div className="container h-100 w-100" style={{ 'border': '1px black solid', 'marginBottom': '5px' }}>
        <div className='row'>
          <div className="col-3">
            <img className="d-inline-block mw-100" src={this.props.item.image}></img>
          </div>
          <div className="col-9 d-inline-block">
            <h4>{this.props.item.name}</h4>
            <h5 style={{ 'margin': '6px', 'fontSize': '90%', 'color': 'gray' }}>{this.formatPrice()}</h5>
            <p>{this.props.item.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
