import React, { Component } from 'react';
import { CardDeck } from 'react-bootstrap';
import QuidditchCard from './Card'

class Marketplace extends Component {
  state = {
    marketPlayers: [],
  };

  async componentDidMount() {
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
    const { api, account } = this.props;
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
              <QuidditchCard player={player} onClick={() => this.onClick(i)} key={i}/>
            )
          }
        </CardDeck>
      </div>
    );
  }
}

export default Marketplace;
