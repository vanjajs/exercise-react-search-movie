import React from 'react';
import {
  Col, Card, CardImg, CardTitle, CardText,
  CardSubtitle, CardBody
} from 'reactstrap';

import defaultImage from '../assets/images/Movie.jpg';

const movie = (props) => (
  <Col sm="4" xs="12">
    <Card>
      <CardImg top width="100%" src={props.movie.Poster !== 'N/A' ? props.movie.Poster : defaultImage} alt={props.movie.Title} />
      <CardBody>
        <CardTitle style={{ cursor: 'pointer' }} onClick={props.clicked}>{props.movie.Title}</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>{props.movie.Year}</CardText>
      </CardBody>
    </Card>
  </Col>
)

export default movie;
