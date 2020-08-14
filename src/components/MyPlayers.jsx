import React from 'react';
import { CardColumns } from 'react-bootstrap';
import { connect } from 'react-redux';
import QuidditchCard from './Card'

const MyPlayers = ({ players }) => (
  <div className="content mr-auto ml-auto">
    <CardColumns>
      {
        players.map((player, i) => 
          <QuidditchCard player={player} onClick={() => this.onClick(i)} key={i}/>
        )
      }
    </CardColumns>
  </div>
);

export default connect((state) => ({
  players: state.myPlayers,
}))(MyPlayers);
