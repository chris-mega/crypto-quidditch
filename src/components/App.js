import React, { Component } from 'react';
import { Card, ListGroup, ListGroupItem, CardDeck, Button } from 'react-bootstrap';
import './App.css';
import QuidditchPlayer from '../abis/QuidditchPlayer.json'
import { loadWeb3 } from './eth/web3'
import QuidditchApi from './eth/api'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      account: '',
      contract: null,
      myPlayers: [],
      marketPlayers: [],
      api: null,
    };
  }
  async componentWillMount() {
    try{
      const web3 = await loadWeb3();
      await this.loadBlockchainData(web3);
    } catch(error){
      console.log(error)
    }
  }

  async loadBlockchainData(web3) {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    this.setState({ account: account });

    const networkId = await web3.eth.net.getId();
    const networkData = QuidditchPlayer.networks[networkId];
    if (networkData) {
      const abi = QuidditchPlayer.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract: contract });

      const api = new QuidditchApi(contract);
      this.setState({ api: api });
      
      const results = await api.getPlayers();
      this.setState({ marketPlayers: results });
      
      // get players owned
      const owned = await api.getUserPlayers(account);
      console.log(owned)
      this.setState({ myPlayers: owned });
    } else {
      window.alert('Smart contract not deployed');
    }
  }

  async onClick(id){
    const { api, account } = this.state;
    await api.buyPlayer(id, account)
      .then(response => {
        console.log('nice');
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { marketPlayers } = this.state;
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            CryptoQuidditch
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
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
                      <Button variant="warning" onClick={() => this.onClick(i)}>Buy</Button>
                    </Card>
                    )
                  }
                </CardDeck>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
