import React from 'react';
import { CardColumns } from 'react-bootstrap';
import { connect } from 'react-redux';
import QuidditchCard from './Card'

const MyPlayers = ({ players, api, account }) => {
  const onClick = async(id) => {
    try{
      await api.sellPlayer(id, account);
    }catch(error){
      console.log(error)
      window.alert(error);
    }
  }

  return (
    <div className="content mr-auto ml-auto">
      <CardColumns>
        {
          players.map((player, i) => 
            <QuidditchCard player={player} onClick={() => onClick(i)} key={i}/>
          )
        }
      </CardColumns>
    </div>
  );
}

export default connect((state) => ({
  players: state.myPlayers,
}))(MyPlayers);
