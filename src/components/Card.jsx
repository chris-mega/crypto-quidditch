import React from 'react';
import { Card, ListGroup, ListGroupItem, Button, Col } from 'react-bootstrap';
const QuidditchCard = ({player, onClick}) => (
  <Col lg={10}>
    <Card 
      bg={player.cannon ? 'info' : 'light'}
      text={player.cannon ? 'white' : 'dark'}
    >
      {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
      <Card.Header>
        <Card.Title>{player.name}</Card.Title>
        <Card.Text>{player.position}</Card.Text>
      </Card.Header>
      <ListGroup>
        <ListGroupItem className='listItem'><b>Category: </b>{player.category}</ListGroupItem>
        <ListGroupItem className='listItem'><b>Team: </b>{player.team}</ListGroupItem>
      </ListGroup>
      <Button variant="warning" onClick={onClick} style={{ width: '100%' }}>{player.owned ? 'Sale' : 'Buy'}</Button>
    </Card>
  </Col>
);

export default QuidditchCard;
