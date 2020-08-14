import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
const QuidditchCard = ({player, onClick}) => (
  <Card 
    style={{ width: '18rem' }}
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
    {
      !player.owned &&
      <Button variant="warning" onClick={onClick}>Buy</Button>
    }
  </Card>
);

export default QuidditchCard;
