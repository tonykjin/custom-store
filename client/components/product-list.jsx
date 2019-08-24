import React from 'react';
import ProductListItem from './product-list-item';
import { Container, Row } from 'reactstrap';

export default class ProductList extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          {this.props.products.map(product => {
            return (
              <ProductListItem
                setView={() => { this.props.setView('details', { id: product.id }); }}
                key={product.id}
                value={product}/>
            );
          })}
        </Row>
      </Container>
    );
  }
}
