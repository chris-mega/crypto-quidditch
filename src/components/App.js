import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './App.css';
import { loadWeb3 } from './eth/web3'
import QuidditchPlayer from '../abis/QuidditchPlayer.json'
import QuidditchApi from './eth/api'
import MarketPlace from './Marketplace'
import MyPlayers from './MyPlayers'

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
    }
  }

  render() {
    const { api, account } = this.state;
    return (
      <Router history={createBrowserHistory()}>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href="/">CryptoQuidditch</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/marketplace">MarketPlace</Nav.Link>
            <Nav.Link href="/myplayers">My Players</Nav.Link>
          </Nav>
        </Navbar>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <Switch>
                <Route exact path='/' component={() => <MarketPlace api={api} account={account}/>}/>
                <Route exact path='/marketplace' component={() => <MarketPlace api={api} account={account}/>}/>
                <Route exact path='/myplayers' component={() => <MyPlayers />}/>
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
