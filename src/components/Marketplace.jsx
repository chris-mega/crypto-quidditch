import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, CardDeck, Button } from 'react-bootstrap';

class Marketplace extends Component {
  constructor(props){
    super(props);
    this.state = {
      marketPlayers: [],
    };
  }
  async componentWillMount() {
    try{
      await this.loadBlockchainData();
    } catch(error){
      console.log(error)
    }
  }

  async loadBlockchainData() {
    const { api, account } = this.props;
      
    const results = await api.getPlayers();
    var market = [];
    for(var player of results) {
      const newPlayer = {
        name: player.name,
        team: player.team,
        position: player.position,
        cannon: player.cannon,
        category: player.category,
        owned: false,
      }
      market.push(newPlayer);
    };
    
    // get players owned
    const owned = await api.getUserPlayers(account);
    for(var own of owned) {
      market[own].owned = true;
    };

    this.setState({ marketPlayers: market });
  
  }

  async onClick(id){
    const { api, account } = this.state;
    await api.buyPlayer(id, account)
      .then(response => {
        console.log('nice');
      })
      .catch(error => {
        window.alert(error);
      })
  }

  render() {
    const { marketPlayers } = this.state;
    return (
      <div className="content mr-auto ml-auto">
        <CardDeck>
          {
            marketPlayers.map((player, i) => 
            <Card 
              style={{ width: '18rem' }}
              key={i}
              bg={player.cannon ? 'info' : 'light'}
              text={player.cannon ? 'white' : 'dark'}
            >
              <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
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
                <Button variant="warning" onClick={() => this.onClick(i)}>Buy</Button>
              }
            </Card>
            )
          }
        </CardDeck>
      </div>
    );
  }
}

export default Marketplace;
