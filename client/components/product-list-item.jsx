import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Col } from 'reactstrap';

export default class ProductListItem extends React.Component {
  formatPrice() {
    this.price = '$' + this.props.value.price;
    return [this.price.slice(0, -2), '.', this.price.slice(-2)].join('');
  }
  render() {
    return (
      <Col xs="6" sm="4">
        <Card className="h-100 w-100" onClick={() => { this.props.setView('details', { id: this.props.value.id }); }}>
          <CardImg className="h-50" src={this.props.value.image} />
          <CardBody>
            <CardTitle> {this.props.value.name} </CardTitle>
            <CardSubtitle> {this.formatPrice()} </CardSubtitle>
            <CardText> {this.props.value.shortDescription} </CardText>xxw
          </CardBody>
        </Card>
      </Col>
    );
  }
}
