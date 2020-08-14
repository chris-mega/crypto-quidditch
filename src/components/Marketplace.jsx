import React, { Component } from 'react';
import { CardColumns } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeAllPlayers } from './redux/playerActions';
import QuidditchCard from './Card'

class Marketplace extends Component {
  routeChange = () => {
    let history = useHistory();
    history.push('/myplayers');
  }

  async componentDidMount() {
    try{
      await this.loadBlockchainData();
    } catch(error){
      console.log(error)
    }
  }

  async loadBlockchainData() {
    const { api, account, dispatch } = this.props;
      
    const results = await api.getPlayers();
    var market = {};
    for(var playerNum in results) {
      var player = results[playerNum];
      const newPlayer = {
        name: player.name,
        team: player.team,
        position: player.position,
        cannon: player.cannon,
        category: player.category,
        owned: false,
      }
      market[playerNum] = newPlayer;
    };
    
    // get players owned
    const owned = await api.getUserPlayers(account);
    for(var own of owned) {
      market[own].owned = true;
    };

    dispatch(changeAllPlayers(market));
  }

  async onClick(id){
    const { api, account } = this.props;

    try{
      await api.buyPlayer(id, account);
      this.routeChange();
    }catch(error){
      window.alert(error);
    }
  }

  render() {
    const { market } = this.props;
    return (
      <div className="content mr-auto ml-auto">
        <CardColumns>
          {
            Object.keys(market).map((player) => 
              <QuidditchCard player={market[player]} onClick={() => this.onClick(player)} key={player}/>
            )
          }
        </CardColumns>
      </div>
    );
  }
}

export default connect((state) => ({
  market: state.marketPlayers,
}))(Marketplace);
